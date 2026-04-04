"use client"

import * as React from "react"
import * as z from "zod"

export const checkOutSchema = z.object({
  shippingAddress: z.object({
    details: z.string()
      .nonempty("Details Required")
      .min(10, "Min is 10 Chars")
      .max(100, "Max is 100 Chars"),

    phone: z.string()
      .nonempty("Phone Required")
      .regex(/^01[0125][0-9]{8}$/, "Invalid Phone Number"),

    city: z.string()
      .nonempty("City Required")
      .min(3, "Min is 3 Chars")
      .max(50, "Max is 50 Chars"),

    postalCode: z.string()
      .nonempty("Postal Code Required")
      .regex(/^\d{5}(-\d{4})?$/, "Invalid Postal Code"),
  })
})

export type CheckOutTypeSchema = z.infer<typeof checkOutSchema>