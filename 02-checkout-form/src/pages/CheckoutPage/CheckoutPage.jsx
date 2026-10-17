import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { detectBrand, formatCard } from '@/features/checkout/card'
import { SAVED_CARD, STEPS } from '@/features/checkout/catalog'
import { CheckoutHeader } from '@/features/checkout/CheckoutHeader'
import { ConfirmStep } from '@/features/checkout/ConfirmStep'
import { DoneView } from '@/features/checkout/DoneView'
import { MobileSummaryBar } from '@/features/checkout/MobileSummaryBar'
import { PaymentStep } from '@/features/checkout/PaymentStep'
import { PlanStep } from '@/features/checkout/PlanStep'
import { formatTotal } from '@/features/checkout/pricing'
import { ProgressSteps } from '@/features/checkout/ProgressSteps'
import { PrototypeControls } from '@/features/checkout/PrototypeControls'
import { emailSchema } from '@/features/checkout/schemas'
import { SummaryCard } from '@/features/checkout/SummaryCard'
import { useGoStep } from '@/features/checkout/useGoStep'
import { useOrder } from '@/features/checkout/useOrder'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

const focusHeading = () => document.getElementById('step-h')?.focus({ preventScroll: true })

/** The Tempest Line subscription checkout, following checkout-ivy-hall.html. */
export function CheckoutPage() {
  useDocumentTitle('Checkout')
  const step = useCheckoutStore((state) => state.step)
  const result = useCheckoutStore((state) => state.result)
  const update = useCheckoutStore((state) => state.update)
  const updateCard = useCheckoutStore((state) => state.updateCard)
  const restartCheckout = useCheckoutStore((state) => state.restart)
  const goStep = useGoStep()
  const queryClient = useQueryClient()
  const { status, totals } = useOrder()
  const firstStep = useRef(true)

  const done = step === 'done'
  const index = STEPS.findIndex((s) => s.id === step)

  // A new step: back to the top, focus its heading.
  useEffect(() => {
    if (firstStep.current) {
      firstStep.current = false
      return
    }
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    window.scrollTo?.({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    focusHeading()
  }, [step])

  // Browser Back and Forward move between steps, never past a finished payment.
  useEffect(() => {
    try {
      window.history.replaceState({ step: 'plan' }, '')
    } catch {
      // History can be unavailable in sandboxed previews.
    }
    function onPopState(event) {
      const state = useCheckoutStore.getState()
      let target = event.state?.step
      if (!target || target === 'done' || state.step === 'done' || queryClient.isMutating()) return
      if (target === 'confirm' && !state.payment) target = 'payment'
      goStep(target, { push: false })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [goStep, queryClient])

  const restart = useCallback(() => {
    restartCheckout()
    queryClient.resetQueries({ queryKey: ['checkout', 'plans'] })
    goStep('plan')
  }, [restartCheckout, queryClient, goStep])

  function signIn() {
    update({ signedIn: true, useSaved: true })
    requestAnimationFrame(focusHeading)
  }

  function onBack() {
    if (done) return restart()
    if (step === 'plan') return focusHeading()
    goStep('plan')
  }

  function goTo(target) {
    goStep(target === 'confirm' && !useCheckoutStore.getState().payment ? 'payment' : target)
  }

  function toggleSaved(checked) {
    const { card } = useCheckoutStore.getState()
    update({ signedIn: checked, useSaved: true })
    if (step === 'payment') {
      update({
        billing: checked
          ? { country: SAVED_CARD.country, zip: SAVED_CARD.zip }
          : { country: card.country, zip: card.zip.trim() },
      })
    }
  }

  function fillCard(number) {
    const state = useCheckoutStore.getState()
    const brand = detectBrand(number)
    const zip = /^\d{5}/.test(state.card.zip) ? state.card.zip : '78701'
    updateCard({
      number: formatCard(number, brand),
      exp: '08 / 28',
      cvc: brand === 'amex' ? '1234' : '123',
      name: 'Alexandria Montgomery-Okonkwo',
      country: 'US',
      zip,
    })
    update({ useSaved: false, payAlert: null, cardVersion: state.cardVersion + 1 })
    if (state.step === 'done') return
    if (
      state.step === 'plan' &&
      !state.signedIn &&
      !emailSchema.safeParse({ email: state.email }).success
    ) {
      update({ email: 'alexandria.mo@example.com' })
    }
    if (state.step !== 'payment') goStep('payment')
    else if (state.payment?.kind === 'wallet') update({ payment: null })
    update({ billing: { country: 'US', zip } })
  }

  const steps = {
    plan: <PlanStep onSignIn={signIn} />,
    payment: <PaymentStep />,
    confirm: <ConfirmStep />,
  }

  return (
    <div className="min-h-screen">
      <CheckoutHeader onBack={onBack} />

      <div
        className={`mx-auto max-w-shell px-4 pt-4 md:pt-6 lg:pt-10 ${done ? 'pb-12' : 'pb-35 md:pb-12 lg:pb-16'}`}
      >
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
          <main id="main" className="min-w-0">
            {done ? null : <ProgressSteps step={step} onGoTo={goTo} />}
            <section aria-labelledby="step-h" className="flex flex-col gap-6">
              {done ? (
                <DoneView result={result} onRestart={restart} />
              ) : (
                <>
                  <h2
                    id="step-h"
                    tabIndex={-1}
                    className="font-serif text-heading-lg text-balance focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring lg:text-heading-xl"
                  >
                    {STEPS[index].title}
                  </h2>
                  {steps[step]}
                </>
              )}
            </section>
          </main>

          {done ? null : (
            <aside
              aria-label="Order summary"
              className="hidden min-w-0 md:order-first md:block lg:sticky lg:top-6 lg:order-none"
            >
              <SummaryCard />
            </aside>
          )}
        </div>
      </div>

      <PrototypeControls onToggleSaved={toggleSaved} onFillCard={fillCard} onRestart={restart} />
      {done ? null : <MobileSummaryBar />}

      <div className="sr-only" aria-live="polite">
        {done ? 'Subscription complete' : `Step ${index + 1} of 3: ${STEPS[index].label}`}
      </div>
      <div className="sr-only" aria-live="polite">
        {status === 'ready' && !done ? `Total due today ${formatTotal(totals)}` : ''}
      </div>
    </div>
  )
}
