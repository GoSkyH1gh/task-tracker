from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from dependencies import get_db
from models import User, Project, Task
from database_methods import NewProject, NewTask, UpdateTask, UpdateProject
from database_methods import create_project, get_tasks_from_project, create_task, delete_task, delete_project, patch_task, patch_project

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

@app.get('/users')
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# --- PROJECTS ---

@app.get('/projects')
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@app.post('/projects')
def add_project(project: NewProject, db: Session = Depends(get_db)):
    return create_project(project, db)

@app.delete('/projects/{project_id}')
def remove_project(project_id, db: Session = Depends(get_db)):
    return delete_project(project_id, db)

@app.patch('/projects/{project_id}')
def update_project(project_id, update_project: UpdateProject, db: Session = Depends(get_db)):
    return patch_project(project_id, update_project, db)

# --- TASKS ---

@app.get('/projects/{project_id}/tasks')
def get_tasks(project_id: int, db: Session = Depends(get_db)):
    return get_tasks_from_project(project_id, db)

@app.post('/projects/{project_id}/tasks')
def add_task(project_id: int, task: NewTask, db: Session = Depends(get_db)):
    return create_task(project_id, task, db)

@app.delete('/projects/{project_id}/tasks/{task_id}')
def remove_task(project_id: int, task_id: int, db: Session = Depends(get_db)):
    return delete_task(project_id, task_id, db)

@app.patch('/projects/{project_id}/tasks/{task_id}')
def update_task(project_id: int, task_id: int, task: UpdateTask, db: Session = Depends(get_db)):
    return patch_task(project_id, task_id, task, db)