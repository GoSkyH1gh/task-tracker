import { useState, useEffect } from "react";
import "./App.css";
import ProjectCard from "./components/projectCard";
import ProjectDialog from "./components/projectDialog";
import fetchProjects from "./components/fetchProjects";

function App() {
  const loggedInUser = 1;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects(setProjects);
  }, []);

  return (
    <div className="content-container">
      <h2>Task tracker</h2>
      {projects.length > 0 && (
        <>
          <p>You have {projects.length} projects</p>
          <ProjectCard projects={projects} fetchProjects={fetchProjects} setProjects={setProjects} />
        </>
      )}
      {projects.length === 0 && <p>You have no projects</p>}
      <ProjectDialog ownerID={loggedInUser} fetchProjects={fetchProjects} setProjects={setProjects} />
    </div>
  );
}

export default App;
