import { useId } from 'react'
import { Icon } from '@/components/Icon'

// A labelled native <select>, styled like TextField, with the same helper/error line.
export function SelectField({ label, helper, error, id, className = '', ref, children, ...props }) {
  const autoId = useId()
  const selectId = id ?? autoId
  const helpId = `${selectId}-help`
  const describedBy = error || helper ? helpId : undefined

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={selectId} className="text-label text-ink">
        {label}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={`min-h-control w-full cursor-pointer appearance-none rounded-md bg-paper pr-11 text-body text-ink ${
            error ? 'border-2 border-error pl-[15px]' : 'border border-rule pl-4'
          }`}
          {...props}
        >
          {children}
        </select>
        <Icon
          name="chevron-down"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-graphite"
        />
      </div>
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
