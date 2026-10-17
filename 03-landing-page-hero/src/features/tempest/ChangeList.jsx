import { CHANGES, KEPT } from '@/features/tempest/changes'

/** Side list: what changed moving the HTML screen into React, and why. */
export function ChangeList() {
  return (
    <aside
      id="tl-changes"
      aria-labelledby="tl-changes-title"
      className="border-t border-border bg-surface px-4 py-8 xl:sticky xl:top-0 xl:h-screen xl:self-start xl:overflow-y-auto xl:border-t-0 xl:border-l xl:px-6"
    >
      <h2 id="tl-changes-title" className="font-display text-title">
        Changes from the HTML
      </h2>
      <p className="mt-2 text-body-sm text-ink-muted">
        What changed moving <code className="font-mono">tempest-landing-page.html</code> into React,
        and why. Everything shown in the source is still on the page.
      </p>

      <ol className="mt-6 flex flex-col gap-3">
        {CHANGES.map((item, index) => (
          <li key={item.change} className="rounded-md border border-border bg-bg p-4">
            <p className="text-caption font-bold tracking-wider text-ink-muted uppercase">
              {index + 1} · {item.area}
            </p>
            <p className="mt-1 text-body-strong">{item.change}</p>
            <p className="mt-1.5 text-body-sm text-ink-muted">
              <span className="font-bold text-ink">Why: </span>
              {item.why}
            </p>
          </li>
        ))}
      </ol>

      <h3 className="mt-8 text-heading">Kept as in the source</h3>
      <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-body-sm text-ink-muted">
        {KEPT.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </aside>
  )
}
