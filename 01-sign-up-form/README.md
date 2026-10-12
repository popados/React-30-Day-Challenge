# Day 1: Sign-up screen — Fieldnote

The Day 1 entry of the [30-Day Daily UI Challenge](../daily-ui-challenge.md): a sign-up screen for **Fieldnote**, a notes and citation workspace for graduate students, faculty and research staff. Reading notes, highlights and sources live together in notebooks tied to a project or thesis.

The look is a quiet paper notebook: kraft Paper, near-black Ink, one deep pine-green Moss for actions, and apricot Highlighter kept for marked passages. This is the Field Journal palette from [docs/fieldnote-signup-mood-palettes.md](docs/fieldnote-signup-mood-palettes.md).

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

Sign-up order, top to bottom:

1. Heading and subhead
2. "Continue with your institution" (the one `primary` button), which opens the institution picker
3. Continue with Google
4. Continue with Apple
5. "or" divider
6. Email field with "Continue with email"
7. Terms line

**Frames:** desktop at 1440 × 900 shows a centered 440px card on `paper` with the sample-notebook panel on `paper-deep` beside it. Mobile at 390 × 844 shows the same content in one full-width column with no side panel.

**States to cover:** the institution picker (results, empty, no match, loading, redirecting), email validation errors, SSO errors, the recognized-domain shortcut and the success message.

## Design system

The full spec is in [docs/fieldnote-design-system/](docs/fieldnote-design-system/README.md):

- [`tokens.json`](docs/fieldnote-design-system/tokens.json): colours (light and dark), type, spacing, radii and sizes. Values marked **proposed** fill gaps the original brief left open.
- [`assets/Icons/`](docs/fieldnote-design-system/assets/Icons/): Lucide line icons (v1.48.0)
- [`assets/Logos/`](docs/fieldnote-design-system/assets/Logos/): official Google and Apple sign-in logos

The rules that matter most while building:

- **Colour:** `moss` is the only action colour (primary button, links, selected row, focus ring). `error` appears only alongside words and an icon. `highlighter` is used only as a mark behind `on-highlighter` text, never for a button or link. Use the tokens, not hard-coded white. In dark mode, the label on `moss` turns dark.
- **Type:** Source Serif 4 for headings and notebook prose, Inter for the interface. Inputs stay at 16px.
- **Space and shape:** a 4px spacing scale. Use borders instead of shadows: `radius-md` for controls and `radius-lg` for the card and panel.
- **Accessibility:** WCAG AA contrast in both themes. Every control is keyboard-reachable with a 2px focus ring offset by 2px. Tap targets are at least 44px and controls are 48px tall. Text must still work at 200% zoom, so containers shouldn't have fixed heights. Spinners slow down when reduced motion is on.
- **Copy:** speak to the user as "you". Use sentence case, with no exclamation marks and no emoji. Buttons start with a verb. Name the institution ("Taking you to UT Austin…"), not "your SSO provider".
- **Logos:** "Fieldnote" set in Source Serif 4 serves as the wordmark. Provider logos are used unaltered and appear only inside the `google` and `apple` button variants.

### Components

| Component           | Purpose                                                         |
| ------------------- | --------------------------------------------------------------- |
| `Button`            | `primary`, `secondary`, `google` and `apple` variants           |
| `InstitutionPicker` | Institution combobox; build its states first                    |
| `TextField`         | Email entry with helper or error text                           |
| `Divider`           | The lowercase "or"                                              |
| `Alert`             | SSO errors, the recognized-domain shortcut and success messages |
| `Highlight`         | Highlighter marks in notebook quotes                            |
| `Icon`              | Lucide icons by name, coloured with `currentColor`              |

## Project layout

```text
docs/fieldnote-design-system/  design spec, tokens, icons and logos
images/                        mood images and HTML mockups (reference only)
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

`docs/` and `images/` are excluded from ESLint, Prettier and Tailwind's class scanning.

## Before publishing

The mockups use real university names to look realistic. Replace them with fictional ones before anything is published.
