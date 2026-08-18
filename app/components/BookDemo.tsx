"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PhoneCall, CheckCircle2, X } from "lucide-react";

function normPhone(v: string): string {
  const s = v.replace(/[^\d+]/g, "");
  if (s.startsWith("+")) return s;
  if (/^\d{10}$/.test(s)) return "+91" + s;
  if (/^91\d{10}$/.test(s)) return "+" + s;
  if (/^0\d{10}$/.test(s)) return "+91" + s.slice(1);
  return s ? "+" + s : s;
}

type State = "form" | "calling" | "called" | "saved" | "err";

export default function BookDemo({ className, label }: { className?: string; label: string }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<State>("form");
  const [msg, setMsg] = useState("");

  useEffect(() => setMounted(true), []);

  // Lock background scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    setTimeout(() => { setState("form"); setMsg(""); }, 220);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const to = normPhone(phone);
    if (!/^\+\d{10,15}$/.test(to)) {
      setState("err"); setMsg("Enter a valid number with country code, e.g. +91…");
      return;
    }
    setState("calling"); setMsg("");
    try {
      const r = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), to_number: to }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) setState("called");
      else if (r.status === 202) setState("saved");
      else { setState("err"); setMsg(d.error || "Something went wrong. Please try again."); }
    } catch {
      setState("err"); setMsg("Couldn’t reach the server. Please try again.");
    }
  }

  const success = state === "called" || state === "saved";

  const modal = (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="m-close" onClick={close} aria-label="Close"><X size={16} strokeWidth={2} /></button>

        {success ? (
          <div className="m-state">
            <div className="m-icon" style={{ margin: "0 auto 18px" }}>
              {state === "called" ? <PhoneCall size={26} strokeWidth={2} /> : <CheckCircle2 size={26} strokeWidth={2} />}
            </div>
            <h3>{state === "called" ? "Calling you now" : "You’re on the list"}</h3>
            <p className="m-sub">
              {state === "called"
                ? "Your phone will ring in a few seconds — pick up and say hello."
                : "We’ve saved your number and our team will call you back shortly."}
            </p>
            <button className="btn btn-ghost" style={{ marginTop: 22, justifyContent: "center", width: "100%" }} onClick={close}>Done</button>
          </div>
        ) : (
          <>
            <div className="m-icon"><PhoneCall size={26} strokeWidth={2} /></div>
            <div className="m-eyebrow">Live demo</div>
            <h3>Let our AI call you.</h3>
            <p className="m-sub">Drop your number and our AI voice agent rings you in seconds — hear it for yourself, no forms, no wait.</p>
            <form className="m-form" onSubmit={submit}>
              <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              <input placeholder="Phone with country code, e.g. +91…" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoFocus required />
              {state === "err" && <div className="m-msg err">{msg}</div>}
              <button className="btn btn-primary" disabled={state === "calling"} style={{ justifyContent: "center", height: 50 }}>
                {state === "calling" ? "Starting the call…" : "Call me now →"}
              </button>
            </form>
            <p className="m-fine">No spam — we only use your number to call you back.</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>{label}</button>
      {mounted && open && createPortal(modal, document.body)}
    </>
  );
}
