"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, initAnalytics } from "../lib/track";

// Renders the cookie-consent banner and starts first-party analytics only after the visitor
// accepts. Mounted once in the root layout. Server render outputs nothing (hydration-safe);
// the banner appears client-side only when no choice has been recorded yet.
export default function Analytics() {
  const [choice, setChoice] = useState<"granted" | "denied" | "" | null>(null);

  useEffect(() => {
    initAnalytics();          // resume tracking if consent was granted on a previous visit
    setChoice(getConsent());  // "" → show the banner
  }, []);

  function decide(v: "granted" | "denied") {
    setConsent(v);
    setChoice(v);
  }

  if (choice === null || choice === "granted" || choice === "denied") return null;

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie consent" style={S.wrap}>
      <div style={S.card}>
        <div style={S.text}>
          <strong style={S.title}>We use cookies</strong>
          <p style={S.body}>
            We use privacy-friendly analytics cookies to understand how visitors use this site and
            improve it. No ads, no selling your data. See our{" "}
            <Link href="/privacy" style={S.link}>Privacy Policy</Link>.
          </p>
        </div>
        <div style={S.actions}>
          <button type="button" onClick={() => decide("denied")} style={S.decline}>Decline</button>
          <button type="button" onClick={() => decide("granted")} style={S.accept}>Accept</button>
        </div>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  wrap: {
    position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 300,
    display: "flex", justifyContent: "center", padding: "0 18px 18px", pointerEvents: "none",
  },
  card: {
    pointerEvents: "auto",
    display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap",
    width: "min(880px, 100%)", padding: "16px 20px",
    borderRadius: 16, border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(14,14,16,.92)",
    backdropFilter: "blur(16px) saturate(1.4)", WebkitBackdropFilter: "blur(16px) saturate(1.4)",
    boxShadow: "0 20px 50px rgba(0,0,0,.5)", color: "#f5f5f4",
  },
  text: { flex: "1 1 300px", minWidth: 0 },
  title: { display: "block", fontSize: 15, fontWeight: 800, letterSpacing: "-.01em", marginBottom: 4 },
  body: { color: "#a9a9b0", fontSize: 13.5, lineHeight: 1.55, margin: 0 },
  link: { color: "#F93C02", textDecoration: "underline", textUnderlineOffset: 2 },
  actions: { display: "flex", gap: 10, flexShrink: 0 },
  decline: {
    height: 40, padding: "0 18px", borderRadius: 11, cursor: "pointer",
    border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.05)",
    color: "#fff", fontWeight: 600, fontSize: 14, font: "inherit",
  },
  accept: {
    height: 40, padding: "0 22px", borderRadius: 11, cursor: "pointer", border: 0,
    background: "linear-gradient(135deg,#F93C02,#d83303)", color: "#fff",
    fontWeight: 700, fontSize: 14, boxShadow: "0 6px 20px rgba(249,60,2,.32)",
  },
};
