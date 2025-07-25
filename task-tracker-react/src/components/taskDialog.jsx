import { useState } from "react"
import ReusableDialog from "./newTaskDialog"
import TaskForm from "./taskForm"

function TaskDialog({ currentProject, fetchTasks }) {
  const [open, setOpen] = useState(false);
  
  return (
    <ReusableDialog open={open} setOpen={setOpen} title={"Create Task"}>
      <TaskForm 
        currentProject={currentProject}
        fetchTasks={fetchTasks}
        closeDialog={() => setOpen(false)}
      />
    </ReusableDialog>
  )
}

export default TaskDialog