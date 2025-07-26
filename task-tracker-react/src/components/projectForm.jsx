import { useState } from "react";

function TaskForm({ ownerID, fetchProjects, closeDialog, setProjects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const requestBody = {
      name: title,
      description: description,
      owner_id: ownerID,
    };

    let submitResponseRaw = await fetch(
      baseUrl + "projects",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    let submitResponse = await submitResponseRaw.json();
    console.log(submitResponse);
    fetchProjects(setProjects);
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
        <br />
        <div className="task-form-buttons">
          <button onClick={() => closeDialog()}>Cancel</button>
          <button className="success-button">Done</button>
        </div>
      </form>
    );
}

export default TaskForm