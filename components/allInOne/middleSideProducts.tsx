"use client";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "../general/button";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { addToCart } from "@/app/store/cartSlice";
import { useDispatch } from "react-redux";

const MiddleSideProducts = ({
  isLoading,
  data,
}: {
  isLoading: true | boolean;
  data: any;
}) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product?.productId,
        name: product?.productName,
        price: product?.productPrice,
        quantity: 1,
        productImage: product?.productImage[0]?.link,
        description: product?.productDescription,
        category: product?.productCategory,
        seller_id: product?.seller_id,
        companyName: product?.companyName,
      })
    );
  };
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
        data?.length > 0 && (
          <div className="bg-white px-4  max-w-[450px] min-w-[330px] h-[605px] rounded-md">
            <div className="flex justify-between mt-2 ">
              <img
                src={data[0]?.productImage[0]?.link}
                className="rounded-full w-[50px] h-[50px]"
              />
              <FaCartShopping
                color="black"
                size={24}
                onClick={() => handleAddToCart(data[0])}
              />
            </div>
            <img
              src={data[0]?.productImage[0]?.link}
              className="w-full  h-[320px] rounded-lg mt-4 bg-blue-500 sm:h-[360px] mb-2 object-cover"
            />
            <div className="flex justify-between">
              <div>
                <p>{data[0]?.productName}</p>
                <p>{data[0]?.productDescription}</p>
                <p className="line-through">
                  {(
                    (data[0]?.productPrice * 100) /
                    (100 - data[0]?.discount)
                  ).toFixed(2)}
                  $
                </p>
                <p>{data[0]?.productPrice}$</p>
              </div>
              <div className="">
                <div className="flex flex-col gap-y-5 justify-between">
                  <p>{data[0]?.productCategory} Categorry</p>
                  <p>
                    {data[0]?.status == "active" ? (
                      <span className="bg-green-300 rounded-xl p-1 px-2">
                        In-Stock
                      </span>
                    ) : (
                      <span>Out Of Stock</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              type="secondary"
              text={
                <Link href={`products/${data[0]?.productId}`}>
                  More Details
                </Link>
              }
              className=" "
            />
          </div>
        )
      )}
    </>
  );
};

export default MiddleSideProducts;
