import * as Dialog from '@radix-ui/react-dialog';
import { MdDelete } from "react-icons/md";
import { motion } from "motion/react";
import "./dialog.css"

function ConfirmDeleteDialog({ functionToExecute }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ ease: "easeInOut", duration: 0.15 }}
              className="icon-button"
            >
              <MdDelete className="icon" />
            </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title>Are you sure you want to delete this permanently?</Dialog.Title>
          <Dialog.Description>This cannot be undone</Dialog.Description>
          <div className="task-form-buttons">
            <Dialog.Close asChild>
              <button>Cancel</button>
            </Dialog.Close>
              <button className="delete-button" onClick={() => functionToExecute()}>Delete</button>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 

export default ConfirmDeleteDialog;