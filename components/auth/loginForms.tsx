"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../general/button";
import Link from "next/link";

const RegisterForm = () => {
  const validationSchema = Yup.object({
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

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data", values);
      alert("Form submitted successfully!");
    },
  });

  return (
    <>
      <div className=" border border-white min-h-[500px] px-10 py-10 ">
        <h1 className="text-white text-3xl w-64 mb-6 font-aboreto capitalize">
          Your Next Purchase is Just a Login Away.
        </h1>
        <div className="flex justify-center mt-10">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="relative flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g example@gmail.com"
                className={`w-80 h-12 border rounded px-2 text-sm ${
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
                className={`w-80 h-12 border rounded px-2 text-sm ${
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

            <p className="text-white">
              haven't an account?{" "}
              <Link className="underline" href="/register">
                Register
              </Link>
            </p>
            <div>
              <Button
                type="secondary"
                size="lg"
                text="Submit"
                className="w-full py-3"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
