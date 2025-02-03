"use client";
import React, { useEffect, useState } from "react";
import Slogan from "./slogan";
import UnsortedDivs from "./unsortedDivs";
import LeftSideProducts from "../allInOne/leftSideProducts";
import MiddleSideProducts from "../allInOne/middleSideProducts";
import RightSideProducts from "../allInOne/rightSideProducts";
import Button from "../general/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setProductsForBuyers } from "@/app/store/productSlice";
import axios from "axios";
import Link from "next/link";

const Landing = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();
  const products: any = useSelector(
    (state: RootState) => state.product.productsForBuyers
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!products?.length) {
      const getProducts = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/api/product/all-product`,
            {
              withCredentials: true,
            }
          );

          dispatch(setProductsForBuyers(response?.data?.data));
          setIsLoading(false);
        } catch (err: any) {
          console.log(err?.message);
          setIsLoading(false);
        }
      };
      getProducts();
    } else {
      setIsLoading(false);
    }
  }, [products]);

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
          <Button
            type="primary"
            size="md"
            text={<Link href="/products?tab=all">See All Products</Link>}
          />
        </div>
        <div className="flex  gap-x-4 justify-between overflow-x-auto hidden-scrollbar">
          <LeftSideProducts
            isLoading={isLoading}
            data={products?.slice(0, 3)}
          />
          <MiddleSideProducts
            isLoading={isLoading}
            data={products?.slice(3, 4)}
          />
          <RightSideProducts
            isLoading={isLoading}
            data={products?.slice(5, 7)}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
