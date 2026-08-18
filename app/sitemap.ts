import type { MetadataRoute } from "next";

const BASE_URL = "https://lazyrabbit.in";

// Same routes as the existing indexed site, so nothing drops out of Google.
const routes = [
  "",
  "/voice-agent",
  "/chatbot",
  "/business-automation",
  "/web-development",
  "/app-development",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
