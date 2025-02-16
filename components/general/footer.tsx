import Logo from "@/public/svgs/logo";
import Link from "next/link";
import React from "react";
import SocialMedia from "../contact/socialMedia";

const Footer = () => {
  const currentDate = new Date().getFullYear();
  return (
    <div className="bg-white">
      <div className=" flex flex-col sm:flex-row flex-wrap justify-between overflow-x-hidden px-[6px] lg:px-desktop md:px-tablet sm:px-mobile gap-y-8 mt-10 rounded p-4">
        <div className="flex flex-col  font-light text-lg gap-x-3">
          <Link href="/">
            <Logo className={"w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"} />
          </Link>
          <h1 className="font-medium">Our Pages</h1>
          <Link href="/">Home</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/products?tab=all">Products</Link>
          <Link href="/contaact">Contact</Link>
        </div>
        <div className="flex flex-col font-light text-lg gap-x-3">
          <h1 className="font-medium">Our Categories</h1>
          <Link href="/products?tab=all">All Categories</Link>
          <Link href="/products?tab=living">Home & Living</Link>
          <Link href="/products?tab=jewerly">Jewelry & Accessories</Link>
          <Link href="/products?tab=gift">Gifts & Seasonal Items</Link>
          <Link href="/products?tab=art">Art & Collectibles</Link>
          <Link href="/products?tab=beauty"> Beauty & Wellness</Link>
          <Link href="/products?tab=crafts">Eco-Friendly Crafts</Link>
          <Link href="/products?tab=apperel">Apparel & Wearables</Link>
        </div>
        <div className="flex flex-col font-light text-lg gap-x-3">
          <h1 className="font-medium">Our Policies</h1>
          <Link href="/">Terms and Policies</Link>
          <Link href="/">Shiping</Link>
          <Link href="/">Our Team</Link>
          <Link href="/">Gifts & Seasonal Items</Link>
        </div>
        <div className="flex flex-col font-light text-lg gap-x-3">
          <h1 className="font-medium">Contact Us:</h1>
          <p>Support: iu.afg11111@gmail.com</p>
          <p>Phone: +123456789</p>
          <p>Address: Kabul, Afghanistan</p>
          <p>Follow Us On:</p>
          <SocialMedia colores="black" />
        </div>
      </div>
      <p className="text-center">
        Copyright &copy; 2024 - {currentDate} Industry Umbrella
      </p>
    </div>
  );
};

export default Footer;
