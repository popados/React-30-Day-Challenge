import { DATE_CALCS } from '@/features/calculator/dateCalcs'
import { PERCENT_CALCS } from '@/features/calculator/percentCalcs'
import { convReadout, formReadout } from '@/features/calculator/readouts'
import { sampleRate } from '@/features/calculator/units'

const ctx = { deg: true, ans: 0 }
const conv = (patch) =>
  convReadout(
    {
      cat: 'length',
      from: 'km',
      to: 'mi',
      a: '10',
      b: '',
      edited: 'a',
      sig: 6,
      rate: '',
      ...patch,
    },
    ctx,
    null,
  )
const percent = (sub, vals) => formReadout('pct', PERCENT_CALCS, sub, vals, ctx, null).readout
const dates = (sub, vals) => formReadout('date', DATE_CALCS, sub, vals, ctx, null).readout

describe('Convert', () => {
  it('converts both ways', () => {
    expect(conv({}).conv.b).toBe('6.21371')
    expect(conv({ b: '5', edited: 'b' }).conv.a).toBe('8.04672')
  })

  it('shows the reverse rates and respects the precision setting', () => {
    expect(conv({}).readout.rows).toEqual([
      ['1 km', '0.621371 mi'],
      ['1 mi', '1.60934 km'],
    ])
    expect(conv({ sig: 10 }).readout.raw).toBe('6.213711922')
  })

  it('uses an offset for temperature and decimal vs binary for data', () => {
    expect(conv({ cat: 'temperature', from: '°C', to: '°F', a: '1' }).readout.raw).toBe('33.8')
    expect(conv({ cat: 'data', from: 'GB', to: 'GiB', a: '1' }).readout.raw).toBe('0.931323')
  })

  it('rounds currency to its minor unit', () => {
    const jpy = {
      cat: 'currency',
      from: 'USD',
      to: 'JPY',
      a: '100',
      rate: sampleRate('USD', 'JPY'),
    }
    expect(conv(jpy).readout.value).toBe('15,000 JPY')
    const eur = {
      cat: 'currency',
      from: 'USD',
      to: 'EUR',
      a: '100',
      rate: sampleRate('USD', 'EUR'),
    }
    expect(conv(eur).readout.raw).toBe('92.00')
  })

  it('keeps the last good result, faded, when the input breaks', () => {
    const good = conv({}).good
    const broken = convReadout(
      { cat: 'length', from: 'km', to: 'mi', a: '', b: '', edited: 'a', sig: 6, rate: '' },
      ctx,
      good,
    )
    expect(broken.readout).toMatchObject({
      value: '6.21371 mi',
      preview: true,
      error: 'Enter a value to convert',
    })
    expect(broken.invalid).toBe('a')
  })
})

describe('Percent', () => {
  it('works out % of, with add and subtract rows', () => {
    const r = percent('of', { p: '15', y: '240' })
    expect(r.value).toBe('36')
    expect(r.rows).toEqual([
      ['240 + 15%', '276'],
      ['240 − 15%', '204'],
    ])
  })

  it('signs a percentage change', () => {
    expect(percent('change', { a: '80', b: '92' }).value).toBe('+15%')
  })

  it('stacks discounts cent by cent', () => {
    const r = percent('discount', { price: '129.99', d1: '25', d2: '10', t: '8.25' })
    expect(r.value).toBe('94.98')
    expect(r.rows).toContainEqual(['You save', '42.25  (32.5%)'])
  })

  it('adds tax or takes it out', () => {
    expect(percent('tax', { a: '250', r: '20', m: 'add' }).value).toBe('300.00')
    const included = percent('tax', { a: '250', r: '20', m: 'extract' })
    expect(included.value).toBe('208.33')
    expect(included.rows).toContainEqual(['Tax', '41.67'])
  })

  it('names the empty field it needs', () => {
    const r = formReadout('pct', PERCENT_CALCS, 'of', { p: '15', y: '' }, ctx, null)
    expect(r.readout.error).toBe('Enter of value')
    expect(r.invalid).toBe('y')
  })
})

describe('Dates', () => {
  it('counts the days between dates, optionally including the end', () => {
    expect(dates('between', { s: '2026-10-17', e: '2026-12-25', inc: false }).value).toBe('69 days')
    expect(dates('between', { s: '2026-10-17', e: '2026-12-25', inc: true }).value).toBe('70 days')
  })

  it('moves to the last day of the month when adding months', () => {
    const r = dates('add', { d: '2026-01-31', op: 'add', n: '1', u: 'm' })
    expect(r.raw).toBe('2026-02-28')
    expect(r.rows).toContainEqual(['Note', 'Moved to the last day of the month'])
  })
})
