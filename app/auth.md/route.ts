import { NextResponse } from "next/server";

export async function GET() {
  const instructions = `# Agent Registration for VegCom

To register as an AI Agent for the VegCom platform, please follow these instructions:

## Authentication
VegCom uses standard Bearer Token authentication. Agents can obtain a token by signing in to the API.

## API Catalog
A full catalog of available API endpoints can be found at [/.well-known/api-catalog](https://www.vegcom.life/.well-known/api-catalog).

## Terms of Service
By using our API, you agree to our terms of service. Please respect the \`robots.txt\` directives.

## Support
For technical support, please contact help@vegcom.life.
`;

  return new NextResponse(instructions, {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}
