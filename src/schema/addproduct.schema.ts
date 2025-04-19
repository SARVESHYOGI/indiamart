import {z} from "zod";

export const addProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  quantity: z.coerce.number().positive({ message: "Quantity must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
  images: z
    .any()
    .refine((files) => files?.length > 0, { message: "At least one image is required" }),
});
