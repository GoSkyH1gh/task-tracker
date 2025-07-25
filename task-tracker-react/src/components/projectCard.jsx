import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { motion } from "motion/react";

function ProjectCard({ projects, fetchProjects }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const deleteProject = async (projectID) => {
    let deleteProjectResponseRaw = await fetch(baseUrl + 'projects/' + projectID, {method: "DELETE"});
    let deleteProjectResponse = await deleteProjectResponseRaw.json();
    console.log(deleteProjectResponse);
    fetchProjects();
  }

  const mappedProjects = projects.map((project) => 
    <li className="project-item" key={project.id}>
      <Link to={`/projects/${project.id}`}>
        <div>
          <h3>{project.name}</h3>
          <p>{project.description || <>No description</>}</p>
        </div>
      </Link>
      <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ ease: "easeInOut", duration: 0.15 }}
        onClick={() => deleteProject(project.id)}
        className="icon-button">
        <MdDelete className="icon"/>
      </motion.button>
    </li>
    )
  return (
    <ul className="project-list">{mappedProjects}</ul>
  )
}

export default ProjectCard
