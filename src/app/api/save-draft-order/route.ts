import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, supabasePublic } from "@/lib/supabase";
import { siteConfig } from "@/config/site";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { draftId, name, email, phone, amount } = body;

    if (!draftId) {
      return NextResponse.json({ success: false, error: "Draft ID required" }, { status: 400 });
    }

    const customerName = name?.trim() || "Draft Prospect";
    const customerEmail = email?.trim()?.toLowerCase() || "pending@checkout.com";
    const customerPhone = phone?.trim() || "N/A";

    const orderData = {
      order_id: draftId,
      customer_name: customerName,
      email: customerEmail,
      phone: customerPhone,
      amount: amount || siteConfig.product.price,
      payment_status: "abandoned",
    };

    // Try inserting/upserting with supabaseAdmin first
    const { error: adminErr } = await supabaseAdmin
      .from("orders")
      .upsert([orderData], { onConflict: "order_id" });

    if (adminErr) {
      // Fallback with public client if admin key is not service role
      await supabasePublic
        .from("orders")
        .upsert([orderData], { onConflict: "order_id" });
    }

    return NextResponse.json({ success: true, draftId });
  } catch (error: any) {
    console.error("Save draft order error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
