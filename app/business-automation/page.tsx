import type { Metadata } from "next";
import { Share2, FileBarChart, BellRing, FileText, Bot, TrendingUp } from "lucide-react";
import ServicePage, { type Service } from "../components/ServicePage";

export const metadata: Metadata = { title: "Business Automation" };

const s: Service = {
  eyebrow: "Business Automation",
  title: <>The busywork,<br /><em className="serif it" style={{ color: "var(--accent)", fontWeight: 400 }}>handled.</em></>,
  sub: "The invisible glue behind a smooth-running business: data moving between your tools, reports writing themselves, approvals that just happen. No more copy-paste, no more “did anyone update the sheet?”",
  pitch: <>We connect your tools so the work runs itself.</>,
  features: [
    { Icon: Share2, h: "Tools that talk", p: "We wire your apps together — CRM, sheets, billing, WhatsApp — so data flows without anyone lifting a finger." },
    { Icon: FileBarChart, h: "Reports on autopilot", p: "Daily and weekly numbers assembled and delivered automatically, to the right people." },
    { Icon: BellRing, h: "Approvals & alerts", p: "Requests routed, reminders sent, exceptions flagged — before they become problems." },
    { Icon: FileText, h: "Docs & invoices", p: "Invoices, quotes and confirmations generated and sent the moment they’re needed." },
    { Icon: Bot, h: "AI in the loop", p: "AI reads, summarises and decides on the messy steps a rules-engine can’t handle." },
    { Icon: TrendingUp, h: "Scales with you", p: "Handle 10× the volume without hiring 10× the team." },
  ],
  uses: ["CRM & data sync", "Automated reporting", "Invoice & document flows", "Onboarding workflows", "Inventory & orders", "Alerts & escalations"],
  img: "/business_1.png",
  imgAlt: "Business automation",
};

export default function Page() {
  return <ServicePage s={s} />;
}
