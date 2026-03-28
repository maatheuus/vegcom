import { NextResponse, type NextRequest } from "next/server";

const AUTH_REDIRECT_ROUTES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AUTH_REDIRECT_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup"],
};
