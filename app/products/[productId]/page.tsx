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
import { FaFontAwesome } from "react-icons/fa6";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoPopUp from "@/components/general/infoPopUp";
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
    <div className="px-[6px] lg:px-desktop md:px-tablet sm:px-mobile">
      <BackButton />
      <div className="flex flex-col md:flex-row gap-10 w-full mt-4">
        {product?.productImage?.length > 0 && (
          <ProductCarousel
            images={product.productImage.map((img: any) => img?.link)}
          />
        )}
        <div className="w-full">
          <div>
            {seller?.companyLogo && (
              <div className="flex flex-row items-center justify-between  w-full ">
                <div className="mt-4 flex items-center gap-4 ">
                  <img
                    src={seller?.companyLogo}
                    className="rounded-full border border-white border-opacity-20 w-[50px] h-[50px]"
                    alt="Seller profile"
                  />
                  <div className="flex flex-col">
                    <p className="text-white font-semibold">
                      {seller?.companyName}
                    </p>
                    <p className="text-white">{seller?.companyDescription}</p>
                  </div>
                </div>
                <div className="flex flex-row  items-center justify-center gap-x-10 ">
                  <InfoPopUp data={product} />
                  <ShareButton details={product} />
                </div>
              </div>
            )}
          </div>
          <div className="mt-5  w-full max-w-[380px]">
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
                  {product?.productPrice}$
                </span>
              </p>

              <p className=" text-white">
                Price:
                <b>{product?.finalPrice}$</b>
              </p>
            </div>
            <p className="text-[14px] text-white">
              Category:{" "}
              <span className="font-bold text-xl">
                {product?.productCategory || ""}
              </span>
            </p>
            <ProductRating productId={productId} />
            <ProductCartActions product={product} userData={seller} />
          </div>
          <div className="mt-4">
            <SellerSocialMedia socialLinks={seller} />
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
