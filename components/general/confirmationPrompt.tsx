import React, { ReactNode, useEffect, useState } from "react";
import Button from "./button";
import { FaCross, FaX } from "react-icons/fa6";

interface ConfirmationPromptProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  onConfirm: () => void;
}

const ConfirmationPrompt: React.FC<ConfirmationPromptProps> = ({
  isOpen,
  onClose,
  children,
  onConfirm,
}) => {
  const [ConfirmationPromptStyles, setConfirmationPromptStyles] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const newWidth = screenWidth - 100;
      const newHeight = screenHeight - 100;

      setConfirmationPromptStyles({ width: newWidth, height: newHeight });
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 backdrop-blur-[3px] backdrop:bg-black text-black bg-opacity-50 z-50 flex  justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6  rounded shadow-lg relative w-full max-w-[400px] h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="float-right block pb-10 cursor-pointer"
          onClick={onClose}
        >
          <FaX />
        </div>
        <div className="border-b-2 border-b-black w-full pb-5">{children}</div>
        <div className="flex  gap-x-4 mt-6">
          <Button
            size="md"
            type="primary"
            text="Cancel"
            clickHandler={onClose}
          />
          <Button
            size="md"
            type="secondary"
            text="Yes"
            clickHandler={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPrompt;
