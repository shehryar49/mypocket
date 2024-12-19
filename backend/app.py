from fastapi import FastAPI, Depends, HTTPException,File,UploadFile
from fastapi.responses import Response,JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from passlib.context import CryptContext
from datetime import datetime, timedelta
from pathlib import Path
import os
import jwt
import psycopg
import base64
import shutil
import glob

# Initialize app and security context
app = FastAPI()

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app running on localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "mypocket")  # Use environment variables for sensitive info
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 300

# Database connection setup
conn = psycopg.connect(dbname="mypocket", user="postgres", password="", host="localhost", port="5432")
conn.autocommit = True

# Models for User and Credentials
class User(BaseModel):
    name: str
    email: str
    password: str

class Cred(BaseModel):
    email: str
    password: str
class Password(BaseModel):
    email: str
    password: str
    note: str
class SharedFile(BaseModel):
    sharedTo: str
    rid: int

def get_folder_size(folder):
   return sum(file.stat().st_size for file in Path(folder).rglob('*'))

def get_current_user(authorization: HTTPAuthorizationCredentials = Depends(security)):
    token = authorization.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

@app.post("/signup")
async def create_user(req: User):
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", (req.email,))
    records = cur.fetchall()

    if records:
        raise HTTPException(status_code=409, detail="User with this email already exists!")
            
    hashed_password = hash_password(req.password)
    try:
        cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s);", (req.name, req.email, hashed_password))
        cur.execute("SELECT id from users where email=%s",(req.email,))
        id = cur.fetchall()[0][0]
        cur.execute(f"insert into filesystem(userid,rname,rtype,parentid) VALUES({id},'root',1,-1);")
        token = create_access_token(data={"email": req.email, "name": req.name,"id": id})
        return JSONResponse({"msg": "User created successfully!","access_token": token}, status_code=201)
    except psycopg.errors.StringDataRightTruncation:
        raise HTTPException(status_code=400, detail="An error occurred") #Error: Data too long for one or more fields.")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred")#f"Error: {str(e)}")

@app.post("/login")
async def login(req: Cred):
    cur = conn.cursor()
    cur.execute("SELECT password, name, id FROM users WHERE email = %s", (req.email,))
    records = cur.fetchall()
    if not records or not verify_password(req.password, records[0][0]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    token = create_access_token(data={"email": req.email, "name": records[0][1],"id": records[0][2]})
    return JSONResponse({"access_token": token,"name": records[0][1],'email': req.email,'id': records[0][2]})

# Secure endpoints
@app.post("/changepassword")
async def changepassword(req: Cred, auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    new_password = req.password
    hashed_password = hash_password(new_password)
    cur = conn.cursor()
    cur.execute(f"update users set password='{hashed_password}' where id={user['id']}")
    return JSONResponse({},status_code=200)
@app.get("/editinfo")
async def changename(name: str,contact: str,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute('update users set name = %s where id=%s',(name,int(user["id"])))
    return JSONResponse({},status_code=200)

# Filesystem related stuff

@app.get("/rootid")
async def getrootid(auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute("select id from filesystem where userid=%s and parentid=-1",(user["id"],))
    records = cur.fetchall()
    return JSONResponse({'id': records[0][0]})

@app.post("/resource")
async def upload_file(parentrid: int, file: UploadFile, authorization: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(authorization)
    read = 0
    total = file.size
    cur = conn.cursor()
    cur.execute("select rtype,userid from filesystem where id=%s",(parentrid,))
    records = cur.fetchall()
    if len(records) != 1:
        return JSONResponse({'msg': 'Invalid resource id'},404)
    if records[0][0] != 1:
        return JSONResponse({'msg': 'Uploads only supported to a folder!'},400)

    cur.execute(f"insert into filesystem(userid,rname,rtype,parentid) VALUES({user['id']},'{file.filename}',0,{parentrid}) RETURNING id;")
    records = cur.fetchall()
    id = records[0][0]
    upload_path = f"uploads/{id}-{file.filename}"
    opened_file = open(upload_path,"wb")
    while read < total:
        bytes = await file.read(1024)
        opened_file.write(bytes)
        read += 1024
    opened_file.close()
    return JSONResponse({"msg": "File uploaded successfully", "resource_id": id})

@app.get("/createfolder")
async def create_folder(foldername: str,parentid: int,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute("insert into filesystem(userid,rname,rtype,parentid) VALUES(%s,%s,1,%s) RETURNING id;",(user["id"],foldername,parentid))
    records = cur.fetchall()
    return JSONResponse({'msg': 'Folder created','id': records[0][0]})

@app.delete("/resource")
async def delete_resource(id: str,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute("select rname,userid,rtype from filesystem where id=%s",(id,))
    records = cur.fetchall()
    name = records[0][0]
    resource_owner = records[0][1]
    rtype = records[0][2]
    # the user has resource id that means he has access, no need to do the following
    #if resource_owner != user["id"]:
    #    cur.execute("select id from shared_files where sharedto=%s and resourceid=%s",(user["id"],id))
    #    records = cur.fetchall()
    #    print(records)
    #    if len(records) == 0:     
    #        return JSONResponse({'msg': 'You do not have permissions to delete this!'},403)
        # user is authorized to whatever with this resource
    cur.execute("delete from filesystem where id=%s",(id,))
    path = f"uploads/{id}-{name}"
    if rtype == 0: # file
        os.remove(path)

    return JSONResponse({'msg': 'File deleted'})

@app.get("/files")
async def getfiles(folderid: str,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute("select rtype from filesystem where id=%s",(folderid,))
    records = cur.fetchall()
    if len(records) != 1:
        return JSONResponse({'msg': 'Invalid folder ID'},400)
    if records[0][0] != 1:
        return JSONResponse({'msg': 'Resource not a folder. Cannot get it\'s files!'},400)
    cur.execute("select rname,id,rtype from filesystem where parentid=%s",(folderid,))
    records = cur.fetchall()
    
    result = []
    isdir = False
    for record in records:
        isdir = (record[2] == 1)
        obj = {'id': record[1],'name': record[0],'isDir': isdir}
        result.append(obj)
    # get shared files in current folder
    cur.execute(f"select rname,filesystem.id,rtype,shared_files.ownername from filesystem join shared_files on filesystem.id = shared_files.resourceid and sharedto = {user["id"]} and parentid={folderid}")
    records = cur.fetchall()
    for record in records:
        isdir = (record[2] == 1)
        obj = {'id': record[1],'name': f"{record[3]}-{record[1]}-{record[0]}",'isDir': isdir}
        result.append(obj)
    # get shared files
    cur.execute(f"select rname,filesystem.id,rtype,shared_files.ownername from filesystem join shared_files on filesystem.id = shared_files.resourceid and sharedto = {user["id"]}")
    records = cur.fetchall()
    for record in records:
        isdir = (record[2] == 1)
        obj = {'id': record[1],'name': f"{record[3]}-{record[1]}-{record[0]}",'isDir': isdir}
        result.append(obj)
    print(result)
    return JSONResponse({'data': result})

@app.get("/storage_info")
async def storage_info(auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute("select rname,rtype,id from filesystem where userid=%s",(user["id"]))
    records = cur.fetchall()
    videos = 0
    audios = 0
    images = 0
    documents = 0
    all_files = []
    for record in records:
        name = record[0]
        if name.endswith(".mp4") or name.endswith(".mkv"):
            videos +=1
        elif name.endswith(".mp3") or name.endswith(".wav"):
            audios += 1
        elif name.endswith(".png") or name.endswith(".jpg"):
            images += 1
        elif record[1] != 1:
            documents += 1
        if(record[1] != 1):
            all_files.append(f"uploads/{record[2]}-{name}")
    total_size = 0    
    for file in all_files:
        st = os.stat(file)
        size = st.st_size / (1024*1024) # size in MBS
        total_size += size
 
    cur = conn.cursor()
    cur.execute(f"select COUNT(*) from passwords where userid={user['id']}")
    records = cur.fetchall()
    count = records[0][0]
    info = {
        'videos': videos,
        "audios": audios,
        'images': images,
        'passwords': count,
        'documents': documents,
        "total_storage": total_size
        }
    return JSONResponse(info)   


@app.post("/sharedfiles")
async def addsharedfile(file: SharedFile,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    sharedby = user["id"]
    sharedto_email = file.sharedTo
    cur = conn.cursor()
    cur.execute("select name,id from users where email=%s",(sharedto_email,))
    records = cur.fetchall()
    if len(records) == 0:
        return JSONResponse({'msg': 'Email does not exist!'},404)
    sharedto = records[0][1]
    ownername = user["name"]
    cur.execute(f"insert into shared_files(sharedby,ownername,sharedto,resourceid) VALUES({sharedby},'{ownername}',{sharedto},{file.rid})")
    return JSONResponse({'msg': 'ok'})

# Saved passwords

@app.get("/passwords")
async def get_passwords(auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute(f"select id,email,pass,note,to_char(date,'dd/mm/yyyy') from passwords where userid={user['id']}")
    records = cur.fetchall()
    keys = ['serialNumber','email','password','note','date']
    result = []
    for record in records:
        tmp = {}
        i = 0
        for elem in record:
            tmp[keys[i]] = elem
            i += 1
        result.append(tmp)
    return JSONResponse({'data': result})    

@app.post("/passwords")
async def add_password(req: Password,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute(f"insert into passwords(userid,email,pass,note) VALUES({user['id']},'{req.email}','{req.password}','{req.note}')")    
    cur.execute(f'select id from passwords where email = \'{req.email}\' and pass=\'{req.password}\' and note=\'{req.note}\' and userid={user["id"]}')
    records = cur.fetchall()
    return JSONResponse({'msg': 'Added','id': records[0][0]},201)

@app.delete("/passwords")
async def delete_password(id: int,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute(f"delete from passwords where id={id}")
    return Response(status_code=204)

@app.get("/profile_pic")
async def profile_pic(id: str,r: str):
    #r is some random nonsense to avoid cache
    return FileResponse(f'profile_pictures/{id}.jpg')

@app.post("/profile_pic")
async def upload_profile_pic(image: UploadFile, auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    read = 0
    total = image.size
    if image.content_type != "image/jpeg":
        return JSONResponse({'msg': 'Please upload a JPEG image'},400)
    opened_file = open(f'profile_pictures/{user["id"]}.jpg',"wb")
    while read < total:
        bytes = await image.read(1024)
        opened_file.write(bytes)
        read += 1024
    opened_file.close()
    return JSONResponse({"msg": "File uploaded successfully"})    


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

