/**
 * Middleware utilities - Fake implementation
 */

import { NextResponse, type NextRequest } from "next/server";

/**
 * Fake updateSession - does nothing, just returns next()
 * Replace with real implementation when backend is ready
 */
export async function updateSession(_request: NextRequest) {
  return NextResponse.next();
}
