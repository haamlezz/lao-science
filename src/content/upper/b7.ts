// Biology M.7 (ມ.7), 6 topics, 68 h. All ready. AI-drafted Lao; terms below need a biology teacher's check.
// REVIEW (terms not seen verbatim in the curriculum): ການຄັດເລືອກຕາມທຳມະຊາດ (natural selection), ວິວັດທະນາການ,
//   ຟອດຊິວ (fossil), ກາຍວິພາກທຽບ (comparative anatomy), ອັລລີລ (allele), ເຊື້ອພັນ/ພັນທຸກຳ (genotype: ແບບແຊນ),
//   ລັກສະນະປາກົດ (phenotype), ຕາຕະລາງ Punnett, ການກາຍພັນ (mutation), ໄຕຣໂຊມີ (trisomy), ອະສຸຈິ (sperm),
//   ໄຂ່ (egg), ໄຊໂນແບັກທີເຣຍ, ສົມມຸດຕິຖານ, ແຜ່ນເປືອກໂລກ, ຫີນອັກນີ/ຕະກອນ/ແປຮູບ, ຊີວະເຕັກໂນໂລຊີ, ຍີນດັດແປງ (GMO),
//   ຄວາມປອດໄພທາງຊີວະພາບ, ປະກົດການເຮືອນແກ້ວ, ການພັດທະນາແບບຍືນຍົງ, ຢາປະຕິຊີວະນະ (antibiotic).
// Authoring notes: b7-01 (human evolution) and b7-03 (sex determination, chromosome abnormalities) are written as
// plain science; teachers may adapt the discussion to the class. The selection sim is an illustrative model.
// Person names (Lamarck, Darwin, Mendel, Oparin, Miller) and gene/allele symbols (T, t, R, r, X, Y) stay Latin.
import { quizItem, ready } from '../lower/build'
import type { LessonDef } from '../lower/types'

export const b7: LessonDef[] = [
  ready({
    id: 'b7-01',
    title: ['ວິວັດທະນາການຂອງສິ່ງທີ່ມີຊີວິດ', 'Evolution'],
    hours: 8,
    field: 'bio',
    minutes: 30,
    sim: 'selection',
    summary: [
      'ທິດສະດີຂອງ Lamarck ແລະ Darwin ອະທິບາຍວ່າ ສິ່ງທີ່ມີຊີວິດປ່ຽນແປງຕະຫຼອດຫຼາຍລຸ້ນ ແລະ ການຄັດເລືອກຕາມທຳມະຊາດແມ່ນກົນໄກຫຼັກ.',
      'The theories of Lamarck and Darwin explain how living things change over many generations; natural selection is the main mechanism.',
    ],
    objectives: [
      ['ອະທິບາຍທິດສະດີຂອງ Lamarck ແລະ Darwin', 'Explain the theories of Lamarck and Darwin'],
      ['ອະທິບາຍການຄັດເລືອກຕາມທຳມະຊາດ ຈາກຫຼັກຖານ', 'Explain natural selection with evidence'],
      ['ອະທິບາຍວິວັດທະນາການຂອງມະນຸດ ຢ່າງຫຍໍ້', 'Outline human evolution'],
    ],
    keyIdeas: [
      ['ມີຄວາມແຕກຕ່າງໃນປະຊາກອນ ແລະ ບາງລັກສະນະຖ່າຍທອດໄດ້', 'Populations vary and some traits are inherited'],
      ['ໂຕທີ່ເໝາະສົມກວ່າ ມີຊີວິດລອດ ແລະ ສືບພັນໄດ້ຫຼາຍກວ່າ', 'Better-suited individuals survive and reproduce more'],
      [
        'ຫຼາຍລຸ້ນຕໍ່ມາ ສັດສ່ວນຂອງລັກສະນະນັ້ນໃນປະຊາກອນເພີ່ມຂຶ້ນ (ວິວັດທະນາການບໍ່ໄດ້ມີຈຸດປະສົງ)',
        'Over generations the share of that trait rises (evolution has no purpose)',
      ],
      ['ຫຼັກຖານ: ຟອດຊິວ, ກາຍວິພາກທຽບ ແລະ DNA', 'Evidence: fossils, comparative anatomy and DNA'],
    ],
    questions: [
      [
        'ເປັນຫຍັງຢາປະຕິຊີວະນະ ຄ່ອຍໆໃຊ້ບໍ່ໄດ້ຜົນກັບແບັກທີເຣຍ?',
        'Why do antibiotics gradually stop working on bacteria? (selection for resistance)',
      ],
      [
        'ຄໍຍາວຂອງຍີຣາຟ ອະທິບາຍຕາມ Lamarck ແລະ Darwin ຕ່າງກັນແນວໃດ?',
        "How do Lamarck and Darwin explain the giraffe's long neck differently?",
      ],
    ],
    activity: [
      'ຫຼີ້ນເກມ "ນົກກິນແມງ": ໃຊ້ເມັດສີ ວາງໃສ່ຜ້າສີ ໃຫ້ຜູ້ຫຼີ້ນເກັບ 20 ວິນາທີ ແລ້ວນັບສີທີ່ເຫຼືອ',
      'Play a "predator" game: scatter coloured beans on a coloured cloth, collect for 20 s, count the surviving colours',
    ],
    quiz: [
      quizItem(
        'b7-01-q1',
        ['ຕາມ Darwin ອັນໃດເປັນກົນໄກຫຼັກຂອງວິວັດທະນາການ?', 'According to Darwin, what is the main mechanism of evolution?'],
        [
          ['ໃຊ້ອະໄວຍະວະຫຼາຍ ແລ້ວຖ່າຍທອດໃຫ້ລູກ', 'Using an organ more and passing it on'],
          ['ການຄັດເລືອກຕາມທຳມະຊາດ', 'Natural selection'],
          ['ສິ່ງມີຊີວິດຕັ້ງໃຈປ່ຽນຕົນເອງ', 'Organisms deciding to change'],
        ],
        1,
        [
          'ໂຕທີ່ເໝາະສົມກວ່າຢູ່ລອດ ແລະ ສືບພັນຫຼາຍກວ່າ ຈຶ່ງຖ່າຍທອດລັກສະນະນັ້ນຕໍ່.',
          'Better-suited individuals survive and reproduce more, passing the trait on.',
        ],
      ),
      quizItem(
        'b7-01-q2',
        ['ເງື່ອນໄຂອັນໃດຈຳເປັນ ເພື່ອໃຫ້ການຄັດເລືອກຕາມທຳມະຊາດເກີດຂຶ້ນ?', 'Which condition is required for natural selection?'],
        [
          ['ທຸກໂຕໃນປະຊາກອນຄືກັນໝົດ', 'All individuals are identical'],
          ['ມີຄວາມແຕກຕ່າງທີ່ຖ່າຍທອດໄດ້', 'Heritable variation'],
          ['ບໍ່ມີຜູ້ລ່າ', 'No predators'],
        ],
        1,
        [
          'ຖ້າບໍ່ມີຄວາມແຕກຕ່າງທີ່ຖ່າຍທອດໄດ້ ການຄັດເລືອກກໍບໍ່ປ່ຽນປະຊາກອນ.',
          'Without heritable variation, selection cannot change the population.',
        ],
      ),
      quizItem(
        'b7-01-q3',
        [
          'ໃນແບບຈຳລອງແມງປີກແຂງ (beetle) ເທິງພື້ນສີຂຽວ ແມງສີຂຽວມີສັດສ່ວນ 0.5 ແລະ ລອດ 0.8 ແມງສີນ້ຳຕານລອດ 0.4 ສັດສ່ວນສີຂຽວລຸ້ນຕໍ່ໄປປະມານເທົ່າໃດ?',
          'In the beetle model on a green background, green is 0.5 of the population and survives at 0.8, brown survives at 0.4. About what is the green share next generation?',
        ],
        [
          ['0.50', '0.50'],
          ['0.67', '0.67'],
          ['0.80', '0.80'],
        ],
        1,
        [
          'p′ = 0.5×0.8 / (0.5×0.8 + 0.5×0.4) = 0.4 / 0.6 ≈ 0.67.',
          "p′ = 0.5×0.8 / (0.5×0.8 + 0.5×0.4) = 0.4 / 0.6 ≈ 0.67.",
        ],
      ),
      quizItem(
        'b7-01-q4',
        ['ຂໍ້ໃດບໍ່ແມ່ນຫຼັກຖານຂອງວິວັດທະນາການ?', 'Which is NOT evidence for evolution?'],
        [
          ['ຟອດຊິວ', 'Fossils'],
          ['ຄວາມຄ້າຍກັນຂອງ DNA', 'DNA similarity'],
          ['ສັດຢາກມີຄໍຍາວ ຈຶ່ງມີຄໍຍາວ', 'Animals wanting a long neck, so they get one'],
        ],
        2,
        [
          'ວິວັດທະນາການບໍ່ໄດ້ຖືກຂັບເຄື່ອນດ້ວຍຄວາມຕ້ອງການ ຫຼື ຄວາມຢາກ; ຫຼັກຖານມາຈາກຟອດຊິວ ແລະ DNA.',
          'Evolution is not driven by wants; evidence comes from fossils, anatomy and DNA.',
        ],
      ),
    ],
  }),
  ready({
    id: 'b7-02',
    title: ['ກຳເນີດຂອງການມີຊີວິດ', 'Origin of life'],
    hours: 4,
    field: 'bio',
    minutes: 20,
    summary: [
      'ສົມມຸດຕິຖານຂອງ Oparin ແລະ ການທົດລອງຂອງ Miller ສະແດງວ່າ ສານອິນຊີເຊັ່ນອາມິໂນອາຊິດ ອາດເກີດຈາກສານງ່າຍໆໃນໂລກຍຸກເລີ່ມຕົ້ນ.',
      "Oparin's hypothesis and Miller's experiment show that organic molecules such as amino acids could form from simple substances on the early Earth.",
    ],
    objectives: [
      ['ອະທິບາຍສົມມຸດຕິຖານກຳເນີດຊີວິດ ຂອງ Oparin ແລະ ການທົດລອງຂອງ Miller', "Explain Oparin's hypothesis and Miller's experiment"],
      ['ບອກບົດບາດຂອງອົກຊີແຊນ ຕໍ່ການຂະຫຍາຍຕົວຂອງຊີວິດ', 'State the role of oxygen in the expansion of life'],
      ['ບອກກຳເນີດຂອງມະນຸດ ຢ່າງຫຍໍ້', 'Outline the origin of humans briefly'],
    ],
    keyIdeas: [
      ['ໂລກມີອາຍຸ ≈ 4.5 ພັນລ້ານປີ; ຊີວິດເກີດຂຶ້ນ ≈ 3.5 ພັນລ້ານປີກ່ອນ', 'Earth is ≈ 4.5 billion years old; life began ≈ 3.5 billion years ago'],
      [
        'Miller (1953) ໃຊ້ໄຟຟ້າກັບ CH₄, NH₃, H₂ ແລະ ໄອນ້ຳ ແລ້ວໄດ້ອາມິໂນອາຊິດ',
        'Miller (1953) sparked CH₄, NH₃, H₂ and steam and obtained amino acids',
      ],
      ['ໄຊໂນແບັກທີເຣຍສັງເຄາະດ້ວຍແສງ ເຮັດໃຫ້ O₂ ໃນບັນຍາກາດເພີ່ມຂຶ້ນ', 'Cyanobacteria photosynthesised and raised atmospheric O₂'],
      ['ທັງໝົດເປັນສົມມຸດຕິຖານ ທີ່ຍັງຖືກຄົ້ນຄວ້າຕໍ່', 'These are hypotheses that are still being studied'],
    ],
    questions: [
      [
        'ເປັນຫຍັງຊີວິດຈຶ່ງບໍ່ເກີດຂຶ້ນໃໝ່ຈາກສານເຄມີໃນປັດຈຸບັນ?',
        'Why does life not arise anew from chemicals today? (O₂, existing organisms)',
      ],
      ['ການທົດລອງຂອງ Miller ສະແດງຫຍັງ ແລະ ບໍ່ໄດ້ສະແດງຫຍັງ?', "What does Miller's experiment show and not show?"],
    ],
    activity: [
      'ແຕ້ມເສັ້ນເວລາ 4.5 ພັນລ້ານປີ ເທິງເຊືອກຍາວ 4.5 m (1 m = 1 ພັນລ້ານປີ)',
      'Draw the 4.5-billion-year timeline on a 4.5 m string (1 m = 1 billion years)',
    ],
    quiz: [
      quizItem(
        'b7-02-q1',
        ['ໃນການທົດລອງຂອງ Miller ໄດ້ຜົນຫຍັງ?', "What was the result of Miller's experiment?"],
        [
          ['ສັດຕົວນ້ອຍ', 'Small animals'],
          ['ອາມິໂນອາຊິດ', 'Amino acids'],
          ['ຈຸລັງທີ່ມີຊີວິດ', 'Living cells'],
        ],
        1,
        [
          'ໄຟຟ້າໃນສານປະສົມແກັສຂອງໂລກຍຸກເລີ່ມຕົ້ນ ໃຫ້ອາມິໂນອາຊິດ ແຕ່ບໍ່ໄດ້ສ້າງຊີວິດ.',
          'Sparks in a mix of early-Earth gases gave amino acids, not life.',
        ],
      ),
      quizItem(
        'b7-02-q2',
        ['ສິ່ງມີຊີວິດໃດເພີ່ມ O₂ ໃນບັນຍາກາດໂລກຍຸກເລີ່ມຕົ້ນ?', "Which organisms raised O₂ in the early atmosphere?"],
        [
          ['ໄຊໂນແບັກທີເຣຍ', 'Cyanobacteria'],
          ['ໄດໂນເສົາ', 'Dinosaurs'],
          ['ມະນຸດ', 'Humans'],
        ],
        0,
        [
          'ໄຊໂນແບັກທີເຣຍສັງເຄາະດ້ວຍແສງ ແລະ ປ່ອຍ O₂.',
          'Cyanobacteria photosynthesise and release O₂.',
        ],
      ),
      quizItem(
        'b7-02-q3',
        [
          'ເສັ້ນເວລາ 1 m = 1 ພັນລ້ານປີ; ຊີວິດເກີດຂຶ້ນ ≈ 3.5 ພັນລ້ານປີກ່ອນ ຢູ່ໄກຈາກຕອນເລີ່ມໂລກປະມານເທົ່າໃດ?',
          'On a timeline with 1 m = 1 billion years, life began ≈ 3.5 billion years ago. How far from the start of Earth (4.5 m) is that mark?',
        ],
        [
          ['1.0 m', '1.0 m'],
          ['3.5 m', '3.5 m'],
          ['4.5 m', '4.5 m'],
        ],
        0,
        [
          'ໂລກເກີດ 4.5 ພັນລ້ານປີກ່ອນ ແລະ ຊີວິດ 3.5 ພັນລ້ານປີກ່ອນ ຈຶ່ງຫ່າງກັນ 1 ພັນລ້ານປີ = 1.0 m.',
          'Earth formed 4.5 and life 3.5 billion years ago, so they are 1 billion years = 1.0 m apart.',
        ],
      ),
    ],
  }),
  ready({
    id: 'b7-03',
    title: ['ກຳມະພັນວິທະຍາ ແລະ ກົນໄກການຖ່າຍທອດລັກສະນະກຳມະພັນ', 'Genetics and inheritance'],
    hours: 26,
    field: 'bio',
    minutes: 45,
    sim: 'genetics',
    summary: [
      'ກົດຂອງ Mendel ແລະ ຕາຕະລາງ Punnett ຊ່ວຍຄາດຄະເນລັກສະນະຂອງລູກ ຈາກແບບແຊນ (genotype) ຂອງພໍ່ແມ່.',
      "Mendel's laws and the Punnett square let us predict offspring traits from the parents' genotypes.",
    ],
    objectives: [
      [
        'ອະທິບາຍ DNA, ໂຄໂມໂຊມ ແລະ ແຊນ ແລະ ການແບ່ງຈຸລັງ (mitosis, meiosis)',
        'Explain DNA, chromosomes and genes and cell division (mitosis, meiosis)',
      ],
      ['ໃຊ້ກົດຂອງ Mendel ແລະ ຕາຕະລາງ Punnett ຄາດຄະເນລູກ', "Use Mendel's laws and Punnett squares to predict offspring"],
      [
        'ອະທິບາຍການກຳນົດເພດ, ການກາຍພັນ (mutation) ແລະ ຄວາມຜິດປົກກະຕິຂອງໂຄໂມໂຊມ',
        'Explain sex determination, mutation and chromosome abnormalities',
      ],
    ],
    keyIdeas: [
      ['ກົດການແຍກຕົວ: ລູກໄດ້ຮັບອັລລີລຈາກພໍ່ ແລະ ແມ່ ຢ່າງລະອັນ', 'Law of segregation: a child gets one allele from each parent'],
      [
        'ກົດການແຈກຈາຍເອງ: ແຊນທີ່ຢູ່ຄົນລະໂຄໂມໂຊມ ແຈກຈາຍເປັນອິດສະຫຼະ (9:3:3:1)',
        'Independent assortment: genes on different chromosomes sort independently (9:3:3:1)',
      ],
      [
        'Tt × Tt → ລັກສະນະ 3:1; ແບບແຊນ 1:2:1',
        'Tt × Tt → phenotypes 3:1; genotypes 1:2:1',
      ],
      [
        'ມະນຸດມີ 46 ໂຄໂມໂຊມ; XX ເປັນເພດຍິງ, XY ເປັນເພດຊາຍ; Down syndrome ມີ 47 (trisomy 21)',
        'Humans have 46 chromosomes; XX is female, XY is male; Down syndrome has 47 (trisomy 21)',
      ],
    ],
    questions: [
      [
        'ພໍ່ແມ່ຕາສີນ້ຳຕານທັງຄູ່ ມີລູກຕາສີຟ້າໄດ້ບໍ? ເປັນໄປໄດ້ແນວໃດ?',
        'Can two brown-eyed parents have a blue-eyed child? How? (simplified one-gene model)',
      ],
      [
        'ເປັນຫຍັງເພດຂອງລູກຈຶ່ງຖືກກຳນົດໂດຍເຊວອະສຸຈິ (sperm) ຂອງພໍ່?',
        "Why does the father's sperm determine the child's sex?",
      ],
    ],
    activity: [
      'ໃຊ້ຫຼຽນ 2 ເຫຼັ້ມ ແທນ T/t ຈຳລອງລູກ 40 ຄົນ ແລ້ວປຽບທຽບກັບ 3:1',
      'Use two coins for T/t, simulate 40 children and compare with 3:1',
    ],
    quiz: [
      quizItem(
        'b7-03-q1',
        ['Tt × Tt ໃຫ້ລັກສະນະເດັ່ນ : ດ້ອຍ ເປັນອັດຕາສ່ວນເທົ່າໃດ?', 'Tt × Tt gives dominant : recessive phenotypes in what ratio?'],
        [
          ['1 : 1', '1 : 1'],
          ['3 : 1', '3 : 1'],
          ['9 : 3', '9 : 3'],
          ['1 : 2 : 1', '1 : 2 : 1'],
        ],
        1,
        [
          'ຕາຕະລາງ Punnett ໃຫ້ TT : Tt : tt = 1 : 2 : 1 ຈຶ່ງເປັນລັກສະນະເດັ່ນ 3 ສ່ວນ ຕໍ່ ດ້ອຍ 1 ສ່ວນ.',
          'The Punnett square gives TT : Tt : tt = 1 : 2 : 1, so 3 dominant to 1 recessive.',
        ],
      ),
      quizItem(
        'b7-03-q2',
        ['TtRr × TtRr ສ່ວນຂອງລູກທີ່ເດັ່ນທັງສອງລັກສະນະ (T_R_) ແມ່ນເທົ່າໃດ?', 'In TtRr × TtRr, what fraction of offspring show both dominant traits (T_R_)?'],
        [
          ['3/16', '3/16'],
          ['9/16', '9/16'],
          ['1/16', '1/16'],
        ],
        1,
        [
          'ອັດຕາສ່ວນ 9:3:3:1 ມີ 16 ສ່ວນ ແລະ ເດັ່ນທັງສອງ = 9 ສ່ວນ.',
          'The 9:3:3:1 ratio has 16 parts and double-dominant is 9 of them.',
        ],
      ),
      quizItem(
        'b7-03-q3',
        ['Tt × tt ໃຫ້ລູກທີ່ມີລັກສະນະເດັ່ນເທົ່າໃດ?', 'What share of Tt × tt offspring show the dominant trait?'],
        [
          ['100 %', '100 %'],
          ['75 %', '75 %'],
          ['50 %', '50 %'],
          ['25 %', '25 %'],
        ],
        2,
        [
          'Tt × tt ໃຫ້ Tt : tt = 1 : 1 ຈຶ່ງເດັ່ນ 50 %.',
          'Tt × tt gives Tt : tt = 1 : 1, so 50 % dominant.',
        ],
      ),
      quizItem(
        'b7-03-q4',
        ['ເພດຂອງລູກຖືກກຳນົດໂດຍຫຍັງ?', "What sets the child's sex?"],
        [
          ['ໂຄໂມໂຊມ X ຈາກແມ່', 'The X chromosome from the mother'],
          ['ເຊວອະສຸຈິຂອງພໍ່ມີ X ຫຼື Y', "Whether the father's sperm carries X or Y"],
          ['ອາຫານຂອງແມ່', "The mother's diet"],
        ],
        1,
        [
          'ແມ່ໃຫ້ X ສະເໝີ; ເຊວອະສຸຈິຂອງພໍ່ໃຫ້ X (ລູກຍິງ) ຫຼື Y (ລູກຊາຍ) ຢ່າງລະ 50 %.',
          'The mother always gives X; the father gives X (girl) or Y (boy), 50 % each.',
        ],
      ),
      quizItem(
        'b7-03-q5',
        ['Down syndrome ມີຈຳນວນໂຄໂມໂຊມເທົ່າໃດ?', 'How many chromosomes does Down syndrome involve?'],
        [
          ['45', '45'],
          ['46', '46'],
          ['47', '47'],
        ],
        2,
        [
          'ມີໂຄໂມໂຊມຄູ່ທີ 21 ສາມອັນ (trisomy 21) ລວມເປັນ 47.',
          'There are three copies of chromosome 21 (trisomy 21), 47 in total.',
        ],
      ),
    ],
  }),
  ready({
    id: 'b7-04',
    title: ['ຄວາມຮູ້ພື້ນຖານກ່ຽວກັບທໍລະນີວິທະຍາ', 'Basic geology'],
    hours: 12,
    field: 'bio',
    minutes: 30,
    summary: [
      'ທໍລະນີວິທະຍາສຶກສາໂຄງສ້າງຂອງໂລກ, ຫີນ 3 ປະເພດ ແລະ ແຮ່ທາດ ເຊິ່ງມີຄວາມສຳຄັນຕໍ່ປະເທດລາວ.',
      'Geology studies the structure of the Earth, the three rock types and minerals that matter for Laos.',
    ],
    objectives: [
      ['ອະທິບາຍຄວາມໝາຍ, ປະຫວັດ ແລະ ຂອບເຂດຂອງທໍລະນີວິທະຍາ', 'Explain the meaning, history and scope of geology'],
      ['ອະທິບາຍໂຄງສ້າງທໍລະນີ ແລະ ຫີນ 3 ປະເພດ ໃນປະເທດລາວ', 'Describe geological structure and the three rock types in Laos'],
      ['ຈຳແນກແຮ່ທາດໃນລາວ ແລະ ຄວາມສຳຄັນ', 'Identify minerals in Laos and their importance'],
    ],
    keyIdeas: [
      ['ຫີນອັກນີ, ຫີນຕະກອນ, ຫີນແປຮູບ ແລະ ວົງຈອນຂອງຫີນ', 'Igneous, sedimentary and metamorphic rocks, and the rock cycle'],
      ['ແຜ່ນເປືອກໂລກເຄື່ອນທີ່ ທຳໃຫ້ເກີດພູ ແລະ ແຜ່ນດິນໄຫວ', 'Moving plates build mountains and cause earthquakes'],
      ['ແຮ່ທາດໃນລາວ: ທອງແດງ, ຄຳ, ເກືອຫີນ, ໂປແຕສ, ກົ່ວ', 'Minerals in Laos: copper, gold, rock salt, potash, tin'],
      ['ໃຊ້ຟອດຊິວ ກຳນົດອາຍຸຂອງຊັ້ນຫີນ', 'Fossils help date rock layers'],
    ],
    questions: [
      [
        'ເປັນຫຍັງຫີນປູນເປັນຫີນຕະກອນ ແລະ ຫີນອ່ອນເປັນຫີນແປຮູບ?',
        'Why is limestone sedimentary and marble metamorphic?',
      ],
      [
        'ການຂຸດແຮ່ຕ້ອງເຮັດແນວໃດ ເພື່ອບໍ່ທຳລາຍສິ່ງແວດລ້ອມ?',
        'How should mining be done to limit environmental harm?',
      ],
    ],
    activity: [
      'ຈັດຕົວຢ່າງຫີນໃນທ້ອງຖິ່ນຕາມປະເພດ ແລະ ທົດສອບດ້ວຍນ້ຳສົ້ມ (ຫີນປູນຈະເກີດຟອງ)',
      'Sort local rocks by type and test with vinegar (limestone fizzes)',
    ],
    quiz: [
      quizItem(
        'b7-04-q1',
        ['ຫີນຊະນິດໃດເກີດຈາກການເຢັນຕົວຂອງຫີນຫຼອມເຫຼວ?', 'Which rock forms when molten rock cools?'],
        [
          ['ຫີນອັກນີ', 'Igneous'],
          ['ຫີນຕະກອນ', 'Sedimentary'],
          ['ຫີນແປຮູບ', 'Metamorphic'],
        ],
        0,
        ['ຫີນອັກນີເກີດຈາກຫີນຫຼອມເຫຼວທີ່ເຢັນແລ້ວແຂງຕົວ.', 'Igneous rock forms as molten rock cools and solidifies.'],
      ),
      quizItem(
        'b7-04-q2',
        ['ຫີນອ່ອນ (marble) ເກີດຈາກຫີນປູນ ດ້ວຍຫຍັງ?', 'Marble forms from limestone by what?'],
        [
          ['ຄວາມຮ້ອນ ແລະ ຄວາມດັນສູງ', 'High heat and pressure'],
          ['ການທັບຖົມຂອງດິນຊາຍ', 'Burial of sand'],
          ['ການລະເບີດຂອງພູໄຟ', 'Volcanic eruption'],
        ],
        0,
        [
          'ຄວາມຮ້ອນ ແລະ ຄວາມດັນ ປ່ຽນຫີນເດີມເປັນຫີນແປຮູບ.',
          'Heat and pressure change an existing rock into a metamorphic rock.',
        ],
      ),
      quizItem(
        'b7-04-q3',
        ['ແຜ່ນດິນໄຫວສ່ວນໃຫຍ່ ເກີດຈາກຫຍັງ?', 'What causes most earthquakes?'],
        [
          ['ຝົນຕົກໜັກ', 'Heavy rain'],
          ['ການເຄື່ອນທີ່ຂອງແຜ່ນເປືອກໂລກ', 'Movement of crustal plates'],
          ['ລົມພາຍຸ', 'Storms'],
        ],
        1,
        [
          'ແຜ່ນເປືອກໂລກເຄື່ອນ ແລະ ສຽດສີກັນ ປ່ອຍພະລັງງານອອກມາເປັນແຜ່ນດິນໄຫວ.',
          'Plates move and grind, releasing energy as earthquakes.',
        ],
      ),
    ],
  }),
  ready({
    id: 'b7-05',
    title: ['ຊີວະເຕັກໂນໂລຊີ', 'Biotechnology'],
    hours: 8,
    field: 'bio',
    minutes: 25,
    summary: [
      'ຊີວະເຕັກໂນໂລຊີແມ່ນການນຳສິ່ງມີຊີວິດ ຫຼື ສ່ວນຂອງມັນ ມາໃຊ້ເຮັດຜະລິດຕະພັນ ຕັ້ງແຕ່ການໝັກແບບດັ້ງເດີມ ຈົນເຖິງເຕັກໂນໂລຊີ DNA.',
      'Biotechnology uses living things or their parts to make products, from traditional fermentation to DNA technology.',
    ],
    objectives: [
      ['ໃຫ້ຄວາມໝາຍ ແລະ ປະເພດຂອງຊີວະເຕັກໂນໂລຊີ', 'Define biotechnology and its kinds'],
      [
        'ອະທິບາຍເຕັກໂນໂລຊີ DNA (ການຕັດຕໍ່ ແລະ ຍີນດັດແປງ GMO) ຢ່າງງ່າຍ',
        'Explain DNA technology (cutting, joining, GMOs) simply',
      ],
      ['ອະທິບາຍຄວາມປອດໄພທາງຊີວະພາບ', 'Explain biosafety'],
    ],
    keyIdeas: [
      ['ແບບດັ້ງເດີມ: ອາຫານ ແລະ ເຄື່ອງດື່ມໝັກ ໃຊ້ຈຸລິນຊີ', 'Traditional: fermented foods and drinks use microbes'],
      ['ແບບສະໄໝໃໝ່: ຖ່າຍແຊນ; ແບັກທີເຣຍຜະລິດ insulin', 'Modern: gene transfer; bacteria making insulin'],
      [
        'ຜົນດີ: ຜົນຜະລິດເພີ່ມ, ຢາ; ຄວາມສ່ຽງ: ຜົນຕໍ່ສິ່ງແວດລ້ອມ ແລະ ສຸຂະພາບ ຕ້ອງຕິດຕາມ',
        'Benefits: higher yield, medicines; risks: effects on environment and health must be monitored',
      ],
      ['ມີກົດລະບຽບ ແລະ ຈັນຍາບັນກຳກັບ', 'Regulation and ethics guide its use'],
    ],
    questions: [
      ['ອາຫານ GMO ຄວນມີປ້າຍບອກບໍ? ເພາະຫຍັງ?', 'Should GMO food be labelled? Why?'],
      [
        'ເປັນຫຍັງການເຮັດເຂົ້າຈີ່ ຈຶ່ງເປັນຊີວະເຕັກໂນໂລຊີ?',
        'Why is bread-making biotechnology? (yeast fermentation)',
      ],
    ],
    activity: [
      'ເຮັດໂຍເກີດ ຫຼື ແປ້ງໝັກດ້ວຍຢີສ ແລ້ວສັງເກດຟອງ CO₂',
      'Make yoghurt or yeast dough and observe the CO₂ bubbles',
    ],
    quiz: [
      quizItem(
        'b7-05-q1',
        ['ຕົວຢ່າງໃດເປັນຊີວະເຕັກໂນໂລຊີແບບດັ້ງເດີມ?', 'Which is an example of traditional biotechnology?'],
        [
          ['ການເຮັດໂຍເກີດ', 'Making yoghurt'],
          ['ການຖ່າຍແຊນເຂົ້າພືດ', 'Transferring a gene into a plant'],
          ['ການຜະລິດ insulin ຈາກແບັກທີເຣຍທີ່ດັດແປງ', 'Making insulin in modified bacteria'],
        ],
        0,
        ['ໂຍເກີດໄດ້ຈາກຈຸລິນຊີໝັກນົມ ເຊິ່ງເປັນວິທີດັ້ງເດີມ.', 'Yoghurt comes from microbes fermenting milk, a traditional method.'],
      ),
      quizItem(
        'b7-05-q2',
        ['GMO ໝາຍເຖິງຫຍັງ?', 'What does GMO mean?'],
        [
          ['ສິ່ງມີຊີວິດທີ່ຖືກດັດແປງແຊນ', 'An organism whose genes were modified'],
          ['ອາຫານທີ່ບໍ່ມີ DNA', 'Food with no DNA'],
          ['ປຸ໋ຍເຄມີ', 'A chemical fertiliser'],
        ],
        0,
        ['GMO = genetically modified organism, ສິ່ງມີຊີວິດທີ່ດັດແປງແຊນ.', 'GMO = genetically modified organism.'],
      ),
      quizItem(
        'b7-05-q3',
        ['ເປັນຫຍັງຕ້ອງມີກົດລະບຽບຄວາມປອດໄພທາງຊີວະພາບ?', 'Why are biosafety rules needed?'],
        [
          ['ເພື່ອຫ້າມທຸກການຄົ້ນຄວ້າ', 'To ban all research'],
          ['ເພື່ອຕິດຕາມ ແລະ ຫຼຸດຄວາມສ່ຽງຕໍ່ສຸຂະພາບ ແລະ ສິ່ງແວດລ້ອມ', 'To monitor and limit risks to health and environment'],
          ['ເພື່ອເພີ່ມລາຄາອາຫານ', 'To raise food prices'],
        ],
        1,
        [
          'ກົດລະບຽບຊ່ວຍປະເມີນ ແລະ ຄວບຄຸມຜົນກະທົບກ່ອນນຳໃຊ້.',
          'Rules assess and control the effects before use.',
        ],
      ),
    ],
  }),
  ready({
    id: 'b7-06',
    title: ['ການປົກປັກຮັກສາທຳມະຊາດ ແລະ ສິ່ງແວດລ້ອມ', 'Conservation of nature and the environment'],
    hours: 10,
    field: 'bio',
    minutes: 30,
    summary: [
      'ກິດຈະກຳຂອງມະນຸດເຮັດໃຫ້ອຸນຫະພູມໂລກເພີ່ມ ແລະ ເກີດມົນລະພິດ ດັ່ງນັ້ນຕ້ອງອະນຸລັກຊັບພະຍາກອນ ແລະ ພັດທະນາແບບຍືນຍົງ.',
      'Human activity raises global temperature and causes pollution, so resources must be conserved and development made sustainable.',
    ],
    objectives: [
      ['ອະທິບາຍການປ່ຽນແປງອຸນຫະພູມໂລກ ແລະ ປະກົດການເຮືອນແກ້ວ', 'Explain global warming and the greenhouse effect'],
      ['ອະທິບາຍມົນລະພິດ (ນ້ຳ, ດິນ, ອາກາດ) ແລະ ວິທີແກ້ໄຂ', 'Explain pollution (water, soil, air) and solutions'],
      [
        'ບອກແນວທາງອະນຸລັກຊັບພະຍາກອນ ແລະ ການພັດທະນາແບບຍືນຍົງ',
        'Describe resource conservation and sustainable development',
      ],
    ],
    keyIdeas: [
      [
        'CO₂ ແລະ CH₄ ເປັນຕົ້ນເຫດຂອງປະກົດການເຮືອນແກ້ວ; ຝົນ ແລະ ຄວາມແຫ້ງແລ້ງປ່ຽນແປງ',
        'CO₂ and CH₄ drive the greenhouse effect; rain and drought patterns change',
      ],
      ['ການເຜົາປ່າ ແລະ ຕັດໄມ້ ເພີ່ມ CO₂ ແລະ ທຳລາຍທີ່ຢູ່ອາໄສ', 'Burning and logging add CO₂ and destroy habitat'],
      ['ຊັບພະຍາກອນສ້າງໃໝ່ໄດ້ ແລະ ສ້າງໃໝ່ບໍ່ໄດ້', 'Resources are renewable or non-renewable'],
      [
        'ຍືນຍົງ: ຕອບສະໜອງຄວາມຕ້ອງການປັດຈຸບັນ ໂດຍບໍ່ທຳລາຍຄົນຮຸ່ນຫຼັງ',
        'Sustainable: meet present needs without harming future generations',
      ],
    ],
    questions: [
      [
        'ເຮົາຫຼຸດການໃຊ້ພະລັງງານ ແລະ ຂີ້ເຫຍື້ອໃນໂຮງຮຽນໄດ້ແນວໃດ?',
        'How can we cut energy use and waste at school?',
      ],
      [
        'ເຂື່ອນໄຟຟ້າມີຜົນດີ ແລະ ຜົນເສຍຕໍ່ສິ່ງແວດລ້ອມແນວໃດ?',
        'What are the benefits and harms of hydropower dams?',
      ],
    ],
    activity: [
      'ສຳຫຼວດຂີ້ເຫຍື້ອໃນໂຮງຮຽນ 1 ມື້ ແລະ ສະເໜີແຜນຫຼຸດ',
      "Audit the school's waste for a day and propose a reduction plan",
    ],
    quiz: [
      quizItem(
        'b7-06-q1',
        ['ແກັສໃດເປັນແກັສເຮືອນແກ້ວ?', 'Which gas is a greenhouse gas?'],
        [
          ['CO₂', 'CO₂'],
          ['N₂', 'N₂'],
          ['Ar', 'Ar'],
        ],
        0,
        [
          'CO₂ (ແລະ CH₄) ດູດຮັງສີຄວາມຮ້ອນ ເຮັດໃຫ້ບັນຍາກາດອຸ່ນຂຶ້ນ.',
          'CO₂ (and CH₄) absorb heat radiation and warm the atmosphere.',
        ],
      ),
      quizItem(
        'b7-06-q2',
        ['ຊັບພະຍາກອນໃດສ້າງໃໝ່ບໍ່ໄດ້?', 'Which resource is non-renewable?'],
        [
          ['ແສງຕາເວັນ', 'Sunlight'],
          ['ນ້ຳມັນປີໂຕຣລຽມ', 'Petroleum'],
          ['ໄມ້ທີ່ປູກທົດແທນ', 'Replanted timber'],
        ],
        1,
        [
          'ນ້ຳມັນໃຊ້ເວລາລ້ານປີຈຶ່ງເກີດ ຈຶ່ງສ້າງໃໝ່ບໍ່ທັນການໃຊ້.',
          'Oil takes millions of years to form, so it cannot be renewed on human timescales.',
        ],
      ),
      quizItem(
        'b7-06-q3',
        ['ການພັດທະນາແບບຍືນຍົງໝາຍເຖິງຫຍັງ?', 'What does sustainable development mean?'],
        [
          ['ໃຊ້ຊັບພະຍາກອນໃຫ້ໝົດໄວທີ່ສຸດ', 'Use up resources as fast as possible'],
          ['ຕອບຄວາມຕ້ອງການປັດຈຸບັນ ໂດຍບໍ່ທຳລາຍຄົນຮຸ່ນຫຼັງ', 'Meet present needs without harming future generations'],
          ['ຢຸດການພັດທະນາທັງໝົດ', 'Stop all development'],
        ],
        1,
        ['ນີ້ແມ່ນຄຳນິຍາມຂອງການພັດທະນາແບບຍືນຍົງ.', 'This is the definition of sustainable development.'],
      ),
    ],
  }),
]
