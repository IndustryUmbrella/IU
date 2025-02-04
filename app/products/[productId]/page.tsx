import React from "react";
import { notFound } from "next/navigation";
import ProductCarousel from "@/components/products/productCarousel";
import ProductRating from "@/components/products/productRating";
import Button from "@/components/general/button";
import Shop from "@/components/products/shop";
import ProductsCards from "@/components/products/productCards";
import { Metadata } from "next";

const getProduct = async (id?: any) => {
  if (!id) return null;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(`${baseUrl}/api/product/single-product/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const jsonData = await res.json();
    const imageRes = await fetch(
      `${baseUrl}/api/image/upload/${jsonData?.data?.seller_id}`,
      { cache: "no-store" }
    );
    const imagejsonData = imageRes.ok ? await imageRes.json() : null;

    return {
      product: jsonData.data,
      profileImage: imagejsonData?.imageUrl?.imageUrl || null,
    };
  } catch (error) {
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const response: any = await getProduct(params.productId);
  if (!response?.product) {
    return {
      title: "Product Not Found | Industry Umbrella",
      description: "This product does not exist.",
    };
  }

  return {
    title: `${response.product.productName} | Industry Umbrella`,
    description: response.product.productDescription || "Product details",
  };
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId }: any = params;

  const response = await getProduct(productId);
  if (!response?.product) {
    notFound();
  }

  const { product, profileImage } = response;

  return (
    <div>
      <div className="p-6 flex flex-col md:flex-row gap-10">
        {product?.productImage?.length > 0 && (
          <ProductCarousel
            images={product.productImage.map((img: any) => img?.link)}
          />
        )}
        <div className="flex flex-col-reverse sm:flex-row justify-around">
          <div>
            {profileImage && (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={profileImage}
                  width={50}
                  height={50}
                  className="rounded-full border border-white border-opacity-20"
                  alt="Seller profile"
                />
                <p className="text-white">Seller's Profile</p>
              </div>
            )}
            <div className="mt-5">
              <p className="text-[14px] text-white">
                Product Name:{" "}
                <span className="font-bold text-xl">
                  {product?.productName || ""}
                </span>
              </p>
              <p className="text-[14px] text-white">
                Description:{" "}
                <span className="font-bold text-xl">
                  {product?.productDescription || ""}
                </span>
              </p>
              <p className="text-[14px] text-white">
                Price:{" "}
                <span className="font-bold text-xl">
                  {product?.productPrice || ""}
                </span>
              </p>
              <p className="text-[14px] text-white">
                Category:{" "}
                <span className="font-bold text-xl">
                  {product?.productCategory || ""}
                </span>
              </p>
            </div>
            <ProductRating />
            <Button type="primary" size="sm" text="Buy it now" />
          </div>
          <Shop />
        </div>
      </div>
      <ProductsCards category={product?.productCategory} />
    </div>
  );
};

export default ProductDetails;
