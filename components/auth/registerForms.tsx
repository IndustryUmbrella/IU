"use client";
import React, { useEffect, useState } from "react";
import { setNestedObjectValues, useFormik } from "formik";
import * as Yup from "yup";
import Button from "../general/button";
import Link from "next/link";
import axios from "axios";
import Notification from "../general/notification";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import {
  faCoffee,
  faSpinner,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    code: Yup.string()
      .min(5, "Code must be at least 5 characters")
      .required("Code is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const [isVerfied, setIsVerfied] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [sendingCodeLoading, setSendingCodeLoading] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<any>({
    isShow: false,
    content: "",
    success: false,
  });

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const user = await axios.post(`${baseUrl}/api/auth/create`, {
          email: values.email,
          password: values.password,
          companyName: values.companyName,
          phone: "",
          address: "",
          companyLogo: "",
          companyStartingTime: "",
          description: "",
          slogan: "",
          isVerified: true,
        });
        setShowNotification({
          isShow: true,
          content: user?.data?.data?.message || "account created successfully!",
          success: true,
        });
        setTimeout(() => {
          redirect("/login");
        }, 5000);
      } catch (err: any) {
        if (err.response) {
          setShowNotification({
            isShow: true,
            content: err.response.data.message || "Wrong Credential",
            success: false,
          });
        } else if (err.request) {
          setShowNotification({
            isShow: true,
            content: err.request || "Wrong Credential",
            success: false,
          });
        } else {
          setShowNotification({
            isShow: true,
            content: err.message || "Something went wrong",
            success: false,
          });
        }
      }
    },
  });

  const sendTheCode = async () => {
    setSendingCodeLoading(true);
    try {
      await axios.post(`${baseUrl}/api/verify/send-code`, {
        email: formik.values.email,
      });
      setIsCodeSent(true);
      setShowNotification({
        isShow: true,
        content: " Verification Code Sent Successfull",
        success: true,
      });
      setSendingCodeLoading(false);
    } catch (err: any) {
      setShowNotification({
        isShow: true,
        content: err?.response?.data?.message || " wait a minute and Try Again",
        success: false,
      });
      setSendingCodeLoading(false);
    }
  };

  const verifyTheEmail = async () => {
    setIsLoading(true);
    try {
      const isVerify = await axios.post(`${baseUrl}/api/verify/verify-code`, {
        email: formik.values.email,
        verificationCode: formik.values.code,
      });
      setIsLoading(false);
      setIsVerfied(isVerify.data);
    } catch (err: any) {
      setShowNotification({
        isShow: true,
        content:
          err?.response?.data?.message ||
          err?.response ||
          err?.response?.data?.message,
        success: false,
      });

      setIsVerfied(err.response);
      setIsLoading(false);
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
          Join the Marketplace Revolution Now!
        </h1>
        <div className="flex justify-center">
          <form className="space-y-4">
            <div className="relative flex flex-col">
              <input
                type="Company Name"
                id="companyName"
                name="companyName"
                placeholder="e.g Amazon"
                className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm  ${
                  formik.touched.companyName && formik.errors.companyName
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.companyName}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g example@gmail.com"
                disabled={isVerfied?.success}
                className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm  ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {!sendingCodeLoading ? (
                <Button
                  type={
                    formik.errors.email || isVerfied?.success
                      ? "disable"
                      : "secondary"
                  }
                  size="xs"
                  text={"Send Code"}
                  className="absolute right-2 top-3 text-[10px]"
                  disable={
                    isVerfied?.success || formik.errors.email !== undefined
                  }
                  clickHandler={sendTheCode}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  size="3x"
                  className="absolute right-2 top-4 text-[13px]"
                />
              )}

              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col relative">
              <input
                type="text"
                id="code"
                name="code"
                disabled={isVerfied?.success}
                placeholder="e.g 12XIg"
                className={`w-[260px] md:w-64 h-12 border rounded px-2 text-sm ${
                  formik.touched.code && formik.errors.code
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {isLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  size="3x"
                  className="absolute right-2 top-4 text-[13px]"
                />
              ) : isVerfied?.success ? (
                <div className="absolute right-2 top-3  ">
                  <IoCheckmarkDoneCircleSharp />
                </div>
              ) : (
                <Button
                  type={`${formik.errors.code ? "disable" : "secondary"}`}
                  size="xs"
                  text="verify"
                  disable={formik.errors.email !== undefined}
                  className={"absolute right-2 top-3 text-[10px]"}
                  clickHandler={verifyTheEmail}
                />
              )}
              {formik.touched.code && formik.errors.code && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.code}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className={`w-[260px] md:w-64 h-12 border rounded px-2 text-sm ${
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

            <div className="flex flex-col">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                className={`w-[260px] md:w-64 h-12 border rounded px-2 text-sm ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="text-red-500 text-[12px]">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>
            <p className="text-white">
              Already Have an account?{" "}
              <Link className="underline" href="/login">
                Login
              </Link>
            </p>
            <div>
              <Button
                type="secondary"
                size="lg"
                text="Submit"
                className="w-full py-3"
                clickHandler={formik.handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
