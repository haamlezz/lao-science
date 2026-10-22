// Periodic trend data. REVIEW: common textbook values, approximate; sources differ by a few percent.
// Atomic radius: empirical, pm. IE1: first ionisation energy, kJ/mol. EN: Pauling scale.
// Noble gases have no electronegativity ("no data"); radius is not given for them either.

export interface TrendRow {
  symbol: string
  radius?: number // pm
  ie1?: number // kJ/mol
  en?: number // Pauling
}

export const TRENDS: TrendRow[] = [
  { symbol: 'Li', radius: 145, ie1: 520, en: 0.98 },
  { symbol: 'Be', radius: 105, ie1: 900, en: 1.57 },
  { symbol: 'B', radius: 85, ie1: 801, en: 2.04 },
  { symbol: 'C', radius: 70, ie1: 1086, en: 2.55 },
  { symbol: 'N', radius: 65, ie1: 1402, en: 3.04 },
  { symbol: 'O', radius: 60, ie1: 1314, en: 3.44 },
  { symbol: 'F', radius: 50, ie1: 1681, en: 3.98 },
  { symbol: 'Ne', ie1: 2081 },
  { symbol: 'Na', radius: 180, ie1: 496, en: 0.93 },
  { symbol: 'Mg', radius: 150, ie1: 738, en: 1.31 },
  { symbol: 'Al', radius: 125, ie1: 578, en: 1.61 },
  { symbol: 'Si', radius: 110, ie1: 787, en: 1.9 },
  { symbol: 'P', radius: 100, ie1: 1012, en: 2.19 },
  { symbol: 'S', radius: 100, ie1: 1000, en: 2.58 },
  { symbol: 'Cl', radius: 100, ie1: 1251, en: 3.16 },
  { symbol: 'Ar', ie1: 1521 },
  { symbol: 'K', radius: 220, ie1: 419, en: 0.82 },
  { symbol: 'Rb', radius: 235, ie1: 403, en: 0.82 },
  { symbol: 'Cs', radius: 260, ie1: 376, en: 0.79 },
  { symbol: 'Br', radius: 115, ie1: 1140, en: 2.96 },
  { symbol: 'I', radius: 140, ie1: 1008, en: 2.66 },
]
