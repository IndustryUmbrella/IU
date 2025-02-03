"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavbarRoutes = () => {
  const pathname = usePathname();

  return (
    <div>
      <nav className=" hidden md:flex gap-x-[40px] font-afacad">
        <Link
          href="/"
          className={`text-md border-b-2 border-transparent transition-all duration-500 ${
            pathname === "/"
              ? "font-bold border-l-2 border-l-white px-1"
              : "font-normal"
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`text-md border-b-2 border-transparent transition-all duration-500 ${
            pathname === "/about"
              ? "font-bold border-l-2 border-l-white px-1"
              : "font-normal"
          }`}
        >
          About
        </Link>
        <Link
          href="/sell"
          className={`text-md border-b-2 border-transparent transition-all duration-500 ${
            pathname === "/sell"
              ? "font-bold border-l-2 border-l-white px-1"
              : "font-normal"
          }`}
        >
          Sell
        </Link>
        <Link
          href="/products?tab=all"
          className={`text-md border-b-2 border-transparent transition-all duration-500 ${
            pathname === "/products?tab=all"
              ? "font-bold border-l-2 border-l-white px-1"
              : "font-normal"
          }`}
        >
          Products
        </Link>
        <Link
          href="/contact"
          className={`text-md border-b-2 border-transparent transition-all duration-500 ${
            pathname === "/contact"
              ? "font-bold border-l-2 border-l-white px-1"
              : "font-normal"
          }`}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default NavbarRoutes;
