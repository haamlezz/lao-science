import { quizItem, ready } from '../lower/build'
import type { LessonDef } from '../lower/types'

// Biology M.5 (Grade 11), upper-secondary curriculum 2011. 6 topics, 68 h. All ready.
// Lao text is an AI draft; the whole file is subject to teacher review. Scientist and scientific names stay in Latin letters.
// Topics V and VI (invertebrates, vertebrates) share a 20 h cell in the curriculum, split 10 + 10 (assumption A-2).
// REVIEW terms: ກ້ອງຈຸລະທັດ (microscope), ກຳລັງຂະຫຍາຍ (magnification), ໂຄໂມໂຊມ, ອໍແກນແນລ (organelle),
//   ນິວເຄຼຍ (nucleus), ໄມໂຕຄອນເດຣຍ (mitochondrion), ໄຣໂບໂຊມ (ribosome), ເອັນໂດພລາສມິກເຣຕິກູລຳ (ER),
//   ກອນຈິບອດີ (Golgi), ຄລໍໂຣພລາສ (chloroplast), ວາກູໂອ (vacuole), ຜະໜັງຈຸລັງ (cell wall), ເຍື່ອຫຸ້ມຈຸລັງ (membrane),
//   ໂປຣການຣິອິດ (prokaryote), ອອສໂມຊິສ (osmosis), ການແຜ່ກະຈາຍ (diffusion), ເນື້ອເຍື່ອ (tissue),
//   ຝິລຳ / ວົງສ໌ / ສະກຸນ (phylum / family / genus), ໂມເນຣາ, ໂປຣຕິສຕາ, ເຫັດ-ຣາ (Monera, Protista, Fungi),
//   ປາກໃບ (stomata), ຂົນຮາກ (root hair), ການຜະສົມເກສອນ (pollination), ອາດຣໂທປອດ (arthropod), ເອກິໂນເດີມ (echinoderm),
//   ພໍຣິເຟຣາ, ໄນດາເຣຍ (Porifera, Cnidaria), ສັດເລືອຄານ (reptile), ສັດສະເໝີນ້ຳບົກ (amphibian), ການປ່ຽນຮູບຮ່າງ (metamorphosis).

export const b5: LessonDef[] = [
  ready({
    id: 'b5-01',
    title: ['ຄວາມຮູ້ພື້ນຖານກ່ຽວກັບຊີວະວິທະຍາ', 'Basic knowledge of biology'],
    hours: 7,
    field: 'bio',
    minutes: 25,
    summary: [
      'ຊີວະວິທະຍາແມ່ນວິທະຍາສາດທີ່ສຶກສາສິ່ງທີ່ມີຊີວິດ ດ້ວຍການສັງເກດ, ການທົດລອງ ແລະ ການສະຫຼຸບຢ່າງເປັນລະບົບ.',
      'Biology is the science of living things, studied by observation, experiment and systematic conclusion.',
    ],
    objectives: [
      ['ອະທິບາຍຄວາມໝາຍຂອງຊີວະວິທະຍາ ແລະ ວິທີການສຶກສາສິ່ງທີ່ມີຊີວິດ', 'Explain what biology is and how living things are studied'],
      ['ບອກຄຸນລັກສະນະຂອງສິ່ງທີ່ມີຊີວິດ', 'State the characteristics of living things'],
      ['ໃຊ້ກ້ອງຈຸລະທັດແບບງ່າຍ ສັງເກດຈຸລັງ', 'Use a simple microscope to observe cells'],
    ],
    keyIdeas: [
      ['ວິທີການ: ສັງເກດ, ຕັ້ງສົມມຸດຕິຖານ, ທົດລອງ, ເກັບຂໍ້ມູນ, ສະຫຼຸບ', 'Method: observe, hypothesise, experiment, collect data, conclude'],
      ['ລັກສະນະ: ປະກອບດ້ວຍຈຸລັງ, ສືບພັນ, ເຕີບໃຫຍ່, ຕ້ອງການພະລັງງານ, ຕອບສະໜອງ, ປັບສົມດຸນ', 'Traits: made of cells, reproduce, grow, need energy, respond, keep balance'],
      ['ກຳລັງຂະຫຍາຍ = ຂະໜາດຂອງພາບ ÷ ຂະໜາດຈິງ (ເຊັ່ນ ×400)', 'Magnification = image size ÷ actual size (e.g. ×400)'],
      ['ຊີວະວິທະຍາເຊື່ອມກັບການແພດ, ກະສິກຳ ແລະ ສິ່ງແວດລ້ອມ', 'Biology links to medicine, agriculture and the environment'],
    ],
    questions: [
      ['ໄຟ ແລະ ລົດ ເຄື່ອນທີ່ໄດ້ ແລະ ຕ້ອງການພະລັງງານ ແຕ່ເປັນສິ່ງມີຊີວິດບໍ? ເພາະຫຍັງ?', 'Fire and cars move and use energy; are they alive? Why not?'],
      ['ຈະທົດລອງແນວໃດ ເພື່ອເບິ່ງວ່າເມັດຖົ່ວງອກໄວຂຶ້ນເມື່ອອຸ່ນ?', 'How would you test whether beans germinate faster when warm?'],
    ],
    activity: [
      'ເບິ່ງຈຸລັງເຍື່ອຫົວຜັກບົ່ວ ຫຼື ຈຸລັງໃບ Elodea ດ້ວຍກ້ອງຈຸລະທັດ ແລ້ວແຕ້ມສິ່ງທີ່ເຫັນ.',
      'Observe onion-skin cells or Elodea leaf cells under a microscope and draw what you see.',
    ],
    quiz: [
      quizItem('q1', ['ຂັ້ນຕອນໃດເກີດກ່ອນໃນວິທີການທາງວິທະຍາສາດ?', 'Which step comes first in the scientific method?'],
        [['ສັງເກດ', 'Observe'], ['ສະຫຼຸບ', 'Conclude'], ['ເກັບຂໍ້ມູນ', 'Collect data']], 0,
        ['ເລີ່ມດ້ວຍການສັງເກດ ຈຶ່ງເກີດຄຳຖາມ ແລະ ສົມມຸດຕິຖານ.', 'Observation comes first and leads to questions and hypotheses.']),
      quizItem('q2', ['ຂໍ້ໃດບໍ່ແມ່ນລັກສະນະຂອງສິ່ງທີ່ມີຊີວິດ?', 'Which is NOT a characteristic of living things?'],
        [['ປະກອບດ້ວຍຈຸລັງ', 'Made of cells'], ['ສືບພັນໄດ້', 'Can reproduce'], ['ເຄື່ອນທີ່ໄດ້ຢ່າງດຽວ', 'Can merely move']], 2,
        ['ການເຄື່ອນທີ່ຢ່າງດຽວບໍ່ພໍ; ລົດ ແລະ ໄຟກໍເຄື່ອນທີ່ ແຕ່ບໍ່ມີຊີວິດ.', 'Movement alone is not enough; cars and fire move but are not alive.']),
      quizItem('q3', ['ກ້ອງຈຸລະທັດ ຂະຫຍາຍພາບຈາກ 0.1 mm ເປັນ 40 mm. ກຳລັງຂະຫຍາຍເທົ່າໃດ?', 'A microscope enlarges an object of 0.1 mm to an image of 40 mm. What is the magnification?'],
        [['×40', '×40'], ['×400', '×400'], ['×4000', '×4000']], 1,
        ['40 ÷ 0.1 = 400.', '40 ÷ 0.1 = 400.']),
    ],
  }),

  ready({
    id: 'b5-02',
    title: ['ຮູບການຈັດຕັ້ງຂອງສິ່ງທີ່ມີຊີວິດ', 'Organisation of living things: the cell'],
    hours: 16,
    field: 'bio',
    minutes: 35,
    sim: 'cell',
    summary: [
      'ຈຸລັງແມ່ນໜ່ວຍພື້ນຖານຂອງຊີວິດ; ອໍແກນແນລແຕ່ລະຊະນິດມີໜ້າທີ່ສະເພາະ ແລະ ທາດຜ່ານເຍື່ອຫຸ້ມຈຸລັງດ້ວຍການແຜ່ກະຈາຍ ແລະ ອອສໂມຊິສ.',
      'The cell is the basic unit of life; each organelle has its own function and substances cross the membrane by diffusion and osmosis.',
    ],
    objectives: [
      ['ອະທິບາຍໂຄງສ້າງ ແລະ ໜ້າທີ່ຂອງອໍແກນແນລໃນຈຸລັງ', 'Explain the structure and function of cell organelles'],
      ['ປຽບທຽບຈຸລັງພືດ, ຈຸລັງສັດ ແລະ ໂປຣການຣິອິດ', 'Compare plant cells, animal cells and prokaryotes'],
      ['ອະທິບາຍການເຄື່ອນທີ່ຂອງທາດຜ່ານເຍື່ອ (ການແຜ່ກະຈາຍ, ອອສໂມຊິສ)', 'Explain movement of substances across the membrane (diffusion, osmosis)'],
      ['ລຽງລຳດັບ ຈຸລັງ → ເນື້ອເຍື່ອ → ອະໄວຍະວະ → ລະບົບ → ສິ່ງມີຊີວິດ', 'Order cell → tissue → organ → system → organism'],
    ],
    keyIdeas: [
      ['ນິວເຄຼຍເກັບ DNA; ໄມໂຕຄອນເດຣຍຜະລິດພະລັງງານ (ATP); ໄຣໂບໂຊມສ້າງໂປຣຕີນ', 'The nucleus holds DNA; mitochondria make energy (ATP); ribosomes build protein'],
      ['ຈຸລັງພືດມີຜະໜັງຈຸລັງ, ຄລໍໂຣພລາສ ແລະ ວາກູໂອໃຫຍ່ ແຕ່ຈຸລັງສັດບໍ່ມີ', 'Plant cells have a cell wall, chloroplasts and a large vacuole; animal cells do not'],
      ['ໂປຣການຣິອິດ (ແບັກທີເຣຍ) ບໍ່ມີນິວເຄຼຍທີ່ມີເຍື່ອຫຸ້ມ; DNA ຢູ່ໃນບໍລິເວນນິວຄລີອອຍ', 'Prokaryotes (bacteria) have no membrane-bound nucleus; the DNA lies in a nucleoid'],
      ['ອອສໂມຊິສ: ນ້ຳຜ່ານເຍື່ອໄປຫາດ້ານທີ່ມີທາດລະລາຍເຂັ້ມຂຸ້ນກວ່າ', 'Osmosis: water crosses the membrane toward the more concentrated side'],
    ],
    questions: [
      ['ເປັນຫຍັງຈຸລັງກ້າມເນື້ອຈຶ່ງມີໄມໂຕຄອນເດຣຍຫຼາຍ?', 'Why do muscle cells have many mitochondria?'],
      ['ເປັນຫຍັງຜັກທີ່ແຊ່ໃນນ້ຳເກືອເຂັ້ມ ຈຶ່ງເຫຍ່ວ?', 'Why does a vegetable wilt in strong salt water?'],
    ],
    activity: [
      'ແຊ່ມັນຝລັ່ງຫຼັ່ນ ໃນນ້ຳເປົ່າ ແລະ ນ້ຳເກືອເຂັ້ມ 15 ນາທີ ແລ້ວປຽບທຽບຄວາມແຂງ.',
      'Soak potato strips in plain water and strong salt water for 15 minutes and compare firmness.',
    ],
    quiz: [
      quizItem('q1', ['ອໍແກນແນລໃດຜະລິດພະລັງງານ (ATP) ໃຫ້ຈຸລັງ?', 'Which organelle makes energy (ATP) for the cell?'],
        [['ໄມໂຕຄອນເດຣຍ', 'Mitochondrion'], ['ໄຣໂບໂຊມ', 'Ribosome'], ['ກອນຈິບອດີ', 'Golgi apparatus']], 0,
        ['ໄມໂຕຄອນເດຣຍເປັນບ່ອນຫາຍໃຈລະດັບຈຸລັງ.', 'Mitochondria carry out cellular respiration.']),
      quizItem('q2', ['ໂຄງສ້າງໃດມີໃນຈຸລັງພືດ ແຕ່ບໍ່ມີໃນຈຸລັງສັດ?', 'Which structure is in plant cells but not animal cells?'],
        [['ນິວເຄຼຍ', 'Nucleus'], ['ຄລໍໂຣພລາສ', 'Chloroplast'], ['ໄຣໂບໂຊມ', 'Ribosome']], 1,
        ['ຄລໍໂຣພລາສ (ພ້ອມຜະໜັງຈຸລັງ ແລະ ວາກູໂອໃຫຍ່) ມີສະເພາະຈຸລັງພືດ.', 'Chloroplasts (with the wall and large vacuole) are only in plant cells.']),
      quizItem('q3', ['ຈຸລັງເມັດເລືອດແດງ ຢູ່ໃນນ້ຳບໍລິສຸດ ຈະເປັນແນວໃດ?', 'What happens to a red blood cell in pure water?'],
        [['ຫົດ', 'It shrinks'], ['ບວມ ແລະ ອາດແຕກ', 'It swells and may burst'], ['ບໍ່ປ່ຽນແປງ', 'No change']], 1,
        ['ນ້ຳເຂົ້າຈຸລັງ ເພາະພາຍໃນເຂັ້ມຂຸ້ນກວ່າ ແລະ ຈຸລັງສັດບໍ່ມີຜະໜັງຈຸລັງ.', 'Water enters because the inside is more concentrated and an animal cell has no wall.']),
      quizItem('q4', ['ແບັກທີເຣຍຕ່າງຈາກຈຸລັງສັດແນວໃດ?', 'How does a bacterium differ from an animal cell?'],
        [['ບໍ່ມີ DNA', 'It has no DNA'], ['ບໍ່ມີນິວເຄຼຍທີ່ມີເຍື່ອຫຸ້ມ', 'It has no membrane-bound nucleus'], ['ບໍ່ມີໄຣໂບໂຊມ', 'It has no ribosomes']], 1,
        ['ແບັກທີເຣຍມີ DNA ແລະ ໄຣໂບໂຊມ ແຕ່ DNA ບໍ່ມີເຍື່ອຫຸ້ມ.', 'Bacteria have DNA and ribosomes, but the DNA has no membrane around it.']),
    ],
  }),

  ready({
    id: 'b5-03',
    title: ['ການຈັດລະບົບຂອງສິ່ງທີ່ມີຊີວິດ', 'Classification of living things'],
    hours: 5,
    field: 'bio',
    minutes: 25,
    summary: [
      'ການຈັດແບ່ງຊ່ວຍໃຫ້ຈັດສິ່ງມີຊີວິດເປັນກຸ່ມຕາມຄວາມຄ້າຍຄືກັນ ແລະ ເອີ້ນຊື່ວິທະຍາສາດໄດ້ຕົງກັນທົ່ວໂລກ.',
      'Classification sorts living things into groups by similarity and gives each species one scientific name worldwide.',
    ],
    objectives: [
      ['ອະທິບາຍຄວາມສຳຄັນຂອງການຈັດແບ່ງສິ່ງທີ່ມີຊີວິດ', 'Explain why living things are classified'],
      ['ລຽງລຳດັບຊັ້ນຈັດແບ່ງ ຈາກອານາຈັກເຖິງຊະນິດ', 'Order the ranks from kingdom to species'],
      ['ຂຽນຊື່ວິທະຍາສາດແບບສອງຊື່ (binomial)', 'Write a scientific two-part (binomial) name'],
    ],
    keyIdeas: [
      ['ລຳດັບ: ອານາຈັກ → ຝິລຳ → ຊັ້ນ → ອັນດັບ → ວົງສ໌ → ສະກຸນ → ຊະນິດ', 'Ranks: kingdom → phylum → class → order → family → genus → species'],
      ['ຊື່ວິທະຍາສາດຕາມ Carl Linnaeus: ສະກຸນ + ຊະນິດ (ເຊັ່ນ Homo sapiens)', 'Scientific name after Carl Linnaeus: genus + species (e.g. Homo sapiens)'],
      ['ອານາຈັກ: Monera, Protista, Fungi, Plantae, Animalia', 'Kingdoms: Monera, Protista, Fungi, Plantae, Animalia'],
      ['ໃຊ້ລະຫັດຄູ່ (dichotomous key) ເພື່ອລະບຸຊະນິດ', 'Use a dichotomous key to identify a species'],
    ],
    questions: [
      ['ເປັນຫຍັງຕ້ອງມີຊື່ວິທະຍາສາດ ທັງທີ່ມີຊື່ພື້ນເມືອງແລ້ວ?', 'Why use scientific names when local names exist?'],
      ['ສັດສອງຊະນິດໃນສະກຸນດຽວກັນ ຄ້າຍກັນຫຼາຍກວ່າສັດສອງຊະນິດຕ່າງອານາຈັກບໍ?', 'Are two species of one genus more alike than two species of different kingdoms?'],
    ],
    activity: [
      'ສ້າງລະຫັດຄູ່ ເພື່ອແຍກໃບໄມ້ 5 ຊະນິດຈາກບ້ານ.',
      'Build a dichotomous key to tell apart five leaves from home.',
    ],
    quiz: [
      quizItem('q1', ['ຊັ້ນຈັດແບ່ງໃດນ້ອຍທີ່ສຸດ (ສະເພາະເຈາະຈົງທີ່ສຸດ)?', 'Which rank is the smallest (most specific)?'],
        [['ສະກຸນ', 'Genus'], ['ຊະນິດ', 'Species'], ['ວົງສ໌', 'Family']], 1,
        ['ລຳດັບຈາກໃຫຍ່ໄປນ້ອຍ ສິ້ນສຸດທີ່ຊະນິດ.', 'The ranks run from large to small and end at species.']),
      quizItem('q2', ['ໃນຊື່ Homo sapiens ຄຳ Homo ແມ່ນຫຍັງ?', 'In Homo sapiens, what is Homo?'],
        [['ຊະນິດ', 'Species'], ['ສະກຸນ', 'Genus'], ['ອານາຈັກ', 'Kingdom']], 1,
        ['ຊື່ສອງສ່ວນ: ສະກຸນ ແລ້ວຕາມດ້ວຍຊະນິດ.', 'A binomial name is genus followed by species.']),
      quizItem('q3', ['ໃຜເປັນຜູ້ວາງລະບົບຊື່ວິທະຍາສາດສອງຊື່?', 'Who established the two-part naming system?'],
        [['Charles Darwin', 'Charles Darwin'], ['Carl Linnaeus', 'Carl Linnaeus'], ['Gregor Mendel', 'Gregor Mendel']], 1,
        ['Carl Linnaeus ວາງລະບົບ binomial ໃນສະຕະວັດທີ 18.', 'Carl Linnaeus set up binomial naming in the 18th century.']),
    ],
  }),

  ready({
    id: 'b5-04',
    title: ['ລັກສະນະລວມ, ໂຄງປະກອບສ້າງ ແລະ ໜ້າທີ່ຂອງແຕ່ລະອານາຈັກ', 'The kingdoms: features, structure and function'],
    hours: 20,
    field: 'bio',
    minutes: 35,
    sim: 'photosynthesis',
    summary: [
      'ແຕ່ລະອານາຈັກມີລັກສະນະ ແລະ ບົດບາດຕ່າງກັນ; ພືດສັງເຄາະດ້ວຍແສງ ແລະ ຫາຍໃຈ ພ້ອມທັງມີໂຄງສ້າງຮາກ, ລຳຕົ້ນ, ໃບ ທີ່ເຮັດໜ້າທີ່ສະເພາະ.',
      'Each kingdom has its own features and role; plants photosynthesise and respire, with root, stem and leaf each doing a specific job.',
    ],
    objectives: [
      ['ບອກລັກສະນະ ແລະ ຄວາມສຳຄັນຂອງ Monera, Protista ແລະ Fungi', 'State the characteristics and importance of Monera, Protista and Fungi'],
      ['ອະທິບາຍໂຄງສ້າງ ແລະ ໜ້າທີ່ຂອງຮາກ, ລຳຕົ້ນ ແລະ ໃບ', 'Explain the structure and function of root, stem and leaf'],
      ['ອະທິບາຍການສັງເຄາະດ້ວຍແສງ, ການຫາຍໃຈຂອງພືດ ແລະ ການສືບພັນຂອງພືດ', 'Explain photosynthesis, plant respiration and plant reproduction'],
    ],
    keyIdeas: [
      ['ແບັກທີເຣຍເປັນຜູ້ຍ່ອຍສະຫຼາຍ ແລະ ບາງຊະນິດກໍ່ພະຍາດ; ເຫັດ-ຣາຍ່ອຍອາຫານຢູ່ນອກຈຸລັງ', 'Bacteria are decomposers and some cause disease; fungi digest food outside the cell'],
      ['6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (ແສງ, ຄລໍໂຣຟິລ)', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll)'],
      ['ປາກໃບ (stomata) ຄວບຄຸມການແລກປ່ຽນກາສ ແລະ ການສູນເສຍນ້ຳ', 'Stomata control gas exchange and water loss'],
      ['ພືດມີດອກ: ການຜະສົມເກສອນ → ການປະສົມ → ເມັດ ແລະ ຜົນ', 'Flowering plants: pollination → fertilisation → seed and fruit'],
    ],
    questions: [
      ['ເປັນຫຍັງພືດຕ້ອງການທັງການສັງເຄາະດ້ວຍແສງ ແລະ ການຫາຍໃຈ?', 'Why do plants need both photosynthesis and respiration?'],
      ['ເປັນຫຍັງຮາກຈຶ່ງມີຂົນຮາກຫຼາຍ?', 'Why do roots have so many root hairs?'],
    ],
    activity: [
      'ວາງ Elodea ໃນນ້ຳໃຕ້ໂຄມໄຟ ແລ້ວນັບຟອງອົກຊີແຊນຕໍ່ນາທີ ເມື່ອປ່ຽນໄລຍະຫ່າງຈາກໄຟ.',
      'Place Elodea in water under a lamp and count oxygen bubbles per minute at different distances from the lamp.',
    ],
    quiz: [
      quizItem('q1', ['ຜະລິດຕະພັນຂອງການສັງເຄາະດ້ວຍແສງແມ່ນຫຍັງ?', 'What are the products of photosynthesis?'],
        [['ກລູໂຄສ ແລະ ອົກຊີແຊນ', 'Glucose and oxygen'], ['CO₂ ແລະ ນ້ຳ', 'CO₂ and water'], ['ແປ້ງ ແລະ CO₂', 'Starch and CO₂']], 0,
        ['6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.']),
      quizItem('q2', ['ປາກໃບມີໜ້າທີ່ຫຍັງ?', 'What do stomata do?'],
        [['ດູດນ້ຳຈາກດິນ', 'Absorb water from soil'], ['ຄວບຄຸມການແລກປ່ຽນກາສ ແລະ ການສູນເສຍນ້ຳ', 'Control gas exchange and water loss'], ['ເກັບອາຫານ', 'Store food']], 1,
        ['ປາກໃບເປີດ-ປິດ ເພື່ອໃຫ້ CO₂ ເຂົ້າ ແລະ O₂ ກັບໄອນ້ຳອອກ.', 'They open and close to let CO₂ in and O₂ and water vapour out.']),
      quizItem('q3', ['ເຫັດ-ຣາ (Fungi) ໄດ້ອາຫານດ້ວຍວິທີໃດ?', 'How do fungi get food?'],
        [['ສັງເຄາະດ້ວຍແສງ', 'Photosynthesis'], ['ຍ່ອຍອາຫານຢູ່ນອກຈຸລັງ ແລ້ວດູດຊຶມ', 'Digest outside the cell then absorb'], ['ກິນສັດຕົວນ້ອຍ', 'Eat small animals']], 1,
        ['ເຫັດ-ຣາປ່ອຍເອນໄຊມ໌ອອກ ແລ້ວດູດທາດອາຫານທີ່ຍ່ອຍແລ້ວ.', 'Fungi release enzymes and absorb the digested nutrients.']),
    ],
  }),

  ready({
    id: 'b5-05',
    title: ['ສັດບໍ່ມີກະດູກສັນຫຼັງ', 'Invertebrates'],
    hours: 10,
    field: 'bio',
    minutes: 30,
    summary: [
      'ສັດບໍ່ມີກະດູກສັນຫຼັງແບ່ງເປັນຫຼາຍຝິລຳຕາມໂຄງສ້າງຮ່າງກາຍ ແລະ ມີຄວາມສຳຄັນຕໍ່ເສດຖະກິດ ແລະ ນິເວດ.',
      'Invertebrates are divided into phyla by body structure and are important to the economy and to ecosystems.',
    ],
    objectives: [
      ['ຈັດແບ່ງສັດບໍ່ມີກະດູກສັນຫຼັງເປັນຝິລຳຫຼັກ', 'Classify invertebrates into the main phyla'],
      ['ອະທິບາຍຄວາມສຳຄັນຕໍ່ເສດຖະກິດ ແລະ ນິເວດ', 'Explain their economic and ecological importance'],
      ['ປຽບທຽບໂຄງສ້າງ ແລະ ການສືບພັນຂອງແຕ່ລະຝິລຳ', 'Compare structure and reproduction of each phylum'],
    ],
    keyIdeas: [
      ['ຝິລຳຫຼັກ: ຟອງນ້ຳ (Porifera), Cnidaria, ໜອນແປໜ້າ, ໜອນກົມ, ໄສ້ເດືອນ, ຫອຍ (molluscs), ແມງໄມ້ ແລະ ກຸ້ງ (arthropods), ເອກິໂນເດີມ (echinoderms)', 'Main phyla: sponges (Porifera), Cnidaria, flatworms, roundworms, annelids, molluscs, insects and crustaceans (arthropods), echinoderms'],
      ['ອາດຣໂທປອດມີຂາຕໍ່ ແລະ ເປືອກແຂງຫຸ້ມຕົວ (exoskeleton)', 'Arthropods have jointed legs and an exoskeleton'],
      ['ແມງໄມ້ມີ 6 ຂາ ແລະ 3 ສ່ວນຂອງຮ່າງກາຍ (ຫົວ, ເອິກ, ທ້ອງ)', 'Insects have 6 legs and 3 body parts (head, thorax, abdomen)'],
      ['ບາງຊະນິດເປັນພາຫະນຳພະຍາດ (ເຊັ່ນ ຍຸງ) ແລະ ບາງຊະນິດມີປະໂຫຍດ (ເຜິ້ງ, ໜອນໄໝ)', 'Some carry disease (mosquitoes) and others help us (bees, silkworms)'],
    ],
    questions: [
      ['ຮູ້ໄດ້ແນວໃດວ່າແມງມຸມບໍ່ແມ່ນແມງໄມ້?', 'How can you tell a spider is not an insect?'],
      ['ການລ້ຽງເຜິ້ງ ຫຼື ໜອນໄໝ ມີປະໂຫຍດຕໍ່ຊຸມຊົນແນວໃດ?', 'How does keeping bees or silkworms benefit a community?'],
    ],
    activity: [
      'ເກັບຕົວຢ່າງແມງໄມ້ໃນສວນໂຮງຮຽນ ແລ້ວຈັດແບ່ງດ້ວຍລະຫັດຄູ່ (ປ່ອຍກັບຄືນຫຼັງສຳເລັດ).',
      'Collect insects in the school garden and sort them with a dichotomous key (release them afterwards).',
    ],
    quiz: [
      quizItem('q1', ['ແມງໄມ້ມີຂາຈັກຂາ?', 'How many legs does an insect have?'],
        [['4', '4'], ['6', '6'], ['8', '8']], 1,
        ['ແມງໄມ້ມີ 6 ຂາ; ແມງມຸມມີ 8 ຂາ.', 'Insects have 6 legs; spiders have 8.']),
      quizItem('q2', ['ລັກສະນະໃດຂອງອາດຣໂທປອດ?', 'Which is a feature of arthropods?'],
        [['ມີກະດູກສັນຫຼັງ', 'A backbone'], ['ຂາຕໍ່ ແລະ ເປືອກແຂງ', 'Jointed legs and an exoskeleton'], ['ຮ່າງກາຍອ່ອນບໍ່ມີຂາ', 'A soft legless body']], 1,
        ['ຂາຕໍ່ ແລະ exoskeleton ເປັນລັກສະນະສຳຄັນຂອງ arthropods.', 'Jointed legs and an exoskeleton define arthropods.']),
      quizItem('q3', ['ແມງໄມ້ຊະນິດໃດເປັນພາຫະນຳພະຍາດໄຂ້ມາເລເຣຍ?', 'Which insect carries malaria?'],
        [['ເຜິ້ງ', 'Bee'], ['ຍຸງ', 'Mosquito'], ['ໜອນໄໝ', 'Silkworm']], 1,
        ['ຍຸງ Anopheles ນຳເຊື້ອມາເລເຣຍ.', 'Anopheles mosquitoes carry the malaria parasite.']),
    ],
  }),

  ready({
    id: 'b5-06',
    title: ['ສັດມີກະດູກສັນຫຼັງ', 'Vertebrates'],
    hours: 10,
    field: 'bio',
    minutes: 30,
    summary: [
      'ສັດມີກະດູກສັນຫຼັງມີ 5 ກຸ່ມຫຼັກ ທີ່ຕ່າງກັນດ້ານຜິວໜັງ, ການຫາຍໃຈ, ການສືບພັນ ແລະ ອຸນຫະພູມຮ່າງກາຍ.',
      'Vertebrates fall into five main groups that differ in skin, respiration, reproduction and body temperature.',
    ],
    objectives: [
      ['ຈຳແນກສັດ 5 ກຸ່ມຫຼັກທີ່ມີກະດູກສັນຫຼັງ', 'Distinguish the five main groups of vertebrates'],
      ['ປຽບທຽບໂຄງສ້າງ, ການຫາຍໃຈ ແລະ ການສືບພັນ', 'Compare structure, respiration and reproduction'],
      ['ອະທິບາຍພຶດຕິກຳ ແລະ ການປັບຕົວຂອງສັດ', 'Explain behaviour and adaptation of animals'],
    ],
    keyIdeas: [
      ['ປາ: ເຫືອກ ແລະ ຄີບ; ສັດສະເໝີນ້ຳບົກ: ຫາຍໃຈດ້ວຍຜິວໜັງ ແລະ ປອດ ແລະ ມີການປ່ຽນຮູບຮ່າງ', 'Fish: gills and fins; amphibians: skin and lungs, with metamorphosis'],
      ['ສັດເລືອຄານ: ເກັດ ແລະ ໄຂ່ມີເປືອກ; ນົກ: ຂົນ ແລະ ເລືອດອຸ່ນ', 'Reptiles: scales and shelled eggs; birds: feathers and warm blood'],
      ['ສັດລ້ຽງລູກດ້ວຍນົມ: ມີຂົນ, ຕ່ອມນ້ຳນົມ ແລະ ເລືອດອຸ່ນ', 'Mammals: hair, mammary glands and warm blood'],
      ['ພຶດຕິກຳ ເຊັ່ນ ການອົບພະຍົບ ແລະ ການປັບຕົວຕາມລະດູ', 'Behaviour such as migration and seasonal adaptation'],
    ],
    questions: [
      ['ເປັນຫຍັງປາວານເປັນສັດລ້ຽງລູກດ້ວຍນົມ ບໍ່ແມ່ນປາ?', 'Why is a whale a mammal and not a fish?'],
      ['ສັດເລືອດອຸ່ນ ແລະ ສັດເລືອດເຢັນ ຕ່າງກັນແນວໃດ?', 'How do warm-blooded and cold-blooded animals differ?'],
    ],
    activity: [
      'ແຕ້ມຕາຕະລາງປຽບທຽບ 5 ກຸ່ມສັດ ໂດຍໃຊ້ຕົວຢ່າງ ກົບ, ໄກ່ ແລະ ປາຈາກທ້ອງຖິ່ນ.',
      'Draw a comparison chart of the five groups using local examples such as frog, chicken and fish.',
    ],
    quiz: [
      quizItem('q1', ['ສັດກຸ່ມໃດມີຂົນ ແລະ ເລືອດອຸ່ນ ແລະ ວາງໄຂ່ມີເປືອກ?', 'Which group has feathers, warm blood and lays shelled eggs?'],
        [['ສັດເລືອຄານ', 'Reptiles'], ['ນົກ', 'Birds'], ['ສັດລ້ຽງລູກດ້ວຍນົມ', 'Mammals']], 1,
        ['ນົກມີຂົນ, ເລືອດອຸ່ນ ແລະ ວາງໄຂ່ມີເປືອກ.', 'Birds have feathers, are warm-blooded and lay shelled eggs.']),
      quizItem('q2', ['ສັດສະເໝີນ້ຳບົກ ເຊັ່ນ ກົບ ມີການພັດທະນາແບບໃດ?', 'How do amphibians such as frogs develop?'],
        [['ປ່ຽນຮູບຮ່າງ (metamorphosis)', 'Metamorphosis'], ['ອອກລູກເປັນໂຕ', 'Live birth'], ['ບໍ່ປ່ຽນຮູບຮ່າງ', 'No change of form']], 0,
        ['ລູກອ໊ອດ ຫາຍໃຈດ້ວຍເຫືອກ ແລ້ວປ່ຽນເປັນກົບທີ່ມີປອດ.', 'Tadpoles breathe with gills and change into frogs with lungs.']),
      quizItem('q3', ['ເປັນຫຍັງປາວານຈຶ່ງເປັນສັດລ້ຽງລູກດ້ວຍນົມ?', 'Why is a whale a mammal?'],
        [['ອາໄສຢູ່ໃນນ້ຳ', 'It lives in water'], ['ຫາຍໃຈດ້ວຍປອດ ແລະ ລ້ຽງລູກດ້ວຍນົມ', 'It breathes with lungs and feeds milk'], ['ມີຄີບ', 'It has fins']], 1,
        ['ປາວານເລືອດອຸ່ນ, ຫາຍໃຈດ້ວຍປອດ ແລະ ລ້ຽງລູກດ້ວຍນົມ.', 'Whales are warm-blooded, breathe with lungs and nurse their young.']),
    ],
  }),
]
