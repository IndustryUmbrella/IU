import { formatDate } from "@/helper/dateFormatter";
import React, { useEffect, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import PopUp from "./popUp";
import { FaPencil, FaTrash } from "react-icons/fa6";
import ConfirmationPrompt from "./confirmationPrompt";
import axios from "axios";
import Notification from "./notification";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { triggerRefresh } from "@/app/store/productSlice";
import Overlay from "./overlay";
import NewProductForm from "../dashboardTabAdmin/newProductForm";
import Skeleton from "react-loading-skeleton";

const SmallDeviceTable = ({ data, columns }: { data: any; columns: any }) => {
  const dispatch = useDispatch();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const token = Cookies.get("authToken");

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [activePopUpIndex, setActivePopUpIndex] = useState(null);
  const [confirmationPrompt, setConfirmationPrompt] = useState(false);
  const [productForDelete, setProductForDelete] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: false,
  });

  const toggleDetails = (idx: any) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const togglePopUp = (idx: any) => {
    setActivePopUpIndex(activePopUpIndex === idx ? null : idx);
  };

  const showThePrompt = (product: any) => {
    setConfirmationPrompt(true);
    setProductForDelete(product);
  };

  const deleteProduct = async () => {
    if (!productForDelete) return;
    setLoading(true);
    try {
      await axios.delete(
        `${baseUrl}/api/product/product/${productForDelete.productId}`,
        {
          data: { seller_id: productForDelete.seller_id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(triggerRefresh());
      setShowNotification({
        isShow: true,
        content: "Product Deleted Successfully",
        success: true,
      });
      setConfirmationPrompt(false);
    } catch (error: any) {
      setShowNotification({
        isShow: true,
        content: error?.message || "Error deleting product, please try again!",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const setDataAndShowOverlay = (data: any) => {
    setShowOverlay(true);
    setSelectedProduct(data);
  };

  useEffect(() => {
    const notif = setTimeout(() => {
      setShowNotification({
        isShow: false,
        content: "",
        success: true,
      });
    }, 4000);
    return () => clearTimeout(notif);
  }, [showNotification]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-primary relative">
      {showNotification.isShow && (
        <Notification
          isShow={showNotification.isShow}
          content={showNotification.content}
          success={showNotification.success}
        />
      )}
      {showOverlay && (
        <Overlay onClose={() => setShowOverlay(false)} isOpen={showOverlay}>
          <NewProductForm
            data={selectedProduct}
            setShowOverlay={setShowOverlay}
          />
        </Overlay>
      )}
      {data?.length > 0 ? (
        <div>
          {Array.from({ length: 4 }, (_, idx) => {
            return (
              <div
                className="bg-primary rounded-md w-auto h-full border border-white px-2 flex gap-x-4  justify-between py-2"
                key={idx}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex gap-x-2 items-center ">
                    <Skeleton
                      height={30}
                      width={100}
                      baseColor="gray"
                      className="mb-2"
                    />
                  </div>
                  <Skeleton
                    className="min-w-[150px] w-full h-[10px]"
                    baseColor="gray"
                  />
                  <Skeleton
                    className="min-w-[150px] w-full h-[10px]"
                    baseColor="gray"
                  />
                  <Skeleton
                    className="min-w-[150px] w-full h-[10px]"
                    baseColor="gray"
                  />
                </div>
                <div>
                  <Skeleton
                    className="w-auto min-w-[120px] h-auto min-h-[120px] mb-2"
                    baseColor="gray"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        data?.map((product: any, idx: any) => {
          const isExpanded = expandedIndex === idx;
          const isPopUpOpen = activePopUpIndex === idx;

          return (
            <div key={idx} className="relative">
              {confirmationPrompt && (
                <ConfirmationPrompt
                  onClose={() => setConfirmationPrompt(false)}
                  isOpen={confirmationPrompt}
                  onConfirm={deleteProduct}
                >
                  Are you sure you want to delete this product?
                </ConfirmationPrompt>
              )}

              <PiDotsThreeOutlineVertical
                className="mb-2 float-right cursor-pointer"
                onClick={() => togglePopUp(idx)}
              />

              {isPopUpOpen && (
                <PopUp
                  items={[
                    {
                      label: (
                        <div className="flex gap-x-2 items-center">
                          <FaPencil size={18} />
                          <p>Edit</p>
                        </div>
                      ),
                      action: () => setDataAndShowOverlay(product),
                    },
                    {
                      label: (
                        <div
                          className="flex gap-x-2 items-center"
                          onClick={() => showThePrompt(product)}
                        >
                          <FaTrash color="red" size={18} />
                          <p>Delete</p>
                        </div>
                      ),
                      action: () => {},
                    },
                  ]}
                  closePopUp={() => setActivePopUpIndex(null)}
                />
              )}

              <div
                className={`border border-white rounded-md p-2 text-white flex flex-col w-full overflow-hidden transition-all duration-500 ${
                  isExpanded ? "max-h-[500px]" : "max-h-[120px]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="w-[200px]">
                    <p className="w-[120px] text-ellipsis truncate">
                      Info: {product.productName} <br /> Description:{" "}
                      {product.productDescription}
                    </p>
                    <p>Price: {product.finalPrice.toFixed(2)}$</p>
                    <p>Active: {product.status}</p>
                  </div>
                  <img
                    src={product.productImage[0]?.link}
                    className="w-[80px] h-[80px] rounded"
                    alt="Product"
                  />
                </div>
                {isExpanded && (
                  <div className="transition-opacity duration-500 opacity-100">
                    <p>ID: {product.productId}</p>
                    <p>Company Name: {product.companyName}</p>
                    <p>Category: {product.productCategory}</p>
                    <p>Sub Category: {product.subCategory}</p>
                    <p>Discount: {product.discount}</p>
                    <p>Added On: {formatDate(product.createdAt)}</p>
                  </div>
                )}
              </div>

              {/* Toggle Button */}
              <button
                className="absolute left-36 z-10 -bottom-4 w-6 h-6 flex items-center justify-center text-white"
                onClick={() => toggleDetails(idx)}
              >
                {isExpanded ? <BiUpArrow /> : <BiDownArrow />}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SmallDeviceTable;
