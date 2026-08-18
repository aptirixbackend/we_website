import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow, title, sub, primary = "Book a free demo →", primaryHref = "/contact",
  secondary = "All services", secondaryHref = "/#services",
}: {
  eyebrow: string; title: ReactNode; sub: string;
  primary?: string; primaryHref?: string; secondary?: string; secondaryHref?: string;
}) {
  return (
    <section className="page-hero sec-dark">
      <div className="glow" />
      <div className="grid-bg" style={{ opacity: 0.35 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <span className="eyebrow reveal">{eyebrow}</span>
        <h1 className="reveal">{title}</h1>
        <p className="sub reveal">{sub}</p>
        <div className="reveal" style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href={primaryHref} className="btn btn-primary btn-lg">{primary}</Link>
          <Link href={secondaryHref} className="btn btn-ghost btn-lg">{secondary}</Link>
        </div>
      </div>
    </section>
  );
}
