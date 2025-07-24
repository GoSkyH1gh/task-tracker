function TaskCard({ tasks }) {
  const mappedTasks = tasks.map((task) => {
    return (
      <li key={task.id} className="task-item">
        <div>
          <h3>{task.title}</h3>
          <p>
            {task.description || <>No description</>}
          </p>
          {task.status} - {task.created_at}
        </div>
      </li>
    )
  })
  return (
    <ul className="task-list">{mappedTasks}</ul>
  )
}

export default TaskCard