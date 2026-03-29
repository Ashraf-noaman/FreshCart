// src/app/categories/[id]/page.tsx
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import Link from "next/link";
import { productI } from "@/types/product.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Eye, Heart, PackageOpen, Plus, RefreshCw, Star } from "lucide-react";
import AddToCartBtn from "@/components/cart/addToCartBtn";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
    { cache: "no-store" },
  );
  const data = await res.json();
  const products = data.data;

  if (!products || products.length === 0) {
    return <p className="text-center py-10">No products found</p>;
  }

  return (
    <>
      <main>
        <div className="bg-gradient-to-r from-green-600 to-green-400 h-40 lg:h-55 lg:p-13 p-10">
          <p>
            <Link href="/" className=" text-white/80 hover:text-white">
              Home /{" "}
            </Link>
            <Link
              href="/categories"
              className=" text-white/80 hover:text-white"
            >
              Categories /{" "}
            </Link>
            <span className="text-white">{products[0]?.category?.name}</span>
          </p>
          <div className="flex items-center gap-5">
            <PackageOpen className="my-3 text-white bg-green-200/50 lg:w-17 lg:h-17 w-14 h-14 p-3  rounded-xl shadow-sm" />
            <div className="mt-2">
              <h3 className="lg:text-4xl text-2xl font-bold text-white">
                {products[0]?.category?.name}
              </h3>
              <p className="text-white/90">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
        <p className="pt-5 mx-4 text-gray-700/50">
          Showing {products.length} products
        </p>
        <div className="container mx-auto pt-8">
          <div className="grid mb-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:px-10 gap-5 px-4 cursor-pointer">
            {products.map((product: productI) => (
              <React.Fragment key={product._id}>
                <Card className=" relative transform hover:-translate-y-2 transition hover:shadow-lg">
                  <Image
                    src={product.imageCover}
                    className="w-40 h-40 lg:w-50 object-contain lg:h-60 mx-auto"
                    width={1000}
                    height={1000}
                    alt="category "
                  />
                  <CardHeader>
                    <div className="card-brand text-gray-600 text-sm">
                      {product.brand.name}
                    </div>
                    <CardTitle className="text-lg font-bold">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="card-brand text-gray-400 text-sm">
                      {product.category.name}
                    </CardDescription>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 items-center ">
                        {[0, 1, 2, 3, 4].map((star, index) => {
                          const filledStars =
                            index < Math.floor(product.ratingsAverage);
                          return (
                            <React.Fragment key={index}>
                              <Star
                                className={
                                  filledStars
                                    ? "text-yellow-400 fill-yellow-400 cursor-pointer w-4 h-4 lg:w-6 lg:h-6"
                                    : "text-gray-400 fill-gray-400 cursor-pointer w-4 h-4 lg:w-6 lg:h-6"
                                }
                              />
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <div className="product-rating text-sm lg:text-lg text-gray-400">
                        ({product.ratingsAverage})
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <p className="text-lg font-bold">EGP {product.price}</p>
                    <AddToCartBtn productId={product._id} />
                  </CardContent>
                  <div className=" absolute gap-2 flex-col right-4 top-4">
                    <Heart className="text-gary-500 rounded-3xl w-7 h-7 p-2 lg:w-10 lg:h-10 lg:p-3 bg-gray-100 hover:bg-gray-200 hover:text-red-600 cursor-pointer" />
                    <RefreshCw className="text-gary-500 my-4 rounded-3xl w-7 h-7 p-2 lg:w-10 lg:h-10 lg:p-3 bg-gray-100 hover:bg-gray-200 hover:text-green-600 cursor-pointer" />
                    <Link href={`/products/${product._id}`}>
                      <Eye className="text-gary-500 rounded-3xl w-7 h-7 p-2 lg:w-10 lg:h-10 lg:p-3 bg-gray-100 hover:bg-gray-200 hover:text-green-600 cursor-pointer" />
                    </Link>
                  </div>
                </Card>
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
