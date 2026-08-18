"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, PhoneCall, MessagesSquare, Workflow, Globe, Smartphone } from "lucide-react";
import BookDemo from "./BookDemo";

const SERVICES = [
  { href: "https://callagent.lazyrabbit.in", Icon: PhoneCall, label: "AI Voice Agents", ext: true },
  { href: "/chatbot", Icon: MessagesSquare, label: "AI Chatbots" },
  { href: "/business-automation", Icon: Workflow, label: "Business Automation" },
  { href: "/web-development", Icon: Globe, label: "Web Development" },
  { href: "/app-development", Icon: Smartphone, label: "App Development" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button className="mobtn" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={22} /></button>
      {open && (
        <div className="mobile-menu">
          <div className="mm-head">
            <Link href="/" className="logo" onClick={close}>
              <Image src="/logo.png" alt="LazyRabbit" width={28} height={28} className="mark-img" />
              <span>LazyRabbit</span>
            </Link>
            <button className="mm-close" aria-label="Close menu" onClick={close}><X size={20} /></button>
          </div>

          <div className="mm-links">
            <Link href="/" onClick={close}>Home</Link>

            <div className="mm-section">Services</div>
            <div className="mm-sub">
              {SERVICES.map((s) =>
                s.ext ? (
                  <a key={s.href} href={s.href} onClick={close}><s.Icon className="mi" size={19} strokeWidth={1.75} />{s.label}</a>
                ) : (
                  <Link key={s.href} href={s.href} onClick={close}><s.Icon className="mi" size={19} strokeWidth={1.75} />{s.label}</Link>
                )
              )}
            </div>

            <Link href="/about" onClick={close}>About</Link>
            <Link href="/contact" onClick={close}>Contact</Link>
          </div>

          <div className="mm-cta">
            <BookDemo className="btn btn-primary" label="Book a demo →" />
          </div>
        </div>
      )}
    </>
  );
}
