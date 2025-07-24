from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from models import Project, Task
from datetime import datetime

class NewProject(BaseModel):
    name: str
    description: Optional[str]
    owner_id: int

class ExistingProject(BaseModel):
    id: int
    name: str
    description: Optional[str]
    owner_id: int
    created_at: datetime

class NewTask(BaseModel):
    title: str
    description: Optional[str]
    status: str

def create_project(project: NewProject, db: Session):
    try:
        db.add(Project(
            name=project.name,
            description=project.description,
            owner_id=project.owner_id,
        ))
        db.commit()
        return {
            "message": f"Project {project.name} created successfully!"
        }
    except Exception as e:
        print(f"Something went wrong when creating project {project.name}: {e}")
        db.rollback()
        return {
            "error": f"Project could not be created"
        }

def get_tasks_from_project(id: int, db: Session):
    return db.query(Task).filter(Task.project_id == id).all()

def create_task(project_id, task: NewTask, db: Session):
    try:
        db.add(Task(
            title=task.title,
            description=task.description,
            project_id=project_id,
            status=task.status
        ))
        db.commit()
        return {
                "message": f"Task {task.title} created successfully!"
            }
    except Exception as e:
        print(f"Something went wrong when creating task {task.title}: {e}")
        db.rollback()
        return {
            "error": f"Task could not be created"
        }

def delete_task(project_id: int, task_id: int, db: Session):
    task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if task:
        db.delete(task)
        db.commit()
        return {
            "message": f"task {task_id} was deleted successfully"
        }
    else:
        return {
            "error": f"task {task_id} not found"
        }
    
def delete_project(project_id: int, db: Session):
    project = db.query(Project).filter(Project.id == project_id).first()
    if project:
        db.delete(project)
        db.commit()
        return {
            "message": f"project {project_id} was deleted successfully"
        }
    else:
        return {
            "error": f"project {project_id} not found"
        }