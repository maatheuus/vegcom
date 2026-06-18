import { NextResponse } from "next/server";

export async function GET() {
  const apiBase = "https://www.vegcombe.life/api/v1";

  const resource = {
    resource: apiBase,
    authorization_servers: [apiBase],
    scopes_supported: ["read", "write"],
  };

  return NextResponse.json(resource);
}
