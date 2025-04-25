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
    <div className="sticky top-0 bg-white z-10 border-b-2 py-3 border-gray-300 ">
      <div className="w-[75%] mx-auto flex h-16 items-center justify-between  text-white">
        <div className="bg-white rounded-full p-2">
          <Link href="/">
            <Image src="/logo.png" alt="Description" width={200} height={200} />
          </Link>
        </div>
        <div className="flex items-center w-[60%]  text-black border-1 rounded-xl border-black h-full ">
          <div className="border-r px-1">Shop</div>
          <form
            onSubmit={handleSearch}
            className="flex items-center w-[100%] mx-auto h-full"
          >
            <Input
              type="text"
              placeholder="What are you looking for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0 bg-transparent text-black"
            />
            <Button
              type="submit"
              className="bg-teal-800 hover:bg-teal-900 hover:cursor-pointer rounded-none rounded-r-xl px-4 flex gap-2 items-center justify-center h-full"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
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
    </div>
  );
}

export default Navbar;
