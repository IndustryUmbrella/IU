import Logo from "@/public/svgs/logo";
import React from "react";
import NavbarRoutes from "./navbarRoutes";
import AuthOptions from "./authsOptions";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-[6px]   sm:px-mobile md:px-tablet lg:px-desktop text-white">
      <div className="flex gap-x-[40px] items-center">
        <Logo />
        <NavbarRoutes />
      </div>
      <AuthOptions />
    </div>
  );
};

export default Navbar;
