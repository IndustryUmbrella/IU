import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import Button from "../general/button";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerData } from "@/app/store/buyerSlice";
import { RootState } from "@/app/store/store";

const ShippingDataForm = ({ setShipState }: { setShipState: any }) => {
  const dispatch = useDispatch();
  const buyerData = useSelector((state: RootState) => state.buyer.shippingData);
  const ShippingSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last name is required"),
    phone: Yup.string().required(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    region: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    address: Yup.string().required(),
    zipcode: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      region: "",
      city: "",
      state: "",
      address: "",
      zipcode: "",
    },
    validationSchema: ShippingSchema,
    onSubmit: () => {
      console.log("maish");
    },
  });

  useEffect(() => {
    if (buyerData) {
      formik.setValues({
        email: buyerData?.email || "",
        firstname: buyerData?.firstname || "",
        lastname: buyerData?.lastname || "",
        phone: buyerData?.phone || "",
        region: buyerData?.region || "",
        city: buyerData?.city || "",
        state: buyerData?.states || "",
        address: buyerData?.address || "",
        zipcode: buyerData?.zipcode || "",
      });
    }
  }, [buyerData]);

  const handleBuyerData = () => {
    dispatch(
      setBuyerData({
        email: formik.values.email,
        firstname: formik.values.firstname,
        lastname: formik.values.lastname,
        phone: formik.values.phone,
        region: formik.values.region,
        city: formik.values.phone,
        states: formik.values.state,
        address: formik.values.address,
        zipcode: formik.values.zipcode,
      })
    );
    setShipState(2);
  };

  return (
    <>
      <div className="flex flex-col gap-y-3">
        <div className="relative flex flex-col">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g example@gmail.com"
            className={`w-[260px] md:w-full  h-12 border rounded px-2 text-sm ${
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
        <div className="flex flex-row gap-x-2">
          <div className="relative flex flex-col">
            <input
              type="firstname"
              id="firstname"
              name="firstname"
              placeholder="e.g John"
              className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                formik.touched.firstname && formik.errors.firstname
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.firstname}
              </span>
            )}
          </div>
          <div className="relative flex flex-col">
            <input
              type="lastname"
              id="lastname"
              name="lastname"
              placeholder="e.g Doe"
              className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                formik.touched.lastname && formik.errors.lastname
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.lastname}
              </span>
            )}
          </div>
        </div>

        <div className="relative flex flex-col">
          <input
            type="phone"
            id="phone"
            name="phone"
            placeholder="+12345678"
            className={`w-[260px] md:w-full  h-12 border rounded px-2 text-sm ${
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
        <div className="flex flex-row gap-x-2">
          <div className="relative flex flex-col">
            <input
              type="region"
              id="region"
              name="region"
              placeholder="e.g USA"
              className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                formik.touched.region && formik.errors.region
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.region}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.region && formik.errors.region && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.region}
              </span>
            )}
          </div>
          <div className="relative flex flex-col">
            <input
              type="city"
              id="city"
              name="city"
              placeholder="Texas"
              className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                formik.touched.city && formik.errors.city
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.city}
              </span>
            )}
          </div>
        </div>

        <div className="relative flex flex-col">
          <input
            type="address"
            id="address"
            name="address"
            placeholder="address"
            className={`w-full  h-12 border rounded px-2 text-sm ${
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
        <div className="flex flex-row gap-x-2">
          <div className="relative flex flex-col">
            <input
              type="state"
              id="state"
              name="state"
              placeholder="e.g California"
              className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                formik.touched.state && formik.errors.state
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.state && formik.errors.state && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.state}
              </span>
            )}
          </div>
          <div className="relative flex flex-col">
            <input
              type="zipcode"
              id="zipcode"
              name="zipcode"
              placeholder="76115"
              className={`w-[260px] md:w-64  h-12 border rounded px-2 text-sm ${
                formik.touched.city && formik.errors.zipcode
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.zipcode && formik.errors.zipcode && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.zipcode}
              </span>
            )}
          </div>
        </div>
        <Button
          type="secondary"
          size="lg"
          text="Next"
          clickHandler={handleBuyerData}
        />
      </div>
    </>
  );
};

export default ShippingDataForm;
