# we_website

LazyRabbit marketing site — the public site for **lazyrabbit.in**.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind v4**, **GSAP + Lenis** (scroll animations) and **lucide-react** icons.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Environment

For the "Book a demo" live-call flow, set (in `.env.local`, not committed):

```bash
LAZYRABBIT_CALL_TOKEN=...          # bearer token for the call-agent API
# CALL_BACKEND_URL=https://...     # optional override for the call-agent backend URL
```

Without the token the contact/demo forms still **save the lead**; the outbound call just won't fire.

## SEO

`app/robots.ts`, `app/sitemap.ts` and the metadata in `app/layout.tsx` are kept aligned with the
existing indexed site so search rankings are preserved. Deploy on the **same domain** (`lazyrabbit.in`).
