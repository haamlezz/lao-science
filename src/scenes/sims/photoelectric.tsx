import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  HC,
  INTENSITY_RANGE,
  METALS,
  METAL_KEYS,
  WAVELENGTH_RANGE,
  hydrogenLevel,
  isVisible,
  photoelectric,
  seriesName,
  spectralRegion,
  transitionEnergy,
  transitionWavelength,
  wavelengthColor,
} from '../../sims/photoelectric'
import type { MetalKey } from '../../sims/photoelectric'
import { PHOTO_COLORS, PhotoelectricScene, SpectrumScene } from './PhotoelectricScene'
import { fx } from './physUtil'
import { makeSimHost } from './host'
import type { SimDef } from './host'

type PhotoMode = 'photoelectric' | 'spectrum'

interface PhotoSimState {
  mode: PhotoMode
  metal: MetalKey
  wavelength: number // nm
  intensity: number // relative 0..10
  showVs: boolean
  nInitial: number
  nFinal: number
}

const C_LIGHT = 3.0e8 // m/s, rounded; only used to show the frequency of the light

function PhotoControls({ state, set }: { state: PhotoSimState; set: (p: Partial<PhotoSimState>) => void }) {
  const { t: tr } = useLang()
  return (
    <>
      <div className="ctl-row">
        <Seg<PhotoMode>
          label={tr('ph7Mode')}
          value={state.mode}
          onChange={(mode) => set({ mode })}
          options={[
            { value: 'photoelectric', label: tr('ph7Photoelectric') },
            { value: 'spectrum', label: tr('ph7Spectrum') },
          ]}
        />
      </div>
      {state.mode === 'photoelectric' ? (
        <>
          <div className="m2-grid">
            <div className="m2-slider">
              <span>{tr('ph7Metal')}</span>
              <Seg<MetalKey>
                label={tr('ph7Metal')}
                value={state.metal}
                onChange={(metal) => set({ metal })}
                options={METAL_KEYS.map((m) => ({ value: m, label: `${m} (${METALS[m]} eV)` }))}
              />
            </div>
            <div className="m2-slider">
              <span>{tr('ph7ShowVs')}</span>
              <Seg<boolean>
                label={tr('ph7ShowVs')}
                value={state.showVs}
                onChange={(showVs) => set({ showVs })}
                options={[
                  { value: false, label: tr('rfOff') },
                  { value: true, label: tr('rfOn') },
                ]}
              />
            </div>
          </div>
          <div className="m2-grid">
            <Slider
              label={tr('ph7Wavelength')}
              value={state.wavelength}
              min={WAVELENGTH_RANGE.min}
              max={WAVELENGTH_RANGE.max}
              step={WAVELENGTH_RANGE.step}
              display={`${state.wavelength} nm`}
              onChange={(wavelength) => set({ wavelength })}
            />
            <Slider
              label={tr('ph7Intensity')}
              value={state.intensity}
              min={INTENSITY_RANGE.min}
              max={INTENSITY_RANGE.max}
              step={INTENSITY_RANGE.step}
              display={String(state.intensity)}
              onChange={(intensity) => set({ intensity })}
            />
          </div>
        </>
      ) : (
        <div className="m2-grid">
          <Slider
            label={tr('ph7NInitial')}
            value={state.nInitial}
            min={2}
            max={6}
            step={1}
            display={`n = ${state.nInitial}`}
            onChange={(nInitial) => set({ nInitial, nFinal: Math.min(state.nFinal, nInitial - 1) })}
          />
          <Slider
            label={tr('ph7NFinal')}
            value={state.nFinal}
            min={1}
            max={state.nInitial - 1}
            step={1}
            display={`n = ${state.nFinal}`}
            onChange={(nFinal) => set({ nFinal })}
          />
        </div>
      )}
    </>
  )
}

function PhotoReadout({ state, t: tr }: { state: PhotoSimState; t: (k: UiKey) => string }) {
  if (state.mode === 'spectrum') {
    const { nInitial: ni, nFinal: nf } = state
    const lam = transitionWavelength(ni, nf)
    const region = spectralRegion(lam)
    const regionText = region === 'visible' ? tr('ph7Visible') : region === 'ultraviolet' ? tr('ph7UV') : tr('ph7IR')
    return (
      <div className="m2-result" aria-live="polite">
        <span>
          {tr('ph7Jump')} n = {ni} → n = {nf} · E<sub>{ni}</sub> = <b data-testid="ph7-ei">{fx(hydrogenLevel(ni), 2)} eV</b> · E<sub>{nf}</sub> ={' '}
          <b data-testid="ph7-ef">{fx(hydrogenLevel(nf), 2)} eV</b>
        </span>
        <span>
          ΔE = 13.6 (1/n<sub>f</sub>² − 1/n<sub>i</sub>²) = <b data-testid="ph7-de">{fx(transitionEnergy(ni, nf), 2)} eV</b>
        </span>
        <span>
          λ = hc/ΔE = <b data-testid="ph7-lambda">{fx(lam, 0)} nm</b> · <b data-testid="ph7-region">{regionText}</b>
          {!isVisible(lam) && ` (${tr('ph7NotVisible')})`}
        </span>
        <span>
          {tr('ph7Series')}: <b data-testid="ph7-series">{seriesName(nf)}</b> (n<sub>f</sub> = {nf}) · hc = {HC} eV·nm
        </span>
        <span className="faint">{tr('ph7SpecNote')}</span>
      </div>
    )
  }
  const r = photoelectric(state.metal, state.wavelength, state.intensity)
  const w0 = METALS[state.metal]
  const freq14 = C_LIGHT / (state.wavelength * 1e-9) / 1e14
  return (
    <div className="m2-result" aria-live="polite">
      <span>
        E = hc/λ = <b data-testid="ph7-e">{fx(r.energy, 2)} eV</b> · f = <b data-testid="ph7-f">{fx(freq14, 2)} × 10¹⁴ Hz</b>
      </span>
      <span>
        W<sub>0</sub> ({state.metal}) = <b data-testid="ph7-w0">{fx(w0, 1)} eV</b> · λ<sub>0</sub> = hc/W<sub>0</sub> ={' '}
        <b data-testid="ph7-thr">{fx(r.thresholdNm, 0)} nm</b>
      </span>
      {r.emits ? (
        <>
          <span>
            K<sub>max</sub> = E − W<sub>0</sub> = <b data-testid="ph7-k">{fx(r.kMax, 2)} eV</b> · V<sub>s</sub> = K<sub>max</sub>/e ={' '}
            <b data-testid="ph7-vs">{fx(r.stoppingVoltage, 2)} V</b>
          </span>
          <span>
            {tr('ph7Count')} ∝ I = <b data-testid="ph7-count">{fx(r.electronCount, 0)}</b>
          </span>
        </>
      ) : (
        <span>
          <b data-testid="ph7-none">{tr('ph7NoEmission')}</b> (K<sub>max</sub> = <b data-testid="ph7-k">0.00 eV</b>, {tr('ph7Count')} ={' '}
          <b data-testid="ph7-count">0</b>)
        </span>
      )}
      <span className="faint">{r.emits ? tr('ph7NoteEmit') : tr('ph7NoteNone')}</span>
    </div>
  )
}

const def: SimDef<PhotoSimState> = {
  initial: { mode: 'photoelectric', metal: 'Na', wavelength: 400, intensity: 4, showVs: true, nInitial: 3, nFinal: 2 },
  camera: { camZ: 13, zoom2D: 46 },
  notToScale: true,
  Scene: ({ state }) => {
    if (state.mode === 'spectrum') return <SpectrumScene nInitial={state.nInitial} nFinal={state.nFinal} />
    const r = photoelectric(state.metal, state.wavelength, state.intensity)
    return (
      <PhotoelectricScene
        metal={state.metal}
        wavelength={state.wavelength}
        intensity={state.intensity}
        emits={r.emits}
        kMax={r.kMax}
        stoppingVoltage={r.stoppingVoltage}
        showVs={state.showVs}
      />
    )
  },
  Controls: PhotoControls,
  legend: (s, t) =>
    s.mode === 'spectrum'
      ? [
          { color: PHOTO_COLORS.active, label: t('ph7LegendLevels') },
          { color: wavelengthColor(transitionWavelength(s.nInitial, s.nFinal)), label: t('ph7LegendPhoton') },
        ]
      : [
          { color: wavelengthColor(s.wavelength), label: t('ph7LegendLight') },
          { color: PHOTO_COLORS.electron, label: t('ph7LegendElectron') },
        ],
  readout: (state, t) => <PhotoReadout state={state} t={t} />,
}

export default makeSimHost(def)
