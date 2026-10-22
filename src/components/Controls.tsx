import type { ReactNode } from 'react'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  /** Text shown after the label instead of the raw value (e.g. converted unit). */
  display?: string
  disabled?: boolean
}

/** Labelled range input (class names shared with the original M.2 lesson controls). */
export function Slider({ label, value, min, max, step, onChange, display, disabled }: SliderProps) {
  return (
    <label className="m2-slider">
      <span>
        {label}: <b>{display ?? value}</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

interface SegProps<V extends string | number | boolean> {
  options: { value: V; label: ReactNode }[]
  value: V
  onChange: (v: V) => void
  label?: string
}

/** Segmented radio-group button row. */
export function Seg<V extends string | number | boolean>({ options, value, onChange, label }: SegProps<V>) {
  return (
    <div className="seg" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          className={o.value === value ? 'on' : ''}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
