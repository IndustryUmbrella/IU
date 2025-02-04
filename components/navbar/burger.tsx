"use client";
import Link from "next/link";
import React, { useState } from "react";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Burger Icon */}
      <div
        className="burger z-[1000000] flex flex-col gap-1 items-start cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`h-2 w-10 ${
            isOpen ? "bg-primary" : "bg-white"
          } rounded transition-all duration-500 transform ${
            isOpen
              ? "rotate-[55deg] translate-y-[12px]"
              : "rotate-0 translate-y-0"
          }`}
        ></div>
        <div
          className={`h-2 w-8 ${
            isOpen ? "bg-primary" : "bg-white"
          } rounded transition-all duration-500 transform ${
            isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        ></div>
        <div
          className={`h-2 ${
            isOpen ? "w-10 bg-primary" : "w-5 bg-white"
          } rounded transition-all duration-500 transform ${
            isOpen
              ? "-rotate-[50deg] -translate-y-[12px]"
              : "rotate-0 translate-y-0"
          }`}
        ></div>
      </div>

      <div
        className={`fixed top-0 left-0 z-[10000] bg-white text-primary p-4 flex flex-col items-center justify-center gap-y-10 h-screen w-screen transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link
          href="/"
          className="py-2 text-lg hover:border-b-2 transition-all duration-200 hover:border-b-[#090909] rounded"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        {/* <Link
          href="/about"
          className="py-2 text-lg hover:border-b-2 transition-all duration-200 hover:border-b-[#090909] rounded"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link> */}
        <Link
          href="/sell"
          className="py-2 text-lg hover:border-b-2 transition-all duration-200 hover:border-b-[#090909] rounded"
          onClick={() => setIsOpen(false)}
        >
          Sell
        </Link>
        <Link
          href="/products"
          className="py-2 text-lg hover:border-b-2 transition-all duration-200 hover:border-b-[#090909] rounded"
          onClick={() => setIsOpen(false)}
        >
          Product
        </Link>
        <Link
          href="/contact"
          className="py-2 text-lg hover:border-b-2 transition-all duration-200 hover:border-b-[#090909] rounded"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </div>
    </>
  );
};

export default BurgerMenu;
