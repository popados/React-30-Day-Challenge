import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { Icon } from '@/components/Icon'
import { CardForm } from '@/features/checkout/CardForm'
import { SAVED_CARD, savedPayment } from '@/features/checkout/catalog'
import { ErrorSummary } from '@/features/checkout/ErrorSummary'
import { LinkButton } from '@/features/checkout/LinkButton'
import { taxQuery } from '@/features/checkout/queries'
import { SavedCard } from '@/features/checkout/SavedCard'
import { useGoStep } from '@/features/checkout/useGoStep'
import { useOrder } from '@/features/checkout/useOrder'
import { Wallets } from '@/features/checkout/Wallets'
import { walletAvailable } from '@/features/checkout/walletSupport'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

const SAVED_BILLING = { country: SAVED_CARD.country, zip: SAVED_CARD.zip }

export function PaymentStep() {
  const { tax } = useOrder()
  const signedIn = useCheckoutStore((state) => state.signedIn)
  const useSaved = useCheckoutStore((state) => state.useSaved)
  const dev = useCheckoutStore((state) => state.dev)
  const payAlert = useCheckoutStore((state) => state.payAlert)
  const card = useCheckoutStore((state) => state.card)
  const cardVersion = useCheckoutStore((state) => state.cardVersion)
  const update = useCheckoutStore((state) => state.update)
  const goStep = useGoStep()
  const queryClient = useQueryClient()
  const [summary, setSummary] = useState([])
  const [busy, setBusy] = useState(false)

  const apple = walletAvailable('apple', dev)
  const google = walletAvailable('google', dev)

  async function confirmWith(billing, payment) {
    update({ billing })
    try {
      await queryClient.fetchQuery(taxQuery(billing))
      update({ payment, payAlert: null, returnToConfirm: false })
      goStep('confirm')
    } catch {
      // The tax alert explains what to do.
    }
  }

  async function reviewSaved() {
    setBusy(true)
    await confirmWith(SAVED_BILLING, savedPayment())
    setBusy(false)
  }

  function changeCard() {
    update({ useSaved: false, billing: { country: card.country, zip: card.zip.trim() } })
    requestAnimationFrame(() => document.getElementById('f-number')?.focus())
  }

  return (
    <>
      <ErrorSummary items={summary} />

      {payAlert === 'declined' ? (
        <Alert tone="error" title="Your card was declined.">
          Try another card or payment method. Your details are kept; re-enter the security code.
        </Alert>
      ) : null}
      {tax.status === 'error' ? (
        <Alert
          tone="error"
          title="We couldn’t calculate tax."
          action={<Button onClick={() => tax.refetch()}>Try again</Button>}
        >
          Check your ZIP code or try again.
        </Alert>
      ) : null}

      {signedIn && useSaved ? (
        <>
          <SavedCard onChange={changeCard} />
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => goStep('plan')}>Back</Button>
            <Button
              variant="primary"
              disabled={busy}
              onClick={reviewSaved}
              className="flex-[1_1_220px] md:min-w-60 md:flex-none"
            >
              {busy ? (
                <>
                  <Icon name="loader-circle" className="animate-spin" />
                  Checking tax…
                </>
              ) : (
                'Review order'
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
          {apple || google ? (
            <>
              <Wallets apple={apple} google={google} onPaid={confirmWith} />
              <Divider>or pay with card</Divider>
            </>
          ) : null}
          {signedIn ? (
            <p>
              <LinkButton onClick={() => update({ useSaved: true, billing: SAVED_BILLING })}>
                Use Visa ending 4242 instead
              </LinkButton>
            </p>
          ) : null}
          <CardForm key={cardVersion} taxStatus={tax.status} onSummary={setSummary} />
        </>
      )}
    </>
  )
}
