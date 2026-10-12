import { useId } from 'react'
import { Icon } from '@/components/Icon'

// See docs/design-system/components/TextField.md.
// `error` replaces `helper`, adds an icon, sets aria-invalid and is announced.
export function TextField({ label, helper, error, id, className = '', type = 'text', ...props }) {
  const autoId = useId()
  const inputId = id ?? autoId
  const helpId = `${inputId}-help`
  const describedBy = error || helper ? helpId : undefined

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label ? (
        <label htmlFor={inputId} className="text-label text-ink">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        type={type}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={`min-h-control w-full rounded-md bg-paper text-body text-ink placeholder:text-graphite ${
          error ? 'border-2 border-error px-[15px]' : 'border border-rule px-4'
        }`}
        {...props}
      />
      {error ? (
        <p id={helpId} role="alert" className="m-0 flex items-start gap-2 text-body-sm text-error">
          <Icon name="circle-alert" />
          <span>{error}</span>
        </p>
      ) : helper ? (
        <p id={helpId} className="m-0 text-body-sm text-graphite">
          {helper}
        </p>
      ) : null}
    </div>
  )
}
