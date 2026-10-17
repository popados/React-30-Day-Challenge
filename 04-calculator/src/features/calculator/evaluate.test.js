import { evaluate, parseField } from '@/features/calculator/evaluate'
import { fmt, grp } from '@/features/calculator/format'

const deg = { deg: true, ans: 0 }
const calc = (src, ctx = deg) => evaluate(src, ctx)

describe('evaluate', () => {
  it('handles implied multiplication', () => {
    expect(calc('2 pi')).toBeCloseTo(2 * Math.PI)
    expect(calc('3(4+1)')).toBe(15)
    expect(calc('2 sin(30)')).toBeCloseTo(1)
  })

  it('snaps trig to zero and names undefined angles', () => {
    expect(calc(' sin(180)')).toBe(0)
    expect(() => calc(' tan(90)')).toThrow('tan is undefined at this angle')
  })

  it('treats a missing closing bracket as closed', () => {
    expect(calc('2* sin(30)+ sqrt(16')).toBe(5)
  })

  it('reads % as a postfix and EXP as times ten to the power', () => {
    expect(calc('200*15%')).toBe(30)
    expect(calc('3*10^8')).toBe(300000000)
  })

  it('explains errors in plain language', () => {
    expect(() => calc('5/0')).toThrow('Can’t divide by 0')
    expect(() => calc('171!')).toThrow('The result is too large to show')
    expect(() => calc(' ln(0)')).toThrow('ln needs a number above 0')
  })

  it('accepts arithmetic and display symbols in number fields', () => {
    expect(parseField('12*3.5')).toBe(42)
    expect(parseField('1,200 ÷ 2')).toBe(600)
    expect(parseField('15%', { percent: true })).toBe(15)
    expect(parseField('  ')).toBeNull()
  })
})

describe('format', () => {
  it('shows 12 significant digits and switches to e-notation at 1e15', () => {
    expect(fmt(1 / 3)).toBe('0.333333333333')
    expect(fmt(1.5e15)).toBe('1.5e15')
  })

  it('groups thousands and uses a true minus sign for display', () => {
    expect(grp('1030')).toBe('1,030')
    expect(grp('-12')).toBe('−12')
  })
})
