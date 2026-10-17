const STATS = [
  { value: '[250,000]', label: 'students learning this term' },
  { value: '[9 million]', label: 'problems explained step by step' },
  { value: '[1,200]', label: 'schools recommend it to families' },
]

// Placeholders only: the official files go here, never redrawn.
const LOGO_SLOTS = [
  '[School logo]',
  '[School logo]',
  '[District logo]',
  '[Press logo]',
  '[Award badge]',
]

export function ProofStrip() {
  return (
    <section aria-label="Proof" className="border-b border-border bg-surface px-4 @xl:px-6">
      <div className="mx-auto flex max-w-page flex-col gap-5.5 pt-7 pb-7.5">
        <ul className="grid gap-x-8 gap-y-3.5 @2xl:grid-cols-3">
          {STATS.map((stat) => (
            <li key={stat.label}>
              <p className="font-display text-heading-lg tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p className="text-ink-muted">{stat.label}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-3 border-t border-border pt-5">
          <p className="mr-2 text-body-sm font-bold text-ink-muted">Used by students at</p>
          <ul aria-label="Logos" className="flex flex-wrap gap-x-3.5 gap-y-3">
            {LOGO_SLOTS.map((slot, index) => (
              <li
                key={index}
                className="inline-flex min-h-9 min-w-30 items-center justify-center rounded-sm border border-dashed border-control-border px-3.5 text-caption text-ink-muted"
              >
                {slot}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
