# React 30-Day UI

A 30-day UI challenge built in React: one screen a day, each in its own folder. The daily briefs, checklists and weekly themes are in [daily-ui-challenge.md](daily-ui-challenge.md). The weeks cover foundations, data and feedback, complex screens, and polish and systems, ending on Day 30 with a redesign of the Day 1 screen.

Each day starts by filling in the brief template from the challenge doc (product, user goal, platform, content, states, constraints) and ends with its self-review checklist.

## Days

| Day | Screen | Folder | Status |
| --- | --- | --- | --- |
| 1 | Sign-up screen | [01-signup-form/](01-signup-form/) | In progress |
| 2 | Checkout / payment form | [02-checkout-form/](02-checkout-form/) | Built |
| 3 | Landing page hero | [03-landing-page-hero/](03-landing-page-hero/) | Built |
| 4 | Calculator | [04-calculator/](04-calculator/) | Built |
| 5 | App icon | [05-app-icon/](05-app-icon/) | Scaffolded |
| 6–30 | See [daily-ui-challenge.md](daily-ui-challenge.md) | — | Not started |

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

**Screen.** Built from the mockup in [checkout-ivy-hall.html](02-checkout-form/checkout-ivy-hall.html). A header with "Back to plans", the name and "Secure checkout"; a three-step progress indicator (Plan, Payment, Confirm); and an order summary that keeps the total visible. Plan offers Plus monthly ($9.99/month), Plus for the school year ($59.99, Aug–May, does not renew) and Family ($17.99/month for up to 4 learners), an optional Tutor add-on and the receipt email. Payment has Apple Pay and Google Pay above card fields that format as you type, a billing country and ZIP that set the sales tax, and a saved card for returning customers. Confirm recaps the order with "Change" links, then the totals, the renewal terms and an unticked consent box directly above Subscribe. A Done screen confirms what was charged and what happens next. The summary sits beside the steps on desktop, above them on tablets, and as a pinned total bar on phones. A prototype-controls panel reaches every state: declined card, payment timeout, tax failure, no plans and an email that already has an account.

**Look.** The Ivy Hall palette from [checkout-form-palette.md](02-checkout-form/docs/markdown/checkout-form-palette.md): oxford navy for actions, academic gold for the current step and the "Does not renew" tag, ivy green for the focus ring, on warm off-white paper, with a dark theme in deep navy and gold. Headings use Source Serif 4 and the interface uses Inter. Every control is at least 44px tall and shows a visible focus ring, and errors always come with an icon and a fix-it sentence.

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
- [Mockup](02-checkout-form/checkout-ivy-hall.html): the Ivy Hall checkout the app follows
- [Tempest Line design system](02-checkout-form/docs/design-system.md): tokens, type, themes and component rules
- [PRD](02-checkout-form/docs/markdown/checkout-form-spec-subscription.md): goals, user stories and requirements for learners and payers
- [Technical brief](02-checkout-form/docs/markdown/checkout-form-technical-brief.md): scope, constraints, edge cases and open questions
- [Planning docs](02-checkout-form/docs/markdown/): strategy, feature request, palettes and an SEO content brief

**Status.** Built and tested from the Ivy Hall mockup: all three steps, the Done screen, the order summary and every error state, against mock plan, tax and payment services. Next: the parts of the PRD the mockup doesn't cover, chiefly the "Ask a parent to pay" link for learners under 18 and the "Plan for" and "Paid by" roles, and official card-network and wallet artwork in place of the text stand-ins.

## Day 3: Tempest Line landing page

- **Needs:** product value proposition, audience, main call to action, one supporting visual, any proof (users, ratings)
- **Key:** a headline that says what it does in under 10 words, one dominant button, strong visual hierarchy
- **Improve:** a secondary low-commitment action ("see how it works"), a trust strip with logos or stats, and a version tested at phone width

**Company.** Tempest Line is a fictional study app for students, most of them under 18 and studying late at night, whose plans are usually paid for by a parent. Students snap or type any problem, and it walks them through each step and checks their answer. Students start free; a parent can add a plan later from $9.99/month, with no surprise charges. Day 3 is its landing page, the same company as the Day 2 checkout.

**Screen.** Built from the mockup in [second-tempest-lines.html](03-landing-page-hero/second-tempest-lines.html). From top to bottom: a theme switch; a header with the name, nav links and "Log in"; a split hero with the headline "Stuck on homework? Get it explained step by step." on graph paper, the main "Start free" button, a "See how it works" link and a rating, beside a blueprint panel showing a worked algebra problem and a "Paid by a parent" tag; a proof strip of stats and logo slots; "How it works" in three numbered steps with a media placeholder, next to a bento of stats, subjects, a parent note and a quote; and a closing "Start free" band. On desktop (1280px) the hero is split in two; at phone width (390px) everything stacks into one column. Stats, ratings, the quote and logos are bracketed placeholders.

**Look.** Tempest Line in three themes, picked with the switch at the top and remembered per browser: Blueprint (dark, the default), Graph Paper (light) and High Contrast. Graph-paper lines, blueprint-blue panels and one lime highlighter for the headline. Headings use Bricolage Grotesque, the interface uses Atkinson Hyperlegible Next, and the worked problem uses Atkinson Hyperlegible Mono. Text meets WCAG AA, controls are at least 44px tall, and every control shows a visible focus ring. There's no logo mark yet, so the name is set as a wordmark.

**Voice.** Plain and encouraging: sentence case, verbs first on buttons, no exclamation marks or emoji. Every price comes with its interval.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

```bash
cd 03-landing-page-hero
npm install
npm run dev
```

**Documents**

- [README.md](03-landing-page-hero/README.md): brief, criteria, where the page differs from the mockup, setup and project layout
- [Day 3 brief](daily-ui-challenge.md#3-landing-page-hero): needs, key points, improvements and the self-review checklist
- [Mockup](03-landing-page-hero/second-tempest-lines.html): the Tempest Line landing page the app follows
- [Tempest Line design system](03-landing-page-hero/docs/tempest-line-design-system.md): the tokens, type, themes and component rules the page uses
- [Earlier mockups](03-landing-page-hero/images/mockups/): the five layout options and the Minutely mockup from the first version

**Status.** Built and tested in all three themes, at desktop and phone widths. The first version, a Minutely landing page, was replaced and is still in the git history. Next: real stats, ratings, quote and logos in place of the placeholders, and destinations for "Log in", "Pricing" and "Start free".

## Day 4: Calculator Workbench

- **Needs:** calculator type (basic, tip, mortgage, unit conversion), inputs and outputs, rounding rules
- **Key:** large touch targets, an always-visible result, a clear distinction between operators and numbers
- **Improve:** a history tape, keyboard support, a copy-result button, and live recalculation for financial calculators

**Company.** Calculator Workbench is a fictional all-in-one calculator: scientific, unit and currency conversion, percentage and tax, and date maths in one place, for anyone who would otherwise switch between four apps.

**Screen.** Built from the mockup in [calc-mockup.html](04-calculator/calc-mockup.html). Four mode tabs (Scientific, Convert, Percent, Dates) above one working panel: a pinned readout with the expression, the result, any error, Copy and Save to tape, over the active mode's controls. Scientific has a function pad and a number pad with colour-coded keys and a two-row "=". Convert covers 11 categories, typed in either direction, with swap, precision and an "In every unit" grid. Percent and Dates are short forms that recalculate as you type. Beside the panel, a history tape keeps the last 60 results; tapping one restores its inputs. On desktop and tablet the tape is a sidebar; on phones the tabs become a bottom bar, the tape opens as a bottom sheet and the less-used functions fold behind "More"; in phone landscape the readout sits beside both keypads.

**Look.** A cool grey workbench in light and dark: white number keys, blue operators, grey functions, red clear and delete, and an orange equals key, with one marker colour per mode. Headings use Red Hat Display, the interface uses Red Hat Text, and numbers and keys use Red Hat Mono. Keys are at least 44px tall, and every control shows a visible focus ring.

**Voice.** Short and plain. Errors say what's wrong in everyday words ("Can't divide by 0", "ln needs a number above 0", "Enter of value"), and the last good result stays on screen, faded, while you fix it.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

```bash
cd 04-calculator
npm install
npm run dev
```

**Documents**

- [README.md](04-calculator/README.md): brief, criteria, setup, scripts and project layout
- [Day 4 brief](daily-ui-challenge.md#4-calculator): needs, key points, improvements and the self-review checklist
- [Mockup](04-calculator/calc-mockup.html): the Calculator Workbench the app follows
- [Small details](04-calculator/docs/calculator-small-details.md): concrete behaviours for each mode, which the tests check
- [Screen mockups](04-calculator/images/mockups/): desktop, tablet, phone and phone-landscape layouts

**Status.** Built and tested from the mockup: all four modes, the tape, copy, keyboard shortcuts and the four layouts. The mode, angle unit, last answer and tape are remembered per browser. Currency rates are fixed sample values, not live data. Next: the calculator types listed in the small-details doc but not in the workbench yet (basic, tip, mortgage, BMI, programmer and fraction).

## Day 5: App icon

- **Needs:** app name and purpose, brand colors, target platforms (iOS, Android, web favicon)
- **Key:** recognizable at 16px and at 1024px, one simple idea, no small text
- **Improve:** a test grid of the icon next to real app icons, dark and tinted versions, and a matching favicon set

**Company.** To be decided. Day 5 needs a fictional app whose purpose fits one simple idea.

**Screen.** To be designed, covering the needs above.

**Look.** To be decided. The text contrast, spacing scale and touch-target rules from the self-review checklist still apply.

**Voice.** To be decided.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

```bash
cd 05-app-icon
npm install
npm run dev
```

**Documents**

- [README.md](05-app-icon/README.md): brief, criteria, setup, scripts and project layout
- [Day 5 brief](daily-ui-challenge.md#5-app-icon): needs, key points, improvements and the self-review checklist
- [Design system reference](05-app-icon/docs/design-system/README.md): the Fieldnote design-system docs copied in with the scaffold

**Status.** Scaffolded, with Fieldnote's components and tokens copied in from the Day 1 starter. The icon hasn't been started.
