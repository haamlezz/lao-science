import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg } from '../../components/Controls'
import { ptElements } from '../../data/periodicTable'
import { PROPERTY_UNIT, SERIES, dips, seriesValues, valenceElectrons, valueOf } from '../../sims/periodic'
import type { Property, SeriesKey } from '../../sims/periodic'
import { PERIODIC_COLORS, PeriodicScene } from './PeriodicScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface PeriodicState {
  prop: Property
  series: SeriesKey
  showTable: boolean
  selected: string // '' = none
}

const PROPS: { value: Property; key: UiKey }[] = [
  { value: 'radius', key: 'perRadius' },
  { value: 'ie1', key: 'perIE' },
  { value: 'en', key: 'perEN' },
]
const SERIES_OPTS: { value: SeriesKey; key: UiKey }[] = [
  { value: 'period2', key: 'perPeriod2' },
  { value: 'period3', key: 'perPeriod3' },
  { value: 'group1', key: 'perGroup1' },
  { value: 'group17', key: 'perGroup17' },
]

const isPeriod = (s: SeriesKey) => s === 'period2' || s === 'period3'
const withUnit = (prop: Property, v: number) => (prop === 'en' ? v.toFixed(2) : `${v} ${PROPERTY_UNIT[prop]}`)

function PeriodicControls({ state, set }: { state: PeriodicState; set: (p: Partial<PeriodicState>) => void }) {
  const { t } = useLang()
  const pts = seriesValues(state.series, state.prop)
  return (
    <>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('perProperty')}</span>
          <Seg<Property>
            label={t('perProperty')}
            value={state.prop}
            onChange={(prop) => set({ prop })}
            options={PROPS.map((p) => ({ value: p.value, label: t(p.key) }))}
          />
        </div>
        <div className="m2-slider">
          <span>{t('perSeries')}</span>
          <Seg<SeriesKey>
            label={t('perSeries')}
            value={state.series}
            onChange={(series) => set({ series, selected: SERIES[series].includes(state.selected) ? state.selected : '' })}
            options={SERIES_OPTS.map((p) => ({ value: p.value, label: t(p.key) }))}
          />
        </div>
      </div>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('perPick')}</span>
          <Seg<string>
            label={t('perPick')}
            value={state.selected}
            onChange={(selected) => set({ selected: selected === state.selected ? '' : selected })}
            options={pts.map((p) => ({ value: p.symbol, label: p.symbol }))}
          />
        </div>
        <label className="m2-slider upc-check">
          <span>
            <input type="checkbox" checked={state.showTable} onChange={(e) => set({ showTable: e.target.checked })} /> {t('perShowTable')}
          </span>
        </label>
      </div>
    </>
  )
}

const TREND: Record<Property, { period: UiKey; group: UiKey }> = {
  radius: { period: 'perTrendRadiusPeriod', group: 'perTrendRadiusGroup' },
  ie1: { period: 'perTrendIEPeriod', group: 'perTrendIEGroup' },
  en: { period: 'perTrendENPeriod', group: 'perTrendENGroup' },
}

function dipPairs(series: SeriesKey, prop: Property): string[] {
  const syms = dips(series, prop)
  const pts = seriesValues(series, prop).filter((p) => p.value !== null)
  return syms.map((sym) => {
    const i = pts.findIndex((p) => p.symbol === sym)
    return `${sym} (${pts[i].value}) < ${pts[i - 1].symbol} (${pts[i - 1].value})`
  })
}

function PeriodicReadout({ s, t }: { s: PeriodicState; t: (k: UiKey) => string }) {
  const pts = seriesValues(s.series, s.prop)
  const el = ptElements.find((e) => e.symbol === s.selected)
  const v = el ? valueOf(el.symbol, s.prop) : null
  const pairs = dipPairs(s.series, s.prop)
  const unit = PROPERTY_UNIT[s.prop]
  return (
    <div className="m2-result" aria-live="polite">
      <strong data-testid="per-series">
        {pts.map((p) => `${p.symbol} ${p.value === null ? '–' : s.prop === 'en' ? p.value.toFixed(2) : p.value}`).join(' · ')}
        {unit ? ` (${unit})` : ''}
      </strong>
      {el ? (
        <span data-testid="per-selected">
          {el.symbol} · {el.name} · Z = {el.Z} · {t('perValence')} {valenceElectrons(el.symbol)} ·{' '}
          <b>{v === null ? t('perNoData') : withUnit(s.prop, v)}</b>
        </span>
      ) : null}
      <span>{t(isPeriod(s.series) ? TREND[s.prop].period : TREND[s.prop].group)}</span>
      {pairs.length > 0 && (
        <span data-testid="per-dips">
          {t('perDips')}: {pairs.join(' · ')}
        </span>
      )}
      <span className="faint">{t('perReview')}</span>
    </div>
  )
}

const def: SimDef<PeriodicState> = {
  initial: { prop: 'radius', series: 'period2', showTable: true, selected: '' },
  camera: { camZ: 12, zoom2D: 38 },
  notToScale: true,
  Scene: ({ state: s }) => (
    <PeriodicScene prop={s.prop} series={s.series} showTable={s.showTable} selected={s.selected} dipSymbols={dips(s.series, s.prop)} />
  ),
  Controls: PeriodicControls,
  legend: (_s, t) => [
    { color: PERIODIC_COLORS.bar, label: t('perLegendValue') },
    { color: PERIODIC_COLORS.dip, label: t('perLegendDip') },
    { color: PERIODIC_COLORS.selected, label: t('perLegendSelected') },
  ],
  readout: (s, t) => <PeriodicReadout s={s} t={t} />,
}

export default makeSimHost(def)
