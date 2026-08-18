const STATS = [
  { to: "3", suffix: "M+", l: "tasks handled by AI, hands-free" },
  { to: "50", suffix: "+", l: "businesses put on autopilot" },
  { to: "24", suffix: "/7", l: "always-on, never calls in sick" },
  { to: "70", suffix: "%", l: "less time on repetitive work" },
];

export default function Stats() {
  return (
    <section id="stats" className="sec-dark band">
      <div className="wrap">
        <span className="eyebrow reveal">Proven by results</span>
        <h2 className="kicker reveal" style={{ marginTop: 18, maxWidth: "18ch" }}>
          Numbers our clients<br />actually feel.
        </h2>
        <div className="stats-grid">
          {STATS.map((s) => (
            <div className="stat reveal" key={s.l}>
              <div className="n" data-to={s.to} data-suffix={s.suffix}>0</div>
              <div className="l">{s.l}</div>
              <div className="bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
