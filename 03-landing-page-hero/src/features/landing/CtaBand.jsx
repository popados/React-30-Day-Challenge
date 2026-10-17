import { Button } from '@/components/Button'

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="bg-blueprint-glow">
      <div className="mx-auto flex max-w-page flex-col items-start gap-6 px-4 py-14 md:px-6 md:py-18 lg:flex-row lg:items-center lg:justify-between">
        <h2 id="cta-title" className="font-display text-display md:text-display-lg">
          Stop taking notes. Start finishing things.
        </h2>
        <Button variant="primary" className="shrink-0">
          Try it on your next call
        </Button>
      </div>
    </section>
  )
}
