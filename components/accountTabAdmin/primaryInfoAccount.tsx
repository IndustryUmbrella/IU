import React from "react";

const PrimaryInfoAccount = ({ formik }: { formik: any }) => {
  return (
    <>
      <div className="relative flex flex-row">
        <input
          disabled={true}
          type="text"
          id="BussinessName"
          name="BussinessName"
          placeholder="e.g +1 23456789"
          className={`w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm ${
            formik.touched.companyName && formik.errors.companyName
              ? "border-red-500"
              : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.companyName && formik.errors.companyName && (
          <span className="text-red-500 text-[12px]">
            {formik.errors.companyName}
          </span>
        )}
      </div>
      <div className="relative flex flex-col">
        <input
          disabled={true}
          type="text"
          id="email"
          name="email"
          placeholder="email"
          className={`w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-red-500 text-[12px]">
            {formik.errors.email}
          </span>
        )}
      </div>
      <div className="relative flex flex-col">
        <input
          disabled={true}
          type="password"
          id="password"
          name="password"
          className={`w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm ${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-red-500 text-[12px]">
            {formik.errors.password}
          </span>
        )}
      </div>
    </>
  );
};

export default PrimaryInfoAccount;
