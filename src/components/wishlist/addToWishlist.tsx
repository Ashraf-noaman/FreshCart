"use client";
import {
  addProductToWishlist,
  getProductFromWishlist,
  removeProductFromWishlist,
} from "@/actions/wish.action";
import { Heart } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { WishListItemI } from "@/types/wishList.type";
import { WishListContext } from "@/provider/wish-provider";

export default function AddToWishlist({ prodId }: { prodId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
    const {noOfItems,getWishListData,isLoder} = useContext(WishListContext);
  

  async function toggleWishlist(prodId: string) {
    try {
      setIsLoading(true);
      if (isWishlisted) {
        const response = await removeProductFromWishlist(prodId);
        setIsWishlisted(false);
        toast.success(response.message);
        getWishListData();
      } else {
        const response = await addProductToWishlist(prodId); 
        setIsWishlisted(true);
        toast.success(response.message);
        getWishListData();
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
  async function checkWishlist() {
    try {
      const response = await getProductFromWishlist();
      const isFound = response.data.some((item: WishListItemI) => item._id === prodId);
      setIsWishlisted(isFound);
    } catch (error) {
      console.log(error);
    }
  }
  checkWishlist();
}, [prodId]);
  return (
   <>
  {isLoading ? (
    <Spinner className='text-gray-500 rounded-3xl w-7 h-7 p-2 lg:w-10 lg:h-10 lg:p-3 bg-gray-100'/>
  ) : (
    <Button
      className='text-gray-500 rounded-3xl w-7 h-7 p-2 lg:w-10 lg:h-10 lg:p-3 bg-gray-100 hover:bg-gray-200 cursor-pointer'
      disabled={isLoading}
      onClick={() => toggleWishlist(prodId)}
    >
      <Heart className={isWishlisted ? "fill-red-500 text-red-500" : ""} /> 
    </Button>
  )}
</>
  );
}
