"use client";
import React, { useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import {
  setProductLimit,
  setProductsForBuyers,
} from "@/app/store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FaArrowRight, FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import NoProductMockup from "@/public/mockups/noProductMockup";
import { addToCart } from "@/app/store/cartSlice";
import Button from "../general/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faSpider,
  faSpinner,
  faTruckLoading,
} from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";

interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: { link: string }[];
  seller_id: string;
  companyName: string;
  productCategory: string;
}

const ProductsCards = ({
  category,
  showLoadMore,
  userData,
}: {
  userData: any;
  category: any;
  showLoadMore: Boolean;
}) => {
  const [loading, setIsLoading] = useState(false);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.product.productsForBuyers
  );
  const productLimit = useSelector(
    (state: RootState) => state.product.productLimit
  );

  useEffect(() => {
    const getProducts = async () => {
      if (products.length === 0) setIsLoading(true);
      try {
        const url = `${baseUrl}/api/product/all-product${
          showLoadMore ? `?limit=${productLimit}` : ""
        }`;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        dispatch(setProductsForBuyers([...response?.data?.data]));
        setSkeletonLoading(false);
      } catch (err: any) {
        setSkeletonLoading(false);
      } finally {
        setIsLoading(false);
        setSkeletonLoading(false);
      }
    };

    getProducts();
  }, [productLimit]);

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

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product?.productId,
        name: product?.productName,
        price: product?.productPrice,
        quantity: 1,
        productImage: product?.productImage[0]?.link,
        description: product?.productDescription,
        category: product?.productCategory || "",
        seller_id: product?.seller_id,
        companyName: product?.companyName,
      })
    );
  };

  const handleLoadMore = () => {
    setSkeletonLoading(true);
    dispatch(setProductLimit(productLimit + 10));
  };
  const handleSearch = () => {
    if (!searchValue) {
      setProductsToShow(products);
    }

    const productsNames = products?.filter((product: any) =>
      product?.productName?.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (productsNames.length > 0) {
      setProductsToShow(productsNames);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      setProductsToShow(products);
    }

    const productsNames = products?.filter((product: any) =>
      product?.productName?.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (productsNames.length > 0) {
      setProductsToShow(productsNames);
    }
  }, [searchValue]);

  return (
    <div>
      {showLoadMore && (
        <div className="flex gap-x-2  items-center justify-center mt-5 w-full px-4">
          <input
            type="search"
            className="border border-white h-12 rounded w-full text-primary px-4 "
            placeholder="Search Product e.g Necklace"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="button"
            className="flex items-center justify-center bg-white  w-12  h-12 rounded"
            onClick={handleSearch}
          >
            <FaSearch size={24} color="black" />
          </button>
        </div>
      )}
      <div className="flex flex-col">
        {loading ? (
          <div className="flex flex-wrap gap-6 p-4">
            {Array.from({ length: 10 }, (_, rowIndex) => {
              return (
                <div
                  key={rowIndex}
                  className="bg-[#191919] scale-100 duration-200 transition-all hover:scale-[0.962] rounded-lg p-4 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(26%-2rem)] xl:w-[calc(20%-1.2rem)]"
                >
                  <div className="">
                    <Skeleton
                      baseColor="#ccc"
                      highlightColor="white"
                      className="rounded-md h-32 w-auto"
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
          <div
            className={`flex flex-wrap ${
              productsToShow?.length == 0 ? "items-center justify-center" : ""
            } gap-6 p-4`}
          >
            {productsToShow?.length > 0 ? (
              productsToShow?.map((product: Product, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="bg-[#191919] scale-100 duration-200 transition-all hover:scale-[0.962] rounded-lg p-4 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(26%-2rem)] xl:w-[calc(20%-1.2rem)]"
                  >
                    <Carousel showThumbs={false} className="py-3">
                      {product?.productImage?.map((img: any, index: number) => {
                        return (
                          <div key={`${product.productId}-${index}`}>
                            <img
                              src={img?.link}
                              alt=""
                              className="rounded mb-4  h-36 my-7 w-[200px] h-[200[x] object-cover object-center "
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
                        <FaCartShopping
                          color="white"
                          size={22}
                          className="cursor-pointer"
                          onClick={() => handleAddToCart(product)}
                        />
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

            {skeletonLoading && (
              <div className="flex w-full flex-wrap  gap-6 p-4">
                {Array.from({ length: 5 }, (_, rowIndex) => {
                  return (
                    <div
                      key={rowIndex}
                      className="bg-[#191919] scale-100 duration-200 transition-all hover:scale-[0.962] rounded-lg p-4 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(26%-2rem)] xl:w-[calc(20%-1.2rem)]"
                    >
                      <Skeleton
                        baseColor="#ccc"
                        highlightColor="white"
                        className="rounded-md h-32 w-auto"
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
                          />
                        </div>
                        <div className="">
                          <Skeleton
                            baseColor="#ccc"
                            highlightColor="white"
                            className=""
                          />
                        </div>
                        <div className=" flex flex-col gap-y-5 w-auto justify-center ">
                          <FaCartShopping color="white" size={18} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {showLoadMore && (
          <Button
            type={!loading && !skeletonLoading ? "primary" : "disable"}
            size="md"
            text={
              !loading && !skeletonLoading ? (
                "Load More"
              ) : (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  color="black"
                  size="1x"
                />
              )
            }
            className="mx-4"
            clickHandler={handleLoadMore}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsCards;
