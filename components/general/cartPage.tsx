"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  removeFromCart,
  updateQuantity,
} from "../../app/store/cartSlice";
import { RootState } from "@/app/store/store";
import { FaTrash, FaX } from "react-icons/fa6";
import Button from "./button";

const Cart = ({ isOpen, setIsOpen }: { isOpen: any; setIsOpen: any }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // Avoid mismatched content during hydration

  return (
    <div className="">
      {cartItems?.length === 0 ? (
        <p className="text-white">Your cart is empty.</p>
      ) : (
        <>
          <div
            className={`fixed top-0 right-0 z-[10000] mb-10   overflow-x-hidden bg-white text-primary p-4 flex flex-col   justify-start gap-y-4 h-full max-h-screen pb-10   overflow-y-auto w-auto transform transition-transform duration-500 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <FaX
              color="black"
              size={24}
              className="float-right z-[10000] cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <div className="h-screen space-y-5">
              {cartItems?.map((item: any, index: any) => (
                <div
                  key={index}
                  className="flex flex-row items-center border-b   border-b-black   w-full  gap-x-7"
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
                      className="bg-primary text-white w-4 h-5 flex text-center  items-center justify-center rounded"
                      onClick={() =>
                        handleUpdateQuantity(item?.id, item?.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <span className="border-b select-none">
                      {item?.quantity}
                    </span>
                    <button
                      className="bg-primary text-white w-4 h-5 flex text-center  items-center justify-center rounded"
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
              ))}

              <div className="w-full fixed bottom-10">
                <p className="text-primary text-3xl ">
                  Total:{"  "}
                  {cartItems
                    .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                    .toFixed(2)}
                  $
                </p>
                <Button
                  className={"w-auto mt-6"}
                  type="secondary"
                  size="md"
                  text="buy it now"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
