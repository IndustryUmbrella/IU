import Hearth from "@/public/svgs/heart";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "../general/button";

const RightSideProducts = () => {
  return (
    <div className="flex gap-3 flex-col sm:flex-row ">
      <div className="grid gird-col-2 gap-4 w-full">
        <div className="w-auto h-auto min-h-[300px] min-w-[300px]  border border-white rounded-md px-4 py-2">
          <div className="flex justify-between my-3">
            <Skeleton baseColor="gray" circle width={50} height={50} />
            <Hearth />
          </div>
          <div className="flex gap-x-4">
            <Skeleton baseColor="gray" width={120} height={130} />
            <div>
              <Skeleton baseColor="gray" width={130} height={10} />
              <Skeleton baseColor="gray" width={130} height={10} />
            </div>
          </div>
          <Button type="primary" size="sm" text="See More" className="mt-5" />
        </div>
        <div className="w-auto h-auto min-h-[300px] min-w-[300px]  border border-white rounded-md px-4 py-2">
          <div className="flex justify-between my-3">
            <Skeleton baseColor="gray" circle width={50} height={50} />
            <Hearth />
          </div>
          <div className="flex gap-x-4">
            <Skeleton baseColor="gray" width={120} height={130} />
            <div>
              <Skeleton baseColor="gray" width={130} height={10} />
              <Skeleton baseColor="gray" width={130} height={10} />
            </div>
          </div>
          <Button type="primary" size="sm" text="See More" className="mt-5" />
        </div>
      </div>
    </div>
  );
};

export default RightSideProducts;
