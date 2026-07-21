import { supabaseAdmin, supabasePublic } from "./supabase";
import { siteConfig } from "@/config/site";

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  thumbnail: string | null;
  preview_pdf: string | null;
  download_file: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OrderRecord {
  id?: string;
  product_id?: string | null;
  customer_name: string;
  email: string;
  phone: string;
  amount: number;
  order_id: string;
  payment_id?: string | null;
  signature?: string | null;
  payment_status: "created" | "paid" | "failed";
  created_at?: string;
}

// Fallback demo product if Supabase is not yet populated
const FALLBACK_PRODUCT: Product = {
  id: "00000000-0000-0000-0000-000000000001",
  title: siteConfig.product.name,
  slug: "kids-worksheets",
  description: "15,000+ Printable Worksheets designed for children aged 2–10.",
  price: siteConfig.product.price,
  thumbnail: "/previews/preview-1.webp",
  preview_pdf: "/previews/sample.pdf",
  download_file: "kids-worksheet-bundle.pdf",
  active: true,
};

/**
 * Fetch product by slug from Supabase database
 * Falls back seamlessly to config product if database is unconfigured or empty.
 */
export async function getProductBySlug(slug: string = "kids-worksheets"): Promise<Product> {
  try {
    const { data, error } = await supabasePublic
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle();

    if (error || !data) {
      return FALLBACK_PRODUCT;
    }

    return data as Product;
  } catch (err) {
    console.warn("Using fallback product due to Supabase query exception:", err);
    return FALLBACK_PRODUCT;
  }
}

/**
 * Create an initial pending order record in Supabase
 */
export async function createOrderRecord(orderData: OrderRecord): Promise<OrderRecord | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert([orderData])
      .select()
      .maybeSingle();

    if (error) {
      console.warn("Could not record pending order in Supabase (using mock mode):", error.message);
      return orderData;
    }

    return data as OrderRecord;
  } catch (err) {
    console.warn("Exception during order creation in Supabase:", err);
    return orderData;
  }
}

/**
 * Update an order upon successful payment verification
 */
export async function updateOrderPaymentSuccess(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        payment_id: paymentId,
        signature: signature,
        payment_status: "paid",
      })
      .eq("order_id", orderId);

    if (error) {
      console.warn("Failed to update order status in Supabase:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.warn("Exception during order payment update:", err);
    return false;
  }
}

/**
 * Get order details by order_id or payment_id for thank-you page & secure download authorization
 */
export async function getOrderByOrderId(orderId: string): Promise<OrderRecord | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as OrderRecord;
  } catch (err) {
    return null;
  }
}
