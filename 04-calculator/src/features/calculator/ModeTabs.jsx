import { MODE_DOT } from '@/features/calculator/styles'
import { MODE_NAMES, MODES, useCalculatorStore } from '@/stores/useCalculatorStore'

/** Scientific, Convert, Percent, Dates. A bottom bar on phones; arrow keys move between tabs. */
export function ModeTabs() {
  const mode = useCalculatorStore((state) => state.mode)
  const setMode = useCalculatorStore((state) => state.setMode)

  function onKeyDown(event) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    const index = MODES.indexOf(mode) + (event.key === 'ArrowRight' ? 1 : -1)
    const next = MODES[(index + MODES.length) % MODES.length]
    setMode(next)
    document.getElementById(`tab-${next}`)?.focus()
    event.preventDefault()
  }

  return (
    <div
      role="tablist"
      aria-label="Calculator mode"
      onKeyDown={onKeyDown}
      className="grid min-w-[min(100%,460px)] grid-cols-4 gap-1 rounded-key border border-line bg-sunk p-1 tablet:min-w-[min(100%,420px)] phone:fixed phone:inset-x-0 phone:bottom-0 phone:z-15 phone:min-w-0 phone:gap-0.5 phone:rounded-none phone:border-x-0 phone:border-b-0 phone:bg-panel phone:px-2.5 phone:pt-1.5 phone:pb-[calc(6px+env(safe-area-inset-bottom,0px))] landscape:min-w-0 landscape:flex-[0_1_440px] landscape:p-[3px]"
    >
      {MODES.map((m, index) => {
        const selected = m === mode
        return (
          <button
            key={m}
            id={`tab-${m}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`mode-${m}`}
            tabIndex={selected ? 0 : -1}
            title={`${MODE_NAMES[m]} (Alt+${index + 1})`}
            onClick={() => setMode(m)}
            className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-tab px-2.5 font-semibold phone:min-h-14 phone:flex-col phone:gap-1 phone:px-1 phone:text-[0.82rem] landscape:min-h-11 ${
              selected
                ? 'bg-panel text-ink shadow-soft phone:bg-sunk phone:shadow-none'
                : 'bg-transparent text-muted'
            }`}
          >
            <span
              aria-hidden="true"
              className={`size-2 shrink-0 rounded-full ${MODE_DOT[m]} ${selected ? '' : 'opacity-55'}`}
            />
            {MODE_NAMES[m]}
            <span
              aria-hidden="true"
              className="font-mono text-[0.72rem] font-medium tablet:hidden touch:hidden"
            >
              {index + 1}
            </span>
          </button>
        )
      })}
    </div>
  )
}
