"use client";
import { Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartProductI } from "@/types/cart.type";
import {
  removeProductFromCart,
  updateProductInCart,
} from "@/actions/cart.action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { CartContext } from "@/provider/cart-provider";

export default function CartItem({
  product,
  setProducts,
}: {
  product: CartProductI;
  setProducts: (products: CartProductI[]) => void;
}) {
  const { getCartData } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdateInc, setIsLoadingUpdateInc] = useState(false);
  const [isLoadingUpdateDec, setIsLoadingUpdateDec] = useState(false);
  const [productCounter, setProductCounter] = useState(0);

  async function removerProduct(prodId: string) {
    try {
      setIsLoading(true);
      const response = await removeProductFromCart(prodId);
      toast.success(response.message);
      setProducts(response.data.products);
      getCartData();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCart(prodId: string, count: number) {
    try {
      if (count < productCounter) {
        setIsLoadingUpdateDec(true);
      } else {
        setIsLoadingUpdateInc(true);
      }
      const response = await updateProductInCart(prodId, count);
      toast.success(response.message);
      setProducts(response.data.products);
      getCartData();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoadingUpdateInc(false);
      setIsLoadingUpdateDec(false);
    }
  }

  useEffect(() => {
    setProductCounter(product.count);
  }, [setProducts, product]);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 p-3 sm:p-4 lg:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">

        <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-2 sm:justify-start">
          <div className="shrink-0">
            <Image
              src={product.product.imageCover}
              alt="Product"
              sizes="(max-width: 640px) 80px, 100px"
              width={100}
              height={100}
              className="object-cover w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-50"
            />
          </div>
          <div className="text-xs font-medium flex items-center gap-1 sm:ml-0 ml-0">
            {product.product.quantity > 0 ? (
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                <span className="text-green-600">In Stock</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                <span className="text-red-600">Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2">
              {product.product.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium border border-green-100">
                {product.product.category.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-green-600 font-bold text-sm sm:text-base">
              {product.price} EGP
            </span>
            <span className="text-gray-400 text-xs sm:text-sm">per unit</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-1">

            <div className="flex items-center border-2 bg-gray-100 border-gray-200 rounded-lg h-10 sm:h-12 px-1 gap-1">
              {isLoadingUpdateDec ? (
                <Spinner className="size-3 text-gray-400 mx-2" />
              ) : (
                <Button
                  onClick={() =>
                    updateCart(product.product._id, productCounter - 1)
                  }
                  disabled={isLoadingUpdateDec || productCounter <= 1}
                  className="disabled:cursor-not-allowed text-lg cursor-pointer h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center text-gray-700 bg-white shadow rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  -
                </Button>
              )}

              <span className="text-sm sm:text-base font-medium w-6 text-center select-none">
                {productCounter}
              </span>

              {isLoadingUpdateInc ? (
                <Spinner className="size-3 text-gray-400 mx-2" />
              ) : (
                <Button
                  onClick={() =>
                    updateCart(product.product._id, productCounter + 1)
                  }
                  disabled={isLoadingUpdateInc}
                  className="disabled:cursor-not-allowed cursor-pointer flex items-center justify-center bg-green-600 h-8 w-8 sm:h-9 sm:w-9 shadow rounded-lg hover:bg-green-700 text-white disabled:opacity-50"
                >
                  +
                </Button>
              )}
            </div>

            {/* Total + delete */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right">
                <p className="text-xs text-gray-400">Total</p>
                <p className="font-bold text-gray-900 text-sm sm:text-base">
                  <span className="text-lg sm:text-2xl font-bold text-black">
                    {product.count * product.price}
                  </span>{" "}
                  <span className="text-xs sm:text-sm font-normal text-gray-500">
                    EGP
                  </span>
                </p>
              </div>

              <div className="cursor-pointer bg-red-50 p-1 rounded-lg text-red-400 border-2 border-red-300 transition shrink-0">
                <button
                  onClick={() => removerProduct(product.product._id)}
                  className="cursor-pointer p-1.5 sm:p-2 rounded-lg text-red-400 hover:bg-red-100 hover:text-red-500 transition"
                  aria-label="Remove item"
                >
                  {isLoading ? (
                    <Spinner className="size-4 sm:size-5" />
                  ) : (
                    <Trash2 size={18} className="sm:hidden" />
                  )}
                  {!isLoading && <Trash2 size={20} className="hidden sm:block" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
