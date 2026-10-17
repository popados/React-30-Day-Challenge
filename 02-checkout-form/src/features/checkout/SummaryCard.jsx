import { Icon } from '@/components/Icon'
import { TUTOR_PRICE } from '@/features/checkout/catalog'
import { money, thenText } from '@/features/checkout/pricing'
import { useOrder } from '@/features/checkout/useOrder'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

const CARD = 'grid gap-4 rounded-lg bg-paper-deep p-6 lg:p-8'
const LINE = 'flex items-baseline justify-between gap-4'
const SMALL = 'text-body-sm text-graphite'

/** Tax line: label and value change as the tax service answers. */
function TaxLine({ tax, step, taxAmount }) {
  let label = 'Sales tax'
  let note = null
  let value
  if (tax.status === 'ready' && tax.country !== 'US') {
    label = 'Tax'
    note = 'Not collected outside the US'
    value = money(0)
  } else if (tax.status === 'ready') {
    note = `${Number(tax.rate.toFixed(3))}% · ZIP ${tax.zip.slice(0, 5)}`
    value = money(taxAmount)
  } else if (tax.status === 'loading') {
    value = (
      <span className="inline-flex items-center gap-1.5 text-body-sm text-graphite">
        <Icon name="loader-circle" size={16} className="animate-spin" />
        Calculating…
      </span>
    )
  } else if (tax.status === 'error') {
    value = <span className={SMALL}>Couldn’t calculate</span>
  } else {
    value = (
      <span className={SMALL}>
        {step === 'plan' ? 'Calculated at next step' : 'Added after billing ZIP'}
      </span>
    )
  }
  return (
    <div className={LINE}>
      <dt className="grid min-w-0">
        {label}
        {note ? <small className={SMALL}>{note}</small> : null}
      </dt>
      <dd className="text-right whitespace-nowrap tabular-nums">{value}</dd>
    </div>
  )
}

export function SummaryCard() {
  const step = useCheckoutStore((state) => state.step)
  const { status, plan, tutor, tax, totals } = useOrder()

  if (status === 'loading') {
    return (
      <div className={CARD} aria-busy="true">
        <h2 className="font-serif text-heading-sm">Order summary</h2>
        <div className="grid gap-3">
          <div className="h-4 w-3/5 rounded-sm bg-hairline" />
          <div className="h-4 rounded-sm bg-hairline" />
          <div className="h-4 rounded-sm bg-hairline" />
          <div className="h-4 w-2/5 rounded-sm bg-hairline" />
        </div>
        <span className="sr-only">Loading your order</span>
      </div>
    )
  }

  if (status === 'empty') {
    return (
      <div className={CARD}>
        <h2 className="font-serif text-heading-sm">Order summary</h2>
        <p className={SMALL}>Your order will show here once a plan is available.</p>
      </div>
    )
  }

  return (
    <div className={CARD}>
      <h2 className="font-serif text-heading-sm">Order summary</h2>
      <div className="grid gap-0.5">
        <span className="font-serif text-note font-semibold">{plan.product}</span>
        <span className={SMALL}>{plan.billed}</span>
      </div>
      <dl className="m-0 grid gap-3">
        <div className={LINE}>
          <dt className="grid min-w-0">
            {plan.name}
            <small className={SMALL}>{plan.renews ? 'Renews monthly' : 'Does not renew'}</small>
          </dt>
          <dd className="text-right whitespace-nowrap tabular-nums">
            {money(plan.price)}
            {plan.renews ? <small className={SMALL}>/mo</small> : null}
          </dd>
        </div>
        {tutor ? (
          <div className={LINE}>
            <dt className="grid min-w-0">
              Tutor add-on
              <small className={SMALL}>4 live 30-minute sessions/month</small>
            </dt>
            <dd className="text-right whitespace-nowrap tabular-nums">
              {money(TUTOR_PRICE)}
              <small className={SMALL}>/mo</small>
            </dd>
          </div>
        ) : null}
        <div className={`${LINE} border-t border-hairline pt-3`}>
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{money(totals.sub)}</dd>
        </div>
        <TaxLine tax={tax} step={step} taxAmount={totals.tax} />
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
      <p className={SMALL}>{thenText(plan, tutor, totals)}</p>
    </div>
  )
}
