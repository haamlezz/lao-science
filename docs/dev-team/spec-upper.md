# Spec: Upper secondary (M.5 - M.7) science lessons

Source: official upper-secondary curriculum 2011, "ຫຼັກສູດມັດທະຍົມສຶກສາຕອນປາຍ", printed pp. 32-90 (rendered pages u037-u095; u096 and later are History, out of scope). Physics pp. 32-56, Chemistry pp. 57-74, Biology pp. 75-90. Mathematics and other subjects are out of scope.

Companion files (section 2 is split out because of size; they are part of this spec and the coder must treat them as normative):
- `docs/dev-team/spec-upper-content-phys.md` (22 topics)
- `docs/dev-team/spec-upper-content-chem.md` (18 topics)
- `docs/dev-team/spec-upper-content-bio.md` (17 topics)

This spec reuses the framework, contracts and lessons of `docs/dev-team/spec.md` (lower secondary, finished) and `docs/dev-team/test-report-lower-2.md`. Where this spec is silent, `spec.md` applies.

## 0. Reading quality

All pages u037-u095 were legible. Topic titles and hours were read directly. Hour sums per subject and grade check out except one: **Biology M.6 prints 68 h in the header but its five topics add to 67** (4 + 28 + 15 + 10 + 10). I kept the topic hours as printed (assumption A-1). Biology M.5 topics V and VI (invertebrates, vertebrates) share one 20 h cell; I split 10 + 10 (assumption A-2). Content bullets and objectives are small print: objectives in the companion files are paraphrased, not verbatim. Parenthetical subject names after some physics titles (after "ການເຄື່ອນທີ່", "ຄວາມແຮງເດີນເຄື່ອນ", "ການດຸນດ່ຽງ") were too small to read reliably; I omitted them. Unreadable pages: none.

## 1. Goal and scope

Give every upper-secondary natural-science topic of M.5, M.6, M.7 (physics, chemistry, biology: 57 topics) a bilingual lesson in the existing site, in the same shape as the lower grades: objectives, key ideas, 2 discussion questions, 1 activity, minutes, a 3-5 item quiz, and for 26 topics an interactive 2D/3D simulation (18 new simulation modules, 7 lessons reusing existing modules, 1 existing bespoke lesson).

In: section 2 topics; registry/grade-page/home changes (section 4); 18 new sims (section 3). Out: mathematics and other subjects; user accounts; backend; teacher editing UI; photographs; the stretch sims in 3.4; rewriting the existing M.5 atomic-structure lesson.

## 2. Topics (57)

Kind: SIM = interactive simulation (new unless "reused"), TXT = content-only lesson (key ideas + quiz), CUSTOM = existing bespoke lesson. Batch letters refer to section 6. `field` is the subject: `phys`, `chem`, `bio`. Curriculum order is the `order` value (1-based inside the grade and subject).

### 2.1 Physics ຟີຊິກສາດ (22 topics, 11 interactive)

| id | Lao title | English title | h | kind | sim key | batch |
|---|---|---|---|---|---|---|
| p5-01 | ການເຄື່ອນທີ່ | Kinematics: motion in a line | 12 | SIM | `kinematics` | U1 |
| p5-02 | ຄວາມແຮງເດີນເຄື່ອນ | Dynamics: forces and Newton's laws | 10 | SIM | `newton` | U1 |
| p5-03 | ປະລິມານເດີນເຄື່ອນ | Momentum | 6 | TXT | | U1 |
| p5-04 | ແຮງງານ ແລະ ພະລັງງານ | Work and energy | 6 | SIM reused | `pendulum` | U1 |
| p5-05 | ການເຄື່ອນທີ່ແບບຕ່າງໆໂດຍການກະທົບຂອງແຮງ | Motion under forces (projectile, incline, circle) | 14 | SIM | `projectile` | U1 |
| p5-06 | ການດຸນດ່ຽງ (ສະຖິດສາດ) | Equilibrium (statics) | 10 | TXT | | U1 |
| p5-07 | ການປ່ຽນແປງຂອງວັດຖຸ ຍ້ອນຄວາມຮ້ອນ | Heat and changes of matter | 10 | SIM reused | `states` | U1 |
| p6-01 | ການປະກອບສ້າງ ແລະ ລັກສະນະຂອງວັດຖຸແຂງ, ແຫຼວ ແລະ ກາສ | Solids, liquids and gases | 20 | SIM reused | `gaslaw` | U4 |
| p6-02 | ໄຟຟ້າສະຖິດ | Static electricity | 14 | TXT | | U4 |
| p6-03 | ໄຟຟ້າກະແສກົງ | Direct-current electricity | 16 | SIM reused | `circuit` (`simProps: { mode: 'ohm' }`) | U4 |
| p6-04 | ກະແສໄຟຟ້າໃນແວດລ້ອມຕ່າງໆ | Current in various media | 7 | TXT | | U4 |
| p6-05 | ແສງເລຂາຄະນິດ | Geometric optics | 11 | SIM reused | `lens` | U4 |
| p7-01 | ການເຄື່ອນທີ່ປັ່ນຂອງວັດຖຸແຂງ | Rotation of rigid bodies | 8 | TXT | | U7 |
| p7-02 | ການສັ່ນໄຫວກົນຈັກ | Mechanical oscillations | 9 | TXT | | U7 |
| p7-03 | ຄື້ນກົນຈັກ | Mechanical waves | 10 | SIM | `wave` | U7 |
| p7-04 | ສຽງ | Sound | 10 | TXT | | U7 |
| p7-05 | ໄຟຟ້າແມ່ເຫຼັກ | Electromagnetism | 14 | SIM | `induction` | U7 |
| p7-06 | ກະແສໄຟຟ້າສະຫຼັບ | Alternating current | 13 | TXT | | U8 |
| p7-07 | ຄື້ນໄຟຟ້າແມ່ເຫຼັກ | Electromagnetic waves | 7 | TXT | | U8 |
| p7-08 | ຄື້ນແສງ | Light waves | 11 | TXT | | U8 |
| p7-09 | ຟີຊິກອາໂຕມ | Atomic physics | 10 | SIM | `photoelectric` | U8 |
| p7-10 | ຟີຊິກນິວເຄຼຍ | Nuclear physics | 10 | TXT | | U8 |

Hours: M.5 = 68, M.6 = 68, M.7 = 102.

### 2.2 Chemistry ເຄມີສາດ (18 topics, 8 interactive)

| id | Lao title | English title | h | kind | sim key | batch |
|---|---|---|---|---|---|---|
| c5-01 | ຄວາມຮູ້ພື້ນຖານກ່ຽວກັບເຄມີ | Basic knowledge of chemistry | 2 | TXT | | U2 |
| c5-02 | ທາດ ແລະ ການປ່ຽນແປງທາດ | Matter and its changes | 10 | TXT | | U2 |
| c5-03 | ໂຄງສ້າງອາໂຕມ | Atomic structure | 10 | CUSTOM | route `chem-m5-atom` | U0 (register) |
| c5-04 | ການພົວພັນທາງດ້ານປະລິມານຂອງທາດ | Quantitative relations: the mole | 14 | SIM | `mole` | U2 |
| c5-05 | ສູດ ແລະ ສົມຜົນເຄມີ | Formulas and chemical equations | 20 | TXT | | U2 |
| c5-06 | ກາສ, ທາດແຫຼວ ແລະ ທາດແຂງ | Gases, liquids and solids | 12 | SIM | `gaslaw` (built here first) | U2 |
| c6-01 | ຕາຕະລາງທາດມູນເຄມີ | The periodic table | 12 | SIM | `periodic` | U5 |
| c6-02 | ພັນທະເຄມີ | Chemical bonding | 12 | SIM | `bonding` | U5 |
| c6-03 | ທາດປະສົມຂອງກາກບອນ | Carbon compounds | 20 | TXT | | U5 |
| c6-04 | ທາດຊີວະໂມເລກຸນ | Biomolecules | 12 | TXT | | U5 |
| c6-05 | ເຊື້ອໄຟ ຊາກດຶກດຳບັນ ແລະ ຜະລິດຕະພັນ | Fuels, fossils and products (polymers) | 12 | TXT | | U5 |
| c7-01 | ອັດຕາການເກີດປະຕິກິລິຍາເຄມີ | Rates of reaction | 8 | SIM | `rate` | U9 |
| c7-02 | ທາດລະລາຍ | Solutions | 8 | TXT | | U9 |
| c7-03 | ສົມດຸນເຄມີ | Chemical equilibrium | 10 | TXT | | U9 |
| c7-04 | ອາຊິດ-ບາເຊ | Acids and bases | 20 | SIM | `acidbase` | U9 |
| c7-05 | ໄຟຟ້າເຄມີ | Electrochemistry | 10 | SIM | `electrochem` | U9 |
| c7-06 | ເຄມີອາຫານ ແລະ ຜະລິດຕະພັນ | Food chemistry and products | 4 | TXT | | U9 |
| c7-07 | ອຸດສາຫະກຳເຄມີ | Chemical industry | 8 | TXT | | U9 |

Hours: M.5 = 2 + 10 + 10 + 14 + 20 + 12 = 68; M.6 = 12 + 12 + 20 + 12 + 12 = 68; M.7 = 8 + 8 + 10 + 20 + 10 + 4 + 8 = 68.

### 2.3 Biology ຊີວະວິທະຍາ (17 topics, 7 interactive; UI subject label stays the existing `subjBio` "ຊີວະສາດ")

| id | Lao title | English title | h | kind | sim key | batch |
|---|---|---|---|---|---|---|
| b5-01 | ຄວາມຮູ້ພື້ນຖານກ່ຽວກັບຊີວະວິທະຍາ | Basic knowledge of biology | 7 | TXT | | U3 |
| b5-02 | ຮູບການຈັດຕັ້ງຂອງສິ່ງທີ່ມີຊີວິດ | Organisation of living things: the cell | 16 | SIM | `cell` | U3 |
| b5-03 | ການຈັດລະບົບຂອງສິ່ງທີ່ມີຊີວິດ | Classification of living things | 5 | TXT | | U3 |
| b5-04 | ລັກສະນະລວມ, ໂຄງປະກອບສ້າງ ແລະ ໜ້າທີ່ຂອງແຕ່ລະອານາຈັກ | The kingdoms: features, structure and function | 20 | SIM reused | `photosynthesis` | U3 |
| b5-05 | ສັດບໍ່ມີກະດູກສັນຫຼັງ | Invertebrates | 10* | TXT | | U3 |
| b5-06 | ສັດມີກະດູກສັນຫຼັງ | Vertebrates | 10* | TXT | | U3 |
| b6-01 | ການຈັດລະບົບໃນຮ່າງກາຍຂອງຄົນເຮົາ | Organisation of the human body | 4 | TXT | | U6 |
| b6-02 | ໂຄງປະກອບສ້າງ ແລະ ໜ້າທີ່ຂອງລະບົບຕ່າງໆໃນຮ່າງກາຍຄົນເຮົາ | Human body systems | 28 | SIM | `heart` | U6 |
| b6-03 | ການພົວພັນເຊິ່ງກັນ ແລະ ກັນ ລະຫວ່າງສິ່ງທີ່ມີຊີວິດກັບສະພາບແວດລ້ອມ | Living things and their environment: populations | 15 | SIM | `population` | U6 |
| b6-04 | ໂລກຂອງສິ່ງທີ່ມີຊີວິດ ຫຼື ຊີວະໂລກ | The biosphere | 10 | SIM reused | `foodweb` | U6 |
| b6-05 | ການສ້າງຄຸນນະພາບຊີວິດ | Building quality of life | 10 | TXT | | U6 |
| b7-01 | ວິວັດທະນາການຂອງສິ່ງທີ່ມີຊີວິດ | Evolution | 8 | SIM | `selection` | U10 |
| b7-02 | ກຳເນີດຂອງການມີຊີວິດ | Origin of life | 4 | TXT | | U10 |
| b7-03 | ກຳມະພັນວິທະຍາ ແລະ ກົນໄກການຖ່າຍທອດລັກສະນະກຳມະພັນ | Genetics and inheritance | 26 | SIM | `genetics` | U10 |
| b7-04 | ຄວາມຮູ້ພື້ນຖານກ່ຽວກັບທໍລະນີວິທະຍາ | Basic geology | 12 | TXT | | U10 |
| b7-05 | ຊີວະເຕັກໂນໂລຊີ | Biotechnology | 8 | TXT | | U10 |
| b7-06 | ການປົກປັກຮັກສາທຳມະຊາດ ແລະ ສິ່ງແວດລ້ອມ | Conservation of nature and the environment | 10 | TXT | | U10 |

\* Split of a shared 20 h cell, see A-2. Hours: M.5 = 7 + 16 + 5 + 20 + 20 = 68; M.6 = 4 + 28 + 15 + 10 + 10 = **67** (header says 68, see A-1); M.7 = 8 + 4 + 26 + 12 + 8 + 10 = 68.

### 2.4 Totals

| Grade | Physics | Chemistry | Biology | Topics | Hours (as summed) |
|---|---|---|---|---|---|
| M.5 (ມ.5) | 7 | 6 | 6 | 19 | 204 |
| M.6 (ມ.6) | 5 | 5 | 5 | 15 | 203 |
| M.7 (ມ.7) | 10 | 7 | 6 | 23 | 238 |
| Total | 22 | 18 | 17 | **57** | 645 |

### 2.5 Per-topic lesson content

Objectives (2-5, Lao + English), key ideas (3-5), exactly 2 discussion questions, 1 activity and minutes for every TXT and SIM topic are in the three companion files. The existing `chem-m5-atom` lesson is not rewritten.

Rules for the coder when transcribing:
1. Every `L` has `lo` and `en`. Chemical symbols and formulas stay Latin with Unicode sub- and superscripts (H₂O, CO₂, Cu²⁺, SO₄²⁻, m/s², 10⁻¹²).
2. **Names of persons are written in Latin letters in the Lao text** (CLAUDE.md): Newton, Pascal, Archimedes, Bernoulli, Hooke, Coulomb, Kirchhoff, Faraday, Lenz, Young, Doppler, Boyle, Charles, Gay-Lussac, Avogadro, Dalton, Mendel, Darwin, Lamarck, Linnaeus, Miller, Oparin, Benedict, Le Chatelier, Arrhenius, Brønsted-Lowry, Lewis. The companion files sometimes spell some of them in Lao (for example "ນິວເຕີນ", "ບອຍ", "ຊາລ", "ຄູລົງ", "ຟາຣາເດ", "ເລນສ໌"); replace those with the Latin name. SI unit names derived from persons are written as the symbol (N, Pa, J, W, T, V, Ω, Hz).
3. `summary` = one sentence derived from the first objective. Quiz = 3-5 items per ready lesson, 3-4 options, written from the objectives; the numeric examples in the Q lists are good quiz material.
4. All Lao is an AI draft. Terms not seen verbatim in the curriculum are marked `// REVIEW` at the top of the content file and listed in the batch report (see section 9).
5. Wording corrections that override the companion files (typing slips found on re-read):

| Where | Use instead |
|---|---|
| p6-02 Act | ຖູໄມ້ບັນທັດພລາສຕິກກັບຜົມ ແລ້ວດູດເສດເຈ້ຍນ້ອຍໆ ແລະ ເອົາໄປໃກ້ສາຍນ້ຳບາງໆ ເບິ່ງສາຍນ້ຳໂຄ້ງ |
| p6-04 Q2 | ເປັນຫຍັງເວລາຟ້າຮ້ອງຝົນຕົກ ຈຶ່ງບໍ່ຄວນຢືນໃຕ້ຕົ້ນໄມ້ສູງ ຫຼື ກາງທົ່ງໂລ່ງ? |
| p7-01 Q2 | ເປັນຫຍັງຈັບບ່ອນໄກບານພັບປະຕູ ຈຶ່ງເປີດງ່າຍກວ່າ? |
| p7-02 Q1 | ສະປຣິງ k = 50 N/m ຫ້ອຍມວນ 0.5 kg ມີຄາບເທົ່າໃດ? |
| p7-07 Q2 | ເປັນຫຍັງໂທລະສັບໃນລິບ ຫຼື ຖ້ຳ ສັນຍານອ່ອນ? |
| c5-02 Q1 | ນ້ຳນົມ, ນ້ຳເກືອ ແລະ ນ້ຳຂຸ່ນຕົມ ເປັນທາດເນື້ອດຽວ, ໂກໂລອິດ ຫຼື ທາດແຂວນລອຍ? |
| c5-05 Act | ໃຫ້ກຸ່ມຕັດບັດສັນຍາລັກອາໂຕມ ແລະ ຈັດເປັນສົມຜົນທີ່ດຸນ |
| c6-03 Q1 | ເພັນເທນ C₅H₁₂ ມີໄອໂຊເມີຈັກແບບ? |
| c7-01 Act | ໃສ່ເມັດຢາເມັດຟູ ໃນນ້ຳເຢັນ ແລະ ນ້ຳອຸ່ນ ແລ້ວຈັບເວລາຈົນເມັດໝົດ |
| c7-07 Idea 2 | ສະບູ: ໄຂມັນ + ໂຊດາໄຟ (NaOH) → ສະບູ + ກລີເຊຣອລ |
| b5-02 Q2 | ເປັນຫຍັງຜັກທີ່ແຊ່ໃນນ້ຳເກືອເຂັ້ມ ຈຶ່ງເຫຍ່ວ? |
| b5-03 Q2 | ສັດສອງຊະນິດໃນສະກຸນດຽວກັນ ຄ້າຍກັນຫຼາຍກວ່າສັດສອງຊະນິດຕ່າງອານາຈັກບໍ? |
| b5-05 Idea 1 | ... ແມງໄມ້ ແລະ ກຸ້ງ (arthropods), ເອກິໂນເດີມ (echinoderms) |
| b6-01 Act | ວັດອຸນຫະພູມຮ່າງກາຍ ແລະ ຊີບພະຈອນ ກ່ອນ-ຫຼັງ ແລ່ນຢູ່ກັບທີ່ 2 ນາທີ |
| b6-02 Q2 | ເປັນຫຍັງຕ້ອງດື່ມນ້ຳ ຫຼັງອອກແຮງ? |

## 3. Interactive versus content-only

### 3.1 Classification summary

| | Interactive lessons | of which new module | of which reused module | Custom | Content-only |
|---|---|---|---|---|---|
| Physics (22) | 11 | 6 (`kinematics`, `newton`, `projectile`, `wave`, `induction`, `photoelectric`) | 5 (`pendulum`, `states`, `gaslaw`, `circuit` ohm, `lens`) | | 11 |
| Chemistry (18) | 8 | 7 (`mole`, `gaslaw` first built here, `periodic`, `bonding`, `rate`, `acidbase`, `electrochem`) | 0 | 1 (`chem-m5-atom`) | 10 |
| Biology (17) | 7 | 5 (`cell`, `heart`, `population`, `genetics`, `selection`) | 2 (`photosynthesis`, `foodweb`) | | 10 |
| Total (57) | **26** | **18 lessons** | **7 lessons** | **1** | **31** |

The 18 new simulation modules are exactly the 18 new-module lessons above (one module each): kinematics, newton, projectile, wave, induction, photoelectric, mole, gaslaw, periodic, bonding, rate, acidbase, electrochem, cell, heart, population, genetics, selection. `gaslaw` is built once (batch U2, chemistry c5-06) and reused by p6-01 in U4.

### 3.2 Reuse mapping (no new module code)

| Lesson | Reused `sim` key | Why it fits | Change allowed |
|---|---|---|---|
| p5-04 Work and energy | `pendulum` | Ep, Ek, total bars, damping heat bar; conservation of mechanical energy | Content only |
| p5-07 Heat | `states` | Heating curve, plateaus, Q = mcΔT, Q = mL (water 0.5 kg model) | Content only |
| p6-01 Solids, liquids, gases | `gaslaw` | Gas laws are the sim-able part of the topic | Content only; fluid pressure and buoyancy stay in the text |
| p6-03 DC electricity | `circuit` with `simProps: { mode: 'ohm' }` | Series/parallel, Ohm, power | Content only |
| p6-05 Geometric optics | `lens` | Thin-lens formula, real/virtual image | Content only |
| b5-04 Kingdoms | `photosynthesis` | Plant photosynthesis limiting factors | Content only |
| b6-04 Biosphere | `foodweb` | 10 % energy rule, removal effects | Content only |

### 3.3 New simulations: specification

Common rules (apply to all; same as `spec.md` section 7 plus lessons learned):
- Pure formulas in `src/sims/<key>.ts` (no React/three), unit-tested with the "Checks" numbers below; scenes only draw. Constants and units shown on screen.
- `SimDef<S>` contract from `src/scenes/sims/host.tsx` unchanged. Host module `src/scenes/sims/<key>.tsx` default-exports `makeSimHost(def)`; scene in `src/scenes/sims/<Key>Scene.tsx`. Loaded lazily, listed in the `SIMS` registry.
- 2D = orthographic flat, rotation disabled; 3D = perspective + OrbitControls 360°. Planar sims are drawn on a plane in both views with slight thickness (they must not vanish edge-on).
- Every sim has: a "Reset" that restores **all** controls to `initial` and the camera (same as the R key; "Restart" is a different button that only restarts a run); live readouts with `aria-live="polite"`; legend of at most 3 entries; `notToScale` true when the drawing is exaggerated or schematic.
- Canvas labels: Latin letters, digits and symbols only, via `Label.tsx`; Unicode sub/superscripts and Greek letters on canvas only after the coder confirms the glyphs render (risk R-4). Lao sentences only in HTML panels.
- Performance: dpr <= 1.5; <= 64 segments per round mesh; use `InstancedMesh` for > 40 particles; particle cap 120; wave surface grid <= 64 x 64.
- Numbers are shown with units and 3 significant figures unless stated.
- "Scientific constraints" are the "must be true" items the tester can check by eye.

#### S1 `kinematics` (p5-01)
- Controls: mode segment `uniform` | `accelerated` | `freefall`; initial position x₀ −20..20 m step 5; initial velocity v₀ −10..20 m/s step 1 (free fall: v₀ upward 0..20); acceleration a −5..5 m/s² step 0.5 (disabled in uniform; free fall fixed g = 9.8 m/s² downward); drop height 0..50 m (free fall); Play/Pause/Restart; Reset.
- Drawn: a car on a ruler track (uniform, accelerated) or a ball against a vertical ruler (free fall); live x–t and v–t graphs (HTML SVG; reuse the `MotionGraph.tsx` approach and `useTicker.ts`); slope marker on x–t, shaded area under v–t.
- Formulas: x = x₀ + v₀t + ½at²; v = v₀ + at; free fall upward-positive: y = y₀ + v₀t − ½gt², v = v₀ − gt, H = v₀²/(2g), time to top v₀/g; displacement = area under v–t.
- Scientific constraints: x–t is a straight line for uniform and a parabola for accelerated; v–t is a straight line with slope a; at the top of a throw v = 0 while a stays −g; no air resistance (stated); distance and displacement differ when direction reverses (both shown).
- Checks: v₀ = 0, a = 2, t = 5 s → x = 25.0 m, v = 10.0 m/s; v₀ = 10, a = −2, t = 5 → v = 0, x = 25.0 m, and at t = 10 v = −10 m/s with displacement 0 and distance 50 m; drop from 20 m → t = 2.02 s, v = 19.8 m/s; throw up v₀ = 19.6 m/s → H = 19.6 m at t = 2.00 s, lands at t = 4.00 s with v = −19.6 m/s.
- Reuse: `MotionGraph.tsx`, `useTicker.ts`, pattern of `src/sims/motion.ts` (import, do not copy).

#### S2 `newton` (p5-02)
- Controls: mass 1..10 kg step 1; applied force F 0..50 N step 5 (horizontal on the flat, along the slope pointing up the slope on the incline); surface `frictionless` (μ = 0) | `wood` (μₛ 0.40, μₖ 0.30) | `rough` (μₛ 0.60, μₖ 0.50); layout `flat` | `incline` with angle 0..45° step 5; show forces (weight, normal, applied, friction); Play/Restart; Reset.
- Drawn: block on a flat surface or ramp; arrows (`Arrow.tsx`) for W, N, F, f scaled to magnitude; live a, v, f values; reaction pair on the surface shown as a dashed arrow (Newton's 3rd law).
- Formulas (g = 9.8): N = mg cos θ (θ = 0 on the flat). Driving tendency along the slope (positive up the slope) T = F − mg sin θ. If |T| ≤ μₛN the block stays at rest (or keeps v = 0): a = 0 and friction f = −T. Otherwise it accelerates in the direction of T with a = (|T| − μₖN)/m, friction opposing the motion. A moving block keeps velocity when T = μₖN (a = 0).
- Scientific constraints: friction never exceeds μₛN at rest and never reverses the motion; a = 0 means constant velocity, not zero velocity; W in N (mg), mass in kg.
- Checks: m = 5, F = 30, frictionless → a = 6.00 m/s²; wood → f = 14.7 N, a = 3.06 m/s²; wood, F = 15 → a = 0 and f = 15.0 N (static, μₛN = 19.6 N); rough, F = 30 → a = 1.10 m/s²; incline 30°, F = 0, frictionless → a = 4.90 m/s² down the slope; incline 30°, F = 0, wood → a = 2.35 m/s²; incline 15°, F = 0, wood → stays at rest (tan 15° = 0.27 < 0.40).
- Reuse: crate drawing and friction logic of `ForceScene.tsx` / `src/sims/force.ts`, `Arrow.tsx`.

#### S3 `projectile` (p5-05)
- Controls: launch speed 5..50 m/s step 1; angle 0..90° step 5; launch height 0 | 10 m; gravity `Earth` (9.8) | `Moon` (1.6, same constant as the existing force sim); toggle "show components" (vₓ, v_y arrows); toggle "drop a second ball" (released from the launch height at t = 0); Fire/Pause/Restart; Reset.
- Drawn: ground grid with metre ticks, launcher, ball and trace (dots every 0.25 s), velocity vectors, landing marker; live t, x, y, vₓ, v_y; readouts H, R, T.
- Formulas: vₓ = v₀ cos θ; v_y0 = v₀ sin θ; x = vₓt; y = h₀ + v_y0 t − ½gt²; T = (v_y0 + √(v_y0² + 2gh₀))/g; H = h₀ + v_y0²/(2g); R = vₓT; (h₀ = 0) R = v₀² sin 2θ / g.
- Scientific constraints: vₓ constant; v_y changes at rate g; no air resistance (stated); 30° and 60° give equal range when h₀ = 0; the dropped ball and a horizontally launched ball (θ = 0) land at the same time.
- Checks: v₀ = 20, θ = 45°, h₀ = 0, Earth → R = 40.8 m, H = 10.2 m, T = 2.89 s; θ = 30° and 60° → R = 35.4 m both; Moon, 45° → R = 250 m; v₀ = 10, θ = 0, h₀ = 10 → T = 1.43 s, R = 14.3 m.
- Reuse: `Arrow.tsx`, `useTicker.ts`. No existing projectile scene.

#### S4 `gaslaw` (c5-06 built first; reused by p6-01)
- Controls: law segment `boyle` (T constant) | `charles` (p constant) | `gaylussac` (V constant) | `free` (pV = nRT, all three sliders); amount n fixed 0.100 mol (slider 0.050..0.200 only in `free`); volume 1.0..5.0 L step 0.5 (piston); temperature 200..600 K step 20 (also shown in °C); Reset.
- Drawn: cylinder with piston and particles (speed ∝ √T, visible wall hits), thermometer, pressure gauge; live p–V graph (hyperbola in `boyle`), V–T graph (straight line, extrapolated to 0 K in `charles`), p–T graph.
- Formulas: p = nRT/V, R = 8.314 J/(mol·K); Boyle p₁V₁ = p₂V₂; Charles V₁/T₁ = V₂/T₂; Gay-Lussac p₁/T₁ = p₂/T₂; T(K) = t(°C) + 273.15; molar volume at STP V = nRT/p = 22.4 L/mol (0 °C, 101.325 kPa).
- Scientific constraints: T always in kelvin inside formulas; particle number fixed in the three law modes; p ∝ 1/V at constant T; no value below 0 K; the held constant quantity is stated.
- Checks: n = 0.100, T = 300 K, V = 2.00 L → p = 124.7 kPa; Boyle V = 1.00 L → p = 249.4 kPa; Charles p = 124.7 kPa, T = 400 K → V = 2.67 L; Gay-Lussac V = 2.00 L, T = 600 K → p = 249.4 kPa; n = 1.000, T = 273.15 K, p = 101.325 kPa → V = 22.4 L.
- Reuse: particle box of `StatesScene.tsx`; piston idea of `PressureScene.tsx`.

#### S5 `wave` (p7-03)
- Controls: mode `travelling` | `superposition` | `standing`; frequency 0.5..5 Hz step 0.5; wavelength 0.5..3 m step 0.5; amplitude 0.2..1.0 step 0.2; second-wave amplitude and phase difference φ 0..360° step 30 (superposition); harmonic n 1..5 (standing; string length 1.5 m, λ = 2L/n); Play/Pause; Reset.
- Drawn: 2D: wave line(s) and their sum in a bright colour, node/antinode markers, one marked particle that only moves up and down; 3D: ripple surface from two point sources (grid <= 64 x 64) showing interference lines; HTML readouts v, T, ω, λ.
- Formulas: v = fλ; T = 1/f; k = 2π/λ; y = A sin(kx − ωt); sum y₁ + y₂; resultant amplitude |A₁ + A₂e^{iφ}|; standing y = 2A sin(kx) cos(ωt); fₙ = nv/(2L); nodes at x = mλ/2.
- Scientific constraints: the wave carries energy, the particles do not travel along x; φ = 0 doubles the amplitude and φ = 180° with equal amplitudes gives zero; a fixed end is a node.
- Checks: f = 2 Hz, λ = 1.5 m → v = 3.00 m/s; A₁ = A₂ = 1: φ = 0 → 2.00, φ = 90° → 1.41, φ = 180° → 0.00; standing, L = 1.5 m, v = 3.0 m/s: n = 1 → f = 1.00 Hz with 2 nodes (the ends only), n = 3 → f = 3.00 Hz with 4 nodes.
- Reuse: none (`useTicker.ts`, `Label.tsx` only).

#### S6 `induction` (p7-05)
- Controls: mode `magnet` | `generator`. Magnet: magnet speed 0..2 m/s step 0.5 and direction (into / out of the coil), turns N 20..200 step 20, polarity flip, "drag the magnet" slider for position x (−0.3..+0.3 m). Generator: B 0.05..0.5 T step 0.05, turns N 50..200, area A fixed 0.01 m², frequency 10..60 Hz; Play; Reset.
- Drawn: bar magnet, coil, galvanometer needle or LED, field lines (reuse the code of `SolenoidScene.tsx`), live ε–t graph; generator: rotating loop in a field with the sine graph and rms/peak markers.
- Formulas (magnet): flux model Φ(x) = Φ₀/(1 + (x/w)²), Φ₀ = 1.00 mWb, w = 0.05 m (illustrative, labelled); ε = −N dΦ/dt = −N (dΦ/dx) v. Generator: ε(t) = NBAω sin ωt, ω = 2πf, ε_rms = ε_peak/√2.
- Scientific constraints: no relative motion gives ε = 0; the sign flips between entering and leaving, and when the polarity is flipped (Lenz: the induced current opposes the change); ε ∝ N and ∝ speed; generator peak ∝ B, N and f.
- Checks: magnet N = 100, v = 1.0 m/s → peak |ε| = 1.30 V at x = ±0.029 m; N = 50 → 0.65 V; v = 0 → 0; generator N = 100, B = 0.1 T, A = 0.01 m², f = 50 Hz → ε_peak = 31.4 V, ε_rms = 22.2 V, period 20.0 ms.
- Reuse: field-line and compass code of `SolenoidScene.tsx`.

#### S7 `photoelectric` (p7-09)
- Controls: mode `photoelectric` | `spectrum`. Photoelectric: metal `Cs` (W₀ 2.1 eV) | `Na` (2.3) | `Zn` (4.3) | `Cu` (4.7); light wavelength 200..700 nm step 10; intensity 0..10 (relative); show stopping voltage; Reset. Spectrum: initial level n_i 2..6 and final level n_f 1..5 (n_f < n_i); Reset.
- Drawn: metal plate, photons (arrows, colour from wavelength), ejected electrons (count ∝ intensity when emission occurs), voltmeter for V_s; spectrum: energy-level diagram, jump arrow and emitted photon, wavelength mark on a spectrum strip (reuse `BohrScene.tsx` / `ElementAtomScene.tsx`).
- Formulas: E = hc/λ with hc = 1240 eV·nm; K_max = E − W₀ if E > W₀, else no emission; λ₀ = 1240/W₀; V_s = K_max/e (volts equal K_max in eV); current ∝ intensity when emitting; hydrogen Eₙ = −13.6/n² eV, ΔE = 13.6(1/n_f² − 1/n_i²) eV, λ = 1240/ΔE.
- Scientific constraints: below threshold no emission at any intensity; raising intensity raises the count, not K_max; raising frequency raises K_max linearly; photon energies in eV; lines with n_f = 2 are the visible Balmer lines, n_f = 1 is ultraviolet (flagged "not visible").
- Checks: Na, 400 nm → E = 3.10 eV, K_max = 0.80 eV, V_s = 0.80 V; Na, 600 nm → no emission even at intensity 10; threshold wavelengths Cs 590 nm, Na 539 nm, Zn 288 nm, Cu 264 nm; Na 400 nm intensity 4 → 8: count doubles, K_max unchanged; hydrogen 3 → 2 = 656 nm (±1), 4 → 2 = 486 nm, 5 → 2 = 434 nm, 6 → 2 = 410 nm; 2 → 1 = 122 nm.
- Reuse: photon/level drawing of `BohrScene.tsx`; `src/data/elements.ts` for H.

#### S8 `mole` (c5-04)
- Controls: substance `H₂O` | `CO₂` | `NaCl` | `Fe` | `O₂` | `C₆H₁₂O₆` | `CaCO₃`; input quantity as `mass (g)` | `moles` | `particles` | `gas volume at STP` (the last only for gases, disabled with a note otherwise); slider/number input; Reset.
- Drawn: a pile of particle spheres (instanced; schematic count cue, labelled), a balance showing the mass, a mole bar for n, a gas cylinder at STP; molar mass from the formula composition with atoms listed.
- Formulas: school molar masses (g/mol): H 1.0, C 12.0, N 14.0, O 16.0, Na 23.0, Mg 24.0, S 32.0, Cl 35.5, Ca 40.0, Fe 56.0; M = Σ(atoms × mass); n = m/M; N = n × 6.022×10²³ mol⁻¹; V(STP) = n × 22.4 L; mass percent = (mass of the element in the formula)/M × 100.
- Scientific constraints: the particles of an ionic compound are "formula units", of a metal "atoms", of a molecular substance "molecules"; gas volume only for gases (H₂O, NaCl, Fe, C₆H₁₂O₆, CaCO₃ are not gases at STP); the drawn particle count is schematic.
- Checks: H₂O 36.0 g → n = 2.00 mol, N = 1.20×10²⁴ molecules; CO₂ 11.0 g → 0.250 mol, V = 5.60 L, 1.51×10²³ molecules; NaCl 5.85 g → 0.100 mol, 6.02×10²² formula units; O₂ 1.00 mol → 32.0 g and 22.4 L; H₂O mass percent H 11.1 %, O 88.9 %.
- Reuse: `ptElements` for symbols (masses come from the school table above, A-9).

#### S9 `periodic` (c6-01)
- Controls: property `atomic radius` | `first ionisation energy` | `electronegativity`; series `Period 2` | `Period 3` | `Group 1` | `Group 17`; show on table (heat-map of the elements that have data); Reset.
- Drawn: 2D: bar chart of the series with values; the periodic table grid coloured by value. 3D: spheres of the series on a line scaled by radius (labelled "not to scale"), tiled table plane. Click an element: symbol, Z, value (HTML).
- Data (new `src/data/trends.ts`, REVIEW; common textbook numbers). Radius (empirical, pm): Li 145, Be 105, B 85, C 70, N 65, O 60, F 50; Na 180, Mg 150, Al 125, Si 110, P 100, S 100, Cl 100; K 220, Rb 235, Cs 260; Br 115, I 140. IE₁ (kJ/mol): Li 520, Be 900, B 801, C 1086, N 1402, O 1314, F 1681, Ne 2081; Na 496, Mg 738, Al 578, Si 787, P 1012, S 1000, Cl 1251, Ar 1521; K 419, Rb 403, Cs 376; Br 1140, I 1008. Pauling EN: Li 0.98, Be 1.57, B 2.04, C 2.55, N 3.04, O 3.44, F 3.98; Na 0.93, Mg 1.31, Al 1.61, Si 1.90, P 2.19, S 2.58, Cl 3.16; K 0.82, Rb 0.82, Cs 0.79; Br 2.96, I 2.66. Noble gases: no EN ("no data").
- Scientific constraints: radius falls across a period and rises down a group; IE rises across a period with the two known dips (Be → B and N → O) and falls down a group; EN rises across and falls down; the dips are shown and explained in the readout (not smoothed).
- Checks: Period 2 radius strictly decreasing Li → F; Period 2 IE: B (801) < Be (900) and O (1314) < N (1402); Group 1 IE strictly decreasing Li → Cs; EN(Cl) − EN(Na) = 2.23; F has the maximum EN, Cs the minimum.
- Reuse: `ptElements` (symbol, name, Z, shells) of `src/data/periodicTable.ts`; `ElementAtomScene.tsx` for sphere/shell rendering.

#### S10 `bonding` (c6-02)
- Controls: bond type `ionic` | `covalent` | `metallic`; compound (ionic: NaCl, MgO, CaCl₂; covalent: H₂, O₂, N₂, H₂O, NH₃, CH₄, CO₂; metallic: Na lattice); view `electron-dot` | `ball-and-stick` | `shells`; Play (electron transfer or sharing); Reset.
- Drawn: ionic: an electron moves from the metal to the non-metal (shell diagrams, charges appear), ion lattice in 3D; covalent: shared pairs, 3D molecule with correct angles; metallic: sea of electrons. HTML: Lewis structure text, ΔEN and bond type.
- Data: EN H 2.20, C 2.55, N 3.04, O 3.44, Na 0.93, Mg 1.31, Cl 3.16, Ca 1.00. Shapes: CO₂ linear 180°, H₂O bent 104.5°, NH₃ pyramidal 107°, CH₄ tetrahedral 109.5°. Rule of thumb (labelled): ΔEN ≥ 1.7 ionic-like, 0.4-1.7 polar covalent, < 0.4 non-polar covalent.
- Scientific constraints: total charge of a formula unit is zero (Na⁺Cl⁻, Mg²⁺O²⁻, Ca²⁺ with 2 Cl⁻); atoms reach a noble-gas shell count (2 or 8); shared pairs H₂ 1, O₂ 2, N₂ 3; molecules drawn with the stated angles; CO₂ is non-polar overall although its C=O bonds are polar.
- Checks: Na (2,8,1) loses 1 → Na⁺ (2,8); Cl (2,8,7) gains 1 → Cl⁻ (2,8,8); CaCl₂ ratio 1 : 2; MgO ratio 1 : 1; ΔEN(Na–Cl) = 2.23 ionic, ΔEN(H–O) = 1.24 polar covalent, ΔEN(C–H) = 0.35 non-polar; H₂ 1, O₂ 2, N₂ 3 shared pairs; H₂O angle 104.5°.
- Reuse: `ElementAtomScene.tsx` shells, `Parts.tsx` spheres, `Arrow.tsx`.

#### S11 `rate` (c7-01)
- Controls: temperature 280..360 K step 10 (start 300); concentration (particles in the box) 10..60 step 10 (start 30); catalyst `off` | `on` (E_a 50 → 40 kJ/mol); form `lump` | `powder` (k × 4, schematic); Play/Pause; Reset.
- Drawn: particle box with collisions (effective ones flash), energy distribution with an E_a line and the shaded fraction above it, E_a energy profile (reactants, hill, products), live concentration–time curve and half-life.
- Model (stated as a simplified first-order model): k = k₃₀₀ · exp[(E_a/R)(1/300 − 1/T)] with k₃₀₀ = 0.0100 s⁻¹ at E_a = 50 kJ/mol, R = 8.314 J/(mol·K); rate = k[A]; [A] = [A]₀ e^(−kt); t½ = ln 2 / k; powder multiplies k by 4.
- Scientific constraints: raising T raises the fraction of collisions with E ≥ E_a; a catalyst lowers E_a and is not consumed; the energies of reactants and products do not change; doubling the concentration doubles the rate (first-order model).
- Checks: T = 310 K → k = 0.0191 s⁻¹ (×1.91), t½ = 36.3 s versus 69.3 s at 300 K; catalyst on at 300 K → k = 0.551 s⁻¹ (×55.1), t½ = 1.26 s; concentration 30 → 60 → rate ×2.00; T = 280 K → k = 0.00239 s⁻¹ (×0.239).
- Reuse: particle box of `StatesScene.tsx`; graph approach of `MotionGraph.tsx`.

#### S12 `acidbase` (c7-04)
- Controls: mode `pH` | `titration`. pH: substance list (0.1 M HCl, 0.01 M HCl, vinegar, coffee, pure water, blood, baking-soda solution, soap, ammonia, 0.1 M NaOH) or a dilution slider (log steps), indicator `universal` | `litmus` | `phenolphthalein` | `methyl orange`; Reset. Titration: acid `strong (HCl 0.100 M)` | `weak (CH₃COOH 0.100 M, Kₐ 1.8×10⁻⁵)`, 25.0 mL, base NaOH 0.100 M; volume of base 0..50 mL step 0.1; indicator choice; Reset.
- Drawn: pH scale bar with the marker and H₃O⁺/OH⁻ particle counts; beaker colour from the indicator; titration curve (pH versus V) with a moving point, equivalence marker and, for the weak acid, half-equivalence marker.
- Formulas: pH = −log₁₀[H₃O⁺]; pOH = 14 − pH (25 °C); strong acid before equivalence [H⁺] = (n_a − n_b)/(V_a + V_b); after equivalence [OH⁻] = (n_b − n_a)/(V_a + V_b); weak acid initial: x²/(C − x) = Kₐ solved exactly; buffer region pH = pKₐ + log([A⁻]/[HA]); weak-acid equivalence [OH⁻] = √(K_b·C_salt), K_b = 10⁻¹⁴/Kₐ. Indicator ranges: methyl orange 3.1-4.4 (red → yellow), litmus 5-8 (red → blue), phenolphthalein 8.2-10.0 (colourless → pink).
- Scientific constraints: pH + pOH = 14; one pH unit is a factor 10 in [H₃O⁺]; strong-strong equivalence is pH 7.00, weak acid with strong base is > 7; the curve is steep near equivalence; an indicator is meaningful only when its range lies in the steep part.
- Checks: 0.010 M HCl → pH 2.00; 0.1 M NaOH → pH 13.00; titration of 25.0 mL of 0.100 M HCl: V_b = 0 → pH 1.00; 10.0 mL → 1.37; 24.9 → 3.70; 25.0 → 7.00; 25.1 → 10.30; 30.0 → 11.96. Weak acid: V_b = 0 → pH 2.88; 12.5 mL → 4.74 (= pKₐ, tolerance 0.02); 25.0 mL → 8.72; 30.0 mL → 11.96.
- Reuse: none (2D charts in HTML SVG like `MotionGraph.tsx`).

#### S13 `electrochem` (c7-05)
- Controls: two metals from `Mg` | `Zn` | `Fe` | `Cu` | `Ag` (must differ; the sim assigns the anode = lower E° and reports it); concentrations fixed 1.0 M (display); circuit closed | open; Play; Reset.
- Drawn: two beakers, electrodes (anode shrinks, cathode grows), salt bridge with ion arrows, wire with electron dots (reuse `CircuitScene.tsx`), voltmeter; HTML: half-reactions, overall equation, cell notation.
- Data (standard reduction potentials, V, 25 °C): Mg²⁺/Mg −2.37; Zn²⁺/Zn −0.76; Fe²⁺/Fe −0.44; Cu²⁺/Cu +0.34; Ag⁺/Ag +0.80.
- Formulas: E°cell = E°cathode − E°anode; the electrode with the lower E° is the anode (oxidation); electrons flow anode → cathode through the wire; E°cell > 0 means spontaneous.
- Scientific constraints: oxidation at the anode, reduction at the cathode; anions move toward the anode and cations toward the cathode through the salt bridge; open circuit → 0 A (voltmeter still shows E°cell, labelled "open-circuit voltage").
- Checks: Zn | Cu → 1.10 V, Zn(s) → Zn²⁺ + 2e⁻ at the anode, Cu²⁺ + 2e⁻ → Cu(s) at the cathode; Mg | Ag → 3.17 V; Fe | Cu → 0.78 V; Zn | Ag → 1.56 V; Cu | Ag → 0.46 V; choosing the pair in the other order gives the same cell (never a negative voltage).
- Reuse: `CircuitScene.tsx` wires and charge dots; `Parts.tsx`.

#### S14 `cell` (b5-02)
- Controls: mode `organelles` | `transport`. Organelles: cell type `animal` | `plant` | `bacterium`; select an organelle (nucleus, mitochondrion, ribosome, ER, Golgi, chloroplast, vacuole, cell wall, membrane); cutaway toggle; Reset. Transport: cell `animal (red blood cell)` | `plant`; outside solution `pure water (0 %)` | `0.9 % NaCl` | `5 % NaCl`; Play; Reset.
- Drawn: 3D cutaway of the cell with organelle meshes and sprite labels (Latin names); the selected organelle highlighted with its function in HTML; transport: water arrows and the cell swelling or shrinking; the plant cell shows the cell wall limit and plasmolysis.
- Scientific constraints: a plant cell has a cell wall, chloroplasts and a large central vacuole, an animal cell has none of these; a bacterium has no membrane-bound nucleus or mitochondria (DNA in a nucleoid, ribosomes present); osmosis moves water toward the higher solute concentration; an animal cell in pure water swells and may burst, in 5 % NaCl shrinks (crenation), in 0.9 % NaCl shows no net change; a plant cell in pure water becomes turgid (the wall prevents bursting) and in 5 % NaCl is plasmolysed.
- Checks: plant has 3 more structures than animal (wall, chloroplast, large vacuole); bacterium lists no nucleus and no mitochondrion; animal in pure water → "swells"; in 0.9 % → "no net movement"; in 5 % → "shrinks"; plant in pure water → "turgid"; in 5 % → "plasmolysed".
- Reuse: sphere and geometry helpers of `Parts.tsx`; `Label.tsx`.

#### S15 `heart` (b6-02)
- Controls: heart rate 40..180 bpm step 5 (presets `rest 70`, `walking 100`, `running 150`); stroke volume 50..120 mL step 5 (default 70); toggles `blood colour` (oxygen-rich red, oxygen-poor blue) and `valves`; Play/Pause; Reset.
- Drawn: simplified 4-chamber heart (3D; Latin labels RA, RV, LA, LV, Ao, PA, VC, PV), animated cardiac cycle (atrial systole, ventricular systole, diastole), arrows to the lungs and the body; live pulse graph; HTML readouts period and cardiac output.
- Formulas: T = 60/HR s; ventricular systole t_s = 0.3·√(T/0.8) s (illustrative), diastole = T − t_s; cardiac output = HR × SV (L/min).
- Scientific constraints: the right side carries oxygen-poor blood to the lungs (pulmonary artery), the left side carries oxygen-rich blood to the body (aorta); valves make flow one-way; both ventricles contract together; resting HR 60-100 bpm; labelled "simplified / not to scale".
- Checks: 60 bpm → T = 1.00 s; 75 bpm → T = 0.80 s and systole 0.30 s; 120 bpm → T = 0.50 s; 72 bpm × 70 mL → 5.04 L/min; 150 bpm × 100 mL → 15.0 L/min.
- Reuse: none (new mesh); `useTicker.ts`.

#### S16 `population` (b6-03)
- Controls: initial N₀ 5..50 step 5 (start 10); growth rate r 0.1..1.0 per unit time step 0.1 (start 0.5); carrying capacity K 100..1000 step 50 (start 500); area 1..10 ha (density readout); model `exponential` | `logistic` | `both`; time 0..20 units; Play/Pause/Restart; Reset.
- Drawn: dots in a field (count ∝ N, capped at 150 with a "×k" note) and the N–t graph with the J- and S-curves, K line, inflection marker at K/2; limiting factors named in HTML.
- Formulas: exponential N = N₀e^(rt); logistic N = K / (1 + ((K − N₀)/N₀)e^(−rt)); dN/dt = rN(1 − N/K); density = N / area.
- Scientific constraints: exponential growth is unbounded and valid only for unlimited resources; logistic growth levels off at K; the maximum growth rate rK/4 occurs at N = K/2; N never exceeds K when N₀ < K.
- Checks: N₀ = 10, r = 0.5, K = 500: t = 4 → exponential 73.9, logistic 65.5; t = 10 → logistic 376; N = 250 is reached at t = 7.78 with growth rate 62.5 per unit time; N = 200 in 4 ha → 50 per ha.
- Reuse: graph approach of `MotionGraph.tsx`; organism sprite style of `FoodwebScene.tsx`.

#### S17 `genetics` (b7-03)
- Controls: cross `monohybrid` | `dihybrid` | `sex`. Monohybrid: trait (pea height T/t or seed shape R/r) and the two parent genotypes (each TT, Tt or tt). Dihybrid: presets TtRr × TtRr, TtRr × ttrr. Sex: XX × XY fixed. "Simulate N offspring" 10 | 40 | 100 with a seed field; Reset.
- Drawn: HTML Punnett grid with highlighted cells, genotype and phenotype tallies and bars; canvas: flat chromosome pair with alleles (2D), rotatable chromosome pair and a gamete-to-zygote animation (3D); planar sim rule applies (must not vanish edge-on).
- Formulas: each gamete receives one allele per gene; probabilities multiply; expected phenotype ratios; the simulation uses a seeded PRNG so the tester can repeat a run.
- Scientific constraints: the dominant allele is upper case and Tt shows the dominant phenotype; simulated counts vary around the expected ratio and converge as N grows; each child has a 50 % chance of XX or XY, set by the father's gamete.
- Checks: Tt × Tt → genotypes 25 % TT : 50 % Tt : 25 % tt, phenotypes 75 % : 25 % (3 : 1); Tt × tt → 1 : 1; TT × tt → 100 % Tt, 100 % dominant; TtRr × TtRr → 9/16 : 3/16 : 3/16 : 1/16 (56.25 %, 18.75 %, 18.75 %, 6.25 %); XX × XY → 50 % XX (female) : 50 % XY (male); N = 100 simulated counts sum to 100 and the same seed repeats the same counts.
- Reuse: none.

#### S18 `selection` (b7-01)
- Controls: background `green` | `brown`; initial share of green beetles p₀ 0.1..0.9 step 0.1 (start 0.5); survival of the poorly camouflaged colour 0.2..0.8 step 0.1 (start 0.4; well camouflaged fixed 0.8); generations 0..10; mode `expected` (deterministic) | `random` (seeded draw, 100 individuals); Step/Play/Restart; Reset.
- Drawn: a field with coloured beetles on the background, predator pass animation, bar of green and brown share per generation, line graph of p over generations.
- Formulas: p′ = p·s_g / (p·s_g + (1 − p)·s_b) where s is the survival of that colour on the chosen background (well camouflaged 0.8, poorly = the slider); offspring colour = parent colour (no mutation in this model, stated).
- Scientific constraints: variation and inheritance are required; selection acts on individuals (survival) but it is the population that changes; no purpose or need drives the change; equal survival keeps p unchanged in expected mode (random mode only drifts by chance).
- Checks: p₀ = 0.5, green background, s_g = 0.8, s_b = 0.4 → generation 1 p = 0.667, generation 2 = 0.800, generation 3 = 0.889; brown background mirrors it (0.333, 0.200, 0.111); s_g = s_b → p unchanged (expected mode); random mode with the same seed reproduces the same series.
- Reuse: sprite style of `FoodwebScene.tsx`; `useTicker.ts`.

### 3.4 Stretch sims (not required; only if a batch has room)
`efield` (p6-02, Coulomb force and field lines), `collision` (p5-03, 1-D momentum), `rotation` (p7-01, torque and moment of inertia), `springmass` (p7-02, SHM and resonance), `halflife` (p7-10, decay with random draws), `equilibrium` (c7-03, Le Chatelier), `organic3d` (c6-03, alkane/alkene ball-and-stick), `mitosis` (stage viewer for cell division). None is built unless asked.

## 4. Architecture delta

### 4.1 Types (`src/content/lower/types.ts`, kept in place to avoid import churn)
- `GradeKey = 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6' | 'm7'`.
- `Field` is unchanged (`phys`, `chem`, `bio` already exist and are the subject of an upper lesson). Upper lessons use only these three values; M.7 geology uses `bio`.
- `SimKey` gains the 18 new keys: `'kinematics' | 'newton' | 'projectile' | 'gaslaw' | 'wave' | 'induction' | 'photoelectric' | 'mole' | 'periodic' | 'bonding' | 'rate' | 'acidbase' | 'electrochem' | 'cell' | 'heart' | 'population' | 'genetics' | 'selection'`.
- New third lesson kind:

```ts
export interface CustomLesson extends LessonBase {
  status: 'custom'          // opens an existing bespoke page, no generic LessonPage
  customRoute: string       // 'chem-m5-atom'
  summary: L                // shown on the grade card
}
export type LessonDef = PlannedLesson | ReadyLesson | CustomLesson
```
- `GRADE_HOURS` gains `m5: 204, m6: 203, m7: 238`; new `SUBJECT_HOURS: Record<'m5' | 'm6' | 'm7', Record<'phys' | 'chem' | 'bio', number>>` = `m5 {68, 68, 68}`, `m6 {68, 68, 67}`, `m7 {102, 68, 68}`.
- `isReady` stays "is a ReadyLesson". Add `isOpenable(l)` = ready or custom (used by cards, the route resolver and the "N / total ready" counts).

### 4.2 Registry
- New `src/content/upper/`: `p5.ts, c5.ts, b5.ts, p6.ts, c6.ts, b6.ts, p7.ts, c7.ts, b7.ts` (one `LessonDef[]` each: physics, chemistry, biology per grade) and `index.ts` exporting `upperLessons` (concatenated in the order p5, c5, b5, p6, c6, b6, p7, c7, b7).
- `src/content/lower/build.ts`: `ready()` and `planned()` parse ids with `/^(m\d)-(\d+)$/`. Extend to also accept `/^([pcb])(\d)-(\d+)$/` (grade `m${digit}`, field from the letter p = phys, c = chem, b = bio; `order` = the number). No other caller changes.
- `src/content/lower/index.ts`: `allLessons = [...m1, ...m2, ...m3, ...m4, ...upperLessons]`; `GRADES` gains `m5`, `m6`, `m7` with `level: 'upper'`, `labelKey: 'gradeM5' | 'gradeM6' | 'gradeM7'` (keys exist), `route: 'grade-m5'`..; `lessonsOfGrade(grade)` sorts lower grades by `order` and upper grades by subject rank (`phys`, `chem`, `bio`) then `order`; new `lessonsOfSubject(grade, field)`; `gradeHasReady` counts `isOpenable`.
- `LEGACY_ALIASES` unchanged (`m2-force`, `m2-pressure`). `chem-m5-atom` stays the canonical hash of the bespoke lesson; `findLesson('chem-m5-atom')` and `findLesson('c5-03')` both return the `c5-03` entry; `resolveRoute` returns `{ kind: 'custom', lesson }` for either hash.
- Registration of the custom lesson (in `src/content/upper/c5.ts`): `{ id: 'c5-03', grade: 'm5', order: 3, title, hours: 10, field: 'chem', status: 'custom', customRoute: 'chem-m5-atom', summary }`, with `title` and `summary` built from `topic` in `src/content/chemM5Atom.ts` (import, do not duplicate the strings; add a `summary` there only if the topic object has none).
- `src/scenes/sims/registry.ts`: add 18 entries (dynamic imports); `SIMS` stays `Partial<Record<SimKey, …>>`.
- New pure modules `src/sims/<key>.ts` + `<key>.test.ts` for the 18 keys; `src/data/trends.ts` for `periodic`.
- Tests: `lower.test.ts` asserts `allLessons` length 41 and hour sums per `GRADES`; update it to filter by `level === 'lower'`. New `upper.test.ts`: 57 ids unique; per-grade-and-subject counts 7/6/6, 5/5/5, 10/7/6; hour sums equal `SUBJECT_HOURS` and `GRADE_HOURS`; ready-lesson shape rules as lower (2-5 objectives, 3-5 ideas, 2 questions, 3-5 quiz, answer in range, no empty lo/en); every `sim` key exists in `SIMS` once its batch is done; `c5-03` is custom with route `chem-m5-atom`; ready + planned + custom = 57.

### 4.3 Pages and routes
- `src/pages/GradePage.tsx`: handle `level === 'upper'` grades. Hero shows `levelUpper`, topic count, total hours and ready count. Body is grouped by subject in this order: Physics, Chemistry, Biology (existing `subjPhys`, `subjChem`, `subjBio` strings); each section has a heading with the subject name and its hours (from `SUBJECT_HOURS`) and the cards in curriculum order. The "group by area" checkbox is not shown for upper grades. Cards: the topic number is the per-subject `order`; chip "Interactive" for `sim` or custom, "Lesson + quiz" otherwise, "Coming soon" for planned (not clickable, `aria-disabled`). Custom cards open `#/<customRoute>`.
- `src/pages/Home.tsx`: remove the hard-coded `upper` array, `UpperGradeId`, `GradeM5` and the "coming soon" subject cards; the upper section is `GRADES.filter(level === 'upper')` rendered with the same `GradeCard`; the `gradeRoute` export is kept. `Home` no longer needs a `grade` prop.
- `src/App.tsx`: remove the `route === gradeRoute('m5') ? 'm5' : null` Home branch (the resolver returns the grade for `grade-m5..m7`); `inLesson = route === topic.id || lower.kind === 'custom'`; the bespoke page's `onHome` goes to `gradeRoute('m5')` as now.
- Hashes: `#/grade-m5`..`#/grade-m7`, `#/p5-01` ... `#/b7-06`, legacy `#/chem-m5-atom` (and `#/c5-03` as an alias).
- `LessonPage.tsx`: no logic change expected; `onBack` already goes to `gradeRoute(lesson.grade)`.
- Present mode and content-only slides: unchanged contract (`spec.md` 6.7).

### 4.4 UI strings (`src/i18n/strings.ts`, designer)
Existing and reused: `gradeM5..M7`, `levelUpper`, `subjPhys/Chem/Bio`, `topicNumber`, `hours`, `chipInteractive`, `chipLessonQuiz`, `soon`, `topicsReady`, `gradeTopics`, `gradeTotalHours`, `simReset`, `notToScale`. New per-sim prefixes (grep for collisions before adding): `kn*` kinematics, `nw*` newton, `pj*` projectile, `gl*` gaslaw, `wv*` wave, `ic*` induction, `ph*` photoelectric, `ml*` mole, `tr*` periodic trends, `bd*` bonding, `rt*` rate, `ab*` acidbase, `ec*` electrochem, `ce*` cell, `ht*` heart, `pp*` population, `gn*` genetics, `ns*` selection. Every key has `lo` and `en`.

### 4.5 Ownership split

Coder (logic, data, tests):
1. `types.ts`, `build.ts` id parsing, `upper/*.ts` content files (all 57 entries; ready ones fully written with quiz), `index.ts` registry, route resolution, tests (`upper.test.ts`, updated `lower.test.ts`).
2. `src/sims/<key>.ts` pure formulas + vitest tests for each new sim with the exact "Checks" of section 3.3; `src/data/trends.ts`.
3. `SimKey` additions; `SIMS` registry entries (once the designer's host module for the key exists).
4. `PLAN.md`: new section "ບົດຮຽນ ມ.5-ມ.7 (registry)" with ids, batches, REVIEW list.
5. REVIEW list per batch in the report.

UX/UI designer (pages, components, scenes, styles, strings):
1. `GradePage` upper grouping, `Home` upper cards, card chips, custom card, section headings.
2. Scenes and controls for each new sim (`src/scenes/sims/<key>.tsx`, `<Key>Scene.tsx`) against `SimDef`; legend, readout, hints; present-mode layout rules of UP-AC-18..21.
3. UI strings (section 4.4), styles in `src/styles.css`.

Interface: the `LessonDef`/`SimKey`/`SimDef` types and the exported pure function names of `src/sims/<key>.ts` are the contract. The coder lands types, registry and pure sim modules first; the designer builds scenes against the real function signatures. Each pure module exports an `initial`/defaults constant and the named formulas used by the readouts (for example `projectileTrajectory`, `gasPressure`, `titrationPH`); names are chosen by the coder and documented at the top of the file.

## 5. Acceptance criteria (UP-AC)

All "AC-1..AC-20" of `spec.md` section 9 still apply to ready upper lessons unless restated below. The UP-ACs add or restate them for the upper grades and include the lessons of `test-report-lower-2.md` (D-1..D-8, N-1..N-6).

Registry and navigation
- UP-AC-1. Home shows two sections, lower (M.1-M.4) and upper (M.5, M.6, M.7). Each upper card shows "N / total lessons ready" and an Open button when N >= 1 (M.5 always, because `c5-03` is open from the start).
- UP-AC-2. `#/grade-m5` lists 19 topics in three subject sections: Physics 7 (p5-01..p5-07), Chemistry 6 (c5-01..c5-06), Biology 6 (b5-01..b5-06). `#/grade-m6`: 5 + 5 + 5. `#/grade-m7`: 10 + 7 + 6. Each card has the Lao and English title and hours of section 2; each section heading shows the subject and its hours (68/68/68, 68/68/67, 102/68/68). Order inside a section is curriculum order 1..n in both languages (D-1).
- UP-AC-3. Every ready card opens its lesson by click and by `#/<id>`; planned cards are not clickable and do not navigate. From a lesson, Back returns to its own grade page; from the grade page, Back returns to Home.
- UP-AC-4. The `c5-03` card says "Interactive"; click opens the existing atomic-structure lesson at `#/chem-m5-atom`; `#/c5-03` opens the same page; the page behaves as before (4 stages, 2D/3D, 360° rotation, presentation mode, language toggle) and its Back returns to `#/grade-m5`.
- UP-AC-5. Regression: Home lower section, `#/grade-m1..m4` (9, 12, 9, 11 topics), `#/m2-force`, `#/m2-pressure`, the periodic table tool and About behave as in `test-report-lower-2.md`.
- UP-AC-6. Hour display: the grade-page totals equal the sum of the topic hours (204, 203, 238). The M.6 biology total 67 is not a defect (A-1).

Lessons and quiz
- UP-AC-7. Each ready lesson shows summary, 2-5 objectives, 3-5 key ideas, exactly 2 questions, 1 activity, minutes and a 3-5 item quiz; each SIM lesson also shows the sim. Check by loading all 56 non-custom lessons in lo and en: no raw key, NaN or undefined, and no Lao script in English mode.
- UP-AC-8. Quiz behaviour as `spec.md` AC-8 (Check disabled until a pick, mark text and explanation, score, Try again, answers not persisted, L/2/3/P/R ignored inside the quiz).
- UP-AC-9. Formulas and units use real subscripts and superscripts everywhere, in HTML and on canvas labels: H₂O, CO₂, C₆H₁₂O₆, Cu²⁺, SO₄²⁻, m/s², N·m²/C², 10⁻¹⁹ C, H₃O⁺. No plain "H2O", "CO2", "m/s2" or "10^-19" in lo or en text (D-2).
- UP-AC-10. Person names are Latin in the Lao text (rule 2 of section 2.5); chemical symbols and formulas are Latin.

Simulations (26 interactive lessons)
- UP-AC-11. Every new sim passes its "Checks" in section 3.3 by reading the on-screen readout, in both languages, with units.
- UP-AC-12. The 2D button and key 2 give a flat non-rotatable view; the 3D button and key 3 give 360° orbit by mouse drag and Auto-rotate; Reset view works; sim state survives 2D/3D switching; the scene never disappears edge-on in 3D.
- UP-AC-13. Reset restores every control, the run and the camera: after changing every slider, segment, checkbox and select, the in-panel "Reset" gives the same result as the R key (D-7). A button that only restarts a run is labelled "Restart", never "Reset".
- UP-AC-14. Canvas labels contain only Latin letters, digits and symbols; no Lao on the canvas; the HTML hint ("2D front view / Not to scale") is not overlapped by any canvas label (N-5): keep the top-left 40 px band free.
- UP-AC-15. Each "Scientific constraints" bullet of the sim holds when the tester sweeps the controls (for example `periodic` shows the B and O dips; `acidbase` strong-strong equivalence is 7.00; `bonding` angles as listed; `population` never exceeds K).
- UP-AC-16. Reused sims (p5-04, p5-07, p6-01, p6-03, p6-05, b5-04, b6-04) behave exactly as in their lower-grade lessons; only the lesson text differs.
- UP-AC-17. Shortcuts 2/3/P/L/R/arrows do not fire while typing in an input/select or inside the quiz.

Presentation mode and layout (D-3, N-1, N-2, N-4, N-6)
- UP-AC-18. Presentation mode (button and P, Esc exits; 1280x720 and 1920x1080): all teaching text is >= 28 px (computed): panel text, key ideas, slides, readouts, tables, **and the legend** and stage badges. Control chrome (buttons, slider labels, segment options) is >= 22 px and is the only documented exception. Measured per lesson in both languages.
- UP-AC-19. At 1280x720 in present mode the legend does not cover the drawing: no legend item overlaps the particle box, pyramid, graph or labelled objects, and there are at most 3 legend entries. If the stage is too short the legend moves into the side panel or collapses (N-1).
- UP-AC-20. At 1280x720 in present mode the primary controls (Play/Pause/Restart/Reset and the main slider) are fully inside the viewport without scrolling, in Lao and English (N-4). At 800x600 they are reachable by page scroll and nothing is clipped.
- UP-AC-21. The fixed corner logo never covers teaching text (N-2): the panel keeps bottom/right padding at every scroll position.
- UP-AC-22. No horizontal overflow at 360 px, 800 px and 1920 px on Home, the three grade pages and every upper lesson (N-3).
- UP-AC-23. Content-only lessons (31): present mode shows one slide per item with a counter such as "3 / 9", arrows step, WCAG AA contrast.

Quality, offline, performance
- UP-AC-24. WebGL unavailable: every sim lesson shows the existing text fallback and the rest (ideas, quiz) works; content-only lessons never need WebGL.
- UP-AC-25. Offline: after one online load of the build, go offline and reload: Home, `#/grade-m5..m7`, one lesson per subject and all 18 new sim chunks load (precache includes them). No request leaves the origin (AC-17).
- UP-AC-26. Home and grade pages do not fetch any sim chunk; a sim chunk is fetched only when its lesson opens.
- UP-AC-27. Performance: dpr <= 1.5, <= 64 segments per round mesh, instanced particles, particle cap 120, wave grid <= 64 x 64; 3D sims report >= 30 fps for a 60 s idle run on the test machine (report the number; no hard gate on SwiftShader).
- UP-AC-28. `npm run build`, `npm test` and `npx oxlint` pass; no `any`; each of the 18 pure modules has tests equal to its "Checks".
- UP-AC-29. Every `// REVIEW` term is listed in the batch report and in `PLAN.md`.
- UP-AC-30. The language toggle (button and L) changes every visible string on all upper pages instantly without losing quiz progress or sim state; L works on Home, grade pages and lessons.

## 6. Batches

Each batch = one coder run + one ux-ui-designer run (coder first for data and pure modules, designer second for scenes), then a tester run against the UP-ACs of the batch plus the regression subset (UP-AC-5). Sized to be finishable: at most 7 lessons and 3 new sims.

| Batch | Scope | New sims | Reused sims |
|---|---|---|---|
| U0 framework | types, `build.ts`, upper registry with all 57 entries (`c5-03` custom and open, all others planned), GradePage upper grouping, Home upper cards, App route fixes, tests, framework strings | none | none |
| U1 Physics M.5 | p5-01..p5-07 ready (7 lessons) | `kinematics`, `newton`, `projectile` | `pendulum` (p5-04), `states` (p5-07) |
| U2 Chemistry M.5 | c5-01, c5-02, c5-04, c5-05, c5-06 ready (5; c5-03 already open) | `mole`, `gaslaw` | none |
| U3 Biology M.5 | b5-01..b5-06 ready (6 lessons) | `cell` | `photosynthesis` (b5-04) |
| U4 Physics M.6 | p6-01..p6-05 ready (5 lessons) | none | `gaslaw` (p6-01), `circuit` ohm (p6-03), `lens` (p6-05) |
| U5 Chemistry M.6 | c6-01..c6-05 ready (5 lessons) | `periodic`, `bonding` | none |
| U6 Biology M.6 | b6-01..b6-05 ready (5 lessons) | `heart`, `population` | `foodweb` (b6-04) |
| U7 Physics M.7 A | p7-01..p7-05 ready (5 lessons) | `wave`, `induction` | none |
| U8 Physics M.7 B | p7-06..p7-10 ready (5 lessons) | `photoelectric` | none |
| U9 Chemistry M.7 | c7-01..c7-07 ready (7 lessons) | `rate`, `acidbase`, `electrochem` | none |
| U10 Biology M.7 | b7-01..b7-06 ready (6 lessons) | `genetics`, `selection` | none |
| U11 regression and review | full run of UP-AC-1..30 on all 57 lessons, REVIEW list for teachers, PLAN.md, performance numbers | none | none |

New sims per batch: U1 3, U2 2, U3 1, U5 2, U6 2, U7 2, U8 1, U9 3, U10 2 = 18. Ready lessons: 7 + 5 + 6 + 5 + 5 + 5 + 5 + 5 + 7 + 6 = 56 (+ `c5-03` custom = 57).

Gates: after U0 the site shows all 57 cards (1 open, 56 "Coming soon"); after each batch the grade pages show the new lessons open and prior batches unchanged.

## 7. Assumptions (correct me if wrong)

- A-1. Biology M.6 topic hours are kept as printed (4, 28, 15, 10, 10 = 67) although the printed grade total is 68; no 68th hour is invented. If a topic hour was misread, only `hours` and the sums in `SUBJECT_HOURS`/`GRADE_HOURS` change.
- A-2. Biology M.5 topics V and VI share one 20 h cell in the curriculum; split 10 + 10.
- A-3. `order` is per grade and subject (1-based), so a card number is the curriculum roman numeral inside its subject.
- A-4. M.7 geology (ທໍລະນີວິທະຍາ) belongs to the Biology syllabus in the curriculum and is grouped under Biology (`field: 'bio'`).
- A-5. One simulation per lesson; where a topic holds two good models (kinematics and projectile, gas laws and fluids) the second is on the stretch list or a mode of the same sim.
- A-6. `c5-03` has no quiz in this spec (unchanged); a quiz could be added later without touching the bespoke page.
- A-7. Quiz data shape, `SimDef`, host, `QuizPanel`, present mode and keyboard shortcuts are unchanged.
- A-8. Numbers in sims are common textbook data (constants, E°, IE, EN, radii); radii and E° are labelled "textbook values" in the UI and REVIEW in the content.
- A-9. `mole` uses school molar masses with one decimal (H 1.0, C 12.0, N 14.0, O 16.0, Na 23.0, Cl 35.5, Ca 40.0, Fe 56.0), matching the Lao classroom convention; the periodic table tool keeps its precise standard weights.
- A-10. Mains in Laos is quoted as 230 V, 50 Hz (REVIEW).
- A-11. The UI subject label for biology stays `subjBio` = "ຊີວະສາດ" (existing); lesson titles use the curriculum word "ຊີວະວິທະຍາ".
- A-12. Resolution targets: 1280x720 (projector) and 1920x1080 are required; 800x600 means "scroll is acceptable" (N-6 was left open in lower).
- A-13. Reproduction and drug topics (b6-02, b6-05) are factual and respectful; sensitive activities can be skipped by the teacher (as m4-01).
- A-14. The user pre-authorised all decisions; none of the above blocks building.

## 8. Risks

- R-1. **`build.ts` and the lower test hard-code lower ids and counts.** `ready()` / `planned()` throw on `p5-01`; `lower.test.ts` asserts 41 lessons. Fixed in U0 (section 4.2); do not skip, otherwise everything fails at import time.
- R-2. **Volume and Lao quality.** 56 lessons of Lao text plus about 230 quiz items; AI Lao is the main risk. Proofread, keep curriculum terms, mark uncertain ones `// REVIEW`. Teacher review is required before classroom use.
- R-3. **18 new lazy chunks.** The main chunk is already 1.5 MB; each sim must be its own chunk and in the PWA precache. Watch the precache size (1.7 MB for 33 entries before).
- R-4. **Canvas glyph coverage.** Canvas labels use a canvas-texture font; confirm that sub/superscripts (₂ ² ⁺ ⁻), Greek (λ, μ, ω, θ, Δ) and arrows (→, ⇌) render. If `⇌` is missing, use `<=>` on the canvas only, never in HTML.
- R-5. **Weak PCs and 3D load.** `cell`, `heart`, `bonding`, `wave` (ripple surface) and `periodic` are heavier than lower sims; apply the performance caps and test with SwiftShader.
- R-6. **Present-mode stage height.** The stage is only ~327 px at 1280x720 (N-1). Sims with a legend or two graphs (kinematics, acidbase, wave) need the legend/graph outside the stage or collapsible.
- R-7. **Scientific accuracy.** Textbook values differ by source (atomic radii, IE, E°). Illustrative models (induction flux, heart systole time, rate model, selection model) must be labelled as such.
- R-8. **Curriculum scope.** M.7 physics (atomic, nuclear, EM waves) is demanding; text lessons keep to the curriculum's own concept list and avoid advanced derivations.
- R-9. **Grade page length.** M.7 lists 23 cards; sections must be keyboard navigable and cards compact at 360 px.
- R-10. **Hour inconsistency** (A-1): M.6 shows 203 h; explain it in the report so nobody files it as a bug.

## 9. REVIEW terms for teachers (collect into content files as `// REVIEW`)

Physics: ຄວາມແຮງເດີນເຄື່ອນ (dynamics title), ການດຸນດ່ຽງ/ສະຖິດສາດ, ໂມເມັນຂອງແຮງ, ໂມເມັນອິນເນເຊຍ, ແຮງເຂົ້າສູນ, ແຮງກະຕຸ້ນ (impulse), ການຕົກຕາມລຳພັງ, ຈຸດຖ່ວງໜັກ, ແຮງຝືດສະຖິດ/ເຄື່ອນທີ່, ໄຟຟ້າບັນຈຸ, ທົ່ງໄຟຟ້າ, ເຄື່ອງຫ້ອນໄຟຟ້າ, ທາດເຄິ່ງນຳໄຟຟ້າ, ຕຣານຊິສເຕີ, ດັດຊະນີຫັກແສງ, ມຸມວິກິດ, ການສະທ້ອນພາຍໃນທັງໝົດ, ການສັ່ນພ້ອງ, ແອມພລິຈູດ, ຄື້ນຢືນ, ການແຊກແຊງ, ການລ້ຽວເບນ, ປາກົດການ Doppler, ກະແສໄຟຟ້າສະທ້ອນ, ໝໍ້ແປງໄຟ, ໂພລາໄຣເຊຊັນ, ປາກົດການໂຟໂຕເອເລັກຕຣິກ, ໂຟຕອນ, ກຳມັນຕະພາບລັງສີ, ເຄິ່ງຊີວິດ.
Chemistry: ສົມຜົນເຄມີ (scan reads ສົມຕົນ), ທາດເນື້ອດຽວ/ເນື້ອປະສົມ, ໂກໂລອິດ, ທາດແຂວນລອຍ, ໂມນ, ຄ່າຄົງທີ່ Avogadro, ພັນທະໄອອອງ/ໂກວາລັງ/ໂລຫະ, ເອເລັກໂຕຣເນກາຕີວິຕີ, ພະລັງງານການກາຍເປັນອີອອງ, ອາລການ/ອາລແກນ/ອາລກິນ, ໄອໂຊເມີ, ໝູ່ເຄື່ອນໄຫວ, ໂປລີເມ/ໂມໂນເມ, ອັດຕາການເກີດປະຕິກິລິຍາ, ພະລັງງານກະຕຸ້ນ, ໂມລາຣິຕີ/ໂມລາລິຕີ/ນໍມາລິຕີ, ສົມບັດຄໍລິເກຕິບ, ສົມດຸນເຄມີ, ອາຊິດ-ບາເຊ, ຈຸດສົມມູນ, ບັບເຟີ, ການຕິຕຣາ, ເຣດັອກ (redox), ປິລກາລວານິກ, ຂົວເກືອ, ແອໂນດ/ແຄໂທດ.
Biology: ອໍແກນແນລ, ໂປຣການຣິອິດ/ຢູການຣິອິດ, ອອສໂມຊິສ, ອານາຈັກ, ໂມເນຣາ, ໂປຣຕິສຕາ, ເຫັດ-ຣາ, ເນື້ອເຍື່ອ, ການປັບສົມດຸນ (homeostasis), ຮອກໂມນ, ຖົງລົມ (alveoli), ຊີວະໂລກ, ເຂດຊີວະນິເວດ, ຄວາມຈຸ (carrying capacity), ອັລລີລ, ໂຄໂມໂຊມ, ການກາຍພັນ (mutation), ວິວັດທະນາການ, ການຄັດເລືອກຕາມທຳມະຊາດ, ຟອດຊິວ, ທໍລະນີວິທະຍາ, ຊີວະເຕັກໂນໂລຊີ, ຍີນດັດແປງ (GMO).
