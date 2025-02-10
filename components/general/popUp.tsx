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
      className="absolute top-12 right-0 bg-white rounded-md shadow-lg w-48 p-2 z-[100000]"
      onClick={(e) => e.stopPropagation()}
    >
      {items?.map((item, index) => (
        <div
          key={index}
          className="py-2 px-4 text-black hover:bg-gray-100 cursor-pointer border-b last:border-none"
          onClick={() => {
            item?.action();
            closePopUp();
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default PopUp;
