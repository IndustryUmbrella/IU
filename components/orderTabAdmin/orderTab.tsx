"use client";
import { RootState } from "@/app/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { formatDate } from "@/helper/dateFormatter";

const OrderTab = () => {
  const orderList = useSelector((state: RootState) => state.orders);

  return (
    <>
      {Array.isArray(orderList) && orderList.length > 0 ? (
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
      )}
    </>
  );
};

export default OrderTab;
