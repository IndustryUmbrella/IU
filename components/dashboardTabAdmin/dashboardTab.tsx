"use client";
import React, { useEffect, useState } from "react";
import Button from "../general/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useFormik } from "formik";
import { validationSchema } from "@/helper/DashboardValidationScehma";
import Overlay from "../general/overlay";
import NewProductForm from "./newProductForm";
import ProductList from "./productList";
import { Tooltip } from "react-tooltip";

const DashboardTab = () => {
  let userData = useSelector((state: RootState) => state.seller.user);
  userData = userData || userData?.seller;
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
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
    <div className="flex flex-col px-4 sm:px-20 ">
      {showOverlay && (
        <Overlay isOpen={showOverlay} onClose={() => setShowOverlay(false)}>
          <>
            <h1 className="text-3xl ">Add new Product</h1>
            <NewProductForm setShowOverlay={setShowOverlay} />
          </>
        </Overlay>
      )}
      <div className="flex flex-row px-2  sm:px-10  justify-between mb-10">
        <h1 className="text-xl sm:text-3xl">Your product list</h1>
        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content="First Complete your profile!"
        >
          <Button
            clickHandler={() => setShowOverlay(true)}
            type={
              userData?.companyLogo &&
              userData?.socialLinks &&
              userData?.address
                ? "primary"
                : "disable"
            }
            size="md"
            text="+ Add Product"
          />

          {userData?.socialLinks && !userData?.phone && !userData?.address && (
            <Tooltip id="my-tooltip" />
          )}
        </div>
      </div>
      <div></div>
      <ProductList />
    </div>
  );
};

export default DashboardTab;
