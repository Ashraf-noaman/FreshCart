"use client";
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import loginbg from "@/assets/loginImage.png";
import {
  Headset,
  ShieldBan,
  Truck,
  Facebook,
  UserPlus,
  Lock,
  Users,
  Star,
  RotateCw,
  EyeOff,
  Eye,
} from "lucide-react";
import { Button } from "@base-ui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema, loginTypeSchema } from "@/schemas/auth.schemas";
import { loginUser } from "@/services/auth.services";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function handelLogin(data: loginTypeSchema) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      //callbackUrl:"/"
    });
    if (response?.ok) {
      router.push("/");
      toast.success("user Login Successfully");
    } else {
      toast.error(response?.error || "user Login failed");
    }
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 lg:py-15 lg:mx-30 lg:gap-10 grid-cols-1 py-10 mx-5 gap-20">
        <div className=" hidden lg:flex lg:flex-col lg:justify-center">
          <Image
            src={loginbg}
            alt="loginImage"
            width={1000}
            height={1000}
            className="w-full h-full rounded-5xl  bg-contain"
          />
          <h3 className=" text-3xl font-bold text-center">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h3>
          <h3 className=" text-lg  text-center">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </h3>
          <div className=" grid grid-cols-1 lg:grid-cols-3 my-4 px-15">
            <div className="shipping flex items-center gap-2">
              <Truck className="text-blue-800 bg-blue-100 rounded-full w-7 h-7 p-2" />
              <div className="flex flex-col">
                <p className="text-gray-700">Free Shipping</p>
              </div>
            </div>
            <div className="shipping flex items-center gap-2">
              <ShieldBan className="text-green-600 bg-green-100 rounded-full w-7 h-7 p-2" />
              <div className="flex flex-col">
                <p className="text-gray-700">Secure Payment</p>
              </div>
            </div>
            <div className="shipping flex items-center gap-2">
              <Headset className="text-purple-600 bg-purple-100 rounded-full w-7 h-7 p-2" />
              <div className="flex flex-col">
                <p className="text-gray-700">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-4 shadow-lg rounded-xl">
          <h3 className="text-center text-3xl font-bold leading-12">
            <span className="text-green-600">Fresh</span>Cart
            <br /> Welcome Back!
          </h3>
          <p className="text-gray-700 my-1">
            Sign in to continue your fresh shopping experience
          </p>

          <div className="my-4 flex-col space-y-4 w-full">
            <Button className=" grow cursor-pointer flex items-center justify-center gap-3 w-full px-4 py-3 border rounded-lg shadow-sm hover:bg-green-50 hover:border-green-500 transition">
              <FcGoogle size={20} />
              Continue With Google
            </Button>
            <Button className="grow cursor-pointer flex items-center justify-center gap-3 w-full px-4 py-3 border rounded-lg shadow-sm hover:bg-green-50 hover:border-green-500 transition">
              <Facebook className="text-blue-500 fill-blue-500" size={20} />
              Continue With Facebook
            </Button>
          </div>
          <div className="flex gap-4 items-center w-full">
            <div className=" bg-gray-100 grow h-[3]"></div>
            <span className="text-gray-600 text-sm">
              OR CONTINUE WITH EMAIL
            </span>
            <div className=" bg-gray-100 grow h-[3]"></div>
          </div>
          <div className="card w-full">
            <form
              onSubmit={form.handleSubmit(handelLogin)}
              className="space-y-7"
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                    <Input
                      type="email"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Ashraf@example.com"
                      autoComplete="off"
                      className="h-12 border border-gray-300 shadow-none 
                    focus:border-green-500 focus:outline-none focus:ring-0 
                    focus-visible:border-green-500 focus-visible:ring-0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between">
                      <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
                      <Link
                        href="/forgotPass"
                        className="text-green-600 hover:text-green-700"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="h-12 border border-gray-300 shadow-none 
                    focus:border-green-500 focus:outline-none focus:ring-0 
                    focus-visible:border-green-500 focus-visible:ring-0"
                    />
                     <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                   
                  </Field>
                )}
              />

              <Field orientation="horizontal">
                <Checkbox
                  id="terms-checkbox"
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  name="terms-checkbox"
                />
                <Label htmlFor="terms-checkbox" className="lg:text-lg">
                  <div className="text-[17px] leading-6">
                    <p className="text-sm">Keep me signed in</p>
                  </div>
                </Label>
              </Field>
              <Button
                className="bg-green-600 text-white cursor-pointer flex items-center justify-center gap-3 w-full px-4 py-2 border rounded-lg shadow-sm hover:bg-green-700 transition"
                type="submit"
              >
                {" "}
                Login In
              </Button>
            </form>
            <div className="border-1 my-5 border-gray-100"></div>
          </div>
          <div className=" flex justify-center gap-1">
            <p>New to FreshCart?</p>
            <Link
              href="/register"
              className="text-green-600 hover:text-green-700"
            >
              Create an account
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="flex items-start gap-1">
              <Lock className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-600">SSL Secured</p>
            </div>
            <div className="flex items-start gap-1">
              <Users className="w-4 h-4 fill-gray-400 text-gray-400" />
              <p className="text-sm text-gray-600">50K+ Users</p>
            </div>
            <div className="flex items-start gap-1">
              <Star className="w-4 h-4 fill-gray-400 text-gray-400" />
              <p className="text-sm text-gray-600">4.9 Rating</p>
            </div>
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
