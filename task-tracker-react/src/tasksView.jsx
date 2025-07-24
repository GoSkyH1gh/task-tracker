import { Link, useParams } from "react-router-dom"

function TasksView() {
  const params = useParams()
  const projectId = params.projectId
  return (
    <>
      <Link to='/'>Back to projects</Link>
      <p>This is the task view of project {projectId}</p>
    </>
  )
}

export default TasksView