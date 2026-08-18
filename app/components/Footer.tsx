import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site sec-dark">
      <div className="wrap">
        <div className="footcols">
          <div className="fabout">
            <Link href="/" className="logo">
              <Image src="/logo.png" alt="LazyRabbit" width={30} height={30} className="mark-img" />
              <span>LazyRabbit</span>
            </Link>
            <p>AI voice agents, chatbots and automations that quietly run the busywork — so your team can focus on the work that matters.</p>
          </div>
          <div className="fcol">
            <h5>Services</h5>
            <a href="https://callagent.lazyrabbit.in">AI Voice Agents</a>
            <Link href="/chatbot">AI Chatbots</Link>
            <Link href="/business-automation">Business Automation</Link>
            <Link href="/web-development">Web Development</Link>
            <Link href="/app-development">App Development</Link>
          </div>
          <div className="fcol">
            <h5>Company</h5>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#process">How it works</Link>
          </div>
          <div className="fcol">
            <h5>Get in touch</h5>
            <a href="mailto:info@lazyrabbit.in">info@lazyrabbit.in</a>
            <a href="tel:+919094770827">+91 90947 70827</a>
            <span style={{ color: "var(--dark-muted)", fontSize: 14, display: "block", paddingTop: 6 }}>Egmore, Chennai, India</span>
          </div>
        </div>
        <div className="row">
          <div className="muted-d">© 2026 LazyRabbit · We automate. You elevate.</div>
          <div className="muted-d" style={{ display: "flex", gap: 8 }}>
            <Link href="/privacy" style={{ color: "inherit" }}>Privacy</Link>
            <span>·</span>
            <Link href="/terms" style={{ color: "inherit" }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
