import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import { CURRENT_RANGE, IRON_MU_R, TURNS_RANGE, solenoidState } from '../../sims/solenoid'
import type { SolenoidMode } from '../../sims/solenoid'
import { SOLENOID_COLORS, SolenoidScene } from './SolenoidScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface SolenoidSimState {
  mode: SolenoidMode
  turns: number
  current: number // magnitude, A
  reversed: boolean
  ironCore: boolean
  showLines: boolean
}

const signed = (s: SolenoidSimState) => (s.reversed ? -s.current : s.current)
const result = (s: SolenoidSimState) =>
  solenoidState({ mode: s.mode, turns: s.turns, current: signed(s), ironCore: s.ironCore })

function SolenoidControls({ state, set }: { state: SolenoidSimState; set: (p: Partial<SolenoidSimState>) => void }) {
  const { t } = useLang()
  const driven = state.mode !== 'bar'
  return (
    <>
      <div className="ctl-row">
        <Seg<SolenoidMode>
          label={t('soMode')}
          value={state.mode}
          onChange={(mode) => set({ mode })}
          options={[
            { value: 'bar', label: t('soBar') },
            { value: 'wire', label: t('soWire') },
            { value: 'solenoid', label: t('soSolenoid') },
          ]}
        />
        <Seg<boolean>
          label={t('soDisplay')}
          value={state.showLines}
          onChange={(showLines) => set({ showLines })}
          options={[
            { value: true, label: t('soLines') },
            { value: false, label: t('soCompass') },
          ]}
        />
      </div>
      {driven && (
        <div className="m2-grid">
          <Slider
            label={t('soCurrent')}
            value={state.current}
            min={CURRENT_RANGE.min}
            max={CURRENT_RANGE.max}
            step={CURRENT_RANGE.step}
            display={`${state.reversed ? '−' : '+'}${state.current.toFixed(1)} A`}
            onChange={(current) => set({ current })}
          />
          {state.mode === 'solenoid' && (
            <Slider
              label={t('soTurns')}
              value={state.turns}
              min={TURNS_RANGE.min}
              max={TURNS_RANGE.max}
              step={TURNS_RANGE.step}
              onChange={(turns) => set({ turns })}
            />
          )}
        </div>
      )}
      {driven && (
        <div className="ctl-row">
          <Seg<boolean>
            label={t('soDirection')}
            value={state.reversed}
            onChange={(reversed) => set({ reversed })}
            options={[
              { value: false, label: t('soForward') },
              { value: true, label: t('soReverse') },
            ]}
          />
          {state.mode === 'solenoid' && (
            <Seg<boolean>
              label={t('soCore')}
              value={state.ironCore}
              onChange={(ironCore) => set({ ironCore })}
              options={[
                { value: false, label: `${t('soCore')}: ${t('rfOff')}` },
                { value: true, label: `${t('soCore')}: ${t('rfOn')} ×${IRON_MU_R}` },
              ]}
            />
          )}
        </div>
      )}
    </>
  )
}

function fieldText(mT: number): string {
  return mT >= 0.1 ? `${mT.toFixed(3)} mT` : `${mT.toFixed(4)} mT (${(mT * 1000).toFixed(1)} µT)`
}

function SolenoidReadout({ s, t }: { s: SolenoidSimState; t: (k: UiKey) => string }) {
  const r = result(s)
  const hint = s.mode === 'solenoid' ? 'soHintSolenoid' : s.mode === 'wire' ? 'soHintWire' : 'soHintBar'
  const noCurrent = s.mode !== 'bar' && signed(s) === 0
  return (
    <div className="m2-result" aria-live="polite">
      <strong>
        {t('soField')} = <span data-testid="so-field">{fieldText(r.fieldMilliT)}</span>
      </strong>
      {s.mode !== 'wire' && (
        <span>
          {t('soPins')}: <b data-testid="so-pins">{r.pins}</b>
        </span>
      )}
      {r.polarity !== 'none' && (
        <span data-testid="so-polarity">
          {t('soPolarity')} <b>{r.polarity === 'N-right' ? t('soRight') : t('soLeft')}</b>
        </span>
      )}
      {r.circulation !== 'none' && (
        <span data-testid="so-circulation">
          {t('soCirculation')}: <b>{r.circulation === 'counterclockwise' ? t('soCcw') : t('soCw')}</b>
        </span>
      )}
      <span className="faint">{noCurrent ? t('soNoCurrent') : t(hint)}</span>
      <span className="faint">{t('soIllustrative')}</span>
    </div>
  )
}

const def: SimDef<SolenoidSimState> = {
  initial: { mode: 'solenoid', turns: 50, current: 2, reversed: false, ironCore: false, showLines: true },
  camera: { camZ: 12, zoom2D: 38 },
  notToScale: true,
  Scene: ({ state: s }) => (
    <SolenoidScene
      mode={s.mode}
      turns={s.turns}
      signedCurrent={signed(s)}
      ironCore={s.ironCore}
      showLines={s.showLines}
      result={result(s)}
    />
  ),
  Controls: SolenoidControls,
  legend: (_s, t) => [
    { color: SOLENOID_COLORS.north, label: t('soLegendNorth') },
    { color: SOLENOID_COLORS.south, label: t('soLegendSouth') },
    { color: SOLENOID_COLORS.line, label: t('soLines') },
    { color: SOLENOID_COLORS.pin, label: t('soLegendPin') },
  ],
  readout: (s, t) => <SolenoidReadout s={s} t={t} />,
}

export default makeSimHost(def)
