export interface Element {
  Z: number
  symbol: string
  name: string // English name (kept in English in both languages)
  A: number // mass number of the most abundant isotope
}

export const elements: Element[] = [
  { Z: 1, symbol: 'H', name: 'Hydrogen', A: 1 },
  { Z: 2, symbol: 'He', name: 'Helium', A: 4 },
  { Z: 3, symbol: 'Li', name: 'Lithium', A: 7 },
  { Z: 4, symbol: 'Be', name: 'Beryllium', A: 9 },
  { Z: 5, symbol: 'B', name: 'Boron', A: 11 },
  { Z: 6, symbol: 'C', name: 'Carbon', A: 12 },
  { Z: 7, symbol: 'N', name: 'Nitrogen', A: 14 },
  { Z: 8, symbol: 'O', name: 'Oxygen', A: 16 },
  { Z: 9, symbol: 'F', name: 'Fluorine', A: 19 },
  { Z: 10, symbol: 'Ne', name: 'Neon', A: 20 },
  { Z: 11, symbol: 'Na', name: 'Sodium', A: 23 },
  { Z: 12, symbol: 'Mg', name: 'Magnesium', A: 24 },
  { Z: 13, symbol: 'Al', name: 'Aluminium', A: 27 },
  { Z: 14, symbol: 'Si', name: 'Silicon', A: 28 },
  { Z: 15, symbol: 'P', name: 'Phosphorus', A: 31 },
  { Z: 16, symbol: 'S', name: 'Sulfur', A: 32 },
  { Z: 17, symbol: 'Cl', name: 'Chlorine', A: 35 },
  { Z: 18, symbol: 'Ar', name: 'Argon', A: 40 },
]

/** Electron arrangement for Z <= 18 (shells K, L, M fill 2, 8, 8). */
export function shellCounts(Z: number): number[] {
  const k = Math.min(Z, 2)
  const l = Math.min(Math.max(Z - 2, 0), 8)
  const m = Math.min(Math.max(Z - 10, 0), 8)
  return [k, l, m].filter((n) => n > 0)
}
