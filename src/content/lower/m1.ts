import type { LessonDef } from './types'
import { m1rest } from './m1rest'

// Natural science M.1 (Grade 6), lower-secondary curriculum 2010, pp. 29-31. 9 topics, 132 h.
// Lao text is an AI draft; the whole file is subject to teacher review.
// REVIEW terms: ມວນສານຈຳເພາະ (density; the site elsewhere uses ຄວາມໜາແໜ້ນ), ສິມປົນເນື້ອດຽວ / ບໍ່ເປັນເນື້ອດຽວ
//   (homogeneous / heterogeneous mixture), ສິມປົນ (mixture), ອາໂລຫະ (non-metal), ຫຼອດຕວງ (measuring cylinder),
//   ເທີໂມມິເຕີ (thermometer), ຕະໄລ (tape measure), ສະໝ່ຳສະເໝີ (uniform), ຄວາມໄວສະເລ່ຍ (average speed),
//   ໄລຍະທາງ (distance), ຕົວແປ (variable), ສົມມຸດຕິຖານ (hypothesis), ວັດຖຸເຊື້ອໄຟ (fuel material).

export const m1: LessonDef[] = [
  {
    id: 'm1-01',
    grade: 'm1',
    order: 1,
    title: { lo: 'ວິທະຍາສາດ ແລະ ວິທີການວິທະຍາສາດ', en: 'Science and the scientific method' },
    hours: 8,
    field: 'method',
    status: 'ready',
    summary: {
      lo: 'ວິທະຍາສາດຄືການສຶກສາທຳມະຊາດໂດຍການສັງເກດ ແລະ ທົດລອງ. ນັກວິທະຍາສາດເຮັດວຽກຕາມຂັ້ນຕອນ ແລະ ລາຍງານຜົນຕາມຄວາມຈິງ.',
      en: 'Science studies nature by observing and experimenting. Scientists follow a method and report results truthfully.',
    },
    objectives: [
      {
        lo: 'ອະທິບາຍຄວາມໝາຍ, ຜົນດີ ແລະ ຜົນເສຍຂອງວິທະຍາສາດ',
        en: 'Explain the meaning, benefits and drawbacks of science',
      },
      { lo: 'ຮັບຮູ້ຄຸນສົມບັດຂອງນັກວິທະຍາສາດ', en: 'Recognise the qualities of a scientist' },
      { lo: 'ບອກຂັ້ນຕອນຂອງການຄົ້ນຄວ້າທາງວິທະຍາສາດ', en: 'State the steps of a scientific investigation' },
    ],
    keyIdeas: [
      {
        lo: 'ວິທະຍາສາດຄືການສຶກສາທຳມະຊາດໂດຍການສັງເກດ ແລະ ທົດລອງ.',
        en: 'Science studies nature by observing and experimenting.',
      },
      {
        lo: 'ວິທີການວິທະຍາສາດ: ຕັ້ງຄຳຖາມ → ສົມມຸດຕິຖານ → ທົດລອງ → ບັນທຶກຂໍ້ມູນ → ສະຫຼຸບ.',
        en: 'The method: question → hypothesis → experiment → record data → conclusion.',
      },
      {
        lo: 'ການທົດລອງທີ່ຍຸຕິທຳ: ປ່ຽນເທື່ອລະຕົວແປດຽວ ແລະ ຮັກສາຕົວອື່ນໃຫ້ຄືເກົ່າ.',
        en: 'A fair test: change one variable and keep the others the same.',
      },
      {
        lo: 'ນັກວິທະຍາສາດຕ້ອງຢາກຮູ້, ຊື່ສັດ, ລະອຽດ ແລະ ລາຍງານຜົນຕາມຈິງ.',
        en: 'Scientists are curious, honest, careful and report results truthfully.',
      },
    ],
    questions: [
      {
        lo: 'ຢາກຮູ້ວ່າເມັດພືດງອກໄດ້ບໍ່ ຖ້າບໍ່ມີນ້ຳ? ຈະອອກແບບການທົດລອງແນວໃດ?',
        en: 'How would you test whether seeds germinate without water?',
      },
      { lo: 'ເປັນຫຍັງຕ້ອງທົດລອງຊ້ຳຫຼາຍຄັ້ງ?', en: 'Why repeat an experiment several times?' },
    ],
    activity: {
      lo: 'ເຮືອບິນເຈ້ຍ: ປ່ຽນສິ່ງດຽວ (ຮູບປີກ) ແລ້ວວັດໄລຍະບິນ 3 ຄັ້ງ ແລະ ສະຫຼຸບ.',
      en: 'Paper planes: change one thing (wing shape), measure the distance 3 times, then conclude.',
    },
    minutes: 20,
    quiz: [
      {
        id: 'q1',
        q: {
          lo: 'ຂັ້ນຕອນໃດມາກ່ອນ ໃນວິທີການວິທະຍາສາດ?',
          en: 'Which step comes first in the scientific method?',
        },
        options: [
          { lo: 'ຕັ້ງຄຳຖາມ', en: 'Ask a question' },
          { lo: 'ສະຫຼຸບຜົນ', en: 'Draw a conclusion' },
          { lo: 'ບັນທຶກຂໍ້ມູນ', en: 'Record data' },
        ],
        answer: 0,
        why: {
          lo: 'ການຄົ້ນຄວ້າເລີ່ມຈາກຄຳຖາມ ແລ້ວຈຶ່ງຕັ້ງສົມມຸດຕິຖານ ແລະ ທົດລອງ.',
          en: 'An investigation starts from a question, then a hypothesis and an experiment.',
        },
      },
      {
        id: 'q2',
        q: {
          lo: 'ໃນການທົດລອງທີ່ຍຸຕິທຳ ເຮົາຄວນປ່ຽນຕົວແປຈັກຕົວຕໍ່ເທື່ອ?',
          en: 'In a fair test, how many variables should you change at a time?',
        },
        options: [
          { lo: 'ໜຶ່ງຕົວ', en: 'One' },
          { lo: 'ສອງຕົວ', en: 'Two' },
          { lo: 'ທຸກຕົວ', en: 'All of them' },
        ],
        answer: 0,
        why: {
          lo: 'ປ່ຽນຕົວດຽວ ຈຶ່ງຮູ້ວ່າຜົນທີ່ປ່ຽນໄປມາຈາກຕົວແປນັ້ນ.',
          en: 'Changing one variable shows that any difference in the result comes from it.',
        },
      },
      {
        id: 'q3',
        q: {
          lo: 'ຄຸນສົມບັດໃດເປັນຂອງນັກວິທະຍາສາດທີ່ດີ?',
          en: 'Which quality belongs to a good scientist?',
        },
        options: [
          { lo: 'ລາຍງານຜົນຕາມຄວາມຈິງ ເຖິງແມ່ນຈະບໍ່ກົງກັບທີ່ຄາດໄວ້', en: 'Reports results truthfully even if unexpected' },
          { lo: 'ປ່ຽນຜົນໃຫ້ກົງກັບສົມມຸດຕິຖານ', en: 'Changes results to fit the hypothesis' },
          { lo: 'ເຊື່ອທຸກຢ່າງໂດຍບໍ່ກວດສອບ', en: 'Believes everything without checking' },
        ],
        answer: 0,
        why: {
          lo: 'ຄວາມຊື່ສັດຕໍ່ຂໍ້ມູນເປັນຫົວໃຈຂອງວິທະຍາສາດ.',
          en: 'Honesty about data is at the heart of science.',
        },
      },
    ],
  },
  {
    id: 'm1-02',
    grade: 'm1',
    order: 2,
    title: { lo: 'ການວັດແທກ', en: 'Measurement' },
    hours: 12,
    field: 'method',
    status: 'ready',
    summary: {
      lo: 'ການວັດແທກແມ່ນການປຽບທຽບກັບຫົວໜ່ວຍມາດຕະຖານ ດ້ວຍເຄື່ອງແທກທີ່ເໝາະສົມ ແລະ ອ່ານຄ່າໃຫ້ຖືກຕ້ອງ.',
      en: 'Measuring compares a quantity with a standard unit, using a suitable instrument and reading it correctly.',
    },
    objectives: [
      { lo: 'ບອກຄວາມໝາຍ ແລະ ຄວາມຈຳເປັນຂອງການວັດແທກ', en: 'State why measurement is needed' },
      {
        lo: 'ຮູ້ຫົວໜ່ວຍ ແລະ ເຄື່ອງແທກຂອງຄວາມຍາວ, ບໍລິມາດ, ມວນສານ ແລະ ອຸນຫະພູມ',
        en: 'Know the units and instruments for length, volume, mass and temperature',
      },
      { lo: 'ວັດແທກໃຫ້ຖືກຕ້ອງ ແລະ ອ່ານຄ່າໄດ້', en: 'Measure and read values correctly' },
    ],
    keyIdeas: [
      { lo: 'ຫົວໜ່ວຍມາດຕະຖານ: m, kg, L (mL), °C, s.', en: 'Standard units: m, kg, L (mL), °C, s.' },
      {
        lo: 'ໄມ້ບັນທັດ/ຕະໄລ ວັດຄວາມຍາວ; ຫຼອດຕວງ ວັດບໍລິມາດ; ເຄື່ອງຊັ່ງ ວັດມວນສານ; ເທີໂມມິເຕີ ວັດອຸນຫະພູມ.',
        en: 'Ruler/tape: length; measuring cylinder: volume; balance: mass; thermometer: temperature.',
      },
      {
        lo: 'ອ່ານຫຼອດຕວງໃຫ້ສາຍຕາຢູ່ລະດັບດຽວກັບຜິວນ້ຳ (ອ່ານຈຸດຕ່ຳສຸດຂອງຜິວໂຄ້ງ).',
        en: 'Read a measuring cylinder with your eye level with the surface, at the bottom of the curve (meniscus).',
      },
      {
        lo: '1 m = 100 cm; 1 kg = 1000 g; 1 L = 1000 mL = 1000 cm³.',
        en: '1 m = 100 cm; 1 kg = 1000 g; 1 L = 1000 mL = 1000 cm³.',
      },
    ],
    questions: [
      {
        lo: 'ເປັນຫຍັງຈຶ່ງບໍ່ໃຊ້ຄືບ ຫຼື ກ້າວແທນໄມ້ບັນທັດ?',
        en: 'Why not measure with hand spans or steps instead of a ruler?',
      },
      {
        lo: 'ຈະວັດບໍລິມາດກ້ອນຫີນທີ່ບໍ່ເປັນຮູບທົ່ວໄປໄດ້ແນວໃດ?',
        en: 'How can you find the volume of an irregular stone? (hint: water displacement)',
      },
    ],
    activity: {
      lo: 'ວັດໂຕະດ້ວຍຄືບຂອງແຕ່ລະຄົນ ແລ້ວວັດດ້ວຍໄມ້ບັນທັດ ແລະ ປຽບທຽບ.',
      en: 'Measure a desk in hand spans (each student), then with a ruler, and compare.',
    },
    minutes: 25,
    quiz: [
      {
        id: 'q1',
        q: { lo: 'ເຄື່ອງແທກໃດໃຊ້ວັດບໍລິມາດຂອງແຫຼວ?', en: 'Which instrument measures the volume of a liquid?' },
        options: [
          { lo: 'ຫຼອດຕວງ', en: 'Measuring cylinder' },
          { lo: 'ເທີໂມມິເຕີ', en: 'Thermometer' },
          { lo: 'ໄມ້ບັນທັດ', en: 'Ruler' },
        ],
        answer: 0,
        why: {
          lo: 'ຫຼອດຕວງມີຂີດບອກບໍລິມາດເປັນ mL.',
          en: 'A measuring cylinder is marked with volume in mL.',
        },
      },
      {
        id: 'q2',
        q: { lo: '2.5 kg ເທົ່າກັບຈັກ g?', en: 'How many grams is 2.5 kg?' },
        options: [
          { lo: '250 g', en: '250 g' },
          { lo: '2500 g', en: '2500 g' },
          { lo: '25 g', en: '25 g' },
        ],
        answer: 1,
        why: { lo: '1 kg = 1000 g ສະນັ້ນ 2.5 × 1000 = 2500 g.', en: '1 kg = 1000 g, so 2.5 × 1000 = 2500 g.' },
      },
      {
        id: 'q3',
        q: {
          lo: 'ເວລາອ່ານຫຼອດຕວງ ຄວນວາງສາຍຕາຢູ່ບ່ອນໃດ?',
          en: 'Where should your eye be when reading a measuring cylinder?',
        },
        options: [
          { lo: 'ສູງກວ່າຜິວນ້ຳ', en: 'Above the liquid surface' },
          { lo: 'ລະດັບດຽວກັບຜິວນ້ຳ', en: 'Level with the liquid surface' },
          { lo: 'ຕ່ຳກວ່າຜິວນ້ຳ', en: 'Below the liquid surface' },
        ],
        answer: 1,
        why: {
          lo: 'ການອ່ານຈາກມຸມອື່ນ ເຮັດໃຫ້ຄ່າຜິດ (ຜິດພາດຈາກການເບິ່ງມຸມ).',
          en: 'Reading from another angle gives a wrong value (parallax error).',
        },
      },
      {
        id: 'q4',
        q: { lo: 'ຫົວໜ່ວຍມາດຕະຖານຂອງເວລາແມ່ນຫຍັງ?', en: 'What is the standard unit of time?' },
        options: [
          { lo: 'ວິນາທີ (s)', en: 'Second (s)' },
          { lo: 'ກິໂລກຣາມ (kg)', en: 'Kilogram (kg)' },
          { lo: 'ແມັດ (m)', en: 'Metre (m)' },
        ],
        answer: 0,
        why: { lo: 'ເວລາວັດເປັນວິນາທີ (s).', en: 'Time is measured in seconds (s).' },
      },
    ],
  },
  {
    id: 'm1-03',
    grade: 'm1',
    order: 3,
    title: { lo: 'ວັດຖຸອ້ອມຕົວເຮົາ', en: 'Materials around us' },
    hours: 19,
    field: 'chem',
    status: 'ready',
    summary: {
      lo: 'ວັດຖຸມີມວນສານ ແລະ ຄອບຄອງທີ່. ເຮົາຈັດປະເພດວັດຖຸຕາມສະຖານະ, ຕາມໂລຫະ/ອາໂລຫະ ແລະ ຕາມຄຸນສົມບັດ.',
      en: 'Matter has mass and takes up space. We classify it by state, metal/non-metal and other properties.',
    },
    objectives: [
      {
        lo: 'ບອກຄວາມໝາຍຂອງວັດຖຸ ແລະ ແຍກປະເພດ (ມີຊີວິດ/ບໍ່ມີຊີວິດ; ແຂງ, ແຫຼວ, ກາສ)',
        en: 'Define matter and classify it (living/non-living; solid, liquid, gas)',
      },
      {
        lo: 'ຈຳແນກໂລຫະ ແລະ ອາໂລຫະ, ສິມປົນເນື້ອດຽວ ແລະ ບໍ່ເປັນເນື້ອດຽວ',
        en: 'Distinguish metals and non-metals, homogeneous and heterogeneous mixtures',
      },
      {
        lo: 'ຮູ້ວັດຖຸອາຊິດ ແລະ ບາເຊ, ວັດຖຸເຊື້ອໄຟ, ວັດຖຸເປັນພິດ ແລະ ໃຊ້ຢ່າງປອດໄພ',
        en: 'Know acidic and basic, fuel and toxic materials and use them safely',
      },
    ],
    keyIdeas: [
      { lo: 'ວັດຖຸມີມວນສານ ແລະ ຄອບຄອງທີ່.', en: 'Matter has mass and takes up space.' },
      {
        lo: 'ແຂງ: ຮູບຮ່າງ ແລະ ບໍລິມາດຄົງທີ່; ແຫຼວ: ບໍລິມາດຄົງທີ່ ແຕ່ປ່ຽນຮູບຕາມພາຊະນະ; ກາສ: ເຕັມພາຊະນະ.',
        en: 'Solid: fixed shape and volume; liquid: fixed volume, takes the shape of its container; gas: fills the container.',
      },
      {
        lo: 'ສິມປົນເນື້ອດຽວ (ນ້ຳຕານລະລາຍໃນນ້ຳ) ຕ່າງຈາກບໍ່ເປັນເນື້ອດຽວ (ຊາຍປົນນ້ຳ).',
        en: 'Homogeneous (sugar in water) differs from heterogeneous (sand in water).',
      },
      {
        lo: 'ໂລຫະນຳຄວາມຮ້ອນ/ໄຟຟ້າໄດ້ດີ ແລະ ມີຜິວເງົາ.',
        en: 'Metals conduct heat and electricity well and are shiny.',
      },
      {
        lo: 'ຢ່າຊີມຫຼືດົມສານທີ່ບໍ່ຮູ້ຈັກ; ອ່ານປ້າຍເຕືອນ.',
        en: 'Never taste or smell unknown substances; read warning labels.',
      },
    ],
    questions: [
      {
        lo: 'ຍົກຕົວຢ່າງວັດຖຸ 3 ຢ່າງໃນເຮືອນ ແລ້ວຈັດເຂົ້າປະເພດ.',
        en: 'Name three household objects and classify them.',
      },
      {
        lo: 'ເປັນຫຍັງອາກາດຈຶ່ງເປັນວັດຖຸ ທັງທີ່ເຮົາເບິ່ງບໍ່ເຫັນ?',
        en: 'Why is air matter even though we cannot see it?',
      },
    ],
    activity: {
      lo: 'ຈັດ 10 ສິ່ງຂອງຕາມກຸ່ມ (ໂລຫະ/ອາໂລຫະ, ແຂງ/ແຫຼວ/ກາສ) ເປັນກຸ່ມ.',
      en: 'In groups, sort 10 items (metal/non-metal, solid/liquid/gas).',
    },
    minutes: 30,
    quiz: [
      {
        id: 'q1',
        q: { lo: 'ສະຖານະໃດມີບໍລິມາດຄົງທີ່ ແຕ່ປ່ຽນຮູບຕາມພາຊະນະ?', en: 'Which state has a fixed volume but takes the shape of its container?' },
        options: [
          { lo: 'ແຂງ', en: 'Solid' },
          { lo: 'ແຫຼວ', en: 'Liquid' },
          { lo: 'ກາສ', en: 'Gas' },
        ],
        answer: 1,
        why: {
          lo: 'ຂອງແຫຼວໄຫຼໄດ້ ຈຶ່ງມີຮູບຕາມພາຊະນະ ແຕ່ບໍລິມາດບໍ່ປ່ຽນ.',
          en: 'A liquid flows, so it takes the container shape, but its volume stays the same.',
        },
      },
      {
        id: 'q2',
        q: { lo: 'ຢ່າງໃດເປັນສິມປົນເນື້ອດຽວ?', en: 'Which is a homogeneous mixture?' },
        options: [
          { lo: 'ຊາຍປົນນ້ຳ', en: 'Sand in water' },
          { lo: 'ນ້ຳຕານລະລາຍໃນນ້ຳ', en: 'Sugar dissolved in water' },
          { lo: 'ນ້ຳມັນປົນນ້ຳ', en: 'Oil mixed with water' },
        ],
        answer: 1,
        why: {
          lo: 'ນ້ຳຕານລະລາຍກະຈາຍທົ່ວນ້ຳ ເຫັນເປັນເນື້ອດຽວກັນ.',
          en: 'Dissolved sugar spreads evenly, so the mixture looks the same throughout.',
        },
      },
      {
        id: 'q3',
        q: { lo: 'ຄຸນສົມບັດໃດເປັນຂອງໂລຫະສ່ວນໃຫຍ່?', en: 'Which property do most metals have?' },
        options: [
          { lo: 'ນຳໄຟຟ້າໄດ້ດີ', en: 'Conduct electricity well' },
          { lo: 'ເປັນຕົວຂັດຂວາງຄວາມຮ້ອນ', en: 'Insulate against heat' },
          { lo: 'ແຕກງ່າຍ ແລະ ບໍ່ເງົາ', en: 'Brittle and dull' },
        ],
        answer: 0,
        why: { lo: 'ໂລຫະນຳຄວາມຮ້ອນ ແລະ ໄຟຟ້າໄດ້ດີ ແລະ ມີຜິວເງົາ.', en: 'Metals conduct heat and electricity well and are shiny.' },
      },
      {
        id: 'q4',
        q: {
          lo: 'ເມື່ອພົບຂວດສານທີ່ບໍ່ມີປ້າຍ ຄວນເຮັດແນວໃດ?',
          en: 'What should you do with an unlabelled bottle of unknown substance?',
        },
        options: [
          { lo: 'ດົມເບິ່ງ', en: 'Smell it' },
          { lo: 'ຊີມເບິ່ງ', en: 'Taste it' },
          { lo: 'ບໍ່ແຕະຕ້ອງ ແລະ ບອກຄູ', en: 'Leave it and tell the teacher' },
        ],
        answer: 2,
        why: { lo: 'ສານທີ່ບໍ່ຮູ້ຈັກອາດເປັນພິດ ຫຼື ອັນຕະລາຍ.', en: 'An unknown substance may be toxic or dangerous.' },
      },
    ],
  },
  {
    id: 'm1-04',
    grade: 'm1',
    order: 4,
    title: { lo: 'ການເຄື່ອນທີ່', en: 'Motion' },
    hours: 17,
    field: 'phys',
    status: 'ready',
    sim: 'motion',
    summary: {
      lo: 'ວັດຖຸເຄື່ອນທີ່ ເມື່ອຕຳແໜ່ງປ່ຽນຕາມເວລາ. ຄວາມໄວ v = s ÷ t. ກຣາຟໄລຍະທາງ-ເວລາ ບອກລັກສະນະຂອງການເຄື່ອນທີ່.',
      en: 'An object moves when its position changes with time. Speed v = s ÷ t. A distance-time graph shows the kind of motion.',
    },
    objectives: [
      { lo: 'ບອກຄວາມໝາຍຂອງການເຄື່ອນທີ່ ແລະ ແບບຂອງການເຄື່ອນທີ່', en: 'State what motion is and its kinds' },
      {
        lo: 'ແຍກການເຄື່ອນທີ່ສະໝ່ຳສະເໝີ ແລະ ບໍ່ສະໝ່ຳສະເໝີ',
        en: 'Distinguish uniform and non-uniform motion',
      },
      { lo: 'ຄິດໄລ່ຄວາມໄວ, ໄລຍະທາງ ແລະ ເວລາ', en: 'Calculate speed, distance and time' },
      {
        lo: 'ອະທິບາຍມວນສານ ແລະ ມວນສານຈຳເພາະ (density) ຂອງວັດຖຸ',
        en: 'Explain mass and density of materials',
      },
    ],
    keyIdeas: [
      {
        lo: 'ວັດຖຸເຄື່ອນທີ່ ເມື່ອຕຳແໜ່ງປ່ຽນຕາມເວລາ.',
        en: 'An object moves when its position changes with time.',
      },
      {
        lo: 'v = s ÷ t; ໜ່ວຍ m/s ແລະ km/h (1 m/s = 3.6 km/h).',
        en: 'v = s ÷ t; units m/s and km/h (1 m/s = 3.6 km/h).',
      },
      {
        lo: 'ສະໝ່ຳສະເໝີ: ຄວາມໄວຄົງທີ່; ບໍ່ສະໝ່ຳສະເໝີ: ຄວາມໄວປ່ຽນ.',
        en: 'Uniform: constant speed; non-uniform: speed changes.',
      },
      {
        lo: 'ກຣາຟໄລຍະທາງ-ເວລາ: ເສັ້ນຊື່ = ຄວາມໄວຄົງທີ່, ຄວາມຊັນ = ຄວາມໄວ.',
        en: 'Distance-time graph: a straight line = constant speed, slope = speed.',
      },
      { lo: 'ມວນສານຈຳເພາະ ρ = m ÷ V.', en: 'Density ρ = m ÷ V.' },
    ],
    questions: [
      {
        lo: 'ລົດແລ່ນ 90 km ໃນ 1.5 h ມີຄວາມໄວສະເລ່ຍເທົ່າໃດ?',
        en: 'A car covers 90 km in 1.5 h. What is its average speed? (60 km/h)',
      },
      {
        lo: 'ເປັນຫຍັງຮ່າງກາຍເຮົາພຸ່ງໄປທາງໜ້າ ເມື່ອລົດເບຣກກະທັນຫັນ?',
        en: 'Why do we lurch forward when a bus brakes suddenly? (inertia)',
      },
    ],
    activity: {
      lo: 'ວັດເວລາເດີນ 10 m ໃນຫ້ອງຂອງແຕ່ລະຄົນ ແລ້ວຄິດໄລ່ຄວາມໄວ ແລະ ແຕ້ມກຣາຟ.',
      en: 'Time each student walking 10 m, compute the speed and draw the graph.',
    },
    minutes: 30,
    quiz: [
      {
        id: 'q1',
        q: {
          lo: 'ລົດແລ່ນ 120 m ໃນ 10 s ດ້ວຍຄວາມໄວຄົງທີ່. ຄວາມໄວເທົ່າໃດ?',
          en: 'A car travels 120 m in 10 s at constant speed. What is its speed?',
        },
        options: [
          { lo: '12 m/s', en: '12 m/s' },
          { lo: '1200 m/s', en: '1200 m/s' },
          { lo: '0.08 m/s', en: '0.08 m/s' },
        ],
        answer: 0,
        why: { lo: 'v = s ÷ t = 120 ÷ 10 = 12 m/s.', en: 'v = s ÷ t = 120 ÷ 10 = 12 m/s.' },
      },
      {
        id: 'q2',
        q: {
          lo: 'ກຣາຟໄລຍະທາງ-ເວລາເປັນເສັ້ນຊື່ຜ່ານຈຸດເລີ່ມຕົ້ນ ໝາຍຄວາມວ່າແນວໃດ?',
          en: 'A distance-time graph is a straight line through the origin. What does it mean?',
        },
        options: [
          { lo: 'ວັດຖຸຢຸດຢູ່ກັບທີ່', en: 'The object is at rest' },
          { lo: 'ຄວາມໄວຄົງທີ່', en: 'Constant speed' },
          { lo: 'ຄວາມໄວເພີ່ມຂຶ້ນເລື້ອຍໆ', en: 'Speed keeps increasing' },
        ],
        answer: 1,
        why: {
          lo: 'ເສັ້ນຊື່ ໝາຍຄວາມວ່າໄລຍະທາງເພີ່ມເທົ່າກັນໃນແຕ່ລະວິນາທີ ຄືຄວາມໄວຄົງທີ່.',
          en: 'A straight line means equal distance every second, which is constant speed.',
        },
      },
      {
        id: 'q3',
        q: { lo: '72 km/h ເທົ່າກັບຈັກ m/s?', en: 'How many m/s is 72 km/h?' },
        options: [
          { lo: '20 m/s', en: '20 m/s' },
          { lo: '72 m/s', en: '72 m/s' },
          { lo: '259 m/s', en: '259 m/s' },
        ],
        answer: 0,
        why: { lo: '1 m/s = 3.6 km/h ສະນັ້ນ 72 ÷ 3.6 = 20 m/s.', en: '1 m/s = 3.6 km/h, so 72 ÷ 3.6 = 20 m/s.' },
      },
      {
        id: 'q4',
        q: {
          lo: 'ວັດຖຸມີມວນ 200 g ແລະ ບໍລິມາດ 50 cm³. ມວນສານຈຳເພາະເທົ່າໃດ?',
          en: 'An object has mass 200 g and volume 50 cm³. What is its density?',
        },
        options: [
          { lo: '4 g/cm³', en: '4 g/cm³' },
          { lo: '0.25 g/cm³', en: '0.25 g/cm³' },
          { lo: '250 g/cm³', en: '250 g/cm³' },
        ],
        answer: 0,
        why: { lo: 'ρ = m ÷ V = 200 ÷ 50 = 4 g/cm³.', en: 'ρ = m ÷ V = 200 ÷ 50 = 4 g/cm³.' },
      },
    ],
  },
  ...m1rest,
]
