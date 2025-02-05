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
import { validationSchema } from "@/helper/DashboardValidationScehma";
import PersoanInfoAccount from "./personalInfoAccount";
import SocialMediaInfoAccount from "./socialMediaInfoAccount";
import { headers } from "next/headers";
import Cookies from "js-cookie";

const AccountTab = () => {
  let userData = useSelector((state: RootState) => state.seller.user);
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any>();

  const [progress, setProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  userData = userData || userData?.seller;
  let profilePicture: any = useSelector(
    (state: RootState) => state.seller.profilePicture
  );

  const token = Cookies.get("authToken");
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [showNotification, setShowNotification] = useState<any>({
    isShow: false,
    content: "",
    success: false,
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      companyLogo: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setImages(e.target.files);

    if (selectedFile) {
      setFile(selectedFile);
      setProgress(0);
      setUploadedImageUrl(null);
    }
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const updateSeller = async () => {
    if (Object.keys(formik.errors).length > 0) return;

    try {
      const formData: any = new FormData();

      if (formik.values.phone) formData.phone = formik.values.phone;
      if (formik.values.address) formData.address = formik.values.address;
      if (formik.values.companyStartingTime)
        formData.companyStartingTime = formik.values.companyStartingTime;
      if (formik.values.companyLogo) formik.values.companyLogo;

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
      ].filter(Boolean);

      if (socialLinks.length > 0) formData.socialLinks = socialLinks;

      if (images && typeof images === "object") {
        const imageArray = Object.values(images);
        imageArray.forEach((image: any) => {
          formData.append("companyLogo", image);
        });
      } else {
        console.log(
          "No images selected or images are not in the correct format"
        );
      }

      if (Object.keys(formData).length > 0) {
        const response = await axios.put(
          `${baseUrl}/api/auth/seller/${
            userData?.seller?._id || userData?._id
          }`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
      console.log("Error updating seller:", err);
    }
  };
  useEffect(() => {
    if (userData) {
      formik.setValues({
        companyName: userData?.companyName || "",
        email: userData?.email || "",
        password: userData?.password || "",
        phone: userData?.phone || "",
        companyLogo: userData?.companyLogo || "",
        address: userData?.address || "",
        companyStartingTime: userData?.companyStartingTime
          ? formatDate(userData?.companyStartingTime)
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
        <PersoanInfoAccount formik={formik} />
        <SocialMediaInfoAccount formik={formik} />

        {userData?.companyLogo ? (
          <div className="flex items-center justify-center">
            <img src={userData?.companyLogo} className="w-64 h-64 rounded" />
          </div>
        ) : (
          <div className="my-10">
            <FileInput
              file={file}
              setFile={setFile}
              handleUpload={handleUpload}
              handleFileChange={handleFileChange}
              progress={progress}
            />
          </div>
        )}

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
