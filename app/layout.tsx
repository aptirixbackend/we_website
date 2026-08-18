import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SiteMotion from "./components/SiteMotion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

// SEO — kept identical to the existing lazyrabbit.in so current rankings/indexing are preserved.
export const metadata: Metadata = {
  metadataBase: new URL("https://lazyrabbit.in"),
  title: {
    default: "LazyRabbit — AI Automation Agency",
    template: "%s | LazyRabbit",
  },
  description:
    "We build AI that works while you chill. AI voice agents, chatbots, business automation, web & mobile app development — built to scale your business.",
  keywords: [
    "AI automation agency",
    "AI voice agents",
    "AI chatbots",
    "business automation",
    "web development",
    "mobile app development",
    "LazyRabbit",
  ],
  authors: [{ name: "LazyRabbit" }],
  creator: "LazyRabbit",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://lazyrabbit.in",
    siteName: "LazyRabbit",
    title: "LazyRabbit — AI Automation Agency",
    description:
      "We build AI that works while you chill. AI voice agents, chatbots, automation, and web & app development.",
    images: [{ url: "/logo.png", width: 1254, height: 1254, alt: "LazyRabbit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LazyRabbit — AI Automation Agency",
    description:
      "We build AI that works while you chill. AI voice agents, chatbots, automation, and web & app development.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <body>
        <SiteMotion>
          <div className="progress" />
          <Nav />
          {children}
          <Footer />
        </SiteMotion>
      </body>
    </html>
  );
}
