"use client";

import { useState, useEffect } from "react";

export function useProductPrice(slug: string = "kids-worksheets") {
  const isBabyFood = slug === "baby-food-gain-recipe";
  const defaultPrice = isBabyFood ? 1 : 199;
  const defaultOriginalPrice = isBabyFood ? 499 : 1999;

  const [price] = useState<number>(defaultPrice);
  const [originalPrice] = useState<number>(defaultOriginalPrice);
  const [pixelId, setPixelId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.products)) {
          const item = data.products.find((p: any) => p.slug === slug);
          if (item && item.pixelId !== undefined) {
            setPixelId(item.pixelId);
          }
        }
      })
      .catch((err) => console.warn("Failed to fetch product pixel settings:", err))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { price, originalPrice, pixelId, isLoading };
}
