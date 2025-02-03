"use client";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type ProductCarouselProps = {
  images: string[];
  thumbWidth?: number;
  thumbHeight?: number;
  showThumbs?: boolean;
};

const ProductCarousel = ({
  images,
  thumbWidth = 80,
  thumbHeight = 60,
  showThumbs = true,
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full max-w-lg">
      {/* Main Carousel */}
      <Carousel
        selectedItem={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
        showThumbs={false}
        className="w-full border border-white rounded-md border-opacity-15"
      >
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
              alt={`Product image ${idx}`}
              className="w-[350px] h-[350px] md:w-[460px] md:h-[460px]  object-center rounded"
            />
          </div>
        ))}
      </Carousel>

      {showThumbs && (
        <div className="flex justify-center gap-2 mt-7">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`cursor-pointer rounded border-2 object-center ${
                idx === currentIndex ? "border-blue-500" : "border border-white"
              }`}
              style={{
                width: thumbWidth,
                height: thumbHeight,
                objectFit: "cover",
              }}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
