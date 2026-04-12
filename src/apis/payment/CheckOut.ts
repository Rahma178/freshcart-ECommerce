'use server'
import { getToken } from "@/utilities/getTokenFn";

interface shippingAddressInterface {
  "details": string,
  "phone": string,
  "city": string
}

export async function onlinePayment(
  cartId: string,
  shippingAddress: shippingAddressInterface,
) {
  const token = await getToken();

  if (!token) {
    throw new Error("unauthorized!");
  }

  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "post",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        "Content-type": "application/json",
        token,
      },
    },
  );

  if(!data.ok)
     throw new Error("unauthorized!");


  const res = await data.json()
  return res
}