import React, { ReactNode, useEffect, useState } from "react";
import Button from "./button";
import { FaCross, FaX } from "react-icons/fa6";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  onConfirm: () => void;
}

const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  onClose,
  children,
  onConfirm,
}) => {
  const [overlayStyles, setOverlayStyles] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const newWidth = screenWidth - 100;
      const newHeight = screenHeight - 100;

      setOverlayStyles({ width: newWidth, height: newHeight });
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 backdrop-blur-[3px] backdrop:bg-black text-black bg-opacity-50 z-50 flex  justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg relative w-auto h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="float-right block pb-10 cursor-pointer"
          onClick={onClose}
        >
          <FaX />
        </div>
        <div className="text-center">{children}</div>
        <div className="flex justify-evenly mt-4"></div>
      </div>
    </div>
  );
};

export default Overlay;
