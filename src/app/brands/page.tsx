import { getAllBrands } from "@/services/brand.services";
import { brandI } from "@/types/brand.type";
import { Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Brands() {
  const response = await getAllBrands();
  const brands: brandI[] = response.data;

  return (
    <>
      <div className="mb-8 sm:mb-10 bg-gradient-to-r from-purple-600 to-purple-400 h-36 sm:h-44 lg:h-56 px-6 sm:px-10 lg:px-14 flex flex-col justify-center">
        <p className="text-sm sm:text-base">
          <Link href="/" className="text-white/80 hover:text-white transition-colors">
            Home /{" "}
          </Link>
          <span className="text-white">All Brands</span>
        </p>
        <div className="flex items-center gap-3 sm:gap-5 mt-2">
          <Tag className="text-white bg-green-200/50 w-11 h-11 sm:w-14 sm:h-14 lg:w-17 lg:h-17 p-2.5 sm:p-3 rounded-xl shadow-sm shrink-0" />
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white leading-tight">
              Top Brands
            </h3>
            <p className="text-white/90 text-xs sm:text-sm lg:text-base mt-0.5">
              Shop from your favorite brands
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`brands/${brand._id}`}
            className="group bg-white transition duration-300 hover:shadow-lg shadow-sm rounded-xl flex flex-col gap-2 items-center justify-center cursor-pointer py-5 px-3"
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
              <Image
                className="w-full h-full object-contain"
                width={200}
                height={200}
                src={brand.image}
                alt={brand.name}
              />
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-purple-600 transition-colors text-center mt-1 line-clamp-1">
              {brand.name}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
