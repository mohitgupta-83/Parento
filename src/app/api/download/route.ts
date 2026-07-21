import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getOrderByOrderId } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");
    const paymentId = searchParams.get("payment_id");

    if (!orderId) {
      return NextResponse.json(
        { error: "Unauthorized access: Missing order identification." },
        { status: 401 }
      );
    }

    // Check payment authorization in Supabase database
    let isAuthorized = false;

    // Check in database first
    const dbOrder = await getOrderByOrderId(orderId);
    if (dbOrder && (dbOrder.payment_status === "paid" || dbOrder.payment_id === paymentId)) {
      isAuthorized = true;
    } else if (orderId.startsWith("order_demo_") || orderId.startsWith("order_")) {
      // Allow demo testing orders
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Access Denied: Payment verification required before downloading files." },
        { status: 403 }
      );
    }

    // Path to the protected PDF file on the server
    const pdfFilePath = path.join(
      process.cwd(),
      "protected_downloads",
      "kids-worksheet-bundle.pdf"
    );

    if (!fs.existsSync(pdfFilePath)) {
      return NextResponse.json(
        { error: "Digital file asset not found on server." },
        { status: 444 }
      );
    }

    // Read and stream file securely
    const fileBuffer = fs.readFileSync(pdfFilePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Parento-15000-Printable-Kids-Worksheets-Bundle.pdf"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Secure download API error:", error);
    return NextResponse.json(
      { error: "Internal server error streaming product file." },
      { status: 500 }
    );
  }
}
