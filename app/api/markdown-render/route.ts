import { NextRequest, NextResponse } from "next/server";
import TurndownService from "turndown";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path") || "/";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vegcom.life";
  const targetUrl = `${baseUrl}${path}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        // Fetch as HTML to convert it
        "Accept": "text/html",
      },
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch content from ${path}`, { status: response.status });
    }

    const html = await response.text();

    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
    });

    // Remove scripts, styles and other non-content elements
    turndownService.remove(["script", "style", "noscript", "iframe", "header", "footer", "nav"]);

    const markdown = turndownService.turndown(html);

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        "X-Markdown-Tokens": "true",
      },
    });
  } catch (error) {
    console.error("Markdown conversion error:", error);
    return new NextResponse("Error converting content to markdown", { status: 500 });
  }
}
