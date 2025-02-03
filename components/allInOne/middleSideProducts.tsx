import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "../general/button";
import { FaHeart } from "react-icons/fa6";
import { Carousel } from "react-responsive-carousel";

const MiddleSideProducts = ({
  isLoading,
  data,
}: {
  isLoading: true | boolean;
  data: any;
}) => {
  return (
    <>
      {isLoading ? (
        <div className="bg-white px-4 w-full min-w-[340px]  h-[605px] rounded-md">
          <Skeleton baseColor="#090909" circle width={50} height={50} />
          <Skeleton baseColor="#090909" height={400} />
          <div className="text-center">
            <Skeleton
              baseColor="black"
              width={250}
              height={20}
              className="text-center mx-5 mt-5"
            />
            <Skeleton baseColor="black" width={300} height={20} className="" />
          </div>
          <Button
            className={"w-full mt-6"}
            type="secondary"
            size="md"
            text="See More"
          />
        </div>
      ) : (
        <div className="bg-white px-4 w-[500px] min-w-[440px] h-[605px] rounded-md">
          <div className="flex justify-between mt-2 ">
            <img
              src={data[0]?.productImage[0]?.link}
              width={50}
              height={50}
              className="rounded-full"
            />
            <FaHeart color="black" size={24} />
          </div>
          <img
            src={data[0]?.productImage[0]?.link}
            alt=""
            className="w-full px-10 h-[360px]"
          />

          <div className="text-center">
            <p>{data[0]?.productName}</p>
            <p>{data[0]?.productDescription}</p>
            <p>{data[0]?.productPrice}</p>
          </div>
          <Button
            className={"w-full mt-6"}
            type="secondary"
            size="md"
            text="See More"
          />
        </div>
      )}
    </>
  );
};

export default MiddleSideProducts;
