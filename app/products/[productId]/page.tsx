import React from "react";
import { notFound } from "next/navigation";
import ProductCarousel from "@/components/products/productCarousel";
import ProductRating from "@/components/products/productRating";
import Shop from "@/components/products/shop";
import ProductsCards from "@/components/products/productCards";
import { Metadata } from "next";
import ProductCartActions from "@/components/products/handleAddToCart";
import ShareButton from "@/components/general/shareButton";
import SellerSocialMedia from "@/components/auth/sellerSocial/sellerSocialMedia";
import BackButton from "@/components/general/backButton";
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
      <BackButton />
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

              <div className="flex flex-row gap-x-2 ">
                <p className="text-[14px] text-white">
                  <span className="font-bold text-xl line-through">
                    {(
                      (product?.productPrice * 100) /
                      (100 - product?.discount)
                    ).toFixed(2)}
                    $
                  </span>
                </p>

                <p className=" text-white">
                  Price:
                  <b>{product?.productPrice}$</b>
                </p>
              </div>
              <p className="text-[14px] text-white">
                Category:{" "}
                <span className="font-bold text-xl">
                  {product?.productCategory || ""}
                </span>
              </p>
            </div>
            <ProductRating />
            <ProductCartActions product={product} userData={seller} />
            <div className="mt-4">
              <SellerSocialMedia socialLinks={seller} />
            </div>
          </div>
          <div className="flex flex-col  items-center justify-center my-10 gap-y-20  ">
            <ShareButton details={product} />
            <div>
              <div className="text-white text-xl">
                {product?.sizes.split(",").join(" ")}
              </div>
              <div className="text-white text-xl">
                {product?.colors.split(",")?.map((s: any, i: any) => (
                  <p key={i}>{s}</p>
                ))}
              </div>
              <div className="text-white text-xl">{product?.weight}KG</div>
            </div>
          </div>
        </div>
      </div>
      <ProductsCards
        showLoadMore={false}
        userData={seller}
        category={product?.productCategory}
      />
    </div>
  );
};

export default ProductDetails;
