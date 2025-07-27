import { useState } from "react"
import ReusableDialog from "./reusableDialog"
import ProjectForm from "./projectForm"

function ProjectDialog({ fetchProjects, setProjects }) {
  const [open, setOpen] = useState(false);
  
  return (
    <ReusableDialog open={open} setOpen={setOpen} title={"Create Project"}>
      <ProjectForm 
        fetchProjects={fetchProjects}
        closeDialog={() => setOpen(false)}
        setProjects={setProjects}
      />
    </ReusableDialog>
  )
}

export default ProjectDialog