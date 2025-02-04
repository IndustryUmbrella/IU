"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Categories = ({
  activeTab,
  clickHandler,
  setActiveTab,
}: {
  activeTab: String;
  clickHandler: any;
  setActiveTab: any;
}) => {
  const router = useRouter();

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.push(`/products?tab=${newTab}`);
  };
  return (
    <>
      <div className="border border-gray-600 rounded-3xl mt-5 w-full bg-[#0C0C0C] py-1.5">
        <ul className="flex  gap-y-4 flex-row  flex-wrap py-2 gap-x-3 sm:px-4  items-center justify-center sm:justify-between  text-[14px]">
          <li
            className={`px-3 py-2  cursor-pointer ${
              activeTab === "all"
                ? "bg-[#191919] shadow-md shadow-gray-900 text-white rounded-md"
                : "bg-white text-black rounded-md"
            }`}
            onClick={() => handleTabChange("all")}
          >
            All
          </li>
          <li
            className={`px-3 py-2  cursor-pointer ${
              activeTab === "living"
                ? "bg-[#191919] shadow-md shadow-gray-900 text-white rounded-md"
                : "bg-white text-black rounded-md"
            }`}
            onClick={() => handleTabChange("living")}
          >
            Home & Living
          </li>
          <li
            className={`px-3 py-2  cursor-pointer ${
              activeTab == "jewerly"
                ? "bg-[#191919] shadow-md shadow-gray-900 text-white rounded-md"
                : "bg-white text-black rounded-md"
            }
            `}
            onClick={() => handleTabChange("jewerly")}
          >
            Jewerly & Accessories
          </li>
          <li
            className={`px-3 py-2 cursor-pointer ${
              activeTab == "apperel"
                ? "bg-[#191919] shadow-md shadow-gray-900 text-white rounded-md"
                : "bg-white text-black rounded-md"
            }
            `}
            onClick={() => handleTabChange("apperel")}
          >
            Apperl & Wearables
          </li>
          <li
            className={`px-3 py-2 cursor-pointer ${
              activeTab == "art"
                ? "bg-[#191919] shadow-md shadow-gray-900 text-white rounded-md"
                : "bg-white text-black rounded-md"
            }
            `}
            onClick={() => handleTabChange("art")}
          >
            Art & Collections
          </li>
          <li
            className={`px-3 py-2 cursor-pointer ${
              activeTab == "gift"
                ? "bg-[#191919] shadow-md shadow-gray-900 text-white rounded-md"
                : "bg-white text-black rounded-md"
            }
            `}
            onClick={() => handleTabChange("gift")}
          >
            Gift & Seasonal Items
          </li>
          <li
            className={`px-3 py-2 cursor-pointer ${
              activeTab == "beauty"
                ? "bg-[#191919] shadow-md shadow-gray-900 text-white rounded-md"
                : "bg-white text-black rounded-md"
            }
            `}
            onClick={() => handleTabChange("beauty")}
          >
            Beauty & Wellnes
          </li>
          <li
            className={`px-3 py-2 cursor-pointer ${
              activeTab == "crafts"
                ? "bg-[#191919] shadow-md shadow-gray-900 text-white rounded-md"
                : "bg-white text-black rounded-md"
            }
            `}
            onClick={() => handleTabChange("crafts")}
          >
            Handi Crafts
          </li>
        </ul>
      </div>
    </>
  );
};

export default Categories;
