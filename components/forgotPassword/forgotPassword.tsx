"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ForgotPasswordMockup from "@/public/mockups/forgotPasswordMockup";
import Button from "../general/button";
import * as Yup from "yup";
import { useFormik } from "formik";
import Notification from "../general/notification";
import { FaSpinner } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: true,
  });
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("invalid email")
      .required("Email is required field"),
  });

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: () => {},
  });
  const handleForgotPassword = async (e: React.FormEvent) => {
    if (formik.errors.email) return;
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/auth/forgot-password`, {
        email: formik.values.email,
      });
      setShowNotification({
        isShow: true,
        content: response?.data?.message,
        success: true,
      });
      setLoading(false);
    } catch (err: any) {
      setShowNotification({
        isShow: true,
        content: err.response.data.message,
        success: false,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const notif = setTimeout(() => {
      setShowNotification({
        isShow: false,
        content: "",
        success: false,
      });
    }, 5000);
    return () => clearTimeout(notif);
  }, [showNotification]);

  return (
    <div className="bg-white rounded-md p-10 flex flex-col items-center justify-center mt-5 px-4 sm:w-5/12 ">
      {showNotification && (
        <Notification
          isShow={showNotification.isShow}
          success={showNotification.success}
          content={showNotification.content}
        />
      )}
      <ForgotPasswordMockup />
      <h1 className="text-white text-3xl">Reset Password</h1>
      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col gap-y-2 justify-center items-center w-full"
      >
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          className="border border-black rounded h-12 w-full max-w-80 mb-3 px-2"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-sm text-red-500">{formik.errors.email}</span>
        )}
        <Button
          size="lg"
          text={
            loading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Send Reset Link"
            )
          }
          disable={loading}
          type={loading ? "disable" : "secondary"}
          clickHandler={handleForgotPassword}
        />
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
