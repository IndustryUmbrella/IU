import React from "react";
import { notFound } from "next/navigation";
import ProductCarousel from "@/components/products/productCarousel";
import ProductRating from "@/components/products/productRating";
import Shop from "@/components/products/shop";
import ProductsCards from "@/components/products/productCards";
import { Metadata } from "next";
import ProductCartActions from "@/components/products/handleAddToCart";
const getProduct = async (id?: any) => {
  if (!id) return null;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(`${baseUrl}/api/product/single-product/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const jsonData = await res.json();
    const sellerData = await fetch(
      `${baseUrl}/api/auth/seller-buyer/${jsonData?.data?.seller_id}`,
      { cache: "no-store" }
    );
    const seller = sellerData.ok ? await sellerData.json() : null;
    return {
      product: jsonData.data,
      seller: seller,
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

  const { product, seller } = response;

  return (
    <div>
      <div className="p-6 flex flex-col md:flex-row gap-10 w-full">
        {product?.productImage?.length > 0 && (
          <ProductCarousel
            images={product.productImage.map((img: any) => img?.link)}
          />
        )}
        <div className="flex flex-col-reverse sm:flex-row justify-between  w-full">
          <div>
            {seller?.companyLogo && (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={seller?.companyLogo}
                  width={50}
                  height={50}
                  className="rounded-full border border-white border-opacity-20"
                  alt="Seller profile"
                />
                <div className="flex flex-col">
                  <p className="text-white font-semibold">
                    {seller?.companyName}
                  </p>
                  <p className="text-white">{seller?.companyDescription}</p>
                </div>
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
            <ProductCartActions product={product} />
          </div>
          <Shop />
        </div>
      </div>
      <ProductsCards showLoadMore={false} category={product?.productCategory} />
    </div>
  );
};

export default ProductDetails;
