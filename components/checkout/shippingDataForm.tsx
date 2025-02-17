import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import Button from "../general/button";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerData } from "@/app/store/buyerSlice";
import { RootState } from "@/app/store/store";
import InputField from "../general/inputField";

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
      handleBuyerData();
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
      <form onSubmit={formik.handleSubmit}>
        <div className=" flex flex-col gap-y-3 items-center  sm:items-start justify-center sm:justify-start">
          <div className="relative flex flex-col justify-center :items-center md:justify-center  w-full">
            <InputField
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.email}
              labelText=" Email"
              error={formik.errors.email}
              touched={formik.touched.email}
              className=" w-[530px]  max-w-[260px] sm:max-w-[530px]"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center  gap-x-2">
            <div className="relative flex flex-col ">
              <InputField
                type="text"
                id="firstname"
                name="firstname"
                onChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.firstname}
                labelText=" firstname"
                error={formik.errors.firstname}
                touched={formik.touched.firstname}
              />
            </div>
            <div className="relative flex flex-col ">
              <InputField
                type="text"
                id="lastname"
                name="lastname"
                onChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.lastname}
                labelText=" lastname"
                error={formik.errors.lastname}
                touched={formik.touched.lastname}
              />
            </div>
          </div>

          <div className="relative flex flex-col w-full ">
            <InputField
              type="text"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.phone}
              labelText=" phone"
              error={formik.errors.phone}
              touched={formik.touched.phone}
              className=" w-full max-w-[260px] sm:max-w-[530px]"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-x-2">
            <div className="relative flex flex-col ">
              <InputField
                type="text"
                id="region"
                name="region"
                onChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.region}
                labelText=" region"
                error={formik.errors.region}
                touched={formik.touched.region}
              />
            </div>
            <div className="relative flex flex-col ">
              <InputField
                type="text"
                id="city"
                name="city"
                onChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.city}
                labelText=" city"
                error={formik.errors.city}
                touched={formik.touched.city}
              />
            </div>
          </div>

          <div className="relative flex flex-col w-full">
            <InputField
              type="text"
              id="address"
              name="address"
              onChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.address}
              labelText=" address"
              error={formik.errors.address}
              touched={formik.touched.address}
              className=" w-full max-w-[260px] sm:max-w-[530px]"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-x-2">
            <div className="relative flex flex-col ">
              <InputField
                type="text"
                id="state"
                name="state"
                onChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.state}
                labelText=" state"
                error={formik.errors.state}
                touched={formik.touched.state}
              />
            </div>
            <div className="relative flex flex-col ">
              <InputField
                type="text"
                id="zipcode"
                name="zipcode"
                onChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.zipcode}
                labelText=" zipcode"
                error={formik.errors.zipcode}
                touched={formik.touched.zipcode}
              />
            </div>
          </div>
          <Button
            type="secondary"
            size="lg"
            text="Next"
            action="submit"
            // clickHandler={handleBuyerData}
          />
        </div>
      </form>
    </>
  );
};

export default ShippingDataForm;
