import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookieStore = await cookies();

  const decodedToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("_Secure-next-auth.session-token")?.value;

  if (!decodedToken) return null;

  const token = await decode({
    token: decodedToken,
    secret: process.env.AUTH_SECRET!,
  });

  return token?.token;
}