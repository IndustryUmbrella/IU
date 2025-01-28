import React from "react";

interface PopUpItem {
  label: any;
  action: () => void;
}

interface PopUpProps {
  items: PopUpItem[];
  closePopUp: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ items, closePopUp }) => {
  return (
    <div
      className="absolute top-12 right-0 bg-white rounded-md shadow-lg w-48 p-2 z-50"
      onClick={(e) => e.stopPropagation()} // Prevent closing pop-up on click inside
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="py-2 px-4 text-black hover:bg-gray-100 cursor-pointer border-b last:border-none"
          onClick={() => {
            item.action();
            closePopUp(); // Close the pop-up after clicking an option
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default PopUp;
