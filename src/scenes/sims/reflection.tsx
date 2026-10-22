import { useLang } from '../../i18n/LangContext'
import { Seg, Slider } from '../../components/Controls'
import {
  MAX_DISTANCE,
  MAX_INCIDENCE,
  MIN_DISTANCE,
  imageDistance,
  imagesBetweenMirrors,
  reflectionAngle,
} from '../../sims/reflection'
import { REFLECT_COLORS, ReflectionScene } from './ReflectionScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface ReflectionState {
  i: number
  d: number
  showImage: boolean
  showNormal: boolean
  twoMirrors: boolean
  theta: number
}

const THETAS = [45, 60, 90, 120]

function ReflectionControls({ state, set }: { state: ReflectionState; set: (p: Partial<ReflectionState>) => void }) {
  const { t } = useLang()
  const onOff = (label: string, key: 'showImage' | 'showNormal' | 'twoMirrors') => (
    <div className="m2-slider">
      <span>{label}</span>
      <Seg<boolean>
        label={label}
        value={state[key]}
        onChange={(v) => set({ [key]: v })}
        options={[
          { value: true, label: t('rfOn') },
          { value: false, label: t('rfOff') },
        ]}
      />
    </div>
  )
  return (
    <>
      <div className="m2-grid">
        <Slider
          label={t('rfIncidence')}
          value={state.i}
          min={0}
          max={MAX_INCIDENCE}
          step={5}
          display={`${state.i}°`}
          onChange={(i) => set({ i })}
        />
        <Slider
          label={t('rfReflection')}
          value={reflectionAngle(state.i)}
          min={0}
          max={MAX_INCIDENCE}
          step={5}
          display={`${reflectionAngle(state.i)}°`}
          onChange={() => undefined}
          disabled
        />
        <Slider
          label={t('rfDistance')}
          value={state.d}
          min={MIN_DISTANCE}
          max={MAX_DISTANCE}
          step={1}
          onChange={(d) => set({ d })}
        />
      </div>
      <div className="m2-grid">
        {onOff(t('rfShowImage'), 'showImage')}
        {onOff(t('rfShowNormal'), 'showNormal')}
        {onOff(t('rfTwoMirrors'), 'twoMirrors')}
        {state.twoMirrors && (
          <div className="m2-slider">
            <span>{t('rfTheta')}</span>
            <Seg<number>
              label={t('rfTheta')}
              value={state.theta}
              onChange={(theta) => set({ theta })}
              options={THETAS.map((v) => ({ value: v, label: `${v}°` }))}
            />
          </div>
        )}
      </div>
    </>
  )
}

const def: SimDef<ReflectionState> = {
  initial: { i: 35, d: 3, showImage: true, showNormal: true, twoMirrors: false, theta: 90 },
  camera: { camZ: 17, zoom2D: 30 },
  notToScale: false,
  Scene: ({ state: s }) => (
    <ReflectionScene
      i={s.i}
      d={s.d}
      showImage={s.showImage}
      showNormal={s.showNormal}
      secondMirrorDeg={s.twoMirrors ? s.theta : null}
    />
  ),
  Controls: ReflectionControls,
  legend: (_s, t) => [
    { color: REFLECT_COLORS.incident, label: t('rfIncidentRay') },
    { color: REFLECT_COLORS.reflected, label: t('rfReflectedRay') },
    { color: REFLECT_COLORS.image, label: t('rfVirtual') },
  ],
  readout: (s, t) => (
    <div className="m2-result" aria-live="polite">
      <strong data-testid="rf-angles">
        i = {s.i}° → r = {reflectionAngle(s.i)}°
      </strong>
      <span data-testid="rf-image">
        {t('rfImageDist')}: {imageDistance(s.d)} {t('rfCells')} ({t('rfObjectDist')} = {s.d})
      </span>
      {s.twoMirrors && (
        <span data-testid="rf-count">
          {t('rfImagesCount')} θ = {s.theta}°: 360 ÷ {s.theta} − 1 = {imagesBetweenMirrors(s.theta)}
        </span>
      )}
      <span className="faint">{s.i === 0 ? t('rfZero') : t('rfLawNote')}</span>
    </div>
  ),
}

export default makeSimHost(def)
