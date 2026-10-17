// The wallet that answers in the mock: always a Visa ending 4242, billed to ZIP 94103.
export const WALLET_BILLING = { country: 'US', zip: '94103' }

/** Shown when the device supports the wallet, or the prototype switch says it does. */
export function walletAvailable(kind, dev) {
  if (kind === 'apple') return Boolean(window.ApplePaySession) || dev.apple
  const ua = navigator.userAgent
  return (/Android/i.test(ua) && /Chrome/i.test(ua)) || dev.google
}
