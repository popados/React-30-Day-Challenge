import { evaluate, parseField } from '@/features/calculator/evaluate'
import { fmt, grp } from '@/features/calculator/format'
import { CATEGORIES, convertValue, formatUnit } from '@/features/calculator/units'

// Each mode turns its inputs into a readout:
//   { line, ghost?, value, raw, rows?, preview?, error?, tape? }
// `raw` is what Copy puts on the clipboard; `tape` is what "Save to tape" stores.
// When the input is wrong, the last good readout stays, faded, with the error under it.

const EMPTY = { line: '', value: '—', raw: null, preview: true }
const keepLastGood = (good, message) =>
  good ? { ...good, preview: true, error: message } : { ...EMPTY, error: message }

export const sciDisplay = (tokens) => tokens.map((t) => t.d).join('')
export const sciSource = (tokens) => tokens.map((t) => t.v).join('')
export const openParens = (s) =>
  Math.max(0, (s.match(/\(/g) || []).length - (s.match(/\)/g) || []).length)

/**
 * Scientific: a faded live preview while typing, the answer after "=".
 * Returns the readout and the preview value to keep for next time.
 */
export function sciReadout(sci, ctx) {
  const d = sciDisplay(sci.tokens)
  const ghost = ')'.repeat(openParens(d))
  if (sci.just) {
    const raw = fmt(ctx.ans)
    return { readout: { line: `${d}${ghost} =`, value: grp(raw), raw }, last: sci.last }
  }
  let last = sci.last
  if (!sci.tokens.length) last = null
  else {
    try {
      last = evaluate(sciSource(sci.tokens), ctx)
    } catch {
      // Keep the previous preview while the expression is unfinished.
    }
  }
  const raw = last == null ? '0' : fmt(last)
  return {
    readout: {
      line: d || ' ',
      ghost,
      value: grp(raw),
      raw,
      preview: sci.tokens.length > 0,
      error: sci.err,
    },
    last,
  }
}

/**
 * Convert: two-way. Whichever side was typed in (`edited`) drives the other.
 * Returns the readout, the updated inputs, the "In every unit" list and which
 * side is invalid, if any.
 */
export function convReadout(conv, ctx, good) {
  const isCurrency = Boolean(CATEGORIES[conv.cat].currency)
  try {
    const src = parseField(conv[conv.edited], ctx)
    if (src == null) throw new Error('Enter a value to convert')
    let options = {}
    if (isCurrency) {
      const rate = parseField(conv.rate, ctx)
      if (rate == null || !(rate > 0)) throw new Error('Enter an exchange rate above 0')
      options = { rate, pair: { from: conv.from, to: conv.to } }
    }
    const convert = (x, from, to) => convertValue(conv.cat, x, from, to, options)
    const format = (x, id) => formatUnit(conv.cat, x, id, conv.sig)

    const next = { ...conv }
    let aVal
    let bVal
    if (conv.edited === 'a') {
      aVal = src
      bVal = convert(src, conv.from, conv.to)
      next.b = format(bVal, conv.to)
    } else {
      bVal = src
      aVal = convert(src, conv.to, conv.from)
      next.a = format(aVal, conv.from)
    }
    const raw = format(bVal, conv.to)
    const fromText = grp(format(aVal, conv.from))
    const display = `${grp(raw)} ${conv.to}`
    const readout = {
      line: `${fromText} ${conv.from} =`,
      value: display,
      raw,
      rows: [
        [`1 ${conv.from}`, `${grp(format(convert(1, conv.from, conv.to), conv.to))} ${conv.to}`],
        [`1 ${conv.to}`, `${grp(format(convert(1, conv.to, conv.from), conv.from))} ${conv.from}`],
      ],
      tape: {
        mode: 'conv',
        label: `${fromText} ${conv.from} → ${conv.to}`,
        display,
        raw,
        state: next,
      },
    }
    const all = CATEGORIES[conv.cat].units
      .filter(([id]) => id !== conv.from)
      .map(([id, name]) => ({
        id,
        name,
        text: `${grp(format(convert(aVal, conv.from, id), id))} ${id}`,
      }))
    return { readout, conv: next, good: readout, all, invalid: null }
  } catch (error) {
    return {
      readout: keepLastGood(good, error.message),
      conv,
      good,
      all: null,
      invalid: conv.edited,
    }
  }
}

/** Percent and Dates: a form of fields fed to the calculation's `calc`. */
export function formReadout(mode, calcs, sub, vals, ctx, good) {
  const calc = calcs[sub]
  try {
    const values = {}
    for (const f of calc.fields) {
      if (f.type !== 'num') {
        values[f.k] = vals[f.k]
        continue
      }
      let x
      try {
        x = parseField(vals[f.k], { ...ctx, percent: f.suf === '%' })
      } catch (error) {
        throw Object.assign(new Error(`${f.l}: ${error.message}`), { field: f.k })
      }
      if (x == null) {
        if (f.opt) x = 0
        else throw Object.assign(new Error(`Enter ${f.l.toLowerCase()}`), { field: f.k })
      }
      values[f.k] = x
    }
    const result = calc.calc(values)
    const readout = {
      ...result,
      tape: {
        mode,
        label: result.line,
        display: result.value,
        raw: result.raw,
        state: { sub, vals: { ...vals } },
      },
    }
    return { readout, good: readout, invalid: null }
  } catch (error) {
    return { readout: keepLastGood(good, error.message), good, invalid: error.field ?? null }
  }
}

/** Default field values for every calculation in a form mode. */
export function defaultValues(calcs) {
  return Object.fromEntries(
    Object.entries(calcs).map(([key, calc]) => [
      key,
      Object.fromEntries(calc.fields.map((f) => [f.k, typeof f.d === 'function' ? f.d() : f.d])),
    ]),
  )
}
