import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.vegcom.life";

  const robots = `User-agent: *
Allow: /
Allow: /recipes
Allow: /curiosities
Allow: /user
Disallow: /chat/
Disallow: /account/
Disallow: /payment/
Disallow: /new-recipe/
Disallow: /edit-recipe/
Disallow: /api/
Disallow: /*?*

# Content Signals for AI Discovery
Content-Signal: ai-train=no, search=yes, ai-input=no

Sitemap: ${baseUrl}/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
