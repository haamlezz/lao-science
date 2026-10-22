import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  R,
  STP_MOLAR_VOLUME_L,
  ATM_PA,
  ZERO_C_IN_K,
  boylePressure,
  charlesVolume,
  gayLussacPressure,
  kelvinToCelsius,
  molarVolumeL,
  pressureKPa,
} from '../../sims/gaslaw'
import type { GasLaw } from '../../sims/gaslaw'
import { ChemPlot } from './ChemPlot'
import type { PlotLine } from './ChemPlot'
import { GAS_COLORS, GasLawScene } from './GasLawScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface GasState {
  law: GasLaw
  v: number // L
  t: number // K
  n: number // mol (free mode only)
}

const REF = { n: 0.1, tK: 300, vL: 2 } as const
const P_REF = pressureKPa(REF.n, REF.tK, REF.vL) // 124.7 kPa
const INITIAL: GasState = { law: 'boyle', v: REF.vL, t: REF.tK, n: REF.n }

const LAWS: { value: GasLaw; key: UiKey }[] = [
  { value: 'boyle', key: 'glBoyle' },
  { value: 'charles', key: 'glCharles' },
  { value: 'gaylussac', key: 'glGayLussac' },
  { value: 'free', key: 'glFree' },
]

/** Effective state of the gas: the constant quantity is fixed, the others follow the law from the reference state. */
function derive(s: GasState) {
  switch (s.law) {
    case 'boyle':
      return { n: REF.n, tK: REF.tK, vL: s.v, pKPa: boylePressure(P_REF, REF.vL, s.v) }
    case 'charles':
      return { n: REF.n, tK: s.t, vL: charlesVolume(REF.vL, REF.tK, s.t), pKPa: P_REF }
    case 'gaylussac':
      return { n: REF.n, tK: s.t, vL: REF.vL, pKPa: gayLussacPressure(P_REF, REF.tK, s.t) }
    case 'free':
      return { n: s.n, tK: s.t, vL: s.v, pKPa: pressureKPa(s.n, s.t, s.v) }
  }
}

function GasControls({ state, set }: { state: GasState; set: (p: Partial<GasState>) => void }) {
  const { t } = useLang()
  const d = derive(state)
  const vFree = state.law === 'boyle' || state.law === 'free'
  const tFree = state.law !== 'boyle'
  return (
    <>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('glLaw')}</span>
          <Seg<GasLaw>
            label={t('glLaw')}
            value={state.law}
            onChange={(law) => set({ law, v: INITIAL.v, t: INITIAL.t, n: INITIAL.n })}
            options={LAWS.map((l) => ({ value: l.value, label: t(l.key) }))}
          />
        </div>
      </div>
      <div className="m2-grid">
        <Slider
          label={t('glVolume')}
          value={Math.min(Math.max(d.vL, 1), 5)}
          min={1}
          max={5}
          step={0.5}
          display={`${d.vL.toFixed(2)} L`}
          disabled={!vFree}
          onChange={(v) => set({ v })}
        />
        <Slider
          label={t('glTemp')}
          value={d.tK}
          min={200}
          max={600}
          step={20}
          display={`${d.tK} K (${kelvinToCelsius(d.tK).toFixed(0)} °C)`}
          disabled={!tFree}
          onChange={(tk) => set({ t: tk })}
        />
        {state.law === 'free' && (
          <Slider
            label={t('glAmount')}
            value={state.n}
            min={0.05}
            max={0.2}
            step={0.05}
            display={`${state.n.toFixed(3)} mol`}
            onChange={(n) => set({ n })}
          />
        )}
      </div>
    </>
  )
}

const range = (a: number, b: number, n: number): number[] => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n)

function GasGraph({ s }: { s: GasState }) {
  const { t } = useLang()
  const d = derive(s)
  let lines: PlotLine[]
  let dot: { x: number; y: number }
  let cfg: { title: string; xl: string; yl: string; x: [number, number]; y: [number, number]; xt: number[]; yt: number[] }
  if (s.law === 'charles') {
    cfg = { title: t('glGraphVT'), xl: 'T (K)', yl: 'V (L)', x: [0, 600], y: [0, 5], xt: [0, 200, 400, 600], yt: [0, 1, 2, 3, 4, 5] }
    // the law needs T > 0 K; the line is drawn right down to (almost) absolute zero
    const f = (tk: number): [number, number] => [tk, charlesVolume(REF.vL, REF.tK, Math.max(tk, 0.001))]
    lines = [
      { pts: range(0, 200, 8).map(f), cls: 'mo-future' }, // extrapolation towards 0 K
      { pts: range(200, 600, 20).map(f), cls: 'mo-live' },
    ]
    dot = { x: d.tK, y: d.vL }
  } else if (s.law === 'gaylussac') {
    cfg = { title: t('glGraphPT'), xl: 'T (K)', yl: 'p (kPa)', x: [0, 600], y: [0, 300], xt: [0, 200, 400, 600], yt: [0, 100, 200, 300] }
    lines = [{ pts: range(200, 600, 20).map((tk) => [tk, gayLussacPressure(P_REF, REF.tK, tk)] as [number, number]), cls: 'mo-live' }]
    dot = { x: d.tK, y: d.pKPa }
  } else {
    const free = s.law === 'free'
    cfg = {
      title: t('glGraphPV'),
      xl: 'V (L)',
      yl: 'p (kPa)',
      x: [0, 5],
      y: free ? [0, 1000] : [0, 300],
      xt: [0, 1, 2, 3, 4, 5],
      yt: free ? [0, 250, 500, 750, 1000] : [0, 100, 200, 300],
    }
    lines = [{ pts: range(0.8, 5, 42).map((v) => [v, pressureKPa(d.n, d.tK, v)] as [number, number]), cls: 'mo-live' }]
    dot = { x: d.vL, y: d.pKPa }
  }
  return (
    <ChemPlot
      title={cfg.title}
      xLabel={cfg.xl}
      yLabel={cfg.yl}
      x={cfg.x}
      y={cfg.y}
      xTicks={cfg.xt}
      yTicks={cfg.yt}
      lines={lines}
      dots={[dot]}
      note={s.law === 'charles' ? t('glExtrap') : undefined}
    />
  )
}

const HELD: Record<GasLaw, UiKey> = { boyle: 'glHeldT', charles: 'glHeldP', gaylussac: 'glHeldV', free: 'glHeldN' }
const FORMULA: Record<GasLaw, string> = {
  boyle: 'p₁V₁ = p₂V₂',
  charles: 'V₁/T₁ = V₂/T₂',
  gaylussac: 'p₁/T₁ = p₂/T₂',
  free: 'pV = nRT',
}

function GasReadout({ s, t }: { s: GasState; t: (k: UiKey) => string }) {
  const d = derive(s)
  const heldValue =
    s.law === 'boyle' ? `T = ${REF.tK} K` : s.law === 'charles' ? `p = ${P_REF.toFixed(1)} kPa` : s.law === 'gaylussac' ? `V = ${REF.vL.toFixed(2)} L` : `n = ${s.n.toFixed(3)} mol`
  const vm = molarVolumeL(ZERO_C_IN_K, ATM_PA / 1000)
  return (
    <div className="mo-readout">
      <div className="m2-result" aria-live="polite">
        <strong>
          {t(HELD[s.law])}: <span data-testid="gl-held">{heldValue}</span> · {FORMULA[s.law]}
        </strong>
        <span>
          p = nRT/V = {d.n.toFixed(3)} × {R} × {d.tK} / {d.vL.toFixed(2)} → p = <b data-testid="gl-p">{d.pKPa.toFixed(1)} kPa</b>
        </span>
        <span>
          V = <b data-testid="gl-V">{d.vL.toFixed(2)} L</b> · T = <b data-testid="gl-T">{d.tK} K</b> ({kelvinToCelsius(d.tK).toFixed(0)} °C)
        </span>
        <span className="faint">
          {t('glStp')}: V<sub>m</sub> = {vm.toFixed(1)} L/mol ({STP_MOLAR_VOLUME_L} L/mol, {t('glSchool')})
        </span>
      </div>
      <GasGraph s={s} />
    </div>
  )
}

const def: SimDef<GasState> = {
  initial: INITIAL,
  camera: { camZ: 10.5, zoom2D: 44 },
  notToScale: true,
  Scene: ({ state: s }) => {
    const d = derive(s)
    return <GasLawScene vL={d.vL} tK={d.tK} nMol={d.n} pKPa={d.pKPa} />
  },
  Controls: GasControls,
  legend: (_s, t) => [
    { color: GAS_COLORS.particle, label: t('glLegendParticle') },
    { color: GAS_COLORS.hit, label: t('glLegendHit') },
    { color: GAS_COLORS.piston, label: t('glLegendPiston') },
  ],
  readout: (s, t) => <GasReadout s={s} t={t} />,
}

export default makeSimHost(def)
