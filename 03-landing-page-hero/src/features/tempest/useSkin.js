import { useEffect, useState } from 'react'

export const SKINS = [
  { id: 'graph', label: 'Graph Paper' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'contrast', label: 'High Contrast' },
]

const STORAGE_KEY = 'tl-skin'
const DEFAULT_SKIN = 'blueprint'

function readSavedSkin() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return SKINS.some((skin) => skin.id === saved) ? saved : DEFAULT_SKIN
  } catch {
    return DEFAULT_SKIN
  }
}

/** The page's Tempest Line theme, remembered per browser when storage is allowed. */
export function useSkin() {
  const [skin, setSkin] = useState(readSavedSkin)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, skin)
    } catch {
      // Storage blocked (private window, previews): the theme still works for this visit.
    }
  }, [skin])

  return [skin, setSkin]
}
