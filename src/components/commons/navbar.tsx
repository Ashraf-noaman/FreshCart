"use client";
import {
  Badge,
  ChevronDown,
  Gift,
  Headset,
  HeadsetIcon,
  Heart,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  TextAlignJustify,
  Truck,
  User,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import logo from "@/assets/freshcart-logo.svg";
import Link from "next/link";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartContext } from "@/provider/cart-provider";
import { Spinner } from "../ui/spinner";
import { WishListContext } from "@/provider/wish-provider";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const { data: session, status } = useSession();
  const {noOfCartItems,isLoading} = useContext(CartContext);
  const {noOfItems,isLoder} = useContext(WishListContext);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data));
  }, []);

  return (
    <>
      <div className="hidden lg:flex  top-nav py-3 lg:px-4  lg:justify-between  border-b-1">
        <div className="left-top flex items-center gap-5">
          <div className="flex items-center gap-1">
            <Truck className=" stroke-green-600 w-4 h-4 " />
            <span className="text-gray-600 text-sm ">
              Free Shipping on Orders 500 EGP
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Gift className=" stroke-green-600 w-4 h-4 " />
            <span className="text-gray-600 text-sm ">New Arrivals Daily</span>
          </div>
        </div>
        <div className="right-top flex items-center ">
          <div className="R flex items-center gap-5">
            <a
              href="tel:+201278185017"
              className="flex items-center gap-1 group"
            >
              <Phone className="stroke-gray-600 w-5 h-5 group-hover:stroke-green-600" />
              <span className="text-gray-600 text-sm group-hover:text-green-600">
                +20(1278185017)
              </span>
            </a>
            <a href="" className="flex items-center gap-1 group">
              <Mail className="stroke-gray-600 w-5 h-5 group-hover:stroke-green-600" />
              <span className="text-gray-600 text-sm group-hover:text-green-600">
                support@freshcart.com
              </span>
            </a>
          </div>
          <p className="text-gray-300 px-3 text-lg font-light">|</p>
          {session ? (
            <p className="text-gray-600">Welcome, {session.user?.name}</p>
          ) : (
            <div className="R flex items-center gap-5">
              <a
                href="tel:+201278185017"
                className="flex items-center gap-1 group"
              ></a>
              <Link href="/login" className="flex items-center group">
                <User className="stroke-gray-600 w-5 h-5 group-hover:stroke-green-600" />
                <span className="text-gray-600 text-sm group-hover:text-green-600">
                  Sign In
                </span>
              </Link>

              <div className="flex items-center gap-1 group">
                <UserPlus className="stroke-gray-600 fill-gray-600 w-5 h-5 group-hover:fill-green-600 group-hover:stroke-green-600" />
                <Link
                  href="/register"
                  className="text-gray-600 text-sm group-hover:text-green-600"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <nav className=" sticky top-0 bg-white z-50 shadow-sm">
        <div className=" container  py-4 flex items-center justify-between lg:justify-between px-3">
          <div className="logo flex items-center gap-5">
            <Link href="/" className="logo">
              <Image src={logo} alt="logo" className="w-30 left-0" />
            </Link>

            <div className="hidden lg:block relative w-140">
              <input
                type="text"
                placeholder="Search for products,brands and more..."
                className="w-full h-11 border text-sm border-gray-300 rounded-full py-2 pl-5 pr-4 focus:outline focus:ring-2 focus:ring-green-400"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 p-2  text-white bg-green-600 rounded-full cursor-pointer hover:bg-green-700" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="hidden lg:flex nav-links  items-center gap-10 mx-3">
              {/* Home */}
              <Link
                href="/"
                className="text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-transparent cursor-pointer"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-transparent cursor-pointer"
              >
                Shop
              </Link>
              <NavigationMenuItem className="list-none">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button className="group text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-transparent cursor-pointer">
                      Categories
                      <ChevronDown className="ml-1 transition-transform duration-800 group-hover:rotate-180" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent side="bottom">
                    <ul className="flex flex-col">
                      <li>
                        <Link
                          href="/categories"
                          className="block p-2 hover:bg-green-100 text-gray-600"
                        >
                          All Categories
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/categories/6439d5b90049ad0b52b90048`}
                          className="block p-2 hover:bg-green-100 text-gray-600"
                        >
                          {"Men's Fashion"}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/categories/6439d58a0049ad0b52b9003f`}
                          className="block p-2 hover:bg-green-100 text-gray-600"
                        >
                          {"Women's Fashion"}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/categories/6439d2d167d9aa4ca970649f`}
                          className="block p-2 hover:bg-green-100 text-gray-600"
                        >
                          {"Electronics"}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/categories/6439d30b67d9aa4ca97064b1`}
                          className="block p-2 hover:bg-green-100 text-gray-600"
                        >
                          {"Beauty & Health"}
                        </Link>
                      </li>
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              </NavigationMenuItem>
              <Link
                href="/brands"
                className="text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-transparent cursor-pointer"
              >
                Brand
              </Link>
              <Link
                href="/orders"
                className="text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-transparent cursor-pointer"
              >
                Orders
              </Link>
            </div>
            <div className="hidden lg:flex support ">
              <Headset className="w-9 h-9 p-2  bg-green-100 text-green-600 rounded-full cursor-pointer hover:text-green-500" />
              <div className="ml-2 flex-col w-20">
                <p className="text-sm text-gray-500">Support</p>
                <p className="text-sm text-gray-800">24/7 Help</p>
              </div>
              
            </div>
          </div>
          <div className="flex items-center justify-between">
            {session &&
            
             <div className="icons flex mr-4">
              <div className="border-l h-10 ml-3 border-gray-400 hidden lg:block"></div>
              <Link href="/wishlist" className="relative mx-2 hidden lg:block">
                <Heart className="w-10 h-10 p-2 text-red-600  rounded-full cursor-pointer hover:text-red-500 hover:bg-gray-100" />
                <span className="absolute bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center start-full bottom-full -translate-x-1/2 translate-y-1/2">
                  {isLoder ? <Spinner/> : noOfItems }
                </span> 
              </Link>

               <Link href="/cart" className="relative group mr-2 cursor-pointer group hidden lg:block">
                <ShoppingCart className="w-10 h-10 p-2 text-gray-600 group-hover:bg-gray-100 rounded-2xl transition duration-200" />
                <span className="absolute bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center start-full bottom-full -translate-x-1/2 translate-y-1/2">
                  {isLoading ? <Spinner/> : noOfCartItems }
                </span>         
              </Link>
            </div>}
            
            {session ? (
              <Button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="hidden h-10 lg:flex lg:items-center lg:px-4 text-white lg:flex rounded-3xl text-sm bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                Sign Out
              </Button>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex lg:items-center lg:px-4 text-white lg:flex rounded-3xl text-sm bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                <User className="w-9 h-9 p-2" />
                Sign In
              </Link>
            )}

            <Sheet>
              <SheetTrigger className="block lg:hidden">
                <TextAlignJustify className="text-white flex rounded-3xl p-2 w-8 h-8 bg-green-600 hover:bg-green-700 cursor-pointer" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="bg-gray-50 border-b-2">
                  <SheetTitle>
                    <Link href="/" className="logo">
                      <Image src={logo} alt="logo" className="w-40 left-0" />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="mx-5 relative w-65 ">
                  <input
                    type="text"
                    placeholder="Search for products.."
                    className="w-full h-11 border text-sm border-gray-300 rounded-full py-2 pl-5 pr-4 focus:outline focus:ring-2 focus:ring-green-400"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 p-2  text-white bg-green-600 rounded-full cursor-pointer hover:bg-green-700" />
                </div>
                <div className="flex flex-col  nav-links  gap-3 border-1 py-3 px-4">
                  <Link
                    href="/"
                    className="py-2 text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-green-50 px-2 cursor-pointer"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="py-2 text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-green-50 px-2 cursor-pointer"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/categories"
                    className="py-2 text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-green-50 px-2 cursor-pointer"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/brands"
                    className="py-2 text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-green-50 px-2 cursor-pointer"
                  >
                    Brand
                  </Link>
                  <Link
                    href="/orders"
                    className="py-2 text-lg bg-transparent focus:bg-transparent text-gray-600 hover:text-green-600 hover:bg-green-50 px-2 cursor-pointer"
                  >
                    Orders
                  </Link>

                </div>
                <div className="icons flex flex-col gap-2">
                  <Link
                    href="/wishlist"
                    className="flex items-center py-2 px-4 hover:bg-green-50 gap-2"
                  >
                    <Heart className="w-10 h-10 p-2 bg-red-50 rounded-full cursor-pointer text-red-600 hover:bg-gray-100" />
                    <p className="text-lg">Wishlist</p>
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center py-2 px-4 hover:bg-green-50 gap-2"
                  >
                    <ShoppingCart className="w-10 h-10 p-2 bg-green-50 rounded-full cursor-pointer text-green-600 hover:bg-gray-100" />
                    <p className="text-lg">Cart</p>
                  </Link>
                </div>
                {session ? (
                  <div className="flex justify-center items-center px-5">
                    <p className="text-gray-600 text-lg mr-auto">
                      Welcome, {session.user?.name}
                    </p>
                    <Button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="h-10 lg:flex lg:items-center lg:px-4 text-white lg:flex rounded-3xl text-sm bg-green-600 hover:bg-green-700 cursor-pointer"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-5 px-3">
                    <Link
                      href="/login"
                      className="text-white h-10 items-center flex text-lg grow rounded-xl py-6 px-7 bg-green-600 hover:bg-green-700 cursor-pointer"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="text-lg h-10 items-center flex grow text-green-700 border-green-700 border-2 rounded-xl py-6 px-7 bg-transparent-600 hover:bg-green-100 cursor-pointer"
                    >
                      Sign up
                    </Link>
                  </div>
                )}

                <div className="flex gap-5 px-5 bg-gray-50 py-5">
                  <HeadsetIcon className="w-10 h-10 p-2 bg-green-50 rounded-full cursor-pointer text-green-600 hover:bg-gray-100" />
                  <div className="">
                    <h2>Need Help?</h2>
                    <p className="text-green-600">Contact Support</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
