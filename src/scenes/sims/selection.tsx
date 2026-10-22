import { useRef } from 'react'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import { expectedSeries, randomRun, survivals } from '../../sims/selection'
import type { Background, SelectionParams } from '../../sims/selection'
import { SEL_COLORS, SelectionScene } from './SelectionScene'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

const MAX_GEN = 10
const SECONDS_PER_GEN = 1.2

type Mode = 'expected' | 'random'

interface SelState {
  background: Background
  p0: number
  poor: number
  gen: number
  mode: Mode
  seed: number
  playing: boolean
}

function compute(s: SelState) {
  const params: SelectionParams = { background: s.background, p0: s.p0, poorSurvival: s.poor }
  if (s.mode === 'expected') return { series: expectedSeries(params, MAX_GEN), passes: null }
  const run = randomRun(params, MAX_GEN, s.seed)
  return { series: run.series, passes: run.passes }
}

function SelControls({ state, set }: { state: SelState; set: (p: Partial<SelState>) => void }) {
  const { t } = useLang()
  const ref = useRef({ state, acc: 0 })
  ref.current.state = state
  useTicker(state.playing, (dt) => {
    const r = ref.current
    r.acc += dt
    if (r.acc >= SECONDS_PER_GEN) {
      r.acc = 0
      const gen = Math.min(MAX_GEN, r.state.gen + 1)
      r.state = { ...r.state, gen }
      set({ gen, playing: gen < MAX_GEN })
    }
  })
  return (
    <>
      <div className="ctl-row">
        <button type="button" className="btn btn-primary" onClick={() => set({ playing: !state.playing && state.gen < MAX_GEN })}>
          {state.playing ? `❚❚ ${t('moPause')}` : `▶ ${t('moPlay')}`}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => set({ gen: Math.min(MAX_GEN, state.gen + 1), playing: false })}
          disabled={state.gen >= MAX_GEN}
        >
          {t('slStep')}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => set({ gen: 0, playing: false })}>
          ↺ {t('moRestart')}
        </button>
      </div>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('slBackground')}</span>
          <Seg<Background>
            label={t('slBackground')}
            value={state.background}
            onChange={(background) => set({ background, gen: 0, playing: false })}
            options={[
              { value: 'green', label: t('slGreen') },
              { value: 'brown', label: t('slBrown') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{t('slMode')}</span>
          <Seg<Mode>
            label={t('slMode')}
            value={state.mode}
            onChange={(mode) => set({ mode })}
            options={[
              { value: 'expected', label: t('slExpected') },
              { value: 'random', label: t('slRandom') },
            ]}
          />
        </div>
        {state.mode === 'random' && (
          <label className="m2-slider">
            <span>{t('slSeed')}</span>
            <input
              type="number"
              min={0}
              max={999999}
              step={1}
              value={state.seed}
              className="gn-seed"
              onChange={(e) => set({ seed: Math.max(0, Math.floor(Number(e.target.value) || 0)) })}
            />
          </label>
        )}
      </div>
      <div className="m2-grid">
        <Slider
          label={t('slP0')}
          value={state.p0}
          min={0.1}
          max={0.9}
          step={0.1}
          display={state.p0.toFixed(1)}
          onChange={(p0) => set({ p0: Math.round(p0 * 10) / 10, gen: 0, playing: false })}
        />
        <Slider
          label={t('slSurvival')}
          value={state.poor}
          min={0.2}
          max={0.8}
          step={0.1}
          display={state.poor.toFixed(1)}
          onChange={(poor) => set({ poor: Math.round(poor * 10) / 10, gen: 0, playing: false })}
        />
      </div>
      <p className="faint sl-fixed">{t('slWell')}</p>
    </>
  )
}

function SelReadout({ state, t }: { state: SelState; t: (k: UiKey) => string }) {
  const { series, passes } = compute(state)
  const g = state.gen
  const p = series[g]
  const sv = survivals(state.background, state.poor)
  const pass = passes && g >= 1 ? passes[g - 1] : null
  return (
    <div className="m2-result sl-readout" aria-live="polite">
      <span>
        {t('slGeneration')} <b data-testid="sl-gen">{g}</b> · p = <b data-testid="sl-p">{p.toFixed(3)}</b> · {t('slGreenShare')}{' '}
        {Math.round(p * 100)} / {t('slBrownShare')} {100 - Math.round(p * 100)}
      </span>
      <span data-testid="sl-series">
        {t('slSeries')}: {series.slice(0, g + 1).map((v) => v.toFixed(3)).join(' → ')}
      </span>
      {pass && (
        <span data-testid="sl-pass">
          {t('slSurvivors')}: {pass.greenAfter} / {pass.brownAfter}
        </span>
      )}
      <span className="faint">
        {sv.green === sv.brown && state.mode === 'expected' ? t('slEqual') : `s(${t('slGreenShare')}) = ${sv.green.toFixed(1)}, s(${t('slBrownShare')}) = ${sv.brown.toFixed(1)}`}
      </span>
      <span className="faint">{t('slNote')}</span>
    </div>
  )
}

const def: SimDef<SelState> = {
  initial: { background: 'green', p0: 0.5, poor: 0.4, gen: 0, mode: 'expected', seed: 1, playing: false },
  camera: { camZ: 10.5, zoom2D: 43 },
  notToScale: true,
  Scene: ({ state: s }) => <SelectionScene background={s.background} series={compute(s).series} gen={s.gen} playing={s.playing} />,
  Controls: SelControls,
  legend: (_s, t) => [
    { color: SEL_COLORS.green, label: t('slLegGreen') },
    { color: SEL_COLORS.brown, label: t('slLegBrown') },
    { color: SEL_COLORS.bird, label: t('slLegBird') },
  ],
  readout: (s, t) => <SelReadout state={s} t={t} />,
}

export default makeSimHost(def)
