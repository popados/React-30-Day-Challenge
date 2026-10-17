import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

export function StartBand() {
  return (
    <section
      id="start"
      aria-labelledby="tl-start-title"
      className="bg-blueprint-glow px-4 text-white @xl:px-6"
    >
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-10 gap-y-6 py-15 @xl:py-22">
        <h2
          id="tl-start-title"
          className="max-w-[18ch] min-w-0 font-display text-heading-lg font-extrabold text-balance @3xl:text-display @5xl:text-display-lg"
        >
          Stuck tonight? Get unstuck one step at a time.
        </h2>
        <div className="flex w-full flex-col items-stretch gap-3 @xl:w-auto @xl:items-start">
          <Button variant="highlight" href="#start">
            Start free
            <Icon name="arrow-right" />
          </Button>
          <p className="text-body-sm text-white/80">No card needed.</p>
        </div>
      </div>
    </section>
  )
}
