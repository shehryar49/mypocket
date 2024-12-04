from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import psycopg
import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
import os

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
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Database connection setup
def get_db_connection():
    conn = psycopg.connect(
        dbname="mypocket", user="postgres", password=os.getenv("DB_PASSWORD", "suhaib"), host="localhost", port="5432"
    )
    return conn

# Models for User and Credentials
class User(BaseModel):
    name: str
    email: str
    password: str

class Cred(BaseModel):
    email: str
    password: str


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
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email = %s", (req.email,))
            records = cur.fetchall()

            if records:
                raise HTTPException(status_code=409, detail="User with this email already exists!")
            
            hashed_password = hash_password(req.password)
            try:
                cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (req.name, req.email, hashed_password))
                return JSONResponse({"msg": "User created successfully!"}, status_code=201)
            except psycopg.errors.StringDataRightTruncation:
                raise HTTPException(status_code=400, detail="Error: Data too long for one or more fields.")
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Error: {str(e)}")





@app.post("/login")
async def login(req: Cred):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT password, name FROM users WHERE email = %s", (req.email,))
            records = cur.fetchall()

            if not records or not verify_password(req.password, records[0][0]):
                raise HTTPException(status_code=401, detail="Incorrect email or password")
            
            token = create_access_token(data={"email": req.email, "name": records[0][1]})
            return JSONResponse({"access_token": token})





@app.get("/home")
async def home(authorization: HTTPAuthorizationCredentials = Depends(security)):
    token = authorization.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    return JSONResponse({"msg": "Welcome home", "user": payload['name']})

import shutil
from typing import List



class Folder(BaseModel):
    folder_name: str
    created_by: str
    access_list: List[str]
    folder_size: int

class FileInfo(BaseModel):
    file_name: str
    file_type: str
    folder_id: int
    created_by: str
    file_size: int
    access_list: List[str]


def create_folder_on_server(folder_name: str, folder_id: str):
    folder_path = os.path.join("uploads", folder_id)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    return folder_path

def save_file(file: UploadFile, folder_path: str):
    file_path = os.path.join(folder_path, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return file_path






@app.post("/create_folder")
async def create_folder(folder: Folder, authorization: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(authorization)
    
    # Generate folder_id
    folder_id = f"{folder.folder_name}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
    
    # Create the folder on the server
    folder_path = create_folder_on_server(folder.folder_name, folder_id)
    
    # Insert folder info into the database
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO folders (folder_name, created_by, access_list, folder_size) 
                VALUES (%s, %s, %s, %s) RETURNING folder_id
            """, (folder.folder_name, folder.created_by, folder.access_list, folder.folder_size))
            conn.commit()
            folder_id = cur.fetchone()[0]
    
    return JSONResponse({"msg": "Folder created successfully", "folder_id": folder_id})



from fastapi import File, UploadFile

@app.post("/upload_file")
async def upload_file(folder_id: int, file: UploadFile = File(...), authorization: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(authorization)
    
    # Fetch folder details
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM folders WHERE folder_id = %s", (folder_id,))
            folder = cur.fetchone()
            if not folder:
                raise HTTPException(status_code=404, detail="Folder not found")
    
    # Save the file on the server inside the folder
    folder_name = folder[1]  # folder_name from the fetched record
    folder_path = os.path.join("uploads", folder_name)
    file_path = save_file(file, folder_path)
    
    # Insert file info into the database
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO files (file_name, file_type, folder_id, created_by, file_size, access_list)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (file.filename, file.content_type, folder_id, user['email'], len(file.file.read()), []))  # Access list as empty for now
            conn.commit()

    return JSONResponse({"msg": "File uploaded successfully", "file_path": file_path})

# Get files in a folder
@app.get("/get_files/{folder_id}")
async def get_files(folder_id: int, authorization: HTTPAuthorizationCredentials = Depends(security)):
    user = get_current_user(authorization)
    
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM files WHERE folder_id = %s", (folder_id,))
            files = cur.fetchall()
            return {"files": files}





if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

