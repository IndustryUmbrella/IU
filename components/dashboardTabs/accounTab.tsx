"use client";
import React, { useEffect, useState } from "react";
import Button from "../general/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { formatDate } from "@/helper/dateFormatter";
import FileInput from "../general/fileInput";
import Notification from "../general/notification";

const AccountTab = () => {
  let userData = useSelector((state: RootState) => state.seller.user);
  userData = userData || userData?.seller;

  const [showNotification, setShowNotification] = useState<any>({
    isShow: false,
    content: "",
    success: false,
  });
  const validationSchema = Yup.object({
    phone: Yup.string().matches(
      /^\+[1-9]{1}[0-9]{3,14}$/,
      "Phone number must start with a + and be followed by the country code and 12 digits."
    ),
    address: Yup.string(),
    companyStartingTime: Yup.date(),
    facebook: Yup.string()
      .url("Invalid Facebook URL")
      .matches(
        /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]+$/,
        "Invalid Facebook URL"
      )
      .nullable(),
    instagram: Yup.string()
      .url("Invalid Instagram URL")
      .matches(
        /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(\.\?)?]+$/,
        "Invalid Instagram URL"
      )
      .nullable(),
    twitter: Yup.string()
      .url("Invalid Twitter URL")
      .matches(
        /^(https?:\/\/)?(www\.)?x\.com\/[a-zA-Z0-9(\.\?)?]+$/,
        "Invalid Twitter URL"
      )
      .nullable(),
    linkedin: Yup.string()
      .url("Invalid LinkedIn URL")
      .matches(
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9(\.\?)?]+$/,
        "Invalid LinkedIn URL"
      )
      .nullable(),
    pinterest: Yup.string()
      .url("Invalid Pinterest URL")
      .matches(
        /^(https?:\/\/)?(www\.)?pinterest\.com\/[a-zA-Z0-9(\.\?)?]+$/,
        "Invalid Pinterest URL"
      )
      .nullable(),
    website: Yup.string().url("Invalid website URL").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
      companyStartingTime: "",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      pinterest: "",
      website: "",
    },
    validationSchema,
    onSubmit: async (values) => {},
  });

  const updateSeller = async () => {
    if (Object.keys(formik.errors).length > 0) return;

    try {
      const updateData: any = {};

      if (formik.values.phone) updateData.phone = formik.values.phone;
      if (formik.values.address) updateData.address = formik.values.address;
      if (formik.values.companyStartingTime)
        updateData.companyStartingTime = formik.values.companyStartingTime;

      // Add social links only if they are provided
      const socialLinks = [
        formik.values.facebook && {
          title: "Facebook",
          link: formik.values.facebook,
        },
        formik.values.instagram && {
          title: "Instagram",
          link: formik.values.instagram,
        },
        formik.values.twitter && {
          title: "Twitter",
          link: formik.values.twitter,
        },
        formik.values.linkedin && {
          title: "LinkedIn",
          link: formik.values.linkedin,
        },
        formik.values.pinterest && {
          title: "Pinterest",
          link: formik.values.pinterest,
        },
        formik.values.website && {
          title: "Website",
          link: formik.values.website,
        },
      ].filter(Boolean); // Remove undefined values

      if (socialLinks.length > 0) updateData.socialLinks = socialLinks;

      // Make the PUT request only if there's data to update
      if (Object.keys(updateData).length > 0) {
        const response = await axios.put(
          `http://localhost:5000/api/auth/seller/${
            userData?.seller?._id || userData?._id
          }`,
          updateData
        );
        setShowNotification({
          isShow: true,
          content: "Fields Updated Successfully",
          success: true,
        });
      } else {
        setShowNotification({
          isShow: true,
          content: "No fields to update",
          success: false,
        });
      }
    } catch (err) {
      console.error("Error updating seller:", err);
    }
  };
  useEffect(() => {
    if (userData) {
      formik.setValues({
        phone: userData?.phone || "",
        address: userData?.address || "",
        companyStartingTime: userData?.companyStartingTime
          ? formatDate(userData?.companyStartingTime) // Ensure format is "yyyy-MM-dd"
          : "",
        facebook:
          userData?.socialLinks?.find((link: any) => link.title === "Facebook")
            ?.link || "",
        instagram:
          userData?.socialLinks?.find((link: any) => link.title === "Instagram")
            ?.link || "",
        twitter:
          userData?.socialLinks?.find((link: any) => link.title === "Twitter")
            ?.link || "",
        linkedin:
          userData?.socialLinks?.find((link: any) => link.title === "LinkedIn")
            ?.link || "",
        pinterest:
          userData?.socialLinks?.find((link: any) => link.title === "Pinterest")
            ?.link || "",
        website:
          userData?.socialLinks?.find((link: any) => link.title === "Website")
            ?.link || "",
      });
    }
  }, [userData]);

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
    <div className="flex items-center justify-center">
      {showNotification.isShow && (
        <Notification
          isShow={showNotification.isShow}
          success={showNotification.success}
          content={showNotification.content}
        />
      )}
      <form>
        <h1 className="text-3xl mb-5">More Info</h1>
        <div className="flex flex-wrap justify-center items-center gap-2">
          <div className="relative flex flex-col">
            <input
              type="phone"
              id="phone"
              name="phone"
              placeholder="e.g +1 23456789"
              className={`w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.phone}
              </span>
            )}
          </div>
          <div className="relative flex flex-col">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className={`w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm ${
                formik.touched.address && formik.errors.address
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.address}
              </span>
            )}
          </div>
          <div className="relative flex flex-col">
            <input
              type="date"
              accept=""
              id="companyStartingTime"
              name="companyStartingTime"
              className={`w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm ${
                formik.touched.companyStartingTime &&
                formik.errors.companyStartingTime
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.companyStartingTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.companyStartingTime &&
              formik.errors.companyStartingTime && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.companyStartingTime}
                </span>
              )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl my-5">Social Media</h1>
          <div className="grid grid-cols-2 gap-4">
            {[
              "facebook",
              "instagram",
              "twitter",
              "linkedin",
              "pinterest",
              "website",
            ].map((platform: any, index: number) => (
              <div
                className="relative flex flex-col  w-full text-black h-12  rounded px-2 text-sm"
                // className={`w-full text-black h-12  rounded px-2 text-sm`}

                key={platform}
              >
                <input
                  type="text"
                  id={platform}
                  name={platform}
                  placeholder={`Enter your ${
                    platform.charAt(0).toUpperCase() + platform.slice(1)
                  } URL`}
                  className={`w-full text-black h-12 border rounded px-2 text-sm ${
                    formik.touched[platform as keyof typeof formik.touched] &&
                    formik.errors[platform as keyof typeof formik.errors]
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                  value={formik.values[platform as keyof typeof formik.values]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[platform as keyof typeof formik.touched] &&
                  formik.errors[platform as keyof typeof formik.errors] && (
                    <span className="text-red-500 text-[12px]">
                      {formik.errors[platform as keyof typeof formik.errors]}
                    </span>
                  )}
              </div>
            ))}
          </div>
        </div>

        <div className="my-10">
          <FileInput />
        </div>

        <Button
          type={Object.keys(formik.errors).length > 0 ? "disable" : "primary"}
          disable={(Object.keys(formik.errors).length = 0) ? true : false}
          size="md"
          text="Update"
          clickHandler={updateSeller}
        />
      </form>
    </div>
  );
};

export default AccountTab;
