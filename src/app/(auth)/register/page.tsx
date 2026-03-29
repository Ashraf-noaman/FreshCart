"use client";
import { Facebook, Shield, Star, Truck, User, UserPlus } from "lucide-react";
import React, { useState } from "react";
import userImgae from "@/assets/review-author.webp";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@base-ui/react";
import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { registerSchema, registerTypeSchema } from "@/schemas/auth.schemas";
import { registerUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  async function handelRegister(data: registerTypeSchema) {
    const response = await registerUser(data);
    if (response.message === "success") {
      router.push("/login");
      toast.success("user Register Successfully");
    } else {
      toast.error("user Register Error");
    }
  }
  const getPasswordStrength = (password: string) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };
  const password = form.watch("password") || "";
  const strength = getPasswordStrength(password);

  return (
    <>
      <div className="grid lg:grid-cols-2 lg:py-15 lg:mx-30 lg:gap-10 grid-cols-1 py-10 mx-5 gap-20">
        <div className="flex flex-col  ">
          <h3 className="text-4xl font-bold">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h3>
          <p className="text-xl text-gray-600 my-3">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>
          <div className="gap-y-3">
            <div className="shipping flex items-center gap-3 my-4">
              <Star className="text-green-600 fill-green-600 bg-green-100 rounded-full w-12 h-12 p-3" />
              <div className="flex flex-col">
                <p className="text-lg">Premium Quality</p>
                <span className="text-gray-600 text-lg">
                  Premium quality products sourced from trusted suppliers.
                </span>
              </div>
            </div>
            <div className="shipping flex items-center gap-3 my-4">
              <Truck className="text-green-600 bg-green-100 rounded-full w-12 h-12 p-3" />
              <div className="flex flex-col">
                <p className="text-lg">Fast Delivery</p>
                <span className="text-gray-600 text-lg">
                  Same-day delivery available in most areas
                </span>
              </div>
            </div>
            <div className="shipping flex items-center gap-3 my-4">
              <Shield className="text-green-600 fill-green-600 bg-green-100 rounded-full w-12 h-12 p-3" />
              <div className="flex flex-col">
                <p className="text-lg">Secure Shopping</p>
                <span className="text-gray-600 text-lg">
                  Your data and payments are completely secure
                </span>
              </div>
            </div>
          </div>
          <div className="info border-1 p-5 rounded-lg shadow">
            <div className="flex gap-5 items-center">
              <Image src={userImgae} width={40} height={40} alt="userinfo" />
              <div className="flex flex-col">
                <p>Sarah Ali</p>
                <div className="flex gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>
            <p className="mt-3 italic text-gray-600">
              {
                '" FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend! "'
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center p-4 shadow-lg rounded-xl">
          <div className="flex flex-col justify-center items-center">
            <h3 className="lg:text-4xl text-2xl text-gray-900 font-bold">
              Create Your Account
            </h3>
            <p className="lg:text-lg text-sm text-gray-600">
              Start your fresh journey with us today
            </p>
          </div>
          <div className="my-4 flex gap-3">
            <Button className=" cursor-pointer flex items-center justify-center gap-3 w-full px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 transition">
              <FcGoogle size={20} />
              Google
            </Button>
            <Button className=" cursor-pointer flex items-center justify-center gap-3 w-full px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 transition">
              <Facebook className="text-blue-500 fill-blue-500" size={20} />
              Facebook
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <div className=" bg-gray-100 grow h-[3]"></div>
            <span>or</span>
            <div className=" bg-gray-100 grow h-[3]"></div>
          </div>
          <div className="card ">
            <form
              onSubmit={form.handleSubmit(handelRegister)}
              className="space-y-7"
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Ashraf"
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
                    <FieldLabel htmlFor={field.name}>Password*</FieldLabel>

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
          focus-visible:border-green-500 focus-visible:ring-0 pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {/* 🔥 رجع المؤشر هنا */}
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded transition-all duration-300 ${
                              strength >= level
                                ? strength <= 2
                                  ? "bg-red-500"
                                  : strength === 3
                                    ? "bg-yellow-500"
                                    : "bg-green-600"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-sm mt-1">
                        {strength <= 2 && (
                          <span className="text-red-500">Weak</span>
                        )}
                        {strength === 3 && (
                          <span className="text-yellow-500">Medium</span>
                        )}
                        {strength >= 4 && (
                          <span className="text-green-600">Strong</span>
                        )}
                      </p>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password*
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Confirm Your Password"
                        autoComplete="off"
                        className="h-12 border border-gray-300 shadow-none 
          focus:border-green-500 focus:outline-none focus:ring-0 
          focus-visible:border-green-500 focus-visible:ring-0 pr-10"
                      />

                      {/* 👁️ Eye Icon */}
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                      >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
                    <Input
                      type="tel"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="+20 127 8458 514"
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
              <Field orientation="horizontal">
                <Checkbox
                  id="terms-checkbox"
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  name="terms-checkbox"
                />
                <Label htmlFor="terms-checkbox" className="lg:text-lg">
                  <div className="text-[17px] leading-6">
                    I agree to the{" "}
                    <Link href="" className=" text-green-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="" className="text-green-600 hover:underline ">
                      Privacy Policy *
                    </Link>
                  </div>
                </Label>
              </Field>
              <Button
                className="bg-green-600 text-white cursor-pointer flex items-center justify-center gap-3 w-full px-4 py-2 border rounded-lg shadow-sm hover:bg-green-700 transition"
                type="submit"
              >
                <UserPlus /> Create My Account
              </Button>
            </form>
            <div className="border-1 my-5 border-gray-100"></div>
          </div>
          <div className=" flex justify-center gap-1">
            <p>Already have an account?</p>
            <Link href="/login" className="text-green-600 hover:underline">
              {" "}
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
