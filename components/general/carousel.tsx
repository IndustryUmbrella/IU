"use client";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type ProductCarouselProps = {
  images: string[];
  thumbWidth?: number;
  thumbHeight?: number;
  showThumbs?: boolean;
  autoPlay?: boolean;
  infiniteLoop?: boolean;
  showIndicators?: boolean;
  showStatus?: boolean;
};

const ProductCarousel = ({
  images,
  thumbWidth = 80,
  thumbHeight = 60,
  showThumbs = true,
  autoPlay = false,
  infiniteLoop = true,
  showIndicators = true,
  showStatus = false,
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full max-w-lg">
      {/* Main Carousel */}
      <Carousel
        selectedItem={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
        showThumbs={showThumbs}
        autoPlay={autoPlay}
        infiniteLoop={infiniteLoop}
        showIndicators={showIndicators}
        showStatus={showStatus}
        className="w-full"
        dynamicHeight={true}
      >
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
              alt={`Product image ${idx}`}
              className="w-full h-[460px] object-cover rounded"
            />
          </div>
        ))}
      </Carousel>

      {/* Custom Thumbnails */}
      {showThumbs && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`cursor-pointer rounded border-2 ${
                idx === currentIndex ? "border-blue-500" : "border-transparent"
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
