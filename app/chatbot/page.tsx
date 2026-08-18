import type { Metadata } from "next";
import { MessagesSquare, Brain, Zap, Target, ShoppingCart, Plug } from "lucide-react";
import ServicePage, { type Service } from "../components/ServicePage";

export const metadata: Metadata = { title: "AI Chatbots" };

const s: Service = {
  eyebrow: "AI Chatbots",
  title: <>A team member that never<br />sleeps — on <em className="serif it" style={{ color: "var(--accent)", fontWeight: 400 }}>chat.</em></>,
  sub: "Chatbots for your website and WhatsApp that answer questions, qualify leads and close the loop — trained on your business, live 24/7, and handing real prospects to your team.",
  pitch: <>Trained on your business — so it answers like your best rep.</>,
  features: [
    { Icon: MessagesSquare, h: "Web & WhatsApp", p: "One brain across your site and WhatsApp, so customers get the same answers wherever they reach you." },
    { Icon: Brain, h: "Knows your business", p: "Trained on your products, prices and policies — no more “let me check and get back to you.”" },
    { Icon: Zap, h: "Instant replies", p: "Answers in seconds at any hour, so you never lose a lead to a slow response." },
    { Icon: Target, h: "Qualifies & routes", p: "Captures details, scores intent and hands warm leads to the right person automatically." },
    { Icon: ShoppingCart, h: "Guides to purchase", p: "Recommends, answers objections and nudges customers toward booking or buying." },
    { Icon: Plug, h: "Connected", p: "Pushes conversations and contacts into your CRM, inbox or sheet in real time." },
  ],
  uses: ["Lead capture", "Customer support", "Product recommendations", "Booking & orders", "FAQ deflection", "WhatsApp broadcasts"],
  img: "/chatbot_1.png",
  imgAlt: "AI chatbot",
};

export default function Page() {
  return <ServicePage s={s} />;
}
