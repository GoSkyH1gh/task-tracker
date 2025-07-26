from passlib.context import CryptContext
from jose import jwt, JWTError, ExpiredSignatureError
import os
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from dependencies import get_db
from models import User
from datetime import datetime, timedelta, timezone

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# this can be generated in a terminal using
# openssl rand -hex 32
SECRET_JWT_KEY = os.getenv("SECRET_JWT_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

if SECRET_JWT_KEY is None:
    raise ValueError("Missing environment variable: SECRET_KEY is not set.")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict):
    """Takes a payload and creates a signed JWT."""

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_JWT_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_JWT_KEY, algorithms=[ALGORITHM])

        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        

    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"}
            )
    
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        # If the user from the token doesn't exist in the DB anymore
        raise credentials_exception

    return user

if __name__ == "__main__":
    hash = get_password_hash("123")
    print(hash)
    print(verify_password("nicePass", "$2b$12$YlHVBtHJbWu8IJbkYKabh.p88SzlP7sqnz8RMT.W61siW/RrsFbvO"))
