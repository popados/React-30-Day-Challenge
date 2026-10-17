import { Bento } from '@/features/tempest/Bento'

const STEPS = [
  {
    title: 'Snap or type the problem',
    body: 'Take a photo of the page or type it in. Math, science or writing, any hour.',
  },
  {
    title: 'Work through it step by step',
    body: 'Each step comes with the reason behind it, and you try the next move yourself.',
  },
  {
    title: 'Check your answer',
    body: 'Tempest Line checks your work, then gives you one like it to practise until it clicks.',
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how"
      aria-labelledby="tl-how-title"
      className="scroll-mt-6 px-4 pt-14 pb-18 @xl:px-6 @4xl:pt-20 @4xl:pb-26"
    >
      <div className="mx-auto grid max-w-page items-start gap-8.5 @6xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-6.5">
          <h2 id="tl-how-title" className="font-display text-heading-lg @4xl:text-display">
            How it works
          </h2>

          <ol className="flex flex-col gap-5.5">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4 rounded-lg border border-border bg-surface px-4.5 py-5.5 @xl:grid-cols-[52px_minmax(0,1fr)] @xl:items-center @xl:gap-6.5 @xl:p-7.5"
              >
                {/* The first step carries the page's highlighter mark. */}
                <span
                  aria-hidden="true"
                  className={`flex size-11 items-center justify-center rounded-md border text-heading tabular-nums @xl:size-13 ${
                    index === 0
                      ? 'border-highlighter bg-highlighter text-on-highlighter'
                      : 'border-control-border'
                  }`}
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-heading">{step.title}</h3>
                  <p className="text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div
            role="img"
            aria-label="Placeholder for product media"
            className="grid aspect-[4/3] place-items-center rounded-lg border-2 border-dashed border-control-border p-6 text-center text-lead text-ink-muted @xl:aspect-[16/5.5] @xl:min-h-55"
          >
            [Product photo or short demo video]
          </div>
        </div>

        <Bento />
      </div>
    </section>
  )
}
