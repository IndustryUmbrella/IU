"use client";
import { useState } from "react";
import StarRating from "@/components/general/ratingStars";

const ProductRating = () => {
  const [rating, setRating] = useState(0);

  const handleRate = (newRating: number) => {
    setRating(newRating);
    alert(`You rated: ${newRating} stars`);
  };

  return <StarRating maxStars={5} onRatingChange={handleRate} value={rating} />;
};

export default ProductRating;
