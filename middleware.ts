import { NextResponse, type NextRequest } from "next/server";
import { ensureReporterKey } from "./src/shared/lib/middleware";

const AUTH_REDIRECT_ROUTES = ["/login", "/signup"];
const REPORTER_KEY_ROUTES = ["/explore"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle Markdown for Agents
  const accept = request.headers.get("accept");
  if (
    accept?.includes("text/markdown") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.includes(".")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown-render";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  if (AUTH_REDIRECT_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const needsReporterKey = REPORTER_KEY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  if (needsReporterKey) {
    return ensureReporterKey(request, response);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
