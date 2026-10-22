import { quizItem, ready } from '../lower/build'
import type { LessonDef } from '../lower/types'

// Physics M.7 (Grade 12), upper-secondary curriculum 2011. 10 topics, 102 h. All ready.
// Sims: p7-03 `wave`, p7-05 `induction`, p7-09 `photoelectric`; the other seven are content-only.
// Lao text is an AI draft; the whole file is subject to teacher review. Names of scientists stay in Latin letters.
// Illustrative models (labelled in the lessons): the flux model of the coil in p7-05, the Bohr model in p7-09
// (a historical model, not reality), the rounded work functions in p7-09.
// REVIEW terms: ມຸມ / ຄວາມໄວມຸມ / ຄວາມເລັ່ງມຸມ (angular quantities), ທໍອກ (torque), ໂມເມັນອິນເນເຊຍ (moment of inertia),
//   ປະລິມານເດີນເຄື່ອນມຸມ (angular momentum), ການສັ່ນໄຫວຮາໂມນິກ (SHM), ຄາບ (period), ແຮງຟື້ນຕົວ (restoring force),
//   ການສັ່ນພ້ອງ (resonance), ຄື້ນຂວາງ / ຄື້ນຍາວ (transverse / longitudinal), ການຊ້ອນກັນ / ການແຊກແຊງ (superposition /
//   interference), ຄື້ນຢືນ (standing wave), ການລ້ຽວເບນ (diffraction), ຄວາມເຂັ້ມສຽງ / ລະດັບສຽງ (intensity / level),
//   ເດຊິເບນ dB, ປາກົດການ Doppler, ທົ່ງແມ່ເຫຼັກ (field), ກະແສໄຟຟ້າສະທ້ອນ / ການສະທ້ອນຕົນເອງ (induced current /
//   self-induction), ເຄື່ອງກຳເນີດ (generator), ໝໍ້ແປງໄຟ (transformer), ຄ່າ rms, ການມອດຄື້ນ (modulation),
//   ການກະຈາຍແສງ (dispersion), ໂພລາໄຣເຊຊັນ (polarisation), ການກະເຈີງ (scattering), ໂຟຕອນ (photon),
//   ໂຟໂຕເອເລັກຕຣິກ (photoelectric), ຄວາມຖີ່ເກນ (threshold frequency), ກຳມັນຕະພາບລັງສີ (radioactivity),
//   ເຄິ່ງຊີວິດ (half-life), ການແຍກ / ການລວມນິວເຄຼຍ (fission / fusion), ພະລັງງານສາຍພັນ (binding energy),
//   ໂປຣຕົງ, ນິວຕຣົງ, ນິວເຄຼຍ (already unverified in CLAUDE.md).

export const p7: LessonDef[] = [
  ready({
    id: 'p7-01',
    title: ['ການເຄື່ອນທີ່ປັ່ນຂອງວັດຖຸແຂງ', 'Rotation of rigid bodies'],
    hours: 8,
    field: 'phys',
    minutes: 30,
    summary: [
      'ການໝູນຂອງວັດຖຸແຂງອະທິບາຍດ້ວຍມຸມ θ, ຄວາມໄວມຸມ ω ແລະ ຄວາມເລັ່ງມຸມ α ທີ່ຄູ່ກັບປະລິມານຂອງການເຄື່ອນທີ່ຕາມເສັ້ນ.',
      'The rotation of a rigid body is described by angle θ, angular velocity ω and angular acceleration α, which pair with the quantities of linear motion.',
    ],
    objectives: [
      ['ໃຊ້ປະລິມານການປັ່ນ: ມຸມ θ, ຄວາມໄວມຸມ ω ແລະ ຄວາມເລັ່ງມຸມ α', 'Use rotational quantities: angle θ, angular velocity ω, angular acceleration α'],
      ['ໃຊ້ທໍອກ τ = Fr ແລະ ໂມເມັນອິນເນເຊຍ I ໃນ τ = Iα', 'Use torque τ = Fr and moment of inertia I in τ = Iα'],
      ['ໃຊ້ພະລັງງານເດີນເຄື່ອນການປັ່ນ ½Iω² ແລະ ປະລິມານເດີນເຄື່ອນມຸມ L = Iω', 'Use rotational energy ½Iω² and angular momentum L = Iω'],
    ],
    keyIdeas: [
      ['v = ωr ແລະ aₜ = αr ເຊື່ອມການປັ່ນກັບການເຄື່ອນທີ່ຕາມເສັ້ນ (ω ເປັນ rad/s)', 'v = ωr and aₜ = αr link rotation with linear motion (ω in rad/s)'],
      ['ມວນສານຢູ່ໄກແກນ ເຮັດໃຫ້ I ໃຫຍ່ຂຶ້ນ ແລະ ໝູນຍາກຂຶ້ນ', 'Mass farther from the axis increases I, so it is harder to spin'],
      ['ບໍ່ມີທໍອກພາຍນອກ L = Iω ຄົງທີ່', 'With no external torque, L = Iω is conserved'],
      ['ການເຮັດວຽກໃນການປັ່ນ W = τθ (θ ເປັນ rad)', 'Work in rotation W = τθ (θ in rad)'],
    ],
    questions: [
      ['ເປັນຫຍັງນັກສະເກດນ້ຳແຂງໝູນໄວຂຶ້ນເມື່ອດຶງແຂນເຂົ້າ?', 'Why does a skater spin faster when pulling the arms in?'],
      ['ເປັນຫຍັງຈັບບ່ອນໄກບານພັບປະຕູ ຈຶ່ງເປີດງ່າຍກວ່າ?', 'Why is a door easier to open when you push far from the hinge?'],
    ],
    activity: [
      'ນັ່ງເກົ້າອີ້ໝູນ ຖືນ້ຳໜັກສອງມື ກາງແຂນ ແລ້ວດຶງເຂົ້າ ສັງເກດຄວາມໄວໝູນ.',
      'Sit on a swivel chair holding weights, arms out then in, and observe the spin rate.',
    ],
    quiz: [
      quizItem('q1', ['ລໍ້ໝູນດ້ວຍ ω = 10 rad/s ລັດສະໝີ r = 0.5 m. ຄວາມໄວຂອບລໍ້ເທົ່າໃດ?', 'A wheel spins at ω = 10 rad/s, radius r = 0.5 m. What is the rim speed?'],
        [['0.05 m/s', '0.05 m/s'], ['5 m/s', '5 m/s'], ['20 m/s', '20 m/s']], 1, ['v = ωr = 10 × 0.5 = 5 m/s.', 'v = ωr = 10 × 0.5 = 5 m/s.']),
      quizItem('q2', ['ແຮງ 20 N ກະທຳຫ່າງຈາກແກນ 0.30 m ຕັ້ງສາກ. ທໍອກເທົ່າໃດ?', 'A 20 N force acts 0.30 m from the axis at 90°. What is the torque?'],
        [['6.0 N·m', '6.0 N·m'], ['60 N·m', '60 N·m'], ['0.015 N·m', '0.015 N·m']], 0, ['τ = Fr = 20 × 0.30 = 6.0 N·m.', 'τ = Fr = 20 × 0.30 = 6.0 N·m.']),
      quizItem('q3', ['ນັກສະເກດດຶງແຂນເຂົ້າ I ຫຼຸດລົງ ແລະ ບໍ່ມີທໍອກພາຍນອກ. ω ປ່ຽນແນວໃດ?', 'A skater pulls the arms in so I decreases and there is no external torque. What happens to ω?'],
        [['ເພີ່ມຂຶ້ນ', 'Increases'], ['ຫຼຸດລົງ', 'Decreases'], ['ຄົງທີ່', 'Stays the same']], 0, ['L = Iω ຄົງທີ່ ດັ່ງນັ້ນ I ລົດລົງ ω ເພີ່ມຂຶ້ນ.', 'L = Iω is constant, so when I falls ω rises.']),
    ],
  }),
  ready({
    id: 'p7-02',
    title: ['ການສັ່ນໄຫວກົນຈັກ', 'Mechanical oscillations'],
    hours: 9,
    field: 'phys',
    minutes: 30,
    summary: [
      'ການສັ່ນໄຫວຮາໂມນິກເກີດເມື່ອແຮງຟື້ນຕົວເປັນສັດສ່ວນກັບການຍ້າຍ ແລະ ອະທິບາຍດ້ວຍ A, T ແລະ f.',
      'Simple harmonic motion occurs when the restoring force is proportional to displacement, and it is described by A, T and f.',
    ],
    objectives: [
      ['ອະທິບາຍການສັ່ນໄຫວແບບຮາໂມນິກ ແລະ ປະລິມານ A, T, f', 'Describe simple harmonic motion and A, T, f'],
      ['ໃຊ້ T = 2π√(m/k) ແລະ T = 2π√(L/g)', 'Use T = 2π√(m/k) and T = 2π√(L/g)'],
      ['ອະທິບາຍການສັ່ນໄຫວຖືກບັງຄັບ ແລະ ການສັ່ນພ້ອງ (resonance)', 'Explain forced oscillation and resonance'],
    ],
    keyIdeas: [
      ['ແຮງຟື້ນຕົວເປັນສັດສ່ວນກັບການຍ້າຍ ແລະ ຊີ້ເຂົ້າຈຸດສົມດຸນ (F = −kx)', 'The restoring force is proportional to displacement and points to equilibrium (F = −kx)'],
      ['ຄາບ T ບໍ່ຂຶ້ນກັບແອມພລິຈູດ (ມຸມນ້ອຍ) ແລະ ບໍ່ຂຶ້ນກັບມວນຂອງຕຸ້ມຫ້ອຍ', "T does not depend on amplitude (small angles) or on the pendulum's mass"],
      ['ພະລັງງານສະຫຼັບລະຫວ່າງເດີນເຄື່ອນ ແລະ ທ່າຕັ້ງ; ລວມຄົງທີ່ (ບໍ່ມີຄວາມຕ້ານ)', 'Energy swaps between kinetic and potential; the total is constant (no damping)'],
      ['ສັ່ນພ້ອງ: ຄວາມຖີ່ບັງຄັບ ≈ ຄວາມຖີ່ທຳມະຊາດ ແອມພລິຈູດໃຫຍ່ສຸດ', 'Resonance: driving frequency ≈ natural frequency gives the largest amplitude'],
    ],
    questions: [
      ['ສະປຣິງ k = 50 N/m ຫ້ອຍມວນ 0.5 kg ມີຄາບເທົ່າໃດ?', 'A spring k = 50 N/m with a 0.5 kg mass: what is the period?'],
      ['ເປັນຫຍັງທະຫານຕ້ອງເດີນບໍ່ເປັນຈັງຫວະຂ້າມຂົວ?', 'Why must soldiers break step when crossing a bridge?'],
    ],
    activity: [
      'ວັດຄາບຂອງຕຸ້ມຫ້ອຍຍາວ 1 m ຈາກ 20 ແກວ່ງ ແລ້ວປຽບທຽບກັບ 2.0 s.',
      'Time 20 swings of a 1 m pendulum and compare the period with about 2.0 s.',
    ],
    quiz: [
      quizItem('q1', ['ສະປຣິງ k = 50 N/m ຫ້ອຍມວນ 0.5 kg. ຄາບໃກ້ຄຽງເທົ່າໃດ?', 'A spring k = 50 N/m carries 0.5 kg. About what is the period?'],
        [['0.063 s', '0.063 s'], ['0.63 s', '0.63 s'], ['6.3 s', '6.3 s']], 1, ['T = 2π√(0.5/50) = 2π × 0.1 ≈ 0.63 s.', 'T = 2π√(0.5/50) = 2π × 0.1 ≈ 0.63 s.']),
      quizItem('q2', ['ຕຸ້ມຫ້ອຍຍາວ 1 m (g = 9.8 m/s²) ມີຄາບໃກ້ຄຽງເທົ່າໃດ?', 'A 1 m pendulum (g = 9.8 m/s²) has a period of about?'],
        [['1.0 s', '1.0 s'], ['2.0 s', '2.0 s'], ['4.0 s', '4.0 s']], 1, ['T = 2π√(1/9.8) ≈ 2.0 s.', 'T = 2π√(1/9.8) ≈ 2.0 s.']),
      quizItem('q3', ['ເພີ່ມມວນຂອງຕຸ້ມຫ້ອຍ (ຄວາມຍາວຄົງທີ່). ຄາບປ່ຽນແນວໃດ?', 'The mass of a pendulum bob is increased (length unchanged). What happens to the period?'],
        [['ຍາວຂຶ້ນ', 'Longer'], ['ສັ້ນລົງ', 'Shorter'], ['ບໍ່ປ່ຽນ', 'Unchanged']], 2, ['T = 2π√(L/g) ບໍ່ມີ m.', 'T = 2π√(L/g) has no m.']),
      quizItem('q4', ['ແອມພລິຈູດໃຫຍ່ສຸດເກີດເມື່ອ…', 'The largest amplitude occurs when…'],
        [['ຄວາມຖີ່ບັງຄັບ ≈ ຄວາມຖີ່ທຳມະຊາດ', 'driving frequency ≈ natural frequency'], ['ຄວາມຖີ່ບັງຄັບສູງຫຼາຍ', 'the driving frequency is very high'], ['ບໍ່ມີແຮງບັງຄັບ', 'there is no driving force']], 0, ['ນີ້ແມ່ນການສັ່ນພ້ອງ.', 'This is resonance.']),
    ],
  }),
  ready({
    id: 'p7-03',
    title: ['ຄື້ນກົນຈັກ', 'Mechanical waves'],
    hours: 10,
    field: 'phys',
    minutes: 35,
    sim: 'wave',
    summary: [
      'ຄື້ນຂວາງ ແລະ ຄື້ນຍາວນຳພະລັງງານ ບໍ່ນຳມວນສານ ແລະ ມີຄວາມໄວ v = fλ.',
      'Transverse and longitudinal waves carry energy, not matter, and have speed v = fλ.',
    ],
    objectives: [
      ['ແຍກຄື້ນຂວາງ ອອກຈາກຄື້ນຍາວ ແລະ ໃຊ້ v = fλ', 'Distinguish transverse from longitudinal waves and use v = fλ'],
      ['ອະທິບາຍການຊ້ອນກັນ, ການແຊກແຊງ ແລະ ຄື້ນຢືນ', 'Explain superposition, interference and standing waves'],
      ['ອະທິບາຍການສະທ້ອນ, ການຫັກແສງ ແລະ ການລ້ຽວເບນຂອງຄື້ນ', 'Explain reflection, refraction and diffraction of waves'],
    ],
    keyIdeas: [
      ['ຄື້ນນຳພະລັງງານ ບໍ່ນຳມວນສານ; ອະນຸພາກສັ່ນຢູ່ທີ່ເດີມ', 'A wave carries energy, not matter; the particles vibrate about fixed places'],
      ['ຄວາມໄວຄື້ນ v = fλ; T = 1/f', 'Wave speed v = fλ; T = 1/f'],
      ['ຄື້ນສອງຄື້ນຊ້ອນກັນ: ໄລຍະດຽວກັນ ເສີມກັນ, ຕ່າງໄລຍະ 180° ຕັດກັນ', 'Two overlapping waves: in phase they reinforce, 180° out of phase they cancel'],
      ['ຄື້ນຢືນເທິງເຊືອກຕິດທັງສອງປາຍ: ປາຍເປັນຈຸດນິ້ງ ແລະ ຄວາມຖີ່ fₙ = nv/(2L)', 'Standing wave on a string fixed at both ends: the ends are nodes and fₙ = nv/(2L)'],
    ],
    questions: [
      ['ເປັນຫຍັງເຮົາໄດ້ຍິນສຽງຈາກຫຼັງກຳແພງ ແຕ່ບໍ່ເຫັນແສງ?', 'Why can we hear around a corner but not see around it? (diffraction depends on wavelength)'],
      ['ໃນເຊືອກຍາວ 1.5 m ຄື້ນ v = 3 m/s ຄວາມຖີ່ຮາໂມນິກຕົ້ນເທົ່າໃດ?', 'On a 1.5 m string with v = 3 m/s, what is the fundamental frequency?'],
    ],
    activity: [
      'ໃຊ້ສະປຣິງຍາວ (slinky) ຫຼື ເຊືອກ ສ້າງຄື້ນຂວາງ ແລະ ຄື້ນຍາວ ແລະ ວັດຄວາມໄວຄື້ນ.',
      'Use a slinky or rope to make transverse and longitudinal waves and measure wave speed.',
    ],
    quiz: [
      quizItem('q1', ['ຄື້ນມີ f = 5 Hz ແລະ λ = 0.4 m. ຄວາມໄວຂອງຄື້ນເທົ່າໃດ?', 'A wave has f = 5 Hz and λ = 0.4 m. What is its speed?'],
        [['0.08 m/s', '0.08 m/s'], ['2 m/s', '2 m/s'], ['12.5 m/s', '12.5 m/s']], 1, ['v = fλ = 5 × 0.4 = 2 m/s.', 'v = fλ = 5 × 0.4 = 2 m/s.']),
      quizItem('q2', ['ຄື້ນສອງຄື້ນທີ່ເທົ່າກັນຊ້ອນກັນ ຕ່າງໄລຍະ 180°. ຜົນລວມເປັນແນວໃດ?', 'Two equal waves overlap, 180° out of phase. What is the sum?'],
        [['ແອມພລິຈູດເປັນສອງເທົ່າ', 'Double amplitude'], ['ເປັນສູນ', 'Zero'], ['ເທົ່າເດີມ', 'Unchanged']], 1, ['ຍອດຄື້ນພົບຮ່ອງຄື້ນ ຕັດກັນໝົດ.', 'Crests meet troughs and cancel.']),
      quizItem('q3', ['ເຊືອກຍາວ 1.5 m ຕິດທັງສອງປາຍ v = 3.0 m/s. ຄວາມຖີ່ຮາໂມນິກຕົ້ນ?', 'A 1.5 m string fixed at both ends, v = 3.0 m/s. Fundamental frequency?'],
        [['0.5 Hz', '0.5 Hz'], ['1.0 Hz', '1.0 Hz'], ['2.0 Hz', '2.0 Hz']], 1, ['f₁ = v/(2L) = 3.0/3.0 = 1.0 Hz.', 'f₁ = v/(2L) = 3.0/3.0 = 1.0 Hz.']),
      quizItem('q4', ['ເມື່ອຄື້ນຜ່ານ ອະນຸພາກຂອງຕົວກາງ…', 'When a wave passes, the particles of the medium…'],
        [['ເດີນທາງໄປກັບຄື້ນ', 'travel along with the wave'], ['ສັ່ນຢູ່ທີ່ເດີມ', 'vibrate about their places'], ['ຢຸດນິ້ງ', 'stay still']], 1, ['ພະລັງງານເດີນທາງ ແຕ່ມວນສານບໍ່ເດີນທາງ.', 'Energy travels, matter does not.']),
    ],
  }),
  ready({
    id: 'p7-04',
    title: ['ສຽງ', 'Sound'],
    hours: 10,
    field: 'phys',
    minutes: 30,
    summary: [
      'ສຽງເປັນຄື້ນຍາວກົນຈັກ ທີ່ຕ້ອງມີຕົວກາງ ແລະ ເດີນທາງໃນອາກາດ 20 °C ດ້ວຍຄວາມໄວປະມານ 343 m/s.',
      'Sound is a longitudinal mechanical wave that needs a medium and travels in air at 20 °C at about 343 m/s.',
    ],
    objectives: [
      ['ອະທິບາຍແຫຼ່ງກຳເນີດ ແລະ ການເຄື່ອນທີ່ຂອງສຽງ ແລະ ຄວາມໄວສຽງ', 'Explain the sources and propagation of sound and its speed'],
      ['ບອກຄວາມເຂັ້ມສຽງ, ລະດັບສຽງ (dB), ລະດັບສູງ-ຕ່ຳ ແລະ ຄຸນນະພາບສຽງ', 'Describe intensity, sound level (dB), pitch and quality of sound'],
      ['ອະທິບາຍການສະທ້ອນ, ການສັ່ນພ້ອງ ແລະ ປາກົດການ Doppler', 'Explain echo, resonance and the Doppler effect'],
    ],
    keyIdeas: [
      ['ສຽງເປັນຄື້ນຍາວ ຕ້ອງມີຕົວກາງ; ໃນອາກາດ 20 °C ≈ 343 m/s', 'Sound is a longitudinal wave needing a medium; in air at 20 °C ≈ 343 m/s'],
      ['ລະດັບສຽງ β = 10 log(I/I₀), I₀ = 10⁻¹² W/m²; ເພີ່ມ 10 dB = ຄວາມເຂັ້ມຂຶ້ນ 10 ເທົ່າ', 'Sound level β = 10 log(I/I₀), I₀ = 10⁻¹² W/m²; +10 dB means 10 times the intensity'],
      ['ຄວາມຖີ່ ກຳນົດລະດັບສູງ-ຕ່ຳ; ແອມພລິຈູດ ກຳນົດຄວາມດັງ', 'Frequency sets pitch; amplitude sets loudness'],
      ['ທໍ່ປິດປາຍດຽວ f₁ = v/(4L); ແຫຼ່ງເຄື່ອນເຂົ້າຫາ ຄວາມຖີ່ທີ່ໄດ້ຍິນສູງຂຶ້ນ (Doppler)', 'A closed pipe f₁ = v/(4L); a source approaching raises the heard frequency (Doppler)'],
    ],
    questions: [
      ['ເຫັນຟ້າແມບ 3 ວິນາທີ ກ່ອນໄດ້ຍິນຟ້າຮ້ອງ ຟ້າຜ່າຫ່າງປະມານເທົ່າໃດ?', 'Thunder arrives 3 s after the flash: about how far away is the lightning?'],
      ['ເປັນຫຍັງສຽງລົດພະຍາບານປ່ຽນໄປເມື່ອຜ່ານເຮົາ?', 'Why does an ambulance siren change pitch as it passes?'],
    ],
    activity: [
      'ວັດຄວາມໄວສຽງດ້ວຍການຕົບມື ແລະ ສຽງສະທ້ອນຈາກກຳແພງ ໃນໄລຍະ 50 m.',
      'Measure the speed of sound with claps and an echo from a wall 50 m away.',
    ],
    quiz: [
      quizItem('q1', ['ເຫັນຟ້າແມບ 3 s ກ່ອນໄດ້ຍິນຟ້າຮ້ອງ (v = 343 m/s). ໄລຍະຫ່າງໃກ້ຄຽງ?', 'Thunder comes 3 s after the flash (v = 343 m/s). About how far?'],
        [['100 m', '100 m'], ['1 km', '1 km'], ['10 km', '10 km']], 1, ['s = vt = 343 × 3 ≈ 1030 m ≈ 1 km.', 's = vt = 343 × 3 ≈ 1030 m ≈ 1 km.']),
      quizItem('q2', ['ລະດັບສຽງເພີ່ມຂຶ້ນ 20 dB. ຄວາມເຂັ້ມສຽງເພີ່ມຂຶ້ນກີ່ເທົ່າ?', 'The sound level rises by 20 dB. By what factor does the intensity increase?'],
        [['2 ເທົ່າ', '2 times'], ['20 ເທົ່າ', '20 times'], ['100 ເທົ່າ', '100 times']], 2, ['ທຸກ 10 dB ຄູນ 10 ດັ່ງນັ້ນ 20 dB = 10 × 10 = 100.', 'Each 10 dB multiplies by 10, so 20 dB = 10 × 10 = 100.']),
      quizItem('q3', ['ຄຸນລັກສະນະໃດຂອງຄື້ນສຽງ ກຳນົດລະດັບສູງ-ຕ່ຳ (pitch)?', 'Which property of a sound wave sets its pitch?'],
        [['ແອມພລິຈູດ', 'Amplitude'], ['ຄວາມຖີ່', 'Frequency'], ['ຄວາມໄວໃນອາກາດ', 'Speed in air']], 1, ['ຄວາມຖີ່ສູງ ສຽງແຫຼມ.', 'Higher frequency means a higher pitch.']),
      quizItem('q4', ['ແຫຼ່ງສຽງເຄື່ອນເຂົ້າຫາຜູ້ຟັງ. ຄວາມຖີ່ທີ່ໄດ້ຍິນ…', 'A sound source moves towards the listener. The heard frequency is…'],
        [['ສູງຂຶ້ນ', 'higher'], ['ຕ່ຳລົງ', 'lower'], ['ເທົ່າເດີມ', 'unchanged']], 0, ['ປາກົດການ Doppler: ຄື້ນຖືກບີບ ເຮັດໃຫ້ຄວາມຖີ່ສູງຂຶ້ນ.', 'Doppler effect: the waves are bunched up, so the frequency rises.']),
    ],
  }),
  ready({
    id: 'p7-05',
    title: ['ໄຟຟ້າແມ່ເຫຼັກ', 'Electromagnetism'],
    hours: 14,
    field: 'phys',
    minutes: 35,
    sim: 'induction',
    summary: [
      'ເມື່ອສາຍແຮງແມ່ເຫຼັກທີ່ຜ່ານຂົດລວດປ່ຽນແປງ ຈະເກີດ ε = −NΔΦ/Δt ຕາມກົດເກນ Faraday ແລະ ທິດຕາມກົດເກນ Lenz.',
      "When the magnetic flux through a coil changes, an EMF ε = −NΔΦ/Δt is induced (Faraday's law), with its direction given by Lenz's law.",
    ],
    objectives: [
      ['ອະທິບາຍທົ່ງແມ່ເຫຼັກ ແລະ ແຮງແມ່ເຫຼັກຕໍ່ກະແສໄຟຟ້າ F = BIL sin θ', 'Explain the magnetic field and the force on a current F = BIL sin θ'],
      ['ໃຊ້ກົດເກນ Faraday ε = −NΔΦ/Δt ແລະ ກົດເກນ Lenz', "Use Faraday's law ε = −NΔΦ/Δt and Lenz's law"],
      ['ອະທິບາຍການເກີດກະແສໄຟຟ້າສະທ້ອນຕົນເອງ ແລະ ພະລັງງານໃນທົ່ງແມ່ເຫຼັກ', 'Explain self-induction and energy stored in a magnetic field'],
    ],
    keyIdeas: [
      ['ກະແສໄຟຟ້າສ້າງທົ່ງແມ່ເຫຼັກ (ກົດມືຂວາ)', 'A current makes a magnetic field (right-hand rule)'],
      ['ແມ່ເຫຼັກເຄື່ອນໃນຂົດລວດ ເກີດ ε ເມື່ອສາຍແຮງທີ່ຜ່ານຂົດລວດປ່ຽນແປງ; ແມ່ເຫຼັກຢຸດນິ້ງ ε = 0', 'A moving magnet induces ε only when the flux through the coil changes; a magnet at rest gives ε = 0'],
      ['Lenz: ກະແສສະທ້ອນມີທິດຕ້ານການປ່ຽນແປງທີ່ເຮັດໃຫ້ເກີດມັນ', 'Lenz: the induced current opposes the change that causes it'],
      ['ເຄື່ອງກຳເນີດໄຟຟ້າໃຊ້ຫຼັກການນີ້ປ່ຽນພະລັງງານກົນເປັນໄຟຟ້າ; ມໍເຕີເຮັດວຽກດ້ວຍແຮງຕໍ່ກະແສໄຟໃນສະໜາມແມ່ເຫຼັກ (ປ່ຽນໄຟຟ້າເປັນກົນ); ແບບຈຳລອງຂອງເສັ້ນແຮງໃນ sim ເປັນແບບສົມມຸດ (illustrative)', 'Generators use this principle to turn mechanical energy into electrical energy; motors work through the force on a current in a magnetic field (the reverse conversion); the flux model in the sim is illustrative'],
    ],
    questions: [
      ['ເປັນຫຍັງແມ່ເຫຼັກທີ່ຢຸດຢູ່ໃນຂົດລວດ ບໍ່ເກີດກະແສໄຟຟ້າ?', 'Why does a magnet at rest inside a coil induce no current?'],
      ['B = 0.5 T, I = 2 A, L = 0.2 m ຕັ້ງສາກ ແຮງແມ່ເຫຼັກເທົ່າໃດ?', 'B = 0.5 T, I = 2 A, L = 0.2 m at 90°: what is the magnetic force?'],
    ],
    activity: [
      'ເຄື່ອນແມ່ເຫຼັກເຂົ້າ-ອອກຂົດລວດ ຕໍ່ກັບ LED ຫຼື ເຄື່ອງວັດ ແລະ ປຽບທຽບຄວາມໄວ.',
      'Move a magnet in and out of a coil connected to an LED or meter and compare the speeds.',
    ],
    quiz: [
      quizItem('q1', ['ສາຍ L = 0.2 m ມີ I = 2 A ຢູ່ໃນ B = 0.5 T ຕັ້ງສາກ. F ເທົ່າໃດ?', 'A 0.2 m wire carries 2 A in B = 0.5 T at 90°. What is F?'],
        [['0.2 N', '0.2 N'], ['2 N', '2 N'], ['0.05 N', '0.05 N']], 0, ['F = BIL sin 90° = 0.5 × 2 × 0.2 = 0.2 N.', 'F = BIL sin 90° = 0.5 × 2 × 0.2 = 0.2 N.']),
      quizItem('q2', ['ແມ່ເຫຼັກຢຸດຢູ່ໃນຂົດລວດ. ε ເທົ່າໃດ?', 'A magnet rests inside a coil. What is ε?'],
        [['ສູງສຸດ', 'Maximum'], ['ເປັນສູນ', 'Zero'], ['ລົບ', 'Negative']], 1, ['ສາຍແຮງບໍ່ປ່ຽນ ΔΦ = 0 ດັ່ງນັ້ນ ε = 0.', 'The flux does not change, ΔΦ = 0, so ε = 0.']),
      quizItem('q3', ['ເພີ່ມຈຳນວນຮອບ N ເປັນສອງເທົ່າ ຂະນະຄວາມໄວແມ່ເຫຼັກຄືເກົ່າ. ε ສູງສຸດ…', 'N is doubled with the same magnet speed. The peak ε…'],
        [['ເປັນ 2 ເທົ່າ', 'doubles'], ['ເປັນເຄິ່ງໜຶ່ງ', 'halves'], ['ບໍ່ປ່ຽນ', 'is unchanged']], 0, ['ε = −NΔΦ/Δt ເປັນສັດສ່ວນກັບ N.', 'ε = −NΔΦ/Δt is proportional to N.']),
      quizItem('q4', ['ກົດເກນ Lenz ກ່າວວ່າ…', "Lenz's law says that…"],
        [['ກະແສສະທ້ອນຕ້ານການປ່ຽນແປງທີ່ເຮັດໃຫ້ເກີດມັນ', 'the induced current opposes the change causing it'], ['ກະແສສະທ້ອນເສີມການປ່ຽນແປງ', 'the induced current reinforces the change'], ['ບໍ່ມີກະແສສະທ້ອນ', 'there is no induced current']], 0, ['ນີ້ເປັນການຮັກສາພະລັງງານ.', 'This follows from conservation of energy.']),
    ],
  }),
  ready({
    id: 'p7-06',
    title: ['ກະແສໄຟຟ້າສະຫຼັບ', 'Alternating current'],
    hours: 13,
    field: 'phys',
    minutes: 30,
    summary: [
      'ຂົດລວດທີ່ໝູນໃນທົ່ງແມ່ເຫຼັກ ກຳເນີດກະແສໄຟຟ້າສະຫຼັບ ε = NBAω sin ωt ທີ່ມີຄ່າ rms = ຄ່າສູງສຸດ/√2.',
      'A coil rotating in a magnetic field generates alternating current ε = NBAω sin ωt with rms value = peak/√2.',
    ],
    objectives: [
      ['ອະທິບາຍການກຳເນີດກະແສໄຟຟ້າສະຫຼັບ ແລະ ຄ່າ rms', 'Explain how AC is generated and the rms value'],
      ['ອະທິບາຍວົງຈອນມີຕົວຕ້ານ, ເຄື່ອງຫ້ອນ ແລະ ຂົດລວດ', 'Describe circuits with a resistor, a capacitor and an inductor'],
      ['ໃຊ້ຫຼັກການໝໍ້ແປງໄຟ Vₛ/Vₚ = Nₛ/Nₚ', 'Use the transformer relation Vₛ/Vₚ = Nₛ/Nₚ'],
    ],
    keyIdeas: [
      ['ຂົດລວດໝູນໃນທົ່ງແມ່ເຫຼັກ: ε = NBAω sin ωt', 'A coil rotating in a field: ε = NBAω sin ωt'],
      ['V_rms = V_peak/√2 ≈ 0.707 V_peak', 'V_rms = V_peak/√2 ≈ 0.707 V_peak'],
      ['X_L = ωL ແລະ X_C = 1/(ωC)', 'X_L = ωL and X_C = 1/(ωC)'],
      ['ໄຟຟ້າສະຫຼັບ ສົ່ງໄກດ້ວຍແຮງດັນສູງ ລຸດການສູນເສຍ (P = I²R)', 'AC is sent far at high voltage to cut losses (P = I²R)'],
    ],
    questions: [
      ['ໄຟເຮືອນ 230 V (rms) ຄ່າສູງສຸດເທົ່າໃດ?', 'Mains 230 V rms: what is the peak voltage?'],
      ['ເປັນຫຍັງໝໍ້ແປງໄຟໃຊ້ກັບໄຟຟ້າສະຫຼັບ ແຕ່ບໍ່ໃຊ້ກັບຖ່ານໄຟ?', 'Why does a transformer work with AC but not with a battery?'],
    ],
    activity: [
      'ເບິ່ງແຜ່ນປ້າຍ (nameplate) ຂອງອຸປະກອນໃນເຮືອນ ແລະ ຈົດ V, Hz, W.',
      'Read the nameplates of home appliances and note V, Hz and W.',
    ],
    quiz: [
      quizItem('q1', ['ໄຟເຮືອນ 230 V (rms). ຄ່າສູງສຸດໃກ້ຄຽງ?', 'Mains 230 V rms. The peak is about?'],
        [['163 V', '163 V'], ['230 V', '230 V'], ['325 V', '325 V']], 2, ['V_peak = √2 × 230 ≈ 325 V.', 'V_peak = √2 × 230 ≈ 325 V.']),
      quizItem('q2', ['ໝໍ້ແປງໄຟ: ຂົດລວດປ້ອນເຂົ້າ 100 ຮອບ ຂົດລວດອອກ 500 ຮອບ ປ້ອນ 12 V. Vₛ?', 'A transformer: 100 primary turns, 500 secondary turns, 12 V in. Vₛ?'],
        [['2.4 V', '2.4 V'], ['60 V', '60 V'], ['600 V', '600 V']], 1, ['Vₛ = Vₚ × Nₛ/Nₚ = 12 × 5 = 60 V.', 'Vₛ = Vₚ × Nₛ/Nₚ = 12 × 5 = 60 V.']),
      quizItem('q3', ['ເປັນຫຍັງໝໍ້ແປງໄຟໃຊ້ກັບຖ່ານໄຟບໍ່ໄດ້?', 'Why can a transformer not work from a battery?'],
        [['ຖ່ານໄຟແຮງດັນຕ່ຳເກີນໄປ', 'a battery voltage is too low'], ['ກະແສກົງບໍ່ເຮັດໃຫ້ສາຍແຮງປ່ຽນແປງ', 'direct current does not make the flux change'], ['ລວດຮ້ອນເກີນໄປ', 'the wire overheats']], 1, ['ຕ້ອງມີສາຍແຮງປ່ຽນແປງ ຈຶ່ງເກີດ ε.', 'A changing flux is needed to induce ε.']),
    ],
  }),
  ready({
    id: 'p7-07',
    title: ['ຄື້ນໄຟຟ້າແມ່ເຫຼັກ', 'Electromagnetic waves'],
    hours: 7,
    field: 'phys',
    minutes: 25,
    summary: [
      'ຄື້ນໄຟຟ້າແມ່ເຫຼັກເກີດຈາກສະໜາມໄຟຟ້າ ແລະ ແມ່ເຫຼັກທີ່ປ່ຽນແປງ ແລະ ເດີນທາງໃນສູນຍາກາດດ້ວຍ c = 3.00×10⁸ m/s.',
      'Electromagnetic waves arise from changing electric and magnetic fields and travel in vacuum at c = 3.00×10⁸ m/s.',
    ],
    objectives: [
      ['ອະທິບາຍການກຳເນີດ ແລະ ສະເປັກຕຣຳຂອງຄື້ນໄຟຟ້າແມ່ເຫຼັກ', 'Explain how EM waves arise and their spectrum'],
      ['ໃຊ້ c = fλ ແລະ ບອກປະໂຫຍດຂອງຄື້ນແຕ່ລະຊ່ວງ', 'Use c = fλ and state uses of each band'],
      ['ອະທິບາຍການສື່ສານດ້ວຍຄື້ນວິທະຍຸ (ການມອດຄື້ນ)', 'Explain radio communication (modulation)'],
    ],
    keyIdeas: [
      ['ຄື້ນໄຟຟ້າແມ່ເຫຼັກເປັນຄື້ນຂວາງ ເດີນທາງໃນສູນຍາກາດ c = 3.00×10⁸ m/s', 'EM waves are transverse and travel in vacuum at c = 3.00×10⁸ m/s'],
      ['ລຽງຕາມຄວາມຖີ່: ວິທະຍຸ, ໄມໂຄຣເວບ, ອິນຟາເຣດ, ແສງ, ອັນຕຣາໄວໂອເລດ, X, ກາມມາ', 'By frequency: radio, microwave, infrared, light, ultraviolet, X-ray, gamma'],
      ['ຄວາມຖີ່ສູງ ພະລັງງານໂຟຕອນ E = hf ສູງ ອັນຕະລາຍຫຼາຍ', 'Higher frequency means higher photon energy E = hf and more hazard'],
      ['ວົງຈອນ LC ສັ່ນທີ່ f = 1/(2π√(LC))', 'An LC circuit oscillates at f = 1/(2π√(LC))'],
    ],
    questions: [
      ['ວິທະຍຸ FM 100 MHz ມີຄວາມຍາວຄື້ນເທົ່າໃດ?', 'What is the wavelength of 100 MHz FM radio?'],
      ['ເປັນຫຍັງໂທລະສັບໃນລິບ ຫຼື ຖ້ຳ ສັນຍານອ່ອນ?', 'Why is a phone signal weak in a lift or a cave?'],
    ],
    activity: [
      'ເອົາໂທລະສັບຫໍ່ດ້ວຍແຜ່ນອາລູມີນຽມ ແລ້ວໂທເຂົ້າ ສັງເກດສັນຍານ.',
      'Wrap a phone in aluminium foil, call it and observe the signal.',
    ],
    quiz: [
      quizItem('q1', ['ວິທະຍຸ 100 MHz ມີ λ ເທົ່າໃດ? (c = 3.00×10⁸ m/s)', 'What is λ for 100 MHz radio? (c = 3.00×10⁸ m/s)'],
        [['0.3 m', '0.3 m'], ['3 m', '3 m'], ['30 m', '30 m']], 1, ['λ = c/f = 3.00×10⁸ / 1.00×10⁸ = 3 m.', 'λ = c/f = 3.00×10⁸ / 1.00×10⁸ = 3 m.']),
      quizItem('q2', ['ຄື້ນໃດມີພະລັງງານໂຟຕອນສູງສຸດ?', 'Which wave has the highest photon energy?'],
        [['ວິທະຍຸ', 'Radio'], ['ອິນຟາເຣດ', 'Infrared'], ['ກາມມາ', 'Gamma']], 2, ['E = hf; ກາມມາຄວາມຖີ່ສູງສຸດ.', 'E = hf and gamma rays have the highest frequency.']),
      quizItem('q3', ['ຄື້ນໄຟຟ້າແມ່ເຫຼັກເດີນທາງໃນສູນຍາກາດໄດ້ບໍ?', 'Can EM waves travel through a vacuum?'],
        [['ໄດ້', 'Yes'], ['ບໍ່ໄດ້', 'No'], ['ສະເພາະແສງ', 'Only light']], 0, ['ບໍ່ຕ້ອງການຕົວກາງ; ແສງຈາກດວງອາທິດມາຮອດເຮົາ.', 'They need no medium; sunlight reaches us.']),
    ],
  }),
  ready({
    id: 'p7-08',
    title: ['ຄື້ນແສງ', 'Light waves'],
    hours: 11,
    field: 'phys',
    minutes: 30,
    summary: [
      'ແສງເປັນຄື້ນຂວາງ ຈຶ່ງມີການກະຈາຍ, ການແຊກແຊງ (Young), ການລ້ຽວເບນ ແລະ ໂພລາໄຣເຊຊັນ.',
      'Light is a transverse wave, so it shows dispersion, interference (Young), diffraction and polarisation.',
    ],
    objectives: [
      ['ອະທິບາຍການກະຈາຍແສງ, ການແຊກແຊງ (Young) ແລະ ການລ້ຽວເບນ', 'Explain dispersion, Young\'s interference and diffraction'],
      ['ອະທິບາຍໂພລາໄຣເຊຊັນ ແລະ ການເຮືອງແສງຂອງທ້ອງຟ້າ (ການກະເຈີງ)', 'Explain polarisation and the scattering of light by the sky'],
      ['ອະທິບາຍການປະສົມສີ ແລະ ແຜ່ນຕອງແສງ', 'Explain colour mixing and filters'],
    ],
    keyIdeas: [
      ['ແສງຂາວແຍກເປັນສີ ເພາະ n ຕ່າງກັນຕາມຄວາມຍາວຄື້ນ (ປຣິສຶມ, ຮຸ້ງ)', 'White light splits because n depends on wavelength (prism, rainbow)'],
      ['Young: ໄລຍະຂອບ Δy = λL/d', 'Young: fringe spacing Δy = λL/d'],
      ['ໂພລາໄຣເຊຊັນ ພິສູດວ່າແສງເປັນຄື້ນຂວາງ', 'Polarisation shows that light is a transverse wave'],
      ['ສີແສງ: ແດງ-ຂຽວ-ຟ້າ ປະສົມເປັນຂາວ; ສີວັດຖຸ ກັ່ນສີອອກ (subtractive)', 'Light: red, green and blue mix to white; pigments subtract colours'],
    ],
    questions: [
      ['ເປັນຫຍັງທ້ອງຟ້າເປັນສີຟ້າ ແລະ ເຫັນຕາເວັນຕົກເປັນສີແດງ?', 'Why is the sky blue and the sunset red? (scattering)'],
      ['λ = 600 nm, L = 2 m, d = 0.5 mm ໄລຍະຂອບເທົ່າໃດ?', 'λ = 600 nm, L = 2 m, d = 0.5 mm: what is the fringe spacing?'],
    ],
    activity: [
      'ເບິ່ງແສງໄຟຜ່ານແຜ່ນ CD ຫຼື ແສງຕາເວັນຜ່ານຈອກນ້ຳ ແລ້ວອະທິບາຍສີ.',
      'Look at a lamp reflected from a CD or sunlight through a glass of water and explain the colours.',
    ],
    quiz: [
      quizItem('q1', ['ໄລຍະຂອບຂອງ Young ເມື່ອ λ = 600 nm, L = 2 m, d = 0.5 mm?', "Young's fringe spacing for λ = 600 nm, L = 2 m, d = 0.5 mm?"],
        [['0.24 mm', '0.24 mm'], ['2.4 mm', '2.4 mm'], ['24 mm', '24 mm']], 1, ['Δy = λL/d = 600×10⁻⁹ × 2 / 0.5×10⁻³ = 2.4×10⁻³ m.', 'Δy = λL/d = 600×10⁻⁹ × 2 / 0.5×10⁻³ = 2.4×10⁻³ m.']),
      quizItem('q2', ['ປາກົດການໃດພິສູດວ່າແສງເປັນຄື້ນຂວາງ?', 'Which phenomenon shows that light is a transverse wave?'],
        [['ການສະທ້ອນ', 'Reflection'], ['ໂພລາໄຣເຊຊັນ', 'Polarisation'], ['ການຫັກແສງ', 'Refraction']], 1, ['ຄື້ນຍາວບໍ່ເກີດໂພລາໄຣເຊຊັນ.', 'Longitudinal waves cannot be polarised.']),
      quizItem('q3', ['ເປັນຫຍັງຕາເວັນຕົກເປັນສີແດງ?', 'Why does the setting Sun look red?'],
        [['ສີຟ້າຖືກກະເຈີງອອກຫຼາຍກວ່າ ເຫຼືອສີແດງ', 'blue light is scattered out more, leaving red'], ['ອາກາດຮ້ອນຂຶ້ນ', 'the air heats up'], ['ດວງຕາເວັນປ່ຽນສີ', 'the Sun changes colour']], 0, ['ແສງຄວາມຍາວຄື້ນສັ້ນຖືກກະເຈີງຫຼາຍກວ່າ.', 'Shorter wavelengths are scattered more.']),
    ],
  }),
  ready({
    id: 'p7-09',
    title: ['ຟີຊິກອາໂຕມ', 'Atomic physics'],
    hours: 10,
    field: 'phys',
    minutes: 35,
    sim: 'photoelectric',
    summary: [
      'ແບບຈຳລອງອາໂຕມຂອງ Thomson, Rutherford ແລະ Bohr ເປັນແບບຈຳລອງປະຫວັດສາດ ທີ່ອະທິບາຍເສັ້ນສະເປັກຕຣຳຂອງອາໂຕມ.',
      'The Thomson, Rutherford and Bohr atomic models are historical models that help explain the line spectra of atoms.',
    ],
    objectives: [
      ['ອະທິບາຍແບບຈຳລອງອາໂຕມຂອງ Thomson, Rutherford ແລະ Bohr ແລະ ເສັ້ນສະເປັກຕຣຳ', 'Describe the Thomson, Rutherford and Bohr models and line spectra'],
      ['ອະທິບາຍປາກົດການໂຟໂຕເອເລັກຕຣິກ ດ້ວຍ E = hf ແລະ K = hf − W₀', 'Explain the photoelectric effect with E = hf and K = hf − W₀'],
      ['ໃຊ້ລະດັບພະລັງງານ Eₙ = −13.6/n² eV ຫາຄວາມຍາວຄື້ນຂອງໄຮໂດຣເຈນ', 'Use Eₙ = −13.6/n² eV to find hydrogen wavelengths'],
    ],
    keyIdeas: [
      ['ແສງມາເປັນກ້ອນພະລັງງານ (ໂຟຕອນ) E = hf, h = 6.63×10⁻³⁴ J·s; E = hc/λ ≈ 1240 eV·nm / λ', 'Light arrives in quanta (photons) E = hf, h = 6.63×10⁻³⁴ J·s; E = hc/λ ≈ 1240 eV·nm / λ'],
      ['ຕ່ຳກວ່າຄວາມຖີ່ເກນ ບໍ່ມີເອເລັກຕຣົງຫຼຸດ ບໍ່ວ່າແສງແຮງເທົ່າໃດ', 'Below the threshold frequency no electrons are emitted however intense the light'],
      ['ແສງແຮງຂຶ້ນ ເອເລັກຕຣົງຫຼາຍຂຶ້ນ ແຕ່ K ສູງສຸດບໍ່ປ່ຽນ; ຄວາມຖີ່ສູງຂຶ້ນ K ສູງສຸດເພີ່ມ', 'More intensity gives more electrons but the same maximum K; higher frequency raises K'],
      ['ໂຟຕອນທີ່ເກີດຈາກການກະໂດດຊັ້ນພະລັງງານ ມີ E = Eᵢ − E_f (ແບບ Bohr ເປັນແບບປະຫວັດສາດ)', 'A photon from a level jump has E = Eᵢ − E_f (the Bohr model is a historical model)'],
    ],
    questions: [
      ['ເປັນຫຍັງແສງອິນຟາເຣດທີ່ແຮງຫຼາຍ ບໍ່ສາມາດຕີເອເລັກຕຣົງອອກຈາກໂລຫະໄດ້?', 'Why can intense infrared light not eject electrons from a metal?'],
      ['ການກະໂດດ n = 3 ເປັນ n = 2 ຂອງໄຮໂດຣເຈນ ແສງມີສີໃດ ແລະ ຍາວເທົ່າໃດ?', 'The n = 3 → 2 jump in hydrogen: what colour and wavelength?'],
    ],
    activity: [
      'ເບິ່ງຫຼອດໄຟ (neon, ໄຮໂດຣເຈນ) ຜ່ານແຜ່ນເກຣຕິງ ແລະ ບັນທຶກເສັ້ນສະເປັກຕຣຳ (ຄູສາທິດ).',
      'View discharge lamps through a diffraction grating and record the lines (teacher demonstration).',
    ],
    quiz: [
      quizItem('q1', ['ແສງ 400 nm ຕົກໃສ່ Na (W₀ = 2.3 eV). K ສູງສຸດເທົ່າໃດ? (hc = 1240 eV·nm)', 'Light of 400 nm hits Na (W₀ = 2.3 eV). What is K_max? (hc = 1240 eV·nm)'],
        [['0.8 eV', '0.8 eV'], ['3.1 eV', '3.1 eV'], ['5.4 eV', '5.4 eV']], 0, ['E = 1240/400 = 3.10 eV; K = 3.10 − 2.3 = 0.8 eV.', 'E = 1240/400 = 3.10 eV; K = 3.10 − 2.3 = 0.8 eV.']),
      quizItem('q2', ['ເພີ່ມຄວາມເຂັ້ມແສງ ຂະນະຄວາມຍາວຄື້ນຄືເກົ່າ (ຢູ່ເໜືອເກນ). ອັນໃດປ່ຽນ?', 'The intensity is raised, wavelength unchanged (above threshold). What changes?'],
        [['ຈຳນວນເອເລັກຕຣົງ', 'Number of electrons'], ['K ສູງສຸດ', 'Maximum K'], ['ທັງສອງ', 'Both']], 0, ['ຈຳນວນໂຟຕອນເພີ່ມ ແຕ່ພະລັງງານຕໍ່ໂຟຕອນຄືເກົ່າ.', 'More photons, but the energy of each photon is unchanged.']),
      quizItem('q3', ['ການກະໂດດ n = 3 → 2 ຂອງໄຮໂດຣເຈນ ໃຫ້ແສງຄວາມຍາວຄື້ນໃກ້ຄຽງ?', 'The hydrogen n = 3 → 2 jump emits light of about what wavelength?'],
        [['122 nm', '122 nm'], ['656 nm (ແດງ)', '656 nm (red)'], ['434 nm', '434 nm']], 1, ['ΔE = 13.6(1/4 − 1/9) = 1.89 eV; λ = 1240/1.89 ≈ 656 nm.', 'ΔE = 13.6(1/4 − 1/9) = 1.89 eV; λ = 1240/1.89 ≈ 656 nm.']),
      quizItem('q4', ['ເສັ້ນຂອງໄຮໂດຣເຈນທີ່ n_f = 1 (Lyman) ຢູ່ໃນຊ່ວງໃດ?', 'In which region are the hydrogen lines with n_f = 1 (Lyman)?'],
        [['ແສງທີ່ເຫັນໄດ້', 'Visible'], ['ອັນຕຣາໄວໂອເລດ', 'Ultraviolet'], ['ອິນຟາເຣດ', 'Infrared']], 1, ['ΔE ≥ 10.2 eV ດັ່ງນັ້ນ λ ≤ 122 nm ບໍ່ເຫັນດ້ວຍຕາ.', 'ΔE ≥ 10.2 eV so λ ≤ 122 nm, not visible.']),
    ],
  }),
  ready({
    id: 'p7-10',
    title: ['ຟີຊິກນິວເຄຼຍ', 'Nuclear physics'],
    hours: 10,
    field: 'phys',
    minutes: 30,
    summary: [
      'ນິວເຄຼຍບາງຊະນິດບໍ່ຄົງຕົວ ແລະ ປ່ອຍລັງສີ α, β ຫຼື γ ເຊິ່ງເອີ້ນວ່າກຳມັນຕະພາບລັງສີ.',
      'Some nuclei are unstable and emit α, β or γ radiation, which is called radioactivity.',
    ],
    objectives: [
      ['ອະທິບາຍກຳມັນຕະພາບລັງສີ ແລະ ລັງສີ α, β, γ', 'Explain radioactivity and α, β, γ radiation'],
      ['ໃຊ້ເຄິ່ງຊີວິດ N = N₀(½)^(t/T½) ແລະ ອະທິບາຍໄອໂຊໂທບ', 'Use half-life N = N₀(½)^(t/T½) and explain isotopes'],
      ['ອະທິບາຍການແຍກ ແລະ ການລວມນິວເຄຼຍ ແລະ ພະລັງງານສາຍພັນ E = mc²', 'Explain fission, fusion and binding energy E = mc²'],
    ],
    keyIdeas: [
      ['ເລກອາໂຕມ Z = ໂປຣຕົງ; ເລກມວນສານ A = ໂປຣຕົງ + ນິວຕຣົງ', 'Atomic number Z = protons; mass number A = protons + neutrons'],
      ['α ຖືກກັ້ນດ້ວຍເຈ້ຍ, β ດ້ວຍອາລູມີນຽມ, γ ຕ້ອງໃຊ້ຕະກົ່ວໜາ', 'α is stopped by paper, β by aluminium, γ needs thick lead'],
      ['ເຄິ່ງຊີວິດ: ເວລາທີ່ເຫຼືອເຄິ່ງໜຶ່ງ ບໍ່ຂຶ້ນກັບປະລິມານ', 'Half-life: the time for half to remain, independent of the amount'],
      ['ໂຮງງານນິວເຄຼຍໃຊ້ການແຍກ; ດວງອາທິດໃຊ້ການລວມ', 'Reactors use fission; the Sun uses fusion'],
    ],
    questions: [
      ['ໄອໂອດີນ-131 ເຄິ່ງຊີວິດ 8 ວັນ ຫຼັງ 24 ວັນ ເຫຼືອເທົ່າໃດ?', 'Iodine-131 has a half-life of 8 days; how much remains after 24 days?'],
      ['ມວນ 1 g ກາຍເປັນພະລັງງານທັງໝົດ ໄດ້ເທົ່າໃດ J?', 'If 1 g of mass is fully converted to energy, how many joules?'],
    ],
    activity: [
      'ຈຳລອງເຄິ່ງຊີວິດດ້ວຍເຫຼຍ 100 ເມັດ: ໂຍນ ແລະ ເອົາຝ່າຍທີ່ໄດ້ຫົວອອກ ເຮັດຊ້ຳ ແລ້ວແຕ້ມກຣາຟ.',
      'Model half-life with 100 coins: toss, remove the heads, repeat and plot the counts.',
    ],
    quiz: [
      quizItem('q1', ['ເຄິ່ງຊີວິດ 8 ວັນ. ຫຼັງ 24 ວັນ ເຫຼືອເທົ່າໃດ?', 'Half-life 8 days. How much remains after 24 days?'],
        [['1/2', '1/2'], ['1/6', '1/6'], ['1/8', '1/8']], 2, ['24 ວັນ = 3 ເຄິ່ງຊີວິດ; (½)³ = 1/8.', '24 days = 3 half-lives; (½)³ = 1/8.']),
      quizItem('q2', ['ມວນ 1 g (10⁻³ kg) ກາຍເປັນພະລັງງານທັງໝົດ. E = mc² ເທົ່າໃດ?', 'A mass of 1 g (10⁻³ kg) is fully converted. What is E = mc²?'],
        [['9×10¹³ J', '9×10¹³ J'], ['3×10⁵ J', '3×10⁵ J'], ['9×10¹⁰ J', '9×10¹⁰ J']], 0, ['E = 10⁻³ × (3×10⁸)² = 9×10¹³ J.', 'E = 10⁻³ × (3×10⁸)² = 9×10¹³ J.']),
      quizItem('q3', ['ນິວເຄຼຍມີ A = 14 ແລະ Z = 6. ມີນິວຕຣົງເທົ່າໃດ?', 'A nucleus has A = 14 and Z = 6. How many neutrons?'],
        [['6', '6'], ['8', '8'], ['14', '14']], 1, ['N = A − Z = 14 − 6 = 8.', 'N = A − Z = 14 − 6 = 8.']),
      quizItem('q4', ['ລັງສີໃດຖືກກັ້ນດ້ວຍເຈ້ຍແຜ່ນດຽວ?', 'Which radiation is stopped by a single sheet of paper?'],
        [['α', 'α'], ['β', 'β'], ['γ', 'γ']], 0, ['α ມີມວນ ແລະ ປະຈຸໃຫຍ່ ຈຶ່ງຖືກກັ້ນງ່າຍ.', 'α particles are heavy and charged, so they are stopped easily.']),
    ],
  }),
]
