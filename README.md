# Edventure Science — ວິທະຍາສາດ ເອັດເວນເຈີ

Interactive, bilingual (Lao / English) science lessons for Lao secondary school, grades **M.1–M.7** (Grade 6–12): physics, chemistry and biology, with 2D/3D simulations, quizzes and a periodic table. Works offline as a PWA and is designed both for **teachers projecting in class** and **students studying alone**.

- Live site: https://edventure-science.netlify.app
- Content is based on the official curriculum documents of the Department of General Education, Ministry of Education and Sports (MoES), Lao PDR: lower secondary (2010) and upper secondary (2011). Original documents: https://dge.moes.edu.la/learning-resources.php

> **Warning:** this site was written with the help of AI and **still contains errors**. All Lao text is an AI draft and has not been reviewed by teachers; uncertain terms are marked `// REVIEW` in the code. If you find a mistake, please take a screenshot and send it to the developer on WhatsApp: **+856 20 5969 8610**.

## Features

- **98 lessons**: M.1–M.4 (41 lessons) and M.5–M.7 (57 topics: physics 19, chemistry 15, biology 23). Each has a summary, objectives, key ideas and a quiz with explanations.
- **~30 interactive simulations** (three.js, 2D and 3D, rotate 360°): motion, forces, Newton's laws, pressure, thermal, waves, optics, circuits, electromagnetic induction, photoelectric effect, gas laws, mole concept, bonding, reaction rate, acid–base titration, electrochemistry, cell and osmosis, heart, photosynthesis, food web, population, genetics, natural selection.
- **Periodic table** of 118 elements: colour by category or state, filtering legend, element detail with a rotatable 3D atom, fullscreen, keyboard navigation, mobile-friendly (zoom and sideways scroll).
- **Lao / English** instant language toggle (scientist names, chemical symbols and units stay in Latin).
- **Presentation mode** (`P`): large type (≥ 28 px), high contrast, keyboard control.
- **Offline-first**: no CDN or runtime network calls; the service worker precaches everything.
- Simulations that have an end (e.g. a projectile landing) stop at the end and offer an optional "restart automatically" checkbox.
- Light on weak school PCs (capped pixel ratio, low polygon counts) and a text fallback when WebGL is unavailable.

### Keyboard shortcuts (lesson pages)

| Key | Action |
|---|---|
| `←` / `→` | previous / next idea |
| `P` | presentation mode |
| `2` / `3` | switch 2D / 3D |
| `L` | switch language |
| `R` | reset the simulation view |

## Tech stack

Vite 8 · React 19 · TypeScript (strict) · three.js + @react-three/fiber + drei · vite-plugin-pwa · Vitest · Oxlint. Node 22.

## Getting started

```bash
npm ci            # install dependencies
npm run dev       # dev server
npm test          # unit tests (Vitest)
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build (use this to test offline / PWA)
```

`dist/` must be served over HTTP (for example `npx serve dist`); opening `index.html` through `file://` does not work with ES modules and the service worker.

## Project structure

```
src/
  content/lower/   lesson data for M.1–M.4 (bilingual objects)
  content/upper/   lesson data for M.5–M.7
  sims/            pure formula modules with unit tests
  scenes/          three.js scenes; scenes/sims/ holds each simulation (host, controls, lazy registry)
  pages/           Home, GradePage, LessonPage, PeriodicTable, About
  components/      shared UI (controls, quiz, notice dialog, auto-repeat, curriculum link)
  i18n/strings.ts  every UI string with `lo` and `en`
docs/              specs, test reports, project summary (docs/dev-team, docs/PROJECT-SUMMARY.md)
PLAN.md            decisions, scope and milestones
CLAUDE.md          conventions for AI-assisted development
```

### Conventions

- Content is data, not JSX: bilingual objects in `src/content/`; every user-visible string exists in both languages.
- Labels inside the 3D canvas are Latin letters, digits and symbols only; Lao sentences stay in HTML panels.
- Scientific accuracy over visual flair; models are shown as models.
- TypeScript strict, no `any`.

## Deployment

It is a static site (`npm run build` → `dist/`) with hash routing, so no server-side redirects are needed.

- **Netlify:** build command `npm run build`, publish directory `dist` (see `netlify.toml`).
- **Cloudflare Pages:** framework preset *None*, build command `npm run build`, output directory `dist`, environment variable `NODE_VERSION=22`.

## Known issues

See `docs/dev-team/test-report-regression.md`. Main open items: in presentation mode a few lessons (force m2-04, genetics b7-03, and some at 1280×720) still have a cut-off controls strip; the top navigation clips below ~1400 px; offline behaviour and real-GPU performance on the deployed site are not yet verified. Lao text still needs teacher review.

## Credits

Developed by **Edventure Tech** — Facebook, YouTube, TikTok, Instagram: `edventuretech` · WhatsApp +856 20 5969 8610. Built with AI assistance (Claude Code).

## License

No license has been chosen yet. All rights reserved by the author until one is added.
