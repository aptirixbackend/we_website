import { NextResponse } from "next/server";

// The deployed call-agent backend. Override with CALL_BACKEND_URL if it ever changes.
const BACKEND = process.env.CALL_BACKEND_URL || "https://lazyrabbitcallagent-610696728606.asia-south1.run.app";

export async function POST(request: Request) {
  let b: Record<string, string>;
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const full_name = (b.full_name ?? b.name ?? "").trim();
  const email = (b.email ?? "").trim();
  const phone = (b.phone ?? "").trim();
  if (!full_name && !email && !phone) {
    return NextResponse.json({ error: "Please add your name and a phone or email." }, { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name, email, phone,
        service: (b.service ?? "").trim(),
        message: (b.message ?? "").trim(),
        source: "lazyrabbit.in",
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Couldn’t save your message. Please try again or email us." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Couldn’t reach the server. Please try again." }, { status: 502 });
  }
}
