import { uploadImageToCloudinary } from "@/lib/UploadImage";

export async function POST(request: Request) {
  const contentType = request.headers.get("Content-Type") || "";
  if (
    !contentType.includes("multipart/form-data") &&
    !contentType.includes("application/x-www-form-urlencoded")
  ) {
    return new Response("Invalid Content-Type", { status: 400 });
  }

  const formData = await request.formData();
  if (!formData.has("file")) {
    return new Response("No file provided", { status: 400 });
  }
  const file = formData.get("file") as File;
  const result = await uploadImageToCloudinary(file);
  if (!result) {
    return new Response("Failed to upload image", { status: 500 });
  }
  console.log(result);
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
