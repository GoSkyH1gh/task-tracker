import { Link } from "react-router-dom"


function ProjectCard({ projects }) {
  const mappedProjects = projects.map((project) => 
    <li className="project-item" key={project.id}>
      <Link to={`/projects/${project.id}`}>
        <div>
          {project.name}<br/>{project.description}
        </div>
      </Link>
    </li>
    )
  return (
    <ul className="project-list">{mappedProjects}</ul>
  )
}

export default ProjectCard
