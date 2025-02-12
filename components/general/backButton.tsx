"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <>
      <div
        className="cursor-pointer mx-10 mt-5 bg-white rounded p-4 w-10 h-10 flex items-center justify-center"
        onClick={goBack}
      >
        <div>
          <FaArrowLeft color="black" />
        </div>
      </div>
    </>
  );
};

export default BackButton;
