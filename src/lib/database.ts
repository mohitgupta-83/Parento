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
  payment_status: "created" | "paid" | "failed" | "abandoned";
  created_at?: string;
}

// Fallback demo product if Supabase is not yet populated
const FALLBACK_PRODUCT: Product = {
  id: "00000000-0000-0000-0000-000000000001",
  title: siteConfig.product.name,
  slug: "kids-worksheets",
  description: "15,000+ Printable Worksheets designed for children aged 2–10.",
  price: siteConfig.product.price,
  thumbnail: "/images/product/product-main.webp",
  preview_pdf: "/previews/sample.pdf",
  download_file: "kids-worksheet-bundle.pdf",
  active: true,
};

/**
 * Fetch product by slug from Supabase database
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
 * Create an initial order record in Supabase (upserts on order_id to prevent duplicates)
 */
export async function createOrderRecord(orderData: OrderRecord): Promise<OrderRecord | null> {
  try {
    // Try public client first since RLS is open for public all
    const { data: pubData, error: pubErr } = await supabasePublic
      .from("orders")
      .upsert([orderData], { onConflict: "order_id" })
      .select()
      .maybeSingle();

    if (!pubErr && pubData) {
      return pubData as OrderRecord;
    }

    // Fallback to admin client
    const { data, error } = await supabaseAdmin
      .from("orders")
      .upsert([orderData], { onConflict: "order_id" })
      .select()
      .maybeSingle();

    if (error) {
      console.warn("Could not record order in Supabase:", error.message);
      return orderData;
    }

    return data as OrderRecord;
  } catch (err) {
    console.warn("Exception during order creation in Supabase:", err);
    return orderData;
  }
}

/**
 * Update or upsert an order upon successful payment verification (status changes to "paid")
 */
export async function updateOrderPaymentSuccess(
  orderId: string,
  paymentId: string,
  signature: string,
  customerName?: string,
  email?: string,
  phone?: string,
  amount?: number
): Promise<boolean> {
  try {
    const updatePayload: Record<string, any> = {
      order_id: orderId,
      payment_id: paymentId,
      signature: signature,
      payment_status: "paid",
    };

    if (customerName) updatePayload.customer_name = customerName;
    if (email) updatePayload.email = email;
    if (phone) updatePayload.phone = phone;
    if (amount !== undefined) updatePayload.amount = amount;

    // First try updating existing record by order_id
    const { data: existing } = await supabasePublic
      .from("orders")
      .select("id, customer_name, email, phone, amount")
      .eq("order_id", orderId)
      .maybeSingle();

    if (existing) {
      await supabasePublic
        .from("orders")
        .update(updatePayload)
        .eq("order_id", orderId);
    } else {
      // Upsert full row if record didn't exist yet
      const fullOrder = {
        customer_name: customerName || "Customer",
        email: email || "customer@example.com",
        phone: phone || "N/A",
        amount: amount || siteConfig.product.price,
        ...updatePayload,
      };

      const { error: pubErr } = await supabasePublic
        .from("orders")
        .upsert([fullOrder], { onConflict: "order_id" });

      if (pubErr) {
        await supabaseAdmin
          .from("orders")
          .upsert([fullOrder], { onConflict: "order_id" });
      }
    }

    return true;
  } catch (err) {
    console.warn("Exception during order payment update:", err);
    return false;
  }
}

/**
 * Get order details by order_id or payment_id
 */
export async function getOrderByOrderId(orderId: string): Promise<OrderRecord | null> {
  try {
    const { data: pubData, error: pubErr } = await supabasePublic
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .maybeSingle();

    if (!pubErr && pubData) {
      return pubData as OrderRecord;
    }

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

/**
 * Get all orders from Supabase for Admin Dashboard (sorted by newest first)
 */
export async function getAllOrdersForAdmin(): Promise<OrderRecord[]> {
  try {
    const { data: pubData, error: pubErr } = await supabasePublic
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!pubErr && pubData) {
      return pubData as OrderRecord[];
    }

    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as OrderRecord[];
  } catch (err) {
    console.warn("Exception fetching orders for admin:", err);
    return [];
  }
}
