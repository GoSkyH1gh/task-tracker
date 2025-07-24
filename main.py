from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from dependencies import get_db
from models import User, Project, Task

app = FastAPI()

def common_parameters():
    return 

@app.get('/')
async def root():
    return {
        'message': 'hello from python 14 in docker'
    }

@app.get('/users')
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.get('/projects')
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@app.post('/projects')
def add_project(db: Session = Depends(get_db)):
    pass