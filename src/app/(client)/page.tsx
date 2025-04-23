"use client";
import Electronics from "@/components/Electronics";
import Footware from "@/components/Footware";
import HomePageContent from "@/components/HomePageContent";
import KidsToys from "@/components/KidsToys";
import MensCloths from "@/components/MensCloths";
import Nightlamp from "@/components/Nightlamp";
import WomenCloths from "@/components/WomenCloths";
import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { data: session } = useSession();
  // console.log(session);
  if (!session) {
    // return (
    //   <div className="flex h-screen items-center justify-center">
    //     <h1 className="text-2xl">Please login to access this page</h1>
    //   </div>
    // );
  } else {
    // console.log(session);
  }

  return (
    <div>
      <HomePageContent />
      <Electronics />
      <MensCloths />
      <Footware />
      <WomenCloths />
      <KidsToys />
      <Nightlamp />
    </div>
  );
}
