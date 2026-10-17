---
stale-refs:
  - source: 01-signup-form\README.md
    changed_at: "2026-10-17T16:24:43"
    sections_changed: []
    summary: externally modified
  - source: 02-checkout-form\README.md
    changed_at: "2026-10-17T16:24:43"
    sections_changed: []
    summary: externally modified
  - source: 03-landing-page-hero\README.md
    changed_at: "2026-10-17T16:24:43"
    sections_changed: []
    summary: externally modified
---







# React 30-Day UI

A 30-day UI challenge built in React: one screen a day, each in its own folder. The daily briefs, checklists and weekly themes are in [daily-ui-challenge.md](daily-ui-challenge.md). The weeks cover foundations, data and feedback, complex screens, and polish and systems, ending on Day 30 with a redesign of the Day 1 screen.

Each day starts by filling in the brief template from the challenge doc (product, user goal, platform, content, states, constraints) and ends with its self-review checklist.

## Days

| Day | Screen | Folder | Status |
| --- | --- | --- | --- |
| 1 | Sign-up screen | [01-signup-form/](01-signup-form/) | In progress |
| 2 | Checkout / payment form | [02-checkout-form/](02-checkout-form/) | Designed |
| 3 | Landing page hero | [03-landing-page-hero/](03-landing-page-hero/) | Built |
| 4 | Calculator | [04-calculator/](04-calculator/) | Scaffolded |
| 5–30 | See [daily-ui-challenge.md](daily-ui-challenge.md) | — | Not started |

## Day 1: Fieldnote sign-up

- **Needs:** required fields, sign-in methods (email, Google, Apple), password rules, terms link, brand
- **Key:** few fields, clear labels (not placeholder-only), visible password rules, one primary button
- **Improve:** inline validation as the user types, show/hide password, social sign-in above the form, and a "why we ask" note for any sensitive field

**Company.** Fieldnote is a fictional notes and citation workspace for graduate students, faculty and research staff. Reading notes, highlights and sources are kept together in notebooks tied to a project or thesis. Day 1 is its sign-up screen. The main path is "Continue with your institution", which lets researchers sign up with the university login they already have. Google, Apple and email are the alternatives.

**Screen.** From top to bottom: heading, subhead, institution button, Google, Apple, an "or" divider, the email field with "Continue with email", and the terms line. On desktop (1440 × 900), the form is a centered 440px card beside a sample-notebook panel. On mobile (390 × 844), it's a single column. The institution picker covers every state: results, empty, no match, loading and redirecting.

**Look.** The look is a quiet paper notebook in the Field Journal palette: kraft paper, near-black ink, pine green for actions, and a pale apricot highlighter used only for marked passages. There are light and dark themes. Headings use Source Serif 4 and the interface uses Inter. Every text pairing meets WCAG AA. Controls are at least 44px tall, and every one shows a visible focus ring.

**Voice.** The copy is plain, calm and specific: sentence case, no exclamation marks or emoji, and errors that say what happened and what to do next without blaming the reader.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

```bash
cd 01-signup-form
npm install
npm run dev
```

**Documents**

- [README.md](01-signup-form/README.md): setup, scripts and project layout
- [Design system spec](01-signup-form/docs/fieldnote-signup-design-system.md): tokens, components, states and accessibility
- [Mood palettes](01-signup-form/docs/fieldnote-signup-mood-palettes.md): nine alternate palettes, with Field Journal in light and dark
- [Design system reference](01-signup-form/docs/design-system/): tokens, icons and component docs
- [Campaign plan](01-signup-form/docs/fieldnote-signup-campaign-plan.md): a 12-week organic sign-up campaign
- [Social sign-up PRD](01-signup-form/docs/fieldnote-signup-prd-google-apple-microsoft.md): general requirements for social sign-in

**Status.** The design tokens and the core components are built and tested: Button, TextField, InstitutionPicker, Divider, Alert, Highlight and Icon. The sign-up screen itself is next.

## Day 2: Checkout / payment form

- **Needs:** order summary, payment methods, shipping vs. billing address, taxes and fees, security cues
- **Key:** the total is always visible, card fields format automatically, errors appear next to the field
- **Improve:** a progress indicator, address autocomplete, a "same as shipping" toggle, saved cards, and a clear edit path back to the cart

**Company.** Tempest Line is a fictional study app for students, most of them under 18 and on their phones late at night, whose plans are usually paid for by a parent. Today its checkout assumes the learner is the payer: 46% of checkouts started by learners under 18 are abandoned, mostly for lack of a card, and parents surprised by summer charges cause a June spike in refund requests. Day 2 is the redesigned subscription checkout, which separates the learner who uses the plan from the parent who pays.

**Screen.** Three steps, Plan, Payment and Confirm, with a progress indicator and an order summary that names both roles ("Plan for: Maya", "Paid by: Dana R.") and keeps the total visible. Plan offers Plus monthly ($9.99/month), Plus for the school year ($59.99, Aug–May, does not renew) and Family ($17.99/month for up to 4 learners), with an optional Tutor add-on. Payment has wallet buttons above hosted card fields that format themselves; learners under 18 see "Ask a parent to pay" instead, which sends a payment link by text or email. Confirm shows the renewal terms and an unticked consent box directly above Subscribe. On phones it's one column with the summary as a pinned bar; at 1024px and up, a 560px form column with the summary panel beside it.

**Look.** Tempest Line's Blueprint palette, a worked problem on graph paper: blueprint blue for structure and one lime highlighter stroke for the thing that matters, such as the current step. There are three themes: Graph Paper (light), Blueprint (dark, the learner's late-night default) and High Contrast. Learner things are teal and payer things violet, always with a word or icon too. Headings use Bricolage Grotesque, the interface uses Atkinson Hyperlegible Next, and card numbers use Atkinson Hyperlegible Mono. Every text pair meets WCAG 2.2 AA, and every control shows a visible focus ring.

**Voice.** Plain English in sentence case, speaking to "you", with no hype, exclamation marks or emoji. A price never appears without its interval, every screen says what happens next and whether money moved ("Nothing was charged."), and errors say how to fix them ("ZIP code is 5 digits — you entered 4."). Learner copy is short; parent copy puts cost and terms first.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

```bash
cd 02-checkout-form
npm install
npm run dev
```

**Documents**

- [README.md](02-checkout-form/README.md): brief, criteria, setup, scripts and project layout
- [Day 2 brief](daily-ui-challenge.md#2-checkout--payment-form): needs, key points, improvements and the self-review checklist
- [Tempest Line design system](02-checkout-form/docs/design-system.md): tokens, type, themes and component rules
- [PRD](02-checkout-form/docs/markdown/checkout-form-spec-subscription.md): goals, user stories and requirements for learners and payers
- [Technical brief](02-checkout-form/docs/markdown/checkout-form-technical-brief.md): scope, constraints, edge cases and open questions
- [Planning docs](02-checkout-form/docs/markdown/): strategy, feature request, palettes and an SEO content brief

**Status.** Designed on paper, not built. The PRD, technical brief, design system and palettes are written, and the project is scaffolded, but the code still uses the Fieldnote tokens and components from Day 1. Next: move `src/index.css` to the Tempest Line tokens, then build the Plan step.

## Day 3: Landing page hero

- **Needs:** product value proposition, audience, main call to action, one supporting visual, any proof (users, ratings)
- **Key:** a headline that says what it does in under 10 words, one dominant button, strong visual hierarchy
- **Improve:** a secondary low-commitment action ("see how it works"), a trust strip with logos or stats, and a version tested at phone width

**Company.** Minutely is a fictional meeting assistant. It joins calls from the calendar, catches every commitment, and sends each attendee a short list of what they promised to do, with an owner and a date on each item.

**Screen.** Built from the "Divided hero + bento sidebar (Tempest Line)" mockup in [images/mockups/](03-landing-page-hero/images/mockups/). From top to bottom: a header with the name, nav links and "Sign in"; a split hero with the headline "Meetings in. Action items out." on graph paper, the main "Try it on your next call" button and a "See how it works" link, beside a blueprint panel showing a sample meeting recap; "How it works" in three numbered steps with a demo placeholder, next to a bento sidebar of usage, time saved, rating, integrations, a customer quote and logo slots; and a closing call-to-action band. At phone width (390px) everything stacks into one column. Stats, the quote, trial terms and logos are bracketed placeholders.

**Look.** Tempest Line's dark Blueprint theme: deep navy, graph-paper lines, blueprint-blue panels and one lime highlighter for the headline and main buttons. Headings use Bricolage Grotesque and the interface uses Atkinson Hyperlegible Next. Text meets WCAG AA, controls are at least 44px tall, and every control shows a visible focus ring.

**Voice.** Short and concrete: sentence case, verbs first on buttons, no exclamation marks or emoji.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

```bash
cd 03-landing-page-hero
npm install
npm run dev
```

**Documents**

- [README.md](03-landing-page-hero/README.md): brief, criteria, setup, scripts and project layout
- [Day 3 brief](daily-ui-challenge.md#3-landing-page-hero): needs, key points, improvements and the self-review checklist
- [Mockups](03-landing-page-hero/images/mockups/): the five layout options and the Tempest Line mockup the page is built from
- [Tempest Line design system](03-landing-page-hero/docs/tempest-line-design-system.md): the tokens, type and component rules the page uses

**Status.** Built and tested at desktop and phone widths. Next: real stats, quote, logos and trial terms in place of the placeholders, and destinations for the "Try it on your next call", "Sign in" and "Pricing" links.

## Day 4: Calculator

- **Needs:** calculator type (basic, tip, mortgage, unit conversion), inputs and outputs, rounding rules
- **Key:** large touch targets, an always-visible result, a clear distinction between operators and numbers
- **Improve:** a history tape, keyboard support, a copy-result button, and live recalculation for financial calculators

**Company.** To be decided. Day 4 needs a fictional product with a reason to calculate something, which also decides the calculator type.

**Screen.** To be designed, covering the needs above.

**Look.** To be decided. The text contrast, spacing scale and touch-target rules from the self-review checklist still apply.

**Voice.** To be decided.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

```bash
cd 04-calculator
npm install
npm run dev
```

**Documents**

- [README.md](04-calculator/README.md): brief, criteria, setup, scripts and project layout
- [Day 4 brief](daily-ui-challenge.md#4-calculator): needs, key points, improvements and the self-review checklist
- [Design system reference](04-calculator/docs/design-system/README.md): the Fieldnote design-system docs copied in with the scaffold

**Status.** Scaffolded, with Fieldnote's components and tokens copied in from the Day 1 starter. The calculator hasn't been started.
 calculator hasn't been started.
er. The calculator hasn't been started.
 calculator hasn't been started.
