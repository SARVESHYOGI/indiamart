"use client";

import axios from "axios";
import React from "react";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Lock,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface PaymentDetailsProps {
  payId: string;
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

const PaymentPage: React.FC<PaymentDetailsProps> = ({ payId }) => {
  const [item, setItem] = React.useState<ProductItem | null>(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/id/${payId}`);
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="border-b py-4">
        <div className="container flex justify-center">
          <Link href="/" className="text-xl font-bold">
            FabVogue Studio
          </Link>
        </div>
      </header> */}

      <main className="container py-6 px-4 md:py-10 md:px-6">
        <div className="grid md:grid-cols-[1fr_400px] gap-8">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div className="flex items-center justify-between md:hidden">
              <button
                className="flex items-center text-sm font-medium"
                onClick={() => setShowOrderSummary(!showOrderSummary)}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Show order summary{" "}
                {showOrderSummary ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </button>
              <span className="font-medium">{item?.price}</span>
            </div>

            {showOrderSummary && (
              <div className="md:hidden">
                <OrderSummary item={item} />
                <Separator className="my-6" />
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold mb-4">
                Contact information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="newsletter" className="text-sm font-normal">
                    Email me with news and offers
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Address" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="apartment">
                    Apartment, suite, etc. (optional)
                  </Label>
                  <Input
                    id="apartment"
                    placeholder="Apartment, suite, etc."
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal code</Label>
                    <Input
                      id="postalCode"
                      placeholder="Postal code"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Shipping method</h2>
              <RadioGroup defaultValue="standard" className="space-y-3">
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="font-normal">
                      Standard Shipping
                    </Label>
                  </div>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="font-normal">
                      Express Shipping
                    </Label>
                  </div>
                  <span className="font-medium">$15.00</span>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Payment</h2>

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
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link href="/" className="text-sm text-gray-600 hover:underline">
                Return to cart
              </Link>
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white"
              >
                Complete order
              </Button>
            </div>
          </div>

          {/* Order Summary (Desktop) */}
          <div className="hidden md:block">
            <OrderSummary item={item} />
          </div>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-sm text-gray-500">
        <div className="container">
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="#" className="hover:text-gray-800">
              Refund policy
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Privacy policy
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Terms of service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentPage;

function OrderSummary({ item }: { item?: ProductItem | null }) {
  const price = item?.price || 0;
  console.log(item);
  console.log(price);
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Order summary</h2>

        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Product image"
                fill
                className="object-cover"
              />
              <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                1
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Designer Summer Dress</h3>
              <p className="text-sm text-gray-500">Size: M / Color: Blue</p>
            </div>
            <span className="font-medium">{price}</span>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{item?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>Calculated at next step</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{item?.price}</span>
          </div>

          <div className="pt-4">
            <div className="relative">
              <Input placeholder="Discount code" className="pr-20" />
              <Button
                className="absolute right-0 top-0 h-full rounded-l-none"
                variant="outline"
              >
                Apply
              </Button>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 mt-4">
            <Lock className="h-4 w-4 mr-2" />
            <span>Secure checkout</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// <div className="border rounded-md p-4 space-y-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <CreditCard className="h-5 w-5" />
//                     <span className="font-medium">Credit Card</span>
//                   </div>
//                   <div className="flex space-x-2">
//                     <Image
//                       src="/placeholder.svg?height=24&width=38"
//                       alt="Visa"
//                       width={38}
//                       height={24}
//                     />
//                     <Image
//                       src="/placeholder.svg?height=24&width=38"
//                       alt="Mastercard"
//                       width={38}
//                       height={24}
//                     />
//                     <Image
//                       src="/placeholder.svg?height=24&width=38"
//                       alt="Amex"
//                       width={38}
//                       height={24}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <Label htmlFor="cardNumber">Card number</Label>
//                     <Input
//                       id="cardNumber"
//                       placeholder="1234 5678 9012 3456"
//                       className="mt-1"
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="expiration">
//                         Expiration date (MM/YY)
//                       </Label>
//                       <Input
//                         id="expiration"
//                         placeholder="MM/YY"
//                         className="mt-1"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="securityCode">Security code</Label>
//                       <Input
//                         id="securityCode"
//                         placeholder="CVC"
//                         className="mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="nameOnCard">Name on card</Label>
//                     <Input
//                       id="nameOnCard"
//                       placeholder="Name on card"
//                       className="mt-1"
//                     />
//                   </div>
//                 </div>
//               </div>
