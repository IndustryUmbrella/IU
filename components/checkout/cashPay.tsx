"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import CashPayPdf from "./cashPayPdf";
import Button from "../general/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SuccessOrderPlaced from "./successOrderPlaced";
import { clearCart } from "@/app/store/cartSlice";

const CashPay = ({
  orderPlaced,
  setOrderPlace,
}: {
  orderPlaced: any;
  setOrderPlace: any;
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const carts = useSelector((state: RootState) => state.cart.items);
  const buyerData = useSelector((state: RootState) => state.buyer.shippingData);
  const [loading, setLoading] = useState(false);

  const allBuyerData = {
    buyer: buyerData,
    productData: carts,
  };
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();
  const placeanOrder = async () => {
    try {
      setLoading(true);
      const order = await axios.post(
        `${baseUrl}/api/order/order/create-order`,
        {
          seller_id: carts?.map((c) => c?.seller_id),
          name: `${buyerData?.firstname} ${buyerData?.lastname}`,
          email: buyerData?.email,
          address: {
            street: buyerData?.address,
            // city: buyerData?.city,
            country: "Afghanistan",
            zipcode: buyerData?.zipcode,
          },
          product: carts,
          totalAmount: 300,
          paymentMethod: "Cash Pay",
        }
      );
      setLoading(false);
      if (order?.data?.success) {
        dispatch(clearCart());
        setOrderPlace(true);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <>
        <div className="mt-5">
          <p className="text-white">
            Please Print The PDF and bring it with the desired amount to the
            company address mentioned in the PDF.
          </p>
        </div>

        <div className="flex flex-row justify-between items-center mt-4">
          <PDFDownloadLink
            document={<CashPayPdf data={allBuyerData} />}
            fileName="mypdf.pdf"
          >
            {({ loading }) => (
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {loading ? "Loading..." : "Download PDF"}
              </button>
            )}
          </PDFDownloadLink>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 text-white rounded hover:bg-green-600"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        {showPreview && (
          <div className="mt-4 w-full max-w-2xl h-[500px] border-2 border-gray-300">
            <PDFViewer width="100%" height="100%">
              <CashPayPdf data={allBuyerData} />
            </PDFViewer>
          </div>
        )}

        <Button
          type={loading ? "disable" : "primary"}
          size="md"
          text={
            loading ? (
              <FontAwesomeIcon icon={faSpinner} size="1x" />
            ) : (
              "Submit Order"
            )
          }
          className="mt-5"
          clickHandler={placeanOrder}
        />
      </>
    </>
  );
};

export default CashPay;
