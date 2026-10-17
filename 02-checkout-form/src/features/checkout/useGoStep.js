import { useCallback } from 'react'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

/** Moves to a step and records it in browser history, so Back works between steps. */
export function useGoStep() {
  const update = useCheckoutStore((state) => state.update)

  return useCallback(
    (step, { push = true } = {}) => {
      update({ step })
      if (push) {
        try {
          window.history.pushState({ step }, '', `#${step}`)
        } catch {
          // History can be unavailable in sandboxed previews; the step still changes.
        }
      }
    },
    [update],
  )
}
