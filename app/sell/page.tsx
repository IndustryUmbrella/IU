import Footer from "@/components/general/footer";
import MainImageComponent from "@/components/sellPageComponent/mainImageComponent";
import StepsCards from "@/components/sellPageComponent/stepsCards";
import { Metadata } from "next";
import React, { useState } from "react";

export const metadata: Metadata = {
  title: " Sell Page | Industry Umbrella",
  description: "how you can sell your product ",
};

const SellProduct = () => {
  return (
    <div className="px-[6px] lg:px-desktop md:px-tablet sm:px-mobile  ">
      <MainImageComponent />
      <StepsCards />
    </div>
  );
};

export default SellProduct;
