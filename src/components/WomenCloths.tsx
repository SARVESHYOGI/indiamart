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
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

function WomenCloths() {
  interface WomenItem {
    _id: string;
    name: string;
    price: number;
    images: string[];
  }
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const {
    data: women = [],
    error,
    isLoading,
  } = useSWR<WomenItem[]>("/api/products/womenware", fetcher);

  return (
    <div>
      {" "}
      <div className="flex flex-col items-center justify-center w-[70%] mx-auto my-2">
        <h1 className="text-2xl font-bold mb-4">WomenCloths</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {women.map((item) => {
            return (
              <Link href={`/products/${item._id}`} key={item._id}>
                <Card key={item.name}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>Price: ${item.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={item.images[0]}
                      width={300}
                      height={100}
                      alt={item.name}
                    />
                  </CardContent>
                  <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WomenCloths;
