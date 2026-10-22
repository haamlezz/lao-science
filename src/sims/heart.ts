// Pure formulas for the `heart` simulation (b6-02). No React / three.
// Units: heart rate in beats per minute (bpm), times in seconds, stroke volume in mL,
// cardiac output in L/min. Simplified and NOT to scale: durations are illustrative.
// Model per cycle of length T = 60/HR, starting at the beginning of ventricular systole:
//   [0, ts)        ventricular systole (both ventricles contract together)
//   [ts, T - ta)   diastole (all chambers relaxed, filling)
//   [T - ta, T)    atrial systole (top-up of the ventricles)
// ts = 0.3 * sqrt(T / 0.8) (spec, illustrative), ta = 0.1 * sqrt(T / 0.8) (assumed, illustrative).

export const HR_RANGE = { min: 40, max: 180, step: 1 } as const
export const SV_RANGE = { min: 50, max: 120, step: 5 } as const
export const INITIAL = { heartRate: 70, strokeVolume: 70 } as const
export const PRESETS = { rest: 70, walking: 100, running: 150 } as const
/** Resting adult range shown as a note in the UI. */
export const RESTING_HR = { min: 60, max: 100 } as const

export type Phase = 'ventricularSystole' | 'diastole' | 'atrialSystole'
export type Chamber = 'RA' | 'RV' | 'LA' | 'LV'
export type ValveState = 'open' | 'closed'

/** Cycle length T = 60 / HR (s). */
export function cycleLength(heartRate: number): number {
  return 60 / heartRate
}

/** Ventricular systole duration ts = 0.3 * sqrt(T / 0.8) (s). */
export function systoleDuration(heartRate: number): number {
  return 0.3 * Math.sqrt(cycleLength(heartRate) / 0.8)
}

/** Atrial systole duration ta = 0.1 * sqrt(T / 0.8) (s). */
export function atrialSystoleDuration(heartRate: number): number {
  return 0.1 * Math.sqrt(cycleLength(heartRate) / 0.8)
}

/** Diastole duration = T - ts (s); includes the final atrial systole (the ventricles are relaxed). */
export function diastoleDuration(heartRate: number): number {
  return cycleLength(heartRate) - systoleDuration(heartRate)
}

/** Cardiac output = HR x SV, in L/min (SV in mL). */
export function cardiacOutput(heartRate: number, strokeVolumeMl: number): number {
  return (heartRate * strokeVolumeMl) / 1000
}

/** Phase at time t (s, any t >= 0; wraps every cycle). */
export function phaseAt(heartRate: number, t: number): Phase {
  const period = cycleLength(heartRate)
  const x = ((t % period) + period) % period
  if (x < systoleDuration(heartRate)) return 'ventricularSystole'
  if (x >= period - atrialSystoleDuration(heartRate)) return 'atrialSystole'
  return 'diastole'
}

export interface HeartState {
  phase: Phase
  contracting: Record<Chamber, boolean>
  /** Valves between atria and ventricles (tricuspid right, mitral left): one-way, open when filling. */
  atrioventricular: ValveState
  /** Valves at the pulmonary artery and aorta: open only while the ventricles contract. */
  semilunar: ValveState
}

/** Chamber and valve states in a phase. Both ventricles (and both atria) always act together. */
export function stateOf(phase: Phase): HeartState {
  const vs = phase === 'ventricularSystole'
  const as = phase === 'atrialSystole'
  return {
    phase,
    contracting: { RA: as, LA: as, RV: vs, LV: vs },
    atrioventricular: vs ? 'closed' : 'open',
    semilunar: vs ? 'open' : 'closed',
  }
}

export function stateAt(heartRate: number, t: number): HeartState {
  return stateOf(phaseAt(heartRate, t))
}

export interface FlowStep {
  from: string
  to: string
  /** Oxygen content of the blood on this step. */
  blood: 'oxygen-rich' | 'oxygen-poor'
  /** Label of the structure (Latin abbreviations as drawn on the canvas). */
  label: string
}

/**
 * Blood path through the four chambers and both circuits. Right side: oxygen-poor blood to the lungs
 * (pulmonary circuit); left side: oxygen-rich blood to the body (systemic circuit).
 */
export const FLOW_PATH: readonly FlowStep[] = [
  { from: 'body', to: 'RA', blood: 'oxygen-poor', label: 'VC' },
  { from: 'RA', to: 'RV', blood: 'oxygen-poor', label: 'tricuspid valve' },
  { from: 'RV', to: 'lungs', blood: 'oxygen-poor', label: 'PA' },
  { from: 'lungs', to: 'LA', blood: 'oxygen-rich', label: 'PV' },
  { from: 'LA', to: 'LV', blood: 'oxygen-rich', label: 'mitral valve' },
  { from: 'LV', to: 'body', blood: 'oxygen-rich', label: 'Ao' },
]

/** Which side a chamber is on and the blood it holds. */
export function chamberBlood(c: Chamber): 'oxygen-rich' | 'oxygen-poor' {
  return c === 'LA' || c === 'LV' ? 'oxygen-rich' : 'oxygen-poor'
}
