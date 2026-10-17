import { detectBrand, formatCard, formatExpiry, luhn } from '@/features/checkout/card'

describe('card helpers', () => {
  it('detects the card network from the first digits', () => {
    expect(detectBrand('4242')).toBe('visa')
    expect(detectBrand('5555')).toBe('mastercard')
    expect(detectBrand('3782')).toBe('amex')
    expect(detectBrand('6011')).toBe('discover')
    expect(detectBrand('9')).toBeNull()
  })

  it('groups digits 4-4-4-4, and 4-6-5 for American Express', () => {
    expect(formatCard('4242424242424242', 'visa')).toBe('4242 4242 4242 4242')
    expect(formatCard('378282246310005', 'amex')).toBe('3782 822463 10005')
  })

  it('formats the expiry as MM / YY while typing', () => {
    expect(formatExpiry('4')).toBe('04 / ')
    expect(formatExpiry('0828')).toBe('08 / 28')
    expect(formatExpiry('08', true)).toBe('08')
  })

  it('checks card numbers with the Luhn algorithm', () => {
    expect(luhn('4242424242424242')).toBe(true)
    expect(luhn('4242424242424241')).toBe(false)
  })
})
