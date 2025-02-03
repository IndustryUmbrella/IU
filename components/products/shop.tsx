import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Shop = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl text-white text-center">Total: 2000 $</h1>
        <div className="flex flex-row gap-x-2 items-center justify-center">
          <div className="bg-white flex items-center justify-center p-1 rounded">
            <FaPlus color="black" />
          </div>
          <div className="text-white text-lg">5</div>
          <div className="bg-white flex items-center justify-center p-1 rounded">
            <FaMinus />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
