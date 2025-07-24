import { useState, useEffect } from 'react'
import './App.css'
import ProjectCard from './components/projectCard'

function App() {
  const loggedInUser = 1
  const [projects, setProjects] = useState([])


  const baseUrl = "http://127.0.0.1:8000/"

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
    <>
      <h2>Task tracker</h2>
      {projects.length > 0 && (
        <>
          <p>You have {projects.length} projects</p>
          <ProjectCard projects={projects}/>
        </>
        )}
      {projects.length === 0 && (<p>You have no projects</p>)}
    </>
  )
}

export default App
