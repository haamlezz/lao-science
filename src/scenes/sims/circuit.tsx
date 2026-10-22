import type { FC } from 'react'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  BULBS_RANGE,
  CELLS_RANGE,
  OHMS_RANGE,
  VOLTS_RANGE,
  basicCircuit,
  ivLine,
  ohmCircuit,
} from '../../sims/circuit'
import type { Arrangement, Wiring } from '../../sims/circuit'
import { BasicCircuitScene, CIRCUIT_COLORS, OhmCircuitScene } from './CircuitScene'
import { makeSimHost } from './host'
import type { SimDef, SimHostProps } from './host'

// ------------------------------------------------------------------ basic mode (m3-06)

interface BasicState {
  cells: number
  bulbs: number
  wiring: Wiring
  switchOn: boolean
  removed: boolean[]
}

const f2 = (n: number) => n.toFixed(2)

function BasicControls({ state, set }: { state: BasicState; set: (p: Partial<BasicState>) => void }) {
  const { t } = useLang()
  return (
    <>
      <div className="m2-grid">
        <Slider
          label={t('ciCells')}
          value={state.cells}
          min={CELLS_RANGE.min}
          max={CELLS_RANGE.max}
          step={1}
          display={`${state.cells} (${(state.cells * 1.5).toFixed(1)} V)`}
          onChange={(cells) => set({ cells })}
        />
        <Slider
          label={t('ciBulbs')}
          value={state.bulbs}
          min={BULBS_RANGE.min}
          max={BULBS_RANGE.max}
          step={1}
          onChange={(bulbs) => set({ bulbs })}
        />
      </div>
      <div className="ctl-row">
        <Seg<Wiring>
          label={t('ciWiring')}
          value={state.wiring}
          onChange={(wiring) => set({ wiring })}
          options={[
            { value: 'series', label: t('ciSeries') },
            { value: 'parallel', label: t('ciParallel') },
          ]}
        />
        <Seg<boolean>
          label={t('ciSwitch')}
          value={state.switchOn}
          onChange={(switchOn) => set({ switchOn })}
          options={[
            { value: true, label: t('ciSwitchOn') },
            { value: false, label: t('ciSwitchOff') },
          ]}
        />
      </div>
      <div className="ctl-row">
        {Array.from({ length: state.bulbs }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`btn btn-tool ${state.removed[i] ? 'on' : ''}`}
            aria-pressed={!!state.removed[i]}
            onClick={() => set({ removed: state.removed.map((r, j) => (j === i ? !r : r)) })}
          >
            {t('ciBulb')} {i + 1}: {state.removed[i] ? t('ciRemoved') : t('ciInstalled')}
          </button>
        ))}
      </div>
    </>
  )
}

function basicReadout(s: BasicState, t: (k: UiKey) => string) {
  const r = basicCircuit({ cells: s.cells, bulbs: s.bulbs, wiring: s.wiring, switchOn: s.switchOn, removed: s.removed })
  return (
    <div className="m2-result" aria-live="polite">
      <strong>
        {t('ciCurrent')} = <span data-testid="ci-current">{f2(r.current)} A</span>
      </strong>
      <span>
        {t('ciEmf')} = <b data-testid="ci-emf">{r.emf.toFixed(1)} V</b>
      </span>
      <span data-testid="ci-bulbs">
        {t('ciBulbPower')}:{' '}
        {r.bulbs.map((b, i) => (
          <b key={i}>
            {i > 0 ? ' · ' : ''}
            {b.present ? `${f2(b.power)} W` : '–'}
          </b>
        ))}
      </span>
      {!r.closed && <span className="faint">{t('ciOpenCircuit')}</span>}
      <span className="faint">{s.wiring === 'series' ? t('ciSeriesNote') : t('ciParallelNote')}</span>
    </div>
  )
}

const basicDef: SimDef<BasicState> = {
  initial: { cells: 2, bulbs: 3, wiring: 'series', switchOn: true, removed: [false, false, false] },
  camera: { camZ: 12, zoom2D: 34 },
  notToScale: false,
  Scene: ({ state: s }) => {
    const result = basicCircuit({ cells: s.cells, bulbs: s.bulbs, wiring: s.wiring, switchOn: s.switchOn, removed: s.removed })
    return <BasicCircuitScene cells={s.cells} bulbs={s.bulbs} wiring={s.wiring} switchOn={s.switchOn} result={result} />
  },
  Controls: BasicControls,
  legend: (_s, t) => [
    { color: CIRCUIT_COLORS.cell, label: t('ciLegendCell') },
    { color: CIRCUIT_COLORS.bulb, label: t('ciLegendBulb') },
    { color: CIRCUIT_COLORS.dot, label: t('ciLegendCurrent') },
  ],
  readout: basicReadout,
}

// ------------------------------------------------------------------ ohm mode (m4-03)

interface OhmState {
  volts: number
  r1: number
  r2: number
  arrangement: Arrangement
  graphOf: 0 | 1
}

function OhmControls({ state, set }: { state: OhmState; set: (p: Partial<OhmState>) => void }) {
  const { t } = useLang()
  const two = state.arrangement !== 'single'
  return (
    <>
      <div className="m2-grid">
        <Slider
          label={t('ciVolts')}
          value={state.volts}
          min={VOLTS_RANGE.min}
          max={VOLTS_RANGE.max}
          step={VOLTS_RANGE.step}
          display={`${state.volts} V`}
          onChange={(volts) => set({ volts })}
        />
        <Slider
          label={t('ciR1')}
          value={state.r1}
          min={OHMS_RANGE.min}
          max={OHMS_RANGE.max}
          step={1}
          display={`${state.r1} Ω`}
          onChange={(r1) => set({ r1 })}
        />
        {two && (
          <Slider
            label={t('ciR2')}
            value={state.r2}
            min={OHMS_RANGE.min}
            max={OHMS_RANGE.max}
            step={1}
            display={`${state.r2} Ω`}
            onChange={(r2) => set({ r2 })}
          />
        )}
      </div>
      <div className="ctl-row">
        <Seg<Arrangement>
          label={t('ciArrangement')}
          value={state.arrangement}
          onChange={(arrangement) => set({ arrangement, graphOf: arrangement === 'single' ? 0 : state.graphOf })}
          options={[
            { value: 'single', label: t('ciSingle') },
            { value: 'series', label: t('ciSeries') },
            { value: 'parallel', label: t('ciParallel') },
          ]}
        />
        {two && (
          <Seg<number>
            label={t('ciGraphTitle')}
            value={state.graphOf}
            onChange={(g) => set({ graphOf: g === 1 ? 1 : 0 })}
            options={[
              { value: 0, label: `V–I R₁` },
              { value: 1, label: `V–I R₂` },
            ]}
          />
        )}
      </div>
    </>
  )
}

const GW = 300
const GH = 200
const GP = { l: 48, r: 14, t: 12, b: 36 }

function niceCeil(v: number): number {
  const steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20]
  return steps.find((n) => v <= n) ?? Math.ceil(v)
}

function IvGraph({ ohms, v, i, name }: { ohms: number; v: number; i: number; name: string }) {
  const { t } = useLang()
  const vMax = VOLTS_RANGE.max
  const iMax = niceCeil(vMax / ohms)
  const px = (x: number) => GP.l + ((GW - GP.l - GP.r) * x) / vMax
  const py = (y: number) => GH - GP.b - ((GH - GP.t - GP.b) * y) / iMax
  const pts = ivLine(ohms, vMax, 13)
  const path = pts.map((p, k) => `${k === 0 ? 'M' : 'L'}${px(p.v).toFixed(1)} ${py(p.i).toFixed(1)}`).join(' ')
  return (
    <figure className="mo-graph">
      <figcaption>
        {t('ciGraphTitle')} {name} ({ohms} Ω)
      </figcaption>
      <svg viewBox={`0 0 ${GW} ${GH}`} role="img" aria-label={t('ciGraphTitle')}>
        {[0, 0.5, 1].map((f) => (
          <g key={f}>
            <line x1={GP.l} x2={GW - GP.r} y1={py(f * iMax)} y2={py(f * iMax)} className="mo-grid" />
            <text x={GP.l - 6} y={py(f * iMax) + 4} textAnchor="end" className="mo-tick">
              {Number((f * iMax).toFixed(2))}
            </text>
          </g>
        ))}
        {[0, 6, 12].map((x) => (
          <text key={x} x={px(x)} y={GH - GP.b + 16} textAnchor="middle" className="mo-tick">
            {x}
          </text>
        ))}
        <line x1={GP.l} x2={GP.l} y1={GP.t} y2={GH - GP.b} className="mo-axis" />
        <line x1={GP.l} x2={GW - GP.r} y1={GH - GP.b} y2={GH - GP.b} className="mo-axis" />
        <text x={(GP.l + GW - GP.r) / 2} y={GH - 6} textAnchor="middle" className="mo-label">
          V (V)
        </text>
        <text x={12} y={(GP.t + GH - GP.b) / 2} textAnchor="middle" className="mo-label" transform={`rotate(-90 12 ${(GP.t + GH - GP.b) / 2})`}>
          I (A)
        </text>
        <path d={path} className="mo-live" />
        <circle cx={px(v)} cy={py(i)} r={5} className="mo-dot" />
      </svg>
      <p className="faint mo-graph-note">{t('ciGraphNote')}</p>
    </figure>
  )
}

function OhmReadout({ s, t }: { s: OhmState; t: (k: UiKey) => string }) {
  const r = ohmCircuit({ volts: s.volts, r1: s.r1, r2: s.r2, arrangement: s.arrangement })
  const sel = Math.min(s.graphOf, r.branches.length - 1)
  const br = r.branches[sel]
  return (
    <div className="mo-readout">
      <div className="m2-result" aria-live="polite">
        <strong>
          {t('ciAmmeter')}: I = <span data-testid="ci-current">{f2(r.current)} A</span>
        </strong>
        <span>
          {t('ciReq')} = <b data-testid="ci-req">{f2(r.rEq)} Ω</b>
        </span>
        <span>
          {t('ciPowerTotal')} = <b data-testid="ci-power">{f2(r.power)} W</b>
        </span>
        <table className="fw-table" data-testid="ci-table">
          <thead>
            <tr>
              <th>{t('ciResistor')}</th>
              <th>R</th>
              <th>V ({t('ciVoltmeter')})</th>
              <th>I ({t('ciAmmeter')})</th>
              <th>P</th>
            </tr>
          </thead>
          <tbody>
            {r.branches.map((b, i) => (
              <tr key={i}>
                <td>R{i + 1}</td>
                <td>{b.ohms} Ω</td>
                <td>{f2(b.voltage)} V</td>
                <td>{f2(b.current)} A</td>
                <td>{f2(b.power)} W</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="faint">{t('ciOhmNote')}</span>
      </div>
      <div className="m2-result">
        <IvGraph ohms={br.ohms} v={br.voltage} i={br.current} name={`R${sel + 1}`} />
      </div>
    </div>
  )
}

const ohmDef: SimDef<OhmState> = {
  initial: { volts: 12, r1: 10, r2: 20, arrangement: 'series', graphOf: 0 },
  camera: { camZ: 12, zoom2D: 34 },
  notToScale: false,
  Scene: ({ state: s }) => {
    const result = ohmCircuit({ volts: s.volts, r1: s.r1, r2: s.r2, arrangement: s.arrangement })
    return <OhmCircuitScene volts={s.volts} r1={s.r1} r2={s.r2} arrangement={s.arrangement} result={result} />
  },
  Controls: OhmControls,
  legend: (_s, t) => [
    { color: CIRCUIT_COLORS.cell, label: t('ciLegendCell') },
    { color: CIRCUIT_COLORS.resistor, label: t('ciLegendResistor') },
    { color: CIRCUIT_COLORS.dot, label: t('ciLegendCurrent') },
  ],
  readout: (s, t) => <OhmReadout s={s} t={t} />,
}

// ------------------------------------------------------------------ one module, mode chosen by the lesson's simProps

const BasicHost = makeSimHost(basicDef)
const OhmHost = makeSimHost(ohmDef)

const CircuitHost: FC<SimHostProps> = (props) => {
  const ohm = props.simProps?.mode === 'ohm'
  return ohm ? <OhmHost {...props} /> : <BasicHost {...props} />
}

export default CircuitHost
