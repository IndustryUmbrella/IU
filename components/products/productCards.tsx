"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Image1 from "../../public/images/image1.png";
import Image2 from "../../public/images/image2.png";
import Image3 from "../../public/images/image3.png";
import Image4 from "../../public/images/image4.png";
import Image5 from "../../public/images/image5.png";
import Skeleton from "react-loading-skeleton";
import Cart from "@/public/svgs/cart";
import axios from "axios";
import { setProductsForBuyers } from "@/app/store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FaArrowRight, FaCartShopping } from "react-icons/fa6";
import Link from "next/link";

const ProductsCards = () => {
  const Images = [Image1, Image2, Image3, Image4, Image5];
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.product.productsForBuyers
  );

  useEffect(() => {
    // Only fetch products if they are not already in the store
    if (!products?.length) {
      const getProducts = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/api/product/all-product`,
            {
              withCredentials: true,
            }
          );

          // Dispatch the products to Redux store
          dispatch(setProductsForBuyers(response?.data?.data));
        } catch (err: any) {
          console.log(err?.message);
        }
      };
      getProducts();
    }
  }, [dispatch, baseUrl, products]); // Will only run when `products` are empty or when the component mounts
  // This will run only once when the component mounts

  return (
    <div className="flex flex-col">
      {/* {Array.from({ length: 2 }, (_, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className="flex items-center justify-between w-auto space-x-4 py-6  h-auto"
          >
            {Array.from({ length: 4 }, (_, colIndex) => {
              const imageIndex = rowIndex * 4 + colIndex;
              return (
                <div
                  key={colIndex}
                  className="bg-white relative rounded-xl pb-2 w-80"
                >
                  <Image
                    src={Images[imageIndex % Images.length]}
                    alt={`Product ${imageIndex}`}
                    className="w-[330px] h-[320px] object-center"
                  />
                  <div className="flex justify-between gap-1 px-[3px] py-4">
                    <div className="flex flex-col">
                      <Skeleton
                        baseColor="black"
                        width={120}
                        height={20}
                        className=""
                      />
                      <Skeleton
                        baseColor="black"
                        width={120}
                        height={20}
                        className=""
                      />
                    </div>
                    <div className="">
                      <Skeleton
                        baseColor="black"
                        width={150}
                        height={45}
                        className=""
                      />
                    </div>
                    <Cart />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })} */}

      <div className="flex flex-wrap gap-6 p-4">
        {products?.map((product: any, idx) => (
          <div
            key={idx}
            className="bg-[#0f0f0f] scale-100 duration-200 transition-all hover:scale-[0.962] rounded-lg p-4 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)]"
          >
            <img
              src={product?.productImage[0].link}
              alt=""
              className="rounded mb-4 w-full h-36"
            />
            <div className="flex flex-row justify-between">
              <div>
                <p className="text-[14px] text-white">{product?.productName}</p>
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
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsCards;
