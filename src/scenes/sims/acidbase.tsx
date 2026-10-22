import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  INDICATORS,
  KA_ACETIC,
  SUBSTANCES,
  TITRATION,
  equivalenceVolume,
  hFromPH,
  indicatorColour,
  indicatorSuitable,
  ohFromPH,
  pHStrongAcid,
  pOH,
  titrationCurve,
  titrationPH,
} from '../../sims/acidbase'
import type { AcidKind, IndicatorKey } from '../../sims/acidbase'
import { AB_COLORS, AcidBaseScene } from './AcidBaseScene'
import { sci } from './chemShared'
import { ChemPlot } from './ChemPlot'
import { makeSimHost } from './host'
import type { SimDef } from './host'

type Mode = 'pH' | 'titration'

interface AcidState {
  mode: Mode
  sub: number // index into SUBSTANCES; SUBSTANCES.length = diluted HCl
  dil: number // dilution steps of 10x of 0.1 M HCl
  acid: AcidKind
  vb: number // mL of NaOH
  ind: IndicatorKey
}

const SUB_KEYS: UiKey[] = ['abS0', 'abS1', 'abS2', 'abS3', 'abS4', 'abS5', 'abS6', 'abS7', 'abS8', 'abS9']
const DILUTE = SUBSTANCES.length
const IND_KEYS: { value: IndicatorKey; key: UiKey }[] = [
  { value: 'universal', key: 'abUniversal' },
  { value: 'litmus', key: 'abLitmus' },
  { value: 'phenolphthalein', key: 'abPhenolphthalein' },
  { value: 'methyl orange', key: 'abMethylOrange' },
]

function currentPH(s: AcidState): number {
  if (s.mode === 'titration') return titrationPH(s.acid, s.vb)
  if (s.sub === DILUTE) return pHStrongAcid(0.1 / Math.pow(10, s.dil))
  return SUBSTANCES[s.sub].pH
}

/** Steep part of the curve: pH at 1 mL (4 %) before and after the equivalence volume. */
function steepRange(kind: AcidKind): [number, number] {
  return [titrationPH(kind, equivalenceVolume() - 1), titrationPH(kind, equivalenceVolume() + 1)]
}

function AcidControls({ state, set }: { state: AcidState; set: (p: Partial<AcidState>) => void }) {
  const { t } = useLang()
  return (
    <>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('abMode')}</span>
          <Seg<Mode>
            label={t('abMode')}
            value={state.mode}
            onChange={(mode) => set({ mode })}
            options={[
              { value: 'pH', label: t('abModePH') },
              { value: 'titration', label: t('abModeTitration') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{t('abIndicator')}</span>
          <Seg<IndicatorKey>
            label={t('abIndicator')}
            value={state.ind}
            onChange={(ind) => set({ ind })}
            options={IND_KEYS.map((x) => ({ value: x.value, label: t(x.key) }))}
          />
        </div>
      </div>
      {state.mode === 'pH' ? (
        <div className="m2-grid">
          <label className="m2-slider">
            <span>{t('abSubstance')}</span>
            <select value={state.sub} onChange={(e) => set({ sub: Number(e.target.value) })}>
              {SUB_KEYS.map((k, i) => (
                <option key={k} value={i}>
                  {t(k)}
                </option>
              ))}
              <option value={DILUTE}>{t('abSDilute')}</option>
            </select>
          </label>
          {state.sub === DILUTE && (
            <Slider
              label={t('abDilution')}
              value={state.dil}
              min={0}
              max={8}
              step={1}
              display={`0.1 M ÷ 10${'⁰¹²³⁴⁵⁶⁷⁸'[state.dil]} = ${sci(0.1 / Math.pow(10, state.dil), 2)} M`}
              onChange={(dil) => set({ dil })}
            />
          )}
        </div>
      ) : (
        <div className="m2-grid">
          <div className="m2-slider">
            <span>{t('abAcid')}</span>
            <Seg<AcidKind>
              label={t('abAcid')}
              value={state.acid}
              onChange={(acid) => set({ acid })}
              options={[
                { value: 'strong', label: t('abStrong') },
                { value: 'weak', label: t('abWeak') },
              ]}
            />
          </div>
          <Slider
            label={t('abVolume')}
            value={state.vb}
            min={0}
            max={TITRATION.maxBaseMl}
            step={TITRATION.stepMl}
            display={`${state.vb.toFixed(1)} mL`}
            onChange={(vb) => set({ vb: Math.round(vb * 10) / 10 })}
          />
        </div>
      )}
    </>
  )
}

function AcidReadout({ s, t }: { s: AcidState; t: (k: UiKey) => string }) {
  const pHv = currentPH(s)
  const steep = steepRange(s.acid)
  const ind = INDICATORS.find((i) => i.key === s.ind)
  const eqPH = titrationPH(s.acid, equivalenceVolume())
  const pKa = -Math.log10(KA_ACETIC)
  const curve = titrationCurve(s.acid, 0.5).map((p) => [p.v, p.pH] as [number, number])
  const suitable = ind ? indicatorSuitable(ind.key, steep[0], steep[1]) : null
  const region =
    s.vb < equivalenceVolume() - 0.05 ? t('abBefore') : s.vb > equivalenceVolume() + 0.05 ? t('abAfter') : t('abAt')
  return (
    <div className="mo-readout">
      <div className="m2-result" aria-live="polite">
        <strong>
          pH = <span data-testid="ab-ph">{pHv.toFixed(2)}</span> · pOH = <span data-testid="ab-poh">{pOH(pHv).toFixed(2)}</span> · pH + pOH = 14
        </strong>
        <span>
          [H₃O⁺] = <b data-testid="ab-h">{sci(hFromPH(pHv), 2)} M</b> · [OH⁻] = <b data-testid="ab-oh">{sci(ohFromPH(pHv), 2)} M</b>
        </span>
        {s.mode === 'titration' && (
          <>
            <span>
              V<sub>b</sub> = <b data-testid="ab-vb">{s.vb.toFixed(1)} mL</b> · {t('abEquiv')} {equivalenceVolume().toFixed(1)} mL (pH{' '}
              <b data-testid="ab-eq">{eqPH.toFixed(2)}</b>) · {region}
            </span>
            {s.acid === 'weak' && (
              <span>
                {t('abHalf')}: {(equivalenceVolume() / 2).toFixed(1)} mL → pH ≈ pK<sub>a</sub> = {pKa.toFixed(2)}
              </span>
            )}
          </>
        )}
        {ind && (
          <span>
            {t(IND_KEYS.find((x) => x.value === s.ind)!.key)} ({ind.low}–{ind.high}){' '}
            {s.mode === 'titration' && suitable !== null && <b>{suitable ? t('abSuitable') : t('abNotSuitable')}</b>}
          </span>
        )}
      </div>
      {s.mode === 'titration' && (
        <ChemPlot
          title={t('abGraph')}
          xLabel="V (mL)"
          yLabel="pH"
          x={[0, TITRATION.maxBaseMl]}
          y={[0, 14]}
          xTicks={[0, 10, 20, 30, 40, 50]}
          yTicks={[0, 7, 14]}
          bands={ind ? [{ y0: ind.low, y1: ind.high, fill: ind.above === '#f5f5f5' ? '#ec407a' : ind.above }] : []}
          lines={[{ pts: curve, cls: 'mo-live' }]}
          vlines={[{ x: equivalenceVolume() }]}
          dots={[
            { x: s.vb, y: pHv },
            ...(s.acid === 'weak' ? [{ x: equivalenceVolume() / 2, y: pKa, cls: 'upc-dot2' }] : []),
          ]}
          note={t('abGraphNote')}
        />
      )}
    </div>
  )
}

const def: SimDef<AcidState> = {
  initial: { mode: 'pH', sub: 1, dil: 0, acid: 'strong', vb: 0, ind: 'universal' },
  camera: { camZ: 10.5, zoom2D: 44 },
  notToScale: true,
  Scene: ({ state: s }) => {
    const pHv = currentPH(s)
    const h = hFromPH(pHv)
    const oh = ohFromPH(pHv)
    const nH = Math.round((40 * h) / (h + oh))
    return (
      <AcidBaseScene
        pH={pHv}
        liquid={indicatorColour(s.ind, pHv)}
        nH={nH}
        nOH={40 - nH}
        burette={s.mode === 'titration' ? 1 - s.vb / TITRATION.maxBaseMl : null}
      />
    )
  },
  Controls: AcidControls,
  legend: (_s, t) => [
    { color: AB_COLORS.h3o, label: 'H₃O⁺' },
    { color: AB_COLORS.oh, label: 'OH⁻' },
    { color: '#ffffff', label: t('abLegendMarker') },
  ],
  readout: (s, t) => <AcidReadout s={s} t={t} />,
}

export default makeSimHost(def)
