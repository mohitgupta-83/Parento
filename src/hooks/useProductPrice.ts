"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

export function useProductPrice(slug: string = "kids-worksheets") {
  const [price, setPrice] = useState<number>(
    slug === "baby-food-gain-recipe" ? 1 : siteConfig.product.price
  );
  const [originalPrice, setOriginalPrice] = useState<number>(
    slug === "baby-food-gain-recipe" ? 499 : siteConfig.product.originalPrice
  );
  const [pixelId, setPixelId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.products)) {
          const item = data.products.find((p: any) => p.slug === slug);
          if (item) {
            if (item.price !== undefined) setPrice(item.price);
            if (item.originalPrice !== undefined) setOriginalPrice(item.originalPrice);
            if (item.pixelId !== undefined) setPixelId(item.pixelId);
          }
        }
      })
      .catch((err) => console.warn("Failed to fetch live product price:", err))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { price, originalPrice, pixelId, isLoading };
}
