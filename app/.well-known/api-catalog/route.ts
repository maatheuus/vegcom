import { NextResponse } from "next/server";

export async function GET() {
  const apiBase = "https://api.vegcom.life/api/v1";
  const siteBase = "https://www.vegcom.life";

  const catalog = {
    linkset: [
      {
        anchor: `${apiBase}`,
        "service-desc": [
          {
            href: `${apiBase}/docs-json`, // Assuming standard NestJS/Swagger JSON path
            type: "application/openapi+json;version=3.0",
          },
        ],
        "service-doc": [
          {
            href: `${apiBase}/docs`,
            type: "text/html",
          },
        ],
        status: [
          {
            href: `${apiBase}/health`,
            type: "application/json",
          },
        ],
      },
    ],
  };

  return NextResponse.json(catalog, {
    headers: {
      "Content-Type": "application/linkset+json",
    },
  });
}
