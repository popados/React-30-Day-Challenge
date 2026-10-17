import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { TextField } from '@/components/TextField'
import { SAVED_CARD, SIGNED_IN_EMAIL, savedPayment } from '@/features/checkout/catalog'
import { ErrorSummary } from '@/features/checkout/ErrorSummary'
import { LinkButton } from '@/features/checkout/LinkButton'
import { PlanOptions } from '@/features/checkout/PlanOptions'
import { taxQuery } from '@/features/checkout/queries'
import { emailSchema, TAKEN_MESSAGE } from '@/features/checkout/schemas'
import { useGoStep } from '@/features/checkout/useGoStep'
import { useOrder } from '@/features/checkout/useOrder'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

const LEDE =
  'Every plan includes the full practice library, spaced review and weekly progress reports.'

export function PlanStep({ onSignIn }) {
  const { status, plans } = useOrder()
  const email = useCheckoutStore((state) => state.email)
  const signedIn = useCheckoutStore((state) => state.signedIn)
  const useSaved = useCheckoutStore((state) => state.useSaved)
  const returnToConfirm = useCheckoutStore((state) => state.returnToConfirm)
  const payment = useCheckoutStore((state) => state.payment)
  const card = useCheckoutStore((state) => state.card)
  const update = useCheckoutStore((state) => state.update)
  const goStep = useGoStep()
  const queryClient = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [summary, setSummary] = useState([])

  const { register, handleSubmit, getFieldState, trigger, formState } = useForm({
    defaultValues: { email },
    resolver: zodResolver(emailSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const emailError = formState.errors.email?.message

  async function goOn() {
    setSummary([])
    if (returnToConfirm && payment) {
      update({ returnToConfirm: false })
      goStep('confirm')
      return
    }
    if (signedIn && useSaved) {
      // Returning customer: the saved card is the payment, so skip straight to Confirm.
      const billing = { country: SAVED_CARD.country, zip: SAVED_CARD.zip }
      setBusy(true)
      update({ billing })
      try {
        await queryClient.fetchQuery(taxQuery(billing))
        update({ payment: savedPayment(), payAlert: null, returnToConfirm: false })
        goStep('confirm')
      } catch {
        goStep('payment')
      } finally {
        setBusy(false)
      }
      return
    }
    update({ billing: { country: card.country, zip: card.zip.trim() } })
    goStep('payment')
  }

  const onContinue = signedIn
    ? goOn
    : handleSubmit(goOn, (errors) =>
        setSummary([{ id: 'f-email', label: 'Email', message: errors.email.message }]),
      )

  if (status === 'loading') {
    return (
      <>
        <p className="max-w-[60ch] text-graphite">{LEDE}</p>
        <div className="grid gap-3" aria-busy="true">
          {[0, 1, 2].map((key) => (
            <div key={key} className="h-23 rounded-md bg-paper-deep" />
          ))}
          <span className="sr-only">Loading plans</span>
        </div>
      </>
    )
  }

  if (status === 'empty') {
    return (
      <>
        <p className="max-w-[60ch] text-graphite">{LEDE}</p>
        <Alert
          tone="info"
          title="No plans are available right now"
          action={<Button onClick={() => plans.refetch()}>Retry</Button>}
        >
          Plans couldn’t be loaded. Try again in a moment.
        </Alert>
      </>
    )
  }

  return (
    <>
      <ErrorSummary items={summary} />
      <p className="max-w-[60ch] text-graphite">{LEDE}</p>
      <PlanOptions plans={plans.data} />

      {signedIn ? (
        <p className="text-body-sm text-graphite">
          Signed in as <strong className="font-medium text-ink">{SIGNED_IN_EMAIL}</strong>.{' '}
          <LinkButton inline onClick={() => update({ signedIn: false })}>
            Not you?
          </LinkButton>
          {useSaved ? (
            <>
              <br />
              You’ll pay with your saved Visa ending 4242. You can change it on the next screen.
            </>
          ) : null}
        </p>
      ) : (
        <TextField
          id="f-email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="name@example.com"
          helper="We’ll send your receipt here. No password needed to check out."
          error={
            emailError === TAKEN_MESSAGE ? (
              <>
                {emailError}{' '}
                <LinkButton inline onClick={onSignIn}>
                  Sign in
                </LinkButton>
              </>
            ) : (
              emailError
            )
          }
          {...register('email', {
            onChange: (event) => {
              update({ email: event.target.value })
              if (getFieldState('email').error) trigger('email')
            },
            onBlur: (event) => {
              if (event.target.value || getFieldState('email').error) trigger('email')
            },
          })}
        />
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          onClick={onContinue}
          disabled={busy}
          className="flex-[1_1_220px] md:min-w-60 md:flex-none"
        >
          {busy ? (
            <>
              <Icon name="loader-circle" className="animate-spin" />
              Checking tax…
            </>
          ) : signedIn && useSaved ? (
            'Continue to review'
          ) : (
            'Continue to payment'
          )}
        </Button>
      </div>
    </>
  )
}
