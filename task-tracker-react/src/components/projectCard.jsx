import { Link } from "react-router-dom";
import ConfirmDeleteDialog from "./confirmDeleteDialog";
import EditProjectDialog from "./editProjectDialog";

function ProjectCard({ projects, fetchProjects, setProjects }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

    if (!token) {
        console.error("Not logged in")
        return
    }

    const headers = {
        'Authorization': `Bearer ${token}`
    }

  const deleteProject = async (projectID) => {
    let deleteProjectResponseRaw = await fetch(baseUrl + 'projects/' + projectID, {method: "DELETE", headers: headers});
    let deleteProjectResponse = await deleteProjectResponseRaw.json();
    console.log(deleteProjectResponse);
    fetchProjects(setProjects);
  }

  const mappedProjects = projects.map((project) => 
    <li className="project-item" key={project.id}>
      <Link to={`/projects/${project.id}`}>
        <div>
          <h3>{project.name}</h3>
          <p>{project.description || <>No description</>}</p>
        </div>
      </Link>
      <div className="action-buttons-container">
        <ConfirmDeleteDialog functionToExecute={() => deleteProject(project.id)} />
        <EditProjectDialog projectToEdit={project} fetchProjects={fetchProjects} setProjects={ setProjects } />
      </div>
    </li>
    )
  return (
    <ul className="project-list">{mappedProjects}</ul>
  )
}

export default ProjectCard
