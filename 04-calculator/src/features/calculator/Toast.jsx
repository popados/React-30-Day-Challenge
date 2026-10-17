import { useEffect } from 'react'
import { useCalculatorStore } from '@/stores/useCalculatorStore'

/** Short confirmations ("Copied 1030", "Saved to tape"), gone after 1.8 seconds. */
export function Toast() {
  const toast = useCalculatorStore((state) => state.toast)
  const hideToast = useCalculatorStore((state) => state.hideToast)

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(hideToast, 1800)
    return () => clearTimeout(timer)
  }, [toast, hideToast])

  return (
    <div
      role="status"
      className={`pointer-events-none fixed bottom-[calc(20px+env(safe-area-inset-bottom,0px))] left-1/2 z-20 max-w-[calc(100%-32px)] -translate-x-1/2 rounded-control bg-ink px-4 py-2.5 font-semibold text-bg transition-[opacity,translate] duration-200 [overflow-wrap:anywhere] phone:bottom-[calc(88px+env(safe-area-inset-bottom,0px))] ${
        toast ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
    >
      {toast?.message}
    </div>
  )
}
