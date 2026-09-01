"use client";

import { useEffect, useRef, useState } from "react";
import { isReturning } from "../lib/track";

const KEY = "lr_welcomed";

// A LazyRabbit mascot greeting for visitors this browser has seen before (via the analytics visitor
// cookie). The rabbit slides in bottom-right with a speech bubble and idles with a gentle bob; it
// stays until the visitor closes it or taps anywhere else. Once per session; no-op for new visitors.
export default function WelcomeBack() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { if (sessionStorage.getItem(KEY)) return; } catch { /* ignore */ }
    const reveal = () => {
      if (!isReturning()) return;
      try { if (sessionStorage.getItem(KEY)) return; sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
      setShow(true);
    };
    reveal();                                       // analytics may already have started
    window.addEventListener("lr:started", reveal);  // …or react when it does
    return () => window.removeEventListener("lr:started", reveal);
  }, []);

  // Dismiss when tapping/clicking anywhere outside the greeting.
  useEffect(() => {
    if (!show) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
    };
    const t = setTimeout(() => document.addEventListener("mousedown", onDown), 60);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", onDown); };
  }, [show]);

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes lrWelcomeIn { from { opacity: 0; transform: translateY(30px) scale(.96); } to { opacity: 1; transform: none; } }
        @keyframes lrRabbitBob { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-9px) rotate(-3deg); } }
        @keyframes lrBubblePop { 0% { opacity: 0; transform: translateY(8px) scale(.85); } 100% { opacity: 1; transform: none; } }
        .lr-welcome { position: fixed; right: 20px; bottom: 20px; z-index: 280; display: flex;
          flex-direction: column; align-items: flex-end; gap: 4px; pointer-events: none;
          animation: lrWelcomeIn .5s cubic-bezier(.16,1,.3,1) both; }
        .lr-welcome > * { pointer-events: auto; }
        .lr-welcome-bubble { position: relative; max-width: 250px; margin-right: 16px; padding: 14px 16px;
          border-radius: 16px; border: 1px solid rgba(255,255,255,.12); background: rgba(14,14,16,.94);
          backdrop-filter: blur(16px) saturate(1.4); -webkit-backdrop-filter: blur(16px) saturate(1.4);
          box-shadow: 0 18px 44px rgba(0,0,0,.5); color: #f5f5f4;
          animation: lrBubblePop .45s .12s cubic-bezier(.16,1,.3,1) both; }
        .lr-welcome-bubble::after { content: ""; position: absolute; right: 26px; bottom: -7px; width: 14px; height: 14px;
          background: rgba(14,14,16,.94); border-right: 1px solid rgba(255,255,255,.12);
          border-bottom: 1px solid rgba(255,255,255,.12); transform: rotate(45deg); }
        .lr-welcome-rabbit { width: 136px; height: auto; display: block; transform-origin: bottom center;
          filter: drop-shadow(0 12px 22px rgba(0,0,0,.45)); animation: lrRabbitBob 3.2s ease-in-out infinite; }
        .lr-welcome-x { position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.05); color: #c7c7cc;
          cursor: pointer; font-size: 14px; line-height: 1; }
        @media (prefers-reduced-motion: reduce) {
          .lr-welcome, .lr-welcome-bubble, .lr-welcome-rabbit { animation: none !important; }
        }
        @media (max-width: 520px) {
          .lr-welcome { right: 12px; bottom: 12px; }
          .lr-welcome-rabbit { width: 106px; } .lr-welcome-bubble { max-width: 210px; }
        }
      `}</style>
      <div className="lr-welcome" ref={ref} role="status" aria-live="polite">
        <div className="lr-welcome-bubble">
          <button type="button" className="lr-welcome-x" onClick={() => setShow(false)} aria-label="Dismiss">×</button>
          <strong style={{ display: "block", fontSize: 14.5, fontWeight: 800, letterSpacing: "-.01em", paddingRight: 22 }}>
            Welcome back! 👋
          </strong>
          <span style={{ display: "block", marginTop: 4, fontSize: 12.5, lineHeight: 1.5, color: "#a9a9b0" }}>
            Great to see you again — ready to put your busywork on autopilot?
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/side_rabbit.png" alt="LazyRabbit" className="lr-welcome-rabbit" />
      </div>
    </>
  );
}
