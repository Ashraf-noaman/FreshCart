import Image from "next/image";
import React from "react";
import { getAllCategory } from "@/services/allcategory.services";
import { categoryI } from "@/types/category.type";
import Link from "next/link";
import { productI } from "@/types/product.type";
import { getAllProducts } from "@/services/product.services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Eye,
  Headset,
  Heart,
  RefreshCw,
  RotateCw,
  ShieldBan,
  Star,
  Truck,
} from "lucide-react";
import AddToCartBtn from "../cart/addToCartBtn";
import AddToWishlist from "../wishlist/addToWishlist";
export default async function ShopByCategory() {
  const response = await getAllCategory();
  const categories: categoryI[] = response.data;

  const response2 = await getAllProducts();
  const products: productI[] = response2.data;

  return (
    <>
      <div className="mx-6 my-4 gap-3 flex items-center">
        <div className="h-10 w-2 rounded-2xl bg-gradient-to-t from-green-800/60 to-green-800/80"></div>
        <h2 className="text-2xl font-bold ">
          Shop by <span className="text-green-700">Category</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ml-8 mb-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white transition duration-300 hover:shadow-lg shadow rounded-lg w-60 h-40 flex flex-col gap-2 items-center justify-center cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <Link href={`categories/${category._id}`}>
                <Image
                  className="w-full h-full object-cover"
                  width={2000}
                  height={2000}
                  src={category.image}
                  alt="image category"
                />
              </Link>
            </div>

            <p className="text-lg mt-2">{category.name}</p>
          </div>
        ))}
      </div>
      <div className="mx-6 my-4 gap-3 flex items-center">
        <div className="h-10 w-2 rounded-2xl bg-gradient-to-t from-green-800/60 to-green-800/80"></div>
        <h2 className="text-2xl font-bold ">
          Featured <span className="text-green-700">Products</span>
        </h2>
      </div>
      <div className="container mx-auto pt-8">
        <div className="grid mb-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:px-10 gap-5 px-4 cursor-pointer">
          {products.map((product) => (
            <React.Fragment key={product._id}>
              <Card className=" relative transform hover:-translate-y-2 transition hover:shadow-lg">
                <Image
                  src={product.imageCover}
                  className="w-40 h-40 lg:w-50 object-contain lg:h-60 mx-auto"
                  width={1000}
                  height={1000}
                  alt="product "
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
                  <AddToWishlist prodId={product._id} />
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
            <span className="text-gray-600 text-sm">14-day return policy</span>
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
    </>
  );
}
