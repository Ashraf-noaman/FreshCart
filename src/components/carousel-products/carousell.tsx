"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import homeSlide from "@/assets/home-slider-1.png"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Button } from "../ui/button";
import { Headset, RotateCw, ShieldBan, Truck } from "lucide-react";

export default function Carousell() {
  return (
    <div className="bg-gray-50 ">
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20} 
      slidesPerView={1} 
      loop={true} 
      navigation 
      pagination={{ clickable: true }} 
      className="mySwiper ">
      <SwiperSlide>
        <div className="relative h-100 w-full cursor-pointer">
          <Image src={homeSlide} alt="Slide 1" width={1000} className=" absolute inset-0 w-full h-full object-cover"/>
          <div className=" absolute inset-0 bg-gradient-to-r from-green-600/90 to-green-400/40"></div>
          <div className="relative z-10 h-full flex-col left-5 top-25 lg:left-15 lg:top-25">
            <div className="text-white text-2xl lg:text-3xl font-bold">
              <h3>Fresh Products Delivered </h3>
              <h3>to your Door</h3>
            </div>
            <p className="py-3 text-white">Get 20% off your first order</p>
            <Button className=" lg:text-lg rounded-xl p-5 bg-white text-blue-700 cursor-pointer">
              Shop Now
            </Button>
            <Button className=" ml-3 lg:text-lg rounded-xl p-5 bg-transparent border-2 border-gray-300 text-white cursor-pointer">
              View Deals
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative h-100 w-full cursor-pointer">
          <Image src={homeSlide} alt="Slide 1" width={1000} className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-green-600/70"></div>
          <div className="relative z-10 h-full flex-col left-5 top-25 lg:left-15 lg:top-25">
            <div className="text-white text-2xl lg:text-3xl font-bold">
              <h3>Premium Quality</h3>
              <h3>Guaranteed</h3>
            </div>
            <p className="py-3 text-white">Fresh from farm to your table</p>
            <Button className=" lg:text-lg rounded-xl p-5 bg-white text-blue-700 cursor-pointer">
              Shop Now
            </Button>
            <Button className=" ml-3 lg:text-lg rounded-xl p-5 bg-transparent border-2 border-gray-300 text-white cursor-pointer">
              Learn More
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative h-100 w-full cursor-pointer">
          <Image src={homeSlide} alt="Slide 1" width={1000} className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-green-600/70"></div>
          <div className="relative z-10 h-full flex-col left-5 top-30 lg:left-15 lg:top-30">
            <div className="text-white text-2xl lg:text-3xl font-bold">
              <h3>Fast & Free Delivery</h3>
            </div>
            <p className="py-3 text-white">Same day delivery available</p>
            <Button className=" lg:text-lg rounded-xl p-5 bg-white text-blue-700 cursor-pointer">
              Order Now 
            </Button>
            <Button className=" ml-3 lg:text-lg rounded-xl p-5 bg-transparent border-2 border-gray-300 text-white cursor-pointer">
              Delivery Info 
            </Button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <div className="px-5 grid grid-cols-1 lg:grid-cols-4 gap-4 py-4">
  <div className="shipping flex items-center gap-3 shadow-sm rounded-2xl p-4 hover:shadow-lg cursor-pointer transition-all duration-200">
    <Truck className="text-blue-800 bg-blue-100 rounded-full w-10 h-10 p-2" />
    <div className="flex flex-col">
      <p>Free Shipping</p>
      <span className="text-gray-600 text-sm">On orders over 500 EGP</span>
    </div>
  </div>

  <div className="shipping flex items-center gap-3 shadow-sm rounded-2xl p-4 hover:shadow-lg cursor-pointer transition-all duration-200">
    <ShieldBan className="text-green-600 bg-green-100 rounded-full w-10 h-10 p-2" />
    <div className="flex flex-col">
      <p>Secure Payment</p>
      <span className="text-gray-600 text-sm">100% secure transactions</span>
    </div>
  </div>

  <div className="shipping flex items-center gap-3 shadow-sm rounded-2xl p-4 hover:shadow-lg cursor-pointer transition-all duration-200">
    <RotateCw className="text-orange-600 bg-orange-100 rounded-full w-10 h-10 p-2" />
    <div className="flex flex-col">
      <p>Easy Returns </p>
      <span className="text-gray-600 text-sm">14-day return policy</span>
    </div>
  </div>

  <div className="shipping flex items-center gap-3 shadow-sm rounded-2xl p-4 hover:shadow-lg cursor-pointer transition-all duration-200">
    <Headset className=" text-purple-600 bg-purple-100 rounded-full w-10 h-10 p-2" />
    <div className="flex flex-col">
      <p>24/7 Support</p>
      <span className="text-gray-600 text-sm">Dedicated support team</span>
    </div>
  </div>
    </div>
    </div>
    
  );
}
