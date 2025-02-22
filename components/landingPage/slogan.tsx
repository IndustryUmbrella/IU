"use client";

import React, { useEffect, useState } from "react";
import "animate.css";
import Button from "../general/button";
import Link from "next/link";

const Slogan = () => {
  const [isBuy, setIsBuy] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsBuy((prev) => !prev);
        setIsAnimatingOut(false);
      }, 1500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sm:px-32 lg:px-0  items-center justify-center mt-10 lg:w-auto xl:w-9/12  ">
      <div className="font-normal uppercase text-[40px] sm:text-[40px]  text-center  md:text-[60px] lg:text-[58px] text-white  font-aboreto ">
        Fastest Path to{" "}
        <h1
          className={`font-normal uppercase  sm:text-[40px] text-center  md:text-[60px] lg:text-[60px] text-white font-aboreto ${
            isAnimatingOut
              ? "animate__animated animate__bounceOut"
              : "animate__animated animate__jackInTheBox"
          }`}
          style={{ display: "inline-block" }}
        >
          {isBuy ? "Buy" : "Sell"}
        </h1>{" "}
        Your Product
      </div>
      <p className="font-afacad text-white text-xl text-center lg:text-2xl mt-[50px]">
        Connect with trusted buyers and sellers in your community, anytime,
        anywhere
      </p>

      <div className="mt-[60px] flex flex-col md:flex-row gap-y-[30px] gap-x-[70px] items-center justify-center ">
        <Link href="/products">
          <Button
            size="lg"
            type="primary"
            text="Buy a Product"
            className={"w-full min-w-[280px] lg:min-w-max"}
          />
        </Link>
        <Link href="/products">
          <Button
            size="lg"
            type="secondary"
            text="Sell a Product"
            className={"w-full min-w-[280px] lg:min-w-max"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Slogan;
