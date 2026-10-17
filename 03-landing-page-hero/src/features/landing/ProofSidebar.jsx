const INTEGRATIONS = ['Zoom', 'Google Meet', 'Teams', 'Slack', 'Jira', 'Asana']
const LOGO_SLOTS = 3

/** Bento column of proof: usage, results, rating, integrations, a quote and customer logos. */
export function ProofSidebar() {
  return (
    <aside aria-label="Why teams use Minutely" className="flex flex-col gap-4">
      <div className="rounded-lg bg-blueprint px-7 py-7">
        <p className="text-body">Teams on Minutely</p>
        <p className="font-display text-display-lg">[4,000+]</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-surface px-5 py-5">
          <p className="font-display text-price">[X] hrs</p>
          <p className="text-caption text-ink-muted">saved per person, monthly</p>
        </div>
        <div className="rounded-lg bg-surface px-5 py-5">
          <p className="font-display text-price">
            [4.8]<span aria-hidden="true">★</span>
            <span className="sr-only"> out of 5 stars</span>
          </p>
          <p className="text-caption text-ink-muted">from [N] reviews</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg bg-surface px-6 py-6">
        <h2 className="text-label text-ink-muted">Works with</h2>
        <ul className="flex flex-wrap gap-2">
          {INTEGRATIONS.map((name) => (
            <li key={name} className="rounded-pill bg-surface-raised px-4 py-2 text-body-sm">
              {name}
            </li>
          ))}
        </ul>
      </div>

      <figure className="flex flex-col gap-4 rounded-lg bg-surface-raised px-6 py-6">
        <blockquote className="text-heading leading-7">
          “[Customer quote about follow-ups no longer slipping.]”
        </blockquote>
        <figcaption className="text-body-sm text-ink-muted">[Name], [Role] at [Company]</figcaption>
      </figure>

      {/* Placeholders only: customer logos go here as the official files, never redrawn. */}
      <ul
        aria-label="Customer logos"
        className="flex justify-center gap-3 rounded-lg bg-surface p-5"
      >
        {Array.from({ length: LOGO_SLOTS }, (_, index) => (
          <li
            key={index}
            className="rounded-md border border-dashed border-control-border px-4 py-2 text-body-sm text-ink-muted"
          >
            [Logo]
          </li>
        ))}
      </ul>
    </aside>
  )
}
