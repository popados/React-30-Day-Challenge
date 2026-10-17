import { PLANS } from '@/features/checkout/catalog'
import { computeTotals, disclosureParts, formatTotal } from '@/features/checkout/pricing'

const [monthly, schoolYear] = PLANS

describe('pricing', () => {
  it('leaves tax out of the total until the rate is known', () => {
    const totals = computeTotals(monthly, false, { status: 'idle' })
    expect(totals).toMatchObject({ sub: 9.99, tax: 0, known: false, total: 9.99 })
    expect(formatTotal(totals)).toBe('$9.99 + tax')
  })

  it('adds the Tutor add-on and tax once the rate arrives', () => {
    const totals = computeTotals(monthly, true, { status: 'ready', rate: 8.25 })
    expect(totals).toMatchObject({ sub: 34.98, tax: 2.89, known: true, total: 37.87 })
    expect(formatTotal(totals)).toBe('$37.87')
  })

  it('puts the price and interval in the commit button', () => {
    const totals = computeTotals(monthly, false, { status: 'ready', rate: 0 })
    expect(disclosureParts(monthly, false, totals).button).toBe('Subscribe · $9.99/month')
    expect(disclosureParts(schoolYear, false, totals).button).toBe('Pay $59.99 for the school year')
    expect(disclosureParts(schoolYear, true, totals).button).toBe(
      'Subscribe · $59.99 + $24.99/month',
    )
  })
})
