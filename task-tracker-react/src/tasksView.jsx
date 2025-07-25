import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskCard from "./components/taskCard";

function TasksView() {
  const params = useParams();
  const projectId = params.projectId;
  const [tasks, setTasks] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchTasks = async () => {
    let tasksResponseRaw = await fetch(
      baseUrl + "projects/" + projectId + "/tasks"
    );
    let tasksResponse = await tasksResponseRaw.json();

    console.log(tasksResponse);
    setTasks(tasksResponse);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Link to="/">Back to projects</Link>
      <p>This is the task view of project {projectId}</p>
      <TaskCard tasks={ tasks } fetchTasks={ fetchTasks } />
    </>
  );
}

export default TasksView;
