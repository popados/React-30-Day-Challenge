import { z } from 'zod'
import { cardLength, cvcLength, detectBrand, digits, luhn } from '@/features/checkout/card'
import { COUNTRIES, TAKEN_EMAIL } from '@/features/checkout/catalog'
import { CURRENT_MONTH, CURRENT_YEAR } from '@/features/checkout/pricing'

export const TAKEN_MESSAGE = 'You already have an account. Sign in to continue.'
export const TAX_FIX = 'We couldn’t calculate tax. Check the ZIP code or try again.'

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Enter an email like name@example.com')
    .refine((value) => value.toLowerCase() !== TAKEN_EMAIL, TAKEN_MESSAGE),
})

function expiryError(value) {
  const d = digits(value)
  if (d.length !== 4) return 'Enter the expiry as MM / YY'
  const mm = Number(d.slice(0, 2))
  const yy = Number(d.slice(2))
  if (mm < 1 || mm > 12) return 'Enter the expiry as MM / YY'
  if (yy < CURRENT_YEAR || (yy === CURRENT_YEAR && mm < CURRENT_MONTH))
    return 'This card has expired'
  return null
}

// Messages say what to fix, matching the mockup word for word.
export const cardSchema = z
  .object({
    number: z.string(),
    exp: z.string(),
    cvc: z.string(),
    name: z.string(),
    country: z.string(),
    zip: z.string(),
    save: z.boolean(),
  })
  .superRefine((card, ctx) => {
    const issue = (path, message) => ctx.addIssue({ code: 'custom', path: [path], message })
    const d = digits(card.number)
    const brand = detectBrand(d)

    if (!d) issue('number', 'Enter your card number')
    else if (d.length !== cardLength(brand))
      issue('number', `Card number is ${cardLength(brand)} digits. You entered ${d.length}.`)
    else if (!luhn(d)) issue('number', 'Check the card number. It doesn’t look right.')

    const exp = expiryError(card.exp)
    if (exp) issue('exp', exp)

    if (digits(card.cvc).length !== cvcLength(brand)) {
      issue(
        'cvc',
        brand === 'amex'
          ? 'Enter the 4-digit code on the front of your card'
          : 'Enter the 3-digit code on the back of your card',
      )
    }

    if (card.name.trim().length < 2) issue('name', 'Enter the name shown on your card')

    if (COUNTRIES[card.country]?.postal) {
      if (card.country === 'US') {
        if (!/^\d{5}(-\d{4})?$/.test(card.zip.trim())) issue('zip', 'Enter a 5-digit ZIP code')
      } else if (card.zip.trim().length < 3) {
        issue('zip', 'Enter your postal code')
      }
    }
  })

// Field order for the error summary, and the names it uses.
export const CARD_FIELDS = [
  ['number', 'Card number'],
  ['exp', 'Expiry date'],
  ['cvc', 'Security code'],
  ['name', 'Name on card'],
  ['zip', 'ZIP code'],
]
