import { useState, useEffect } from "react";
import "./App.css";
import ProjectCard from "./components/projectCard";
import ProjectDialog from "./components/projectDialog";

function App() {
  const loggedInUser = 1;
  const [projects, setProjects] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchProjects = async () => {
    let projectsResponseRaw = await fetch(baseUrl + "projects");
    let projectsResponse = await projectsResponseRaw.json();
    console.log(projectsResponse);
    setProjects(projectsResponse);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="content-container">
      <h2>Task tracker</h2>
      {projects.length > 0 && (
        <>
          <p>You have {projects.length} projects</p>
          <ProjectCard projects={projects} fetchProjects={fetchProjects} />
        </>
      )}
      {projects.length === 0 && <p>You have no projects</p>}
      <ProjectDialog ownerID={loggedInUser} fetchProjects={fetchProjects}/>
    </div>
  );
}

export default App;
