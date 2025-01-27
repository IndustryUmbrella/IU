import Categories from "@/components/products/categories";
import ProductsCards from "@/components/products/productCards";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

const Products = () => {
  return (
    <div className="px-[6px] sm:px-mobile md:px-tablet lg:px-desktop mt-10">
      <Categories />
      <ProductsCards />
    </div>
  );
};

export default Products;
