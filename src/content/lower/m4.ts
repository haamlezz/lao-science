import type { L } from '../../i18n/strings'
import type { Field, LessonDef, QuizItem, SimKey, SimProps } from './types'

// Natural science M.4 (Grade 9), lower-secondary curriculum 2010. 11 topics, 165 h. All ready.
// Lao text is an AI draft; the whole file is subject to teacher review.
// m4-01 (reproduction) is written factually and respectfully, no explicit imagery; the teacher may skip the activity.
// REVIEW terms: ອະໄວຍະວະສືບພັນ (reproductive organs), ໄວໜຸ່ມ / ໄວເຕີບໃຫຍ່ (puberty), ຮໍໂມນ (hormone),
//   ເຊື້ອອະສຸຈິ (sperm), ໄຂ່ (egg), ໄຊໂກດ (zygote), ມົດລູກ (uterus), ການປະຈຳເດືອນ (menstruation),
//   ປະຕິກິລິຍາເຄມີ (chemical reaction), ມວນໂມເລກຸນ (molecular mass), ອົກຊີເດຊັນ (oxidation), ສົມຜົນເຄມີ (equation),
//   ກະແສໄຟຟ້າກົງ (direct current), ຄວາມຕ້ານທານ (resistance), ກົດເກນໂອມ (Ohm's law), ກຳລັງໄຟຟ້າ (electric power),
//   ກົດເກນ Joule-Lenz, ອາຊິດ / ບາເຊ / ເກືອ (acid / base / salt), ລິດມັສ (litmus), ການສະເໝີ (neutralisation),
//   ໄຟຟ້າແມ່ເຫຼັກ (electromagnetism), ສະໜາມແມ່ເຫຼັກ / ເສັ້ນແຮງ (field / field lines), ກະແສໄຟຟ້າສະທ້ອນ (induced current),
//   ມໍເຕີ (motor), ເຄື່ອງກຳເນີດ (generator), ໄຟຟ້າກະແສສະຫຼັບ (alternating current), ໝໍ້ແປງໄຟ (transformer),
//   ເລນ (lens; curriculum ເລນສວດ = convex, ເລນຫຼຸບ = concave, mapping assumed), ສາຍຕາສັ້ນ / ສາຍຕາຍາວ,
//   ປຣິສຶມ (prism), ທາດອິນຄະທາດ / ທາດອະນິນຄະທາດ (organic / inorganic), ໂຄໂມໂຊມ (chromosome), ແຊນ (gene),
//   ການກຳນົດເພດ (sex determination), ປະສິດທິພາບ (efficiency), ສານຕົກຄ້າງ (residue).

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
    id: `m4-${String(order).padStart(2, '0')}`,
    grade: 'm4',
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

export const m4: LessonDef[] = [
  lesson(1, ['ການສືບພັນ ແລະ ພັດທະນາການຂອງຮ່າງກາຍມະນຸດ', 'Human reproduction and development'], 18, 'bio', {
    summary: [
      'ບົດນີ້ອະທິບາຍການເຕີບໃຫຍ່ຂອງຮ່າງກາຍ, ລະບົບສືບພັນ, ການຖືພາ ແລະ ການປ້ອງກັນພະຍາດ ດ້ວຍຂໍ້ມູນທີ່ຖືກຕ້ອງ ແລະ ດ້ວຍຄວາມເຄົາລົບ.',
      'This lesson explains how the body develops, the reproductive system, pregnancy and disease prevention, using accurate facts and respect.',
    ],
    objectives: [
      ['ອະທິບາຍພັດທະນາການຂອງຮ່າງກາຍຍິງ ແລະ ຊາຍ', 'Describe the development of the female and male body'],
      ['ເຂົ້າໃຈໂຄງສ້າງ ແລະ ໜ້າທີ່ຂອງອະໄວຍະວະສືບພັນ', 'Understand the structure and function of the reproductive organs'],
      [
        'ອະທິບາຍການປະຈຳເດືອນ, ການຖືພາ, ການເກີດລູກ ແລະ ການວາງແຜນຄອບຄົວ',
        'Explain menstruation, pregnancy, birth and family planning',
      ],
      ['ຮູ້ພະຍາດຂອງລະບົບສືບພັນ ແລະ ວິທີປ້ອງກັນ', 'Know diseases of the reproductive system and how to prevent them'],
    ],
    keyIdeas: [
      [
        'ໄວໜຸ່ມ: ຮໍໂມນເຮັດໃຫ້ຮ່າງກາຍປ່ຽນແປງ ເຊິ່ງເປັນເລື່ອງປົກກະຕິ ແລະ ແຕ່ລະຄົນເລີ່ມບໍ່ພ້ອມກັນ.',
        'Puberty: hormones change the body. This is normal, and everyone starts at a different time.',
      ],
      [
        'ການປະສົມພັນ: ໄຂ່ + ເຊື້ອອະສຸຈິ → ໄຊໂກດ (zygote) → ຝັງໃນມົດລູກ ແລະ ເຕີບໃຫຍ່.',
        'Fertilisation: egg + sperm → zygote → implants in the uterus and grows.',
      ],
      [
        'ການຖືພາປະມານ 9 ເດືອນ; ຕ້ອງການອາຫານທີ່ມີປະໂຫຍດ ແລະ ການກວດຄັນສຸຂະພາບ.',
        'Pregnancy lasts about 9 months and needs good nutrition and regular check-ups.',
      ],
      [
        'ພະຍາດຕິດຕໍ່ ເຊັ່ນ HIV ປ້ອງກັນໄດ້ດ້ວຍຄວາມຮູ້ ແລະ ການປຶກສາບຸກຄະລາກອນສາທາລະນະສຸກ.',
        'Infections such as HIV can be prevented with knowledge and by consulting health workers.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງການວາງແຜນຄອບຄົວຈຶ່ງສຳຄັນ?', 'Why is family planning important?'],
      [
        'ແມ່ຍິງຖືພາຄວນເຮັດຫຍັງເພື່ອສຸຂະພາບຂອງແມ່ ແລະ ລູກ?',
        'What should a pregnant woman do for the health of mother and baby?',
      ],
    ],
    activity: [
      'ແບ່ງກຸ່ມຕອບບັດຄຳຖາມ "ຄວາມຈິງ / ຄວາມເຂົ້າໃຈຜິດ" ກ່ຽວກັບໄວໜຸ່ມ ແລະ ສຸຂະພາບ. ຄູສາມາດຂ້າມກິດຈະກຳນີ້ ຫຼື ປັບໃຫ້ເໝາະສົມກັບຫ້ອງຮຽນ.',
      'In groups, answer "fact or myth" cards about puberty and health. The teacher may skip or adapt this activity to suit the class.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ສານເຄມີທີ່ຄວບຄຸມການປ່ຽນແປງຂອງຮ່າງກາຍໃນໄວໜຸ່ມ ເອີ້ນວ່າ...', 'The chemicals that control body changes in puberty are called...'],
        [
          ['ວິຕາມິນ', 'Vitamins'],
          ['ຮໍໂມນ', 'Hormones'],
          ['ແຮ່ທາດ', 'Minerals'],
        ],
        1,
        ['ຮໍໂມນຖືກສ້າງໂດຍຕ່ອມ ແລະ ກະຕຸ້ນການປ່ຽນແປງຂອງຮ່າງກາຍ.', 'Hormones are made by glands and trigger the changes of the body.'],
      ],
      [
        ['ໄຂ່ທີ່ໄດ້ຮັບການປະສົມເຊື້ອອະສຸຈິ ເອີ້ນວ່າ...', 'A fertilised egg is called a...'],
        [
          ['ໄຊໂກດ (zygote)', 'Zygote'],
          ['ມົດລູກ', 'Uterus'],
          ['ຮໍໂມນ', 'Hormone'],
        ],
        0,
        ['ໄຊໂກດແບ່ງຕົວ ແລະ ຝັງໃນມົດລູກ ເພື່ອເຕີບໃຫຍ່ເປັນທາລົກ.', 'The zygote divides and implants in the uterus to grow into a baby.'],
      ],
      [
        ['ວິທີໃດຊ່ວຍປ້ອງກັນພະຍາດຕິດຕໍ່ ເຊັ່ນ HIV ໄດ້ດີທີ່ສຸດ?', 'What best helps prevent infections such as HIV?'],
        [
          ['ຮູ້ຂໍ້ມູນທີ່ຖືກຕ້ອງ ແລະ ປຶກສາບຸກຄະລາກອນສາທາລະນະສຸກ', 'Knowing correct facts and consulting health workers'],
          ['ບໍ່ຕ້ອງເຮັດຫຍັງ', 'Doing nothing'],
          ['ເຊື່ອຄຳລື່ນລື້ອທີ່ໄດ້ຍິນມາ', 'Believing rumours'],
        ],
        0,
        ['ຄວາມຮູ້ທີ່ຖືກຕ້ອງ ແລະ ການຮັບຄຳແນະນຳຈາກສະຖານທີ່ສາທາລະນະສຸກ ຊ່ວຍປ້ອງກັນໄດ້.', 'Correct knowledge and advice from health services help prevent infection.'],
      ],
    ],
  }),

  lesson(2, ['ການປ່ຽນແປງຂອງທາດຕ່າງໆ', 'Changes of substances: reactions, oxygen, nitrogen'], 17, 'chem', {
    summary: [
      'ປະຕິກິລິຍາເຄມີເຮັດໃຫ້ເກີດທາດໃໝ່ ແລະ ມວນສານລວມຄົງທີ່. ອົກຊີແຊນ (≈ 21%) ຊ່ວຍການເຜົາ ແລະ ເຮັດໃຫ້ເຫຼັກເປັນສະນິມ; ໄນໂຕຣແຊນ (≈ 78%) ບໍ່ວ່ອງໄວ.',
      'A chemical reaction makes new substances and total mass is conserved. Oxygen (≈ 21%) supports burning and rusting; nitrogen (≈ 78%) is unreactive.',
    ],
    objectives: [
      ['ບອກຄວາມໝາຍ, ປະໂຫຍດ ແລະ ໂທດຂອງປະຕິກິລິຍາເຄມີ', 'Define chemical reactions and state their benefits and harms'],
      ['ຍົກຕົວຢ່າງປະຕິກິລິຍາເຄມີໃນທຳມະຊາດ ແລະ ທີ່ມະນຸດສ້າງຂຶ້ນ', 'Give examples of natural and man-made reactions'],
      ['ຂຽນສູດເຄມີຂອງທາດ ແລະ ຄິດໄລ່ມວນໂມເລກຸນ', 'Write chemical formulas and calculate molecular mass'],
      ['ອະທິບາຍອົກຊີແຊນ, ອົກຊີເດຊັນ ແລະ ໄນໂຕຣແຊນ ແລະ ການນຳໃຊ້', 'Explain oxygen, oxidation and nitrogen, and their uses'],
    ],
    keyIdeas: [
      [
        'ເກີດທາດໃໝ່ ເຫັນໄດ້ຈາກ: ມີຟອງກາສ, ປ່ຽນສີ, ເກີດຕະກອນ, ເກີດຄວາມຮ້ອນ ຫຼື ແສງ.',
        'A new substance forms: gas bubbles, colour change, a precipitate, heat or light.',
      ],
      [
        'ມວນສານຮັກສາ: ມວນກ່ອນປະຕິກິລິຍາ = ມວນຫຼັງປະຕິກິລິຍາ ຈຶ່ງຕ້ອງດຸນສົມຜົນ.',
        'Mass is conserved: mass before = mass after, so equations must be balanced.',
      ],
      ['ຕົວຢ່າງ: 2H₂ + O₂ → 2H₂O', 'Example: 2H₂ + O₂ → 2H₂O'],
      [
        'ອົກຊີແຊນ ≈ 21% ຂອງອາກາດ ຊ່ວຍການເຜົາ ແລະ ເຮັດໃຫ້ເຫຼັກເປັນສະນິມ (ອົກຊີເດຊັນ).',
        'Oxygen ≈ 21% of air supports burning and makes iron rust (oxidation).',
      ],
      [
        'ໄນໂຕຣແຊນ ≈ 78% ຂອງອາກາດ ບໍ່ວ່ອງໄວ ແລະ ໃຊ້ເຮັດປຸ໋ຍ.',
        'Nitrogen ≈ 78% of air is unreactive and is used to make fertiliser.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງຂີ້ເທົ່າຫຼັງເຜົາໄມ້ເບົາກວ່າໄມ້? ມວນສານຫາຍໄປບໍ?', 'Why is the ash lighter than the wood? Has mass been lost?'],
      ['ສະນິມເຫຼັກເກີດຈາກຫຍັງ?', 'What makes iron rust?'],
    ],
    activity: [
      'ໃສ່ຂົນເຫຼັກ (steel wool) ປຽກໃນຫຼອດທົດລອງ ແລ້ວຄວ່ຳລົງໃນນ້ຳ ທິ້ງໄວ້ ແລ້ວສັງເກດນ້ຳຂຶ້ນປະມານ 1/5 ຂອງຫຼອດ.',
      'Put wet steel wool in a test tube, invert it in water and leave it; the water rises by about 1/5 of the tube.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ຂໍ້ໃດບົ່ງບອກວ່າເກີດປະຕິກິລິຍາເຄມີ?', 'Which observation suggests a chemical reaction has happened?'],
        [
          ['ນ້ຳກ້ອນລະລາຍ', 'Ice melts'],
          ['ມີຟອງກາສເກີດຂຶ້ນ ແລະ ເກີດທາດໃໝ່', 'Gas bubbles form and a new substance appears'],
          ['ນ້ຳຕານລະລາຍໃນນ້ຳ', 'Sugar dissolves in water'],
        ],
        1,
        ['ການເກີດກາສໃໝ່ເປັນສັນຍານຂອງປະຕິກິລິຍາເຄມີ. ອີກສອງຂໍ້ເປັນການປ່ຽນທາງຟີຊິກ.', 'New gas is a sign of a chemical reaction. The other two are physical changes.'],
      ],
      [
        ['2H₂ + O₂ → 2H₂O: ໄຮໂດຣເຈນ 4 g ປະຕິກິລິຍາກັບອົກຊີແຊນ 32 g ໄດ້ນ້ຳເທົ່າໃດ?', '2H₂ + O₂ → 2H₂O: 4 g of hydrogen reacts with 32 g of oxygen. How much water forms?'],
        [
          ['28 g', '28 g'],
          ['36 g', '36 g'],
          ['128 g', '128 g'],
        ],
        1,
        ['ມວນສານຮັກສາ: 4 + 32 = 36 g.', 'Mass is conserved: 4 + 32 = 36 g.'],
      ],
      [
        ['ສະນິມເຫຼັກຕ້ອງການສິ່ງໃດ?', 'What does iron need in order to rust?'],
        [
          ['ໄນໂຕຣແຊນ ແລະ ແສງ', 'Nitrogen and light'],
          ['ອົກຊີແຊນ ແລະ ນ້ຳ', 'Oxygen and water'],
          ['ຄາບອນໄດອອກໄຊ ເທົ່ານັ້ນ', 'Carbon dioxide only'],
        ],
        1,
        ['ເຫຼັກ + ອົກຊີແຊນ + ນ້ຳ ເກີດສະນິມ.', 'Iron + oxygen + water produces rust.'],
      ],
    ],
  }),

  lesson(3, ['ໄຟຟ້າກະແສກົງ', 'Direct-current electricity'], 20, 'phys', {
    sim: 'circuit',
    simProps: { mode: 'ohm' },
    summary: [
      'ກົດເກນໂອມ: V = I × R. ຄວາມຕ້ານທານລວມຂອງການຕໍ່ລຽນ ແລະ ຂະໜານຕ່າງກັນ. ກຳລັງໄຟຟ້າ P = V × I.',
      'Ohm’s law: V = I × R. Series and parallel circuits have different total resistance. Electric power is P = V × I.',
    ],
    objectives: [
      ['ຄົ້ນຫາຄວາມສຳພັນລະຫວ່າງຄວາມຕ່າງລະດັບໄຟຟ້າ, ກະແສ ແລະ ຄວາມຕ້ານທານ', 'Find the relation between potential difference, current and resistance'],
      ['ເຂົ້າໃຈກົດເກນໂອມ', 'Understand Ohm’s law'],
      ['ຕໍ່ວົງຈອນແບບລຽນ ແລະ ແບບຂະໜານ ແລະ ຄິດໄລ່ຄວາມຕ້ານທານລວມ', 'Wire series and parallel circuits and calculate total resistance'],
      ['ຮູ້ວ່າຄວາມຕ້ານທານຂຶ້ນກັບຄວາມຍາວ, ເນື້ອທີ່ໜ້າຕັດ ແລະ ຊະນິດຂອງວັດຖຸ', 'Know that resistance depends on length, cross-section and material'],
      ['ຄິດໄລ່ກຳລັງໄຟຟ້າ ແລະ ພະລັງງານ', 'Calculate electric power and energy'],
    ],
    keyIdeas: [
      ['ກົດເກນໂອມ: V = I × R.', 'Ohm’s law: V = I × R.'],
      [
        'ຕໍ່ລຽນ: R = R₁ + R₂ (ກະແສຄືກັນ, ແຮງດັນແບ່ງກັນ). ຕໍ່ຂະໜານ: 1/R = 1/R₁ + 1/R₂ (ແຮງດັນຄືກັນ, ກະແສແບ່ງກັນ; R ນ້ອຍກວ່າຕົວນ້ອຍສຸດ).',
        'Series: R = R₁ + R₂ (same current, voltage shared). Parallel: 1/R = 1/R₁ + 1/R₂ (same voltage, current shared; R is less than the smallest).',
      ],
      ['ກຳລັງ P = V × I (W); ພະລັງງານ E = P × t (J).', 'Power P = V × I (W); energy E = P × t (J).'],
      ['ຄວາມຕ້ານທານ R = ρL/A: ສາຍຍາວຂຶ້ນ R ຫຼາຍຂຶ້ນ; ສາຍໃຫຍ່ຂຶ້ນ R ນ້ອຍລົງ.', 'Resistance R = ρL/A: a longer wire has more R; a thicker wire has less R.'],
      [
        'ໃຊ້ເຄື່ອງໃຊ້ໄຟຟ້າຢ່າງປະຢັດ ແລະ ປອດໄພ (ຟິວ, ສາຍດິນ).',
        'Use electrical appliances economically and safely (fuses, earth wire).',
      ],
    ],
    questions: [
      ['ຕົວຕ້ານທານ 10 Ω ຕໍ່ກັບ 12 V ຈະມີກະແສເທົ່າໃດ?', 'A 10 Ω resistor is connected to 12 V. What is the current? (answer 1.2 A)'],
      ['ເປັນຫຍັງສາຍໄຟເສັ້ນນ້ອຍຈຶ່ງຮ້ອນຫຼາຍ?', 'Why does a thin wire get hotter?'],
    ],
    activity: [
      'ຖ້າມີອຸປະກອນ: ວັດ V ແລະ I ຂອງຕົວຕ້ານທານໜຶ່ງ ແລ້ວແຕ້ມກຣາຟ V-I (ຄວນເປັນເສັ້ນຊື່) ແລະ ປຽບທຽບກັບການຈຳລອງ.',
      'If equipment is available: measure V and I of a resistor and draw a V-I graph (it should be a straight line). Compare with the simulation.',
    ],
    minutes: 35,
    quiz: [
      [
        ['ຕົວຕ້ານທານ 20 Ω ຕໍ່ກັບ 12 V. ກະແສເທົ່າໃດ?', 'A 20 Ω resistor is connected to 12 V. What is the current?'],
        [
          ['0.6 A', '0.6 A'],
          ['1.7 A', '1.7 A'],
          ['240 A', '240 A'],
        ],
        0,
        ['I = V ÷ R = 12 ÷ 20 = 0.6 A.', 'I = V ÷ R = 12 ÷ 20 = 0.6 A.'],
      ],
      [
        ['ຕໍ່ຕົວຕ້ານທານ 10 Ω ແລະ 20 Ω ແບບລຽນ. ຄວາມຕ້ານທານລວມເທົ່າໃດ?', 'A 10 Ω and a 20 Ω resistor are connected in series. What is the total resistance?'],
        [
          ['6.7 Ω', '6.7 Ω'],
          ['15 Ω', '15 Ω'],
          ['30 Ω', '30 Ω'],
        ],
        2,
        ['ຕໍ່ລຽນ R = 10 + 20 = 30 Ω. (6.7 Ω ແມ່ນຄ່າຂອງການຕໍ່ຂະໜານ.)', 'In series R = 10 + 20 = 30 Ω. (6.7 Ω is the value for parallel.)'],
      ],
      [
        ['ຕົວຕ້ານທານ 10 Ω ແລະ 20 Ω ຕໍ່ຂະໜານ. ຄວາມຕ້ານທານລວມ...', 'A 10 Ω and a 20 Ω resistor are in parallel. The total resistance is...'],
        [
          ['ໃຫຍ່ກວ່າ 20 Ω', 'More than 20 Ω'],
          ['ລະຫວ່າງ 10 Ω ແລະ 20 Ω', 'Between 10 Ω and 20 Ω'],
          ['ນ້ອຍກວ່າ 10 Ω', 'Less than 10 Ω'],
        ],
        2,
        ['1/R = 1/10 + 1/20 → R = 6.7 Ω, ນ້ອຍກວ່າຕົວນ້ອຍສຸດສະເໝີ.', '1/R = 1/10 + 1/20 → R = 6.7 Ω, always less than the smallest one.'],
      ],
      [
        ['ເຕົາໄຟຟ້າໃຊ້ 12 V ແລະ 2 A. ກຳລັງໄຟຟ້າເທົ່າໃດ?', 'A heater uses 12 V and 2 A. What is its power?'],
        [
          ['6 W', '6 W'],
          ['14 W', '14 W'],
          ['24 W', '24 W'],
        ],
        2,
        ['P = V × I = 12 × 2 = 24 W.', 'P = V × I = 12 × 2 = 24 W.'],
      ],
    ],
  }),

  lesson(4, ['ນ້ຳ, ອາຊິດ, ບາເຊ ແລະ ເກືອ', 'Water, acids, bases and salts'], 15, 'chem', {
    summary: [
      'ອາຊິດເຮັດໃຫ້ລິດມັສຟ້າເປັນແດງ, ບາເຊເຮັດໃຫ້ລິດມັສແດງເປັນຟ້າ. ອາຊິດ + ບາເຊ → ເກືອ + ນ້ຳ (ການສະເໝີ).',
      'Acids turn blue litmus red, bases turn red litmus blue. Acid + base → salt + water (neutralisation).',
    ],
    objectives: [
      ['ບອກສ່ວນປະກອບຂອງນ້ຳ, ອາຊິດ, ບາເຊ ແລະ ເກືອ', 'State the composition of water, acids, bases and salts'],
      ['ຂຽນສູດເຄມີຂອງອາຊິດ, ບາເຊ ແລະ ເກືອ ບາງຊະນິດ', 'Write the formulas of some acids, bases and salts'],
      ['ບອກຄຸນສົມບັດທາງເຄມີຂອງນ້ຳ, ອາຊິດ, ບາເຊ ແລະ ເກືອ', 'State the chemical properties of water, acids, bases and salts'],
      ['ຂຽນສົມຜົນປະຕິກິລິຍາລະຫວ່າງອາຊິດ, ບາເຊ, ເກືອ ແລະ ນ້ຳ', 'Write equations of reactions among acids, bases, salts and water'],
    ],
    keyIdeas: [
      [
        'ນ້ຳ H₂O; ອາຊິດ ເຊັ່ນ HCl, H₂SO₄ ເຮັດໃຫ້ລິດມັສຟ້າເປັນແດງ (ອາຊິດອ່ອນໃນອາຫານ ມີລົດສົ້ມ).',
        'Water is H₂O; acids such as HCl and H₂SO₄ turn blue litmus red (weak food acids taste sour).',
      ],
      [
        'ບາເຊ ເຊັ່ນ NaOH ເຮັດໃຫ້ລິດມັສແດງເປັນຟ້າ ແລະ ຮູ້ສຶກລື່ນ.',
        'Bases such as NaOH turn red litmus blue and feel slippery.',
      ],
      [
        'ອາຊິດ + ບາເຊ → ເກືອ + ນ້ຳ (ການສະເໝີ).',
        'Acid + base → salt + water (neutralisation).',
      ],
      ['ຕົວຢ່າງ: HCl + NaOH → NaCl + H₂O.', 'Example: HCl + NaOH → NaCl + H₂O.'],
      [
        'ອາຊິດ ແລະ ບາເຊເຂັ້ມຂຸ້ນເປັນອັນຕະລາຍ: ໃສ່ແວ່ນຕາ, ຖົງມື ແລະ ຢ່າຊີມ.',
        'Concentrated acids and bases are dangerous: wear goggles and gloves and never taste them.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງຢາແກ້ກະເພາະເປັນກົດ ຈຶ່ງມີບາເຊ?', 'Why do antacid medicines contain a base?'],
      ['ເປັນຫຍັງຕ້ອງສວມແວ່ນຕາປ້ອງກັນເມື່ອເຮັດວຽກກັບອາຊິດ?', 'Why must you wear goggles when working with acids?'],
    ],
    activity: [
      'ເຮັດຕົວຊີ້ວັດຈາກກະລຳປີມ່ວງ ແລ້ວທົດສອບນ້ຳສົ້ມສາຍຊູ, ນ້ຳມະນາວ, ນ້ຳສະບູ ແລະ ນ້ຳເບກກິງໂຊດາ ແລ້ວບັນທຶກສີ.',
      'Make an indicator from red cabbage and test vinegar, lemon juice, soapy water and baking-soda solution; record the colours.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ສານໃດເຮັດໃຫ້ລິດມັສຟ້າເປັນສີແດງ?', 'Which substance turns blue litmus red?'],
        [
          ['ອາຊິດ', 'An acid'],
          ['ບາເຊ', 'A base'],
          ['ນ້ຳບໍລິສຸດ', 'Pure water'],
        ],
        0,
        ['ອາຊິດເຮັດໃຫ້ລິດມັສຟ້າເປັນແດງ.', 'Acids turn blue litmus red.'],
      ],
      [
        ['HCl + NaOH → ? + H₂O. ຜະລິດຕະພັນອີກຊະນິດແມ່ນຫຍັງ?', 'HCl + NaOH → ? + H₂O. What is the other product?'],
        [
          ['NaCl', 'NaCl'],
          ['H₂', 'H₂'],
          ['Cl₂', 'Cl₂'],
        ],
        0,
        ['ອາຊິດ + ບາເຊ → ເກືອ + ນ້ຳ, ເກືອແມ່ນ NaCl.', 'Acid + base → salt + water; the salt is NaCl.'],
      ],
      [
        ['ການສະເໝີ (neutralisation) ແມ່ນຫຍັງ?', 'What is neutralisation?'],
        [
          ['ການລະລາຍເກືອໃນນ້ຳ', 'Dissolving salt in water'],
          ['ອາຊິດປະຕິກິລິຍາກັບບາເຊ ໄດ້ເກືອ ແລະ ນ້ຳ', 'An acid reacting with a base to give a salt and water'],
          ['ການຕົ້ມນ້ຳ', 'Boiling water'],
        ],
        1,
        ['ການສະເໝີຄືປະຕິກິລິຍາລະຫວ່າງອາຊິດ ແລະ ບາເຊ.', 'Neutralisation is the reaction between an acid and a base.'],
      ],
    ],
  }),

  lesson(5, ['ໄຟຟ້າແມ່ເຫຼັກ', 'Electromagnetism'], 15, 'phys', {
    sim: 'solenoid',
    summary: [
      'ກະແສໄຟຟ້າສ້າງສະໜາມແມ່ເຫຼັກ. ແມ່ເຫຼັກໄຟຟ້າແຮງຂຶ້ນເມື່ອມີລວດຫຼາຍຮອບ, ກະແສຫຼາຍ ແລະ ມີແກນເຫຼັກ. ການເຄື່ອນແມ່ເຫຼັກຜ່ານລວດ ເກີດກະແສສະທ້ອນ.',
      'An electric current makes a magnetic field. An electromagnet is stronger with more turns, more current and an iron core. Moving a magnet through a coil induces a current.',
    ],
    objectives: [
      ['ຄົ້ນຫາລັກສະນະຂອງແມ່ເຫຼັກ ແລະ ເສັ້ນແຮງແມ່ເຫຼັກ', 'Explore the properties of magnets and magnetic field lines'],
      ['ຢັ້ງຢືນວ່າກະແສໄຟຟ້າໃຫ້ເກີດສະໜາມແມ່ເຫຼັກ', 'Show that an electric current produces a magnetic field'],
      ['ອະທິບາຍແມ່ເຫຼັກໄຟຟ້າ, ແຮງແມ່ເຫຼັກ ແລະ ມໍເຕີ', 'Explain electromagnets, magnetic force and motors'],
      ['ອະທິບາຍກະແສສະທ້ອນ ແລະ ເຄື່ອງກຳເນີດໄຟຟ້າ', 'Explain induced current and generators'],
    ],
    keyIdeas: [
      [
        'ເສັ້ນແຮງແມ່ເຫຼັກອອກຈາກຂົ້ວເໜືອ (N) ເຂົ້າຂົ້ວໃຕ້ (S); ຍິ່ງແໜ້ນ ຍິ່ງແຮງ.',
        'Field lines leave the north pole (N) and enter the south pole (S); the closer together, the stronger.',
      ],
      [
        'ກະແສໃນສາຍໄຟສ້າງວົງແມ່ເຫຼັກອ້ອມສາຍ (ກົດມືຂວາ: ໂປ້ຕາມກະແສ, ນິ້ວຕາມທິດສະໜາມ).',
        'Current in a wire makes circles of field around it (right-hand rule: thumb along the current, fingers along the field).',
      ],
      [
        'ແມ່ເຫຼັກໄຟຟ້າ (ລວດພັນເປັນຮອບ): B = μ₀·n·I; ແຮງຂຶ້ນເມື່ອ N ຫຼາຍ, I ຫຼາຍ, ມີແກນເຫຼັກ.',
        'Electromagnet (coil): B = μ₀·n·I; stronger with more turns, more current and an iron core.',
      ],
      [
        'ເມື່ອສະຫຼັບທິດກະແສ → ຂົ້ວເໜືອ-ໃຕ້ ສະຫຼັບກັນ.',
        'Reversing the current swaps the north and south poles.',
      ],
      [
        'ການເຄື່ອນແມ່ເຫຼັກຜ່ານລວດ ເກີດກະແສສະທ້ອນ → ເຄື່ອງກຳເນີດໄຟຟ້າ.',
        'Moving a magnet through a coil induces a current → the generator.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງໂຮງງານຈຶ່ງໃຊ້ແມ່ເຫຼັກໄຟຟ້າຍົກເຫຼັກ?', 'Why do scrapyards use electromagnets to lift iron?'],
      ['ເຄື່ອງກຳເນີດໄຟຟ້າໃນເຂື່ອນເຮັດວຽກແນວໃດ?', 'How does a generator in a dam work?'],
    ],
    activity: [
      'ພັນລວດໄຟ 20 ຮອບເທິງຕະປູເຫຼັກ ຕໍ່ກັບຖ່ານໄຟ ແລ້ວນັບຈຳນວນເຂັມໝຸດທີ່ດຶງໄດ້; ປ່ຽນຈຳນວນຮອບ ແລະ ປຽບທຽບ. (ລວດຈະຮ້ອນ: ຢ່າຕໍ່ດົນ.)',
      'Wind 20 turns of wire on an iron nail, connect a battery and count the pins it lifts; change the number of turns and compare. (The wire gets warm: do not leave it connected for long.)',
    ],
    minutes: 30,
    quiz: [
      [
        ['ວິທີໃດເຮັດໃຫ້ແມ່ເຫຼັກໄຟຟ້າແຮງຂຶ້ນ?', 'Which change makes an electromagnet stronger?'],
        [
          ['ໃຊ້ລວດໜ້ອຍຮອບລົງ', 'Using fewer turns'],
          ['ເພີ່ມຈຳນວນຮອບ ແລະ ກະແສ', 'Adding more turns and more current'],
          ['ເອົາແກນເຫຼັກອອກ', 'Removing the iron core'],
        ],
        1,
        ['B ∝ N ແລະ B ∝ I; ແກນເຫຼັກຊ່ວຍເພີ່ມອີກ.', 'B ∝ N and B ∝ I; an iron core adds even more.'],
      ],
      [
        ['ຖ້າສະຫຼັບທິດກະແສໃນຂົດລວດ ຈະເກີດຫຍັງຂຶ້ນກັບຂົ້ວແມ່ເຫຼັກ?', 'What happens to the poles if you reverse the current in a coil?'],
        [
          ['ບໍ່ປ່ຽນ', 'Nothing changes'],
          ['ຂົ້ວເໜືອ-ໃຕ້ ສະຫຼັບກັນ', 'North and south poles swap'],
          ['ແມ່ເຫຼັກຫາຍໄປ', 'The magnet disappears'],
        ],
        1,
        ['ກົດມືຂວາ: ກັບທິດກະແສ → ກັບທິດສະໜາມ.', 'Right-hand rule: reversed current → reversed field.'],
      ],
      [
        ['ສິ່ງໃດເຮັດໃຫ້ເກີດກະແສສະທ້ອນໃນຂົດລວດ?', 'What induces a current in a coil?'],
        [
          ['ແມ່ເຫຼັກທີ່ວາງຢູ່ນິ່ງໆ', 'A magnet resting still'],
          ['ການເຄື່ອນແມ່ເຫຼັກເຂົ້າ-ອອກຂົດລວດ', 'Moving a magnet in and out of the coil'],
          ['ການເຜົາຂົດລວດ', 'Burning the coil'],
        ],
        1,
        ['ກະແສເກີດເມື່ອສະໜາມແມ່ເຫຼັກທີ່ຜ່ານຂົດລວດປ່ຽນແປງ.', 'A current is induced when the magnetic field through the coil changes.'],
      ],
    ],
  }),

  lesson(6, ['ໄຟຟ້າກະແສສະຫຼັບ', 'Alternating-current electricity'], 10, 'phys', {
    summary: [
      'ໄຟຟ້າກະແສສະຫຼັບ (AC) ປ່ຽນທິດຊ້ຳໆ. ເຄື່ອງກຳເນີດສ້າງ AC; ໝໍ້ແປງໄຟປ່ຽນແຮງດັນ; ການສົ່ງໄຟໄກໃຊ້ແຮງດັນສູງເພື່ອສູນເສຍນ້ອຍ.',
      'Alternating current (AC) reverses direction repeatedly. Generators make AC, transformers change voltage, and long-distance transmission uses high voltage to lose little energy.',
    ],
    objectives: [
      ['ເຂົ້າໃຈຄວາມໝາຍຂອງໄຟຟ້າກະແສສະຫຼັບ', 'Understand what alternating current is'],
      ['ອະທິບາຍສ່ວນປະກອບ ແລະ ການເຮັດວຽກຂອງເຄື່ອງກຳເນີດ ແລະ ໝໍ້ແປງໄຟ', 'Explain the parts and working of generators and transformers'],
      ['ຍົກຕົວຢ່າງການນຳໃຊ້ກະແສສະຫຼັບ', 'Give uses of alternating current'],
      ['ອະທິບາຍການສົ່ງໄຟຟ້າໄປໄກ', 'Explain long-distance power transmission'],
    ],
    keyIdeas: [
      [
        'AC: ກະແສປ່ຽນທິດ; ໄຟບ້ານປະມານ 230 V, 50 Hz (ປ່ຽນທິດ 100 ເທື່ອຕໍ່ວິນາທີ).',
        'AC reverses direction; household mains is about 230 V, 50 Hz (100 reversals per second).',
      ],
      [
        'ເຄື່ອງກຳເນີດ: ຂົດລວດໝູນໃນສະໜາມແມ່ເຫຼັກ (ຫຼື ແມ່ເຫຼັກໝູນ) ເກີດກະແສສະທ້ອນ.',
        'Generator: a coil turning in a magnetic field (or a turning magnet) induces a current.',
      ],
      [
        'ໝໍ້ແປງໄຟ: Vp/Vs = Np/Ns (ໃຊ້ໄດ້ກັບ AC ເທົ່ານັ້ນ).',
        'Transformer: Vp/Vs = Np/Ns (works with AC only).',
      ],
      [
        'ສົ່ງດ້ວຍແຮງດັນສູງ → ກະແສຕ່ຳ → ສູນເສຍ P = I²R ໜ້ອຍ.',
        'Transmit at high voltage → low current → little loss P = I²R.',
      ],
    ],
    questions: [
      ['ໝໍ້ແປງ 230 V ເຂົ້າ, ລວດປະຖົມ 1000 ຮອບ, ລວດທຸຕິຍະ 100 ຮອບ. ແຮງດັນອອກເທົ່າໃດ?', 'A transformer has 230 V in, 1000 primary turns and 100 secondary turns. What is the output voltage? (answer 23 V)'],
      ['ເປັນຫຍັງສາຍສົ່ງໄຟຟ້າໄປໄກຈຶ່ງໃຊ້ແຮງດັນສູງ?', 'Why do long-distance power lines use high voltage?'],
    ],
    activity: [
      'ຄິດໄລ່ຕາຕະລາງ ກະແສ ແລະ ກຳລັງສູນເສຍ ເມື່ອສົ່ງ 10 kW ຜ່ານສາຍ R = 1 Ω ທີ່ 230 V ແລະ 11 kV.',
      'Calculate a table of current and power loss when sending 10 kW through a wire of R = 1 Ω at 230 V and at 11 kV.',
    ],
    minutes: 25,
    quiz: [
      [
        ['ໝໍ້ແປງມີ Np = 500 ແລະ Ns = 50. ເຂົ້າ 220 V ອອກເທົ່າໃດ?', 'A transformer has Np = 500 and Ns = 50. With 220 V in, what is the output?'],
        [
          ['22 V', '22 V'],
          ['2200 V', '2200 V'],
          ['220 V', '220 V'],
        ],
        0,
        ['Vs = Vp × Ns/Np = 220 × 50/500 = 22 V.', 'Vs = Vp × Ns/Np = 220 × 50/500 = 22 V.'],
      ],
      [
        ['ເປັນຫຍັງຈຶ່ງສົ່ງໄຟຟ້າທາງໄກດ້ວຍແຮງດັນສູງ?', 'Why is electricity sent long distances at high voltage?'],
        [
          ['ເພື່ອໃຫ້ກະແສຕ່ຳ ແລະ ສູນເສຍຄວາມຮ້ອນໃນສາຍໜ້ອຍ', 'To get a low current and little heat loss in the wires'],
          ['ເພື່ອໃຫ້ສາຍເບົາລົງ', 'To make the wires lighter'],
          ['ເພື່ອໃຫ້ໄຟສະຫວ່າງກວ່າ', 'To make bulbs brighter'],
        ],
        0,
        ['P = V × I: V ສູງ ໃຫ້ I ຕ່ຳ ສຳລັບກຳລັງດຽວກັນ, ແລະ ການສູນເສຍແມ່ນ I²R.', 'P = V × I: a higher V gives a lower I for the same power, and the loss is I²R.'],
      ],
      [
        ['ໄຟຟ້າກະແສສະຫຼັບ 50 Hz ໝາຍຄວາມວ່າ...', 'Alternating current at 50 Hz means...'],
        [
          ['ກະແສໄຫຼທິດດຽວ 50 ເທື່ອ', 'The current flows one way 50 times'],
          ['ວົງຈອນສົມບູນ 50 ເທື່ອຕໍ່ວິນາທີ', '50 complete cycles per second'],
          ['ແຮງດັນ 50 V', 'A voltage of 50 V'],
        ],
        1,
        ['ຄວາມຖີ່ 50 Hz = 50 ວົງຮອບຕໍ່ວິນາທີ.', 'A frequency of 50 Hz = 50 cycles per second.'],
      ],
    ],
  }),

  lesson(7, ['ເລນ (ແກ້ວຕາເສືອ)', 'Lenses'], 25, 'phys', {
    sim: 'lens',
    summary: [
      'ເລນສວດ (convex) ລວມແສງ, ເລນຫຼຸບ (concave) ກະຈາຍແສງ. ຕຳແໜ່ງ ແລະ ລັກສະນະຂອງຮູບຄິດໄລ່ໄດ້ດ້ວຍ 1/f = 1/u + 1/v.',
      'A convex lens converges light and a concave lens diverges it. Position and nature of the image follow 1/f = 1/u + 1/v.',
    ],
    objectives: [
      ['ບອກຄວາມໝາຍເລນບາງ, ເລນສວດ (convex) ແລະ ເລນຫຼຸບ (concave)', 'Define thin, convex and concave lenses'],
      ['ບອກອົງປະກອບ: ແກນຫຼັກ ແລະ ຈຸດໂຟກັສ', 'Name the principal axis and the focus'],
      ['ວາດແຜນພາບຮັງສີ ແລະ ຮູບທີ່ເກີດຈາກເລນ', 'Draw ray diagrams and the images formed by lenses'],
      ['ອະທິບາຍກ້ອງຖ່າຍຮູບ, ຕາ ແລະ ສາຍຕາສັ້ນ-ຍາວ', 'Explain the camera, the eye and short and long sight'],
      ['ບອກວ່າແສງຂາວເປັນສົມປົນຂອງແສງສີ; ການແຍກ ແລະ ປະສົມແສງສີ', 'State that white light is a mixture of colours; dispersion and mixing of colours'],
    ],
    keyIdeas: [
      ['ເລນສວດລວມແສງ; ເລນຫຼຸບກະຈາຍແສງ.', 'A convex lens converges light; a concave lens diverges it.'],
      ['1/f = 1/u + 1/v; ການຂະຫຍາຍ m = −v/u.', '1/f = 1/u + 1/v; magnification m = −v/u.'],
      [
        'ເລນສວດ: ວັດຖຸໄກກວ່າ 2f → ຮູບຈິງ, ຫົວກັບລົງ, ຍ່ອ; ໃກ້ກວ່າ f → ຮູບລວງ, ຕັ້ງ, ຂະຫຍາຍ (ແວ່ນຂະຫຍາຍ).',
        'Convex lens: object beyond 2f → real, inverted, diminished; inside f → virtual, upright, magnified (magnifying glass).',
      ],
      [
        'ເລນຫຼຸບ ໃຫ້ຮູບລວງ, ຕັ້ງ, ນ້ອຍກວ່າ ສະເໝີ.',
        'A concave lens always gives a virtual, upright, smaller image.',
      ],
      [
        'ຕາ: ເລນສ້າງຮູບຈິງຫົວກັບລົງເທິງເຣຕີນາ; ສາຍຕາສັ້ນແກ້ດ້ວຍເລນຫຼຸບ, ສາຍຕາຍາວແກ້ດ້ວຍເລນສວດ. ແສງຂາວແຍກເປັນສີຕ່າງໆໃນປຣິສຶມ.',
        'Eye: the lens forms an inverted real image on the retina; short sight is corrected by concave lenses, long sight by convex lenses. White light splits into colours in a prism.',
      ],
    ],
    questions: [
      ['ແວ່ນຂະຫຍາຍໃຊ້ເລນຊະນິດໃດ ແລະ ຕ້ອງວາງວັດຖຸໄວ້ບ່ອນໃດ?', 'Which lens does a magnifying glass use and where must the object be?'],
      ['ເລນສວດ f = 10 cm, ວັດຖຸຢູ່ຫ່າງ 30 cm ຮູບຢູ່ບ່ອນໃດ?', 'A convex lens f = 10 cm, object at 30 cm: where is the image? (answer 15 cm, real, inverted, m = −0.5)'],
    ],
    activity: [
      'ໃຊ້ແວ່ນຂະຫຍາຍ (ເລນສວດ) ຮັບຮູບຂອງໜ້າຕ່າງ ຫຼື ຫຼອດໄຟເທິງເຈ້ຍຂາວ ແລ້ວວັດ u ແລະ v ແລະ ກວດສົມຜົນເລນ. (ຢ່າເບິ່ງດວງອາທິດຜ່ານເລນ.)',
      'Use a magnifying glass (convex lens) to focus a window or lamp onto white paper, measure u and v and check the lens equation. (Never look at the Sun through a lens.)',
    ],
    minutes: 40,
    quiz: [
      [
        ['ເລນສວດ f = 10 cm, ວັດຖຸຢູ່ 30 cm. ຮູບຢູ່ຫ່າງເທົ່າໃດ?', 'Convex lens f = 10 cm, object at 30 cm. How far is the image?'],
        [
          ['7.5 cm', '7.5 cm'],
          ['15 cm', '15 cm'],
          ['30 cm', '30 cm'],
        ],
        1,
        ['1/v = 1/10 − 1/30 = 2/30 → v = 15 cm, m = −15/30 = −0.5.', '1/v = 1/10 − 1/30 = 2/30 → v = 15 cm, m = −15/30 = −0.5.'],
      ],
      [
        ['ເລນຊະນິດໃດໃຫ້ຮູບລວງ ຕັ້ງ ແລະ ນ້ອຍກວ່າວັດຖຸ ສະເໝີ?', 'Which lens always gives a virtual, upright, smaller image?'],
        [
          ['ເລນສວດ (convex)', 'Convex lens'],
          ['ເລນຫຼຸບ (concave)', 'Concave lens'],
          ['ທັງສອງຊະນິດ', 'Both'],
        ],
        1,
        ['ເລນຫຼຸບກະຈາຍແສງ ຮູບຈຶ່ງເປັນຮູບລວງສະເໝີ.', 'A concave lens diverges light so the image is always virtual.'],
      ],
      [
        ['ວັດຖຸຢູ່ໃກ້ກວ່າ f ຂອງເລນສວດ ຮູບທີ່ໄດ້ເປັນແນວໃດ?', 'An object is closer than f to a convex lens. What is the image like?'],
        [
          ['ຮູບຈິງ ຫົວກັບລົງ', 'Real and inverted'],
          ['ຮູບລວງ ຕັ້ງ ຂະຫຍາຍ', 'Virtual, upright and magnified'],
          ['ບໍ່ເກີດຮູບ', 'No image'],
        ],
        1,
        ['ນີ້ຄືຫຼັກການຂອງແວ່ນຂະຫຍາຍ.', 'This is how a magnifying glass works.'],
      ],
      [
        ['ສາຍຕາສັ້ນ (ເຫັນໄກບໍ່ຊັດ) ແກ້ດ້ວຍເລນຊະນິດໃດ?', 'Short sight (blurred distant objects) is corrected with which lens?'],
        [
          ['ເລນຫຼຸບ (concave)', 'Concave lens'],
          ['ເລນສວດ (convex)', 'Convex lens'],
          ['ແວ່ນພຽງ', 'Plane mirror'],
        ],
        0,
        ['ເລນຫຼຸບກະຈາຍແສງເລັກນ້ອຍ ເພື່ອໃຫ້ຮູບຕົກທີ່ເຣຕີນາພໍດີ.', 'A concave lens spreads the light slightly so the image falls exactly on the retina.'],
      ],
    ],
  }),

  lesson(8, ['ທາດອິນຄະທາດ ແລະ ທາດອະນິນຄະທາດ', 'Organic and inorganic compounds'], 8, 'chem', {
    summary: [
      'ທາດອິນຄະທາດ (organic) ແມ່ນທາດປະສົມຂອງກາກບອນ ເຊັ່ນ ມີເທນ, ແອທານອນ, ນ້ຳຕານ. ສ່ວນໃຫຍ່ເຜົາໄດ້ ແລະ ເກີດ CO₂ ກັບ H₂O.',
      'Organic compounds are carbon compounds such as methane, ethanol and sugar. Most burn and give CO₂ and H₂O.',
    ],
    objectives: [
      ['ຈຳແນກທາດອິນຄະທາດ (organic) ແລະ ທາດອະນິນຄະທາດ (inorganic)', 'Distinguish organic and inorganic compounds'],
      ['ທົດລອງສຶກສາຄຸນສົມບັດ ເຊັ່ນ ການເຜົາໄໝ້ ແລະ ການລະລາຍ', 'Test properties such as combustibility and solubility'],
      ['ຍົກຕົວຢ່າງທາດປະສົມຂອງກາກບອນ', 'Give examples of carbon compounds'],
    ],
    keyIdeas: [
      [
        'ທາດອິນຄະທາດມີກາກບອນ (C) ປະສົມກັບ H, O, N: ມີເທນ CH₄, ແອທານອນ C₂H₅OH, ນ້ຳຕານ.',
        'Organic compounds contain carbon (C) with H, O, N: methane CH₄, ethanol C₂H₅OH, sugar.',
      ],
      [
        'ສ່ວນໃຫຍ່ເຜົາໄດ້ ແລະ ເກີດ CO₂ + H₂O.',
        'Most burn, giving CO₂ + H₂O.',
      ],
      [
        'ຂໍ້ຍົກເວັ້ນ: CO₂ ແລະ ແຄັບບອເນດ ເປັນທາດອະນິນຄະທາດ.',
        'Exceptions: CO₂ and carbonates are inorganic.',
      ],
      [
        'ພລາສຕິກ, ຢາງ ແລະ ນ້ຳມັນ ເປັນທາດອິນຄະທາດ.',
        'Plastics, rubber and oils are organic compounds.',
      ],
    ],
    questions: [
      ['ເກືອ NaCl ເປັນທາດອິນຄະທາດ ຫຼື ອະນິນຄະທາດ?', 'Is NaCl organic or inorganic?'],
      ['ເປັນຫຍັງພລາສຕິກຈຶ່ງຍ່ອຍສະຫຼາຍຍາກ?', 'Why is plastic hard to break down in nature?'],
    ],
    activity: [
      'ຄູສາທິດ: ໃຫ້ຄວາມຮ້ອນນ້ຳຕານ ແລະ ເກືອ ແລ້ວປຽບທຽບ (ນ້ຳຕານໄໝ້ເປັນຖ່ານ, ເກືອບໍ່ໄໝ້). ນັກຮຽນສັງເກດຢູ່ໄກໆ.',
      'Teacher demonstration: heat sugar and salt and compare (sugar chars, salt does not burn). Students observe from a safe distance.',
    ],
    minutes: 20,
    quiz: [
      [
        ['ສານໃດເປັນທາດອິນຄະທາດ?', 'Which substance is organic?'],
        [
          ['NaCl', 'NaCl'],
          ['CH₄ (ມີເທນ)', 'CH₄ (methane)'],
          ['H₂O', 'H₂O'],
        ],
        1,
        ['ມີເທນມີກາກບອນ ແລະ ໄຮໂດຣເຈນ.', 'Methane contains carbon and hydrogen.'],
      ],
      [
        ['ເມື່ອເຜົາທາດອິນຄະທາດຢ່າງສົມບູນ ໄດ້ສານໃດ?', 'What forms when an organic compound burns completely?'],
        [
          ['CO₂ ແລະ H₂O', 'CO₂ and H₂O'],
          ['ເຫຼັກ ແລະ ຄລໍຣີນ', 'Iron and chlorine'],
          ['ບໍ່ເກີດຫຍັງ', 'Nothing'],
        ],
        0,
        ['ກາກບອນກາຍເປັນ CO₂ ແລະ ໄຮໂດຣເຈນກາຍເປັນ H₂O.', 'Carbon becomes CO₂ and hydrogen becomes H₂O.'],
      ],
      [
        ['CO₂ ມີກາກບອນ ແຕ່ຈັດເປັນຊະນິດໃດ?', 'CO₂ contains carbon but is classed as...'],
        [
          ['ທາດອະນິນຄະທາດ (ຂໍ້ຍົກເວັ້ນ)', 'Inorganic (an exception)'],
          ['ທາດອິນຄະທາດ', 'Organic'],
          ['ໂລຫະ', 'A metal'],
        ],
        0,
        ['CO₂, ແຄັບບອເນດ ແລະ ອອກໄຊດ໌ຂອງກາກບອນ ຖືວ່າເປັນອະນິນຄະທາດ.', 'CO₂, carbonates and oxides of carbon are counted as inorganic.'],
      ],
    ],
  }),

  lesson(9, ['ການຖ່າຍທອດລັກສະນະທາງກຳມະພັນ', 'Heredity'], 12, 'bio', {
    summary: [
      'ພໍ່ແມ່ຖ່າຍທອດລັກສະນະໃຫ້ລູກຜ່ານແຊນໃນໂຄໂມໂຊມ. ເມນເດລອະທິບາຍກົດການຖ່າຍທອດ; ການແບ່ງຈຸລັງມີ mitosis ແລະ meiosis.',
      'Parents pass traits to children through genes on chromosomes. Mendel explained the laws of inheritance; cell division is by mitosis and meiosis.',
    ],
    objectives: [
      ['ອະທິບາຍການແບ່ງຈຸລັງແບບ mitosis ແລະ meiosis', 'Explain cell division by mitosis and meiosis'],
      ['ອະທິບາຍກົດການຖ່າຍທອດຂອງ Mendel', 'Explain Mendel’s laws of inheritance'],
      ['ຮູ້ຈັກໂຄໂມໂຊມ ແລະ ແຊນ ແລະ ໜ້າທີ່ຂອງມັນ', 'Know chromosomes and genes and their roles'],
      ['ອະທິບາຍການກຳນົດເພດ ແລະ ຄວາມຜິດປົກກະຕິຂອງໂຄໂມໂຊມ', 'Explain sex determination and chromosome abnormalities'],
    ],
    keyIdeas: [
      [
        'Mitosis ໃຫ້ 2 ຈຸລັງທີ່ເໝືອນກັນ; Meiosis ໃຫ້ 4 ເຊວສືບພັນ ທີ່ມີໂຄໂມໂຊມເຄິ່ງໜຶ່ງ.',
        'Mitosis gives 2 identical cells; meiosis gives 4 sex cells (gametes) with half the chromosomes.',
      ],
      ['ມະນຸດມີໂຄໂມໂຊມ 46 ແທ່ງ (23 ຄູ່).', 'Humans have 46 chromosomes (23 pairs).'],
      [
        'ເພດ: XX = ຍິງ, XY = ຊາຍ. ເຊື້ອອະສຸຈິມີ X ຫຼື Y ຈຶ່ງເປັນຕົວກຳນົດເພດຂອງລູກ.',
        'Sex: XX = female, XY = male. A sperm carries X or Y, so it determines the child’s sex.',
      ],
      [
        'Tt × Tt → ລັກສະນະ 3 : 1; ແບບແຊນ TT : Tt : tt = 1 : 2 : 1.',
        'Tt × Tt → traits 3 : 1; genotypes TT : Tt : tt = 1 : 2 : 1.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງລູກຄ້າຍພໍ່ແມ່ ແຕ່ບໍ່ຄືກັນທັງໝົດ?', 'Why do children resemble their parents but are not identical to them?'],
      ['ເປັນຫຍັງເຊື້ອອະສຸຈິຂອງພໍ່ຈຶ່ງກຳນົດເພດຂອງລູກ?', 'Why does the father’s sperm determine the child’s sex?'],
    ],
    activity: [
      'ຕາຕະລາງ Punnett: ໃຊ້ຫຼຽນ 2 ເຫຼັ້ມ ແທນ T ແລະ t ຂອງພໍ່ ແລະ ແມ່ (ຂຶ້ນຫົວ = T, ຂຶ້ນກ້ອຍ = t) ແລ້ວຖິ້ມຫຼາຍເທື່ອ ແລະ ນັບອັດຕາສ່ວນ.',
      'Punnett square: use two coins to stand for the T and t alleles of father and mother (heads = T, tails = t), toss many times and count the ratios.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ມະນຸດຍິງປົກກະຕິມີໂຄໂມໂຊມເພດແບບໃດ?', 'Which sex chromosomes does a typical human female have?'],
        [
          ['XY', 'XY'],
          ['XX', 'XX'],
          ['YY', 'YY'],
        ],
        1,
        ['XX = ຍິງ, XY = ຊາຍ.', 'XX = female, XY = male.'],
      ],
      [
        ['ການແບ່ງຈຸລັງແບບ meiosis ໃຫ້ເຊວລູກທີ່ມີໂຄໂມໂຊມ...', 'Meiosis produces daughter cells with...'],
        [
          ['ເທົ່າເດີມ', 'The same number of chromosomes as the parent cell'],
          ['ເຄິ່ງໜຶ່ງຂອງເດີມ', 'Half the number of chromosomes'],
          ['ສອງເທົ່າຂອງເດີມ', 'Double the number of chromosomes'],
        ],
        1,
        ['meiosis ສ້າງເຊວສືບພັນທີ່ມີ 23 ແທ່ງ ເພື່ອປະສົມແລ້ວກັບຄືນເປັນ 46.', 'Meiosis makes gametes with 23 chromosomes so that fertilisation restores 46.'],
      ],
      [
        ['ພໍ່ Tt ແລະ ແມ່ Tt. ລູກທີ່ມີລັກສະນະເດັ່ນ (T) ມີສັດສ່ວນປະມານເທົ່າໃດ?', 'Father Tt and mother Tt. About what fraction of the children show the dominant trait (T)?'],
        [
          ['1/4', '1/4'],
          ['1/2', '1/2'],
          ['3/4', '3/4'],
        ],
        2,
        ['TT, Tt, Tt ສະແດງລັກສະນະເດັ່ນ ແລະ tt ສະແດງລັກສະນະດ້ອຍ → 3/4.', 'TT, Tt and Tt show the dominant trait and tt shows the recessive → 3/4.'],
      ],
    ],
  }),

  lesson(10, ['ການປ່ຽນຮູບ ແລະ ຮັກສາພະລັງງານ', 'Energy transformation and conservation'], 15, 'phys', {
    summary: [
      'ພະລັງງານບໍ່ເກີດຂຶ້ນ ແລະ ບໍ່ສູນຫາຍ ແຕ່ປ່ຽນຮູບ. ບໍ່ມີເຄື່ອງຈັກໃດປ່ຽນໄດ້ 100% ເປັນພະລັງງານທີ່ຕ້ອງການ.',
      'Energy is neither created nor destroyed; it changes form. No machine converts 100% into the form we want.',
    ],
    objectives: [
      ['ບອກພະລັງງານຮູບຕ່າງໆ ແລະ ຍົກຕົວຢ່າງ', 'List forms of energy and give examples'],
      ['ອະທິບາຍການປ່ຽນຮູບພະລັງງານ', 'Explain energy transformation'],
      ['ຮູ້ການຜະລິດ ແລະ ນຳໃຊ້ພະລັງງານໃນລາວ', 'Know how energy is produced and used in Laos'],
      ['ສະເໜີວິທີປະຢັດພະລັງງານ', 'Propose ways to save energy'],
    ],
    keyIdeas: [
      ['ພະລັງງານບໍ່ເກີດ ບໍ່ສູນຫາຍ ແຕ່ປ່ຽນຮູບ.', 'Energy is neither created nor destroyed but changes form.'],
      [
        'ຕ່ອງໂສ້ພະລັງງານ: ນ້ຳຕົກ → ເຄື່ອງກຳເນີດ → ໄຟຟ້າ → ແສງ + ຄວາມຮ້ອນ.',
        'An energy chain: falling water → generator → electricity → light + heat.',
      ],
      [
        'ປະສິດທິພາບ = ພະລັງງານທີ່ໃຊ້ປະໂຫຍດ ÷ ພະລັງງານທັງໝົດ × 100%.',
        'Efficiency = useful energy ÷ total energy × 100%.',
      ],
      [
        'ລາວຜະລິດໄຟຟ້າສ່ວນໃຫຍ່ຈາກໄຟຟ້ານ້ຳ (ເຂື່ອນ).',
        'Laos produces most of its electricity from hydropower (dams).',
      ],
    ],
    questions: [
      ['ຫຼອດ LED ກັບຫຼອດໄສ້ ປະສິດທິພາບຕ່າງກັນແນວໃດ?', 'How do LED and filament bulbs differ in efficiency?'],
      ['ເຂື່ອນໄຟຟ້ານ້ຳມີຜົນຕໍ່ສິ່ງແວດລ້ອມແນວໃດ?', 'What effects do hydropower dams have on the environment?'],
    ],
    activity: [
      'ແຕ້ມຜັງຕ່ອງໂສ້ພະລັງງານ ສຳລັບ ໂທລະສັບມືຖື, ເຕົາຟືນ ແລະ ລົດຈັກ.',
      'Draw energy-chain diagrams for a mobile phone, a wood stove and a motorbike.',
    ],
    minutes: 30,
    quiz: [
      [
        ['ເຄື່ອງກຳເນີດໄຟຟ້າໃນເຂື່ອນ ປ່ຽນພະລັງງານໃດເປັນໄຟຟ້າ?', 'A dam generator changes which energy into electrical energy?'],
        [
          ['ພະລັງງານຈາກການເຄື່ອນທີ່ຂອງນ້ຳ', 'Energy from moving water'],
          ['ພະລັງງານນິວເຄຼຍ', 'Nuclear energy'],
          ['ພະລັງງານແສງ', 'Light energy'],
        ],
        0,
        ['ນ້ຳຕົກໝູນກັງຫັນ ແລະ ເຄື່ອງກຳເນີດ ເກີດໄຟຟ້າ.', 'Falling water turns the turbine and the generator makes electricity.'],
      ],
      [
        ['ຫຼອດໄຟໃຊ້ພະລັງງານໄຟຟ້າ 100 J ໄດ້ແສງ 20 J. ປະສິດທິພາບເທົ່າໃດ?', 'A bulb uses 100 J of electrical energy and gives 20 J of light. What is its efficiency?'],
        [
          ['5%', '5%'],
          ['20%', '20%'],
          ['80%', '80%'],
        ],
        1,
        ['20 ÷ 100 × 100% = 20%; ສ່ວນທີ່ເຫຼືອກາຍເປັນຄວາມຮ້ອນ.', '20 ÷ 100 × 100% = 20%; the rest becomes heat.'],
      ],
      [
        ['ຂໍ້ໃດຖືກຕ້ອງກ່ຽວກັບພະລັງງານ?', 'Which statement about energy is correct?'],
        [
          ['ພະລັງງານສາມາດຫາຍໄປໄດ້', 'Energy can disappear'],
          ['ພະລັງງານປ່ຽນຮູບ ແຕ່ລວມແລ້ວຄົງທີ່', 'Energy changes form but the total stays the same'],
          ['ພະລັງງານເກີດຂຶ້ນເອງໄດ້', 'Energy can create itself'],
        ],
        1,
        ['ນີ້ແມ່ນກົດການຮັກສາພະລັງງານ.', 'This is the law of conservation of energy.'],
      ],
    ],
  }),

  lesson(11, ['ການນຳໃຊ້ທາດເຄມີໃນການດຳລົງຊີວິດຂອງມະນຸດ', 'Chemicals in everyday life'], 10, 'chem', {
    summary: [
      'ທາດເຄມີ ເຊັ່ນ ປຸ໋ຍ, ຢາ, ສະບູ ແລະ ພລາສຕິກ ມີປະໂຫຍດຫຼາຍ ແຕ່ຖ້າໃຊ້ຜິດ ຫຼື ເກີນ ກໍເປັນອັນຕະລາຍ. ຕ້ອງອ່ານປ້າຍ ແລະ ໃຊ້ຢ່າງຖືກຕ້ອງ.',
      'Chemicals such as fertilisers, medicines, soaps and plastics are very useful, but misuse or overuse is harmful. Read labels and use them correctly.',
    ],
    objectives: [
      ['ບອກຄວາມສຳຄັນ ແລະ ບົດບາດຂອງທາດເຄມີໃນຊີວິດປະຈຳວັນ', 'State the importance and role of chemicals in daily life'],
      ['ອະທິບາຍຜົນດີ ແລະ ຜົນເສຍຂອງທາດເຄມີ', 'Explain the benefits and harms of chemicals'],
      ['ອະທິບາຍວິທີນຳໃຊ້ທີ່ຖືກຕ້ອງ ແລະ ປອດໄພ', 'Explain correct and safe use'],
    ],
    keyIdeas: [
      [
        'ປຸ໋ຍ, ຢາຂ້າແມງໄມ້, ສະບູ ແລະ ຜົງຊັກຟອກ, ຢາ, ພລາສຕິກ ແມ່ນທາດເຄມີທີ່ໃຊ້ທຸກວັນ.',
        'Fertilisers, pesticides, soaps and detergents, medicines and plastics are chemicals we use every day.',
      ],
      [
        'ໃຊ້ເກີນຈຳເປັນ ເກີດສານຕົກຄ້າງ ແລະ ມົນລະພິດຕໍ່ດິນ ແລະ ນ້ຳ.',
        'Overuse leaves residues and pollutes soil and water.',
      ],
      [
        'ອ່ານປ້າຍ, ເບິ່ງວັນໝົດອາຍຸ, ເກັບໄວ້ໃຫ້ພົ້ນມືເດັກ ແລະ ແຍກຈາກອາຫານ.',
        'Read labels, check expiry dates, keep chemicals away from children and separate from food.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງຕ້ອງລ້າງຜັກໃຫ້ສະອາດ?', 'Why must vegetables be washed thoroughly?'],
      ['ຈະກຳຈັດຖົງ ແລະ ຂວດຢາຂ້າແມງໄມ້ຢ່າງໃດໃຫ້ປອດໄພ?', 'How should pesticide bags and bottles be disposed of safely?'],
    ],
    activity: [
      'ອ່ານປ້າຍຂອງ 3 ຜະລິດຕະພັນໃນເຮືອນ ແລ້ວບັນທຶກສ່ວນປະກອບ ແລະ ຄຳເຕືອນ.',
      'Read the labels of 3 household products and record the ingredients and warnings.',
    ],
    minutes: 20,
    quiz: [
      [
        ['ສິ່ງທຳອິດທີ່ຄວນເຮັດກ່ອນໃຊ້ຜະລິດຕະພັນເຄມີແມ່ນຫຍັງ?', 'What should you do first before using a chemical product?'],
        [
          ['ອ່ານປ້າຍ ແລະ ຄຳເຕືອນ', 'Read the label and warnings'],
          ['ຊີມເບິ່ງ', 'Taste it'],
          ['ປະສົມກັບສານອື່ນ', 'Mix it with another chemical'],
        ],
        0,
        ['ປ້າຍບອກວິທີໃຊ້ ແລະ ຄວາມອັນຕະລາຍ.', 'The label says how to use it and what the dangers are.'],
      ],
      [
        ['ການໃຊ້ປຸ໋ຍເຄມີຫຼາຍເກີນໄປ ມີຜົນຢ່າງໃດ?', 'What is a harm of using too much chemical fertiliser?'],
        [
          ['ດິນ ແລະ ນ້ຳເສື່ອມຄຸນນະພາບ', 'It degrades the soil and water'],
          ['ບໍ່ມີຜົນຫຍັງ', 'It has no effect'],
          ['ເຮັດໃຫ້ຝົນຕົກຫຼາຍ', 'It makes more rain fall'],
        ],
        0,
        ['ປຸ໋ຍສ່ວນເກີນໄຫຼລົງແຫຼ່ງນ້ຳ ແລະ ເຮັດໃຫ້ເກີດມົນລະພິດ.', 'Excess fertiliser washes into water and causes pollution.'],
      ],
      [
        ['ຄວນເກັບຢາຂ້າແມງໄມ້ໄວ້ບ່ອນໃດ?', 'Where should pesticides be stored?'],
        [
          ['ໃກ້ອາຫານໃນເຮືອນຄົວ', 'Next to food in the kitchen'],
          ['ໃນຂວດນ້ຳດື່ມ', 'In a drinking-water bottle'],
          ['ໃນບ່ອນລັອກ ໃຫ້ພົ້ນມືເດັກ ແລະ ແຍກຈາກອາຫານ', 'In a locked place away from children and food'],
        ],
        2,
        ['ການເກັບຜິດບ່ອນເປັນສາເຫດຂອງການເປັນພິດໃນເດັກ.', 'Wrong storage is a common cause of poisoning in children.'],
      ],
    ],
  }),
]
