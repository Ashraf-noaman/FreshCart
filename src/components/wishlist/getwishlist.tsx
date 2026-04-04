"use client";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { getProductFromWishlist } from "@/actions/wish.action";
import { WishListItemI } from "@/types/wishList.type";
import Items from "./items";
import Loading from "@/app/loading";
import EmptyWishlist from "./emptyWishlist";

export default function GetWishlist() {
  const [wishlist, setWishlist] = useState<WishListItemI[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchWishlist() {
    setIsLoading(true);
    try {
      const response = await getProductFromWishlist();
      setWishlist(response.data);
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchWishlist();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (wishlist.length === 0) {
    return (
      <>
        <EmptyWishlist />
      </>
    );
  }
  return (
    <main>
      <div className="bg-gradient-to-r from-red-300 to-red-100 h-40 lg:h-45 lg:p-8 p-8">
        <p>
          <Link href="/" className=" text-black/80 hover:text-black">
            Home /{" "}
          </Link>
          <span className="text-black">Wishlist</span>
        </p>
        <div className="flex items-center gap-5">
          <Heart className="my-3 text-red-700 fill-red-700 bg-red-100/90 lg:w-17 lg:h-17 w-14 h-14 p-3  rounded-xl shadow-sm" />
          <div className="mt-2">
            <h3 className="lg:text-4xl text-xl font-bold text-gray-800/80">
              Wishlist
            </h3>
            <p className="text-gray-600/90">Your favorite products</p>
          </div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto px-4 py-6">
        <div className="bg-gray-50 rounded-t-3xl  mt-10 grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center">
          <div className="md:col-span-6 flex items-center gap-4 text-gray-600">
            Product
          </div>
          <div className="md:col-span-2 flex md:justify-center items-center gap-2 text-gray-600">
            Price
          </div>
          <div className="md:col-span-2 text-gray-600 lg:ml-5">Status</div>
          <div className="md:col-span-2 text-gray-600 lg:ml-10">Actions</div>
        </div>
        {wishlist &&
          wishlist.map((item) => (
            <Items
              item={item}
              key={item._id || item.id}
              setWishlist={setWishlist}
            />
          ))}
      </div>
    </main>
  );
}
