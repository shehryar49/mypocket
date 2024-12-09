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
        cur.execute(f"SELECT id from users where email='{req.email}';")
        id = cur.fetchall()[0][0]
        os.system(f"mkdir uploads/{id}")
        return JSONResponse({"msg": "User created successfully!"}, status_code=201)
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

@app.get("/home")
async def home(authorization: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(authorization)
    return JSONResponse({"msg": "Welcome home", "user": user['name']})

@app.post("/upload_file")
async def upload_file(folder_path: str, file: UploadFile, authorization: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(authorization)
    read = 0
    total = file.size
    opened_file = open(f'uploads/{user["id"]}/{folder_path}/{file.filename}',"wb")
    while read < total:
        bytes = await file.read(1024)
        opened_file.write(bytes)
        read += 1024
    opened_file.close()
    return JSONResponse({"msg": "File uploaded successfully", "file_path": folder_path})
@app.get("/delete_file")
async def delete_file(file_path: str,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    os.remove(f'uploads/{user["id"]}/{file_path}')
    return JSONResponse({'msg': 'File deleted'})

@app.get("/create_folder")
async def create_folder(folder_path: str,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    os.mkdir(f'uploads/{user["id"]}/{folder_path}')
    return JSONResponse({'msg': 'Folder created'})


@app.delete("/folder")
async def delete_folder(folder_path: str,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    shutil.rmtree(f'uploads/{user["id"]}/{folder_path}')
    return JSONResponse({'msg': 'Folder deleted'})

@app.get("/storage_info")
async def storage_info(auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    my_path = f"uploads/{user['id']}"
    mp4_videos = glob.glob(my_path + '/**/*.mp4', recursive=True)
    mkv_videos = glob.glob(my_path + '/**/*.mkv', recursive=True)
    mp3_files = glob.glob(my_path + '/**/*.mp3', recursive=True)
    wav_files = glob.glob(my_path + '/**/*.wav', recursive=True)
    png_files = glob.glob(my_path + '/**/*.png', recursive=True)
    jpg_files = glob.glob(my_path + '/**/*.jpg', recursive=True)
    
    videos = mp4_videos + mkv_videos
    audios = mp3_files + wav_files
    images = png_files + jpg_files
    
    all_files = glob.glob(my_path + '/**/*.*',recursive = True)
    size_map = {}
    prefix_len = len(my_path)
    for file in all_files:
        st = os.stat(file)
        size = st.st_size
        size_map[file[prefix_len+1:]] = size
    
    documents = [x[prefix_len+1:] for x in all_files if not (x in videos or x in audios or x in images)]
    videos = [x[prefix_len+1:] for x in videos]
    audios = [x[prefix_len+1:] for x in audios]
    images = [x[prefix_len+1:] for x in images]
    total_size = get_folder_size(f'uploads/{user["id"]}')

    cur = conn.cursor()
    cur.execute(f"select COUNT(*) from passwords where userid={user['id']}")
    records = cur.fetchall()
    count = records[0][0]
    #print(count)    
    info = {
        'videos': videos,
        "audios": audios,
        'images': images,
        'passwords': count,
        'documents': documents,
        "size_map": size_map,
        "total_storage": total_size
        }
    return JSONResponse(info)   

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
    return JSONResponse({'msg': 'Added'},201)

@app.delete("/passwords")
async def delete_password(id: int,auth: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(auth)
    cur = conn.cursor()
    cur.execute(f"delete from passwords where id={id}")
    return Response(status_code=204)
@app.get("/profile_pic")
async def profile_pic(id: str):
    return FileResponse(f'profile_pictures/{id}.jpg')
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

