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
import PersoanInfoAccount from "../accountTabAdmin/personalInfoAccount";
import SocialMediaInfoAccount from "../accountTabAdmin/socialMediaInfoAccount";
import Overlay from "../general/overlay";
import NewProductForm from "./newProductForm";
import ProductList from "./productList";

const DashboardTab = () => {
  let userData = useSelector((state: RootState) => state.seller.user);
  userData = userData || userData?.seller;
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [submitForm, setSubmitForm] = useState<(() => void) | null>(null);

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
    <div className="flex flex-col px-20 ">
      {showOverlay && (
        <Overlay
          isOpen={showOverlay}
          onClose={() => setShowOverlay(false)}
          onConfirm={() => submitForm?.()}
        >
          <>
            <h1 className="text-3xl ">Add new Product</h1>
            <NewProductForm setShowOverlay={setShowOverlay} />
          </>
        </Overlay>
      )}
      <div className="flex flex-row px-10 justify-between mb-10">
        <h1 className="text-3xl">Your product list</h1>
        <Button
          clickHandler={() => setShowOverlay(true)}
          type="primary"
          size="md"
          text="+ Add Product"
        />
      </div>
      <ProductList />
    </div>
  );
};

export default DashboardTab;
