export type Category =
  | 'alkali'
  | 'alkaline'
  | 'transition'
  | 'postTransition'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble'
  | 'lanthanide'
  | 'actinide'

export type MatterState = 'solid' | 'liquid' | 'gas' | 'unknown'
export type MetalClass = 'metal' | 'metalloid' | 'nonmetal'

export interface PtElement {
  Z: number
  symbol: string
  name: string // English name (kept in English in both languages)
  mass: number // standard atomic weight, or mass number of the longest-lived isotope if radioactive
  massIsApprox: boolean // true: show in [brackets] (no stable isotope)
  shells: number[] // electrons per shell, K, L, M, ...
  category: Category
  state: MatterState // at room temperature (20 °C), 1 atm
  period: number
  group: number | null // null for lanthanides / actinides
  row: number // grid row (1-7 main body, 9-10 f-block)
  col: number // grid column (1-18)
}

// [Z, symbol, name, mass, shells]
const raw: [number, string, string, number, string][] = [
  [1, 'H', 'Hydrogen', 1.008, '1'],
  [2, 'He', 'Helium', 4.0026, '2'],
  [3, 'Li', 'Lithium', 6.94, '2-1'],
  [4, 'Be', 'Beryllium', 9.0122, '2-2'],
  [5, 'B', 'Boron', 10.81, '2-3'],
  [6, 'C', 'Carbon', 12.011, '2-4'],
  [7, 'N', 'Nitrogen', 14.007, '2-5'],
  [8, 'O', 'Oxygen', 15.999, '2-6'],
  [9, 'F', 'Fluorine', 18.998, '2-7'],
  [10, 'Ne', 'Neon', 20.18, '2-8'],
  [11, 'Na', 'Sodium', 22.99, '2-8-1'],
  [12, 'Mg', 'Magnesium', 24.305, '2-8-2'],
  [13, 'Al', 'Aluminium', 26.982, '2-8-3'],
  [14, 'Si', 'Silicon', 28.085, '2-8-4'],
  [15, 'P', 'Phosphorus', 30.974, '2-8-5'],
  [16, 'S', 'Sulfur', 32.06, '2-8-6'],
  [17, 'Cl', 'Chlorine', 35.45, '2-8-7'],
  [18, 'Ar', 'Argon', 39.948, '2-8-8'],
  [19, 'K', 'Potassium', 39.098, '2-8-8-1'],
  [20, 'Ca', 'Calcium', 40.078, '2-8-8-2'],
  [21, 'Sc', 'Scandium', 44.956, '2-8-9-2'],
  [22, 'Ti', 'Titanium', 47.867, '2-8-10-2'],
  [23, 'V', 'Vanadium', 50.942, '2-8-11-2'],
  [24, 'Cr', 'Chromium', 51.996, '2-8-13-1'],
  [25, 'Mn', 'Manganese', 54.938, '2-8-13-2'],
  [26, 'Fe', 'Iron', 55.845, '2-8-14-2'],
  [27, 'Co', 'Cobalt', 58.933, '2-8-15-2'],
  [28, 'Ni', 'Nickel', 58.693, '2-8-16-2'],
  [29, 'Cu', 'Copper', 63.546, '2-8-18-1'],
  [30, 'Zn', 'Zinc', 65.38, '2-8-18-2'],
  [31, 'Ga', 'Gallium', 69.723, '2-8-18-3'],
  [32, 'Ge', 'Germanium', 72.63, '2-8-18-4'],
  [33, 'As', 'Arsenic', 74.922, '2-8-18-5'],
  [34, 'Se', 'Selenium', 78.971, '2-8-18-6'],
  [35, 'Br', 'Bromine', 79.904, '2-8-18-7'],
  [36, 'Kr', 'Krypton', 83.798, '2-8-18-8'],
  [37, 'Rb', 'Rubidium', 85.468, '2-8-18-8-1'],
  [38, 'Sr', 'Strontium', 87.62, '2-8-18-8-2'],
  [39, 'Y', 'Yttrium', 88.906, '2-8-18-9-2'],
  [40, 'Zr', 'Zirconium', 91.224, '2-8-18-10-2'],
  [41, 'Nb', 'Niobium', 92.906, '2-8-18-12-1'],
  [42, 'Mo', 'Molybdenum', 95.95, '2-8-18-13-1'],
  [43, 'Tc', 'Technetium', 98, '2-8-18-13-2'],
  [44, 'Ru', 'Ruthenium', 101.07, '2-8-18-15-1'],
  [45, 'Rh', 'Rhodium', 102.91, '2-8-18-16-1'],
  [46, 'Pd', 'Palladium', 106.42, '2-8-18-18'],
  [47, 'Ag', 'Silver', 107.87, '2-8-18-18-1'],
  [48, 'Cd', 'Cadmium', 112.41, '2-8-18-18-2'],
  [49, 'In', 'Indium', 114.82, '2-8-18-18-3'],
  [50, 'Sn', 'Tin', 118.71, '2-8-18-18-4'],
  [51, 'Sb', 'Antimony', 121.76, '2-8-18-18-5'],
  [52, 'Te', 'Tellurium', 127.6, '2-8-18-18-6'],
  [53, 'I', 'Iodine', 126.9, '2-8-18-18-7'],
  [54, 'Xe', 'Xenon', 131.29, '2-8-18-18-8'],
  [55, 'Cs', 'Caesium', 132.91, '2-8-18-18-8-1'],
  [56, 'Ba', 'Barium', 137.33, '2-8-18-18-8-2'],
  [57, 'La', 'Lanthanum', 138.91, '2-8-18-18-9-2'],
  [58, 'Ce', 'Cerium', 140.12, '2-8-18-19-9-2'],
  [59, 'Pr', 'Praseodymium', 140.91, '2-8-18-21-8-2'],
  [60, 'Nd', 'Neodymium', 144.24, '2-8-18-22-8-2'],
  [61, 'Pm', 'Promethium', 145, '2-8-18-23-8-2'],
  [62, 'Sm', 'Samarium', 150.36, '2-8-18-24-8-2'],
  [63, 'Eu', 'Europium', 151.96, '2-8-18-25-8-2'],
  [64, 'Gd', 'Gadolinium', 157.25, '2-8-18-25-9-2'],
  [65, 'Tb', 'Terbium', 158.93, '2-8-18-27-8-2'],
  [66, 'Dy', 'Dysprosium', 162.5, '2-8-18-28-8-2'],
  [67, 'Ho', 'Holmium', 164.93, '2-8-18-29-8-2'],
  [68, 'Er', 'Erbium', 167.26, '2-8-18-30-8-2'],
  [69, 'Tm', 'Thulium', 168.93, '2-8-18-31-8-2'],
  [70, 'Yb', 'Ytterbium', 173.05, '2-8-18-32-8-2'],
  [71, 'Lu', 'Lutetium', 174.97, '2-8-18-32-9-2'],
  [72, 'Hf', 'Hafnium', 178.49, '2-8-18-32-10-2'],
  [73, 'Ta', 'Tantalum', 180.95, '2-8-18-32-11-2'],
  [74, 'W', 'Tungsten', 183.84, '2-8-18-32-12-2'],
  [75, 'Re', 'Rhenium', 186.21, '2-8-18-32-13-2'],
  [76, 'Os', 'Osmium', 190.23, '2-8-18-32-14-2'],
  [77, 'Ir', 'Iridium', 192.22, '2-8-18-32-15-2'],
  [78, 'Pt', 'Platinum', 195.08, '2-8-18-32-17-1'],
  [79, 'Au', 'Gold', 196.97, '2-8-18-32-18-1'],
  [80, 'Hg', 'Mercury', 200.59, '2-8-18-32-18-2'],
  [81, 'Tl', 'Thallium', 204.38, '2-8-18-32-18-3'],
  [82, 'Pb', 'Lead', 207.2, '2-8-18-32-18-4'],
  [83, 'Bi', 'Bismuth', 208.98, '2-8-18-32-18-5'],
  [84, 'Po', 'Polonium', 209, '2-8-18-32-18-6'],
  [85, 'At', 'Astatine', 210, '2-8-18-32-18-7'],
  [86, 'Rn', 'Radon', 222, '2-8-18-32-18-8'],
  [87, 'Fr', 'Francium', 223, '2-8-18-32-18-8-1'],
  [88, 'Ra', 'Radium', 226, '2-8-18-32-18-8-2'],
  [89, 'Ac', 'Actinium', 227, '2-8-18-32-18-9-2'],
  [90, 'Th', 'Thorium', 232.04, '2-8-18-32-18-10-2'],
  [91, 'Pa', 'Protactinium', 231.04, '2-8-18-32-20-9-2'],
  [92, 'U', 'Uranium', 238.03, '2-8-18-32-21-9-2'],
  [93, 'Np', 'Neptunium', 237, '2-8-18-32-22-9-2'],
  [94, 'Pu', 'Plutonium', 244, '2-8-18-32-24-8-2'],
  [95, 'Am', 'Americium', 243, '2-8-18-32-25-8-2'],
  [96, 'Cm', 'Curium', 247, '2-8-18-32-25-9-2'],
  [97, 'Bk', 'Berkelium', 247, '2-8-18-32-27-8-2'],
  [98, 'Cf', 'Californium', 251, '2-8-18-32-28-8-2'],
  [99, 'Es', 'Einsteinium', 252, '2-8-18-32-29-8-2'],
  [100, 'Fm', 'Fermium', 257, '2-8-18-32-30-8-2'],
  [101, 'Md', 'Mendelevium', 258, '2-8-18-32-31-8-2'],
  [102, 'No', 'Nobelium', 259, '2-8-18-32-32-8-2'],
  [103, 'Lr', 'Lawrencium', 266, '2-8-18-32-32-8-3'],
  [104, 'Rf', 'Rutherfordium', 267, '2-8-18-32-32-10-2'],
  [105, 'Db', 'Dubnium', 268, '2-8-18-32-32-11-2'],
  [106, 'Sg', 'Seaborgium', 269, '2-8-18-32-32-12-2'],
  [107, 'Bh', 'Bohrium', 270, '2-8-18-32-32-13-2'],
  [108, 'Hs', 'Hassium', 277, '2-8-18-32-32-14-2'],
  [109, 'Mt', 'Meitnerium', 278, '2-8-18-32-32-15-2'],
  [110, 'Ds', 'Darmstadtium', 281, '2-8-18-32-32-16-2'],
  [111, 'Rg', 'Roentgenium', 282, '2-8-18-32-32-17-2'],
  [112, 'Cn', 'Copernicium', 285, '2-8-18-32-32-18-2'],
  [113, 'Nh', 'Nihonium', 286, '2-8-18-32-32-18-3'],
  [114, 'Fl', 'Flerovium', 289, '2-8-18-32-32-18-4'],
  [115, 'Mc', 'Moscovium', 290, '2-8-18-32-32-18-5'],
  [116, 'Lv', 'Livermorium', 293, '2-8-18-32-32-18-6'],
  [117, 'Ts', 'Tennessine', 294, '2-8-18-32-32-18-7'],
  [118, 'Og', 'Oganesson', 294, '2-8-18-32-32-18-8'],
]

const inSet = (...zs: number[]) => new Set(zs)
const NONMETAL = inSet(1, 6, 7, 8, 15, 16, 34)
const NOBLE = inSet(2, 10, 18, 36, 54, 86, 118)
const HALOGEN = inSet(9, 17, 35, 53, 85, 117)
const ALKALI = inSet(3, 11, 19, 37, 55, 87)
const ALKALINE = inSet(4, 12, 20, 38, 56, 88)
const METALLOID = inSet(5, 14, 32, 33, 51, 52)
const POST = inSet(13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116)
const GAS = inSet(1, 2, 7, 8, 9, 10, 17, 18, 36, 54, 86)
const LIQUID = inSet(35, 80)

function categoryOf(Z: number): Category {
  if (NONMETAL.has(Z)) return 'nonmetal'
  if (NOBLE.has(Z)) return 'noble'
  if (HALOGEN.has(Z)) return 'halogen'
  if (ALKALI.has(Z)) return 'alkali'
  if (ALKALINE.has(Z)) return 'alkaline'
  if (METALLOID.has(Z)) return 'metalloid'
  if (POST.has(Z)) return 'postTransition'
  if (Z >= 57 && Z <= 71) return 'lanthanide'
  if (Z >= 89 && Z <= 103) return 'actinide'
  return 'transition'
}

function stateOf(Z: number): MatterState {
  if (GAS.has(Z)) return 'gas'
  if (LIQUID.has(Z)) return 'liquid'
  return Z >= 104 || Z === 85 ? 'unknown' : 'solid' // At and Z >= 104: not measured
}

/** Grid cell (row 1-7 main body, rows 9-10 for lanthanides/actinides) and IUPAC group. */
function place(Z: number): { period: number; group: number | null; row: number; col: number } {
  if (Z === 1) return { period: 1, group: 1, row: 1, col: 1 }
  if (Z === 2) return { period: 1, group: 18, row: 1, col: 18 }
  const periodStart: [number, number, number][] = [
    // [first Z of s-block, period, Z that begins the d/p row after the s-block]
    [3, 2, 5],
    [11, 3, 13],
  ]
  for (const [z0, period, zp] of periodStart) {
    if (Z >= z0 && Z < z0 + 8) {
      const group = Z < zp ? Z - z0 + 1 : Z - zp + 13
      return { period, group, row: period, col: group }
    }
  }
  if (Z >= 19 && Z <= 36) return { period: 4, group: Z - 18, row: 4, col: Z - 18 }
  if (Z >= 37 && Z <= 54) return { period: 5, group: Z - 36, row: 5, col: Z - 36 }
  if (Z === 55 || Z === 56) return { period: 6, group: Z - 54, row: 6, col: Z - 54 }
  // La and Ac sit in group-3 cells of the main body; the f-block rows hold Ce–Lu and Th–Lr.
  if (Z === 57) return { period: 6, group: null, row: 6, col: 3 }
  if (Z >= 58 && Z <= 71) return { period: 6, group: null, row: 9, col: Z - 54 }
  if (Z >= 72 && Z <= 86) return { period: 6, group: Z - 68, row: 6, col: Z - 68 }
  if (Z === 87 || Z === 88) return { period: 7, group: Z - 86, row: 7, col: Z - 86 }
  if (Z === 89) return { period: 7, group: null, row: 7, col: 3 }
  if (Z >= 90 && Z <= 103) return { period: 7, group: null, row: 10, col: Z - 86 }
  return { period: 7, group: Z - 100, row: 7, col: Z - 100 }
}

export const ptElements: PtElement[] = raw.map(([Z, symbol, name, mass, shells]) => ({
  Z,
  symbol,
  name,
  mass,
  massIsApprox: Z === 43 || Z === 61 || (Z >= 84 && Z !== 90 && Z !== 91 && Z !== 92),
  shells: shells.split('-').map(Number),
  category: categoryOf(Z),
  state: stateOf(Z),
  ...place(Z),
}))

export function metalClassOf(c: Category): MetalClass {
  if (c === 'metalloid') return 'metalloid'
  if (c === 'nonmetal' || c === 'halogen' || c === 'noble') return 'nonmetal'
  return 'metal'
}
