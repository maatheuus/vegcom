import { NextResponse, type NextRequest } from "next/server";

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

// const publicRoutes = [
//   { path: "/", whenAuthenticated: "next" },
//   { path: "/login", whenAuthenticated: "redirect" },
//   { path: "/signup", whenAuthenticated: "redirect" },
//   { path: "/community", whenAuthenticated: "next" },
//   { path: "/recipes", whenAuthenticated: "next" },
//   { path: "/recipes/[recipeId]", whenAuthenticated: "next" },
//   // { path: "/chat", whenAuthenticated: "redirect" },
//   // { path: "/ask-your-questions", whenAuthenticated: "redirect" },
// ] as const;
const publicRoutes = [
  { pattern: /^\/$/, whenAuthenticated: "next" },
  { pattern: /^\/login$/, whenAuthenticated: "redirect" },
  { pattern: /^\/signup$/, whenAuthenticated: "redirect" },
  { pattern: /^\/community$/, whenAuthenticated: "next" },
  { pattern: /^\/recipes$/, whenAuthenticated: "next" },
  { pattern: /^\/recipes\/[^\/]+$/, whenAuthenticated: "next" },
  { pattern: /^\/new-recipe$/, whenAuthenticated: "next" },
  { pattern: /^\/account$/, whenAuthenticated: "next" },
  { pattern: /^\/account\/[^\/]+$/, whenAuthenticated: "next" },
  { pattern: /^\/chat$/, whenAuthenticated: "next" },
  { pattern: /^\/curiosities$/, whenAuthenticated: "next" },
] as const;

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find(({ pattern }) => pattern.test(path));
  const authToken = request.cookies.get("token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
