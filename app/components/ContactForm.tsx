"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const NEEDS = ["AI Voice Agent", "AI Chatbot", "Business Automation", "Web / App Development", "Not sure yet"];

export default function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      service: String(fd.get("service") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };
    if (!payload.full_name || (!payload.email && !payload.phone)) {
      setErr("Please add your name and a phone or email.");
      return;
    }
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) setSent(true);
      else setErr(d.error || "Couldn’t send your message. Please try again.");
    } catch {
      setErr("Couldn’t reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="info-card reveal" style={{ padding: 32 }}>
        <CheckCircle2 size={34} strokeWidth={1.75} style={{ color: "var(--accent)" }} />
        <h3 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "12px 0 6px", letterSpacing: "-.02em" }}>Thanks — we’ve got it.</h3>
        <p className="muted-l" style={{ lineHeight: 1.6 }}>We usually reply within one business day. Prefer to talk now? Call <b>+91 90947 70827</b>.</p>
      </div>
    );
  }

  return (
    <form className="form reveal" onSubmit={submit}>
      <div className="field"><label>Name</label><input name="name" required placeholder="Your name" /></div>
      <div className="field"><label>Email</label><input name="email" type="email" placeholder="you@company.com" /></div>
      <div className="field"><label>Phone / WhatsApp</label><input name="phone" placeholder="+91 …" /></div>
      <div className="field">
        <label>What do you need?</label>
        <select name="service" defaultValue="">
          <option value="" disabled>Choose one…</option>
          {NEEDS.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="field"><label>Message</label><textarea name="message" rows={4} placeholder="Tell us about your business and what you’d love to automate…" /></div>
      {err && <div className="m-msg err" style={{ color: "#c0392b" }}>{err}</div>}
      <button className="btn btn-primary btn-lg" disabled={busy} style={{ justifyContent: "center" }}>
        {busy ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
