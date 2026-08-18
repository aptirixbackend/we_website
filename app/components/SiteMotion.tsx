"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Wraps the whole site: Lenis smooth scroll + all GSAP scroll motion.
 *  Lenis is set up once; the page animations re-run on every route change.
 *  Respects prefers-reduced-motion (CSS then shows everything statically). */
export default function SiteMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // ---- Lenis smooth scroll + nav state (once) ----
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nav = document.querySelector<HTMLElement>("nav.site");
    const bar = document.querySelector<HTMLElement>(".progress");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
      if (bar) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (reduce) return () => window.removeEventListener("scroll", onScroll);

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ---- page animations (re-run per route) ----
  useEffect(() => {
    // Start every new page at the top (footer/nav links land at the top, not mid-page) — but leave
    // #section links alone so they still scroll to their anchor.
    if (!window.location.hash) {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // hero headline: line-by-line rise
      if (document.querySelector("h1.hero-h")) {
        gsap.set("h1.hero-h .line > span", { yPercent: 115 });
        gsap.to("h1.hero-h .line > span", { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.15 });
        gsap.from(".hero .eyebrow", { opacity: 0, y: 14, duration: 0.7, delay: 0.1 });
        gsap.from(".hero .sub, .hero .cta-row, .hero .trust", { opacity: 0, y: 22, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.5 });
      }

      // generic scroll reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } });
      });

      // pinned problem scrollytelling — each word in then out; closing line takes the final slot
      const words = gsap.utils.toArray<HTMLElement>(".prob-word");
      if (words.length && document.querySelector(".problem")) {
        const pt = gsap.timeline({ scrollTrigger: { trigger: ".problem", start: "top top", end: "bottom bottom", scrub: 0.6 } });
        words.forEach((w, i) => {
          pt.fromTo(w, { opacity: 0, yPercent: 55 }, { opacity: 1, yPercent: 0, ease: "power2.out" }, i);
          pt.to(w, { opacity: 0, yPercent: -55, ease: "power2.in" }, i + 0.72);
        });
        pt.fromTo(".prob-end", { opacity: 0, yPercent: 45 }, { opacity: 1, yPercent: 0, ease: "power3.out" }, words.length - 0.15);
      }

      // stat count-ups + underline bars
      gsap.utils.toArray<HTMLElement>(".stat .n").forEach((el) => {
        const to = parseFloat(el.dataset.to || "0");
        const suf = el.dataset.suffix || "";
        const dec = to % 1 !== 0 ? 1 : 0;
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el, start: "top 88%", once: true,
          onEnter: () => gsap.to(obj, { v: to, duration: 1.8, ease: "power2.out", onUpdate: () => { el.textContent = obj.v.toFixed(dec) + suf; } }),
        });
      });
      gsap.utils.toArray<HTMLElement>(".stat .bar").forEach((b) => {
        gsap.to(b, { scaleX: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 90%" } });
      });

      // hero glow parallax
      if (document.querySelector(".hero .glow")) {
        gsap.to(".hero .glow", { yPercent: 30, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      }
    });

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => { clearTimeout(refresh); ctx.revert(); };
  }, [pathname]);

  return <>{children}</>;
}
