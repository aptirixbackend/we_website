import type { Metadata } from "next";
import { Smartphone, Layers, Palette, Sparkles, Plug, Rocket } from "lucide-react";
import ServicePage, { type Service } from "../components/ServicePage";

export const metadata: Metadata = { title: "App Development" };

const s: Service = {
  eyebrow: "App Development",
  title: <>Mobile apps your customers<br />actually <em className="serif it" style={{ color: "var(--accent)", fontWeight: 400 }}>love to use.</em></>,
  sub: "iOS and Android apps — designed, built and shipped fast, with AI features and your business logic baked right in.",
  pitch: <>Native-feel apps, shipped quickly.</>,
  features: [
    { Icon: Smartphone, h: "iOS & Android", p: "One codebase, both stores — smooth, native-feeling apps your users enjoy." },
    { Icon: Layers, h: "Cross-platform", p: "Built with a modern cross-platform stack so you ship faster and maintain less." },
    { Icon: Palette, h: "Design-led", p: "Thoughtful, on-brand UI — not a stretched-out website in an app shell." },
    { Icon: Sparkles, h: "AI-native", p: "Chat, voice and smart automation built in from the first screen." },
    { Icon: Plug, h: "Integrated", p: "Payments, notifications, maps and the tools you already run on, wired in." },
    { Icon: Rocket, h: "Launch-ready", p: "We handle store submission, and keep improving after launch." },
  ],
  uses: ["Consumer apps", "Internal tools", "Booking & delivery", "Marketplaces", "Loyalty & rewards", "MVPs"],
  img: "/app_1.png",
  imgAlt: "Mobile app development",
};

export default function Page() {
  return <ServicePage s={s} />;
}
