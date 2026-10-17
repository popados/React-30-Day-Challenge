import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { disclosureParts, money } from '@/features/checkout/pricing'
import { useOrder } from '@/features/checkout/useOrder'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

const LINE = 'flex items-baseline justify-between gap-4'

/** Totals, the renewal disclosure, consent and the Subscribe button, with nothing between them. */
export function CommitBlock({ submitting, onSubscribe }) {
  const { plan, tutor, tax, totals } = useOrder()
  const consent = useCheckoutStore((state) => state.consent)
  const update = useCheckoutStore((state) => state.update)
  const terms = disclosureParts(plan, tutor, totals)

  let taxLabel = 'Sales tax'
  let taxValue
  if (tax.status === 'ready') {
    taxLabel = tax.country === 'US' ? `Sales tax ${Number(tax.rate.toFixed(3))}%` : 'Tax'
    taxValue = money(totals.tax)
  } else if (tax.status === 'loading') {
    taxValue = (
      <span className="inline-flex items-center gap-1.5 text-body-sm text-graphite">
        <Icon name="loader-circle" size={16} className="animate-spin" />
        Calculating…
      </span>
    )
  } else {
    taxValue = (
      <span className="text-body-sm text-graphite">
        {tax.status === 'error' ? 'Couldn’t calculate' : 'Added after billing ZIP'}
      </span>
    )
  }

  return (
    <>
      <div className="grid gap-3 rounded-lg bg-paper-deep p-5">
        <dl className="m-0 grid gap-3">
          <div className={LINE}>
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{money(totals.sub)}</dd>
          </div>
          <div className={LINE}>
            <dt>{taxLabel}</dt>
            <dd className="text-right tabular-nums">{taxValue}</dd>
          </div>
        </dl>
        <div className={`${LINE} border-t border-rule pt-4`}>
          <span className="font-semibold">Total due today</span>
          <span className="font-serif text-total whitespace-nowrap tabular-nums">
            {money(totals.total)}
            {totals.known ? null : (
              <small className="font-sans text-body-sm font-normal text-graphite"> + tax</small>
            )}
          </span>
        </div>
      </div>

      <p id="disclosure" className="max-w-[62ch]">
        <strong className="font-semibold">{terms.lead}</strong>
        {terms.body}
      </p>

      <label
        className={`grid cursor-pointer grid-cols-[auto_1fr] items-start gap-3 rounded-md border p-4 ${
          consent ? 'border-moss bg-moss-soft' : 'border-rule'
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => update({ consent: event.target.checked })}
          aria-describedby="disclosure"
          className="mt-0.5 size-5 accent-moss"
        />
        <span>{terms.agree}</span>
      </label>
      {consent ? null : (
        <p id="consent-hint" className="flex items-start gap-2 text-body-sm text-graphite">
          <Icon name="info" size={16} className="mt-0.5" />
          <span>Check the box above to agree to the terms. The button stays off until you do.</span>
        </p>
      )}

      <Button
        variant="primary"
        block
        disabled={!consent || submitting}
        onClick={onSubscribe}
        aria-describedby={consent ? undefined : 'consent-hint'}
      >
        {submitting ? (
          <>
            <Icon name="loader-circle" className="animate-spin" />
            Processing…
          </>
        ) : (
          terms.button
        )}
      </Button>
      <p className="text-center text-body-sm text-graphite">
        You won’t be charged until you press the button above.
      </p>
    </>
  )
}
