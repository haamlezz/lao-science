# Test report: lower secondary M.1-M.4 (41 lessons, 12 sims)

Verdict: **FAIL (minor/major spec deviations only; no blockers)**. All 41 lessons, all quizzes, all sim formulas and offline mode work. Failures: AC-2 (grade page order is not curriculum order), common sim rule "Reset restores initial" missing in 9 of 12 sims, AC-11 (sim control text under 28 px in present mode), plus cosmetic items.

Tested against the built site: `npm run build`, `vite preview --port 4399` (stopped at end). Chromium 156 headless with SwiftShader WebGL, playwright-core. Scripts are in the scratchpad (not in the project).

## 1. Automated
- `npm test`: 13 files, 216 tests passed.
- `npm run build`: tsc -b + vite build OK; PWA precache 33 entries (1721 KiB). Main chunk 1,493 kB (gzip 411 kB) warning only. `npx oxlint`: warnings only (static-components in LessonPage.tsx:272, only-export-components in 4 scene files), no errors; no `any` found.

## 2. Acceptance criteria
| AC | Result | Evidence |
|---|---|---|
| AC-1 Home shows 4 lower grades with Open | pass | Home lists ม.1-ม.4 with "9/9, 12/12, 9/9, 11/11 lessons ready" and "See lessons"; M.5 opens, M.6/M.7 Coming soon. |
| AC-2 Grade pages: counts, titles, hours, curriculum order | **fail (order)** | Counts 9/12/9/11, hours 132/132/165/165, titles/hours match registry in lo and en. BUT cards are grouped by field, so order is not curriculum order: M.2 shows topic numbers 1,6,2,3,4,5,11,12,7,8,9,10; M.3 1,5,2,7,3,4,6,8,9; M.4 1,9,2,4,8,11,3,5,6,7,10 (M.1 happens to be 1-9). Each card does show "Topic N". See D-1. |
| AC-3 Ready cards open via click and #/id; planned not clickable | pass | All 41 lessons are `ready` (0 planned). Click on every card goes to `#/<id>`; direct URLs open all 41. Unknown ids (`#/nonsense`, `#/m9-99`, `#/m1-00`, `#/grade-m9`) fall back to Home without error. No planned cards exist to test the disabled state. |
| AC-4 Back / Home | pass | Back from all 41 lessons returns to `#/grade-mX`; grade page "Back" goes Home. |
| AC-5 Legacy hashes | pass | `#/m2-force` and `#/m2-pressure` open Force/Pressure. Hash stays as typed (no redirect of URL), content correct. Force readouts: 30 vs 20 opposite = 10 N, same direction 50 N, Moon g=1.6 W=8 N; Pressure 60 N / 0.03 m² = 2000 Pa, 0.01 m² = 6000 Pa, liquid 4 m = 39.2 kPa. |
| AC-6 Language toggle | pass (see D-5) | Toggle button works everywhere; L key works in lessons. Quiz progress and sim state survive toggle. English mode: no Lao script anywhere except the switch button label "ລາວ". Lao/English complete for all 41 x 2 (title, summary, 2-5 objectives, 3-5 ideas, exactly 2 questions, activity, minutes, quiz). No raw key, 'undefined', 'NaN' found. L key does nothing on Home and grade pages (D-5). |
| AC-7 Tabs/content | pass | Lesson, Objectives, Teacher notes (minutes, 2 questions, activity), Quiz present on all 41. |
| AC-8 Quiz | pass | See section 3. |
| AC-9 2D/3D | pass | Keys 2/3 and buttons switch; 2D drag does not rotate (identical screenshot on static sims); 3D drag rotates; slider state kept across 2D/3D. Circuit/states 2D screenshots differ after drag only because they animate continuously. |
| AC-10 Sim "Checks" | pass | Section 4. |
| AC-11 Presentation | **partial fail** | P enters, header hidden, corner logo visible, Esc exits, language button inside present mode. Panel body text 30.4 px (sims) / 32 px (slides). But sim-lesson controls, legend, hint, tool buttons are 12.8-21 px and in text-lesson quiz slide buttons are 20.8-22.4 px (D-3). Arrow keys step through 9 slides in text lessons. |
| AC-12 Keys not firing in inputs/quiz | pass | In quiz focus, `l 2 p r` ignored (lang unchanged, no present). |
| AC-13 No WebGL | pass | With `--disable-3d-apis`: m4-07 shows fallback text "device cannot show 3D, read the panel", tabs and quiz work, no page errors. |
| AC-14 Contrast/focus | not formally tested | Visual inspection only; no automated contrast audit. Controls reachable via Tab in quiz (keyboard test). |
| AC-15 build/test/oxlint | pass | See section 1. |
| AC-16 Offline | pass | SW active; offline reload of Home, grade-m3, m1-01, m4-07, m2-06, m3-07, m4-05, m2-04, chem-m5-atom, periodic-table, about all render (sim chunks never visited online also work: m4-07, m2-06, m3-07, m4-05). |
| AC-17 No external requests | pass | 204 requests logged, all same-origin; zero external. |
| AC-18 Strings both languages | pass | See AC-6. Deliberate bilingual glosses in Lao mode: "(light)" in photosynthesis equation, "(idealised model)", "(illustrative)", "(convex)/(concave)". |
| AC-19 Performance | partial | SwiftShader CPU rendering at DPR 2 device (canvas capped at ratio 1.50 confirmed): foodweb 58 fps, solenoid 55, circuit 56, lens 60, thermal 57, photosynthesis 51, chem-m5 33, pendulum (playing) 23, **states (playing x10) 14 fps, worst frame 233 ms**. SwiftShader is far slower than a real GPU, so not a proof of failure; states is clearly the heaviest scene. |
| AC-20 Science / REVIEW | pass with notes | See section 5. REVIEW list not independently compiled. |

## 3. Quiz
- Automated on ALL 41 lessons (Lao): wrong answer first then right answers: Check disabled until pick, counter n / N, option count, correct highlighted = data answer, both marks shown (check mark in text, cross on wrong), explanation shown, score = N-1 as expected, Try again resets. 0 issues.
- Reload does not restore answers; localStorage contains only `science-lab-lang`.
- Language toggle mid-quiz (m3-06, m1-01): question number and picked option kept, both directions.
- Keyboard only (m2-11): arrow keys change radio, Tab to Check, Enter checks, Enter goes next.
- Answer plausibility review of all 41 lessons (full list in the section below): no scientifically wrong marked answer found. Notes: some distractors are trivially silly (m4-01 q3 "Doing nothing/Believing rumours", m2-08 q3), and m1-04 q1 etc. are fine. m2-06 q2 "second consumer" = 100 kJ is correct under the 10% rule with the producer as level 1.

## 4. Simulation checks (values read from the live readout)
| Sim | Result |
|---|---|
| motion m1-04 | v=10,t=5: s=50 m, avg 10; km/h shows 36.0 km/h; a=2,t=5: s=25 m, v=10; t=10: 100 m/20 m/s; a=4,t=10: 200 m; Play/Pause/Restart OK; window scrolls (100-200 m). Pass. |
| photosynthesis m1-08 | light 0 -> 0 bubbles, limiting Light; light 3 + CO2 low -> rate 1, CO2 limiting; dry -> 0; white leaf -> 0; light 3 CO2 normal -> 2. Extra Temperature slider (not in spec) gives 0 at 0 and 50 C. Pass; see D-4 (limiting list). |
| thermal m2-02 | steel 20->100: +0.96 mm; Al +1.84 mm; Cu +1.36 mm; gas 373/293 = 1.27; negative values shown with minus when below 20 C. Pass. |
| force / pressure | see AC-5. Pass. |
| foodweb m2-06 | 10000/1000/100/10/1 kJ; remove frog: snake down, grasshopper up; remove rice: all down; remove snake: frog up, eagle down; pond chain 4 levels top 0.1%; web mode extra. Pass. |
| reflection m2-11 | i=35: r=35; d=3: image 3 behind; i=0: "returns on itself"; two-mirror mode extra. Pass. |
| pendulum m3-03 | m=1, 60 deg: E 9.80 J, v bottom 4.43 m/s, T 2.84 s; Ek+Ep stays 9.80 during run; mass does not change period; damping: E+heat = 9.80 always, E decays about as 9.8 e^(-t/20) (within about 3%, oscillating drag model). Pass; see D-6. |
| circuit basic m3-06 | 2 cells 3 series: 0.10 A, 0.10 W each; parallel 0.90 A, 0.90 W each; unscrew in series: 0 A all off; parallel unscrew: others 0.90 W; switch open 0 A; 4 cells 3 parallel 1.80 A 3.6 W each. Pass. |
| states m3-07 | corners 21/188/398/1528/1548 s; sampled run: t=398 s T=100; 191 s T=1.5 C (matches (191-188)/2.1); plateau flat at 0 and 100 C. Pass. (Cooling and steam stage not sampled, run stopped at 1055 s.) |
| circuit ohm m4-03 | 12 V 10/20 series: 30 ohm 0.40 A 4/8 V 4.8 W; parallel 6.67 ohm 1.8 A; 1||1 = 0.5 ohm 24 A; V=0 -> 0 A. Pass. |
| solenoid m4-05 | N50 I2: 0.628 mT; N100 I4: 2.513 mT; core x200: 502.7 mT with 20 pins (cap); I=0: 0 mT, 0 pins; reversed: N pole on left; wire I=2: 8.0 uT. Pass. |
| lens m4-07 | convex f10: u30 v15 m-0.5; u20 v20 m-1; u5 v-10 m+2; u=f "image at infinity"; u15 v30 m-2 (flagged off view); concave f10 u30 v-7.5 m+0.25. Pass. |

Common to all 12: opens in 2D and 3D, canvas renders (screenshots reviewed for 8 sims), no console errors/warnings except the known THREE.Clock, no horizontal overflow at 360 px and 1920 px (scrollWidth == clientWidth), P/Esc/2/3/L work, no Lao script in canvas code paths (labels Latin).

## 5. Scientific sanity (on-screen)
- Thermal: bar/thermometer/syringe exaggerated x500 and labelled "Exaggerated / not to scale", true values in text. OK.
- Solenoid: polarity matches right-hand rule in 2D (field lines leave N, enter S outside); iron-core x200 gives 0.5-0.63 T which is labelled illustrative (below saturation ~1.5-2 T). OK. Bar magnet B fixed 10 mT labelled illustrative.
- Force: sign text "F2 - F1 = 20 - 30 = -10 N" uses hyphen minus (cosmetic). Convention: F1 acts left, F2 right; quiz m2-04 q1 words it as "30 N right, 20 N left" so a student must map it; not misleading but easy to confuse.
- Lens: "1/f = 1/u + 1/v" with real-is-positive; concave line shows "1/-10" (readable). Ray/F marks right of lens are partly covered by the image arrow (cosmetic).
- Photosynthesis: qualitative model; equation unbalanced-looking text only because of missing subscripts (D-2).
- Circuit ideal battery (no internal resistance): parallel brightness unchanged when bulbs added matches quiz. OK.

## 6. Defects
| ID | Severity | Route | Steps | Expected | Actual | Owner |
|---|---|---|---|---|---|---|
| D-1 | minor (fails AC-2) | #/grade-m2, m3, m4 | Open grade page | Topics in curriculum order 1..N (spec 6.6 "in `order`") | `groupByField` groups cards by field; order e.g. 1,6,2,3,4,5,11,12,7,8,9,10 | designer |
| D-2 | minor | #/m1-08 | Read equation and canvas labels | "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" with subscripts as legend does | Plain "6CO2 + 6H2O", "C6H12O6", canvas labels "H2O", "CO2" ; also "H2O" in states canvas | designer |
| D-3 | minor (AC-11) | all sim lessons in present mode; text-lesson quiz slide | Press P | all body text >= 28 px | Panel text 30.4 px, but controls/readout labels 20.8 px, tool buttons 14.4 px, stage hint 12.8 px, chip 13.6 px, quiz slide buttons 20.8-22.4 px | designer |
| D-4 | minor | #/m1-08 | Choose "Variegated / white leaf" with light 3, CO2 high | Limiting factor: Chlorophyll | "Chlorophyll, Light, CO₂, Water, Temperature" (all factors listed). Also with dry water + white leaf. | coder |
| D-7 | minor | 9 sims: motion(has Restart), photosynthesis, thermal, pressure, reflection, solenoid, lens, circuit, ohm, states(Restart), pendulum(Restart) | Change a slider, press R or look for Reset | Spec section 7 common rule: a "Reset" button restores `initial`; R key | R key only resets the camera view; slider/segment state unchanged; only force and foodweb have a state Reset button | coder/designer |
| D-5 | minor | Home, grade pages | Press L | Language toggles (CLAUDE.md "L" language shortcut) | Nothing; key handler exists only in LessonPage/Lesson. Button works. | coder |
| D-6 | minor | #/m3-03 | Play, change mass while running/paused | Run restarts like for angle change | Mass change keeps t and state: total energy scales x3 instantly and "Lost as heat" jumps (4.3 -> 13.2 J) although nothing was lost | coder |
| D-8 | minor (cosmetic) | #/m2-02 3D 1280 px; #/m2-11 2D | Look at stage | legend and hint do not overlap; angle labels readable | Thermal: legend "Gas (in a syringe)" overlaps "Drag to rotate..." hint; reflection: "i = 35 deg" label crossed by ray, "r" label overlapped by arc | designer |
| D-9 | info | #/m3-07 | Play at x10 under SwiftShader | >= 30 fps | 14 fps, worst frame 233 ms (CPU WebGL; real GPU likely fine) | designer if reproduced on real hardware |

Not reproduced / harness only: one `openSim` timeout after reload during a 4-sim sequence at DPR 2 (states running at 14 fps starved the page); a clean sequential navigation of 15 sim routes then worked every time.

## 7. Regression (M.5 and tools)
- `#/chem-m5-atom`: all 4 stages (Dalton, Thomson, Rutherford, Bohr) in 2D and 3D render; no console errors; present mode hides header and shows corner logo.
- `#/periodic-table`: 118 cells; clicking Fe opens dialog with 3D canvas; Full screen toggles `full` class; Right arrow steps to Co; Esc closes.
- `#/about`: content shown, links are anchors; no network fetch.
- Header logo present (image loaded, natural width 400) on Home, grade, text lesson, sim lesson, about, periodic table, M.5, unknown route; present mode hides header and shows `.corner-logo`.

## 8. Not tested
- Real GPU / real weak school PC performance (SwiftShader only); 60 s idle fps run not done (6 s per scene).
- Formal WCAG contrast audit and screen reader behaviour (AC-14); focus visibility only partially via screenshots.
- Real browser fullscreen API (headless); Esc exit tested via key handler only.
- Planned-card disabled state (no planned lessons exist).
- Lao wording correctness and the REVIEW term list (needs teacher); Lao typography at 360 px only spot checked via English screenshots.
- Drag-based 360 rotation verified by screenshot difference, not full circle.
- States cooling curve and steam stage (run sampled to 1055 s only; boundaries read from the readout list).
- Safari/Firefox, touch input.

## Appendix: quiz answers (marked option)
Reviewed in full from the registry dump (English text) for m1-01 .. m4-11; 41 lessons, 3-4 questions each. Every marked answer is scientifically correct (examples spot-checked by calculation: m1-04 72 km/h = 20 m/s, 200 g / 50 cm3 = 4 g/cm3; m2-06 100 kJ; m3-04 42 000 J; m3-07 167 kJ; m4-03 0.6 A, 30 ohm, 24 W; m4-06 22 V; m4-07 15 cm; m4-10 20 %; m4-09 3/4; m4-02 36 g). The complete listing with the marked option per question is in the scratchpad file `quizzes.md` (C:\Users\HP\AppData\Local\Temp\claude\C--Users-HP-Downloads-lao-science-lao-science\d1869ecb-72cb-4c17-b290-494484afc76b\scratchpad\quizzes.md).
