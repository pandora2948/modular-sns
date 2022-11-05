import { useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFlip = () => setOpen((prev) => !prev);

  return {
    open,
    handleOpen,
    handleClose,
    handleFlip,
  };
};
