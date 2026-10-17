import { useRef } from 'react'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { SAVED_CARD, SIGNED_IN_EMAIL, TUTOR_PRICE } from '@/features/checkout/catalog'
import { CommitBlock } from '@/features/checkout/CommitBlock'
import { LinkButton } from '@/features/checkout/LinkButton'
import { describeBilling, describePayment } from '@/features/checkout/paymentText'
import { money } from '@/features/checkout/pricing'
import { useSubmitPayment } from '@/features/checkout/queries'
import { useGoStep } from '@/features/checkout/useGoStep'
import { useOrder } from '@/features/checkout/useOrder'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

const ROW =
  'grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 p-4 [&+&]:border-t [&+&]:border-hairline'
const DT = 'col-start-1 text-body-sm font-medium text-graphite'
const DD = 'col-start-1 m-0 [overflow-wrap:anywhere]'
const CHANGE = 'col-start-2 row-span-2 row-start-1 self-center'

export function ConfirmStep() {
  const { plan, tutor, totals } = useOrder()
  const payment = useCheckoutStore((state) => state.payment)
  const email = useCheckoutStore((state) => state.email)
  const signedIn = useCheckoutStore((state) => state.signedIn)
  const useSaved = useCheckoutStore((state) => state.useSaved)
  const card = useCheckoutStore((state) => state.card)
  const confirmAlert = useCheckoutStore((state) => state.confirmAlert)
  const update = useCheckoutStore((state) => state.update)
  const updateCard = useCheckoutStore((state) => state.updateCard)
  const goStep = useGoStep()
  const submit = useSubmitPayment()
  const alertRef = useRef(null)

  if (!payment || !plan) return null

  function edit(step) {
    update({ returnToConfirm: true })
    if (step === 'payment') {
      const billing =
        signedIn && useSaved
          ? { country: 'US', zip: SAVED_CARD.zip }
          : { country: card.country, zip: card.zip.trim() }
      update({ payAlert: null, billing })
    }
    goStep(step)
  }

  function subscribe() {
    if (submit.isPending) return
    update({ confirmAlert: null })
    submit.mutate(
      { cardDigits: payment.digits, amount: totals.total },
      {
        onSuccess: (response) => {
          update({
            result: {
              plan,
              tutor,
              charged: response.charged,
              recurring: (plan.renews ? plan.price : 0) + (tutor ? TUTOR_PRICE : 0),
              payment,
              email: signedIn ? SIGNED_IN_EMAIL : email,
              saved: payment.kind === 'card' && card.save,
            },
          })
          updateCard({ number: '', cvc: '' }) // drop card data once the payment is done
          goStep('done')
        },
        onError: (error) => {
          if (error.message === 'declined') {
            updateCard({ cvc: '' })
            update({ payment: null, payAlert: 'declined' })
            goStep('payment')
          } else {
            update({ confirmAlert: 'timeout' })
            requestAnimationFrame(() => alertRef.current?.focus())
          }
        },
      },
    )
  }

  return (
    <>
      {confirmAlert === 'timeout' ? (
        <Alert
          ref={alertRef}
          tabIndex={-1}
          tone="error"
          title="We couldn’t confirm your payment."
          action={<Button onClick={subscribe}>Try again</Button>}
          className="focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          You have not been charged.
        </Alert>
      ) : null}

      <dl className="m-0 rounded-lg border border-hairline">
        <div className={ROW}>
          <dt className={DT}>Plan</dt>
          <dd className={DD}>
            {plan.product} · {plan.name}, {plan.priceText}
            {tutor ? (
              <>
                <br />
                Tutor add-on, {money(TUTOR_PRICE)}/month
              </>
            ) : null}
          </dd>
          <LinkButton className={CHANGE} onClick={() => edit('plan')} aria-label="Change plan">
            Change
          </LinkButton>
        </div>
        <div className={ROW}>
          <dt className={DT}>Receipt to</dt>
          <dd className={DD}>{signedIn ? SIGNED_IN_EMAIL : email}</dd>
          {signedIn ? null : (
            <LinkButton className={CHANGE} onClick={() => edit('plan')} aria-label="Change email">
              Change
            </LinkButton>
          )}
        </div>
        <div className={ROW}>
          <dt className={DT}>Payment</dt>
          <dd className={DD}>
            {describePayment(payment)}
            <br />
            <span className="text-body-sm text-graphite">Billing: {describeBilling(payment)}</span>
          </dd>
          <LinkButton
            className={CHANGE}
            onClick={() => edit('payment')}
            aria-label="Change payment method"
          >
            Change
          </LinkButton>
        </div>
      </dl>

      <CommitBlock submitting={submit.isPending} onSubscribe={subscribe} />
    </>
  )
}
