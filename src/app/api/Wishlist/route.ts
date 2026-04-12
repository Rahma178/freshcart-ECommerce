import { getToken } from "@/utilities/getTokenFn";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const res = await fetch(`${process.env.API}/wishlist`, {
    headers: { token },
  });

  const data = await res.json();
  return NextResponse.json(data);
}