"use client";

import React, { useState } from "react";
import PopUp from "./popUp";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { FaPencil, FaTrash } from "react-icons/fa6";
import Overlay from "./overlay";
import NewProductForm from "../dashboardTabAdmin/newProductForm";
import ConfirmationPrompt from "./confirmationPrompt";
import Notification from "./notification";
import Skeleton from "react-loading-skeleton";

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  color: String;
}

const Table: React.FC<TableProps> = ({ columns, data, color }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [confirmationPrompt, setConfirmationPrompt] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  if (!data || data.length === 0) {
    return <p className="text-black">No data available.</p>;
  }

  const showPopUp = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
    setIsPopUp(!isPopUp);
  };

  const setDataAndShowOverlay = (data: any) => {
    setShowOverlay(true);
    setSelectedProduct(data);
  };

  return (
    <div className="">
      {showOverlay && (
        <Overlay onClose={() => setShowOverlay(false)} isOpen={showOverlay}>
          <NewProductForm
            data={selectedProduct}
            setShowOverlay={setShowOverlay}
          />
        </Overlay>
      )}

      {confirmationPrompt && (
        <ConfirmationPrompt
          onClose={() => setConfirmationPrompt(false)}
          isOpen={confirmationPrompt}
          onConfirm={() => console.log("Delete confirmed")}
        >
          Would you like to delete this item?
        </ConfirmationPrompt>
      )}

      <table className={`text-${color} w-full border-collapse relative`}>
        <thead className="text-black">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="border p-2 bg-gray-200">
                {column.label}
              </th>
            ))}
            <th className="border p-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key} className="border p-2 text-center">
                  {column.render ? column.render(row) : row[column.key] || "-"}
                </td>
              ))}
              <td className="border p-2 text-center">
                <button onClick={() => showPopUp(index)}>
                  <PiDotsThreeOutlineVertical size={18} />
                </button>
                {index === selectedId && isPopUp && (
                  <PopUp
                    items={[
                      {
                        label: (
                          <div className="flex gap-2 items-center">
                            <FaPencil size={18} />
                            <p>Edit</p>
                          </div>
                        ),
                        action: () => setDataAndShowOverlay(row),
                      },
                      {
                        label: (
                          <div className="flex gap-2 items-center text-red-500">
                            <FaTrash size={18} />
                            <p>Delete</p>
                          </div>
                        ),
                        action: () => setConfirmationPrompt(true),
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
