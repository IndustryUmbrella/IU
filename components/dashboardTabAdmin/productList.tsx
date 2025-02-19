import { RootState } from "@/app/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../general/table";
import SmallDeviceTable from "../general/smallDeviceTable";

const ProductList = () => {
  const userData = useSelector((state: RootState) => state.seller.user);
  const orders = useSelector((state: RootState) => state.orders);

  const products: any = useSelector(
    (state: RootState) => state.product.products
  );

  return (
    <>
      <div className="flex flex-wrap sm:hidden gap-6 ">
        <div className="bg-white text-primary  rounded-lg p-3 flex flex-col min-w-[200px]">
          <span>Products</span>
          <div className="relative">
            <span className="text-3xl ">{12}</span>
            <span className="absolute right-0 bg-green-500 rounded-lg text-white text-xs text-center float-right px-1">
              active
            </span>
          </div>
        </div>
        <div className="bg-white text-primary  rounded-lg p-3 flex flex-col min-w-[200px]">
          <span>Orders</span>
          <div className="relative">
            <span className="text-3xl ">10</span>
            <span className="bg-green-500 absolute right-0 rounded-lg text-white text-xs text-center float-right px-1">
              active
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md p-4 mt-2">
        <div className="block sm:hidden">
          <SmallDeviceTable
            data={products?.data}
            columns={[" Info", " Price", "Active"]}
          />
        </div>

        <div className="hidden sm:block">
          <Table
            columns={["Product Info", "product Price", "active", "action"]}
            data={products?.data}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
