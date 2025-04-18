import { db } from "@/lib/db";
import { uploadImageToCloudinary } from "@/lib/UploadImage";
import ProductModel from "@/models/Product.model";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
    await db();
    try {
        const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET });

        console.log("Token:", token);

        if (!token?._id) {
                return new Response("Unauthorized", { status: 401 });
        }
        const sellerId = token._id;
        const { name, description, price,quantity, category, image } = await request.json();

        if (!name || !description || !price || !category || !image || !quantity) {
            return new Response("All fields are required", { status: 400 });
        }

        const res = await uploadImageToCloudinary(image);
        const imageUrl = res?.secure_url || null;
        if (!imageUrl) {
            return new Response("Image upload failed", { status: 500 });
        }

        console.log("New product image URL:", imageUrl);
        const newProduct = await ProductModel.create({ name, description, price, category, quantity, sellerId,imageUrl });

        if (!newProduct) {
            return new Response("Product not created", { status: 500 });
        }

        return new Response(JSON.stringify(newProduct), { status: 201 });
    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
}