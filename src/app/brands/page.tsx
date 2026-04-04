import { getUserToken } from "@/lib/auth";
import { authOptions } from "@/lib/authOptions";
import { getAllBrands } from "@/services/brand.services";
import { brandI } from "@/types/brand.type";
import { Tag } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Brands() {
  const response = await getAllBrands();
    const brands: brandI[] = response.data;
  return (
    <>
      <div className="mb-10 bg-gradient-to-r from-purple-600 to-purple-400 h-40 lg:h-55 lg:p-13 p-10">
        <p>
          <Link href="/" className="text-white/80 hover:text-white">
            Home /{" "}
          </Link>
          <span className="text-white">All Brands</span>
        </p>
        <div className="flex items-center gap-5">
          <Tag  className="my-3 text-white bg-green-200/50 lg:w-17 lg:h-17 w-14 h-14 p-3 rounded-xl shadow-sm" />
          <div className="mt-2">
            <h3 className="lg:text-4xl text-2xl font-bold text-white">
              Top Brands
            </h3>
            <p className="text-white/90">
              Shop from your favorite brands
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ml-8 mb-8">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="bg-white transition duration-300 hover:shadow-lg shadow rounded-lg w-60 h-40 flex flex-col gap-2 items-center justify-center cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <Link href={`brands/${brand._id}`}>
                <Image
                  className="w-full h-full object-contain"
                  width={2000}
                  height={2000}
                  src={brand.image}
                  alt="image category"
                />
              </Link>
            </div>

            <p className="text-lg mt-2">{brand.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
