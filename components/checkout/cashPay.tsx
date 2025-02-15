"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import CashPayPdf from "./cashPayPdf";
import Button from "../general/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const CashPay = () => {
  const [showPreview, setShowPreview] = useState(false);
  const carts = useSelector((state: RootState) => state.cart.items);
  const buyerData = useSelector((state: RootState) => state.buyer.shippingData);

  const allBuyerData = {
    buyer: buyerData,
    productData: carts,
  };

  return (
    <>
      <div className="mt-5">
        <p className="text-white">
          Please Print The PDF and bring with desired Amount in Company Address
          mentioned in PDF.
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
          className=" px-4 py-2  text-white rounded hover:bg-green-600"
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

      <Button type="primary" size="md" text="submit order" className="mt-5" />
    </>
  );
};

export default CashPay;
