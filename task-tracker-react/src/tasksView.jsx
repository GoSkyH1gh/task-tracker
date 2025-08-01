import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskCard from "./components/taskCard";
import fetchProjects from "./components/fetchProjects";
import TaskDialog from "./components/taskDialog";
import { useNavigate } from "react-router-dom";

function TasksView() {
  const params = useParams();
  const projectId = params.projectId;

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Not logged in");
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let tasksResponseRaw = await fetch(
      baseUrl + "projects/" + projectId + "/tasks",
      { headers: headers }
    );

    if (tasksResponseRaw.status === 401) {
      localStorage.removeItem("accessToken");
      navigate("/login");
      throw new Error("Unauthorized");
    }

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
      <h2>{projectName || <>Loading name...</>}</h2>
      <p>{projectDescription || <>No description for this project</>}</p>
      <TaskCard tasks={tasks} fetchTasks={fetchTasks} />

      <TaskDialog currentProject={projectId} fetchTasks={fetchTasks} />
    </div>
  );
}

export default TasksView;
