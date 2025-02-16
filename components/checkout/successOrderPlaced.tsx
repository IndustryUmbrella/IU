import SuccessPaymentMockup from "@/public/mockups/successPayment";
import React from "react";
import Button from "../general/button";
import Link from "next/link";

const SuccessOrderPlaced = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <SuccessPaymentMockup />
      <h1 className="text-white text-2xl">Your Order submitted successfully</h1>
      <Button
        type="primary"
        text={<Link href="/products?tab=all">Back To Products</Link>}
        size="md"
        className="mt-5"
      />
    </div>
  );
};

export default SuccessOrderPlaced;
