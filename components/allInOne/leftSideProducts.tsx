import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Button from "../general/button";
import Save from "@/public/svgs/save";

const LeftSideProducts = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-primary rounded-md w-auto h-full border border-white px-2 flex gap-x-4  justify-between py-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-x-2 items-center ">
            <Skeleton
              count={1}
              height={50}
              width={50}
              circle={true}
              baseColor="gray"
            />
            <Skeleton
              height={30}
              width={100}
              baseColor="gray"
              className="mb-2"
            />
          </div>
          <Skeleton
            className="min-w-[150px] min-h-[20px] w-full h-full"
            baseColor="gray"
          />
          <Skeleton
            className="min-w-[150px] min-h-[20px] w-full h-full"
            baseColor="gray"
          />
          <div className="flex gap-x-4 items-center mt-2">
            <Save />
            <Button size="sm" type="primary" text="more details" />
          </div>
        </div>
        <div>
          <Skeleton
            className="w-auto min-w-[150px] h-auto min-h-[150px] mb-2"
            baseColor="gray"
          />
        </div>
      </div>
      <div className="bg-primary rounded-md w-auto h-full border border-white px-2 flex gap-x-4  justify-between py-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-x-2 items-center ">
            <Skeleton
              count={1}
              height={50}
              width={50}
              circle={true}
              baseColor="gray"
            />
            <Skeleton
              height={30}
              width={100}
              baseColor="gray"
              className="mb-2"
            />
          </div>
          <Skeleton
            className="min-w-[150px] min-h-[20px] w-full h-full"
            baseColor="gray"
          />
          <Skeleton
            className="min-w-[150px] min-h-[20px] w-full h-full"
            baseColor="gray"
          />
          <div className="flex gap-x-4 items-center mt-2">
            <Save />
            <Button size="sm" type="primary" text="more details" />
          </div>
        </div>
        <div>
          <Skeleton
            className="w-auto min-w-[150px] h-auto min-h-[150px] mb-2"
            baseColor="gray"
            // className=""
          />
        </div>
      </div>
      <div className="bg-primary rounded-md w-auto h-full border border-white px-2 flex gap-x-4  justify-between py-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-x-2 items-center ">
            <Skeleton
              count={1}
              height={50}
              width={50}
              circle={true}
              baseColor="gray"
            />
            <Skeleton
              height={30}
              width={100}
              baseColor="gray"
              className="mb-2"
            />
          </div>
          <Skeleton
            className="min-w-[150px] min-h-[20px] w-full h-full"
            baseColor="gray"
          />
          <Skeleton
            className="min-w-[150px] min-h-[20px] w-full h-full"
            baseColor="gray"
          />
          <div className="flex gap-x-4 items-center mt-2">
            <Save />
            <Button size="sm" type="primary" text="more details" />
          </div>
        </div>
        <div>
          <Skeleton
            className="w-auto min-w-[150px] h-auto min-h-[150px] mb-2"
            baseColor="gray"
            // className=""
          />
        </div>
      </div>
    </div>
  );
};

export default LeftSideProducts;
