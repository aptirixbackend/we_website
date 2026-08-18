import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

const INFO = [
  { label: "Email us", value: "info@lazyrabbit.in" },
  { label: "Call us", value: "+91 90947 70827" },
  { label: "Hours", value: "Mon – Fri · 10 AM – 7 PM IST" },
  { label: "Visit", value: "Egmore, Chennai, Tamil Nadu" },
];

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={<>Let’s put your busywork<br />on <em className="serif it" style={{ color: "var(--accent)", fontWeight: 400 }}>autopilot.</em></>}
        sub="Tell us what slows your team down. We’ll come back with exactly what we’d automate first — and show you a live demo, no slides."
        primary="↓ Send a message"
        primaryHref="#form"
        secondary="See services"
        secondaryHref="/#services"
      />

      <section className="sec-light band" id="form">
        <div className="wrap two" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow reveal">Send a message</span>
            <h2 className="kicker reveal" style={{ margin: "18px 0 30px" }}>Tell us about<br />your business.</h2>
            <ContactForm />
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {INFO.map((i) => (
              <div className="info-card reveal" key={i.label}>
                <div className="ilabel">{i.label}</div>
                <div className="ival">{i.value}</div>
              </div>
            ))}
            <div className="info-card reveal" style={{ background: "linear-gradient(135deg,#0a0a0b,#161617)", color: "#fff", borderColor: "transparent" }}>
              <div className="ilabel">Live demo</div>
              <div className="ival" style={{ color: "#fff" }}>Want the AI to call <em className="serif it" style={{ color: "var(--accent)", fontWeight: 400 }}>you</em> right now?</div>
              <p className="muted-d" style={{ marginTop: 8, lineHeight: 1.55, fontSize: 14 }}>Leave your number and we’ll ring you with a live voice-agent demo in seconds.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
