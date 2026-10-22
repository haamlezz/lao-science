# Edventure Science — project summary

Use this file as context when asking another chat about the project.

## What it is
**Edventure Science** (Lao: ວິທະຍາສາດ ເອັດເວນເຈີ) is a bilingual (Lao default / English) interactive science website for Lao secondary school (grades M.1–M.7 = Grade 6–12; biology, chemistry, physics). Content follows the official curriculum documents of the Department of General Education, Ministry of Education and Sports (MoES): lower secondary (2010) and upper secondary (2011), https://dge.moes.edu.la/learning-resources.php.

- Live: https://edventure-science.netlify.app (Netlify project `edventure-science`; no custom domain yet)
- Developer / publisher: Edventure Tech (Facebook/YouTube/TikTok/Instagram `edventuretech`, WhatsApp +856 20 5969 8610)
- Audience: teachers projecting in class **and** students studying alone.
- **The site was written with AI and still has errors.** A warning popup on the home page asks users to send screenshots of mistakes to the developer's WhatsApp. All Lao text is an AI draft; uncertain terms are marked `// REVIEW` in code and need teacher review.

## Product constraints
- Fully offline-capable PWA (no CDN, fonts via `@fontsource`, service worker precache). Static site, no backend; localStorage/sessionStorage only for light prefs, always in try/catch.
- Lao/English instant toggle. Scientist names and chemical symbols/units stay in Latin (e.g. N, Pa, J, K, Avogadro).
- Classroom presentation mode (key P): text ≥ 28px, WCAG AA contrast, keyboard control, header hidden.
- Weak school PCs: dpr ≤ 1.5, low polygon counts, WebGL-unavailable text fallback.
- Scientific accuracy over visual flair.

## Tech stack
Vite + React 19 + TypeScript (strict, no `any`), three + @react-three/fiber 9 + drei 10, vite-plugin-pwa, vitest (422 tests, 32 files). Node 22. Hash routing (`#/grade-m1..m7`, `#/<lessonId>`, `#/periodic-table`, `#/about`).

## Content (98 lessons)
- **Lower secondary M.1–M.4:** 41 lessons (all ready).
- **Upper secondary M.5–M.7:** 57 topics (physics 19, chemistry 15, biology 23); c5-03 is the original atomic-structure lesson (Dalton, Thomson, Rutherford, Bohr, 2D and 3D).
- Each lesson: summary, objectives, key ideas, quiz with explanations, interactive 2D/3D simulation (where applicable), source footer with a link to the curriculum.
- ~30 simulations (lazy-loaded chunks): motion, force, newton, pressure, photosynthesis, thermal, food web, reflection, pendulum, circuit, states of matter, solenoid, lens, kinematics, projectile, wave, induction, photoelectric, mole, gas laws, periodic trends, bonding, reaction rate, acid-base/titration, electrochemistry, cell/osmosis, heart, population, genetics, selection.
- **Periodic table page:** 118 elements, colour by category or state, legend that filters, element detail dialog with a rotatable 3D atom (shells), fullscreen, ←/→ navigation. On phones: fixed-size cells, sideways scroll, zoom −/+ buttons, compact legend chips.

## Key features and UX
- Top navigation (M.1–M.7 + periodic table), home page with feature buttons, About page (developer, links).
- "Contact the developer" button in the header (WhatsApp); AI-warning popup (once per session) with curriculum source link.
- Sims that have an end (motion, kinematics, projectile, rate, bonding, population, electrochem, newton 10 s, induction magnet, force crate at track end) stop at the end and offer an optional "restart automatically when it ends" checkbox (off by default).
- Reset button + R key in every sim; labels on 3D canvases are Latin-only sprites; Lao sentences live in HTML panels.

## Code layout
- `src/content/lower/*`, `src/content/upper/*`: lesson data (bilingual objects); `LessonDef` = planned | ready | custom; registry in `index.ts`.
- `src/sims/*.ts` (+ tests): pure formula modules.
- `src/scenes/sims/*`: sim host (`host.tsx`, `makeSimHost`), per-sim controls and three.js scenes, lazy `registry.ts`.
- `src/pages/*` (Home, GradePage, LessonPage, PeriodicTable, About), `src/components/*` (Controls, QuizPanel, AutoRepeat, NoticeDialog, CurriculumLink), `src/i18n/strings.ts` (every key has `lo` and `en`), `src/styles.css`.
- Docs: `PLAN.md`, `CLAUDE.md`, `docs/dev-team/*` (specs and test reports).
- Commands: `npm run dev`, `npm test`, `npm run build`, `npm run preview`.

## Development process
Built with Claude Code using a four-agent team (analyst → coder → ux-ui-designer → tester) led by the main agent. Lower secondary was built and tested twice; upper secondary was built and tested, then defects D-1…D-17 and several scientific-accuracy issues were fixed.

## Status (latest regression, see `docs/dev-team/test-report-regression.md`)
- 422 unit tests pass; all 98 lessons load without console errors; no horizontal scroll at 360px on 109 pages.
- Deployed to Netlify and publicly reachable.

### Known open issues
1. **Presentation mode, readout column:** force (m2-04), genetics (b7-03) and pressure (m2-05) do not use the shared sim host, so their readout stays under the controls; the controls strip is cut (b7-03: 15 controls off screen at 1280×720).
2. At 1280×720 in presentation mode the controls strip (cap ~352px) still scrolls for some lessons (p7-05, m2-11, p5-05, b5-02, b5-04, p5-02, m1-08); everything fits at 1920×1080.
3. c5-04 typed-mass field shows values 201–999 and negatives (model clamps to 200 g).
4. Below ~1400px the top nav scrolls inside its own box and clips labels.
5. b6-03 graph end marker clipped at the stage edge; in-canvas graph small at 720p.
6. Not verified: real GPU frame rate, offline/service worker on the deployed site, Lao language quality (needs teachers), touch devices, scientific wording reviewed only by AI.
7. Minor leftovers from earlier reports: m1-08 2D "Sun" label overlaps hint; 3D population-graph label "1 dot = N" uses long digits.

## Ideas / next steps
- Fix open issues above; re-run the tester agent.
- Teacher review of all Lao text and `// REVIEW` terms (PLAN.md section 9).
- Custom domain on Netlify; git + continuous deployment (currently deployed by uploading source for a Netlify build).
- Possible: sticky row/column headers on the periodic table, list view for small screens, more features on the home page.
