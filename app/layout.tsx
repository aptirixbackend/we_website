import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SiteMotion from "./components/SiteMotion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";

const SITE_URL = "https://lazyrabbit.in";

// Structured data (JSON-LD) — rendered server-side so search engines and AI answer engines
// (ChatGPT, Gemini, Perplexity, etc.) can read exactly what LazyRabbit is, where it operates,
// which services it offers, and answers to common questions.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "LazyRabbit",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 1254, height: 1254 },
      description:
        "AI automation agency in India building AI voice agents, AI chatbots, business automation, and web & mobile apps.",
      email: "info@lazyrabbit.in",
      telephone: "+91-90947-70827",
      address: {
        "@type": "PostalAddress",
        streetAddress: "715-A, 7th Floor, Spencer Plaza, Mount Road (Anna Salai)",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600002",
        addressCountry: "IN",
      },
      areaServed: { "@type": "Country", name: "India" },
      slogan: "We automate. You elevate.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "LazyRabbit",
      description:
        "AI automation agency — AI voice agents, chatbots, business automation, and web & app development.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "LazyRabbit — AI Automation Agency",
      image: `${SITE_URL}/logo.png`,
      url: SITE_URL,
      telephone: "+91-90947-70827",
      email: "info@lazyrabbit.in",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "715-A, 7th Floor, Spencer Plaza, Mount Road (Anna Salai)",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600002",
        addressCountry: "IN",
      },
      areaServed: { "@type": "Country", name: "India" },
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI & software services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Voice Agents", url: "https://callagent.lazyrabbit.in" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbots", url: `${SITE_URL}/chatbot` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Automation", url: `${SITE_URL}/business-automation` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development", url: `${SITE_URL}/web-development` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "App Development", url: `${SITE_URL}/app-development` } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What does LazyRabbit do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LazyRabbit is an AI automation agency in India. We build AI voice agents, AI chatbots, business automation, and web & mobile apps that handle repetitive work so teams can focus on higher-value tasks.",
          },
        },
        {
          "@type": "Question",
          name: "Where is LazyRabbit based?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LazyRabbit is based at 715-A, 7th Floor, Spencer Plaza, Mount Road (Anna Salai), Chennai 600002, Tamil Nadu, India, and works with businesses across India and beyond.",
          },
        },
        {
          "@type": "Question",
          name: "What can a LazyRabbit AI voice agent do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LazyRabbit's AI voice agents make and answer phone calls in English, Hindi and regional Indian languages — handling inbound support, outbound sales, lead qualification, appointment booking and follow-ups 24/7, and transferring to a human whenever needed.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get started with LazyRabbit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Book a demo or contact the team at info@lazyrabbit.in or +91 90947 70827 to discuss your use case and get a tailored automation plan.",
          },
        },
      ],
    },
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteMotion>
          <div className="progress" />
          <Nav />
          {children}
          <Footer />
        </SiteMotion>
        <Analytics />
      </body>
    </html>
  );
}
