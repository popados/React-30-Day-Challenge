import { BrandChip } from '@/features/checkout/BrandChip'
import { COUNTRIES, SAVED_CARD } from '@/features/checkout/catalog'
import { LinkButton } from '@/features/checkout/LinkButton'

/** The returning customer's saved card, selected, with a way to use another. */
export function SavedCard({ onChange }) {
  return (
    <div>
      <p className="mb-3 font-medium">Pay with</p>
      <div className="grid grid-cols-[auto_1fr] gap-3 rounded-md border-2 border-moss bg-moss-soft p-[15px]">
        <span
          aria-hidden="true"
          className="mt-0.5 grid size-5 place-items-center rounded-full border-2 border-moss after:size-2.5 after:rounded-full after:bg-moss"
        />
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-2">
              <BrandChip brand={SAVED_CARD.brand} />
              <strong className="font-semibold">Visa ending {SAVED_CARD.last4}</strong>
            </span>
            <span className="text-body-sm text-graphite">Expires {SAVED_CARD.exp}</span>
          </div>
          <p className="text-body-sm text-graphite">
            Billing ZIP {SAVED_CARD.zip}, {COUNTRIES[SAVED_CARD.country].name}
          </p>
          <LinkButton onClick={onChange} aria-label="Change payment method, use a different card">
            Change
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
