import { create } from 'zustand'

// Example client-state store. Use Zustand only for UI state shared across
// components; server data belongs in TanStack Query.
export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}))
