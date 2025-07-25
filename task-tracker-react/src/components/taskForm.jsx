import { useState } from "react";

function TaskForm({ currentProject, fetchTasks, closeDialog }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To be done");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const requestBody = {
      title: title,
      description: description,
      status: status,
    };

    let submitResponseRaw = await fetch(
      baseUrl + "projects/" + currentProject + "/tasks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          Title
          <input
            type="text"
            className="title-input"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description (optional)
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>To be done</option>
            <option>In progress</option>
            <option>Done</option>
          </select>
        </label>
        <br />
        <div className="task-form-buttons">
          <button onClick={() => closeDialog()}>Cancel</button>
          <button className="success-button">Done</button>
        </div>
      </form>
    );
}

export default TaskForm