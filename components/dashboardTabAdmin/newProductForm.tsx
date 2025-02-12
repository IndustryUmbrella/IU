"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Button from "../general/button";
import { triggerRefresh } from "@/app/store/productSlice";
import Cookies from "js-cookie";
import Notification from "../general/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ProductBasicInfo from "./productBasicInfo";
import ProductPriceInfo from "./productPriceInfo";
import ProductMediaStep from "./productMediaStep";

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

  const [imagesForRemove, setImagesForRemove] = useState<String[]>([]);
  const [productSubmitionStep, setProductSubmitionStep] = useState(1);
  const [images, setImages] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState({
    isShow: false,
    content: "",
    success: true,
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

  const productSchema = Yup.object({
    productName: Yup.string().required("Product name is required"),
    productDescription: Yup.string().required("Description is required"),
    productPrice: Yup.number().required("Product price is required").min(1),
    sizes: Yup.string(),
    productCategory: Yup.object().shape({
      value: Yup.string().required("Category selection is required"),
    }),
    discount: Yup.number().required("Discount is required"),
    subCategory: Yup.string().required("Subcategory is required"),
    colors: Yup.string(),
    stockQuantity: Yup.string().required("Limited count is required"),
    weight: Yup.number().required(),
  });

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const token = Cookies.get("authToken");

  const formik: any = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productImages: "",
      productPrice: "",
      discount: "",
      sizes: null,
      productCategory: null,
      subCategory: "",
      colors: null,
      weight: 0,
      stockQuantity: "",
    },
    validationSchema: productSchema,
    onSubmit: () => {
      if (data) {
        updateProduct();
      } else {
        addNewProduct();
      }
    },
  });

  useEffect(() => {
    if (products && data) {
      formik.setValues({
        productName: data.productName || "",
        productDescription: data.productDescription || "",
        productImages: data?.productImages || "",
        productCategory:
          options.find((option) => option.value === data?.productCategory) ||
          null,
        subCategory: data?.subCategory || "",
        productPrice: data?.productPrice || "",
        discount: data?.discount || 0,
        sizes: data?.sizes || null,
        colors: data.colors?.[0] || null,
        stockQuantity: data.stockQuantity || 0,
        weight: data?.weight || 0,
      });
    }
  }, [data, products]);

  const addNewProduct = async () => {
    if (Object.keys(formik.errors).length > 0) return;
    const formData = new FormData();
    formData.append("seller_id", userData?._id);
    formData.append("productName", formik.values.productName);
    formData.append("productDescription", formik.values.productDescription);
    formData.append("productCategory", formik.values.productCategory?.value);
    formData.append("subCategory", formik.values.subCategory);
    formData.append("productPrice", String(formik.values.productPrice || 0));
    formData.append("discount", String(formik.values.discount || 0));
    formData.append("colors", JSON.stringify(formik.values.colors || null));
    formData.append("sizes", JSON.stringify(formik.values.sizes || null));
    formData.append("stockQuantity", String(formik.values.stockQuantity || 0));
    formData.append("weight", String(formik.values.weight || 0));

    if (images && typeof images === "object") {
      Object.values(images).forEach((image: any) => {
        formData.append("images", image);
      });
    } else {
      setShowNotification({
        isShow: true,
        content: "No Image Selected",
        success: false,
      });
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${baseUrl}/api/product/add-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setShowNotification({
        isShow: true,
        content: "Product added successfully",
        success: true,
      });
      setIsLoading(false);
      setShowOverlay(false);
      dispatch(triggerRefresh());
    } catch (err: any) {
      setShowNotification({
        isShow: true,
        content: err?.message || "Something went wrong",
        success: false,
      });
      setIsLoading(false);
    }
  };

  const updateProduct = async () => {
    if (Object.keys(formik.errors).length > 0) return;

    try {
      setIsLoading(true);

      await axios.put(
        `${baseUrl}/api/product/product/${data?.productId}/${
          userData?.seller_id || userData?._id
        }`,
        {
          seller_id: userData?._id,
          productName: formik.values.productName,
          productDescription: formik.values.productDescription,
          productCategory: formik.values.productCategory?.value,
          // productImage: data?.productImage,
          productImage: data?.productImage.filter(
            (img: any) => !imagesForRemove.includes(img.imageId)
          ),
          productPrice: formik.values.productPrice,
          discount: formik.values.discount,
          sizes: formik.values.sizes,
          colors: formik.values.colors,
          stockQuantity: formik.values.stockQuantity,
          weight: formik.values.weight,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowOverlay(false);
      dispatch(triggerRefresh());
      setShowNotification({
        isShow: true,
        content: "Product updated successfully",
        success: true,
      });
    } catch (err: any) {
      setShowNotification({
        isShow: true,
        content: err?.message || "Something went wrong",
        success: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const notif = setTimeout(
      () => setShowNotification({ isShow: false, content: "", success: true }),
      4000
    );
    return () => clearTimeout(notif);
  }, [showNotification]);

  return (
    <>
      {showNotification.isShow && <Notification {...showNotification} />}
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        {productSubmitionStep === 1 ? (
          <ProductBasicInfo formik={formik} />
        ) : productSubmitionStep === 2 ? (
          <ProductPriceInfo formik={formik} />
        ) : (
          <ProductMediaStep
            setImagesForRemove={setImagesForRemove}
            imagesForRemove={imagesForRemove}
            images={images}
            setImages={setImages}
            data={data}
            userData={userData}
          />
        )}
        <div className="flex justify-between">
          {productSubmitionStep > 1 && (
            <Button
              type="primary"
              size="md"
              text="Previous"
              action="button"
              clickHandler={() =>
                setProductSubmitionStep(productSubmitionStep - 1)
              }
            />
          )}

          {productSubmitionStep === 1 && (
            <Button
              type="primary"
              size="md"
              text="Cancel"
              action="button"
              clickHandler={() => setShowOverlay(false)}
            />
          )}

          {(productSubmitionStep === 1 || productSubmitionStep === 2) && (
            <Button
              type="secondary"
              size="md"
              text="Next"
              action="button"
              clickHandler={() =>
                setProductSubmitionStep(productSubmitionStep + 1)
              }
            />
          )}

          {/* Step 3: Show Add Product or Update button */}
          {productSubmitionStep === 3 && (
            <Button
              type={isLoading ? "disable" : "secondary"}
              size="md"
              text={
                isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : data ? (
                  "Update"
                ) : (
                  "Add Product"
                )
              }
              action="submit"
              clickHandler={() => {
                formik.handleSubmit();
              }}
            />
          )}
        </div>
      </form>
    </>
  );
};

export default NewProductForm;
