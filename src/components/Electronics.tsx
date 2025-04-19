"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import axios from "axios";
import useSWR from "swr";

import Link from "next/link";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Electronics() {
  interface ElectronicItem {
    _id: string;
    name: string;
    price: number;
    images: string[];
  }

  const {
    data: electronics = [],
    error,
    isLoading,
  } = useSWR<ElectronicItem[]>("/api/products/electronics", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load products</div>;

  return (
    <div className="flex flex-col items-center justify-center w-[70%] mx-auto my-2">
      <h1 className="text-2xl font-bold mb-4">Electronics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {electronics.map((item) => {
          return (
            <Link href={`/products/${item._id}`} key={item._id}>
              <Card key={item._id}>
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
  );
}

export default Electronics;
