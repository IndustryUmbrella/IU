import Footer from "@/components/general/footer";
import MainImageComponent from "@/components/sellPageComponent/mainImageComponent";
import StepsCards from "@/components/sellPageComponent/stepsCards";
import React, { useState } from "react";

const SellProduct = () => {
  return (
    <div className="px-[6px] lg:px-desktop md:px-tablet sm:px-mobile  ">
      <MainImageComponent />
      <StepsCards />
    </div>
  );
};

export default SellProduct;
