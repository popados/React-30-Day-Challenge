import { useState } from 'react'
import { FUNCTION_KEYS, KEY_LABELS, MAIN_KEYS, QUICK_KEYS } from '@/features/calculator/sciKeys'
import { useCalculatorStore } from '@/stores/useCalculatorStore'

const PAD = 'grid grid-cols-5 gap-2 phone:gap-1.5 landscape:gap-[5px]'

// Key height steps down with the layout; function keys are shorter.
const TALL =
  'min-h-16 tablet:min-h-[clamp(60px,6.8svh,84px)] phone:min-h-[clamp(52px,9.4svh,80px)] landscape:min-h-[clamp(44px,14svh,60px)] landscape-narrow:min-h-11'
const SHORT =
  'min-h-12 phone:min-h-[46px] landscape:min-h-[clamp(44px,14svh,60px)] landscape-narrow:min-h-11'

// Numbers white, operators blue, functions grey, clear and delete red, "=" orange and two rows tall.
const ROLE = {
  num: `${TALL} border-line bg-num text-num-ink text-2xl shadow-soft landscape:text-lg`,
  op: `${TALL} bg-op text-op-ink text-[1.7rem] font-semibold landscape:text-[1.35rem]`,
  fn: `${SHORT} border-line bg-fn text-fn-ink text-base phone:text-[0.95rem] landscape:text-[0.85rem]`,
  eq: `${TALL} row-span-2 bg-eq text-eq-ink text-3xl font-bold`,
  clr: `${TALL} bg-clr text-clr-ink text-lg font-semibold`,
  del: `${TALL} bg-clr text-clr-ink text-xl`,
}

function Key({ label, role, action, extra = '' }) {
  const sciPress = useCalculatorStore((state) => state.sciPress)
  const pressed = useCalculatorStore((state) => state.pressedKey === label)

  return (
    <button
      type="button"
      aria-label={KEY_LABELS[label]}
      // Keep focus where it is on pointer taps, so typing on a keyboard still works.
      onPointerDown={(event) => event.pointerType !== 'keyboard' && event.preventDefault()}
      onClick={() => sciPress(action)}
      className={`cursor-pointer touch-manipulation rounded-key border border-transparent font-mono font-medium transition-[transform,filter] duration-75 select-none active:scale-96 active:brightness-93 ${
        pressed ? 'scale-96 brightness-93' : ''
      } ${ROLE[role]} ${label === 'EXP' ? 'text-[1.05rem]!' : ''} ${extra}`}
    >
      {label}
    </button>
  )
}

/** Function keys (folding behind "More" on narrow screens) over numbers and operators. */
export function ScientificPad() {
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <div className="landscape:grid landscape:grid-cols-2 landscape:gap-2 landscape-narrow:grid-cols-1 landscape-narrow:gap-[5px]">
      <div id="fn-pad" role="group" aria-label="Functions" className={PAD}>
        {FUNCTION_KEYS.map(([label, action]) => {
          const quick = QUICK_KEYS.includes(label)
          let fold = ''
          if (!moreOpen) fold = quick ? 'fold:-order-1' : 'fold:hidden'
          return <Key key={label} label={label} role="fn" action={action} extra={fold} />
        })}
        <button
          type="button"
          aria-controls="fn-pad"
          aria-expanded={moreOpen}
          onClick={() => setMoreOpen((open) => !open)}
          className={`${SHORT} hidden cursor-pointer rounded-key border border-line bg-fn font-sans text-[0.85rem] font-semibold text-fn-ink fold:block ${
            moreOpen ? 'fold:col-span-full' : ''
          }`}
        >
          {moreOpen ? 'Fewer functions' : 'More'}
        </button>
      </div>

      <div
        role="group"
        aria-label="Numbers and operators"
        className={`${PAD} mt-3 phone:mt-2 landscape:mt-0`}
      >
        {MAIN_KEYS.map(([label, role, action]) => (
          <Key key={label} label={label} role={role} action={action} />
        ))}
      </div>
    </div>
  )
}
