
'use server'
import { cookies } from "next/headers";
import { loginSchemaType } from "../Schema/Schema.login";

export async function loginFn(formData: loginSchemaType) {
  const data = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    }
  );

  if (!data.ok) throw new Error('something wrong!');

  const payload = await data.json();
  const cookie = await cookies();

  cookie.set("token", payload?.token,{
    expires:60*60,
    httpOnly:true
  });

  return data.ok

}