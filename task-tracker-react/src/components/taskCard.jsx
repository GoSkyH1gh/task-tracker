import { AnimatePresence, motion } from "motion/react";
import ConfirmDeleteDialog from "./confirmDeleteDialog";
import getReadableDate from "./formatDates";
import EditTaskDialog from "./editTaskDialog";

function TaskCard({ tasks, fetchTasks }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Not logged in")
      window.location.href = "/login";
      return
    }

    const headers = {
        'Authorization': `Bearer ${token}`
    }

  const deleteTask = async (taskId, projectId) => {
    let deleteResponseRaw = await fetch(
      baseUrl + "projects/" + projectId + "/tasks/" + taskId,
      { method: "DELETE", headers: headers }
    );
    let deleteResponse = await deleteResponseRaw.json();
    console.log(deleteResponse);
    fetchTasks();
  };
  const mappedTasks = tasks.map((task) => {
    return (
        <motion.li
          key={task.id}
          className="task-item"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          layout
        >
          <div>
            <h3>{task.title}</h3>
            <p>{task.description || <>No description</>}</p>
            {task.status} - {getReadableDate(task.created_at)}
            <div className="action-buttons-container">
              <ConfirmDeleteDialog
                functionToExecute={() => deleteTask(task.id, task.project_id)}
            />
              <EditTaskDialog taskToEdit={task} fetchTasks={fetchTasks}/>
            </div>
          </div>
        </motion.li>
    );
  });
  return (<AnimatePresence><ul className="task-list">{mappedTasks}</ul></AnimatePresence>);
}

export default TaskCard;
