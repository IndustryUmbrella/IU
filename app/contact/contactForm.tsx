"use client";

import Button from "@/components/general/button";
import ContactMockup from "@/public/mockups/contactMockup";
import { useFormik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import * as Yup from "yup";
import SocialMedia from "@/components/contact/socialMedia";
import Notification from "@/components/general/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: true,
  });
  const emailSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      setLoading(true);
      const emailParams = {
        from_name: values.name,
        from_email: values.email,
        message: values.message,
        to_email: values.email,
      };

      emailjs
        .send(
          "service_vm7eyca",
          "template_o0qi9bf",
          emailParams,
          "wYG1v-g2lyi2AldPs"
        )
        .then(
          (result) => {
            setLoading(false);
            setShowNotification({
              isShow: true,
              content: "Message sent successfully",
              success: true,
            });
          },
          (error) => {
            setShowNotification({
              isShow: true,
              content: "An error occurred. Please try again later.",
              success: false,
            });
            setLoading(false);
          }
        );
    },
  });

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
    <div>
      <Notification
        isShow={showNotification.isShow}
        success={showNotification.success}
        content={showNotification.content}
      />
      <div className="  px-[6px] lg:px-desktop md:px-tablet sm:px-mobile relative overflow-hidden mt-10">
        <div className="flex flex-row gap-x-20 -z-[1]  border-[1px] border-white border-opacity-[0.011] rounded-lg absolute">
          {Array.from({ length: 18 }, (_, index) => (
            <div
              key={index}
              className=" border w-[1px] h-screen opacity-[0.011] bg-white"
            ></div>
          ))}
        </div>
        <form
          // ref={formRef}
          onSubmit={formik.handleSubmit}
          className="flex items-center opacity-100 justify-center  flex-col gap-y-3 relative "
        >
          <div className="absoluet border  border-white border-opacity-[0.2] p-8 rounded-full flex items-center opacity-100 justify-center top-[300px] flex-col gap-y-3">
            <ContactMockup />
          </div>

          <h1 className="text-white text-4xl w-full min-w-1/5 text-center ">
            We've be Waiting for you{" "}
          </h1>
          <div className="flex flex-col  gap-x-0.5  ">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g John Doe"
              className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.name && formik.errors.name && (
              <span className="text-red-500 text-[10px]">
                {formik.errors.name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-x-0.5">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@example.com"
              className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-[10px]">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-x-0.5">
            <textarea
              name="message"
              id="message"
              placeholder="I love you"
              className={`w-[260px] md:w-64  h-32 border rounded px-2 text-sm resize-none ${
                formik.touched.message && formik.errors.message
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.message && formik.errors.message && (
              <span className="text-red-500 text-[10px]">
                {formik.errors.message}
              </span>
            )}
          </div>
          <Button
            type={loading ? "disable" : "secondary"}
            size="md"
            text={
              loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "send Message"
              )
            }
            disable={false}
            className=""
            clickHandler={formik.handleSubmit}
          />
        </form>
        <div className="w-full h-[1px] opacity-10 bg-white  mt-5"></div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default ContactForm;
