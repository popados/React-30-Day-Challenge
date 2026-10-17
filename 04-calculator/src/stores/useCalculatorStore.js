import { create } from 'zustand'
import { DATE_CALCS } from '@/features/calculator/dateCalcs'
import { evaluate } from '@/features/calculator/evaluate'
import { fmt, grp } from '@/features/calculator/format'
import { PERCENT_CALCS } from '@/features/calculator/percentCalcs'
import {
  convReadout,
  defaultValues,
  formReadout,
  openParens,
  sciDisplay,
  sciReadout,
  sciSource,
} from '@/features/calculator/readouts'
import { ANS, START_TOKENS } from '@/features/calculator/sciKeys'
import { load, save } from '@/features/calculator/storage'
import { CATEGORIES, DEFAULT_PAIRS, sampleRate } from '@/features/calculator/units'

export const MODES = ['sci', 'conv', 'pct', 'date']
export const MODE_NAMES = { sci: 'Scientific', conv: 'Convert', pct: 'Percent', date: 'Dates' }
const FORM_CALCS = { pct: PERCENT_CALCS, date: DATE_CALCS }
const TAPE_LIMIT = 60

const savedMode = load('cw.mode', 'sci')
const savedTape = load('cw.tape', [])

/** Currency needs a rate; fill in the sample rate whenever the pair changes. */
function withRate(conv) {
  if (CATEGORIES[conv.cat].currency && !conv.rate)
    return { ...conv, rate: sampleRate(conv.from, conv.to) }
  return conv
}

/** The tape with a new line on top, saved, keeping the last 60. */
function addToTape(tape, entry) {
  const next = [{ ...entry, t: Date.now() }, ...tape].slice(0, TAPE_LIMIT)
  save('cw.tape', next)
  return next
}

/** Recalculates the readout for the current mode from the state's inputs. */
function refresh(state) {
  const ctx = { deg: state.deg, ans: state.ans }
  if (state.mode === 'sci') {
    const { readout, last } = sciReadout(state.sci, ctx)
    return { readout, invalid: null, sci: { ...state.sci, last } }
  }
  if (state.mode === 'conv') {
    const r = convReadout(state.conv, ctx, state.good.conv)
    return {
      readout: r.readout,
      invalid: r.invalid,
      conv: r.conv,
      convAll: r.all ?? state.convAll,
      good: { ...state.good, conv: r.good },
    }
  }
  const form = state[state.mode]
  const key = `${state.mode}:${form.sub}`
  const r = formReadout(
    state.mode,
    FORM_CALCS[state.mode],
    form.sub,
    form.vals[form.sub],
    ctx,
    state.good[key],
  )
  return { readout: r.readout, invalid: r.invalid, good: { ...state.good, [key]: r.good } }
}

export const useCalculatorStore = create((set, get) => {
  /** Applies a change, then recalculates the readout. */
  const change = (fn) =>
    set((state) => {
      const next = { ...state, ...fn(state) }
      return { ...next, ...refresh(next) }
    })

  const initial = {
    mode: MODES.includes(savedMode) ? savedMode : 'sci',
    deg: load('cw.deg', true) !== false,
    ans: Number(load('cw.ans', 0)) || 0,
    tape: Array.isArray(savedTape) ? savedTape : [],
    sci: { tokens: START_TOKENS, just: false, err: '', last: null },
    conv: { cat: 'length', from: 'km', to: 'mi', a: '10', b: '', edited: 'a', sig: 6, rate: '' },
    convAll: [],
    pct: { sub: 'of', vals: defaultValues(PERCENT_CALCS) },
    date: { sub: 'between', vals: defaultValues(DATE_CALCS) },
    good: { conv: null },
    readout: null,
    invalid: null,
    toast: null,
    tapeOpen: false,
    pressedKey: null,
  }

  return {
    ...initial,
    ...refresh(initial),

    setMode: (mode) => {
      save('cw.mode', mode)
      change(() => ({ mode }))
    },

    toggleDeg: () =>
      change((state) => {
        save('cw.deg', !state.deg)
        return { deg: !state.deg }
      }),

    /** A Scientific key: a token, or 'clear' | 'del' | 'eq'. */
    sciPress: (action) =>
      change((state) => {
        const sci = { ...state.sci, tokens: [...state.sci.tokens] }
        if (action === 'clear') return { sci: { tokens: [], just: false, err: '', last: null } }
        if (action === 'del') {
          if (sci.just) sci.just = false
          else sci.tokens.pop()
          return { sci: { ...sci, err: '' } }
        }
        if (action === 'eq') {
          if (!sci.tokens.length || sci.just) return {}
          try {
            const value = evaluate(sciSource(sci.tokens), { deg: state.deg, ans: state.ans })
            const shown = sciDisplay(sci.tokens)
            const label = shown + ')'.repeat(openParens(shown))
            const raw = fmt(value)
            save('cw.ans', value)
            const tape = addToTape(state.tape, {
              mode: 'sci',
              label:
                label + (/(sin|cos|tan)/.test(label) ? (state.deg ? '  [deg]' : '  [rad]') : ''),
              display: grp(raw),
              raw,
              state: { tokens: sci.tokens.map((t) => ({ ...t })) },
            })
            return { ans: value, tape, sci: { ...sci, just: true, err: '' } }
          } catch (error) {
            return { sci: { ...sci, err: error.message } }
          }
        }
        // After "=", an operator continues from Ans; anything else starts fresh.
        if (sci.just) sci.tokens = action.op ? [ANS] : []
        sci.tokens.push(action)
        return { sci: { ...sci, just: false, err: '' } }
      }),

    /** Flashes a key pressed from the keyboard. */
    flashKey: (label) => {
      set({ pressedKey: label })
      setTimeout(() => {
        if (get().pressedKey === label) set({ pressedKey: null })
      }, 110)
    },

    // ---- Convert ----
    setConv: (patch) => change((state) => ({ conv: withRate({ ...state.conv, ...patch }) })),
    setCategory: (cat) =>
      change((state) => {
        const [from, to] = DEFAULT_PAIRS[cat]
        return { conv: withRate({ ...state.conv, cat, from, to, a: '1', edited: 'a', rate: '' }) }
      }),
    swapUnits: () =>
      change(({ conv }) => ({
        conv: withRate({
          ...conv,
          from: conv.to,
          to: conv.from,
          a: conv.b || conv.a,
          edited: 'a',
          rate: CATEGORIES[conv.cat].currency ? '' : conv.rate,
        }),
      })),

    // ---- Percent and Dates ----
    setSub: (mode, sub) => change((state) => ({ [mode]: { ...state[mode], sub } })),
    setField: (mode, key, value) =>
      change((state) => {
        const form = state[mode]
        return {
          [mode]: {
            ...form,
            vals: { ...form.vals, [form.sub]: { ...form.vals[form.sub], [key]: value } },
          },
        }
      }),

    // ---- Tape ----
    /** Loads a saved line back into its mode, with its inputs. */
    restore: (entry) => {
      save('cw.mode', entry.mode)
      change((state) => {
        const next = { mode: entry.mode, tapeOpen: false }
        if (entry.mode === 'sci') {
          next.sci = {
            ...state.sci,
            tokens: entry.state.tokens.map((t) => ({ ...t })),
            just: false,
            err: '',
          }
        } else if (entry.mode === 'conv') {
          next.conv = withRate({ ...state.conv, ...entry.state })
        } else {
          const form = state[entry.mode]
          next[entry.mode] = {
            sub: entry.state.sub,
            vals: { ...form.vals, [entry.state.sub]: { ...entry.state.vals } },
          }
        }
        return next
      })
    },
    saveCurrent: () => {
      const { mode, readout, sciPress, showToast } = get()
      if (mode === 'sci') return sciPress('eq')
      if (!readout || readout.error || readout.preview || !readout.tape) {
        return showToast('Fix the input first, then save')
      }
      set({ tape: addToTape(get().tape, readout.tape) })
      showToast('Saved to tape')
    },
    clearTape: () => {
      save('cw.tape', [])
      set({ tape: [] })
      get().showToast('Tape cleared')
    },
    setTapeOpen: (tapeOpen) => set({ tapeOpen }),

    // ---- Toast ----
    showToast: (message) => set({ toast: { message, id: Date.now() } }),
    hideToast: () => set({ toast: null }),
  }
})
