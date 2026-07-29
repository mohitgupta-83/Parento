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

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "products_settings.json");

// Helper to read local JSON file
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

// Helper to save local JSON file
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

// In-memory cache for live price & pixel updates
let memoryProducts: Record<string, ProductSetting> = {
  ...DEFAULT_PRODUCTS_SETTING,
  ...readLocalFile(),
};

// Sync memory products to siteConfig
function syncToSiteConfig() {
  if (memoryProducts["kids-worksheets"]) {
    const kw = memoryProducts["kids-worksheets"];
    (siteConfig.product as any).price = kw.price;
    (siteConfig.product as any).originalPrice = kw.originalPrice;
  }
}

syncToSiteConfig();

/**
 * Get all product settings for Admin Panel
 */
export async function getAllProductSettings(): Promise<ProductSetting[]> {
  // Load from local file first
  const fileData = readLocalFile();
  Object.keys(fileData).forEach((key) => {
    memoryProducts[key] = {
      ...memoryProducts[key],
      ...fileData[key],
    };
  });

  // Load from Supabase database as secondary source
  try {
    const { data, error } = await supabasePublic
      .from("products")
      .select("*");

    if (!error && data && data.length > 0) {
      data.forEach((item: any) => {
        const key = item.slug;
        if (key && (memoryProducts[key] || DEFAULT_PRODUCTS_SETTING[key])) {
          const existing = memoryProducts[key] || DEFAULT_PRODUCTS_SETTING[key];
          memoryProducts[key] = {
            ...existing,
            price: Number(item.price ?? existing.price),
            originalPrice: Number(item.original_price ?? existing.originalPrice),
            pixelId: item.pixel_id ?? existing.pixelId,
            active: item.active ?? true,
          };
        }
      });
    }
  } catch (err) {
    console.warn("Supabase products fetch fallback:", err);
  }

  syncToSiteConfig();
  return Object.values(memoryProducts);
}

/**
 * Get product setting by slug
 */
export async function getProductSetting(slug: string): Promise<ProductSetting> {
  const fileData = readLocalFile();
  if (fileData[slug]) {
    memoryProducts[slug] = {
      ...memoryProducts[slug],
      ...fileData[slug],
    };
    syncToSiteConfig();
    return memoryProducts[slug];
  }

  if (memoryProducts[slug]) {
    syncToSiteConfig();
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
        price: Number(data.price || 1),
        originalPrice: Number(data.original_price || 1999),
        pixelId: data.pixel_id || "",
        active: data.active ?? true,
      };
      memoryProducts[slug] = setting;
      syncToSiteConfig();
      return setting;
    }
  } catch (err) {
    console.warn(`Exception getting product setting for ${slug}:`, err);
  }

  const fallback = DEFAULT_PRODUCTS_SETTING[slug] || {
    id: slug,
    slug,
    name: "Digital Product",
    price: 1,
    originalPrice: 1999,
    pixelId: "",
    active: true,
  };

  memoryProducts[slug] = fallback;
  syncToSiteConfig();
  return fallback;
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

  // Persist to local JSON file immediately
  const fileData = readLocalFile();
  fileData[slug] = updated;
  saveLocalFile(fileData);

  syncToSiteConfig();

  // Try updating Supabase database
  try {
    const payload = {
      slug: slug,
      title: updated.name,
      price: updated.price,
      original_price: updated.originalPrice,
      pixel_id: updated.pixelId,
      download_file: slug === "kids-worksheets" ? "kids-worksheet-bundle.pdf" : "food-recipes.pdf",
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
    console.warn("Failed to persist product update to Supabase database:", err);
  }

  return updated;
}
