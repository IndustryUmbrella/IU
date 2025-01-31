import Logo from "@/public/svgs/logo";
import React from "react";
import NavbarRoutes from "./navbarRoutes";
import AuthOptions from "./authsOptions";
import BurgerMenu from "./burger";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-[6px]   sm:px-mobile md:px-tablet lg:px-desktop text-white">
      <div className="flex md:gap-x-[40px]  gap-x-[60px]  items-center">
        <div className="flex md:hidden">
          <BurgerMenu />
        </div>
        <Logo />
        <NavbarRoutes />
      </div>
      <AuthOptions />
    </div>
  );
};

export default Navbar;
