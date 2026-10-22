import { quizItem, ready } from '../lower/build'
import type { LessonDef } from '../lower/types'

// Physics M.5 (Grade 10), upper-secondary curriculum 2011. 7 topics, 68 h. All ready.
// Sims: p5-01 `kinematics`, p5-02 `newton`, p5-04 `pendulum` (reused), p5-05 `projectile`, p5-07 `states` (reused);
// p5-03 and p5-06 are content-only. g = 9.8 m/s². Names of scientists stay in Latin letters.
// Lao text is an AI draft; the whole file is subject to teacher review.
// REVIEW terms: ໄລຍະເຄື່ອນຍ້າຍ (displacement), ຄວາມເລັ່ງ (acceleration), ການຕົກຕາມລຳພັງ (free fall),
//   ແຮງລວມ (net force), ແຮງຝືດ (friction), ແຮງກະຕຸ້ນ (impulse), ປະລິມານເດີນເຄື່ອນ (momentum),
//   ການຕຳກັນຍືດຍຸ່ນ / ບໍ່ຍືດຍຸ່ນ (elastic / inelastic collision), ພະລັງງານເດີນເຄື່ອນ (kinetic energy),
//   ພະລັງງານທ່າຕັ້ງ (potential energy), ແຮງເຂົ້າສູນ (centripetal force), ໂມເມັນຂອງແຮງ (moment),
//   ຈຸດຖ່ວງໜັກ (centre of gravity), ຄູ່ແຮງ (couple), ການດຸນດ່ຽງຄົງຕົວ / ບໍ່ຄົງຕົວ (stable / unstable equilibrium),
//   ຄວາມຮ້ອນແຝງ (latent heat), ການຢືດຕົວຍ້ອນຄວາມຮ້ອນ (thermal expansion), ເລກຸນ (molecule),
//   ໂປຣຕົງ, ນິວຕຣົງ, ນິວເຄຼຍ (already unverified in CLAUDE.md).

export const p5: LessonDef[] = [
  ready({
    id: 'p5-01',
    title: ['ການເຄື່ອນທີ່', 'Kinematics: motion in a line'],
    hours: 12,
    field: 'phys',
    minutes: 30,
    sim: 'kinematics',
    summary: [
      'ການເຄື່ອນທີ່ຕາມເສັ້ນຊື່ອະທິບາຍດ້ວຍໄລຍະເຄື່ອນຍ້າຍ, ຄວາມໄວ ແລະ ຄວາມເລັ່ງ ແລະ ອ່ານໄດ້ຈາກກຣາຟ x–t ແລະ v–t.',
      'Motion in a line is described by displacement, velocity and acceleration, and can be read from x–t and v–t graphs.',
    ],
    objectives: [
      ['ແຍກໄລຍະທາງ ອອກຈາກໄລຍະເຄື່ອນຍ້າຍ, ຄວາມໄວ ອອກຈາກຄວາມໄວສະເລ່ຍ', 'Distinguish distance from displacement, and speed from average velocity'],
      ['ອະທິບາຍການເຄື່ອນທີ່ສະໝ່ຳສະເໝີ ແລະ ການເຄື່ອນທີ່ເລັ່ງສະໝ່ຳສະເໝີ ແລະ ອ່ານກຣາຟ x–t, v–t', 'Describe uniform and uniformly accelerated motion and read x–t and v–t graphs'],
      ['ໃຊ້ v = v₀ + at ແລະ x = x₀ + v₀t + ½at² ແກ້ເລກ ລວມທັງການຕົກຕາມລຳພັງ', 'Use v = v₀ + at and x = x₀ + v₀t + ½at² including free fall'],
    ],
    keyIdeas: [
      ['ຄວາມຊັນຂອງກຣາຟ x–t ແມ່ນຄວາມໄວ; ຄວາມຊັນຂອງກຣາຟ v–t ແມ່ນຄວາມເລັ່ງ', 'The slope of x–t is velocity; the slope of v–t is acceleration'],
      ['ເນື້ອທີ່ໃຕ້ກຣາຟ v–t ແມ່ນໄລຍະເຄື່ອນຍ້າຍ', 'The area under v–t is displacement'],
      ['ການຕົກຕາມລຳພັງ: ຄວາມເລັ່ງ g ≈ 9.8 m/s² ເທົ່າກັນທຸກວັດຖຸ (ບໍ່ຄິດແຮງຕ້ານອາກາດ)', 'Free fall: a = g ≈ 9.8 m/s² for every object (air resistance ignored)'],
      ['ຢູ່ຈຸດສູງສຸດຂອງການໂຍນຂຶ້ນ ຄວາມໄວເປັນສູນ ແຕ່ຄວາມເລັ່ງຍັງເທົ່າ g', 'At the top of a throw v = 0 but a is still g'],
    ],
    questions: [
      ['ເປັນຫຍັງຂົນນົກຕົກຊ້າກວ່າຫີນໃນອາກາດ ແຕ່ຕົກພ້ອມກັນໃນສູນຍາກາດ?', 'Why does a feather fall slower than a stone in air but together in a vacuum?'],
      ['ຖ້າຄວາມໄວເປັນສູນ ຄວາມເລັ່ງຕ້ອງເປັນສູນບໍ? ຍົກຕົວຢ່າງ', 'If v = 0, must a = 0? Give an example (a ball at the top of its flight)'],
    ],
    activity: [
      'ປ່ອຍບານຈາກຄວາມສູງ 2 m ແລະ ຈັບເວລາດ້ວຍໂທລະສັບ ແລ້ວຄິດໄລ່ g (ເວລາປະມານ 0.64 s).',
      'Drop a ball from 2 m, time it with a phone and compute g (about 0.64 s).',
    ],
    quiz: [
      quizItem('q1', ['ລົດເລັ່ງຈາກຢູ່ນິ້ງດ້ວຍ a = 2 m/s² ເປັນເວລາ 5 s. ຄວາມໄວສຸດທ້າຍເທົ່າໃດ?', 'A car accelerates from rest at a = 2 m/s² for 5 s. What is its final speed?'],
        [['2.5 m/s', '2.5 m/s'], ['10 m/s', '10 m/s'], ['25 m/s', '25 m/s']], 1, ['v = v₀ + at = 0 + 2 × 5 = 10 m/s.', 'v = v₀ + at = 0 + 2 × 5 = 10 m/s.']),
      quizItem('q2', ['ຈາກຂໍ້ 1 ລົດເຄື່ອນທີ່ໄດ້ໄລຍະເທົ່າໃດ ໃນ 5 s?', 'In the same 5 s, how far does the car travel?'],
        [['10 m', '10 m'], ['25 m', '25 m'], ['50 m', '50 m']], 1, ['x = ½at² = ½ × 2 × 25 = 25 m.', 'x = ½at² = ½ × 2 × 25 = 25 m.']),
      quizItem('q3', ['ໃນກຣາຟ v–t ຂອງການເຄື່ອນທີ່ເລັ່ງສະໝ່ຳສະເໝີ ຄວາມຊັນຂອງເສັ້ນແມ່ນຫຍັງ?', 'On the v–t graph of uniformly accelerated motion, what does the slope represent?'],
        [['ໄລຍະເຄື່ອນຍ້າຍ', 'Displacement'], ['ຄວາມເລັ່ງ', 'Acceleration'], ['ເວລາ', 'Time']], 1, ['ຄວາມຊັນ = Δv/Δt = a.', 'Slope = Δv/Δt = a.']),
      quizItem('q4', ['ບານຖືກໂຍນຂຶ້ນ. ຢູ່ຈຸດສູງສຸດ v ແລະ a ເປັນເທົ່າໃດ? (ບໍ່ຄິດອາກາດ)', 'A ball is thrown up. At the top, what are v and a? (no air resistance)'],
        [['v = 0, a = 0', 'v = 0, a = 0'], ['v = 0, a = g ລົງ', 'v = 0, a = g downward'], ['v = g, a = 0', 'v = g, a = 0']], 1, ['ແຮງໂນ້ມຖ່ວງຍັງກະທຳ ຈຶ່ງຍັງມີ a = g.', 'Gravity still acts, so a = g.']),
    ],
  }),
  ready({
    id: 'p5-02',
    title: ['ຄວາມແຮງເດີນເຄື່ອນ', "Dynamics: forces and Newton's laws"],
    hours: 10,
    field: 'phys',
    minutes: 30,
    sim: 'newton',
    summary: [
      'ກົດເກນຂອງ Newton ເຊື່ອມແຮງລວມກັບຄວາມເລັ່ງ: ΣF = ma.',
      "Newton's laws link net force to acceleration: ΣF = ma.",
    ],
    objectives: [
      ['ບອກກົດເກນທີ 1, 2 ແລະ 3 ຂອງ Newton ແລະ ຍົກຕົວຢ່າງ', "State Newton's first, second and third laws with examples"],
      ['ໃຊ້ ΣF = ma ຄິດໄລ່ແຮງລວມ, ມວນສານ ແລະ ຄວາມເລັ່ງ', 'Use ΣF = ma to find net force, mass and acceleration'],
      ['ແຍກມວນສານ (kg) ອອກຈາກນ້ຳໜັກ (W = mg, N) ແລະ ອະທິບາຍແຮງຝືດ', 'Separate mass (kg) from weight (W = mg, N) and explain friction'],
    ],
    keyIdeas: [
      ['ກົດເກນທີ 1: ແຮງລວມເປັນສູນ ຄວາມໄວຄົງທີ່ (ຢູ່ນິ້ງ ຫຼື ເຄື່ອນສະໝ່ຳສະເໝີ)', 'Law 1: zero net force means constant velocity (at rest or uniform motion)'],
      ['ກົດເກນທີ 2: ΣF = ma; ແຮງເທົ່າກັນ ມວນຫຼາຍ ເລັ່ງໜ້ອຍ', 'Law 2: ΣF = ma; same force, more mass, less acceleration'],
      ['ກົດເກນທີ 3: ແຮງຄູ່ເທົ່າກັນ ທິດກົງກັນຂ້າມ ແຕ່ກະທຳຕໍ່ວັດຖຸຄົນລະອັນ', 'Law 3: equal and opposite forces that act on different bodies'],
      ['ແຮງຝືດ f = μN; ແຮງຝືດສະຖິດສູງສຸດ (μₛN) ໃຫຍ່ກວ່າແຮງຝືດເຄື່ອນທີ່ (μₖN)', 'Friction f = μN; maximum static friction (μₛN) exceeds kinetic friction (μₖN)'],
    ],
    questions: [
      ['ເປັນຫຍັງຕ້ອງຄາດສາຍແອວນິລະໄພໃນລົດ?', 'Why wear a seat belt? (inertia)'],
      ['ມ້າດຶງລົດເຂັນ ແຮງຄູ່ເທົ່າກັນ ແຕ່ເປັນຫຍັງລົດຍັງເຄື່ອນທີ່?', 'A horse pulls a cart with equal and opposite forces, so why does the cart move?'],
    ],
    activity: [
      'ດຶງກ່ອງດ້ວຍເຄື່ອງຊັ່ງສະປຣິງ ບັນທຶກແຮງຕອນເລີ່ມຂະຫຍັບ ແລະ ແຮງຕອນເຄື່ອນສະໝ່ຳສະເໝີ ແລ້ວປຽບທຽບ.',
      'Pull a box with a spring balance; record the force to start it and to keep it moving steadily, and compare.',
    ],
    quiz: [
      quizItem('q1', ['ແຮງລວມ 12 N ກະທຳຕໍ່ມວນ 3 kg. ຄວາມເລັ່ງເທົ່າໃດ?', 'A net force of 12 N acts on a 3 kg mass. What is the acceleration?'],
        [['0.25 m/s²', '0.25 m/s²'], ['4 m/s²', '4 m/s²'], ['36 m/s²', '36 m/s²']], 1, ['a = ΣF/m = 12/3 = 4 m/s².', 'a = ΣF/m = 12/3 = 4 m/s².']),
      quizItem('q2', ['ວັດຖຸມວນ 5 kg ມີນ້ຳໜັກເທົ່າໃດ? (g = 9.8 m/s²)', 'What is the weight of a 5 kg object? (g = 9.8 m/s²)'],
        [['5 N', '5 N'], ['49 N', '49 N'], ['0.51 N', '0.51 N']], 1, ['W = mg = 5 × 9.8 = 49 N.', 'W = mg = 5 × 9.8 = 49 N.']),
      quizItem('q3', ['ເມື່ອແຮງລວມເປັນສູນ ວັດຖຸທີ່ກຳລັງເຄື່ອນທີ່ຈະ…', 'When the net force is zero, a moving object will…'],
        [['ຢຸດທັນທີ', 'stop at once'], ['ເຄື່ອນທີ່ດ້ວຍຄວາມໄວຄົງທີ່', 'keep moving at constant velocity'], ['ເລັ່ງຂຶ້ນ', 'speed up']], 1, ['ກົດເກນທີ 1 ຂອງ Newton.', "Newton's first law."]),
      quizItem('q4', ['ແຮງຄູ່ຕາມກົດເກນທີ 3 ຂອງ Newton ຈຶ່ງບໍ່ຕັດກັນ ເພາະ…', "The action–reaction pair of Newton's third law do not cancel because…"],
        [['ມັນກະທຳຕໍ່ວັດຖຸຄົນລະອັນ', 'they act on different bodies'], ['ມັນບໍ່ເທົ່າກັນ', 'they are not equal'], ['ມັນທິດດຽວກັນ', 'they point the same way']], 0, ['ການຕັດກັນໃຊ້ໄດ້ສະເພາະແຮງທີ່ກະທຳຕໍ່ວັດຖຸດຽວກັນ.', 'Cancelling applies only to forces on the same body.']),
    ],
  }),
  ready({
    id: 'p5-03',
    title: ['ປະລິມານເດີນເຄື່ອນ', 'Momentum'],
    hours: 6,
    field: 'phys',
    minutes: 25,
    summary: [
      'ປະລິມານເດີນເຄື່ອນ p = mv ຂອງລະບົບໂດດດ່ຽວຄົງທີ່ ແລະ ແຮງກະຕຸ້ນ FΔt ເທົ່າກັບການປ່ຽນແປງຂອງ p.',
      'The momentum p = mv of an isolated system is conserved, and impulse FΔt equals the change in p.',
    ],
    objectives: [
      ['ໃຫ້ນິຍາມ p = mv ແລະ ແຮງກະຕຸ້ນ (impulse) ແລະ ບອກໜ່ວຍ', 'Define momentum p = mv and impulse, with units'],
      ['ໃຊ້ກົດເກນຮັກສາປະລິມານເດີນເຄື່ອນກັບການຕຳກັນໃນມິຕິດຽວ', 'Apply conservation of momentum to collisions in one dimension'],
      ['ອະທິບາຍການຖອຍຫຼັງຂອງປືນ ແລະ ການເຮັດວຽກຂອງເຄື່ອງຈັກອາຍພົ່ນ', 'Explain gun recoil and jet/rocket propulsion'],
    ],
    keyIdeas: [
      ['p = mv (kg·m/s) ເປັນເວັກເຕີ ມີທິດຕາມຄວາມໄວ', 'p = mv (kg·m/s) is a vector in the direction of velocity'],
      ['ແຮງກະຕຸ້ນ FΔt = Δp: ເວລາຕຳກັນຍາວຂຶ້ນ ແຮງຫຼຸດລົງ', 'Impulse FΔt = Δp: a longer collision time gives a smaller force'],
      ['ລະບົບໂດດດ່ຽວ (ບໍ່ມີແຮງພາຍນອກ) ປະລິມານເດີນເຄື່ອນລວມຄົງທີ່', 'In an isolated system total momentum is conserved'],
      ['ການຕຳກັນຍືດຍຸ່ນ ຮັກສາພະລັງງານເດີນເຄື່ອນ; ບໍ່ຍືດຍຸ່ນ ບໍ່ຮັກສາ (ແຕ່ຮັກສາ p)', 'Elastic collisions conserve kinetic energy; inelastic ones do not (p is still conserved)'],
    ],
    questions: [
      ['ເປັນຫຍັງຖົງລົມນິລະໄພ ແລະ ຕຽງນຸ່ມ ຫຼຸດອັນຕະລາຍເວລາຕຳກັນ?', 'Why do airbags and soft landings reduce injury?'],
      ['ມວນ 2 kg ແລ່ນ 3 m/s ຕຳມວນ 1 kg ທີ່ຢູ່ນິ້ງ ແລ້ວຕິດກັນ ຄວາມໄວຫຼັງຕຳເທົ່າໃດ?', 'A 2 kg cart at 3 m/s hits a 1 kg cart at rest and they stick: what is the final speed?'],
    ],
    activity: [
      'ຫຼີ້ນລົດເຄື່ອງຫຼີ້ນ 2 ຄັນ ຕຳກັນ ແລ້ວປຽບທຽບຄວາມໄວກ່ອນ-ຫຼັງ (ໃຊ້ວິດີໂອ).',
      'Collide two toy carts and compare speeds before and after (using video).',
    ],
    quiz: [
      quizItem('q1', ['ມວນ 2 kg ເຄື່ອນທີ່ 3 m/s. ປະລິມານເດີນເຄື່ອນເທົ່າໃດ?', 'A 2 kg mass moves at 3 m/s. What is its momentum?'],
        [['1.5 kg·m/s', '1.5 kg·m/s'], ['6 kg·m/s', '6 kg·m/s'], ['18 kg·m/s', '18 kg·m/s']], 1, ['p = mv = 2 × 3 = 6 kg·m/s.', 'p = mv = 2 × 3 = 6 kg·m/s.']),
      quizItem('q2', ['2 kg ທີ່ 3 m/s ຕຳ 1 kg ທີ່ຢູ່ນິ້ງ ແລ້ວຕິດກັນ. ຄວາມໄວຫຼັງຕຳ?', 'A 2 kg cart at 3 m/s hits a 1 kg cart at rest and they stick. Final speed?'],
        [['1 m/s', '1 m/s'], ['2 m/s', '2 m/s'], ['3 m/s', '3 m/s']], 1, ['6 = (2 + 1)v ດັ່ງນັ້ນ v = 2 m/s.', '6 = (2 + 1)v so v = 2 m/s.']),
      quizItem('q3', ['ການຕຳກັນແບບບໍ່ຍືດຍຸ່ນ ອັນໃດຍັງຮັກສາຢູ່?', 'In an inelastic collision, which quantity is still conserved?'],
        [['ພະລັງງານເດີນເຄື່ອນ', 'Kinetic energy'], ['ປະລິມານເດີນເຄື່ອນ', 'Momentum'], ['ທັງສອງ', 'Both']], 1, ['ລະບົບໂດດດ່ຽວຮັກສາ p ສະເໝີ.', 'An isolated system always conserves p.']),
      quizItem('q4', ['ຖົງລົມນິລະໄພຫຼຸດແຮງກະທົບ ເພາະມັນ…', 'An airbag reduces the force because it…'],
        [['ເພີ່ມເວລາຕຳກັນ', 'lengthens the collision time'], ['ເພີ່ມມວນ', 'adds mass'], ['ຫຼຸດ Δp ໃຫ້ເປັນສູນ', 'makes Δp zero']], 0, ['F = Δp/Δt: Δt ຫຼາຍຂຶ້ນ F ນ້ອຍລົງ.', 'F = Δp/Δt: larger Δt gives smaller F.']),
    ],
  }),
  ready({
    id: 'p5-04',
    title: ['ແຮງງານ ແລະ ພະລັງງານ', 'Work and energy'],
    hours: 6,
    field: 'phys',
    minutes: 25,
    sim: 'pendulum',
    summary: [
      'ແຮງງານ W = Fs cos θ ປ່ຽນພະລັງງານຈາກຮູບໜຶ່ງໄປອີກຮູບໜຶ່ງ ແລະ ພະລັງງານກົນຈັກຮັກສາໄວ້ເມື່ອບໍ່ມີແຮງຝືດ.',
      'Work W = Fs cos θ transfers energy from one form to another, and mechanical energy is conserved when there is no friction.',
    ],
    objectives: [
      ['ໃຫ້ນິຍາມແຮງງານ W = Fs cos θ (J) ແລະ ກຳລັງ P = W/t (W)', 'Define work W = Fs cos θ (J) and power P = W/t (W)'],
      ['ຄິດໄລ່ພະລັງງານເດີນເຄື່ອນ ½mv² ແລະ ພະລັງງານທ່າຕັ້ງ mgh', 'Calculate kinetic energy ½mv² and potential energy mgh'],
      ['ໃຊ້ກົດເກນຮັກສາພະລັງງານກົນຈັກ ແກ້ເລກ', 'Use conservation of mechanical energy to solve problems'],
    ],
    keyIdeas: [
      ['ແຮງງານເກີດເມື່ອແຮງເຮັດໃຫ້ວັດຖຸເຄື່ອນຕາມທິດຂອງແຮງ', 'Work is done when a force moves an object along its direction'],
      ['ແຮງງານສຸດທິ = ການປ່ຽນແປງຂອງພະລັງງານເດີນເຄື່ອນ', 'Net work equals the change in kinetic energy'],
      ['ບໍ່ມີແຮງຝືດ: Eₖ + Eₚ ຄົງທີ່; ມີແຮງຝືດ ບາງສ່ວນກາຍເປັນຄວາມຮ້ອນ', 'Without friction Eₖ + Eₚ is constant; with friction some becomes heat'],
      ['ພະລັງງານບໍ່ຫາຍ ແຕ່ປ່ຽນຮູບ (ຮັກສາພະລັງງານລວມ)', 'Energy is not lost, only transformed (total energy is conserved)'],
    ],
    questions: [
      ['ຍົກກ່ອງ 10 kg ຂຶ້ນ 2 m ຕ້ອງເຮັດແຮງງານເທົ່າໃດ? (g = 9.8)', 'How much work lifts a 10 kg box 2 m? (g = 9.8)'],
      ['ເປັນຫຍັງຕຸ້ມຫ້ອຍໄປຕ່ຳສຸດແລ້ວຍັງໄປສູງເທົ່າເດີມໄດ້ ເມື່ອບໍ່ມີແຮງຝືດ?', 'Why does a frictionless pendulum return to the same height?'],
    ],
    activity: [
      'ປ່ອຍລົດເຄື່ອງຫຼີ້ນຈາກລະດັບຕ່າງກັນຕາມທາງຊັນ ແລ້ວວັດໄລຍະທີ່ມັນເລື່ອນຕໍ່ ແລະ ປຽບທຽບ.',
      'Release a toy car from different heights down a ramp and compare how far it slides afterwards.',
    ],
    quiz: [
      quizItem('q1', ['ຍົກກ່ອງ 10 kg ຂຶ້ນ 2 m. ແຮງງານເທົ່າໃດ? (g = 9.8 m/s²)', 'Lifting a 10 kg box by 2 m: how much work? (g = 9.8 m/s²)'],
        [['20 J', '20 J'], ['196 J', '196 J'], ['980 J', '980 J']], 1, ['W = mgh = 10 × 9.8 × 2 = 196 J.', 'W = mgh = 10 × 9.8 × 2 = 196 J.']),
      quizItem('q2', ['ມວນ 2 kg ເຄື່ອນທີ່ 3 m/s. ພະລັງງານເດີນເຄື່ອນເທົ່າໃດ?', 'A 2 kg mass moves at 3 m/s. What is its kinetic energy?'],
        [['6 J', '6 J'], ['9 J', '9 J'], ['18 J', '18 J']], 1, ['Eₖ = ½mv² = ½ × 2 × 9 = 9 J.', 'Eₖ = ½mv² = ½ × 2 × 9 = 9 J.']),
      quizItem('q3', ['ເຄື່ອງຈັກເຮັດແຮງງານ 600 J ໃນ 10 s. ກຳລັງເທົ່າໃດ?', 'A machine does 600 J of work in 10 s. What is its power?'],
        [['60 W', '60 W'], ['6000 W', '6000 W'], ['0.017 W', '0.017 W']], 0, ['P = W/t = 600/10 = 60 W.', 'P = W/t = 600/10 = 60 W.']),
      quizItem('q4', ['ຕຸ້ມຫ້ອຍບໍ່ມີແຮງຝືດ. ຢູ່ຈຸດຕ່ຳສຸດ ພະລັງງານໃດສູງສຸດ?', 'A frictionless pendulum: at the lowest point which energy is largest?'],
        [['ພະລັງງານທ່າຕັ້ງ', 'Potential energy'], ['ພະລັງງານເດີນເຄື່ອນ', 'Kinetic energy'], ['ຄວາມຮ້ອນ', 'Heat']], 1, ['Eₚ ປ່ຽນເປັນ Eₖ ທັງໝົດຢູ່ຈຸດຕ່ຳສຸດ.', 'Eₚ has all turned into Eₖ at the lowest point.']),
    ],
  }),
  ready({
    id: 'p5-05',
    title: ['ການເຄື່ອນທີ່ແບບຕ່າງໆໂດຍການກະທົບຂອງແຮງ', 'Motion under forces (projectile, incline, circle)'],
    hours: 14,
    field: 'phys',
    minutes: 35,
    sim: 'projectile',
    summary: [
      'ການເຄື່ອນທີ່ໂຄ້ງຂອງວັດຖຸທີ່ຖືກຍິງ ແຍກວິເຄາະໄດ້ເປັນແນວນອນຄວາມໄວຄົງທີ່ ແລະ ແນວຕັ້ງຄວາມເລັ່ງ g.',
      'Projectile motion can be analysed as constant velocity horizontally and acceleration g vertically.',
    ],
    objectives: [
      ['ໃຊ້ກົດເກນຂອງ Newton ກັບການເຄື່ອນທີ່ຕາມລວງນອນ, ລວງຕັ້ງ ແລະ ພື້ນຊັນ', "Apply Newton's laws to motion on horizontal, vertical and inclined paths"],
      ['ວິເຄາະການເຄື່ອນທີ່ໂຄ້ງຂອງວັດຖຸທີ່ຖືກຍິງເປັນມຸມ ໂດຍແຍກແນວນອນ ແລະ ແນວຕັ້ງ', 'Analyse projectile motion by separating horizontal and vertical parts'],
      ['ອະທິບາຍການເຄື່ອນທີ່ມົນສະເໝີ ແລະ ແຮງເຂົ້າສູນ', 'Explain uniform circular motion and the centripetal force'],
    ],
    keyIdeas: [
      ['ແນວນອນ: ຄວາມໄວຄົງທີ່ vₓ = v₀ cos θ; ແນວຕັ້ງ: ຄວາມເລັ່ງ g ລົງ', 'Horizontal: constant vₓ = v₀ cos θ; vertical: acceleration g downward'],
      ['ໄລຍະໄກ R = v₀² sin 2θ / g (ຈຸດຍິງ ແລະ ຈຸດຕົກລະດັບດຽວກັນ) ສູງສຸດທີ່ 45°', 'Range R = v₀² sin 2θ / g (same launch and landing level), maximum at 45°'],
      ['ເທິງພື້ນຊັນ ອົງປະກອບຂອງນ້ຳໜັກຕາມພື້ນຊັນແມ່ນ mg sin θ', 'On an incline the component of weight along the slope is mg sin θ'],
      ['ການເຄື່ອນທີ່ມົນ: ຄວາມເລັ່ງເຂົ້າສູນ a = v²/r ແລະ ແຮງເຂົ້າສູນ F = mv²/r ຊີ້ເຂົ້າຈຸດໃຈກາງ', 'Circular motion: centripetal acceleration a = v²/r and force F = mv²/r point to the centre'],
    ],
    questions: [
      ['ບານທີ່ຍິງອອກຕາມລວງນອນ ແລະ ບານທີ່ປ່ອຍຕົກຈາກຄວາມສູງດຽວກັນ ເປັນຫຍັງຖືກພື້ນພ້ອມກັນ?', 'Why does a ball fired horizontally land together with a ball dropped from the same height?'],
      ['ລົດເລັ້ຽວໂຄ້ງ ແຮງໃດເຮັດໃຫ້ລົດເຄື່ອນຕາມໂຄ້ງ?', 'What force keeps a car on a curved road? (friction toward the centre)'],
    ],
    activity: [
      'ໂຍນບານໃສ່ມຸມ 30°, 45°, 60° ແລ້ວວັດໄລຍະ ປຽບທຽບກັບທິດສະດີ.',
      'Throw a ball at 30°, 45° and 60° and compare the distances with theory.',
    ],
    quiz: [
      quizItem('q1', ['ມຸມຍິງໃດ ໃຫ້ໄລຍະໄກສູງສຸດ (ຈຸດຍິງ ແລະ ຈຸດຕົກລະດັບດຽວກັນ, ບໍ່ຄິດອາກາດ)?', 'Which launch angle gives the greatest range (same level, no air resistance)?'],
        [['30°', '30°'], ['45°', '45°'], ['60°', '60°']], 1, ['R ∝ sin 2θ ສູງສຸດເມື່ອ 2θ = 90°.', 'R ∝ sin 2θ is largest when 2θ = 90°.']),
      quizItem('q2', ['v₀ = 20 m/s ຍິງທີ່ 30°. ໄລຍະໄກໃກ້ຄຽງ? (g = 9.8 m/s², sin 60° = 0.87)', 'v₀ = 20 m/s at 30°. About what range? (g = 9.8 m/s², sin 60° = 0.87)'],
        [['18 m', '18 m'], ['35 m', '35 m'], ['41 m', '41 m']], 1, ['R = 400 × 0.87 / 9.8 ≈ 35 m.', 'R = 400 × 0.87 / 9.8 ≈ 35 m.']),
      quizItem('q3', ['ມວນ 1000 kg ແລ່ນ 10 m/s ໃນໂຄ້ງ r = 50 m. ແຮງເຂົ້າສູນເທົ່າໃດ?', 'A 1000 kg car at 10 m/s on a curve of r = 50 m. What is the centripetal force?'],
        [['200 N', '200 N'], ['2000 N', '2000 N'], ['20 000 N', '20 000 N']], 1, ['F = mv²/r = 1000 × 100 / 50 = 2000 N.', 'F = mv²/r = 1000 × 100 / 50 = 2000 N.']),
      quizItem('q4', ['ໃນການເຄື່ອນທີ່ໂຄ້ງຂອງວັດຖຸທີ່ຖືກຍິງ (ບໍ່ຄິດອາກາດ) ອົງປະກອບແນວນອນຂອງຄວາມໄວ…', 'In projectile motion (no air resistance) the horizontal component of velocity…'],
        [['ຄົງທີ່', 'stays constant'], ['ເພີ່ມຂຶ້ນ', 'increases'], ['ຫຼຸດລົງ', 'decreases']], 0, ['ບໍ່ມີແຮງໃນແນວນອນ.', 'There is no horizontal force.']),
    ],
  }),
  ready({
    id: 'p5-06',
    title: ['ການດຸນດ່ຽງ (ສະຖິດສາດ)', 'Equilibrium (statics)'],
    hours: 10,
    field: 'phys',
    minutes: 30,
    summary: [
      'ວັດຖຸຢູ່ໃນການດຸນດ່ຽງເມື່ອແຮງລວມ ΣF = 0 ແລະ ໂມເມັນລວມ Στ = 0.',
      'An object is in equilibrium when the net force ΣF = 0 and the net moment Στ = 0.',
    ],
    objectives: [
      ['ໃຫ້ນິຍາມໂມເມັນຂອງແຮງ ແລະ ບອກເງື່ອນໄຂການດຸນດ່ຽງ', 'Define the moment of a force and state the conditions of equilibrium'],
      ['ຫາຈຸດຖ່ວງໜັກຂອງວັດຖຸດ້ວຍການທົດລອງ', 'Find the centre of gravity of an object by experiment'],
      ['ອະທິບາຍການດຸນດ່ຽງຄົງຕົວ, ບໍ່ຄົງຕົວ ແລະ ບໍ່ເລືອກທີ່', 'Explain stable, unstable and neutral equilibrium'],
    ],
    keyIdeas: [
      ['ເງື່ອນໄຂ: ΣF = 0 ແລະ ໂມເມັນລວມ Στ = 0', 'Conditions: ΣF = 0 and total moment Στ = 0'],
      ['ໂມເມັນ τ = F × d (d ແມ່ນໄລຍະຕັ້ງສາກຈາກຈຸດໝູນ)', 'Moment τ = F × d (d is the perpendicular distance from the pivot)'],
      ['ຈຸດຖ່ວງໜັກຕ່ຳ ແລະ ຖານກວ້າງ ເຮັດໃຫ້ມັນຄົງຕົວ', 'A low centre of gravity and a wide base make an object stable'],
      ['ຄູ່ແຮງ (couple) ເຮັດໃຫ້ວັດຖຸໝູນ ໂດຍບໍ່ເຮັດໃຫ້ມັນເຄື່ອນຍ້າຍ', 'A couple makes an object rotate without translating it'],
    ],
    questions: [
      ['ແຮງ 40 N ຢູ່ຫ່າງຈຸດໝູນ 0.25 m ສົມດຸນກັບແຮງ 20 N ຢູ່ຫ່າງເທົ່າໃດ?', 'A 40 N force 0.25 m from the pivot balances a 20 N force how far away?'],
      ['ເປັນຫຍັງລົດບັນທຸກທີ່ເຕັມຊັ້ນເທິງຈຶ່ງລົ້ມງ່າຍ?', 'Why does a top-heavy truck tip over easily?'],
    ],
    activity: [
      'ດຸນໄມ້ບັນທັດເທິງດິນສໍ ແລະ ວາງເງິນຫຼຽນຕ່າງກັນສອງຂ້າງ ຫາຕຳແໜ່ງທີ່ດຸນ.',
      'Balance a ruler on a pencil with different coins on each side and find the balance positions.',
    ],
    quiz: [
      quizItem('q1', ['ແຮງ 40 N ຢູ່ຫ່າງຈຸດໝູນ 0.25 m. ໂມເມັນເທົ່າໃດ?', 'A 40 N force acts 0.25 m from the pivot. What is the moment?'],
        [['10 N·m', '10 N·m'], ['160 N·m', '160 N·m'], ['0.006 N·m', '0.006 N·m']], 0, ['τ = Fd = 40 × 0.25 = 10 N·m.', 'τ = Fd = 40 × 0.25 = 10 N·m.']),
      quizItem('q2', ['ແຮງ 20 N ຕ້ອງຢູ່ຫ່າງຈຸດໝູນເທົ່າໃດ ເພື່ອດຸນກັບ 10 N·m?', 'How far from the pivot must a 20 N force act to balance 10 N·m?'],
        [['0.25 m', '0.25 m'], ['0.50 m', '0.50 m'], ['2.0 m', '2.0 m']], 1, ['d = τ/F = 10/20 = 0.50 m.', 'd = τ/F = 10/20 = 0.50 m.']),
      quizItem('q3', ['ຈຸດຖ່ວງໜັກຕ່ຳ ແລະ ຖານກວ້າງ ເຮັດໃຫ້ວັດຖຸ…', 'A low centre of gravity and a wide base make an object…'],
        [['ຄົງຕົວຂຶ້ນ', 'more stable'], ['ລົ້ມງ່າຍຂຶ້ນ', 'easier to topple'], ['ເບົາລົງ', 'lighter']], 0, ['ຕ້ອງເອນຫຼາຍກ່ອນຈຸດຖ່ວງຈະອອກນອກຖານ.', 'It must tilt far before the centre of gravity leaves the base.']),
    ],
  }),
  ready({
    id: 'p5-07',
    title: ['ການປ່ຽນແປງຂອງວັດຖຸ ຍ້ອນຄວາມຮ້ອນ', 'Heat and changes of matter'],
    hours: 10,
    field: 'phys',
    minutes: 30,
    sim: 'states',
    summary: [
      'ຄວາມຮ້ອນເປັນພະລັງງານທີ່ໄຫຼຈາກຮ້ອນໄປເຢັນ ແລະ ຄິດໄລ່ດ້ວຍ Q = mcΔT ຫຼື Q = mL ເມື່ອປ່ຽນພາວະ.',
      'Heat is energy flowing from hot to cold, calculated with Q = mcΔT, or Q = mL during a change of state.',
    ],
    objectives: [
      ['ແຍກຄວາມຮ້ອນ ອອກຈາກອຸນຫະພູມ ແລະ ອະທິບາຍດ້ວຍທິດສະດີເດີນເຄື່ອນໃນເລກຸນ', 'Distinguish heat from temperature using the kinetic theory'],
      ['ຄິດໄລ່ປະລິມານຄວາມຮ້ອນ Q = mcΔT ແລະ ຄວາມຮ້ອນແຝງ Q = mL', 'Calculate heat Q = mcΔT and latent heat Q = mL'],
      ['ອະທິບາຍການຢືດຕົວຍ້ອນຄວາມຮ້ອນ ແລະ ການປ່ຽນພາວະຂອງວັດຖຸ', 'Explain thermal expansion and changes of state'],
    ],
    keyIdeas: [
      ['ອຸນຫະພູມ ແມ່ນພະລັງງານເດີນເຄື່ອນສະເລ່ຍຂອງເລກຸນ; K = °C + 273', 'Temperature reflects the average kinetic energy of molecules; K = °C + 273'],
      ['ຄວາມຮ້ອນໄຫຼຈາກຮ້ອນໄປເຢັນ ດ້ວຍການນຳ, ການພາ ແລະ ການແຜ່ລັງສີ', 'Heat flows from hot to cold by conduction, convection and radiation'],
      ['ນ້ຳ c ≈ 4200 J/(kg·K); ການລະລາຍ L ≈ 334 kJ/kg; ການກາຍເປັນໄອ L ≈ 2260 kJ/kg', 'Water c ≈ 4200 J/(kg·K); fusion L ≈ 334 kJ/kg; vaporisation L ≈ 2260 kJ/kg'],
      ['ໃນຂະນະປ່ຽນພາວະ ອຸນຫະພູມຄົງທີ່ ທັງທີ່ຍັງເພີ່ມຄວາມຮ້ອນ', 'During a change of state temperature stays constant while heat is added'],
    ],
    questions: [
      ['ຕ້ອງໃຊ້ຄວາມຮ້ອນເທົ່າໃດ ເພື່ອເຮັດໃຫ້ນ້ຳ 1 kg ຈາກ 20 °C ເປັນ 80 °C?', 'How much heat warms 1 kg of water from 20 °C to 80 °C?'],
      ['ເປັນຫຍັງໄອນ້ຳຮ້ອນລວກຫຼາຍກວ່ານ້ຳເດືອດທີ່ 100 °C?', 'Why does steam scald more than boiling water at 100 °C? (latent heat released)'],
    ],
    activity: [
      'ຕົ້ມນ້ຳ ບັນທຶກອຸນຫະພູມທຸກນາທີ ແລະ ແຕ້ມກຣາຟ ຫາຈຸດເດືອດ.',
      'Heat water, record the temperature each minute, plot it and find the boiling point.',
    ],
    quiz: [
      quizItem('q1', ['ນ້ຳ 1 kg ຈາກ 20 °C ເປັນ 80 °C ໃຊ້ຄວາມຮ້ອນເທົ່າໃດ? (c = 4200 J/(kg·K))', 'How much heat warms 1 kg of water from 20 °C to 80 °C? (c = 4200 J/(kg·K))'],
        [['84 kJ', '84 kJ'], ['252 kJ', '252 kJ'], ['420 kJ', '420 kJ']], 1, ['Q = mcΔT = 1 × 4200 × 60 = 252 000 J.', 'Q = mcΔT = 1 × 4200 × 60 = 252 000 J.']),
      quizItem('q2', ['ນ້ຳກ້ອນ 0.5 kg ທີ່ 0 °C ລະລາຍໝົດ ໃຊ້ຄວາມຮ້ອນເທົ່າໃດ? (L = 334 kJ/kg)', 'How much heat melts 0.5 kg of ice at 0 °C? (L = 334 kJ/kg)'],
        [['167 kJ', '167 kJ'], ['334 kJ', '334 kJ'], ['668 kJ', '668 kJ']], 0, ['Q = mL = 0.5 × 334 = 167 kJ.', 'Q = mL = 0.5 × 334 = 167 kJ.']),
      quizItem('q3', ['ໃນຂະນະນ້ຳກຳລັງຕົ້ມທີ່ 100 °C ແລະ ຍັງໃຫ້ຄວາມຮ້ອນຢູ່ ອຸນຫະພູມ…', 'While water boils at 100 °C and heat is still supplied, its temperature…'],
        [['ຄົງທີ່', 'stays constant'], ['ສູງຂຶ້ນ', 'rises'], ['ຕ່ຳລົງ', 'falls']], 0, ['ຄວາມຮ້ອນໃຊ້ໄປຫັກພັນທະລະຫວ່າງເລກຸນ ບໍ່ເພີ່ມອຸນຫະພູມ.', 'The heat goes into separating the molecules, not into raising T.']),
      quizItem('q4', ['27 °C ເທົ່າກັບກີ່ K?', 'What is 27 °C in kelvin?'],
        [['246 K', '246 K'], ['300 K', '300 K'], ['27 K', '27 K']], 1, ['K = °C + 273 = 300 K.', 'K = °C + 273 = 300 K.']),
    ],
  }),
]
