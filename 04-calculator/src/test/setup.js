import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Node 25+ defines its own localStorage global, which has no methods unless Node
// is started with --localstorage-file, and it hides jsdom's. Swap in an in-memory
// Storage so tests behave the same on every Node version.
if (typeof globalThis.localStorage?.clear !== 'function') {
  const store = new Map()
  const memoryStorage = {
    get length() {
      return store.size
    },
    key: (index) => [...store.keys()][index] ?? null,
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  }
  Object.defineProperty(globalThis, 'localStorage', { value: memoryStorage, configurable: true })
}

afterEach(() => {
  cleanup()
})
