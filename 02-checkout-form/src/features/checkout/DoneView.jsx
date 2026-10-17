import { useState } from 'react'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { describePayment } from '@/features/checkout/paymentText'
import { money, NEXT_CHARGE, SCHOOL_YEAR_END } from '@/features/checkout/pricing'

const ROW = 'flex flex-wrap justify-between gap-4'

/** After payment: what was bought, what was charged and what happens next. */
export function DoneView({ result, onRestart }) {
  const [showManageNote, setShowManageNote] = useState(false)
  const { plan, tutor } = result

  return (
    <div className="grid max-w-[560px] gap-6">
      <div className="grid size-14 place-items-center rounded-full bg-moss-soft text-moss">
        <Icon name="check" size={28} />
      </div>
      <h2
        id="step-h"
        tabIndex={-1}
        className="font-serif text-heading-lg focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring lg:text-heading-xl"
      >
        You’re subscribed
      </h2>
      <p>
        {plan.product} is ready.{' '}
        {plan.renews
          ? 'Your plan renews monthly until you cancel.'
          : `Your school-year plan runs until ${SCHOOL_YEAR_END}.`}
      </p>
      <dl className="m-0 grid gap-3 border-t border-hairline pt-4">
        <div className={ROW}>
          <dt className="text-graphite">Plan</dt>
          <dd className="m-0 font-medium">
            {plan.name}
            {tutor ? ' + Tutor' : ''}
          </dd>
        </div>
        <div className={ROW}>
          <dt className="text-graphite">Charged today</dt>
          <dd className="m-0 font-medium tabular-nums">{money(result.charged)}</dd>
        </div>
        {plan.renews || tutor ? (
          <div className={ROW}>
            <dt className="text-graphite">Next charge</dt>
            <dd className="m-0 font-medium tabular-nums">
              {money(result.recurring)} plus tax on {NEXT_CHARGE}
            </dd>
          </div>
        ) : null}
        {plan.renews ? null : (
          <div className={ROW}>
            <dt className="text-graphite">Plan ends</dt>
            <dd className="m-0 font-medium">{SCHOOL_YEAR_END}</dd>
          </div>
        )}
        <div className={ROW}>
          <dt className="text-graphite">Paid with</dt>
          <dd className="m-0 font-medium">{describePayment(result.payment)}</dd>
        </div>
      </dl>
      <p>
        A receipt is on its way to <strong className="font-medium">{result.email}</strong>.
        {result.saved ? ' Your card is saved for next time.' : ''}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={() => setShowManageNote(true)}>
          Manage subscription
        </Button>
        <Button onClick={onRestart}>Back to Tempest Line</Button>
      </div>
      {showManageNote ? (
        <p className="text-body-sm text-graphite">
          Subscription settings are outside this prototype.
        </p>
      ) : null}
    </div>
  )
}
