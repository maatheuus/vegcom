import { NextResponse } from "next/server";

export async function GET() {
  const apiBase = "https://api.vegcom.life/api/v1";

  const config = {
    issuer: apiBase,
    authorization_endpoint: `${apiBase}/auth/signin`, // Using the existing signin endpoint as placeholder or actual endpoint
    token_endpoint: `${apiBase}/auth/signin`, // In this case, it might be the same or handled by the backend
    jwks_uri: `${apiBase}/auth/jwks`,
    grant_types_supported: ["password", "refresh_token"],
    response_types_supported: ["token"],
    scopes_supported: ["read", "write"],
    agent_auth: {
      register_uri: "https://www.vegcom.life/auth.md",
      identity_types: ["email"],
      credential_types: ["password"],
    },
  };

  return NextResponse.json(config);
}
