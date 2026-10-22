import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import { ALPHA, BETA_ALCOHOL, EXAGGERATION, START_C, cToK, reading } from '../../sims/thermal'
import type { Solid } from '../../sims/thermal'
import { THERMAL_COLORS, ThermalScene } from './ThermalScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface ThermalState {
  material: Solid
  tC: number
}

const MATERIALS: { value: Solid; key: UiKey }[] = [
  { value: 'steel', key: 'thSteel' },
  { value: 'aluminium', key: 'thAluminium' },
  { value: 'copper', key: 'thCopper' },
]

const sign = (n: number, d: number) => `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(d)}`
const kelvin = (c: number) => Math.round(cToK(c))

function ThermalControls({ state, set }: { state: ThermalState; set: (p: Partial<ThermalState>) => void }) {
  const { t } = useLang()
  return (
    <div className="m2-grid">
      <Slider
        label={t('thTemp')}
        value={state.tC}
        min={0}
        max={100}
        step={5}
        display={`${state.tC} °C`}
        onChange={(tC) => set({ tC })}
      />
      <div className="m2-slider">
        <span>{t('thMaterial')}</span>
        <Seg<Solid>
          label={t('thMaterial')}
          value={state.material}
          onChange={(material) => set({ material })}
          options={MATERIALS.map((m) => ({ value: m.value, label: t(m.key) }))}
        />
      </div>
    </div>
  )
}

const def: SimDef<ThermalState> = {
  initial: { material: 'steel', tC: START_C },
  camera: { camZ: 14, zoom2D: 50 },
  notToScale: true,
  Scene: ({ state: s }) => {
    const r = reading(s.material, s.tC)
    return (
      <ThermalScene
        material={s.material}
        tC={s.tC}
        barMm={r.barExpansionMm}
        liquidFraction={r.liquidFraction}
        gasRatio={r.gasRatio}
      />
    )
  },
  Controls: ThermalControls,
  legend: (_s, t) => [
    { color: THERMAL_COLORS.solid, label: t('thSolid') },
    { color: THERMAL_COLORS.liquid, label: t('thLiquid') },
    { color: THERMAL_COLORS.gas, label: t('thGas') },
  ],
  readout: (s, t) => {
    const r = reading(s.material, s.tC)
    const alpha = ALPHA[s.material] * 1e6
    return (
      <div className="m2-result" aria-live="polite">
        <strong data-testid="th-bar">
          {t('thBar')}: ΔL = α × L₀ × ΔT = {alpha} × 10⁻⁶ × 1 × {r.deltaT} = {sign(r.barExpansionMm, 2)} mm
        </strong>
        <span data-testid="th-liquid">
          {t('thLiquidRead')}: ΔV ÷ V₀ = β × ΔT = {BETA_ALCOHOL * 1000} × 10⁻³ × {r.deltaT} = {sign(r.liquidFraction * 100, 1)} %
        </span>
        <span data-testid="th-gas">
          {t('thGasRead')}: V ÷ V₀ = T ÷ T₀ = {kelvin(s.tC)} ÷ {kelvin(START_C)} = {r.gasRatio.toFixed(2)}
        </span>
        <span className="faint">
          {t('thExaggerated')} (×{EXAGGERATION}) · {t('thOrder')}
        </span>
      </div>
    )
  },
}

export default makeSimHost(def)
