"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import Button from "@/components/general/button";
import Link from "next/link";

const ProductCartActions = ({
  product,
  userData,
}: {
  product: any;
  userData: any;
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product?.productId,
        name: product?.productName,
        price: product?.productPrice,
        quantity: 1,
        productImage: product?.productImage[0]?.link,
        description: product?.productDescription,
        category: product?.productCategory,
        seller_id: product?.seller_id,
        companyName: product?.companyName,
      })
    );
  };

  return (
    <div className="mt-5">
      <Button
        type="primary"
        size="sm"
        text={<Link href="/checkout">Buy it Now</Link>}
        clickHandler={() => handleAddToCart(product)}
      />
      <Button
        type="secondary"
        size="sm"
        text="Add to cart"
        className="mt-2"
        clickHandler={() => handleAddToCart(product)}
      />
    </div>
  );
};

export default ProductCartActions;
