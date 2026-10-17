# Tempest Line Design System

Source: the Tempest Line design system artifact (https://claude.ai/artifact/BMwTKWbjeJamohrz2VtaFX), version last changed 2026-10-13 ("Switched to the Blueprint palette: Graph Paper, Blueprint and High Contrast themes; graph-paper cover"). Every value below is copied from its `tokens.json` and component guidelines.

## Purpose

Tempest Line is a study app for students, most of them under 18 and on their phones late at night, whose plans are usually paid for by a parent. The checkout has two jobs:

1. Let a learner get access without a card.
2. Make sure the person paying is never surprised by a charge.

Every colour, word and component here serves those two jobs. The look is a worked problem on graph paper: blueprint blue for structure, one highlighter stroke for the thing that matters. Calm, plain and exact beats loud.

## Content fundamentals

- Plain English, sentence case, second person ("you"; "your child" only on parent screens). No hype, no exclamation marks, no emoji.
- A price never appears without its interval: "$9.99/month", "$59.99 for the school year (Aug–May)", "$17.99/month for up to 4 learners".
- Name both roles on every payer-facing screen: "Plan for: Maya", "Paid by: Dana R." Use the learner's first name only.
- Say what happens next and whether money moved: "Nothing was charged.", "Next charge November 12, 2026."
- Errors say how to fix them: "ZIP code is 5 digits — you entered 4." Never "Invalid input".
- Non-renewing plans say so next to the price: "Does not renew · ends May 31, 2027".
- Learner copy is short and direct ("Ask a parent to pay"); parent copy front-loads cost and terms.

## Themes

Three themes share every token name, so components never branch on theme.

| Theme         | id         | When                                                                                                                                        |
| ------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Graph Paper   | `light`    | Default. Parents on work computers, daytime use.                                                                                            |
| Blueprint     | `dark`     | Follows `prefers-color-scheme: dark`; the learner's late-night default.                                                                     |
| High Contrast | `contrast` | Follows `prefers-contrast: more` or the in-app setting. Every text pair is 7:1 or more; surfaces are separated by black borders, not shade. |

## Colour

### Brand

| Token            | Graph Paper | Blueprint | High Contrast | Usage                                                                                                                                      |
| ---------------- | ----------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `blueprint`      | `#1F4FA3`   | `#1F4FA3` | `#0B2A66`     | Brand blueprint blue: cover blocks, header bands, primary action in Graph Paper. Not a text colour on Blueprint grounds; use `link` there. |
| `highlighter`    | `#D7F25C`   | `#D7F25C` | `#D7F25C`     | Lime: the one highlight per screen, the active progress step, the primary action in Blueprint. Never text, never means success.            |
| `on-highlighter` | `#0F1E3A`   | `#0F1E3A` | `#000000`     | Text and icons on a `highlighter` fill.                                                                                                    |
| `grid`           | `#D5E0F2`   | `#1E3A68` | `#B8C2D6`     | Graph-paper rule lines, decorative only (below 3:1 by design).                                                                             |

### Surfaces and text

| Token            | Graph Paper | Blueprint | High Contrast | Usage                                                                               |
| ---------------- | ----------- | --------- | ------------- | ----------------------------------------------------------------------------------- |
| `bg`             | `#F3F6FB`   | `#0B1A33` | `#FFFFFF`     | Page background behind cards and the checkout column.                               |
| `surface`        | `#FFFFFF`   | `#102446` | `#FFFFFF`     | Cards, form panels, inputs, dialogs.                                                |
| `surface-raised` | `#E8EEF8`   | `#16305A` | `#F2F2F2`     | Order summary, mobile summary bar, selected plan option, disclosure box.            |
| `border`         | `#D0DAEB`   | `#2A4372` | `#000000`     | Decorative hairlines and card outlines (below 3:1 by design outside High Contrast). |
| `control-border` | `#7686A6`   | `#7D94C0` | `#000000`     | Input, checkbox and radio outlines; 3:1 or more on `surface`.                       |
| `ink`            | `#0F1E3A`   | `#EAF1FF` | `#000000`     | Body copy, labels, prices and totals.                                               |
| `ink-muted`      | `#4A5873`   | `#A3B5D6` | `#262B40`     | Helper text, tax notes, intervals, timestamps.                                      |

### Actions, links, focus

| Token                | Graph Paper | Blueprint | High Contrast | Usage                                                                     |
| -------------------- | ----------- | --------- | ------------- | ------------------------------------------------------------------------- |
| `action`             | `#1F4FA3`   | `#D7F25C` | `#0B2A66`     | Primary button fill (Subscribe, Send link, Pay). One per screen.          |
| `action-hover`       | `#173F86`   | `#E4F78A` | `#000000`     | Primary button on hover and press.                                        |
| `on-action`          | `#FFFFFF`   | `#0F1E3A` | `#FFFFFF`     | Text and icons on `action` / `action-hover`.                              |
| `action-disabled`    | `#C8D2E4`   | `#2A4372` | `#BDBDBD`     | Disabled or loading primary fill; always paired with a reason or spinner. |
| `on-action-disabled` | `#4A5873`   | `#A3B5D6` | `#000000`     | Text on `action-disabled`.                                                |
| `link`               | `#1F4FA3`   | `#9CC2FF` | `#0B2A66`     | Inline and "Change" links; always bold and underlined.                    |
| `focus-ring`         | `#0F6E6E`   | `#6FD6D0` | `#C25E00`     | 2px solid focus ring, 2px offset, on every control.                       |

### Roles

| Token          | Graph Paper | Blueprint | High Contrast | Usage                                           |
| -------------- | ----------- | --------- | ------------- | ----------------------------------------------- |
| `learner`      | `#0F6E6E`   | `#6FD6D0` | `#004F56`     | Learner teal: "Plan for" line and Learner chip. |
| `learner-soft` | `#DDF2F0`   | `#0E3D45` | `#FFFFFF`     | Learner chip and "Request sent" banner fill.    |
| `payer`        | `#6E3AA5`   | `#CDA8F0` | `#4A1F86`     | Payer violet: "Paid by" line and Payer chip.    |
| `payer-soft`   | `#F1E6F8`   | `#33215A` | `#FFFFFF`     | Payer chip and parent-link header fill.         |

### Status

| Token          | Graph Paper | Blueprint | High Contrast | Usage                                                                               |
| -------------- | ----------- | --------- | ------------- | ----------------------------------------------------------------------------------- |
| `success`      | `#1A7A48`   | `#5FD394` | `#0A5A2F`     | Valid-field tick, "Paid", "Secure payment" lock.                                    |
| `success-soft` | `#E3F4EA`   | `#0F3A27` | `#FFFFFF`     | Success banner fill ("Plus is active").                                             |
| `danger`       | `#B42332`   | `#FF8F87` | `#9A0012`     | Error text, icons, invalid input border. Always with an icon and a fix-it sentence. |
| `danger-soft`  | `#FBE7E9`   | `#4A1520` | `#FFFFFF`     | Error summary fill at the top of a form.                                            |
| `caution`      | `#8A5800`   | `#FFD166` | `#6B4100`     | "Link expired", tax service unavailable.                                            |
| `caution-soft` | `#FFF3D1`   | `#3D2E08` | `#FFFFFF`     | Caution banner fill.                                                                |

### Colour rules

- Page on `bg`, cards and inputs on `surface`, the order summary and selected options on `surface-raised`.
- `ink` and `ink-muted` hold 4.5:1 on `bg`, `surface` and `surface-raised` in every theme.
- One primary button per screen: `action` fill, `on-action` text, `action-hover` on hover. Graph Paper: blueprint blue with white text. Blueprint: highlighter lime with dark text.
- Control outlines use `control-border` (3:1+). `border` is a decorative hairline only.
- Learner things use `learner` on `learner-soft`; payer things use `payer` on `payer-soft`. Each always carries an icon or word too.
- Success and danger are close in lightness, so every status shows an icon and a title; never rely on green versus red.

## Focus and states

- Keyboard focus: solid `focus-width` (2px) ring in `focus-ring`, offset 2px, on every control. Teal in Graph Paper, light teal in Blueprint, orange in High Contrast; 3:1 on every surface.
- Selected options: 2px `ink` outline plus `surface-raised`, so selection is visible without colour.
- Disabled and loading buttons use `action-disabled` and always say why.

## Typography

All three faces load from Google Fonts.

| Family key | Stack                                                                        |
| ---------- | ---------------------------------------------------------------------------- |
| `display`  | "Bricolage Grotesque", "Avenir Next", system-ui, sans-serif                  |
| `sans`     | "Atkinson Hyperlegible Next", "Atkinson Hyperlegible", system-ui, sans-serif |
| `mono`     | "Atkinson Hyperlegible Mono", ui-monospace, monospace                        |

| Style         | Family  | Size / line | Weight | Letter spacing | Sample                                             | Usage                                                 |
| ------------- | ------- | ----------- | ------ | -------------- | -------------------------------------------------- | ----------------------------------------------------- |
| `display`     | display | 40 / 44px   | 700    | -0.02em        | Unlimited explanations, tonight.                   | Plan window headline. One per screen.                 |
| `title`       | display | 24 / 30px   | 700    | -0.01em        | Pay for Maya's Plus plan                           | Step titles, parent-link page title.                  |
| `price`       | display | 28 / 32px   | 700    | —              | $9.99/month                                        | Plan prices, always followed by the interval.         |
| `heading`     | sans    | 18 / 24px   | 700    | —              | Order summary                                      | Panel and section headings.                           |
| `body`        | sans    | 16 / 24px   | 400    | —              | Renews automatically every month until you cancel. | Body copy and input text.                             |
| `body-strong` | sans    | 16 / 24px   | 700    | —              | Total due today $10.81                             | Totals, key consent terms.                            |
| `label`       | sans    | 14 / 20px   | 700    | —              | Card number                                        | Field labels, chip text, small button text.           |
| `caption`     | sans    | 13 / 18px   | 400    | —              | Tax calculated at next step                        | Helper text, legal small print, timestamps.           |
| `card-number` | mono    | 18 / 24px   | 400    | 0.04em         | 4242 4242 4242 4242                                | Card number, expiry, CVC, ZIP, phone, one-time codes. |

Rules: inputs are never below 16px (prevents mobile zoom); `caption` (13px) is the smallest text anywhere.

## Spacing

4px base.

| Token     | Value | Usage                                                      |
| --------- | ----- | ---------------------------------------------------------- |
| `space-1` | 4px   | Icon-to-text gap, chip vertical padding.                   |
| `space-2` | 8px   | Label to input, between summary lines.                     |
| `space-3` | 12px  | Input inner padding, chip side padding.                    |
| `space-4` | 16px  | Mobile gutter, phone card padding, gap between fields.     |
| `space-6` | 24px  | Desktop card padding, gap between form sections.           |
| `space-8` | 32px  | Gap between checkout column and summary; top of each step. |

## Radius

| Token         | Value | Usage                                   |
| ------------- | ----- | --------------------------------------- |
| `radius-sm`   | 6px   | Checkboxes, small marks and badges.     |
| `radius-md`   | 10px  | Inputs, buttons, plan options, banners. |
| `radius-lg`   | 16px  | Cards, summary panel, dialogs.          |
| `radius-pill` | 999px | Role chips, progress dots.              |

## Size

| Token            | Value | Usage                                                            |
| ---------------- | ----- | ---------------------------------------------------------------- |
| `control-height` | 48px  | Inputs and primary buttons.                                      |
| `target-min`     | 24px  | Smallest interactive target (WCAG 2.5.8).                        |
| `focus-width`    | 2px   | Width and offset of the focus ring.                              |
| `checkout-width` | 560px | Max width of the form column; summary sits beside it at 1024px+. |

## Shadow

| Token           | Graph Paper                                 | Blueprint                                   | High Contrast            |
| --------------- | ------------------------------------------- | ------------------------------------------- | ------------------------ |
| `shadow-raised` | `0 1px 2px #0f1e3a14, 0 8px 24px #0f1e3a14` | `0 1px 2px #00000066, 0 8px 24px #00000066` | `none` (borders instead) |

Used on cards and the floating mobile summary bar.

## Layout

- Phones: one column, `space-4` gutters, OrderSummary as a pinned bar.
- 1024px and up: form column at `checkout-width` with the summary panel beside it.

## Payment fields

Card fields are the processor's hosted iframes. Map tokens into its appearance settings rather than restyling: primary `action`, text `ink`, background `surface`, border `control-border`, danger `danger`, focus `focus-ring`, radius `radius-md`, font Atkinson Hyperlegible Next, digits Atkinson Hyperlegible Mono. Keep the Payment and Confirm steps free of third-party banners.

## Iconography

Simple 24px line icons, 2px stroke, round caps, inline with `currentColor`: lock (secure payment), tick (done, valid), alert (error), clock (expired), send (request sent), graduation cap (learner), card (payer). No icon set has been supplied yet; these are placeholders. No emoji.

## Logo

No logo supplied. Set "Tempest Line" in `title` or `display` (Bricolage Grotesque Bold) in `ink` until a mark exists.

## Components

### Button

One primary action per screen (`action` / `on-action`); everything else is secondary.

- Primary: the step's one forward action. When the press commits money, put price and interval in the label: "Subscribe · $9.99/month", "Pay $10.81".
- Secondary: `surface` fill, `control-border` outline, `ink` text (e.g. "Ask a parent to pay").
- Loading: from first press until the processor answers, switch to `action-disabled` / `on-action-disabled`, keep the width, show a spinner and say what is happening. Repeated presses do nothing.
- Don't use `highlighter` as a fill in Graph Paper, put two primaries side by side, or say "Continue" when the press charges a card.
- Height `control-height`, corners `radius-md`, focus `focus-ring`.
- Consumer provides: label (sentence case, verb first), button type, disabled reason when consent is unticked.

### TextField

Visible label above a 48px input, with one message line below.

- Label in `label`, `ink`; placeholders are never the only label.
- Input text in `body` (16px min); numbers, ZIP and codes in `card-number`.
- Validate on blur; clear the error as soon as the value is valid.
- Error: 2px `danger` border, `danger` icon, fix-it sentence. Never only a red border.
- Success: `success` tick and short confirmation, only where checking matters.
- Keep every typed value after an error; only CVC may clear.
- Consumer provides: label, `autocomplete` token, `inputmode`, message text and state.

### CardFields

Enclosed card group (number, expiry, security code, billing country, ZIP) under a "Secure payment" legend with a lock.

- Hosted iframes styled via the processor's appearance settings (see Payment fields).
- Legend and lock in `success`.
- Card number auto-formats by brand (4-4-4-4, Amex 4-6-5); detected brand shown inside the field.
- Wallet buttons sit above, divided by "or pay with card".
- Never shown to a signed-in learner under 18; they see ParentRequest.
- Consumer provides: field mounts, detected brand, country list (US only at launch), processor errors mapped to fix-it sentences.

### OrderSummary

Running summary on Plan, Payment and Confirm: learner, payer, plan, price per interval, tax, total due today.

- Desktop (1024px+): `surface-raised` panel beside the form, visible without scrolling.
- Phones (under 768px): collapsed pinned bar with "Total due today"; expands on tap.
- Learner chip ("Plan for") and Payer chip ("Paid by") at the top; a learner's own 18+ checkout shows only "Plan for".
- Before tax is known, show "Tax calculated at next step" in `ink-muted`.
- Total in the `display` family, `ink`; interval always follows the price.
- Consumer provides: learner first name, payer name, line items with intervals, tax state, total, next charge date.

### PlanOption

Radio card per plan: name, one line of benefit, price with interval.

- Selected: `surface-raised` fill and 2px `ink` outline.
- Price in `price`; interval in `caption` `ink-muted` right after.
- Non-renewing plans carry a plain chip: "Does not renew · ends May 31, 2027".
- Add-ons (Tutor) state terms before Confirm: "4 live 30-minute sessions per month; unused sessions expire".
- Consumer provides: name, benefit, price, interval, renewal or end date, selected state.

### ProgressSteps

Three labelled steps (Plan, Payment, Confirm) matching the real flow one to one.

- Current: `highlighter` dot, `on-highlighter` number and outline, label in `ink`.
- Completed: `success` dot with tick; label is a `link` back to that step without losing data.
- Upcoming: `control-border` outline, `ink-muted` label.
- The parent-link checkout uses the same three steps.
- Consumer provides: current step index, URL of each completed step.

### RenewalConsent

Renewal disclosure, affirmative-consent checkbox and Subscribe button, stacked with nothing between them.

- Disclosure directly above the button on Confirm, on `surface-raised`, `ink` text: amount, interval, "renews automatically", next charge date, where to cancel. Key terms in `body-strong`.
- Checkbox (24px, `control-border`, checked fill `action`) unchecked by default; until ticked the button is `action-disabled` with the reason in a caption.
- Parents see the same block on the payment-link checkout; learners under 18 never see it.
- Final wording comes from Legal; keep the structure.
- Consumer provides: amount with tax, interval, next charge date, cancel location, terms version (logged with consent), checked state.

### ParentRequest

The payment step for learners under 18: no card fields, just a link to send to a parent.

- Replaces CardFields and wallets entirely.
- Title in `title`; plan and price with interval repeat.
- Text / Email segmented choice, one field, primary "Send link".
- After sending: info StatusBanner ("Request sent"), resend available once every 12 hours.
- Under 13: reads "Ask a parent to set up your account" and collects nothing.
- Consumer provides: plan, price, interval, channel, contact field, send state, resend timer.

### RoleChip

Pill naming a role or plan fact in two to four words.

- Learner: `learner-soft` fill, `learner` text and outline, graduation-cap icon. "Plan for · [first name]".
- Payer: `payer-soft` fill, `payer` text and outline, card icon. "Paid by · [name]".
- Plain: `surface`, `ink-muted`, `control-border` ("Does not renew").
- Flash: `highlighter` with `on-highlighter`, one earned highlight per screen (e.g. a verified discount).
- Teal versus violet is never the only signal.
- Consumer provides: variant, label, name.

### StatusBanner

Full-width message for a state the person needs to know about.

- Info (`learner-soft`, `learner`): "Request sent".
- Success (`success-soft`, `success`): payment done, plan active, cancellation confirmed (with the date benefits end).
- Caution (`caution-soft`, `caution`): expired or already-paid links, tax service unavailable. Always say whether anything was charged.
- Danger (`danger-soft`, `danger`): error summary on submit; focus moves here and each item links to its field.
- Title in `body-strong` in the status colour, body in `ink`, always an icon and a title.
- `role="alert"` for danger, `role="status"` for the rest.
- Consumer provides: variant, title, one or two sentences, optional links.

## Open items

- No logo, icon set or self-hosted font files have been supplied (fonts load from Google Fonts).
- Renewal consent wording awaits Legal.
