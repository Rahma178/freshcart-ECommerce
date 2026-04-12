"use server";
import { getToken } from "@/utilities/getTokenFn";

export async function addToWishlist(productId: string) {
  const token = await getToken();
  if (!token) throw new Error("unauthorized!");

  const res = await fetch(`${process.env.API}/wishlist`, {
    method: "POST",
    headers: { token, "Content-type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  return res.json();
}