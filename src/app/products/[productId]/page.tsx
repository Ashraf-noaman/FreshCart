import React from 'react'
import { productI } from '@/types/product.type';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Dot, House, Minus, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import ImageGallery from '@/components/carousel-image/carouselImage';
import Link from 'next/link';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';


export default async function ProductDetails(
  {
    params,
}:{
    params: Promise <{productId:string}>
}
) {
    const {productId} = await params;
    console.log(productId);
    const response = await fetch(`${process.env.BASE_URL}/products/${productId}`)
    const data = await response.json();
    const product : productI = data.data;
    console.log(product);
    
    
    
    return (
    <>
    <div className=" mx-4 mt-5">
       <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className='flex items-center gap-1'><House size={13}/>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Shop</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    </div>
     <div className='container lg:flex lg:mx-auto py-5 px-5 lg:py-10 lg:px-5 lg:gap-10 mt-3'>
      <div className='w-full lg:w-1/4 border-gray-200 border-1 rounded-xl h-full'>
        <ImageGallery images={product.images} />
       
      </div>
      <div className='mt-6 lg:mt-0 w-full lg:w-3/4 shadow-sm p-5 lg:p-10 rounded-xl border-gray-200 border-1 '>
        <div className='title-card mb-5'>
          <Link href="" className='bg-green-50 text-green-700 p-2 text-sm rounded-xl mr-2 hover:bg-green-100'>{product.category.name}</Link>
          <span className='bg-gray-50 text-gray-700 p-2 text-sm rounded-xl mr-2'>{product.brand.name}</span>
        </div>
        <div className='card-body '>
          <h2 className='text-2xl lg:text-3xl font-bold'>{product.title}</h2>
          <div className="flex items-center gap-5 py-3">
                        <div className="flex gap-1 items-center ">
                          {[0,1,2,3,4].map((star,index)=>{
                            const filledStars = index < Math.floor(product.ratingsAverage)
                            return(
                              <React.Fragment key={index}>
                                <Star className={filledStars ? "text-yellow-400 fill-yellow-400 cursor-pointer w-4 h-4 lg:w-5 lg:h-5" : "text-gray-400 fill-gray-400 cursor-pointer w-4 h-4 lg:w-5 lg:h-5"} />
                              </React.Fragment>
                            )
                          })}
                      </div>
                      <div className="product-rating flex gap-2">
                        <span className='text-sm lg:text-sm text-gray-400'>{product.ratingsAverage}</span>
                        <span className='text-sm lg:text-sm text-gray-700'>({product.ratingsQuantity} reviews)</span>
                      </div>
          </div>
          <h3 className='text-2xl lg:text-3xl font-bold lg:my-4'>{product.price} EGP</h3>
       <div className='flex bg-green-50 w-25 rounded-xl items-center justify-center mt-3 lg:mt-0'>
           <span className='w-2 h-2 rounded-full bg-green-500 '></span>
            <span className=' text-green-700 p-2 text-sm '>In Stock</span>
       </div>
       <div className='border-1 border-gray-100 my-6'></div>
        </div>
        <p>{product.description}</p>
          <div className='quantity my-4'>
            <p className='text-gray-600'>Quantity</p>
             <QuantitySelector allQuantity ={product.quantity} priceOne = {product.price}/>              
          </div>                
      </div>
    </div> 

    </>
  )
}
