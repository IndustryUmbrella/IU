"use client";
import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../general/button";
import { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setOrderPlaced, triggerRefreshOrder } from "@/app/store/orderSlice";
import { clearCart } from "@/app/store/cartSlice";

export default function StripeMethod() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const buyerData = useSelector((state: RootState) => state.buyer.shippingData);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const amount = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { clientSecret } = await fetch(
        `${baseUrl}/api/payment/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      ).then((res) => res.json());

      const { error, paymentMethod }: any = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement)!,
            billing_details: {
              name: `${buyerData?.firstname} ${buyerData?.lastname}`,
            },
          },
        }
      );

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const order = await axios.post(
        `${baseUrl}/api/order/order/create-order`,
        {
          seller_id: cartItems.map((c) => c.seller_id),
          name: `${buyerData?.firstname} ${buyerData?.lastname}`,
          email: buyerData?.email,
          address: {
            street: buyerData?.address,
            country: "Afghanistan",
            zipcode: buyerData?.zipcode,
          },
          product: cartItems,
          totalAmount: amount,
          paymentMethod: "Stripe",
        }
      );

      if (order.data.success) {
        dispatch(setOrderPlaced(true));
        dispatch(triggerRefreshOrder());
        dispatch(clearCart());
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form
      className="p-4 border rounded flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit}
    >
      {/* Card Number */}
      <div className="w-full text-white">
        <label htmlFor="card-number">Card Number</label>
        <CardNumberElement
          id="card-number"
          className="p-3 border rounded bg-white w-full h-12 mb-4"
          onChange={(e) => setError(e.error ? e.error.message : null)}
        />
      </div>

      {/* Expiry Date */}
      <div className="w-full text-white">
        <label htmlFor="expiry-date">Expiry Date</label>
        <CardExpiryElement
          id="expiry-date"
          className="p-3 border rounded bg-white w-full h-12 mb-4"
          onChange={(e) => setError(e.error ? e.error.message : null)}
        />
      </div>

      {/* CVV */}
      <div className="w-full text-white">
        <label htmlFor="cvv">CVV</label>
        <CardCvcElement
          id="cvv"
          className="p-3 border rounded bg-white h-12 w-full mb-4"
          onChange={(e) => setError(e.error ? e.error.message : null)}
        />
      </div>

      {/* Amount */}
      <div className="mb-4 text-white">
        <label>Amount: ${amount.toFixed(2)}</label>
      </div>

      {/* Pay Now Button */}
      <Button
        type="primary"
        disable={!stripe || loading}
        text={loading ? "Processing..." : "Pay Now"}
        size="sm"
        clickHandler={handleSubmit}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-400 text-white rounded px-5 text-sm py-6">
          {error}
        </div>
      )}
    </form>
  );
}
