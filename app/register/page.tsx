import ReigsterForm from "@/components/auth/registerForms";
import AuthMockups from "@/public/mockups/auathMockup";
import React, { useState } from "react";

const Reigster = () => {
  return (
    <div className=" px-[6px] sm:px-mobile md:px-tablet lg:px-desktop mt-10">
      <div className="  flex items-center justify-around">
        <ReigsterForm />
        <div className="  px-10 py-10">
          <AuthMockups />
        </div>
      </div>
    </div>
  );
};

export default Reigster;
