import LoginForm from "@/components/auth/loginForms";
import AuthMockups from "@/public/mockups/auathMockup";
import React, { useState } from "react";

const Login = () => {
  return (
    <div className=" px-[6px] sm:px-mobile md:px-tablet lg:px-desktop mt-10">
      <div className="  flex items-center justify-around">
        <LoginForm />
        <div className="  px-10 py-10">
          <AuthMockups />
        </div>
      </div>
    </div>
  );
};

export default Login;
