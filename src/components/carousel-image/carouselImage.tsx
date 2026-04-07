"use client";


import Image from "next/image";
import { useState } from "react";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import CustomerReviews from "../reviews/customerReviews";


type Props = {
  images: string[];
};

export default function ImageGallery({ images }: Props) {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
   <>
    <div className=" p-5 rounded-xl shadow-lg  border-gray-200 border-1 ">

      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        className="mb-4 h-100"
      >
        {images.map((img: string, i: number) => (
          <SwiperSlide key={i}>
            <Image
              src={img}
              alt="image"
              width={1000}
                height={1000}
                sizes="200"
              className="w-full h-full object-cover "
            />
          </SwiperSlide>
        ))}
      </Swiper>

       <Swiper
        onSwiper={setThumbsSwiper}  
        spaceBetween={10}
        slidesPerView={4}
        className="thumbs-swiper"
      >
        {images.map((img: string, i: number) => (
          <SwiperSlide key={i}>
            <img src={img} className="w-full h-full object-cover rounded cursor-pointer "/>
          </SwiperSlide>
        ))}
      </Swiper> 
    </div>
    <div className="mt-5 p-5 rounded-xl shadow-lg  border-gray-200 border-1 ">
      <CustomerReviews />
    </div>
   </>

  );
}