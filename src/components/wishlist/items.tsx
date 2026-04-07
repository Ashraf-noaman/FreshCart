"use client";
import React, { useState, useContext } from "react";
import { Button } from "../ui/button";
import { Check, ShoppingCart, Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WishListItemI } from "@/types/wishList.type";
import { removeProductFromWishlist } from "@/actions/wish.action";
import { addProductCart } from "@/actions/cart.action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/provider/cart-provider";
import { WishListContext } from "@/provider/wish-provider";

export default function Items({
  item,
  setWishlist,
}: {
  item: WishListItemI;
  setWishlist: React.Dispatch<React.SetStateAction<WishListItemI[]>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
  const { getCartData } = useContext(CartContext);
  const { getWishListData, isLoder } = useContext(WishListContext);

  async function removeItem(itemId: string) {
    try {
      setIsLoading(true);
      await removeProductFromWishlist(itemId);
      toast.success("Item removed from wishlist");
      getWishListData();
      setWishlist((prev) => prev.filter((i) => i._id !== itemId));
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCartItem(itemId: string) {
    try {
      setIsAddToCartLoading(true);
      await addProductCart(itemId);
      toast.success("Item added to cart");
      getWishListData();
      setWishlist((prev) => prev.filter((i) => i._id !== itemId));
      await getCartData();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsAddToCartLoading(false);
    }
  }

  return (
    <div className="bg-white my-5 lg:my-0 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-5">

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:grid md:grid-cols-12 md:gap-4 md:px-1">

        <div className="flex items-center gap-3 sm:gap-4 md:col-span-6 min-w-0">
          <div className="shrink-0 p-2 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-gray-100 rounded-xl">
            <Image
              src={item.imageCover || "/placeholder.png"}
              className="rounded-xl object-contain"
              alt={item.title || "Product Image"}
              width={70}
              height={65}
              style={{ width: "auto", height: "auto", maxHeight: "100%" }}
            />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <Link
              href={`/products/${item._id}`}
              className="hover:text-green-500 text-gray-700 font-medium text-sm sm:text-base leading-snug line-clamp-2 transition-colors"
            >
              {item.title}
            </Link>
            <span className="text-xs sm:text-sm text-gray-400">
              {item.brand?.name || "No Brand"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-start sm:gap-6 md:contents">

          <div className="md:col-span-2 md:flex md:justify-center">
            <span className="text-gray-900 font-semibold text-sm sm:text-base">
              {item.price}{" "}
              <span className="text-gray-400 font-normal text-xs">EGP</span>
            </span>
          </div>

          <div className="md:col-span-2 md:flex md:justify-center">
            {item.quantity > 0 ? (
              <div className="flex gap-1 bg-green-100/80 px-2 py-1 rounded-lg items-center">
                <ShoppingCart className="text-green-700 size-3.5 sm:size-4 shrink-0" />
                <span className="text-green-600 text-xs sm:text-sm whitespace-nowrap">
                  In Stock
                </span>
              </div>
            ) : (
              <div className="flex gap-1 bg-red-100/80 px-2 py-1 rounded-lg items-center">
                <ShoppingCart className="text-red-700 size-3.5 sm:size-4 shrink-0" />
                <span className="text-red-600 text-xs sm:text-sm whitespace-nowrap">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 flex gap-2 items-center sm:justify-start md:justify-start">
          <Button
            onClick={() => addCartItem(item._id)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gray-100 text-black px-3 py-2 h-9 sm:h-10 rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            <Check className="text-green-600 size-3.5 sm:size-4 shrink-0" />
            {isAddToCartLoading ? (
              <Spinner className="size-4 text-green-600" />
            ) : (
              <span className="text-xs sm:text-sm whitespace-nowrap">Add to Cart</span>
            )}
          </Button>

          <Button
            onClick={() => removeItem(item._id)}
            className="group border border-gray-200 flex items-center justify-center bg-white px-3 h-9 sm:h-10 w-9 sm:w-10 rounded-lg hover:bg-red-50 hover:border-red-200 transition cursor-pointer shrink-0"
          >
            {isLoder || isLoading ? (
              <Spinner className="size-4 text-red-500" />
            ) : (
              <Trash className="text-gray-400 group-hover:text-red-500 size-4 transition-colors" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
