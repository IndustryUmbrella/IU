"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Image1 from "../../public/images/image1.png";
import Image2 from "../../public/images/image2.png";
import Image3 from "../../public/images/image3.png";
import Image4 from "../../public/images/image4.png";
import Image5 from "../../public/images/image5.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Cart from "@/public/svgs/cart";
import axios from "axios";
import { setProductsForBuyers } from "@/app/store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FaArrowRight, FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import NoProductMockup from "@/public/mockups/noProductMockup";

const ProductsCards = ({ category }: { category: any }) => {
  const Images = [Image1, Image2, Image3, Image4, Image5];
  const [loading, setIsLoading] = useState(false);
  const [productsToShow, setProductsToShow] = useState<any>([]);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.product.productsForBuyers
  );

  useEffect(() => {
    if (!products?.length) {
      setIsLoading(true);
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
    }
  }, [dispatch, baseUrl, products]);

  useEffect(() => {
    if (category == "all") {
      setProductsToShow(products);
    } else {
      const filterCategory = products?.filter(
        (p: any) => p?.productCategory == category
      );
      setProductsToShow(filterCategory);
    }
  }, [category, products]);
  return (
    <div className="flex flex-col">
      {loading ? (
        <div className="flex flex-wrap gap-6 p-4">
          {Array.from({ length: 10 }, (_, rowIndex) => {
            return (
              <div
                key={rowIndex}
                className="bg-[#191919] scale-100 duration-200 transition-all hover:scale-[0.962] rounded-lg p-4 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)]"
              >
                <div className="">
                  <Skeleton
                    baseColor="#ccc"
                    highlightColor="white"
                    className="rounded-md  h-32 w-auto"
                  />
                  <div className="flex justify-around gap-1 px-[3px] py-4 ">
                    <div className="flex flex-col ">
                      <Skeleton
                        baseColor="#ccc"
                        highlightColor="white"
                        className="h-4"
                      />
                      <Skeleton
                        baseColor="#ccc"
                        highlightColor="white"
                        width={120}
                        height={20}
                        className=""
                      />
                    </div>
                    <div className="">
                      <Skeleton
                        baseColor="#ccc"
                        highlightColor="white"
                        className=""
                      />
                    </div>
                    <div className=" flex flex-col gap-y-5 w-auto  justify-center ">
                      <FaCartShopping color="white" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap items-center  gap-6 p-4">
          {productsToShow?.length > 0 ? (
            productsToShow?.map((product: any, idx: number) => {
              return (
                <div
                  key={idx}
                  className="bg-[#191919] scale-100 duration-200 transition-all hover:scale-[0.962] rounded-lg p-4 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(26%-2rem)] xl:w-[calc(20%-1.2rem)]"
                >
                  <Carousel showThumbs={false} className="py-3">
                    {product?.productImage?.map((img: any, index: number) => {
                      return (
                        <div key={index}>
                          <img
                            src={img?.link}
                            width={200}
                            height={200}
                            alt=""
                            className="rounded mb-4 w-full h-36 my-7"
                          />
                        </div>
                      );
                    })}
                  </Carousel>

                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-[14px] text-white">
                        {product?.productName}
                      </p>
                      <p className="text-[14px] text-white">
                        {product?.productDescription}
                      </p>
                      <p className="text-[14px] text-white">
                        Price {product?.productPrice}$
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-5">
                      <FaCartShopping color="white" size={22} />
                      <Link
                        href={`/products/${product?.productId}`}
                        className="bg-white rounded-full p-1.5"
                      >
                        <FaArrowRight color="black" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex mt-5 items-center text-center justify-center">
              <NoProductMockup
                height=""
                width={"w-full h-full max-w-[400px] max-h-[400px]"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsCards;
