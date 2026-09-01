import { NextResponse } from "next/server";

// Returns the visitor's 2-letter country code from the CDN's geo headers (Vercel / Cloudflare),
// used only to decide which cookie banner to show. The IP itself is never read or stored here.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const h = req.headers;
  const country = (
    h.get("x-vercel-ip-country") ||
    h.get("cf-ipcountry") ||
    h.get("x-country-code") ||
    ""
  ).toUpperCase();
  return NextResponse.json({ country }, { headers: { "Cache-Control": "no-store" } });
}
