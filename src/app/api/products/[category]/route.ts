import { NextRequest } from "next/server";
import ProductModel from "@/models/Product.model";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  context : { params: { category: string } }
) {
  await db();
  try {
    const category = context.params.category;

    const products = await ProductModel.find({
      // category: { $regex: category, $options: "i" },
      category: category,
    });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fetch category error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
