"use client";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { data: session } = useSession();
  // console.log(session);
  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl">Please login to access this page</h1>
      </div>
    );
  } else {
    // console.log(session);
  }
  return (
    <div>
      <div className="m-0 p-0">
        <Navbar />
      </div>
    </div>
  );
}
