import { Icon } from '@/components/Icon'
import { FIELD, FIELD_LABEL, HINT, INPUT, SELECT } from '@/features/calculator/styles'
import { CATEGORIES } from '@/features/calculator/units'
import { useCalculatorStore } from '@/stores/useCalculatorStore'

const PRECISIONS = [4, 6, 8, 10]

/** One side of the conversion: a value and its unit. Typing on either side drives the other. */
function Side({ side, label, unitKey }) {
  const conv = useCalculatorStore((state) => state.conv)
  const invalid = useCalculatorStore((state) => state.invalid === side)
  const setConv = useCalculatorStore((state) => state.setConv)
  const isCurrency = Boolean(CATEGORIES[conv.cat].currency)

  return (
    <div className={`${FIELD} grid gap-2`}>
      <label htmlFor={`cv-${side}`} className={FIELD_LABEL}>
        {label}
      </label>
      <input
        id={`cv-${side}`}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        spellCheck="false"
        aria-label={`${label} value`}
        aria-invalid={invalid || undefined}
        value={conv[side]}
        onChange={(event) => setConv({ [side]: event.target.value, edited: side })}
        className={INPUT}
      />
      <select
        aria-label={`${label} unit`}
        value={conv[unitKey]}
        onChange={(event) =>
          setConv({ [unitKey]: event.target.value, ...(isCurrency ? { rate: '' } : {}) })
        }
        className={SELECT}
      >
        {CATEGORIES[conv.cat].units.map(([id, name]) => (
          <option key={id} value={id}>
            {name} ({id})
          </option>
        ))}
      </select>
    </div>
  )
}

export function ConvertMode() {
  const conv = useCalculatorStore((state) => state.conv)
  const all = useCalculatorStore((state) => state.convAll)
  const setConv = useCalculatorStore((state) => state.setConv)
  const setCategory = useCalculatorStore((state) => state.setCategory)
  const swapUnits = useCalculatorStore((state) => state.swapUnits)
  const isCurrency = Boolean(CATEGORIES[conv.cat].currency)

  return (
    <>
      <div
        role="group"
        aria-label="Category"
        className="mb-4 flex flex-wrap gap-1.5 phone:-mx-3 phone:flex-nowrap phone:overflow-x-auto phone:px-3 phone:[scrollbar-width:none]"
      >
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            type="button"
            aria-pressed={key === conv.cat}
            onClick={() => setCategory(key)}
            className={`min-h-11 shrink-0 cursor-pointer rounded-full border px-3.5 font-semibold ${
              key === conv.cat
                ? 'border-m-conv bg-m-conv text-panel'
                : 'border-line bg-sunk text-muted'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-3 max-[560px]:grid-cols-1">
        <Side side="a" label="From" unitKey="from" />
        <button
          type="button"
          title="Swap units"
          aria-label="Swap units"
          onClick={swapUnits}
          className="grid size-[54px] cursor-pointer place-items-center rounded-full border border-line bg-op text-op-ink max-[560px]:rotate-90 max-[560px]:justify-self-center"
        >
          <Icon name="arrow-down-up" size={22} />
        </button>
        <Side side="b" label="To" unitKey="to" />
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-3">
        {isCurrency ? (
          <div className={`${FIELD} flex-[1_1_200px]`}>
            <label htmlFor="cv-rate" className={FIELD_LABEL}>
              Rate: 1 {conv.from} =
            </label>
            <div className="relative flex">
              <input
                id="cv-rate"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                spellCheck="false"
                value={conv.rate}
                onChange={(event) => setConv({ rate: event.target.value })}
                className={`${INPUT} pr-16`}
              />
              <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 font-mono text-muted">
                {conv.to}
              </span>
            </div>
          </div>
        ) : (
          <div className={`${FIELD} flex-[1_1_200px]`}>
            <label htmlFor="cv-sig" className={FIELD_LABEL}>
              Precision
            </label>
            <select
              id="cv-sig"
              value={conv.sig}
              onChange={(event) => setConv({ sig: Number(event.target.value) })}
              className={SELECT}
            >
              {PRECISIONS.map((n) => (
                <option key={n} value={n}>
                  {n} significant digits
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {isCurrency ? (
        <p className={HINT}>
          Rates are fixed sample values for this prototype, not live market data. Type your own rate
          to override it.
        </p>
      ) : null}
      {conv.cat === 'data' ? (
        <p className={HINT}>
          KB, MB and GB use powers of 1000. KiB, MiB and GiB use powers of 1024.
        </p>
      ) : null}

      <div className="mt-5">
        <h3 className="mb-2 text-xs font-bold tracking-[0.08em] text-muted uppercase">
          In every unit
        </h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-1.5 phone:grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
          {all.map((unit) => (
            <button
              key={unit.id}
              type="button"
              title={`Convert to ${unit.name}`}
              onClick={() =>
                setConv({ to: unit.id, edited: 'a', ...(isCurrency ? { rate: '' } : {}) })
              }
              className="flex min-h-12 min-w-0 cursor-pointer flex-col justify-center rounded-tab border border-line bg-sunk px-3 py-1.5 text-left"
            >
              <span className="font-mono tabular-nums [overflow-wrap:anywhere]">{unit.text}</span>
              <span className="text-[0.8rem] text-muted">{unit.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
