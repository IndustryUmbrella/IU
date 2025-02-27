import React from "react";
import Select from "react-select";
import InputField from "../general/inputField";

const ProductBasicInfo = ({ formik }: { formik: any }) => {
  const options = [
    { value: "living", label: "Home & living" },
    { value: "jewerly", label: "Jewerly & Accessories" },
    { value: "apperel", label: "Apperel and Wearbles" },
    { value: "art", label: "Art & collections" },
    { value: "gift", label: "Gift & Seasonable Items" },
    { value: "beauty", label: "Beauty & wellnes" },
    { value: "crafts", label: "Crafts" },
  ];

  return (
    <>
      <div className="flex flex-col items-center md:flex-row gap-x-10 gap-y-4 justify-center mt-10">
        <div className=" flex flex-col gap-y-1">
          <div className="">
            <InputField
              type="text"
              id="productName"
              name="productName"
              onChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.productName}
              labelText="Product Name"
              error={formik.errors.productName}
              touched={formik.touched.productName}
            />
          </div>

          <div className="">
            <InputField
              type="text"
              id="productDescription"
              name="productDescription"
              onChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.productDescription}
              labelText="Product Description"
              error={formik.errors.productDescription}
              touched={formik.touched.productDescription}
            />
          </div>

          <div className="">
            <InputField
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              onChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.stockQuantity}
              labelText="Stock Quantity"
              error={formik.errors.stockQuantity}
              touched={formik.touched.stockQuantity}
            />
          </div>
        </div>

        <div className=" flex flex-col gap-y-2">
          <div className="relative flex justify-start flex-col">
            <Select
              id="productCategory"
              name="productCategory"
              options={options}
              value={formik.values.productCategory}
              onChange={(option) => {
                formik.setFieldValue("productCategory", option);
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
                  maxHeight: "150px",
                  overflowY: "auto",
                }),
              }}
            />

            {formik.errors.productCategory &&
              formik.touched.productCategory && (
                <span className="text-red-500 text-[12px] float-left flex-none">
                  {formik.errors.productCategory}
                </span>
              )}
          </div>

          <div className="">
            <InputField
              type="number"
              id="weight"
              name="weight"
              onChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.weight}
              labelText="Product Weight"
              error={formik.errors.weight}
              touched={formik.touched.weight}
            />
          </div>
          <div className="relative flex items-start flex-col">
            <InputField
              type="text"
              id="subCategory"
              name="subCategory"
              onChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.subCategory}
              labelText="Sub Category"
              error={formik.errors.subCategory}
              touched={formik.touched.subCategory}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBasicInfo;
