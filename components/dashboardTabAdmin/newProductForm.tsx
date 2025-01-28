import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Button from "../general/button";

const NewProductForm = () => {
  const userData = useSelector((state: RootState) => state.seller.user);
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
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
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

  const addProduct = async () => {
    console.log("clicked", formik.errors);
    if (Object.keys(formik.errors).length > 0) return;

    try {
      const updateData: any = {};

      if (formik.values.productName)
        updateData.products = [
          {
            productName: formik.values.productCategory,
            productDescription: formik.values.productCategory,
            productPrice: formik.values.productPrice,
            colores: formik.values.colores,
            limitedCounts: formik.values.limitedCounts,
          },
        ];

      //   if (formik.values.phone) updateData.phone = formik.values.phone;
      //   if (formik.values.address) updateData.address = formik.values.address;
      //   if (formik.values.companyStartingTime)
      //     updateData.companyStartingTime = formik.values.companyStartingTime;

      //   const product = [
      //     formik.values.productName && {
      //       title: "Facebook",
      //       link: formik.values.facebook,
      //     },
      //     formik.values.instagram && {
      //       title: "Instagram",
      //       link: formik.values.instagram,
      //     },
      //     formik.values.twitter && {
      //       title: "Twitter",
      //       link: formik.values.twitter,
      //     },
      //     formik.values.linkedin && {
      //       title: "LinkedIn",
      //       link: formik.values.linkedin,
      //     },
      //     formik.values.pinterest && {
      //       title: "Pinterest",
      //       link: formik.values.pinterest,
      //     },
      //     formik.values.website && {
      //       title: "Website",
      //       link: formik.values.website,
      //     },
      //   ].filter(Boolean); // Remove undefined values

      //   if (socialLinks.length > 0) updateData.socialLinks = socialLinks;

      // Make the PUT request only if there's data to update
      if (Object.keys(updateData).length > 0) {
        const response = await axios.put(
          `http://localhost:5000/api/auth/seller/${
            userData?.seller?._id || userData?._id
          }`,
          updateData
        );
        // setShowNotification({
        //   isShow: true,
        //   content: "Fields Updated Successfully",
        //   success: true,
        // });
      } else {
        // setShowNotification({
        //   isShow: true,
        //   content: "No fields to update",
        //   success: false,
        // });
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

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
        <Button type="primary" size="md" text="add" clickHandler={addProduct} />
      </form>
    </>
  );
};

export default NewProductForm;
