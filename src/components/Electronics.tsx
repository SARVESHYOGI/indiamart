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

function Electronics() {
  interface ElectronicItem {
    _id: string;
    name: string;
    price: number;
    images: string[];
  }

  const [electronics, setElectronics] = useState<ElectronicItem[]>([]);

  const fetchElectronics = async () => {
    try {
      const response = await fetch("/api/products/electronics");
      const data = await response.json();
      console.log(data);
      setElectronics(data);
    } catch (error) {
      console.error("Error fetching electronics:", error);
    }
  };

  React.useEffect(() => {
    fetchElectronics();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-[70%] mx-auto my-2">
      <h1 className="text-2xl font-bold mb-4">Electronics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {electronics.map((item) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
}

export default Electronics;
