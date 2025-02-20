"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeToken } from "@/helper/isAuthorized";
import AccountTab from "@/components/accountTabAdmin/accounTab";
import axios from "axios";
import { login } from "@/app/store/sellerSlice";
import Cookies from "js-cookie";
import NotFound from "@/app/not-found";
import DashboardTab from "@/components/dashboardTabAdmin/dashboardTab";
import SettingTab from "@/components/settingTabAdmin/settingTab";
import OrderTab from "@/components/orderTabAdmin/orderTab";

export default function SellerDashboard({
  params: paramsPromise,
}: {
  params: Promise<{ sellerId: string }>;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const userData = useSelector((state: RootState) => state.seller.user);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [sellerId, setSellerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  useEffect(() => {
    paramsPromise.then((unwrappedParams) => {
      setSellerId(unwrappedParams.sellerId);
    });
  }, [paramsPromise]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchSellerData = async () => {
      if (!sellerId) return;

      try {
        const token = Cookies.get("authToken");

        if (!token) {
          console.log("No authToken cookie found");
          router.push("/login");
          return;
        }

        const authenticatedUserId = decodeToken(token);

        if (sellerId !== authenticatedUserId) {
          router.push(`/profile/${authenticatedUserId}`);
          return;
        }

        const response = await axios.get(
          `${baseUrl}/api/auth/seller/${sellerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          dispatch(login(response.data));
        }
      } catch (error: any) {
        console.log("Error fetching seller data:", error.message);
      }
    };

    fetchSellerData();
  }, [sellerId, router, baseUrl, dispatch]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.push(`/profile/${sellerId}?tab=${newTab}`);
  };

  return (
    <div className="text-white px-[6px] lg:px-desktop md:px-tablet sm:px-mobile">
      {sellerId &&
      (activeTab == "dashboard" ||
        activeTab == "account" ||
        activeTab == "settings" ||
        activeTab == "orders") ? (
        <div>
          <h1 className="my-10 text-2xl">
            Welcome to your Dashboard <b>{userData?.companyName}</b>
          </h1>
          <div className="flex flex-col lg:flex-row ">
            <div className="flex flex-row lg:flex-col gap-4 my-4 bg-[#0c0c0b]   shadow-xl shadow-gray-950 px-4 sm:px-20 py-4 rounded-md">
              <button
                className={`px-2 text-sm sm:text-base sm:px-4 py-2 ${
                  activeTab === "dashboard"
                    ? "bg-[#090909] shadow-md shadow-gray-900 text-white"
                    : "bg-white text-black rounded-md"
                }`}
                onClick={() => handleTabChange("dashboard")}
              >
                Dashboard
              </button>

              <button
                className={`px-2 text-sm sm:text-base sm:px-4 py-2 ${
                  activeTab === "account"
                    ? "bg-[#090909] shadow-md shadow-gray-900 text-white"
                    : "bg-white text-black rounded-md"
                }`}
                onClick={() => handleTabChange("account")}
              >
                Account
              </button>

              <button
                className={`px-2 text-sm sm:text-base sm:px-4 py-2 ${
                  activeTab === "settings"
                    ? "bg-[#090909] shadow-md shadow-gray-900 text-white"
                    : "bg-white text-black rounded-md"
                }`}
                onClick={() => handleTabChange("settings")}
              >
                Settings
              </button>
              <button
                className={`px-2 text-sm sm:text-base sm:px-4 py-2 ${
                  activeTab === "orders"
                    ? "bg-[#090909] shadow-md shadow-gray-900 text-white"
                    : "bg-white text-black rounded-md"
                }`}
                onClick={() => handleTabChange("orders")}
              >
                Orders
              </button>
            </div>

            <div className="mt-4 flex-grow">
              <div
                className="tab-content"
                style={{
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {activeTab === "dashboard" && <DashboardTab />}
                {activeTab === "account" && <AccountTab />}
                {activeTab === "settings" && <SettingTab userData={userData} />}
                {activeTab === "orders" && <OrderTab />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
