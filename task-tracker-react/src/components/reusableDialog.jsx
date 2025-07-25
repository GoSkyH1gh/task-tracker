import * as Dialog from '@radix-ui/react-dialog';
import "./dialog.css";
import { useState } from "react";

function ReusableDialog({ open, setOpen, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button>{title}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description />
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ReusableDialog;
