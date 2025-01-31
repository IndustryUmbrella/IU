"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { login, setIsLogged, setProfilePicture } from "@/app/store/sellerSlice";
import Notification from "../general/notification";
import PopUp from "../general/popUp";
import { BiSolidDashboard } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { setProducts } from "@/app/store/productSlice";
import LogoImage from "../../public/images/Group.png";

const AuthOptions = () => {
  const dispatch = useDispatch();
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);
  const isLogged = useSelector((state: RootState) => state.seller.isLogged);
  const userData = useSelector((state: RootState) => state.seller.user);
  const profilePicture: any = useSelector(
    (state: RootState) => state.seller.profilePicture
  );
  useEffect(() => {
    console.log(
      profilePicture,
      Object.keys(profilePicture).length == 0,
      "....."
    );
  }, []);

  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: true,
  });
  const route = useRouter();
  const popUpRef = useRef<HTMLDivElement>(null);

  const logoutUser = () => {
    try {
      Cookies.remove("authToken");
      setShowNotification({
        isShow: true,
        content: "Logged out successfully",
        success: true,
      });
      dispatch(login(null));
      dispatch(setIsLogged(false));
      dispatch(setProfilePicture({}));
      dispatch(setProducts({}));
      route.push("/login");
    } catch (err) {
      setShowNotification({
        isShow: true,
        content: "Can't log out now",
        success: false,
      });
    }
  };

  // Close pop-up when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popUpRef.current &&
        !popUpRef.current.contains(event.target as Node)
      ) {
        setPopUpOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const notif = setTimeout(() => {
      setShowNotification({
        isShow: false,
        content: "",
        success: false,
      });
      return () => clearTimeout(notif);
    }, 4000);
  }, [showNotification]);

  return (
    <>
      {showNotification?.isShow && (
        <Notification
          content={showNotification.content}
          isShow={showNotification.isShow}
          success={showNotification.success}
        />
      )}
      {!isLogged ? (
        <div className="flex gap-x-4 items-center">
          <Link
            href="/register"
            className="bg-white text-black rounded-md p-2 px-4"
          >
            Register
          </Link>
          <Link className="hidden md:flex" href="/login">
            Login
          </Link>
        </div>
      ) : (
        <div className="relative" ref={popUpRef}>
          {Object.keys(profilePicture).length > 0 ? (
            <img
              onClick={() => setPopUpOpen((prev) => !prev)}
              src={profilePicture || LogoImage}
              className="border cursor-pointer"
              alt="Profile"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          ) : (
            <div
              onClick={() => setPopUpOpen((prev) => !prev)}
              className="bg-violet-800 p-3 cursor-pointer w-10 h-10 py-2 rounded-full text-xl text-white flex items-center justify-center"
            >
              {userData?.companyName?.charAt(0).toUpperCase()}
            </div>
          )}
          {popUpOpen && (
            <PopUp
              items={[
                {
                  label: (
                    <div className="flex flex-row gap-x-2 items-center">
                      <BiSolidDashboard size={28} />
                      <p className="">Dashboard</p>
                    </div>
                  ),
                  action: () =>
                    route.push(`/profile/${userData?._id}?tab=account`),
                },
                {
                  label: (
                    <div className="flex flex-row gap-x-2 items-center">
                      <TbLogout2 size={28} />
                      <p className="">Logout</p>
                    </div>
                  ),
                  action: logoutUser,
                },
              ]}
              closePopUp={() => setPopUpOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AuthOptions;
