
"use server"
import { getToken } from "@/utilities/getTokenFn"
import { decode } from "next-auth/jwt"
import { getCsrfToken } from "next-auth/react"
import { cookies } from "next/headers"

export async function deleteItemCart(productId: string) {
  
    const token = await getToken()

    if(!token){
        throw new Error ('unauthorized!')
    }

    try {

      const data = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "delete",
    body: JSON.stringify({ productId }),
    headers: {
      token,
      "Content-type": "application/json"
    }
  })

  const payload = await data.json()
  console.log(payload)
  return payload

      
    } catch (error) {
      throw new Error ('unauthorized!')
    }
}
  