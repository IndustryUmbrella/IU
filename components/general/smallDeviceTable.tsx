import { formatDate } from "@/helper/dateFormatter";
import React, { useEffect, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import PopUp from "./popUp";
import ConfirmationPrompt from "./confirmationPrompt";
import axios from "axios";
import Notification from "./notification";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { triggerRefresh } from "@/app/store/productSlice";
import Overlay from "./overlay";
import Skeleton from "react-loading-skeleton";
import NewProductForm from "../dashboardTabAdmin/newProductForm";
import { FaPencil, FaTrash } from "react-icons/fa6";

const SmallDeviceTable = ({
  data,
  columns,
  expandableFields = [],
  showThreeDots = true,
}: {
  data: any[];
  columns: any[];
  expandableFields?: string[];
  showThreeDots?: boolean;
}) => {
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activePopUpIndex, setActivePopUpIndex] = useState<number | null>(null);
  const [confirmationPrompt, setConfirmationPrompt] = useState(false);
  const [productForDelete, setProductForDelete] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: false,
  });

  const [isPopUp, setIsPopUp] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (data?.length > 0) {
      setLoading(false);
    }
  }, [data]);
  const toggleDetails = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const showThePrompt = (product: any) => {
    setConfirmationPrompt(true);
    setProductForDelete(product);
    setActivePopUpIndex(null);
  };

  const deleteProduct = async () => {
    setActivePopUpIndex(null);
    if (!productForDelete) return;
    try {
      await axios.delete(
        `${baseUrl}/api/product/product/${productForDelete.productId}`,
        {
          data: { seller_id: productForDelete?.seller_id },
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
    } catch (error: any) {
      setShowNotification({
        isShow: true,
        content: "Error deleting product!",
        success: false,
      });
    }
  };
  const showUpdateOverlay = () => {
    setIsPopUp(false);
    setShowOverlay(false);
    setActivePopUpIndex(null);
  };

  const setDataAndShowOverlay = (data: any) => {
    setShowOverlay(true);
    setSelectedProduct(data);
    setActivePopUpIndex(null);
  };

  useEffect(() => {
    const notif = setTimeout(() => {
      setShowNotification({ isShow: false, content: "", success: true });
    }, 4000);
    return () => clearTimeout(notif);
  }, [showNotification]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-primary relative">
      {showOverlay && (
        <Overlay onClose={showUpdateOverlay} isOpen={showOverlay}>
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
          Are you sure you want to delete this product?
        </ConfirmationPrompt>
      )}

      {showNotification.isShow && <Notification {...showNotification} />}

      {data?.length > 0 ? (
        data?.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          const isPopUpOpen = activePopUpIndex === idx;

          return (
            <div key={idx} className="relative">
              {confirmationPrompt && (
                <ConfirmationPrompt
                  isOpen={confirmationPrompt}
                  onClose={() => setConfirmationPrompt(false)}
                  onConfirm={deleteProduct}
                >
                  Are you sure you want to delete this product?
                </ConfirmationPrompt>
              )}

              {showThreeDots && (
                <div>
                  <PiDotsThreeOutlineVertical
                    className="mb-2 float-right cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePopUpIndex(
                        activePopUpIndex === idx ? null : idx
                      );
                    }}
                  />

                  {isPopUpOpen && (
                    <PopUp
                      items={[
                        {
                          label: (
                            <div className="flex gap-2 items-center">
                              <FaPencil size={18} />
                              <p>Edit</p>
                            </div>
                          ),
                          action: () => setDataAndShowOverlay(item),
                        },
                        {
                          label: (
                            <div className="flex gap-2 items-center text-red-500">
                              <FaTrash size={18} />
                              <p>Delete</p>
                            </div>
                          ),
                          action: () => showThePrompt(item),
                        },
                      ]}
                      closePopUp={() => setIsPopUp(false)}
                    />
                  )}
                </div>
              )}

              <div
                className={`border border-white rounded-md p-2 text-white flex flex-col w-full transition-all duration-500 ${
                  isExpanded ? "max-h-[500px]" : "max-h-[140px]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className={`${showThreeDots ? "w-[200px]" : "w-full"}`}>
                    {columns.map(({ label, field, render }) => (
                      <p key={field}>
                        <strong>{label}:</strong>{" "}
                        {render ? render(item) : item[field]}
                      </p>
                    ))}
                  </div>
                  {showThreeDots && (
                    <div>
                      {item.productImage && item.productImage.length > 0 && (
                        <img
                          src={item.productImage[0]?.link}
                          className="w-[80px] h-[80px] rounded"
                          alt="Product"
                        />
                      )}
                    </div>
                  )}
                </div>

                {isExpanded && (
                  <div className="transition-opacity duration-500 opacity-100">
                    {expandableFields.map((field) => (
                      <p key={field}>
                        <strong>{field.replace(/([A-Z])/g, " $1")}:</strong>{" "}
                        {field === "createdAt"
                          ? formatDate(item[field])
                          : item[field]}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="absolute left-0 z-10 -bottom-4 w-6 h-6 flex items-center justify-center text-white"
                onClick={() => toggleDetails(idx)}
              >
                {isExpanded ? <BiUpArrow /> : <BiDownArrow />}
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-white text-xl">There is No data to show</p>
      )}
    </div>
  );
};

export default SmallDeviceTable;
