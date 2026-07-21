import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentTransaction } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      phone,
      productSlug,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed: Required fields missing." },
        { status: 400 }
      );
    }

    const result = await verifyPaymentTransaction({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerName: name || "Customer",
      email: email || "customer@example.com",
      phone: phone || "9999999999",
      productSlug: productSlug || "kids-worksheets",
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Verify payment route error:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed due to a server error." },
      { status: 500 }
    );
  }
}
