import type { LessonDef } from './types'
import { m2Early, m2Late } from './m2rest'

// Natural science M.2 (Grade 7), lower-secondary curriculum 2010, pp. 32-35. 12 topics, 132 h.
// m2-04 / m2-05 are migrated verbatim from the former src/content/m2.ts (ids were m2-force / m2-pressure).
// Lao text is an AI draft; the whole file is subject to teacher review.
// REVIEW terms: ແຮງລວມ (resultant force), ແຮງໂນ້ມຖ່ວງ (gravity), ຄວາມເລັ່ງ (acceleration),
//   ຄວາມໜາແໜ້ນ (density), ນິວຕັນ (newton), ປາສຄາ (pascal), ເນື້ອທີ່ຖືກກົດ (area pressed),
//   ສົມດຸນ (balanced), ແຮງກົດ (pressing force).

export const m2: LessonDef[] = [
  ...m2Early,
  {
    id: 'm2-04',
    grade: 'm2',
    order: 4,
    title: { lo: 'ແຮງ', en: 'Force' },
    hours: 17,
    field: 'phys',
    status: 'ready',
    sim: 'force',
    color: '#ff8a65',
    summary: {
      lo: 'ແຮງຄືການດຶງ ຫຼື ການຍູ້ ທີ່ເຮັດໃຫ້ວັດຖຸປ່ຽນການເຄື່ອນທີ່ ຫຼື ປ່ຽນຮູບຮ່າງ. ເມື່ອມີຫຼາຍແຮງ ໃຫ້ສັງລວມເປັນແຮງລວມ.',
      en: 'A force is a push or a pull that can change how an object moves or its shape. Several forces combine into one resultant force.',
    },
    objectives: [
      {
        lo: 'ຍົກຕົວຢ່າງສະແດງໃຫ້ເຫັນວ່າ ມີແຮງກະທຳຕໍ່ວັດຖຸ',
        en: 'Give examples showing that forces act on objects',
      },
      { lo: 'ແທກ, ອ່ານຄ່າ ແລະ ສະແດງແຮງ', en: 'Measure, read and represent forces' },
      {
        lo: 'ອະທິບາຍຄວາມແຕກຕ່າງລະຫວ່າງ ມວນສານ ແລະ ນ້ຳໜັກ',
        en: 'Explain the difference between mass and weight',
      },
      {
        lo: 'ສັງລວມແຮງທີ່ຢູ່ໃນລວງດຽວກັນ ທັງທິດດຽວກັນ ແລະ ທິດກົງກັນຂ້າມ',
        en: 'Combine forces on the same line, in the same and in opposite directions',
      },
    ],
    keyIdeas: [
      {
        lo: 'ແຮງມີຂະໜາດ (ໜ່ວຍ N) ແລະ ທິດທາງ — ສະແດງດ້ວຍລູກສອນ.',
        en: 'A force has a size (unit: newton, N) and a direction — drawn as an arrow.',
      },
      {
        lo: 'ສອງແຮງທິດດຽວກັນ: ແຮງລວມ = F₁ + F₂, ໄປທິດນັ້ນ.',
        en: 'Two forces in the same direction: resultant = F₁ + F₂, in that direction.',
      },
      {
        lo: 'ສອງແຮງທິດກົງກັນຂ້າມ: ແຮງລວມ = ແຮງໃຫຍ່ − ແຮງນ້ອຍ, ໄປທິດຂອງແຮງໃຫຍ່. ຖ້າເທົ່າກັນ ແຮງລວມ = 0 (ສົມດຸນ).',
        en: 'Two forces in opposite directions: resultant = larger − smaller, towards the larger. If equal, resultant = 0 (balanced).',
      },
      {
        lo: 'ມວນສານ (kg) ບໍ່ປ່ຽນຕາມສະຖານທີ່. ນ້ຳໜັກ (N) = ມວນສານ × ແຮງໂນ້ມຖ່ວງ ແລະ ປ່ຽນຕາມສະຖານທີ່.',
        en: 'Mass (kg) does not change with place. Weight (N) = mass × gravity and does change with place.',
      },
    ],
    questions: [
      {
        lo: 'ເມື່ອແຮງສອງດ້ານເທົ່າກັນ ກ່ອງຈະເຄື່ອນທີ່ບໍ່? ຖ້າກ່ອງກຳລັງເຄື່ອນຢູ່ແລ້ວ ເກີດຫຍັງຂຶ້ນ?',
        en: 'When the two forces are equal, does the crate move? What if it was already moving?',
      },
      {
        lo: 'ນັກບິນອະວະກາດ 60 kg ມີນ້ຳໜັກເທົ່າໃດເທິງໂລກ ແລະ ເທິງດວງຈັນ? ມວນສານປ່ຽນບໍ?',
        en: 'What does a 60 kg astronaut weigh on Earth and on the Moon? Does the mass change?',
      },
    ],
    activity: {
      lo: 'ໃຫ້ນັກຮຽນສອງຝ່າຍດຶງເຊືອກ ແລ້ວແຕ້ມລູກສອນແຮງທັງສອງ ແລະ ແຮງລວມ. ປຽບທຽບກັບຜົນຈາກເວັບ.',
      en: 'Have two teams pull a rope, then draw both force arrows and the resultant. Compare with the simulation.',
    },
    minutes: 25,
    quiz: [
      {
        id: 'q1',
        q: {
          lo: 'ແຮງ 30 N ໄປທາງຂວາ ແລະ 20 N ໄປທາງຊ້າຍ ກະທຳຕໍ່ກ່ອງ. ແຮງລວມເທົ່າໃດ?',
          en: 'A 30 N force acts to the right and 20 N to the left on a crate. What is the resultant?',
        },
        options: [
          { lo: '10 N ໄປທາງຂວາ', en: '10 N to the right' },
          { lo: '50 N ໄປທາງຂວາ', en: '50 N to the right' },
          { lo: '10 N ໄປທາງຊ້າຍ', en: '10 N to the left' },
        ],
        answer: 0,
        why: {
          lo: 'ທິດກົງກັນຂ້າມ: 30 − 20 = 10 N ໄປທິດຂອງແຮງໃຫຍ່ (ຂວາ).',
          en: 'Opposite directions: 30 − 20 = 10 N towards the larger force (right).',
        },
      },
      {
        id: 'q2',
        q: {
          lo: 'ນັກບິນອະວະກາດ 60 kg ໄປດວງຈັນ. ມວນສານປ່ຽນບໍ?',
          en: 'A 60 kg astronaut goes to the Moon. Does the mass change?',
        },
        options: [
          { lo: 'ບໍ່ປ່ຽນ ຍັງເປັນ 60 kg', en: 'No, it is still 60 kg' },
          { lo: 'ນ້ອຍລົງ', en: 'It gets smaller' },
          { lo: 'ໃຫຍ່ຂຶ້ນ', en: 'It gets larger' },
        ],
        answer: 0,
        why: {
          lo: 'ມວນສານບໍ່ປ່ຽນຕາມສະຖານທີ່ ແຕ່ນ້ຳໜັກປ່ຽນ.',
          en: 'Mass does not depend on place; only the weight changes.',
        },
      },
      {
        id: 'q3',
        q: {
          lo: 'ມວນສານ 5 kg ມີນ້ຳໜັກເທົ່າໃດເທິງໂລກ (g = 9.8 N/kg)?',
          en: 'What is the weight of a 5 kg mass on Earth (g = 9.8 N/kg)?',
        },
        options: [
          { lo: '49 N', en: '49 N' },
          { lo: '5 N', en: '5 N' },
          { lo: '0.51 N', en: '0.51 N' },
        ],
        answer: 0,
        why: { lo: 'ນ້ຳໜັກ = 5 × 9.8 = 49 N.', en: 'Weight = 5 × 9.8 = 49 N.' },
      },
    ],
  },
  {
    id: 'm2-05',
    grade: 'm2',
    order: 5,
    title: { lo: 'ຄວາມດັນ', en: 'Pressure' },
    hours: 15,
    field: 'phys',
    status: 'ready',
    sim: 'pressure',
    color: '#4db6ac',
    summary: {
      lo: 'ຄວາມດັນຄືແຮງກົດຕໍ່ໜຶ່ງໜ່ວຍເນື້ອທີ່: P = F ÷ A. ໃນຂອງແຫຼວ ຄວາມດັນເພີ່ມຂຶ້ນຕາມລະດັບເລິກ.',
      en: 'Pressure is force per unit area: P = F ÷ A. In a liquid, pressure increases with depth.',
    },
    objectives: [
      {
        lo: 'ບອກຄວາມໝາຍຂອງ ຄວາມດັນ, ແຮງກົດ ແລະ ເນື້ອທີ່ຖືກກົດ',
        en: 'State the meaning of pressure, pressing force and area pressed',
      },
      {
        lo: 'ທົດລອງຢັ້ງຢືນວ່າ ຄວາມດັນຂຶ້ນກັບແຮງກົດ ແລະ ເນື້ອທີ່ຖືກກົດ',
        en: 'Verify by experiment that pressure depends on force and area',
      },
      {
        lo: 'ຢັ້ງຢືນວ່າ ຄວາມດັນໃນຂອງແຫຼວເພີ່ມຂຶ້ນຕາມລະດັບເລິກ',
        en: 'Verify that pressure in a liquid increases with depth',
      },
      { lo: 'ຄິດໄລ່ຄວາມດັນ, ແຮງກົດ ແລະ ເນື້ອທີ່', en: 'Calculate pressure, force and area' },
    ],
    keyIdeas: [
      {
        lo: 'ແຮງກົດເທົ່າກັນ ແຕ່ເນື້ອທີ່ນ້ອຍກວ່າ → ຄວາມດັນຫຼາຍກວ່າ (ກ້ອນຕັ້ງຈົມເລິກກວ່າກ້ອນນອນ).',
        en: 'Same force on a smaller area → greater pressure (a standing block sinks deeper than a lying one).',
      },
      { lo: 'ໜ່ວຍ: Pa = N ຕໍ່ m².', en: 'Unit: pascal (Pa) = N per m².' },
      {
        lo: 'ໃນຂອງແຫຼວ: P = ρ × g × h — ເລິກຂຶ້ນ ຄວາມດັນເພີ່ມ ແລະ ກົດທຸກທິດທາງເທົ່າກັນ.',
        en: 'In a liquid: P = ρ × g × h — deeper means more pressure, equal in every direction.',
      },
    ],
    questions: [
      { lo: 'ເປັນຫຍັງມີດຄົມຈຶ່ງຕັດງ່າຍກວ່າມີດທື່?', en: 'Why does a sharp knife cut more easily than a blunt one?' },
      { lo: 'ເປັນຫຍັງຝາຍເຂື່ອນຈຶ່ງໜາຢູ່ທາງລຸ່ມ?', en: 'Why is the bottom of a dam wall thicker?' },
    ],
    activity: {
      lo: 'ວາງກ້ອນດິນເຜົາ ຫຼື ກ້ອນຢາງລົບເທິງຊາຍ ດ້ວຍດ້ານໃຫຍ່ ແລະ ດ້ານນ້ອຍ ແລ້ວວັດຄວາມເລິກທີ່ຈົມ.',
      en: 'Place a clay or rubber block on sand on its large and small faces, then measure how deep it sinks.',
    },
    minutes: 25,
    quiz: [
      {
        id: 'q1',
        q: {
          lo: 'ແຮງກົດ 60 N ກະທຳຕໍ່ເນື້ອທີ່ 0.02 m². ຄວາມດັນເທົ່າໃດ?',
          en: 'A force of 60 N presses on an area of 0.02 m². What is the pressure?',
        },
        options: [
          { lo: '3000 Pa', en: '3000 Pa' },
          { lo: '1.2 Pa', en: '1.2 Pa' },
          { lo: '0.0003 Pa', en: '0.0003 Pa' },
        ],
        answer: 0,
        why: { lo: 'P = F ÷ A = 60 ÷ 0.02 = 3000 Pa.', en: 'P = F ÷ A = 60 ÷ 0.02 = 3000 Pa.' },
      },
      {
        id: 'q2',
        q: {
          lo: 'ແຮງກົດເທົ່າກັນ ແຕ່ເນື້ອທີ່ຖືກກົດນ້ອຍລົງ. ຄວາມດັນຈະເປັນແນວໃດ?',
          en: 'The same force acts on a smaller area. What happens to the pressure?',
        },
        options: [
          { lo: 'ເພີ່ມຂຶ້ນ', en: 'It increases' },
          { lo: 'ຫຼຸດລົງ', en: 'It decreases' },
          { lo: 'ບໍ່ປ່ຽນ', en: 'It stays the same' },
        ],
        answer: 0,
        why: {
          lo: 'P = F ÷ A: ເມື່ອ A ນ້ອຍລົງ P ຫຼາຍຂຶ້ນ.',
          en: 'P = F ÷ A: when A gets smaller, P gets larger.',
        },
      },
      {
        id: 'q3',
        q: {
          lo: 'ຄວາມດັນໃນນ້ຳເປັນແນວໃດເມື່ອລົງເລິກຂຶ້ນ?',
          en: 'How does the pressure in water change as you go deeper?',
        },
        options: [
          { lo: 'ເພີ່ມຂຶ້ນຕາມລະດັບເລິກ', en: 'It increases with depth' },
          { lo: 'ຫຼຸດລົງຕາມລະດັບເລິກ', en: 'It decreases with depth' },
          { lo: 'ເທົ່າເກົ່າທຸກລະດັບ', en: 'It is the same at all depths' },
        ],
        answer: 0,
        why: { lo: 'P = ρ × g × h ເພີ່ມຕາມ h.', en: 'P = ρ × g × h grows with h.' },
      },
    ],
  },
  ...m2Late,
]
