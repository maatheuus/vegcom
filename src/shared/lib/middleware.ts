/**
 * Middleware utilities - Fake implementation
 */

import { NextResponse, type NextRequest } from "next/server";

/**
 * Updates the user session.
 *
 * This is currently a fake implementation that simply returns `NextResponse.next()`.
 * It should be replaced with a real session update logic (e.g., refreshing tokens)
 * when the backend is ready.
 *
 * @param {NextRequest} _request - The incoming request object.
 * @returns {Promise<NextResponse>} The response to proceed with the request.
 */
export async function updateSession(_request: NextRequest) {
  return NextResponse.next();
}
