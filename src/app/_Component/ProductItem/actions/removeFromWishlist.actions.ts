"use server";
import { getToken } from "@/utilities/getTokenFn";

export async function removeFromWishlist(productId: string) {
  const token = await getToken();
  if (!token) throw new Error("unauthorized!");

  const res = await fetch(`${process.env.API}/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token, "Content-type": "application/json" },
  });

  return res.json();
}