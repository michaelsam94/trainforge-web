import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/plan", "/progress", "/coach", "/community", "/profile", "/onboarding"];
const authPaths = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("trainforge_session")?.value;

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  const isAuthPage = authPaths.some((path) => pathname === path);

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/plan", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/plan/:path*",
    "/progress/:path*",
    "/coach/:path*",
    "/community/:path*",
    "/profile/:path*",
    "/onboarding",
    "/login",
    "/signup",
  ],
};
