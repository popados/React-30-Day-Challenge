// Scientific keypad: each key adds a token with what the line shows (d) and what
// the parser reads (v). Operator tokens (op) start "Ans…" right after "=".
export const token = (d, v, op = false) => ({ d, v, op })
export const ANS = token('Ans', ' ans ')

/** Kept visible when the function pad folds behind "More" on narrow screens. */
export const QUICK_KEYS = ['(', ')', 'xʸ', '√']

export const FUNCTION_KEYS = [
  ['sin', token('sin(', ' sin(')],
  ['cos', token('cos(', ' cos(')],
  ['tan', token('tan(', ' tan(')],
  ['ln', token('ln(', ' ln(')],
  ['log', token('log(', ' log(')],
  ['sin⁻¹', token('sin⁻¹(', ' asin(')],
  ['cos⁻¹', token('cos⁻¹(', ' acos(')],
  ['tan⁻¹', token('tan⁻¹(', ' atan(')],
  ['eˣ', token('e^(', ' e^(')],
  ['10ˣ', token('10^(', ' 10^(')],
  ['x²', token('²', '^2', true)],
  ['xʸ', token('^', '^', true)],
  ['√', token('√(', ' sqrt(')],
  ['(', token('(', '(')],
  [')', token(')', ')')],
  ['π', token('π', ' pi ')],
  ['e', token('e', ' e ')],
  ['n!', token('!', '!', true)],
  ['%', token('%', '%', true)],
  ['Ans', ANS],
]

// [label, colour role, action]: a token, or 'clear' | 'del' | 'eq'.
export const MAIN_KEYS = [
  ['7', 'num'],
  ['8', 'num'],
  ['9', 'num'],
  ['÷', 'op', token('÷', '/', true)],
  ['AC', 'clr', 'clear'],
  ['4', 'num'],
  ['5', 'num'],
  ['6', 'num'],
  ['×', 'op', token('×', '*', true)],
  ['⌫', 'del', 'del'],
  ['1', 'num'],
  ['2', 'num'],
  ['3', 'num'],
  ['−', 'op', token('−', '-', true)],
  ['=', 'eq', 'eq'],
  ['0', 'num'],
  ['.', 'num', token('.', '.')],
  ['EXP', 'op', token('×10^', '*10^', true)],
  ['+', 'op', token('+', '+', true)],
].map(([label, role, action]) => [label, role, action ?? token(label, label)])

export const KEY_LABELS = {
  '⌫': 'Delete',
  AC: 'Clear all',
  EXP: 'Times ten to the power',
  xʸ: 'Power',
  'x²': 'Square',
  '√': 'Square root',
  'n!': 'Factorial',
  eˣ: 'e to the power',
  '10ˣ': 'Ten to the power',
}

/** Every key's action by label, for the keyboard. */
export const KEY_ACTIONS = Object.fromEntries([
  ...FUNCTION_KEYS,
  ...MAIN_KEYS.map(([label, , action]) => [label, action]),
])

/** Physical key → keypad label. Digits map to themselves. */
export const KEYBOARD_MAP = {
  '+': '+',
  '-': '−',
  '*': '×',
  x: '×',
  '/': '÷',
  '^': 'xʸ',
  '(': '(',
  ')': ')',
  '!': 'n!',
  '%': '%',
  '.': '.',
  ',': '.',
  Enter: '=',
  '=': '=',
  Backspace: '⌫',
  Escape: 'AC',
  Delete: 'AC',
  s: 'sin',
  c: 'cos',
  t: 'tan',
  l: 'ln',
  g: 'log',
  r: '√',
  p: 'π',
  e: 'e',
  a: 'Ans',
}

/** The opening example: 2×sin(30)+√(16). */
export const START_TOKENS = [
  token('2', '2'),
  token('×', '*', true),
  token('sin(', ' sin('),
  token('3', '3'),
  token('0', '0'),
  token(')', ')'),
  token('+', '+', true),
  token('√(', ' sqrt('),
  token('1', '1'),
  token('6', '6'),
  token(')', ')'),
]
