import fs from "fs";
import path from "path";
import { supabaseAdmin, supabasePublic } from "./supabase";
import { siteConfig } from "@/config/site";

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
    price: 199,
    originalPrice: 1999,
    pixelId: "2085286602361116",
    active: true,
  },
  "baby-food-gain-recipe": {
    id: "baby-food-gain-recipe",
    slug: "baby-food-gain-recipe",
    name: "Healthy Weight Gain Recipes For Children",
    price: 299,
    originalPrice: 499,
    pixelId: "1654475442282882",
    active: true,
  },
  "soulmate-sketch": {
    id: "soulmate-sketch",
    slug: "soulmate-sketch",
    name: "Personalized Soulmate Sketch + Free Love Psychic Reading",
    price: 199,
    originalPrice: 1999,
    pixelId: "995873696488301",
    active: true,
  },
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "products_settings.json");

function readLocalFile(): Record<string, ProductSetting> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read local products_settings.json file:", err);
  }
  return {};
}

function saveLocalFile(data: Record<string, ProductSetting>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save to local products_settings.json file:", err);
  }
}

let memoryProducts: Record<string, ProductSetting> = {
  ...DEFAULT_PRODUCTS_SETTING,
  ...readLocalFile(),
};

function syncToSiteConfig() {
  (siteConfig.product as any).price = 199;
  (siteConfig.product as any).originalPrice = 1999;
}

syncToSiteConfig();

/**
 * Get all product settings for Admin Panel
 */
export async function getAllProductSettings(): Promise<ProductSetting[]> {
  const fileData = readLocalFile();

  const result: Record<string, ProductSetting> = { ...DEFAULT_PRODUCTS_SETTING };

  Object.keys(fileData).forEach((key) => {
    if (result[key]) {
      result[key] = {
        ...result[key],
        pixelId: fileData[key].pixelId || result[key].pixelId,
      };
    }
  });

  try {
    const { data } = await supabasePublic.from("products").select("*");
    if (data && Array.isArray(data)) {
      data.forEach((item: any) => {
        const key = item.slug;
        if (key && result[key]) {
          result[key].pixelId = item.pixel_id || result[key].pixelId;
        }
      });
    }
  } catch (err) {
    console.warn("Supabase pixel fetch fallback:", err);
  }

  memoryProducts = { ...result };
  syncToSiteConfig();
  return Object.values(memoryProducts);
}

/**
 * Get product setting by slug
 */
export async function getProductSetting(slug: string): Promise<ProductSetting> {
  const defaultSettings: Record<string, Partial<ProductSetting>> = {
    "baby-food-gain-recipe": { name: "Healthy Weight Gain Recipes For Children", price: 299, originalPrice: 499 },
    "soulmate-sketch": { name: "Personalized Soulmate Sketch + Free Love Psychic Reading", price: 199, originalPrice: 1999 },
  };
  const defaults = defaultSettings[slug] || { name: "15,000+ Printable Kids Worksheets Bundle", price: 199, originalPrice: 1999 };

  const defaultProduct: ProductSetting = {
    id: slug,
    slug,
    name: defaults.name!,
    price: defaults.price!,
    originalPrice: defaults.originalPrice!,
    pixelId: "",
    active: true,
  };

  const fileData = readLocalFile();
  if (fileData[slug]) {
    defaultProduct.pixelId = fileData[slug].pixelId || "";
  }

  return defaultProduct;
}

/**
 * Update Meta Pixel ID setting for a product
 */
export async function updateProductSetting(
  slug: string,
  updates: Partial<ProductSetting>
): Promise<ProductSetting> {
  const defaultSettings: Record<string, Partial<ProductSetting>> = {
    "baby-food-gain-recipe": { name: "Healthy Weight Gain Recipes For Children", price: 299, originalPrice: 499 },
    "soulmate-sketch": { name: "Personalized Soulmate Sketch + Free Love Psychic Reading", price: 399, originalPrice: 1999 },
  };
  const defaults = defaultSettings[slug] || { name: "15,000+ Printable Kids Worksheets Bundle", price: 199, originalPrice: 1999 };
  const current: ProductSetting = {
    id: slug,
    slug,
    name: defaults.name!,
    price: defaults.price!,
    originalPrice: defaults.originalPrice!,
    pixelId: "",
    active: true,
  };

  const updated: ProductSetting = {
    ...current,
    pixelId: updates.pixelId !== undefined ? String(updates.pixelId) : current.pixelId,
    updatedAt: new Date().toISOString(),
  };

  memoryProducts[slug] = updated;

  const fileData = readLocalFile();
  fileData[slug] = updated;
  saveLocalFile(fileData);

  try {
    const payload = {
      slug: slug,
      title: updated.name,
      price: updated.price,
      original_price: updated.originalPrice,
      pixel_id: updated.pixelId,
      download_file: slug === "kids-worksheets" ? "kids-worksheet-bundle.pdf" : slug === "soulmate-sketch" ? "soulmate-sketch-reading.pdf" : "food-recipes.pdf",
      active: updated.active,
      updated_at: new Date().toISOString(),
    };

    const { error: pubErr } = await supabasePublic
      .from("products")
      .upsert([payload], { onConflict: "slug" });

    if (pubErr) {
      await supabaseAdmin
        .from("products")
        .upsert([payload], { onConflict: "slug" });
    }
  } catch (err) {
    console.warn("Failed to persist Meta Pixel ID to Supabase database:", err);
  }

  return updated;
}
