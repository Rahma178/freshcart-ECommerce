"use server";
import { getToken } from "@/utilities/getTokenFn";

export async function clearCart() {
  const token = await getToken();

  if (!token) {
    throw new Error("unauthorized!");
  }

  try {
    const data = await fetch(`${process.env.API}/cart`, {
      method: "delete",
      
      headers: {
        token,
        "Content-type": "application/json",
      },
    });

    const payload = await data.json();
    console.log(payload);
    return payload;
  } catch (error) {
    throw new Error("unauthorized!");
  }
}
