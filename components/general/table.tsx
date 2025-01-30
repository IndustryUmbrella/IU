"use client";

import React, { useEffect, useRef, useState } from "react";
import Image1 from "../../public/images/image1.png";
import Image from "next/image";
import PopUp from "./popUp";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { FaDeleteLeft, FaPencil, FaTrash } from "react-icons/fa6";
import Overlay from "./overlay";
import NewProductForm from "../dashboardTabAdmin/newProductForm";

interface TableProps {
  columns: string[]; // Array of column names
  data: any[]; // Array of objects representing rows
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const popUpRef = useRef<HTMLDivElement>(null); // Ref to track the pop-up container

  if (data?.length === 0) {
    return <div>No data available.</div>;
  }
  // console.log(data, "DDDDDDDDDDDDDD");
  const [activeStates, setActiveStates] = useState<boolean[]>(
    data?.map((item) => item.isActive)
  );

  // const handleToggle = (index: number) => {
  //   const newActiveStates = [...activeStates];
  //   newActiveStates[index] = !newActiveStates[index];
  //   setActiveStates(newActiveStates);
  // };
  const showPopUp = (id: any) => {
    if (selectedId === id) {
      // If the same item is clicked again, close it
      setIsPopUp(false);
      setSelectedId(null);
    } else {
      // Open the PopUp for the new item
      setSelectedId(id);
      setIsPopUp(true);
    }
  };

  const setDataAndShowOverlay = (data: any) => {
    setShowOverlay(true);
    setSelectedProduct(data);
    console.log(data, "dddd");
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popUpRef.current &&
        !popUpRef.current.contains(event.target as Node)
      ) {
        setIsPopUp(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      {showOverlay && (
        <Overlay
          onClose={() => setShowOverlay(false)}
          isOpen={showOverlay}
          onConfirm={() => alert("ok")}
        >
          <NewProductForm
            data={selectedProduct}
            setShowOverlay={setShowOverlay}
          />
        </Overlay>
      )}
      <table
        className="text-black"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            {columns?.map((column) => (
              <th
                key={column}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                {column.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <div className="flex gap-x-2 items-center">
                  <Image
                    src={Image1}
                    alt={`Product `}
                    className="w-[40px] h-[40px] object-center rounded-md"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="truncate w-16 sm:w-24 md:w-32 lg:w-full">
                      {row?.productDescription}
                    </p>
                    {row?.productName}
                  </div>
                </div>
              </td>
              <td className="border border-[#ddd] p-[8px] text-center">
                {row.productPrice}
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "8px" }}
                className="text-center"
              >
                {/* <button
                  onClick={() => handleToggle(index)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: activeStates[index] ? "green" : "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {activeStates[index] ? "Active" : "Inactive"}
                </button> */}
                Active
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "8px" }}
                className="relative"
              >
                <p
                  className="font-bold text-center flex items-center justify-center cursor-pointer"
                  onClick={() => showPopUp(index)}
                  // ref={popUpRef}
                >
                  <PiDotsThreeOutlineVertical size={18} />
                </p>
                {index == selectedId && isPopUp && (
                  <PopUp
                    items={[
                      {
                        label: (
                          <div className="flex flex-row gap-x-2 items-center">
                            <FaPencil size={18} />
                            <p className="">Edit</p>
                          </div>
                        ),
                        action: () => setDataAndShowOverlay(row),
                      },
                      {
                        label: (
                          <div className="flex flex-row gap-x-2 items-center">
                            <FaTrash color="red" size={18} />
                            <p className="">Delete</p>
                          </div>
                        ),
                        action: () => {},
                      },
                    ]}
                    closePopUp={() => setIsPopUp(false)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
