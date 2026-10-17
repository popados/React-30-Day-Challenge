import { cents, fmt, grp, money, numTxt, pctTxt } from '@/features/calculator/format'

// A number field: key, label, default, suffix ("%"), optional (empty counts as 0).
const num = (k, l, d, suf, opt) => ({ type: 'num', k, l, d, suf, opt })

/** Percent mode: each calculation's fields and its result. */
export const PERCENT_CALCS = {
  of: {
    tab: '% of',
    fields: [num('p', 'Percent', '15', '%'), num('y', 'Of value', '240')],
    calc: ({ p, y }) => {
      const r = (p * y) / 100
      const raw = fmt(r, 10)
      return {
        line: `${numTxt(p)}% of ${numTxt(y)}`,
        value: grp(raw),
        raw,
        rows: [
          [`${numTxt(y)} + ${numTxt(p)}%`, numTxt(y + r)],
          [`${numTxt(y)} − ${numTxt(p)}%`, numTxt(y - r)],
        ],
      }
    },
  },
  ratio: {
    tab: 'What %',
    fields: [num('x', 'Value', '45'), num('y', 'Of total', '180')],
    calc: ({ x, y }) => {
      if (y === 0) throw new Error('The total can’t be 0')
      const r = (x / y) * 100
      return {
        line: `${numTxt(x)} is what % of ${numTxt(y)}`,
        value: `${pctTxt(r)}%`,
        raw: String(parseFloat(r.toFixed(2))),
        rows: [['As a fraction', fmt(x / y, 8)]],
      }
    },
  },
  change: {
    tab: '% change',
    fields: [num('a', 'From', '80'), num('b', 'To', '92')],
    calc: ({ a, b }) => {
      if (a === 0) throw new Error('The starting value can’t be 0')
      const r = ((b - a) / Math.abs(a)) * 100
      return {
        line: `${numTxt(a)} → ${numTxt(b)}`,
        value: `${r > 0 ? '+' : ''}${pctTxt(r)}%`,
        raw: String(parseFloat(r.toFixed(2))),
        rows: [
          ['Difference', `${b - a > 0 ? '+' : ''}${numTxt(b - a)}`],
          ['Direction', r > 0 ? 'Increase' : r < 0 ? 'Decrease' : 'No change'],
        ],
      }
    },
  },
  discount: {
    tab: 'Discount',
    fields: [
      num('price', 'Price', '129.99'),
      num('d1', 'Discount', '25', '%'),
      num('d2', 'Extra discount', '10', '%', true),
      num('t', 'Sales tax', '8.25', '%', true),
    ],
    hint: 'Stacked discounts apply one after the other. Money is rounded to the cent at each step.',
    calc: ({ price, d1, d2, t }) => {
      if (price < 0) throw new Error('The price can’t be negative')
      if (d1 > 100 || d2 > 100) throw new Error('A discount can’t be more than 100%')
      const sale = cents(cents(price * (1 - d1 / 100)) * (1 - d2 / 100))
      const saved = cents(price - sale)
      const tax = cents((sale * t) / 100)
      const total = cents(sale + tax)
      const rows = [
        ['Sale price', money(sale)],
        ['You save', money(saved) + (price ? `  (${pctTxt((saved / price) * 100)}%)` : '')],
      ]
      if (t) rows.push([`Tax ${pctTxt(t)}%`, money(tax)], ['Total to pay', money(total)])
      return {
        line:
          `${money(price)} − ${pctTxt(d1)}%` +
          (d2 ? ` − ${pctTxt(d2)}%` : '') +
          (t ? ` + ${pctTxt(t)}% tax` : ''),
        value: money(total),
        raw: total.toFixed(2),
        rows,
      }
    },
  },
  tax: {
    tab: 'Tax / VAT',
    fields: [
      num('a', 'Amount', '250'),
      num('r', 'Tax rate', '20', '%'),
      {
        type: 'seg',
        k: 'm',
        l: 'The amount is',
        d: 'add',
        opts: [
          ['add', 'Before tax'],
          ['extract', 'Tax included'],
        ],
      },
    ],
    calc: ({ a, r, m }) => {
      if (r < 0) throw new Error('The tax rate can’t be negative')
      let net
      let tax
      let gross
      if (m === 'add') {
        net = cents(a)
        tax = cents((a * r) / 100)
        gross = cents(net + tax)
      } else {
        gross = cents(a)
        net = cents(a / (1 + r / 100))
        tax = cents(gross - net)
      }
      const main = m === 'add' ? gross : net
      return {
        line: `${money(a)}${m === 'add' ? ' + ' : ' incl. '}${pctTxt(r)}% tax`,
        value: money(main),
        raw: main.toFixed(2),
        rows: [
          ['Net', money(net)],
          ['Tax', money(tax)],
          ['Gross', money(gross)],
        ],
      }
    },
  },
}
