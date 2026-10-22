import type { L } from '../i18n/strings'

// Chemistry M.5, topic III "Atomic structure" (curriculum 2011, p.59, 10 hours).
// Lao text drafted by AI, to be verified by a chemistry teacher.
// Terms marked REVIEW are not confirmed against the official textbook:
//   ໂປຣຕົງ (proton), ນິວຕຣົງ (neutron), ນິວເຄຼຍ (nucleus), ກົນສາດຄວອນຕຳ (quantum mechanics),
//   ເມກເອເລັກຕຣົງ (electron cloud), ໂຟຕອນ (photon), ອະນຸພາກແອວຟາ (alpha particle).

export type StageId = 'dalton' | 'thomson' | 'rutherford' | 'bohr'

export interface Stage {
  id: StageId
  year: number
  scientist: string
  model: L
  summary: L
  keyIdeas: L[]
  evidence: L
  limits: L[]
  questions: L[]
  activity: L
  minutes: number
  accent: string
}

export interface Objective {
  text: L
  coverage: 'full' | 'partial'
}

export const topic = {
  id: 'chem-m5-atom',
  title: { lo: 'ໂຄງສ້າງອາໂຕມ', en: 'Atomic Structure' } satisfies L,
  hours: 10,
  summary: {
    lo: 'ແບບຈຳລອງອາໂຕມຂອງ Dalton, Thomson, Rutherford ແລະ Bohr ໃນ 2D ແລະ 3D.',
    en: 'The atom models of Dalton, Thomson, Rutherford and Bohr in 2D and 3D.',
  } satisfies L,
}

export const objectives: Objective[] = [
  {
    text: {
      lo: 'ອະທິບາຍແນວຄິດຂອງ John Dalton ກ່ຽວກັບອາໂຕມ',
      en: "Explain John Dalton's ideas about the atom",
    },
    coverage: 'full',
  },
  {
    text: {
      lo: 'ພັນລະນາແບບຈຳລອງອາໂຕມຂອງ Thomson ແລະ Rutherford',
      en: "Describe the atomic models of Thomson and Rutherford",
    },
    coverage: 'full',
  },
  {
    text: {
      lo: 'ອະທິບາຍອະນຸພາກພື້ນຖານຂອງອາໂຕມ, ເລກອາໂຕມ, ເລກມວນສານ ແລະ ອີໂຊໂທບ',
      en: 'Explain the fundamental particles, atomic number, mass number and isotopes',
    },
    coverage: 'partial',
  },
  {
    text: {
      lo: 'ພັນລະນາແບບຈຳລອງອາໂຕມຂອງ Bohr, ສະເປັກຕຣຳຂອງທາດມູນ ແລະ ການແປຄວາມໝາຍ',
      en: "Describe Bohr's model, element spectra and their interpretation",
    },
    coverage: 'full',
  },
  {
    text: {
      lo: 'ອະທິບາຍແນວຄິດກ່ຽວກັບການຈັດລຽງເອເລັກຕຣົງໃນອາໂຕມ',
      en: 'Explain how electrons are arranged in an atom',
    },
    coverage: 'full',
  },
]

export const stages: Stage[] = [
  {
    id: 'dalton',
    year: 1803,
    scientist: 'John Dalton',
    accent: '#ffb74d',
    model: { lo: 'ແບບລູກບານແຂງ', en: 'Solid sphere model' },
    summary: {
      lo: 'ທຸກສິ່ງທຸກຢ່າງປະກອບດ້ວຍອາໂຕມທີ່ນ້ອຍຫຼາຍ ເບິ່ງບໍ່ເຫັນ ແລະ ແບ່ງແຍກບໍ່ໄດ້. ອາໂຕມຄືລູກບານແຂງກົມ.',
      en: 'Everything is made of tiny, invisible atoms that cannot be divided. An atom is a solid, round ball.',
    },
    keyIdeas: [
      {
        lo: 'ທາດທຸກຊະນິດປະກອບດ້ວຍອາໂຕມ ທີ່ແບ່ງແຍກບໍ່ໄດ້ ແລະ ທຳລາຍບໍ່ໄດ້',
        en: 'All matter is made of atoms that cannot be divided or destroyed',
      },
      {
        lo: 'ອາໂຕມຂອງທາດດຽວກັນມີມວນສານ ແລະ ສົມບັດຄືກັນ; ທາດຕ່າງກັນມີອາໂຕມຕ່າງກັນ',
        en: 'Atoms of one element are identical in mass and properties; different elements have different atoms',
      },
      {
        lo: 'ທາດປະສົມເກີດຈາກອາໂຕມຂອງທາດຕ່າງກັນມາຮວມກັນ ດ້ວຍອັດຕາສ່ວນຈຳນວນເຕັມ',
        en: 'Compounds form when atoms of different elements combine in whole-number ratios',
      },
      {
        lo: 'ປະຕິກິລິຍາເຄມີແມ່ນການຈັດລຽງອາໂຕມໃໝ່ ບໍ່ມີອາໂຕມເກີດຂຶ້ນ ຫຼື ສູນຫາຍ',
        en: 'A chemical reaction rearranges atoms; no atom is created or lost',
      },
    ],
    evidence: {
      lo: 'ອີງຕາມກົດເກນຮັກສາມວນສານ (ມວນລວມກ່ອນ ແລະ ຫຼັງປະຕິກິລິຍາເທົ່າກັນ) ແລະ ກົດເກນອັດຕາສ່ວນຄົງທີ່.',
      en: 'Based on the law of conservation of mass (total mass is the same before and after a reaction) and the law of definite proportions.',
    },
    limits: [
      {
        lo: 'ອະທິບາຍບໍ່ໄດ້ວ່າເປັນຫຍັງວັດຖຸຈຶ່ງມີປະຈຸໄຟຟ້າໄດ້',
        en: 'Cannot explain why matter can become electrically charged',
      },
      {
        lo: 'ຕໍ່ມາພົບວ່າອາໂຕມແບ່ງໄດ້ເປັນອະນຸພາກຍ່ອຍ (ເອເລັກຕຣົງ, ໂປຣຕົງ, ນິວຕຣົງ)',
        en: 'Later found to be divisible into subatomic particles (electrons, protons, neutrons)',
      },
      {
        lo: 'ອາໂຕມຂອງທາດດຽວກັນອາດມີມວນສານຕ່າງກັນ (ອີໂຊໂທບ)',
        en: 'Atoms of the same element can differ in mass (isotopes)',
      },
    ],
    questions: [
      {
        lo: 'ນັບອາໂຕມ H ແລະ O ກ່ອນ ແລະ ຫຼັງປະຕິກິລິຍາ ມີຈຳນວນເທົ່າກັນບໍ? ນີ້ສະແດງຫຍັງ?',
        en: 'Count the H and O atoms before and after the reaction. Are they equal? What does this show?',
      },
      {
        lo: 'ຖ້າອາໂຕມແບ່ງບໍ່ໄດ້ ເປັນຫຍັງຈຶ່ງເກີດໄຟຟ້າສະຖິດ (ເຊັ່ນ ຖູໄມ້ບັນທັດກັບຜົມ)?',
        en: 'If atoms cannot be divided, how does static electricity happen (e.g. rubbing a ruler on hair)?',
      },
    ],
    activity: {
      lo: 'ໃຫ້ນັກຮຽນໃຊ້ລູກປັດ ຫຼື ດິນໜຽວຫຼາຍສີ ເປັນອາໂຕມ ປະກອບເປັນໂມເລກຸນນ້ຳ (2H₂ + O₂ → 2H₂O) ແລ້ວນັບອາໂຕມກ່ອນ ແລະ ຫຼັງ.',
      en: 'Students use coloured beads or clay as atoms to build water molecules (2H₂ + O₂ → 2H₂O), then count atoms before and after.',
    },
    minutes: 30,
  },
  {
    id: 'thomson',
    year: 1897,
    scientist: 'J. J. Thomson',
    accent: '#f48fb1',
    model: { lo: 'ແບບ plum pudding', en: 'Plum pudding model' },
    summary: {
      lo: 'ອາໂຕມເປັນກ້ອນກົມທີ່ມີປະຈຸບວກ ແລະ ມີເອເລັກຕຣົງ (ປະຈຸລົບ) ຝັງຢູ່ທົ່ວໆ ຄືເມັດໝາກອະງຸ່ນແຫ້ງໃນເຄັກ.',
      en: 'The atom is a sphere of positive charge with negative electrons embedded throughout, like raisins in a cake.',
    },
    keyIdeas: [
      {
        lo: 'ການທົດລອງຫຼອດຮັງສີແຄໂທດ ພົບອະນຸພາກທີ່ມີປະຈຸລົບ ເອີ້ນວ່າ ເອເລັກຕຣົງ',
        en: 'Cathode-ray tube experiments revealed negatively charged particles: electrons',
      },
      {
        lo: 'ເອເລັກຕຣົງເບົາກວ່າອາໂຕມໄຮໂດຣເຈນປະມານ 1,800 ເທົ່າ',
        en: 'An electron is about 1,800 times lighter than a hydrogen atom',
      },
      {
        lo: 'ອາໂຕມເປັນກາງທາງໄຟຟ້າ ເພາະປະຈຸບວກ ແລະ ປະຈຸລົບມີຈຳນວນເທົ່າກັນ',
        en: 'Atoms are electrically neutral because positive and negative charges are equal',
      },
      {
        lo: 'ເປັນຄັ້ງທຳອິດທີ່ສະເໜີວ່າອາໂຕມມີໂຄງສ້າງພາຍໃນ',
        en: 'First model to propose that atoms have an internal structure',
      },
    ],
    evidence: {
      lo: 'ຫຼອດຮັງສີແຄໂທດ: ລຳຮັງສີເບນເຂົ້າຫາແຜ່ນບວກຂອງສະໜາມໄຟຟ້າ ແລະ ອັດຕາສ່ວນປະຈຸຕໍ່ມວນ (e/m) ເທົ່າເດີມ ບໍ່ວ່າໃຊ້ທາດໃດເຮັດຂົ້ວ.',
      en: 'Cathode-ray tube: the beam bends toward the positive plate, and its charge-to-mass ratio (e/m) is the same whatever material the electrodes are made of.',
    },
    limits: [
      {
        lo: 'ອະທິບາຍຜົນການທົດລອງແຜ່ນທອງຄຳຂອງ Rutherford ບໍ່ໄດ້',
        en: "Cannot explain the result of Rutherford's gold-foil experiment",
      },
      {
        lo: 'ບໍ່ມີນິວເຄຼຍ: ແຕ່ຕໍ່ມາພົບວ່າມວນສ່ວນໃຫຍ່ ແລະ ປະຈຸບວກ ຢູ່ລວມກັນທີ່ຈຸດນ້ອຍໆຕອນກາງ',
        en: 'No nucleus: later shown that most mass and all positive charge sit in a tiny centre',
      },
    ],
    questions: [
      {
        lo: 'ໃນແບບຈຳລອງນີ້ ເປັນຫຍັງອາໂຕມຈຶ່ງເປັນກາງທາງໄຟຟ້າ?',
        en: 'In this model, why is the atom electrically neutral?',
      },
      {
        lo: 'ເປັນຫຍັງການພົບເອເລັກຕຣົງ ຈຶ່ງເຮັດໃຫ້ແນວຄິດ "ອາໂຕມແບ່ງບໍ່ໄດ້" ຂອງ Dalton ໃຊ້ບໍ່ໄດ້ທັງໝົດ?',
        en: "Why did the discovery of the electron challenge Dalton's \"indivisible atom\"?",
      },
    ],
    activity: {
      lo: 'ໃຫ້ນັກຮຽນເຮັດຕົວແບບ: ປັ້ນດິນໜຽວກົມສີແດງ ແລ້ວຝັງລູກປັດນ້ອຍສີຟ້າ (ເອເລັກຕຣົງ) ໃຫ້ປະຈຸລົບ ແລະ ບວກສົມດຸນກັນ.',
      en: 'Students build a model: a red clay ball with small blue beads (electrons) pressed in, balancing negative against positive charge.',
    },
    minutes: 30,
  },
  {
    id: 'rutherford',
    year: 1911,
    scientist: 'Ernest Rutherford',
    accent: '#ef5350',
    model: { lo: 'ແບບນິວເຄຼຍ', en: 'Nuclear model' },
    summary: {
      lo: 'ອາໂຕມສ່ວນໃຫຍ່ເປັນບ່ອນຫວ່າງ. ປະຈຸບວກ ແລະ ມວນສ່ວນໃຫຍ່ ຢູ່ລວມກັນທີ່ນິວເຄຼຍນ້ອຍໆ ຕອນກາງ ແລະ ເອເລັກຕຣົງໝູນວຽນອ້ອມຢູ່ໄກອອກໄປ.',
      en: 'An atom is mostly empty space. Positive charge and most of the mass are packed into a tiny nucleus at the centre, with electrons circling far outside.',
    },
    keyIdeas: [
      {
        lo: 'ຍິງອະນຸພາກແອວຟາ (ປະຈຸບວກ) ໃສ່ແຜ່ນທອງຄຳບາງໆ',
        en: 'Alpha particles (positive) were fired at very thin gold foil',
      },
      {
        lo: 'ສ່ວນໃຫຍ່ຜ່ານຕົງໄປ → ອາໂຕມສ່ວນໃຫຍ່ເປັນບ່ອນຫວ່າງ',
        en: 'Most passed straight through → atoms are mostly empty space',
      },
      {
        lo: 'ບາງສ່ວນເບນ ແລະ ນ້ອຍຫຼາຍສະທ້ອນກັບ (ປະມານ 1 ໃນ 8,000) → ມີນິວເຄຼຍນ້ອຍ ໜາແໜ້ນ ແລະ ມີປະຈຸບວກ',
        en: 'A few were deflected and very few bounced back (about 1 in 8,000) → a small, dense, positive nucleus',
      },
      {
        lo: 'ເອເລັກຕຣົງໝູນອ້ອມນິວເຄຼຍ ຄືດາວເຄາະອ້ອມດວງອາທິດ',
        en: 'Electrons orbit the nucleus like planets around the Sun',
      },
    ],
    evidence: {
      lo: 'ການທົດລອງແຜ່ນທອງຄຳ (Geiger–Marsden, 1909; Rutherford ຕີຄວາມໝາຍປີ 1911).',
      en: 'Gold-foil experiment (Geiger–Marsden, 1909; interpreted by Rutherford in 1911).',
    },
    limits: [
      {
        lo: 'ຕາມຟີຊິກຄລາສສິກ ເອເລັກຕຣົງທີ່ໝູນວຽນຄວນເສຍພະລັງງານ ແລ້ວຕົກເຂົ້ານິວເຄຼຍ ແຕ່ອາໂຕມຍັງຄົງຢູ່',
        en: 'In classical physics orbiting electrons should lose energy and spiral into the nucleus, yet atoms are stable',
      },
      {
        lo: 'ອະທິບາຍບໍ່ໄດ້ວ່າເປັນຫຍັງອາໂຕມປ່ອຍແສງເປັນສີສະເພາະ (ສະເປັກຕຣຳເສັ້ນ)',
        en: 'Cannot explain why atoms emit light only at specific colours (line spectra)',
      },
    ],
    questions: [
      {
        lo: 'ຖ້າແບບ Thomson ຖືກຕ້ອງ ອະນຸພາກແອວຟາຈະເປັນແນວໃດ? ຜົນຈິງຕ່າງກັນແນວໃດ?',
        en: "If Thomson's model were right, what would the alpha particles do? How did the real result differ?",
      },
      {
        lo: 'ຖ້ານິວເຄຼຍໃຫຍ່ເທົ່າເມັດຖົ່ວ ອາໂຕມທັງໝົດຈະໃຫຍ່ປະມານເທົ່າໃດ? (ຄຳຕອບປະມານ: ອັດຕາສ່ວນ 1 : 100,000 → ປະມານ 500 ແມັດ)',
        en: 'If the nucleus were the size of a pea, about how big would the whole atom be? (Approx. answer: ratio 1 : 100,000 → about 500 m)',
      },
    ],
    activity: {
      lo: 'ຈຳລອງການທົດລອງ: ໃຫ້ນັກຮຽນກິ້ງລູກແກ້ວໃສ່ວັດຖຸທີ່ເຊື່ອງໄວ້ໃຕ້ຜ້າ ຫຼື ກ່ອງ ແລ້ວສັງເກດທິດທາງທີ່ລູກແກ້ວເບນ ເພື່ອເດົາຮູບຮ່າງຂອງວັດຖຸ.',
      en: 'Simulate the experiment: students roll marbles at an object hidden under a cloth or box and infer its shape from how the marbles deflect.',
    },
    minutes: 40,
  },
  {
    id: 'bohr',
    year: 1913,
    scientist: 'Niels Bohr',
    accent: '#4fc3f7',
    model: { lo: 'ແບບຊັ້ນພະລັງງານ', en: 'Energy-level (shell) model' },
    summary: {
      lo: 'ເອເລັກຕຣົງໝູນຢູ່ໃນຊັ້ນພະລັງງານ (K, L, M…) ທີ່ກຳນົດໄວ້ ແລະ ບໍ່ປ່ອຍພະລັງງານ. ເມື່ອໂດດລະຫວ່າງຊັ້ນ ຈະດູດ ຫຼື ປ່ອຍແສງ (ໂຟຕອນ).',
      en: 'Electrons orbit in fixed energy levels (K, L, M…) without radiating. Jumping between levels absorbs or emits light (a photon).',
    },
    keyIdeas: [
      {
        lo: 'ເອເລັກຕຣົງຢູ່ໄດ້ສະເພາະໃນຊັ້ນພະລັງງານທີ່ກຳນົດ (n = 1, 2, 3, …)',
        en: 'Electrons can only occupy fixed energy levels (n = 1, 2, 3, …)',
      },
      {
        lo: 'ຊັ້ນໃກ້ນິວເຄຼຍມີພະລັງງານຕ່ຳ; ຊັ້ນທີ່ໄກອອກໄປມີພະລັງງານສູງກວ່າ',
        en: 'Levels near the nucleus have low energy; levels farther out have higher energy',
      },
      {
        lo: 'ເມື່ອເອເລັກຕຣົງຕົກລົງຊັ້ນຕ່ຳ ຈະປ່ອຍໂຟຕອນທີ່ມີພະລັງງານ = ຜົນຕ່າງລະຫວ່າງສອງຊັ້ນ (ΔE = hν)',
        en: 'A falling electron emits a photon whose energy equals the gap between the two levels (ΔE = hν)',
      },
      {
        lo: 'ອະທິບາຍສະເປັກຕຣຳເສັ້ນຂອງໄຮໂດຣເຈນໄດ້',
        en: 'Explains the line spectrum of hydrogen',
      },
      {
        lo: 'ຊັ້ນ K ຮັບໄດ້ສູງສຸດ 2 ໂຕ, ຊັ້ນ L ສູງສຸດ 8 ໂຕ; ໃນ 18 ທາດທຳອິດ ຊັ້ນ M ເຕີມໄດ້ເຖິງ 8 ໂຕ (ການຈັດລຽງ 2, 8, 8)',
        en: 'Shell K holds up to 2 electrons and L up to 8; in the first 18 elements shell M fills up to 8 (arrangement 2, 8, 8)',
      },
    ],
    evidence: {
      lo: 'ສະເປັກຕຣຳເສັ້ນຂອງໄຮໂດຣເຈນ: ເສັ້ນສີແດງ, ຟ້າຂຽວ, ຟ້າ ແລະ ມ່ວງ (ຊຸດ Balmer) ກົງກັບການຕົກລົງຊັ້ນ n = 2.',
      en: 'Hydrogen line spectrum: the red, cyan, blue and violet lines (Balmer series) match falls to n = 2.',
    },
    limits: [
      {
        lo: 'ໃຊ້ໄດ້ດີກັບອາໂຕມທີ່ມີເອເລັກຕຣົງ 1 ໂຕ (ໄຮໂດຣເຈນ) ແຕ່ບໍ່ດີກັບອາໂຕມທີ່ມີຫຼາຍເອເລັກຕຣົງ',
        en: 'Works well for one-electron atoms (hydrogen) but not for many-electron atoms',
      },
      {
        lo: 'ແບບປັດຈຸບັນໃຊ້ກົນສາດຄວອນຕຳ (quantum mechanics): ເອເລັກຕຣົງຢູ່ໃນ "ເມກເອເລັກຕຣົງ" ບໍ່ແມ່ນວົງໂຄຈອນແນ່ນອນ',
        en: 'The modern model uses quantum mechanics: electrons form a "cloud" (orbitals), not fixed paths',
      },
    ],
    questions: [
      {
        lo: 'ເປັນຫຍັງໄຮໂດຣເຈນຈຶ່ງປ່ອຍແສງສະເພາະບາງສີ ແທນທີ່ຈະເປັນທຸກສີ?',
        en: 'Why does hydrogen emit only certain colours instead of every colour?',
      },
      {
        lo: 'ເລືອກ Z = 11 (Na) ແລ້ວທາຍການຈັດລຽງເອເລັກຕຣົງກ່ອນກວດໃນຈໍ (ຄຳຕອບ 2, 8, 1)',
        en: 'Choose Z = 11 (Na) and predict the arrangement before checking on screen (answer 2, 8, 1)',
      },
    ],
    activity: {
      lo: 'ຕົວຢ່າງປຽບທຽບດ້ວຍຂັ້ນໄດ: ຢືນຢູ່ຂັ້ນໃດກໍໄດ້ ແຕ່ຢືນລະຫວ່າງຂັ້ນບໍ່ໄດ້ (ຄືຊັ້ນພະລັງງານ). ແລ້ວທົດລອງໃນຈໍ: ເລືອກ Z = 1 ກົດ "ກະຕຸ້ນເອເລັກຕຣົງ" ແລະ ຈົດສີທີ່ເກີດ.',
      en: 'Staircase analogy: you can stand on a step but not between steps (like energy levels). Then try it on screen: choose Z = 1, press "Excite electron" and note the colour produced.',
    },
    minutes: 60,
  },
]
