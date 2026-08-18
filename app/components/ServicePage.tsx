import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import PageHero from "./PageHero";
import Cta from "./Cta";

export type Service = {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  pitch: ReactNode;
  features: { Icon: LucideIcon; h: string; p: string }[];
  uses: string[];
  img?: string;
  imgAlt?: string;
};

export default function ServicePage({ s }: { s: Service }) {
  return (
    <main>
      <PageHero eyebrow={s.eyebrow} title={s.title} sub={s.sub} />

      <section className="sec-light band">
        <div className="wrap">
          <span className="eyebrow reveal">What it does</span>
          <h2 className="kicker reveal" style={{ marginTop: 18, maxWidth: "20ch" }}>{s.pitch}</h2>
          <div className="feature-grid">
            {s.features.map((f) => (
              <div className="feature reveal" key={f.h}>
                <f.Icon className="fi" size={26} strokeWidth={1.75} />
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-cream band">
        <div className="wrap two">
          <div>
            <span className="eyebrow reveal">Perfect for</span>
            <h2 className="kicker reveal" style={{ marginTop: 18 }}>Built for the way<br />you actually work.</h2>
            <div className="uses">
              {s.uses.map((u) => <span className="use reveal" key={u}>{u}</span>)}
            </div>
          </div>
          {s.img && (
            <div className="media reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.imgAlt || ""} />
            </div>
          )}
        </div>
      </section>

      <Cta />
    </main>
  );
}
