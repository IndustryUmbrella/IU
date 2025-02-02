import React from "react";
import { notFound } from "next/navigation";

const getProduct = async (id?: string) => {
  if (!id) {
    return notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(`${baseUrl}/api/product/single-product/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return notFound();
    }

    const json = await res.json();

    const imageRes = await fetch(
      `${baseUrl}/api/image/upload/${json?.data?.seller_id}`,
      {
        cache: "no-store",
      }
    );

    const imageJson = imageRes.ok ? await imageRes.json() : null;

    return {
      product: json.data, // Ensure the structure is correct
      profileImage: imageJson?.imageUrl?.imageUrl || null, // Extract the image URL
    };
  } catch (error) {
    return null;
  }
};

type PageProps = {
  params: Promise<{ productId: string }>;
};

const ProductDetails = ({ params }: PageProps) => {
  // Unwrap the params Promise using React.use()
  const { productId } = React.use(params);

  // Fetch product data
  const response = React.use(getProduct(productId));

  if (!response || !response.product) {
    notFound(); // Redirect to 404 page if product is not found
  }

  const { product, profileImage } = response;

  return (
    <div className="p-6 flex flex-row gap-10">
      {/* Product Images */}
      <div className="flex flex-col gap-2">
        <img
          src={product?.productImage[0]?.link}
          width={400}
          height={300}
          className="rounded border border-white border-opacity-10"
          alt="Main product image"
        />
        <div className="flex gap-x-4">
          {product?.productImage?.map((img: any, idx: number) => (
            <img
              key={idx}
              src={img?.link}
              width={100}
              alt={`Product image ${idx}`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
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
        <h1 className="text-2xl text-white">{product.productName}</h1>
        <p className="text-white">{product.productDescription}</p>
        <p className="text-white font-bold">{product.productPrice} USD</p>
      </div>
    </div>
  );
};

export default ProductDetails;
