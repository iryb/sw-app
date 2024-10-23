import { useState } from "react";

export const useModal = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = () => {
    setIsOpened(!isOpened);
  };

  return { isOpened, handleClose };
};
