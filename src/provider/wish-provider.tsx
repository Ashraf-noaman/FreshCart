"use client"
import React, { createContext, use, useEffect, useState } from 'react'
import { getProductFromWishlist } from '@/actions/wish.action';
import { WishListI } from '@/types/wishList.type';
import { getCart } from '@/actions/cart.action';

export const WishListContext = createContext <WishListContextI>({
    noOfItems: 0,
    getWishListData: () =>{},
    isLoder: false
    
});

interface WishListContextI {
    noOfItems: number;
    getWishListData: () =>void;
    isLoder: boolean;
}

export default function WishListContextProvider({ children }: { children: React.ReactNode }) {
    const[isLoder, setIsLoder] = useState(false);
    const [noOfItems, setnoOfItems] = useState(0);

async function getWishListData() {
    try{
        setIsLoder(true);
        const response : WishListI = await getProductFromWishlist();
        setnoOfItems(response.count);
    }catch(error){
        console.log((error as Error).message);
    }finally{
        setIsLoder(false);
    }
}
useEffect(()=>{
    getWishListData();
},[])
  return (
    <>
    <WishListContext.Provider value={{ noOfItems,getWishListData,isLoder }}>
        {children}
    </WishListContext.Provider>
        
    </>
  )
}
