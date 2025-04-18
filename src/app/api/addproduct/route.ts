import { db } from "@/lib/db";
import { uploadImageToCloudinary } from "@/lib/UploadImage";
import ProductModel from "@/models/Product.model";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await db();

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?._id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const sellerId = token._id;
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string, 10);
    const category = formData.get("category") as string;

    const imageFiles = formData.getAll("images") as File[];

    if (imageFiles.length === 0) {
      return new Response("No images provided", { status: 400 });
    }
    if(!name){
        return new Response("Name is required", { status: 400 });
    }
    if(!description){
        return new Response("Description is required", { status: 400 });
    }
    if(isNaN(price)){
        return new Response("Price is required", { status: 400 });
    }
    if(isNaN(quantity)){
        return new Response("Quantity is required", { status: 400 });
    }
    if(!category){
        return new Response("Category is required", { status: 400 });
    }
    if (
      !name ||
      !description ||
      isNaN(price) ||
      isNaN(quantity) ||
      !category ||
      imageFiles.length === 0
    ) {
      return new Response("All fields are required", { status: 400 });
    }

    // Upload all images to Cloudinary
    const uploadPromises = imageFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploaded = await uploadImageToCloudinary(file);
      return uploaded?.secure_url || null;
    });

    const imageUrls = await Promise.all(uploadPromises);

    if (imageUrls.includes(null)) {
      return new Response("Image upload failed", { status: 500 });
    }

    const newProduct = await ProductModel.create({
      name,
      description,
      price,
      quantity,
      category,
      sellerId,
      images: imageUrls,
    });

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error creating product:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
