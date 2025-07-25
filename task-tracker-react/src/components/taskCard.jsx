import { MdDelete } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";

function TaskCard({ tasks, fetchTasks }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const deleteTask = async (taskId, projectId) => {
    let deleteResponseRaw = await fetch(
      baseUrl + "projects/" + projectId + "/tasks/" + taskId, {method: 'DELETE'}
    );
    let deleteResponse = await deleteResponseRaw.json();
    console.log(deleteResponse);
  };
  const mappedTasks = tasks.map((task) => {
    return (
      <AnimatePresence>
        <motion.li
          key={task.id}
          className="task-item"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          layout>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description || <>No description</>}</p>
            {task.status} - {task.created_at}
            <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ ease: "easeInOut", duration: 0.15 }}
              className="icon-button"
              onClick={ async () => {
                await deleteTask(task.id, task.project_id);
                fetchTasks();
              }}
            >
              <MdDelete className="icon" />
            </motion.button>
          </div>
        </motion.li>
      </AnimatePresence>
    );
  });
  return <ul className="task-list">{mappedTasks}</ul>;
}

export default TaskCard;
