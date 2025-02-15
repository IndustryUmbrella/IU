"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaTrash } from "react-icons/fa6";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import ShippingDataForm from "@/components/checkout/shippingDataForm";
import PaymentDetails from "@/components/checkout/paymentDetails";
import Button from "@/components/general/button";
import Link from "next/link";
import EmptyCartMockup from "@/public/mockups/emptyCartMockup";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const [shipStep, setShipStep] = useState(1);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const changeStep = () => {
    setShipStep(2);
  };

  if (!isClient || cartItem?.length == 0) {
    return (
      <div className="flex flex-col gap-x-10 items-center justify-center overflow-x-hidden">
        <EmptyCartMockup />
        <h1 className="text-center text-white text-3xl mt-4">
          You haven't any cart to buy something
        </h1>
        <Button
          type="primary"
          size="lg"
          text={<Link href="/products?tab=all">See Products</Link>}
          className="mt-5"
        />
      </div>
    );
  }

  return (
    <div className="px-[6px] lg:px-desktop md:px-tablet sm:px-mobile mt-10 ">
      <div className="flex flex-col-reverse md:flex-row gap-x-5 justify-between">
        <div className="space-y-5">
          <div className=" hidden md:flex  md:flex-row gap-x-2">
            <div
              className={`w-full  rounded-md transition-all duration-200 ${
                shipStep == 1 ? "h-1.5" : "h-1"
              }  bg-white relative`}
            >
              <div
                className={`w-6 h-6 rounded-full ${
                  shipStep == 1 ? "bg-white" : "border border-white bg-black"
                } relative -left-2 -top-2`}
              ></div>
            </div>
            <div
              className={`w-full  rounded-md transition-all duration-200 ${
                shipStep == 2 ? "h-1.5" : "h-1"
              }  bg-white relative`}
            >
              <div
                className={`w-6 h-6 rounded-full ${
                  shipStep == 2 ? "bg-white" : "border border-white bg-black"
                } relative -left-2 -top-2`}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            {shipStep === 1 ? (
              <>
                <ShippingDataForm setShipState={setShipStep} />
              </>
            ) : (
              <div className="w-full max-w-[300px]">
                <Elements stripe={stripePromise}>
                  <PaymentDetails setShipStep={setShipStep} />
                </Elements>
              </div>
            )}
          </div>
        </div>
        <div className="">
          {cartItem?.map((item, idx) => {
            return (
              <div
                key={item?.id}
                className="flex flex-row items-center justify-between border-b border-b-white px-6 text-white w-full gap-x-7 gap-y-6"
              >
                <div className="flex flex-col gap-2">
                  <img
                    src={item?.productImage}
                    width={110}
                    height={110}
                    className="border border-black rounded"
                  />
                  <p>${Number(item?.price)?.toFixed(2)}</p>
                </div>

                <div className="flex flex-col gap-y-2 items-start justify-start">
                  <p className="">{item?.name}</p>
                  <p className="">{item?.description}</p>
                </div>

                <div className="flex items-center justify-center gap-x-2">
                  <button
                    className="bg-white text-primary w-4 h-5 flex text-center items-center justify-center rounded"
                    onClick={() =>
                      handleUpdateQuantity(item?.id, item?.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <span className="border-b select-none">{item?.quantity}</span>
                  <button
                    className="bg-white text-primary w-4 h-5 flex text-center items-center justify-center rounded"
                    onClick={() =>
                      handleUpdateQuantity(item?.id, item?.quantity - 1)
                    }
                  >
                    -
                  </button>
                </div>

                <button onClick={() => handleRemoveFromCart(item?.id)}>
                  <FaTrash color={"red"} />
                </button>
              </div>
            );
          })}
          <h1 className="text-3xl text-white mt-10">
            Total To Spent :{" "}
            {cartItem
              ?.reduce(
                (acc: any, cur: any) => acc + cur.quantity * cur.price,
                0
              )
              .toFixed(2)}
            $
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
