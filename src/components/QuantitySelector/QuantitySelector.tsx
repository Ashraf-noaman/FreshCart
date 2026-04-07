"use client";

import { useState, useContext } from "react";
import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShieldHalf,
  ShoppingCart,
  Truck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateProductInCart, addProductCart } from "@/actions/cart.action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/provider/cart-provider";
import { useRouter } from "next/navigation";
import { addProductToWishlist } from "@/actions/wish.action";
import { WishListContext } from "@/provider/wish-provider";

type Props = {
  allQuantity: number;
  priceOne: number;
  productId: string;
  initialCount?: number;
};

export default function QuantitySelector({
  allQuantity,
  priceOne,
  productId,
  initialCount = 1,
}: Props) {
  const { getCartData } = useContext(CartContext);
  const router = useRouter();
  const [quantity, setQuantity] = useState(initialCount);
const [quantityLeft, setQuantityLeft] = useState(allQuantity - initialCount);
  const [isLoadingInc, setIsLoadingInc] = useState(false);
  const [isLoadingDec, setIsLoadingDec] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
const [isLoading, setIsLoading] =useState(false);
  const {noOfItems,getWishListData,isLoder} = useContext(WishListContext);

  const minQty = 1;
  const maxQty = allQuantity;

  async function updateCart(newCount: number) {
    if (newCount < quantity) {
      setIsLoadingDec(true);
    } else {
      setIsLoadingInc(true);
    }
    try {
      const response = await updateProductInCart(productId, newCount);
      toast.success(response.message);
      setQuantity(newCount);
      getCartData();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoadingInc(false);
      setIsLoadingDec(false);
    }
  }
async function addTowishlist(productId:string) {
        try{
            setIsLoading(true);
            const response = await addProductToWishlist(productId);
            toast.success(response.message);
            getWishListData();
        }
        catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
async function handleAddToCart() {
  try {
    setIsLoadingCart(true);
    const response = await addProductCart(productId);
    toast.success(response.message);
    setQuantityLeft(prev => prev - quantity);
    if (quantity > 1) {
      await updateProductInCart(productId, quantity);
    }
    getCartData();
    setQuantity(1); 
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
    setIsLoadingCart(false);
  }
}

  function handleBuyNow() {
    handleAddToCart().then(() => router.push("/"));
  }

  const totalPrice = priceOne * quantity;

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="my-3 flex items-center border-2 border-gray-200 rounded-lg w-45">
          <button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, minQty))}
            disabled={quantity <= minQty}
            className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
          >
            <Minus />
          </button>

          <span className="w-16 text-center text-lg font-medium">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity((prev) => Math.min(prev + 1, maxQty))}
            disabled={quantity >= maxQty}
            className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
          >
            <Plus />
          </button>
        </div>
        <span className="text-gray-600 text-sm lg:text-lg">
          {quantityLeft} available
        </span>
      </div>

      <div className="flex p-3 lg:p-4 items-center justify-between bg-gray-100 rounded-lg">
        <span className="text-gray-600">Total Price:</span>
        <h3 className="text-green-600 text-xl lg:text-2xl font-bold">
          {totalPrice.toFixed(2)} EGP
        </h3>
      </div>

      <div className="action-button flex gap-4 my-5">
        <Button
          onClick={handleAddToCart}
          disabled={isLoder}
          className="bg-green-600 lg:text-lg text-white grow py-6 cursor-pointer hover:bg-green-700 disabled:opacity-70"
        >
          {isLoder ? (
            <Spinner className="size-5" />
          ) : (
            <>
              <ShoppingCart className="mx-1" />
              Add to Cart
            </>
          )}
        </Button>
        <Button
          onClick={handleBuyNow}
          className="bg-gray-800 lg:text-lg text-white grow py-6 cursor-pointer hover:bg-gray-700"
        >
          <Zap className="mx-1" />
          Buy Now
        </Button>
      </div>

      <div className="wishlist-button flex gap-4">
        {isLoading ? 
        <div className="bg-transparent lg:text-lg text-green-600  grow-50 flex items-center justify-center  border-2 group rounded-xl">
            <Spinner className='text-gary-500 rounded-3xl w-7 h-7 p-2 lg:w-10 lg:h-10 lg:p-3 bg-gray-100' />
        </div> :
         <Button onClick={() => addTowishlist(productId)} className="bg-transparent lg:text-lg text-black grow-50 py-6 cursor-pointer border-2 group border-gray-200 rounded-xl hover:border-green-600 hover:text-green-600">
          <Heart className="mx-1 group-hover:text-green-600" />
          Add to Wishlist
        </Button>}
       
        <Button className="bg-transparent lg:text-lg text-black grow py-6 cursor-pointer border-2 group border-gray-200 rounded-xl hover:border-green-600 hover:text-green-600">
          <Share2 />
        </Button>
      </div>

     

      <div className="grid lg:grid-cols-3 mt-6 lg:gap-15 gap-y-5 lg:gap-y-0">
        <div className="shipping flex items-center gap-3">
          <Truck className="text-green-600 bg-green-100 rounded-full w-10 h-10 p-2" />
          <div className="flex flex-col">
            <p>Free Shipping</p>
            <span className="text-gray-600 text-sm">
              On orders over 500 EGP
            </span>
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
