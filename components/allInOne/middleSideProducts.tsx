import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "../general/button";

const MiddleSideProducts = () => {
  return (
    <div className="bg-white px-4 w-[390px] h-[605px] rounded-md">
      <Skeleton baseColor="#090909" circle width={50} height={50} />
      <Skeleton baseColor="#090909" height={400} />
      <div className="text-center">
        <Skeleton
          baseColor="black"
          width={250}
          height={20}
          className="text-center mx-5 mt-5"
        />
        <Skeleton baseColor="black" width={300} height={20} className="" />
      </div>
      <Button
        className={"w-full mt-6"}
        type="secondary"
        size="md"
        text="See More"
      />
    </div>
  );
};

export default MiddleSideProducts;
