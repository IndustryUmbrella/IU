"use client";

import React, { useState, useEffect } from "react";
import PopUp from "./popUp";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { FaPencil, FaTrash } from "react-icons/fa6";
import Overlay from "./overlay";
import NewProductForm from "../dashboardTabAdmin/newProductForm";
import ConfirmationPrompt from "./confirmationPrompt";
import axios from "axios";
import { triggerRefresh } from "@/app/store/productSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  color: string;
  showThreeDots?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  color,
  showThreeDots = true,
}) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [confirmationPrompt, setConfirmationPrompt] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: false,
  });

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");

  useEffect(() => {
    if (data?.length > 0) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-300 h-10 w-full my-2 rounded"
          ></div>
        ))}
      </div>
    );
  }

  if (!data || data?.length === 0) {
    return <p className="text-black">No data available.</p>;
  }

  const showPopUp = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
    setIsPopUp(selectedId !== id);
  };

  const setDataAndShowOverlay = (data: any) => {
    setShowOverlay(true);
    setSelectedProduct(data);
  };

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setConfirmationPrompt(true);
  };

  const deleteProduct = async () => {
    if (!selectedProduct) {
      setShowNotification({
        isShow: true,
        content: "No product selected for deletion.",
        success: false,
      });
      return;
    }
    try {
      await axios.delete(
        `${baseUrl}/api/product/product/${selectedProduct.productId}`,
        {
          data: { seller_id: selectedProduct.seller_id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(triggerRefresh());
      setShowNotification({
        isShow: true,
        content: "Deleted successfully",
        success: true,
      });
      setConfirmationPrompt(false);
    } catch (error) {
      setShowNotification({
        isShow: true,
        content: "Error deleting product!",
        success: false,
      });
    }
  };

  return (
    <div>
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
          onConfirm={deleteProduct}
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
            {showThreeDots && (
              <th className="border p-2 bg-gray-200">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key} className="border p-2 text-center">
                  {column.render ? column.render(row) : row[column.key] || "-"}
                </td>
              ))}
              {showThreeDots && (
                <td className="border p-2 text-center relative">
                  <button onClick={() => showPopUp(index)}>
                    <PiDotsThreeOutlineVertical size={18} />
                  </button>

                  <div>
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
                            action: () => handleDeleteClick(row),
                          },
                        ]}
                        closePopUp={() => setIsPopUp(false)}
                      />
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
