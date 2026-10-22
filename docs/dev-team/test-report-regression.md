# Regression test report (nav, presentation layout, auto-repeat, legends, misc)

Verdict: **FAIL (no blocker; 2 major, 4 minor)**. All 98 lesson routes load with no console or page errors. The 422 unit tests pass. Most of the recent changes verified. The remaining problems are in presentation mode, in the force and genetics sims that do not use the shared sim host.

Environment: `npm run build` (OK, PWA precache 60 entries), `npx vite preview --port 4173` (listener PID 19152, stopped by that PID only). Chromium 156 headless with SwiftShader WebGL, playwright-core installed in the scratchpad (not in the project). Service workers blocked in every context, so there was no stale cache. Viewports: 360x700, 1280x720, 1280x900, 1920x1080.
Automated: `npm test` = 32 files, 422 tests pass.

## Results per item
| # | Item | Result | Evidence |
|---|---|---|---|
| 1a | Top nav M.1..M.7 + periodic table on all pages | pass | `.top-nav` present on `#/`, about, periodic-table, 7 grade pages and all 98 lessons at 360px |
| 1b | Active highlight | pass | `#/m1-01` highlights M.1, `#/grade-m3` highlights M.3, periodic-table highlights its own link, home highlights none |
| 1c | Hidden in presentation (P) | pass | `navShown=false` in all 98 lessons at 1280 and 1920 |
| 1d | 360px: no horizontal scroll | pass | 0 of 109 pages overflow (home, about, periodic table, 7 grades, 98 lessons). Nav scrolls inside its own box |
| 1e | Home shows feature button | pass | "Periodic table / All 118 elements" button |
| 2a | Readout moved to `#sim-readout-slot`, not duplicated | pass for shared-host sims | 1280 and 1920: exactly 1 `.sim-readout-moved` in every host-based sim. 0 duplicates |
| 2b | Controls fully visible without scrolling | **fail at 1280x720** | See D-1 and D-2 |
| 2c | Legend >= 28px | pass | min 28px in all lessons at both sizes |
| 2d | Stage height | pass with note | At 1280x720, 10 sims have the stage squeezed to 282px, the minimum (m1-08, m2-04, m2-11, p5-02, p5-05, b5-02, b5-04, b6-03, p7-05, c7-03). At 1920x1080 all stages are >= 444px |
| 2e | Requested sims | mixed | c7-04, p5-01, b6-02, c5-04 pass at 1280 (strip fits, no scroll). b6-03 overflows by 5px, p7-05 by 48px with 1 control below the fold, p5-05 by 52px with 4 controls below the fold. At 1920x1080 all three fit |
| 3 | Auto-repeat checkbox | pass | Details below |
| 4a | Legends p6-05 = 3, b5-04 = 3 | pass | 3 entries each |
| 4b | Heart slider step 1 | pass | b6-02 rate 40-180 step 1. 72 bpm x 70 mL shows "5.04 L/min" |
| 4c | c7-04 "pH ≈ pKa" | pass | Weak CH3COOH titration: "Half-equivalence: 12.5 mL → pH ≈ pKa = 4.74" |
| 4d | No-WebGL | pass | WebGL disabled in p5-01, c6-02, m1-04, chem-m5-atom, b6-03, p7-03: text fallback shown, 0 `.stage-tools` (no Auto-rotate or Reset view), 0 `.stage-hint`, no errors |
| 4e | c6-02 rapid switching | pass | 366 programmatic clicks over all segment buttons, in 2D and 3D: no errors, canvas alive |
| 4f | c5-04 typed mass clamps to 200 g | partial | See D-3. The model clamps to 200 g, but the field keeps showing 201 to 999 |
| 4g | b6-03 exponential graph and numbers | pass | J curve drawn. r=1, N0=10, t=20 shows "4.85×10⁹ N" |
| 4h | p7-03 3D ripple | pass | Not cropped, legend does not overlap, in normal and presentation mode |
| 4i | Draft badge per subject | pass | p5-01 and m1-04 "physics-teacher", b5-04 "biology-teacher", c6-01 "chemistry-teacher" |
| 4j | Banned Lao words (ອາໂວກາໂດຣ, ເຄວິນ, ນິວຕັນ, ປາສຄາ, ຈູນ) | pass | Source search: only in code comments (`c5.ts:7`, `m2.ts:8`). Not in any rendered string |
| 5 | Smoke, 98 lessons | pass | 98/98 load at 360px with 0 console errors and 0 page errors (the 98 includes the legacy `chem-m5-atom` route). m3 and m4 included |
| 5 | `npm test` | pass | 422/422 |

### Item 3 detail
Setup: 1280x900. A run counts as finished when the stage and the controls stop changing.

| Sim | Off by default | Stops at end, no restart with box off | Play at end restarts | Restart with box on |
|---|---|---|---|---|
| m1-04 motion | yes | yes | yes | 1.14 s after the end |
| p5-01 kinematics | yes | yes | yes | 1.12 s |
| p5-02 newton | yes | yes | yes | 1.24 s |
| p5-05 projectile | yes | yes | yes | 1.11 s |
| c6-02 bonding | yes | yes | yes | about 1.4 s (screenshot-based) |
| b6-03 population | yes | yes | yes | 1.19 s |
| c7-01 rate | yes | yes | yes | 1.23 s |
| c7-05 electrochem | yes | yes | yes | about 1.4 s (screenshot-based) |
| p7-05 induction, magnet mode | yes | yes | yes | 1.26 s |
| m2-04 force | yes | yes: crate stays at the end of the track | n/a | restarts with the box on |

- Dragging the time slider to the end by hand: no restart for b6-03 and p5-01 (they stay put for 3.5 s).
- Force (m2-04): with F1 at 40 and F2 at 30, the crate moves, stops at the end and stays there for over 20 s. Setting F1 to 0 (net force reverses) lets it move again (8 distinct frames). The auto-repeat restart worked (17 distinct frames over 8 s). Changing only the mass while the net force keeps its sign leaves the crate at the end, which is expected because it is already at the limit.
- One flaky observation: p7-05 first Play right after page load, once, froze at x=-0.295. A later run completed normally. Likely SwiftShader shader-compile jitter. Not reproduced.

## Defects
| ID | Severity | Route | Steps | Expected | Actual | Owner |
|---|---|---|---|---|---|---|
| D-1 | major | `#/m2-04`, `#/b7-03` (also `#/m2-05` partly), presentation (P) | Open at 1280x720 or 1920x1080, press P | Controls and readout fit like the other sims, readout in the right column | These two sims do not use the shared sim host. Readout stays under the controls, `#sim-readout-slot` stays empty. m2-04: controls 772px in a 352px strip at 1280, 674 in 550 at 1920, 2 controls below the viewport. Screenshot shows the crate result row cut under "mass". b7-03 (genetics): 1044px in a 268px strip at 1280, 918 in 419 at 1920, 15 controls off screen. The Punnett table is cut. m2-05 (pressure): slot stays empty. Its readout is in the strip and the strip fits, so only a consistency issue. Screenshots: `scratchpad/t/s-m2-04-1280.png`, `s-b7-03-1280.png`, `s-m2-05-1280.png` | coder / ux-ui-designer |
| D-2 | major | presentation at 1280x720: m1-08, m2-11, p5-02, p5-05, b5-02, b5-04, b6-03, p7-05 (host-based sims) | Open, press P at 1280x720 | All buttons and sliders visible without scrolling | The strip is capped at 352px (stage squeezed to 282px) and scrolls inside itself. Overflow: m1-08 +14px, p5-02 +14, b6-03 +5, b5-04 +14, p7-05 +48 (1 control off screen), m2-11 +52 (2 off screen), p5-05 +52 (4 off screen), b5-02 +85 (2 off screen). All fit at 1920x1080, so this only affects 720p projectors | coder / ux-ui-designer |
| D-3 | minor | `#/c5-04` | Type 250 (or 201 to 999) in the "Type a value" field | Field snaps to 200 | Model uses 200 g (readout "m = 200 g") but the field keeps showing 250. Only values of 1000 or more snap (9999 shows 200), because the field text is not reset when the clamped value equals the old state. Negative numbers (-5) also stay in the field while the model keeps the previous value. Code: `NumField` in `src/scenes/sims/mole.tsx` | coder |
| D-4 | minor | all pages at widths below about 1400px (observed 1280 en/lo and 1024 lo) | Open any page at 1280px | All nav items readable | Nav scrolls inside its box. The active item is scrolled into view, so "M.1" or the left items are clipped ("rade 6") and "Periodic table" is clipped to "Periodi" at the right edge. Looks broken even though it can scroll. At 1920 it fits (scrollWidth equals clientWidth) | ux-ui-designer |
| D-5 | minor | `#/b6-03` | Set r=1 and t=20 (normal mode), look at the graph | Whole graph and end marker inside the stage | The stage's right edge cuts the end marker dot and the "20" axis label. In presentation mode at 1280x720 the in-canvas graph and dots are tiny (stage 282px) and the J curve is faint | coder / ux-ui-designer |
| D-6 | minor (carried over, not rechecked in detail) | `#/c5-04` after the change | Presentation at 1280x720 | n/a | c5-04 passes: strip 338px, no overflow. Listed only so nobody searches for it | n/a |

## Not verified
- Real GPU rendering and frame rate. Everything ran under SwiftShader, so timings are inflated and p7-05 was slower than real.
- Service worker, offline mode and stale-cache behaviour. Workers were blocked on purpose to avoid stale CSS.
- Lao text of the lessons in all rendered views was only checked by source search for the five banned words. It is not a language review.
- Touch devices. The 360px check covers layout only, at 360x700.
- Auto-repeat was not tested with the ranges at their extreme values. The end time for b6-03 was about 36 s.

Scripts and screenshots are in the scratchpad `t/` folder (not in the project).
