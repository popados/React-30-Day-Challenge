import { Icon } from '@/components/Icon'

// Owner colours only tell people apart; the name always carries the meaning.
const OWNER_TONES = {
  teal: 'text-learner',
  violet: 'text-payer',
  amber: 'text-caution',
}

const ACTION_ITEMS = [
  { task: 'Pull usage numbers for top bets', owner: 'Leo', due: 'Wed', tone: 'teal' },
  { task: 'Confirm eng capacity', owner: 'Sam', due: 'Thu', tone: 'violet' },
  { task: 'Finalize Q4 roadmap', owner: 'Dana', due: '30th', tone: 'amber' },
]

/** A sample meeting recap, as Minutely sends it after a call. */
export function RecapCard() {
  return (
    <figure
      aria-label="Example recap"
      className="w-full max-w-[420px] rounded-lg border border-border bg-surface shadow-raised"
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-4">
        <p className="text-body-strong">Q4 planning · recap</p>
        <p className="text-caption text-ink-muted">41 min</p>
      </div>

      <div className="flex flex-col gap-3 px-5 py-4">
        <p className="text-label tracking-wider text-ink-muted uppercase">
          Action items · {ACTION_ITEMS.length}
        </p>
        <ul className="flex flex-col gap-3">
          {ACTION_ITEMS.map((item) => (
            <li
              key={item.task}
              className="flex items-center justify-between gap-4 rounded-md bg-surface-raised px-4 py-3"
            >
              <span className="text-body-sm">{item.task}</span>
              <span className={`shrink-0 text-caption font-bold ${OWNER_TONES[item.tone]}`}>
                {item.owner} · {item.due}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className="flex items-center gap-2 border-t border-border px-5 py-4 text-body-sm text-success">
        <Icon name="check" size={16} />
        Recap sent to 4 attendees
      </figcaption>
    </figure>
  )
}
