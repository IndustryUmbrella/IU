import React from "react";
import { decodeToken } from "@/helper/isAuthorized";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SellerDashboard({
  params,
}: {
  params: Promise<{ sellerId: any }>;
}) {
  const { sellerId }: any = params;
  //   console.log(sellerId, "[[[[[[[");

  // Await cookies to get the auth token
  const cookieStore = await cookies();
  const token: string | undefined = cookieStore.get("authToken")?.value;

  // Ensure token exists
  if (!token) {
    redirect("/login");
    return null;
  }

  const authenticatedUserId = decodeToken(token);

  if (sellerId !== authenticatedUserId) {
    redirect(`/profile/${authenticatedUserId}`);
    return null;
  }

  return <div className="text-white">Welcome to your Seller Dashboard</div>;
}
