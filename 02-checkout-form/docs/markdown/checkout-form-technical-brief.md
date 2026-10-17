# Technical Brief: Tempest Line Subscription Checkout

**Source FR:** FR-subscription-checkout-redesign.md, extended with the Tempest Line company profile (payer/learner split, parent payment link, school-year plan, tutor add-on, student verification)
**Date:** October 12, 2026
**Status:** Draft — pending PM sign-off on open questions

---

## Scope

### In Scope

- Three-step subscription checkout (Plan → Payment → Confirm) on web, desktop and mobile, meeting FR REQ-1 to REQ-14 and NFR-1 to NFR-6.
- Plans: Plus monthly, Plus school-year (non-renewing), Family monthly (up to 4 learner profiles), Tutor add-on, college discount on Plus.
- **Payer and learner as separate roles** throughout checkout, receipts, renewal reminders and cancellation.
- **"Ask a parent to pay" link**: a learner under 18 sends a link; the payer completes checkout without a Tempest Line login; the learner's plan activates on success.
- **Parent-created profiles for learners under 13**, with verifiable parental consent before any learner data is collected.
- No payment fields shown to signed-in learners under 18.
- School-email verification for the college discount inside checkout.
- May reminder to monthly payers with pause-for-summer and cancel options.
- Payer-facing online cancellation (FR REQ-14).

### Out of Scope

- In-app purchase through the Apple App Store or Google Play.
- School and district (B2B) licensing, purchase orders, or invoicing.
- Tutor session scheduling, matching or rollover rules (checkout only displays the add-on's terms).
- Promo codes, referral credits and gift subscriptions.
- Payer accounts with full dashboards (the link-based payer flow only covers paying, receipts, reminders and cancellation).
- Currencies other than USD and markets outside the US at launch.

---

## Constraints

| Type        | Constraint                                                                                                                                                                                                                                    | Confirmed / Assumed                                        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Compliance  | Learners under 13: no personal data collected before verifiable parental consent (COPPA).                                                                                                                                                     | Confirmed (law) — method to validate with Legal            |
| Compliance  | Renewal terms disclosed next to the Subscribe action, affirmative consent captured, consent records retained ≥ 3 years or 1 year after termination, online cancellation (California ARL as amended July 1, 2025; Louisiana from Jan 1, 2027). | Confirmed (law) — copy to validate with Legal              |
| Compliance  | Minors cannot be the contracting party for a recurring charge; the payer must be an adult who sees and accepts the terms.                                                                                                                     | Assumed — validate with Legal                              |
| Compliance  | Card data handled only by the payment processor; every script on payment steps inventoried, justified and integrity-protected, with change detection (PCI DSS 4.0.1 §6.4.3, §11.6.1).                                                         | Confirmed (standard)                                       |
| Compliance  | WCAG 2.2 AA for all checkout and payer-link screens.                                                                                                                                                                                          | Confirmed (standard)                                       |
| Technical   | Parent payment link must work on a device with no Tempest Line session.                                                                                                                                                                       | Confirmed (FR intent)                                      |
| Technical   | Learner age must be known before checkout renders payment fields.                                                                                                                                                                             | Assumed — validate with Engineering (age source at signup) |
| Dependency  | Tax amount must come from a tax service using payer billing country and postal code before Confirm.                                                                                                                                           | Assumed — validate with Finance                            |
| Dependency  | Payment processor supports wallets, saved methods and hosted card fields for the payer.                                                                                                                                                       | Assumed — validate with Payments Eng                       |
| Dependency  | School-email verification requires an email delivery path and a list or rule for eligible domains.                                                                                                                                            | Assumed — validate with Product                            |
| Performance | Subscribe window interactive ≤ 2.0 s and hosted fields ready ≤ 1.5 s at P75 on mid-tier mobile over 4G (FR NFR-3).                                                                                                                            | Assumed — validate with Engineering                        |

---

## Edge Cases

| Scenario                                                                       | Recommended Handling                                                                                         | Open?    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| Parent link is opened after the learner already subscribed another way         | Show "Already active" with the plan and end date; take no payment                                            | No       |
| Parent link is forwarded or opened by someone other than the intended payer    | Link shows only learner first name and plan; payer still sees full terms. Expiry and single-use rules needed | Yes — Q2 |
| Parent link expires before payment                                             | Show expiry message and let the learner resend from the app                                                  | Yes — Q2 |
| Two parents pay the same link at the same moment                               | Only one charge succeeds; the second sees "Already paid"                                                     | No       |
| Learner's stated age changes after a profile is created (e.g., turns 13 or 18) | Profile role updates; payer stays the payer until they transfer or cancel                                    | Yes — Q4 |
| Learner aged 13–17 has their own card and tries to pay                         | Payment fields not shown; route to parent link                                                               | Yes — Q3 |
| School-year plan bought mid-year (e.g., January)                               | Price is prorated or full price — needs a decision                                                           | Yes — Q5 |
| School-year plan ends while a tutor add-on is monthly                          | Add-on renewal behavior after the base plan ends needs a decision                                            | Yes — Q6 |
| Family plan: a 5th learner is added                                            | Block with message offering a second Family plan; no silent charge                                           | No       |
| College discount email can't be verified (no school email)                     | Allow purchase at full price; show "Verify later" to apply discount to next charge                           | Yes — Q7 |
| Payer cancels while learner is mid-session with a tutor                        | Benefits continue to the end of the paid period; no mid-period cutoff                                        | No       |
| May reminder sent but payer neither pauses nor cancels                         | Plan renews as normal; reminder copy must say so                                                             | No       |
| Tax service unavailable                                                        | Block Confirm with retry message; never charge an unconfirmed total (FR NFR-4)                               | No       |

---

## Open Questions for PM

1. **Age gate source:** How is learner age captured and verified at signup, and is self-declared age enough? Context: every payer/learner rule depends on it; a weak gate creates COPPA exposure.
2. **Parent link rules:** How long is a payment link valid, can it be used once or until paid, and should the payer verify their email before paying? Context: balances security against friction for parents paying at work.
3. **Teens with their own cards:** Can a learner aged 13–17 pay with their own card, or must an adult always pay? Context: blocking costs conversions; allowing it raises contract and refund risk.
4. **Role transitions:** When a learner turns 18, do they take over billing automatically, by invitation, or never? Context: affects who gets reminders and who can cancel.
5. **Mid-year school-year purchase:** Full price or prorated by months remaining? Context: affects the price shown in the summary and refund rules.
6. **Add-on after base plan ends:** Does a monthly tutor add-on stop when a non-renewing school-year plan ends? Context: a renewing add-on on a lapsed plan is a likely surprise charge.
7. **Unverified college discount:** Allow full-price purchase with later verification, or require verification first? Context: requiring it first adds a step and email round-trip.
8. **Summer pause terms:** How long can a plan pause, and is the pause free? Context: determines May reminder copy and the renewal date shown after pause.

---

## Integration Points

- **Identity / accounts:** reads learner age and profile role; creates learner profiles for parent-created under-13 accounts.
- **Payment processor:** hosted card fields, wallets, saved payer methods, recurring billing, refunds.
- **Tax service:** returns tax for payer location before Confirm.
- **Messaging (email/SMS):** sends parent payment links, receipts, consent confirmations, May reminders and cancellation confirmations.
- **Consent records store:** writes renewal-consent and parental-consent records with retention rules.
- **Entitlements:** activates or ends Plus, Family and Tutor access for the right learner profiles.
- **Analytics:** checkout funnel events with no PII (FR NFR-6).

---

## Out of Scope (Explicit List)

The following are explicitly excluded from this implementation. Do not design for these unless the scope is formally revised:

- App-store in-app purchase flows
- School/district licensing and invoicing
- Tutor scheduling and session rollover
- Promo codes, referrals and gifting
- Full payer account dashboards
- Non-USD currencies and non-US markets
