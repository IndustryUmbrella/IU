"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import BackButton from "../general/backButton";
import { setMethod } from "@/app/store/checkoutSlice";
import StripeMethod from "./stripeMethod";
import { FaCcMastercard, FaMoneyBill, FaPaypal } from "react-icons/fa6";
// import PayPalButton from "./paypalMethod";
import CashPay from "./cashPay";

const PaymentDetails = ({ setShipStep }: { setShipStep: any }) => {
  const dispatch = useDispatch();
  const paymentMethod = useSelector(
    (state: RootState) => state.checkout.method
  );

  const handlePaymentChange = (method: string) => {
    dispatch(setMethod(method));
  };

  return (
    <>
      <div className="flex flex-col gap-y-5 items-start md:items-center w-full  overflow-x-hidden ">
        <label
          htmlFor="stripe"
          className={`text-white flex px-4 cursor-pointer justify-between flex-row items-center transition-all duration-300  rounded 
          gap-x-4   ${
            paymentMethod === "Stripe"
              ? "bg-blue-600 border-2 border-blue-500 border-opacity-10"
              : "border-2 border-white border-opacity-40"
          }`}
        >
          <FaCcMastercard color="white" size={40} />
          <input
            type="radio"
            id="stripe"
            name="payment"
            value="Stripe"
            className="hidden"
            checked={paymentMethod === "Stripe"}
            onChange={() => handlePaymentChange("Stripe")}
          />
          Stripe Method (Master Card)
        </label>

        <label
          htmlFor="paypal"
          className={`text-white flex cursor-pointer px-4 flex-row items-center transition-all duration-300  rounded w-full max-w-[530px] max
           gap-x-4 justify-between  ${
             paymentMethod === "Paypal"
               ? "bg-blue-600 border-2 border-blue-500 border-opacity-10"
               : "border-2 border-white border-opacity-40"
           }`}
        >
          <FaPaypal color="white" size={40} />
          <input
            disabled
            type="radio"
            id="paypal"
            className="hidden"
            name="payment"
            value="Paypal"
            checked={paymentMethod === "Paypal"}
            onChange={() => handlePaymentChange("Paypal")}
          />
          Paypal
        </label>

        <label
          htmlFor="cash"
          className={`text-white px-4 cursor-pointer flex flex-row items-center  rounded w-full max-w-[300px] sm:max-w-[530px]
          gap-x-4 justify-between transition-all duration-300 ${
            paymentMethod === "Cash Pay"
              ? "bg-blue-600 border-2 border-blue-500 border-opacity-40"
              : "border-2 border-white border-opacity-40"
          }`}
        >
          <FaMoneyBill color="white" size={40} />
          <input
            type="radio"
            className="hidden"
            id="cash"
            name="payment"
            value="Cash Pay"
            checked={paymentMethod === "Cash Pay"}
            onChange={() => handlePaymentChange("Cash Pay")}
          />
          Cash Pay
        </label>
      </div>

      {paymentMethod == "Stripe" ? (
        <StripeMethod />
      ) : // ) : paymentMethod == "Paypal" ? (
      //   <PayPalButton />
      paymentMethod == "Cash Pay" ? (
        <CashPay />
      ) : null}
      <BackButton clickHandler={() => setShipStep(1)} />
    </>
  );
};

export default PaymentDetails;
