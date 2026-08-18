import Link from "next/link";
import BookDemo from "./BookDemo";

export default function Cta() {
  return (
    <section id="cta" className="sec-dark band">
      <div className="glow" />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <span className="eyebrow reveal" style={{ display: "flex", justifyContent: "center" }}>Let’s talk</span>
        <h2 className="reveal" style={{ marginTop: 26 }}>
          Ready to put your busywork on{" "}
          <em className="serif it" style={{ color: "var(--accent)", fontWeight: 400 }}>autopilot?</em>
        </h2>
        <p className="lead muted-d reveal" style={{ margin: "26px auto 0", textAlign: "center" }}>
          Book a free 20-minute call. We’ll show you exactly what we’d automate first — no
          slides, just a live demo.
        </p>
        <div className="reveal" style={{ marginTop: 38, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <BookDemo className="btn btn-primary btn-lg" label="Book a free call →" />
          <Link href="/#services" className="btn btn-ghost btn-lg">Explore services</Link>
        </div>
      </div>
    </section>
  );
}
