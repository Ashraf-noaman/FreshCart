"use server"

import { getUserToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";

export async function getOrder() {
    const token = await getUserToken();

    if (!token) {
        throw new Error("User not authenticated");
    }

    const decoded = jwtDecode(token as string) as { id?: string; _id?: string };
    const userId = decoded.id || decoded._id;
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        {
            method: "GET",
            headers: {
                token: token as string,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();
    return data;
}