import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/profile", "/exclusive"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
    ?? request.headers.get("authorization")?.replace("Bearer ", "");

  const isProtected = PROTECTED.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/exclusive/:path*"],
};
