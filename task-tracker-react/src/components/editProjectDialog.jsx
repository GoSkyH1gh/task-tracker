import { MdEdit } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import "./dialog.css";
import { useState } from "react";
import { motion } from "motion/react";

function EditProjectDialog({ projectToEdit, fetchProjects, setProjects }) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(projectToEdit.name);
  const [description, setDescription] = useState(projectToEdit.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem("accessToken");

    if (!token) {
        console.error("Not logged in")
        return
    }

    const responseBody = {
      name: name,
      description: description,
    };
    let updateProjectResponseRaw = await fetch(
      baseUrl + "projects/" + projectToEdit.id,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(responseBody),
      }
    );
    let updateProjectResponse = await updateProjectResponseRaw.json();
    console.log(updateProjectResponse);
    fetchProjects(setProjects);
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
          <Dialog.Title>Edit your project</Dialog.Title>
          <Dialog.Description />
          <form onSubmit={handleSubmit}>
            <label>
              Title
              <br />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <div className="task-form-buttons">
            <Dialog.Close asChild><button type="button">Cancel</button></Dialog.Close>
            <button className="success-button">Save</button>
          </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default EditProjectDialog;
