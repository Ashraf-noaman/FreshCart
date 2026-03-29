"use client";

import { useState } from "react";
import { Heart, Minus, Plus, RotateCcw, Share2, ShieldHalf, ShoppingCart, Truck, Zap } from "lucide-react";
import { Button } from '@/components/ui/button';

type Props = {
  allQuantity: number;
  priceOne: number;
};

export default function QuantitySelector({ allQuantity, priceOne }: Props) {
  const [quantity, setQuantity] = useState(2); 

  const minQty = 1;
  const maxQty = allQuantity;

  const decrease = () => setQuantity(prev => Math.max(prev - 1, minQty));
  const increase = () => setQuantity(prev => Math.min(prev + 1, maxQty));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < minQty) value = minQty;
    if (value > maxQty) value = maxQty;
    setQuantity(value);
  };

  const totalPrice = priceOne * quantity;
  const quantityUpdate = allQuantity - quantity;

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="my-3 flex items-center border-2 border-gray-200 rounded-lg w-45">
          <button
            onClick={decrease}
            disabled={quantity <= minQty}
            className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
          >
            <Minus />
          </button>

          <input
            type="number"
            min={minQty}
            max={maxQty}
            value={quantity}
            onChange={handleChange}
            className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
          />

          <button
            onClick={increase}
            disabled={quantity >= maxQty}
            className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
          >
            <Plus />
          </button>
        </div>
        <span className="text-gray-600 text-sm lg:text-lg">{quantityUpdate} available</span>
      </div>

      <div className="flex p-3 lg:p-4 items-center justify-between bg-gray-100 rounded-lg">
        <span className="text-gray-600">Total Price:</span>
        <h3 className="text-green-600 text-xl lg:text-2xl font-bold">{totalPrice.toFixed(2)} EGP</h3>
      </div>
      <div className="action-button flex gap-4 my-5">
        <Button className="bg-green-600 lg:text-lg text-white grow py-6 cursor-pointer hover:bg-green-700">
          <ShoppingCart className="mx-1"/>Add to Cart
          </Button>
        <Button className="bg-gray-800 lg:text-lg text-white grow py-6 cursor-pointer hover:bg-gray-700">
          <Zap className="mx-1"/>Buy Now
          </Button>
      </div>
      <div className="wishlist-button flex gap-4">
        <Button className="bg-transparent lg:text-lg text-black grow-50 py-6 cursor-pointer border-2 group border-gray-200 rounded-xl hover:border-green-600 hover:text-green-600">
          <Heart className="mx-1 group-hover:text-green-600"/>Add to Wishlist
        </Button>
        <Button className="bg-transparent lg:text-lg text-black grow py-6 cursor-pointer border-2 group border-gray-200 rounded-xl hover:border-green-600 hover:text-green-600">
          <Share2 />
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 mt-6 lg:gap-15 gap-y-5 lg:gap-y-0">
         <div className="shipping flex items-center gap-3">
          <Truck className="text-green-600 bg-green-100 rounded-full w-10 h-10 p-2" />
          <div className="flex flex-col">
            <p>Free Shipping</p>
            <span className="text-gray-600 text-sm">On orders over 500 EGP</span>
          </div>
        </div>
         <div className="shipping flex items-center gap-3">
          <RotateCcw className="text-green-600 bg-green-100 rounded-full w-10 h-10 p-2" />
          <div className="flex flex-col">
            <p>30 Days Return</p>
            <span className="text-gray-600 text-sm">Money back</span>
          </div>
        </div>
         <div className="shipping flex items-center gap-3">
          <ShieldHalf className="text-green-600 bg-green-100 rounded-full w-10 h-10 p-2" />
          <div className="flex flex-col">
            <p>Secure Payment</p>
            <span className="text-gray-600 text-sm">100% Protected</span>
          </div>
        </div>
        
      </div>
    </>
  );
}