"use client";
import Image from "next/image";
import React from "react";
import loginbg from "@/assets/loginImage.png";
import {
  Headset,
  ShieldBan,
  Truck,
  Facebook,
  UserPlus,
  Users,
  Star,
  RotateCw,
  Lock,
  Mail,
  Shield,
  Key,
  MoveLeft,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@base-ui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function forgotPass() {
  return (
    <>
      <div className="grid lg:grid-cols-2 lg:py-15 lg:mx-30 lg:gap-10 grid-cols-1 py-10 mx-5 gap-20">
        <div className=" hidden lg:flex lg:flex-col lg:justify-center">
          <div className="w-full h-96 bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-green-200/50"></div>
            <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50"></div>
            <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-200/50"></div>

            <div className="relative flex flex-col items-center gap-6 z-10">
              {/* Main Icon */}
              <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                  <Lock className="text-green-600 w-10 h-10" />
                </div>
              </div>

              {/* Left Icon */}
              <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
                <Mail className="text-green-500 w-5 h-5" />
              </div>

              {/* Right Icon */}
              <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
                <Shield className="text-green-600 w-5 h-5" />
              </div>

              {/* Dots */}
              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse [animation-delay:150ms]"></div>
                <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse [animation-delay:300ms]"></div>
              </div>
            </div>
          </div>
          <h3 className="mt-5 text-3xl font-bold text-center">
            Reset Your Password
          </h3>
          <h3 className=" text-lg  text-center my-4">
            Do not worry, it happens to the best of us. We will help you get back into your account in no time.
          </h3>
          <div className=" grid grid-cols-1 lg:grid-cols-3 my-4 px-10">
            <div className="shipping flex items-center gap-2">
              <Mail className="text-blue-800 bg-blue-100 rounded-full w-7 h-7 p-2" />
              <div className="flex flex-col">
                <p className="text-gray-700">Email Verification</p>
              </div>
            </div>
            <div className="shipping flex items-center gap-2">
              <ShieldBan className="text-green-600 bg-green-100 rounded-full w-7 h-7 p-2" />
              <div className="flex flex-col">
                <p className="text-gray-700">Secure Payment</p>
              </div>
            </div>
            <div className="shipping flex items-center gap-2">
              <Lock className="text-purple-600 bg-purple-100 rounded-full w-7 h-7 p-2" />
              <div className="flex flex-col">
                <p className="text-gray-700">Encrypted</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-4 shadow-lg rounded-xl">
          <h3 className="text-center text-3xl font-bold leading-12">
            <span className="text-green-600">Fresh</span>Cart
            <br /> Forgot Password?
          </h3>
          <p className="text-gray-700 my-1">
            No worries, we wll send you a reset code
          </p>

          <div className="my-4 flex space-y-4 w-full items-center justify-center">
            <Mail className="w-11 h-11 p-3 bg-green-600 text-white rounded-full shadow-lg shadow-green-200" />
            <div className="border-2 my-5 w-20 mx-3 border-gray-100"></div>
            <Key className="w-11 h-11 p-3 bg-gray-300 text-gray-500 rounded-full shadow-lg shadow-gray-200" />
            <div className="border-2 my-5 w-20 mx-3 border-gray-100"></div>
            <Lock className="w-11 h-11 p-3 bg-gray-300 text-gray-500 rounded-full shadow-lg shadow-gray-200" />
          </div>
          
          <div className="card w-full">
            <form className="space-y-7">
              <p>Email</p>

            
              <Button
                className="bg-green-600 text-white cursor-pointer flex items-center justify-center gap-3 w-full px-4 py-2 border rounded-lg shadow-sm hover:bg-green-700 transition"
                type="submit"
              >
                <UserPlus /> Send Rest Code
              </Button>

            </form>
             <Link
              href="/login"
              className="text-green-600 hover:text-green-700 flex justify-center my-3"
            >
              <ArrowLeft className="w-10 p-1" />
              Back to Sign In
            </Link>
            <div className="border-1 my-5 border-gray-100"></div>
          </div>
          <div className=" flex justify-center gap-1">
            <p>Remember your password?</p>
            <Link
              href="/login"
              className="text-green-600 hover:text-green-700"
            >
              Sign In
            </Link>
          </div>
          
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-4 bg-green-50 w-full">
        <div className="shipping flex items-center gap-5 px-9 py-2">
          <Truck className="text-green-600 bg-green-200 rounded-xl w-10 h-10 p-2" />
          <div className="flex flex-col">
            <p>Free Shipping</p>
            <span className="text-gray-600 text-sm">
              On orders over 500 EGP
            </span>
          </div>
        </div>

        <div className="shipping flex items-center gap-5 px-9 py-2">
          <ShieldBan className="text-green-600 bg-green-200 rounded-xl w-10 h-10 p-2" />
          <div className="flex flex-col">
            <p>Secure Payment</p>
            <span className="text-gray-600 text-sm">
              100% secure transactions
            </span>
          </div>
        </div>

        <div className="shipping flex items-center gap-5 px-9 py-2">
          <RotateCw className="text-green-600 bg-green-200 rounded-xl w-10 h-10 p-2" />
          <div className="flex flex-col">
            <p>Easy Returns </p>
            <span className="text-gray-600 text-sm">14-day return policy</span>
          </div>
        </div>

        <div className="shipping flex items-center gap-5 px-9 py-2">
          <Headset className=" text-green-600 bg-green-200 rounded-xl w-10 h-10 p-2" />
          <div className="flex flex-col">
            <p>24/7 Support</p>
            <span className="text-gray-600 text-sm">
              Dedicated support team
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
