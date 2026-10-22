import type { LessonDef } from './types'
import { quizItem as qz, ready } from './build'

// M.2 topics 1-3 (m2Early) and 6-12 (m2Late) (Batches C and D). Source: docs/dev-team/spec.md section 5;
// curriculum 2010, pp. 32-35. m2-04 / m2-05 live in m2.ts.
// Lao text is an AI draft; the whole file is subject to teacher review.
// REVIEW terms: ກະດູກສັນຫຼັງ (backbone), ສັດເລືອຄານ (reptile), ສັດສະເໝີນ້ຳບົກ (amphibian), ສັດລ້ຽງລູກດ້ວຍນົມ (mammal),
//   ການປ່ຽນຮູບຮ່າງ (metamorphosis), ດັກແດ້ (pupa), ການພຽງສີ (camouflage), ການປັບຕົວ (adaptation),
//   ສານລະລາຍ / ຕົວລະລາຍ / ຕົວຖືກລະລາຍ (solution / solvent / solute), ຂະຫຍາຍ / ຫົດ (expand / contract),
//   ຕົກຜຶກ (crystallise), ກັ່ນ (distil), ໂຄຣມາໂທກຣາຟີ (chromatography), ຜູ້ຜະລິດ / ຜູ້ບໍລິໂພກ / ຜູ້ຍ່ອຍສະຫຼາຍ,
//   ຕ່ອງໂສ້ອາຫານ / ຕາໜ່າງອາຫານ (food chain / web), ປະຊາກອນ (population), ແຜ່ນດິນໄຫວ (earthquake), ພູໄຟ (volcano),
//   ຟອດຊິວ (fossil), ຫີນອັກນີ / ຫີນຕະກອນ / ຫີນແປຮູບ (igneous / sedimentary / metamorphic), ນ້ຳກະດ້າງ (hard water),
//   ຄວາມຊຸ່ມ (humidity), ວັດຖຸໂປ່ງແສງ / ໂປ່ງໃສ / ບໍ່ໂປ່ງແສງ, ຮູບລວງ (virtual image), ຄວາມຖີ່ (frequency),
//   ສຽງກ້ອງ (echo), ເດຊິເບວ (decibel).

export const m2Early: LessonDef[] = [
  ready({
    id: 'm2-01',
    title: ['ສັດ', 'Animals'],
    hours: 18,
    field: 'bio',
    minutes: 30,
    summary: [
      'ສັດຖືກຈັດໝວດຕາມລັກສະນະ ເຊັ່ນ ມີກະດູກສັນຫຼັງ ຫຼື ບໍ່ມີ. ສັດຈຳນວນຫຼາຍປ່ຽນຮູບຮ່າງໃນວົງຈອນຊີວິດ ແລະ ມີການປັບຕົວເຂົ້າກັບທີ່ຢູ່ອາໄສ.',
      'Animals are classified by features such as having a backbone or not. Many change form during their life cycle and are adapted to their habitat.',
    ],
    objectives: [
      [
        'ເຂົ້າໃຈໂຄງສ້າງຂອງອະໄວຍະວະສັດ ແລະ ປຽບທຽບກັບພືດ',
        'Understand animal organ structure and compare with plants',
      ],
      [
        'ຈັດໝວດສັດໂດຍໃຊ້ ກະດູກສັນຫຼັງ, ປີກ, ຂາ ເປັນເກນ',
        'Classify animals using backbone, wings and legs as criteria',
      ],
      ['ອະທິບາຍການສືບພັນ, ການເຕີບໃຫຍ່ ແລະ ການປັບຕົວ', 'Explain reproduction, growth and adaptation'],
      ['ຮູ້ພະຍາດຂອງສັດ ແລະ ການອະນຸລັກສັດ', 'Know animal diseases and conservation'],
    ],
    keyIdeas: [
      [
        'ສັດມີກະດູກສັນຫຼັງ 5 ກຸ່ມ: ປາ, ສັດສະເໝີນ້ຳບົກ, ສັດເລືອຄານ, ນົກ, ສັດລ້ຽງລູກດ້ວຍນົມ.',
        'Vertebrates: fish, amphibians, reptiles, birds, mammals.',
      ],
      [
        'ສັດບໍ່ມີກະດູກສັນຫຼັງ ເຊັ່ນ ແມງໄມ້, ຫອຍ, ໜອນ.',
        'Invertebrates have no backbone, e.g. insects, molluscs, worms.',
      ],
      [
        'ການປ່ຽນຮູບຮ່າງ: ກົບ (ໄຂ່ → ຕົວອ່ອນ → ກົບ); ຜີເສື້ອ (ໄຂ່ → ໜອນ → ດັກແດ້ → ໂຕເຕັມໄວ).',
        'Metamorphosis: frog (egg → tadpole → frog); butterfly (egg → caterpillar → pupa → adult).',
      ],
      ['ການປັບຕົວ ເຊັ່ນ ການພຽງສີ ຊ່ວຍໃຫ້ສັດລອດຊີວິດ.', 'Adaptations such as camouflage help animals survive.'],
    ],
    questions: [
      ['ຄ້າງຄາວເປັນນົກ ຫຼື ສັດລ້ຽງລູກດ້ວຍນົມ? ເປັນຫຍັງ?', 'Is a bat a bird or a mammal? Why?'],
      ['ເປັນຫຍັງຕ້ອງອະນຸລັກສັດປ່າ?', 'Why conserve wildlife?'],
    ],
    activity: [
      'ໃຊ້ບັດຮູບສັດ ແລະ ແຕ້ມແຜນຜັງຕົ້ນໄມ້ຕັດສິນ ເພື່ອແຍກປະເພດສັດ.',
      'Sort animal cards with a branching key diagram.',
    ],
    quiz: [
      qz(
        'q1',
        ['ສັດໃດເປັນສັດເລືອຄານ?', 'Which animal is a reptile?'],
        [
          ['ກົບ', 'Frog'],
          ['ງູ', 'Snake'],
          ['ປາ', 'Fish'],
        ],
        1,
        [
          'ງູມີຜິວເປັນເກັດ ແລະ ວາງໄຂ່ເທິງບົກ; ກົບເປັນສັດສະເໝີນ້ຳບົກ.',
          'Snakes have scaly skin and lay eggs on land; frogs are amphibians.',
        ],
      ),
      qz(
        'q2',
        ['ວົງຈອນຊີວິດຂອງຜີເສື້ອ ມີຂັ້ນຕອນໃດຢູ່ລະຫວ່າງໜອນ ແລະ ໂຕເຕັມໄວ?', 'Which stage lies between caterpillar and adult butterfly?'],
        [
          ['ໄຂ່', 'Egg'],
          ['ດັກແດ້', 'Pupa'],
          ['ລູກອ່ອນ', 'Tadpole'],
        ],
        1,
        ['ລຳດັບ: ໄຂ່ → ໜອນ → ດັກແດ້ → ໂຕເຕັມໄວ.', 'Order: egg → caterpillar → pupa → adult.'],
      ),
      qz(
        'q3',
        ['ຄ້າງຄາວຈັດເປັນສັດກຸ່ມໃດ?', 'Which group does a bat belong to?'],
        [
          ['ນົກ', 'Birds'],
          ['ສັດລ້ຽງລູກດ້ວຍນົມ', 'Mammals'],
          ['ສັດເລືອຄານ', 'Reptiles'],
        ],
        1,
        [
          'ຄ້າງຄາວອອກລູກ ແລະ ລ້ຽງດ້ວຍນົມ ຈຶ່ງເປັນສັດລ້ຽງລູກດ້ວຍນົມ ເຖິງວ່າບິນໄດ້.',
          'Bats give birth and feed young with milk, so they are mammals even though they fly.',
        ],
      ),
      qz(
        'q4',
        ['ແມງໄມ້ຈັດເປັນສັດປະເພດໃດ?', 'What kind of animal is an insect?'],
        [
          ['ບໍ່ມີກະດູກສັນຫຼັງ', 'An invertebrate'],
          ['ມີກະດູກສັນຫຼັງ', 'A vertebrate'],
          ['ສັດລ້ຽງລູກດ້ວຍນົມ', 'A mammal'],
        ],
        0,
        ['ແມງໄມ້ບໍ່ມີກະດູກສັນຫຼັງ ແຕ່ມີ 6 ຂາ.', 'Insects have no backbone but have six legs.'],
      ),
    ],
  }),
  ready({
    id: 'm2-02',
    title: ['ການປ່ຽນແປງຂອງວັດຖຸ', 'Changes in matter'],
    hours: 10,
    field: 'chem',
    minutes: 25,
    sim: 'thermal',
    summary: [
      'ການປ່ຽນແປງຂອງວັດຖຸມີທາງຟີຊິກ (ບໍ່ເກີດທາດໃໝ່) ແລະ ທາງເຄມີ (ເກີດທາດໃໝ່). ວັດຖຸສ່ວນໃຫຍ່ຂະຫຍາຍເມື່ອຮ້ອນ ແລະ ຫົດເມື່ອເຢັນ.',
      'Changes in matter are physical (no new substance) or chemical (new substance). Most materials expand when heated and contract when cooled.',
    ],
    objectives: [
      ['ບອກຄວາມໝາຍການປ່ຽນແປງທາງຟີຊິກ ແລະ ທາງເຄມີ', 'Define physical and chemical change'],
      ['ບອກຄວາມໝາຍ ຕົວຖືກລະລາຍ, ຕົວລະລາຍ, ສານລະລາຍ', 'Define solute, solvent and solution'],
      [
        'ທົດລອງວ່າທາດຕ່າງກັນລະລາຍໃນຕົວລະລາຍຕ່າງກັນ',
        'Show that different substances dissolve differently in different solvents',
      ],
      [
        'ທົດລອງການຂະຫຍາຍ-ຫົດຍ້ອນຄວາມຮ້ອນຂອງແຂງ, ແຫຼວ, ກາສ',
        'Show thermal expansion and contraction of solids, liquids and gases',
      ],
    ],
    keyIdeas: [
      [
        'ການປ່ຽນທາງຟີຊິກບໍ່ເກີດທາດໃໝ່ (ນ້ຳກ້ອນລະລາຍ); ທາງເຄມີເກີດທາດໃໝ່ (ໄມ້ໄໝ້).',
        'Physical change: no new substance (ice melting); chemical change: new substance (burning wood).',
      ],
      ['ຕົວຖືກລະລາຍ + ຕົວລະລາຍ = ສານລະລາຍ.', 'Solute + solvent = solution.'],
      ['ວັດຖຸສ່ວນໃຫຍ່ຂະຫຍາຍເມື່ອຮ້ອນ ແລະ ຫົດເມື່ອເຢັນ.', 'Most materials expand when heated and contract when cooled.'],
      [
        'ກາສຂະຫຍາຍຫຼາຍກວ່າແຫຼວ ແລະ ແຫຼວຫຼາຍກວ່າແຂງ.',
        'Gases expand more than liquids, and liquids more than solids.',
      ],
      ['ນຳໃຊ້: ຊ່ອງວ່າງທາງລົດໄຟ, ເທີໂມມິເຕີ.', 'Uses: gaps in railway tracks, thermometers.'],
    ],
    questions: [
      ['ເປັນຫຍັງທາງລົດໄຟຕ້ອງມີຊ່ອງວ່າງ?', 'Why do railway tracks have gaps?'],
      [
        'ຝາຂວດແກ້ວຕິດແໜ້ນ ເຮັດແນວໃດໃຫ້ເປີດໄດ້?',
        'How can you free a stuck jar lid? (Run hot water over the lid.)',
      ],
    ],
    activity: [
      'ລະລາຍນ້ຳຕານ, ເກືອ ແລະ ຊາຍ ໃນນ້ຳເຢັນ ແລະ ນ້ຳອຸ່ນ ແລ້ວບັນທຶກຜົນ.',
      'Dissolve sugar, salt and sand in cold and warm water and record the results.',
    ],
    quiz: [
      qz(
        'q1',
        ['ຂໍ້ໃດເປັນການປ່ຽນແປງທາງເຄມີ?', 'Which is a chemical change?'],
        [
          ['ນ້ຳກ້ອນລະລາຍ', 'Ice melting'],
          ['ໄມ້ຖືກເຜົາໄໝ້', 'Wood burning'],
          ['ນ້ຳຕານລະລາຍໃນນ້ຳ', 'Sugar dissolving in water'],
        ],
        1,
        [
          'ການເຜົາໄມ້ເກີດທາດໃໝ່ ເຊັ່ນ ຂີ້ເທົ່າ ແລະ ຄວັນ.',
          'Burning wood makes new substances such as ash and smoke.',
        ],
      ),
      qz(
        'q2',
        ['ເກືອລະລາຍໃນນ້ຳ. ເກືອ ແລະ ນ້ຳ ແມ່ນຫຍັງ?', 'Salt dissolves in water. What are salt and water?'],
        [
          ['ເກືອເປັນຕົວຖືກລະລາຍ, ນ້ຳເປັນຕົວລະລາຍ', 'Salt is the solute, water is the solvent'],
          ['ເກືອເປັນຕົວລະລາຍ, ນ້ຳເປັນຕົວຖືກລະລາຍ', 'Salt is the solvent, water is the solute'],
          ['ທັງສອງເປັນສານລະລາຍ', 'Both are the solution'],
        ],
        0,
        ['ຕົວລະລາຍຄືຕົວທີ່ໄປລະລາຍທາດອື່ນ.', 'The solvent is the substance that does the dissolving.'],
      ),
      qz(
        'q3',
        ['ຖ້າເພີ່ມອຸນຫະພູມເທົ່າກັນ ວັດຖຸໃດຂະຫຍາຍຫຼາຍທີ່ສຸດ?', 'For the same temperature rise, which expands most?'],
        [
          ['ເຫຼັກ (ແຂງ)', 'Steel (solid)'],
          ['ແອລກໍຮໍ (ແຫຼວ)', 'Alcohol (liquid)'],
          ['ອາກາດ (ກາສ)', 'Air (gas)'],
        ],
        2,
        ['ກາສຂະຫຍາຍຫຼາຍກວ່າແຫຼວ ແລະ ແຫຼວຫຼາຍກວ່າແຂງ.', 'Gases expand more than liquids, and liquids more than solids.'],
      ),
      qz(
        'q4',
        ['ເປັນຫຍັງສະພານເຫຼັກຈຶ່ງມີຊ່ອງຕໍ່?', 'Why do steel bridges have expansion joints?'],
        [
          ['ເພື່ອໃຫ້ເຫຼັກຂະຫຍາຍໄດ້ເມື່ອຮ້ອນ', 'So the steel can expand when hot'],
          ['ເພື່ອປະຢັດເຫຼັກ', 'To save steel'],
          ['ເພື່ອໃຫ້ສວຍງາມ', 'For decoration'],
        ],
        0,
        ['ບໍ່ມີຊ່ອງ ເຫຼັກຈະດັນກັນ ແລະ ໂຄ້ງ ຫຼື ແຕກ.', 'Without gaps the steel would push together and buckle.'],
      ),
    ],
  }),
  ready({
    id: 'm2-03',
    title: ['ການແຍກວັດຖຸສົມປົນ', 'Separating mixtures'],
    hours: 8,
    field: 'chem',
    minutes: 25,
    summary: [
      'ການແຍກສິມປົນເລືອກວິທີຕາມຄຸນສົມບັດທີ່ຕ່າງກັນ ເຊັ່ນ ຂະໜາດ, ແມ່ເຫຼັກ, ການລະລາຍ ແລະ ຈຸດເດືອດ.',
      'Separation methods are chosen by the property that differs: size, magnetism, solubility and boiling point.',
    ],
    objectives: [
      ['ບອກວິທີແຍກສິມປົນທີ່ໃຊ້ໃນຊີວິດ', 'Name methods of separating mixtures used in daily life'],
      [
        'ອະທິບາຍວິທີແຍກສິມປົນເນື້ອດຽວ ແລະ ບໍ່ເປັນເນື້ອດຽວ',
        'Explain methods for homogeneous and heterogeneous mixtures',
      ],
      [
        'ແຍກດ້ວຍ ການເກັບ, ຮ່ອນ, ແມ່ເຫຼັກ, ກັ່ນ, ຕົກຜຶກ, ໂຄຣມາໂທກຣາຟີ',
        'Separate by picking, sieving, magnet, distillation, crystallisation and chromatography',
      ],
      ['ນຳໃຊ້ໃນຊີວິດ', 'Apply the methods in daily life'],
    ],
    keyIdeas: [
      [
        'ເລືອກວິທີຕາມຄຸນສົມບັດທີ່ຕ່າງກັນ (ຂະໜາດ, ແມ່ເຫຼັກ, ການລະລາຍ, ຈຸດເດືອດ).',
        'Choose the method by the property that differs (size, magnetism, solubility, boiling point).',
      ],
      ['ການກອງ: ແຍກຂອງແຂງທີ່ບໍ່ລະລາຍອອກຈາກນ້ຳ.', 'Filtering separates an insoluble solid from a liquid.'],
      ['ການກັ່ນ: ແຍກແຫຼວຕາມຈຸດເດືອດ.', 'Distillation separates liquids by boiling point.'],
      [
        'ເກືອສິນເທົາ: ລະເຫີຍນ້ຳແລ້ວຕົກຜຶກ.',
        'Rock salt from brine: evaporate the water, then the salt crystallises.',
      ],
    ],
    questions: [
      [
        'ແຍກເຂົ້າສານອອກຈາກຫີນນ້ອຍ ແລະ ເກືອອອກຈາກນ້ຳທະເລ ໃຊ້ວິທີໃດ?',
        'Which methods separate stones from rice and salt from seawater?',
      ],
      ['ເຮັດແນວໃດແຍກຜົງເຫຼັກອອກຈາກຊາຍ?', 'How can you separate iron filings from sand?'],
    ],
    activity: [
      'ແຍກຊາຍ + ເກືອ + ຜົງເຫຼັກ ເປັນຂັ້ນ; ເຮັດໂຄຣມາໂທກຣາຟີຂອງຫມຶກປາກກາເທິງເຈ້ຍກອງ.',
      'Separate sand + salt + iron filings step by step; do chromatography of marker ink on filter paper.',
    ],
    quiz: [
      qz(
        'q1',
        ['ວິທີໃດແຍກຜົງເຫຼັກອອກຈາກຊາຍ?', 'Which method separates iron filings from sand?'],
        [
          ['ໃຊ້ແມ່ເຫຼັກ', 'Using a magnet'],
          ['ການກັ່ນ', 'Distillation'],
          ['ການຕົກຜຶກ', 'Crystallisation'],
        ],
        0,
        ['ເຫຼັກຖືກແມ່ເຫຼັກດູດ ແຕ່ຊາຍບໍ່ຖືກ.', 'Iron is attracted to a magnet but sand is not.'],
      ),
      qz(
        'q2',
        ['ຈະໄດ້ເກືອຈາກນ້ຳທະເລດ້ວຍວິທີໃດ?', 'How do you obtain salt from seawater?'],
        [
          ['ການກອງດ້ວຍເຈ້ຍກອງ', 'Filtering with filter paper'],
          ['ລະເຫີຍນ້ຳອອກ ແລ້ວຕົກຜຶກ', 'Evaporating the water and crystallising'],
          ['ໃຊ້ແມ່ເຫຼັກ', 'Using a magnet'],
        ],
        1,
        [
          'ເກືອລະລາຍຢູ່ໃນນ້ຳ ຈຶ່ງກອງບໍ່ໄດ້; ເມື່ອນ້ຳລະເຫີຍ ເກືອຈະຕົກຜຶກ.',
          'Salt is dissolved so it cannot be filtered; when water evaporates, salt crystallises.',
        ],
      ),
      qz(
        'q3',
        ['ການກັ່ນໃຊ້ຄຸນສົມບັດໃດໃນການແຍກ?', 'Which property does distillation use?'],
        [
          ['ຈຸດເດືອດ', 'Boiling point'],
          ['ສີ', 'Colour'],
          ['ຂະໜາດຂອງເມັດ', 'Particle size'],
        ],
        0,
        ['ແຫຼວທີ່ມີຈຸດເດືອດຕ່ຳກວ່າ ຈະລະເຫີຍອອກກ່ອນ.', 'The liquid with the lower boiling point evaporates first.'],
      ),
      qz(
        'q4',
        ['ການກອງແຍກສິ່ງໃດໄດ້?', 'What can filtering separate?'],
        [
          ['ເກືອທີ່ລະລາຍໃນນ້ຳ', 'Salt dissolved in water'],
          ['ຊາຍທີ່ບໍ່ລະລາຍອອກຈາກນ້ຳ', 'Insoluble sand from water'],
          ['ແອລກໍຮໍອອກຈາກນ້ຳ', 'Alcohol from water'],
        ],
        1,
        ['ເຈ້ຍກອງຈັບອະນຸພາກແຂງໃຫຍ່ ແຕ່ຜ່ານສານລະລາຍ.', 'Filter paper traps large solid particles but lets solutions through.'],
      ),
    ],
  }),
]

export const m2Late: LessonDef[] = [
  ready({
    id: 'm2-06',
    title: ['ລະບົບນິເວດ', 'Ecosystems'],
    hours: 15,
    field: 'bio',
    minutes: 30,
    sim: 'foodweb',
    summary: [
      'ລະບົບນິເວດຄືສິ່ງມີຊີວິດ ແລະ ສິ່ງບໍ່ມີຊີວິດໃນບ່ອນດຽວກັນ. ພະລັງງານໄຫຼຜ່ານຕ່ອງໂສ້ອາຫານ ແລະ ຫຼຸດລົງປະມານ 90% ໃນແຕ່ລະຂັ້ນ.',
      'An ecosystem is the living and non-living things in one place. Energy flows through food chains and about 90% is lost at each level.',
    ],
    objectives: [
      [
        'ບອກຄວາມໝາຍ ລະບົບນິເວດ, ຜູ້ຜະລິດ, ຜູ້ບໍລິໂພກ ແລະ ຜູ້ຍ່ອຍສະຫຼາຍ',
        'Define ecosystem, producer, consumer and decomposer',
      ],
      [
        'ອະທິບາຍຄວາມສຳພັນລະຫວ່າງສິ່ງມີຊີວິດ ແລະ ກັບສິ່ງແວດລ້ອມ',
        'Explain relationships among organisms and with the environment',
      ],
      ['ອະທິບາຍຄວາມໝາຍຂອງປະຊາກອນ ແລະ ຄວາມໜາແໜ້ນ', 'Explain population and population density'],
      ['ເຫັນຄຸນຄ່າຂອງປ່າ ແລະ ຮັກສາສິ່ງແວດລ້ອມ', 'Value forests and protect the environment'],
    ],
    keyIdeas: [
      [
        'ລະບົບນິເວດ = ສິ່ງມີຊີວິດ + ສິ່ງບໍ່ມີຊີວິດ ໃນບ່ອນດຽວກັນ.',
        'An ecosystem = living and non-living things together in one place.',
      ],
      [
        'ຕ່ອງໂສ້ອາຫານ: ພືດ → ຜູ້ກິນພືດ → ຜູ້ກິນເນື້ອ.',
        'Food chain: plant → herbivore → carnivore.',
      ],
      [
        'ພະລັງງານຫຼຸດລົງປະມານ 90% ໃນແຕ່ລະຂັ້ນ (ສົ່ງຕໍ່ປະມານ 10%).',
        'About 90% of the energy is lost at each level (about 10% is passed on).',
      ],
      [
        'ຜູ້ຍ່ອຍສະຫຼາຍ (ເຫັດ, ແບັກທີເຣຍ) ສົ່ງທາດອາຫານຄືນສູ່ດິນ.',
        'Decomposers (fungi, bacteria) return nutrients to the soil.',
      ],
    ],
    questions: [
      [
        'ຖ້າງູຫາຍໄປ ກົບ ແລະ ນົກອິນຊີຈະເປັນແນວໃດ?',
        'If snakes disappear, what happens to frogs and to the eagle?',
      ],
      [
        'ເປັນຫຍັງຕ່ອງໂສ້ອາຫານຈຶ່ງບໍ່ຍາວຫຼາຍ?',
        'Why are food chains rarely longer than 4-5 levels?',
      ],
    ],
    activity: [
      'ເຮັດບັດສິ່ງມີຊີວິດ ແລ້ວຕໍ່ເປັນຕ່ອງໂສ້ ແລະ ຕາໜ່າງອາຫານ ດ້ວຍເຊືອກ.',
      'Make organism cards, then connect them into chains and a web with string.',
    ],
    quiz: [
      qz(
        'q1',
        ['ໃນຕ່ອງໂສ້ອາຫານ ຜູ້ຜະລິດແມ່ນຫຍັງ?', 'In a food chain, what is a producer?'],
        [
          ['ພືດສີຂຽວ', 'A green plant'],
          ['ສັດກິນເນື້ອ', 'A carnivore'],
          ['ເຫັດ', 'A fungus'],
        ],
        0,
        ['ພືດສີຂຽວສ້າງອາຫານເອງດ້ວຍການສັງເຄາະດ້ວຍແສງ.', 'Green plants make their own food by photosynthesis.'],
      ),
      qz(
        'q2',
        [
          'ຜູ້ຜະລິດມີພະລັງງານ 10000 kJ. ຜູ້ບໍລິໂພກລຳດັບທີ 2 ໄດ້ພະລັງງານປະມານເທົ່າໃດ (ກົດ 10%)?',
          'A producer holds 10000 kJ. About how much reaches the second consumer (10% rule)?',
        ],
        [
          ['1000 kJ', '1000 kJ'],
          ['100 kJ', '100 kJ'],
          ['9000 kJ', '9000 kJ'],
        ],
        1,
        [
          '10000 → 1000 (ຜູ້ບໍລິໂພກທີ 1) → 100 (ຜູ້ບໍລິໂພກທີ 2).',
          '10000 → 1000 (first consumer) → 100 (second consumer).',
        ],
      ),
      qz(
        'q3',
        ['ຜູ້ຍ່ອຍສະຫຼາຍມີບົດບາດຫຍັງ?', 'What do decomposers do?'],
        [
          ['ຍ່ອຍຊາກສິ່ງມີຊີວິດ ແລະ ສົ່ງທາດຄືນດິນ', 'Break down dead matter and return nutrients to soil'],
          ['ຜະລິດອາຫານດ້ວຍແສງ', 'Make food using light'],
          ['ລ່າສັດອື່ນ', 'Hunt other animals'],
        ],
        0,
        ['ທາດທີ່ຖືກສົ່ງຄືນ ພືດນຳໄປໃຊ້ຕໍ່.', 'Plants then use the returned nutrients.'],
      ),
      qz(
        'q4',
        ['ເປັນຫຍັງຕ່ອງໂສ້ອາຫານຈຶ່ງບໍ່ຍາວຫຼາຍ?', 'Why are food chains short?'],
        [
          ['ພະລັງງານຫຼຸດລົງຫຼາຍໃນແຕ່ລະຂັ້ນ', 'Much energy is lost at each level'],
          ['ບໍ່ມີສັດພໍ', 'There are not enough animals'],
          ['ພືດບໍ່ຕ້ອງການແສງ', 'Plants do not need light'],
        ],
        0,
        ['ປະມານ 90% ຫາຍໄປເປັນຄວາມຮ້ອນ; ຂັ້ນເທິງຈຶ່ງໄດ້ພະລັງງານນ້ອຍ.', 'About 90% is lost as heat, so upper levels get little.'],
      ),
    ],
  }),
  ready({
    id: 'm2-07',
    title: ['ການປ່ຽນແປງຂອງພື້ນໂລກ', "Changes of the Earth's crust"],
    hours: 9,
    field: 'earth',
    minutes: 25,
    summary: [
      'ເປືອກໂລກແບ່ງເປັນແຜ່ນທີ່ເຄື່ອນທີ່ຊ້າໆ ເຮັດໃຫ້ເກີດແຜ່ນດິນໄຫວ ແລະ ພູໄຟ. ການຜຸພັງ ແລະ ການກັດເຊາະປ່ຽນໜ້າດິນ; ຊັ້ນຫີນ ແລະ ຟອດຊິວບອກອາຍຸ.',
      "The crust is split into slowly moving plates, causing earthquakes and volcanoes. Weathering and erosion reshape the land; rock layers and fossils show age.",
    ],
    objectives: [
      ['ບອກໂຄງສ້າງຂອງເປືອກໂລກ', "Describe the structure of the Earth's crust"],
      [
        'ອະທິບາຍການປ່ຽນແປງຍ້ອນທຳມະຊາດ ແລະ ມະນຸດ (ແຜ່ນດິນໄຫວ, ພູໄຟ, ນ້ຳເຊາະ, ລົມ)',
        'Explain changes by nature and humans (earthquakes, volcanoes, erosion, wind)',
      ],
      ['ບອກຫຼັກຖານທາງທໍລະນີວິທະຍາ (ຟອດຊິວ)', 'State geological evidence (fossils)'],
      ['ບອກລຳດັບອາຍຸຂອງຊັ້ນຫີນ', 'Order rock layers by age'],
    ],
    keyIdeas: [
      ['ເປືອກໂລກແບ່ງເປັນແຜ່ນ ທີ່ເຄື່ອນທີ່ຊ້າໆ.', 'The crust is divided into slowly moving plates.'],
      [
        'ແຜ່ນດິນໄຫວ ແລະ ພູໄຟ ເກີດຕາມແຄມແຜ່ນເປັນສ່ວນໃຫຍ່.',
        'Earthquakes and volcanoes occur mostly at plate edges.',
      ],
      [
        'ການຜຸພັງ, ການກັດເຊາະ ແລະ ການຕົກຕະກອນ ປ່ຽນໜ້າດິນ.',
        'Weathering, erosion and deposition reshape the land.',
      ],
      [
        'ຊັ້ນຫີນຕະກອນ: ຊັ້ນລຸ່ມເກົ່າກວ່າຊັ້ນເທິງ; ຟອດຊິວບອກສິ່ງມີຊີວິດໃນອະດີດ.',
        'Sedimentary layers: lower is older; fossils show ancient life.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງລາວຈຶ່ງບໍ່ມີພູໄຟທີ່ຍັງມີການລະເບີດ?', 'Why are there no active volcanoes in Laos?'],
      [
        'ພົບຟອດຊິວສັດທະເລເທິງພູ ໝາຍຄວາມວ່າແນວໃດ?',
        'A marine fossil is found on a mountain: what does it mean?',
      ],
    ],
    activity: [
      'ສ້າງຊັ້ນຊາຍຫຼາຍສີໃນຂວດໃສ ແລ້ວອະທິບາຍວ່າຊັ້ນໃດເກົ່າກວ່າ.',
      'Make layers of coloured sand in a clear bottle and say which layer is oldest.',
    ],
    quiz: [
      qz(
        'q1',
        ['ໃນຊັ້ນຫີນຕະກອນທີ່ບໍ່ຖືກລົບກວນ ຊັ້ນໃດເກົ່າທີ່ສຸດ?', 'In undisturbed sedimentary layers, which is oldest?'],
        [
          ['ຊັ້ນເທິງສຸດ', 'The top layer'],
          ['ຊັ້ນລຸ່ມສຸດ', 'The bottom layer'],
          ['ຊັ້ນກາງ', 'The middle layer'],
        ],
        1,
        ['ຊັ້ນລຸ່ມຕົກຕະກອນກ່ອນ ຈຶ່ງເກົ່າກວ່າ.', 'The bottom layer was deposited first, so it is older.'],
      ),
      qz(
        'q2',
        ['ແຜ່ນດິນໄຫວສ່ວນໃຫຍ່ເກີດຢູ່ໃສ?', 'Where do most earthquakes occur?'],
        [
          ['ຕາມແຄມແຜ່ນເປືອກໂລກ', 'Along plate edges'],
          ['ກາງມະຫາສະໝຸດເທົ່ານັ້ນ', 'Only in mid-ocean'],
          ['ໃນທະເລຊາຍເທົ່ານັ້ນ', 'Only in deserts'],
        ],
        0,
        ['ແຜ່ນຊົນກັນ ຫຼື ຖູກັນ ເຮັດໃຫ້ເກີດແຜ່ນດິນໄຫວ.', 'Plates colliding or sliding past each other cause earthquakes.'],
      ),
      qz(
        'q3',
        ['ຟອດຊິວແມ່ນຫຍັງ?', 'What is a fossil?'],
        [
          ['ຫຼັກຖານຂອງສິ່ງມີຊີວິດໃນອະດີດທີ່ເກັບໄວ້ໃນຫີນ', 'Preserved evidence of ancient life in rock'],
          ['ແຮ່ທາດຊະນິດໜຶ່ງ', 'A kind of mineral'],
          ['ຫີນຈາກພູໄຟ', 'A volcanic rock'],
        ],
        0,
        ['ຟອດຊິວຊ່ວຍບອກອາຍຸຂອງຊັ້ນຫີນ ແລະ ສະພາບແວດລ້ອມສະໄໝກ່ອນ.', 'Fossils help date rock layers and show past environments.'],
      ),
    ],
  }),
  ready({
    id: 'm2-08',
    title: ['ຊັບພະຍາກອນໃນດິນ', 'Resources in the ground'],
    hours: 7,
    field: 'earth',
    minutes: 20,
    summary: [
      'ຫີນມີສາມປະເພດຕາມການເກີດ: ຫີນອັກນີ, ຫີນຕະກອນ ແລະ ຫີນແປຮູບ. ແຮ່ທາດເປັນຊັບພະຍາກອນທີ່ສ້າງຄືນບໍ່ໄດ້ໄວ ຈຶ່ງຕ້ອງໃຊ້ຢ່າງຄຸ້ມຄ່າ.',
      'Rocks are of three kinds by origin: igneous, sedimentary and metamorphic. Minerals cannot be renewed quickly, so they must be used wisely.',
    ],
    objectives: [
      ['ຮູ້ຂະບວນການເກີດຫີນ ແລະ ແຮ່ທາດ', 'Know how rocks and minerals form'],
      ['ບອກຊື່ ແລະ ລັກສະນະຫີນແຕ່ລະປະເພດ', 'Name and describe the rock types'],
      ['ບອກແຫຼ່ງແຮ່ທາດ ແລະ ປະໂຫຍດ', 'State where minerals occur and their uses'],
      ['ສະເໜີວິທີນຳໃຊ້ຢ່າງຄຸ້ມຄ່າ', 'Propose wise use of resources'],
    ],
    keyIdeas: [
      [
        'ຫີນອັກນີ (ຈາກແມັກມາເຢັນລົງ), ຫີນຕະກອນ, ຫີນແປຮູບ (ຄວາມຮ້ອນ + ຄວາມດັນ).',
        'Igneous (cooled magma), sedimentary, metamorphic (heat + pressure).',
      ],
      [
        'ແຮ່ທາດໃນລາວ: ຄຳ, ທອງແດງ, ກົ່ວ, ຢິບຊຽມ, ໂປແຕສ.',
        'Minerals in Laos: gold, copper, tin, gypsum, potash.',
      ],
      [
        'ແຮ່ ແລະ ຫີນ ເປັນຊັບພະຍາກອນທີ່ບໍ່ສາມາດສ້າງຄືນໃໝ່ໄດ້ໄວ.',
        'Rocks and minerals are non-renewable on human time scales.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງການຂຸດແຮ່ຕ້ອງມີການຟື້ນຟູ?', 'Why must mines be restored?'],
      ['ຫີນອ່ອນເປັນຫີນປະເພດໃດ?', 'What type of rock is marble? (metamorphic)'],
    ],
    activity: [
      'ຈັດກຸ່ມຕົວຢ່າງຫີນໃນທ້ອງຖິ່ນ ຕາມສີ ແລະ ຄວາມແຂງ.',
      'Sort local rock samples by colour and hardness.',
    ],
    quiz: [
      qz(
        'q1',
        ['ຫີນອັກນີເກີດຈາກຫຍັງ?', 'How do igneous rocks form?'],
        [
          ['ການເຢັນລົງຂອງແມັກມາ ຫຼື ລາວາ', 'Cooling of magma or lava'],
          ['ການທັບຖົມຂອງຕະກອນ', 'Compaction of sediment'],
          ['ການຕົກຜຶກຂອງນ້ຳຝົນ', 'Crystallising rainwater'],
        ],
        0,
        ['ຫີນທີ່ຫຼອມລະລາຍເປັນແມັກມາ ແລ້ວແຂງຕົວເມື່ອເຢັນ.', 'Molten rock becomes solid as it cools.'],
      ),
      qz(
        'q2',
        ['ຫີນອ່ອນ (marble) ເປັນຫີນປະເພດໃດ?', 'What type of rock is marble?'],
        [
          ['ຫີນອັກນີ', 'Igneous'],
          ['ຫີນຕະກອນ', 'Sedimentary'],
          ['ຫີນແປຮູບ', 'Metamorphic'],
        ],
        2,
        ['ຫີນປູນຖືກຄວາມຮ້ອນ ແລະ ຄວາມດັນ ແປຮູບເປັນຫີນອ່ອນ.', 'Limestone changes to marble under heat and pressure.'],
      ),
      qz(
        'q3',
        ['ເປັນຫຍັງແຮ່ທາດຈຶ່ງຕ້ອງໃຊ້ຢ່າງຄຸ້ມຄ່າ?', 'Why must minerals be used wisely?'],
        [
          ['ເພາະສ້າງຄືນໃໝ່ໄດ້ຊ້າຫຼາຍ', 'They renew very slowly'],
          ['ເພາະມີຫຼາຍເກີນໄປ', 'There is too much'],
          ['ເພາະບໍ່ມີປະໂຫຍດ', 'They are useless'],
        ],
        0,
        ['ການເກີດແຮ່ໃຊ້ເວລາຫຼາຍລ້ານປີ.', 'Mineral formation takes millions of years.'],
      ),
    ],
  }),
  ready({
    id: 'm2-09',
    title: ['ລັກສະນະຂອງນ້ຳ', 'Properties of water'],
    hours: 8,
    field: 'earth',
    minutes: 25,
    summary: [
      'ນ້ຳບໍລິສຸດແຂງທີ່ 0 °C ແລະ ເດືອດທີ່ 100 °C. ນ້ຳໜາແໜ້ນທີ່ສຸດທີ່ປະມານ 4 °C ນ້ຳກ້ອນຈຶ່ງລອຍ. ນ້ຳກະດ້າງມີທາດ Ca ແລະ Mg ລະລາຍຢູ່.',
      'Pure water freezes at 0 °C and boils at 100 °C. It is densest at about 4 °C, so ice floats. Hard water contains dissolved Ca and Mg.',
    ],
    objectives: [
      ['ອະທິບາຍລັກສະນະທົ່ວໄປຂອງນ້ຳ', 'Describe the general properties of water'],
      [
        'ບອກຈຸດເດືອດ, ຈຸດແຂງຕົວ ແລະ ອຸນຫະພູມທີ່ນ້ຳມີບໍລິມາດນ້ອຍສຸດ',
        'State the boiling point, freezing point and temperature of minimum volume',
      ],
      [
        'ບອກຄວາມໝາຍນ້ຳກະດ້າງ ແລະ ນ້ຳອ່ອນ ແລະ ວິທີແກ້ນ້ຳກະດ້າງ',
        'Define hard and soft water and how to soften hard water',
      ],
    ],
    keyIdeas: [
      [
        'ນ້ຳບໍລິສຸດແຂງຕົວທີ່ 0 °C ແລະ ເດືອດທີ່ 100 °C (ຄວາມດັນປົກກະຕິ).',
        'Pure water freezes at 0 °C and boils at 100 °C (normal pressure).',
      ],
      ['ຈຸດເດືອດຕ່ຳລົງເມື່ອຢູ່ບ່ອນສູງ.', 'The boiling point drops at altitude.'],
      [
        'ນ້ຳມີບໍລິມາດນ້ອຍສຸດ (ໜາແໜ້ນສຸດ) ທີ່ ≈ 4 °C; ກ້ອນນ້ຳລອຍ.',
        'Water has its smallest volume (is densest) at about 4 °C; ice floats.',
      ],
      [
        'ນ້ຳກະດ້າງມີ Ca ແລະ Mg ລະລາຍ; ການຕົ້ມແກ້ໄດ້ບາງຊະນິດ.',
        'Hard water contains Ca and Mg; boiling removes temporary hardness.',
      ],
    ],
    questions: [
      [
        'ເປັນຫຍັງນ້ຳໃນໜອງໃນເຂດໜາວ ຈຶ່ງບໍ່ກາຍເປັນກ້ອນຈົນໝົດ?',
        'Why does a pond in a cold region not freeze solid from the bottom?',
      ],
      ['ເຮັດແນວໃດຈຶ່ງຮູ້ວ່ານ້ຳກະດ້າງ?', 'How can you tell hard water? (Soap lathers poorly.)'],
    ],
    activity: [
      'ຕົ້ມນ້ຳ ແລະ ບັນທຶກອຸນຫະພູມທຸກນາທີ ແລ້ວແຕ້ມກຣາຟ (ເສັ້ນຮາບຢູ່ທີ່ຈຸດເດືອດ).',
      'Heat water, record the temperature each minute and plot a graph (flat at the boiling point).',
    ],
    quiz: [
      qz(
        'q1',
        ['ນ້ຳບໍລິສຸດເດືອດທີ່ອຸນຫະພູມເທົ່າໃດ ທີ່ຄວາມດັນປົກກະຕິ?', 'At what temperature does pure water boil at normal pressure?'],
        [
          ['0 °C', '0 °C'],
          ['100 °C', '100 °C'],
          ['4 °C', '4 °C'],
        ],
        1,
        ['ຈຸດເດືອດຂອງນ້ຳບໍລິສຸດແມ່ນ 100 °C.', 'The boiling point of pure water is 100 °C.'],
      ),
      qz(
        'q2',
        ['ເປັນຫຍັງກ້ອນນ້ຳຈຶ່ງລອຍເທິງນ້ຳ?', 'Why does ice float on water?'],
        [
          ['ນ້ຳກ້ອນໜາແໜ້ນໜ້ອຍກວ່ານ້ຳແຫຼວ', 'Ice is less dense than liquid water'],
          ['ນ້ຳກ້ອນໜັກກວ່າ', 'Ice is heavier'],
          ['ນ້ຳກ້ອນຮ້ອນກວ່າ', 'Ice is hotter'],
        ],
        0,
        ['ເມື່ອແຂງຕົວ ບໍລິມາດນ້ຳເພີ່ມຂຶ້ນ ຄວາມໜາແໜ້ນຈຶ່ງຫຼຸດ.', 'Water expands on freezing, so its density falls.'],
      ),
      qz(
        'q3',
        ['ນ້ຳກະດ້າງມີລັກສະນະຫຍັງ?', 'What is a feature of hard water?'],
        [
          ['ສະບູເກີດຟອງຍາກ', 'Soap lathers poorly'],
          ['ບໍ່ມີທາດຫຍັງລະລາຍ', 'Nothing is dissolved'],
          ['ເດືອດທີ່ 0 °C', 'It boils at 0 °C'],
        ],
        0,
        ['Ca ແລະ Mg ທີ່ລະລາຍ ທຳປະຕິກິລິຍາກັບສະບູ.', 'Dissolved Ca and Mg react with soap.'],
      ),
    ],
  }),
  ready({
    id: 'm2-10',
    title: ['ລັກສະນະຂອງອາກາດ', 'Properties of air'],
    hours: 7,
    field: 'earth',
    minutes: 20,
    summary: [
      'ອາກາດຫຸ້ມໂລກ ມີນ້ຳໜັກ ແລະ ມີຄວາມດັນ. ຄວາມດັນອາກາດຫຼຸດລົງເມື່ອສູງຂຶ້ນ ແລະ ອາກາດຮ້ອນຂະຫຍາຍ ລອຍຂຶ້ນ ເກີດລົມ.',
      'Air surrounds the Earth, has weight and exerts pressure. Air pressure falls with height; warm air expands and rises, making wind.',
    ],
    objectives: [
      ['ອະທິບາຍວ່າອາກາດຫຸ້ມຮອບໂລກ', 'Explain that air surrounds the Earth'],
      [
        'ພິສູດວ່າອາກາດມີນ້ຳໜັກ, ມີຄວາມດັນ, ຂະຫຍາຍ-ຫົດ ແລະ ເຄື່ອນທີ່ໄດ້',
        'Show that air has weight and pressure, expands and contracts, and moves',
      ],
      ['ອະທິບາຍຄວາມດັນອາກາດ ແລະ ຄວາມຊຸ່ມ', 'Explain air pressure and humidity'],
    ],
    keyIdeas: [
      ['ອາກາດມີນ້ຳໜັກ ແລະ ມີຄວາມດັນ.', 'Air has weight and exerts pressure.'],
      ['ຄວາມດັນອາກາດຫຼຸດລົງເມື່ອສູງຂຶ້ນ.', 'Air pressure decreases with height.'],
      [
        'ອາກາດຮ້ອນຂະຫຍາຍ ແລະ ລອຍຂຶ້ນ ເຮັດໃຫ້ເກີດລົມ.',
        'Warm air expands and rises, which causes wind.',
      ],
      ['ຄວາມຊຸ່ມ = ປະລິມານໄອນ້ຳໃນອາກາດ.', 'Humidity = the amount of water vapour in the air.'],
    ],
    questions: [
      ['ເປັນຫຍັງຫູອື້ ເມື່ອຂຶ້ນພູສູງ?', 'Why do ears pop on a high mountain?'],
      [
        'ເປັນຫຍັງລົມພັດຈາກທະເລມາຝັ່ງໃນເວລາກາງເວັນ?',
        'Why does the wind blow from sea to land by day?',
      ],
    ],
    activity: [
      'ແຂວນບານລູມສອງໜ່ວຍທີ່ປາຍໄມ້ຄານໃຫ້ສົມດຸນ ແລ້ວເປົ່າລົມໃສ່ໜ່ວຍໜຶ່ງ ແລະ ສັງເກດວ່າດ້ານໃດຕ່ຳລົງ.',
      'Balance two balloons on a stick, inflate one, and see which side goes down.',
    ],
    quiz: [
      qz(
        'q1',
        ['ເມື່ອຂຶ້ນສູງຂຶ້ນ ຄວາມດັນອາກາດຈະເປັນແນວໃດ?', 'As you go higher, what happens to air pressure?'],
        [
          ['ເພີ່ມຂຶ້ນ', 'It increases'],
          ['ຫຼຸດລົງ', 'It decreases'],
          ['ບໍ່ປ່ຽນ', 'It stays the same'],
        ],
        1,
        ['ເມື່ອສູງຂຶ້ນ ອາກາດຢູ່ຂ້າງເທິງມີໜ້ອຍລົງ.', 'There is less air above you at greater height.'],
      ),
      qz(
        'q2',
        ['ເຫດໃດເຮັດໃຫ້ເກີດລົມ?', 'What causes wind?'],
        [
          ['ອາກາດຮ້ອນລອຍຂຶ້ນ ແລະ ອາກາດເຢັນເຂົ້າມາແທນ', 'Warm air rises and cool air moves in'],
          ['ດວງຈັນດຶງອາກາດ', 'The Moon pulling air'],
          ['ນ້ຳທີ່ລະເຫີຍ', 'Evaporating water'],
        ],
        0,
        ['ການເຄື່ອນທີ່ຂອງອາກາດເກີດຈາກຄວາມແຕກຕ່າງຂອງອຸນຫະພູມ.', 'Air moves because of temperature differences.'],
      ),
      qz(
        'q3',
        ['ຄວາມຊຸ່ມຂອງອາກາດໝາຍເຖິງຫຍັງ?', 'What does humidity mean?'],
        [
          ['ປະລິມານໄອນ້ຳໃນອາກາດ', 'The amount of water vapour in air'],
          ['ອຸນຫະພູມຂອງອາກາດ', 'The temperature of air'],
          ['ຄວາມໄວຂອງລົມ', 'The speed of wind'],
        ],
        0,
        ['ຄວາມຊຸ່ມສູງ ໝາຍຄວາມວ່າມີໄອນ້ຳໃນອາກາດຫຼາຍ.', 'High humidity means a lot of water vapour.'],
      ),
    ],
  }),
  ready({
    id: 'm2-11',
    title: ['ແສງສະຫວ່າງ', 'Light'],
    hours: 9,
    field: 'phys',
    minutes: 25,
    sim: 'reflection',
    summary: [
      'ແສງເດີນທາງເປັນເສັ້ນຊື່ ແລະ ເກີດເງົາເມື່ອຖືກກີດຂວາງ. ເມື່ອສະທ້ອນທີ່ແວ່ນພຽງ ມຸມຕົກກະທົບເທົ່າກັບມຸມສະທ້ອນ ແລະ ເກີດຮູບລວງຢູ່ຫຼັງແວ່ນ.',
      'Light travels in straight lines and makes shadows when blocked. At a plane mirror the angle of incidence equals the angle of reflection and a virtual image forms behind the mirror.',
    ],
    objectives: [
      ['ຍົກຕົວຢ່າງແຫຼ່ງແສງ ແລະ ລັກສະນະຂອງແສງ', 'Give examples of light sources and properties of light'],
      [
        'ບອກຄວາມແຕກຕ່າງລະຫວ່າງວັດຖຸໂປ່ງໃສ, ໂປ່ງແສງ ແລະ ບໍ່ໂປ່ງແສງ',
        'Distinguish transparent, translucent and opaque materials',
      ],
      ['ທົດລອງວ່າແສງເດີນທາງເປັນເສັ້ນຊື່', 'Show that light travels in straight lines'],
      [
        'ອະທິບາຍການເກີດເງົາ, ຈັນທະຄາຕ ແລະ ສຸລິຍະຄາຕ',
        'Explain shadows, lunar eclipses and solar eclipses',
      ],
      ['ບອກກົດການສະທ້ອນແສງ ແລະ ຮູບໃນແວ່ນພຽງ', 'State the law of reflection and describe plane-mirror images'],
    ],
    keyIdeas: [
      ['ແສງເດີນທາງເປັນເສັ້ນຊື່.', 'Light travels in straight lines.'],
      [
        'ກົດການສະທ້ອນ: ມຸມຕົກກະທົບ = ມຸມສະທ້ອນ (ວັດຈາກເສັ້ນຕັ້ງສາກ).',
        'Law of reflection: angle of incidence = angle of reflection (measured from the normal).',
      ],
      [
        'ຮູບໃນແວ່ນພຽງ: ຂະໜາດເທົ່າວັດຖຸ, ຢູ່ຫຼັງແວ່ນໄລຍະເທົ່າກັນ, ຊ້າຍ-ຂວາສະຫຼັບກັນ.',
        'Plane-mirror image: same size, same distance behind the mirror, left-right reversed.',
      ],
      [
        'ຮູບຈິງຮັບເທິງຈໍໄດ້; ຮູບລວງຮັບເທິງຈໍບໍ່ໄດ້.',
        'A real image can be shown on a screen; a virtual image cannot.',
      ],
    ],
    questions: [
      [
        'ເປັນຫຍັງເຮົາເຫັນຕົວເອງໃນແວ່ນ ແຕ່ບໍ່ເຫັນໃນກຳແພງ?',
        'Why do we see ourselves in a mirror but not in a wall? (regular vs diffuse reflection)',
      ],
      ['ສຸລິຍະຄາຕເກີດຂຶ້ນເມື່ອໃດ?', 'When does a solar eclipse occur?'],
    ],
    activity: [
      'ສ່ອງໄຟສາຍຕາ (ຫຼື ເລເຊີລະດັບປອດໄພ) ໃສ່ແວ່ນ ແລ້ວວັດມຸມ. ຫ້າມສ່ອງໃສ່ຕາ.',
      'Aim a safe torch beam at a mirror and measure the angles. Never shine it at eyes.',
    ],
    quiz: [
      qz(
        'q1',
        ['ມຸມຕົກກະທົບ 35° ກັບແວ່ນພຽງ. ມຸມສະທ້ອນເທົ່າໃດ?', 'The angle of incidence on a plane mirror is 35°. What is the angle of reflection?'],
        [
          ['35°', '35°'],
          ['55°', '55°'],
          ['70°', '70°'],
        ],
        0,
        ['ກົດການສະທ້ອນ: r = i.', 'Law of reflection: r = i.'],
      ),
      qz(
        'q2',
        ['ວັດຖຸຢູ່ຫ່າງຈາກແວ່ນພຽງ 3 ໜ່ວຍ. ຮູບຢູ່ຫຼັງແວ່ນຫ່າງເທົ່າໃດ?', 'An object is 3 units from a plane mirror. How far behind the mirror is the image?'],
        [
          ['1.5 ໜ່ວຍ', '1.5 units'],
          ['3 ໜ່ວຍ', '3 units'],
          ['6 ໜ່ວຍ', '6 units'],
        ],
        1,
        ['ຮູບຢູ່ຫຼັງແວ່ນໄລຍະເທົ່າກັບວັດຖຸຢູ່ໜ້າແວ່ນ.', 'The image is as far behind the mirror as the object is in front.'],
      ),
      qz(
        'q3',
        ['ມຸມຕົກກະທົບວັດຈາກຫຍັງ?', 'What is the angle of incidence measured from?'],
        [
          ['ພື້ນຜິວແວ່ນ', 'The mirror surface'],
          ['ເສັ້ນຕັ້ງສາກ (normal)', 'The normal'],
          ['ເສັ້ນຂອບຟ້າ', 'The horizon'],
        ],
        1,
        ['ມຸມທັງໝົດວັດຈາກເສັ້ນຕັ້ງສາກກັບພື້ນຜິວ ບໍ່ແມ່ນຈາກພື້ນຜິວ.', 'Angles are measured from the normal, not from the surface.'],
      ),
      qz(
        'q4',
        ['ຮູບໃນແວ່ນພຽງເປັນຮູບປະເພດໃດ?', 'What kind of image does a plane mirror form?'],
        [
          ['ຮູບຈິງ ຮັບເທິງຈໍໄດ້', 'Real, can be shown on a screen'],
          ['ຮູບລວງ ຮັບເທິງຈໍບໍ່ໄດ້', 'Virtual, cannot be shown on a screen'],
          ['ບໍ່ມີຮູບ', 'No image'],
        ],
        1,
        ['ແສງບໍ່ໄດ້ຜ່ານໄປຫຼັງແວ່ນແທ້ ຈຶ່ງເປັນຮູບລວງ.', 'No light actually goes behind the mirror, so the image is virtual.'],
      ),
    ],
  }),
  ready({
    id: 'm2-12',
    title: ['ສຽງ', 'Sound'],
    hours: 9,
    field: 'phys',
    minutes: 25,
    summary: [
      'ສຽງເກີດຈາກການສັ່ນສະເທືອນ ແລະ ຕ້ອງມີຕົວກາງເພື່ອເດີນທາງ. ຄວາມຖີ່ກຳນົດລະດັບສູງ-ຕ່ຳ ແລະ ແອມພລິຈູດກຳນົດຄວາມດັງ.',
      'Sound comes from vibration and needs a medium to travel. Frequency sets the pitch and amplitude sets the loudness.',
    ],
    objectives: [
      ['ຮັບຮູ້ວ່າສຽງເກີດຈາກການສັ່ນສະເທືອນ', 'Recognise that sound comes from vibration'],
      ['ບອກຄວາມຖີ່, ຄວາມເຂັ້ມ ແລະ ລະດັບສູງ-ຕ່ຳຂອງສຽງ', 'Describe frequency, intensity and pitch'],
      [
        'ຢັ້ງຢືນວ່າສຽງຜ່ານແຂງ, ແຫຼວ, ກາສ ແຕ່ບໍ່ຜ່ານສູນຍາກາດ',
        'Show that sound travels through solids, liquids and gases but not a vacuum',
      ],
      [
        'ອະທິບາຍການສະທ້ອນສຽງ (ສຽງກ້ອງ), ມົນລະພິດທາງສຽງ ແລະ ການປ້ອງກັນ',
        'Explain echoes, noise pollution and how to protect against it',
      ],
    ],
    keyIdeas: [
      ['ສຽງຕ້ອງມີຕົວກາງເພື່ອເດີນທາງ.', 'Sound needs a medium to travel.'],
      [
        'ຄວາມຖີ່ (Hz) ຍິ່ງສູງ ສຽງຍິ່ງແຫຼມ; ແອມພລິຈູດໃຫຍ່ ສຽງດັງ.',
        'Higher frequency (Hz) means higher pitch; larger amplitude means louder sound.',
      ],
      [
        'ສຽງໃນອາກາດ ≈ 340 m/s; ໄວກວ່າໃນແຫຼວ ແລະ ແຂງ.',
        'Sound travels at about 340 m/s in air; faster in liquids and solids.',
      ],
      [
        'ສຽງດັງເກີນ 85 dB ເປັນເວລານານ ທຳລາຍການໄດ້ຍິນ.',
        'Prolonged sound above about 85 dB damages hearing.',
      ],
    ],
    questions: [
      ['ເປັນຫຍັງໃນອະວະກາດ ຈຶ່ງບໍ່ໄດ້ຍິນສຽງລະເບີດ?', 'Why is an explosion silent in space?'],
      [
        'ເປັນຫຍັງເຮົາເຫັນຟ້າແມບກ່ອນໄດ້ຍິນຟ້າຮ້ອງ?',
        'Why do we see lightning before hearing thunder?',
      ],
    ],
    activity: [
      'ວາງໄມ້ບັນທັດໃຫ້ຍື່ນອອກຈາກຂອບໂຕະ ແລ້ວດີດ: ປ່ຽນຄວາມຍາວທີ່ຍື່ນ ແລະ ຟັງສຽງສູງ-ຕ່ຳ.',
      'Twang a ruler over a desk edge: change the overhanging length and listen to the pitch change.',
    ],
    quiz: [
      qz(
        'q1',
        ['ສຽງເກີດຈາກຫຍັງ?', 'What produces sound?'],
        [
          ['ການສັ່ນສະເທືອນ', 'Vibration'],
          ['ແສງ', 'Light'],
          ['ຄວາມຮ້ອນ', 'Heat'],
        ],
        0,
        ['ວັດຖຸສັ່ນ ເຮັດໃຫ້ອາກາດອ້ອມຂ້າງສັ່ນຕາມ.', 'A vibrating object makes the surrounding air vibrate.'],
      ),
      qz(
        'q2',
        ['ຄວາມຖີ່ຂອງສຽງເພີ່ມຂຶ້ນ. ສຽງຈະເປັນແນວໃດ?', 'The frequency of a sound increases. What happens to the sound?'],
        [
          ['ແຫຼມຂຶ້ນ (ສູງຂຶ້ນ)', 'Higher pitch'],
          ['ຕ່ຳລົງ', 'Lower pitch'],
          ['ດັງຂຶ້ນພຽງຢ່າງດຽວ', 'Only louder'],
        ],
        0,
        ['ຄວາມຖີ່ສູງ = ສຽງແຫຼມ; ຄວາມດັງຂຶ້ນກັບແອມພລິຈູດ.', 'High frequency = high pitch; loudness depends on amplitude.'],
      ),
      qz(
        'q3',
        ['ສຽງເດີນທາງຜ່ານສິ່ງໃດບໍ່ໄດ້?', 'Through which can sound NOT travel?'],
        [
          ['ນ້ຳ', 'Water'],
          ['ເຫຼັກ', 'Steel'],
          ['ສູນຍາກາດ', 'A vacuum'],
        ],
        2,
        ['ສູນຍາກາດບໍ່ມີອະນຸພາກທີ່ຈະສັ່ນຕໍ່ກັນ.', 'A vacuum has no particles to pass on the vibration.'],
      ),
      qz(
        'q4',
        ['ຟ້າແມບເຫັນກ່ອນຟ້າຮ້ອງ ເພາະ?', 'We see lightning before hearing thunder because?'],
        [
          ['ແສງເດີນທາງໄວກວ່າສຽງຫຼາຍ', 'Light travels much faster than sound'],
          ['ສຽງເດີນທາງໄວກວ່າ', 'Sound travels faster'],
          ['ຟ້າແມບເກີດກ່ອນສະເໝີ', 'Lightning always happens first'],
        ],
        0,
        ['ແສງ ≈ 300 000 km/s ສ່ວນສຽງ ≈ 340 m/s.', 'Light ≈ 300 000 km/s, sound ≈ 340 m/s.'],
      ),
    ],
  }),
]
