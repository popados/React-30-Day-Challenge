import { create } from 'zustand'

// Checkout state shared by the steps, the order summary and the mobile total bar.
// Server data (plans, tax) lives in TanStack Query; card number and CVC stay in
// memory only and are cleared once a payment goes through.

const EMPTY_CARD = { number: '', exp: '', cvc: '', name: '', country: 'US', zip: '', save: false }

const freshCheckout = () => ({
  step: 'plan',
  planId: 'plus-monthly',
  tutor: false,
  email: '',
  useSaved: true,
  card: { ...EMPTY_CARD },
  /** Where tax is calculated from: { country, zip }. */
  billing: null,
  /** The payment method chosen on the Payment step, shown on Confirm. */
  payment: null,
  consent: false,
  returnToConfirm: false,
  payAlert: null,
  confirmAlert: null,
  result: null,
  /** Bumped when card details are filled from outside the form, so it re-reads them. */
  cardVersion: 0,
})

export const useCheckoutStore = create((set) => ({
  ...freshCheckout(),
  signedIn: false,
  dev: { apple: false, google: false, empty: false },

  update: (patch) => set(patch),
  updateCard: (patch) => set((state) => ({ card: { ...state.card, ...patch } })),
  setDev: (key, value) => set((state) => ({ dev: { ...state.dev, [key]: value } })),
  /** Start over, keeping the prototype switches and whether the person is signed in. */
  restart: () => set(freshCheckout()),
}))
