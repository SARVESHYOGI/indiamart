import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import Product from "@/models/Product.model";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  try {
    await db();

    const searchRegex = new RegExp(q ?? "", "i");

    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ],
    }).limit(100);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
