"use server"

import { getUserToken } from "@/lib/auth";
import { ShippDAtaI } from "@/types/cart.type";


export async function addProductToWishlist(productId :string) {
    
    const token = await getUserToken();

    if(!token){
        throw new Error("User not authenticated");
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: { 
            token : token as string,
            "Content-Type": "application/json",
         }
        })
        const data = await response.json();
        return data;
    }

export async function getProductFromWishlist() {
    
    const token = await getUserToken();

    if(!token){
        throw new Error("User not authenticated");
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "GET",
        headers: { 
            token : token as string,
            "Content-Type": "application/json",
         }
        })
        const data = await response.json();
        return data;
    }



    export async function removeProductFromWishlist(productId :string) {
    
    const token = await getUserToken();

    if(!token){
        throw new Error("User not authenticated");
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        method: "DELETE",
        headers: { 
            token : token as string,
            "Content-Type": "application/json",
         }
        })
        const data = await response.json();
        return data;
    }