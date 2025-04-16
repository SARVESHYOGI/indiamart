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

const foot = [
  {
    name: "Laptop",
    price: 1000,
    image: "/p1.png",
  },
  {
    name: "Smartphone",
    price: 800,
    image: "/p2.png",
  },
  {
    name: "Tablet",
    price: 600,
    image: "/p3.png",
  },
  {
    name: "Laptop",
    price: 1000,
    image: "/p1.png",
  },
  {
    name: "Smartphone",
    price: 800,
    image: "/p2.png",
  },
  {
    name: "Tablet",
    price: 600,
    image: "/p3.png",
  },
];
function Footware() {
  return (
    <div>
      {" "}
      <div className="flex flex-col items-center justify-center w-[70%] mx-auto my-2">
        <h1 className="text-2xl font-bold mb-4">Footware</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {foot.map((item) => {
            return (
              <>
                <Card key={item.name}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>Price: ${item.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={item.image}
                      width={300}
                      height={100}
                      alt={item.name}
                    />
                  </CardContent>
                  <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter>
                </Card>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Footware;
