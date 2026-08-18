import { NextResponse } from "next/server";

// The deployed call-agent backend. Override with CALL_BACKEND_URL if it ever changes.
const BACKEND = process.env.CALL_BACKEND_URL || "https://call-agent-lazyrabbit-120328177322.asia-south1.run.app";

// Script the website demo call uses. Override with CALL_DEMO_PROMPT_ID.
const DEMO_PROMPT_ID = process.env.CALL_DEMO_PROMPT_ID || "lazlazyb77562";
const DEMO_LANGUAGE = process.env.CALL_DEMO_LANGUAGE || "tamil";

export async function POST(request: Request) {
  let body: { to_number?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const toNumber = (body.to_number ?? "").trim();
  // E.164 sanity check, e.g. +919094770827
  if (!/^\+\d{10,15}$/.test(toNumber)) {
    return NextResponse.json({ error: "Enter a valid number with country code, e.g. +91…" }, { status: 400 });
  }

  // Always save the lead first (best effort — never block the call on it).
  try {
    await fetch(`${BACKEND}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: (body.name ?? "").trim(),
        phone: toNumber,
        service: "AI Voice Agent (Demo Call)",
        message: "Requested a live demo call from the website.",
        source: "lazyrabbit.in",
      }),
    });
  } catch {
    /* capturing the lead is a bonus; the call is the priority */
  }

  const token = process.env.LAZYRABBIT_CALL_TOKEN;
  if (!token) {
    // Lead is saved; the outbound call just isn't configured on this deployment yet.
    return NextResponse.json(
      { error: "Thanks — we saved your details and will call you shortly.", saved: true },
      { status: 202 },
    );
  }

  try {
    const res = await fetch(`${BACKEND}/api/v1/call`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ to_number: toNumber, prompt_id: DEMO_PROMPT_ID, language: DEMO_LANGUAGE }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json({ error: "We couldn’t start the call. Please try again." }, { status: res.status });
    }
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ error: "Something went wrong reaching the call service." }, { status: 502 });
  }
}
