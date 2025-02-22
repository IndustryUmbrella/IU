"use client";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onRatingChange: (rating: number) => void;
  maxStars?: number;
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onRatingChange,
  maxStars = 5,
  readonly = false,
}) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starIndex = index + 1;
        return (
          <span
            key={starIndex}
            onMouseEnter={() => !readonly && setHoveredStar(starIndex)}
            onMouseLeave={() => !readonly && setHoveredStar(0)}
            onClick={() => !readonly && onRatingChange(starIndex)}
            className={`transition-all duration-300 text-3xl cursor-pointer ${
              starIndex <= (hoveredStar || value)
                ? "text-yellow-400"
                : "text-gray-400"
            } ${readonly ? "cursor-default" : "hover:scale-110"}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
