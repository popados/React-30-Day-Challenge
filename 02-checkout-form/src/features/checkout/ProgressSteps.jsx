import { Icon } from '@/components/Icon'
import { STEPS } from '@/features/checkout/catalog'

const NUM =
  'inline-grid size-6 place-items-center rounded-full border text-body-sm tabular-nums min-[481px]:size-7'

/** Plan, Payment, Confirm. Finished steps link back; the current one is highlighted. */
export function ProgressSteps({ step, onGoTo }) {
  const current = STEPS.findIndex((s) => s.id === step)

  return (
    <nav aria-label="Checkout progress" className="mb-6 min-[481px]:mb-8">
      <ol className="flex flex-nowrap items-center justify-between gap-1 min-[481px]:flex-wrap min-[481px]:justify-start min-[481px]:gap-2">
        {STEPS.map((s, index) => (
          <li
            key={s.id}
            aria-current={index === current ? 'step' : undefined}
            className={`flex items-center gap-2 font-medium ${index === current ? 'text-ink' : 'text-graphite'}`}
          >
            {index > 0 ? (
              <span aria-hidden="true" className="h-px w-3 bg-rule min-[481px]:w-7" />
            ) : null}
            {index < current ? (
              <button
                type="button"
                onClick={() => onGoTo(s.id)}
                className="inline-flex min-h-target cursor-pointer items-center gap-1.5 bg-transparent text-link underline underline-offset-3 min-[481px]:gap-2 min-[481px]:px-1"
              >
                <span className={`${NUM} border-moss bg-moss-soft text-moss`}>
                  <Icon name="check" size={16} />
                </span>
                {s.label}
                <span className="sr-only">, completed. Go back to this step</span>
              </button>
            ) : (
              <span className="inline-flex min-h-target items-center gap-1.5 min-[481px]:gap-2 min-[481px]:px-1">
                <span
                  className={`${NUM} border-rule ${
                    index === current ? 'bg-highlighter font-semibold text-on-highlighter' : ''
                  }`}
                >
                  {index + 1}
                </span>
                {s.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
