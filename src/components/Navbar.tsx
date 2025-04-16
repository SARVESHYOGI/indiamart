import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div className="bg-gray-100">
      <div className="w-[75%] mx-auto flex h-16 items-center justify-between bg-yellow-100 text-white">
        <div className="bg-white rounded-full p-2">
          <Link href="/">
            <Image src="/logo.png" alt="Description" width={200} height={200} />
          </Link>
        </div>
        <div className="flex items-center w-[60%]">
          <Input type="email" placeholder="Email" className="outline-0" />
          <Button type="submit">
            <Search />
          </Button>
        </div>
        <div>
          <Button>Bulk Requirement</Button>
        </div>
      </div>
      <Separator className="" />
    </div>
  );
}

export default Navbar;
