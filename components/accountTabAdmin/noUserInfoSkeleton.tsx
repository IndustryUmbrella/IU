import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NoUserInfoSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row  items-center justify-center gap-x-6 w-full">
      <div className="w-[260px] md:w-64 h-auto rounded px-2 text-sm">
        <Skeleton
          height={45}
          className="my-1 rounded-md"
          baseColor="#333"
          highlightColor="#666"
        />
        <Skeleton
          height={45}
          className="my-1 rounded-md"
          baseColor="#333"
          highlightColor="#666"
        />
        <Skeleton
          height={45}
          className="my-1 rounded-md"
          baseColor="#333"
          highlightColor="#666"
        />
      </div>
      <div className="w-[260px] md:w-64 h-auto rounded px-2 text-sm">
        <Skeleton
          height={45}
          className="my-1 rounded-md"
          baseColor="#333"
          highlightColor="#666"
        />
        <Skeleton
          height={45}
          className="my-1 rounded-md"
          baseColor="#333"
          highlightColor="#666"
        />
        <Skeleton
          height={45}
          className="my-1 rounded-md"
          baseColor="#333"
          highlightColor="#666"
        />
      </div>
    </div>
  );
};

export default NoUserInfoSkeleton;
