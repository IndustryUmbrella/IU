"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import PaymentForm from "./checkoutButton";
import BackButton from "../general/backButton";

const PaymentDetails = ({ setShipStep }: { setShipStep: any }) => {
  const cartItem = useSelector((state: RootState) => state.cart.items);
  return (
    <>
      <PaymentForm />
      <BackButton clickHandler={() => setShipStep(1)} />
    </>
  );
};

export default PaymentDetails;
