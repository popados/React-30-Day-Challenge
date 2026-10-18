# Day 5: App icon

The Day 5 entry of the [30-Day Daily UI Challenge](../daily-ui-challenge.md): an app icon. The app it belongs to hasn't been chosen yet.

The look hasn't been chosen yet either. The project starts from the same scaffold as Day 1, including a copy of the Fieldnote design-system docs in [docs/design-system/](docs/design-system/README.md).

## Challenge brief

From [daily-ui-challenge.md](../daily-ui-challenge.md#5-app-icon), Day 5: App icon.

- **Needs:** app name and purpose, brand colors, target platforms (iOS, Android, web favicon)
- **Key:** recognizable at 16px and at 1024px, one simple idea, no small text
- **Improve:** a test grid of the icon next to real app icons, dark and tinted versions, and a matching favicon set

**Self-review checklist**

- [ ] **Hierarchy:**
  - Can you tell what matters most in 3 seconds?
- [ ] **Contrast:**
  - Does text meet 4.5:1 against its background?
- [ ] **Spacing:**
  - Are you using a consistent spacing scale (such as 4 or 8px steps)?
- [ ] **States:**
  - Did you design empty, loading, and error states, not just the ideal one?
- [ ] **Real content:**
  - Does it still work with long names, missing photos, or big numbers?
- [ ] **Touch targets:**
  - Are buttons at least 44×44px on mobile?
- [ ] **Consistency:**
  - Do repeated elements look and behave the same everywhere?

## Brief

The [brief template](../daily-ui-challenge.md#brief-template-fill-this-in-each-day) from the challenge doc, to fill in for Day 5.

- **Product:** to be decided; a fictional app with a name, a purpose and brand colours
- **User goal:** spot the app on a crowded home screen or browser tab bar and know what it is
- **Platform:** iOS, Android and the web favicon; the icon has to work from 16px up to 1024px
- **Content:** the icon itself, shown at real sizes and next to real app icons, no placeholder art
- **States:** default, dark and tinted versions, and the small favicon sizes, still to be designed
- **Constraints:** to be decided; aim for WCAG AA

## Overview

From the [root README](../README.md#day-5-app-icon).

**Company.** To be decided. Day 5 needs a fictional app whose purpose fits one simple idea.

**Screen.** To be designed, covering the needs above.

**Look.** To be decided. The text contrast, spacing scale and touch-target rules from the self-review checklist still apply.

**Voice.** To be decided.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

**Documents**

- [Day 5 brief](../daily-ui-challenge.md#5-app-icon): needs, key points, improvements and the self-review checklist
- [Design system reference](docs/design-system/README.md): the Fieldnote design-system docs copied in with the scaffold

**Status.** Scaffolded. The project builds on the Day 1 starter, with Fieldnote's components and tokens copied in. The icon hasn't been started.

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

To be designed. It needs an app name and purpose, brand colours and the target platforms, with one simple idea that reads at 16px and at 1024px.

### Criteria

What the icon has to cover. **Source** shows where each one comes from in the [challenge brief](#challenge-brief).

| Criterion                                | Source  | Status      |
| ---------------------------------------- | ------- | ----------- |
| App name and purpose                     | Needs   | Not started |
| Brand colours                            | Needs   | Not started |
| Target platforms (iOS, Android, favicon) | Needs   | Not started |
| Recognizable at 16px and 1024px          | Key     | Not started |
| One simple idea                          | Key     | Not started |
| No small text                            | Key     | Not started |
| Test grid next to real app icons         | Improve | Not started |
| Dark and tinted versions                 | Improve | Not started |
| Matching favicon set                     | Improve | Not started |

## Design system

[docs/design-system/](docs/design-system/README.md) holds the Fieldnote design-system docs copied in with the scaffold:

- [`tokens.json`](docs/design-system/tokens.json): colours (light and dark), type, spacing, radii and sizes
- [`components/`](docs/design-system/components/): one doc per component
- [`USING-IN-CODE.md`](docs/design-system/USING-IN-CODE.md): how the tokens map to code

Whether Day 5 keeps the Fieldnote look or gets its own is still to be decided.

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
docs/design-system/            design-system docs (copied from Fieldnote)
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
tem/` is excluded from Prettier.
