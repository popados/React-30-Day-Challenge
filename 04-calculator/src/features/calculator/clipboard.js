// Copies text, falling back to a hidden textarea where the Clipboard API is
// missing or blocked. Resolves true when the copy worked.

function fallbackCopy(text) {
  const area = document.createElement('textarea')
  area.value = text
  area.readOnly = true
  area.style.cssText = 'position:fixed;opacity:0;top:0;left:0'
  document.body.append(area)
  area.select()
  let ok
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  area.remove()
  return ok
}

export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Fall through to the textarea copy.
  }
  return fallbackCopy(text)
}
