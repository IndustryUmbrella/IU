import React from "react";
import PrimaryInfoAccount from "./primaryInfoAccount";

const PersoanInfoAccount = ({ formik }: { formik: any }) => {
  return (
    <>
      <h1 className="text-3xl my-5 text-center md:text-left">
        You Bussiness Details
      </h1>

      <div className="flex flex-col gap-y-4 md:flex-row gap-x-10">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="relative flex flex-col">
            <input
              type="phone"
              id="phone"
              name="phone"
              placeholder="e.g +1 23456789"
              className={`w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.phone}
              </span>
            )}
          </div>
          <div className="relative flex flex-col">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className={`w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm ${
                formik.touched.address && formik.errors.address
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.address}
              </span>
            )}
          </div>
          <div className="relative flex flex-col">
            <input
              type="date"
              accept=""
              id="companyStartingTime"
              name="companyStartingTime"
              className={`w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm ${
                formik.touched.companyStartingTime &&
                formik.errors.companyStartingTime
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.companyStartingTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.companyStartingTime &&
              formik.errors.companyStartingTime && (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.companyStartingTime}
                </span>
              )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <PrimaryInfoAccount formik={formik} />
        </div>
      </div>
    </>
  );
};

export default PersoanInfoAccount;
