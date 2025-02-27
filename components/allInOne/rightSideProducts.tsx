"use client";
import Hearth from "@/public/svgs/heart";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "../general/button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import { FaCartShopping } from "react-icons/fa6";

const RightSideProducts = ({
  isLoading,
  data,
}: {
  isLoading: false | boolean;
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
        <div className="flex gap-3 flex-col sm:flex-row ">
          <div className="grid gird-col-2 gap-4 w-full">
            <div className="w-auto h-auto min-h-[300px] min-w-[300px]  border border-white rounded-md px-4 py-2">
              <div className="flex justify-between my-3">
                <Skeleton baseColor="gray" circle width={50} height={50} />
                <Hearth />
              </div>
              <div className="flex gap-x-4">
                <Skeleton baseColor="gray" width={120} height={130} />
                <div>
                  <Skeleton baseColor="gray" width={130} height={10} />
                  <Skeleton baseColor="gray" width={130} height={10} />
                </div>
              </div>
              <Button
                type="primary"
                size="sm"
                text="See More"
                className="mt-5"
              />
            </div>
            <div className="w-auto h-auto min-h-[300px] min-w-[300px]  border border-white rounded-md px-4 py-2">
              <div className="flex justify-between my-3">
                <Skeleton baseColor="gray" circle width={50} height={50} />
                <Hearth />
              </div>
              <div className="flex gap-x-4">
                <Skeleton baseColor="gray" width={120} height={130} />
                <div>
                  <Skeleton baseColor="gray" width={130} height={10} />
                  <Skeleton baseColor="gray" width={130} height={10} />
                </div>
              </div>
              <Button
                type="primary"
                size="sm"
                text="See More"
                className="mt-5"
              />
            </div>
          </div>
        </div>
      ) : (
        data?.length > 1 && (
          <div className="flex gap-3 flex-col sm:flex-row ">
            <div className="grid gird-col-2 gap-4 w-full">
              {data?.map((product: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="w-auto h-auto min-h-[300px] min-w-[300px]    border border-white rounded-md px-4 py-2"
                  >
                    <div className="flex justify-between my-3">
                      <div className="flex flex-row gap-x-2 items-center">
                        <img
                          src={product?.productImage[0]?.link}
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <p className="text-white">{product?.companyName}</p>
                      </div>
                      <FaCartShopping
                        onClick={() => handleAddToCart(data[0])}
                        color="white"
                        size={24}
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="flex gap-x-4">
                      <img
                        src={product?.productImage[0]?.link}
                        className="w-[120px] h-[130px] rounded"
                      />
                      <div>
                        <p className="text-white ">{product?.productName}</p>
                        <p className="text-white ">
                          {product?.productDescription}
                        </p>
                        <p className="text-white  mt-4">
                          {product?.productPrice}$
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      type="primary"
                      text={
                        <Link href={`products/${product?.productId}`}>
                          More Details
                        </Link>
                      }
                      className="mt-5"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default RightSideProducts;
