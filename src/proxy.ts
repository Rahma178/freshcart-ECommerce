// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

async function proxy(req: NextRequest) {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName,
  });

  if (token) return NextResponse.next();
  return NextResponse.redirect(new URL("/login", req.url));
}

// الـ export لازم اسمه middleware
export { proxy as middleware };

export const config = {
  matcher: [
    "/cart/:path*",
    "/whishList/:path*",
    "/allorders/:path*",
    "/CheckOut/:path*",
  ],
};