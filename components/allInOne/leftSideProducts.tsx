"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Button from "../general/button";
import Save from "@/public/svgs/save";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useState } from "react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { addToCart } from "@/app/store/cartSlice";

const LeftSideProducts = ({
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
        <div className="flex flex-col gap-4">
          <div className="bg-primary rounded-md w-auto h-full border border-white px-2 flex gap-x-4  justify-between py-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-x-2 items-center ">
                <Skeleton
                  count={1}
                  height={50}
                  width={50}
                  circle={true}
                  baseColor="gray"
                />
                <Skeleton
                  height={30}
                  width={100}
                  baseColor="gray"
                  className="mb-2"
                />
              </div>
              <Skeleton
                className="min-w-[150px] min-h-[20px] w-full h-full"
                baseColor="gray"
              />
              <Skeleton
                className="min-w-[150px] min-h-[20px] w-full h-full"
                baseColor="gray"
              />
              <div className="flex gap-x-2 sm:gap-x-4 items-center mt-2">
                <FaCartShopping color="white" size="18" />
                <Button
                  size="sm"
                  type="primary"
                  text="more details"
                  className="text-sm"
                />
              </div>
            </div>
            <div>
              <Skeleton
                className="w-auto min-w-[150px] h-auto min-h-[150px] mb-2"
                baseColor="gray"
              />
            </div>
          </div>
          <div className="bg-primary rounded-md w-auto h-full border border-white px-2 flex gap-x-4  justify-between py-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-x-2 items-center ">
                <Skeleton
                  count={1}
                  height={50}
                  width={50}
                  circle={true}
                  baseColor="gray"
                />
                <Skeleton
                  height={30}
                  width={100}
                  baseColor="gray"
                  className="mb-2"
                />
              </div>
              <Skeleton
                className="min-w-[150px] min-h-[20px] w-full h-full"
                baseColor="gray"
              />
              <Skeleton
                className="min-w-[150px] min-h-[20px] w-full h-full"
                baseColor="gray"
              />
              <div className="flex gap-x-4 items-center mt-2">
                <FaCartShopping color="white" size={18} />
                <Button size="sm" type="primary" text="more details" />
              </div>
            </div>
            <div>
              <Skeleton
                className="w-auto min-w-[150px] h-auto min-h-[150px] mb-2"
                baseColor="gray"
              />
            </div>
          </div>
          <div className="bg-primary rounded-md w-auto h-full border border-white px-2 flex gap-x-4  justify-between py-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-x-2 items-center ">
                <Skeleton
                  count={1}
                  height={50}
                  width={50}
                  circle={true}
                  baseColor="gray"
                />
                <Skeleton
                  height={30}
                  width={100}
                  baseColor="gray"
                  className="mb-2"
                />
              </div>
              <Skeleton
                className="min-w-[150px] min-h-[20px] w-full h-full"
                baseColor="gray"
              />
              <Skeleton
                className="min-w-[150px] min-h-[20px] w-full h-full"
                baseColor="gray"
              />
              <div className="flex gap-x-4 items-center mt-2">
                <FaCartShopping color="white" size={18} />
                <Button
                  size="sm"
                  type="primary"
                  text="more details"
                  className="text-sm"
                />
              </div>
            </div>
            <div>
              <Skeleton
                className="w-auto min-w-[150px] h-auto min-h-[150px] mb-2"
                baseColor="gray"
              />
            </div>
          </div>
        </div>
      ) : data?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data?.map((p: any, i: number) => {
            return (
              <div
                key={i}
                className="bg-primary rounded-md w-full h-full border border-white px-2 flex flex-row gap-x-14   py-2"
              >
                <div className="flex flex-col gap-2  w-[200px]">
                  <div className="flex gap-x-2  items-center ">
                    <img
                      src={p?.productImage[0]?.link}
                      width={40}
                      height={40}
                      className="rounded-full w-[40px] h-[40px] object-center"
                    />
                    <p className="text-sm text-white w-full">
                      {p?.productName}
                    </p>
                  </div>
                  <p className="text-sm text-white">{p?.productName}</p>
                  <p className="text-sm text-white">{p?.productDescription}</p>
                  <p className="text-sm text-white line-through">
                    {p?.productPrice}$
                  </p>
                  <p className="text-sm text-white font-bold">
                    {p?.finalPrice}$
                  </p>

                  <div className="flex gap-x-1 sm:gap-x-4 items-center mt-2">
                    <FaCartShopping
                      color="white"
                      size={18}
                      onClick={() => handleAddToCart(p)}
                    />
                    <Button
                      size="sm"
                      type="primary"
                      text={
                        <Link
                          href={`products/${p.productId}`}
                          className="text-xs sm:text-base"
                        >
                          More Details
                        </Link>
                      }
                      className="text-xs sm:text-base "
                    />
                  </div>
                </div>
                <div>
                  <img
                    src={p?.productImage[0]?.link}
                    className="rounded-md mt-3 min-w-[150px] w-44 h-44 min-h-[130px] mb-2"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1 className="text-white text-2xl">There is no product to show</h1>
      )}
    </>
  );
};

export default LeftSideProducts;
