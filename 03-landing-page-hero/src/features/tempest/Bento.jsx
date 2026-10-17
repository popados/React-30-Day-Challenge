import { Icon } from '@/components/Icon'

const SUBJECTS = ['Algebra', 'Geometry', 'Chemistry', 'Physics', 'Biology', 'Essays']

// Wide tiles span the full bento: 2 columns by default, 4 in the mid range.
const TILE = 'min-w-0 rounded-lg border border-border bg-surface'
const WIDE = 'col-span-2'

/** Sidebar of proof and details beside "How it works". */
export function Bento() {
  return (
    <aside
      aria-label="Proof and details"
      className="grid min-w-0 grid-cols-2 gap-3.5 @xl:gap-5 @4xl:grid-cols-4 @6xl:grid-cols-2"
    >
      <div className={`${WIDE} bg-blueprint-glow rounded-lg px-7.5 pt-7 pb-7.5 text-white`}>
        <p>Students learning this term</p>
        <p className="mt-2.5 font-display text-display-lg tabular-nums">[250,000]</p>
      </div>

      <div className={`${TILE} px-5 py-5.5`}>
        <p className="font-display text-price">[9M]</p>
        <p className="mt-1 text-caption text-ink-muted">problems explained step by step</p>
      </div>
      <div className={`${TILE} px-5 py-5.5`}>
        <p className="font-display text-price">
          [4.8]<span aria-hidden="true">★</span>
          <span className="sr-only"> out of 5 stars</span>
        </p>
        <p className="mt-1 text-caption text-ink-muted">from [12,000] reviews</p>
      </div>

      <div className={`${WIDE} ${TILE} px-6.5 py-6`}>
        <h3 className="mb-3.5 text-label text-ink-muted">Covers</h3>
        <ul className="flex flex-wrap gap-2">
          {SUBJECTS.map((subject) => (
            <li key={subject} className="rounded-pill bg-surface-raised px-3 py-1.5 text-body-sm">
              {subject}
            </li>
          ))}
        </ul>
      </div>

      <div
        id="parents"
        className={`${WIDE} min-w-0 scroll-mt-6 rounded-lg border border-payer/40 bg-payer-soft px-6.5 py-6`}
      >
        <h3 className="mb-3.5 flex items-center gap-2 text-label text-payer">
          <Icon name="credit-card" size={18} />
          For parents
        </h3>
        <p className="text-body-sm">
          Students start free. A parent can add a plan later from $9.99/month, with no surprise
          charges.
        </p>
      </div>

      <figure
        className={`${WIDE} min-w-0 rounded-lg border border-border bg-surface-raised px-6.5 py-6`}
      >
        <blockquote className="text-heading leading-7">
          “[Student or parent quote about homework finally making sense.]”
        </blockquote>
        <figcaption className="mt-4 text-body-sm text-ink-muted">
          [Name], [Grade or role]
        </figcaption>
      </figure>
    </aside>
  )
}
