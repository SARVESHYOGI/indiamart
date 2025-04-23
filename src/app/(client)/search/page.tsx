import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import Product from "@/models/Product.model";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  if (!q) return notFound();

  await db();
  const products = await Product.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  });

  return (
    <div className="w-[75%] mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Search Results for: {q}</h1>
      {products.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((item) => {
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
        </ul>
      )}
    </div>
  );
}
