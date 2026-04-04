"use client"
import { getCart } from '@/actions/cart.action';
import { CartI } from '@/types/cart.type';
import { useSession } from 'next-auth/react';
import React, { createContext, useEffect, useState } from 'react'

interface CartContextI {
    noOfCartItems: number;
    isLoading: boolean;
    getCartData: () => void;
    totalCartPrice: number;
    cartId: string;
}

export const CartContext = createContext <CartContextI> ({ 
    noOfCartItems: 0,
     isLoading: false,
     getCartData: () => {},
    totalCartPrice: 0,
    cartId: "",
 });


export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [noOfCartItems, setNoOfCartItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const {data:session,status} = useSession();
    const [cartId, setCartId] = useState("");
    
    async function getCartData(){
        try{
            setIsLoading(true);
            const response : CartI = await getCart()
            const totalItems = response.data.products.reduce((total, product) => total + product.count, 0);
            setNoOfCartItems(totalItems)    
            setTotalCartPrice(response.data.totalCartPrice);    
            setCartId(response.cartId);    
        }
        catch(error){
            console.error("Error fetching cart data:", error)
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        if (status === "loading") return;
        if(status === "unauthenticated") return;
        if(status === "authenticated"){
            getCartData();
        }    
    },[status])
  return (
    <>
    <CartContext.Provider value={{noOfCartItems,isLoading,getCartData,totalCartPrice,cartId}}>
        {children}
    </CartContext.Provider>
   
    </>
  )
}
