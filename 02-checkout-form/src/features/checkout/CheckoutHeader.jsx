import { Icon } from '@/components/Icon'

/** Back link, the name and a secure-checkout note. */
export function CheckoutHeader({ onBack }) {
  return (
    <header className="border-b border-hairline px-4">
      <div className="mx-auto grid min-h-16 max-w-shell grid-cols-[1fr_auto_1fr] items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-target cursor-pointer items-center gap-2 justify-self-start bg-transparent pr-2 font-medium text-link underline underline-offset-3"
        >
          <Icon name="arrow-left" />
          <span className="hidden min-[561px]:inline">Back to plans</span>
          <span className="min-[561px]:hidden">Plans</span>
        </button>
        {/* No logo supplied: the name in Source Serif 4. */}
        <span className="font-serif text-heading-sm">Tempest Line</span>
        <span className="inline-flex items-center gap-1.5 justify-self-end text-body-sm text-graphite">
          <Icon name="lock" size={16} />
          <span className="hidden min-[561px]:inline">Secure checkout</span>
          <span className="sr-only min-[561px]:hidden">Secure checkout</span>
        </span>
      </div>
    </header>
  )
}
