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



export default function CartItem({product,setProducts} : {product: CartProductI,setProducts: (products: CartProductI[]) => void}) {
  const {getCartData} = useContext(CartContext);
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
      if(count < productCounter){
        setIsLoadingUpdateDec(true);
      }else{
        setIsLoadingUpdateInc(true);
      }
      const response = await updateProductInCart(prodId, count);
      toast.success(response.message);
      setProducts(response.data.products);  
      getCartData();    
    } catch (error) {
      toast.error((error as Error).message);
    }finally {
      setIsLoadingUpdateInc(false);
      setIsLoadingUpdateDec(false);
    }
  }

  useEffect(()=>{
    setProductCounter(product.count);
  },[setProducts,product])

  return (
    <>
    <div className="flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex-col gap-20 items-center justify-center">
            <div className="">
              <Image
                src={product.product.imageCover}
                alt="Product"
                sizes="200"
                width={100}
                height={100}
                className="object-cover w-24 h-24 shrink-0 bg-gray-50 rounded-xl overflow-hidden flex-col gap-20 items-center justify-center"
              />
            </div>
            <div className="text-xs text-green-600 font-medium flex items-center gap-1 pt-2 ml-4">
              {product.product.quantity > 0 ? (
                <div className="flex items-center gap-1">
                  <p className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></p>
                  <span className="text-green-600">In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <p className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></p>
                  <span className="text-red-600">Out of Stock</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className=" gap-2 relative">
              <div>
                <h3 className="font-semibold text-gray-900 text-base">
                  {product.product.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium border border-green-100">
                    {product.product.category.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 mt-1">
              <div className="flex items-center gap-3">
                {/* Stock badge */}

                <span className="text-green-600 font-bold text-base">
                  {product.price * product.count} EGP
                </span>
                <span className="text-gray-400 text-sm">per unit</span>
              </div>
            </div>

            <div className="my-3 justify-between py-1 px-1 flex items-center border-2 bg-gray-100 border-gray-200 rounded-lg w-30 h-14">
             {isLoadingUpdateDec ? (
                <Spinner className="size-3 text-gray-400 flex items-center justify-center ml-3" />
              ) : <Button
                onClick={() => updateCart(product.product._id, productCounter - 1)} disabled={isLoadingUpdateDec}
                className=" disabled:cursor-not-allowed text-xl cursor-pointer h-10 w-9 flex items-center justify-center text-gray-700 bg-white shadow rounded-xl hover:bg-gray-50 disabled:opacity-50"
              >
                -
              </Button>
              }
              <span className="text-lg font-medium">{productCounter}</span>

             {isLoadingUpdateInc ? (
                <Spinner className="size-3 text-gray-400 flex items-center justify-center mr-3" />
              ) : <Button
                onClick={() => updateCart(product.product._id, productCounter + 1)}  disabled={isLoadingUpdateInc}
                className="disabled:cursor-not-allowed cursor-pointer flex items-center justify-center bg-green-600 h-10 w-10 shadow rounded-xl hover:bg-green-700 text-white disabled:opacity-50"
              >
                +
              </Button> }
            </div>
          </div>

          {/* Line total */}
          <div className="flex items-end justify-end gap-4 mt-2">
            <div className="text-right shrink-0 flex flex-col items-end justify-end">
              <p className="text-xs text-gray-400 mb-0.5">Total</p>
              <p className="font-bold text-gray-900 text-lg">
                <span className="text-sm font-normal text-gray-500">
                  <span className="text-2xl font-bold text-black">
                    {product.count * product.price}
                  </span>{" "}
                  EGP
                </span>
              </p>
            </div>
            <div className=" cursor-pointer bg-red-50 p-1 rounded-lg text-red-400 border-2 border-red-300  transition">
              <button
                onClick={() => removerProduct(product.product._id)}
                className="cursor-pointer p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition"
                aria-label="Remove item"
              >
                {isLoading ? (
                  <Spinner className="size-5" />
                ) : (
                  <Trash2 size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
  
}
