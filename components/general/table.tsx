"use client";

import React, { useEffect, useRef, useState } from "react";
import Image1 from "../../public/images/image1.png";
import Image from "next/image";
import PopUp from "./popUp";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { FaDeleteLeft, FaPencil, FaTrash } from "react-icons/fa6";
import Overlay from "./overlay";
import NewProductForm from "../dashboardTabAdmin/newProductForm";
import ConfirmationPrompt from "./confirmationPrompt";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "@/app/store/productSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TableProps {
  columns: string[];
  data: any;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [confirmationPrompt, setConfirmationPrompt] = useState<boolean>(false);
  const dispatch = useDispatch();

  let [productForDelete, setProductForDelete] = useState<any>("");
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const popUpRef = useRef<HTMLDivElement>(null);
  const token = Cookies.get("authToken");

  if (data?.length === 0) {
    return <p className="text-black">No data available.</p>;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const showPopUp = (id: any) => {
    if (selectedId === id) {
      setIsPopUp(false);
      setSelectedId(null);
    } else {
      setSelectedId(id);
      setIsPopUp(true);
    }
  };

  const setDataAndShowOverlay = (data: any) => {
    setShowOverlay(true);
    setSelectedProduct(data);
  };

  const showThePrompt = (data: any) => {
    setConfirmationPrompt(true);

    setProductForDelete(data);
  };
  const deleteaProduct = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/product/product/${productForDelete?.productId}`,
        {
          data: { seller_id: productForDelete?.seller_id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(triggerRefresh());
      setConfirmationPrompt(false);
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (
  //       popUpRef.current &&

  //     ) {
  //       setIsPopUp(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [showPopUp]);

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
          onConfirm={() => deleteaProduct()}
        >
          Would You like to delete this product?
        </ConfirmationPrompt>
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
          {/* <tr>
            {Array.from({length:3},(_,index) => {

            })}
          </tr> */}
          {data?.length == 0 || data == undefined
            ? Array.from({ length: 4 }, (_, idx) => {
                return (
                  <tr className="" key={idx}>
                    {Array.from({ length: 4 }, (_, idx) => {
                      return (
                        <td key={idx}>
                          <div>
                            {idx == 0 && (
                              <div className="flex flex-row items-center gap-x-3 w-full px-2">
                                <Skeleton
                                  className="rounded"
                                  width={40}
                                  height={40}
                                  baseColor="darkgrey"
                                />
                                <div className="flex flex-col  items-start justify-center pt-3 px-2 ">
                                  <Skeleton
                                    className="rounded "
                                    height={15}
                                    width={145}
                                    baseColor="darkgrey"
                                  />
                                  <Skeleton
                                    className="rounded"
                                    width={60}
                                    height={10}
                                    baseColor="darkgrey"
                                  />
                                </div>
                              </div>
                            )}
                            {idx > 0 && (
                              <Skeleton
                                width={145}
                                className=""
                                baseColor="darkgrey"
                                highlightColor="#090909"
                              />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : data?.map((row: any, index: number) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <div className="flex gap-x-2 items-center">
                      <img
                        src={row?.productImage[0]?.link || Image1}
                        alt={`Product `}
                        className="w-[40px] h-[40px] object-center rounded-md"
                        width={40}
                        height={40}
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
                    Active
                  </td>
                  <td
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                    className="relative"
                  >
                    <p
                      className="font-bold text-center flex items-center justify-center cursor-pointer"
                      onClick={() => showPopUp(index)}
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
                              <div
                                className="flex flex-row gap-x-2 items-center"
                                onClick={() => showThePrompt(row)}
                              >
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
