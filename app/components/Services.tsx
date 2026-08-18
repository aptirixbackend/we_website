import Link from "next/link";
import { PhoneCall, MessagesSquare, Workflow, MonitorSmartphone } from "lucide-react";

const SERVICES = [
  { n: "01", Icon: PhoneCall, t: "AI Voice Agents", href: "https://callagent.lazyrabbit.in", ext: true, d: "Human-sounding agents that make and take calls — booking, reminders, follow-ups, support — in your customer’s language, around the clock." },
  { n: "02", Icon: MessagesSquare, t: "AI Chatbots", href: "/chatbot", d: "On your site and WhatsApp, answering questions, qualifying leads and closing the loop while you sleep — trained on your business." },
  { n: "03", Icon: Workflow, t: "Business Automation", href: "/business-automation", d: "The invisible glue: data moving between your tools, reports writing themselves, approvals that just happen. No more copy-paste." },
  { n: "04", Icon: MonitorSmartphone, t: "Web & App Development", href: "/web-development", d: "Fast, beautiful sites and apps — with the AI baked in from day one, not bolted on later." },
];

export default function Services() {
  return (
    <section id="services" className="sec-cream band">
      <div className="wrap">
        <div className="svc-head">
          <div>
            <span className="eyebrow reveal">What we build</span>
            <h2 className="kicker reveal" style={{ marginTop: 18 }}>
              Four ways we<br />take work off your plate.
            </h2>
          </div>
          <p className="lead muted-l reveal">
            Each one is custom-built to your workflows and live in weeks, not months.
          </p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => {
            const inner = (
              <>
                <div className="glowc" />
                <s.Icon className="ic" size={26} strokeWidth={1.75} />
                <div className="num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="svc-go">Learn more →</span>
              </>
            );
            return s.ext ? (
              <a className="svc reveal" key={s.n} href={s.href}>{inner}</a>
            ) : (
              <Link className="svc reveal" key={s.n} href={s.href}>{inner}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
