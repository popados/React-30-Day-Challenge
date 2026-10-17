Fieldnote is a notes and citation workspace for graduate students, faculty and research staff: reading notes, highlights and sources kept together in notebooks tied to a project or thesis. The look is a quiet paper notebook — warm Paper, near-black Ink, one deep Moss for action, and Highlighter yellow reserved for marked passages.

Values marked **proposed** in `tokens.json` (the dark theme, type sizes, spacing, radii, `paper-deep`, `hairline`, `moss-soft`, `error-soft`) fill gaps the source brief left open; the seven brand colours, the two typefaces and the accessibility rules are from the brief.

## Content fundamentals

- Write to the researcher as "you"; Fieldnote speaks as "we" only when it promises something ("we'll link it when they join").
- Sentence case everywhere — headings, buttons, links. No exclamation marks, no emoji.
- Buttons start with a verb and say where they go: "Continue with your institution", "Continue with email", "Create your first notebook".
- Name the institution, never "your IdP" or "SSO provider": "Taking you to University of Texas at Austin…", "UT Austin didn't share your email address. Enter it below to finish."
- Errors say what happened and the next step in one or two short sentences; they never blame the user.
- Plain, specific numbers: "Free for students and researchers at 1,200+ institutions".
- University names in mockups are real for realism; swap in fictional ones before anything is published.

## Visual foundations

**Colour.** Set every page and card on `paper`. Text is `ink`; helper text, placeholders and the terms line are `graphite`. Outline fields and secondary buttons with `rule` (3:1 non-text floor). `moss` is the one action colour: the primary button (label in `on-moss`), links (`link`), the selected picker row and the focus ring. `error` is for error text and icons only, always with words and an icon. `highlighter` appears only as a highlight mark behind `on-highlighter` text — never white text on it (1.6:1, fails), never a button or link. `paper-deep` holds the sample-notebook panel and skeleton rows; `hairline` draws decorative lines only.

**Contrast.** Every text pairing above meets WCAG AA in both themes; `rule` meets 3:1 on `paper` and `paper-deep`. The dark theme lightens `moss`, so its label flips to dark `on-moss` — always use the token, not white.

**Type.** Headings and notebook prose in Source Serif 4 (`--font-serif`): `heading-xl` for the desktop screen heading, `heading-lg` on mobile and in the card, `heading-md`/`heading-sm` inside notebooks, `note-quote` (italic) for quoted passages. Interface text in Inter (`--font-sans`): `body` for subheads and messages, `label` for buttons and field labels, `body-sm` for helper and footer text, `caption` for the "or" divider. Both faces load from Google Fonts. Inputs stay at 16px.

**Space and layout.** A 4px scale: `space-2` label to field, `space-3` between stacked buttons, `space-6` between groups, `space-8` card padding, `space-4` mobile gutter. Desktop (1440 × 900): a centered `card-width` (440px) card on `paper` with a `hairline` outline and `radius-lg`, the sample-notebook panel beside it on `paper-deep`. Mobile (390 × 844): the same content as one full-width column, no side panel. Text must resize to 200% without breaking — let containers grow, never fix heights.

**Shape and depth.** `radius-md` for buttons, fields, lists and alerts; `radius-lg` for the card and panel; `radius-sm` for highlight marks. Borders, not shadows — the system defines none.

**Interaction states.** Every control is keyboard-reachable and shows a 2px (`focus-width`) `focus-ring` offset 2px. Targets are at least `target-min` (44px); controls use `control-height` (48px). Hover darkens a fill slightly or adds `paper-deep`/`moss-soft`. Spinners slow under reduced motion.

## Components

- `Button` — one `primary` ("Continue with your institution") per screen; Google and Apple in their own `google` / `apple` variants; email as `secondary`.
- `InstitutionPicker` — the combobox; design its states first (results, empty, no match, loading, redirecting).
- `TextField` — the email path, with helper or error text.
- `Divider` — the lowercase "or".
- `Alert` — SSO errors, the recognized-domain shortcut, the success message.
- `Highlight` — Highlighter marks in notebook quotes.
- `Icon` — Lucide line icons by name.

Sign-up order, top to bottom: heading, subhead, institution button, Google, Apple, divider, email field with "Continue with email", terms line.

## Iconography and logos

- **Icons:** Lucide line icons (v1.48.0) — 24px grid, 2px stroke, round caps — through the `Icon` component, coloured by `currentColor`. Use 20px inside buttons, fields and alerts, 24px standalone. Icons always sit beside words. The full set is in the Icons asset group; add more only from Lucide at the same version. No emoji.
- **Fieldnote logo:** none yet. Set "Fieldnote" in Source Serif 4, `heading-md`, weight 600, in `ink`, wherever a mark would go.
- **Provider logos:** official files only — Google's "G" (`google-g.svg`) from Google's branding guidelines and Apple's Sign in with Apple logos from Apple's design resources, in the Logos group. Use them unaltered, only inside the `google` and `apple` Button variants, which follow each provider's own button colours rather than Fieldnote tokens.
