"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Button from "../general/button";
import Save from "@/public/svgs/save";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useState } from "react";
import Link from "next/link";

const LeftSideProducts = ({
  isLoading,
  data,
}: {
  isLoading: true | boolean;
  data: any;
}) => {
  const products = useSelector(
    (state: RootState) => state.product.productsForBuyers
  );

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
              <div className="flex gap-x-4 items-center mt-2">
                <Save />
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
                <Save />
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
                <Save />
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
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <p className="text-sm text-white w-full">
                      {p?.productName}
                    </p>
                  </div>
                  <p className="text-sm text-white">{p?.productDescription}</p>
                  <p className="text-sm text-white">{p?.productPrice}</p>

                  <div className="flex gap-x-4 items-center mt-2">
                    <Save />
                    <Button
                      size="sm"
                      type="primary"
                      text={
                        <Link href={`products/${p.productId}`}>
                          More Details
                        </Link>
                      }
                      className=" "
                    />
                  </div>
                </div>
                <div>
                  <img
                    src={p?.productImage[0]?.link}
                    className="rounded-md min-w-[150px] w-44 h-44 min-h-[130px] mb-2"
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
