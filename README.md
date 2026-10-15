# Naman Verma · Portfolio

My personal portfolio. I'm a third-year B.Tech Computer Science student (Section C) at KIET Group of Institutions, Ghaziabad, graduating in 2028.

The design takes its cue from editorial VC sites like varsity.vc: a live clock in the top bar, a full-screen photo split into a 3×2 grid of tiles that fill with colour as you scroll, big serif headlines and hairline rules.

## Stack

- **React 18 + Vite**: components, no UI library
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
src/components/       TopBar, Hero, Tile, About, Projects, ProjectCard, Skills, Journey, Contact, Footer, NotFound
src/data/             profile, projects, skills, journey (all the content lives here)
src/hooks/            useClock (live IST clock), useReveal (scroll-in animation)
src/styles/           tokens, global styles, per-component CSS
```

## Adding a project

Add one object to the top of `src/data/projects.js`. The card, number and filter tag appear automatically.

## Contact form setup

In Vercel → Project → Settings → Environment Variables, add:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | your key from resend.com |
| `CONTACT_TO` *(optional)* | inbox to receive messages |

Without a key, the form tells the visitor to email me directly instead.
