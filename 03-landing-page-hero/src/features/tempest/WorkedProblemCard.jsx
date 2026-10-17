import { Icon } from '@/components/Icon'

/** A sample problem worked step by step, as a student sees it at 11:42 pm. */
export function WorkedProblemCard() {
  return (
    <article
      aria-label="Example: a worked problem in Tempest Line"
      className="overflow-hidden rounded-lg border border-border bg-surface text-ink shadow-raised"
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-border bg-surface-raised px-4 py-4 @xl:px-5.5">
        <p className="text-body-strong">Algebra · Homework 4</p>
        <p className="text-body-sm text-ink-muted tabular-nums">11:42 pm</p>
      </div>

      <div className="flex flex-col gap-4 p-4 @xl:p-5.5">
        <div>
          <p className="text-label tracking-wider text-ink-muted uppercase">Your problem</p>
          <p className="mt-1 font-mono text-title font-normal tracking-wide">3x + 7 = 22</p>
        </div>

        <ol className="flex flex-col gap-2.5">
          <li className="flex items-start gap-3 rounded-md border border-border px-3.5 py-3">
            <span className="flex size-6.5 shrink-0 items-center justify-center rounded-pill border-2 border-success bg-success text-surface">
              <Icon name="check" size={14} />
            </span>
            <div>
              <p className="text-body-strong">
                <span className="sr-only">Done: </span>Take 7 from both sides
              </p>
              <p className="font-mono text-ink-muted">3x = 15</p>
            </div>
          </li>
          <li
            aria-current="step"
            className="flex items-start gap-3 rounded-md border-2 border-ink bg-surface-raised px-3.5 py-3"
          >
            <span className="flex size-6.5 shrink-0 items-center justify-center rounded-pill border-2 border-ink text-label">
              2
            </span>
            <div>
              <p className="text-body-strong">Divide both sides by 3</p>
              <p className="font-mono">x = 15 ÷ 3 = 5</p>
              <p className="mt-0.5 text-body-sm text-ink-muted">
                Why? Dividing undoes the 3 that is multiplying x.
              </p>
            </div>
          </li>
        </ol>

        <p className="flex items-center gap-2.5 rounded-md border border-success/45 bg-success-soft px-3.5 py-2.5 text-body-strong text-success">
          <Icon name="check" size={18} />
          Checked: 3(5) + 7 = 22
        </p>

        {/* A picture of the ask box, not a working field. */}
        <div
          aria-hidden="true"
          className="flex items-center gap-2.5 rounded-pill border border-control-border py-1.5 pr-1.5 pl-4.5 text-ink-muted"
        >
          <span className="min-w-0 grow">Ask why, or try one like it…</span>
          <span className="flex size-9 items-center justify-center rounded-pill bg-surface-raised text-ink">
            <Icon name="arrow-right" size={18} />
          </span>
        </div>
      </div>
    </article>
  )
}
