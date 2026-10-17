import { useEffect } from 'react'
import { KEY_ACTIONS, KEYBOARD_MAP } from '@/features/calculator/sciKeys'
import { MODES, useCalculatorStore } from '@/stores/useCalculatorStore'

/**
 * Keyboard shortcuts: Alt+1–4 switch mode, Alt+C copies, Esc closes the tape.
 * In Scientific, keys type into the expression; elsewhere Enter saves to the tape.
 */
export function useCalculatorKeyboard({ onCopy }) {
  useEffect(() => {
    function onKeyDown(event) {
      const state = useCalculatorStore.getState()
      if (state.tapeOpen) {
        if (event.key === 'Escape') {
          state.setTapeOpen(false)
          event.preventDefault()
        }
        return
      }
      if (event.altKey && /^Digit[1-4]$/.test(event.code)) {
        state.setMode(MODES[Number(event.code.slice(5)) - 1])
        event.preventDefault()
        return
      }
      if (event.altKey && event.code === 'KeyC') {
        onCopy()
        event.preventDefault()
        return
      }
      if (event.ctrlKey || event.metaKey || event.altKey) return

      const tag = event.target.tagName
      const inField = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA'
      if (state.mode !== 'sci') {
        const type = event.target.type
        if (event.key === 'Enter' && inField && type !== 'checkbox' && type !== 'radio') {
          state.saveCurrent()
          event.preventDefault()
        }
        return
      }
      if (inField) return
      if (tag === 'BUTTON' && (event.key === 'Enter' || event.key === ' ')) return

      const label = /^[0-9]$/.test(event.key) ? event.key : KEYBOARD_MAP[event.key]
      if (!label || !(label in KEY_ACTIONS)) return
      event.preventDefault()
      state.sciPress(KEY_ACTIONS[label])
      state.flashKey(label)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onCopy])
}
