import { NextResponse } from "next/server";
import { getAllProductSettings, updateProductSetting } from "@/lib/products-store";

export async function GET() {
  try {
    const products = await getAllProductSettings();
    return NextResponse.json({ success: true, products });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch product settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, price, originalPrice, pixelId } = body;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Product slug is required" },
        { status: 400 }
      );
    }

    const updated = await updateProductSetting(slug, {
      ...(price !== undefined && { price: Number(price) }),
      ...(originalPrice !== undefined && { originalPrice: Number(originalPrice) }),
      ...(pixelId !== undefined && { pixelId: String(pixelId) }),
    });

    return NextResponse.json({
      success: true,
      message: `Product ${slug} updated successfully!`,
      product: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update product setting" },
      { status: 500 }
    );
  }
}
