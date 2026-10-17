# Day 2 self-review

*October 17, 2026 · The README self-review checklist, answered against `prototype/checkout.html` and the docs in this folder.*

## How this was checked

- **Prototype:** opened `prototype/checkout.html` in headless Chromium at 320px, 375px and 1280px, in light and dark colour schemes, and ran each step (Plan, Payment with errors, Confirm, success).
- **Accessibility:** ran axe-core 4.10 on every step in both themes, with the prototype-controls panel excluded.
- **Keyboard:** did one run from Plan to success using only Tab, arrow keys, Space and Enter.
- **Contrast:** calculated every text and background pair in the prototype's colour variables with the WCAG formula.
- **Real content:** made a scratch copy with a $12,499.99 plan and a $1,824.99 add-on, then checked it at 320px with a 68-character email address and a long cardholder name.

Line numbers refer to `prototype/checkout.html`.

## Summary

| Check | Verdict |
|---|---|
| Hierarchy | **Pass** |
| Contrast | **Pass** (disabled Subscribe button is low, but WCAG exempts disabled controls) |
| Spacing | **Mostly pass**: on a 4px scale with a handful of off-scale values |
| States | **Pass** with two gaps: empty and error share one message, and the wallet has no failure state |
| Real content | **Partial**: long text wraps, but big numbers have no thousands separator |
| Touch targets | **Partial**: three controls are under 44px tall |
| Consistency | **Partial**: consistent inside the prototype, but it doesn't use the current design system |
| Keyboard and screen readers | **Mostly pass**: checkout works without a mouse, with focus loss in four places and two axe issues |
| Account safety | **Partial**: duplicate emails are caught, but there's no guard against a mistyped email, and a guest has no way back to the subscription |

The biggest finding isn't on the checklist. `docs/design-system.md` was switched to the **Tempest Line Blueprint** system (blueprint blue, lime highlighter, Atkinson Hyperlegible and Bricolage Grotesque) after the prototype was built. The prototype still uses the **Fieldnote** palette and fonts (moss green, Inter, Source Serif; lines 9 and 13–23). The contrast, spacing and consistency verdicts below apply to the prototype as built. They would need to be checked again after a re-skin.

---

## Hierarchy: can you tell what matters most in 3 seconds?

**Pass.**

- Each step opens with one large serif heading: 32px, or 40px at 1024px and up (lines 95–98).
- The total due today is the second-largest text, at 28px serif in the summary (line 219). On desktop it stays visible because the summary is sticky (line 69). On phones it's in a bar pinned to the bottom of the screen (lines 249–253).
- Each step has one primary button, filled moss green. Everything else is outlined or a text link.
- On the Plan step, the selected plan card gets a 2px border and a tinted fill (line 108).
- On Confirm, the order is totals, then the disclosure, then consent, then the button, so the price is read before the commitment.

**Minor:** in the screenshot, the yellow "Does not renew" tag is the brightest thing on the Plan step. It takes the eye ahead of the selected plan. That's arguably correct, because surprise renewals are the problem this checkout exists to fix.

## Contrast: does text meet 4.5:1 against its background?

**Pass** for all text in both themes.

Lowest measured pairs:

| Pair | Light | Dark |
|---|---|---|
| Muted text (`graphite`) on summary panel or selected card | 5.64:1 | 6.39:1 |
| Error text on error fill | 5.64:1 | 7.03:1 |
| Link (`moss`) on summary panel | 6.25:1 | 7.16:1 |
| White button text on moss | 7.49:1 | 8.48:1 (dark text) |
| Control border (`rule`) on selected fill | 3.07:1 | 3.21:1 |

Body text is 14:1 or higher everywhere.

**Watch:**

- **Disabled Subscribe button.** It's drawn with `opacity: 0.55` (line 183), which comes out at about **2.6:1** in light mode. WCAG exempts disabled controls, and the reason is given in text beside it. Still, the design system asks for a dedicated disabled colour (`action-disabled`) rather than fading the button.
- **Control borders.** These pass 3:1, but only just on tinted fills.
- **Card-brand chips.** The text is 10px (line 147). The chips are logos, so the contrast rule doesn't apply, but they're the smallest text on the screen.

## Spacing: is there a consistent scale?

**Mostly pass.**

I counted 128 `gap`, `padding` and `margin` values in the stylesheet:

- 101 are 4px steps: 4, 8, 12, 16, 24, 32 and 48.
- Six are 20px. That's still a 4px multiple, but it isn't one of the design system's tokens. It's used on button side padding and some panel padding.
- The 15px and 75px values are 16px and 76px minus 1px, to stop the layout shifting when a 2px border appears. That's intentional.
- **Off-scale:** 6px is used 7 times (icon gaps, tag padding, the brand-chip row), plus single uses of 3px, 5px and 10px.

**Fix:** replace the 6px values with 4px or 8px, and move the 20px padding to 16px or 24px.

## States: empty, loading and error, not just the ideal one?

**Pass.** Every state in the requirements' state table can be reached:

- **Loading:**
  - Skeleton plan cards and summary while plans load (lines 483–485, 596–598).
  - "Calculating…" with a spinner on the tax line.
  - "Checking tax…" on the step buttons.
  - "Processing…" on Subscribe, which also blocks repeat presses (line 858).
- **Empty:** "No plans are available right now" with a Retry button (line 600).
- **Errors:**
  - Field errors show an icon, a fix-it sentence and a 2px red border.
  - An error summary with links to each field moves focus to itself (lines 565–573).
  - Card declined keeps every value except the security code (lines 871–874).
  - Tax service down blocks Review (line 828).
  - Timeout says "You have not been charged" and offers Try again (line 743).
- **Success:** a confirmation view whose heading takes focus.

**Gaps:**

1. **Empty and error share one message.** The empty state says "No plans are available right now" and then "Plans couldn't be loaded". Those are two different situations, and only one of them is fixed by Retry. It's also styled as an info message, not an error.
2. **No wallet failure state.** The mocked Apple Pay and Google Pay always succeed. There's no "you closed the payment sheet" or "wallet payment failed" state.
3. **Empty summary bar on phones.** While plans load, the bar shows "—". That's acceptable, but it's a bare dash with no label.

## Real content: long names, missing photos, big numbers?

**Partial.**

- **Long names and emails: pass.** "Alexandria Montgomery-Okonkwo" and a 68-character email both wrap with no horizontal scroll at 320px. The Confirm recap breaks long words anywhere (line 228), and the success page wraps its rows.
- **Missing photos: not applicable.** The checkout has no product images or avatars. Wallet and card brands are drawn with text and CSS, so there's nothing to fail to load.
- **Big numbers: fail on formatting.** `money()` is just `'$' + n.toFixed(2)` (line 360). A large total therefore shows as **$15506.79**, not $15,506.79. Layout survives at 320px because prices are set not to wrap and sit at the end of their row. Realistic totals today top out around $46 (Family plus Tutor plus tax), so this matters less than it would for a store.
  - **Fix:** `n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })`.

## Touch targets: buttons at least 44×44px on mobile?

**Partial.** I measured every interactive element at 375px. Buttons, wallet buttons, progress steps, "Change" links and the summary bar are all 44px or taller (`--target: 44px`, line 22).

Plan radios, the Tutor checkbox and the consent checkbox are 20px inputs, but they sit inside labels that are 56px or taller, so the whole card or row is the target.

**Under 44px:**

| Control | Measured | Where |
|---|---|---|
| "Save this card for future purchases" row | 327×24 | Payment step (line 660); the label has no padding, unlike the consent row |
| "Not you?" link | 60×20 | Plan step when signed in (line 613); `.linkbtn.inline` sets `min-height: 0` (line 189) |
| "Sign in" link inside the account-exists error | about 20 tall | Plan step email error (line 550); same class |

**Fix:** give the save-card row the same padding as the consent row. For the inline links, either drop `.inline` or add vertical padding plus a negative margin, so the tap area grows without moving the text.

## Consistency: do repeated elements look and behave the same?

**Partial.**

**Consistent within the prototype:**

- Every "selected" thing (plan card, add-on, saved card, ticked consent) uses the same 2px moss border on a moss tint.
- Every alert has an icon, a bold title and a sentence.
- Every "Change" link is the same 44px underlined button.
- Errors look the same in every field.

**Inconsistent:**

1. **Design system mismatch.** As noted at the top, the prototype uses Fieldnote rather than the Tempest Line Blueprint tokens now in `docs/design-system.md`. This affects:
   - colours: moss instead of blueprint blue
   - fonts: Inter and Source Serif instead of Atkinson Hyperlegible and Bricolage Grotesque
   - corner radii: 8/12px instead of 10/16px
   - the role chips ("Plan for", "Paid by"), which are missing
   - the progress indicator, which uses a moss dot, not the lime highlighter
2. **Price intervals.** The summary writes "/mo" (line 507) while every other place writes "/month". The design system says a price never appears without its interval spelled the same way.
3. **Untaxed label.** The tax line reads "Calculated at next step" on Plan, but "Added after billing ZIP" on Payment and Confirm (lines 499 and 704). It's one state with two labels.
4. **Two checkbox styles.** The consent checkbox sits in a bordered, padded box. "Save this card" is a bare row. That difference is also why save-card fails the touch-target check.

## Keyboard and screen readers: can someone finish without a mouse or without sight?

**Mostly pass.**

**Keyboard run: completed with no mouse.**

- Tab order follows the screen: back link, plan radios (arrow keys switch plan), Tutor, email, Continue.
- On Payment it goes card number, expiry, security code, name, country, ZIP, Review.
- On Confirm, consent is toggled with Space and Subscribe is pressed with Enter.
- Every step change moves focus to the new heading. A polite live region announces "Step 2 of 3: Payment", and total changes are announced too (lines 524 and 779).
- Fields use visible labels, `aria-describedby` and `aria-invalid`.
- The error summary and payment alerts use `role="alert"`.
- Brand chips have text names, and the decorative icons are hidden from screen readers.

**Issues found:**

1. **Focus is lost to the page in four places.** Each of these redraws the step without putting focus back:
   - pressing Subscribe: the button disables itself, and focus was on `BODY` during "Processing…"
   - choosing a wallet (line 845)
   - "Use Visa ending 4242 instead" and "Not you?" (lines 920 and 924)
   - Retry on the empty state

   A screen-reader user hears nothing during "Processing…".
   **Fix:** keep focus on the button and use `aria-disabled` rather than `disabled` while processing, announce "Processing payment" in the live region, and after each redraw focus the step heading or the new control.
2. **axe `definition-list` (serious).** The Confirm recap puts the "Change" `<button>` straight inside each `<dl>` row (line 733), which isn't valid list markup. Screen readers can misreport the list.
   **Fix:** move the button into the `<dd>`.
3. **axe `page-has-heading-one` (moderate).** Every step heading is an `<h2>`, and the brand name is a `<span>`, so there is no `<h1>`.
   **Fix:** make the step heading the `<h1>`.
4. **Saved card isn't a real radio.** It's a drawn dot (line 628), so a screen reader just reads "Visa ending 4242" with no selected state. That's fine while it's the only option, but it becomes a problem once there are two saved cards.

## Account safety: does the screen avoid duplicate or insecure accounts?

**Partial.**

**What works:**

- Guest checkout asks only for an email and creates no password (line 616).
- An email that already has an account (`taken@example.com`, matched without regard to case or spaces) is stopped with "You already have an account. Sign in to continue" and a Sign in link. Continuing is blocked until that's resolved, and the plan choice is kept (lines 557 and 800–801). That prevents a second account on the same email.
- "Not you?" lets someone on a shared device get out of another person's session.
- Card number and security code are never put in the URL or local storage, and they're cleared after payment (lines 425 and 867).

**Gaps:**

1. **No guard against a mistyped email.** "nik@gmial.com" passes validation and becomes where the receipt goes and who owns the subscription. That orphans the purchase and invites a duplicate account later. A "Did you mean gmail.com?" suggestion, or showing the email back prominently on Confirm, would cover this. Confirm does show it, but in the same weight as the other recap rows.
2. **The guest's way back is undefined.** The success screen offers "Manage subscription", but a guest has no password and nothing says how they'll sign in to cancel. "Check your email for a link to manage your plan" would close the loop.
3. **Sign-in is a stub.** "Sign in" switches straight to a signed-in state with no password or code step. That's fine for a prototype, but nothing shows where real authentication would happen.
4. **Minor gating is out of scope.** The requirements (section 11) leave the under-18 "Ask a parent to pay" flow out. So a learner under 18 can enter a card here, even though `docs/design-system.md` says card fields are never shown to a signed-in learner under 18. This is a scope decision, not a bug, but this checklist item depends on it.

---

## Suggested fixes, in priority order

1. Re-skin the prototype to the Tempest Line Blueprint tokens, or decide to stay on Fieldnote and say so in the README. Then check contrast again.
2. Fix focus loss on Subscribe and wallet buttons, and announce "Processing".
3. Restructure the Confirm recap list, and make the step heading an `<h1>`.
4. Bring "Save this card", "Not you?" and "Sign in" up to 44px tap height.
5. Format money with thousands separators, and use "/month" everywhere.
6. Split the empty and load-error states, and add a wallet-failure state.
7. Add a typo check on the email, and tell guests how they'll manage their plan.
8. Snap the 6px and 20px spacing values to the scale.
