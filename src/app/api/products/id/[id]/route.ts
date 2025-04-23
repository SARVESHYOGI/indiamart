import { db } from "@/lib/db";
import ProductModel from "@/models/Product.model";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id}=await params;
  try {
    await db();
    const product = await ProductModel.findById(id);

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fetch product error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
