"use client";
import React, { useState } from "react";
import InputField from "../general/inputField";

const ProductPriceInfo = ({ formik }: { formik: any }) => {
  const [haveSize, setHaveSize] = useState(false);
  const [haveColor, setHaveColor] = useState(false);
  return (
    <div className=" flex flex-col gap-y-4 my-5 items-center justify-center">
      <div className="relative flex flex-col sm:flex-row gap-x-4 items-start ">
        <InputField
          type="number"
          id="productPrice"
          name="productPrice"
          value={formik.values.productPrice}
          onChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          error={formik.errors.productPrice}
          touched={formik.touched.productPrice}
          labelText="Product Price"
        />
        <InputField
          id="discount"
          name="discount"
          labelText="discount"
          type="number"
          value={formik.values.discount}
          error={formik.errors.discount}
          onChange={formik.handleChange}
          touched={formik.touched.discount}
          handleBlur={formik.handleBlur}
        />
      </div>
      <div className="relative flex flex-col gap-y-4 sm:flex-row gap-x-4 items-start ">
        <InputField
          disable={!haveSize}
          labelText="Product Sizes"
          type="text"
          id="sizes"
          name="sizes"
          value={formik.values.sizes}
          error={formik.errors.sizes}
          onChange={formik.handleChange}
          touched={formik.touched.sizes}
          handleBlur={formik.handleBlur}
        />

        <InputField
          disable={!haveColor}
          labelText="Product colors"
          type="text"
          id="colors"
          name="colors"
          value={formik.values.colors}
          error={formik.errors.colors}
          onChange={formik.handleChange}
          touched={formik.touched.colors}
          handleBlur={formik.handleBlur}
        />
      </div>
      <div className="relative flex flex-col gap-y-4 sm:flex-row gap-x-4 items-start ">
        <div className="flex items-center justify-center gap-x-1">
          <input
            type="checkbox"
            id="haveSize"
            name="haveSize"
            onChange={(e) => setHaveSize(e.target.checked)}
            checked={haveSize}
            className="w-4 h-4 accent-green-900 checked:accent-green-900 cursor-pointer"
          />
          <label htmlFor="haveSize" className="text-sm">
            Check if your product have specific sizes{" "}
          </label>
        </div>

        <div className="flex items-center justify-center gap-x-1">
          <input
            type="checkbox"
            id="haveColor"
            name="haveColor"
            onChange={(e) => setHaveColor(e.target.checked)}
            checked={haveColor}
            className="w-4 h-4 accent-green-900 checked:accent-green-900 cursor-pointer"
          />
          <label htmlFor="haveColor" className="text-sm">
            Check if your product have specific sizes{" "}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductPriceInfo;
