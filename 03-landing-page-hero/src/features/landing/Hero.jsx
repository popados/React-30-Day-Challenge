import { Button } from '@/components/Button'
import { Highlight } from '@/components/Highlight'
import { RecapCard } from '@/features/landing/RecapCard'
import { WaveLines } from '@/features/landing/WaveLines'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grid border-b border-border lg:grid-cols-2">
      <div className="bg-graph-paper flex flex-col items-start justify-center gap-6 px-4 py-16 md:px-12 md:py-24">
        <p className="rounded-pill bg-learner-soft px-3 py-1 text-label text-learner">
          Meeting notes that assign themselves
        </p>

        <h1 id="hero-title" className="font-display text-display md:text-hero">
          <span className="block">Meetings in.</span>{' '}
          <Highlight className="px-[0.12em]">Action items out.</Highlight>
        </h1>

        <p className="max-w-[520px] text-lead text-ink-muted">
          Minutely listens to your calls and gives every attendee a short list of what they promised
          to do, with an owner and a date on each one.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button variant="primary">Try it on your next call</Button>
          <a
            href="#how-it-works"
            className="inline-flex min-h-target items-center text-body-strong text-link underline underline-offset-4"
          >
            See how it works
          </a>
        </div>

        <p className="text-caption text-ink-muted">
          [Trial terms, e.g. free for your first 3 meetings]
        </p>
      </div>

      <div className="bg-blueprint-glow relative flex items-center justify-center overflow-hidden px-4 py-16 md:px-12">
        <WaveLines />
        <div className="relative w-full max-w-[420px]">
          <RecapCard />
        </div>
      </div>
    </section>
  )
}
