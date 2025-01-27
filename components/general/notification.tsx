import React from "react";

const Notification = ({
  isShow,
  content,
  success,
}: {
  isShow: Boolean;
  content: any;
  success: Boolean;
}) => {
  return (
    <div
      className={`fixed  top-0 left-0 w-full z-[10000000] transition-transform duration-500 ease-in-out ${
        isShow ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`w-full h-10 ${
          success ? "bg-green-500" : "bg-red-500"
        } bg-opacity-85 backdrop-blur-sm flex items-center justify-center text-white`}
      >
        {content}
      </div>
    </div>
  );
};

export default Notification;
