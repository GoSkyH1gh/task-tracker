const baseUrl = import.meta.env.VITE_API_BASE_URL;

const fetchProjects = async (setProjects) => {
    let projectsResponseRaw = await fetch(baseUrl + "projects");
    let projectsResponse = await projectsResponseRaw.json();
    console.log(projectsResponse);
    setProjects(projectsResponse);
}
  
export default fetchProjects