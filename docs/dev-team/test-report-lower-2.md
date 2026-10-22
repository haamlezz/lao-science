# Test report 2: lower secondary regression + fixes D-1..D-8 + presentation rework

Verdict: **FAIL** (no blockers; 1 major visual defect, several minor). All 41 lessons x 2 languages, quizzes, all sim numbers, offline, no-WebGL and the M.5/periodic/about regressions pass. Fixes D-1, D-2, D-4, D-5, D-6, D-8 verified. D-7 and D-3 are only partly fixed; the presentation rework introduced or left layout defects (see section 4).

Environment: `npm run build`, `npx vite preview --port 4511` (stopped at the end), Chromium 156 headless (SwiftShader WebGL), playwright-core. Scripts live in the scratchpad (not in the project).

## 1. Automated
| Item | Result | Evidence |
|---|---|---|
| `npm test` | pass | 13 files, 218 tests |
| `npm run build` | pass | tsc -b + vite build; PWA precache 33 entries (1728 KiB); main chunk 1,495 kB warning only |
| `npx oxlint` | pass | warnings only (react only-export-components x4, static-components LessonPage.tsx:276); no errors |

## 2. Fix verification
| Item | Result | Evidence |
|---|---|---|
| D-1 order | pass | Grade pages m1..m4 in lo and en list topics 1..9 / 1..12 / 1..9 / 1..11. Checkbox "Group by area" regroups (m2: 1,6,2,3,4,5,11,12,7,8,9,10, 4 group headings) and unchecking returns to 1..n; card count constant. |
| D-2 subscripts | pass | m1-08 HTML: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", legend CO₂/H₂O/O₂, key ideas. Canvas labels rendered with subscripts (screenshots: "CO₂", "H₂O", "O₂", "C₆H₁₂O₆" tag; m3-07 canvas "H₂O"). No plain "CO2/H2O" left in page text (en and lo). |
| D-3 fonts (teaching text) | partial | Panel text, slides, readouts, tables are >= 28 px (no element of that kind below 28 in 16 lessons x 2 languages x 3 viewports). Remaining < 28 px, see section 5: control chrome 20-22 px, legend 24 px, control labels 22 px, M.5 stage badge 16-24 px. |
| D-4 limiting factor | pass | white leaf, light 3, CO₂ high -> "Limiting factor: Chlorophyll" only; white+dry -> Chlorophyll; light 0 -> Light; CO₂ low -> CO₂; temp 0 -> Temperature; all fine -> "None, every factor is enough". |
| D-5 L key | pass | L toggles language on Home, #/grade-m2, #/periodic-table, #/about (both directions, localStorage updated) and in lessons. Still ignored in quiz (previous check). |
| D-6 pendulum mass | pass | Mass 1->3 while running: t resets to 0.0, E 29.40 J, heat 0.00 (before: heat jumped); same behaviour as angle change; damped run mass change resets heat to 0. |
| D-7 Reset (button) | **partial fail** | 11 of 13 sims: change every slider/segment/checkbox, press "Reset" -> all controls identical to initial. **m2-04 force**: Reset button only restarts the crate animation (`runKey`), sliders/segments stay changed (F1 30->0, F2 30->0, mass 5->10, mode and moon stayed). **m2-06 foodweb**: Reset only clears removed organisms; chain (rice -> web) and producer energy (10 000 -> 100 000) stay. |
| D-7 R key | pass | After changing all controls and focusing body, R restores initial for all 13 sims, including force and foodweb. R also restores camera after a 3D drag (m2-05, m4-05, m2-04, m4-07: screenshot identical to start; m1-08/m3-07 inconclusive because the scenes animate when idle). |
| D-8 overlaps | pass | m2-02 3D and 2D: legend and hint do not overlap, labels on plates; m2-11 2D: "i = 35°" and "r = 35°" on dark plates, readable. See new minor N-5 for one new overlap. |

## 3. Presentation mode: matrix (13 sim lessons + 2 text + chem-m5-atom, lo and en, 1280x720, 1920x1080, 800x600)
Measured by bounding boxes in the live DOM after pressing P (96 combinations).

| Check | Result | Evidence |
|---|---|---|
| P enters, Esc exits | pass | all 96 combinations: `.present` present after P, gone after Esc. |
| No bbox overlap among Exit / language / tool buttons / corner logo / panel headings | pass (see N-2 for logo vs text) | 0 overlaps in 95 of 96. 1 false positive: chem-m5-atom en 1920, heading "Limitations" is clipped below the panel and only its box touches the logo. |
| Primary controls (Play/Pause/Restart/Reset) fully inside viewport at 1280x720 without scrolling | **fail (1 case)** | 12/13 sims pass in both languages. **m4-05 en 1280x720**: "Reset" button spans y 673-725, viewport height 720, and is clipped by the scrollable control strip (partially cut). Lao: ok. |
| Same at 800x600 | info | Layout is <= 960 px single column with page scroll: Play/Restart/Reset (m1-04, m3-03, m3-07), Reset (m2-05, m3-06, m4-03, m4-05, m4-07), foodweb Remove buttons are below the 600 px fold (y 550-720) and need scrolling. Not clipped, reachable by scroll. |
| No horizontal overflow | pass | scrollWidth == clientWidth in all 96. |
| Keys 2/3 | pass | In present mode on all 13 sims + M.5: key 2 removes the Auto-rotate tool (2D), key 3 brings it back; canvas non-blank both ways. |
| Teaching text >= 28 px | see section 5 | |
| Text lessons (m1-01, m3-04) | pass | Slides 1/9..9/9, arrows step, body 32 px, only chrome buttons 22 px. |

## 4. Canvas / stage checks
| Item | Result | Evidence |
|---|---|---|
| 3D canvas non-blank after P, P (toggle twice) | pass | All 13 sims + M.5: edge-pixel count of the stage > 90 (blank gradient = 0) after P, then P again; `.present` gone. |
| Non-blank after language toggle in present mode | pass | Button and L key; panel text changed; stage non-blank (13 sims + M.5). |
| Non-blank and correct size after resize | pass | 1280x720 -> 1000x700 -> 1920x1080 -> exit -> 700x900: canvas width == stage width every time, non-blank. Present stage height at 1280x720 is only 327 px. |
| 2D not rotatable, 3D rotates 360 | pass | 2D drag leaves static scenes identical (m2-05, m4-05, m2-04, m4-07); m1-08 2D screenshot before/after drag shows the same framing; 3D drag changes the picture on all 6 tested. |

## 5. Font sizes below 28 px in presentation mode (computed style)
| Class (element) | Size | Where | Kind |
|---|---|---|---|
| `button.btn.btn-primary` (Exit), `button.btn.btn-ghost` (language, Reset/Play/Restart) | 22 px | all lessons | chrome |
| `button`, `button.on` inside `.seg` (segmented options), `b` / `span` inside buttons (slider value) | 22 px | 12 sims | chrome / control label |
| `span` in `.m2-slider` ("Carbon dioxide (CO₂)", "Water", "Leaf", "Bar material", "Food chain", "Producer energy", "Remove an organism", "Show image", "Show normal", "Two mirrors", "Air resistance (damping)") | 22 px | m1-08, m2-02, m2-06, m2-11, m3-03 | control label |
| `button.btn.btn-tool` (Auto-rotate, Reset view) | 20 px | 13 sims + M.5 | chrome |
| `button.btn.btn-tool` (organism / bulb toggles) | 22 px | m2-06, m3-06 | control |
| `.legend li` | 24 px | 13 sims + M.5 | legend text |
| `span.who` (stage badge "John Dalton") | 24 px | chem-m5-atom | text |
| `span.model` ("Solid sphere model") | 16 px | chem-m5-atom | text (below 28 and below 20) |
| M.5 bottom nav: `span.hide-sm` "Previous", `button.btn-ghost` arrows 16 px, year `b` 20.8 px | 16-20.8 px | chem-m5-atom | chrome |

Teaching text (key ideas, summary, readouts `.m2-result`, tables, slides, quiz) is >= 28 px everywhere. The designer's rationale (controls are chrome, 20-22 px) is not a violation of "teaching text" but is below the literal AC-11 "body text >= 28 px"; the legend (24 px) and M.5 `span.model` (16 px) describe the drawing and should be decided by the lead.

## 6. Full regression
| Item | Result | Evidence |
|---|---|---|
| All 41 lessons x lo/en: title, summary, objectives count, ideas, 2 questions, activity, minutes, quiz present, no raw key / NaN / undefined, no Lao in English | pass | `issues 0`, 82 lesson loads. |
| Quizzes, all 41 lessons | pass | 0 issues (Check disabled until pick, counter, mark text, explanation, score, Try again). Reload does not restore answers; localStorage only `science-lab-lang`; language toggle keeps question and pick; keyboard-only flow works; L/2/P ignored inside quiz. |
| Sim numbers | pass | motion 50 m / 36 km/h / 25 m, 10 m/s / 100 m, 200 m; photosynthesis (see D-4); thermal +0.96 / +1.84 / +1.36 mm, gas 373/293 = 1.27, negative values with minus; force 30 vs 20 = 10 N, same 50 N, Moon 5 x 1.6 = 8 N; pressure 60/0.03 = 2000 Pa, 6000 Pa, 1000 x 9.8 x 4 = 39.2 kPa; foodweb 10000/1000/100/10/1 kJ, remove frog snake down / grasshopper up, remove rice all down, remove snake frog up / eagle down, pond top 0.1 %, web mode; reflection i=35 -> r=35, d=3 image 3, i=0 returns on itself; pendulum E 9.80 J, v 4.43 m/s, T 2.84 s, Ek+Ep constant 9.80, damped E+heat = 9.80, E within 1.5 % of 9.8 e^(-t/20); circuit basic 0.10 A / 0.10 W series, 0.90 A / 0.90 W parallel, unscrew series 0 A, parallel 0.60 A with others 0.90 W, 4 cells 3 parallel 1.80 A 3.6 W; ohm 12 V 10/20 series 30 ohm 0.40 A 4/8 V 4.8 W, parallel 6.67 ohm 1.80 A, 1||1 = 0.5 ohm 24 A, V=0 -> 0 A; states melt plateau 0 C to t~183 s+, water 23.0 C at 236 s, boil 100.0 C from ~450 s (x50 run), plateau flat; solenoid N50 I2 0.628 mT, N100 I4 2.513 mT (4x), core x200 502.655 mT 20 pins, I=0 0 pins, reverse N on left, wire 8.0 uT, bar magnet 10 mT labelled illustrative; lens f10 u30 v15 m-0.5, u20 v20 m-1, u5 v-10 m+2, u=f infinity, concave u30 v-7.5 m+0.25. |
| Offline (service worker, reload offline) | pass | Home, grade-m3, m1-01, m4-07, m2-06, m3-07, m4-05, m2-04, chem-m5-atom, periodic-table, about all render offline (sim chunks included). |
| No external requests | pass | 206 requests, all same origin. |
| No WebGL | pass | `--disable-3d-apis`: m4-07 shows "device cannot show 3D" note, tabs and quiz work, no page errors. |
| #/chem-m5-atom | pass | 4 stages render, no console errors, present hides header, corner logo shown (but see N-2, section 5). |
| #/periodic-table | pass | 118 cells, Fe dialog with canvas, Full screen toggles, arrow steps to Co, Esc closes. |
| #/about | pass at desktop | Content and links present. At 360 px see N-3. |
| Logo on every page | pass | Header logo natural width 400 on Home, grade, text lesson, sim lesson, about, periodic table, M.5, unknown route; present mode shows corner logo. |
| 1920 px / 360 px overflow, 41 lessons + 4 grade pages + Home + tools, lo and en | pass with 2 exceptions | 1920: none. 360: none for lessons/grade/home/periodic-table; exceptions N-3. |
| Console | pass | Only the known `THREE.Clock` deprecation warning; no errors, no page errors in any run. |

## 7. Defects
| ID | Severity | Route | Steps | Expected | Actual | Owner |
|---|---|---|---|---|---|---|
| N-1 | major | #/m3-07 (also #/m2-06, #/m4-07 less) present mode 1280x720, en and lo | Open, press P | Legend does not hide the drawing | Legend (3 lines of 24 px text in en) covers the lower ~40 % of the particle box (particles hidden under the text, box bottom hidden) because the stage is only 327 px tall; in m2-06 the legend covers the "Rice" and "Decomposers" labels at the bottom of the pyramid column; m4-07 lo legend lies over ray ends. Fine at 1920x1080. | ux-ui-designer |
| N-2 | minor | all sim lessons + M.5, present 1280x720 | Press P, look at bottom-right | Corner logo does not cover teaching text | Fixed corner logo (56 px) covers the right end of the last visible key-idea card in the scrolled-to-top panel (33 px overlap, e.g. "south" in m4-05 loses its final letter, "the south" is cut). Panel `padding-bottom` is only applied at the end of the scroll. | ux-ui-designer |
| N-3 | minor | #/about, #/chem-m5-atom at 360 px | Open at 360 px width | no horizontal scroll | About link buttons end at x=378 (overflow 18 px); M.5 top "▶" Play button at x=365 (overflow 5 px). Probably pre-existing, outside lower scope. | ux-ui-designer |
| N-4 | minor | #/m4-05 en, present 1280x720 | Press P | Reset fully visible | Reset button y 673-725 on a 720 px viewport, cut by the scrolling controls strip (Lao fine). Other 12 sims pass. | ux-ui-designer |
| N-5 | minor (cosmetic) | #/m1-08 2D (normal mode) | Press 2 | hint and sun label separate | Canvas label "Sun" overlaps the HTML hint text "2D front view · Not to scale" in the top-left corner. | ux-ui-designer |
| D-7 (open) | minor | #/m2-04 force, #/m2-06 foodweb | Change sliders / chain / energy, press the in-panel "Reset" | Same result as R: all controls back to initial | Force Reset only restarts the animation, foodweb Reset only clears removed organisms; R key does restore everything. Inconsistent labelling of two different actions. | coder / ux-ui-designer |
| D-3 (open) | minor | all sims present mode | Press P, inspect | per spec AC-11 body text >= 28 px | Control chrome 20-22 px, legend 24 px, M.5 `span.model` 16 px, `span.who` 24 px, M.5 nav 16 px (section 5). Teaching text itself passes. | ux-ui-designer / lead decision |
| N-6 | minor | present 800x600 | Press P on any sim | primary controls visible without scrolling | Play/Restart/Reset sit at y 550-720 on a 600 px screen (page scroll); stage hint/legend remain. Acceptable only if 800x600 is not a target. | ux-ui-designer |

Not reproduced / harness only: two helper scripts failed because of their own text selectors (clicking "Rice" hit the "Rice-field chain" segment; an `R₂` slider absent after switching to R₁ alone). Re-run with exact selectors: foodweb remove rice = all organisms down (correct).

## 8. Not tested
- Real GPU fps / weak school PC (SwiftShader only; no 60 s fps run this round).
- Real browser fullscreen API (headless); Esc handled by key handler only. Projector rendering of the 800x600 and 1280x720 layouts judged from screenshots.
- Lao wording accuracy and REVIEW terms (needs a teacher). Lao typography only checked visually in screenshots.
- Formal WCAG contrast audit (AC-14) and screen reader behaviour.
- Planned-card disabled state (no planned lessons exist).
- Camera reset by R for m1-08 and m3-07 (scenes animate when idle, screenshot hash comparison is inconclusive).
- Safari, Firefox, touch input.
