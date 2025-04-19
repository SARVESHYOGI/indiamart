"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/schema/addproduct.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

function page() {
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
      images: [],
    },
  });

  async function onSubmit(values: z.infer<typeof addProductSchema>) {
    console.log(values);
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    formData.append("quantity", String(values.quantity));
    formData.append("category", values.category);

    const files = values.images as FileList;
    Array.from(files).forEach((file) => {
      formData.append("images", file); // important: backend expects "images"
    });

    try {
      const res = await axios.post("/api/products/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product added successfully", res.data);
    } catch (error: any) {
      console.error(
        "Failed to add product",
        error.response?.data || error.message
      );
    }
  }

  return (
    <div className="flex flex-col w-[75%] mx-auto justify-center bg-gray-100">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add product</CardTitle>
            <CardDescription>
              Add a new product to the inventory
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>description</FormLabel>
                      <FormControl>
                        <Input placeholder="description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>price</FormLabel>
                      <FormControl>
                        <Input placeholder="price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="quantity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>category</FormLabel>
                      <FormControl>
                        <Input placeholder="category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          onChange={(e) => {
                            field.onChange(e.target.files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default page;
