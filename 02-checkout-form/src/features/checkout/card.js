// Card helpers: brand detection, formatting and checks. Card number and CVC
// stay in memory only and are dropped once a payment completes.

export const digits = (value) => String(value ?? '').replace(/\D/g, '')

export function detectBrand(d) {
  if (/^3[47]/.test(d)) return 'amex'
  if (/^4/.test(d)) return 'visa'
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(d)) return 'mastercard'
  if (/^(6011|65|64[4-9])/.test(d)) return 'discover'
  return null
}

export const cardLength = (brand) => (brand === 'amex' ? 15 : 16)
export const cvcLength = (brand) => (brand === 'amex' ? 4 : 3)

/** Groups digits 4-4-4-4, or 4-6-5 for American Express. */
export function formatCard(d, brand) {
  if (brand === 'amex')
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)].filter(Boolean).join(' ')
  return (d.match(/.{1,4}/g) ?? []).join(' ')
}

/** "MM / YY" as the person types; a leading 2–9 becomes "0N". */
export function formatExpiry(value, deleting) {
  let d = digits(value).slice(0, 4)
  if (d.length === 1 && Number(d) > 1) d = `0${d}`
  if (d.length > 2) return `${d.slice(0, 2)} / ${d.slice(2)}`
  return d.length === 2 && !deleting ? `${d} / ` : d
}

export function luhn(d) {
  let sum = 0
  let alt = false
  for (let i = d.length - 1; i >= 0; i -= 1) {
    let n = Number(d[i])
    if (alt) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}
