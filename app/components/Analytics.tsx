"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, initAnalytics } from "../lib/track";

// EEA + UK (+ Switzerland) — where non-essential/analytics cookies legally need prior opt-in.
const OPT_IN_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",   // EU
  "IS", "LI", "NO",                                                          // rest of EEA
  "GB", "CH",                                                                // UK, Switzerland
]);

type Mode = "deciding" | "optin" | "info" | "hidden";

// Cookie-consent banner. In EU/UK it asks (opt-in — nothing set until Accept); elsewhere it grants
// privacy-friendly analytics by default and simply informs (dismissible). Mounted once in the layout.
export default function Analytics() {
  const [mode, setMode] = useState<Mode>("deciding");

  useEffect(() => {
    initAnalytics();                                   // resume if consent was granted before
    const prior = getConsent();
    if (prior === "granted" || prior === "denied") { setMode("hidden"); return; }

    let alive = true;
    (async () => {
      let optIn = true;                                // if geo is unknown, use the stricter opt-in
      try {
        const r = await fetch("/api/geo", { cache: "no-store" });
        const cc = ((await r.json())?.country || "").toUpperCase();
        optIn = cc ? OPT_IN_COUNTRIES.has(cc) : true;
      } catch { optIn = true; }
      if (!alive) return;
      if (optIn) {
        setMode("optin");
      } else {
        setConsent("granted");                         // info-only regions: analytics on by default
        setMode("info");
      }
    })();
    return () => { alive = false; };
  }, []);

  function decide(v: "granted" | "denied") { setConsent(v); setMode("hidden"); }

  if (mode === "deciding" || mode === "hidden") return null;

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie notice" style={S.wrap}>
      <div style={S.card}>
        <div style={S.text}>
          <strong style={S.title}>We use cookies</strong>
          <p style={S.body}>
            {mode === "optin"
              ? "We use privacy-friendly analytics cookies to understand how visitors use this site and improve it. No ads, no selling your data."
              : "We use privacy-friendly analytics cookies to improve this site. No ads, no selling your data."}{" "}
            See our <Link href="/privacy" style={S.link}>Privacy Policy</Link>.
          </p>
        </div>
        <div style={S.actions}>
          {mode === "optin" ? (
            <>
              <button type="button" onClick={() => decide("denied")} style={S.decline}>Decline</button>
              <button type="button" onClick={() => decide("granted")} style={S.accept}>Accept</button>
            </>
          ) : (
            <button type="button" onClick={() => setMode("hidden")} style={S.accept}>Got it</button>
          )}
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
