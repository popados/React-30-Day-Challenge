// Mock catalogue and reference data for the checkout, from checkout-ivy-hall.html.

export const TUTOR_PRICE = 24.99 // assumed: the docs don't set a Tutor price

export const PLANS = [
  {
    id: 'plus-monthly',
    name: 'Plus monthly',
    product: 'Tempest Line Plus',
    price: 9.99,
    renews: true,
    priceText: '$9.99/month',
    billed: 'Billed monthly',
    desc: 'Full practice library, spaced review and progress reports for one learner.',
  },
  {
    id: 'plus-year',
    name: 'Plus school year',
    product: 'Tempest Line Plus',
    price: 59.99,
    renews: false,
    priceText: '$59.99 for the school year (Aug–May)',
    billed: 'One payment, Aug–May',
    desc: 'Everything in Plus monthly for one learner, paid once.',
  },
  {
    id: 'family-monthly',
    name: 'Family monthly',
    product: 'Tempest Line Family',
    price: 17.99,
    renews: true,
    priceText: '$17.99/month for up to 4 learners',
    billed: 'Billed monthly · up to 4 learners',
    desc: 'Plus for up to 4 learner profiles under one payment.',
  },
]

export const SAVED_CARD = {
  brand: 'visa',
  last4: '4242',
  exp: '08/28',
  country: 'US',
  zip: '78701',
}
export const SIGNED_IN_EMAIL = 'maya.okafor@example.com'
export const TAKEN_EMAIL = 'taken@example.com'

export const COUNTRIES = {
  US: { name: 'United States', postal: true },
  CA: { name: 'Canada', postal: true },
  GB: { name: 'United Kingdom', postal: true },
  AU: { name: 'Australia', postal: true },
  DE: { name: 'Germany', postal: true },
  IE: { name: 'Ireland', postal: true },
  HK: { name: 'Hong Kong', postal: false },
  AE: { name: 'United Arab Emirates', postal: false },
}

export const BRAND_NAMES = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
}

// Test values from the prototype controls.
export const TEST_CARDS = [
  { number: '4242424242424242', label: '4242 4242 4242 4242', outcome: 'Payment succeeds' },
  { number: '4000000000000002', label: '4000 0000 0000 0002', outcome: 'Card is declined' },
  { number: '4000000000000119', label: '4000 0000 0000 0119', outcome: 'Payment times out' },
  {
    number: '378282246310005',
    label: '3782 822463 10005',
    outcome: 'American Express, 4-digit CVC',
  },
]
export const TEST_VALUES = [
  { value: '00000', outcome: 'ZIP code makes the tax service fail' },
  { value: TAKEN_EMAIL, outcome: 'Email already has an account' },
]

export const STEPS = [
  { id: 'plan', label: 'Plan', title: 'Choose your plan' },
  { id: 'payment', label: 'Payment', title: 'Payment' },
  { id: 'confirm', label: 'Confirm', title: 'Review and subscribe' },
]

/** The saved card as a payment method, for returning customers. */
export const savedPayment = () => ({
  kind: 'saved',
  brand: SAVED_CARD.brand,
  last4: SAVED_CARD.last4,
  exp: SAVED_CARD.exp,
  country: SAVED_CARD.country,
  zip: SAVED_CARD.zip,
})
