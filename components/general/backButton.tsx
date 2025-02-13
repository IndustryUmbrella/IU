"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const BackButton = ({ clickHandler }: { clickHandler?: () => void }) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div
      className={`cursor-pointer ${
        clickHandler ? "" : "mx-10"
      }  mt-5 bg-white rounded p-4 w-10 h-10 flex items-center justify-center`}
      onClick={clickHandler ? clickHandler : goBack}
    >
      <FaArrowLeft color="black" size={44} />
    </div>
  );
};

export default BackButton;
