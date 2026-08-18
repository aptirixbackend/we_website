import BookDemo from "./BookDemo";

export default function Hero() {
  return (
    <section className="hero sec-dark" id="top">
      <div className="grid-bg" />
      <div className="glow" />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <span className="eyebrow">AI Automation Studio</span>
        <h1 className="hero-h" style={{ marginTop: 22 }}>
          <span className="line"><span>Your business,</span></span>
          <span className="line">
            <span>
              running{" "}
              <em className="serif it" style={{ color: "var(--accent)", fontWeight: 400 }}>itself.</em>
            </span>
          </span>
        </h1>
        <p className="sub">
          We design AI voice agents, chatbots, and automations that handle the repetitive
          work — 24/7, for a fraction of the cost of hiring.
        </p>
        <div className="cta-row">
          <BookDemo className="btn btn-primary" label="Book a free demo call →" />
          <a href="#services" className="btn btn-ghost">See how it works</a>
        </div>
        <div className="trust">
          <div className="dots"><i /><i /><i /><i /></div>
          <div>Trusted by teams who’d rather build than do busywork.</div>
        </div>
      </div>
      <div className="scrollcue"><span>Scroll</span><span className="bar" /></div>
    </section>
  );
}
