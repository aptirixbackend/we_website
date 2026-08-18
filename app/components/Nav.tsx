import Link from "next/link";
import Image from "next/image";
import { PhoneCall, MessagesSquare, Workflow, Globe, Smartphone } from "lucide-react";
import BookDemo from "./BookDemo";

const VOICE_AGENT_URL = "https://callagent.lazyrabbit.in";

const SERVICES = [
  { href: VOICE_AGENT_URL, Icon: PhoneCall, label: "AI Voice Agents", ext: true },
  { href: "/chatbot", Icon: MessagesSquare, label: "AI Chatbots" },
  { href: "/business-automation", Icon: Workflow, label: "Business Automation" },
  { href: "/web-development", Icon: Globe, label: "Web Development" },
  { href: "/app-development", Icon: Smartphone, label: "App Development" },
];

export default function Nav() {
  return (
    <nav className="site">
      <div className="bar">
        <Link href="/" className="logo">
          <Image src="/logo.png" alt="LazyRabbit" width={30} height={30} className="mark-img" priority />
          <span>LazyRabbit</span>
        </Link>
        <div className="navlinks">
          <Link href="/">Home</Link>
          <div className="has-menu">
            <span className="menutrigger">Services ▾</span>
            <div className="menu">
              {SERVICES.map((s) =>
                s.ext ? (
                  <a key={s.href} href={s.href}><s.Icon className="mi" size={18} strokeWidth={1.75} />{s.label}</a>
                ) : (
                  <Link key={s.href} href={s.href}><s.Icon className="mi" size={18} strokeWidth={1.75} />{s.label}</Link>
                )
              )}
            </div>
          </div>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <BookDemo className="btn btn-primary" label="Book a demo →" />
      </div>
    </nav>
  );
}
