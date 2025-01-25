import React from "react";
import Image from "next/image";
import Image1 from "../../public/images/image1.png";
import Image2 from "../../public/images/image2.png";
import Image3 from "../../public/images/image3.png";
import Image4 from "../../public/images/image4.png";
import Image5 from "../../public/images/image5.png";
import Skeleton from "react-loading-skeleton";
import Cart from "@/public/svgs/cart";

const ProductsCards = () => {
  const Images = [Image1, Image2, Image3, Image4, Image5];

  return (
    <div className="flex flex-col">
      {Array.from({ length: 2 }, (_, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className="flex items-center justify-between w-auto space-x-4 py-6  h-auto"
          >
            {Array.from({ length: 4 }, (_, colIndex) => {
              const imageIndex = rowIndex * 4 + colIndex; // Calculate the image index based on row and column
              return (
                <div
                  key={colIndex}
                  className="bg-white relative rounded-xl pb-2 w-80"
                >
                  <Image
                    src={Images[imageIndex % Images.length]} // Use modulo to loop through the images array
                    alt={`Product ${imageIndex}`}
                    className="w-[330px] h-[320px] object-center"
                  />
                  <div className="flex justify-between gap-1 px-[3px] py-4">
                    <div className="flex flex-col">
                      <Skeleton
                        baseColor="black"
                        width={120}
                        height={20}
                        className=""
                      />
                      <Skeleton
                        baseColor="black"
                        width={120}
                        height={20}
                        className=""
                      />
                    </div>
                    <div className="">
                      <Skeleton
                        baseColor="black"
                        width={150}
                        height={45}
                        className=""
                      />
                    </div>
                    <Cart />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ProductsCards;
