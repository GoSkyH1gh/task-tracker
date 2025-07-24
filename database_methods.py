from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from models import Project
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
    