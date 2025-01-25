"use client";

import React, { useEffect, useState } from "react";
import "animate.css";
import Button from "../general/button";

const Slogan = () => {
  const [isBuy, setIsBuy] = useState(true); // Tracks whether "Buy" or "Sell" is displayed
  const [isAnimatingOut, setIsAnimatingOut] = useState(false); // Tracks outgoing animation state

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimatingOut(true); // Start hinge animation (outgoing)
      setTimeout(() => {
        setIsBuy((prev) => !prev); // Toggle between "Buy" and "Sell"
        setIsAnimatingOut(false); // Reset animation state for the new text
      }, 1500); // Duration of the hinge animation
    }, 8000); // Loop every 6 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="w-4/12 overflow-y-hidden">
      <div className="font-normal uppercase text-[60px] text-white font-aboreto ">
        Fastest Path to{" "}
        <h1
          className={`font-normal uppercase text-[60px] text-white font-aboreto ${
            isAnimatingOut
              ? "animate__animated animate__bounceOut" // Outgoing animation
              : "animate__animated animate__jackInTheBox" // Incoming animation
          }`}
          style={{ display: "inline-block" }}
        >
          {isBuy ? "Buy" : "Sell"}
        </h1>{" "}
        Your Product
      </div>
      <p className="font-afacad text-white text-2xl mt-[50px]">
        Connect with trusted buyers and sellers in your community, anytime,
        anywhere
      </p>

      <div className="mt-[60px] flex gap-x-[70px]">
        <Button size="md" type="primary" text="Buy a Product" />
        <Button size="md" type="secondary" text="Sell a Product" />
      </div>
    </div>
  );
};

export default Slogan;
