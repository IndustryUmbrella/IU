import React, { useEffect, useState } from "react";
import ConfirmationPrompt from "../general/confirmationPrompt";
import axios from "axios";
import Notification from "../general/notification";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login, setIsLogged } from "@/app/store/sellerSlice";
import { setProducts } from "@/app/store/productSlice";

const SettingTab = ({ userData }: { userData: any }) => {
  const token = Cookies.get("authToken");
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: false,
  });
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const textToType = "Delete My Account";
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const handleDeleteAccount = async () => {
    if (inputValue === textToType) {
      try {
        const deleteProduct = await axios.delete(
          `${baseUrl}/api/product/delete-products/${userData?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (deleteProduct?.data?.success) {
          try {
            const deleteAccount = await axios.delete(
              `${baseUrl}/api/auth/seller/${userData?._id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowNotification({
              isShow: true,
              content: "Account Delete SuccessFully",
              success: false,
            });
            Cookies.remove("authToken");
            dispatch(login(null));
            dispatch(setIsLogged(false));
            dispatch(setProducts({}));
            router.push("/login");
            router.push("/login");
          } catch (err) {
            setShowNotification({
              isShow: true,
              content: "can't delete account right now, Please try again",
              success: false,
            });
          }
        }
      } catch (err) {
        setShowNotification({
          isShow: true,
          content: "can't delete account right now, Please try again",
          success: false,
        });
      }
    } else {
      setError("the texts didn't match");
    }
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
    <div className=" px-4 sm:px-20">
      {showNotification.isShow && (
        <Notification
          isShow={showNotification.isShow}
          content={showNotification.content}
          success={showNotification.success}
        />
      )}
      {showPrompt && (
        <ConfirmationPrompt
          isOpen={showPrompt}
          onClose={() => setShowPrompt(false)}
          onConfirm={handleDeleteAccount}
        >
          <div className="flex  flex-col ">
            <h1 className="text-2xl font-semibold">Delete Your Account</h1>
            <p className="text-red-500 ">
              By Deleting your account all <b>PRODUCTS</b> will be delete.
            </p>

            <p>
              Type <b>{textToType} </b>
              to continue
            </p>
            <input
              type="text"
              className="border border-black h-12 max-w-80 w-full rounded mt-2 px-2"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <p className="text-red-500 text-xs">{error}</p>
          </div>
        </ConfirmationPrompt>
      )}
      <div className="flex flex-col items-center justify-center">
        <h1>SettingTab</h1>
        <h1 className="my-6">
          By checking this checkbox you're agree to delete you Bussiness account
        </h1>
        <div className="flex gap-x-2 items-center mb-4">
          <input
            type="checkbox"
            id="agree"
            className="w-5 h-5 accent-red-900 checked:accent-red-900 cursor-pointer"
            checked={checkbox} // Controlled component
            onChange={(e) => setCheckbox(e.target.checked)} // Updates state correctly
          />

          <label htmlFor="agree">I agree to delete my account.</label>
        </div>
        <button
          disabled={!checkbox}
          className={` ${
            checkbox ? "bg-red-600" : "bg-red-400 cursor-not-allowed"
          } text-white p-3 rounded`}
          onClick={() => setShowPrompt(true)}
        >
          Delete My account
        </button>
      </div>
    </div>
  );
};

export default SettingTab;
