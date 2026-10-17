import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { WALLET_BILLING } from '@/features/checkout/walletSupport'

/**
 * Express wallet buttons. Text stand-ins: production uses each wallet's own
 * official button (Apple Pay JS, Google Pay API), never a redrawn one.
 */
export function Wallets({ apple, google, onPaid }) {
  const [busy, setBusy] = useState(null)

  async function pay(name) {
    if (busy) return
    setBusy(name)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setBusy(null)
    onPaid(WALLET_BILLING, {
      kind: 'wallet',
      wallet: name,
      brand: 'visa',
      last4: '4242',
      ...WALLET_BILLING,
    })
  }

  const wallets = [apple && 'Apple Pay', google && 'Google Pay'].filter(Boolean)

  return (
    <div
      className={`grid grid-cols-1 gap-3 ${wallets.length === 2 ? 'min-[480px]:grid-cols-2' : ''}`}
    >
      {wallets.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => pay(name)}
          className="inline-flex min-h-control cursor-pointer items-center justify-center gap-2 rounded-md border border-wallet-bg bg-wallet-bg text-[17px] font-semibold text-wallet-fg"
        >
          {busy === name ? (
            <>
              <Icon name="loader-circle" className="animate-spin" />
              <span className="text-[15px] font-medium">Opening {name}…</span>
            </>
          ) : (
            <>
              <span className="text-[15px] font-medium">Pay with</span> {name}
            </>
          )}
        </button>
      ))}
    </div>
  )
}
