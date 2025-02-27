"use client";
import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

const InfoPopUp = ({ data }: { data: any }) => {
  const [showinfo, setShowInfo] = useState(false);

  return (
    <div className="relative w-full">
      <FaCircleInfo color="white" onClick={() => setShowInfo(!showinfo)} />
      {showinfo && (
        <div className="absolute bg-slate-950 rounded-md border border-white text-white top-4 w-[250px]  px-4 right-0 py-4">
          <h1>Products More Info</h1>
          <div className="flex flex-col gap-y-4">
            <div className="">
              <h4 className="">Product Colores </h4>
              <div className="">
                {data?.colors
                  ? data?.colors
                      .split(",")
                      ?.map((s: any, i: any) => <p key={i}>{s}</p>)
                  : "No Specific Color"}
              </div>
            </div>
            <div>
              <h4>Product Status </h4>
              <p>{data?.status ? data?.status : "active"}</p>
            </div>
            <div>
              <h4>Product Weight </h4>
              <p>
                {data?.weight ? `${data?.weight} KG` : "No Specific Weight"}
              </p>
            </div>
            <div>
              <h4>Product Sizes </h4>
              <p>
                {data?.sizes
                  ? data?.sizes.split(",").join(" ")
                  : "No Specific Size"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPopUp;
