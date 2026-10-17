import { BRAND_NAMES } from '@/features/checkout/catalog'

const SHORT = { visa: 'VISA', mastercard: 'MC', amex: 'AMEX', discover: 'DISC' }

/**
 * A neutral text chip naming a card network. Not a logo: swap in the networks'
 * official marks (as files in public/logos/) before this ships.
 */
export function BrandChip({ brand }) {
  if (!brand) return null
  return (
    <span
      role="img"
      aria-label={BRAND_NAMES[brand]}
      className="inline-grid h-[22px] min-w-[38px] place-items-center rounded-sm border border-hairline bg-paper px-[5px] text-[10px] leading-none font-bold tracking-[0.04em] text-ink"
    >
      {SHORT[brand]}
    </span>
  )
}
