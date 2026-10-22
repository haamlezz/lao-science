import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import { F_RANGE, U_RANGE, imageOf } from '../../sims/lens'
import type { LensType } from '../../sims/lens'
import { LENS_COLORS, LensScene, imageOffView } from './LensScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface LensSimState {
  type: LensType
  f: number
  u: number
}

function LensControls({ state, set }: { state: LensSimState; set: (p: Partial<LensSimState>) => void }) {
  const { t } = useLang()
  return (
    <>
      <div className="ctl-row">
        <Seg<LensType>
          label={t('leType')}
          value={state.type}
          onChange={(type) => set({ type })}
          options={[
            { value: 'convex', label: t('leConvex') },
            { value: 'concave', label: t('leConcave') },
          ]}
        />
      </div>
      <div className="m2-grid">
        <Slider
          label={t('leFocal')}
          value={state.f}
          min={F_RANGE.min}
          max={F_RANGE.max}
          step={F_RANGE.step}
          display={`${state.type === 'convex' ? '+' : '−'}${state.f} cm`}
          onChange={(f) => set({ f })}
        />
        <Slider
          label={t('leObject')}
          value={state.u}
          min={U_RANGE.min}
          max={U_RANGE.max}
          step={U_RANGE.step}
          display={`${state.u} cm`}
          onChange={(u) => set({ u })}
        />
      </div>
    </>
  )
}

const fmt = (n: number, d: number) => n.toFixed(d).replace('-', '−')

function LensReadout({ s, t }: { s: LensSimState; t: (k: UiKey) => string }) {
  const info = imageOf(s.type, s.f, s.u)
  if (info.atInfinity || info.v === null || info.m === null) {
    return (
      <div className="m2-result" aria-live="polite">
        <strong data-testid="le-infinity">{t('leInfinity')}</strong>
        <span className="faint">1/f = 1/u + 1/v</span>
      </div>
    )
  }
  const size = info.size === 'enlarged' ? t('leEnlarged') : info.size === 'reduced' ? t('leReduced') : t('leSame')
  return (
    <div className="m2-result" aria-live="polite">
      <strong>
        {t('leImageDist')} = <span data-testid="le-v">{fmt(info.v, 1)} cm</span> ·{' '}
        <span data-testid="le-kind">{info.real ? t('leReal') : t('leVirtual')}</span>
      </strong>
      <span>
        {t('leMag')} = <b data-testid="le-m">{fmt(info.m, 2)}</b>
      </span>
      <span data-testid="le-desc">
        {info.upright ? t('leUpright') : t('leInverted')} · {size}
      </span>
      <span className="faint">
        1/f = 1/u + 1/v → 1/{fmt(info.f, 0)} = 1/{s.u} + 1/({fmt(info.v, 1)})
      </span>
      {imageOffView(s.type, s.f, s.u) && <span className="faint">{t('leOffView')}</span>}
      <span className="faint">{t('leScaleNote')}</span>
    </div>
  )
}

const def: SimDef<LensSimState> = {
  initial: { type: 'convex', f: 10, u: 30 },
  camera: { camZ: 12, zoom2D: 32 },
  notToScale: true,
  Scene: ({ state: s }) => <LensScene type={s.type} f={s.f} u={s.u} />,
  Controls: LensControls,
  legend: (_s, t) => [
    { color: LENS_COLORS.object, label: t('leLegendObject') },
    { color: LENS_COLORS.image, label: t('leLegendImage') },
    { color: LENS_COLORS.parallel, label: t('leLegendRays') },
  ],
  readout: (s, t) => <LensReadout s={s} t={t} />,
}

export default makeSimHost(def)
