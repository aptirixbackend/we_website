import type { ReactNode } from "react";

export function H({ children }: { children: ReactNode }) {
  return <h2 className="lh">{children}</h2>;
}

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main>
      <section className="page-hero sec-dark" style={{ paddingBottom: 44 }}>
        <div className="glow" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <span className="eyebrow">Legal</span>
          <h1 style={{ marginTop: 18, fontSize: "clamp(2.4rem,5vw,4rem)" }}>{title}</h1>
          <p className="sub" style={{ marginTop: 14 }}>Last updated {updated}</p>
        </div>
      </section>
      <section className="sec-light band" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className="legal">{children}</div>
        </div>
      </section>
    </main>
  );
}
