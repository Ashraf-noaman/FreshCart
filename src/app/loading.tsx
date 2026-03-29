import React from "react";
import { Spinner } from "@/components/ui/spinner"
import logo from "@/assets/freshcart-logo.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 ">
      <div className="nav-logo">
        <div className="text-3xl font-bold flex items-center gap-2">
          <Image src={logo} alt="logo" width={150} height={50} />
        </div>
      </div>
      <Spinner className="size-7" />
    </div>
  );
}
