import { quizItem, ready } from '../lower/build'
import type { LessonDef } from '../lower/types'

// Physics M.6 (Grade 11), upper-secondary curriculum 2011. 5 topics, 68 h. All ready.
// Sims: p6-01 `gaslaw` (reused), p6-03 `circuit` with { mode: 'ohm' } (reused), p6-05 `lens` (reused);
// p6-02 and p6-04 are content-only. Names of scientists stay in Latin letters.
// Lao text is an AI draft; the whole file is subject to teacher review.
// REVIEW terms: ກາດ/ກາສ (gas), ຄວາມດັນ (pressure), ແຮງລອຍຕົວ (buoyant force), ກົດເກນ Pascal / Boyle / Charles,
//   ຫຼັກການ Archimedes / Bernoulli, ພະລັງງານໃນ (internal energy), ປະຈຸໄຟຟ້າ (charge), ໄຟຟ້າບັນຈຸ,
//   ທົ່ງໄຟຟ້າ / ເສັ້ນແຮງໄຟຟ້າ (electric field / field lines), ລະດັບໄຟຟ້າ / ຄວາມຕ່າງລະດັບໄຟຟ້າ (potential / p.d.),
//   ເຄື່ອງຫ້ອນໄຟຟ້າ (capacitor), ເສົາລໍ່ຟ້າ (lightning rod), ຄວາມຕ້ານໄຟຟ້າ (resistance), ອະນຸກົມ / ຂະໜານ (series / parallel),
//   ທາດເຄິ່ງນຳໄຟຟ້າ (semiconductor), ດີໂອດ (diode), ຕຣານຊິສເຕີ (transistor), ເອເລັກໂຕຣລິດ (electrolyte),
//   ການສະທ້ອນພາຍໃນທັງໝົດ (total internal reflection), ມຸມວິກິດ (critical angle), ດັດຊະນີຫັກແສງ (refractive index),
//   ເລນນູນ / ເລນເວ້າ (convex / concave lens), ສາຍຕາສັ້ນ / ຍາວ (short / long sight),
//   ໂປຣຕົງ, ນິວຕຣົງ, ນິວເຄຼຍ (already unverified in CLAUDE.md).

export const p6: LessonDef[] = [
  ready({
    id: 'p6-01',
    title: ['ການປະກອບສ້າງ ແລະ ລັກສະນະຂອງວັດຖຸແຂງ, ແຫຼວ ແລະ ກາສ', 'Solids, liquids and gases'],
    hours: 20,
    field: 'phys',
    minutes: 35,
    sim: 'gaslaw',
    summary: [
      'ສະຖານະຂອງວັດຖຸອະທິບາຍດ້ວຍການເຄື່ອນທີ່ຂອງເລກຸນ ແລະ ກາສປະຕິບັດຕາມກົດເກນ pV = nRT.',
      'The states of matter are explained by the motion of molecules, and gases obey pV = nRT.',
    ],
    objectives: [
      ['ອະທິບາຍວັດຖຸແຂງ, ແຫຼວ ແລະ ກາສ ດ້ວຍທິດສະດີເດີນເຄື່ອນໃນເລກຸນ', 'Explain solids, liquids and gases with the kinetic molecular theory'],
      ['ໃຊ້ກົດເກນ Pascal, ຫຼັກການ Archimedes ແລະ ຫຼັກການ Bernoulli ແກ້ເລກ ແລະ ອະທິບາຍປາກົດການ', "Use Pascal's law, Archimedes' principle and Bernoulli's principle"],
      ['ໃຊ້ກົດເກນຂອງກາສ ແລະ pV = nRT ແລະ ກົດເກນຂໍ້ທີ 1 ຂອງເທີໂມໄດນາມິກ', 'Use the gas laws, pV = nRT and the first law of thermodynamics'],
    ],
    keyIdeas: [
      ['ຄວາມດັນຂອງແຫຼວ p = p₀ + ρgh; ຄວາມດັນສົ່ງຕໍ່ເທົ່າກັນທົ່ວຂອງແຫຼວ (Pascal)', 'Fluid pressure p = p₀ + ρgh; pressure is transmitted equally (Pascal)'],
      ['ແຮງລອຍຕົວ = ນ້ຳໜັກຂອງແຫຼວທີ່ຖືກແທນທີ່ (Archimedes)', 'Buoyant force equals the weight of fluid displaced (Archimedes)'],
      ['Boyle: pV ຄົງທີ່ (T ຄົງທີ່); Charles: V/T ຄົງທີ່ (p ຄົງທີ່); T ຕ້ອງເປັນ K (kelvin)', 'Boyle: pV constant (T constant); Charles: V/T constant (p constant); T must be in kelvin'],
      ['ΔU = Q − W: ພະລັງງານໃນປ່ຽນຕາມຄວາມຮ້ອນທີ່ໄດ້ ລົບແຮງງານທີ່ເຮັດ', 'ΔU = Q − W: internal energy changes by heat gained minus work done'],
    ],
    questions: [
      ['ເຮືອເຫຼັກນ້ຳໜັກຫຼາຍ ເປັນຫຍັງຈຶ່ງລອຍ?', 'Why does a heavy steel ship float?'],
      ['ເປັນຫຍັງປັ໊ມລົດຖີບແລ້ວທໍ່ປັ໊ມຮ້ອນຂຶ້ນ?', 'Why does a bicycle pump get warm when used?'],
    ],
    activity: [
      'ເຮັດ "ນັກດຳໃນຂວດ" (ຫຼອດຢາຢອດໃນຂວດພລາສຕິກ) ບີບຂວດແລ້ວອະທິບາຍດ້ວຍຄວາມດັນ.',
      'Make a Cartesian diver (a dropper in a plastic bottle), squeeze, and explain with pressure.',
    ],
    quiz: [
      quizItem('q1', ['ກາສຢູ່ T ຄົງທີ່: ຄວາມດັນເພີ່ມເປັນ 2 ເທົ່າ. ປະລິມານ V ປ່ຽນແນວໃດ?', 'A gas at constant T: the pressure doubles. What happens to V?'],
        [['ເປັນ 2 ເທົ່າ', 'Doubles'], ['ເຫຼືອເຄິ່ງໜຶ່ງ', 'Halves'], ['ບໍ່ປ່ຽນ', 'Unchanged']], 1, ['Boyle: pV ຄົງທີ່ ດັ່ງນັ້ນ V ເຫຼືອເຄິ່ງໜຶ່ງ.', 'Boyle: pV is constant, so V halves.']),
      quizItem('q2', ['ກາສຢູ່ 300 K ໃຫ້ຄວາມຮ້ອນຢູ່ p ຄົງທີ່ ຈົນ 600 K. V ປ່ຽນແນວໃດ?', 'A gas at 300 K is heated at constant p to 600 K. What happens to V?'],
        [['ເປັນ 2 ເທົ່າ', 'Doubles'], ['ເຫຼືອເຄິ່ງໜຶ່ງ', 'Halves'], ['ເປັນ 4 ເທົ່າ', 'Quadruples']], 0, ['Charles: V/T ຄົງທີ່ ແລະ T ເປັນ 2 ເທົ່າ (K).', 'Charles: V/T is constant and T (kelvin) doubled.']),
      quizItem('q3', ['ຄວາມດັນຂອງນ້ຳທີ່ເລິກ 10 m ຫຼາຍກວ່າຜິວນ້ຳເທົ່າໃດ? (ρ = 1000 kg/m³, g = 9.8)', 'How much more is the pressure 10 m deep in water than at the surface? (ρ = 1000 kg/m³, g = 9.8)'],
        [['9.8 kPa', '9.8 kPa'], ['98 kPa', '98 kPa'], ['980 kPa', '980 kPa']], 1, ['ρgh = 1000 × 9.8 × 10 = 98 000 Pa.', 'ρgh = 1000 × 9.8 × 10 = 98 000 Pa.']),
      quizItem('q4', ['ກາສຖືກອັດ ເຮັດແຮງງານ 50 J ໃສ່ມັນ ແລະ ມັນປ່ອຍຄວາມຮ້ອນອອກ 20 J. ໃຊ້ ΔU = Q − W (W = ງານທີ່ກາສເຮັດ). ΔU ເທົ່າໃດ?', 'A gas is compressed with 50 J of work done on it and loses 20 J of heat. Use ΔU = Q − W (W = work done by the gas). What is ΔU?'],
        [['+30 J', '+30 J'], ['−30 J', '−30 J'], ['+70 J', '+70 J']], 0, ['ΔU = Q − W = −20 − (−50) = +30 J.', 'ΔU = Q − W = −20 − (−50) = +30 J.']),
    ],
  }),
  ready({
    id: 'p6-02',
    title: ['ໄຟຟ້າສະຖິດ', 'Static electricity'],
    hours: 14,
    field: 'phys',
    minutes: 30,
    summary: [
      'ປະຈຸໄຟຟ້າຊະນິດດຽວກັນຍູ້ກັນ ຕ່າງຊະນິດດຶງກັນ ດ້ວຍແຮງ F = kq₁q₂/r² ຕາມກົດເກນ Coulomb.',
      "Like electric charges repel and unlike attract with force F = kq₁q₂/r² according to Coulomb's law.",
    ],
    objectives: [
      ['ອະທິບາຍການເກີດໄຟຟ້າບັນຈຸ ແລະ ກົດເກນຮັກສາໄຟຟ້າບັນຈຸ', 'Explain how charge arises and the conservation of charge'],
      ['ໃຊ້ກົດເກນ Coulomb F = kq₁q₂/r² ແລະ ທົ່ງໄຟຟ້າ E = F/q', "Use Coulomb's law F = kq₁q₂/r² and the field E = F/q"],
      ['ອະທິບາຍລະດັບໄຟຟ້າ, ຄວາມຕ່າງລະດັບໄຟຟ້າ ແລະ ເຄື່ອງຫ້ອນໄຟຟ້າ', 'Explain electric potential, potential difference and capacitors'],
    ],
    keyIdeas: [
      ['ມີປະຈຸບວກ ແລະ ລົບ; ປະຈຸພື້ນຖານ e = 1.6×10⁻¹⁹ C', 'Positive and negative charges; elementary charge e = 1.6×10⁻¹⁹ C'],
      ['ປະຈຸຊະນິດດຽວກັນຍູ້ກັນ ຕ່າງຊະນິດດຶງກັນ; k = 9.0×10⁹ N·m²/C²', 'Like charges repel, unlike attract; k = 9.0×10⁹ N·m²/C²'],
      ['ເສັ້ນແຮງໄຟຟ້າອອກຈາກປະຈຸບວກ ເຂົ້າປະຈຸລົບ ແລະ ບໍ່ຕັດກັນ', 'Field lines leave positive and enter negative charges and never cross'],
      ['ເຄື່ອງຫ້ອນໄຟຟ້າ C = Q/V; ຕໍ່ຂະໜານ C = C₁ + C₂', 'Capacitor C = Q/V; in parallel C = C₁ + C₂'],
    ],
    questions: [
      ['ປະຈຸ 1 μC ສອງປະຈຸ ຫ່າງກັນ 0.1 m ມີແຮງຍູ້ກັນເທົ່າໃດ?', 'Two 1 μC charges 0.1 m apart: what is the force?'],
      ['ເປັນຫຍັງເສົາລໍ່ຟ້າຈຶ່ງປ້ອງກັນຟ້າຜ່າໄດ້?', 'How does a lightning rod protect a building?'],
    ],
    activity: [
      'ຖູໄມ້ບັນທັດພລາສຕິກກັບຜົມ ແລ້ວດູດເສດເຈ້ຍນ້ອຍໆ ແລະ ເອົາໄປໃກ້ສາຍນ້ຳບາງໆ ເບິ່ງສາຍນ້ຳໂຄ້ງ.',
      'Rub a plastic ruler on hair, attract small paper bits, then bring it near a thin water stream and watch the stream bend.',
    ],
    quiz: [
      quizItem('q1', ['ປະຈຸ 1 μC ສອງປະຈຸ ຫ່າງກັນ 0.1 m. ແຮງຍູ້ກັນເທົ່າໃດ? (k = 9.0×10⁹ N·m²/C²)', 'Two 1 μC charges are 0.1 m apart. What is the force? (k = 9.0×10⁹ N·m²/C²)'],
        [['0.09 N', '0.09 N'], ['0.9 N', '0.9 N'], ['9 N', '9 N']], 1, ['F = 9.0×10⁹ × 10⁻¹² / 0.01 = 0.9 N.', 'F = 9.0×10⁹ × 10⁻¹² / 0.01 = 0.9 N.']),
      quizItem('q2', ['ເພີ່ມໄລຍະຫ່າງລະຫວ່າງສອງປະຈຸເປັນ 2 ເທົ່າ. ແຮງປ່ຽນແນວໃດ?', 'The distance between two charges is doubled. What happens to the force?'],
        [['ເຫຼືອເຄິ່ງໜຶ່ງ', 'Halves'], ['ເຫຼືອ 1/4', 'Falls to 1/4'], ['ເປັນ 2 ເທົ່າ', 'Doubles']], 1, ['F ∝ 1/r² ດັ່ງນັ້ນ r ເປັນ 2 ເທົ່າ F ເຫຼືອ 1/4.', 'F ∝ 1/r², so doubling r gives F/4.']),
      quizItem('q3', ['ເຄື່ອງຫ້ອນໄຟຟ້າ 10 μF ຖືກຊາດທີ່ 5 V. ປະຈຸ Q ເທົ່າໃດ?', 'A 10 μF capacitor is charged to 5 V. What is Q?'],
        [['2 μC', '2 μC'], ['50 μC', '50 μC'], ['0.5 μC', '0.5 μC']], 1, ['Q = CV = 10 × 5 = 50 μC.', 'Q = CV = 10 × 5 = 50 μC.']),
      quizItem('q4', ['ເສັ້ນແຮງໄຟຟ້າຊີ້ໄປທາງໃດ?', 'Which way do electric field lines point?'],
        [['ເຂົ້າປະຈຸບວກ', 'Into a positive charge'], ['ອອກຈາກປະຈຸບວກ', 'Out of a positive charge'], ['ອ້ອມປະຈຸ', 'Around the charge']], 1, ['ຕາມທິດແຮງທີ່ກະທຳຕໍ່ປະຈຸບວກທົດສອບ.', 'They show the force direction on a positive test charge.']),
    ],
  }),
  ready({
    id: 'p6-03',
    title: ['ໄຟຟ້າກະແສກົງ', 'Direct-current electricity'],
    hours: 16,
    field: 'phys',
    minutes: 35,
    sim: 'circuit',
    simProps: { mode: 'ohm' },
    summary: [
      'ໃນວົງຈອນກະແສກົງ ແຮງດັນ V, ກະແສ I ແລະ ຄວາມຕ້ານ R ເຊື່ອມກັນດ້ວຍກົດເກນ Ohm V = IR.',
      "In a direct-current circuit, voltage V, current I and resistance R are linked by Ohm's law V = IR.",
    ],
    objectives: [
      ['ໃຫ້ນິຍາມກະແສໄຟຟ້າ, ຄວາມຕ່າງລະດັບໄຟຟ້າ, ຄວາມຕ້ານໄຟຟ້າ ແລະ ໃຊ້ກົດເກນ Ohm', "Define current, potential difference and resistance and use Ohm's law"],
      ['ຄິດໄລ່ວົງຈອນຕໍ່ອະນຸກົມ, ຂະໜານ ແລະ ປະສົມ ແລະ ໃຊ້ກົດເກນ Kirchhoff', "Analyse series, parallel and mixed circuits and use Kirchhoff's laws"],
      ['ຄິດໄລ່ກຳລັງໄຟຟ້າ P = VI ແລະ ພະລັງງານ E = Pt', 'Calculate power P = VI and energy E = Pt'],
    ],
    keyIdeas: [
      ['V = IR; R = ρL/A (ລວງຍາວຂຶ້ນ R ຂຶ້ນ; ໜ້າຕັດໃຫຍ່ຂຶ້ນ R ລົງ)', 'V = IR; R = ρL/A (longer wire, higher R; thicker wire, lower R)'],
      ['ອະນຸກົມ: R = R₁ + R₂ ກະແສເທົ່າກັນ; ຂະໜານ: 1/R = 1/R₁ + 1/R₂ ແຮງດັນເທົ່າກັນ', 'Series: R = R₁ + R₂, same current; parallel: 1/R = 1/R₁ + 1/R₂, same voltage'],
      ['ຈຸດແຍກ: ΣI ເຂົ້າ = ΣI ອອກ; ວົງປິດ: ΣV = 0', 'Junction: ΣI in = ΣI out; closed loop: ΣV = 0'],
      ['ພະລັງງານໄຟຟ້າວັດເປັນ kWh; 1 kWh = 3.6×10⁶ J', 'Electrical energy is measured in kWh; 1 kWh = 3.6×10⁶ J'],
    ],
    questions: [
      ['ເປັນຫຍັງໄຟຟ້າໃນເຮືອນຕໍ່ແບບຂະໜານ?', 'Why are household appliances wired in parallel?'],
      ['ຫຼອດ LED 10 W ກັບຫຼອດໄສ້ 60 W ເປີດວັນລະ 5 ຊົ່ວໂມງ 30 ວັນ ໃຊ້ຕ່າງກັນເທົ່າໃດ kWh?', 'A 10 W LED and a 60 W filament bulb run 5 h/day for 30 days: what is the difference in kWh?'],
    ],
    activity: [
      'ຕໍ່ວົງຈອນໄຟຫຼອດ 2 ດວງ ແບບອະນຸກົມ ແລະ ຂະໜານ ສັງເກດຄວາມສະຫວ່າງ ແລະ ເອົາຫຼອດໜຶ່ງອອກ.',
      'Wire two bulbs in series and in parallel; compare brightness and remove one bulb.',
    ],
    quiz: [
      quizItem('q1', ['ຕົວຕ້ານ 20 Ω ຕໍ່ກັບແບັດເຕີຣີ 12 V. ກະແສເທົ່າໃດ?', 'A 20 Ω resistor is connected to a 12 V battery. What is the current?'],
        [['0.6 A', '0.6 A'], ['1.67 A', '1.67 A'], ['240 A', '240 A']], 0, ['I = V/R = 12/20 = 0.6 A.', 'I = V/R = 12/20 = 0.6 A.']),
      quizItem('q2', ['ຕົວຕ້ານ 6 Ω ແລະ 3 Ω ຕໍ່ຂະໜານ. ຄວາມຕ້ານລວມເທົ່າໃດ?', 'Resistors of 6 Ω and 3 Ω are in parallel. What is the total resistance?'],
        [['2 Ω', '2 Ω'], ['4.5 Ω', '4.5 Ω'], ['9 Ω', '9 Ω']], 0, ['1/R = 1/6 + 1/3 = 1/2 ດັ່ງນັ້ນ R = 2 Ω.', '1/R = 1/6 + 1/3 = 1/2, so R = 2 Ω.']),
      quizItem('q3', ['ເຕົາໄຟຟ້າ 1000 W ເປີດ 2 ຊົ່ວໂມງ ໃຊ້ພະລັງງານເທົ່າໃດ?', 'A 1000 W heater runs for 2 hours. How much energy does it use?'],
        [['0.5 kWh', '0.5 kWh'], ['2 kWh', '2 kWh'], ['2000 kWh', '2000 kWh']], 1, ['E = Pt = 1 kW × 2 h = 2 kWh.', 'E = Pt = 1 kW × 2 h = 2 kWh.']),
      quizItem('q4', ['ສາຍທອງແດງຍາວເທົ່າເກົ່າ ແຕ່ໜາຂຶ້ນ 2 ເທົ່າໃນເນື້ອທີ່ໜ້າຕັດ. R ປ່ຽນແນວໃດ?', 'A copper wire of the same length has twice the cross-section area. What happens to R?'],
        [['ເຫຼືອເຄິ່ງໜຶ່ງ', 'Halves'], ['ເປັນ 2 ເທົ່າ', 'Doubles'], ['ບໍ່ປ່ຽນ', 'Unchanged']], 0, ['R = ρL/A: A ເປັນ 2 ເທົ່າ R ເຫຼືອເຄິ່ງ.', 'R = ρL/A: doubling A halves R.']),
    ],
  }),
  ready({
    id: 'p6-04',
    title: ['ກະແສໄຟຟ້າໃນແວດລ້ອມຕ່າງໆ', 'Current in various media'],
    hours: 7,
    field: 'phys',
    minutes: 25,
    summary: [
      'ກະແສໄຟຟ້າໃນໂລຫະແມ່ນເອເລັກຕຣົງ ແຕ່ໃນເອເລັກໂຕຣລິດແມ່ນອີອອງ ແລະ ທາດເຄິ່ງນຳມີຄຸນສົມບັດຕ່າງຈາກໂລຫະ.',
      'Current in metals is carried by electrons but in electrolytes by ions, and semiconductors behave differently from metals.',
    ],
    objectives: [
      ['ອະທິບາຍກະແສໄຟຟ້າໃນໂລຫະ, ໃນທາດແຫຼວ (ເອເລັກໂຕຣລິດ), ໃນກາສ ແລະ ໃນສູນຍາກາດ', 'Explain current in metals, electrolytes, gases and vacuum'],
      ['ອະທິບາຍທາດເຄິ່ງນຳໄຟຟ້າ, ດີໂອດ ແລະ ຕຣານຊິສເຕີ ຢ່າງງ່າຍ', 'Describe semiconductors, diodes and transistors simply'],
      ['ບອກວິທີປ້ອງກັນຟ້າຜ່າ ແລະ ອັນຕະລາຍຂອງກະແສໄຟຟ້າ', 'State lightning protection and electrical safety'],
    ],
    keyIdeas: [
      ['ໂລຫະ: ເອເລັກຕຣົງອິດສະຫຼະ ຕ້ານໄຟຟ້າຫຼາຍຂຶ້ນເມື່ອຮ້ອນ', 'Metals: free electrons; resistance rises with temperature'],
      ['ເອເລັກໂຕຣລິດ: ອີອອງເຄື່ອນທີ່ (ການແຍກດ້ວຍໄຟຟ້າ) ບໍ່ແມ່ນເອເລັກຕຣົງ', 'Electrolytes: ions carry the current (electrolysis)'],
      ['ທາດເຄິ່ງນຳ: ຕ້ານໄຟຟ້າຫຼຸດລົງເມື່ອຮ້ອນ; ປະເພດ n ແລະ p', 'Semiconductors: resistance falls on heating; n-type and p-type'],
      ['ດີໂອດຜ່ານກະແສໄດ້ທິດດຽວ', 'A diode passes current in one direction only'],
    ],
    questions: [
      ['ເປັນຫຍັງຫຼອດໄສ້ຈຶ່ງມັກຂາດຕອນເປີດທັນທີ?', 'Why do filament bulbs often fail at the moment of switching on? (cold low resistance, high surge)'],
      ['ເປັນຫຍັງເວລາຟ້າຮ້ອງຝົນຕົກ ຈຶ່ງບໍ່ຄວນຢືນໃຕ້ຕົ້ນໄມ້ສູງ ຫຼື ກາງທົ່ງໂລ່ງ?', 'Why should you not stand under a tall tree or in an open field in a thunderstorm?'],
    ],
    activity: [
      'ຕໍ່ຫຼອດ LED ກັບຖ່ານໄຟ ທັງສອງທິດ ແລະ ສັງເກດວ່າຕິດພຽງທິດດຽວ.',
      'Connect an LED to a cell both ways and observe that it lights in one direction only.',
    ],
    quiz: [
      quizItem('q1', ['ຕົວນຳໄຟຟ້າໃນເກືອລະລາຍໃນນ້ຳ ແມ່ນຫຍັງ?', 'What carries the current in salt dissolved in water?'],
        [['ເອເລັກຕຣົງອິດສະຫຼະ', 'Free electrons'], ['ອີອອງ', 'Ions'], ['ໂປຣຕົງ', 'Protons']], 1, ['ອີອອງບວກ ແລະ ລົບເຄື່ອນທີ່ ໄປຫາຂົ້ວຕ່າງກັນ.', 'Positive and negative ions move to opposite electrodes.']),
      quizItem('q2', ['ເມື່ອເພີ່ມອຸນຫະພູມ ຄວາມຕ້ານຂອງໂລຫະ…', 'When temperature rises, the resistance of a metal…'],
        [['ເພີ່ມຂຶ້ນ', 'increases'], ['ຫຼຸດລົງ', 'decreases'], ['ບໍ່ປ່ຽນ', 'stays the same']], 0, ['ໄອອອນສັ່ນແຮງຂຶ້ນ ຈຶ່ງຂັດຂວາງເອເລັກຕຣົງຫຼາຍຂຶ້ນ.', 'The lattice vibrates more and hinders the electrons more.']),
      quizItem('q3', ['ດີໂອດໃຫ້ກະແສຜ່ານໄດ້…', 'A diode lets current pass…'],
        [['ທັງສອງທິດ', 'in both directions'], ['ທິດດຽວ', 'in one direction'], ['ບໍ່ໃຫ້ຜ່ານເລີຍ', 'in neither direction']], 1, ['ຮອຍຕໍ່ p-n ມີຄວາມຕ້ານຕ່ຳເມື່ອໄບແອສໄປໜ້າ ແລະ ສູງຫຼາຍເມື່ອໄບແອສຍ້ອນ ຈຶ່ງໃຊ້ປ່ຽນກະແສສະຫຼັບເປັນກະແສກົງ.', 'The p-n junction has low resistance when forward-biased and very high when reverse-biased, so it can turn AC into DC.']),
    ],
  }),
  ready({
    id: 'p6-05',
    title: ['ແສງເລຂາຄະນິດ', 'Geometric optics'],
    hours: 11,
    field: 'phys',
    minutes: 30,
    sim: 'lens',
    summary: [
      'ແສງສະທ້ອນ ແລະ ຫັກແສງຕາມກົດເກນ n₁ sin θ₁ = n₂ sin θ₂ ແລະ ເລນສ້າງຮູບຕາມສູດ 1/f = 1/u + 1/v.',
      'Light reflects and refracts according to n₁ sin θ₁ = n₂ sin θ₂, and lenses form images by 1/f = 1/u + 1/v.',
    ],
    objectives: [
      ['ໃຊ້ກົດການສະທ້ອນ ແລະ ກົດການຫັກແສງ n₁ sin θ₁ = n₂ sin θ₂', 'Use the laws of reflection and refraction n₁ sin θ₁ = n₂ sin θ₂'],
      ['ອະທິບາຍການສະທ້ອນພາຍໃນທັງໝົດ ແລະ ໃຊ້ໃນສາຍແກ້ວນຳແສງ', 'Explain total internal reflection and optical fibres'],
      ['ໃຊ້ສູດເລນ 1/f = 1/u + 1/v ແລະ ອະທິບາຍສາຍຕາສັ້ນ/ຍາວ', 'Use the lens formula 1/f = 1/u + 1/v and explain short and long sight'],
    ],
    keyIdeas: [
      ['ດັດຊະນີຫັກແສງ n = c/v (ນ້ຳ 1.33; ແກ້ວ ≈ 1.5)', 'Refractive index n = c/v (water 1.33; glass ≈ 1.5)'],
      ['ມຸມວິກິດ sin θc = n₂/n₁ (ນ້ຳ → ອາກາດ ≈ 49°)', 'Critical angle sin θc = n₂/n₁ (water to air ≈ 49°)'],
      ['ເລນນູນ ໃຫ້ຮູບຈິງ (u > f) ຫຼື ຮູບລວງ (u < f); ເລນເວ້າ ໃຫ້ຮູບລວງສະເໝີ', 'A convex lens gives a real image (u > f) or virtual (u < f); a concave lens always gives a virtual one'],
      ['ແວ່ນຂະຫຍາຍ, ກ້ອງຈຸລະທັດ ແລະ ກ້ອງສ່ອງທາງໄກ ໃຊ້ເລນຫຼາຍອັນ', 'Magnifiers, microscopes and telescopes use several lenses'],
    ],
    questions: [
      ['ເປັນຫຍັງສະນ້ຳເບິ່ງຕື້ນກວ່າຄວາມເປັນຈິງ?', 'Why does a pool look shallower than it is?'],
      ['ແວ່ນຕາຂອງຄົນສາຍຕາສັ້ນໃຊ້ເລນຊະນິດໃດ?', 'Which lens corrects short sight? (concave)'],
    ],
    activity: [
      'ຍິງແສງໄຟສາຍຕາຜ່ານຖັງນ້ຳໃສ ແລະ ວັດມຸມຕົກກະທົບ ແລະ ມຸມຫັກ.',
      'Shine a torch through a tank of water and measure the angles of incidence and refraction.',
    ],
    quiz: [
      quizItem('q1', ['ແສງຈາກອາກາດ (n = 1.00) ເຂົ້ານ້ຳ (n = 1.33) ທີ່ມຸມຕົກ 30°. sin θ₂ ເທົ່າໃດ?', 'Light goes from air (n = 1.00) into water (n = 1.33) at 30°. What is sin θ₂?'],
        [['0.38', '0.38'], ['0.67', '0.67'], ['1.33', '1.33']], 0, ['sin θ₂ = 1.00 × 0.5 / 1.33 ≈ 0.38 (θ₂ ≈ 22°).', 'sin θ₂ = 1.00 × 0.5 / 1.33 ≈ 0.38 (θ₂ ≈ 22°).']),
      quizItem('q2', ['ເລນນູນ f = 10 cm ວັດຖຸຢູ່ u = 30 cm. ຮູບຢູ່ທີ່ v ເທົ່າໃດ?', 'A convex lens f = 10 cm with an object at u = 30 cm. Where is the image, v?'],
        [['7.5 cm', '7.5 cm'], ['15 cm', '15 cm'], ['20 cm', '20 cm']], 1, ['1/v = 1/10 − 1/30 = 1/15 ດັ່ງນັ້ນ v = 15 cm.', '1/v = 1/10 − 1/30 = 1/15, so v = 15 cm.']),
      quizItem('q3', ['ການສະທ້ອນພາຍໃນທັງໝົດເກີດໄດ້ເມື່ອແສງໄປຈາກ…', 'Total internal reflection can happen when light goes from…'],
        [['ອາກາດເຂົ້ານ້ຳ', 'air into water'], ['ນ້ຳອອກສູ່ອາກາດ ທີ່ມຸມຕົກໃຫຍ່ກວ່າມຸມວິກິດ', 'water to air at an angle greater than the critical angle'], ['ອາກາດເຂົ້າແກ້ວ', 'air into glass']], 1, ['ຕ້ອງໄປຈາກຕົວກາງທີ່ n ສູງກວ່າ ໄປ n ຕ່ຳກວ່າ.', 'It must go from higher n to lower n.']),
      quizItem('q4', ['ແວ່ນຕາແກ້ໄຂສາຍຕາສັ້ນ ໃຊ້ເລນ…', 'Glasses that correct short sight use a…'],
        [['ເວ້າ', 'concave lens'], ['ນູນ', 'convex lens'], ['ແບນ', 'flat lens']], 0, ['ເລນເວ້າເຮັດໃຫ້ແສງກະຈາຍ ກ່ອນເຂົ້າຕາ.', 'A concave lens spreads the rays before they enter the eye.']),
    ],
  }),
]
