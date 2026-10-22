import type { Category, MatterState, MetalClass } from '../data/periodicTable'
import type { L } from '../i18n/strings'

// Lao category names are NOT confirmed against the official textbook.
// REVIEW: every `name` and `desc` below (esp. alkaline, transition, postTransition, noble, lanthanide, actinide).

export interface CategoryInfo {
  key: Category
  color: string // cell background; ink on top is always --ink (contrast >= 7:1)
  name: L
  desc: L
}

export const categories: CategoryInfo[] = [
  {
    key: 'alkali',
    color: '#ffb3a7',
    name: { lo: 'ໂລຫະອັລກາໄລ', en: 'Alkali metals' },
    desc: {
      lo: 'ໂລຫະອ່ອນ ແລະ ວ່ອງໄວຫຼາຍ, ທຳປະຕິກິລິຍາຮຸນແຮງກັບນ້ຳ',
      en: 'Soft, very reactive metals; react vigorously with water',
    },
  },
  {
    key: 'alkaline',
    color: '#ffcf8a',
    name: { lo: 'ໂລຫະອັລກາໄລເອີດ', en: 'Alkaline earth metals' },
    desc: {
      lo: 'ໂລຫະແຂງກວ່າກຸ່ມອັລກາໄລ, ວ່ອງໄວປານກາງ',
      en: 'Harder than alkali metals; fairly reactive',
    },
  },
  {
    key: 'transition',
    color: '#ffe98a',
    name: { lo: 'ໂລຫະທຣານຊິຊັນ', en: 'Transition metals' },
    desc: {
      lo: 'ໂລຫະແຂງ ນຳຄວາມຮ້ອນ ແລະ ໄຟຟ້າດີ, ເຊັ່ນ ເຫຼັກ ທອງແດງ ຄຳ',
      en: 'Hard metals that conduct heat and electricity, e.g. iron, copper, gold',
    },
  },
  {
    key: 'postTransition',
    color: '#c9e6a0',
    name: { lo: 'ໂລຫະຫຼັງທຣານຊິຊັນ', en: 'Post-transition metals' },
    desc: {
      lo: 'ໂລຫະອ່ອນກວ່າ ແລະ ຈຸດລະລາຍຕ່ຳກວ່າ, ເຊັ່ນ ອາລູມີນຽມ ກົ່ວ ຕະກົ່ວ',
      en: 'Softer metals with lower melting points, e.g. aluminium, tin, lead',
    },
  },
  {
    key: 'metalloid',
    color: '#9fe0c2',
    name: { lo: 'ກຶ່ງໂລຫະ', en: 'Metalloids' },
    desc: {
      lo: 'ມີສົມບັດລະຫວ່າງໂລຫະ ແລະ ອາໂລຫະ, ເຊັ່ນ ຊິລິກອນ',
      en: 'Properties between metals and nonmetals, e.g. silicon',
    },
  },
  {
    key: 'nonmetal',
    color: '#8fd3f4',
    name: { lo: 'ອາໂລຫະ', en: 'Nonmetals' },
    desc: {
      lo: 'ບໍ່ນຳໄຟຟ້າ (ສ່ວນໃຫຍ່), ເຊັ່ນ ຄາບອນ ອົກຊີເຈນ ຊູນຟູ',
      en: 'Mostly poor conductors, e.g. carbon, oxygen, sulfur',
    },
  },
  {
    key: 'halogen',
    color: '#b9b7f5',
    name: { lo: 'ຮາໂລເຈນ', en: 'Halogens' },
    desc: {
      lo: 'ອາໂລຫະວ່ອງໄວຫຼາຍ, ເຊັ່ນ ຟລູອໍຣີນ ຄລໍຣີນ',
      en: 'Very reactive nonmetals, e.g. fluorine, chlorine',
    },
  },
  {
    key: 'noble',
    color: '#e3b7ef',
    name: { lo: 'ທາດອາຍເຉື່ອຍ', en: 'Noble gases' },
    desc: {
      lo: 'ທາດອາຍທີ່ເຂົ້າປະຕິກິລິຍາຍາກຫຼາຍ',
      en: 'Gases that almost never react',
    },
  },
  {
    key: 'lanthanide',
    color: '#ffc2dd',
    name: { lo: 'ແລນທານອຍ', en: 'Lanthanides' },
    desc: {
      lo: 'ໂລຫະທີ່ຢູ່ແຖວລຸ່ມ (Z = 57–71), ເອີ້ນວ່າ ທາດດິນຫາຍາກ',
      en: 'Metals in the lower row (Z = 57–71), the "rare earths"',
    },
  },
  {
    key: 'actinide',
    color: '#f5a6c0',
    name: { lo: 'ແອັກຕີນອຍ', en: 'Actinides' },
    desc: {
      lo: 'ໂລຫະກຳມັນຕະພາບລັງສີ (Z = 89–103), ເຊັ່ນ ຢູເຣນຽມ',
      en: 'Radioactive metals (Z = 89–103), e.g. uranium',
    },
  },
]

export interface StateInfo {
  key: MatterState
  color: string
  name: L
  desc: L
}

export const states: StateInfo[] = [
  {
    key: 'solid',
    color: '#d5dbe3',
    name: { lo: 'ແຂງ', en: 'Solid' },
    desc: { lo: 'ເປັນຂອງແຂງທີ່ອຸນຫະພູມຫ້ອງ', en: 'Solid at room temperature' },
  },
  {
    key: 'liquid',
    color: '#8fd3f4',
    name: { lo: 'ແຫຼວ', en: 'Liquid' },
    desc: { lo: 'ມີພຽງ ບຣອມີນ ແລະ ປະຣອດ', en: 'Only bromine and mercury' },
  },
  {
    key: 'gas',
    color: '#ffe98a',
    name: { lo: 'ທາດອາຍ', en: 'Gas' },
    desc: { lo: 'ເປັນທາດອາຍທີ່ອຸນຫະພູມຫ້ອງ', en: 'Gas at room temperature' },
  },
  {
    key: 'unknown',
    color: '#ffffff',
    name: { lo: 'ຍັງບໍ່ຮູ້ແນ່ຊັດ', en: 'Unknown' },
    desc: { lo: 'ສັງເຄາະໄດ້ໜ້ອຍ ຍັງວັດບໍ່ໄດ້', en: 'Made in tiny amounts; not measured' },
  },
]

export const metalClassName: Record<MetalClass, L> = {
  metal: { lo: 'ໂລຫະ', en: 'Metal' },
  metalloid: { lo: 'ກຶ່ງໂລຫະ', en: 'Metalloid' },
  nonmetal: { lo: 'ອາໂລຫະ', en: 'Nonmetal' },
}
