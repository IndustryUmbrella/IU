"use client";
import React from "react";
import Slogan from "./slogan";
import UnsortedDivs from "./unsortedDivs";
import LeftSideProducts from "../allInOne/leftSideProducts";
import MiddleSideProducts from "../allInOne/middleSideProducts";
import RightSideProducts from "../allInOne/rightSideProducts";
import Button from "../general/button";
import { useDispatch, useSelector } from "react-redux";

const Landing = () => {
  return (
    <div className="px-[6px] sm:px-mobile md:px-tablet lg:px-desktop mt-10 overflow-x-hidden">
      <div className="block lg:flex min-h-screen overflow-x-hidden">
        <Slogan />
        <UnsortedDivs />
      </div>
      <div className="mt-5">
        <div className="flex justify-between">
          <h1 className="text-4xl capitalize text-white text-center font-aboreto mb-14">
            All In One
          </h1>
          <Button type="primary" size="md" text="See All Products" />
        </div>
        <div className="flex gap-y-4 flex-col lg:flex-row gap-x-4 justify-between overflow-x-hidden">
          <LeftSideProducts />
          <MiddleSideProducts />
          <RightSideProducts />
        </div>
      </div>
    </div>
  );
};

export default Landing;
