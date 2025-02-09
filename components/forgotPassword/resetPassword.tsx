"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import Notification from "@/components/general/notification";
import Button from "@/components/general/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { GiPadlockOpen } from "react-icons/gi";

const ResetPasswordPage = () => {
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("New password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: true,
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("cliiiiiiiiiiiiiiiiiiked");
      if (!token) {
        setShowNotification({
          isShow: true,
          content: "Invalid or missing token.",
          success: false,
        });
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post(
          `${baseUrl}/api/auth/reset-password`,
          {
            resetToken: token,
            newPassword: values.newPassword,
          }
        );

        setShowNotification({
          isShow: true,
          content: response.data?.message || "Password reset successful!",
          success: true,
        });

        setTimeout(() => {
          router.push("/login");
        }, 4000);
      } catch (err: any) {
        setShowNotification({
          isShow: true,
          content:
            err?.response?.data?.message ||
            "Something went wrong. Please try again!",
          success: false,
        });
      } finally {
        setLoading(false);
      }
    },
  });

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
    <div className="bg-white rounded-md p-10 flex flex-col items-center justify-center sm:w-4/12 mt-5 px-4">
      <GiPadlockOpen size="50" className="mb-4" />
      <h1 className="text-primary text-3xl mb-10 font-semibold">
        Set Your New Password
      </h1>
      {showNotification.isShow && (
        <Notification
          isShow={showNotification.isShow}
          success={showNotification.success}
          content={showNotification.content}
        />
      )}

      <form
        onSubmit={formik.handleSubmit}
        className="flex gap-y-4 flex-col w-full"
      >
        <div className="flex flex-col">
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="border border-black rounded h-12 w-full max-w-80  px-2 mb-3"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <span className="text-sm text-red-500">
              {formik.errors.newPassword}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm your new password"
            value={formik.values.confirmNewPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="border border-black rounded h-12 w-full max-w-80  px-2 mb-3"
          />
          {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword && (
              <span className="text-sm text-red-500">
                {formik.errors.confirmNewPassword}
              </span>
            )}
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-white  text-white hover:text-primary transition-all duration-300 border border-white hover:border hover:border-black  rounded-md  px-4 py-3"
          disabled={loading}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
