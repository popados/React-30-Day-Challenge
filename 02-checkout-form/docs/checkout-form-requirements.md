# Requirements: Day 2 Checkout / Payment Form Screen

_Draft · October 13, 2026 · Front-end requirements for the `02-checkout-form` screen. Built from the five checkout docs in this folder and the Day 2 challenge brief in the project README._

---

## 1. Scope and defaults

This document covers what one front-end checkout screen needs in order to be built and reviewed: layout, fields, states, validation, accessibility and responsive behaviour. Backend, legal and business items from the source docs are listed in section 11 as out of scope.

Defaults chosen where the sources leave a choice open (change any of these and the affected sections follow):

| Decision           | Default                                                                                                       | Why                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Product            | **Tempest Line Plus**, the fictional study app from the PRD, bought by an adult or college learner on the web | The four product docs already describe it; the README says the product is still undecided |
| Purchase type      | Subscription (monthly, school-year and Family plans)                                                          | Matches the FR and PRD                                                                    |
| Shipping address   | **Not collected.** "Same as shipping" is marked not applicable                                                | Digital subscription; the FR checklist maps it out (REQ-3)                                |
| Payment processing | **Mocked.** Card fields are our own inputs with formatting; a fake API resolves after a delay                 | No processor or backend on Day 2                                                          |
| Flow               | One route with three steps: **Plan → Payment → Confirm**                                                      | FR REQ-8                                                                                  |
| Look               | Fieldnote tokens and components from the scaffold                                                             | Already copied into `docs/design-system/`                                                 |
| Stack              | React 19, React Hook Form + Zod, Zustand, TanStack Query, Tailwind v4, Vitest + Testing Library               | From `package.json`                                                                       |

Parent payment links, under-13 consent and minor gating (PRD P0-2 to P0-4) are left out because each is a separate flow, not part of the payment form.

---

## 2. Screen structure

**Layout**

- **≥ 1024px:** two columns. Steps on the left (about 60%), sticky order summary on the right, visible without scrolling on every step.
- **768–1023px:** single column, summary card above the form.
- **< 768px:** single column. A collapsed bar pinned to the bottom shows "Total due today" and the amount; tapping it expands the full summary.

**Persistent elements on every step:** header with a "Back to plans" edit path, progress indicator, order summary, and the primary action button.

**Steps**

| Step       | Contents                                                                                                                                     | Primary action            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| 1. Plan    | Plan choice (Plus monthly, Plus school-year, Family monthly), optional Tutor add-on, email (signed-out users only)                           | "Continue to payment"     |
| 2. Payment | Saved card (if present) or wallet buttons, "or pay with card" divider, card form, billing country and postal code, "Save this card" checkbox | "Review order"            |
| 3. Confirm | Read-only recap with "Change" links, tax-inclusive total, renewal disclosure, consent checkbox                                               | "Subscribe · $X.XX/month" |

After success, a confirmation view replaces the steps (section 6).

---

## 3. Functional requirements

Each requirement lists the source in brackets. "Must" items are needed for the screen to count as done; "Should" items are the challenge's "Improve" list.

### R1. Order summary (Must) [FR REQ-1, README Needs/Key]

- Shows product name, plan name, billing interval, price per interval, add-on line, tax line and **Total due today**.
- Updates within 300 ms when the plan or add-on changes, with no reload.
- Before a postal code is entered, the tax line reads "Calculated at next step"; it never shows a number that later changes without that label.
- On Confirm, the total shown equals the amount "charged" by the mock API to the cent.

### R2. Plan selection (Must) [PRD P0-5, FR REQ-13 AC-1/AC-6]

- Plans are radio cards in a `radiogroup`. Every price includes its interval: "$9.99/month", "$59.99 for the school year (Aug–May)", "$17.99/month for up to 4 learners".
- The school-year plan carries a "Does not renew" label and its end date next to the price.
- The Tutor add-on shows "4 live 30-minute sessions per month; unused sessions expire" before Confirm.

### R3. Payment methods (Must) [FR REQ-2]

- Apple Pay and Google Pay buttons appear above the card form, separated by a divider labeled "or pay with card".
- Wallet buttons are hidden where the device cannot use them. For the mock, detect with `window.ApplePaySession` and a simple Android/Chrome check, with a dev toggle to force either on.
- Choosing a wallet skips the card and billing fields and goes straight to Confirm with a mocked "Visa •• 4242 via Apple Pay".

### R4. Card form (Must) [FR REQ-3, REQ-6]

Fields, in order: card number, expiry, CVC, name on card, billing country, postal code. Nothing else. See section 5 for rules.

- Card number groups digits as the user types: 4-4-4-4 for Visa, Mastercard and Discover; 4-6-5 for American Express.
- Pasted spaces and dashes are stripped silently.
- The brand icon appears inside the field once the prefix identifies it.
- Expiry accepts MM / YY and inserts the separator automatically.
- CVC accepts 4 digits for Amex, 3 for other brands; the hint text follows the brand.
- Billing country defaults to United States and is a native `<select>`. Postal code is hidden for countries without postal codes.
- On a US postal code, the mock tax service returns a rate and the summary updates (R1).

### R5. Security cues (Must) [FR REQ-5, NFR-1]

- The card fields sit in one enclosed group labeled with a lock icon and "Secure payment".
- Accepted brand logos are smaller than the field labels.
- No promotional banners or pop-ups on Payment or Confirm.
- Card values are never written to the URL, `localStorage`, console logs or analytics calls.

### R6. Inline validation and error recovery (Must) [FR REQ-7, README Key]

- Validate each field on blur, then re-validate on change once it has shown an error so the message clears as soon as the input is valid.
- Errors appear directly below the field and say how to fix it (section 5).
- On submit with errors, focus moves to an error summary at the top of the step that links to each invalid field.
- After a declined payment, every value stays filled in except CVC.

### R7. Renewal disclosure and consent (Must) [FR REQ-13, PRD P0-5]

- Directly above the Subscribe button: "$9.99/month plus tax. Renews automatically on Nov 13, 2026 and every month until you cancel. Cancel anytime in Settings → Subscription."
- For the school-year plan the text instead says it does not renew and gives the end date.
- A required, unchecked checkbox: "I agree to the renewal terms above." Subscribe stays disabled until it is checked, and the disabled reason is stated in text, not colour alone.
- The button label repeats the price and interval.

### R8. Progress indicator (Should) [FR REQ-8]

- Exactly three labeled steps that match the real steps. The current step has `aria-current="step"`.
- Completed steps are buttons that return to that step; future steps are not clickable.

### R9. Edit path (Should) [FR REQ-11, README Improve]

- Confirm shows "Change" links next to Plan and Payment. Editing and continuing returns straight to Confirm.
- Going back from Payment to Plan keeps everything entered.
- Each step has its own URL or history entry so the browser Back button moves one step back, not out of checkout.
- "Back to plans" in the header is the "edit path back to the cart".

### R10. Saved card (Should) [FR REQ-10, README Improve]

- A dev toggle simulates a signed-in returning user with a saved card. The Payment step then preselects "Visa ending 4242, expires 08/28" with a "Change" link that reveals the card form inline.
- With a saved card, a returning user reaches success in two actions: pick a plan, then Subscribe on Confirm (the consent checkbox counts as part of the Confirm action).
- First-time card entry shows "Save this card for future purchases", unchecked by default.

### R11. Guest checkout (Should) [FR REQ-12, README "Added"]

- A signed-out user can start without a sign-in page. Only email is asked, on the Plan step.
- If the email matches a mock existing account (for example `taken@example.com`), an inline "You already have an account. Sign in to continue" message appears and the plan choice is kept. This covers the README's "Account safety" check.

### R12. Address autocomplete (Should, conditional) [FR REQ-9, README Improve]

- Not shown by default, because country and postal code are enough for this product.
- If a full billing address is added later, it needs suggestions after 3 characters, a fill on select, and an "Enter address manually" option.

### R13. Same-as-shipping toggle (Not applicable) [FR checklist]

- No shipping address exists. Record it as N/A in the README criteria table, or pick a physical add-on to make it apply (see section 12).

---

## 4. Screen states

| State                | What the user sees                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| Default              | Plan step with Plus monthly preselected and the summary filled in                                              |
| Loading (initial)    | Skeletons for plan cards and summary while the mock plans query resolves; layout does not shift when they load |
| Loading (tax)        | Tax line shows a small spinner and "Calculating…"; the Review button stays enabled                             |
| Loading (submit)     | Subscribe shows a spinner and "Processing…", is disabled from first press, and repeat presses do nothing       |
| Empty                | Plans query returns none: "No plans are available right now" with a Retry button                               |
| Field error          | Message below the field, red border plus an icon (not colour alone), `aria-invalid="true"`                     |
| Submit error summary | Alert at the top of the step listing each error as a link                                                      |
| Card declined        | Alert: "Your card was declined. Try another card or payment method." CVC cleared, everything else kept         |
| Tax service down     | Alert on Payment: "We couldn't calculate tax. Try again." Review is blocked until tax resolves                 |
| Timeout              | "We couldn't confirm your payment. You have not been charged." with Try again; never retry silently            |
| Success              | Confirmation view (section 6)                                                                                  |

The mock API needs test card numbers that trigger these outcomes (section 9).

---

## 5. Field rules

| Field           | `autocomplete` | `inputmode`                        | Rule                                                                             | Error message                                                                                 |
| --------------- | -------------- | ---------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Email           | `email`        | `email`                            | Required, valid format                                                           | "Enter an email like name@example.com"                                                        |
| Card number     | `cc-number`    | `numeric`                          | Digits only after stripping; length fits brand (15 Amex, 16 others); passes Luhn | "Card number is 16 digits. You entered 15." / "Check the card number. It doesn't look right." |
| Expiry          | `cc-exp`       | `numeric`                          | MM 01–12; not in the past                                                        | "Enter the expiry as MM / YY" / "This card has expired"                                       |
| CVC             | `cc-csc`       | `numeric`                          | 3 digits, or 4 for Amex                                                          | "Enter the 3-digit code on the back of your card" (4 and "front" for Amex)                    |
| Name on card    | `cc-name`      | `text`                             | Required, 2+ characters                                                          | "Enter the name shown on your card"                                                           |
| Billing country | `country`      | —                                  | Required; defaults to US                                                         | —                                                                                             |
| Postal code     | `postal-code`  | `numeric` for US, `text` otherwise | US: 5 digits or ZIP+4                                                            | "Enter a 5-digit ZIP code"                                                                    |
| Consent         | —              | —                                  | Must be checked                                                                  | "Agree to the renewal terms to subscribe"                                                     |

Every input has a visible `<label>` tied with `htmlFor`; placeholders are examples only. Errors and hints are linked with `aria-describedby`.

---

## 6. Confirmation view

- Heading "You're subscribed" receives focus on arrival.
- States the plan, amount and interval, the next charge date (or end date for school-year), the masked payment method, and "A receipt is on its way to name@example.com."
- Links: "Manage subscription" and "Back to Tempest Line".

---

## 7. Accessibility (WCAG 2.2 AA) [FR NFR-2, README checklist]

- The whole flow can be completed with keyboard only, in a logical tab order, with a visible focus ring on every control.
- Plan cards use native radio inputs (arrow keys move between them).
- Errors are announced: field errors via `aria-describedby` plus `aria-invalid`; the error summary and payment alerts via `role="alert"`.
- When the step changes, focus moves to the new step's heading, and a polite live region announces "Step 2 of 3: Payment".
- Summary total changes are announced politely; the mobile summary bar toggle is a button with `aria-expanded`.
- Text contrast is at least 4.5:1, and UI component borders at least 3:1, in both light and dark Fieldnote themes.
- Touch targets are at least 44×44px on mobile (stricter than WCAG's 24×24, per the README checklist).
- Brand icons have text alternatives; the lock icon is decorative next to its "Secure payment" text.
- Respects `prefers-reduced-motion` for step transitions and the summary bar.
- Verify with keyboard, axe in the browser, and one screen reader pass (NVDA on Windows).

---

## 8. Responsive and content

- Works from 320px wide with no horizontal scroll.
- Fields stack one per row on mobile; expiry and CVC may share a row from 375px up.
- The Subscribe button is full-width on mobile and stays above the pinned summary bar.
- Content uses realistic values: real-looking names, US ZIPs, tax around 6–10%, and a long name ("Alexandria Montgomery-Okonkwo") and a large total to test wrapping. No lorem ipsum.

---

## 9. Build notes for this stack

These are suggestions that fit the scaffold, not requirements.

- **Form:** one React Hook Form instance per step with a Zod schema per step; `mode: "onTouched"` gives validate-on-blur then re-validate on change.
- **State:** a Zustand `useCheckoutStore` holds the plan, add-on, email, non-sensitive billing fields and current step, so going back keeps data. Card number and CVC stay in form state only, never in the store or storage.
- **Mock services:** `features/checkout/api.js` with `getPlans`, `getTax(country, zip)` and `submitPayment(payload)` returning promises with a short delay; called through TanStack Query (`useQuery` for plans and tax, `useMutation` for submit).
- **Mock outcomes by card number:** `4242 4242 4242 4242` succeeds, `4000 0000 0000 0002` declines, `4000 0000 0000 0119` times out, ZIP `00000` makes the tax call fail.
- **Formatting helpers:** pure functions in `features/checkout/card.js` (`detectBrand`, `formatCardNumber`, `luhnCheck`, `formatExpiry`) so they are easy to unit test.
- **Reuse:** `TextField`, `Button`, `Divider` ("or pay with card"), `Alert` and `Icon` from `src/components/`. New: `PlanCard`, `ProgressSteps`, `OrderSummary`, `SummaryBar`, `CardFields`.

---

## 10. Definition of done

- [ ] Every Must requirement (R1–R7) works, and every Should (R8–R12) is either done or marked deferred in the README criteria table.
- [ ] All states in section 4 can be reached with the mock test values.
- [ ] Unit tests for `detectBrand`, `formatCardNumber`, `luhnCheck` and expiry rules.
- [ ] Component tests: blur error appears and clears; submit moves focus to the error summary; decline keeps values except CVC; Subscribe disabled until consent; summary total updates on plan change.
- [ ] Keyboard-only run from Plan to success with no mouse.
- [ ] Checked at 320px, 768px and 1280px in light and dark themes.
- [ ] `npm run lint`, `npm test` and `npm run build` pass.
- [ ] README self-review checklist ticked.

---

## 11. Out of scope

From the source docs, not part of a front-end form screen:

- Real payment processor, hosted iframes, PCI script inventory and change detection (FR NFR-1 AC-2/3)
- Real tax service, consent record storage and retention, confirmation emails (FR REQ-13 AC-4/5/7)
- Online cancellation flow and May summer reminder (FR REQ-14, PRD P0-7)
- Parent payment link, payer/learner roles, minor gating and under-13 consent (PRD P0-1 to P0-4)
- College email verification and Family upgrade offer (PRD P1-1, P1-2)
- Analytics events, baseline measurement and moderated usability tests (FR NFR-5, NFR-6)
- Performance targets on real 4G devices (FR NFR-3); keep the bundle lean but don't measure
- App-store billing, gift subscriptions, promo codes, non-US markets
- Marketing content brief (SEO article), which is a separate deliverable

---

## 12. Open questions for nik

1. **Product:** keep Tempest Line, or use something else? The README still lists the product as undecided. Recommended: Tempest Line, since the docs already describe it.
2. **Shipping vs. billing:** the challenge brief asks for shipping and billing addresses and a same-as-shipping toggle, which a digital subscription doesn't have. Recommended: mark them N/A. The alternative is adding a physical item (for example a printed study planner) so shipping applies.
3. **Look:** keep the Fieldnote design system, or a new look for Tempest Line? Recommended: Fieldnote tokens for speed.
4. **Consent pattern:** checkbox (default here) or a consent-labeled button? The FR leaves this to Legal.

---

## Traceability to the README criteria

| README criterion        | Covered by             |
| ----------------------- | ---------------------- |
| Order summary           | R1                     |
| Payment methods         | R3                     |
| Shipping vs. billing    | R4 (billing only), R13 |
| Taxes and fees          | R1, R4                 |
| Security cues           | R5                     |
| Total always visible    | R1, section 2 layout   |
| Card auto-format        | R4                     |
| Inline errors           | R6                     |
| Progress indicator      | R8                     |
| Address autocomplete    | R12                    |
| Same-as-shipping toggle | R13 (N/A)              |
| Saved cards             | R10                    |
| Edit path back to cart  | R9                     |
| Guest checkout          | R11                    |
