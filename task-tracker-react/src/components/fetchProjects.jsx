const baseUrl = import.meta.env.VITE_API_BASE_URL;

const fetchProjects = async (setProjects) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Not logged in");
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let projectsResponseRaw = await fetch(baseUrl + "projects", {
    headers: headers,
  });
  if (projectsResponseRaw.status === 401) {
    localStorage.removeItem("accessToken");
    throw new Error("Unauthorized");
  }
  let projectsResponse = await projectsResponseRaw.json();
  console.log(projectsResponse);
  setProjects(projectsResponse);
};

export default fetchProjects;
