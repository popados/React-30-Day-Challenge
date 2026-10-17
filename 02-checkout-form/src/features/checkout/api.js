// Mock checkout services, with the delays and failure cases from the prototype.
// Swap these for real calls through lib/apiClient.js when a backend exists.
import { PLANS } from '@/features/checkout/catalog'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** @param {{empty?: boolean}} options `empty` simulates the plans service returning nothing. */
export async function fetchPlans({ empty = false } = {}) {
  await wait(800)
  return empty ? [] : PLANS
}

// Sales-tax rate by the first digit of a US ZIP code (mock).
const TAX_BY_PREFIX = {
  0: 6.35,
  1: 8.875,
  2: 6,
  3: 7,
  4: 6,
  5: 7.5,
  6: 8.25,
  7: 8.25,
  8: 8.6,
  9: 8.625,
}

export async function fetchTax({ country, zip = '' }) {
  await wait(700)
  if (country !== 'US') return { rate: 0, country, zip }
  if (zip.slice(0, 5) === '00000') throw new Error('tax')
  return { rate: TAX_BY_PREFIX[zip[0]], country, zip }
}

/** Test card 4000…0002 is declined; 4000…0119 times out. */
export async function submitPayment({ cardDigits = '', amount }) {
  if (cardDigits === '4000000000000119') {
    await wait(3000)
    throw new Error('timeout')
  }
  await wait(1400)
  if (cardDigits === '4000000000000002') throw new Error('declined')
  return { charged: amount }
}
