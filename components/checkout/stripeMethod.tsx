import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../general/button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export default function StripeMethod() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const buyerData = useSelector((state: RootState) => state.buyer.shippingData);
  const [amount, setAmount] = useState<number>(
    cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  );
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const validationSchema = Yup.object({
    cardNumber: Yup.string().required("Card number is required"),
    expiryDate: Yup.string().required("Expiry date is required"),
    cvv: Yup.string()
      .required("CVV is required")
      .length(3, "CVV must be 3 digits"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    if (!stripe || !elements) return;

    setLoading(true);
    const paymentIntent = await fetch(
      `${baseUrl}/api/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      }
    ).then((res) => res.json());

    const { clientSecret } = paymentIntent;

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
      console.log(error);
      setError(error?.message);
    } else {
      console.log("Payment Method:", paymentMethod);
      alert("Payment successful!");
      setError("");
    }

    setLoading(false);
  };

  const formik = useFormik<{ dummy: string }>({
    initialValues: { dummy: "" },
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  return (
    <form
      className="p-4 border rounded flex flex-col gap-4  overflow-x-hidden mt-4 "
      onSubmit={handleSubmit}
    >
      <div className="w-full text-white">
        <label htmlFor="card-number">Card Number</label>
        <CardNumberElement
          id="card-number"
          className="p-3 border rounded bg-white w-full  h-12 mb-4 text-[#fff]"
          onChange={formik.handleChange}
        />
      </div>
      <div className="w-full text-white">
        <label htmlFor="expiry-date">Expiry Date</label>
        <CardExpiryElement
          id="expiry-date"
          className="p-3 border rounded bg-white w-full h-12 mb-4 "
          onChange={formik.handleChange}
        />
      </div>
      <div className="w-full ">
        <label htmlFor="cvv" className="text-white ">
          CVV
        </label>
        <CardCvcElement
          id="cvv"
          className="p-3 border  rounded bg-white h-12 w-full mb-4 "
          onChange={formik.handleChange}
        />
      </div>

      <div className="mb-4 text-white">
        <label htmlFor="amount">
          Amount:{" "}
          {cartItems
            .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
            .toFixed(2)}
        </label>
      </div>

      <Button
        type={"primary"}
        disable={!stripe || loading}
        text={loading ? "Processing..." : "Pay Now"}
        size="sm"
        clickHandler={handleSubmit}
      />

      {error && (
        <div className="bg-red-400 text-white rounded px-5 text-sm py-6">
          {error}
        </div>
      )}
    </form>
  );
}
