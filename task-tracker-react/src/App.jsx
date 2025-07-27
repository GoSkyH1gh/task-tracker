import { useState, useEffect } from "react";
import "./App.css";
import ProjectCard from "./components/projectCard";
import ProjectDialog from "./components/projectDialog";
import fetchProjects from "./components/fetchProjects";
import { useAuth } from "./context/authContext";
import { useNavigate } from "react-router-dom";

function App() {
  const [projects, setProjects] = useState([]);

  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects(setProjects);
  }, []);

  return (
    <div className="content-container">
      <h2>Task tracker</h2>
      <p>You are currently logged in</p>
      <button
        onClick={() => {
          setToken(null);
          navigate("/login");
        }}
      >
        Log out
      </button>
      {projects.length > 0 && (
        <>
          <p>You have {projects.length} projects</p>
          <ProjectCard
            projects={projects}
            fetchProjects={fetchProjects}
            setProjects={setProjects}
          />
        </>
      )}
      {projects.length === 0 && <p>You have no projects</p>}
      <ProjectDialog
        fetchProjects={fetchProjects}
        setProjects={setProjects}
      />
    </div>
  );
}

export default App;
