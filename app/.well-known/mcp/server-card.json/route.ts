import { NextResponse } from "next/server";

export async function GET() {
  const card = {
    serverInfo: {
      name: "VegCom API",
      version: "1.0.0",
    },
    transport: {
      type: "http",
      endpoint: "https://api.vegcom.life/api/v1",
    },
    capabilities: {
      resources: {
        subscribe: true,
      },
      tools: {
        list: true,
      },
    },
  };

  return NextResponse.json(card);
}
