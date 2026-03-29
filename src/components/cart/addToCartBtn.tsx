"use client";
import { addProductCart } from "@/actions/cart.action";
import { Button } from "@base-ui/react";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { set } from "zod";
import { Spinner } from "../ui/spinner";

export default function AddToCartBtn({ productId }: { productId: string }) {
    const [isLoading, setIsLoading] = useState(false);




  async function addToCart(productId: string) {
    try {
        setIsLoading(true);
      const response = await addProductCart(productId);
      toast.success(response.message);
    } catch (error) {
      toast.error((error as Error).message);
    }
    finally{
    setIsLoading(false);
  }
  }

  return (
    <>
      <Button disabled={isLoading} onClick={() => addToCart(productId)}>
        { isLoading ? <Spinner className="text-white rounded-3xl w-8 h-8 lg:w-10 lg:h-10 p-2 bg-green-600"/> : <Plus className="text-white rounded-3xl w-8 h-8 lg:w-10 lg:h-10 p-2 bg-green-600 hover:bg-green-700 cursor-pointer" />}
      </Button>
    </>
  );
}
