import React from "react";
import InputField from "../general/inputField";

const ProductPriceInfo = ({ formik }: { formik: any }) => {
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
          labelText="Product Sizes"
          type="text"
          id="sizes"
          name="sizes"
          value={formik.values.sizes}
          error={formik.errors.sizes}
          onChange={formik.handleChange}
          touched={formik.touched.sizes}
          handleBlur={formik.handleBlur}
          className="-mt-3"
        />

        <InputField
          labelText="Product colors"
          type="text"
          id="colors"
          name="colors"
          value={formik.values.colors}
          error={formik.errors.colors}
          onChange={formik.handleChange}
          touched={formik.touched.colors}
          handleBlur={formik.handleBlur}
          className="-mt-3"
        />
      </div>
    </div>
  );
};

export default ProductPriceInfo;
