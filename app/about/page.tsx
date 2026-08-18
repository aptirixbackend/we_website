import type { Metadata } from "next";
import { Target, Zap, Handshake } from "lucide-react";
import PageHero from "../components/PageHero";
import Stats from "../components/Stats";
import Cta from "../components/Cta";

export const metadata: Metadata = { title: "About" };

const VALUES = [
  { Icon: Target, h: "Outcomes, not demos", p: "We measure our work in hours saved and calls handled — not slides. If it doesn’t move a number, we don’t ship it." },
  { Icon: Zap, h: "Weeks, not quarters", p: "You see a working prototype fast. We’d rather show you something live than talk about it for a month." },
  { Icon: Handshake, h: "Partners, not vendors", p: "We stay after launch — tuning, improving and growing the system as your business does." },
];

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title={<>We automate the busywork,<br />so you do the <em className="serif it" style={{ color: "var(--accent)", fontWeight: 400 }}>work that matters.</em></>}
        sub="We’re a small, senior team of engineers and designers in Chennai building practical AI — voice agents, chatbots and automations that quietly run in the background of real businesses."
        secondary="Talk to us"
        secondaryHref="/contact"
      />

      <section className="sec-light band">
        <div className="wrap two">
          <div>
            <span className="eyebrow reveal">Why we exist</span>
            <h2 className="kicker reveal" style={{ marginTop: 18 }}>Great teams shouldn’t<br />drown in repetitive work.</h2>
            <p className="lead muted-l reveal" style={{ marginTop: 22 }}>
              Every business we meet has the same story: talented people spending their days answering
              the same calls, replying to the same messages, moving the same data between apps. We build
              the AI that takes that off their plate — so they can get back to the work only they can do.
            </p>
          </div>
          <div className="media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about_us_1.png" alt="Our team" />
          </div>
        </div>
      </section>

      <section className="sec-cream band">
        <div className="wrap">
          <span className="eyebrow reveal">How we work</span>
          <h2 className="kicker reveal" style={{ marginTop: 18 }}>Three things we won’t<br />compromise on.</h2>
          <div className="feature-grid">
            {VALUES.map((v) => (
              <div className="feature reveal" key={v.h}>
                <v.Icon className="fi" size={26} strokeWidth={1.75} />
                <h3>{v.h}</h3>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Cta />
    </main>
  );
}
