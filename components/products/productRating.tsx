"use client";
import { useState, useEffect } from "react";
import StarRating from "@/components/general/ratingStars";
import axios from "axios";

const ProductRating = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    // Check if the user has already rated this product
    const ratedProducts = JSON.parse(
      localStorage.getItem("ratedProducts") || "{}"
    );
    if (ratedProducts[productId]) {
      setRating(ratedProducts[productId]);
      setHasRated(true);
    }
  }, [productId]);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleRate = async (newRating: number) => {
    if (hasRated) {
      alert("You have already rated this product!");
      return;
    }

    try {
      await axios.post(`${baseUrl}/api/product/rate-product`, {
        productId,
        rating: newRating,
      });
      setRating(newRating);
      setHasRated(true);

      // Store in localStorage to prevent duplicate voting
      const ratedProducts = JSON.parse(
        localStorage.getItem("ratedProducts") || "{}"
      );
      ratedProducts[productId] = newRating;
      localStorage.setItem("ratedProducts", JSON.stringify(ratedProducts));

      alert(`You rated: ${newRating} stars`);
    } catch (error: any) {
      console.error("Error submitting rating:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <StarRating
      maxStars={5}
      onRatingChange={handleRate}
      value={rating}
      readonly={hasRated}
    />
  );
};

export default ProductRating;
