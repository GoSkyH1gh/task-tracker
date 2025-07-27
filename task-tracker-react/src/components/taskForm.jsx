import { useState } from "react";

function TaskForm({ currentProject, fetchTasks, closeDialog }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To be done");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const token = localStorage.getItem("accessToken");

    if (!token) {
        console.error("Not logged in")
        return
    }

    const requestBody = {
      title: title,
      description: description,
      status: status,
    };

    let submitResponseRaw = await fetch(
      baseUrl + "projects/" + currentProject + "/tasks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(requestBody),
      }
    );

    let submitResponse = await submitResponseRaw.json();
    console.log(submitResponse);
    fetchTasks();
    closeDialog();
  };

  return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Title<br/>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          <div className="label-row">Description <span className="label-optional">optional</span></div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>Status <br />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>To be done</option>
            <option>In progress</option>
            <option>Done</option>
          </select>
        </label>
        <br />
        <div className="task-form-buttons">
          <button onClick={() => closeDialog()} type="button">Cancel</button>
          <button className="success-button">Done</button>
        </div>
      </form>
    );
}

export default TaskForm