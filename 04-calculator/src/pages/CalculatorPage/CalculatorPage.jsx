import { useCallback, useEffect, useRef } from 'react'
import { copyText } from '@/features/calculator/clipboard'
import { ConvertMode } from '@/features/calculator/ConvertMode'
import { FormMode } from '@/features/calculator/FormMode'
import { ModeTabs } from '@/features/calculator/ModeTabs'
import { Readout } from '@/features/calculator/Readout'
import { ScientificPad } from '@/features/calculator/ScientificPad'
import { Tape } from '@/features/calculator/Tape'
import { Toast } from '@/features/calculator/Toast'
import { useCalculatorKeyboard } from '@/features/calculator/useCalculatorKeyboard'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useCalculatorStore } from '@/stores/useCalculatorStore'

const BODY =
  'px-5 pt-[18px] pb-5 phone:px-3 phone:pt-3 phone:pb-3.5 landscape:col-start-2 landscape:row-span-2 landscape:row-start-1 landscape:border-l landscape:border-line landscape:p-2.5'

/** Calculator Workbench, following calc-mockup.html. */
export function CalculatorPage() {
  useDocumentTitle()
  const mode = useCalculatorStore((state) => state.mode)
  const rows = useCalculatorStore((state) => state.readout.rows)
  const tapeOpen = useCalculatorStore((state) => state.tapeOpen)
  const setTapeOpen = useCalculatorStore((state) => state.setTapeOpen)
  const showToast = useCalculatorStore((state) => state.showToast)
  const tapeButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const firstRun = useRef(true)

  // Copy gives the raw value: "1030", not "1,030"; "-12", not "−12".
  const copy = useCallback(
    async (raw) => {
      if (raw == null) return showToast('There’s no result to copy yet')
      const ok = await copyText(raw)
      showToast(ok ? `Copied ${raw}` : 'Copy was blocked. Select the result to copy it.')
    },
    [showToast],
  )
  const copyResult = useCallback(() => copy(useCalculatorStore.getState().readout?.raw), [copy])
  useCalculatorKeyboard({ onCopy: copyResult })

  // Opening the tape sheet moves focus into it; closing returns focus to the Tape button.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    if (tapeOpen) closeButtonRef.current?.focus()
    else if (tapeButtonRef.current?.offsetParent) tapeButtonRef.current.focus()
  }, [tapeOpen])

  return (
    <>
      <div className="mx-auto max-w-shell px-[max(16px,env(safe-area-inset-left,0px))] pt-5 pb-12 phone:pt-3 phone:pb-[calc(88px+env(safe-area-inset-bottom,0px))] landscape:max-w-none landscape:pt-2 landscape:pb-3">
        <header className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 phone:mb-3 landscape:mb-2 landscape:flex-nowrap landscape:items-center">
          <div>
            <h1 className="m-0 font-display text-[1.6rem] font-bold tracking-[-0.01em] text-balance phone:text-xl landscape:text-lg landscape:whitespace-nowrap">
              Calculator Workbench
            </h1>
            <p className="mt-0.5 text-muted phone:hidden landscape:hidden">
              Scientific, unit and currency, percentage and tax, and date math in one place.
            </p>
          </div>
          <div inert={tapeOpen} className="contents">
            <ModeTabs />
          </div>
        </header>

        <main className="grid grid-cols-[minmax(0,1fr)_330px] items-start gap-5 tablet:grid-cols-[minmax(0,1fr)_280px] tablet:gap-4 compact:grid-cols-1">
          <section
            aria-label="Calculator"
            inert={tapeOpen}
            className="min-w-0 rounded-panel border border-line bg-panel shadow-soft phone:rounded-2xl landscape:grid landscape:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] landscape:grid-rows-[auto_1fr] landscape:rounded-2xl"
          >
            <Readout
              onCopy={copyResult}
              onOpenTape={() => setTapeOpen(true)}
              tapeButtonRef={tapeButtonRef}
            />
            {rows?.length ? (
              <dl className="m-0 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 border-b border-line bg-sunk px-5 py-3.5 phone:px-4 phone:py-2.5 phone:text-[0.9rem] landscape:col-start-1 landscape:row-start-2 landscape:self-start landscape:border-b-0 landscape:px-3.5 landscape:py-2.5 landscape:text-[0.85rem]">
                {rows.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="text-muted">{label}</dt>
                    <dd className="m-0 text-right font-mono tabular-nums [overflow-wrap:anywhere]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <div
              id={`mode-${mode}`}
              role="tabpanel"
              aria-labelledby={`tab-${mode}`}
              className={BODY}
            >
              {mode === 'sci' ? <ScientificPad /> : null}
              {mode === 'conv' ? <ConvertMode /> : null}
              {mode === 'pct' || mode === 'date' ? <FormMode key={mode} mode={mode} /> : null}
            </div>
          </section>

          <Tape onCopy={copy} closeButtonRef={closeButtonRef} />
        </main>
      </div>

      {tapeOpen ? (
        <div
          aria-hidden="true"
          onClick={() => setTapeOpen(false)}
          className="fixed inset-0 z-25 hidden bg-scrim compact:block"
        />
      ) : null}
      <Toast />
    </>
  )
}
