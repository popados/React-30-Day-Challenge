import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { formatTotal } from '@/features/checkout/pricing'
import { SummaryCard } from '@/features/checkout/SummaryCard'
import { useOrder } from '@/features/checkout/useOrder'

/** Phones only: the total pinned to the bottom, opening into the full summary. */
export function MobileSummaryBar() {
  const [open, setOpen] = useState(false)
  const { status, totals } = useOrder()
  const amount = status === 'ready' ? formatTotal(totals) : '—'

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 border-t border-rule bg-paper pb-[env(safe-area-inset-bottom,0px)] md:hidden">
      <div id="summary-sheet" hidden={!open} className="max-h-[65vh] overflow-y-auto px-4 pt-4">
        <SummaryCard />
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="summary-sheet"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-15 w-full cursor-pointer items-center gap-3 bg-transparent px-4 text-left"
      >
        <span className="flex-1 font-medium">Total due today</span>
        <span className="font-serif text-heading-sm tabular-nums">{amount}</span>
        <Icon
          name="chevron-up"
          className={`transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
        />
        <span className="sr-only">, {open ? 'hide' : 'show'} order summary</span>
      </button>
    </div>
  )
}
