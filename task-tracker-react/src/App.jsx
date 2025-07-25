import { useState, useEffect } from "react";
import "./App.css";
import ProjectCard from "./components/projectCard";

function App() {
  const loggedInUser = 1;
  const [projects, setProjects] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function getProjects() {
      let projectsResponseRaw = await fetch(baseUrl + "projects");
      let projectsResponse = await projectsResponseRaw.json();
      console.log(projectsResponse);
      setProjects(projectsResponse);
    }
    getProjects();
  }, []);

  return (
    <div className="content-container">
      <h2>Task tracker</h2>
      {projects.length > 0 && (
        <>
          <p>You have {projects.length} projects</p>
          <ProjectCard projects={projects} />
        </>
      )}
      {projects.length === 0 && <p>You have no projects</p>}
    </div>
  );
}

export default App;
