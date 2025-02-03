"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Button from "../general/button";
import { triggerRefresh } from "@/app/store/productSlice";
import Cookies from "js-cookie";
import FileInput from "../general/fileInput";
import Image from "next/image";

const NewProductForm = ({
  setShowOverlay,
  data,
}: {
  setShowOverlay: any;
  data?: any;
}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.seller.user);
  const products = useSelector((state: RootState) => state.product.products);

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [images, setImages] = useState<any>();

  const productSchema = Yup.object({
    productName: Yup.string().required("product name is required"),
    productDescription: Yup.string().required("description is required"),
    productPrice: Yup.number().required("prodcut price is required").min(1),
    productCategory: Yup.object().shape({
      value: Yup.string().required("Selection is required"),
    }),
    colores: Yup.string(),
    limitedCounts: Yup.string(),
  });
  const options = [
    { value: "living", label: "Home & living" },
    { value: "jewerly", label: "Jewerly & Accessories" },
    { value: "apperel", label: "Apperel and Wearbles" },
    { value: "art", label: "Art & collections" },
    { value: "gift", label: "Gift & Seasonable Items" },
    { value: "beauty", label: "Beaaty & wellnes" },
    { value: "crafts", label: "Crafts" },
  ];
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const token = Cookies.get("authToken");

  const formik: any = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productImages: "",
      productPrice: 0,
      productCategory: "",
      colores: "",
      limitedCounts: "",
    },
    validationSchema: productSchema,
    onSubmit: (value) => {
      console.log();
    },
  });
  useEffect(() => {
    if (products && data) {
      formik.setValues({
        productName: data.productName || "",
        productDescription: data.productDescription || "",
        productImages: data?.productImages || "",
        productCategory: data?.productCategory || "",
        productPrice: data.productPrice || "",
        colores: data.colores?.[0] || "", // Ensure it's dynamic
        limitedCounts: data.limitedCounts || 0, // Default to prevent undefined
      });
    }
  }, [data, products]); // Ensure dependencies are correct

  const addNewProduct = async () => {
    if (Object.keys(formik.errors).length > 0) return;

    const formData = new FormData();
    formData.append("seller_id", userData?._id);
    formData.append("productName", formik.values?.productName);
    formData.append("productDescription", formik.values?.productDescription);
    formData.append("productCategory", formik.values?.productCategory?.value);
    formData.append("productPrice", String(formik?.values?.productPrice || 0)); // Convert number to string
    formData.append("colores", JSON.stringify(formik.values?.colores || [])); // Convert array to string
    formData.append("limitedCounts", String(formik.values?.limitedCounts || 0)); // Convert number to string
    formData.append("productImage", "");

    if (images && typeof images === "object") {
      const imageArray = Object.values(images);
      imageArray.forEach((image: any) => {
        formData.append("images", image);
      });
    } else {
      console.log("No images selected or images are not in the correct format");
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/product/add-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      setShowOverlay(false);
      dispatch(triggerRefresh());
    } catch (err) {
      console.log("Error adding product:", err);
    }
  };

  const updateProduct = async () => {
    if (Object.keys(formik.errors).length > 0) return;

    try {
      const productData: any = {
        seller_id: userData?.seller?._id || userData?._id,
        productName: formik.values.productName,
        productDescription: formik.values.productDescription,
        productCategory: formik.values.productCategory?.value,
        productImage: data?.productImage,
        productPrice: formik.values.productPrice,
        colores: formik.values.colores,
        limitedCounts: formik.values.limitedCounts,
      };

      const response = await axios.put(
        `${baseUrl}/api/product/product/${data?.productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowOverlay(false);
      dispatch(triggerRefresh());
      // setShowNotification({
      //   isShow: true,
      //   content: "Fields Updated Successfully",
      //   success: true,
      // });
    } catch (err) {
      console.log("Error adding product:", err, userData);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
    // const selectedFile = e.target.files?.[0];
    // if (selectedFile) {
    //   setFile(selectedFile);
    //   setProgress(0);
    //   setUploadedImageUrl(null);
    // }
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e, "eeeeee");

    try {
      const formData = new FormData();
      formData.append("seller_id", userData._id);
      // formData.append("proudctName", userData._id);

      // formData.append("file", file);

      // const response = await axios.post(
      //   `${baseUrl}/api/product/add-product`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     onUploadProgress: (progressEvent) => {
      //       const percentCompleted = Math.round(
      //         (progressEvent.loaded * 100) / (progressEvent.total || 1)
      //       );
      //       setProgress(percentCompleted);
      //     },
      //   }
      // );
      // setUploadedImageUrl(response.data.imageUrl);
    } catch (error) {
      console.log("Upload failed", error);
    }
  };

  useEffect(() => {
    console.log(data, "dddddddddd");
  }, []);
  return (
    <>
      <form className="space-y-4">
        <div className="flex flex-col items-center md:flex-row gap-x-10 gap-y-4 justify-center mt-10">
          <div className=" flex flex-col gap-y-2">
            <div className="relative flex items-start flex-col">
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="e.g Locket"
                className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                  formik.touched.productName && formik.errors.productName
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.productName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.productName && formik.errors.productName && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.productName}
                </span>
              )}
            </div>

            <div className="relative flex items-start flex-col">
              <input
                type="text"
                id="productDescription"
                name="productDescription"
                placeholder="e.g The Best locket ever"
                className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                  formik.touched.productDescription &&
                  formik.errors.productDescription
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.productDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.productDescription &&
                formik.errors.productDescription && (
                  <span className="text-red-500 text-[12px]">
                    {formik.errors.productDescription}
                  </span>
                )}
            </div>

            <div className="relative flex items-start flex-col">
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                placeholder="e.g 200"
                className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                  formik.touched.productPrice && formik.errors.productPrice
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.productPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.productPrice && formik.errors.productPrice && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.productPrice}
                </span>
              )}
            </div>
          </div>

          <div className=" flex flex-col gap-y-2">
            <div className="relative flex justify-start flex-col">
              <Select
                id="productCategory"
                name="productCategory"
                value={formik.values.productCategory} // Bind the selected value to Formik
                onChange={(option: any) => {
                  formik.setFieldValue("productCategory", option); // Update Formik's value
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "grey" : "black",

                    height: "48px",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isSelected
                      ? "black"
                      : state.isFocused
                      ? "#f0f0f0"
                      : "",
                    color: state.isSelected ? "white" : "inherit",
                    cursor: "pointer",
                  }),
                  menuList: (baseStyles) => ({
                    ...baseStyles,
                    // backgroundColor: "blue",
                    maxHeight: "150px",
                    overflowY: "auto",
                  }),
                }}
                options={options}
              />

              {formik.errors.productCategory &&
                formik.touched.productCategory && (
                  <span className="text-red-500 text-[12px] float-left flex-none">
                    {formik.errors.productCategory}
                  </span>
                )}
            </div>
            <div className="relative flex items-start flex-col">
              <input
                type="text"
                id="colores"
                name="colores"
                placeholder="e.g blue, green"
                className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                  formik.touched.colores && formik.errors.colores
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.colores}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.colores && formik.errors.colores && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.colores}
                </span>
              )}
            </div>

            <div className="relative flex items-start  flex-col">
              <input
                type="number"
                id="limitedCounts"
                name="limitedCounts"
                placeholder="e.g 200"
                className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                  formik.touched.limitedCounts && formik.errors.limitedCounts
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                value={formik.values.limitedCounts}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.limitedCounts && formik.errors.limitedCounts && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.limitedCounts}
                </span>
              )}
            </div>
          </div>
        </div>

        {data ? (
          <div className="flex flex-row flex-wrap gap-x-4">
            {data?.productImage?.map((img: any, idx: number) => (
              <img
                key={idx}
                src={img.link}
                alt="Product Image"
                width={100}
                height={100}
                className="w-20 h-20 rounded object-cover"
              />
            ))}
          </div>
        ) : (
          <FileInput
            file={file}
            setFile={setFile}
            handleUpload={handleUpload}
            handleFileChange={handleFileChange}
            progress={progress}
            multiple={true}
          />
        )}
        {data ? (
          <Button
            type="primary"
            size="md"
            text="update"
            clickHandler={updateProduct}
          />
        ) : (
          <Button
            type="primary"
            size="md"
            text="add"
            clickHandler={addNewProduct}
          />
        )}
      </form>
    </>
  );
};

export default NewProductForm;
