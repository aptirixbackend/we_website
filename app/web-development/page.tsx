import type { Metadata } from "next";
import { Globe, Gauge, Palette, Sparkles, ShoppingCart, ShieldCheck } from "lucide-react";
import ServicePage, { type Service } from "../components/ServicePage";

export const metadata: Metadata = { title: "Web Development" };

const s: Service = {
  eyebrow: "Web Development",
  title: <>Websites that are fast,<br />beautiful, and <em className="serif it" style={{ color: "var(--accent)", fontWeight: 400 }}>built to convert.</em></>,
  sub: "Marketing sites, dashboards and full SaaS products — designed, not templated, and engineered to load instantly with AI baked in from day one.",
  pitch: <>Design-led builds, engineered to perform.</>,
  features: [
    { Icon: Globe, h: "Marketing sites", p: "Landing pages and company sites that look premium and turn visitors into leads." },
    { Icon: Gauge, h: "Fast by default", p: "Built on a modern stack (Next.js) for instant loads and top Core Web Vitals." },
    { Icon: Palette, h: "Design-led", p: "Every screen is designed to your brand — no cookie-cutter templates." },
    { Icon: Sparkles, h: "AI-native", p: "Chat, voice and automation built into the product, not bolted on later." },
    { Icon: ShoppingCart, h: "SaaS & e-commerce", p: "Dashboards, portals and stores with payments and auth wired in." },
    { Icon: ShieldCheck, h: "Built to last", p: "Clean, maintainable code and a stack that scales as you grow." },
  ],
  uses: ["Marketing websites", "SaaS products", "Admin dashboards", "E-commerce", "Landing pages", "Web apps"],
  img: "/web_dev.png",
  imgAlt: "Web development",
};

export default function Page() {
  return <ServicePage s={s} />;
}
