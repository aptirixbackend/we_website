const STEPS = [
  { n: "01", h: "Discover", p: "We map where your hours actually go and find the tasks AI can take over first.", t: "Week 1" },
  { n: "02", h: "Design", p: "We design the agent or automation around your real workflow — and show you a working prototype.", t: "Week 1–2" },
  { n: "03", h: "Deploy", p: "We launch it into your tools, your number, your site — and watch it closely as it starts working.", t: "Week 2–3" },
  { n: "04", h: "Improve", p: "We keep tuning it as it learns — more handled, fewer handoffs, every single week.", t: "Ongoing" },
];

export default function Process() {
  return (
    <section id="process" className="sec-light band">
      <div className="wrap">
        <span className="eyebrow reveal">How we work</span>
        <h2 className="kicker reveal" style={{ marginTop: 18 }}>
          From “what if” to live<br />in four steps.
        </h2>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step reveal" key={s.n}>
              <div className="s-n">{s.n}</div>
              <div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
              <div className="t">{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
