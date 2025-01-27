import React, { useState } from "react";

const Categories = () => {
  return (
    <div>
      <div className="border border-gray-600 rounded-3xl  bg-[#0C0C0C] py-1.5">
        <ul className="flex py-2 px-4  items-center justify-around categories text-[14px]">
          <li className="text-white px-3 py-2 bg-primary rounded-md">
            Home & Living
          </li>
          <li className="text-white px-3 py-2 bg-primary rounded-md">
            Jewerly & Accessories
          </li>
          <li className="text-white px-3 py-2 bg-primary rounded-md">
            Apperl & Wearables
          </li>
          <li className="text-white px-3 py-2 bg-primary rounded-md">
            Art & Collections
          </li>
          <li className="text-white px-3 py-2 bg-primary rounded-md">
            Gift & Seasonal Items
          </li>
          <li className="text-white px-3 py-2 bg-primary rounded-md">
            Beauty & Wellnes
          </li>
          <li className="text-white px-3 py-2 bg-primary rounded-md">
            Eco-Friendly Crafts
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
