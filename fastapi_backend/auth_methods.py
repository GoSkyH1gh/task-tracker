from sqlalchemy.orm import Session
from auth_models import UserCreate
from auth_utils import get_password_hash, verify_password, create_access_token
from models import User
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import HTTPException

def create_user(new_user: UserCreate, db: Session):
    user = User(
    email=new_user.email,
    username=new_user.username,
    hashed_password=get_password_hash(new_user.password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return {
        "message": "User added successfully",
        "data": user
    }

def check_token(form_data: OAuth2PasswordRequestForm, db: Session):
    user_email = form_data.username

    user = db.query(User).filter(User.email == user_email).first()

    if user:
        if verify_password(form_data.password, user.hashed_password):
            token_payload = {"sub": user.email}
            access_token = create_access_token(data = token_payload)

            return {
                "access_token": access_token,
                "token_type": "bearer"    
            } 
        
        else:
            return HTTPException(401, {"message": "incorrect password"})
    else:
        return HTTPException(401, {"message": "user not found"})