"use client";

import { useEffect, useState } from "react";
import DemoModal from "./DemoModal";

const SESSION_KEY = "lr_demo_seen";
const DISMISS_KEY = "lr_demo_dismissed";
const SUPPRESS_DAYS = 7;

// Auto-opens the live-demo dialog a few seconds after arrival — once per session, and not again for
// a week after someone dismisses it. The visitor can always close/cancel (or use the nav button).
export default function DemoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;                 // already offered this session
      const d = Number(localStorage.getItem(DISMISS_KEY) || 0);
      if (d && Date.now() - d < SUPPRESS_DAYS * 864e5) return;         // recently dismissed
    } catch { /* storage blocked — still fine to show once */ }
    const t = setTimeout(() => {
      setOpen(true);
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
    }, 7000);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch { /* ignore */ }
  }

  return <DemoModal open={open} onClose={close} />;
}
