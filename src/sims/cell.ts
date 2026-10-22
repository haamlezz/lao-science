// Pure data and rules for the `cell` simulation (b5-02). No React / three.
// Units: sizes in micrometres (um), solution strength in % NaCl (w/v).
// Simplified school model. Organelle names on the canvas are the Latin `label` strings.

export type CellType = 'animal' | 'plant' | 'bacterium'
export type OrganelleId =
  | 'nucleus'
  | 'mitochondrion'
  | 'ribosome'
  | 'er'
  | 'golgi'
  | 'chloroplast'
  | 'vacuole'
  | 'wall'
  | 'membrane'
  | 'nucleoid'

export interface Organelle {
  id: OrganelleId
  /** Short Latin-letter label for canvas sprites. */
  label: string
  name: { lo: string; en: string }
  fn: { lo: string; en: string }
  presentIn: Record<CellType, boolean>
  /** Typical size in um (diameter or length), order of magnitude only. */
  sizeUm: number
}

const yes = { animal: true, plant: true, bacterium: true }

export const ORGANELLES: readonly Organelle[] = [
  {
    id: 'membrane', label: 'Membrane', sizeUm: 0.007,
    name: { lo: 'ເຍື່ອຫຸ້ມຈຸລັງ', en: 'Cell membrane' },
    fn: { lo: 'ຄວບຄຸມທາດທີ່ເຂົ້າ-ອອກຈຸລັງ (ຜ່ານເລືອກສັນ)', en: 'Controls what enters and leaves the cell (selectively permeable)' },
    presentIn: yes,
  },
  {
    id: 'wall', label: 'Cell wall', sizeUm: 0.1,
    name: { lo: 'ຜະໜັງຈຸລັງ', en: 'Cell wall' },
    fn: { lo: 'ຄ້ຳຈຸນ ແລະ ປ້ອງກັນຈຸລັງ ບໍ່ໃຫ້ແຕກເມື່ອນ້ຳເຂົ້າ', en: 'Supports and protects the cell; stops it bursting when water enters' },
    presentIn: { animal: false, plant: true, bacterium: true },
  },
  {
    id: 'nucleus', label: 'Nucleus', sizeUm: 6,
    name: { lo: 'ນິວເຄຼຍ', en: 'Nucleus' },
    fn: { lo: 'ເກັບ DNA ແລະ ຄວບຄຸມກິດຈະກຳຂອງຈຸລັງ', en: 'Holds the DNA and controls the cell\'s activity' },
    presentIn: { animal: true, plant: true, bacterium: false },
  },
  {
    id: 'nucleoid', label: 'Nucleoid', sizeUm: 1,
    name: { lo: 'ນິວຄລີອອຍ (ບໍລິເວນ DNA ບໍ່ມີເຍື່ອຫຸ້ມ)', en: 'Nucleoid (DNA region, no membrane)' },
    fn: { lo: 'ເກັບ DNA ຂອງແບັກທີເຣຍ ໂດຍບໍ່ມີເຍື່ອຫຸ້ມ', en: 'Holds the bacterial DNA without a membrane around it' },
    presentIn: { animal: false, plant: false, bacterium: true },
  },
  {
    id: 'mitochondrion', label: 'Mitochondrion', sizeUm: 1.5,
    name: { lo: 'ໄມໂຕຄອນເດຣຍ', en: 'Mitochondrion' },
    fn: { lo: 'ຫາຍໃຈລະດັບຈຸລັງ ແລະ ຜະລິດພະລັງງານ (ATP)', en: 'Cellular respiration; makes energy (ATP)' },
    presentIn: { animal: true, plant: true, bacterium: false },
  },
  {
    id: 'ribosome', label: 'Ribosome', sizeUm: 0.025,
    name: { lo: 'ໄຣໂບໂຊມ', en: 'Ribosome' },
    fn: { lo: 'ສັງເຄາະໂປຣຕີນ', en: 'Builds protein' },
    presentIn: yes,
  },
  {
    id: 'er', label: 'ER', sizeUm: 0.1,
    name: { lo: 'ເອັນໂດພລາສມິກເຣຕິກູລຳ (ER)', en: 'Endoplasmic reticulum (ER)' },
    fn: { lo: 'ເສັ້ນທາງຂົນສົ່ງ ແລະ ປຸງແຕ່ງໂປຣຕີນ ແລະ ໄຂມັນ', en: 'Transport network; processes proteins and lipids' },
    presentIn: { animal: true, plant: true, bacterium: false },
  },
  {
    id: 'golgi', label: 'Golgi', sizeUm: 1,
    name: { lo: 'ກອນຈິບອດີ (Golgi)', en: 'Golgi apparatus' },
    fn: { lo: 'ຫຸ້ມຫໍ່ ແລະ ສົ່ງໂປຣຕີນອອກຈາກຈຸລັງ', en: 'Packages proteins and sends them out of the cell' },
    presentIn: { animal: true, plant: true, bacterium: false },
  },
  {
    id: 'chloroplast', label: 'Chloroplast', sizeUm: 5,
    name: { lo: 'ຄລໍໂຣພລາສ', en: 'Chloroplast' },
    fn: { lo: 'ສັງເຄາະດ້ວຍແສງ ສ້າງນ້ຳຕານ', en: 'Photosynthesis; makes sugar' },
    presentIn: { animal: false, plant: true, bacterium: false },
  },
  {
    id: 'vacuole', label: 'Large vacuole', sizeUm: 30,
    name: { lo: 'ວາກູໂອໃຫຍ່ກາງຈຸລັງ', en: 'Large central vacuole' },
    fn: { lo: 'ເກັບນ້ຳ ແລະ ທາດລະລາຍ ຮັກສາຄວາມແໜ້ນຂອງຈຸລັງ', en: 'Stores water and solutes; keeps the cell firm' },
    presentIn: { animal: false, plant: true, bacterium: false },
  },
]

/** Typical whole-cell diameter in um (illustrative). */
export const CELL_SIZE_UM: Record<CellType, number> = { animal: 20, plant: 50, bacterium: 2 }

export function organellesOf(cell: CellType): Organelle[] {
  return ORGANELLES.filter((o) => o.presentIn[cell])
}

export function getOrganelle(id: OrganelleId): Organelle {
  const o = ORGANELLES.find((x) => x.id === id)
  if (!o) throw new Error(`unknown organelle ${id}`)
  return o
}

/** Structures a plant cell has and an animal cell lacks. */
export function plantOnly(): Organelle[] {
  return ORGANELLES.filter((o) => o.presentIn.plant && !o.presentIn.animal)
}

// ---------- transport (osmosis) ----------

export type TransportCell = 'animal' | 'plant'
export type Solution = 'water' | 'saline09' | 'saline5'
export type Outcome = 'swells' | 'noNetMovement' | 'shrinks' | 'turgid' | 'plasmolysed'
export type WaterDirection = 'in' | 'out' | 'none'

/** Outside strength in % NaCl. */
export const SOLUTION_PERCENT: Record<Solution, number> = { water: 0, saline09: 0.9, saline5: 5 }
/** Effective solute strength inside the cell, as % NaCl equivalent (animal cell is isotonic with 0.9 %). */
export const INSIDE_PERCENT: Record<TransportCell, number> = { animal: 0.9, plant: 1.5 }

/** Osmosis: net water movement is toward the higher solute concentration. */
export function waterDirection(cell: TransportCell, solution: Solution): WaterDirection {
  const out = SOLUTION_PERCENT[solution]
  const inside = INSIDE_PERCENT[cell]
  if (Math.abs(out - inside) < 1e-9) return 'none'
  return out < inside ? 'in' : 'out'
}

/**
 * Outcome of putting the cell in the solution. Animal: swells (may burst) in pure water, shrinks
 * (crenation) in 5 %, no net change in 0.9 %. Plant: turgid when water enters (the wall stops bursting),
 * plasmolysed when water leaves.
 */
export function outcome(cell: TransportCell, solution: Solution): Outcome {
  const dir = waterDirection(cell, solution)
  if (cell === 'animal') return dir === 'in' ? 'swells' : dir === 'out' ? 'shrinks' : 'noNetMovement'
  return dir === 'out' ? 'plasmolysed' : 'turgid'
}

/** Can the cell burst? Only an animal cell in pure water (no wall to resist). */
export function mayBurst(cell: TransportCell, solution: Solution): boolean {
  return cell === 'animal' && outcome(cell, solution) === 'swells' && solution === 'water'
}

/**
 * Relative volume (1 = normal) after reaching the outcome; schematic values for the animation.
 * The plant protoplast is limited by the wall (max 1.0 of the wall volume), so turgid = 1.0.
 */
export function relativeVolume(cell: TransportCell, solution: Solution): number {
  const o = outcome(cell, solution)
  if (o === 'swells') return 1.4
  if (o === 'shrinks') return 0.7
  if (o === 'plasmolysed') return 0.6
  if (o === 'turgid') return 1.0
  return 1.0
}

// ---------- levels of organisation ----------

export const LEVELS = ['cell', 'tissue', 'organ', 'system', 'organism'] as const
