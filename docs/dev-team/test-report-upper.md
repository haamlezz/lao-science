# Test report: upper secondary (M.5-M.7), 57 topics, 18 new sims

Verdict: **FAIL** (no blocker; 4 major, several minor). Content, routes, quizzes, 18 sims' numeric checks, Reset/R, offline, lazy loading and no-WebGL fallback all pass. Failures: presentation legend font 24 px (UP-AC-18), one scientific error on screen (metallic bonding label), heart sim ~15 fps under SwiftShader, wrong curriculum footer on 56 lessons.

Environment: `npm run build`, `vite preview` on port 47311 (stopped by PID at the end), Chromium 156 headless with SwiftShader WebGL, playwright-core. Scripts and screenshots are in the scratchpad `up/` folder (not in the project). Quiz dump with the option marked correct by the UI: `scratchpad/up/quiz-marked-upper.md` (and `quizzes-en.md`).

## 1. Automated
| Item | Result | Evidence |
|---|---|---|
| `npm test` | pass | 32 files, 422 tests |
| `npm run build` | pass | tsc -b + vite build; PWA precache 59 entries (2204 KiB); main chunk 1,791 kB (size warning only) |
| `npm run lint` (oxlint) | pass (warnings) | only warnings (react only-export-components, react refs in projectile.tsx:55, anonymous component photoelectric.tsx:218); no errors |

## 2. Routes, content, grade pages
| Item | Result | Evidence |
|---|---|---|
| 97 lessons x lo/en (41 lower + 56 upper) open; title, summary, objectives, key ideas, 2 questions, activity, minutes, quiz present | pass | 194 loads, 0 failures: every data string found on screen, no undefined/NaN/Infinity/[object]/null, no Lao script in English panels, quiz counter "n / N" equals data |
| `#/c5-03` and `#/chem-m5-atom` | pass | both open "Atomic Structure", canvas present; card on #/grade-m5 says "Interactive 2D / 3D", Back returns to #/grade-m5 |
| Grade m5/m6/m7 counts | pass | 19 / 15 / 23 cards, lo and en |
| Hours per subject | pass | m5 68/68/68, m6 68/68/67, m7 102/68/68; totals 204 / 203 / 238 |
| Curriculum order, subject grouping | pass | Topic numbers 1..n inside Physics, Chemistry, Biology in both languages; card titles/hours equal data |
| Home upper section | pass | 3 cards "19 / 19", "15 / 15", "23 / 23 lessons ready"; lower 9/12/9/11 unchanged |
| Navigation | pass | card -> lesson -> Back = own grade page -> Back = Home |
| Lower grade pages m1..m4 | pass | 9 / 12 / 9 / 11 cards |

## 3. Quizzes
Every upper lesson quiz was run in both languages: a wrong option first (marked "Not correct", the correct one marked "Right answer", explanation shown, Next), then "Try again" and all right (score n / n). Marked-correct text equals the data answer in 194/194 runs. Scientific review: see section 8.

## 4. Simulations (numeric checks from spec section 3.3 against the on-screen readouts)
| Sim | Result | Evidence |
|---|---|---|
| kinematics p5-01 | pass | a=2,t=5: x 25.0 m, v 10.0 m/s; v0=10,a=-2: v 0 at 5 s, x 25 m; t=10: v -10, displacement 0, distance 50; drop 20 m: T 2.02 s, impact -19.8 m/s; throw 19.6: H 19.6 at 2.00 s, lands 4.00 s v -19.6 |
| newton p5-02 | pass | frictionless a 6.00; wood f 14.7 a 3.06; F=15 a 0 f 15.0 (maxstatic 19.6); rough 1.10; incline 30 deg frictionless 4.90, wood 2.35; incline 15 deg wood rests |
| projectile p5-05 | pass | R 40.8, H 10.2, T 2.89; 30/60 deg R 35.3 both (spec says 35.4, spec rounding: 400 sin60/9.8 = 35.35); Moon 250 m; h0=10, theta=0: T 1.43, R 14.3 |
| gaslaw c5-06 / p6-01 | pass | p 124.7 kPa; Boyle V=1: 249.4; Charles 400 K: V 2.67 L; Gay-Lussac 600 K: 249.4; Vm 22.4 L/mol line shown |
| wave p7-03 | pass | v 3.00; phi 0/90/180: 2.00 / 1.41 / 0.00; standing n=1 f 1.00 Hz 2 nodes, n=3 f 3.00 Hz 4 nodes |
| induction p7-05 | pass | N=100: peak 1.30 V at 0.029 m; N=50: 0.65; v=0: 0; polarity flip reverses sign; generator 31.4 V / 22.2 V / 20.0 ms |
| photoelectric p7-09 | pass | Na 400 nm: E 3.10, K 0.80, Vs 0.80; I 4->8 count 4->8, K unchanged; Na 600 nm none at I=8; thresholds 590/539/288/264; 656/486/434/410/122 nm |
| mole c5-04 | pass | H2O 36 g 2.00 mol 1.20x10^24; CO2 11 g 0.250 mol 5.60 L 1.51x10^23; NaCl 5.85 g (number field) 0.100 mol 6.02x10^22; O2 1 mol 32.0 g 22.4 L; H 11.1 % O 88.9 %; Volume STP disabled for Fe |
| periodic c6-01 | pass | all 12 series/property data equal spec; dips B<Be, O<N shown and explained |
| bonding c6-02 | pass (1 defect D-3) | NaCl 2.23, MgO 1:1 (2.13), CaCl2 1:2 (2.16); shared pairs 1/2/3; H2O 104.5, NH3 107, CH4 109.5, CO2 180 non-polar overall |
| rate c7-01 | pass | 310 K k 0.0191 (x1.91) t1/2 36.3; catalyst 0.551 (x55.1) 1.26 s; 280 K 0.00239; conc 30->60 rate 0.300->0.600; powder x4 |
| acidbase c7-04 | pass | 0.01 M HCl 2.00; 0.1 M NaOH 13.00; strong titration 1.00/1.37/3.70/7.00/10.30/11.96; weak 2.88/4.75 (spec 4.74, tol 0.02)/8.72/11.96 |
| electrochem c7-05 | pass | Zn/Cu 1.10, Mg/Ag 3.17, Fe/Cu 0.78, Zn/Ag 1.56, Cu/Ag 0.46; reversed order same cell; open circuit labelled |
| cell b5-02 | pass | animal 6 structures, plant 9 (+wall, chloroplast, vacuole), bacterium 4 with no nucleus/mitochondrion; animal pure water swells, 0.9 % no net, 5 % shrinks; plant pure water turgid, 5 % plasmolysed |
| heart b6-02 | pass (see D-7) | 60 bpm T 1.00; 75: 0.80 / 0.30; 120: 0.50; 150 x 100 mL 15.0 L/min; 70 x 70 4.90 |
| population b6-03 | pass | t=4 exp 73.9 log 65.5; t=10 log 375.9; N=250 at t=7.78, 62.5 per unit; 200 in 4 ha = 50 per ha; logistic never above K |
| genetics b7-03 | pass | Tt x Tt 3:1 and 25/50/25; Tt x tt 1:1; TT x tt 100 %; TtRr x TtRr 56.25/18.75/18.75/6.25; XX x XY 50/50; N=100 counts sum 100; same seed repeats, New seed changes |
| selection b7-01 | pass | 0.667 / 0.800 / 0.889; brown 0.333 / 0.200 / 0.111; equal survival keeps 0.500; random mode same seed same series |
| Reset button and R key restore all controls | pass | 25 sim lessons (18 new + 7 reused): after changing every segment/slider/checkbox/select/number, Reset and R both equal the initial state |
| Keys 2 / 3 / L | pass | 2/3 switch 2D/3D, L toggles language keeping sim state (mass 7 kept); ignored in quiz, in a select and in a number input |
| Presentation mode 1280x720, lo and en (25 lessons) | partial | P enters, Esc exits (50/50); no overlap among Exit/language/tools/logo/heading (0); Play/Pause/Restart/Reset/Fire fully inside viewport (0 clipped); legend 24 px FAIL (D-2); 1920x1080 same results |
| No NaN/Infinity in readouts at control extremes | pass | all 25 sims after mutate-all |
| Scene fits stage at extremes (screenshots viewed: kinematics 2D/3D, projectile Moon 50 m/s 2D/3D, gaslaw V5/T600 and V1/T200, wave 3D f5 lambda3, population exp 2D/3D, heart 180 bpm 2D/3D, periodic Group 1, acidbase titration, bonding metallic) | pass with notes | all fit; notes D-12, D-13 |
| Illustrative models labelled | pass | "Not to scale" hint on bonding, cell, heart, induction (also "Illustrative flux model"), photoelectric, gaslaw, periodic, acidbase etc.; heart "Simplified and not to scale" |

## 5. Quality
| Item | Result | Evidence |
|---|---|---|
| Horizontal overflow at 360 / 800 / 1920 px | fail (1 page) | 18 pages x 2 languages x 3 widths: only `#/about` at 360 px (scrollWidth 378 > 360; list items and button) D-9 |
| Console errors | pass | none except the known THREE.Clock warning |
| Offline reload (service worker) | pass | 27 routes reloaded offline incl. never-visited lazy sims (p7-03, c7-04, b7-03, c6-02, b6-02, p7-09, b5-02 ...), grade pages, atom lesson, periodic table, about |
| External requests | pass | 0 requests outside the origin |
| Lazy chunks | pass | Home loads only index + registerSW; grade-m7 loads no sim chunk; p5-02 loads only newton/host/useTicker/Arrow/force/physUtil |
| WebGL unavailable (p7-03, b6-02; lessons p5-01, b5-02, c6-02 too) | pass | text "This device cannot show 3D graphics. Please read the lesson text in the side panel."; panel, ideas and quiz work (D-11 cosmetic) |
| Frame rate (SwiftShader, 1280x720, 8 s, dpr 1) | fail for heart | cell 60, bonding 60, wave 60, periodic 60, projectile 60, population 60; **heart 14-15 fps** animating, 60 when paused |

## 6. Regression
| Item | Result | Evidence |
|---|---|---|
| m1-04, m2-04, m3-07, m4-07 | pass | canvas and sliders present, no console errors, lessons 41 x 2 languages pass section 2 |
| `#/periodic-table`, `#/about` | pass | 118 cells; about opens (overflow at 360 px, D-9) |
| Header logo / brand | pass | logo badge -> `#/about`, brand -> Home on grade-m6, m2-04, p7-03, periodic-table, chem-m5-atom, b6-02, p5-03, home, grade-m3 |
| Content-only lesson in present mode (p5-03) | pass | slide counter "1 / 9", ArrowRight -> "2 / 9" |

## 7. Defects
| ID | Sev | Route | Steps | Expected | Actual | Owner |
|---|---|---|---|---|---|---|
| D-1 | minor | all 56 upper lessons | open any `#/p5-01`, look at footer | Source: upper-secondary curriculum (2011) | "Source: Lower-secondary curriculum (2010), Ministry of Education and Sports" (lo: "...ຕອນຕົ້ນ (2010)...") | coder |
| D-2 | major | 19 sim lessons (p5-01, p5-02, p5-05, c5-06, p6-01, p6-03, p6-05, p5-04, p5-07, p7-03, p7-05, p7-09, c5-04, c6-01, c6-02, c7-01, c7-04, c7-05, b5-04, b6-04) | press P at 1280x720 or 1920x1080, measure legend `li` | UP-AC-18: legend >= 28 px | legend 24 px (bio sims b5-02, b6-02, b6-03, b7-01, b7-03 are fine). Also SVG graph ticks/labels 19 px in p5-01 and p7-05 | designer |
| D-3 | major (science) | `#/c6-02` Metallic | Bond type Metallic, read readout | Na⁺ (2, 8) positive ions in a sea of electrons | readout "Na⁺ (2, 8, 1) · positive ions in a "sea" of moving electrons": Na⁺ has 2, 8 electrons | coder |
| D-4 | major (perf) | `#/b6-02` | 3D or 2D, idle 8 s | >= 30 fps (UP-AC-27, report number) | 14-16 fps animating, 60 fps when Paused (per-frame cost; other 6 heavy scenes 60 fps) | coder |
| D-5 | minor | `#/c7-04`, `#/b6-03`, `#/p7-05` present mode 1280x720 | press P | primary controls and live readout visible | Mode and Indicator segments (c7-04), Time slider and Model segment (b6-03), the epsilon readout and graph (p7-05) sit below the fold of the control strip and need scrolling; Reset/Play are visible | designer |
| D-6 | minor | `#/p6-05` (5 legend items), `#/b5-04` (4) | present mode | at most 3 legend entries (UP-AC-19) | 5 and 4 entries (reused lower sims) | designer |
| D-7 | minor | `#/b6-02` | try 72 bpm | quiz and spec example 72 x 70 mL = 5.04 L/min reproducible | slider step 5: 70 or 75 only; quiz item "72 beats/min x 70 mL" cannot be shown (70 -> 4.90) | coder |
| D-8 | minor | `#/c7-04` weak acid | V = 12.5 mL | one value | big readout "pH 4.75" while text says "pH = pKa = 4.74" | coder |
| D-9 | minor | `#/about` at 360 px | open at 360 px width | no horizontal scroll (UP-AC-22) | scrollWidth 378 (list items and a button overflow) | designer |
| D-10 | minor | `#/c6-02` (robustness) | click Covalent and a compound button of the old ionic list in the same tick (script) | no crash | page goes blank, `Error: unknown molecule MgO`, no error boundary. Not reachable by single user clicks | coder |
| D-11 | minor | any sim without WebGL | disable WebGL | clean fallback | fallback text shown, but Auto-rotate / Reset view buttons and "Drag to rotate" hint still displayed | designer |
| D-12 | minor | `#/c5-04` | type 1e9 into the mass field | clamped to 0..200 g | accepted, shows 1.00x10⁹ g and 1.03x10³¹ formula units | coder |
| D-13 | minor | `#/b6-03` exponential, K=1000, r=1, N0=50, t=20 | | readable | J curve leaves the graph at t about 3 so the graph is empty; note "1 dot = 161721732"; readout in JS notation "4.85e+9" (K=100, r=1) | coder |
| D-14 | minor | `#/p7-03` 3D, f=5, lambda=3 | | scene inside stage, legend not over drawing | wave surface is cropped by the stage edges and the legend lies on it | designer |
| D-15 | minor | `#/p5-05`, `#/p5-01` free fall | read time slider | clean attribute | `max="2.8861501272920305"`, `2.020305089104421` (screen-reader value) | coder |
| D-16 | minor | all upper lessons | | note relevant to subject | "Draft · pending chemistry-teacher review" on physics and biology lessons | coder |
| D-17 | minor (Lao names/units) | c5-04 obj1; p5-07 quiz; c5-06 why; p6-01 key/why | read Lao | rule 2 of spec 2.5: person names in Latin, derived unit names as symbols | "ຄ່າຄົງທີ່ອາໂວກາໂດຣ" (Avogadro) in c5-04 objective 2; "ເຄວິນ" for K in p5-07, c5-06, p6-01. All other 40 names in the list are Latin. Lower lessons still use ນິວຕັນ (m2-04), ປາສຄາ (m2-05), ຈູນ/ວັດ (m3-03) | coder |

## 8. Scientific-accuracy findings (lesson text and quizzes, English reviewed in full, Lao checked for the same structure only)
Wrong:
- c6-02 (sim readout, metallic): "Na⁺ (2, 8, 1)" is wrong; Na⁺ is (2, 8). See D-3.

Doubtful (should be fixed or checked by the teacher):
- p7-05 key idea 4: "Generators and motors use this principle in opposite directions." A motor works through the force on a current in a field, not through induction; reword (a motor also induces back-emf).
- c7-02 activity: "Prepare 0.1 M salt solution and compare its boiling with pure water (teacher demo)". The rise for 0.1 M NaCl is about 0.1 K, not measurable with a school thermometer; use a stronger solution or a freezing-point demo.
- p6-01 quiz 4: ΔU = Q − W = −20 − (−50) = +30 J is correct but uses the convention "W = work done by the gas"; the same lesson (and the curriculum) may use ΔU = Q + W, so state the convention in the question.
- p6-04 quiz 3 explanation "It is used to turn AC into DC" explains a use, not why the diode passes one direction.
- b5-02/osmosis model: plant cell in 0.9 % NaCl is shown "turgid" (inside set to 1.5 %); fine as a model but the 1.5 % is an invented figure and is labelled only "simplified".
- c7-05 quiz 4 option "Zn only keeps water out" is partly true (barrier coating); acceptable because of "only".
- Spec rounding: p5-05 30/60 degree range is 35.3 m (not 35.4); the sim is right.

Checked and correct: all numeric quiz answers (about 190 questions) recomputed; Dalton/Boyle/Charles, Doppler, Lenz, Miller, Mendelian ratios, cardiac output, 10 % rule, half-life, photoelectric, titration pH values, E° cells, VSEPR angles, empirical formula C40/H6.7/O53.3 = CH₂O.

Scientist names in Lao text: see D-17 (one name transliterated, "Avogadro"; K unit).

## 9. Not tested
- Real GPU frame rate and the 60 s idle run of UP-AC-27 (SwiftShader, 8 s samples only); dpr cap read from canvas size (ratio 1.0 on this machine).
- 800x600 presentation layout, and 1920x1080 for all 25 sim lessons (8 sampled, same results as 1280).
- Lao language accuracy of the AI-draft text (cannot judge terminology; only structure, completeness and Latin names were checked); the `// REVIEW` list in PLAN.md (UP-AC-29) and per-module test counts versus "Checks" (UP-AC-28; 422 tests pass, not audited one by one).
- Touch gestures and screen-reader behaviour; UP-AC-21 (logo over text) only inspected on screenshots, not at every scroll position.
