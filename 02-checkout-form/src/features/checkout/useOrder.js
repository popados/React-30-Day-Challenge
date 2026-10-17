import { usePlans, useTax } from '@/features/checkout/queries'
import { computeTotals } from '@/features/checkout/pricing'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

/**
 * The order as the summary, Confirm step and total bar show it.
 * status: 'loading' | 'empty' | 'ready'.
 */
export function useOrder() {
  const empty = useCheckoutStore((state) => state.dev.empty)
  const planId = useCheckoutStore((state) => state.planId)
  const tutor = useCheckoutStore((state) => state.tutor)
  const billing = useCheckoutStore((state) => state.billing)

  const plans = usePlans(empty)
  const tax = useTax(billing)

  let status = 'ready'
  if (plans.isPending) status = 'loading'
  else if (!plans.data?.length) status = 'empty'

  const plan = plans.data?.find((p) => p.id === planId) ?? plans.data?.[0] ?? null
  const totals = plan ? computeTotals(plan, tutor, tax) : null

  return { status, plans, plan, tutor, tax, totals }
}
