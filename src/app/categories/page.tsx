import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  ArrowRight,
  Headset,
  PackageOpen,
  RotateCw,
  ShieldBan,
  Truck,
} from "lucide-react";
import Link from "next/link";

const baseUrl = process.env.BASE_URL;

export default async function Categories() {
  const response = await fetch(`${baseUrl}/categories`, { method: "GET" });
  const data = await response.json();
  const categories = data.data;

  return (
    <>
      <main>
        <div className="bg-gradient-to-r from-green-600 to-green-400 h-40 lg:h-55 lg:p-13 p-10">
          <p>
            <Link href="/" className="text-white/80 hover:text-white">
              Home /{" "}
            </Link>
            <span className="text-white">All Categories</span>
          </p>
          <div className="flex items-center gap-5">
            <PackageOpen className="my-3 text-white bg-green-200/50 lg:w-17 lg:h-17 w-14 h-14 p-3 rounded-xl shadow-sm" />
            <div className="mt-2">
              <h3 className="lg:text-4xl text-2xl font-bold text-white">
                All Categories
              </h3>
              <p className="text-white/90">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>

        <p className="pt-5 mx-4 text-gray-700/50">
          Showing {categories.length} categories
        </p>

        <div className="container mx-auto pt-8">
          <div className="grid mb-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:px-10 gap-5 px-4">
            {categories.map(
              (category: { _id: string; image: string; name: string }) => (
                <Link href={`/categories/${category._id}`} key={category._id}>
                  <Card className="relative group hover:border-green-300 hover:border transform hover:-translate-y-1 transition hover:shadow-lg cursor-pointer">
                    <div className="aspect-square w-50 mx-auto rounded-xl overflow-hidden bg-gray-50 mb-4">
                      <Image
                        src={category.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={1000}
                        height={1000}
                        alt={category.name}
                      />
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-gray-800">
                        {category.name}
                      </h3>
                      <p className="flex items-center justify-center gap-2 text-green-600 text-sm mt-1 opacity-0 group-hover:opacity-100 duration-200">
                        View Products <ArrowRight className="w-5 h-5" />
                      </p>
                    </div>
                  </Card>
                </Link>
              ),
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-4 bg-green-50 w-full">
          <div className="shipping flex items-center gap-5 px-9 py-2">
            <Truck className="text-green-600 bg-green-200 rounded-xl w-10 h-10 p-2" />
            <div className="flex flex-col">
              <p>Free Shipping</p>
              <span className="text-gray-600 text-sm">
                On orders over 500 EGP
              </span>
            </div>
          </div>

          <div className="shipping flex items-center gap-5 px-9 py-2">
            <ShieldBan className="text-green-600 bg-green-200 rounded-xl w-10 h-10 p-2" />
            <div className="flex flex-col">
              <p>Secure Payment</p>
              <span className="text-gray-600 text-sm">
                100% secure transactions
              </span>
            </div>
          </div>

          <div className="shipping flex items-center gap-5 px-9 py-2">
            <RotateCw className="text-green-600 bg-green-200 rounded-xl w-10 h-10 p-2" />
            <div className="flex flex-col">
              <p>Easy Returns </p>
              <span className="text-gray-600 text-sm">
                14-day return policy
              </span>
            </div>
          </div>

          <div className="shipping flex items-center gap-5 px-9 py-2">
            <Headset className=" text-green-600 bg-green-200 rounded-xl w-10 h-10 p-2" />
            <div className="flex flex-col">
              <p>24/7 Support</p>
              <span className="text-gray-600 text-sm">
                Dedicated support team
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
