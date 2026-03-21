import { isTokenExpired } from "@/shared/lib/jwt";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/logout",
  "/forgot-password",
  "/community",
  "/community/:id/",
  "/community/:id/:slug",
  "/recipes",
  "/curiosities",
  "/payment/success",
  "/user/:id",
  "/user/:id/",
];
const AUTH_REDIRECT_ROUTES = ["/login", "/signup"];

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith("/recipes/")) return true;

  return PUBLIC_ROUTES.some((route) => {
    if (!route.includes(":")) return false;

    const pattern = route
      .replace(/\/$/, "")
      .replace(/\//g, "\\/")
      .replace(/:[^/]+/g, "[^/]+");

    return new RegExp(`^${pattern}/?$`).test(pathname);
  });
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const isServerExpired = searchParams.get("expired") === "true";

  const tokenCookie = request.cookies.get("token");
  const tokenValue = tokenCookie?.value;
  const isTokenValid =
    tokenValue && !isTokenExpired(tokenValue) && !isServerExpired;

  const isPublic = isPublicRoute(pathname);
  const isAuthRoute = AUTH_REDIRECT_ROUTES.includes(pathname);

  if (!isTokenValid) {
    if (isPublic) {
      const response = NextResponse.next();

      if (tokenValue) {
        response.cookies.delete("token");
      }
      return response;
    }

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
