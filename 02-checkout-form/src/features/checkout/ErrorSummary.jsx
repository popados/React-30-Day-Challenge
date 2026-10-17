import { useEffect, useRef } from 'react'
import { Icon } from '@/components/Icon'

/**
 * Lists what to fix after a failed submit. Takes focus when it appears, and each
 * item moves focus to its field.
 * @param {{ items: {id: string, label: string, message: string}[] }} props
 */
export function ErrorSummary({ items }) {
  const boxRef = useRef(null)
  const signature = items.map((item) => `${item.id}:${item.message}`).join('|')

  useEffect(() => {
    if (signature) boxRef.current?.focus()
  }, [signature])

  if (!items.length) return null

  return (
    <div
      ref={boxRef}
      role="alert"
      tabIndex={-1}
      className="flex items-start gap-2 rounded-md bg-error-soft px-4 py-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
    >
      <Icon name="circle-alert" className="mt-0.5 text-error" />
      <div>
        <strong className="block font-semibold">
          {items.length === 1
            ? 'Fix 1 thing to continue'
            : `Fix ${items.length} things to continue`}
        </strong>
        <ul className="mt-1 list-disc pl-5">
          {items.map((item) => (
            <li key={item.id + item.label} className="mt-0.5">
              <a
                href={`#${item.id}`}
                className="text-ink underline underline-offset-3"
                onClick={(event) => {
                  event.preventDefault()
                  document.getElementById(item.id)?.focus()
                }}
              >
                {item.label}: {item.message}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
