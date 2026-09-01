// First-party website analytics beacon. Consent-gated: collects nothing until the visitor accepts
// the cookie banner. Batched events are sent (sendBeacon → text/plain, no CORS preflight) to the
// analytics backend, tagged with this site's name so it shows as its own site in the tracker.
// Set NEXT_PUBLIC_ANALYTICS_URL to the analytics backend base URL (e.g. https://api.example.com).

const BASE = (process.env.NEXT_PUBLIC_ANALYTICS_URL || "").replace(/\/+$/, "");
const COLLECT = BASE ? `${BASE}/analytics/collect` : "";
const SITE = process.env.NEXT_PUBLIC_ANALYTICS_SITE || "lazyrabbit";
const C_VISITOR = "lr_vid";
const C_SESSION = "lr_sid";
const C_CONSENT = "lr_consent";
const SESSION_MIN = 30;

type Ev = Record<string, unknown>;

let started = false;
let returning = false;
let visitorId = "";
let sessionId = "";
let queue: Ev[] = [];
let pageStart = 0;
let currentPath = "";
let flushTimer: number | undefined;

/** True once tracking has started AND this browser already had a visitor cookie from a prior visit. */
export function isReturning(): boolean {
  return started && returning;
}

function readCookie(name: string): string {
  try {
    const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : "";
  } catch { return ""; }
}
function writeCookie(name: string, val: string, days: number) {
  try {
    const exp = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(val)}; expires=${exp}; path=/; SameSite=Lax`;
  } catch { /* ignore */ }
}
function uuid(): string {
  try { if (crypto?.randomUUID) return crypto.randomUUID(); } catch { /* fall through */ }
  return "xxxxxxxxxxxx4xxx".replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));
}

export function getConsent(): "granted" | "denied" | "" {
  const c = readCookie(C_CONSENT);
  return c === "granted" || c === "denied" ? c : "";
}
export function setConsent(v: "granted" | "denied") {
  writeCookie(C_CONSENT, v, 365);
  if (v === "granted") start();
  else stop();
}
/** Call once at app start. Begins tracking only if consent was already granted. */
export function initAnalytics() {
  if (getConsent() === "granted") start();
}

function refreshSession() {
  if (!sessionId) sessionId = readCookie(C_SESSION) || uuid();
  writeCookie(C_SESSION, sessionId, SESSION_MIN / 1440);
}
function start() {
  if (started || !COLLECT) return;
  try { if (window.self !== window.top) return; } catch { return; }   // never track inside an iframe
  started = true;
  try {
    const existingVid = readCookie(C_VISITOR);
    returning = !!existingVid;                            // seen this browser before?
    visitorId = existingVid || uuid();
    writeCookie(C_VISITOR, visitorId, 365);
    sessionId = readCookie(C_SESSION) || uuid();
    refreshSession();
    patchHistory();
    window.addEventListener("popstate", onRoute);
    document.addEventListener("click", onClick, true);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onExit);
    flushTimer = window.setInterval(flush, 8000);
    observeVitals();
    pageview();
    // Let UI (e.g. a "welcome back" greeting) react once tracking is live.
    try { window.dispatchEvent(new CustomEvent("lr:started", { detail: { returning } })); } catch { /* ignore */ }
  } catch { /* never break the page */ }
}
function stop() { started = false; queue = []; }

function patchHistory() {
  const wrap = (type: "pushState" | "replaceState") => {
    const orig = history[type];
    history[type] = function (this: History, ...args: unknown[]) {
      const r = orig.apply(this, args as never);
      onRoute();
      return r;
    } as typeof history.pushState;
  };
  wrap("pushState");
  wrap("replaceState");
}
function onRoute() {
  const path = location.pathname + location.search;
  if (path !== currentPath) pageview();
}

function push(ev: Ev) {
  queue.push(ev);
  if (queue.length >= 20) flush();
}
function utm(): Ev {
  try {
    const p = new URLSearchParams(location.search);
    const g = (k: string) => p.get(k) || null;
    return { utm_source: g("utm_source"), utm_medium: g("utm_medium"), utm_campaign: g("utm_campaign"), utm_term: g("utm_term"), utm_content: g("utm_content") };
  } catch { return {}; }
}
function pageDims(): Ev {
  const d = document.documentElement;
  return { page_w: d.scrollWidth, page_h: d.scrollHeight, vp_w: window.innerWidth, vp_h: window.innerHeight };
}
function pageview() {
  if (currentPath) sendExit();
  currentPath = location.pathname + location.search;
  pageStart = Date.now();
  refreshSession();
  push({ type: "pageview", path: location.pathname, title: document.title, referrer: document.referrer || null, ...utm(), ...pageDims() });
}
function sendExit() {
  if (!pageStart) return;
  push({ type: "page_exit", path: currentPath.split("?")[0], duration_ms: Date.now() - pageStart });
  pageStart = 0;
}

const INTERACTIVE = "a,button,input,select,textarea,label,summary,[role=button],[role=link],[onclick],[data-track]";
function describe(el: Element) {
  const tag = el.tagName.toLowerCase();
  const he = el as HTMLElement;
  const id = he.id ? `#${he.id}` : "";
  const cls = typeof he.className === "string" && he.className ? "." + he.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
  const text = (he.innerText || he.getAttribute?.("aria-label") || (el as HTMLInputElement).value || "").trim().replace(/\s+/g, " ").slice(0, 80);
  return { selector: `${tag}${id}${cls}`.slice(0, 200), text, tag };
}
function onClick(e: MouseEvent) {
  try {
    const target = e.target as Element | null;
    if (!target || !target.closest) return;
    const hit = target.closest(INTERACTIVE);
    const d = describe(hit || target);
    push({ type: hit ? "click" : "deadclick", el_selector: d.selector, el_text: d.text, el_tag: d.tag, el_interactive: !!hit, path: location.pathname, x: Math.round(e.pageX), y: Math.round(e.pageY), ...pageDims() });
  } catch { /* ignore */ }
}
function onVisibility() { if (document.visibilityState === "hidden") { sendExit(); flush(); } }
function onExit() { sendExit(); flush(); }

function observeVitals() {
  try {
    const po = new PerformanceObserver((list) => {
      const e = list.getEntries().pop() as PerformanceEntry & { renderTime?: number; loadTime?: number };
      if (e) vital("LCP", e.renderTime || e.loadTime || e.startTime);
    });
    po.observe({ type: "largest-contentful-paint", buffered: true } as PerformanceObserverInit);
    let cls = 0;
    const clsPo = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput?: boolean; value?: number })[]) if (!entry.hadRecentInput) cls += entry.value || 0;
    });
    clsPo.observe({ type: "layout-shift", buffered: true } as PerformanceObserverInit);
    addEventListener("pagehide", () => vital("CLS", Math.round(cls * 1000) / 1000), { once: true });
    let inp = 0;
    const inpPo = new PerformanceObserver((list) => { for (const entry of list.getEntries()) inp = Math.max(inp, entry.duration || 0); });
    try { inpPo.observe({ type: "event", buffered: true, durationThreshold: 40 } as PerformanceObserverInit); } catch { /* ok */ }
    addEventListener("pagehide", () => { if (inp) vital("INP", Math.round(inp)); }, { once: true });
  } catch { /* unsupported */ }
}
function vital(metric: string, value: number) {
  if (!(value >= 0)) return;
  push({ type: "vital", metric, value, path: location.pathname });
}

function flush() {
  if (!started || !queue.length || !COLLECT) return;
  const body = JSON.stringify({ site: SITE, visitor_id: visitorId, session_id: sessionId, lang: navigator.language, tz: tz(), events: queue });
  queue = [];
  try { if (navigator.sendBeacon) { navigator.sendBeacon(COLLECT, body); return; } } catch { /* fall through */ }
  try { fetch(COLLECT, { method: "POST", body, keepalive: true, mode: "no-cors" }); } catch { /* ignore */ }
}
function tz(): string { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch { return ""; } }
