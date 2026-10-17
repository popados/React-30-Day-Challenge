// Expression parser and evaluator, without eval. Supports + − × ÷ ^, implied
// multiplication (2π, 3(4+1)), postfix ! and %, brackets (a missing closing
// bracket is assumed), pi, e, ans and the functions below. Errors are
// plain-language messages meant for the readout.

function tokenize(s) {
  const out = []
  let i = 0
  while (i < s.length) {
    const c = s[i]
    if (c === ' ') {
      i += 1
      continue
    }
    if (/[0-9.]/.test(c)) {
      let j = i
      while (j < s.length && /[0-9.]/.test(s[j])) j += 1
      const t = s.slice(i, j)
      if (t === '.' || (t.match(/\./g) || []).length > 1) throw new Error('Check the decimal point')
      out.push({ t: 'num', v: parseFloat(t) })
      i = j
      continue
    }
    if (/[a-z]/i.test(c)) {
      let j = i
      while (j < s.length && /[a-z]/i.test(s[j])) j += 1
      out.push({ t: 'id', v: s.slice(i, j).toLowerCase() })
      i = j
      continue
    }
    if ('+-*/^!%()'.includes(c)) {
      out.push({ t: c })
      i += 1
      continue
    }
    throw new Error(`“${c}” isn’t something I can calculate`)
  }
  return out
}

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) throw new Error('n! needs a whole number of 0 or more')
  if (n > 170) throw new Error('The result is too large to show')
  let r = 1
  for (let k = 2; k <= n; k += 1) r *= k
  return r
}

/**
 * @param {string} src Expression in plain ASCII (* / - and function names).
 * @param {{deg: boolean, ans: number}} ctx Angle unit and the previous answer.
 */
export function evaluate(src, ctx) {
  const tk = tokenize(src)
  let p = 0
  const peek = () => tk[p]
  const next = () => tk[p++]
  const toRad = (x) => (ctx.deg ? (x * Math.PI) / 180 : x)
  const fromRad = (x) => (ctx.deg ? (x * 180) / Math.PI : x)
  const snap = (x) => (Math.abs(x) < 1e-12 ? 0 : x)
  const inverse = (f, name) => (x) => {
    if (x < -1 || x > 1) throw new Error(`${name} needs a value from −1 to 1`)
    return fromRad(f(x))
  }
  const fns = {
    sin: (x) => snap(Math.sin(toRad(x))),
    cos: (x) => snap(Math.cos(toRad(x))),
    tan: (x) => {
      const r = toRad(x)
      if (Math.abs(Math.cos(r)) < 1e-12) throw new Error('tan is undefined at this angle')
      return snap(Math.tan(r))
    },
    asin: inverse(Math.asin, 'sin⁻¹'),
    acos: inverse(Math.acos, 'cos⁻¹'),
    atan: (x) => fromRad(Math.atan(x)),
    ln: (x) => {
      if (x <= 0) throw new Error('ln needs a number above 0')
      return Math.log(x)
    },
    log: (x) => {
      if (x <= 0) throw new Error('log needs a number above 0')
      return Math.log10(x)
    },
    sqrt: (x) => {
      if (x < 0) throw new Error('√ needs a number of 0 or more')
      return Math.sqrt(x)
    },
  }
  const closeParen = () => {
    if (peek() && peek().t === ')') next()
    else if (peek()) throw new Error('A closing bracket is missing')
  }
  const startsPrimary = (t) => t && (t.t === 'num' || t.t === 'id' || t.t === '(')

  function expr() {
    let v = term()
    while (peek() && (peek().t === '+' || peek().t === '-')) {
      const op = next().t
      const r = term()
      v = op === '+' ? v + r : v - r
    }
    return v
  }
  function term() {
    let v = unary()
    for (;;) {
      const t = peek()
      if (t && (t.t === '*' || t.t === '/')) {
        next()
        const r = unary()
        if (t.t === '/') {
          if (r === 0) throw new Error('Can’t divide by 0')
          v /= r
        } else v *= r
      } else if (startsPrimary(t)) v *= unary()
      else break
    }
    return v
  }
  function unary() {
    const t = peek()
    if (t && (t.t === '-' || t.t === '+')) {
      next()
      const v = unary()
      return t.t === '-' ? -v : v
    }
    return power()
  }
  function power() {
    const base = postfix()
    if (peek() && peek().t === '^') {
      next()
      const r = Math.pow(base, unary())
      if (Number.isNaN(r)) throw new Error('There’s no real-number result')
      return r
    }
    return base
  }
  function postfix() {
    let v = primary()
    while (peek() && (peek().t === '!' || peek().t === '%'))
      v = next().t === '%' ? v / 100 : factorial(v)
    return v
  }
  function primary() {
    const t = next()
    if (!t) throw new Error('Finish the expression')
    if (t.t === 'num') return t.v
    if (t.t === '(') {
      const v = expr()
      closeParen()
      return v
    }
    if (t.t === 'id') {
      if (t.v === 'pi') return Math.PI
      if (t.v === 'e') return Math.E
      if (t.v === 'ans') return ctx.ans
      const f = fns[t.v]
      if (!f) throw new Error(`Unknown name “${t.v}”`)
      if (peek() && peek().t === '(') {
        next()
        const a = expr()
        closeParen()
        return f(a)
      }
      return f(power())
    }
    if (t.t === ')') throw new Error('There’s an extra closing bracket')
    throw new Error(`Something is missing before “${t.t}”`)
  }

  const v = expr()
  if (p < tk.length) {
    throw new Error(tk[p].t === ')' ? 'There’s an extra closing bracket' : 'Check the expression')
  }
  if (!Number.isFinite(v)) throw new Error('The result is too large to show')
  return v
}

/**
 * A number field's value: accepts arithmetic ("12*3.5"), display symbols and
 * thousands separators. Returns null for an empty field.
 */
export function parseField(str, { deg = true, ans = 0, percent = false } = {}) {
  let s = String(str ?? '')
    .replace(/,/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .trim()
  if (percent) s = s.replace(/%\s*$/, '')
  if (!s) return null
  return evaluate(s, { deg, ans })
}
