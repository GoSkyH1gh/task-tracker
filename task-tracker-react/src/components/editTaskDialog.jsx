import { MdEdit } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import "./dialog.css";
import { useState } from "react";
import { motion } from "motion/react";

function EditTaskDialog({ taskToEdit, fetchTasks }) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(taskToEdit.title);
  const [description, setDescription] = useState(taskToEdit.description);
  const [status, setStatus] = useState(taskToEdit.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
        console.error("Not logged in")
        return
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const responseBody = {
      title: title,
      description: description,
      status: status,
    };
    let updateTaskResponseRaw = await fetch(
      baseUrl + "projects/" + taskToEdit.project_id + "/tasks/" + taskToEdit.id,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(responseBody),
      }
    );
    let updateTaskResponse = await updateTaskResponseRaw.json();
    console.log(updateTaskResponse);
    fetchTasks();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
          className="icon-button"
        >
          <MdEdit className="icon" />
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title>Edit your task</Dialog.Title>
          <Dialog.Description />
          <form onSubmit={handleSubmit}>
            <label>
              Title
              <br />
              <input
                type="text"
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
            <label>
              Status <br />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>To be done</option>
                <option>In progress</option>
                <option>Done</option>
              </select>
            </label>
            <div className="task-form-buttons">
            <Dialog.Close>Cancel</Dialog.Close>
            <button className="success-button">Save</button>
          </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default EditTaskDialog;
