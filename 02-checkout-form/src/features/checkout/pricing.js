import { TUTOR_PRICE } from '@/features/checkout/catalog'

export const money = (n) => `$${n.toFixed(2)}`
const round2 = (n) => Math.round(n * 100) / 100

// ---- Dates ---------------------------------------------------------------
const TODAY = new Date()

function addMonths(date, n) {
  const result = new Date(date)
  const day = result.getDate()
  result.setDate(1)
  result.setMonth(result.getMonth() + n)
  const last = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate()
  result.setDate(Math.min(day, last))
  return result
}

const formatDate = (d) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export const NEXT_CHARGE = formatDate(addMonths(TODAY, 1))
// The school year ends May 31: this year's if it's before June, otherwise next year's.
export const SCHOOL_YEAR_END = formatDate(
  new Date(TODAY.getMonth() >= 5 ? TODAY.getFullYear() + 1 : TODAY.getFullYear(), 4, 31),
)
export const CURRENT_YEAR = TODAY.getFullYear() % 100
export const CURRENT_MONTH = TODAY.getMonth() + 1

// ---- Totals and copy ------------------------------------------------------

/**
 * @param {object} plan
 * @param {boolean} tutor
 * @param {{status: string, rate?: number}} tax
 */
export function computeTotals(plan, tutor, tax) {
  const sub = round2(plan.price + (tutor ? TUTOR_PRICE : 0))
  const known = tax.status === 'ready'
  const taxAmount = known ? round2((sub * tax.rate) / 100) : 0
  return { sub, tax: taxAmount, known, total: round2(sub + taxAmount) }
}

export const formatTotal = (totals) => money(totals.total) + (totals.known ? '' : ' + tax')

/** The line under the total: what happens after today's charge. */
export function thenText(plan, tutor, totals) {
  if (plan.renews) {
    return `Then ${money(totals.sub)}/month plus tax from ${NEXT_CHARGE}. Cancel anytime.`
  }
  return (
    `The school-year plan does not renew. Access ends ${SCHOOL_YEAR_END}.` +
    (tutor
      ? ` Tutor renews at ${money(TUTOR_PRICE)}/month plus tax and stops when your plan ends.`
      : '')
  )
}

/** Renewal disclosure, the commit button label and the consent wording. */
export function disclosureParts(plan, tutor, totals) {
  if (plan.renews) {
    return {
      lead: `${money(totals.sub)}/month plus tax.`,
      body:
        ` Renews automatically on ${NEXT_CHARGE} and every month until you cancel. Cancel anytime in Settings → Subscription.` +
        (tutor
          ? ` This includes ${plan.name} (${money(plan.price)}) and Tutor (${money(TUTOR_PRICE)}).`
          : ''),
      button: `Subscribe · ${money(totals.sub)}/month`,
      agree: 'I agree to the renewal terms above.',
    }
  }
  return {
    lead: `${money(plan.price)} plus tax, charged once.`,
    body:
      ` Your school-year plan ends on ${SCHOOL_YEAR_END} and does not renew.` +
      (tutor
        ? ` Tutor is ${money(TUTOR_PRICE)}/month plus tax. It renews automatically on ${NEXT_CHARGE} and every month until you cancel, and stops when your plan ends. Cancel anytime in Settings → Subscription.`
        : ''),
    button: tutor
      ? `Subscribe · ${money(plan.price)} + ${money(TUTOR_PRICE)}/month`
      : `Pay ${money(plan.price)} for the school year`,
    agree: tutor ? 'I agree to the renewal terms above.' : 'I agree to the terms above.',
  }
}
