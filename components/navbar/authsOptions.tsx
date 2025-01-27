"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Button from "../general/button";
import Notification from "../general/notification";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { login, setIsLogged } from "@/app/store/sellerSlice";

const AuthOptions = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.seller.isLogged);
  const userData = useSelector((state: RootState) => state.seller.user);
  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: true,
  });
  const route = useRouter();

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
      route.push("/login");
    } catch (err) {
      setShowNotification({
        isShow: true,
        content: "can't logout now",
        success: false,
      });
    }
  };

  useEffect(() => {
    const notif = setTimeout(() => {
      setShowNotification({
        isShow: false,
        content: "",
        success: false,
      });
      return () => clearTimeout(notif);
    }, 4000);
  });
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
        <>
          <div className="flex gap-x-2 items-center justify-center">
            <Link href={`/profile/${userData?._id}`}>
              <Button
                size="md"
                type="primary"
                text="Dashboard"
                clickHandler={logoutUser}
              />
            </Link>
            <Button
              size="md"
              type="secondary"
              text="Logut"
              clickHandler={logoutUser}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AuthOptions;
