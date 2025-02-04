"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NotFound from "@/app/not-found";
import Categories from "@/components/products/categories";
import ProductsCards from "@/components/products/productCards";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  type CategoriesTab =
    | "all"
    | "living"
    | "jewerly"
    | "art"
    | "gift"
    | "beauty"
    | "crafts"
    | "apperel";

  const validTabs = new Set<CategoriesTab>([
    "all",
    "living",
    "jewerly",
    "art",
    "gift",
    "beauty",
    "crafts",
    "apperel",
  ]);

  const [activeTab, setActiveTab] = useState<CategoriesTab>("all");

  useEffect(() => {
    const tab = searchParams.get("tab") as CategoriesTab | null;
    if (tab && validTabs.has(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab("all"); // Default to 'all' if the tab is invalid
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = `${
      activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
    } Products | Industry Umbrella`;
  });

  const handleTabChange = (newTab: CategoriesTab) => {
    setActiveTab(newTab);
    router.push(`/products?tab=${newTab}`);
  };

  return (
    <div className="text-white lg:px-desktop md:px-tablet sm:px-mobile">
      {validTabs.has(activeTab) ? (
        <div>
          <div className="flex flex-col lg:flex-row justify-evenly">
            <Categories
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              clickHandler={() => handleTabChange(activeTab)}
            />
            <div className="mt-4 flex-grow"></div>
          </div>
          <ProductsCards category={activeTab} />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductsContent />
    </Suspense>
  );
}
