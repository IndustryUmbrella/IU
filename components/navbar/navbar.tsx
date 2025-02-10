import Logo from "@/public/svgs/logo";
import React from "react";
import NavbarRoutes from "./navbarRoutes";
import AuthOptions from "./authsOptions";
import BurgerMenu from "./burger";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-[6px] mt-5  sm:px-mobile md:px-tablet lg:px-desktop text-white">
      <div className="flex md:gap-x-[40px]  gap-x-[1px] sm:gap-x-[50px]  items-center">
        <div className="flex md:hidden">
          <BurgerMenu />
        </div>
        <Link href="/">
          <Logo className={"w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"} />
        </Link>
        <NavbarRoutes />
      </div>
      <AuthOptions />
    </div>
  );
};

export default Navbar;
