import { NextRequest, NextResponse } from "next/server";
import { getAllOrdersForAdmin } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const orders = await getAllOrdersForAdmin();
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("Admin orders API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve order records." },
      { status: 500 }
    );
  }
}
