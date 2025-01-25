import Link from "next/link";
import React from "react";

const NavbarRoutes = () => {
  return (
    <div>
      <nav className="flex gap-x-[40px] font-afacad">
        <Link
          href="/"
          className="text-md font-normal border-b-2 border-transparent transition-all duration-500 hover:border-white"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-md font-normal border-b-2 border-transparent transition-all duration-500 hover:border-white"
        >
          About
        </Link>
        <Link
          href="/sell"
          className="text-md font-normal border-b-2 border-transparent transition-all duration-500 hover:border-white"
        >
          Sell
        </Link>
        <Link
          href="/products"
          className="text-md font-normal border-b-2 border-transparent transition-all duration-500 hover:border-white"
        >
          Products
        </Link>
      </nav>
    </div>
  );
};

export default NavbarRoutes;
