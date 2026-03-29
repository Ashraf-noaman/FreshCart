"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Swiper as SwiperClass } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/thumbs";

type Props = {
  images: string[];
};

export default function ImageGallery({ images }: Props) {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className=" p-5 rounded-xl shadow-lg">

      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        className="mb-4 h-100"
        
        
      >
        {images.map((img: string, i: number) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              width={1000}
                height={1000}
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
  );
}