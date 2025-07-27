from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from dependencies import get_db
from models import Project
from auth_models import UserCreate
from database_methods import NewProject, NewTask, UpdateTask, UpdateProject
from database_methods import create_project, get_tasks_from_project, create_task, delete_task, delete_project, patch_task, patch_project
from auth_methods import create_user, check_token
from auth_utils import get_current_user

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # List of allowed origins
    allow_credentials=True,      # Allow cookies, authorization headers, etc.
    allow_methods=["*"],         # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],         # Allow all headers
)

@app.get('/')
async def root():
    return {
        'message': 'hello from python 14 in docker'
    }

# --- USERS ---

# this is just for development and shouldnt be accessible
@app.get('/users')
def get_users(db: Session = Depends(get_db)):
    return {"message": "this endpoint is for development only"}
    #return db.query(User).all()

@app.post('/users/register')
def register_user(new_user: UserCreate, db: Session = Depends(get_db)):
    return create_user(new_user, db)

@app.post('/token')
def get_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return check_token(form_data, db)

# --- PROJECTS ---

@app.get('/projects')
def get_projects(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(Project).filter(Project.owner_id == current_user.id).all()

@app.post('/projects')
def add_project(project: NewProject, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return create_project(project, db, current_user)

@app.delete('/projects/{project_id}')
def remove_project(project_id, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return delete_project(project_id, db, current_user)

@app.patch('/projects/{project_id}')
def update_project(project_id, update_project: UpdateProject, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return patch_project(project_id, update_project, db, current_user)

# --- TASKS ---

@app.get('/projects/{project_id}/tasks')
def get_tasks(project_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return get_tasks_from_project(project_id, db, current_user)

@app.post('/projects/{project_id}/tasks')
def add_task(project_id: int, task: NewTask, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return create_task(project_id, task, db, current_user)

@app.delete('/projects/{project_id}/tasks/{task_id}')
def remove_task(project_id: int, task_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return delete_task(project_id, task_id, db, current_user)

@app.patch('/projects/{project_id}/tasks/{task_id}')
def update_task(project_id: int, task_id: int, task: UpdateTask, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return patch_task(project_id, task_id, task, db, current_user)