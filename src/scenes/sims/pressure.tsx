import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import { LiquidScene, SolidScene, MAX_DEPTH, PRESSURE_COLOR } from '../PressureScene'
import { AREA_BIG_CM2, AREA_SMALL_CM2, G, LIQUID_DENSITY, formatPa, liquidPressure, solidPressure } from '../../sims/pressure'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface PressureState {
  solid: boolean
  force: number
  big: boolean
  depth: number
  rho: number
}

const LIQUIDS: { key: UiKey; rho: number }[] = [
  { key: 'pWater', rho: LIQUID_DENSITY.water },
  { key: 'pSea', rho: LIQUID_DENSITY.sea },
  { key: 'pOil', rho: LIQUID_DENSITY.oil },
]

const areaOf = (s: PressureState) => (s.big ? AREA_BIG_CM2 : AREA_SMALL_CM2)

function PressureControls({ state, set }: { state: PressureState; set: (p: Partial<PressureState>) => void }) {
  const { t } = useLang()
  const { solid, force, big, depth, rho } = state
  const areaCm2 = areaOf(state)
  return (
    <>
      <div className="ctl-row">
        <Seg
          value={solid}
          onChange={(v) => set({ solid: v })}
          options={[
            { value: true, label: t('pTabSolid') },
            { value: false, label: t('pTabLiquid') },
          ]}
        />
      </div>
      {solid ? (
        <>
          <div className="m2-grid">
            <Slider label={t('pForce')} value={force} min={10} max={100} step={10} onChange={(v) => set({ force: v })} />
            <Seg
              label={t('pArea')}
              value={big}
              onChange={(v) => set({ big: v })}
              options={[
                { value: true, label: t('pAreaBig') },
                { value: false, label: t('pAreaSmall') },
              ]}
            />
          </div>
          <div className="m2-result" aria-live="polite">
            <strong>
              {t('pPressure')} = F ÷ A = {force} ÷ {(areaCm2 / 10000).toFixed(2)} = {formatPa(solidPressure(force, areaCm2))}
            </strong>
            <span className="faint">{t('pSolidNote')}</span>
          </div>
        </>
      ) : (
        <>
          <div className="m2-grid">
            <Slider label={t('pDepth')} value={depth} min={0} max={MAX_DEPTH} step={1} onChange={(v) => set({ depth: v })} />
            <label className="m2-slider">
              <span>{t('pLiquid')}</span>
              <select value={rho} onChange={(e) => set({ rho: Number(e.target.value) })}>
                {LIQUIDS.map((l) => (
                  <option key={l.rho} value={l.rho}>
                    {t(l.key)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="m2-result" aria-live="polite">
            <strong>
              {t('pPressure')} = ρ × g × h = {rho} × {G} × {depth} = {formatPa(liquidPressure(rho, depth))}
            </strong>
            <span className="faint">{t('pLiquidNote')}</span>
          </div>
        </>
      )}
    </>
  )
}

const def: SimDef<PressureState> = {
  initial: { solid: true, force: 50, big: true, depth: 4, rho: LIQUID_DENSITY.water },
  camera: { camZ: 11, zoom2D: 62 },
  notToScale: true,
  Scene: ({ state: s }) =>
    s.solid ? (
      <SolidScene force={s.force} areaCm2={areaOf(s)} pressure={solidPressure(s.force, areaOf(s))} />
    ) : (
      <LiquidScene depth={s.depth} pressure={liquidPressure(s.rho, s.depth)} />
    ),
  Controls: PressureControls,
  legend: (s, t) => [{ color: s.solid ? '#ef5350' : PRESSURE_COLOR, label: s.solid ? 'F' : t('pPressure') }],
}

export default makeSimHost(def)
