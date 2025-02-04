import SellPageMockup from "@/public/mockups/sellPageMockup";
import React from "react";
import Button from "../general/button";
import Link from "next/link";

const MainImageComponent = () => {
  return (
    <>
      <div className="mt-10 rounded-2xl border border-white flex flex-row justify-center md:justify-around items-center md:items-start overflow-x-hidden  p-4">
        <div className="text-white leading-10  mt-6 text-center md:text-left">
          <h1 className="text-3xl font-medium w-[400px]">
            Sell Your Product with Industry Umbrella{" "}
          </h1>
          <h1 className="text-lg mt-10">Just in Four Steps </h1>
          <Button
            className="mt-10 px-4 py-2"
            type="primary"
            text={<Link href="/register"> Register Your Bussiness</Link>}
            size="md"
          />
        </div>
        <div className="hidden md:flex">
          <SellPageMockup />
        </div>
      </div>
    </>
  );
};

export default MainImageComponent;
