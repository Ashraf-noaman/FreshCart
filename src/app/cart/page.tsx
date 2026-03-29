"use client";
import {
  ShoppingCart,
  Lock,
  Truck,
  Tag,
  ArrowLeft,
  Trash2,
  Headset,
  RotateCw,
  ShieldBan,
} from "lucide-react";
import homeSlide from "@/assets/home-slider-1.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QuantitySelector from "@/components/QuantitySelector/QuantitySelector";
import { clearCart, getCart } from "@/actions/cart.action";
import { CartI, CartProductI } from "@/types/cart.type";
import CartItem from "./../../components/cart/cart-item";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { setCartCount } from "@/components/store/cartSlice";
import { Button } from "@/components/ui/button";
import EmptyCartPage from "@/components/cart/EmptyCart";
export default function Cart() {

  const [products, setProducts] = useState<CartProductI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClearLoading, setIsClearLoading] = useState(false);
  const dispatch = useDispatch();
  async function getAllProductCart() {
    try {
      setIsLoading(true);
      const response: CartI = await getCart();
      console.log(response);
      setProducts(response.data.products);
      dispatch(setCartCount(response.data.products.length));
    } catch (error) {
      console.log("Error fetching cart:", error);
    }finally {
      setIsLoading(false);
    }
  }

  async function clearOurCart() {
    try {
      setIsClearLoading(true);
      const response = await clearCart();
      console.log(response);
      setProducts(response.data.products);
      dispatch(setCartCount(0));
    } catch (error) {
      console.log("Error clearing cart:", error);
    }finally {
      setIsClearLoading(false);
    }
  }

  useEffect(() => {
    //call getCart
    getAllProductCart();
  }, []);

  if(isLoading) {
    return (
      <>
        <div className="h-screen flex flex-col items-center justify-center gap-3 ">
      <div className="nav-logo">
        <div className="text-3xl font-bold flex items-center gap-2">
          <ShoppingCart size={30} className="text-black font-bold" />
          <span>Loading Cart...</span>
        </div>
      </div>
      <Spinner className="size-7" />
    </div>
      </>
    )
     
  }
  if(products.length === 0) {
    return (
      <>
        
        <EmptyCartPage />
      </>
    )
     
  }
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="flex-col w-full items-center mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-green-600 transition">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600 font-medium">Shopping Cart</span>
          </nav>

          {/* Heading */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <p className="text-sm text-gray-500 py-3">
            You have
            <span className="text-green-600 font-semibold"> {products.length} items</span> in
            your cart
          </p>
          {/* Layout */}
          <div className="flex items-top justify-between gap-6">
            {/* Left Side */}
            <div className="w-full lg:flex-1 flex flex-col gap-2">
              {products &&
                products.map((product) => (
                  <CartItem key={product._id} product={product} setProducts={setProducts}  />
                ))}
              <div className="flex items-center justify-between mt-2">
                <Link
                  href="/products"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
                {isClearLoading ? <Spinner  /> : 
                
                <Button onClick={()=>clearOurCart()} className="cursor-pointer bg-transparent flex items-center gap-1.5 text-gray-600 hover:text-red-500 text-sm">
                  <Trash2 size={14} /> Clear all items
                </Button>
                }
               
              </div>
            </div>
            {/* Right Side */}
            <aside className="w-full lg:w-80">
              <div className="rounded-2xl overflow-hidden border shadow-sm">
                {/* Header */}
                <div className="bg-green-500 px-5 py-4 text-white">
                  <div className="flex items-center gap-2">
                    <Lock size={16} />
                    <h2 className="font-bold text-lg">Order Summary</h2>
                  </div>
                  <p className="text-green-100 text-sm">{products.length} items</p>
                </div>

                <div className="bg-white p-5 flex flex-col gap-4">
                  {/* Prices */}
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{products.reduce((total, product) => total + (product.count * product.price), 0)} EGP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Free Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{products.reduce((total, product) => total + (product.count * product.price), 0)} EGP</span>
                    </div>
                  </div>

                  {/* Promo */}
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 border rounded-xl px-3 py-2 text-sm">
                      <Tag size={14} className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="Promo Code"
                        className="flex-1 outline-none"
                      />
                    </div>
                    <button className="px-3 py-2 bg-gray-100 rounded-xl text-sm">
                      Apply
                    </button>
                  </div>

                  {/* Checkout */}
                  <Link
                    href="/checkout"
                    className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold"
                  >
                    <Lock size={16} /> Checkout
                  </Link>

                  {/* Footer */}
                  <div className="text-xs text-center text-gray-400 flex justify-center gap-2">
                    <span className="flex items-center gap-1">
                      <Lock size={12} /> Secure
                    </span>
                    |
                    <span className="flex items-center gap-1">
                      <Truck size={12} /> Fast Delivery
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
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
