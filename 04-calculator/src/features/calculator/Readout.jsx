import { Icon } from '@/components/Icon'
import { BUTTON, PRIMARY } from '@/features/calculator/styles'
import { MODE_NAMES, useCalculatorStore } from '@/stores/useCalculatorStore'

/** The pinned readout: expression line, result, error and actions. Always visible. */
export function Readout({ onCopy, onOpenTape, tapeButtonRef }) {
  const mode = useCalculatorStore((state) => state.mode)
  const deg = useCalculatorStore((state) => state.deg)
  const readout = useCalculatorStore((state) => state.readout)
  const tapeCount = useCalculatorStore((state) => state.tape.length)
  const tapeOpen = useCalculatorStore((state) => state.tapeOpen)
  const toggleDeg = useCalculatorStore((state) => state.toggleDeg)
  const saveCurrent = useCalculatorStore((state) => state.saveCurrent)

  return (
    <div className="sticky top-[env(safe-area-inset-top,0px)] z-5 rounded-t-panel border-b border-line bg-panel px-5 pt-4 pb-3.5 @container phone:rounded-t-2xl phone:px-4 phone:py-3 landscape:static landscape:col-start-1 landscape:row-start-1 landscape:rounded-tl-2xl landscape:rounded-tr-none landscape:border-b-0 landscape:px-3.5 landscape:py-3">
      <div className="flex min-h-8 items-center justify-between gap-3">
        <span className="text-xs font-semibold tracking-[0.08em] text-muted uppercase">
          {MODE_NAMES[mode]}
        </span>
        {mode === 'sci' ? (
          <button
            type="button"
            title="Switch angle unit"
            aria-label={`Angle unit: ${deg ? 'degrees' : 'radians'}`}
            onClick={toggleDeg}
            className="min-h-11 min-w-16 cursor-pointer rounded-full border border-line bg-sunk px-3 font-mono text-[0.85rem] font-semibold"
          >
            {deg ? 'DEG' : 'RAD'}
          </button>
        ) : null}
      </div>

      <div
        aria-label="Expression"
        className="mt-1.5 min-h-[1.5em] font-mono text-base text-muted [overflow-wrap:anywhere]"
      >
        {readout.line}
        {readout.ghost ? <span className="opacity-40">{readout.ghost}</span> : null}
      </div>
      {/* Long results shrink to fit the readout width instead of wrapping. */}
      <output
        aria-live="polite"
        style={{ '--len': Math.max(readout.value.length, 6) }}
        className={`mt-1 block text-right font-mono text-[clamp(1.3rem,calc(100cqi/(var(--len,6)*0.62)),3rem)] leading-[1.1] font-semibold tabular-nums transition-opacity duration-150 [overflow-wrap:anywhere] ${
          readout.preview ? 'opacity-55' : ''
        }`}
      >
        {readout.value}
      </output>
      {readout.error ? (
        <div role="alert" className="mt-1 text-right text-[0.9rem] font-medium text-danger">
          {readout.error}
        </div>
      ) : null}

      <div className="mt-2.5 flex flex-wrap justify-end gap-2 phone:gap-1.5">
        <button
          ref={tapeButtonRef}
          type="button"
          aria-controls="tape"
          aria-expanded={tapeOpen}
          onClick={onOpenTape}
          className={`${BUTTON.replace('inline-flex ', '')} mr-auto hidden compact:inline-flex`}
        >
          Tape
          {tapeCount ? (
            <span className="inline-grid h-[22px] min-w-[22px] place-items-center rounded-full bg-ink px-1.5 text-xs font-bold text-panel tabular-nums">
              {tapeCount}
            </span>
          ) : null}
        </button>
        <button type="button" title="Copy result (Alt+C)" onClick={onCopy} className={BUTTON}>
          <Icon name="copy" size={18} />
          Copy
        </button>
        {mode === 'sci' ? null : (
          <button
            type="button"
            title="Save to tape (Enter)"
            onClick={saveCurrent}
            className={`${BUTTON} ${PRIMARY}`}
          >
            Save to tape
          </button>
        )}
      </div>
    </div>
  )
}
