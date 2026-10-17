---
stale-refs:
  - source: README.md
    changed_at: '2026-10-17T16:24:43'
    sections_changed: []
    summary: externally modified
---

# Day 2: Checkout / payment form

The Day 2 entry of the [30-Day Daily UI Challenge](../daily-ui-challenge.md): the subscription checkout for Tempest Line, a fictional study app whose learners are mostly under 18 and whose plans are usually paid for by a parent.

The product, look and requirements are written up in [docs/](docs/): the Tempest Line design system in [docs/design-system.md](docs/design-system.md) and the planning documents in [docs/markdown/](docs/markdown/). The project started from the same scaffold as Day 1, and the code still uses Day 1's Fieldnote styles until the Tempest Line tokens are moved in.

## Challenge brief

From [daily-ui-challenge.md](../daily-ui-challenge.md#2-checkout--payment-form), Day 2: Checkout / payment form.

- **Needs:** order summary, payment methods, shipping vs. billing address, taxes and fees, security cues
- **Key:** the total is always visible, card fields format automatically, errors appear next to the field
- **Improve:** a progress indicator, address autocomplete, a "same as shipping" toggle, saved cards, and a clear edit path back to the cart

**Self-review checklist**

Checked against `prototype/checkout.html` on October 17, 2026. Ticked items pass; unticked items have open fixes. Evidence and fixes are in [docs/self-review.md](docs/self-review.md).

- [x] **Hierarchy:**
  - Can you tell what matters most in 3 seconds?
  - **Yes.** Each step has one large heading and one primary button, and the total stays visible (sticky on desktop, pinned bar on phones).
- [x] **Contrast:**
  - Does text meet 4.5:1 against its background?
  - **Yes.** The lowest text pair is 5.64:1, in both light and dark. The faded disabled Subscribe button is about 2.6:1, which WCAG exempts.
- [ ] **Spacing:**
  - Are you using a consistent spacing scale (such as 4 or 8px steps)?
  - **Mostly.** 101 of 128 spacing values are 4px steps. 6px (7 times) and 20px (6 times) are off the token scale.
- [x] **States:**
  - Did you design empty, loading, and error states, not just the ideal one?
  - **Yes.** Loading, empty, field errors, error summary, declined card, tax failure, timeout and success all exist. Gaps: "no plans" and "couldn't load plans" share one message, and wallets have no failure state.
- [ ] **Real content:**
  - Does it still work with long names, missing photos, or big numbers?
  - **Partly.** Long names and emails wrap at 320px, and there are no photos. Big totals show as $15506.79 with no thousands separator.
- [ ] **Touch targets:**
  - Are buttons at least 44×44px on mobile?
  - **Partly.** "Save this card" (24px tall), "Not you?" (20px) and the inline "Sign in" link are under 44px. Everything else passes.
- [ ] **Consistency:**
  - Do repeated elements look and behave the same everywhere?
  - **Partly.** It's consistent within itself, but it uses Fieldnote rather than the Tempest Line tokens now in `docs/design-system.md`. The summary also uses "/mo" vs "/month", and untaxed orders get two different labels.
- [ ] **Keyboard and screen readers:**
  - Can someone finish checkout without a mouse or without sight?
  - **Mostly.** A keyboard-only run reaches success. Focus is lost after Subscribe, choosing a wallet, and a few redraws. The Confirm recap list markup is invalid, and there is no `<h1>`.
- [ ] **Account safety:**
  - Does the screen avoid duplicate or insecure accounts?
  - **Partly.** An existing email is blocked with "Sign in to continue". A mistyped email isn't caught, and a guest has no stated way to manage or cancel later.

## Brief

The [brief template](../daily-ui-challenge.md#brief-template-fill-this-in-each-day) from the challenge doc, filled in for Day 2 from the [PRD](docs/markdown/checkout-form-spec-subscription.md), [technical brief](docs/markdown/checkout-form-technical-brief.md) and [design system](docs/design-system.md).

- **Product:** Tempest Line, a fictional study app for students, most of them under 18 and on their phones late at night, whose plans are usually paid for by a parent. Day 2 is its subscription checkout.
- **User goal:** a learner gets access without a card by sending a parent a link to pay; the parent pays in under two minutes and is never surprised by a charge.
- **Platform:** web, phone and desktop. On phones it's one column with the order summary as a pinned bar; at 1024px and up, a 560px form column with the summary panel beside it.
- **Content:** real plans and prices, each with its interval: Plus at $9.99/month, Plus for the school year at $59.99 (Aug–May, does not renew), Family at $17.99/month for up to 4 learners, and the Tutor add-on (4 live 30-minute sessions per month). The learner and payer are named ("Plan for: Maya", "Paid by: Dana R."), and tax is shown before Confirm. No lorem ipsum.
- **States:** default; empty (tax not known yet: "Tax calculated at next step"); loading (Pay pressed, spinner, button keeps its width); error (fix-it message next to the field, plus an error summary on submit); success ("Plus is active"); and the link states "Request sent", "Link expired" and "Already paid".
- **Constraints:** Tempest Line Blueprint palette (Graph Paper light, Blueprint dark and High Contrast themes), Bricolage Grotesque and Atkinson Hyperlegible Next, WCAG 2.2 AA. No card fields for learners under 18, parental consent for under-13s (COPPA), renewal terms shown next to Subscribe with an unticked consent box, and card data only in the processor's hosted fields (PCI DSS). US only, in USD.

## Overview

From the [root README](../README.md#day-2-checkout--payment-form).

**Company.** Tempest Line is a fictional study app for students, most of them under 18 and on their phones late at night, whose plans are usually paid for by a parent. Today its checkout assumes the learner is the payer: 46% of checkouts started by learners under 18 are abandoned, mostly for lack of a card, and parents surprised by summer charges cause a June spike in refund requests. Day 2 is the redesigned subscription checkout, which separates the learner who uses the plan from the parent who pays.

**Screen.** Three steps, Plan, Payment and Confirm, with a progress indicator and an order summary that names both roles ("Plan for: Maya", "Paid by: Dana R.") and keeps the total visible. Plan offers Plus monthly ($9.99/month), Plus for the school year ($59.99, Aug–May, does not renew) and Family ($17.99/month for up to 4 learners), with an optional Tutor add-on. Payment has wallet buttons above hosted card fields that format themselves; learners under 18 see "Ask a parent to pay" instead, which sends a payment link by text or email. Confirm shows the renewal terms and an unticked consent box directly above Subscribe. On phones it's one column with the summary as a pinned bar; at 1024px and up, a 560px form column with the summary panel beside it.

**Look.** Tempest Line's Blueprint palette, a worked problem on graph paper: blueprint blue for structure and one lime highlighter stroke for the thing that matters, such as the current step. There are three themes: Graph Paper (light), Blueprint (dark, the learner's late-night default) and High Contrast. Learner things are teal and payer things violet, always with a word or icon too. Headings use Bricolage Grotesque, the interface uses Atkinson Hyperlegible Next, and card numbers use Atkinson Hyperlegible Mono. Every text pair meets WCAG 2.2 AA, and every control shows a visible focus ring.

**Voice.** Plain English in sentence case, speaking to "you", with no hype, exclamation marks or emoji. A price never appears without its interval, every screen says what happens next and whether money moved ("Nothing was charged."), and errors say how to fix them ("ZIP code is 5 digits — you entered 4."). Learner copy is short; parent copy puts cost and terms first.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

**Documents**

- [Day 2 brief](../daily-ui-challenge.md#2-checkout--payment-form): needs, key points, improvements and the self-review checklist
- [Tempest Line design system](docs/design-system.md): tokens, type, themes and component rules
- [Palettes](docs/markdown/checkout-form-palette.md): Blueprint (active), Ivy Hall and Chalkboard
- [Strategy](docs/markdown/checkout-form-strategy.md): the research and reasoning behind the redesign
- [Feature request](docs/markdown/checkout-form-fr-subscription.md): the core checkout requirements
- [PRD](docs/markdown/checkout-form-spec-subscription.md): goals, user stories and requirements for learners and payers
- [Technical brief](docs/markdown/checkout-form-technical-brief.md): scope, constraints, edge cases and open questions
- [Best-practices content brief](docs/markdown/checkout-form-best-practices-content-brief.md): an SEO brief for an article on checkout page best practices
- [Fieldnote design-system reference](docs/design-system/README.md): the Day 1 docs copied in with the scaffold

**Status.** Designed on paper, not built. The PRD, technical brief, design system and palettes are written, and the project is scaffolded, but the code still uses the Fieldnote tokens and components from Day 1. Next: move `src/index.css` to the Tempest Line tokens, then build the Plan step.

## Getting started

```bash
npm install
npm run dev
```

| Script                 | What it does                   |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Start the Vite dev server      |
| `npm run build`        | Production build into `dist/`  |
| `npm run preview`      | Serve the production build     |
| `npm run lint`         | ESLint                         |
| `npm run format`       | Format with Prettier           |
| `npm run format:check` | Check formatting with Prettier |
| `npm test`             | Run Vitest once                |
| `npm run test:watch`   | Run Vitest in watch mode       |

**Stack:** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form + Zod, Tailwind CSS v4, ESLint + Prettier, Vitest + Testing Library.

## The screen

Not built yet. The design in the [PRD](docs/markdown/checkout-form-spec-subscription.md) and [design system](docs/design-system.md) has three steps:

| Step    | What's on it                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------- |
| Plan    | Plan options with price and interval, the Tutor add-on, and the college discount by school email              |
| Payment | Wallet buttons and hosted card fields for payers; "Ask a parent to pay" (link by text or email) for under-18s |
| Confirm | Order summary with tax, renewal disclosure, an unticked consent box and Subscribe with the price in its label |

The order summary sits beside every step on desktop and as a pinned bar on phones. Parents who open a payment link see the same three steps without signing in.

### Criteria

What the checkout has to cover. **Source** shows where each one comes from in the [challenge brief](#challenge-brief). Guest checkout is an addition.

| Criterion               | Source  | Status      |
| ----------------------- | ------- | ----------- |
| Order summary           | Needs   | Not started |
| Payment methods         | Needs   | Not started |
| Shipping vs. billing    | Needs   | Not started |
| Taxes and fees          | Needs   | Not started |
| Security cues           | Needs   | Not started |
| Total always visible    | Key     | Not started |
| Card auto-format        | Key     | Not started |
| Inline errors           | Key     | Not started |
| Progress indicator      | Improve | Not started |
| Address autocomplete    | Improve | Not started |
| Same-as-shipping toggle | Improve | Not started |
| Saved cards             | Improve | Not started |
| Edit path back to cart  | Improve | Not started |
| Guest checkout          | Added   | Not started |

## Design system

Day 2 uses Tempest Line, not Fieldnote. [docs/design-system.md](docs/design-system.md) is the spec: colour tokens for the Graph Paper, Blueprint and High Contrast themes, type, spacing, radius and the checkout components (Button, TextField, CardFields, OrderSummary, PlanOption, ProgressSteps, RenewalConsent, ParentRequest, RoleChip and StatusBanner). [docs/markdown/checkout-form-palette.md](docs/markdown/checkout-form-palette.md) has Blueprint and two alternative palettes.

The code hasn't caught up yet: [src/index.css](src/index.css) still holds the Fieldnote tokens, and [docs/design-system/](docs/design-system/README.md) still holds the Fieldnote docs that came with the scaffold.

### Components

These come with the scaffold, from Day 1:

| Component           | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| `Button`            | `primary`, `secondary`, `google` and `apple` variants |
| `InstitutionPicker` | Institution combobox, specific to Fieldnote sign-up   |
| `TextField`         | Text entry with helper or error text                  |
| `Divider`           | The lowercase "or"                                    |
| `Alert`             | Error, info and success messages                      |
| `Highlight`         | Highlighter marks in quoted text                      |
| `Icon`              | Lucide icons by name, coloured with `currentColor`    |

## Project layout

```text
docs/
  design-system.md             Tempest Line design system
  markdown/                    strategy, FR, PRD, technical brief, palettes, content brief
  design-system/               Fieldnote design-system docs (from the scaffold)
public/                        static files
src/
  app/          app shell, providers and router
  components/   shared UI components and their tests
  features/     feature modules (API calls, query hooks, views)
  hooks/        shared hooks
  lib/          API client and query client
  pages/        route pages
  stores/       Zustand stores
  test/         Vitest setup
```

`docs/design-system/` is excluded from Prettier.
