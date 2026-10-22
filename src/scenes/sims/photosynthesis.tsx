import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import { toSubscript } from '../formula'
import { BUBBLES_PER_RATE, EQUATION, co2Level, photosynthesis } from '../../sims/photosynthesis'
import type { Co2Setting, Factor, Level, WaterSetting } from '../../sims/photosynthesis'
import { PHOTO_COLORS, PhotoScene } from './PhotoScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface PhotoState {
  light: Level
  co2: Co2Setting
  water: WaterSetting
  chlorophyll: boolean
  temperatureC: number
}

const FACTOR_KEY: Record<Factor, UiKey> = {
  light: 'phFLight',
  co2: 'phFCo2',
  water: 'phFWater',
  temperature: 'phFTemp',
  chlorophyll: 'phFChl',
}

function PhotoControls({ state, set }: { state: PhotoState; set: (p: Partial<PhotoState>) => void }) {
  const { t } = useLang()
  return (
    <>
      <div className="m2-grid">
        <Slider
          label={t('phLight')}
          value={state.light}
          min={0}
          max={3}
          step={1}
          onChange={(v) => set({ light: v as Level })}
        />
        <Slider
          label={t('phTemp')}
          value={state.temperatureC}
          min={0}
          max={50}
          step={5}
          onChange={(v) => set({ temperatureC: v })}
        />
      </div>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('phCo2')}</span>
          <Seg<Co2Setting>
            label={t('phCo2')}
            value={state.co2}
            onChange={(co2) => set({ co2 })}
            options={[
              { value: 'low', label: t('phLow') },
              { value: 'normal', label: t('phNormal') },
              { value: 'high', label: t('phHigh') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{t('phWater')}</span>
          <Seg<WaterSetting>
            label={t('phWater')}
            value={state.water}
            onChange={(water) => set({ water })}
            options={[
              { value: 'dry', label: t('phDry') },
              { value: 'normal', label: t('phNormal') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{t('phLeaf')}</span>
          <Seg<boolean>
            label={t('phLeaf')}
            value={state.chlorophyll}
            onChange={(chlorophyll) => set({ chlorophyll })}
            options={[
              { value: true, label: t('phGreen') },
              { value: false, label: t('phWhite') },
            ]}
          />
        </div>
      </div>
    </>
  )
}

const def: SimDef<PhotoState> = {
  initial: { light: 3, co2: 'normal', water: 'normal', chlorophyll: true, temperatureC: 30 },
  camera: { camZ: 13, zoom2D: 50 },
  notToScale: true,
  Scene: ({ state: s }) => {
    const r = photosynthesis(s)
    return (
      <PhotoScene
        light={s.light}
        co2Level={co2Level(s.co2)}
        water={s.water === 'normal'}
        green={s.chlorophyll}
        rate={r.rate}
        glucose={r.producesGlucose}
      />
    )
  },
  Controls: PhotoControls,
  legend: (_s, t) => [
    { color: PHOTO_COLORS.light, label: t('phFLight') },
    { color: PHOTO_COLORS.co2, label: 'CO₂ + H₂O' },
    { color: PHOTO_COLORS.o2, label: 'O₂' },
  ],
  readout: (s, t) => {
    const r = photosynthesis(s)
    const limit = r.limitingAll.length === 0 ? t('phNoLimit') : r.limitingAll.map((f) => t(FACTOR_KEY[f])).join(', ')
    return (
      <div className="m2-result" aria-live="polite">
        <strong data-testid="ph-rate">
          {t('phRate')}: {r.rate} / 3
        </strong>
        <span data-testid="ph-o2">
          {t('phO2')}: {r.o2PerMin} {t('phPerMin')} ({BUBBLES_PER_RATE} × {r.rate})
        </span>
        <span data-testid="ph-glucose">
          {t('phGlucose')}: {r.producesGlucose ? t('phMade') : t('phNone')}
        </span>
        <strong data-testid="ph-limiting">
          {t('phLimiting')}: {limit}
        </strong>
        <span className="faint">
          {t('phEquation')}: {toSubscript(EQUATION.replace('--(light)-->', '→ (light) →'))}
        </span>
        <span className="faint">{t('phNote')}</span>
      </div>
    )
  },
}

export default makeSimHost(def)
