# Naman Verma · Portfolio

My personal portfolio. I'm a third-year B.Tech Computer Science student (Section C) at KIET Group of Institutions, Ghaziabad, graduating in 2028.

The design takes its cue from editorial VC sites like varsity.vc: a live clock in the top bar, a full-screen photo split into a 3×2 grid of tiles that fill with colour as you scroll, big serif headlines and hairline rules.

## Pages

`/` home · `/work` all projects · `/work/<slug>` a case study per project · `/codex` the CodeX 3.0 hackathon story · `/about` · `/journey` · `/contact`

## Motion (kept light)

- Intro loader with a 000 → 100 counter, shown once per visit
- Curtain page transitions between routes (three colour panels)
- Glyph "decode" effect on headings and links
- Custom cursor (dot + trailing ring) that grows on links and shows labels like *View* and *Open*; off on touch screens
- Smooth, weighted wheel scrolling with [Lenis](https://github.com/darkroomengineering/lenis), a custom scrollbar and a scroll progress line
- Scroll-in reveals, image wipes, counters, marquees, hover previews on the work list
- Everything respects `prefers-reduced-motion`

## Stack

- **React 18 + Vite**: components, no UI library, a tiny custom router (`src/router.jsx`)
- **Plain CSS**: design tokens in CSS variables, one stylesheet per component, fully responsive
- **Vercel serverless function** (`api/contact.js`): the contact form backend, which sends mail through Resend

## Run locally

```bash
npm install
npm run dev
```

Build with `npm run build`. The output goes to `dist/`.

## Structure

```
api/contact.js        POST /api/contact: validation, honeypot, email via Resend
public/               photos, CV PDF
src/pages/            one file per page
src/components/       TopBar, Menu, Hero, Cursor, Curtain, Loader, GlyphText, WorkList, Marquee, ...
src/data/             profile, projects, codex, skills, journey, nav (all the content lives here)
src/hooks/            useClock, useReveal, useSmoothScroll
src/styles/           tokens, global styles, per-component CSS
```

## Adding a project

Add one object to the top of `src/data/projects.js`. Its card, filter tag and its own page at `/work/<slug>` appear automatically.

## Contact form setup

In Vercel → Project → Settings → Environment Variables, add:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | your key from resend.com |
| `CONTACT_TO` *(optional)* | inbox to receive messages |

Without a key, the form tells the visitor to email me directly instead.
