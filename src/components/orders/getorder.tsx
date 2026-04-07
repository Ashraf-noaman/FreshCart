"use client";
import React, { useState, useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { Check, Plus, ShoppingCart, Star, Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import homeSlide from "@/assets/home-slider-1.png";
import { getOrder } from "@/actions/order.action";

export default function GetOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderI[]>([]);

  async function getAllOrders() {
    try {
      setIsLoading(true);
      const response: OrderI[] = await getOrder();
      setOrders(response);
      console.log("Orders:", response);
    } catch (error) {
      console.log("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    //call getAllOrders
    getAllOrders();
  }, []);

  return (
    <div className=" bg-gray-50 py-10 px-4">
      <div className="mx-8 max-w-8xl space-y-5">
        {/* ── Header ── */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Order summary
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {`Orders #${orders[0]?.id} ${orders[0]?.createdAt ? `- ${new Date(orders[0].createdAt).toLocaleDateString()}` : ""}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200 capitalize">
              on delivery
            </span>
            <span className="inline-flex items-center rounded-md bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-200 capitalize">
              {orders[0]?.isPaid ? "paid" : "not paid"}
            </span>
            <span className="inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200 capitalize">
              {orders[0]?.paymentMethodType[0].toUpperCase() +
                orders[0]?.paymentMethodType.slice(1)}
            </span>
          </div>
        </div>

        {/* ── Pricing grid ── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white border border-gray-100 p-4">
            <p className="text-xs text-gray-500">Tax</p>
            <p className="mt-1 text-base font-semibold">
              {orders[0]?.taxPrice.toFixed(2)} EGP
            </p>
          </div>

          <div className="rounded-xl bg-white border border-gray-100 p-4">
            <p className="text-xs text-gray-500">Shipping</p>
            <p className="mt-1 text-base font-semibold">
              {orders[0]?.shippingPrice.toFixed(2)} EGP
            </p>
          </div>

          <div className="rounded-xl bg-green-600 p-4 text-white">
            <p className="text-xs text-white">Total</p>
            <p className="mt-1 text-base font-semibold">
              {orders[0]?.totalOrderPrice.toFixed(2)} EGP
            </p>
          </div>
        </div>

        {/* ── Customer ── */}
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
            Customer
          </p>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-medium text-blue-700">
              {orders[0]?.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {orders[0]?.user.name}
              </p>
              <p className="text-xs text-gray-500">{orders[0]?.user.email}</p>
              <p className="text-xs text-gray-500">{orders[0]?.user.phone}</p>
            </div>
          </div>
        </div>

        {/* ── Shipping address ── */}
        {/*<div className="rounded-xl bg-white border border-gray-100 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
            Shipping address
          </p>
          <div className="space-y-2">
             <div className="flex justify-between text-sm">
                <span className="text-gray-500">City</span>
                <span className="font-medium text-gray-900 capitalize">damytaa</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium text-gray-900 capitalize">0124578154</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Details</span>
                <span className="font-medium text-gray-900 capitalize">damytaa-hghg</span>
              </div>
          </div>
        </div> */}

        {/* ── Cart items ── */}
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
            Items :{" "}
            <span className="text-black">{orders[0]?.cartItems.length}</span>
          </p>
          <ul className="divide-y divide-gray-100">
            {orders[0]?.cartItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-gray-100">
                    <Image
                      src={item.product.imageCover}
                      alt="Product"
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {item.product.category.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.product.title.slice(0, 30)}
                    </p>
                    <div className="flex items-center gap-1 text-xs mt-1">
                      {[0, 1, 2, 3, 4].map((star, index) => {
                        const filledStars =
                          index < Math.floor(item.product.ratingsAverage);
                        return (
                          <React.Fragment key={index}>
                            <Star
                              className={
                                filledStars
                                  ? "text-yellow-400 fill-yellow-400 cursor-pointer w-3 h-3 lg:w-3.5 lg:h-3.5"
                                  : "text-gray-400 fill-gray-400 cursor-pointer w-3 h-3 lg:w-3.5 lg:h-3.5"
                              }
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.price} EGP
                    </p>
                    <p className="text-xs text-gray-400">Qty: {item.count}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Link href="/" >
      <Button className="cursor-pointer mt-10 py-7 px-9 text-lg mx-auto flex items-center gap-2 bg-green-600 hover:bg-green-700">
            Go to Shopping
      </Button>
      </Link>
    </div>
  );
}
