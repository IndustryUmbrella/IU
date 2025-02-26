"use client";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import Table from "../general/table";
import Pagination from "../general/pagination";
import SmallDeviceTable from "../general/smallDeviceTable";

const OrderTab = () => {
  const orderList = useSelector((state: RootState) => state.orders.orders);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orderList.length / itemsPerPage);

  const paginatedOrders = orderList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="bg-white rounded-md p-4 mt-2">
        <div className="overflow-visible block sm:hidden">
          <SmallDeviceTable
            data={paginatedOrders}
            columns={[
              { label: "Customer Name", field: "name" },
              { label: "Total", field: "totalAmount" },
              {
                label: "Product Name",
                field: "products",
                render: (row: any) =>
                  row.products && row.products.length > 0
                    ? row.products
                        .map((product: any) => product.name)
                        .join(", ")
                    : "No products",
              },
            ]}
            expandableFields={[
              "quantity",
              "paymentStatus",
              "paymentMethod",
              "createdAt",
            ]}
            showThreeDots={false}
          />
        </div>
        <div className="hidden sm:block">
          <Table
            columns={[
              { key: "name", label: "Customer Name" },
              { key: "totalAmount", label: "Total" },
              { key: "paymentMethod", label: "Payment Method" },
              { key: "paymentStatus", label: "Payment" },
              {
                key: "products",
                label: "Quantity",
                render: (row: any) =>
                  row.products && row.products.length > 0
                    ? row.products
                        .map((product: any) => product.quantity)
                        .join(", ")
                    : "No products",
              },
              {
                key: "productName",
                label: "Product Name",
                render: (row: any) =>
                  row.products && row.products.length > 0
                    ? row.products
                        .map((product: any) => product.name)
                        .join(", ")
                    : "No products",
              },
            ]}
            data={paginatedOrders}
            color="black"
            showThreeDots={false}
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

export default OrderTab;
