import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug, upsertOrderRecord } from "@/lib/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId: existingOrderId, name, email, phone, productSlug } = body;

    // Only save if at least one field has text
    if (!name?.trim() && !email?.trim() && !phone?.trim()) {
      return NextResponse.json({ success: false, message: "No form data to save" });
    }

    const orderId = existingOrderId || `order_draft_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const product = await getProductBySlug(productSlug || "kids-worksheets");

    const draftRecord = {
      product_id: product.id,
      customer_name: name?.trim() || "Incomplete Draft",
      email: email?.trim().toLowerCase() || "draft@checkout.com",
      phone: phone?.trim() || "Pending",
      amount: product.price,
      order_id: orderId,
      payment_status: "abandoned" as const,
    };

    await upsertOrderRecord(draftRecord);

    return NextResponse.json({
      success: true,
      orderId: orderId,
    });
  } catch (error: any) {
    console.error("Save draft checkout route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save draft checkout." },
      { status: 500 }
    );
  }
}
