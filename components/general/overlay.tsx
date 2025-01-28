import React, { ReactNode, useEffect, useState } from "react";

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
      // Get screen dimensions and calculate the size for the overlay
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Subtract 50px from both width and height
      const newWidth = screenWidth - 200;
      const newHeight = screenHeight - 200;

      setOverlayStyles({ width: newWidth, height: newHeight });
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render the overlay if it's not open

  return (
    <div
      className="fixed inset-0 backdrop-blur-[2px] text-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg relative"
        style={{
          width: overlayStyles?.width || "auto",
          height: overlayStyles?.height || "auto",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the overlay
      >
        <div className="text-center">{children}</div>
        <div className="flex justify-evenly mt-4">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-black px-6 py-2 rounded"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
