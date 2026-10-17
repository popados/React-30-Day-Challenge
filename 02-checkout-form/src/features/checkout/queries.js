import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { fetchPlans, fetchTax, submitPayment } from '@/features/checkout/api'
import { COUNTRIES } from '@/features/checkout/catalog'

export const checkoutKeys = {
  plans: (empty) => ['checkout', 'plans', { empty }],
  tax: (country, zip) => ['checkout', 'tax', { country, zip }],
}

export function usePlans(empty) {
  return useQuery({
    queryKey: checkoutKeys.plans(empty),
    queryFn: () => fetchPlans({ empty }),
    retry: false,
    staleTime: Infinity,
  })
}

/** A billing location is ready for tax once its ZIP is complete (US) or not needed. */
export function billingReady(billing) {
  if (!billing) return false
  if (billing.country !== 'US' || !COUNTRIES[billing.country].postal) return true
  return /^\d{5}(-\d{4})?$/.test(billing.zip ?? '')
}

export const taxQuery = (billing) =>
  queryOptions({
    queryKey: checkoutKeys.tax(billing?.country, billing?.zip ?? ''),
    queryFn: () => fetchTax(billing),
    retry: false,
    staleTime: Infinity,
  })

/**
 * Tax for the current billing location, as one status the UI can show:
 * idle (no complete ZIP yet), loading, error or ready.
 */
export function useTax(billing) {
  const ready = billingReady(billing)
  const query = useQuery({ ...taxQuery(billing), enabled: ready })
  if (!ready) return { status: 'idle', rate: 0, refetch: query.refetch }
  if (query.isError) return { status: 'error', rate: 0, refetch: query.refetch }
  if (query.isPending || query.isFetching)
    return { status: 'loading', rate: 0, refetch: query.refetch }
  return { status: 'ready', ...query.data, refetch: query.refetch }
}

export function useSubmitPayment() {
  return useMutation({ mutationFn: submitPayment })
}
