"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../general/button";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, setIsLogged } from "@/app/store/sellerSlice";
import { RootState } from "@/app/store/store";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import Notification from "../general/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.seller.user);
  const [showNotification, setShowNotification] = useState<any>({
    isShow: false,
    content: "",
    success: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async () => {},
  });
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const loginUser = async () => {
    setIsLoading(true);
    if (!formik.values.email || !formik.values.password) return;

    try {
      const loggedUser = await axios.post(`${baseUrl}/api/auth/login`, {
        email: formik.values.email,
        password: formik.values.password,
      });
      const token = loggedUser?.data?.seller?.token;

      if (token) {
        Cookies.set("authToken", token, { expires: 7 });
      }
      setShowNotification({
        isShow: true,
        content: loggedUser?.data?.message || "Logged successfully!",
        success: true,
      });
      dispatch(setIsLogged(true));
      dispatch(login(loggedUser?.data));

      setTimeout(() => {
        redirect(`/profile/${userData?.seller?._id}`);
      }, 5000);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setShowNotification({
        isShow: true,
        content: err?.response?.data?.message || "something went wrong",
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
    }, 4000);
    return () => clearTimeout(notif);
  }, [showNotification]);

  return (
    <>
      {showNotification.isShow && (
        <Notification
          isShow={showNotification.isShow}
          success={showNotification.success}
          content={showNotification.content}
        />
      )}
      <div className=" border border-white rounded-md w-auto min-w-[340px] min-h-[550px] px-10 py-10 ">
        <h1 className="text-white text-3xl w-64 mb-6 font-aboreto capitalize">
          Your Next Purchase is Just a Login Away.
        </h1>
        <div className="flex justify-center mt-10">
          <form className="space-y-4">
            <div className="relative flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g example@gmail.com"
                className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <div>
              <Link href="/forgotPassword" className="text-white">
                Forgot Password?
              </Link>
              <Button
                type={isLoading ? "disable" : "secondary"}
                size="lg"
                text={
                  isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="1x" />
                  ) : (
                    "Submit"
                  )
                }
                className="w-full py-3 mt-2"
                clickHandler={loginUser}
              />
              <p className="text-white mt-5 ">
                haven't an account?{" "}
                <Link className="underline" href="/register">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
