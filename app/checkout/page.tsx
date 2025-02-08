"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaTrash } from "react-icons/fa6";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ShippingDataForm from "@/components/checkout/shippingDataForm";
import PaymentDetails from "@/components/checkout/paymentDetails";

// Stripe setup
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const [shipStep, setShipStep] = useState(1);
  const [isClient, setIsClient] = useState(false); // New state to check if it's client-side

  useEffect(() => {
    // Set to true once the component has mounted on the client
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

  if (!isClient) {
    return null; // Return null while SSR is happening (no hydration errors)
  }

  return (
    <div className="px-[6px] lg:px-desktop md:px-tablet sm:px-mobile mt-10 bg-white">
      <div className="flex flex-col-reverse sm:flex-row gap-x-5 justify-between">
        {shipStep === 1 ? (
          <ShippingDataForm setShipState={setShipStep} />
        ) : (
          <div className="w-[400px] max-w-[400px]">
            <Elements stripe={stripePromise}>
              <PaymentDetails setShipStep={setShipStep} />
            </Elements>
          </div>
        )}
        <div>
          {cartItem?.map((item, idx) => {
            return (
              <div
                key={item?.id}
                className="flex flex-row items-center border-b border-b-black w-full gap-x-7"
              >
                <div className="flex flex-col gap-2">
                  <img
                    src={item?.productImage}
                    width={100}
                    height={100}
                    className="border border-black rounded"
                  />
                  <p>${Number(item?.price)?.toFixed(2)}</p>
                </div>

                <p className="w-full">{item?.name}</p>

                <div className="flex items-center justify-center gap-x-2">
                  <button
                    className="bg-primary text-white w-4 h-5 flex text-center items-center justify-center rounded"
                    onClick={() =>
                      handleUpdateQuantity(item?.id, item?.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <span className="border-b select-none">{item?.quantity}</span>
                  <button
                    className="bg-primary text-white w-4 h-5 flex text-center items-center justify-center rounded"
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;
