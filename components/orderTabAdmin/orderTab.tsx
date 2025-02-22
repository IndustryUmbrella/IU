"use client";
import { RootState } from "@/app/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { formatDate } from "@/helper/dateFormatter";
import Table from "../general/table";

const OrderTab = () => {
  const orderList = useSelector((state: RootState) => state.orders.orders);

  return (
    <>
      <Table
        columns={[
          { key: "name", label: "Customer Name" },
          { key: "totalAmount", label: "Total" },
          { key: "paymentMethod", label: "Payment Method" },
          { key: "paymentStatus", label: "Payment" },
          {
            key: "quantity",
            label: "Quantity",
            render: (row) =>
              row.products.map((product: any) => product.quantity).join(", "),
          },
          {
            key: "productName",
            label: "Product Name",
            render: (row) =>
              row.products.map((product: any) => product.name).join(", "),
          },
        ]}
        data={orderList}
        color="white"
      />

      {/* {Array.isArray(orderList) && orderList.length > 0 ? (
        orderList.map((order: any, idx: number) => (
          <div key={idx}>
            <h3>Order ID: {order?._id}</h3>
            {order.products.map((product: any, pIdx: number) => (
              <div key={pIdx}>
                <p>{product?.name}</p>
                <img
                  src={product?.productImage}
                  width={50}
                  height={50}
                  className="rounded"
                  alt={product?.name}
                />
                <p>
                  Address: {order?.address?.street} {order?.address?.country}{" "}
                  {order?.address.zipcode}
                </p>
                <p>Payment Method: {order?.paymentMethod}</p>
                <p>Quantity : {product?.quantity}</p>
                <p>Price : {product?.price}</p>
                <p>Payment Status: {order?.paymentStatus}</p>
                <p>Order Status: {order?.orderStatus}</p>
                <p>Date: {formatDate(order?.createdAt)}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )} */}
    </>
  );
};

export default OrderTab;
