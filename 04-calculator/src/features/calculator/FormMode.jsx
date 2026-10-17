import { DATE_CALCS } from '@/features/calculator/dateCalcs'
import { PERCENT_CALCS } from '@/features/calculator/percentCalcs'
import {
  FIELD,
  FIELD_LABEL,
  HINT,
  INPUT,
  SEGMENT,
  SEGMENT_ON,
  SEGMENTS,
  SELECT,
} from '@/features/calculator/styles'
import { useCalculatorStore } from '@/stores/useCalculatorStore'

const CALCS = { pct: PERCENT_CALCS, date: DATE_CALCS }

function Field({ mode, sub, field, value, invalid, onChange }) {
  const id = `f-${mode}-${sub}-${field.k}`

  if (field.type === 'num' || field.type === 'date') {
    return (
      <div className={FIELD}>
        <label htmlFor={id} className={FIELD_LABEL}>
          {field.l}
        </label>
        <div className="relative flex">
          <input
            id={id}
            {...(field.type === 'num'
              ? { type: 'text', inputMode: 'decimal', autoComplete: 'off', spellCheck: 'false' }
              : { type: 'date' })}
            aria-invalid={invalid || undefined}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={`${INPUT} ${field.suf ? 'pr-10' : ''}`}
          />
          {field.suf ? (
            <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 font-mono text-muted">
              {field.suf}
            </span>
          ) : null}
        </div>
      </div>
    )
  }

  if (field.type === 'check') {
    return (
      <div className="flex min-h-[54px] min-w-0 items-center gap-3">
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="size-6 accent-accent"
        />
        <label htmlFor={id} className="text-base font-medium text-ink">
          {field.l}
        </label>
      </div>
    )
  }

  if (field.type === 'seg') {
    return (
      <div className={FIELD}>
        <fieldset className="m-0 flex min-w-0 flex-col gap-1.5 border-0 p-0">
          <legend className={FIELD_LABEL}>{field.l}</legend>
          <div className={SEGMENTS}>
            {field.opts.map(([optValue, optLabel]) => (
              <label
                key={optValue}
                className={`${SEGMENT} has-focus-visible:outline-3 has-focus-visible:outline-offset-1 has-focus-visible:outline-accent ${
                  value === optValue ? SEGMENT_ON : ''
                }`}
              >
                <input
                  type="radio"
                  name={id}
                  value={optValue}
                  checked={value === optValue}
                  onChange={() => onChange(optValue)}
                  className="pointer-events-none absolute opacity-0"
                />
                {optLabel}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    )
  }

  return (
    <div className={FIELD}>
      <label htmlFor={id} className={FIELD_LABEL}>
        {field.l}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={SELECT}
      >
        {field.opts.map(([optValue, optLabel]) => (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        ))}
      </select>
    </div>
  )
}

/** Percent and Dates: pick a calculation, fill its fields; the readout updates as you type. */
export function FormMode({ mode }) {
  const form = useCalculatorStore((state) => state[mode])
  const invalid = useCalculatorStore((state) => state.invalid)
  const setSub = useCalculatorStore((state) => state.setSub)
  const setField = useCalculatorStore((state) => state.setField)
  const calcs = CALCS[mode]
  const calc = calcs[form.sub]
  const values = form.vals[form.sub]

  return (
    <>
      <div role="group" aria-label="Calculation" className={`${SEGMENTS} mb-4`}>
        {Object.entries(calcs).map(([key, c]) => (
          <button
            key={key}
            type="button"
            aria-pressed={key === form.sub}
            onClick={() => setSub(mode, key)}
            className={`${SEGMENT} ${key === form.sub ? SEGMENT_ON : 'bg-transparent'}`}
          >
            {c.tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
        {calc.fields.map((field) => (
          <Field
            key={`${form.sub}-${field.k}`}
            mode={mode}
            sub={form.sub}
            field={field}
            value={values[field.k]}
            invalid={invalid === field.k}
            onChange={(value) => setField(mode, field.k, value)}
          />
        ))}
      </div>

      {calc.hint ? <p className={HINT}>{calc.hint}</p> : null}
    </>
  )
}
