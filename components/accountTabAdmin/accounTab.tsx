"use client";
import React, { useEffect, useState } from "react";
import Button from "../general/button";
import { useDispatch, useSelector } from "react-redux";
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
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import NoUserInfoSkeleton from "./noUserInfoSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FaCamera } from "react-icons/fa6";
import { triggerRefresh } from "@/app/store/productSlice";

const AccountTab = () => {
  const dispatch = useDispatch();
  let userData = useSelector((state: RootState) => state.seller.user);
  const [file, setFile] = useState<any>(null);
  const [images, setImages] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setImages(e.target.files);
    setFile(e.target.files);

    if (selectedFile) {
      setFile(selectedFile);
      setProgress(0);
      setUploadedImageUrl(null);
    }
  };

  const updateSeller = async () => {
    await formik.validateForm();
    if (Object.keys(formik.errors).length > 0) return;

    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("phone", formik.values.phone || "");
      formData.append("address", formik.values.address || "");
      formData.append(
        "companyStartingTime",
        formik.values.companyStartingTime || ""
      );

      if (file) {
        formData.append("companyLogo", file);
      }

      const socialLinks = Object.entries(formik.values)
        .filter(
          ([key, value]) =>
            [
              "facebook",
              "instagram",
              "twitter",
              "linkedin",
              "pinterest",
              "website",
            ].includes(key) && value
        )
        .map(([key, value]) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          link: value as string,
        }));

      formData.append("socialLinks", JSON.stringify(socialLinks));

      const response = await axios.put(
        `${baseUrl}/api/auth/seller/${userData?.seller?._id || userData?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsLoading(false);
      setShowNotification({
        isShow: true,
        content: "Fields Updated Successfully",
        success: true,
      });
      dispatch(triggerRefresh());
    } catch (err) {
      setIsLoading(false);
      setShowNotification({
        isShow: true,
        content: "Update failed!",
        success: false,
      });
    }
  };

  useEffect(() => {
    if (userData) {
      formik.setValues({
        companyName: userData?.companyName || "",
        email: userData?.email || "",
        password: userData?.password || "",
        phone: userData?.phone || "",
        address: userData?.address || "",
        companyStartingTime: userData?.companyStartingTime
          ? formatDate(userData?.companyStartingTime)
          : "",
        companyLogo: userData?.companyLogo || "",
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
    <div className="flex items-center justify-center  px-4 sm:px-20">
      {showNotification.isShow && (
        <Notification
          isShow={showNotification.isShow}
          success={showNotification.success}
          content={showNotification.content}
        />
      )}
      <form className="">
        <PersoanInfoAccount formik={formik} userData={userData} />

        <SocialMediaInfoAccount formik={formik} userData={userData} />

        {userData?.companyLogo ? (
          <div className="relative flex items-center justify-center">
            <img
              src={userData?.companyLogo}
              className="w-64 h-64 rounded mt-5"
            />
            <label className="absolute top-7 right-24 rounded-md cursor-pointer p-2 bg-white">
              <FaCamera size={28} className="" color="black" />
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
              />
            </label>
          </div>
        ) : (
          <div className="my-10 text-center ">
            {userData === undefined ? (
              <Skeleton
                width={200}
                height={140}
                baseColor="#333"
                highlightColor="#666"
              />
            ) : (
              <FileInput
                style="styled"
                iconColor=""
                multiple={false}
                file={file}
                setFile={setFile}
                handleFileChange={handleFileChange}
                progress={progress}
              />
            )}
          </div>
        )}

        {userData === undefined ? (
          <Skeleton
            width={100}
            height={40}
            baseColor="#333"
            highlightColor="#666"
          />
        ) : (
          <Button
            type={
              Object.keys(formik.errors).length > 0 || isLoading
                ? "disable"
                : "primary"
            }
            disable={
              (Object.keys(formik.errors).length = 0) || isLoading
                ? true
                : false
            }
            size="md"
            text={
              isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Update"
            }
            clickHandler={updateSeller}
            className="mt-3"
          />
        )}
      </form>
    </div>
  );
};

export default AccountTab;
