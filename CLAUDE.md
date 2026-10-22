# CLAUDE.md — Lao Science (ເວັບວິທະຍາສາດພາສາລາວ)

Interactive Lao/English science website for Lao secondary school (biology, physics, chemistry), based on the official MoES curriculum. See `PLAN.md` for decisions, scope, and milestones. Keep `PLAN.md` in sync when decisions change.

## Product constraints (do not violate)
- Audience: teachers projecting in class AND students studying alone, equally.
- **Fully offline-capable.** No CDN fonts/scripts/images, no runtime network calls. Fonts via `@fontsource`. PWA precaches everything.
- **No backend.** Static site only. localStorage only for light per-user prefs (language), always wrapped in try/catch with a working fallback.
- Languages: Lao (default) and English with an instant toggle. Names of scientists and chemical symbols stay in English.
- Content must follow the curriculum files the user supplied (lower: 2010, upper: 2011). Use the curriculum's own Lao terminology; mark unverified terms `// REVIEW`.
- MVP scope: Chemistry Grade 10 (ມ.5) topic III "Atomic structure" — Dalton, Thomson, Rutherford, Bohr models, each in 2D and 3D (rotate 360°). Don't build beyond this scope without being asked.

## Stack
Vite + React 19 + TypeScript, three + @react-three/fiber 9 + @react-three/drei 10, vite-plugin-pwa. Node 22.

## Conventions
- Content is data, not JSX: bilingual objects in `src/content/<topic>/`, UI strings in `src/i18n/strings.ts` (each key has `lo` and `en`). Every user-visible string exists in both languages; never hard-code text in components.
- Adding a topic = new `content/<topic>.ts` + scenes + a card on `pages/Home.tsx` (add a registry once there is a second topic). Don't change the shell to add a subject.
- Labels on the canvas are canvas-texture sprites (`scenes/Label.tsx`) and contain only Latin letters, digits and symbols. Lao sentences stay in HTML panels (never 3D text geometry; never drei `<Html>`, which throws removeChild errors on unmount with React 19).
- 2D mode = same scene with orthographic camera, flat orbits, rotation disabled. 3D mode = perspective + OrbitControls.
- Classroom readability: presentation mode uses large type (≥ 28px), high contrast (WCAG AA), keyboard control (←/→ steps, P presentation, 2/3 switch view).
- Performance: assume weak school PCs. Cap `dpr` (≤ 1.5), low segment counts, no heavy postprocessing; provide a WebGL-unavailable text fallback.
- Scientific accuracy over visual flair. Bohr model: energy-level jumps emit/absorb photons; shell capacities 2-8-8 for Z ≤ 18. Show models as historical models, not as reality.
- TypeScript strict; no `any`. Keep components small. Comments only for non-obvious science/math.

## Commands
- `npm run dev` — dev server
- `npm run build` — typecheck + production build to `dist/`
- `npm run preview` — serve the build (use to test offline/PWA)
- `dist/` must be served over http (any static server, e.g. `npx serve dist`); opening index.html via file:// does not work with ES modules / service worker.

## Verification before saying "done"
1. `npm run build` passes with no type errors.
2. Open the built site in a browser: check Lao and English, 2D and 3D, presentation mode, language toggle, 360° rotation.
3. Check offline: after first load, disable network and reload.
4. List any `// REVIEW` terms for the chemistry teacher.

## Terminology (curriculum)
atom ອາໂຕມ · electron ເອເລັກຕຣົງ · atomic number ເລກອາໂຕມ · mass number ເລກມວນສານ · isotope ອີໂຊໂທບ · spectrum ສະເປັກຕຣຳ · ion ອີອອງ · energy level ຊັ້ນພະລັງງານ.
Unverified (REVIEW): proton ໂປຣຕົງ, neutron ນິວຕຣົງ, nucleus ນິວເຄຼຍ.

## User context
Solo developer; prefers Node.js + React. Communicates in Lao: reply in Lao, keep code/identifiers in English.
