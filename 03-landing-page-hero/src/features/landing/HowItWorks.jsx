const STEPS = [
  {
    title: 'It joins from your calendar',
    body: 'Zoom, Meet or Teams. Nothing to invite and nothing to remember.',
  },
  {
    title: 'It catches every commitment',
    body: 'Decisions and tasks come out with an owner and a due date taken from what was said.',
  },
  {
    title: 'It sends the recap for you',
    body: 'Each person gets their own list in Slack or email, and tasks sync to your project tool.',
  },
]

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="flex flex-col gap-6">
      <h2 id="how-it-works" className="scroll-mt-6 font-display text-display">
        How it works
      </h2>

      <ol className="flex flex-col gap-6">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="flex items-start gap-6 rounded-lg bg-surface px-6 py-7 md:items-center md:px-7"
          >
            {/* The first step carries the page's one highlighter mark outside the headline. */}
            <span
              aria-hidden="true"
              className={`flex size-12 shrink-0 items-center justify-center rounded-md text-heading ${
                index === 0
                  ? 'bg-highlighter text-on-highlighter'
                  : 'border border-control-border text-ink'
              }`}
            >
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-heading">{step.title}</h3>
              <p className="text-body text-ink-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed border-control-border px-6 py-12 text-center text-body text-ink-muted">
        [Product photo or short demo video]
      </div>
    </section>
  )
}
