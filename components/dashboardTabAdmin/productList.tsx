"use client";
import { RootState } from "@/app/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from "../general/table";
import SmallDeviceTable from "../general/smallDeviceTable";
import Pagination from "../general/pagination";

const ProductList = () => {
  const products: any = useSelector(
    (state: RootState) => state.product.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((products?.data?.length || 0) / itemsPerPage);

  const paginatedProducts = products?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="bg-white rounded-md p-4 mt-2">
        <div className="overflow-visible block sm:hidden">
          <SmallDeviceTable
            data={products?.data}
            columns={[
              { label: "Product Name", field: "productName" },
              { label: "Price", field: "finalPrice" },
              { label: "Active", field: "status" },
            ]}
            expandableFields={[
              "productId",
              "companyName",
              "productCategory",
              "subCategory",
              "discount",
              "createdAt",
            ]}
          />
        </div>

        <div className="hidden sm:block">
          <Table
            columns={[
              {
                key: "productName",
                label: "Product Info",
                render: (row) => (
                  <div className="flex items-center gap-4">
                    <img
                      src={row.productImage?.[0]?.link}
                      alt={row.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex flex-col items-start">
                      <p className="font-semibold">{row.productName}</p>
                      <p className="text-sm text-gray-600">
                        {row.productDescription}
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                key: "finalPrice",
                label: "Product Price",
                render: (row) =>
                  row.finalPrice ? `${row.finalPrice.toFixed(2)}$` : "0.00",
              },
              { key: "status", label: "Active" },
            ]}
            data={paginatedProducts}
            color="black"
          />
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default ProductList;
