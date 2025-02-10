import React, { ReactNode, useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose, children }) => {
  const [overlayStyles, setOverlayStyles] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const newWidth = Math.min(screenWidth - 20, 700); // Max width of 500px for better layout
      const newHeight = Math.min(screenHeight - 50, 700); // Max height with padding

      setOverlayStyles({ width: newWidth, height: newHeight });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-[3px] bg-black bg-opacity-50 z-50 flex justify-center items-center px-4 w-full"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg relative overflow-auto text-primary w-full"
        style={{
          width: overlayStyles?.width,
          maxHeight: overlayStyles?.height,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-black">
          <FaX onClick={onClose} />
        </div>
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
};

export default Overlay;
