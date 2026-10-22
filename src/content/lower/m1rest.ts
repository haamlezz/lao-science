import type { LessonDef } from './types'
import { quizItem as qz, ready } from './build'

// M.1 topics 5-9 (Batch B). Source: docs/dev-team/spec.md section 5; curriculum 2010, pp. 29-31.
// Lao text is an AI draft; the whole file is subject to teacher review.
// REVIEW terms: ເປືອກໂລກ (crust), ເນື້ອໂລກ (mantle), ແກນໂລກ (core), ຫີນຜຸພັງ (weathering),
//   ດິນຮ່ວນ (loam), ດິນໜຽວ (clay soil), ການກັດເຊາະ (erosion), ຂັ້ນໄດ (terracing), ນ້ຳໃຕ້ດິນ (groundwater),
//   ມົນລະພິດ (pollution), ເຄື່ອງກອງນ້ຳ (water filter), ໄນໂຕຣແຊນ / ອົກຊີແຊນ (nitrogen / oxygen),
//   ໝອກຄວັນ (haze/smog), ຮູຂຸມຂົນໃບ (stomata), ຄລໍໂລຟິລ (chlorophyll), ການສັງເຄາະດ້ວຍແສງ (photosynthesis),
//   ກລູໂຄສ (glucose), ແຮ່ທາດ (minerals), ໂປຣຕີນ (protein), ວິຕາມິນ (vitamin), ໄອໂອດີນ (iodine),
//   ແປ້ງ (starch/carbohydrate), ອາຫານເປັນພິດ (food poisoning).

export const m1rest: LessonDef[] = [
  ready({
    id: 'm1-05',
    title: ['ໂລກ ແລະ ດິນ', 'Earth and soil'],
    hours: 12,
    field: 'earth',
    minutes: 25,
    summary: [
      'ໂລກມີຫຼາຍຊັ້ນ ແລະ ດິນເກີດຈາກຫີນທີ່ຜຸພັງຊ້າໆ ປົນກັບຊາກພືດຊາກສັດ. ດິນແຕ່ລະຊະນິດມີຄຸນສົມບັດຕ່າງກັນ ແລະ ຕ້ອງອະນຸລັກ.',
      'The Earth has layers, and soil forms from slowly weathered rock mixed with dead plants and animals. Soils differ and must be conserved.',
    ],
    objectives: [
      ['ອະທິບາຍໂຄງສ້າງຂອງໂລກ ແລະ ລັກສະນະຫຼັກ', 'Describe the structure of the Earth'],
      ['ອະທິບາຍການກຳເນີດຂອງດິນ ແລະ ຊະນິດຂອງດິນ', 'Explain how soil forms and its types'],
      ['ສຶກສາລັກສະນະຂອງດິນແຕ່ລະຊະນິດ', 'Investigate properties of each soil type'],
      ['ເຂົ້າໃຈຄວາມສຳຄັນ ແລະ ວິທີອະນຸລັກດິນ', 'Understand why and how to conserve soil'],
    ],
    keyIdeas: [
      [
        'ໂລກມີຊັ້ນ: ເປືອກໂລກ, ເນື້ອໂລກ (mantle), ແກນນອກ, ແກນໃນ.',
        'Layers of the Earth: crust, mantle, outer core, inner core.',
      ],
      [
        'ດິນເກີດຈາກຫີນຜຸພັງຊ້າໆ ປົນກັບຊາກພືດ ແລະ ຊາກສັດ.',
        'Soil forms from slowly weathered rock mixed with decayed plant and animal matter.',
      ],
      [
        'ດິນຊາຍລະບາຍນ້ຳໄວ; ດິນໜຽວເກັບນ້ຳໄດ້ດີ; ດິນຮ່ວນເໝາະກັບການປູກພືດ.',
        'Sandy soil drains fast; clay holds water; loam suits crops.',
      ],
      [
        'ການກັດເຊາະຂອງດິນຫຼຸດລົງໄດ້ດ້ວຍການປູກຕົ້ນໄມ້ ແລະ ເຮັດຂັ້ນໄດ.',
        'Erosion is reduced by planting trees and terracing.',
      ],
    ],
    questions: [
      ['ດິນຊະນິດໃດເໝາະປູກເຂົ້າ ແລະ ເປັນຫຍັງ?', 'Which soil suits rice and why?'],
      ['ເປັນຫຍັງການຕັດໄມ້ເທິງພູ ຈຶ່ງເຮັດໃຫ້ດິນເລື່ອນ?', 'Why does deforestation on hills cause landslides?'],
    ],
    activity: [
      'ເທນ້ຳປະລິມານເທົ່າກັນໃສ່ຊາຍ ແລະ ດິນໜຽວ ໃນຂວດຕັດ ແລ້ວຈັບເວລາທີ່ນ້ຳໄຫຼຜ່ານ.',
      'Pour equal amounts of water through sand and clay in cut bottles and time the drainage.',
    ],
    quiz: [
      qz(
        'q1',
        ['ຊັ້ນໃດຂອງໂລກທີ່ເຮົາອາໄສຢູ່?', 'Which layer of the Earth do we live on?'],
        [
          ['ເປືອກໂລກ', 'The crust'],
          ['ເນື້ອໂລກ', 'The mantle'],
          ['ແກນໃນ', 'The inner core'],
        ],
        0,
        ['ເປືອກໂລກແມ່ນຊັ້ນນອກສຸດ ແລະ ບາງທີ່ສຸດ.', 'The crust is the thin outermost layer.'],
      ),
      qz(
        'q2',
        ['ດິນຊະນິດໃດລະບາຍນ້ຳໄວທີ່ສຸດ?', 'Which soil drains water fastest?'],
        [
          ['ດິນໜຽວ', 'Clay'],
          ['ດິນຊາຍ', 'Sand'],
          ['ດິນຮ່ວນ', 'Loam'],
        ],
        1,
        [
          'ເມັດຊາຍໃຫຍ່ ມີຊ່ອງວ່າງຫຼາຍ ນ້ຳຈຶ່ງໄຫຼຜ່ານໄວ.',
          'Sand grains are large with big gaps, so water passes through quickly.',
        ],
      ),
      qz(
        'q3',
        ['ດິນເກີດຈາກຫຍັງ?', 'What does soil form from?'],
        [
          ['ຫີນຜຸພັງ ປົນກັບຊາກພືດຊາກສັດ', 'Weathered rock mixed with dead plants and animals'],
          ['ນ້ຳຢ່າງດຽວ', 'Water only'],
          ['ອາກາດ', 'Air'],
        ],
        0,
        ['ຂະບວນການນີ້ໃຊ້ເວລາຍາວນານຫຼາຍ.', 'This process takes a very long time.'],
      ),
      qz(
        'q4',
        ['ວິທີໃດຊ່ວຍຫຼຸດການກັດເຊາະດິນເທິງເນີນພູ?', 'Which method reduces soil erosion on a slope?'],
        [
          ['ຕັດຕົ້ນໄມ້ອອກໝົດ', 'Cut all the trees'],
          ['ເຮັດຂັ້ນໄດ ແລະ ປູກຕົ້ນໄມ້', 'Make terraces and plant trees'],
          ['ປ່ອຍໃຫ້ດິນເປົ່າ', 'Leave the soil bare'],
        ],
        1,
        ['ຮາກໄມ້ຍຶດດິນ ແລະ ຂັ້ນໄດຫຼຸດຄວາມໄວຂອງນ້ຳ.', 'Roots hold soil and terraces slow the water.'],
      ),
    ],
  }),
  ready({
    id: 'm1-06',
    title: ['ນ້ຳ', 'Water'],
    hours: 15,
    field: 'earth',
    minutes: 25,
    summary: [
      'ນ້ຳມີຫຼາຍແຫຼ່ງ ແລະ ມີປະໂຫຍດຫຼາຍ ແຕ່ນ້ຳເປື້ອນກໍເຮັດໃຫ້ເກີດພະຍາດ. ເຮົາຕ້ອງເຮັດນ້ຳໃຫ້ສະອາດ ແລະ ຮັກສາແຫຼ່ງນ້ຳ.',
      'Water comes from many sources and is very useful, but dirty water spreads disease. We must clean water and protect its sources.',
    ],
    objectives: [
      ['ບອກຄວາມໝາຍ ແລະ ແຫຼ່ງນ້ຳຕ່າງໆ', 'State the meaning and sources of water'],
      ['ອະທິບາຍປະໂຫຍດ ແລະ ຜົນເສຍຫາຍຂອງນ້ຳ', 'Explain benefits and harms of water'],
      ['ສຶກສາສາເຫດຂອງນ້ຳເປື້ອນ ແລະ ວິທີເຮັດນ້ຳໃຫ້ສະອາດ', 'Study causes of polluted water and ways to clean it'],
      ['ປົກປັກຮັກສາຊັບພະຍາກອນນ້ຳ', 'Protect water resources'],
    ],
    keyIdeas: [
      ['ແຫຼ່ງນ້ຳ: ຝົນ, ແມ່ນ້ຳ, ໜອງ, ນ້ຳໃຕ້ດິນ.', 'Sources: rain, rivers, ponds, groundwater.'],
      ['ມົນລະພິດທາງນ້ຳ: ຂີ້ເຫຍື້ອ, ສານເຄມີ, ນ້ຳເສຍ.', 'Water pollutants: rubbish, chemicals, waste water.'],
      [
        'ການກອງ ເອົາສິ່ງເຈືອປົນທີ່ເຫັນໄດ້ອອກ; ການຕົ້ມ ຂ້າເຊື້ອພະຍາດ.',
        'Filtering removes visible particles; boiling kills germs.',
      ],
      ['ນ້ຳເປື້ອນເຮັດໃຫ້ເກີດພະຍາດ ເຊັ່ນ ຖອກທ້ອງ.', 'Dirty water spreads diseases such as diarrhoea.'],
    ],
    questions: [
      ['ເປັນຫຍັງນ້ຳທີ່ໃສ ຈຶ່ງອາດບໍ່ປອດໄພດື່ມ?', 'Why can clear water still be unsafe to drink?'],
      ['ເຮົາປະຢັດນ້ຳໃນເຮືອນໄດ້ແນວໃດ?', 'How can we save water at home?'],
    ],
    activity: [
      'ເຮັດເຄື່ອງກອງນ້ຳ (ຜ້າ, ຊາຍ, ກ້ອນຫີນນ້ອຍ, ຖ່ານ) ແລະ ປຽບທຽບຄວາມຂຸ່ນກ່ອນ-ຫຼັງ. ຢໍ້າວ່າຕ້ອງຕົ້ມນ້ຳກ່ອນດື່ມ.',
      'Build a filter (cloth, sand, gravel, charcoal) and compare turbidity before and after. Stress that water must be boiled before drinking.',
    ],
    quiz: [
      qz(
        'q1',
        ['ຂໍ້ໃດບໍ່ແມ່ນແຫຼ່ງນ້ຳທຳມະຊາດ?', 'Which is not a natural water source?'],
        [
          ['ແມ່ນ້ຳ', 'River'],
          ['ນ້ຳໃຕ້ດິນ', 'Groundwater'],
          ['ນ້ຳຢູ່ໃນຂວດທີ່ຂາຍ', 'Bottled water from a shop'],
        ],
        2,
        [
          'ນ້ຳຂວດມາຈາກແຫຼ່ງທຳມະຊາດ ແຕ່ຜ່ານການຜະລິດ; ແຫຼ່ງທຳມະຊາດຄືຝົນ, ແມ່ນ້ຳ, ນ້ຳໃຕ້ດິນ.',
          'Bottled water is processed; natural sources are rain, rivers and groundwater.',
        ],
      ),
      qz(
        'q2',
        ['ວິທີໃດຂ້າເຊື້ອພະຍາດໃນນ້ຳດື່ມ?', 'Which method kills germs in drinking water?'],
        [
          ['ກອງດ້ວຍຜ້າ', 'Filtering through cloth'],
          ['ຕົ້ມໃຫ້ເດືອດ', 'Boiling'],
          ['ຕັ້ງໄວ້ໃຫ້ນິ່ງ', 'Letting it stand'],
        ],
        1,
        [
          'ຄວາມຮ້ອນຂ້າເຊື້ອພະຍາດ; ການກອງແຕ່ເອົາສິ່ງເຈືອປົນທີ່ເຫັນໄດ້ອອກ.',
          'Heat kills germs; filtering only removes visible particles.',
        ],
      ),
      qz(
        'q3',
        ['ພະຍາດໃດມັກເກີດຈາກການດື່ມນ້ຳເປື້ອນ?', 'Which disease is often caused by drinking dirty water?'],
        [
          ['ຖອກທ້ອງ', 'Diarrhoea'],
          ['ກະດູກຫັກ', 'Broken bone'],
          ['ສາຍຕາສັ້ນ', 'Short-sightedness'],
        ],
        0,
        ['ເຊື້ອພະຍາດໃນນ້ຳເປື້ອນທຳໃຫ້ເກີດພະຍາດລະບົບຍ່ອຍອາຫານ.', 'Germs in dirty water infect the digestive system.'],
      ),
    ],
  }),
  ready({
    id: 'm1-07',
    title: ['ອາກາດ', 'Air'],
    hours: 12,
    field: 'earth',
    minutes: 25,
    summary: [
      'ອາກາດເປັນສິມປົນຂອງທາດອາຍ ປະກອບດ້ວຍໄນໂຕຣແຊນ ແລະ ອົກຊີແຊນເປັນຫຼັກ. ອາກາດມີມວນສານ ແລະ ຄອບຄອງທີ່; ຄວັນ ແລະ ຝຸ່ນເຮັດໃຫ້ອາກາດເປື້ອນ.',
      'Air is a mixture of gases, mainly nitrogen and oxygen. Air has mass and takes up space; smoke and dust pollute it.',
    ],
    objectives: [
      [
        'ບອກຄວາມໝາຍ, ປະໂຫຍດຂອງອາກາດ ແລະ ຊັ້ນບັນຍາກາດ',
        'State the meaning and benefits of air and the atmosphere layers',
      ],
      ['ບອກສ່ວນປະກອບຂອງອາກາດ', 'State the composition of air'],
      ['ອະທິບາຍສາເຫດຂອງອາກາດເປື້ອນ ແລະ ຜົນເສຍ', 'Explain causes and effects of air pollution'],
      ['ອະທິບາຍວິທີເຮັດໃຫ້ອາກາດສະອາດ', 'Explain how to keep air clean'],
    ],
    keyIdeas: [
      [
        'ອາກາດເປັນສິມປົນ: ໄນໂຕຣແຊນ ≈ 78%, ອົກຊີແຊນ ≈ 21%, ອື່ນໆ ≈ 1%.',
        'Air is a mixture: nitrogen ≈ 78%, oxygen ≈ 21%, others ≈ 1%.',
      ],
      ['ອົກຊີແຊນຈຳເປັນຕໍ່ການຫາຍໃຈ ແລະ ການເຜົາໄໝ້.', 'Oxygen is needed for breathing and burning.'],
      ['ອາກາດມີມວນສານ ແລະ ຄອບຄອງທີ່.', 'Air has mass and takes up space.'],
      [
        'ຄວັນ, ຝຸ່ນ ແລະ ໄອເສຍລົດ ເຮັດໃຫ້ອາກາດເປື້ອນ; ການເຜົາປ່າເຮັດໃຫ້ເກີດໝອກຄວັນ.',
        'Smoke, dust and exhaust pollute air; burning fields causes haze.',
      ],
    ],
    questions: [
      ['ເຮົາຮູ້ໄດ້ແນວໃດວ່າອາກາດຄອບຄອງທີ່?', 'How do we know air takes up space?'],
      ['ຫຼຸດການເຜົາຂີ້ເຫຍື້ອໄດ້ແນວໃດ?', 'How can we reduce burning of rubbish?'],
    ],
    activity: [
      'ຄວ່ຳຈອກເປົ່າລົງໃນນ້ຳ ແລ້ວສັງເກດວ່ານ້ຳບໍ່ເຂົ້າເຕັມຈອກ.',
      'Push an upturned empty cup straight into water and observe that water does not fill it.',
    ],
    quiz: [
      qz(
        'q1',
        ['ທາດອາຍໃດມີຫຼາຍທີ່ສຸດໃນອາກາດ?', 'Which gas is most abundant in air?'],
        [
          ['ອົກຊີແຊນ', 'Oxygen'],
          ['ໄນໂຕຣແຊນ', 'Nitrogen'],
          ['ຄາບອນໄດອອກໄຊ', 'Carbon dioxide'],
        ],
        1,
        ['ໄນໂຕຣແຊນມີປະມານ 78% ຂອງອາກາດ.', 'Nitrogen makes up about 78% of air.'],
      ),
      qz(
        'q2',
        ['ອາກາດທີ່ເຮົາຫາຍໃຈມີອົກຊີແຊນປະມານເທົ່າໃດ?', 'About how much of the air we breathe is oxygen?'],
        [
          ['21%', '21%'],
          ['78%', '78%'],
          ['1%', '1%'],
        ],
        0,
        ['ອົກຊີແຊນປະມານ 21% ຂອງອາກາດ.', 'Oxygen is about 21% of air.'],
      ),
      qz(
        'q3',
        ['ການທົດລອງຈອກຄວ່ຳລົງໃນນ້ຳສະແດງວ່າ?', 'The upturned cup in water shows that?'],
        [
          ['ອາກາດຄອບຄອງທີ່', 'Air takes up space'],
          ['ອາກາດບໍ່ມີຢູ່', 'There is no air'],
          ['ນ້ຳເບົາກວ່າອາກາດ', 'Water is lighter than air'],
        ],
        0,
        ['ອາກາດໃນຈອກກີດກັນບໍ່ໃຫ້ນ້ຳເຂົ້າ.', 'The air in the cup stops water entering.'],
      ),
    ],
  }),
  ready({
    id: 'm1-08',
    title: ['ພືດ', 'Plants'],
    hours: 19,
    field: 'bio',
    minutes: 30,
    sim: 'photosynthesis',
    summary: [
      'ພືດມີຮາກ, ລຳຕົ້ນ, ໃບ ແລະ ດອກ. ໃບສ້າງອາຫານດ້ວຍການສັງເຄາະດ້ວຍແສງ ໂດຍໃຊ້ນ້ຳ, CO₂ ແລະ ແສງ.',
      'Plants have roots, stems, leaves and flowers. Leaves make food by photosynthesis, using water, CO₂ and light.',
    ],
    objectives: [
      [
        'ເຂົ້າໃຈໂຄງສ້າງພື້ນຖານ ແລະ ໜ້າທີ່ຂອງສ່ວນຕ່າງໆຂອງພືດ (ຮາກ, ລຳຕົ້ນ, ໃບ, ດອກ)',
        'Understand the structure and function of plant parts (root, stem, leaf, flower)',
      ],
      [
        'ທົດລອງຢັ້ງຢືນວ່າພືດຕ້ອງການນ້ຳ, CO₂ ແລະ ແສງ ເພື່ອສ້າງອາຫານ',
        'Verify that plants need water, CO₂ and light to make food',
      ],
      ['ອະທິບາຍການສັງເຄາະດ້ວຍແສງ', 'Explain photosynthesis'],
      ['ຈັດປະເພດພືດໂດຍໃຊ້ ໃບ, ລຳ, ແກ່ນ, ດອກ', 'Classify plants using leaves, stem, seeds and flowers'],
    ],
    keyIdeas: [
      [
        'ຮາກດູດນ້ຳ ແລະ ແຮ່ທາດ; ລຳຕົ້ນລຳລຽງ; ໃບສ້າງອາຫານ.',
        'Roots absorb water and minerals; stems transport; leaves make food.',
      ],
      [
        'ການສັງເຄາະດ້ວຍແສງ: ນ້ຳ + CO₂ --(ແສງ, ຄລໍໂລຟິລ)--> ນ້ຳຕານ (ກລູໂຄສ) + O₂.',
        'Photosynthesis: water + CO₂ --(light, chlorophyll)--> glucose + O₂.',
      ],
      ['CO₂ ເຂົ້າທາງຮູຂຸມຂົນຂອງໃບ (stomata).', 'CO₂ enters through the stomata of the leaf.'],
      ['ພືດຕ້ອງການຄລໍໂລຟິລ (ສີຂຽວ) ແລະ ແສງ.', 'Plants need chlorophyll (green) and light.'],
      ['ດອກ → ຜົນ → ແກ່ນ ເປັນການສືບພັນຂອງພືດ.', 'Flower → fruit → seed is plant reproduction.'],
    ],
    questions: [
      [
        'ເປັນຫຍັງຕົ້ນໄມ້ທີ່ຢູ່ໃນບ່ອນມືດ ຈຶ່ງເຫຼືອງ ແລະ ຕາຍ?',
        'Why does a plant kept in the dark turn yellow and die?',
      ],
      ['ເປັນຫຍັງປ່າໄມ້ຈຶ່ງສຳຄັນຕໍ່ອາກາດ?', 'Why are forests important for the air?'],
    ],
    activity: [
      'ວາງຕົ້ນກ້າ 2 ຕົ້ນ ຕົ້ນໜຶ່ງໃນແສງ ອີກຕົ້ນໜຶ່ງໃນບ່ອນມືດ ເປັນເວລາ 1 ອາທິດ ແລ້ວປຽບທຽບ.',
      'Put two seedlings, one in light and one in the dark, for one week and compare them.',
    ],
    quiz: [
      qz(
        'q1',
        ['ສ່ວນໃດຂອງພືດທີ່ສ້າງອາຫານເປັນຫຼັກ?', 'Which plant part mainly makes food?'],
        [
          ['ຮາກ', 'Root'],
          ['ໃບ', 'Leaf'],
          ['ລຳຕົ້ນ', 'Stem'],
        ],
        1,
        ['ໃບມີຄລໍໂລຟິລ ແລະ ຮັບແສງ ຈຶ່ງສັງເຄາະອາຫານໄດ້.', 'Leaves contain chlorophyll and catch light, so they make food.'],
      ),
      qz(
        'q2',
        ['ການສັງເຄາະດ້ວຍແສງ ປ່ອຍທາດອາຍໃດອອກມາ?', 'Which gas does photosynthesis release?'],
        [
          ['ຄາບອນໄດອອກໄຊ', 'Carbon dioxide'],
          ['ອົກຊີແຊນ', 'Oxygen'],
          ['ໄນໂຕຣແຊນ', 'Nitrogen'],
        ],
        1,
        ['ນ້ຳ + CO₂ ໃຫ້ກລູໂຄສ ແລະ O₂.', 'Water + CO₂ gives glucose and O₂.'],
      ),
      qz(
        'q3',
        [
          'ຖ້າແສງນ້ອຍເກີນໄປ ເຖິງວ່າມີ CO₂ ແລະ ນ້ຳພໍ ອັດຕາການສັງເຄາະດ້ວຍແສງຈະເປັນແນວໃດ?',
          'If light is too weak even with plenty of CO₂ and water, what happens to the rate?',
        ],
        [
          ['ຕ່ຳ ເພາະແສງເປັນປັດໄຈຈຳກັດ', 'It is low because light is the limiting factor'],
          ['ສູງສຸດ', 'It is at maximum'],
          ['ບໍ່ປ່ຽນແປງ', 'It does not change'],
        ],
        0,
        [
          'ອັດຕາຖືກຈຳກັດດ້ວຍປັດໄຈທີ່ມີນ້ອຍທີ່ສຸດ.',
          'The rate is limited by the factor in shortest supply.',
        ],
      ),
      qz(
        'q4',
        ['ໃບຂາວ (ບໍ່ມີຄລໍໂລຟິລ) ສັງເຄາະດ້ວຍແສງໄດ້ບໍ?', 'Can a white leaf (no chlorophyll) photosynthesise?'],
        [
          ['ໄດ້ ດີກວ່າໃບຂຽວ', 'Yes, better than a green leaf'],
          ['ບໍ່ໄດ້ ເພາະບໍ່ມີຄລໍໂລຟິລ', 'No, there is no chlorophyll'],
          ['ໄດ້ ຖ້າມີນ້ຳຫຼາຍ', 'Yes, if there is a lot of water'],
        ],
        1,
        ['ຄລໍໂລຟິລຮັບແສງ ເພື່ອສ້າງອາຫານ.', 'Chlorophyll absorbs the light needed to make food.'],
      ),
    ],
  }),
  ready({
    id: 'm1-09',
    title: ['ອາຫານ', 'Food and nutrition'],
    hours: 18,
    field: 'bio',
    minutes: 30,
    summary: [
      'ອາຫານແບ່ງເປັນຫຼາຍໝູ່ ແຕ່ລະໝູ່ມີໜ້າທີ່ຕ່າງກັນ. ການກິນຄົບໝູ່ໃນປະລິມານພໍດີ ຊ່ວຍໃຫ້ຮ່າງກາຍແຂງແຮງ ແລະ ຫຼີກເວັ້ນພະຍາດຈາກການຂາດ ຫຼື ເກີນ.',
      'Food falls into groups with different jobs. Eating all groups in suitable amounts keeps the body healthy and avoids deficiency and excess diseases.',
    ],
    objectives: [
      ['ບອກຄວາມໝາຍຂອງອາຫານ ແລະ ໂພຊະນາການ', 'Define food and nutrition'],
      ['ຈັດປະເພດອາຫານ ແລະ ຍົກຕົວຢ່າງ', 'Classify food and give examples'],
      ['ທົດສອບແປ້ງ ແລະ ວິຕາມິນ C ໃນອາຫານ', 'Test foods for starch and vitamin C'],
      [
        'ອະທິບາຍການກິນອາຫານຖືກຫຼັກໂພຊະນາການ ແລະ ພະຍາດຈາກການຂາດ ຫຼື ເກີນ',
        'Explain a balanced diet and diseases from deficiency or excess',
      ],
    ],
    keyIdeas: [
      [
        'ໝູ່ອາຫານ: ແປ້ງ (ໃຫ້ພະລັງງານ), ໂປຣຕີນ (ສ້າງຮ່າງກາຍ), ໄຂມັນ, ວິຕາມິນ ແລະ ແຮ່ທາດ, ນ້ຳ.',
        'Groups: carbohydrate (energy), protein (growth), fat, vitamins and minerals, water.',
      ],
      ['ໄອໂອດີນປ່ຽນເປັນສີຟ້າເຂັ້ມ/ດຳ ເມື່ອພົບແປ້ງ.', 'Iodine turns blue-black when it meets starch.'],
      ['ອາຫານຄົບ 5 ໝູ່ ໃນປະລິມານພໍດີ.', 'A balanced diet has all groups in suitable amounts.'],
      [
        'ອາຫານເປັນພິດ ເກີດຈາກອາຫານບູດ, ເຊື້ອພະຍາດ ຫຼື ສານເຄມີ.',
        'Food poisoning comes from spoiled food, germs or chemicals.',
      ],
    ],
    questions: [
      ['ເຂົ້າໜຽວ, ປາ ແລະ ຜັກ ໃຫ້ສານອາຫານຫຍັງ?', 'What nutrients do sticky rice, fish and vegetables give?'],
      ['ຈະເກັບອາຫານບໍ່ໃຫ້ບູດໄດ້ແນວໃດ?', 'How can food be kept from spoiling?'],
    ],
    activity: [
      'ວາງແຜນອາຫານທ່ຽງຄົບໝູ່ ຈາກອາຫານລາວ ແລະ ທົດສອບແປ້ງດ້ວຍໄອໂອດີນ (ຄູເປັນຜູ້ເຮັດ).',
      'Plan a balanced Lao lunch and run a teacher-led iodine test for starch.',
    ],
    quiz: [
      qz(
        'q1',
        ['ອາຫານໝູ່ໃດໃຫ້ພະລັງງານຫຼັກແກ່ຮ່າງກາຍ?', 'Which food group mainly gives energy?'],
        [
          ['ແປ້ງ', 'Carbohydrate'],
          ['ແຮ່ທາດ', 'Minerals'],
          ['ນ້ຳ', 'Water'],
        ],
        0,
        ['ແປ້ງ ເຊັ່ນ ເຂົ້າ ເປັນແຫຼ່ງພະລັງງານຫຼັກ.', 'Starchy food such as rice is the main energy source.'],
      ),
      qz(
        'q2',
        ['ໄອໂອດີນປ່ຽນເປັນສີຫຍັງ ເມື່ອພົບແປ້ງ?', 'What colour does iodine turn with starch?'],
        [
          ['ສີແດງ', 'Red'],
          ['ສີຟ້າເຂັ້ມ ຫຼື ດຳ', 'Blue-black'],
          ['ບໍ່ປ່ຽນສີ', 'No change'],
        ],
        1,
        ['ສີຟ້າເຂັ້ມ/ດຳ ເປັນຕົວບົ່ງບອກວ່າມີແປ້ງ.', 'Blue-black shows that starch is present.'],
      ),
      qz(
        'q3',
        ['ໂປຣຕີນມີໜ້າທີ່ຫຼັກຫຍັງ?', 'What is the main job of protein?'],
        [
          ['ສ້າງ ແລະ ຊ່ອມແປງສ່ວນຕ່າງໆຂອງຮ່າງກາຍ', 'Building and repairing the body'],
          ['ເກັບຄວາມຮ້ອນເທົ່ານັ້ນ', 'Only storing heat'],
          ['ຮັບແສງ', 'Absorbing light'],
        ],
        0,
        ['ປາ, ໄຂ່ ແລະ ຖົ່ວ ເປັນແຫຼ່ງໂປຣຕີນ.', 'Fish, eggs and beans are protein sources.'],
      ),
      qz(
        'q4',
        ['ວິທີໃດຫຼຸດຄວາມສ່ຽງອາຫານເປັນພິດ?', 'Which habit reduces the risk of food poisoning?'],
        [
          ['ກິນອາຫານທີ່ວາງໄວ້ຫຼາຍວັນ', 'Eating food left out for days'],
          ['ເກັບອາຫານໃຫ້ເຢັນ ແລະ ປຸງໃຫ້ສຸກ', 'Keeping food cool and cooking it well'],
          ['ບໍ່ລ້າງມື', 'Not washing hands'],
        ],
        1,
        ['ຄວາມເຢັນຊ້າການເຕີບໃຫຍ່ຂອງເຊື້ອ ແລະ ຄວາມຮ້ອນຂ້າເຊື້ອ.', 'Cold slows germs and heat kills them.'],
      ),
    ],
  }),
]
