"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  // const handleclick = () => {
  //   signOut({ callbackUrl: "/auth/login" });
  // };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Option 1: Navigate to a search page with query param
    router.push(`/search?q=${searchQuery}`);

    // Option 2 (optional): Fetch results directly here
    // const res = await fetch(`/api/search?q=${searchQuery}`);
    // const results = await res.json();
    // console.log(results);
  };

  const { data: session } = useSession();
  // console.log(session?.user?.name);
  console.log(session?.user?._id);

  return (
    <div className="bg-gray-100">
      <div className="w-[75%] mx-auto flex h-16 items-center justify-between  text-white">
        <div className="bg-white rounded-full p-2">
          <Link href="/">
            <Image src="/logo.png" alt="Description" width={200} height={200} />
          </Link>
        </div>
        <div className="flex items-center w-[60%]">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-[60%] mx-auto"
          >
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-0 text-black"
            />
            <Button type="submit">
              <Search />
            </Button>
          </form>
        </div>
        <div>
          <Button>Bulk Requirement</Button>
        </div>
        {/* <div>
          <Button onClick={handleclick}>Signout</Button>
        </div> */}
      </div>
      <Separator className="" />
    </div>
  );
}

export default Navbar;
