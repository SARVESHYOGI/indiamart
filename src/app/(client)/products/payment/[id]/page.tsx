"use client";

import axios from "axios";
import React from "react";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function page({ params }: { params: { id: string } }) {
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
  const [item, setItem] = React.useState<ProductItem | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/id/${params.id}`);
      const data = response.data;
      console.log(data);
      setItem(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">we</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${item?.price}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(item?.price || 1),
          currency: "inr",
        }}
      >
        <CheckoutPage amount={item?.price || 1} />
      </Elements>
    </main>
  );
}

export default page;
