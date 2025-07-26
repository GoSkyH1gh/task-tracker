from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from models import Project, Task
from datetime import datetime
from fastapi import HTTPException

class NewProject(BaseModel):
    name: str
    description: Optional[str]

class UpdateTask(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class UpdateProject(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class NewTask(BaseModel):
    title: str
    description: Optional[str]
    status: str

def create_project(project: NewProject, db: Session, current_user):
    try:
        db.add(Project(
            name=project.name,
            description=project.description,
            owner_id=current_user.id,
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

def get_tasks_from_project(id: int, db: Session, current_user):
    return db.query(Task)\
            .join(Project)\
            .filter(Task.project_id == id)\
            .filter(Project.owner_id == current_user.id)\
            .all()

def create_task(project_id, task: NewTask, db: Session, current_user):
    try:
        project = db.query(Project).filter(Project.id == project_id).first()
        if project is not None:
            if project.owner_id != current_user.id:
                return {"error": "Not authorized to access project"}
        else:
            return {"error": "Project not found"}
            
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

def delete_task(project_id: int, task_id: int, db: Session, current_user):
    task = db.query(Task)\
        .join(Project)\
        .filter(Task.id == task_id, Task.project_id == project_id, Project.owner_id == current_user.id)\
        .first()
    
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
    
def delete_project(project_id: int, db: Session, current_user):
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == current_user.id).first()
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

def patch_task(project_id: int, task_id: int, update_data: UpdateTask, db: Session, current_user):
    task = db.query(Task)\
        .join(Project)\
        .filter(Task.id == task_id, Task.project_id == project_id, Project.owner_id == current_user.id)\
        .first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if update_data.title is not None:
        task.title = update_data.title
    if update_data.description is not None:
        task.description = update_data.description
    if update_data.status is not None:
        task.status = update_data.status

    db.commit()
    db.refresh(task)

    return {
        "message": f"Updated task {task_id} successfully",
        "updated_task": task
    }

def patch_project(project_id: int, update_data: UpdateProject, db: Session, current_user):
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if update_data.name is not None:
        project.name = update_data.name
    if update_data.description is not None:
        project.description = update_data.description

    db.commit()
    db.refresh(project)

    return {
        "message": f"Updated project {project_id} successfully",
        "updated_project": project    
    }