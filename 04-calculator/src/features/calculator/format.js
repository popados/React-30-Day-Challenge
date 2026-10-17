// Number formatting and rounding. Raw strings (for copying) use "-" and no
// separators; display strings group thousands and use a true minus sign.

/** Up to `sig` significant digits; 1e15 and up (or below 1e-9) switch to "1.5e15" style. */
export function fmt(x, sig = 12) {
  if (!Number.isFinite(x)) throw new Error('The result is too large to show')
  if (x === 0) return '0'
  const a = Math.abs(x)
  if (a >= 1e15 || a < 1e-9) {
    return x
      .toExponential(sig - 1)
      .replace(/\.?0+e/, 'e')
      .replace('e+', 'e')
  }
  return String(parseFloat(x.toPrecision(sig)))
}

/** Groups thousands with commas and swaps "-" for "−". Exponent forms are left alone. */
export function grp(s) {
  if (/e/.test(s)) return s
  const negative = s.startsWith('-')
  const [int, frac] = (negative ? s.slice(1) : s).split('.')
  return (
    (negative ? '−' : '') +
    int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (frac != null ? `.${frac}` : '')
  )
}

/** Rounds half away from zero to the cent. */
export const cents = (x) => (Math.sign(x) * Math.round(Math.abs(x) * 100 + 1e-7)) / 100
export const money = (x) => grp(cents(x).toFixed(2))
export const pctTxt = (x) => grp(String(parseFloat(x.toFixed(2))))
export const numTxt = (x) => grp(fmt(x, 10))
