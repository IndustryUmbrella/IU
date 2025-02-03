"use client";
import { useState } from "react";

// Custom Star Rating Component
const StarRating = ({
  value,
  onRatingChange,
  maxStars = 5,
}: {
  value: number;
  onRatingChange: (rating: number) => void;
  maxStars?: number;
}) => {
  const [hoveredStar, setHoveredStar] = useState(0); // Track hovered star
  const [readonly, setReadonly] = useState(false); // To prevent double rating

  const handleMouseEnter = (index: number) => {
    if (!readonly) setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    if (!readonly) setHoveredStar(0);
  };

  const handleClick = (index: number) => {
    if (!readonly) {
      onRatingChange(index);
      setReadonly(true); // Make stars read-only after rating
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starIndex = index + 1;
        return (
          <span
            key={starIndex}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            className="transition-all duration-300 "
            style={{
              cursor: readonly ? "default" : "pointer",
              fontSize: "32px",
              color: starIndex <= (hoveredStar || value) ? "gold" : "white",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
