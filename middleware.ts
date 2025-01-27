import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const url = request.nextUrl.pathname;

  if (!token && url.includes("profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (url === "/login" || url === "/register")) {
    try {
      const { payload }: any = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
      );
      return NextResponse.redirect(
        new URL(`/profile/${payload.id}`, request.url)
      );
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/register", "/login", "/profile/:path*"],
};
