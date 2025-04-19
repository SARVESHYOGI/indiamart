import { db } from "@/lib/db";
import ProductModel from "@/models/Product.model";


export async function GET(request: Request) {
    try {
        const products=await ProductModel.find({
            category: "electronics",
        });
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}