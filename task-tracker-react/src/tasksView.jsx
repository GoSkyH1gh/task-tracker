import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskCard from "./components/taskCard";
import fetchProjects from "./components/fetchProjects";
import TaskDialog from "./components/taskDialog";

function TasksView() {
  const params = useParams();
  const projectId = params.projectId;

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

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
    fetchProjects(setProjects);
  }, []);

  let projectName;
  let projectDescription;
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == projectId) {
      projectName = projects[i].name;
      projectDescription = projects[i].description;
    }
  }

  return (
    <div className="content-container">
      <Link to="/">Back to projects</Link>
      <h2>{ projectName || <>Loading name...</> }</h2>
      <p>{ projectDescription || <>No description for this project</> }</p>
      <TaskCard tasks={tasks} fetchTasks={fetchTasks} />
      
      <TaskDialog currentProject={projectId} fetchTasks={fetchTasks} />
    </div>
  );
}

export default TasksView;
