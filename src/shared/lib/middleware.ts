import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(_request: NextRequest) {
  return NextResponse.next();
}

const REPORTER_COOKIE_NAME = "vg_rk";
const REPORTER_COOKIE_MAX_AGE = 31_536_000;

export async function ensureReporterKey(
  request: NextRequest,
  response: NextResponse,
) {
  const secret = process.env.REPORTER_KEY_SECRET;
  const value = request.cookies.get(REPORTER_COOKIE_NAME)?.value;
  // Shared with api.vegcom.life so the API receives the reporter key.
  const domain = request.nextUrl.hostname.endsWith("vegcom.life")
    ? ".vegcom.life"
    : undefined;

  if (secret && value && (await isValidReporterKey(value, secret))) {
    // Re-set so keys issued before the domain change become visible to the API.
    if (domain) setReporterCookie(response, value, domain);
    return response;
  }

  if (!secret) return response;

  const uuid = crypto.randomUUID();
  const issuedAt = Math.floor(Date.now() / 1000);
  const signature = await signReporterKey(`${uuid}.${issuedAt}`, secret);
  setReporterCookie(response, `${uuid}.${issuedAt}.${signature}`, domain);
  return response;
}

function setReporterCookie(
  response: NextResponse,
  value: string,
  domain: string | undefined,
) {
  response.cookies.set(REPORTER_COOKIE_NAME, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: REPORTER_COOKIE_MAX_AGE,
    domain,
  });
}

async function isValidReporterKey(value: string, secret: string) {
  const [uuid, issuedAtValue, signature] = value.split(".");
  const issuedAt = Number(issuedAtValue);
  const now = Math.floor(Date.now() / 1000);
  if (
    !isUuidV4(uuid) ||
    !Number.isInteger(issuedAt) ||
    issuedAt > now ||
    now - issuedAt > REPORTER_COOKIE_MAX_AGE ||
    !signature
  ) {
    return false;
  }

  const key = await getSigningKey(secret, ["verify"]);
  return crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBytes(signature),
    new TextEncoder().encode(`${uuid}.${issuedAt}`),
  );
}

async function signReporterKey(value: string, secret: string) {
  const key = await getSigningKey(secret, ["sign"]);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return bytesToBase64Url(new Uint8Array(signature));
}

function getSigningKey(secret: string, usages: KeyUsage[]) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usages,
  );
}

function bytesToBase64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

function isUuidV4(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}
