import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/Icon'
import { KeyboardShortcuts } from '@/features/calculator/KeyboardShortcuts'
import { BUTTON, MODE_DOT } from '@/features/calculator/styles'
import { MODE_NAMES, useCalculatorStore } from '@/stores/useCalculatorStore'

const ICON_BUTTON =
  'grid min-h-11 w-11 cursor-pointer place-items-center self-center rounded-tab bg-transparent text-muted hover:bg-sunk hover:text-ink'

/**
 * History tape. A sidebar on wide screens; on phones a bottom sheet (a side
 * drawer in landscape) opened from the readout.
 */
export function Tape({ onCopy, closeButtonRef }) {
  const tape = useCalculatorStore((state) => state.tape)
  const open = useCalculatorStore((state) => state.tapeOpen)
  const restore = useCalculatorStore((state) => state.restore)
  const clearTape = useCalculatorStore((state) => state.clearTape)
  const setTapeOpen = useCalculatorStore((state) => state.setTapeOpen)
  const [confirming, setConfirming] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  // Two-step clear: "Confirm clear" for 3 seconds, then a second press empties the tape.
  function onClear() {
    if (!tape.length) return
    if (!confirming) {
      setConfirming(true)
      timer.current = setTimeout(() => setConfirming(false), 3000)
      return
    }
    clearTimeout(timer.current)
    setConfirming(false)
    clearTape()
  }

  return (
    <aside
      id="tape"
      aria-label="History tape"
      className={`sticky top-[calc(env(safe-area-inset-top,0px)+16px)] flex max-h-[calc(100vh-140px)] min-w-0 flex-col rounded-panel border border-line bg-panel shadow-soft compact:fixed compact:inset-x-0 compact:top-auto compact:bottom-0 compact:z-30 compact:max-h-[min(78vh,640px)] compact:rounded-b-none compact:border-b-0 compact:px-[env(safe-area-inset-left,0px)] compact:pb-[env(safe-area-inset-bottom,0px)] compact:transition-[transform,visibility] compact:duration-250 landscape:top-0 landscape:left-auto landscape:w-[min(360px,82vw)] landscape:max-h-none landscape:rounded-l-panel landscape:rounded-r-none landscape:border landscape:border-r-0 landscape:pt-[env(safe-area-inset-top,0px)] ${
        open
          ? 'compact:visible compact:translate-x-0 compact:translate-y-0'
          : 'compact:invisible compact:translate-y-[105%] landscape:translate-x-[105%] landscape:translate-y-0'
      }`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3.5 compact:relative compact:pt-[18px] compact:before:absolute compact:before:top-1.5 compact:before:left-1/2 compact:before:-ml-5 compact:before:h-1 compact:before:w-10 compact:before:rounded-sm compact:before:bg-line landscape:pt-3.5 landscape:before:hidden">
        <h2 className="m-0 font-display text-lg font-bold">
          Tape
          {tape.length ? (
            <span className="ml-1.5 font-sans text-[0.9rem] font-medium text-muted">
              {tape.length}
            </span>
          ) : null}
        </h2>
        <button type="button" onClick={onClear} className={`${BUTTON} compact:ml-auto`}>
          {confirming ? 'Confirm clear' : 'Clear'}
        </button>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close tape"
          onClick={() => setTapeOpen(false)}
          className={`${ICON_BUTTON} hidden compact:grid`}
        >
          <Icon name="x" size={18} />
        </button>
      </div>

      <ul className="m-0 min-h-30 flex-1 list-none overflow-y-auto p-1.5">
        {tape.length ? (
          tape.map((entry, index) => (
            <li
              key={`${entry.t}-${index}`}
              className="flex items-stretch gap-1 [&+&]:border-t [&+&]:border-dashed [&+&]:border-line"
            >
              <button
                type="button"
                title="Load this calculation"
                onClick={() => restore(entry)}
                className="min-h-15 min-w-0 flex-1 cursor-pointer rounded-tab bg-transparent px-2.5 py-2 text-left hover:bg-sunk"
              >
                <span className="flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.06em] text-muted uppercase">
                  <span className={`size-2 shrink-0 rounded-full ${MODE_DOT[entry.mode]}`} />
                  {MODE_NAMES[entry.mode]}
                </span>
                <span className="block font-mono text-[0.85rem] text-muted [overflow-wrap:anywhere]">
                  {entry.label}
                </span>
                <span className="block font-mono text-[1.1rem] font-semibold tabular-nums [overflow-wrap:anywhere]">
                  {entry.display}
                </span>
              </button>
              <button
                type="button"
                title={`Copy ${entry.raw}`}
                aria-label={`Copy ${entry.raw}`}
                onClick={() => onCopy(entry.raw)}
                className={ICON_BUTTON}
              >
                <Icon name="copy" size={18} />
              </button>
            </li>
          ))
        ) : (
          <li className="bg-panel px-4 py-6 text-center text-muted">
            <strong className="mb-1 block text-ink">Nothing saved yet</strong>
            Press = in Scientific, or Save to tape in the other modes. Tap a saved line to bring it
            back.
          </li>
        )}
      </ul>

      <KeyboardShortcuts />
    </aside>
  )
}
