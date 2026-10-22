// Pure model for the `photosynthesis` simulation (m1-08). No React / three.
// Qualitative limiting-factor model: every factor is a level 0..3 and the rate is the smallest level
// (the "limiting factor"), multiplied by chlorophyll (0 for a white / variegated leaf).

export type Level = 0 | 1 | 2 | 3
export type Co2Setting = 'low' | 'normal' | 'high'
export type WaterSetting = 'dry' | 'normal'
export type Factor = 'light' | 'co2' | 'water' | 'temperature' | 'chlorophyll'

export const EQUATION = '6CO2 + 6H2O --(light)--> C6H12O6 + 6O2'
export const BUBBLES_PER_RATE = 10 // O2 bubbles / min per rate level

export interface PhotoParams {
  light: Level // 0 dark .. 3 bright
  co2: Co2Setting
  water: WaterSetting
  chlorophyll: boolean // true = green leaf, false = white / variegated leaf
  temperatureC?: number // optional; when omitted temperature never limits
}

export interface PhotoResult {
  rate: Level // 0..3
  o2PerMin: number // 0, 10, 20 or 30
  limiting: Factor | null // null when rate is 3 and nothing limits
  limitingAll: Factor[] // every factor tied for the lowest level (order: light, co2, water, temperature)
  producesGlucose: boolean // glucose and O2 appear only when rate > 0
  levels: Record<'light' | 'co2' | 'water' | 'temperature', Level>
}

export const co2Level = (c: Co2Setting): Level => (c === 'low' ? 1 : c === 'normal' ? 2 : 3)
export const waterLevel = (w: WaterSetting): Level => (w === 'dry' ? 0 : 3)

/** Temperature (°C) -> level. Enzymes work best 25-35 °C and stop near freezing or above 45 °C. */
export function temperatureLevel(tC: number): Level {
  if (tC <= 5 || tC > 45) return 0
  if (tC < 15 || tC > 40) return 1
  if (tC < 25 || tC > 35) return 2
  return 3
}

const ORDER = ['light', 'co2', 'water', 'temperature'] as const

export function photosynthesis(p: PhotoParams): PhotoResult {
  const levels = {
    light: p.light,
    co2: co2Level(p.co2),
    water: waterLevel(p.water),
    temperature: p.temperatureC === undefined ? (3 as Level) : temperatureLevel(p.temperatureC),
  }
  const min = Math.min(levels.light, levels.co2, levels.water, levels.temperature) as Level
  const rate = (p.chlorophyll ? min : 0) as Level
  let limitingAll: Factor[] = ORDER.filter((f) => levels[f] === min)
  let limiting: Factor | null = limitingAll[0] ?? null
  if (!p.chlorophyll) {
    limiting = 'chlorophyll'
    // A missing prerequisite makes every other factor irrelevant.
    limitingAll = ['chlorophyll']
  } else if (min === 3) {
    limiting = null
    limitingAll = []
  }
  return {
    rate,
    o2PerMin: BUBBLES_PER_RATE * rate,
    limiting,
    limitingAll,
    producesGlucose: rate > 0,
    levels,
  }
}
