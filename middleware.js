import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/auth/signin" || path === "/auth/signup";

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // for already logged in users
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL(`/dashboard`, request.url));
  }

  // for unauthenticated users
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/signin", "/auth/signup"],
};
