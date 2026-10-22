# Spec: Lower secondary (M.1 - M.4) natural science lessons

Source: official lower-secondary curriculum 2010, "ວິຊາວິທະຍາສາດທຳມະຊາດ", printed pp. 29-46 (rendered pages s034-s052). Pages s054-s056 (printed pp. 49-51) are Geography (ພູມສາດ) and are out of scope. Page s052-s053 (pp. 47-48) are assessment guidance only.

Reading quality: all pages were legible. Lao topic titles and hours were read directly and the hours add up exactly (M.1 = 132, M.2 = 132, M.3 = 165, M.4 = 165), which confirms the topic lists are complete. Individual objective lines are small print; the objectives below are paraphrased, not verbatim. A few words are ambiguous in the scan and are marked REVIEW (see section 9).

## 1. Goal

Give every lower-secondary natural-science topic (41 topics, M.1-M.4) a bilingual lesson in the existing site: objectives from the curriculum, key ideas, discussion questions, a classroom activity, a self-check quiz, and, for 10 topics with a clear scientific model, an interactive 2D/3D simulation. Upper secondary (M.5-M.7) comes afterwards and reuses the same framework.

## 2. Scope

In: M.1-M.4 topics in section 3; the generic framework in section 6; quiz; 10 simulations (12 including the two existing).
Out: upper secondary (M.5-M.7, a later spec); Geography; user accounts, scores saved between sessions; backend; teacher editing UI; real photographs (illustrations are inline SVG or drawn in the scenes).
Existing and kept: M.5 chemistry atomic-structure lesson, periodic table tool, About page, M.2 Force and Pressure content and scenes (migrated into the registry, behaviour unchanged).

## 3. Topic table (41 topics)

Kind: SIM = interactive simulation, TXT = content-only (key ideas + quiz). Field colour: bio, chem, phys, earth, method.
Status: BUILT = already in repo. Hours are curriculum hours.

### M.1 (ມ.1, Grade 6) - 9 topics, 132 h

| id | Lao title | English title | h | field | kind | status |
|---|---|---|---|---|---|---|
| m1-01 | ວິທະຍາສາດ ແລະ ວິທີການວິທະຍາສາດ | Science and the scientific method | 8 | method | TXT | planned |
| m1-02 | ການວັດແທກ | Measurement | 12 | method | TXT | planned |
| m1-03 | ວັດຖຸອ້ອມຕົວເຮົາ | Materials around us | 19 | chem | TXT | planned |
| m1-04 | ການເຄື່ອນທີ່ | Motion | 17 | phys | SIM `motion` | planned |
| m1-05 | ໂລກ ແລະ ດິນ | Earth and soil | 12 | earth | TXT | planned |
| m1-06 | ນ້ຳ | Water | 15 | earth | TXT | planned |
| m1-07 | ອາກາດ | Air | 12 | earth | TXT | planned |
| m1-08 | ພືດ | Plants | 19 | bio | SIM `photosynthesis` | planned |
| m1-09 | ອາຫານ | Food and nutrition | 18 | bio | TXT | planned |

### M.2 (ມ.2, Grade 7) - 12 topics, 132 h

| id | Lao title | English title | h | field | kind | status |
|---|---|---|---|---|---|---|
| m2-01 | ສັດ | Animals | 18 | bio | TXT | planned |
| m2-02 | ການປ່ຽນແປງຂອງວັດຖຸ | Changes in matter | 10 | chem | SIM `thermal` | planned |
| m2-03 | ການແຍກວັດຖຸສົມປົນ | Separating mixtures | 8 | chem | TXT | planned |
| m2-04 | ແຮງ | Force | 17 | phys | SIM `force` | BUILT (was `m2-force`) |
| m2-05 | ຄວາມດັນ | Pressure | 15 | phys | SIM `pressure` | BUILT (was `m2-pressure`) |
| m2-06 | ລະບົບນິເວດ | Ecosystems | 15 | bio | SIM `foodweb` | planned |
| m2-07 | ການປ່ຽນແປງຂອງພື້ນໂລກ | Changes of the Earth's crust | 9 | earth | TXT | planned |
| m2-08 | ຊັບພະຍາກອນໃນດິນ | Resources in the ground | 7 | earth | TXT | planned |
| m2-09 | ລັກສະນະຂອງນ້ຳ | Properties of water | 8 | earth | TXT | planned |
| m2-10 | ລັກສະນະຂອງອາກາດ | Properties of air | 7 | earth | TXT | planned |
| m2-11 | ແສງສະຫວ່າງ | Light | 9 | phys | SIM `reflection` | planned |
| m2-12 | ສຽງ | Sound | 9 | phys | TXT | planned |

### M.3 (ມ.3, Grade 8) - 9 topics, 165 h

| id | Lao title | English title | h | field | kind | status |
|---|---|---|---|---|---|---|
| m3-01 | ລະບົບຕ່າງໆໃນຮ່າງກາຍຄົນ | Human body systems | 23 | bio | TXT | planned |
| m3-02 | ການປະກອບສ້າງເປັນວັດຖຸ ແລະ ທາດຕ່າງໆ | Composition of matter and elements | 20 | chem | TXT | planned |
| m3-03 | ແຮງງານ ແລະ ພະລັງງານກົນຈັກ | Work and mechanical energy | 22 | phys | SIM `pendulum` | planned |
| m3-04 | ຄວາມຮ້ອນ | Heat | 20 | phys | TXT | planned |
| m3-05 | ລະບົບປະສາດ ແລະ ອະໄວຍະວະຮູ້ສຶກ | Nervous system and sense organs | 13 | bio | TXT | planned |
| m3-06 | ໄຟຟ້າ | Electricity | 20 | phys | SIM `circuit` (mode `basic`) | planned |
| m3-07 | ການປ່ຽນພາວະຂອງວັດຖຸ | Changes of state | 16 | chem | SIM `states` | planned |
| m3-08 | ແສງເລຂາ (ແວ່ນກົ່ງ) | Geometric optics: curved mirrors | 15 | phys | TXT | planned |
| m3-09 | ລະບົບສຸລິຍະ | The solar system | 16 | earth | TXT | planned |

### M.4 (ມ.4, Grade 9) - 11 topics, 165 h

| id | Lao title | English title | h | field | kind | status |
|---|---|---|---|---|---|---|
| m4-01 | ການສືບພັນ ແລະ ພັດທະນາການຂອງຮ່າງກາຍມະນຸດ | Human reproduction and development | 18 | bio | TXT | planned |
| m4-02 | ການປ່ຽນແປງຂອງທາດຕ່າງໆ | Changes of substances: reactions, oxygen, nitrogen | 17 | chem | TXT | planned |
| m4-03 | ໄຟຟ້າກະແສກົງ | Direct-current electricity | 20 | phys | SIM `circuit` (mode `ohm`) | planned |
| m4-04 | ນ້ຳ, ອາຊິດ, ບາເຊ ແລະ ເກືອ | Water, acids, bases and salts | 15 | chem | TXT | planned |
| m4-05 | ໄຟຟ້າແມ່ເຫຼັກ | Electromagnetism | 15 | phys | SIM `solenoid` | planned |
| m4-06 | ໄຟຟ້າກະແສສະຫຼັບ | Alternating-current electricity | 10 | phys | TXT | planned |
| m4-07 | ເລນ (ແກ້ວຕາເສືອ) | Lenses | 25 | phys | SIM `lens` | planned |
| m4-08 | ທາດອິນຄະທາດ ແລະ ທາດອະນິນຄະທາດ | Organic and inorganic compounds | 8 | chem | TXT | planned |
| m4-09 | ການຖ່າຍທອດລັກສະນະທາງກຳມະພັນ | Heredity | 12 | bio | TXT | planned |
| m4-10 | ການປ່ຽນຮູບ ແລະ ຮັກສາພະລັງງານ | Energy transformation and conservation | 15 | phys | TXT | planned |
| m4-11 | ການນຳໃຊ້ທາດເຄມີໃນການດຳລົງຊີວິດຂອງມະນຸດ | Chemicals in everyday life | 10 | chem | TXT | planned |

Totals: M.1 9, M.2 12, M.3 9, M.4 11 = 41 topics; 12 SIM entries use 11 scene modules (`circuit` is used twice).

Stretch (not required; only if a batch has room): `solar-system` (m3-09), `curved-mirror` (m3-08, reuses the ray engine of `lens`), `sound-wave` (m2-12), `punnett` (m4-09, 2D only), `circulation` (m3-01).

## 4. Business rules (cross-cutting)

1. Every lesson id in section 3 appears on its grade page, in curriculum order, with Lao and English title and hours.
2. A lesson with `status: 'planned'` is shown as a non-clickable "Coming soon" card; a `ready` lesson opens at `#/<id>`.
3. Legacy hashes `#/m2-force` and `#/m2-pressure` keep working (redirect to `m2-04` / `m2-05`).
4. Every user-visible string exists in `lo` and `en`. No hard-coded text in components.
5. Lao text uses curriculum terminology; any term not seen in the curriculum is marked `// REVIEW` in the content file. Scientist names and chemical symbols/formulas stay in English/Latin.
6. Canvas labels contain only Latin letters, digits and symbols (existing `Label.tsx`); Lao sentences only in HTML. No drei `<Html>`.
7. Sim lessons: 2D = orthographic, flat, rotation disabled; 3D = perspective + OrbitControls 360°. Sims whose model is inherently planar (`reflection`, `lens`, `circuit`, `motion`) are drawn on a plane in both modes; in 3D the plane may be orbited (it must not disappear edge-on: render with slight thickness).
8. Quiz: answers are never persisted; no localStorage beyond language.
9. Numbers shown in sims come from pure functions (section 7 formulas) in `src/sims/*.ts` and are unit-tested; scenes only draw.
10. Exaggerated visuals (thermal expansion, magnet field strength) must be labelled "exaggerated / not to scale" using existing `notToScale` string.
11. Models are shown as simplified models; no sim claims a value that the formula does not produce.

## 5. Per-topic lesson content

Format: Obj = curriculum objectives (paraphrased, 2-5). Ideas = key ideas. Q = discussion questions. Act = classroom activity. Min = suggested minutes. Each topic also needs a 3-5 question quiz (section 6.3), written by the coder from the objectives. Lao is an AI draft: the whole file is subject to teacher review; items marked REVIEW are the uncertain terms.

### M.1

#### m1-01 ວິທະຍາສາດ ແລະ ວິທີການວິທະຍາສາດ (8 h, TXT, 20 min)
- Obj:
  - ອະທິບາຍຄວາມໝາຍ, ຜົນດີ ແລະ ຜົນເສຍຂອງວິທະຍາສາດ | Explain the meaning, benefits and drawbacks of science
  - ຮັບຮູ້ຄຸນສົມບັດຂອງນັກວິທະຍາສາດ | Recognise the qualities of a scientist
  - ບອກຂັ້ນຕອນຂອງການຄົ້ນຄວ້າທາງວິທະຍາສາດ | State the steps of a scientific investigation
- Ideas:
  - ວິທະຍາສາດຄືການສຶກສາທຳມະຊາດໂດຍການສັງເກດ ແລະ ທົດລອງ | Science studies nature by observing and experimenting
  - ວິທີການວິທະຍາສາດ: ຕັ້ງຄຳຖາມ → ສົມມຸດຕິຖານ → ທົດລອງ → ບັນທຶກຂໍ້ມູນ → ສະຫຼຸບ | Method: question → hypothesis → experiment → record data → conclusion
  - ການທົດລອງທີ່ຍຸຕິທຳ: ປ່ຽນເທື່ອລະຕົວແປດຽວ ແລະ ຮັກສາຕົວອື່ນໃຫ້ຄືເກົ່າ | Fair test: change one variable, keep the others the same
  - ນັກວິທະຍາສາດຕ້ອງຢາກຮູ້, ຊື່ສັດ, ລະອຽດ ແລະ ລາຍງານຜົນຕາມຈິງ | Scientists are curious, honest, careful and report results truthfully
- Q:
  - ຢາກຮູ້ວ່າເມັດພືດງອກໄດ້ບໍ່ ຖ້າບໍ່ມີນ້ຳ? ຈະອອກແບບການທົດລອງແນວໃດ? | How would you test whether seeds germinate without water?
  - ເປັນຫຍັງຕ້ອງທົດລອງຊ້ຳຫຼາຍຄັ້ງ? | Why repeat an experiment several times?
- Act: ເຮືອບິນເຈ້ຍ: ປ່ຽນສິ່ງດຽວ (ຮູບປີກ) ແລ້ວວັດໄລຍະບິນ 3 ຄັ້ງ ແລະ ສະຫຼຸບ | Paper planes: change one thing (wing shape), measure the distance 3 times, conclude.

#### m1-02 ການວັດແທກ (12 h, TXT, 25 min)
- Obj:
  - ບອກຄວາມໝາຍ ແລະ ຄວາມຈຳເປັນຂອງການວັດແທກ | State why measurement is needed
  - ຮູ້ຫົວໜ່ວຍ ແລະ ເຄື່ອງແທກຂອງຄວາມຍາວ, ບໍລິມາດ, ມວນສານ ແລະ ອຸນຫະພູມ | Know the units and instruments for length, volume, mass and temperature
  - ວັດແທກໃຫ້ຖືກຕ້ອງ ແລະ ອ່ານຄ່າໄດ້ | Measure and read values correctly
- Ideas:
  - ຫົວໜ່ວຍມາດຕະຖານ: m, kg, L (mL), °C, s | Standard units: m, kg, L (mL), °C, s
  - ໄມ້ບັນທັດ/ຕະໄລ ວັດຄວາມຍາວ; ຫຼອດຕວງ ວັດບໍລິມາດ; ເຄື່ອງຊັ່ງ ວັດມວນສານ; ເທີໂມມິເຕີ ວັດອຸນຫະພູມ | Ruler/tape: length; measuring cylinder: volume; balance: mass; thermometer: temperature
  - ອ່ານຫຼອດຕວງໃຫ້ສາຍຕາຢູ່ລະດັບດຽວກັບຜິວນ້ຳ (ອ່ານຈຸດຕ່ຳສຸດຂອງຜິວໂຄ້ງ) | Read a cylinder at eye level at the bottom of the meniscus
  - 1 m = 100 cm; 1 kg = 1000 g; 1 L = 1000 mL = 1000 cm³ | 1 m = 100 cm; 1 kg = 1000 g; 1 L = 1000 mL = 1000 cm³
- Q:
  - ເປັນຫຍັງຈຶ່ງບໍ່ໃຊ້ຄືບ ຫຼື ກ້າວແທນໄມ້ບັນທັດ? | Why not measure with hand spans or steps instead of a ruler?
  - ຈະວັດບໍລິມາດກ້ອນຫີນທີ່ບໍ່ເປັນຮູບທົ່ວໄປໄດ້ແນວໃດ? | How can you find the volume of an irregular stone? (water displacement)
- Act: ວັດໂຕະດ້ວຍຄືບຂອງແຕ່ລະຄົນ ແລ້ວວັດດ້ວຍໄມ້ບັນທັດ ແລະ ປຽບທຽບ | Measure a desk in hand spans (each student) then with a ruler; compare.

#### m1-03 ວັດຖຸອ້ອມຕົວເຮົາ (19 h, TXT, 30 min)
- Obj:
  - ບອກຄວາມໝາຍຂອງວັດຖຸ ແລະ ແຍກປະເພດ (ມີຊີວິດ/ບໍ່ມີຊີວິດ; ແຂງ, ແຫຼວ, ກາສ) | Define matter and classify it (living/non-living; solid, liquid, gas)
  - ຈຳແນກໂລຫະ ແລະ ອາໂລຫະ, ສິມປົນເນື້ອດຽວ ແລະ ບໍ່ເປັນເນື້ອດຽວ | Distinguish metals and non-metals, homogeneous and heterogeneous mixtures
  - ຮູ້ວັດຖຸອາຊິດ ແລະ ບາເຊ, ວັດຖຸເຊື້ອໄຟ, ວັດຖຸເປັນພິດ ແລະ ໃຊ້ຢ່າງປອດໄພ | Know acidic and basic, fuel and toxic materials and use them safely
- Ideas:
  - ວັດຖຸມີມວນສານ ແລະ ຄອບຄອງທີ່ | Matter has mass and takes up space
  - ແຂງ: ຮູບຮ່າງ ແລະ ບໍລິມາດຄົງທີ່; ແຫຼວ: ບໍລິມາດຄົງທີ່ ແຕ່ປ່ຽນຮູບຕາມພາຊະນະ; ກາສ: ເຕັມພາຊະນະ | Solid: fixed shape and volume; liquid: fixed volume, takes the container's shape; gas: fills the container
  - ສິມປົນເນື້ອດຽວ (ນ້ຳຕານລະລາຍໃນນ້ຳ) ຕ່າງຈາກບໍ່ເປັນເນື້ອດຽວ (ຊາຍປົນນ້ຳ) | Homogeneous (sugar in water) vs heterogeneous (sand in water)
  - ໂລຫະນຳຄວາມຮ້ອນ/ໄຟຟ້າໄດ້ດີ ແລະ ມີຜິວເງົາ | Metals conduct heat/electricity well and are shiny
  - ຢ່າຊີມຫຼືດົມສານທີ່ບໍ່ຮູ້ຈັກ; ອ່ານປ້າຍເຕືອນ | Never taste or smell unknown substances; read warning labels
- Q:
  - ຍົກຕົວຢ່າງວັດຖຸ 3 ຢ່າງໃນເຮືອນ ແລ້ວຈັດເຂົ້າປະເພດ | Name three household objects and classify them
  - ເປັນຫຍັງອາກາດຈຶ່ງເປັນວັດຖຸ ທັງທີ່ເຮົາເບິ່ງບໍ່ເຫັນ? | Why is air matter even though we cannot see it?
- Act: ຈັດ 10 ສິ່ງຂອງຕາມກຸ່ມ (ໂລຫະ/ອາໂລຫະ, ແຂງ/ແຫຼວ/ກາສ) ເປັນກຸ່ມ | In groups, sort 10 items (metal/non-metal, solid/liquid/gas).

#### m1-04 ການເຄື່ອນທີ່ (17 h, SIM `motion`, 30 min)
- Obj:
  - ບອກຄວາມໝາຍຂອງການເຄື່ອນທີ່ ແລະ ແບບຂອງການເຄື່ອນທີ່ | State what motion is and its kinds
  - ແຍກການເຄື່ອນທີ່ສະໝ່ຳສະເໝີ ແລະ ບໍ່ສະໝ່ຳສະເໝີ | Distinguish uniform and non-uniform motion
  - ຄິດໄລ່ຄວາມໄວ, ໄລຍະທາງ ແລະ ເວລາ | Calculate speed, distance and time
  - ອະທິບາຍມວນສານ ແລະ ມວນສານຈຳເພາະ (density) ຂອງວັດຖຸ | Explain mass and density (ມວນສານຈຳເພາະ)
- Ideas:
  - ວັດຖຸເຄື່ອນທີ່ ເມື່ອຕຳແໜ່ງປ່ຽນຕາມເວລາ | An object moves when its position changes with time
  - v = s ÷ t; ໜ່ວຍ m/s ແລະ km/h (1 m/s = 3.6 km/h) | v = s ÷ t; units m/s and km/h (1 m/s = 3.6 km/h)
  - ສະໝ່ຳສະເໝີ: ຄວາມໄວຄົງທີ່; ບໍ່ສະໝ່ຳສະເໝີ: ຄວາມໄວປ່ຽນ | Uniform: constant speed; non-uniform: speed changes
  - ກຣາຟໄລຍະທາງ-ເວລາ: ເສັ້ນຊື່ = ຄວາມໄວຄົງທີ່, ຄວາມຊັນ = ຄວາມໄວ | Distance-time graph: straight line = constant speed, slope = speed
  - ມວນສານຈຳເພາະ ρ = m ÷ V | Density ρ = m ÷ V
- Q:
  - ລົດແລ່ນ 90 km ໃນ 1.5 h ມີຄວາມໄວສະເລ່ຍເທົ່າໃດ? | A car covers 90 km in 1.5 h; what is its average speed? (60 km/h)
  - ເປັນຫຍັງເຮົາຕົ້ງໄປໜ້າ ເມື່ອລົດເບຣກກະທັນຫັນ? | Why do we lurch forward when a bus brakes suddenly? (inertia)
- Act: ວັດເວລາເດີນ 10 m ໃນຫ້ອງຂອງແຕ່ລະຄົນ ແລ້ວຄິດໄລ່ຄວາມໄວ ແລະ ແຕ້ມກຣາຟ | Time each student walking 10 m, compute speed, draw the graph.

#### m1-05 ໂລກ ແລະ ດິນ (12 h, TXT, 25 min)
- Obj:
  - ອະທິບາຍໂຄງສ້າງຂອງໂລກ ແລະ ລັກສະນະຫຼັກ | Describe the structure of the Earth
  - ອະທິບາຍການກຳເນີດຂອງດິນ ແລະ ຊະນິດຂອງດິນ | Explain how soil forms and its types
  - ສຶກສາລັກສະນະຂອງດິນແຕ່ລະຊະນິດ | Investigate properties of each soil type
  - ເຂົ້າໃຈຄວາມສຳຄັນ ແລະ ວິທີອະນຸລັກດິນ | Understand why and how to conserve soil
- Ideas:
  - ໂລກມີຊັ້ນ: ເປືອກໂລກ, ເນື້ອໂລກ (mantle), ແກນນອກ, ແກນໃນ | Layers: crust, mantle, outer core, inner core
  - ດິນເກີດຈາກຫີນຜຸພັງຊ້າໆ ປົນກັບຊາກພືດ/ສັດ | Soil forms from slowly weathered rock mixed with decayed plant/animal matter
  - ດິນຊາຍ ລະບາຍນ້ຳໄວ; ດິນໜຽວ ເກັບນ້ຳ; ດິນຮ່ວນ ເໝາະປູກພືດ | Sandy soil drains fast; clay holds water; loam suits crops
  - ການກັດເຊາະຂອງດິນຫຼຸດໄດ້ດ້ວຍການປູກຕົ້ນໄມ້ ແລະ ເຮັດຂັ້ນໄດ | Erosion is reduced by trees and terracing
- Q:
  - ດິນຊະນິດໃດເໝາະປູກເຂົ້າ ແລະ ເປັນຫຍັງ? | Which soil suits rice and why?
  - ເປັນຫຍັງການຕັດໄມ້ເທິງພູເຮັດໃຫ້ດິນເລື່ອນ? | Why does deforestation on hills cause landslides?
- Act: ເທນ້ຳຄືກັນໃສ່ຊາຍ ແລະ ດິນໜຽວໃນຂວດຕັດ ແລ້ວຈັບເວລານ້ຳໄຫຼຜ່ານ | Pour equal water through sand and clay in cut bottles and time the drainage.

#### m1-06 ນ້ຳ (15 h, TXT, 25 min)
- Obj:
  - ບອກຄວາມໝາຍ ແລະ ແຫຼ່ງນ້ຳຕ່າງໆ | State the meaning and sources of water
  - ອະທິບາຍປະໂຫຍດ ແລະ ຜົນເສຍຫາຍຂອງນ້ຳ | Explain benefits and harms of water
  - ສຶກສາສາເຫດຂອງນ້ຳເປື້ອນ ແລະ ວິທີເຮັດນ້ຳໃຫ້ສະອາດ | Study causes of polluted water and ways to clean it
  - ປົກປັກຮັກສາຊັບພະຍາກອນນ້ຳ | Protect water resources
- Ideas:
  - ແຫຼ່ງນ້ຳ: ຝົນ, ແມ່ນ້ຳ, ໜອງ, ນ້ຳໃຕ້ດິນ | Sources: rain, rivers, ponds, groundwater
  - ມົນລະພິດ: ຂີ້ເຫຍື້ອ, ສານເຄມີ, ນ້ຳເສຍ | Pollutants: rubbish, chemicals, waste water
  - ກັ່ນຕອງ ເອົາສິ່ງເຈືອປົນທີ່ເຫັນໄດ້; ຕົ້ມ ຂ້າເຊື້ອພະຍາດ | Filtering removes visible particles; boiling kills germs
  - ນ້ຳເປື້ອນເຮັດໃຫ້ເກີດພະຍາດ ເຊັ່ນ ຖອກທ້ອງ | Dirty water spreads diseases such as diarrhoea
- Q:
  - ເປັນຫຍັງນ້ຳທີ່ໃສ ຈຶ່ງອາດບໍ່ປອດໄພດື່ມ? | Why can clear water still be unsafe to drink?
  - ເຮົາປະຢັດນ້ຳໃນເຮືອນໄດ້ແນວໃດ? | How can we save water at home?
- Act: ເຮັດເຄື່ອງກອງນ້ຳ (ຜ້າ, ຊາຍ, ກ້ອນຫີນນ້ອຍ, ຖ່ານ) ແລະ ປຽບທຽບຄວາມຂຸ່ນກ່ອນ-ຫຼັງ. ຢໍ້າວ່າຕ້ອງຕົ້ມກ່ອນດື່ມ | Build a filter (cloth, sand, gravel, charcoal), compare turbidity; stress boiling before drinking.

#### m1-07 ອາກາດ (12 h, TXT, 25 min)
- Obj:
  - ບອກຄວາມໝາຍ, ປະໂຫຍດຂອງອາກາດ ແລະ ຊັ້ນບັນຍາກາດ | State the meaning and benefits of air and the atmosphere layers
  - ບອກສ່ວນປະກອບຂອງອາກາດ | State the composition of air
  - ອະທິບາຍສາເຫດຂອງອາກາດເປື້ອນ ແລະ ຜົນເສຍ | Explain causes and effects of air pollution
  - ອະທິບາຍວິທີເຮັດອາກາດໃຫ້ສະອາດ | Explain how to keep air clean
- Ideas:
  - ອາກາດເປັນສິມປົນ: ໄນໂຕຣແຊນ ≈ 78%, ອົກຊີແຊນ ≈ 21%, ອື່ນໆ ≈ 1% | Air is a mixture: nitrogen ≈ 78%, oxygen ≈ 21%, others ≈ 1%
  - ອົກຊີແຊນຈຳເປັນຕໍ່ການຫາຍໃຈ ແລະ ການເຜົາ | Oxygen is needed for breathing and burning
  - ອາກາດມີມວນສານ ແລະ ຄອບຄອງທີ່ | Air has mass and takes up space
  - ຄວັນ, ຝຸ່ນ, ໄອເສຍລົດ ເຮັດໃຫ້ອາກາດເປື້ອນ; ການເຜົາປ່າເຮັດໃຫ້ເກີດໝອກຄວັນ | Smoke, dust and exhaust pollute air; burning fields causes haze
- Q:
  - ເຮົາຮູ້ໄດ້ແນວໃດວ່າອາກາດຄອບຄອງທີ່? | How do we know air takes up space?
  - ຫຼຸດການເຜົາຂີ້ເຫຍື້ອໄດ້ແນວໃດ? | How can we reduce burning of rubbish?
- Act: ຄວ່ຳຈອກເປົ່າລົງໃນນ້ຳ ແລະ ສັງເກດວ່ານ້ຳບໍ່ເຂົ້າເຕັມ | Push an upturned empty cup into water; observe water does not fill it.

#### m1-08 ພືດ (19 h, SIM `photosynthesis`, 30 min)
- Obj:
  - ເຂົ້າໃຈໂຄງສ້າງພື້ນຖານ ແລະ ໜ້າທີ່ຂອງສ່ວນຕ່າງໆຂອງພືດ (ຮາກ, ລຳຕົ້ນ, ໃບ, ດອກ) | Understand the structure and function of plant parts
  - ທົດລອງຢັ້ງຢືນວ່າພືດຕ້ອງການນ້ຳ, CO₂ ແລະ ແສງ ເພື່ອສ້າງອາຫານ | Verify plants need water, CO₂ and light to make food
  - ອະທິບາຍການສັງເຄາະດ້ວຍແສງ | Explain photosynthesis
  - ຈັດປະເພດພືດໂດຍໃຊ້ ໃບ, ລຳ, ແກ່ນ, ດອກ | Classify plants using leaves, stem, seeds, flowers
- Ideas:
  - ຮາກດູດນ້ຳ ແລະ ແຮ່ທາດ; ລຳຕົ້ນລຳລຽງ; ໃບສ້າງອາຫານ | Roots absorb water and minerals; stems transport; leaves make food
  - ການສັງເຄາະດ້ວຍແສງ: ນ້ຳ + CO₂ --(ແສງ, ຄລໍໂລຟິລ)--> ນ້ຳຕານ (ກລູໂຄສ) + O₂ | Photosynthesis: water + CO₂ --(light, chlorophyll)--> glucose + O₂
  - CO₂ ເຂົ້າທາງຮູຂຸມຂົນໃບ (stomata) | CO₂ enters through stomata
  - ພືດຕ້ອງການຄລໍໂລຟິລ (ສີຂຽວ) ແລະ ແສງ | Plants need chlorophyll (green) and light
  - ດອກ → ຜົນ → ແກ່ນ ເປັນການສືບພັນ | Flower → fruit → seed is reproduction
- Q:
  - ເປັນຫຍັງຕົ້ນໄມ້ທີ່ຢູ່ໃນບ່ອນມືດຈຶ່ງເຫຼືອງ ແລະ ຕາຍ? | Why does a plant kept in the dark turn yellow and die?
  - ເປັນຫຍັງປ່າໄມ້ຈຶ່ງສຳຄັນຕໍ່ອາກາດ? | Why are forests important for air?
- Act: ວາງຕົ້ນກ້າ 2 ຕົ້ນ ຕົ້ນໜຶ່ງໃນແສງ ອີກຕົ້ນໜຶ່ງໃນບ່ອນມືດ ໃຊ້ເວລາ 1 ອາທິດ ແລະ ປຽບທຽບ | Put two seedlings, one in light and one in dark, for one week and compare.

#### m1-09 ອາຫານ (18 h, TXT, 30 min)
- Obj:
  - ບອກຄວາມໝາຍຂອງອາຫານ ແລະ ໂພຊະນາການ | Define food and nutrition
  - ຈັດປະເພດອາຫານ ແລະ ຍົກຕົວຢ່າງ | Classify food and give examples
  - ທົດສອບແປ້ງ ແລະ ວິຕາມິນ C ໃນອາຫານ | Test foods for starch and vitamin C
  - ອະທິບາຍການກິນອາຫານໃຫ້ຖືກຫຼັກໂພຊະນາການ ແລະ ພະຍາດຈາກການຂາດ/ເກີນ | Explain a balanced diet and diseases from deficiency/excess
- Ideas:
  - ກຸ່ມອາຫານ: ແປ້ງ (ໃຫ້ພະລັງງານ), ໂປຣຕີນ (ສ້າງຮ່າງກາຍ), ໄຂມັນ, ວິຕາມິນ ແລະ ແຮ່ທາດ, ນ້ຳ | Groups: carbohydrate (energy), protein (growth), fat, vitamins and minerals, water
  - ໄອໂອດີນປ່ຽນເປັນສີຟ້າເຂັ້ມ/ດຳ ເມື່ອພົບແປ້ງ | Iodine turns blue-black with starch
  - ອາຫານຄົບ 5 ໝູ່ ໃນປະລິມານພໍດີ | A balanced diet has all groups in suitable amounts
  - ອາຫານເປັນພິດ: ອາຫານບູດ, ເຊື້ອໂລກ, ສານເຄມີ | Food poisoning: spoiled food, germs, chemicals
- Q:
  - ເຂົ້າໜຽວ, ປາ ແລະ ຜັກ ໃຫ້ສານອາຫານຫຍັງ? | What nutrients do sticky rice, fish and vegetables give?
  - ຈະເກັບອາຫານບໍ່ໃຫ້ບູດໄດ້ແນວໃດ? | How can food be kept from spoiling?
- Act: ວາງແຜນອາຫານທ່ຽງຄົບໝູ່ ຈາກອາຫານລາວ ແລະ ທົດສອບແປ້ງດ້ວຍໄອໂອດີນ (ຄູເປັນຜູ້ເຮັດ) | Plan a balanced Lao lunch; teacher-led iodine starch test.

### M.2

#### m2-01 ສັດ (18 h, TXT, 30 min)
- Obj:
  - ເຂົ້າໃຈໂຄງສ້າງຂອງອະໄວຍະວະສັດ ແລະ ປຽບທຽບກັບພືດ | Understand animal organ structure and compare with plants
  - ຈັດໝວດສັດໂດຍໃຊ້ ກະດູກສັນຫຼັງ, ປີກ, ຂາ... ເປັນເກນ | Classify animals (backbone, wings, legs...)
  - ອະທິບາຍການສືບພັນ, ການເຕີບໃຫຍ່ ແລະ ການປັບຕົວ | Explain reproduction, growth and adaptation
  - ຮູ້ພະຍາດຂອງສັດ ແລະ ການອະນຸລັກສັດ | Know animal diseases and conservation
- Ideas:
  - ສັດມີກະດູກສັນຫຼັງ 5 ກຸ່ມ: ປາ, ສັດສະເໝີນ້ຳບົກ, ສັດເລືອຄານ, ນົກ, ສັດລ້ຽງລູກດ້ວຍນົມ | Vertebrates: fish, amphibians, reptiles, birds, mammals
  - ສັດບໍ່ມີກະດູກສັນຫຼັງ ເຊັ່ນ ແມງໄມ້, ຫອຍ, ໜອນ | Invertebrates: insects, molluscs, worms
  - ການປ່ຽນຮູບຮ່າງ: ກົບ (ໄຂ່→ຕົວອ່ອນ→ກົບ), ແມງກະເບື້ອ(ຜີເສື້ອ) (ໄຂ່→ໜອນ→ດັກແດ້→ໂຕເຕັມໄວ) | Metamorphosis: frog; butterfly
  - ການປັບຕົວ ເຊັ່ນ ການພຽງສີ | Adaptation, e.g. camouflage
- Q:
  - ຄ້າງຄາວເປັນນົກ ຫຼື ສັດລ້ຽງລູກດ້ວຍນົມ? ເປັນຫຍັງ? | Is a bat a bird or a mammal? Why?
  - ເປັນຫຍັງຕ້ອງອະນຸລັກສັດປ່າ? | Why conserve wildlife?
- Act: ໃຊ້ບັດຮູບສັດ ແລະ ແຕ້ມແຜນຜັງແຍກປະເພດ (ຕົ້ນໄມ້ຕັດສິນ) | Sort animal cards with a branching key.

#### m2-02 ການປ່ຽນແປງຂອງວັດຖຸ (10 h, SIM `thermal`, 25 min)
- Obj:
  - ບອກຄວາມໝາຍການປ່ຽນແປງທາງຟີຊິກ ແລະ ທາງເຄມີ | Define physical and chemical change
  - ບອກຄວາມໝາຍ ທາດລະລາຍ, ຕົວລະລາຍ, ຕົວຖືກລະລາຍ | Define solute, solvent and solution
  - ທົດລອງວ່າທາດຕ່າງກັນລະລາຍໃນຕົວລະລາຍຕ່າງກັນ | Show different substances dissolve differently
  - ທົດລອງການຢືດ-ຫົດຍ້ອນຄວາມຮ້ອນຂອງແຂງ, ແຫຼວ, ກາສ | Show thermal expansion/contraction of solids, liquids, gases
- Ideas:
  - ການປ່ຽນທາງຟີຊິກ ບໍ່ເກີດທາດໃໝ່ (ນ້ຳກ້ອນລະລາຍ); ທາງເຄມີ ເກີດທາດໃໝ່ (ໄມ້ໄໝ້) | Physical: no new substance (ice melting); chemical: new substance (burning wood)
  - ຕົວຖືກລະລາຍ + ຕົວລະລາຍ = ສານລະລາຍ | Solute + solvent = solution
  - ວັດຖຸສ່ວນໃຫຍ່ຂະຫຍາຍເມື່ອຮ້ອນ ແລະ ຫົດເມື່ອເຢັນ | Most materials expand when heated and contract when cooled
  - ກາສຂະຫຍາຍຫຼາຍກວ່າແຫຼວ ແລະ ແຫຼວຫຼາຍກວ່າແຂງ | Gases expand more than liquids, liquids more than solids
  - ໃຊ້ໃນຊີວິດ: ຊ່ອງວ່າງທາງລົດໄຟ, ເທີໂມມິເຕີ | Uses: rail gaps, thermometers
- Q:
  - ເປັນຫຍັງທາງລົດໄຟຕ້ອງມີຊ່ອງວ່າງ? | Why do railway tracks have gaps?
  - ຝາຂວດແກ້ວຕິດ ເຮັດແນວໃດໃຫ້ເປີດໄດ້? | How can you free a stuck jar lid? (run hot water over the lid)
- Act: ລະລາຍນ້ຳຕານ/ເກືອ/ຊາຍ ໃນນ້ຳເຢັນ ແລະ ນ້ຳອຸ່ນ ແລະ ບັນທຶກຜົນ | Dissolve sugar/salt/sand in cold and warm water and record.

#### m2-03 ການແຍກວັດຖຸສົມປົນ (8 h, TXT, 25 min)
- Obj:
  - ບອກວິທີແຍກສິມປົນທີ່ໃຊ້ໃນຊີວິດ | Name methods of separating mixtures used in daily life
  - ອະທິບາຍວິທີແຍກສິມປົນເນື້ອດຽວ ແລະ ບໍ່ເປັນເນື້ອດຽວ | Explain methods for homogeneous and heterogeneous mixtures
  - ແຍກດ້ວຍ ເກັບ, ຮ່ອນ, ແມ່ເຫຼັກ, ກັ່ນ, ຕົກຜຶກ, ໂຄຣມາໂທກຣາຟີ | Separate by picking, sieving, magnet, distillation, crystallisation, chromatography
  - ນຳໃຊ້ໃນຊີວິດ | Apply in daily life
- Ideas:
  - ເລືອກວິທີຕາມຄຸນສົມບັດທີ່ຕ່າງກັນ (ຂະໜາດ, ແມ່ເຫຼັກ, ການລະລາຍ, ຈຸດເດືອດ) | Choose the method by the property that differs
  - ກອງ: ແຍກຂອງແຂງທີ່ບໍ່ລະລາຍອອກຈາກນ້ຳ | Filtering separates insoluble solid from liquid
  - ກັ່ນ: ແຍກແຫຼວຕາມຈຸດເດືອດ | Distillation separates liquids by boiling point
  - ເກືອສິນເທົາ: ການລະເຫີຍນ້ຳ ແລ້ວຕົກຜຶກ | Salt is obtained by evaporating water and crystallising
- Q:
  - ແຍກເຂົ້າສານອອກຈາກຫີນນ້ອຍ ແລະ ເກືອອອກຈາກນ້ຳທະເລ ໃຊ້ວິທີໃດ? | Which methods separate stones from rice and salt from seawater?
  - ເຮັດແນວໃດແຍກຕະໄຄໄຫວຈາກນ້ຳ? | How can you separate iron filings from sand?
- Act: ແຍກຊາຍ+ເກືອ+ຜົງເຫຼັກ ເປັນຂັ້ນ; ເຮັດໂຄຣມາໂທກຣາຟີ ຫມຶກປາກກາເທິງເຈ້ຍກອງ | Separate sand+salt+iron filings in steps; chromatography of marker ink on filter paper.

#### m2-04 ແຮງ / m2-05 ຄວາມດັນ (BUILT)
Content already in `src/content/m2.ts`: migrate verbatim into the registry (ids `m2-04`, `m2-05`; sim keys `force`, `pressure`). Add 3 quiz questions each (coder, from the existing objectives/ideas).

#### m2-06 ລະບົບນິເວດ (15 h, SIM `foodweb`, 30 min)
- Obj:
  - ບອກຄວາມໝາຍລະບົບນິເວດ, ຜູ້ຜະລິດ, ຜູ້ບໍລິໂພກ ແລະ ຜູ້ຍ່ອຍສະຫຼາຍ | Define ecosystem, producer, consumer, decomposer
  - ອະທິບາຍຄວາມສຳພັນລະຫວ່າງສິ່ງມີຊີວິດ ແລະ ກັບສິ່ງແວດລ້ອມ | Explain relationships among organisms and with the environment
  - ອະທິບາຍຄວາມໝາຍປະຊາກອນ ແລະ ຄວາມໜາແໜ້ນ | Explain population and population density
  - ເຫັນຄຸນຄ່າຂອງປ່າ ແລະ ຮັກສາສິ່ງແວດລ້ອມ | Value forests and protect the environment
- Ideas:
  - ລະບົບນິເວດ = ສິ່ງມີຊີວິດ + ສິ່ງບໍ່ມີຊີວິດໃນບ່ອນດຽວກັນ | An ecosystem = living and non-living things together
  - ຕ່ອງໂສ້ອາຫານ: ພືດ → ຜູ້ກິນພືດ → ຜູ້ກິນເນື້ອ | Food chain: plant → herbivore → carnivore
  - ພະລັງງານຫຼຸດລົງປະມານ 90% ໃນແຕ່ລະຂັ້ນ (ປະມານ 10% ສົ່ງຕໍ່) | About 90% of energy is lost at each level (~10% passed on)
  - ຜູ້ຍ່ອຍສະຫຼາຍ (ເຫັດ, ແບັກທີເຣຍ) ສົ່ງທາດຄືນດິນ | Decomposers return nutrients to soil
- Q:
  - ຖ້າງູຫາຍໄປ ກົບ ແລະ ນົກຈະເປັນແນວໃດ? | If snakes disappear what happens to frogs and the eagle's food?
  - ເປັນຫຍັງຕ່ອງໂສ້ອາຫານຈຶ່ງບໍ່ຍາວຫຼາຍ? | Why are food chains rarely longer than 4-5 levels?
- Act: ເຮັດບັດ ສິ່ງມີຊີວິດ ແລ້ວຕໍ່ເປັນຕ່ອງໂສ້ ແລະ ຕາໜ່າງອາຫານ ດ້ວຍເຊືອກ | Make organism cards, connect into chains and a web with string.

#### m2-07 ການປ່ຽນແປງຂອງພື້ນໂລກ (9 h, TXT, 25 min)
- Obj:
  - ບອກໂຄງສ້າງຂອງເປືອກໂລກ | Describe the structure of the Earth's crust
  - ອະທິບາຍການປ່ຽນແປງຍ້ອນການກະທຳຂອງທຳມະຊາດ ແລະ ມະນຸດ (ແຜ່ນດິນໄຫວ, ພູໄຟ, ນ້ຳເຊາະ, ລົມ) | Explain changes by nature and humans (earthquakes, volcanoes, erosion, wind)
  - ບອກຫຼັກຖານ ແລະ ຂໍ້ມູນທາງທໍລະນີວິທະຍາ (ຟອດຊິວ) | State geological evidence (fossils)
  - ບອກລຳດັບອາຍຸຂອງຊັ້ນຫີນ | Order rock layers by age
- Ideas:
  - ເປືອກໂລກແບ່ງເປັນແຜ່ນ ເຄື່ອນທີ່ຊ້າໆ | The crust is divided into slowly moving plates
  - ແຜ່ນດິນໄຫວ ແລະ ພູໄຟ ເກີດຕາມແຄມແຜ່ນ | Earthquakes and volcanoes occur mostly at plate edges
  - ການຜຸພັງ, ການກັດເຊາະ, ການຕົກຕະກອນ ປ່ຽນໜ້າດິນ | Weathering, erosion and deposition reshape the land
  - ຊັ້ນຫີນຕະກອນ: ຊັ້ນລຸ່ມເກົ່າກວ່າຊັ້ນເທິງ; ຟອດຊິວບອກສິ່ງມີຊີວິດເກົ່າ | Sedimentary layers: lower is older; fossils show ancient life
- Q:
  - ເປັນຫຍັງລາວບໍ່ຄ່ອຍມີພູໄຟ? | Why are volcanoes not found in Laos?
  - ພົບຟອດຊິວສັດທະເລເທິງພູ ໝາຍຄວາມວ່າແນວໃດ? | A marine fossil on a mountain: what does it mean?
- Act: ສ້າງຊັ້ນຊາຍຫຼາຍສີໃນຂວດໃສ ແລະ ອະທິບາຍວ່າຊັ້ນໃດເກົ່າກວ່າ | Make layers of coloured sand in a clear bottle and say which is oldest.

#### m2-08 ຊັບພະຍາກອນໃນດິນ (7 h, TXT, 20 min)
- Obj:
  - ຮູ້ຂະບວນການເກີດຫີນ ແລະ ແຮ່ທາດ | Know how rocks and minerals form
  - ບອກຊື່ ແລະ ລັກສະນະຫີນແຕ່ລະປະເພດ | Name and describe rock types
  - ບອກແຫຼ່ງແຮ່ທາດ ແລະ ປະໂຫຍດ | State where minerals occur and their uses
  - ເສນີວິທີນຳໃຊ້ຢ່າງຄຸ້ມຄ່າ | Propose wise use
- Ideas:
  - ຫີນອັກນີ (ຈາກແມັກມາເຢັນ), ຫີນຕະກອນ, ຫີນແປຮູບ (ຄວາມຮ້ອນ+ຄວາມດັນ) | Igneous (cooled magma), sedimentary, metamorphic (heat + pressure)
  - ແຮ່ທາດໃນລາວ: ຄຳ, ທອງແດງ, ກົ່ວ, ເກືອຫີນ/ຢິບຊຽມ, ໂປແຕສ | Minerals in Laos: gold, copper, tin, gypsum, potash
  - ແຮ່ ແລະ ຫີນເປັນຊັບພະຍາກອນບໍ່ສາມາດສ້າງຄືນໃໝ່ໄດ້ໄວ | Rocks and minerals are non-renewable on human time scales
- Q:
  - ເປັນຫຍັງການຂຸດແຮ່ຕ້ອງມີການຟື້ນຟູ? | Why must mines be restored?
  - ຫີນອ່ອນເປັນຫີນປະເພດໃດ? | What type of rock is marble? (metamorphic)
- Act: ຈັດກຸ່ມຕົວຢ່າງຫີນໃນທ້ອງຖິ່ນ ຕາມສີ ແລະ ຄວາມແຂງ | Sort local rock samples by colour and hardness.

#### m2-09 ລັກສະນະຂອງນ້ຳ (8 h, TXT, 25 min)
- Obj:
  - ອະທິບາຍລັກສະນະທົ່ວໄປຂອງນ້ຳ | Describe general properties of water
  - ບອກຈຸດເດືອດ, ຈຸດເປື່ອຍ(ແຂງ) ແລະ ຈຸດມີບໍລິມາດນ້ອຍສຸດ | State boiling point, freezing point and point of minimum volume
  - ບອກຄວາມໝາຍນ້ຳກະດ້າງ ແລະ ນ້ຳອ່ອນ ແລະ ວິທີແກ້ນ້ຳກະດ້າງ | Define hard and soft water and how to soften
- Ideas:
  - ນ້ຳບໍລິສຸດແຂງທີ່ 0 °C ແລະ ເດືອດທີ່ 100 °C (ຄວາມດັນປົກກະຕິ) | Pure water freezes at 0 °C and boils at 100 °C (normal pressure)
  - ເດືອດຕ່ຳລົງເມື່ອຢູ່ສູງ | Boiling point drops at altitude
  - ນ້ຳມີບໍລິມາດນ້ອຍສຸດ (ໜາແໜ້ນສຸດ) ທີ່ ≈ 4 °C; ກ້ອນນ້ຳລອຍ | Water is densest at about 4 °C; ice floats
  - ນ້ຳກະດ້າງມີ Ca ແລະ Mg ລະລາຍ; ຕົ້ມແກ້ໄດ້ບາງຊະນິດ | Hard water contains Ca and Mg; boiling removes temporary hardness
- Q:
  - ເປັນຫຍັງນ້ຳໃນໜອງບໍ່ກາຍເປັນກ້ອນນ້ຳຈົນໝົດໃນລະດູໜາວ? | Why does a pond not freeze solid from the bottom?
  - ເຮັດແນວໃດຮູ້ວ່ານ້ຳກະດ້າງ? | How do you tell hard water? (soap lathers poorly)
- Act: ຕົ້ມນ້ຳ ແລະ ບັນທຶກອຸນຫະພູມທຸກນາທີ ແລ້ວແຕ້ມກຣາຟ (ເສັ້ນຮາບຢູ່ທີ່ຈຸດເດືອດ) | Heat water, record temperature each minute, plot (flat at the boiling point).

#### m2-10 ລັກສະນະຂອງອາກາດ (7 h, TXT, 20 min)
- Obj:
  - ອະທິບາຍວ່າອາກາດກະຈາຍຢູ່ທົ່ວບໍລິເວນ ແລະ ຮອບໂລກ | Explain that air surrounds the Earth
  - ພິສູດວ່າອາກາດມີນ້ຳໜັກ, ມີຄວາມດັນ, ຫົດ-ຢືດ ແລະ ເຄື່ອນທີ່ | Show air has weight, pressure, expands/contracts and moves
  - ອະທິບາຍຄວາມດັນອາກາດ ແລະ ຄວາມຊຸ່ມ | Explain air pressure and humidity
- Ideas:
  - ອາກາດມີນ້ຳໜັກ ແລະ ຄວາມດັນ | Air has weight and exerts pressure
  - ຄວາມດັນອາກາດຫຼຸດລົງເມື່ອສູງຂຶ້ນ | Air pressure decreases with height
  - ອາກາດຮ້ອນຂະຫຍາຍ ແລະ ລອຍຂຶ້ນ ເກີດລົມ | Warm air expands and rises, causing wind
  - ຄວາມຊຸ່ມ = ປະລິມານໄອນ້ຳໃນອາກາດ | Humidity = amount of water vapour in air
- Q:
  - ເປັນຫຍັງຫູອື້ ເມື່ອຂຶ້ນພູສູງ? | Why do ears pop on a high mountain?
  - ເປັນຫຍັງລົມພັດຈາກທະເລມາແຜ່ນດິນໃນເວລາກາງເວັນ? | Why does the wind blow from sea to land by day?
- Act: ເປົ່າບານລູມຕັ້ງເທິງໄມ້ແຂວນສອງດ້ານ ແລະ ສັງເກດວ່າດ້ານທີ່ມີອາກາດໜັກກວ່າ | Balance two balloons on a stick, inflate one, see it go down.

#### m2-11 ແສງສະຫວ່າງ (9 h, SIM `reflection`, 25 min)
- Obj:
  - ຍົກຕົວຢ່າງແຫຼ່ງແສງ ແລະ ລັກສະນະຂອງແສງ | Give examples of light sources and properties of light
  - ບອກຄວາມແຕກຕ່າງລະຫວ່າງວັດຖຸໂປ່ງແສງ, ໂປ່ງໃສ ແລະ ເງົາ | Distinguish transparent, translucent and opaque
  - ທົດລອງວ່າແສງເຄື່ອນທີ່ເປັນເສັ້ນຊື່ | Show light travels in straight lines
  - ອະທິບາຍການເກີດເງົາ, ຈັນທະຄາຕ ແລະ ສຸລິຍະຄາຕ | Explain shadows, lunar and solar eclipses
  - ບອກກົດການສະທ້ອນແສງ ແລະ ຮູບໃນແວ່ນພຽງ | State the law of reflection and plane-mirror images
- Ideas:
  - ແສງເດີນທາງເປັນເສັ້ນຊື່ | Light travels in straight lines
  - ກົດການສະທ້ອນ: ມຸມຕົກກະທົບ = ມຸມສະທ້ອນ (ວັດຈາກເສັ້ນຕັ້ງສາກ) | Angle of incidence = angle of reflection (from the normal)
  - ຮູບໃນແວ່ນພຽງ: ຂະໜາດເທົ່າວັດຖຸ, ຢູ່ຫຼັງແວ່ນໄລຍະເທົ່າກັນ, ຊ້າຍ-ຂວາສະລັບ | Plane-mirror image: same size, same distance behind, left-right reversed
  - ຮູບຈິງຮັບເທິງຈໍໄດ້; ຮູບລວງຮັບບໍ່ໄດ້ | A real image can be shown on a screen; a virtual image cannot
- Q:
  - ເປັນຫຍັງເຮົາເຫັນຕົວເອງໃນແວ່ນ ແຕ່ບໍ່ເຫັນໃນກຳແພງ? | Why do we see ourselves in a mirror but not in a wall? (regular vs diffuse reflection)
  - ເກີດສຸລິຍະຄາຕເມື່ອໃດ? | When does a solar eclipse occur?
- Act: ຍິງແສງໄຟສາຍຕາ (ຫຼື laser pointer ລະດັບປອດໄພ) ໃສ່ແວ່ນ ແລະ ວັດມຸມ | Aim a safe torch beam at a mirror and measure angles.

#### m2-12 ສຽງ (9 h, TXT, 25 min)
- Obj:
  - ຮັບຮູ້ວ່າສຽງເກີດຈາກການສັ່ນສະເທືອນ | Recognise sound comes from vibration
  - ບອກຄວາມຖີ່, ຄວາມເຂັ້ມ, ຄວາມສູງ-ຕ່ຳ ຂອງສຽງ | Describe frequency, intensity and pitch
  - ຢັ້ງຢືນວ່າສຽງຜ່ານແຂງ, ແຫຼວ, ກາສ ແຕ່ບໍ່ຜ່ານສູນຍາກາດ | Show sound travels through solids, liquids, gases but not a vacuum
  - ອະທິບາຍການສະທ້ອນສຽງ (ສຽງກ້ອງ), ມົນລະພິດທາງສຽງ ແລະ ການປ້ອງກັນ | Explain echoes, noise pollution and protection
- Ideas:
  - ສຽງຕ້ອງມີຕົວກາງ ເພື່ອເດີນທາງ | Sound needs a medium
  - ຄວາມຖີ່ (Hz) ຍິ່ງສູງ ສຽງຍິ່ງແຫຼມ; ແອມພລິຈູດໃຫຍ່ ສຽງດັງ | Higher frequency = higher pitch; larger amplitude = louder
  - ສຽງໃນອາກາດ ≈ 340 m/s; ໄວກວ່າໃນແຂງ/ແຫຼວ | Sound ≈ 340 m/s in air; faster in liquids and solids
  - ສຽງດັງເກີນ 85 dB ໄລຍະຍາວ ທຳລາຍການໄດ້ຍິນ | Prolonged sound above ~85 dB damages hearing
- Q:
  - ເປັນຫຍັງໃນອະວະກາດ ບໍ່ໄດ້ຍິນສຽງລະເບີດ? | Why is an explosion silent in space?
  - ຟ້າແມບກ່ອນ ຫຼື ຟ້າຮ້ອງກ່ອນ ແລະ ເປັນຫຍັງ? | Why do we see lightning before hearing thunder?
- Act: ໄມ້ບັນທັດສັ່ນຢູ່ຂອບໂຕະ: ປ່ຽນຄວາມຍາວ ແລ້ວຟັງສຽງສູງ-ຕ່ຳ | Ruler twang on a desk edge: change the overhanging length and hear the pitch change.

### M.3

#### m3-01 ລະບົບຕ່າງໆໃນຮ່າງກາຍຄົນ (23 h, TXT, 30 min)
- Obj:
  - ບອກໂຄງສ້າງ ແລະ ໜ້າທີ່ຂອງລະບົບ: ຫຸ້ມຫໍ່, ເໜັງຕຶງ, ຍ່ອຍອາຫານ, ໝູນວຽນເລືອດ, ຫາຍໃຈ, ຖ່າຍເທ | State structure and function of: covering, movement, digestive, circulatory, respiratory, excretory
  - ອະທິບາຍການຍ່ອຍ ແລະ ດູດຊຶມອາຫານ, ການໝູນວຽນເລືອດ, ການແລກປ່ຽນກາສ | Explain digestion/absorption, circulation, gas exchange
  - ບອກຄວາມໝາຍ ແລະ ຕຳແໜ່ງຂອງຮອກໂມນ | Define hormones
  - ອະທິບາຍພະຍາດ ແລະ ການຮັກສາສຸຂະພາບແຕ່ລະລະບົບ | Explain diseases and care for each system
- Ideas:
  - ຫົວໃຈມີ 4 ຫ້ອງ ສູບເລືອດໄປປອດ ແລະ ທົ່ວຮ່າງກາຍ | The heart has 4 chambers and pumps blood to lungs and body
  - ອາຫານຍ່ອຍຕັ້ງແຕ່ປາກ → ກະເພາະ → ລຳໄສ້ນ້ອຍ (ດູດຊຶມ) | Digestion: mouth → stomach → small intestine (absorption)
  - ອົກຊີແຊນແລກປ່ຽນກັບ CO₂ ທີ່ຖຸງລົມນ້ອຍ (alveoli) ໃນປອດ | Oxygen and CO₂ exchange in alveoli
  - ໝາກໄຂ່ຫຼັງກອງຂອງເສຍອອກເປັນຍ່ຽວ | Kidneys filter waste into urine
  - ຮອກໂມນ ເປັນສານເຄມີຄວບຄຸມການເຮັດວຽກ | Hormones are chemical messengers
- Q:
  - ເປັນຫຍັງຫົວໃຈເຕັ້ນໄວຂຶ້ນເມື່ອອອກກຳລັງກາຍ? | Why does the heart rate rise with exercise?
  - ການສູບຢາ ມີຜົນຕໍ່ລະບົບຫາຍໃຈແນວໃດ? | How does smoking affect the respiratory system?
- Act: ວັດຊີບພະຈອນ ກ່ອນ-ຫຼັງ ແລ່ນຢູ່ກັບທີ່ 1 ນາທີ ແລະ ແຕ້ມກຣາຟ | Measure pulse before/after 1 minute of jogging in place; graph it.

#### m3-02 ການປະກອບສ້າງເປັນວັດຖຸ ແລະ ທາດຕ່າງໆ (20 h, TXT, 30 min)
- Obj:
  - ຢັ້ງຢືນວ່າວັດຖຸປະກອບດ້ວຍອະນຸພາກນ້ອຍໆ ທີ່ເຄື່ອນທີ່ຢູ່ສະເໝີ | Show matter consists of tiny moving particles
  - ຈຳແນກແຂງ, ແຫຼວ, ກາສ ຕາມການຈັດລຽງອະນຸພາກ | Distinguish solid/liquid/gas by particle arrangement
  - ບອກຄວາມໝາຍ ອາໂຕມ, ໂມເລກຸນ, ທາດບໍລິສຸດ, ທາດປະສົມ, ທາດປົນ | Define atom, molecule, element, compound, mixture
  - ບອກສັນຍາລັກທາດຈາກຕາຕະລາງທາດ ແລະ ແຍກໂລຫະ/ອາໂລຫະ | Give symbols from the periodic table; separate metals/non-metals
- Ideas:
  - ອາໂຕມຄືອະນຸພາກນ້ອຍສຸດຂອງທາດທີ່ຍັງມີຄຸນສົມບັດ | The atom is the smallest particle of an element
  - ໂມເລກຸນ = ອາໂຕມຕັ້ງແຕ່ 2 ໂຕຂຶ້ນໄປເຊື່ອມກັນ (H₂O, O₂, CO₂) | Molecule = two or more atoms joined (H₂O, O₂, CO₂)
  - ທາດ (element) ມີອາໂຕມຊະນິດດຽວ; ທາດປະສົມ (compound) ເຊື່ອມທາງເຄມີ; ສິມປົນບໍ່ເຊື່ອມທາງເຄມີ | Element: one kind of atom; compound: chemically combined; mixture: not combined
  - ສັນຍາລັກ: H, C, O, Na, Fe, Cu ... | Symbols: H, C, O, Na, Fe, Cu ...
- Q:
  - NaCl ແລະ ນ້ຳເກືອ ຕ່າງກັນແນວໃດ? | How does NaCl differ from salt water? (compound vs mixture)
  - ເປັນຫຍັງກ້ອນນ້ຳຕານລະລາຍໃນນ້ຳແລ້ວເບິ່ງບໍ່ເຫັນ? | Why does sugar disappear in water? (particles spread out)
- Act: ສ້າງແບບຈຳລອງໂມເລກຸນ H₂O, O₂, CO₂ ດ້ວຍດິນເໜຽວສີ ແລ້ວຈັດວ່າເປັນທາດ ຫຼື ທາດປະສົມ. ເປີດ `#/periodic-table` ຊ່ວຍຫາສັນຍາລັກ | Build H₂O, O₂, CO₂ with coloured clay and classify; use the Periodic table tool.

#### m3-03 ແຮງງານ ແລະ ພະລັງງານກົນຈັກ (22 h, SIM `pendulum`, 35 min)
- Obj:
  - ບອກຄວາມໝາຍແຮງງານທາງຟີຊິກ ແລະ ຕ່າງຈາກແຮງງານດ້ານອື່ນ | Define work in physics
  - ອະທິບາຍການຮັກສາແຮງງານໃນເຄື່ອງຕ່ອນແຮງ | Explain conservation of work in simple machines
  - ເຂົ້າໃຈ ກຳລັງ, ປະລິມານເດີນເຄື່ອນ, ພະລັງງານທ່າຕັ້ງ, ພະລັງງານເດີນເຄື່ອນ | Understand power, momentum, potential and kinetic energy
  - ອະທິບາຍການຮັກສາພະລັງງານກົນຈັກ | Explain conservation of mechanical energy
  - ແກ້ບັນຫາຄິດໄລ່ | Solve calculation problems
- Ideas:
  - ແຮງງານ W = F × s (ຫົວໜ່ວຍ J) | Work W = F × s (joule)
  - ກຳລັງ P = W ÷ t (ຫົວໜ່ວຍ W) | Power P = W ÷ t (watt)
  - ພະລັງງານເດີນເຄື່ອນ Ek = ½mv²; ພະລັງງານທ່າຕັ້ງ Ep = mgh | Kinetic Ek = ½mv²; potential Ep = mgh
  - ເມື່ອບໍ່ມີຄວາມຝືດ Ek + Ep ຄົງທີ່ | Without friction Ek + Ep stays constant
  - ເຄື່ອງຕ່ອນແຮງ (ຄານ, ລໍ້ເລື່ອນ) ຫຼຸດແຮງ ແຕ່ບໍ່ຫຼຸດແຮງງານ | Machines reduce force, not work
  - ປະລິມານເດີນເຄື່ອນ p = mv | Momentum p = mv
- Q:
  - ຍົກກ່ອງ 10 kg ຂຶ້ນສູງ 2 m ເຮັດແຮງງານເທົ່າໃດ? (g = 9.8) | Lifting 10 kg by 2 m: how much work? (196 J)
  - ເປັນຫຍັງຕຸ້ມຫ້ອຍຢຸດຫຼັງຈາກແກວ່ງດົນ? | Why does a swing eventually stop?
- Act: ເຮັດຕຸ້ມຫ້ອຍດ້ວຍເຊືອກ+ໝາກເຫຼັກ ປ່ອຍຈາກຄວາມສູງຕ່າງກັນ ແລະ ເບິ່ງຄວາມໄວຕອນຕ່ຳສຸດ | Pendulum from different heights; observe speed at the bottom.

#### m3-04 ຄວາມຮ້ອນ (20 h, TXT, 30 min)
- Obj:
  - ບອກຄວາມສຳພັນລະຫວ່າງການເຄື່ອນທີ່ຂອງອະນຸພາກ ແລະ ອຸນຫະພູມ | Relate particle motion and temperature
  - ບອກຄວາມໝາຍ ຄວາມຮ້ອນ, ອຸນຫະພູມ, ປະລິມານຄວາມຮ້ອນ, ຄວາມຈຸຄວາມຮ້ອນຈຳເພາະ | Define heat, temperature, quantity of heat, specific heat capacity
  - ອະທິບາຍການສົ່ງຄວາມຮ້ອນ: ການນຳ, ການພາ, ການແຜ່ລັງສີ | Explain conduction, convection, radiation
  - ຄິດໄລ່ປະລິມານຄວາມຮ້ອນ | Calculate heat quantity
  - ອະທິບາຍການເຮັດວຽກຂອງເຄື່ອງຈັກຄວາມຮ້ອນ | Explain how heat engines work
- Ideas:
  - ອຸນຫະພູມ ແມ່ນຄວາມຮ້ອນ-ເຢັນ; ຄວາມຮ້ອນ ແມ່ນພະລັງງານທີ່ຖ່າຍທອດ | Temperature is hotness; heat is energy transferred
  - Q = m c ΔT; ນ້ຳ c ≈ 4200 J/(kg·°C) | Q = m c ΔT; water c ≈ 4200 J/(kg·°C)
  - ການນຳ (ແຂງ), ການພາ (ແຫຼວ/ກາສ), ການແຜ່ລັງສີ (ບໍ່ຕ້ອງມີຕົວກາງ) | Conduction (solids), convection (fluids), radiation (no medium)
  - ເຄື່ອງຈັກຄວາມຮ້ອນປ່ຽນຄວາມຮ້ອນເປັນວຽກ ແຕ່ບໍ່ໝົດ | Heat engines convert some heat to work, never all
- Q:
  - ເປັນຫຍັງໝໍ້ໂລຫະຮ້ອນໄວ ແຕ່ມືຈັບໄມ້ບໍ່ຮ້ອນ? | Why is a metal pot hot but its wooden handle not?
  - ຕົ້ມນ້ຳ 2 kg ຈາກ 30 °C ເປັນ 80 °C ຕ້ອງໃຊ້ຄວາມຮ້ອນເທົ່າໃດ? | Heat 2 kg water from 30 to 80 °C: Q = ? (420 kJ)
- Act: ວາງບ່ວງໂລຫະ ແລະ ພລາສຕິກໃນນ້ຳຮ້ອນ ແລະ ເບິ່ງວ່າບ່ວງໃດຮ້ອນກ່ອນ | Put metal and plastic spoons in hot water; which warms first.

#### m3-05 ລະບົບປະສາດ ແລະ ອະໄວຍະວະຮູ້ສຶກ (13 h, TXT, 25 min)
- Obj:
  - ຮັບຮູ້ໂຄງສ້າງ ແລະ ໜ້າທີ່ຂອງລະບົບປະສາດ, ໜັງ, ຫູ, ຕາ, ດັງ, ລີ້ນ | Know structure and function of the nervous system, skin, ear, eye, nose, tongue
  - ຮັບຮູ້ການຕອບສະໜອງຕໍ່ສິ່ງກະຕຸ້ນ | Understand responses to stimuli
  - ອະທິບາຍຜົນຂອງສິ່ງເສບຕິດ | Explain effects of addictive substances
  - ບອກວິທີດູແລຮັກສາ | State ways of care
- Ideas:
  - ລະບົບປະສາດ: ສະໝອງ, ໄຂສັນຫຼັງ, ເສັ້ນປະສາດ | Brain, spinal cord, nerves
  - ຕາ: ແສງຜ່ານແກ້ວຕາ ໄປເກີດຮູບທີ່ເຣຕີນາ | Eye: lens focuses light onto the retina
  - ການຕອບສະໜອງໄວ (reflex) ບໍ່ຕ້ອງຜ່ານສະໝອງ | A reflex does not wait for the brain
  - ສິ່ງເສບຕິດທຳລາຍລະບົບປະສາດ | Addictive substances damage the nervous system
- Q:
  - ເປັນຫຍັງຖອນມືຈາກຂອງຮ້ອນກ່ອນຮູ້ສຶກເຈັບ? | Why do you pull away from hot objects before feeling pain?
  - ຈະດູແລຕາຢ່າງໃດ? | How do you care for your eyes?
- Act: ວັດເວລາຕອບສະໜອງ: ເພື່ອນປ່ອຍໄມ້ບັນທັດ ແລ້ວຈັບ; t = √(2d/g) (d = 20 cm → 0.2 s) | Ruler-drop reaction time: t = √(2d/g); d = 20 cm → 0.2 s.

#### m3-06 ໄຟຟ້າ (20 h, SIM `circuit` basic, 35 min)
- Obj:
  - ອະທິບາຍການຄິດໄຟຟ້າ ແລະ ປະກົດການໄຟຟ້າສະຖິດ | Explain static electricity
  - ຮັບຮູ້ວ່າມີປະຈຸ 2 ຊະນິດ ແລະ ແຮງດຶງ-ຜັກ | Know there are two kinds of charge, attraction and repulsion
  - ອະທິບາຍຟ້າຜ່າ ແລະ ວິທີປ້ອງກັນ | Explain lightning and protection
  - ອະທິບາຍວົງຈອນໄຟຟ້າ ແລະ ສັນຍາລັກ; ຕໍ່ລຽນ ແລະ ຕໍ່ຂະໜານ | Explain circuits, symbols, series and parallel
  - ເຂົ້າໃຈກະແສໄຟຟ້າ ແລະ ຄວາມຕ່າງລະດັບໄຟຟ້າ (ແຮງດັນ) ແລະ ເຄື່ອງແທກ | Understand current, potential difference and meters
- Ideas:
  - ປະຈຸຄືກັນຜັກ, ຕ່າງກັນດຶງ | Like charges repel, unlike attract
  - ກະແສໄຟຟ້າຄືການໄຫຼຂອງປະຈຸ (ເອເລັກຕຣົງ) ໃນວົງຈອນປິດ | Current is flow of charge in a closed circuit
  - ຕໍ່ລຽນ: ກະແສຄືກັນ, ຫຼອດໄຟຫຼາຍ → ມືດລົງ; ຕໍ່ຂະໜານ: ແຕ່ລະຫຼອດສະຫວ່າງຄືເກົ່າ | Series: same current, more bulbs → dimmer; parallel: each bulb as bright
  - ຕົວນຳ (ໂລຫະ) / ຕົວກັນໄຟຟ້າ (ພລາສຕິກ, ຢາງ) | Conductors (metals) / insulators (plastic, rubber)
  - ໄຟຟ້າອັນຕະລາຍ: ບໍ່ຈັບສາຍໄຟເປື້ອນນ້ຳ | Electricity is dangerous: never touch wires with wet hands
- Q:
  - ເປັນຫຍັງໄຟໃນເຮືອນຕໍ່ແບບຂະໜານ? | Why are home appliances wired in parallel?
  - ຖ້າຫຼອດໄຟໜຶ່ງໃນວົງຈອນຕໍ່ລຽນຂາດ ຫຼອດອື່ນເປັນແນວໃດ? | If one bulb in a series circuit burns out, what happens to the rest? (all go off)
- Act: ແຕ່ລະກຸ່ມຕໍ່ວົງຈອນຖ່ານ+ຫຼອດໄຟ ແບບລຽນ ແລະ ຂະໜານ ແລ້ວປຽບທຽບຄວາມສະຫວ່າງ | Build series and parallel circuits with cells and bulbs and compare brightness.

#### m3-07 ການປ່ຽນພາວະຂອງວັດຖຸ (16 h, SIM `states`, 30 min)
- Obj:
  - ບອກຄວາມໝາຍ ການຫຼອມແຫຼວ, ການແຂງຕົວ, ການລະເຫີຍ, ການກັ່ນຕົວ | Define melting, freezing, evaporation/boiling, condensation
  - ບອກຄວາມໝາຍ ຄວາມຮ້ອນແຝງ ແລະ ຄວາມຮ້ອນແຝງຈຳເພາະ | Define latent heat and specific latent heat
  - ອະທິບາຍວ່າວັດຖຸມີ 3 ສະຖານະ ຂຶ້ນກັບອຸນຫະພູມ | Explain 3 states depend on temperature
  - ແກ້ບັນຫາຄິດໄລ່ຄວາມຮ້ອນ ແລະ ຄວາມຮ້ອນແຝງ | Solve heat and latent-heat problems
- Ideas:
  - ແຂງ: ອະນຸພາກສັ່ນຢູ່ທີ່; ແຫຼວ: ເລື່ອນຜ່ານກັນ; ກາສ: ເຄື່ອນໄຫວອິດສະຫຼະ | Solid: particles vibrate in place; liquid: slide past each other; gas: move freely
  - ລະຫວ່າງປ່ຽນພາວະ ອຸນຫະພູມຄົງທີ່ ທັງທີ່ຍັງຮັບຄວາມຮ້ອນ | During a change of state temperature stays constant though heat is added
  - Q = m L (ຄວາມຮ້ອນແຝງຈຳເພາະ); ນ້ຳ: Lf = 334 kJ/kg, Lv = 2260 kJ/kg | Q = m L; water Lf = 334 kJ/kg, Lv = 2260 kJ/kg
  - ຄວາມຮ້ອນແຝງໃຊ້ແຍກພັນທະອະນຸພາກ ບໍ່ແມ່ນເພີ່ມອຸນຫະພູມ | Latent heat breaks bonds rather than raising temperature
- Q:
  - ເປັນຫຍັງຜິວໜັງເຢັນເມື່ອເຫື່ອລະເຫີຍ? | Why does evaporating sweat cool the skin?
  - ເປັນຫຍັງນ້ຳກຳລັງເດືອດອຸນຫະພູມຈຶ່ງບໍ່ຂຶ້ນ? | Why doesn't boiling water get hotter?
- Act: ແຕ້ມກຣາຟອຸນຫະພູມ-ເວລາ ຕອນຕົ້ມນ້ຳແຂງເປັນນ້ຳເດືອດ ແລະ ຊີ້ບ່ອນຮາບ | Plot temperature-time while heating ice to boiling and mark the plateaus.

#### m3-08 ແສງເລຂາ (ແວ່ນກົ່ງ) (15 h, TXT, 30 min)
- Obj:
  - ບອກຄວາມໝາຍຂອງແວ່ນກົ່ງສວດ (concave? REVIEW) ແລະ ແວ່ນກົ່ງຫຼຸບ | Define the two kinds of curved mirror (convex and concave)
  - ບອກອົງປະກອບສຳຄັນ: ແກນຫຼັກ, ຈຸດໂຟກັສ, ຈຸດສູນກາງຄວາມໂຄ້ງ | Name the principal axis, focus, centre of curvature
  - ບອກລັກສະນະຮູບຈິງ ແລະ ຮູບລວງ ທີ່ເກີດຈາກການສະທ້ອນ | State properties of real and virtual images
  - ຍົກຕົວຢ່າງການໃຊ້ແວ່ນສວດ/ຫຼຸບ | Give uses of convex/concave mirrors
- Ideas:
  - ແວ່ນເວົ້າ (concave) ລວມແສງ ເປັນຈຸດໂຟກັສ | A concave mirror converges light to a focus
  - ແວ່ນນູນ (convex) ກະຈາຍແສງ ແລະ ໃຫ້ຮູບລວງຂະໜາດນ້ອຍ ເຫັນວົງກວ້າງ | A convex mirror diverges light, giving a small virtual image over a wide view
  - ສະມຸດຕິກົດ 1/f = 1/u + 1/v | Mirror equation 1/f = 1/u + 1/v
  - ໃຊ້: ກະຈົກເບິ່ງຫຼັງລົດ (ນູນ), ຈານຮັບສັນຍານ/ໄຟສາຍ (ເວົ້າ) | Uses: car side mirror (convex), torch reflector / dish (concave)
- Q:
  - ເປັນຫຍັງໝໍແຂ້ວໃຊ້ແວ່ນເວົ້າ? | Why do dentists use concave mirrors?
  - ເປັນຫຍັງກະຈົກຂ້າງລົດຂຽນວ່າ "ວັດຖຸໃກ້ກວ່າທີ່ເຫັນ"? | Why does a car mirror warn objects are closer than they appear?
- Act: ໃຊ້ບ່ວງເງົາ (ດ້ານໃນ/ນອກ) ເບິ່ງຮູບຕົນເອງ ແລະ ອະທິບາຍ | Use a shiny spoon (both sides) to view your reflection and explain.
- Note: in the Lao text the two mirror words come from the curriculum as ສວດ/ຫຼຸບ and the mapping to convex/concave is an assumption (REVIEW). Use "convex" / "concave" next to the Lao term in the English string.

#### m3-09 ລະບົບສຸລິຍະ (16 h, TXT, 30 min)
- Obj:
  - ອະທິບາຍການກຳເນີດ ແລະ ໂຄງສ້າງຂອງລະບົບສຸລິຍະ | Describe the formation and structure of the solar system
  - ບອກວິທີສັງເກດດາວຈາກໂລກ ແລະ ໂຄງປະກອບຂອງດວງຈັນ, ດາວເຄາະ | Explain how to observe stars and planets
  - ອະທິບາຍການໝູນຂອງໂລກ ແລະ ດວງຈັນ | Explain the motion of Earth and Moon
  - ອະທິບາຍການເກີດກາງເວັນ-ກາງຄືນ, ລະດູການ, ເຟສດວງຈັນ, ຈັນທະຄາຕ/ສຸລິຍະຄາຕ | Explain day/night, seasons, phases and eclipses
  - ເຂົ້າໃຈກຸ່ມດາວໃນທ້ອງຟ້າ | Know constellations
- Ideas:
  - ດາວເຄາະ 8 ດວງ: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune | 8 planets in order from the Sun
  - ໂລກໝູນອ້ອມຕົວເອງ 24 h → ກາງເວັນ/ກາງຄືນ; ອ້ອມດວງອາທິດ ≈ 365 ວັນ → ປີ | Rotation 24 h → day/night; revolution ≈ 365 d → year
  - ແກນໂລກຕັ້ງ 23.5° → ລະດູການ (ບໍ່ແມ່ນໄລຍະທາງ) | Axial tilt 23.5° → seasons (not distance)
  - ເຟສດວງຈັນ ຄົບຮອບ ≈ 29.5 ວັນ | Moon phases repeat every ≈ 29.5 days
  - ຈັນທະຄາຕ: ໂລກຢູ່ລະຫວ່າງ; ສຸລິຍະຄາຕ: ດວງຈັນຢູ່ລະຫວ່າງ | Lunar eclipse: Earth between; solar eclipse: Moon between
- Q:
  - ເປັນຫຍັງລະດູຮ້ອນຂອງລາວບໍ່ແມ່ນຕອນໂລກໃກ້ດວງອາທິດ? | Seasons are not caused by distance: why?
  - ເປັນຫຍັງເຮົາເຫັນດວງຈັນດ້ານດຽວສະເໝີ? | Why do we always see the same side of the Moon? (synchronous rotation)
- Act: ໃຊ້ໄຟສາຍ ແລະ ລູກບານ ສາທິດເຟສດວງຈັນ ແລະ ຈັນທະຄາຕ | Torch and balls to show moon phases and eclipses.

### M.4

#### m4-01 ການສືບພັນ ແລະ ພັດທະນາການຂອງຮ່າງກາຍມະນຸດ (18 h, TXT, 30 min)
- Note to authors: factual, respectful, age-appropriate wording; no explicit imagery; teacher may skip the activity.
- Obj:
  - ອະທິບາຍພັດທະນາການຂອງຮ່າງກາຍຍິງ-ຊາຍ | Describe the development of the female and male body
  - ເຂົ້າໃຈໂຄງສ້າງ ແລະ ໜ້າທີ່ຂອງອະໄວຍະວະສືບພັນ | Understand structure and function of reproductive organs
  - ອະທິບາຍການປະຈຳເດືອນ, ການຖືພາ, ການເກີດລູກ ແລະ ການວາງແຜນຄອບຄົວ | Explain menstruation, pregnancy, birth, family planning
  - ຮູ້ພະຍາດຂອງລະບົບສືບພັນ ແລະ ການປ້ອງກັນ | Know diseases of the reproductive system and prevention
- Ideas:
  - ໄວໜຸ່ມ: ຮໍໂມນເຮັດໃຫ້ຮ່າງກາຍປ່ຽນ | Puberty: hormones change the body
  - ການປະສົມ: ໄຂ່ + ເຊື້ອຕົວອ່ອນ → ໄຊໂກດ → ຝັງໃນມົດລູກ | Fertilisation: egg + sperm → zygote → implants in the uterus
  - ການຖືພາ ≈ 9 ເດືອນ; ຕ້ອງການໂພຊະນາການ ແລະ ການກວດຄັນ | Pregnancy ≈ 9 months; needs nutrition and check-ups
  - ການປ້ອງກັນພະຍາດຕິດຕໍ່ ເຊັ່ນ HIV | Preventing infections such as HIV
- Q:
  - ເປັນຫຍັງການວາງແຜນຄອບຄົວຈຶ່ງສຳຄັນ? | Why is family planning important?
  - ແມ່ຍິງຖືພາຄວນເຮັດຫຍັງເພື່ອສຸຂະພາບທັງແມ່ ແລະ ລູກ? | What should a pregnant woman do for mother and baby health?
- Act: ແບ່ງກຸ່ມ ແລະ ຕອບບັດຄຳຖາມ ຄວາມຈິງ/ຄວາມເຂົ້າໃຈຜິດ ເຊັ່ນ ກ່ຽວກັບໄວໜຸ່ມ | Facts-vs-myths card game on puberty and health.

#### m4-02 ການປ່ຽນແປງຂອງທາດຕ່າງໆ (17 h, TXT, 30 min)
- Obj:
  - ບອກຄວາມໝາຍ, ປະໂຫຍດ ແລະ ຜົນເສຍຂອງປະຕິກິລິຍາເຄມີ | Define chemical reactions, benefits and harms
  - ຍົກຕົວຢ່າງປະຕິກິລິຍາເຄມີໃນທຳມະຊາດ ແລະ ມະນຸດສ້າງ | Give examples of natural and man-made reactions
  - ຂຽນສູດເຄມີຂອງທາດ ແລະ ສຳຄັນການຄິດໄລ່ມວນໂມເລກຸນ | Write chemical formulas and compute molecular mass
  - ອະທິບາຍ ອົກຊີແຊນ ແລະ ອົກຊີເດຊັນ, ໄນໂຕຣແຊນ ແລະ ການນຳໃຊ້ | Explain oxygen, oxidation, nitrogen and their uses
- Ideas:
  - ເກີດທາດໃໝ່: ມີຟອງ, ປ່ຽນສີ, ຕົກຕະກອນ, ໃຫ້ຄວາມຮ້ອນ/ແສງ | New substance: gas bubbles, colour change, precipitate, heat/light
  - ມວນສານຮັກສາ: ມວນຕົ້ນ = ມວນຫຼັງ (ສົມຜົນຕ້ອງດຸນ) | Mass conserved: balance equations
  - 2H₂ + O₂ → 2H₂O | 2H₂ + O₂ → 2H₂O
  - ອົກຊີແຊນ ≈ 21% ຂອງອາກາດ ຊ່ວຍການເຜົາ ແລະ ເຮັດໃຫ້ເຫຼັກເປັນສະນິມ | Oxygen ≈ 21% of air supports burning and rusting
  - ໄນໂຕຣແຊນ ≈ 78% ບໍ່ວ່ອງໄວ; ໃຊ້ເຮັດປຸ໋ຍ | Nitrogen ≈ 78%, unreactive; used for fertiliser
- Q:
  - ເປັນຫຍັງການເຜົາໄມ້ແລ້ວຂີ້ເທົ່າເບົາກວ່າໄມ້? ມວນສານຫາຍໄປບໍ? | Why is ash lighter than wood? Is mass lost? (gases escape)
  - ສະນິມເຫຼັກເກີດຈາກຫຍັງ? | What causes iron to rust? (oxygen + water)
- Act: ຂົນເຫຼັກປຽກ (steel wool) ໃນຫຼອດທົດລອງຄວ່ຳລົງນ້ຳ: ນ້ຳຂຶ້ນປະມານ 1/5 | Wet steel wool in an inverted tube over water: level rises about 1/5.

#### m4-03 ໄຟຟ້າກະແສກົງ (20 h, SIM `circuit` ohm, 35 min)
- Obj:
  - ຄົ້ນຫາຄວາມສຳພັນລະຫວ່າງຄວາມຕ່າງລະດັບ, ກະແສ ແລະ ຄວາມຕ້ານທານ | Find the relation between potential difference, current and resistance
  - ເຂົ້າໃຈກົດເກນໂອມ | Understand Ohm's law
  - ຕໍ່ວົງຈອນຕໍ່ລຽນ ແລະ ຂະໜານ ແລະ ຄິດໄລ່ຄວາມຕ້ານທານລວມ | Wire series/parallel circuits, compute total resistance
  - ຄວາມຕ້ານທານຂຶ້ນກັບຄວາມຍາວ, ເນື້ອທີ່ໜ້າຕັດ ແລະ ທາດ | Resistance depends on length, cross-section and material
  - ຄິດໄລ່ກຳລັງໄຟຟ້າ ແລະ ພະລັງງານ; ກົດເກນ Joule | Compute electric power and energy; Joule's law
- Ideas:
  - V = I × R (Ohm's law) | V = I R
  - ລຽນ: R = R₁ + R₂; ຂະໜານ: 1/R = 1/R₁ + 1/R₂ | Series: R = R₁ + R₂; parallel: 1/R = 1/R₁ + 1/R₂
  - P = V × I; E = P × t | P = VI; E = Pt
  - R = ρL/A | R = ρL/A
  - ໃຊ້ເຄື່ອງໃຊ້ໄຟຟ້າຢ່າງປະຢັດ ແລະ ປອດໄພ (ຟິວ) | Use electricity economically and safely (fuses)
- Q:
  - ຕົວຕ້ານທານ 10 Ω ຕໍ່ກັບ 12 V ຈະມີກະແສເທົ່າໃດ? | A 10 Ω resistor on 12 V: current? (1.2 A)
  - ເປັນຫຍັງສາຍໄຟເສັ້ນນ້ອຍເກີດຄວາມຮ້ອນຫຼາຍ? | Why do thin wires get hotter?
- Act: ວັດ V ແລະ I ໃນຕົວຕ້ານທານເຕັ່ມເຄື່ອງ (ຖ້າມີ) ແລ້ວແຕ້ມກຣາຟ V-I | Measure V and I for a resistor (if equipment) and plot V-I.

#### m4-04 ນ້ຳ, ອາຊິດ, ບາເຊ ແລະ ເກືອ (15 h, TXT, 30 min)
- Obj:
  - ບອກສ່ວນປະກອບຂອງນ້ຳ, ອາຊິດ, ບາເຊ ແລະ ເກືອ | State the composition of water, acids, bases, salts
  - ຂຽນສູດເຄມີຂອງອາຊິດ, ບາເຊ ແລະ ເກືອ ຈຳນວນໜຶ່ງ | Write formulas of some acids, bases, salts
  - ບອກຄຸນລັກສະນະທາງເຄມີຂອງ ນ້ຳ, ອາຊິດ, ບາເຊ ແລະ ເກືອ | State their chemical properties
  - ຂຽນສົມຜົນປະຕິກິລິຍາ ອາຊິດ, ບາເຊ, ເກືອ ແລະ ນ້ຳ | Write equations of reactions among them
- Ideas:
  - ນ້ຳ H₂O; ອາຊິດ (HCl, H₂SO₄) ເປັນສົ້ມ ເຮັດໃຫ້ລິດມັສຟ້າເປັນແດງ | Acids (HCl, H₂SO₄) taste sour and turn blue litmus red
  - ບາເຊ (NaOH) ເຮັດໃຫ້ລິດມັສແດງເປັນຟ້າ; ລື່ນ | Bases (NaOH) turn red litmus blue; feel slippery
  - ອາຊິດ + ບາເຊ → ເກືອ + ນ້ຳ (ການສະເໝີ) | Acid + base → salt + water (neutralisation)
  - HCl + NaOH → NaCl + H₂O | HCl + NaOH → NaCl + H₂O
- Q:
  - ເປັນຫຍັງຢາແກ້ກະເພາະເປັນກົດໃຊ້ບາເຊ? | Why do antacids contain bases?
  - ເປັນຫຍັງຕ້ອງສວມແວ່ນຕາເມື່ອເຮັດວຽກກັບອາຊິດ? | Why wear goggles with acids?
- Act: ເຮັດຕົວຊີ້ວັດຈາກກະລຳປີມ່ວງ ແລະ ທົດສອບສົ້ມສາຍຊູ, ມະນາວ, ນ້ຳສະບູ, ເບກກິງໂຊດາ | Red-cabbage indicator on vinegar, lemon, soapy water, baking soda solution.

#### m4-05 ໄຟຟ້າແມ່ເຫຼັກ (15 h, SIM `solenoid`, 30 min)
- Obj:
  - ຄົ້ນຫາລັກສະນະຂອງທ່ອນແມ່ເຫຼັກ ແລະ ເສັ້ນແຮງແມ່ເຫຼັກ | Explore magnets and field lines
  - ຢັ້ງຢືນວ່າກະແສໄຟຟ້າໃຫ້ເກີດສະໜາມແມ່ເຫຼັກ | Show electric current produces a magnetic field
  - ອະທິບາຍແມ່ເຫຼັກໄຟຟ້າ, ແຮງແມ່ເຫຼັກ ແລະ ໄມເຕີ | Explain electromagnets, magnetic force and motors
  - ອະທິບາຍການເກີດກະແສໄຟຟ້າສະທ້ອນ ແລະ ເຄື່ອງກຳເນີດ | Explain induced current and generators
- Ideas:
  - ເສັ້ນແຮງອອກຈາກຂົ້ວເໜືອ ເຂົ້າຂົ້ວໃຕ້; ແຫຼ່ມຂຶ້ນບ່ອນແຮງສູງ | Field lines leave N, enter S; closer = stronger
  - ກະແສໃນສາຍ ສ້າງວົງແມ່ເຫຼັກອ້ອມສາຍ (ກົດມືຂວາ) | Current in a wire makes circles of field (right-hand grip)
  - ແມ່ເຫຼັກໄຟຟ້າແຮງຂຶ້ນ ເມື່ອລວດຫຼາຍຮອບ, ກະແສຫຼາຍ, ມີແກນເຫຼັກ | Electromagnet stronger with more turns, more current, iron core
  - ການເຄື່ອນແມ່ເຫຼັກຜ່ານລວດ ເກີດກະແສສະທ້ອນ | Moving a magnet through a coil induces current
- Q:
  - ເປັນຫຍັງໃຊ້ແມ່ເຫຼັກໄຟຟ້າຍົກເຫຼັກໃນໂຮງງານ? | Why use electromagnets in scrapyards?
  - ເຄື່ອງກຳເນີດໄຟຟ້າໃນເຂື່ອນເຮັດວຽກແນວໃດ? | How does a dam generator work?
- Act: ພັນລວດ 20 ຮອບເທິງຕະປູ ຕໍ່ຖ່ານ ແລະ ນັບຈຳນວນເຂັມໝຸດທີ່ດຶງໄດ້ ເມື່ອປ່ຽນຈຳນວນຮອບ | Wind 20 turns on a nail, connect a cell, count pins lifted; change turns.

#### m4-06 ໄຟຟ້າກະແສສະຫຼັບ (10 h, TXT, 25 min)
- Obj:
  - ເຂົ້າໃຈຄວາມໝາຍຂອງໄຟຟ້າກະແສສະຫຼັບ | Understand alternating current
  - ອະທິບາຍສ່ວນປະກອບ ແລະ ການເຮັດວຽກຂອງເຄື່ອງກຳເນີດ ແລະ ໝໍ້ແປງໄຟ | Explain generators and transformers
  - ຍົກຕົວຢ່າງການນຳໃຊ້ ແລະ ບົດບາດຂອງກະແສສະຫຼັບໃນຕົວຈິງ | Give uses of AC
  - ອະທິບາຍວິທີສົ່ງໄຟຟ້າໄປໄກ | Explain long-distance transmission
- Ideas:
  - AC: ກະແສປ່ຽນທິດ; ໄຟບ້ານ ≈ 230 V, 50 Hz | AC reverses direction; mains ≈ 230 V, 50 Hz
  - ເຄື່ອງກຳເນີດ: ແມ່ເຫຼັກ ຫຼື ລວດໝູນ | Generator: rotating coil/magnet
  - ໝໍ້ແປງ: Vp/Vs = Np/Ns | Transformer: Vp/Vs = Np/Ns
  - ສົ່ງແຮງດັນສູງ ເພື່ອໃຫ້ກະແສຕ່ຳ ແລະ ສູນເສຍ P = I²R ໜ້ອຍ | Transmit at high voltage: low current, low loss I²R
- Q:
  - ໝໍ້ແປງ 230 V ເຂົ້າ, ລວດ 1000:100 ຮອບ ໄດ້ເທົ່າໃດ? | 230 V in, turns 1000:100: output? (23 V)
  - ເປັນຫຍັງຕ້ອງໃຊ້ແຮງດັນສູງໃນສາຍສົ່ງ? | Why high voltage in power lines?
- Act: ຄິດໄລ່ຕາຕະລາງ ແຮງດັນ/ກະແສ/ສູນເສຍ ເມື່ອສົ່ງ 10 kW ທີ່ 230 V ແລະ 11 kV | Table of current and loss when sending 10 kW at 230 V vs 11 kV.

#### m4-07 ເລນ (ແກ້ວຕາເສືອ) (25 h, SIM `lens`, 40 min)
- Obj:
  - ບອກຄວາມໝາຍເລນບາງ, ເລນສວດ (convex) ແລະ ເລນຫຼຸບ (concave) | Define thin, convex and concave lenses
  - ບອກອົງປະກອບ: ແກນຫຼັກ, ຈຸດໂຟກັສ | Name principal axis, focus
  - ວາດແຜນພາບຮັງສີ ແລະ ຮູບເກີດຈາກເລນ | Draw ray diagrams and images
  - ອະທິບາຍກ້ອງຖ່າຍຮູບ, ຕາ, ສາຍຕາສັ້ນ-ຍາວ | Explain the camera and eye, short/long sight
  - ບອກວ່າແສງຂາວເປັນສິມປົນຂອງແສງສີ ແລະ ການແຍກ/ປະສົມແສງສີ | White light is a mixture of colours; dispersion and mixing
- Ideas:
  - ເລນສວດ ລວມແສງ; ເລນຫຼຸບ ກະຈາຍແສງ | Convex converges; concave diverges
  - 1/f = 1/u + 1/v; ຂະຫຍາຍ m = −v/u | 1/f = 1/u + 1/v; m = −v/u
  - ວັດຖຸໄກກວ່າ 2f → ຮູບຈິງ, ຫັງຫົວ, ຍ່ອ; ໃກ້ກວ່າ f → ຮູບລວງ, ຕັ້ງ, ຂະຫຍາຍ | Beyond 2f: real, inverted, diminished; inside f: virtual, upright, magnified
  - ຕາ: ເລນ ສ້າງຮູບຈິງຫັງຫົວເທິງເຣຕີນາ; ສາຍຕາສັ້ນແກ້ດ້ວຍເລນຫຼຸບ; ສາຍຕາຍາວດ້ວຍເລນສວດ | Eye forms an inverted real image on the retina; short sight corrected by concave, long sight by convex lenses
  - ແສງຂາວແຍກເປັນ 7 ສີໃນປຣິສຶມ | White light disperses into colours in a prism
- Q:
  - ແວ່ນຂະຫຍາຍ ໃຊ້ເລນຊະນິດໃດ ແລະ ວາງວັດຖຸໄວ້ໃສ? | Which lens and where for a magnifying glass? (convex, inside f)
  - ເລນສວດ f = 10 cm, ວັດຖຸຢູ່ 30 cm ຮູບຢູ່ໃສ? | Convex f = 10 cm, object at 30 cm: image? (15 cm, real, inverted, m = −0.5)
- Act: ໃຊ້ແວ່ນຂະຫຍາຍ ຮັບຮູບໄຟຫ້ອງເທິງຜ້າມ່ານ ແລະ ວັດ u, v | Project a window/lamp onto a card with a magnifying glass; measure u, v.

#### m4-08 ທາດອິນຄະທາດ ແລະ ທາດອະນິນຄະທາດ (8 h, TXT, 20 min)
- Obj:
  - ຈຳແນກທາດອິນຄະທາດ (organic) ແລະ ທາດອະນິນຄະທາດ (inorganic) | Distinguish organic and inorganic compounds
  - ທົດລອງສຶກສາຄຸນສົມບັດ (ເຜົາໄດ້, ລະລາຍ) | Test properties (combustibility, solubility)
  - ຍົກຕົວຢ່າງທາດປະສົມຂອງກາກບອນຈຳນວນໜຶ່ງ | Give examples of carbon compounds
- Ideas:
  - ທາດອິນຄະທາດ ມີກາກບອນ (C) ກັບ H, O, N (ແອທານອນ C₂H₅OH, ມີເທນ CH₄, ນ້ຳຕານ) | Organic compounds contain carbon with H, O, N (ethanol, methane, sugar)
  - ເຜົາໄດ້ແລະ ເກີດ CO₂ + H₂O | They usually burn giving CO₂ + H₂O
  - ຂໍ້ຍົກເວັ້ນ: CO₂, ແຄັບບອເນດ ເປັນອະນິນຄະທາດ | Exceptions: CO₂ and carbonates are inorganic
  - ພລາສຕິກ, ຢາງ, ນ້ຳມັນ ເປັນສານອິນຄະທາດ | Plastics, rubber, oil are organic
- Q:
  - ເກືອ NaCl ເປັນທາດຊະນິດໃດ? | Is NaCl organic or inorganic? (inorganic)
  - ເປັນຫຍັງພລາສຕິກທຳລາຍຍາກ? | Why is plastic hard to degrade?
- Act: ເຜົາ ນ້ຳຕານ ແລະ ເກືອ (ຄູເຮັດ) ແລ້ວປຽບທຽບ | Teacher demo: heat sugar and salt, compare.

#### m4-09 ການຖ່າຍທອດລັກສະນະທາງກຳມະພັນ (12 h, TXT, 30 min)
- Obj:
  - ອະທິບາຍການແບ່ງຈຸລັງ ແບບ mitosis ແລະ meiosis | Explain mitosis and meiosis
  - ອະທິບາຍກົດການຖ່າຍທອດຂອງ Mendel | Explain Mendel's laws
  - ຮູ້ປະເພດ ແລະ ໜ້າທີ່ຂອງໂຄໂມໂຊມ | Know chromosomes and genes
  - ອະທິບາຍການກຳນົດເພດ ແລະ ແຊນ | Explain sex determination
  - ອະທິບາຍຄວາມຜິດປົກກະຕິຂອງໂຄໂມໂຊມ | Explain chromosome abnormalities
- Ideas:
  - Mitosis ໃຫ້ 2 ຈຸລັງເໝືອນເກົ່າ; Meiosis ໃຫ້ 4 ເຊວສືບພັນ (ເຄິ່ງໜຶ່ງຂອງໂຄໂມໂຊມ) | Mitosis: 2 identical cells; meiosis: 4 gametes with half the chromosomes
  - ມະນຸດມີ 46 ໂຄໂມໂຊມ (23 ຄູ່) | Humans have 46 chromosomes (23 pairs)
  - XX = ຍິງ, XY = ຊາຍ | XX = female, XY = male
  - Tt × Tt → 3:1 (ລັກສະນະ), 1:2:1 (ແບບແຊນ) | Tt × Tt → 3:1 phenotypes, 1:2:1 genotypes
- Q:
  - ເປັນຫຍັງລູກຄ້າຍພໍ່ແມ່ແຕ່ບໍ່ຄືກັນທັງໝົດ? | Why do children resemble but are not identical to parents?
  - ພໍ່ຜູ້ກຳນົດເພດຂອງລູກ ເປັນຫຍັງ? | Why does the father's sperm determine the sex of the child?
- Act: ຕາຕະລາງ Punnett ກັບເຈ້ຍ: ຫຼຽນ 2 ເຫຼັ້ມ ແທນ T/t | Punnett square with two coins for T/t.

#### m4-10 ການປ່ຽນຮູບ ແລະ ຮັກສາພະລັງງານ (15 h, TXT, 30 min)
- Obj:
  - ບອກພະລັງງານຮູບຕ່າງໆ ແລະ ຍົກຕົວຢ່າງ | List forms of energy with examples
  - ອະທິບາຍການປ່ຽນຮູບພະລັງງານ | Explain energy transformation
  - ຮູ້ສະພາບການຜະລິດ ແລະ ນຳໃຊ້ພະລັງງານໃນລາວ | Know energy production and use in Laos
  - ສະເໜີວິທີປະຢັດ | Propose saving methods
- Ideas:
  - ພະລັງງານບໍ່ເກີດ/ບໍ່ສູນຫາຍ ແຕ່ປ່ຽນຮູບ | Energy is neither created nor destroyed
  - ຕ່ອງໂສ້: ນ້ຳຕົກ → ເຄື່ອງກຳເນີດ → ໄຟຟ້າ → ແສງ + ຄວາມຮ້ອນ | Chain: falling water → generator → electricity → light + heat
  - ປະສິດທິພາບ = ພະລັງງານທີ່ໃຊ້ປະໂຫຍດ ÷ ພະລັງງານທັງໝົດ × 100% | Efficiency = useful ÷ total × 100%
  - ລາວຜະລິດໄຟຟ້າຈາກໄຟຟ້ານ້ຳເປັນຫຼັກ | Laos produces electricity mainly from hydropower
- Q:
  - ຫຼອດ LED ກັບຫຼອດໄສ້ ປະສິດທິພາບຕ່າງກັນແນວໃດ? | LED vs filament bulb efficiency?
  - ເຂື່ອນໄຟຟ້າມີຜົນຕໍ່ສິ່ງແວດລ້ອມແນວໃດ? | Environmental effects of hydropower dams?
- Act: ເຮັດຜັງຕ່ອງໂສ້ພະລັງງານ ສຳລັບ ໂທລະສັບ, ເຕົາຟືນ, ລົດຈັກ | Draw energy chains for a phone, a stove, a motorbike.

#### m4-11 ການນຳໃຊ້ທາດເຄມີໃນການດຳລົງຊີວິດຂອງມະນຸດ (10 h, TXT, 20 min)
- Obj:
  - ບອກຄວາມສຳຄັນ ແລະ ບົດບາດຂອງທາດເຄມີໃນຊີວິດ | State the importance of chemicals in daily life
  - ອະທິບາຍຜົນດີ, ຜົນເສຍ | Explain benefits and harms
  - ອະທິບາຍວິທີການນຳໃຊ້ທີ່ຖືກຕ້ອງ | Explain correct use
- Ideas:
  - ປຸ໋ຍ, ຢາຂ້າແມງໄມ້, ສະບູ/ຜົງຊັກຟອກ, ຢາ, ພລາສຕິກ | Fertilisers, pesticides, soaps/detergents, medicines, plastics
  - ໃຊ້ເກີນ ເກີດສານຕົກຄ້າງ ແລະ ມົນລະພິດ | Overuse leaves residues and pollution
  - ອ່ານປ້າຍ, ວັນໝົດອາຍຸ, ເກັບໃຫ້ພົ້ນມືເດັກ | Read labels, expiry dates, keep away from children
- Q:
  - ເປັນຫຍັງຕ້ອງລ້າງຜັກໃຫ້ສະອາດ? | Why wash vegetables thoroughly?
  - ຈະຖິ້ມຖົງຢາຂ້າແມງໄມ້ຢ່າງໃດ? | How to dispose of pesticide packaging?
- Act: ອ່ານປ້າຍ 3 ຜະລິດຕະພັນໃນເຮືອນ ແລະ ຈຳແນກສ່ວນປະກອບ ແລະ ຄຳເຕືອນ | Read labels of 3 household products; list ingredients and warnings.

## 6. Data and architecture

### 6.1 Existing code that is replaced or generalised

- `src/content/m2.ts` (`M2Lesson`, `M2Id`, `m2Lessons`) is migrated into the registry; text kept verbatim.
- `src/pages/M2Lesson.tsx` (hard-coded for 2 lessons) is split into a generic `LessonPage` + per-sim modules. Behaviour must stay the same for `m2-04`, `m2-05`.
- `src/pages/Home.tsx` has `GradeM2` and a label ternary for m2/m5; generalise to a data-driven grade page for every grade.
- `src/App.tsx` routes `m2-force|m2-pressure` explicitly; replace by registry lookup.
- `package.json` has no test runner. Add `vitest` as a devDependency and `"test": "vitest run"` (dev only; does not enter the PWA bundle).

### 6.2 File layout

```
src/content/lower/types.ts        LessonDef, QuizItem, SimKey, Field
src/content/lower/m1.ts           export const m1: LessonDef[]   (9 entries)
src/content/lower/m2.ts           export const m2: LessonDef[]   (12)
src/content/lower/m3.ts           (9)
src/content/lower/m4.ts           (11)
src/content/lower/index.ts        registry: allLessons, getLesson(id), lessonsOfGrade(g), resolveRoute(hash)
src/sims/*.ts                     pure formulas, no React/three: motion.ts, thermal.ts, foodweb.ts, reflection.ts,
                                  pendulum.ts, circuit.ts, states.ts, lens.ts, solenoid.ts (+ *.test.ts)
src/scenes/sims/<key>/            Scene.tsx, Controls.tsx, index.ts exporting a SimDef
src/scenes/sims/registry.ts       export const SIMS: Record<SimKey, () => Promise<{ default: SimDef<any-free> }>>
src/pages/GradePage.tsx           generic grade list
src/pages/LessonPage.tsx          generic lesson page (sim optional)
src/components/QuizPanel.tsx
src/components/IdeaCards.tsx      illustrated key-idea cards for content-only lessons
```

### 6.3 Types (contract)

```ts
// src/content/lower/types.ts
import type { L } from '../../i18n/strings'
export type GradeKey = 'm1' | 'm2' | 'm3' | 'm4'          // m5..m7 added later by widening this union
export type Field = 'bio' | 'chem' | 'phys' | 'earth' | 'method'
export type SimKey =
  | 'motion' | 'photosynthesis' | 'thermal' | 'force' | 'pressure' | 'foodweb' | 'reflection'
  | 'pendulum' | 'circuit' | 'states' | 'solenoid' | 'lens'

export interface QuizItem {
  id: string                 // unique inside the lesson, e.g. 'q1'
  q: L                       // the question
  options: L[]               // 3 or 4 options, each bilingual
  answer: number             // zero-based index into options
  why: L                     // explanation shown after checking
}

export interface LessonBase {
  id: string                 // 'm1-04'; route is '#/m1-04'
  grade: GradeKey
  order: number              // 1-based, curriculum order
  title: L
  hours: number
  field: Field
}
export interface PlannedLesson extends LessonBase { status: 'planned' }
export interface ReadyLesson extends LessonBase {
  status: 'ready'
  summary: L
  objectives: L[]            // 2-5
  keyIdeas: L[]              // 3-5
  questions: L[]             // exactly 2
  activity: L
  minutes: number
  quiz: QuizItem[]           // 3-5
  sim?: SimKey               // present = interactive
  simProps?: Record<string, string | number | boolean>   // e.g. { mode: 'ohm' }
}
export type LessonDef = PlannedLesson | ReadyLesson
```

Rules: the `[GradeKey]` array sums of `hours` must be 132, 132, 165, 165. `title` of planned entries is already final (section 3). Legacy alias map in `index.ts`: `{ 'm2-force': 'm2-04', 'm2-pressure': 'm2-05' }`.

Colour per `Field` (existing palette): chem `#4fc3f7`, phys `#ffb74d`, bio `#81c784`, earth `#a1887f`, method `#ba68c8`. The two migrated lessons may keep their current `color`, so allow `color?: string` on ReadyLesson overriding the field colour.

### 6.4 SimDef contract

```ts
export interface SimDef<S> {
  initial: S
  camera: { camZ: number; zoom2D: number }
  Scene: React.FC<{ state: S; is2D: boolean }>              // goes inside <SceneCanvas>
  Controls: React.FC<{ state: S; set: (patch: Partial<S>) => void; simProps?: Record<string, string | number | boolean> }>
  legend: (state: S, t: (k: UiKey) => string) => { color: string; label: string }[]
  readout?: (state: S, t: (k: UiKey) => string) => React.ReactNode   // aria-live result block
}
```
`LessonPage` owns: top bar (back, title, 2D/3D, present, language), state of `S`, SceneCanvas, auto-rotate, reset view, key handling, tabs (Lesson / Objectives / Teacher notes / Quiz), footer. Sim modules are loaded with `React.lazy` / dynamic import so the first page stays small; all chunks must still be precached.

### 6.5 Quiz UI (`QuizPanel`)

- Tab "Quiz" (new UI key `tabQuiz`) in the lesson panel; for content-only lessons the quiz is also shown under the idea cards.
- One question visible at a time with N/total counter; options are native radio inputs (arrow keys work, large hit area, text >= 18 px; >= 28 px in present mode).
- "Check" button is disabled until an option is chosen. After checking: option marked correct/incorrect with colour AND a text/icon (not colour only), and the `why` text appears. "Next" then moves on; last question shows "Score: x / N" and "Try again" (resets).
- Selected answer and score live in component state only. Language toggle must not reset progress.
- Number keys 2/3 (view) and P, L, R shortcuts are ignored when focus is inside the quiz (use existing `isTyping` check extended to the quiz root).

### 6.6 Routing and pages

- Home overview cards for ມ.1-ມ.4: `ready` when the grade has at least one ready lesson; otherwise "Coming soon".
- `#/grade-m1` .. `#/grade-m4`: list all topics of the grade in `order`. Card: number, title, hours, field colour, chip "Interactive 2D/3D" (sim) or "Lesson + quiz" (txt) or "Coming soon" (planned, not clickable, `aria-disabled`).
- `#/m1-04` etc.: `LessonPage`. Unknown id falls back to Home. `onHome` of a lesson returns to its grade page.
- M.5 route `#/m5-atoms`-style existing route is untouched.

### 6.7 Presentation mode and keys (all lessons)

- P / Esc: enter / exit present (fullscreen as in existing code). L: language. R: reset. 2 / 3: 2D / 3D (only for sim lessons). Left/Right arrow: step through slides in present mode and through key ideas in normal mode.
- Present mode, sim lesson: stage + large panel (>= 28 px) as today. Content-only lesson: full-screen slides, one per item: title+summary, each key idea, each discussion question, activity. Slide counter "3 / 9". High contrast (WCAG AA).

## 7. Simulations (11 scene modules for 12 lesson entries)

Common rules: all constants live in `src/sims/<key>.ts` as exported pure functions; units shown; every readout updates live (`aria-live="polite"`); labels on canvas Latin only; 2D/3D per business rule 7; dpr cap 1.5; <= 64 segments per round mesh; a "Reset" button restores `initial`.

### 7.1 `motion` (m1-04)
- Controls: speed v slider 0-20 m/s step 1 (also unit toggle m/s | km/h display); mode toggle uniform | accelerating (a slider 0-4 m/s², step 0.5); Play/Pause/Restart.
- Drawn: road with distance ticks every 10 m, a car, a clock, and a live distance-time graph (s on y, t on x) below/overlay (Canvas line or HTML SVG).
- Formulas: uniform s = v·t; accelerating from rest s = ½·a·t², v(t) = a·t; average speed = s/t. Run length 10 s then stops; track 0-100 m window scrolls.
- Must be true: uniform graph is a straight line through origin with slope v; accelerating graph is a parabola; 1 m/s = 3.6 km/h; displayed average speed equals s/t.
- Checks: v = 10 m/s at t = 5 s shows 50 m; a = 2 m/s² at t = 5 s shows 25 m and v = 10 m/s; switching units 10 m/s shows 36 km/h.

### 7.2 `photosynthesis` (m1-08)
- Controls: light intensity (0, 1, 2, 3 levels), CO₂ (low | normal | high), water (dry | normal), chlorophyll toggle ("green leaf" | "variegated/white leaf"); Play.
- Drawn: a leaf cross-section (2D schematic) / a plant in 3D with sun, arrows for water (roots → leaf), CO₂ (stomata), O₂ bubbles out, glucose icon; bubble rate indicates rate.
- Model (qualitative, bounded): rate = min(light, co2, water) × chlorophyll ∈ {0,1,2,3} (limiting factor); O₂ bubbles/min = 10 × rate; equation shown: 6CO₂ + 6H₂O --(light)--> C₆H₁₂O₆ + 6O₂.
- Must be true: no light, or no water, or white leaf → rate 0; the limiting factor is named in the readout; output O₂ and glucose appear only when rate > 0.
- Checks: light 0 → 0 bubbles; light 3, CO₂ low → rate follows CO₂ and readout names CO₂ as limiting; white leaf → 0.

### 7.3 `thermal` (m2-02)
- Controls: temperature slider 0-100 °C (start 20 °C); material select for the bar (steel, aluminium, copper); toggle "exaggerate ×" fixed 500 (display note).
- Drawn: three panels: (a) metal bar 1 m with a gap gauge, (b) liquid in a thermometer tube (alcohol), (c) a gas balloon/syringe. Heat source icon.
- Formulas: ΔL = α·L₀·ΔT with α steel 12e-6, aluminium 23e-6, copper 17e-6 per K (exact numbers displayed in mm); liquid ΔV/V₀ = β·ΔT with β(alcohol) = 1.1e-3 per K; gas V = V₀·T/T₀ (T in kelvin, constant pressure).
- Must be true: all values grow with T; for equal ΔT the order of fractional expansion is gas > liquid > solid; bar of 1 m, steel, ΔT = 80 K → 0.96 mm (shown true value, drawing exaggerated and labelled).
- Checks: steel 20 → 100 °C shows +0.96 mm; aluminium shows +1.84 mm; gas volume at 100 °C is 373/293 = 1.27 × volume at 20 °C.

### 7.4 `force` (m2-04) and `pressure` (m2-05)
Existing scenes and formulas, unchanged (extract from `M2Lesson.tsx`). Acceptance = same behaviour as before the refactor.

### 7.5 `foodweb` (m2-06)
- Controls: chain select (rice-field: rice → grasshopper → frog → snake → eagle; pond: algae → small fish → big fish → heron); Producer energy input slider 1000-100000 kJ (log steps 1k, 10k, 100k); "Remove organism" button group (one per organism); Reset.
- Drawn: stacked energy pyramid (bars) + chain arrows; removed organism greyed; effect arrows (↑ grows / ↓ declines).
- Formulas: energy at level k = E₀ × 0.10^(k-1). Qualitative effect rule: removing X → organisms that eat X decline (↓), organisms eaten by X increase (↑) in the short term, then limited by food (readout text).
- Must be true: energy decreases by 10× per level; top level of a 5-level chain receives 0.01% of producer energy; decomposers are shown as a separate bar returning nutrients.
- Checks: E₀ = 10000 kJ shows 10000, 1000, 100, 10, 1; removing frog flags snake ↓ and grasshopper ↑; removing producer flags everyone ↓.

### 7.6 `reflection` (m2-11)
- Controls: angle of incidence i slider 0-80° step 5; object distance d slider 1-6 (units "cells"); toggle "show image" and "show normal".
- Drawn: plane mirror, normal (dashed), incident and reflected ray with angle arcs, object (candle) and virtual image behind the mirror (dashed lines through the mirror).
- Formulas: r = i; image distance behind = d; image height = object height; image drawn laterally inverted.
- Must be true: reflected ray lies on the opposite side of the normal in the same plane; angles measured from the normal, not the surface; image is virtual (dashed, no rays actually pass behind).
- Checks: i = 35° → r = 35°; d = 3 → image at 3 behind; i = 0 → ray returns on itself.

### 7.7 `pendulum` (m3-03)
- Controls: mass 0.5-5 kg step 0.5; release angle 10-80° step 5; string length fixed 2 m; air resistance toggle off | on (damping); Play/Pause.
- Drawn: pendulum swinging; live energy bars Ep, Ek, total (and "heat" bar when damping on).
- Formulas: h = L(1 − cos θ); Ep = m g h (g = 9.8); Ek = ½ m v²; ideal: v = √(2 g (h₀ − h)); T ≈ 2π√(L/g) (small angles); damping: total energy E(t) = E₀·e^(−t/τ), τ = 20 s; heat = E₀ − E.
- Must be true: with damping off Ek + Ep stays constant (within 0.1%); Ek is maximum at the bottom and zero at the extreme; period independent of mass; with damping on the amplitude decays and heat bar grows.
- Checks: m = 1 kg, θ = 60°, L = 2 m → h₀ = 1.0 m, E = 9.8 J; at the bottom Ek = 9.8 J, v = 4.43 m/s; changing mass doesn't change period.

### 7.8 `circuit` (m3-06 mode `basic`, m4-03 mode `ohm`)
Shared scene and `src/sims/circuit.ts`.
- Mode `basic` controls: cells 1-4 (1.5 V each); bulbs 1-3 (each R = 10 Ω); wiring series | parallel; switch on | off; "remove one bulb" (unscrew) toggle per bulb.
  - Drawn: battery, wires with animated charge dots (speed ∝ current), bulbs whose glow ∝ power P = V_b²/R, ammeter reading.
  - Formulas: V = 1.5·cells; series: I = V/(n·R), V_b = V/n; parallel: I = n·V/R, V_b = V; P_bulb = V_b²/R.
  - Must be true: series with an unscrewed bulb → I = 0, all off; parallel with one unscrewed → others unchanged; in series more bulbs → each dimmer; open switch → I = 0.
  - Checks: 2 cells, 3 bulbs series → I = 0.10 A, each bulb 0.1 W; parallel → I = 0.9 A, each 0.9 W.
- Mode `ohm` controls: V 0-12 V step 1; R₁, R₂ each 1-100 Ω; arrangement single | series | parallel.
  - Drawn: circuit with ammeter + voltmeters, I-V graph for R₁ (line slope 1/R₁) with a moving point.
  - Formulas: R_eq series R₁ + R₂; parallel R₁R₂/(R₁ + R₂); I = V/R_eq; V_i = I·R_i (series); I_i = V/R_i (parallel); P = V·I.
  - Must be true: R_eq parallel is less than the smaller R; series voltage divides in proportion to R; sum of branch currents = total.
  - Checks: V = 12, R₁ = 10, R₂ = 20 series → R_eq = 30 Ω, I = 0.40 A, V₁ = 4 V, V₂ = 8 V, P = 4.8 W; parallel → R_eq = 6.67 Ω, I = 1.8 A.

### 7.9 `states` (m3-07)
- Controls: heater power 0.5-3 kW (step 0.5); mass 0.5 kg fixed (display); substance water only; Play/Pause; speed x1/x10/x50; Cool (reverse) toggle.
- Drawn: particle box (2D lattice/3D cluster), thermometer, live heating curve T vs time with plateaus marked; state label (ice, ice+water, water, water+steam, steam).
- Model (m = 0.5 kg; start ice at -20 °C): c_ice 2.1, c_water 4.2, c_steam 2.0 kJ/(kg·K); L_f 334, L_v 2260 kJ/kg. Energy stages: ice -20→0: 21 kJ; melt: 167 kJ; water 0→100: 210 kJ; boil: 1130 kJ; steam 100→120: 20 kJ. Temperature is piecewise-linear in energy E = P·t; particle jitter amplitude grows with T; during plateaus fraction melted/boiled = (E - E_stage)/Q_stage.
- Must be true: T is flat at 0 °C and 100 °C while energy is still added; total time to boil off at 1 kW ≈ 1548 s (at x1); cooling curve mirrors heating.
- Checks: at 1 kW and t = 21 s T = 0 °C (start of melt); t = 188 s still 0 °C with state "ice+water"; t = 398 s T = 100 °C start of boiling; at t = 1528 s all steam begins heating.

### 7.10 `solenoid` (m4-05)
- Controls: turns N 10-100 step 10; current I 0-5 A step 0.5; direction + / −; iron core toggle; mode: bar magnet | straight wire | solenoid.
- Drawn: field lines (Latin-letter N/S labels), compass needles, paper-clip counter, arrows for current. Field lines closed loops, denser where stronger.
- Formulas: solenoid B = μ₀·n·I with n = N/L, L = 0.2 m, μ₀ = 4π×10⁻⁷ T·m/A; with iron core B × μr (μr = 200, illustrative, labelled); straight wire B = μ₀I/(2πr) at r = 0.05 m; pins lifted ≈ round(B / 0.002 T) capped at 20 (illustrative, labelled).
- Must be true: B ∝ N and ∝ I; reversing I flips polarity (N/S swap); I = 0 → B = 0 and no pins; right-hand grip rule matches the drawn N pole.
- Checks: N = 50, I = 2 A, no core → B = 0.63 mT; N = 100, I = 4 → 2.5 mT (4×); iron core multiplies by 200 (shown with "illustrative").

### 7.11 `lens` (m4-07)
- Controls: lens type convex | concave; focal length |f| 5-15 cm step 1; object distance u 5-50 cm step 1 (object height 2 cm, fixed); toggle show 3 principal rays.
- Drawn: principal axis, lens, F and 2F marks (Latin labels), object arrow, three principal rays, image arrow (solid if real, dashed if virtual), readouts v, m, nature.
- Formulas (real-is-positive): 1/v = 1/f − 1/u, with f > 0 convex, f < 0 concave; m = −v/u; image height = m × object height. u = f: no image (parallel rays; readout "image at infinity").
- Must be true: convex, u > 2f → real, inverted, diminished; u = 2f → real, inverted, same size at 2f; f < u < 2f → real, inverted, magnified; u < f → virtual, upright, magnified; concave → always virtual, upright, diminished, image between lens and F.
- Checks: convex f = 10, u = 30 → v = 15, m = -0.5; u = 20 → v = 20, m = -1; u = 5 → v = -10 (virtual), m = +2; concave f = 10, u = 30 → v = -7.5, m = +0.25.

## 8. Roles and work split

Coder (logic, data, tests):
1. `types.ts`, registry `index.ts`, route resolution and legacy aliases.
2. All content files `m1.ts`..`m4.ts` with every field of section 5 (Lao + English), quiz (3-5 items per ready lesson), `// REVIEW` markers; planned entries for topics not yet in a batch.
3. Migrate `src/content/m2.ts` into `lower/m2.ts` and delete the old file.
4. `src/sims/*.ts` pure formulas of section 7 + vitest unit tests with the "Checks" numbers.
5. Registry integrity tests: unique ids; grade hour sums 132/132/165/165; every ready lesson has non-empty lo and en in every `L`; 2 questions, 3-5 ideas, 2-5 objectives, 3-5 quiz items; `answer` in range; every `sim` key exists in `SIMS`; no `L` where lo === en for non-formula text (warn only).
6. `LessonPage` state/keyboard logic, `SimDef` contract wiring, `App.tsx` routes, `Home` grade-ready logic.
7. PLAN.md update: add a section "ບົດຮຽນ ມ.1-ມ.4" listing registry + batches.

UX/UI designer (pages, components, scenes, styles, i18n strings):
1. `GradePage`, grade cards, chips, "Coming soon" state; `LessonPage` layout incl. content-only layout and slides; `QuizPanel`; `IdeaCards` (simple inline SVG figure per idea or numbered cards; optional).
2. Scenes and controls for the 11 sims in section 7, using the `SimDef` contract and existing `SceneCanvas`, `Arrow`, `Label`.
3. UI strings in `src/i18n/strings.ts` (each key lo and en): `tabQuiz`, `quizCheck`, `quizNext`, `quizTryAgain`, `quizScore`, `quizCorrect`, `quizWrong`, `quizQuestionOf`, `chipInteractive`, `chipLessonQuiz`, `slideOf`, `topicNumber`, `hoursShort`, plus per sim a prefix: `mo*` (motion), `ps*` (photosynthesis), `th*` (thermal), `fw*` (foodweb), `rf*` (reflection), `pe*` (pendulum), `ci*` (circuit), `st*` (states), `sl*` (solenoid), `ln*` (lens). `fNet`, `pPressure`, etc. already exist.
4. Styles in `src/styles.css`, reusing existing tokens (`.card`, `.seg`, `.m2-slider`, `.m2-result`, `.panel`).

Interface between them: `LessonDef`/`QuizItem`/`SimDef` types of section 6 are the contract; the coder lands types and registry first (Batch A) so the designer works against the real types.

## 9. Acceptance criteria

Global (apply after every batch, to the lessons in `ready` status):
- AC-1. Home shows the four lower grades ມ.1-ມ.4; a grade with at least one ready lesson has an "Open" button, others show "Coming soon".
- AC-2. `#/grade-m1` lists exactly 9 topics, `#/grade-m2` 12, `#/grade-m3` 9, `#/grade-m4` 11, in curriculum order, each with Lao/English title and hours from section 3 (ready or planned).
- AC-3. Every ready topic card opens its lesson via click and via `#/<id>`; planned cards are not clickable and do not navigate.
- AC-4. From any lesson, "Back" returns to its own grade page; from the grade page "Home" returns to Home.
- AC-5. `#/m2-force` and `#/m2-pressure` open `m2-04` and `m2-05` respectively and behave exactly as before (controls, readouts, 2D/3D).
- AC-6. Language toggle (button and key L) switches every visible text on Home, grade page, lesson, quiz and sim controls between Lao and English instantly, without losing quiz progress or sim state; no Lao text appears on the 3D canvas.
- AC-7. Lesson tabs: Lesson (summary + key ideas), Objectives, Teacher notes (suggested minutes, 2 questions, activity), Quiz. Each ready lesson shows 2-5 objectives, 3-5 key ideas, exactly 2 questions, 1 activity, a minutes value.
- AC-8. Quiz: choose an option, Check shows correct/incorrect (text, not colour only) and the explanation; final screen shows score x / N; Try again resets; reloading the page does not restore answers.
- AC-9. Sim lessons only: 2D button and key 2 give a flat, non-rotatable view; 3D button and key 3 allow 360° orbit by mouse drag and auto-rotate; Reset view works; sim state (sliders) survives 2D/3D switching.
- AC-10. Sim lessons only: every sim passes its "Checks" in section 7 (values read from the on-screen readout).
- AC-11. Presentation mode (button and P): fullscreen, body text >= 28 px (check computed style), Esc exits; arrow keys step through slides/ideas; language toggle is available inside present mode.
- AC-12. Keyboard shortcuts 2/3/P/L/R/arrows do not fire while typing in an input/select or inside the quiz.
- AC-13. WebGL unavailable (e.g. disabled in browser flags): sim lessons show the text fallback and the rest of the lesson (ideas, quiz) still works; content-only lessons never need WebGL.
- AC-14. Contrast of body text and buttons >= WCAG AA in normal and present mode; all controls reachable by Tab with visible focus; sliders have labels.
- AC-15. `npm run build` passes with no type errors; `npm test` passes; no `any` (oxlint passes).
- AC-16. Offline: after one online load of the built site (`npm run preview`), go offline and reload; Home, a grade page, a content-only lesson and a sim lesson (including lazy-loaded chunks) all work.
- AC-17. No runtime network calls: in DevTools Network (after first load) there are no requests to hosts other than the local origin; no CDN fonts/scripts/images.
- AC-18. Every user-visible string exists in `lo` and `en`: unit test over the registry plus `ui` object (no empty `lo`/`en`); manual: switch to English and confirm no Lao script anywhere except where the string is a Lao-named proper term (none expected).
- AC-19. Performance: 3D sim lessons keep >= 30 fps on a throttled/integrated GPU for a 60 s idle run; DPR does not exceed 1.5.
- AC-20. Scientific content: each sim's displayed formulas and units match section 7; every `// REVIEW` term is listed in the batch report to the user.

Per-batch additions: the batch's lessons are all `ready`; the previous batches' lessons remain `ready` and pass AC-3 to AC-12.

## 10. Work breakdown (ordered batches)

Each batch = one coder run + one ux-ui-designer run; coder lands data/types/tests first, designer follows, then tester runs the ACs.

- Batch A (framework + M.1 part 1): types, registry with all 41 entries (planned except the ones below), `GradePage`, `LessonPage` (content-only + sim modes), `QuizPanel`, migration of m2-04 and m2-05 into the generic page, tests, vitest. Ready lessons: m1-01, m1-02, m1-03, m1-04 (+ `motion`), m2-04, m2-05.
- Batch B (rest of M.1): m1-05, m1-06, m1-07, m1-08 (+ `photosynthesis`), m1-09. Gate: all M.1 ready (AC-2 for m1).
- Batch C (M.2 remaining part 1): m2-01, m2-02 (+ `thermal`), m2-03, m2-06 (+ `foodweb`), m2-07.
- Batch D (M.2 remaining part 2): m2-08, m2-09, m2-10, m2-11 (+ `reflection`), m2-12. Gate: all M.2 ready.
- Batch E (M.3 part 1): m3-01, m3-02, m3-03 (+ `pendulum`), m3-04, m3-05.
- Batch F (M.3 part 2): m3-06 (+ `circuit` basic), m3-07 (+ `states`), m3-08, m3-09. Gate: all M.3 ready.
- Batch G (M.4 part 1): m4-01, m4-02, m4-03 (+ `circuit` ohm), m4-04, m4-05 (+ `solenoid`).
- Batch H (M.4 part 2): m4-06, m4-07 (+ `lens`), m4-08, m4-09, m4-10, m4-11. Gate: all M.4 ready.
- Batch I (stretch, optional): `solar-system`, `curved-mirror`, `sound-wave`, `punnett`, `circulation`.
- Then: full regression test of all four grades (AC-1 to AC-20), `// REVIEW` list for the teacher, update PLAN.md, then start the upper-secondary spec (M.5-M.7) using the same registry (widen `GradeKey`, move the existing M.5 lesson into the registry).

## 11. Assumptions (correct me if wrong)

1. Topic ids use two digits in curriculum order (`m1-01`..`m4-11`); the two built lessons are renamed `m2-04`, `m2-05` with aliases for old hashes.
2. Quiz is self-check only (no marks stored, no teacher view), 3-5 multiple-choice items per lesson, single correct answer.
3. 10 new simulations is the right number for the effort; the five stretch sims are optional.
4. Content-only lessons have no 3D; the "2D / 3D" label on cards appears only for sim lessons (the existing Home shows "2D / 3D" for m2 cards; that remains true for force and pressure).
5. Vitest is acceptable as a new devDependency (no runtime impact).
6. M.1 topic 4 includes density (ມວນສານຈຳເພາະ) and inertia per curriculum, though only the speed model is simulated.
7. For ambiguous scan words I chose the most likely reading and flagged REVIEW; the curriculum word "ແສງເລຂາ" (m3-08) is taken as geometric optics of curved mirrors because its objectives are about ແວ່ນກົ່ງສວດ/ຫຼຸບ and real/virtual images.
8. Lao terms for planets, "momentum" (ປະລິມານເດີນເຄື່ອນ), "kinetic energy" (ພະລັງງານເດີນເຄື່ອນ), "potential energy" (ພະລັງງານທ່າຕັ້ງ), "power" (ກຳລັງ), "work" (ແຮງງານ) were read from the curriculum headings (m3) and are likely correct but unverified.
9. The existing M.5 chemistry lesson and the periodic-table tool stay outside the lower registry until the upper-secondary spec.
10. Illustrations are optional inline SVG, no photographs, to keep offline size small.

### REVIEW terms for the chemistry/physics/biology teacher (collect into content files)
ມວນສານຈຳເພາະ (density; existing site uses ຄວາມໜາແໜ້ນ), ສິມປົນເນື້ອດຽວ/ບໍ່ເປັນເນື້ອດຽວ, ຊັບພະຍາກອນ (scan reads ຊຸບ), ແຫຼ່ມ/ເສັ້ນແຮງ, ແວ່ນກົ່ງສວດ/ຫຼຸບ (convex/concave), ເລນສວດ/ຫຼຸບ, ທາດອິນຄະທາດ/ອະນິນຄະທາດ, ທາດປົນ/ທາດບໍລິສຸດ/ທາດປະສົມ, ຄວາມຮ້ອນແຝງ(ຈຳເພາະ), ການຫຼອມແຫຼວ/ການກັ່ນຕົວ, ກົດເກນຢູນ-ແລນສ (Joule-Lenz), ກະແສສະທ້ອນ (induced current), ໝໍ້ແປງໄຟ, ຈັນທະຄາຕ/ສຸລິຍະຄາຕ, ຊື່ດາວເຄາະ, ຮອກໂມນ, ແຊນ (gene), ໄມເຕີໄຟຟ້າ (motor), ປະຈຸ (charge).
