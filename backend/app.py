from fastapi import FastAPI,Depends,Response,UploadFile
from fastapi.responses import FileResponse,JSONResponse
from pydantic import BaseModel, validator
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import psycopg
import jwt
import os

class User(BaseModel):
    name: str
    email: str
    password: str
class Cred(BaseModel):
    email: str
    password: str

SECRET_KEY = "mypocket"
app = FastAPI()
security = HTTPBearer()

conn = psycopg.connect(
        dbname="mypocket",
        user="postgres",
        password="",
        host="localhost",
        port="5432"
    )

conn.autocommit=True
cur = conn.cursor()

def get_current_user(authorization: HTTPAuthorizationCredentials = Depends(security)):
    token = authorization.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.PyJWTError:
        return None
# Routes
@app.post("/signup")
async def createUser(req: User):
    query = f"INSERT into users(name,email,password) VALUES('{req.name}','{req.email}','{req.password}')"
    cur.execute(f"select * from users where email='{req.email}'")
    records = cur.fetchall()
    if len(records) != 0:
        return JSONResponse({'msg': 'A user exists with the same email!'},status_code=409)
    cur.execute(query)
    return JSONResponse({'msg': 'user created'},status_code=201)

@app.post("/login",status_code=200)
async def login(req: Cred,logged_in = Depends(get_current_user)):
    if logged_in:
        return JSONResponse({'msg': 'You are already logged in!'},500)
    query = f"select password,name from users where email='{req.email}'"
    cur.execute(query)
    records  = cur.fetchall()
    if len(records) == 0:
        res.status_code = 401
        return JSONResponse({'msg': 'user does not exist!'},401)
    if records[0][0] != req.password:
        return JSONResponse({'msg': 'password incorrect'},401)
    # issue a jwt token
    token = jwt.encode({"email": req.email,'name': records[0][1]}, SECRET_KEY, algorithm="HS256")
    return JSONResponse({"access_token": token})    


@app.get("/home")
async def home(user:dict = Depends(get_current_user)):
    print(user)
    if not user:
        return JSONResponse({'msg': 'Login first!'},401)
    return JSONResponse({"msg": "Welcome home"})
@app.post("/upload")
async def upload(file: UploadFile,user = Depends(get_current_user)):
    if not user:
        return JSONResponse({'msg': 'Login first'},401)
    f = open("uploads/"+file.filename,"wb")
    total = file.size
    read = 0
    #print(await file.read(10))
    while read < total:
        b = await file.read(1024)
        f.write(b)
        read += 1024
    f.close()
    return {'msg': file.filename}
@app.get("/file")
async def getfile(filename: str):
    return FileResponse('uploads/'+filename)

@app.post("/createfolder")
async def create_folder(foldername: str):
    #print(foldername)
    ret = os.system(f"mkdir uploads/{foldername}")
    #if ret == 0:
    #    return JSONResponse({'msg': 'An error occurred'},500)
    return JSONResponse({'msg': 'All is well'},200)
@app.post("/renamefolder")
async def rename_folder(old: str,new: str):
    os.system(f"mv uploads/{old} uploads/{new}")
    return JSONResponse({'msg': 'Folder renamed'},200)

@app.post("/deletefolder")
async def delete_folder(foldername: str):
    os.system(f'rmdir uploads/{foldername}')
    return JSONResponse({'msg': 'Folder removed'},200)
