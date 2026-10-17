# Subscription Checkout Redesign

*Feature request · Draft · October 12, 2026 · Derived from STRATEGY.md (Subscription Checkout). Thresholds marked ⚠️ are assumptions pending confirmation; see Open Questions.*

## Problem

Our subscription checkout has to do two jobs: take payment with as little effort as possible, and make sure the subscriber knows exactly what they are agreeing to. Public research and competitor review show both jobs commonly fail:

- **Price ambiguity.** In a live walkthrough of Twitch's subscribe flow (Oct 12, 2026), price buttons showed "$5.99" with no billing interval, no tax note, and no mention of automatic renewal on the first three screens.
- **Form friction.** Baymard's benchmark of leading sites found 51% don't auto-format card numbers, 31% have no inline validation, 34% wipe card data after an error, and the average checkout has 11.3 fields where about 8 suffice.
- **Editing traps.** 68% of sites send users backward to edit at the review step.
- **Regulatory exposure.** California's amended Automatic Renewal Law (effective July 1, 2025) requires renewal terms disclosed next to the enrollment request, express affirmative consent with records kept, and online click-to-cancel. Louisiana's Click-to-Cancel Act applies from January 1, 2027.

Affected users: first-time subscribers (mostly mobile), returning subscribers upgrading or resubscribing, and gifters.

*Evidence gap: we have no first-party funnel, support-ticket or dispute data yet. Baseline measurement is part of this work (NFR-6).*

## Solution

Redesign the subscription checkout as a three-step flow — **Plan → Payment → Confirm** — that meets our 14-point checkout checklist, adapted for a digital recurring purchase.

**In scope**

- Subscribe window: plan/tier choice, gift option, persistent order summary.
- Payment step: wallets, saved methods, processor-hosted card fields, billing country and postal code.
- Confirm step: tax-inclusive total, renewal disclosure, affirmative consent, "Subscribe" action.
- Post-purchase: confirmation screen and email, online cancellation flow.
- Web (desktop and mobile web).

**Out of scope**

- Native app-store billing flows (governed by store rules; tracked separately).
- Pricing changes, new tiers, or promotional mechanics.
- Pause, multi-month prepaid plans, and regional payment-method expansion (Strategy Horizon 3).

**Checklist mapping**

| Checklist item | How it applies to a subscription | Requirement |
|---|---|---|
| Order summary | Plan, tier, interval, price, tax, total | REQ-1 |
| Payment methods | Wallets, cards, PayPal, gift balance | REQ-2 |
| Shipping vs. billing | No shipping; billing country + postal code for tax and card checks | REQ-3 |
| Taxes and fees | Shown before Confirm | REQ-4 |
| Security cues | Visible on the payment step | REQ-5 |
| Total always visible | Summary persists through all steps | REQ-1 |
| Card auto-format | Hosted fields | REQ-6 |
| Inline errors | Field-level, with retention | REQ-7 |
| Progress indicator | Plan → Payment → Confirm | REQ-8 |
| Address autocomplete | Only where full billing address is required | REQ-9 |
| Same-as-shipping toggle | **Not applicable** (no shipping address) | — |
| Saved cards | Default for returning subscribers | REQ-10 |
| Edit path | Back to plan without data loss | REQ-11 |
| Guest checkout | Lightweight inline account creation | REQ-12 |
| *Added for subscriptions* | Renewal disclosure and consent; cancellation | REQ-13, REQ-14 |

## Outcomes (Customer Value)

- **"I know exactly what I'm paying."** Every price shows its interval; the total including tax and the renewal date are visible before I confirm.
- **"It took less than a minute."** First-time subscribers type at most four fields; returning subscribers confirm in two taps.
- **"I didn't have to start over."** Errors appear next to the field that caused them, and nothing I typed is lost.
- **"I can leave as easily as I joined."** Cancellation happens online in one flow.
- **Business:** fewer surprise-charge refunds and chargebacks, documented compliance with auto-renewal law, and a measured conversion baseline to improve against.

## Requirements

### Functional Requirements

#### REQ-1: Persistent plan and order summary
> **Type**: Functional

A summary of the selected plan stays visible throughout checkout.

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | On every step, the summary shows: channel/product name, tier name, billing interval, price per interval, tax line, and total due today. | |
| AC-2 | On viewports ≥ 1024px wide, the summary is visible without scrolling on every step. | |
| AC-3 | On viewports < 768px wide, a collapsed summary bar showing "Total due today" with the amount is pinned on every step and expands to the full summary on tap. | |
| AC-4 | When the user changes tier, the summary and total update within 300 ms of the selection with no page reload. | ⚠️ 300 ms assumed |

#### REQ-2: Payment methods
> **Type**: Functional

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | The payment step offers credit/debit card, PayPal, Apple Pay (on supported Apple devices/browsers), Google Pay (on supported browsers), and gift/account balance when the user has a balance > 0. | Method list ⚠️ pending processor confirmation |
| AC-2 | Wallet buttons that the user's device/browser cannot use are not displayed. | |
| AC-3 | Wallet buttons appear above the card form, separated by a divider labeled "or pay with card". | |
| AC-4 | If a gift balance covers less than the total, the remaining amount and a second payment method are requested before Confirm. | |

#### REQ-3: Billing details (replaces shipping vs. billing)
> **Type**: Functional

No shipping address is collected. Billing details are limited to what tax calculation and card verification require.

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | For card payments, the form collects only: card number, expiry, CVC, billing country, and postal code (where the country uses postal codes). | |
| AC-2 | Billing country defaults to the country detected from the user's IP or account and can be changed via a dropdown. | |
| AC-3 | Wallet and PayPal payments collect no billing fields in our form; billing details come from the wallet/provider. | |
| AC-4 | If the card's issuing country does not match the selected billing country and the processor declines for that reason, the error message names the mismatch and how to fix it. | |

#### REQ-4: Taxes and fees before confirmation
> **Type**: Functional

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | Once billing country and postal code (or wallet details) are available, the tax amount and tax-inclusive total appear in the summary before the Confirm step is shown. | |
| AC-2 | Before tax can be calculated, the summary shows "Tax calculated at next step" in place of a tax amount; it never shows a total that later changes without that label. | |
| AC-3 | The amount charged at Confirm equals the total displayed on the Confirm step to the cent. | |
| AC-4 | No fee or charge appears on the Confirm step that was not shown in the summary on the Payment step. | |

#### REQ-5: Security cues
> **Type**: Functional

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | The card field group is visually enclosed and labeled with a lock icon and the text "Secure payment". | |
| AC-2 | Accepted card brand logos are displayed at a size smaller than the field labels. | Baymard: icons secondary |
| AC-3 | The page shows no third-party promotional banners or pop-ups on the Payment or Confirm steps. | |

#### REQ-6: Card field auto-formatting
> **Type**: Functional

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | The card number field displays digits in groups matching the detected brand (4-4-4-4 for Visa/Mastercard/Discover; 4-6-5 for American Express) as the user types. | |
| AC-2 | Typing or pasting spaces or dashes into the card number does not produce an error. | |
| AC-3 | The card brand icon appears in the card number field after the first digits identify the brand. | |
| AC-4 | The expiry field accepts a single MM / YY entry and inserts the separator automatically. | |
| AC-5 | The CVC field accepts 4 digits for American Express and 3 digits for other brands. | |
| AC-6 | On mobile, card, expiry, CVC and postal code fields open a numeric keypad. | US postal codes; alphanumeric elsewhere |

#### REQ-7: Inline validation and error recovery
> **Type**: Functional

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | Each field is validated when the user leaves it (on blur), not on every keystroke. | |
| AC-2 | A card number that fails the Luhn check shows an error directly below the field before submission. | |
| AC-3 | Every error message states how to fix the problem (e.g., "Card number is 16 digits — you entered 15"). | |
| AC-4 | An error message is removed as soon as the input becomes valid, without requiring resubmission. | |
| AC-5 | After a processor decline or validation error on submit, all entered values (including card number and expiry, via the hosted fields) remain populated; only CVC may be cleared. | Baymard: 34% wipe data |
| AC-6 | On submit with errors, focus moves to an error summary at the top of the form that links to each invalid field. | |

#### REQ-8: Progress indicator
> **Type**: Functional

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | A progress indicator shows exactly three labeled steps — Plan, Payment, Confirm — and highlights the current step. | Must match the real steps 1:1 |
| AC-2 | Completed steps in the indicator are clickable and return the user to that step. | |

#### REQ-9: Address autocomplete (conditional)
> **Type**: Functional

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | In jurisdictions where tax rules require a full billing address, typing in the street field shows address suggestions after 3 characters. | Jurisdiction list ⚠️ from Tax |
| AC-2 | Selecting a suggestion fills street, city, region and postal code. | |
| AC-3 | A "Enter address manually" option is always available. | |
| AC-4 | In jurisdictions that need only country and postal code, no street address field is shown. | |

#### REQ-10: Saved payment methods
> **Type**: Functional

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | For a signed-in user with a saved method, the Payment step preselects the default saved method, showing brand, last 4 digits and expiry. | |
| AC-2 | A returning user with a saved method can complete a subscription in 2 taps from the subscribe window (select plan → Subscribe on Confirm). | |
| AC-3 | A first-time card payment shows a "Save this card for future purchases" checkbox, unchecked by default. | ⚠️ default state pending Legal |
| AC-4 | Saved methods can be changed from the Payment step via a "Change" link without leaving checkout. | |

#### REQ-11: Edit path
> **Type**: Functional

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | The Confirm step shows "Change" links next to Plan and Payment details. | |
| AC-2 | Following a "Change" link and making an edit returns the user directly to Confirm, not to the start of the flow. | |
| AC-3 | Navigating back from Payment to Plan retains all entered payment and billing data. | |
| AC-4 | Using the browser Back button moves to the previous checkout step, not out of checkout. | |

#### REQ-12: Lightweight account creation (guest checkout equivalent)
> **Type**: Functional

A subscription needs an account to deliver benefits, so true guest checkout is replaced by inline account creation.

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | A signed-out user can start checkout without first being sent to a separate sign-in page. | |
| AC-2 | A signed-out user is asked for email only on the Plan step; password or passkey setup happens after payment succeeds. | ⚠️ pending Security review |
| AC-3 | If the email matches an existing account, the user is offered sign-in inline without losing their plan selection. | |

#### REQ-13: Renewal disclosure and affirmative consent
> **Type**: Functional (Compliance-driven)

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | Every price label in the subscribe window and checkout includes its interval (e.g., "$5.99/month"). | |
| AC-2 | Immediately above the Subscribe button on Confirm, text states: amount per interval, that it renews automatically until canceled, the next charge date, and where to cancel. | Copy ⚠️ pending Legal |
| AC-3 | The Subscribe button cannot be activated until the user takes an affirmative action indicating consent to the renewal terms (checkbox or button labeled with the consent, per Legal's chosen pattern). | |
| AC-4 | On successful subscription, a consent record is stored with: user ID, timestamp, terms version, price, interval and tax shown. | |
| AC-5 | Consent records are retained for at least 3 years or 1 year after the subscription ends, whichever is longer. | California ARL |
| AC-6 | Non-renewing options (e.g., one-time or free monthly subs) are labeled "Does not renew" next to their price. | |
| AC-7 | Within 5 minutes of a successful subscription, the user receives an email containing the renewal terms, next charge date, amount, and a direct cancellation link. | ⚠️ 5 min assumed |

#### REQ-14: Online cancellation
> **Type**: Functional (Compliance-driven)

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | A signed-in user can cancel from the subscriptions page in no more than 3 clicks/taps, with no phone call, chat or email required. | |
| AC-2 | Any retention offer appears at most once in the cancellation flow and has a clearly labeled option to continue canceling. | |
| AC-3 | After cancellation, the screen and a confirmation email state the date benefits end and that no further charges will occur. | |

### Non-Functional Requirements

#### NFR-1: Payment security
> **Type**: Non-Functional — Security / Compliance

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | Card number, expiry and CVC are collected only in processor-hosted fields; our servers and page scripts never receive raw card data. | |
| AC-2 | Every script on the Payment and Confirm steps is listed in an inventory with a written justification and an integrity control (e.g., SRI or CSP). | PCI DSS 4.0.1 §6.4.3 |
| AC-3 | Unauthorized changes to payment-page scripts or security headers trigger an alert within the detection interval set by our PCI program (at least weekly). | PCI DSS 4.0.1 §11.6.1 |
| AC-4 | No card data, email or billing data appears in URLs, query strings, logs or analytics events. | |

#### NFR-2: Accessibility
> **Type**: Non-Functional — Accessibility

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | The full flow passes WCAG 2.2 Level AA in an audit covering keyboard-only and screen-reader (VoiceOver and NVDA) use. | |
| AC-2 | Every input has a visible, programmatically associated label; placeholders are never the only label. | |
| AC-3 | All interactive targets are at least 24×24 CSS px. | WCAG 2.5.8 |
| AC-4 | Error messages are announced by screen readers when they appear. | |
| AC-5 | All fields use correct `autocomplete` tokens (`cc-number`, `cc-exp`, `cc-csc`, `cc-name`, `postal-code`, `country`, `email`). | |

#### NFR-3: Performance
> **Type**: Non-Functional — Performance

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | The subscribe window is interactive within 2.0 s at the 75th percentile on a mid-tier mobile device over 4G. | ⚠️ target assumed |
| AC-2 | Hosted payment fields are ready for input within 1.5 s of the Payment step loading at the 75th percentile. | ⚠️ target assumed |

#### NFR-4: Reliability
> **Type**: Non-Functional — Reliability

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | The Subscribe button is disabled with a loading state from first press until the payment result returns; repeated presses create no additional charges. | Idempotency key per attempt |
| AC-2 | If the tax service is unavailable, checkout blocks Confirm and shows a retry message rather than charging an unconfirmed total. | |
| AC-3 | If the processor times out, the user sees whether they were charged before any retry is offered. | |

#### NFR-5: Usability
> **Type**: Non-Functional — Usability

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | In moderated testing with at least 8 first-time participants on mobile, median time from subscribe window to successful payment is under 60 seconds. | |
| AC-2 | In the same test, at least 90% of participants correctly state the amount, interval and that it renews when asked after subscribing. | |

#### NFR-6: Measurement
> **Type**: Non-Functional — Reliability (analytics)

| # | Acceptance Criterion | Notes |
|---|---|---|
| AC-1 | Events fire for: window viewed, tier selected, payment step viewed, payment method selected, field error (field name only), confirm viewed, subscribe succeeded/failed, cancellation started/completed. | No PII in events |
| AC-2 | Baseline funnel data for the current checkout is captured for at least 2 weeks before the redesign launches. | |

## Open Questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | Which payment methods does our processor support in each launch market (REQ-2 AC-1)? | Payments Eng | Open |
| 2 | Consent pattern: checkbox or consent-labeled button? Final renewal copy (REQ-13)? | Legal | Open |
| 3 | Default state of "Save this card" (REQ-10 AC-3)? | Legal / Product | Open |
| 4 | Which jurisdictions require a full billing address for tax (REQ-9)? | Tax / Finance | Open |
| 5 | Is email-first account creation acceptable for fraud and security (REQ-12 AC-2)? | Security / Trust & Safety | Open |
| 6 | Confirm performance targets (NFR-3) and confirmation-email SLA (REQ-13 AC-7). | Engineering | Open |
| 7 | Renewal reminder cadence for annual plans if/when offered. | Legal | Open |
| 8 | How will app-store purchases show renewal terms and cancellation consistently? | Product | Open |

## Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Up-front renewal disclosure lowers checkout conversion | Medium | Medium | A/B test placement and wording; disclosure itself remains required |
| 2 | Tax service latency delays the Confirm step | Medium | Medium | Calculate as soon as postal code is entered; cache by postal code; NFR-4 AC-2 fallback |
| 3 | Hosted fields limit styling and error-message control | Medium | Low | Use the processor's appearance API; map processor error codes to our copy |
| 4 | State auto-renewal laws diverge further | High | Medium | Build disclosure and consent as configurable per jurisdiction; Legal review each quarter |
| 5 | Email-first account creation increases fraud or fake accounts | Low | Medium | Processor risk scoring; verify email before benefits activate |
| 6 | No baseline data means improvements can't be proven | High | High | NFR-6 AC-2: capture 2 weeks of baseline before launch |
| 7 | Third-party scripts re-added to payment pages over time | Medium | High | NFR-1 AC-2/3 inventory and change detection |
