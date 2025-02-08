"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import CheckoutButton from "./checkoutButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import PaymentForm from "./checkoutButton";

const PaymentDetails = ({ setShipStep }: { setShipStep: any }) => {
  const cartItem = useSelector((state: RootState) => state.cart.items);
  return (
    <>
      <FaArrowLeft color="black" size={25} onClick={() => setShipStep(1)} />
      <PaymentForm />
    </>
  );
};

export default PaymentDetails;
