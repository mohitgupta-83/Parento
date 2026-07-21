import { NextRequest, NextResponse } from "next/server";
import { createPaymentOrder } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, productSlug } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Please provide your Name, Email address, and Mobile Number to proceed." },
        { status: 400 }
      );
    }

    const result = await createPaymentOrder({
      customerName: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      productSlug: productSlug || "kids-worksheets",
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Create order route error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
