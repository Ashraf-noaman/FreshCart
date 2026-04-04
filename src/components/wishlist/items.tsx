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
import { get } from "http";

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
  const { getWishListData,isLoder } = useContext(WishListContext);

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
    <div className="bg-white border border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-4 md:px-6 md:py-5 p-10 items-center">
      {/* Product */}
      <div className="md:col-span-6 flex items-center gap-4 text-gray-600">
        <div className="p-2 w-22 h-22 flex justify-center bg-gray-100 rounded-xl">
          <Image
            src={item.imageCover || "/placeholder.png"}
            className="rounded-xl object-contain"
            alt={item.title || "Product Image"}
            width={70}
            height={65}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Link href={`/products/${item._id}`} className="hover:text-green-500">
            {item.title}
          </Link>
          <span className="text-sm text-gray-500">{item.brand?.name || "No Brand"}</span>
        </div>
      </div>

      {/* Price */}
      <div className="md:col-span-2 flex md:justify-center items-center gap-2 text-black">
        {item.price} EGP
      </div>

      {/* Status */}
      <div className="md:col-span-2 text-gray-600">
        {item.quantity > 0 ? (
          <div className="flex gap-1 bg-green-100/80 p-1 rounded-lg w-25 items-center justify-center">
            <ShoppingCart className="text-green-800 size-4" />
            <span className="text-green-600 text-sm">In Stock</span>
          </div>
        ) : (
          <div className="flex gap-1 bg-red-100/80 p-1 rounded-lg w-25 items-center justify-center">
            <ShoppingCart className="text-red-800 size-4" />
            <span className="text-red-600 text-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="md:col-span-2 text-gray-600">
        <div className="flex gap-2 items-center justify-start">
          <Button
            onClick={() => addCartItem(item._id)}
            className="flex items-center gap-1 bg-gray-300/70 text-black px-3 cursor-pointer py-5 rounded-lg hover:bg-gray-300 transition"
          >
            <Check className="text-green-600 size-4" />
            {isAddToCartLoading ? (
              <Spinner className="size-4 text-green-600 w-18" />
            ) : (
              <span className="text-sm">Add to Cart</span>
            )}
          </Button>

          <Button
            onClick={() => removeItem(item._id)}
            className="group border border-gray-200 flex items-center gap-1 bg-white px-3 cursor-pointer py-5 rounded-lg hover:bg-red-200 transition"
          >
            {isLoder ? (
              <Spinner className="size-4 text-red-600" />
            ) : (
              <Trash className="text-gray-600 group-hover:text-red-600 size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}