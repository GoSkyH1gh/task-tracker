import { useState } from "react"
import ReusableDialog from "./reusableDialog"
import ProjectForm from "./projectForm"

function ProjectDialog({ ownerID, fetchProjects }) {
  const [open, setOpen] = useState(false);
  
  return (
    <ReusableDialog open={open} setOpen={setOpen} title={"Create Project"}>
      <ProjectForm 
        ownerID={ownerID}
        fetchProjects={fetchProjects}
        closeDialog={() => setOpen(false)}
      />
    </ReusableDialog>
  )
}

export default ProjectDialog