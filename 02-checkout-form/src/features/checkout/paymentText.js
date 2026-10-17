import { BRAND_NAMES, COUNTRIES } from '@/features/checkout/catalog'

/** "Visa ending 4242, expires 08/28" or "Visa •• 4242 via Apple Pay". */
export function describePayment(payment) {
  if (payment.kind === 'wallet') {
    return `${BRAND_NAMES[payment.brand]} •• ${payment.last4} via ${payment.wallet}`
  }
  return `${BRAND_NAMES[payment.brand]} ending ${payment.last4}, expires ${payment.exp}`
}

/** "United States, ZIP 78701" */
export function describeBilling({ country, zip }) {
  const where = COUNTRIES[country].name
  if (!zip) return where
  return `${where}, ${country === 'US' ? 'ZIP ' : ''}${zip}`
}
