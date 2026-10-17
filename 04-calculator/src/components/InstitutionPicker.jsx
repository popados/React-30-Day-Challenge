import { useId, useState } from 'react'
import { Icon } from '@/components/Icon'

// See docs/design-system/components/InstitutionPicker.md for the states and their copy.

function filterInstitutions(list, query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return list.filter((i) => i.name.toLowerCase().includes(q) || i.domain.toLowerCase().includes(q))
}

const LINK = 'cursor-pointer border-0 bg-transparent p-0 text-link underline underline-offset-2'
const PANEL = 'rounded-md border border-rule bg-paper'

/**
 * @param {object} props
 * @param {{name: string, domain: string}[]} [props.institutions] Full list to filter.
 * @param {{name: string, domain: string}[]} [props.results] Pre-filtered results instead.
 * @param {'idle'|'loading'|'redirecting'} [props.state]
 */
export function InstitutionPicker({
  institutions = [],
  results: providedResults,
  label = 'Find your institution',
  placeholder = 'University name or email domain',
  defaultQuery = '',
  defaultOpen = false,
  state = 'idle',
  redirectTo,
  onQueryChange,
  onSelect,
  onCancel,
  onRequestInstitution,
}) {
  const baseId = useId()
  const inputId = `${baseId}-input`
  const listId = `${baseId}-list`
  const [query, setQuery] = useState(defaultQuery)
  const [open, setOpen] = useState(defaultOpen)
  const [active, setActive] = useState(-1)
  const results = providedResults ?? filterInstitutions(institutions, query)

  function choose(index) {
    setOpen(false)
    onSelect?.(results[index])
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive(Math.min(results.length - 1, active + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(Math.max(0, active - 1))
    } else if (e.key === 'Enter' && open && active >= 0 && results[active]) {
      e.preventDefault()
      choose(active)
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActive(-1)
    }
  }

  if (state === 'redirecting') {
    return (
      <div role="status" aria-live="polite" className={`flex items-center gap-3 p-4 ${PANEL}`}>
        <span
          aria-hidden="true"
          className="size-5 shrink-0 animate-spin rounded-full border-2 border-hairline border-t-moss"
        />
        <span>Taking you to {redirectTo ?? 'your institution'}…</span>
        <button type="button" className={`ml-auto min-h-target ${LINK}`} onClick={onCancel}>
          Cancel
        </button>
      </div>
    )
  }

  let body = null
  let announce = ''
  if (open) {
    if (state === 'loading') {
      announce = 'Searching…'
      body = (
        <div aria-hidden="true" className={`p-1 ${PANEL}`}>
          {[0, 1, 2].map((k) => (
            <div key={k} className="flex min-h-control flex-col justify-center gap-1.5 px-3">
              <span className="block h-3 rounded-sm bg-paper-deep" />
              <span className="block h-2.5 w-2/5 rounded-sm bg-paper-deep" />
            </div>
          ))}
        </div>
      )
    } else if (!query.trim()) {
      body = (
        <div className={`px-4 py-3 text-body-sm text-graphite ${PANEL}`}>
          <p className="m-0">Start typing your university or email domain.</p>
        </div>
      )
    } else if (results.length === 0) {
      announce = 'No results'
      body = (
        <div className={`px-4 py-3 text-body-sm text-graphite ${PANEL}`}>
          <p className="m-0 mb-1">
            No match for ‘{query}.’ Try your email domain, or sign up with email.
          </p>
          <button type="button" className={LINK} onClick={onRequestInstitution}>
            Request your institution
          </button>
        </div>
      )
    } else {
      announce = `${results.length} ${results.length === 1 ? 'result' : 'results'}, use up and down arrows to choose`
      body = (
        <ul
          role="listbox"
          id={listId}
          aria-label="Institutions"
          className={`m-0 list-none p-1 ${PANEL}`}
        >
          {results.map((r, i) => (
            <li
              key={r.domain}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault()
                choose(i)
              }}
              onMouseEnter={() => setActive(i)}
              className="flex min-h-control cursor-pointer flex-col justify-center rounded-[6px] px-3 py-1 hover:bg-moss-soft aria-selected:bg-moss-soft aria-selected:inset-ring-2 aria-selected:inset-ring-moss"
            >
              <span className="text-label text-ink">{r.name}</span>
              <span className="text-body-sm text-graphite">{r.domain}</span>
            </li>
          ))}
        </ul>
      )
    }
  }

  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor={inputId} className="text-label text-ink">
        {label}
      </label>
      <div className="relative">
        <Icon
          name="search"
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-graphite"
        />
        <input
          id={inputId}
          type="text"
          role="combobox"
          autoComplete="off"
          placeholder={placeholder}
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && active >= 0 && results[active] ? `${listId}-${active}` : undefined
          }
          value={query}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActive(-1)
            onQueryChange?.(e.target.value)
          }}
          className="min-h-control w-full rounded-md border border-rule bg-paper pr-4 pl-11 text-body text-ink placeholder:text-graphite"
        />
      </div>
      {body}
      <div role="status" aria-live="polite" className="sr-only">
        {announce}
      </div>
    </div>
  )
}
