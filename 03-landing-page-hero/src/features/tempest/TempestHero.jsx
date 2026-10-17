import { Button } from '@/components/Button'
import { Highlight } from '@/components/Highlight'
import { Icon } from '@/components/Icon'
import { WaveLines } from '@/components/WaveLines'
import { WorkedProblemCard } from '@/features/tempest/WorkedProblemCard'

const STAR_COUNT = 5

export function TempestHero() {
  return (
    <section aria-labelledby="tl-hero-title" className="grid @4xl:grid-cols-2">
      <div className="bg-graph-paper flex items-center px-4 py-11 @xl:px-6 @xl:py-15 @4xl:px-12 @4xl:py-20">
        <div className="flex max-w-[600px] flex-col items-start gap-5">
          <p className="inline-flex items-center gap-2 rounded-pill border border-learner/40 bg-learner-soft px-3 py-1.5 text-label text-learner">
            <Icon name="graduation-cap" size={18} />
            For students, any subject, any hour
          </p>

          <h1
            id="tl-hero-title"
            className="max-w-[13ch] font-display text-display font-extrabold text-balance @3xl:text-display-lg @6xl:text-hero"
          >
            Stuck on homework? Get it explained{' '}
            <Highlight className="px-[0.12em]">step by step.</Highlight>
          </h1>

          <p className="max-w-[32em] text-lead text-ink-muted">
            Snap or type any problem. Tempest Line walks you through each step and checks your
            answer, until it clicks.
          </p>

          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-col items-stretch gap-x-6.5 gap-y-3 @xl:flex-row @xl:flex-wrap @xl:items-center">
              <Button variant="primary" href="#start">
                Start free
                <Icon name="arrow-right" />
              </Button>
              <a
                href="#how"
                className="inline-flex min-h-target items-center justify-center gap-2 text-body-strong text-link underline decoration-2 underline-offset-4"
              >
                <Icon name="circle-play" />
                See how it works
              </a>
            </div>
            <p className="text-center text-body-sm text-ink-muted @xl:text-left">
              No card needed. A parent can add a plan later from $9.99/month.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
            <div role="img" aria-label="Rated [4.8] out of 5" className="flex gap-0.5 text-ink">
              {Array.from({ length: STAR_COUNT }, (_, index) => (
                <Icon key={index} name="star" className="fill-current" />
              ))}
            </div>
            <p className="text-body-sm">
              <strong>[4.8]</strong>{' '}
              <span className="text-ink-muted">
                from [12,000] App Store and Google Play reviews
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blueprint-glow relative flex items-center justify-center overflow-hidden px-4 pt-10 pb-15 @xl:px-6 @4xl:px-8 @4xl:pt-18 @4xl:pb-22">
        <WaveLines className="text-white" />
        <div className="relative w-full max-w-[440px]">
          <WorkedProblemCard />
          <p className="absolute right-2 -bottom-5 z-10 inline-flex items-center gap-2 rounded-pill border border-payer/45 bg-payer-soft px-3.5 py-2 text-label text-payer shadow-raised @xl:-right-2.5">
            <Icon name="credit-card" size={18} />
            Paid by a parent · no surprise charges
          </p>
        </div>
      </div>
    </section>
  )
}
