import type { L } from '../../i18n/strings'
import type { Field, LessonDef, QuizItem, SimKey, SimProps } from './types'

// Natural science M.3 (Grade 8), lower-secondary curriculum 2010. 9 topics, 165 h. All ready.
// Lao text is an AI draft; the whole file is subject to teacher review.
// REVIEW terms: ແຮງງານ (work), ກຳລັງ (power), ພະລັງງານກົນຈັກ (mechanical energy), ພະລັງງານເດີນເຄື່ອນ (kinetic),
//   ພະລັງງານທ່າຕັ້ງ (potential), ປະລິມານເດີນເຄື່ອນ (momentum), ເຄື່ອງຕ່ອນແຮງ (simple machine),
//   ຄວາມຈຸຄວາມຮ້ອນຈຳເພາະ (specific heat capacity), ປະລິມານຄວາມຮ້ອນ (quantity of heat),
//   ເຄື່ອງຈັກຄວາມຮ້ອນ (heat engine), ໄຟຟ້າສະຖິດ (static electricity), ປະຈຸໄຟຟ້າ (charge),
//   ຄວາມຕ່າງລະດັບໄຟຟ້າ / ແຮງດັນ (potential difference / voltage), ຕົວນຳ / ຕົວກັນໄຟຟ້າ (conductor / insulator),
//   ຄວາມຮ້ອນແຝງ(ຈຳເພາະ) (latent heat), ການຫຼອມແຫຼວ (melting), ການແຂງຕົວ (freezing), ການລະເຫີຍ (evaporation),
//   ການກັ່ນຕົວ (condensation), ແສງເລຂາ (geometric optics), ແວ່ນກົ່ງ (curved mirror; curriculum words ສວດ/ຫຼຸບ
//   mapped to ແວ່ນເວ້າ concave / ແວ່ນນູນ convex is an ASSUMPTION), ຈຸດໂຟກັສ (focus), ຈຸດສູນກາງຄວາມໂຄ້ງ,
//   ຮູບຈິງ / ຮູບລວງ (real / virtual image), ຮໍໂມນ (hormone), ອະນຸພາກ (particle), ທາດ (element),
//   ທາດປະສົມ (compound), ສົມປົນ (mixture), ເຣຕີນາ (retina), ສິ່ງກະຕຸ້ນ (stimulus), ສິ່ງເສບຕິດ (addictive substance),
//   ຈັນທະຄາຕ / ສຸລິຍະຄາຕ (lunar / solar eclipse), ແກນໂລກ (Earth's axis), ເຟສດວງຈັນ (moon phase).

type P = [lo: string, en: string]
const t = ([lo, en]: P): L => ({ lo, en })

interface Body {
  summary: P
  objectives: P[]
  keyIdeas: P[]
  questions: [P, P]
  activity: P
  minutes: number
  /** [question, options, answer index, explanation] */
  quiz: [P, P[], number, P][]
  sim?: SimKey
  simProps?: SimProps
}

function lesson(order: number, title: P, hours: number, field: Field, b: Body): LessonDef {
  const quiz: QuizItem[] = b.quiz.map(([q, options, answer, why], i) => ({
    id: `q${i + 1}`,
    q: t(q),
    options: options.map(t),
    answer,
    why: t(why),
  }))
  return {
    id: `m3-${String(order).padStart(2, '0')}`,
    grade: 'm3',
    order,
    title: t(title),
    hours,
    field,
    status: 'ready',
    summary: t(b.summary),
    objectives: b.objectives.map(t),
    keyIdeas: b.keyIdeas.map(t),
    questions: [t(b.questions[0]), t(b.questions[1])],
    activity: t(b.activity),
    minutes: b.minutes,
    quiz,
    ...(b.sim ? { sim: b.sim } : {}),
    ...(b.simProps ? { simProps: b.simProps } : {}),
  }
}

export const m3: LessonDef[] = [
  lesson(1, ['ລະບົບຕ່າງໆໃນຮ່າງກາຍຄົນ', 'Human body systems'], 23, 'bio', {
    summary: [
      'ຮ່າງກາຍຄົນປະກອບດ້ວຍຫຼາຍລະບົບທີ່ເຮັດວຽກຮ່ວມກັນ: ຍ່ອຍອາຫານ, ໝູນວຽນເລືອດ, ຫາຍໃຈ, ຖ່າຍເທ ແລະ ອື່ນໆ.',
      'The human body is made of several systems that work together: digestive, circulatory, respiratory, excretory and others.',
    ],
    objectives: [
      [
        'ບອກໂຄງສ້າງ ແລະ ໜ້າທີ່ຂອງລະບົບຫຸ້ມຫໍ່, ເໜັງຕຶງ, ຍ່ອຍອາຫານ, ໝູນວຽນເລືອດ, ຫາຍໃຈ ແລະ ຖ່າຍເທ',
        'State the structure and function of the covering, movement, digestive, circulatory, respiratory and excretory systems',
      ],
      [
        'ອະທິບາຍການຍ່ອຍ ແລະ ດູດຊຶມອາຫານ, ການໝູນວຽນເລືອດ ແລະ ການແລກປ່ຽນກາສ',
        'Explain digestion and absorption, blood circulation and gas exchange',
      ],
      ['ບອກຄວາມໝາຍຂອງຮໍໂມນ', 'Define hormones'],
      [
        'ອະທິບາຍພະຍາດ ແລະ ການຮັກສາສຸຂະພາບຂອງແຕ່ລະລະບົບ',
        'Explain diseases and how to care for the health of each system',
      ],
    ],
    keyIdeas: [
      [
        'ຫົວໃຈມີ 4 ຫ້ອງ ສູບເລືອດໄປປອດ ແລະ ໄປທົ່ວຮ່າງກາຍ.',
        'The heart has 4 chambers and pumps blood to the lungs and to the whole body.',
      ],
      [
        'ອາຫານຖືກຍ່ອຍຕັ້ງແຕ່ປາກ → ກະເພາະ → ລຳໄສ້ນ້ອຍ (ດູດຊຶມສານອາຫານເຂົ້າເລືອດ).',
        'Food is digested from the mouth → stomach → small intestine (nutrients are absorbed into the blood).',
      ],
      [
        'ອົກຊີແຊນ ແລະ CO₂ ແລກປ່ຽນກັນທີ່ຖົງລົມນ້ອຍ (alveoli) ໃນປອດ.',
        'Oxygen and CO₂ are exchanged in the tiny air sacs (alveoli) of the lungs.',
      ],
      [
        'ໝາກໄຂ່ຫຼັງກອງຂອງເສຍອອກຈາກເລືອດ ແລ້ວຖ່າຍອອກເປັນຍ່ຽວ.',
        'The kidneys filter waste out of the blood and remove it as urine.',
      ],
      [
        'ຮໍໂມນເປັນສານເຄມີທີ່ຄວບຄຸມການເຮັດວຽກຂອງຮ່າງກາຍ.',
        'Hormones are chemical messengers that control body functions.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງຫົວໃຈເຕັ້ນໄວຂຶ້ນເມື່ອອອກກຳລັງກາຍ?', 'Why does the heart rate rise during exercise?'],
      ['ການສູບຢາ ມີຜົນຕໍ່ລະບົບຫາຍໃຈແນວໃດ?', 'How does smoking affect the respiratory system?'],
    ],
    activity: [
      'ວັດຊີບພະຈອນ ກ່ອນ ແລະ ຫຼັງ ແລ່ນຢູ່ກັບທີ່ 1 ນາທີ ແລ້ວແຕ້ມກຣາຟປຽບທຽບ.',
      'Measure the pulse before and after 1 minute of jogging on the spot, then draw a graph to compare.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ບ່ອນໃດໃນລະບົບຍ່ອຍອາຫານທີ່ສານອາຫານຖືກດູດຊຶມເຂົ້າເລືອດເປັນສ່ວນໃຫຍ່?', 'Where in the digestive system are most nutrients absorbed into the blood?'],
        [
          ['ກະເພາະອາຫານ', 'The stomach'],
          ['ລຳໄສ້ນ້ອຍ', 'The small intestine'],
          ['ປາກ', 'The mouth'],
        ],
        1,
        ['ລຳໄສ້ນ້ອຍຍາວ ແລະ ມີພື້ນຜິວດ້ານໃນຫຼາຍ ຈຶ່ງດູດຊຶມສານອາຫານໄດ້ດີ.', 'The small intestine is long with a large inner surface, so it absorbs nutrients well.'],
      ],
      [
        ['ການແລກປ່ຽນກາສຢູ່ປອດເກີດຂຶ້ນຢູ່ບ່ອນໃດ?', 'Where does gas exchange in the lungs take place?'],
        [
          ['ທີ່ຖົງລົມນ້ອຍ (alveoli)', 'In the alveoli (tiny air sacs)'],
          ['ທີ່ຫຼອດລົມໃຫຍ່', 'In the windpipe'],
          ['ທີ່ໝາກໄຂ່ຫຼັງ', 'In the kidneys'],
        ],
        0,
        ['ຖົງລົມນ້ອຍມີຝາບາງ ແລະ ມີເສັ້ນເລືອດຝອຍຫຸ້ມ ຈຶ່ງແລກປ່ຽນ O₂ ກັບ CO₂ ໄດ້.', 'Alveoli have thin walls wrapped in capillaries, so O₂ and CO₂ can be exchanged.'],
      ],
      [
        ['ອະໄວຍະວະໃດກອງຂອງເສຍອອກຈາກເລືອດ?', 'Which organ filters waste out of the blood?'],
        [
          ['ຫົວໃຈ', 'The heart'],
          ['ປອດ', 'The lungs'],
          ['ໝາກໄຂ່ຫຼັງ', 'The kidneys'],
        ],
        2,
        ['ໝາກໄຂ່ຫຼັງກອງເລືອດ ແລະ ຜະລິດຍ່ຽວ.', 'The kidneys filter the blood and make urine.'],
      ],
      [
        ['ຮໍໂມນແມ່ນຫຍັງ?', 'What is a hormone?'],
        [
          ['ສານເຄມີທີ່ຄວບຄຸມການເຮັດວຽກຂອງຮ່າງກາຍ', 'A chemical messenger that controls body functions'],
          ['ສ່ວນໜຶ່ງຂອງກະດູກ', 'A part of a bone'],
          ['ເຊື້ອພະຍາດ', 'A germ that causes disease'],
        ],
        0,
        ['ຮໍໂມນຖືກສ້າງໂດຍຕ່ອມ ແລະ ສົ່ງໄປທາງເລືອດ.', 'Hormones are made by glands and carried in the blood.'],
      ],
    ],
  }),

  lesson(2, ['ການປະກອບສ້າງເປັນວັດຖຸ ແລະ ທາດຕ່າງໆ', 'Composition of matter and elements'], 20, 'chem', {
    summary: [
      'ວັດຖຸທຸກຢ່າງປະກອບດ້ວຍອະນຸພາກນ້ອຍໆ ທີ່ເຄື່ອນທີ່ຢູ່ສະເໝີ. ອາໂຕມເຊື່ອມກັນເປັນໂມເລກຸນ, ທາດ ແລະ ທາດປະສົມ.',
      'All matter is made of tiny particles that are always moving. Atoms join to form molecules, elements and compounds.',
    ],
    objectives: [
      ['ຢັ້ງຢືນວ່າວັດຖຸປະກອບດ້ວຍອະນຸພາກນ້ອຍໆ ທີ່ເຄື່ອນທີ່ຢູ່ສະເໝີ', 'Show that matter consists of tiny particles that are always moving'],
      ['ຈຳແນກແຂງ, ແຫຼວ ແລະ ກາສ ຕາມການຈັດລຽງຂອງອະນຸພາກ', 'Distinguish solid, liquid and gas by particle arrangement'],
      [
        'ບອກຄວາມໝາຍ ອາໂຕມ, ໂມເລກຸນ, ທາດ, ທາດປະສົມ ແລະ ສົມປົນ',
        'Define atom, molecule, element, compound and mixture',
      ],
      [
        'ບອກສັນຍາລັກຂອງທາດຈາກຕາຕະລາງທາດ ແລະ ແຍກໂລຫະ ກັບ ອາໂລຫະ',
        'Give element symbols from the periodic table and separate metals from non-metals',
      ],
    ],
    keyIdeas: [
      [
        'ອາໂຕມຄືອະນຸພາກນ້ອຍສຸດຂອງທາດ ທີ່ຍັງມີຄຸນສົມບັດຂອງທາດນັ້ນ.',
        'An atom is the smallest particle of an element that still has the properties of that element.',
      ],
      [
        'ໂມເລກຸນ = ອາໂຕມຕັ້ງແຕ່ 2 ໂຕຂຶ້ນໄປເຊື່ອມກັນ (H₂O, O₂, CO₂).',
        'A molecule = two or more atoms joined together (H₂O, O₂, CO₂).',
      ],
      [
        'ທາດ (element) ມີອາໂຕມຊະນິດດຽວ; ທາດປະສົມ (compound) ເຊື່ອມທາງເຄມີ; ສົມປົນ (mixture) ບໍ່ໄດ້ເຊື່ອມທາງເຄມີ.',
        'Element: one kind of atom; compound: different atoms chemically combined; mixture: substances not chemically combined.',
      ],
      [
        'ແຂງ: ອະນຸພາກຈັດລຽງແໜ້ນ ສັ່ນຢູ່ທີ່; ແຫຼວ: ເລື່ອນຜ່ານກັນ; ກາສ: ຢູ່ຫ່າງກັນ ເຄື່ອນທີ່ອິດສະຫຼະ.',
        'Solid: particles packed and vibrating in place; liquid: particles slide past each other; gas: particles far apart and moving freely.',
      ],
      ['ສັນຍາລັກທາດ: H, C, O, Na, Fe, Cu ...', 'Element symbols: H, C, O, Na, Fe, Cu ...'],
    ],
    questions: [
      ['NaCl ແລະ ນ້ຳເກືອ ຕ່າງກັນແນວໃດ?', 'How does NaCl differ from salt water?'],
      ['ເປັນຫຍັງນ້ຳຕານລະລາຍໃນນ້ຳແລ້ວເບິ່ງບໍ່ເຫັນ?', 'Why does sugar seem to disappear in water?'],
    ],
    activity: [
      'ສ້າງແບບຈຳລອງໂມເລກຸນ H₂O, O₂, CO₂ ດ້ວຍດິນເໜຽວສີ ແລ້ວຈັດວ່າເປັນທາດ ຫຼື ທາດປະສົມ. ເປີດເຄື່ອງມືຕາຕະລາງທາດ (#/periodic-table) ເພື່ອຫາສັນຍາລັກ.',
      'Build H₂O, O₂ and CO₂ molecules with coloured clay and classify each as an element or a compound. Use the periodic table tool (#/periodic-table) to find symbols.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ສານໃດເປັນທາດປະສົມ (compound)?', 'Which substance is a compound?'],
        [
          ['O₂', 'O₂'],
          ['H₂O', 'H₂O'],
          ['Fe', 'Fe'],
        ],
        1,
        ['H₂O ມີອາໂຕມ 2 ຊະນິດ (H ແລະ O) ເຊື່ອມທາງເຄມີ. O₂ ແລະ Fe ມີອາໂຕມຊະນິດດຽວ.', 'H₂O has two kinds of atoms (H and O) chemically combined. O₂ and Fe contain one kind of atom.'],
      ],
      [
        ['ອະນຸພາກຂອງກາສ ຕ່າງຈາກຂອງແຂງແນວໃດ?', 'How are the particles of a gas different from those of a solid?'],
        [
          ['ຢູ່ຫ່າງກັນ ແລະ ເຄື່ອນທີ່ອິດສະຫຼະ', 'Far apart and moving freely'],
          ['ຢູ່ແໜ້ນ ແລະ ບໍ່ເຄື່ອນທີ່ເລີຍ', 'Packed tightly and not moving at all'],
          ['ມີຂະໜາດໃຫຍ່ກວ່າ', 'Larger in size'],
        ],
        0,
        ['ອະນຸພາກຂອງກາສຢູ່ຫ່າງກັນ ຈຶ່ງເຕັມພາຊະນະ. ອະນຸພາກຂອງແຂງກໍເຄື່ອນທີ່ຄືກັນ ແຕ່ສັ່ນຢູ່ທີ່.', 'Gas particles are far apart so the gas fills its container. Solid particles also move, but only vibrate in place.'],
      ],
      [
        ['ສັນຍາລັກ Na ແມ່ນທາດໃດ?', 'Which element has the symbol Na?'],
        [
          ['ໄນໂຕຣແຊນ', 'Nitrogen'],
          ['ໂຊດຽມ', 'Sodium'],
          ['ນິກເກິນ', 'Nickel'],
        ],
        1,
        ['Na ມາຈາກຊື່ລາຕິນ natrium ຄື ໂຊດຽມ. ໄນໂຕຣແຊນ ແມ່ນ N.', 'Na comes from the Latin name natrium, i.e. sodium. Nitrogen is N.'],
      ],
      [
        ['ນ້ຳເກືອ (ເກືອລະລາຍໃນນ້ຳ) ເປັນຫຍັງ?', 'What is salt water (salt dissolved in water)?'],
        [
          ['ທາດ', 'An element'],
          ['ທາດປະສົມ', 'A compound'],
          ['ສົມປົນ', 'A mixture'],
        ],
        2,
        ['ເກືອ ແລະ ນ້ຳ ປະສົມກັນໂດຍບໍ່ໄດ້ເຊື່ອມທາງເຄມີ ຈຶ່ງເປັນສົມປົນ ແລະ ແຍກຄືນໄດ້ ເຊັ່ນ ໂດຍການລະເຫີຍນ້ຳ.', 'Salt and water are mixed but not chemically combined, so it is a mixture and can be separated again, e.g. by evaporating the water.'],
      ],
    ],
  }),

  lesson(3, ['ແຮງງານ ແລະ ພະລັງງານກົນຈັກ', 'Work and mechanical energy'], 22, 'phys', {
    sim: 'pendulum',
    summary: [
      'ແຮງງານຄືແຮງ × ໄລຍະທີ່ວັດຖຸເຄື່ອນໄປຕາມທິດຂອງແຮງ. ພະລັງງານກົນຈັກ (ເດີນເຄື່ອນ + ທ່າຕັ້ງ) ຄົງທີ່ ຖ້າບໍ່ມີຄວາມຝືດ.',
      'Work is force × distance moved along the force. Mechanical energy (kinetic + potential) stays constant when there is no friction.',
    ],
    objectives: [
      ['ບອກຄວາມໝາຍຂອງແຮງງານທາງຟີຊິກ ແລະ ຄວາມຕ່າງຈາກຄຳວ່າ "ງານ" ໃນຊີວິດປະຈຳວັນ', 'Define work in physics and how it differs from everyday "work"'],
      ['ອະທິບາຍວ່າເຄື່ອງຕ່ອນແຮງຊ່ວຍຫຼຸດແຮງ ແຕ່ບໍ່ຫຼຸດແຮງງານ', 'Explain that simple machines reduce force but not work'],
      [
        'ເຂົ້າໃຈ ກຳລັງ, ປະລິມານເດີນເຄື່ອນ, ພະລັງງານທ່າຕັ້ງ ແລະ ພະລັງງານເດີນເຄື່ອນ',
        'Understand power, momentum, potential energy and kinetic energy',
      ],
      ['ອະທິບາຍການຮັກສາພະລັງງານກົນຈັກ ແລະ ແກ້ບັນຫາຄິດໄລ່', 'Explain conservation of mechanical energy and solve calculation problems'],
    ],
    keyIdeas: [
      ['ແຮງງານ W = F × s (ໜ່ວຍ J). ກຳລັງ P = W ÷ t (ໜ່ວຍ W).', 'Work W = F × s (joule, J). Power P = W ÷ t (watt, W).'],
      [
        'ພະລັງງານເດີນເຄື່ອນ Ek = ½mv²; ພະລັງງານທ່າຕັ້ງ Ep = mgh; ປະລິມານເດີນເຄື່ອນ p = mv.',
        'Kinetic energy Ek = ½mv²; potential energy Ep = mgh; momentum p = mv.',
      ],
      [
        'ເມື່ອບໍ່ມີຄວາມຝືດ Ek + Ep ຄົງທີ່: ຕຸ້ມຫ້ອຍມີ Ek ສູງສຸດຢູ່ຈຸດຕ່ຳສຸດ ແລະ Ep ສູງສຸດຢູ່ປາຍສຸດ.',
        'Without friction Ek + Ep stays constant: a pendulum has maximum Ek at the bottom and maximum Ep at the ends.',
      ],
      [
        'ເຄື່ອງຕ່ອນແຮງ (ຄານ, ລໍ້ເລື່ອນ) ຫຼຸດແຮງທີ່ຕ້ອງໃຊ້ ແຕ່ບໍ່ຫຼຸດແຮງງານ.',
        'Simple machines (levers, pulleys) reduce the force needed, not the work.',
      ],
      [
        'ເມື່ອມີຄວາມຝືດ (ອາກາດ) ພະລັງງານກົນຈັກບາງສ່ວນປ່ຽນເປັນຄວາມຮ້ອນ ແຕ່ພະລັງງານລວມຍັງຄົງທີ່.',
        'With friction (air) some mechanical energy becomes heat, but total energy is still conserved.',
      ],
    ],
    questions: [
      ['ຍົກກ່ອງ 10 kg ຂຶ້ນສູງ 2 m ເຮັດແຮງງານເທົ່າໃດ? (g = 9.8 m/s²)', 'Lifting a 10 kg box by 2 m: how much work is done? (g = 9.8 m/s²; answer 196 J)'],
      ['ເປັນຫຍັງຕຸ້ມຫ້ອຍຈຶ່ງຢຸດຫຼັງຈາກແກວ່ງດົນໆ?', 'Why does a swing or pendulum eventually stop?'],
    ],
    activity: [
      'ເຮັດຕຸ້ມຫ້ອຍດ້ວຍເຊືອກ ແລະ ກ້ອນຫີນນ້ອຍ ປ່ອຍຈາກຄວາມສູງຕ່າງກັນ ແລະ ສັງເກດຄວາມໄວຕອນຜ່ານຈຸດຕ່ຳສຸດ. ປຽບທຽບກັບຜົນຈາກການຈຳລອງ.',
      'Make a pendulum from string and a small stone, release it from different heights and observe the speed at the bottom. Compare with the simulation.',
    ],
    minutes: 35,
    quiz: [
      [
        ['ແຮງ 50 N ດຶງກ່ອງໄປ 4 m ຕາມທິດຂອງແຮງ. ແຮງງານເທົ່າໃດ?', 'A 50 N force pulls a box 4 m along the force. How much work is done?'],
        [
          ['12.5 J', '12.5 J'],
          ['54 J', '54 J'],
          ['200 J', '200 J'],
        ],
        2,
        ['W = F × s = 50 × 4 = 200 J.', 'W = F × s = 50 × 4 = 200 J.'],
      ],
      [
        ['ຕຸ້ມຫ້ອຍແກວ່ງ ບໍ່ມີຄວາມຝືດ. ຈຸດໃດທີ່ພະລັງງານເດີນເຄື່ອນ (Ek) ສູງສຸດ?', 'A frictionless pendulum swings. Where is its kinetic energy (Ek) greatest?'],
        [
          ['ຈຸດສູງສຸດຂອງການແກວ່ງ', 'At the highest point of the swing'],
          ['ຈຸດຕ່ຳສຸດ', 'At the lowest point'],
          ['ທຸກຈຸດເທົ່າກັນ', 'Equal at every point'],
        ],
        1,
        ['ທີ່ຈຸດຕ່ຳສຸດ Ep ເປັນສູນ ແລະ ພະລັງງານທັງໝົດເປັນ Ek ຈຶ່ງໄວທີ່ສຸດ.', 'At the bottom Ep is zero and all the energy is Ek, so the speed is greatest.'],
      ],
      [
        ['ເມື່ອປ່ຽນມວນສານຂອງຕຸ້ມຫ້ອຍ ແຕ່ຄວາມຍາວເຊືອກຄືເກົ່າ ເວລາຂອງການແກວ່ງ 1 ຮອບ (period)ເປັນແນວໃດ?', 'If you change the mass of a pendulum but keep the string length, what happens to its period?'],
        [
          ['ບໍ່ປ່ຽນ', 'It does not change'],
          ['ຍາວຂຶ້ນ', 'It gets longer'],
          ['ສັ້ນລົງ', 'It gets shorter'],
        ],
        0,
        ['T ≈ 2π√(L/g) ຂຶ້ນກັບຄວາມຍາວເຊືອກ ບໍ່ຂຶ້ນກັບມວນສານ.', 'T ≈ 2π√(L/g) depends on the string length, not on the mass.'],
      ],
      [
        ['ເຄື່ອງຕ່ອນແຮງເຊັ່ນ ຄານ ຊ່ວຍຫຍັງ?', 'What does a simple machine such as a lever do?'],
        [
          ['ຫຼຸດແຮງງານທີ່ຕ້ອງໃຊ້', 'It reduces the work needed'],
          ['ຫຼຸດແຮງທີ່ຕ້ອງໃຊ້ ແຕ່ແຮງງານຄືເກົ່າ', 'It reduces the force needed but not the work'],
          ['ສ້າງພະລັງງານເພີ່ມ', 'It creates extra energy'],
        ],
        1,
        ['ແຮງນ້ອຍລົງ ແຕ່ຕ້ອງເຄື່ອນໄປໄກຂຶ້ນ ຈຶ່ງໄດ້ແຮງງານເທົ່າເກົ່າ (ບໍ່ມີຄວາມຝືດ).', 'The force is smaller but acts over a longer distance, so the work is the same (without friction).'],
      ],
    ],
  }),

  lesson(4, ['ຄວາມຮ້ອນ', 'Heat'], 20, 'phys', {
    summary: [
      'ອຸນຫະພູມບອກວ່າຮ້ອນ-ເຢັນເທົ່າໃດ ສ່ວນຄວາມຮ້ອນແມ່ນພະລັງງານທີ່ຖ່າຍທອດ. ຄວາມຮ້ອນສົ່ງຕໍ່ໄດ້ 3 ວິທີ: ການນຳ, ການພາ ແລະ ການແຜ່ລັງສີ.',
      'Temperature tells how hot something is, while heat is energy being transferred. Heat moves in three ways: conduction, convection and radiation.',
    ],
    objectives: [
      ['ບອກຄວາມສຳພັນລະຫວ່າງການເຄື່ອນທີ່ຂອງອະນຸພາກ ແລະ ອຸນຫະພູມ', 'Relate particle motion to temperature'],
      [
        'ບອກຄວາມໝາຍ ຄວາມຮ້ອນ, ອຸນຫະພູມ, ປະລິມານຄວາມຮ້ອນ ແລະ ຄວາມຈຸຄວາມຮ້ອນຈຳເພາະ',
        'Define heat, temperature, quantity of heat and specific heat capacity',
      ],
      ['ອະທິບາຍການສົ່ງຄວາມຮ້ອນ: ການນຳ, ການພາ, ການແຜ່ລັງສີ', 'Explain conduction, convection and radiation'],
      ['ຄິດໄລ່ປະລິມານຄວາມຮ້ອນ ແລະ ອະທິບາຍເຄື່ອງຈັກຄວາມຮ້ອນ', 'Calculate quantity of heat and explain heat engines'],
    ],
    keyIdeas: [
      [
        'ອຸນຫະພູມສູງ = ອະນຸພາກເຄື່ອນທີ່ໄວ. ອຸນຫະພູມບໍ່ແມ່ນຄວາມຮ້ອນ: ຄວາມຮ້ອນແມ່ນພະລັງງານທີ່ຖ່າຍທອດ.',
        'High temperature = fast-moving particles. Temperature is not heat: heat is energy that is transferred.',
      ],
      [
        'Q = m × c × ΔT. ນ້ຳ c ≈ 4200 J/(kg·°C).',
        'Q = m × c × ΔT. For water c ≈ 4200 J/(kg·°C).',
      ],
      [
        'ການນຳ (ໃນແຂງ, ໂດຍສະເພາະໂລຫະ), ການພາ (ໃນແຫຼວ/ກາສ ທີ່ໄຫຼວຽນ), ການແຜ່ລັງສີ (ບໍ່ຕ້ອງມີຕົວກາງ ເຊັ່ນ ແສງແດດ).',
        'Conduction (in solids, especially metals), convection (circulating liquids and gases), radiation (needs no medium, e.g. sunlight).',
      ],
      [
        'ເຄື່ອງຈັກຄວາມຮ້ອນປ່ຽນຄວາມຮ້ອນເປັນງານ ແຕ່ບໍ່ສາມາດປ່ຽນໄດ້ໝົດ.',
        'A heat engine converts some heat into work, but never all of it.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງໝໍ້ໂລຫະຮ້ອນໄວ ແຕ່ມືຈັບທີ່ເປັນໄມ້ບໍ່ຮ້ອນ?', 'Why does a metal pot get hot but its wooden handle does not?'],
      ['ຕົ້ມນ້ຳ 2 kg ຈາກ 30 °C ເປັນ 80 °C ຕ້ອງໃຊ້ຄວາມຮ້ອນເທົ່າໃດ?', 'How much heat is needed to warm 2 kg of water from 30 °C to 80 °C? (answer 420 kJ)'],
    ],
    activity: [
      'ວາງບ່ວງໂລຫະ ແລະ ບ່ວງພລາສຕິກໃນນ້ຳຮ້ອນ (ຄູເປັນຜູ້ຕື່ມນ້ຳຮ້ອນ) ແລ້ວສັງເກດວ່າບ່ວງໃດຮ້ອນກ່ອນ.',
      'Put a metal spoon and a plastic spoon in hot water (the teacher pours the hot water) and observe which gets warm first.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ຄວາມຮ້ອນຈາກດວງອາທິດມາຮອດໂລກດ້ວຍວິທີໃດ?', 'How does heat from the Sun reach the Earth?'],
        [
          ['ການນຳ', 'Conduction'],
          ['ການພາ', 'Convection'],
          ['ການແຜ່ລັງສີ', 'Radiation'],
        ],
        2,
        ['ລະຫວ່າງດວງອາທິດກັບໂລກເປັນສູນຍາກາດເປັນສ່ວນໃຫຍ່ ມີແຕ່ການແຜ່ລັງສີທີ່ບໍ່ຕ້ອງການຕົວກາງ.', 'Space between the Sun and the Earth is mostly a vacuum; only radiation needs no medium.'],
      ],
      [
        ['ນ້ຳ 1 kg ຮ້ອນຂຶ້ນ 10 °C (c = 4200 J/(kg·°C)). ໃຊ້ຄວາມຮ້ອນເທົ່າໃດ?', 'A 1 kg of water warms by 10 °C (c = 4200 J/(kg·°C)). How much heat is used?'],
        [
          ['420 J', '420 J'],
          ['4 200 J', '4 200 J'],
          ['42 000 J', '42 000 J'],
        ],
        2,
        ['Q = m c ΔT = 1 × 4200 × 10 = 42 000 J.', 'Q = m c ΔT = 1 × 4200 × 10 = 42 000 J.'],
      ],
      [
        ['ອາກາດຮ້ອນເທິງເຕົາໄຟ ລອຍຂຶ້ນ ເປັນການສົ່ງຄວາມຮ້ອນແບບໃດ?', 'Hot air rising above a stove is which kind of heat transfer?'],
        [
          ['ການພາ', 'Convection'],
          ['ການນຳ', 'Conduction'],
          ['ການແຜ່ລັງສີ', 'Radiation'],
        ],
        0,
        ['ກາສຮ້ອນຂະຫຍາຍ ເບົາລົງ ແລະ ລອຍຂຶ້ນ ເກີດການໄຫຼວຽນ.', 'Warm gas expands, becomes lighter and rises, creating a circulating flow.'],
      ],
      [
        ['ເປັນຫຍັງໂລຫະຈຶ່ງຮູ້ສຶກເຢັນກວ່າໄມ້ ເມື່ອຢູ່ໃນຫ້ອງດຽວກັນ?', 'Why does metal feel colder than wood in the same room?'],
        [
          ['ໂລຫະເຢັນກວ່າແທ້', 'The metal really is colder'],
          ['ໂລຫະນຳຄວາມຮ້ອນຈາກມືອອກໄປໄວກວ່າ', 'Metal conducts heat away from the hand faster'],
          ['ໄມ້ສ້າງຄວາມຮ້ອນເອງ', 'Wood makes its own heat'],
        ],
        1,
        ['ທັງສອງມີອຸນຫະພູມເທົ່າກັນ ແຕ່ໂລຫະນຳຄວາມຮ້ອນດີ ຈຶ່ງດຶງຄວາມຮ້ອນຈາກມືໄວ.', 'Both are at the same temperature but metal is a good conductor, so it draws heat from the hand quickly.'],
      ],
    ],
  }),

  lesson(5, ['ລະບົບປະສາດ ແລະ ອະໄວຍະວະຮູ້ສຶກ', 'Nervous system and sense organs'], 13, 'bio', {
    summary: [
      'ລະບົບປະສາດ (ສະໝອງ, ໄຂສັນຫຼັງ, ເສັ້ນປະສາດ) ຮັບສັນຍານຈາກອະໄວຍະວະຮູ້ສຶກ ແລະ ສັ່ງໃຫ້ຮ່າງກາຍຕອບສະໜອງ.',
      'The nervous system (brain, spinal cord, nerves) receives signals from the sense organs and tells the body how to respond.',
    ],
    objectives: [
      ['ຮູ້ໂຄງສ້າງ ແລະ ໜ້າທີ່ຂອງລະບົບປະສາດ, ໜັງ, ຫູ, ຕາ, ດັງ ແລະ ລີ້ນ', 'Know the structure and function of the nervous system, skin, ear, eye, nose and tongue'],
      ['ອະທິບາຍການຕອບສະໜອງຕໍ່ສິ່ງກະຕຸ້ນ', 'Explain responses to stimuli'],
      ['ອະທິບາຍຜົນຂອງສິ່ງເສບຕິດຕໍ່ລະບົບປະສາດ', 'Explain the effects of addictive substances on the nervous system'],
      ['ບອກວິທີດູແລຮັກສາອະໄວຍະວະຮູ້ສຶກ', 'State ways to care for the sense organs'],
    ],
    keyIdeas: [
      ['ລະບົບປະສາດປະກອບດ້ວຍ ສະໝອງ, ໄຂສັນຫຼັງ ແລະ ເສັ້ນປະສາດ.', 'The nervous system consists of the brain, spinal cord and nerves.'],
      [
        'ຕາ: ແສງຜ່ານແກ້ວຕາ (ເລນ) ໄປຕົກຮູບທີ່ເຣຕີນາ ແລ້ວສົ່ງສັນຍານໄປສະໝອງ.',
        'Eye: light passes through the lens and forms an image on the retina, which sends signals to the brain.',
      ],
      [
        'ການຕອບສະໜອງໄວແບບ reflex ເກີດຂຶ້ນທີ່ໄຂສັນຫຼັງ ຈຶ່ງໄວກວ່າການຄິດຂອງສະໝອງ.',
        'A reflex is handled by the spinal cord, so it is faster than a response the brain thinks about.',
      ],
      [
        'ສິ່ງເສບຕິດ (ເຫຼົ້າ, ຢາສູບ, ຢາເສບຕິດ) ທຳລາຍລະບົບປະສາດ ແລະ ສຸຂະພາບ.',
        'Addictive substances (alcohol, tobacco, drugs) damage the nervous system and health.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງເຮົາຖອນມືຈາກຂອງຮ້ອນ ກ່ອນທີ່ຈະຮູ້ສຶກເຈັບ?', 'Why do you pull your hand away from a hot object before you feel pain?'],
      ['ເຮົາຄວນດູແລຕາແນວໃດ?', 'How should we take care of our eyes?'],
    ],
    activity: [
      'ວັດເວລາຕອບສະໜອງ: ເພື່ອນປ່ອຍໄມ້ບັນທັດ ແລ້ວເຮົາຈັບ. ໃຊ້ t = √(2d/g) (ເຊັ່ນ d = 20 cm → t ≈ 0.2 s).',
      'Ruler-drop reaction time: a partner drops a ruler and you catch it. Use t = √(2d/g) (e.g. d = 20 cm → t ≈ 0.2 s).',
    ],
    minutes: 25,
    quiz: [
      [
        ['ສ່ວນໃດຂອງຕາທີ່ຮັບຮູບ ແລະ ສົ່ງສັນຍານໄປສະໝອງ?', 'Which part of the eye receives the image and sends signals to the brain?'],
        [
          ['ແກ້ວຕາ (ເລນ)', 'The lens'],
          ['ເຣຕີນາ', 'The retina'],
          ['ຂົນຕາ', 'The eyelashes'],
        ],
        1,
        ['ເຣຕີນາມີເຊວຮັບແສງ ທີ່ແປງແສງເປັນສັນຍານປະສາດ.', 'The retina has light-sensitive cells that turn light into nerve signals.'],
      ],
      [
        ['ການຖອນມືຈາກຂອງຮ້ອນໂດຍອັດຕະໂນມັດ ເອີ້ນວ່າຫຍັງ?', 'What is an automatic action such as pulling your hand off something hot called?'],
        [
          ['reflex', 'A reflex'],
          ['ຮໍໂມນ', 'A hormone'],
          ['ການຍ່ອຍ', 'Digestion'],
        ],
        0,
        ['reflex ຖືກຄວບຄຸມໂດຍໄຂສັນຫຼັງ ຈຶ່ງໄວ ແລະ ປົກປ້ອງຮ່າງກາຍ.', 'A reflex is controlled by the spinal cord, so it is fast and protects the body.'],
      ],
      [
        ['ສິ່ງເສບຕິດມີຜົນຕໍ່ລະບົບປະສາດແນວໃດ?', 'How do addictive substances affect the nervous system?'],
        [
          ['ຊ່ວຍໃຫ້ສະໝອງເຮັດວຽກດີຂຶ້ນ', 'They help the brain work better'],
          ['ບໍ່ມີຜົນຫຍັງ', 'They have no effect'],
          ['ທຳລາຍເຊວປະສາດ ແລະ ເຮັດໃຫ້ຕິດ', 'They damage nerve cells and cause dependence'],
        ],
        2,
        ['ສິ່ງເສບຕິດລົບກວນການເຮັດວຽກຂອງສະໝອງ ແລະ ເຮັດໃຫ້ຢາກໃຊ້ຊ້ຳ.', 'They disturb the brain and create a craving to use them again.'],
      ],
    ],
  }),

  lesson(6, ['ໄຟຟ້າ', 'Electricity'], 20, 'phys', {
    sim: 'circuit',
    simProps: { mode: 'basic' },
    summary: [
      'ປະຈຸໄຟຟ້າມີ 2 ຊະນິດ. ກະແສໄຟຟ້າຄືການໄຫຼຂອງປະຈຸໃນວົງຈອນປິດ. ການຕໍ່ລຽນ ແລະ ການຕໍ່ຂະໜານ ໃຫ້ຜົນຕ່າງກັນ.',
      'There are two kinds of electric charge. Current is the flow of charge in a closed circuit. Series and parallel wiring behave differently.',
    ],
    objectives: [
      ['ອະທິບາຍໄຟຟ້າສະຖິດ ແລະ ປະຈຸໄຟຟ້າ 2 ຊະນິດ (ດຶງ ແລະ ຍູ້)', 'Explain static electricity and the two kinds of charge (attraction and repulsion)'],
      ['ອະທິບາຍຟ້າຜ່າ ແລະ ວິທີປ້ອງກັນ', 'Explain lightning and how to stay safe'],
      ['ອະທິບາຍວົງຈອນໄຟຟ້າ ແລະ ສັນຍາລັກ; ການຕໍ່ລຽນ ແລະ ການຕໍ່ຂະໜານ', 'Explain circuits and symbols; series and parallel wiring'],
      [
        'ເຂົ້າໃຈກະແສໄຟຟ້າ, ຄວາມຕ່າງລະດັບໄຟຟ້າ (ແຮງດັນ) ແລະ ເຄື່ອງແທກ',
        'Understand current, potential difference (voltage) and the meters',
      ],
    ],
    keyIdeas: [
      ['ປະຈຸຊະນິດດຽວກັນຍູ້ກັນ, ຕ່າງຊະນິດດູດກັນ.', 'Like charges repel, unlike charges attract.'],
      ['ກະແສໄຟຟ້າຄືການໄຫຼຂອງປະຈຸ (ເອເລັກຕຣົງ) ໃນວົງຈອນປິດ.', 'Current is the flow of charge (electrons) in a closed circuit.'],
      [
        'ຕໍ່ລຽນ: ກະແສຄືກັນ, ຫຼອດໄຟຫຼາຍ → ມືດລົງ, ຖ້າຫຼອດໜຶ່ງຂາດ ທຸກຫຼອດດັບ. ຕໍ່ຂະໜານ: ແຕ່ລະຫຼອດສະຫວ່າງຄືເກົ່າ ແລະ ເປັນອິດສະຫຼະຈາກກັນ.',
        'Series: same current, more bulbs → dimmer, and if one breaks all go out. Parallel: each bulb stays equally bright and works independently.',
      ],
      [
        'ຕົວນຳ (ໂລຫະ) ໃຫ້ກະແສຜ່ານໄດ້; ຕົວກັນໄຟຟ້າ (ພລາສຕິກ, ຢາງ) ບໍ່ໃຫ້ຜ່ານ.',
        'Conductors (metals) let current through; insulators (plastic, rubber) do not.',
      ],
      [
        'ໄຟຟ້າອັນຕະລາຍ: ບໍ່ຈັບສາຍໄຟ ຫຼື ປລັກ ດ້ວຍມືປຽກ.',
        'Electricity is dangerous: never touch wires or plugs with wet hands.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງເຄື່ອງໃຊ້ໄຟຟ້າໃນເຮືອນຈຶ່ງຕໍ່ແບບຂະໜານ?', 'Why are the appliances in a house wired in parallel?'],
      ['ຖ້າຫຼອດໄຟໜຶ່ງໃນວົງຈອນຕໍ່ລຽນຂາດ ຫຼອດອື່ນຈະເປັນແນວໃດ?', 'If one bulb in a series circuit burns out, what happens to the others?'],
    ],
    activity: [
      'ແຕ່ລະກຸ່ມຕໍ່ວົງຈອນຖ່ານໄຟ ແລະ ຫຼອດໄຟ ແບບລຽນ ແລະ ແບບຂະໜານ ແລ້ວປຽບທຽບຄວາມສະຫວ່າງ (ໃຊ້ຖ່ານໄຟເທົ່ານັ້ນ ບໍ່ໃຊ້ໄຟບ້ານ).',
      'Each group builds series and parallel circuits with batteries and small bulbs and compares brightness (use batteries only, never mains electricity).',
    ],
    minutes: 35,
    quiz: [
      [
        ['ວົງຈອນຕໍ່ລຽນມີ 3 ຫຼອດ. ຫຼອດໜຶ່ງຖືກຖອດອອກ. ຫຼອດທີ່ເຫຼືອເປັນແນວໃດ?', 'A series circuit has 3 bulbs and one is removed. What happens to the other two?'],
        [
          ['ສະຫວ່າງກວ່າເກົ່າ', 'They get brighter'],
          ['ດັບທັງໝົດ', 'They all go out'],
          ['ສະຫວ່າງຄືເກົ່າ', 'They stay equally bright'],
        ],
        1,
        ['ວົງຈອນຖືກຕັດ ກະແສບໍ່ໄຫຼ ຈຶ່ງດັບທັງໝົດ.', 'The circuit is broken so no current flows and all bulbs go out.'],
      ],
      [
        ['ໃນວົງຈອນຕໍ່ຂະໜານ ເມື່ອເພີ່ມຫຼອດໄຟ ຄວາມສະຫວ່າງຂອງແຕ່ລະຫຼອດ...', 'In a parallel circuit, when you add more bulbs the brightness of each bulb...'],
        [
          ['ຫຼຸດລົງ', 'Decreases'],
          ['ຄືເກົ່າ', 'Stays the same'],
          ['ເພີ່ມຂຶ້ນ', 'Increases'],
        ],
        1,
        ['ແຕ່ລະຫຼອດໄດ້ຮັບແຮງດັນເຕັມຈາກໝໍ້ໄຟ ຈຶ່ງສະຫວ່າງຄືເກົ່າ.', 'Each bulb gets the full battery voltage, so its brightness does not change.'],
      ],
      [
        ['ແທ່ງໄມ້ບັນທັດພລາສຕິກຖືກຖູດ້ວຍຜ້າ ແລ້ວດູດເສດເຈ້ຍ. ເປັນເພາະ...', 'A plastic ruler rubbed with cloth picks up bits of paper because...'],
        [
          ['ມັນກາຍເປັນແມ່ເຫຼັກ', 'It becomes a magnet'],
          ['ມັນມີປະຈຸໄຟຟ້າສະຖິດ', 'It carries static electric charge'],
          ['ມັນຮ້ອນຂຶ້ນ', 'It gets hot'],
        ],
        1,
        ['ການຖູເຮັດໃຫ້ເກີດປະຈຸໄຟຟ້າສະຖິດ ທີ່ດຶງເສດເຈ້ຍ.', 'Rubbing creates static charge, which attracts the paper.'],
      ],
      [
        ['ວັດຖຸໃດເປັນຕົວກັນໄຟຟ້າ?', 'Which material is an electrical insulator?'],
        [
          ['ທອງແດງ', 'Copper'],
          ['ຢາງ', 'Rubber'],
          ['ເຫຼັກ', 'Iron'],
        ],
        1,
        ['ຢາງບໍ່ໃຫ້ກະແສໄຟຟ້າຜ່ານ ຈຶ່ງໃຊ້ຫຸ້ມສາຍໄຟ.', 'Rubber does not conduct, so it is used to cover wires.'],
      ],
    ],
  }),

  lesson(7, ['ການປ່ຽນພາວະຂອງວັດຖຸ', 'Changes of state'], 16, 'chem', {
    sim: 'states',
    summary: [
      'ວັດຖຸປ່ຽນພາວະ (ແຂງ, ແຫຼວ, ກາສ) ເມື່ອຮັບ ຫຼື ເສຍຄວາມຮ້ອນ. ຂະນະປ່ຽນພາວະ ອຸນຫະພູມຄົງທີ່ ເພາະຄວາມຮ້ອນແຝງຖືກໃຊ້ແຍກອະນຸພາກ.',
      'Matter changes state (solid, liquid, gas) when it gains or loses heat. During a change of state temperature stays constant because latent heat is used to separate particles.',
    ],
    objectives: [
      ['ບອກຄວາມໝາຍ ການຫຼອມແຫຼວ, ການແຂງຕົວ, ການລະເຫີຍ ແລະ ການກັ່ນຕົວ', 'Define melting, freezing, evaporation (boiling) and condensation'],
      ['ບອກຄວາມໝາຍຄວາມຮ້ອນແຝງ ແລະ ຄວາມຮ້ອນແຝງຈຳເພາະ', 'Define latent heat and specific latent heat'],
      ['ອະທິບາຍວ່າພາວະຂອງວັດຖຸຂຶ້ນກັບອຸນຫະພູມ', 'Explain that the state of matter depends on temperature'],
      ['ແກ້ບັນຫາຄິດໄລ່ຄວາມຮ້ອນ ແລະ ຄວາມຮ້ອນແຝງ', 'Solve problems on heat and latent heat'],
    ],
    keyIdeas: [
      [
        'ແຂງ: ອະນຸພາກສັ່ນຢູ່ທີ່; ແຫຼວ: ເລື່ອນຜ່ານກັນ; ກາສ: ເຄື່ອນທີ່ອິດສະຫຼະ.',
        'Solid: particles vibrate in place; liquid: they slide past each other; gas: they move freely.',
      ],
      [
        'ລະຫວ່າງປ່ຽນພາວະ ອຸນຫະພູມຄົງທີ່ ທັງທີ່ຍັງຮັບຄວາມຮ້ອນ (ນ້ຳ: 0 °C ແລະ 100 °C).',
        'During a change of state the temperature stays constant even though heat is added (water: 0 °C and 100 °C).',
      ],
      [
        'Q = m × L. ນ້ຳ: ຫຼອມແຫຼວ Lf = 334 kJ/kg, ກາຍເປັນໄອ Lv = 2260 kJ/kg.',
        'Q = m × L. Water: melting Lf = 334 kJ/kg, vaporising Lv = 2260 kJ/kg.',
      ],
      [
        'ຄວາມຮ້ອນແຝງໃຊ້ແຍກອະນຸພາກອອກຈາກກັນ ບໍ່ໄດ້ເພີ່ມອຸນຫະພູມ.',
        'Latent heat is used to pull particles apart, not to raise the temperature.',
      ],
      [
        'ຮູບແບບຈຳລອງຂອງເວັບ: ນ້ຳ 0.5 kg ໃນສະພາບທີ່ເໝາະສົມ ບໍ່ມີຄວາມຮ້ອນສູນເສຍ.',
        'The site model: 0.5 kg of water in an idealised situation with no heat loss.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງຜິວໜັງເຢັນເມື່ອເຫື່ອລະເຫີຍ?', 'Why does skin feel cool when sweat evaporates?'],
      ['ເປັນຫຍັງນ້ຳທີ່ກຳລັງເດືອດ ອຸນຫະພູມຈຶ່ງບໍ່ຂຶ້ນອີກ?', 'Why does boiling water not get any hotter?'],
    ],
    activity: [
      'ແຕ້ມກຣາຟອຸນຫະພູມ-ເວລາ ຕອນຕົ້ມນ້ຳກ້ອນຈົນເດືອດ (ຄູເປັນຜູ້ຄວບຄຸມເຕົາ) ແລ້ວຊີ້ບ່ອນທີ່ຮາບ.',
      'Plot a temperature-time graph while heating ice until it boils (the teacher handles the heater) and mark the flat parts.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ນ້ຳກ້ອນກຳລັງລະລາຍ ອຸນຫະພູມຂອງສ່ວນປົນນ້ຳ-ນ້ຳກ້ອນເປັນເທົ່າໃດ?', 'Ice is melting. What is the temperature of the ice-water mixture?'],
        [
          ['0 °C', '0 °C'],
          ['ຂຶ້ນເລື້ອຍໆ', 'It keeps rising'],
          ['100 °C', '100 °C'],
        ],
        0,
        ['ຂະນະຫຼອມແຫຼວ ອຸນຫະພູມຄົງທີ່ 0 °C ຈົນນ້ຳກ້ອນລະລາຍໝົດ.', 'While melting the temperature stays at 0 °C until all the ice has melted.'],
      ],
      [
        ['ຄວາມຮ້ອນແຝງໃຊ້ເຮັດຫຍັງ?', 'What is latent heat used for?'],
        [
          ['ເພີ່ມອຸນຫະພູມຂອງວັດຖຸ', 'Raising the temperature of the material'],
          ['ປ່ຽນພາວະ ໂດຍບໍ່ປ່ຽນອຸນຫະພູມ', 'Changing the state without changing the temperature'],
          ['ເພີ່ມມວນສານ', 'Increasing the mass'],
        ],
        1,
        ['ພະລັງງານໄປແຍກອະນຸພາກ ຈຶ່ງບໍ່ເຫັນອຸນຫະພູມປ່ຽນ.', 'The energy goes into separating particles, so no temperature change is seen.'],
      ],
      [
        ['ໃຊ້ຄວາມຮ້ອນເທົ່າໃດເພື່ອຫຼອມນ້ຳກ້ອນ 0.5 kg ທີ່ 0 °C? (Lf = 334 kJ/kg)', 'How much heat melts 0.5 kg of ice at 0 °C? (Lf = 334 kJ/kg)'],
        [
          ['167 kJ', '167 kJ'],
          ['334 kJ', '334 kJ'],
          ['668 kJ', '668 kJ'],
        ],
        0,
        ['Q = m L = 0.5 × 334 = 167 kJ.', 'Q = m L = 0.5 × 334 = 167 kJ.'],
      ],
      [
        ['ການປ່ຽນຈາກໄອນ້ຳເປັນນ້ຳ ເອີ້ນວ່າຫຍັງ?', 'What is the change from water vapour to liquid water called?'],
        [
          ['ການຫຼອມແຫຼວ', 'Melting'],
          ['ການແຂງຕົວ', 'Freezing'],
          ['ການກັ່ນຕົວ', 'Condensation'],
        ],
        2,
        ['ໄອນ້ຳເຢັນລົງແລ້ວກັ່ນຕົວເປັນນ້ຳ ເຊັ່ນ ໝອກນ້ຳຄ້າງເທິງຂອບແກ້ວເຢັນ.', 'Water vapour cools and condenses into liquid, e.g. droplets on a cold glass.'],
      ],
    ],
  }),

  lesson(8, ['ແສງເລຂາ (ແວ່ນກົ່ງ)', 'Geometric optics: curved mirrors'], 15, 'phys', {
    summary: [
      'ແວ່ນເວ້າ (concave) ລວມແສງເຂົ້າຈຸດໂຟກັສ; ແວ່ນນູນ (convex) ກະຈາຍແສງ ແລະ ໃຫ້ຮູບລວງຂະໜາດນ້ອຍ ແຕ່ເຫັນວົງກວ້າງ.',
      'A concave mirror gathers light to a focus; a convex mirror spreads light out and gives a small virtual image with a wide field of view.',
    ],
    objectives: [
      ['ບອກຄວາມໝາຍຂອງແວ່ນກົ່ງສອງຊະນິດ: ແວ່ນເວ້າ (concave) ແລະ ແວ່ນນູນ (convex)', 'Define the two kinds of curved mirror: concave and convex'],
      ['ບອກອົງປະກອບ: ແກນຫຼັກ, ຈຸດໂຟກັສ ແລະ ຈຸດສູນກາງຄວາມໂຄ້ງ', 'Name the principal axis, focus and centre of curvature'],
      ['ບອກລັກສະນະຂອງຮູບຈິງ ແລະ ຮູບລວງ ທີ່ເກີດຈາກແວ່ນກົ່ງ', 'State the properties of real and virtual images formed by curved mirrors'],
      ['ຍົກຕົວຢ່າງການນຳໃຊ້ແວ່ນເວ້າ ແລະ ແວ່ນນູນ', 'Give uses of concave and convex mirrors'],
    ],
    keyIdeas: [
      [
        'ແວ່ນເວ້າ (concave) ສະທ້ອນແສງຂະໜານໃຫ້ມາລວມທີ່ຈຸດໂຟກັສ.',
        'A concave mirror reflects parallel light so that it meets at the focus.',
      ],
      [
        'ແວ່ນນູນ (convex) ກະຈາຍແສງ ແລະ ໃຫ້ຮູບລວງ ຕັ້ງ ຂະໜາດນ້ອຍກວ່າວັດຖຸ ສະເໝີ.',
        'A convex mirror spreads light and always gives a virtual, upright, smaller image.',
      ],
      [
        'ສົມຜົນແວ່ນ: 1/f = 1/u + 1/v. ຈຸດໂຟກັສຢູ່ກາງລະຫວ່າງແວ່ນ ແລະ ຈຸດສູນກາງຄວາມໂຄ້ງ (f = R/2).',
        'Mirror equation: 1/f = 1/u + 1/v. The focus is halfway between the mirror and the centre of curvature (f = R/2).',
      ],
      [
        'ນຳໃຊ້: ກະຈົກເບິ່ງຫຼັງຂອງລົດ (ນູນ), ໄຟສາຍ/ຈານຮັບສັນຍານ (ເວ້າ), ແວ່ນຂອງໝໍແຂ້ວ (ເວ້າ).',
        'Uses: car side mirror (convex), torch reflector and satellite dish (concave), dentist mirror (concave).',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງໝໍແຂ້ວຈຶ່ງໃຊ້ແວ່ນເວ້າ?', 'Why do dentists use a concave mirror?'],
      ['ເປັນຫຍັງກະຈົກຂ້າງລົດຈຶ່ງຂຽນວ່າ "ວັດຖຸໃກ້ກວ່າທີ່ເຫັນ"?', 'Why does a car mirror say "objects are closer than they appear"?'],
    ],
    activity: [
      'ໃຊ້ບ່ວງທີ່ເງົາ ເບິ່ງຮູບຕົນເອງທັງດ້ານໃນ (ເວ້າ) ແລະ ດ້ານນອກ (ນູນ) ແລ້ວອະທິບາຍຄວາມແຕກຕ່າງ.',
      'Look at your reflection in a shiny spoon, on the inside (concave) and the outside (convex), and explain the difference.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ແວ່ນຊະນິດໃດລວມແສງຂະໜານເຂົ້າຈຸດໜຶ່ງ?', 'Which mirror brings parallel light together at a point?'],
        [
          ['ແວ່ນນູນ (convex)', 'Convex mirror'],
          ['ແວ່ນເວ້າ (concave)', 'Concave mirror'],
          ['ແວ່ນພຽງ', 'Plane mirror'],
        ],
        1,
        ['ແວ່ນເວ້າລວມແສງ ຈຶ່ງໃຊ້ເປັນຈານຮັບສັນຍານ ແລະ ໃນໄຟສາຍ.', 'A concave mirror converges light, which is why it is used in dishes and torches.'],
      ],
      [
        ['ແວ່ນໃດເໝາະເປັນກະຈົກຂ້າງລົດ ເພາະເຫັນວົງກວ້າງ?', 'Which mirror suits a car side mirror because it shows a wide view?'],
        [
          ['ແວ່ນນູນ (convex)', 'Convex mirror'],
          ['ແວ່ນເວ້າ (concave)', 'Concave mirror'],
          ['ແວ່ນຂະຫຍາຍ', 'Magnifying glass'],
        ],
        0,
        ['ແວ່ນນູນໃຫ້ຮູບລວງຂະໜາດນ້ອຍ ແຕ່ຄອບຄຸມວົງກວ້າງ.', 'A convex mirror gives a small virtual image but covers a wide field.'],
      ],
      [
        ['ຮູບຈິງ (real image) ຕ່າງຈາກຮູບລວງ (virtual image) ແນວໃດ?', 'How does a real image differ from a virtual image?'],
        [
          ['ຮູບຈິງຮັບເທິງຈໍໄດ້ ແຕ່ຮູບລວງຮັບບໍ່ໄດ້', 'A real image can be shown on a screen; a virtual image cannot'],
          ['ຮູບຈິງສະເໝີຂະໜາດນ້ອຍກວ່າ', 'A real image is always smaller'],
          ['ບໍ່ມີຄວາມແຕກຕ່າງ', 'There is no difference'],
        ],
        0,
        ['ຮູບຈິງເກີດຈາກແສງມາລວມກັນຈິງໆ ຈຶ່ງຮັບເທິງຈໍໄດ້.', 'A real image is formed where light actually meets, so a screen can show it.'],
      ],
    ],
  }),

  lesson(9, ['ລະບົບສຸລິຍະ', 'The solar system'], 16, 'earth', {
    summary: [
      'ລະບົບສຸລິຍະມີດວງອາທິດ ແລະ ດາວເຄາະ 8 ດວງ. ການໝູນຂອງໂລກ ແລະ ດວງຈັນ ເຮັດໃຫ້ເກີດກາງເວັນ-ກາງຄືນ, ລະດູການ, ເຟສດວງຈັນ ແລະ ຄາຕ.',
      'The solar system has the Sun and 8 planets. The motions of the Earth and the Moon cause day and night, seasons, moon phases and eclipses.',
    ],
    objectives: [
      ['ອະທິບາຍການກຳເນີດ ແລະ ໂຄງສ້າງຂອງລະບົບສຸລິຍະ', 'Describe the formation and structure of the solar system'],
      ['ບອກວິທີສັງເກດດາວຈາກໂລກ ແລະ ລັກສະນະຂອງດວງຈັນ ແລະ ດາວເຄາະ', 'Explain how to observe stars from the Earth and describe the Moon and planets'],
      ['ອະທິບາຍການໝູນຂອງໂລກ ແລະ ດວງຈັນ', 'Explain the motions of the Earth and the Moon'],
      [
        'ອະທິບາຍການເກີດກາງເວັນ-ກາງຄືນ, ລະດູການ, ເຟສດວງຈັນ, ຈັນທະຄາຕ ແລະ ສຸລິຍະຄາຕ',
        'Explain day and night, seasons, moon phases, lunar and solar eclipses',
      ],
      ['ຮູ້ຈັກກຸ່ມດາວໃນທ້ອງຟ້າ', 'Know the constellations in the sky'],
    ],
    keyIdeas: [
      [
        'ດາວເຄາະ 8 ດວງ ຕາມລຳດັບຈາກດວງອາທິດ: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
        'The 8 planets in order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
      ],
      [
        'ໂລກໝູນອ້ອມຕົວເອງ 24 ຊົ່ວໂມງ → ກາງເວັນ/ກາງຄືນ; ໂຄຈອນອ້ອມດວງອາທິດ ≈ 365 ວັນ → 1 ປີ.',
        'The Earth spins in 24 h → day and night; it orbits the Sun in ≈ 365 days → 1 year.',
      ],
      [
        'ແກນໂລກອຽງ 23.5° ເຮັດໃຫ້ເກີດລະດູການ (ບໍ່ແມ່ນຍ້ອນໄລຍະຫ່າງຈາກດວງອາທິດ).',
        'The Earth’s axial tilt of 23.5° causes the seasons (not the distance from the Sun).',
      ],
      [
        'ເຟສດວງຈັນວົນຄົບຮອບ ≈ 29.5 ວັນ.',
        'The moon phases repeat every ≈ 29.5 days.',
      ],
      [
        'ຈັນທະຄາຕ: ໂລກຢູ່ລະຫວ່າງດວງອາທິດ ແລະ ດວງຈັນ; ສຸລິຍະຄາຕ: ດວງຈັນຢູ່ລະຫວ່າງດວງອາທິດ ແລະ ໂລກ.',
        'Lunar eclipse: the Earth is between the Sun and the Moon; solar eclipse: the Moon is between the Sun and the Earth.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງລະດູຮ້ອນຈຶ່ງບໍ່ແມ່ນຍ້ອນໂລກຢູ່ໃກ້ດວງອາທິດ?', 'Why are the seasons not caused by the Earth being closer to the Sun?'],
      ['ເປັນຫຍັງເຮົາເຫັນດວງຈັນດ້ານດຽວກັນສະເໝີ?', 'Why do we always see the same side of the Moon?'],
    ],
    activity: [
      'ໃຊ້ໄຟສາຍ (ແທນດວງອາທິດ) ແລະ ລູກບານສອງໜ່ວຍ (ໂລກ, ດວງຈັນ) ສາທິດເຟສດວງຈັນ ແລະ ຄາຕ.',
      'Use a torch (the Sun) and two balls (Earth and Moon) to demonstrate moon phases and eclipses.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ດາວເຄາະໃດຢູ່ໃກ້ດວງອາທິດທີ່ສຸດ?', 'Which planet is closest to the Sun?'],
        [
          ['Earth', 'Earth'],
          ['Mercury', 'Mercury'],
          ['Neptune', 'Neptune'],
        ],
        1,
        ['Mercury ເປັນດາວເຄາະທຳອິດ ແລະ Neptune ໄກທີ່ສຸດ.', 'Mercury is the first planet and Neptune is the farthest.'],
      ],
      [
        ['ສິ່ງໃດເຮັດໃຫ້ເກີດລະດູການຕ່າງໆ?', 'What causes the seasons?'],
        [
          ['ໂລກໃກ້-ໄກດວງອາທິດ', 'The Earth being nearer to or farther from the Sun'],
          ['ແກນໂລກອຽງ 23.5°', 'The 23.5° tilt of the Earth’s axis'],
          ['ການໝູນຂອງດວງຈັນ', 'The motion of the Moon'],
        ],
        1,
        ['ແກນອຽງເຮັດໃຫ້ແຕ່ລະສ່ວນຂອງໂລກໄດ້ຮັບແສງແດດຕ່າງກັນຕາມເວລາຂອງປີ.', 'The tilt makes each part of the Earth receive different amounts of sunlight during the year.'],
      ],
      [
        ['ສຸລິຍະຄາຕເກີດເມື່ອໃດ?', 'When does a solar eclipse occur?'],
        [
          ['ໂລກຢູ່ລະຫວ່າງດວງອາທິດ ແລະ ດວງຈັນ', 'The Earth is between the Sun and the Moon'],
          ['ດວງຈັນຢູ່ລະຫວ່າງດວງອາທິດ ແລະ ໂລກ', 'The Moon is between the Sun and the Earth'],
          ['ດວງຈັນເປັນເຟສເຕັມດວງທຸກຄັ້ງ', 'Every time there is a full moon'],
        ],
        1,
        ['ເງົາຂອງດວງຈັນຕົກເທິງໂລກ ແລະ ບັງແສງດວງອາທິດ.', 'The Moon’s shadow falls on the Earth and blocks sunlight.'],
      ],
      [
        ['ເຟສດວງຈັນວົນຄົບຮອບໃຊ້ເວລາປະມານເທົ່າໃດ?', 'About how long do the moon phases take to repeat?'],
        [
          ['7 ວັນ', '7 days'],
          ['29.5 ວັນ', '29.5 days'],
          ['365 ວັນ', '365 days'],
        ],
        1,
        ['ດວງຈັນໂຄຈອນອ້ອມໂລກ ແລະ ເຮັດໃຫ້ເຫັນເຟສຕ່າງໆ ໃນເວລາປະມານ 29.5 ວັນ.', 'The Moon orbits the Earth and shows its phases over about 29.5 days.'],
      ],
    ],
  }),
]
