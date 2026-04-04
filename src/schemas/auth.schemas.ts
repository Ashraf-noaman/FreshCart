"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

export const registerSchema = z.object({
 name: z.string()
 .nonempty("Name Required")
 .min(6,"Min is 6 Chars")
 .max(20,"Max is 20 Chars"),
 email: z.string()
 .nonempty("Email Required"),
  password: z.string()
  .nonempty("Password Required")
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "Must include uppercase letter")
  .regex(/[a-z]/, "Must include lowercase letter")
  .regex(/[0-9]/, "Must include a number")
  .regex(/[^A-Za-z0-9]/, "Must include a special character"),
   rePassword: z.string()
 .nonempty("RePassword Required")
 .min(7,"Min is 7 Chars"),
 phone: z.string()
 .nonempty("Phone Required")
.regex(/^01[0125][0-9]{8}$/),
terms: z.boolean().refine((val) => val === true, {
  message: "You must accept Terms & Privacy Policy",
}),
}).refine((data)=>data.password === data.rePassword,{
  path:["rePassword"],
  error:"Password does not match"
})

export type registerTypeSchema = z.infer <typeof registerSchema>




export const loginSchema = z.object({
 email: z.string()
 .nonempty("Email Required"),
  password: z.string()
 .nonempty("Password Required")
 .min(7,"Min is 7 Chars"),
   
})




export type loginTypeSchema = z.infer <typeof loginSchema>