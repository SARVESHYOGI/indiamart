"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Heart, Share2, ShoppingCart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface ProductDetailsProps {
  productId: string;
}
interface ProductItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  quantity: number;
  category: string;
  sellerId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const [product, setProduct] = useState<any>(null);
  const [item, setItem] = React.useState<ProductItem | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  //   const item = {
  //     _id: "68031fef901260a96193f02f",
  //     name: "Apple iPhone 13 (Starlight, 128 GB)",
  //     description:
  //       "iPhone 13. boasts an advanced dual-camera system that allows you to click mesmerising pictures with immaculate clarity. Furthermore, the lightning-fast A15 Bionic chip allows for seamless multitasking, elevating your performance to a new dimension. A big leap in battery life, a durable design, and a bright Super Retina XDR display facilitate boosting your user experience.",
  //     price: 54,
  //     quantity: 5,
  //     category: "electronics",
  //     sellerId: "680248c3a27029d4dc06ceb1",
  //     images: [
  //       "https://res.cloudinary.com/dztzgqzjp/image/upload/v1745035246/INDIAMART/wm3umaqskqmzku4bz0bq.jpg",
  //       "https://res.cloudinary.com/dztzgqzjp/image/upload/v1745035246/INDIAMART/gvwy3nmo52zl7fk8pibz.jpg",
  //       "https://res.cloudinary.com/dztzgqzjp/image/upload/v1745035246/INDIAMART/dndbfxhntql4qb5ceabp.jpg",
  //       "https://res.cloudinary.com/dztzgqzjp/image/upload/v1745035246/INDIAMART/lhz4krybjgqidads8r2i.jpg",
  //     ],
  //     createdAt: "2025-04-19T04:00:47.466Z",
  //     updatedAt: "2025-04-19T04:00:47.466Z",
  //     __v: 0,
  //   };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/id/${productId}`);
      const data = response.data;
      console.log(data);
      setItem(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="w-[75%] mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Image gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main image display */}
          <div className="order-2 md:order-1 w-full md:w-1/4">
            <Carousel
              opts={{ align: "start" }}
              orientation="vertical"
              className="w-full h-[400px] md:h-[600px]"
            >
              <div className="h-full overflow-hidden">
                <CarouselContent className="h-full">
                  {item?.images.map((image, index) => (
                    <CarouselItem key={index} className="pt-2 md:pt-4">
                      <div
                        className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                          selectedImage === index
                            ? "border-primary"
                            : "border-gray-200"
                        }`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${item.name} thumbnail ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-auto object-cover aspect-square"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
              <CarouselPrevious className="left-1/2 -translate-x-1/2 top-0" />
              <CarouselNext className="left-1/2 -translate-x-1/2 bottom-0" />
            </Carousel>
          </div>
          <div className="order-1 md:order-2 w-full md:w-3/4">
            <div className="border rounded-lg overflow-hidden">
              <Image
                src={item?.images[selectedImage] || "/placeholder.svg"}
                alt={item?.name || "Product Image"}
                width={600}
                height={600}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
          </div>

          {/* Vertical thumbnail carousel */}
        </div>

        {/* Right side - Product details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{item?.name}</h1>
            {/* <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">(120 Reviews)</span>
            </div> */}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">${item?.price}.00</span>
            <span className="text-lg text-gray-500 line-through">
              ${Math.round(item?.price || 0 * 1.2)}.00
            </span>
            <span className="text-sm text-green-600 font-semibold">
              20% OFF
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Description:</h3>
            <p className="text-gray-700">{item?.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-green-600" />
            <span className="text-green-600 font-medium">Free Shipping</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Availability:</h3>
            <p className="text-gray-700">
              In Stock ({item?.quantity} available)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Checkout
                </Button>
              </DialogTrigger>
              <DialogContent className="w-7xl flex">
                <div className="bg-gray-50 p-4 rounded-lg mr-4">
                  <div className="aspect-square">
                    <Image
                      src={item?.images[selectedImage] || "/placeholder.svg"}
                      alt={item?.name || "Product Image"}
                      width={600}
                      height={600}
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">{item?.name}</h2>
                    <p className="text-gray-600">${item?.price}.00</p>
                    <p className="text-gray-600 line-through">
                      ${Math.round(item?.price || 0 * 1.2)}.00
                    </p>
                  </div>
                </div>
                <div className="w-5xl">
                  <DialogHeader>
                    <DialogTitle>Express checkout</DialogTitle>
                    <DialogDescription>fill the details</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="mobileno" className="text-right">
                        Mobile Number
                      </Label>
                      <Input
                        id="mobileno"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        defaultValue="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name{" "}
                      </Label>
                      <Input
                        id="name"
                        defaultValue="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Link href={`payment/${productId}`} target="_blank">
                      <Button type="submit">proceed to order</Button>
                      <div>you will redirect to the merchent store</div>
                    </Link>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
            <div className="flex flex-col  sm:flex-row gap-4 items-center">
              <div className="flex gap-2">
                <Button size="lg" variant="outline" className="flex-1">
                  <Heart className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
              </div>
              <div>you will redirect to the merchent store</div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-2">Product Details:</h3>
            <ul className="space-y-2">
              <li className="flex">
                <span className="w-1/3 text-gray-600">Category:</span>
                <span className="w-2/3 font-medium capitalize">
                  {item?.category}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
