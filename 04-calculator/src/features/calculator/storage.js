// Per-browser memory for the mode, angle unit, last answer and tape. Storage can
// be blocked (private windows, previews), so every read and write is guarded and
// the calculator works without it.

export function load(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value == null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Not saved; the calculator keeps working for this visit.
  }
}
