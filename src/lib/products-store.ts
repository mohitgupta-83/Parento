import { supabaseAdmin, supabasePublic } from "./supabase";

export interface ProductSetting {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  pixelId: string;
  active: boolean;
  updatedAt?: string;
}

// Default product settings configuration
export const DEFAULT_PRODUCTS_SETTING: Record<string, ProductSetting> = {
  "kids-worksheets": {
    id: "kids-worksheets",
    slug: "kids-worksheets",
    name: "15,000+ Printable Kids Worksheets Bundle",
    price: 1,
    originalPrice: 1999,
    pixelId: "",
    active: true,
  },
  "baby-food-gain-recipe": {
    id: "baby-food-gain-recipe",
    slug: "baby-food-gain-recipe",
    name: "Healthy Weight Gain Recipes For Children",
    price: 1,
    originalPrice: 499,
    pixelId: "",
    active: true,
  },
};

// In-memory cache for live price & pixel updates
let memoryProducts: Record<string, ProductSetting> = { ...DEFAULT_PRODUCTS_SETTING };

/**
 * Get all product settings for Admin Panel
 */
export async function getAllProductSettings(): Promise<ProductSetting[]> {
  try {
    const { data, error } = await supabasePublic
      .from("products")
      .select("*");

    if (!error && data && data.length > 0) {
      data.forEach((item: any) => {
        const key = item.slug;
        if (memoryProducts[key]) {
          memoryProducts[key] = {
            ...memoryProducts[key],
            price: item.price ?? memoryProducts[key].price,
            originalPrice: item.original_price ?? memoryProducts[key].originalPrice,
            pixelId: item.pixel_id ?? memoryProducts[key].pixelId,
            active: item.active ?? true,
          };
        } else {
          memoryProducts[key] = {
            id: item.id || item.slug,
            slug: item.slug,
            name: item.title || item.name,
            price: item.price || 1,
            originalPrice: item.original_price || 1999,
            pixelId: item.pixel_id || "",
            active: item.active ?? true,
          };
        }
      });
    }
  } catch (err) {
    console.warn("Using cached product settings:", err);
  }

  return Object.values(memoryProducts);
}

/**
 * Get product setting by slug
 */
export async function getProductSetting(slug: string): Promise<ProductSetting> {
  if (memoryProducts[slug]) {
    return memoryProducts[slug];
  }

  try {
    const { data, error } = await supabasePublic
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      const setting: ProductSetting = {
        id: data.id || data.slug,
        slug: data.slug,
        name: data.title || data.name,
        price: data.price || 1,
        originalPrice: data.original_price || 1999,
        pixelId: data.pixel_id || "",
        active: data.active ?? true,
      };
      memoryProducts[slug] = setting;
      return setting;
    }
  } catch (err) {
    console.warn(`Exception getting product setting for ${slug}:`, err);
  }

  return DEFAULT_PRODUCTS_SETTING[slug] || {
    id: slug,
    slug,
    name: "Digital Product",
    price: 1,
    originalPrice: 1999,
    pixelId: "",
    active: true,
  };
}

/**
 * Update product setting (Price & Meta Pixel ID)
 */
export async function updateProductSetting(
  slug: string,
  updates: Partial<ProductSetting>
): Promise<ProductSetting> {
  const current = memoryProducts[slug] || DEFAULT_PRODUCTS_SETTING[slug] || {
    id: slug,
    slug,
    name: "Digital Product",
    price: 1,
    originalPrice: 1999,
    pixelId: "",
    active: true,
  };

  const updated: ProductSetting = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  memoryProducts[slug] = updated;

  try {
    // Try updating Supabase database
    const payload = {
      slug: slug,
      title: updated.name,
      price: updated.price,
      original_price: updated.originalPrice,
      pixel_id: updated.pixelId,
      active: updated.active,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabaseAdmin
      .from("products")
      .upsert([payload], { onConflict: "slug" });

    if (error) {
      console.warn("Supabase upsert product warning:", error.message);
    }
  } catch (err) {
    console.warn("Failed to persist product update to Supabase database:", err);
  }

  return updated;
}
