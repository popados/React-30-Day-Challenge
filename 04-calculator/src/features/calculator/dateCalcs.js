import { grp } from '@/features/calculator/format'

// All date math runs in UTC days, so time zones and daylight saving never shift a result.
const DAY = 864e5
const parseISO = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '')
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null
}
const iso = (t) => new Date(t).toISOString().slice(0, 10)
const dFmt = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const wFmt = new Intl.DateTimeFormat(undefined, { weekday: 'long', timeZone: 'UTC' })
const todayUTC = () => {
  const n = new Date()
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())
}
const daysInMonth = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate()
const isWeekday = (t) => {
  const w = new Date(t).getUTCDay()
  return w !== 0 && w !== 6
}
const plural = (n, word) => `${grp(String(n))} ${word}${n === 1 ? '' : 's'}`

/** Years, months and days between two UTC times. */
function ymd(lo, hi) {
  const a = new Date(lo)
  const b = new Date(hi)
  let y = b.getUTCFullYear() - a.getUTCFullYear()
  let m = b.getUTCMonth() - a.getUTCMonth()
  let d = b.getUTCDate() - a.getUTCDate()
  if (d < 0) {
    m -= 1
    d += daysInMonth(b.getUTCFullYear(), b.getUTCMonth() - 1)
  }
  if (m < 0) {
    y -= 1
    m += 12
  }
  return [y, m, d]
}

/** Adds months, moving to the month's last day when the day doesn't exist. */
function addMonths(t, n) {
  const a = new Date(t)
  const mo = a.getUTCMonth() + n
  const day = a.getUTCDate()
  const ny = a.getUTCFullYear() + Math.floor(mo / 12)
  const nm = ((mo % 12) + 12) % 12
  const nd = Math.min(day, daysInMonth(ny, nm))
  return { t: Date.UTC(ny, nm, nd), clamped: nd < day }
}

const fieldError = (message, field) => Object.assign(new Error(message), { field })

/** Dates mode: each calculation's fields and its result. */
export const DATE_CALCS = {
  between: {
    tab: 'Between dates',
    fields: [
      { type: 'date', k: 's', l: 'Start date', d: () => iso(todayUTC()) },
      {
        type: 'date',
        k: 'e',
        l: 'End date',
        d: () => iso(Date.UTC(new Date().getFullYear(), 11, 31)),
      },
      { type: 'check', k: 'inc', l: 'Count the end date too', d: false },
    ],
    calc: ({ s, e, inc }) => {
      const a = parseISO(s)
      const b = parseISO(e)
      if (a == null) throw new Error('Pick a start date')
      if (b == null) throw new Error('Pick an end date')
      const lo = Math.min(a, b)
      const hi = Math.max(a, b) + (inc ? DAY : 0)
      const days = Math.round((hi - lo) / DAY)
      if (days > 3660000) throw new Error('Pick dates within 10,000 years of each other')
      let business = 0
      for (let t = lo; t < hi; t += DAY) if (isWeekday(t)) business += 1
      const [y, m, d] = ymd(lo, hi)
      const rows = [
        ['Weeks', `${plural(Math.floor(days / 7), 'week')}, ${plural(days % 7, 'day')}`],
        [
          'Calendar',
          [y && plural(y, 'year'), m && plural(m, 'month'), plural(d, 'day')]
            .filter(Boolean)
            .join(', '),
        ],
        ['Business days (Mon–Fri)', grp(String(business))],
        ['Start', dFmt.format(a)],
        ['End', dFmt.format(b)],
      ]
      if (b < a) rows.push(['Note', 'The end date is before the start date'])
      return {
        line: `${dFmt.format(a)} → ${dFmt.format(b)}${inc ? ', inclusive' : ''}`,
        value: plural(days, 'day'),
        raw: String(days),
        rows,
      }
    },
  },
  add: {
    tab: 'Add or subtract',
    fields: [
      { type: 'date', k: 'd', l: 'Start date', d: () => iso(todayUTC()) },
      {
        type: 'seg',
        k: 'op',
        l: 'Operation',
        d: 'add',
        opts: [
          ['add', 'Add'],
          ['sub', 'Subtract'],
        ],
      },
      { type: 'num', k: 'n', l: 'Amount', d: '90' },
      {
        type: 'select',
        k: 'u',
        l: 'Unit',
        d: 'd',
        opts: [
          ['d', 'Days'],
          ['w', 'Weeks'],
          ['m', 'Months'],
          ['y', 'Years'],
          ['b', 'Business days (Mon–Fri)'],
        ],
      },
    ],
    hint: 'Adding months keeps the day of the month. When that day doesn’t exist, the result moves to the month’s last day (31 Jan + 1 month = 28 or 29 Feb).',
    calc: ({ d, op, n, u }) => {
      const a = parseISO(d)
      if (a == null) throw new Error('Pick a start date')
      if (!Number.isInteger(n)) throw fieldError('Use a whole number for the amount', 'n')
      if (Math.abs(n) > 100000) throw fieldError('Use an amount up to 100,000', 'n')
      const k = op === 'sub' ? -n : n
      let t
      let clamped = false
      if (u === 'd') t = a + k * DAY
      else if (u === 'w') t = a + 7 * k * DAY
      else if (u === 'm' || u === 'y') ({ t, clamped } = addMonths(a, u === 'y' ? 12 * k : k))
      else {
        t = a
        const step = Math.sign(k)
        for (let c = 0; c < Math.abs(k);) {
          t += step * DAY
          if (isWeekday(t)) c += 1
        }
      }
      const year = new Date(t).getUTCFullYear()
      if (year < 1 || year > 9999) throw new Error('The result falls outside the years 1 to 9999')
      const names = { d: 'day', w: 'week', m: 'month', y: 'year', b: 'business day' }
      const rows = [
        ['Weekday', wFmt.format(t)],
        ['ISO date', iso(t)],
        [
          'Calendar days',
          `${t >= a ? '+' : '−'}${grp(String(Math.abs(Math.round((t - a) / DAY))))}`,
        ],
      ]
      if (clamped) rows.push(['Note', 'Moved to the last day of the month'])
      return {
        line: `${dFmt.format(a)}${op === 'sub' ? ' − ' : ' + '}${plural(n, names[u])}`,
        value: dFmt.format(t),
        raw: iso(t),
        rows,
      }
    },
  },
}
