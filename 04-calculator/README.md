# Day 4: Calculator

The Day 4 entry of the [30-Day Daily UI Challenge](../daily-ui-challenge.md): a calculator. The product it belongs to and the calculator type hasn't been chosen yet.

The look hasn't been chosen yet either. The project starts from the same scaffold as Day 1, including a copy of the Fieldnote design-system docs in [docs/design-system/](docs/design-system/README.md).

## Challenge brief

From [daily-ui-challenge.md](../daily-ui-challenge.md#4-calculator), Day 4: Calculator.

- **Needs:** calculator type (basic, tip, mortgage, unit conversion), inputs and outputs, rounding rules
- **Key:** large touch targets, an always-visible result, a clear distinction between operators and numbers
- **Improve:** a history tape, keyboard support, a copy-result button, and live recalculation for financial calculators

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

The [brief template](../daily-ui-challenge.md#brief-template-fill-this-in-each-day) from the challenge doc, to fill in for Day 4.

- **Product:** to be decided; a fictional product and the calculator type it needs (basic, tip, mortgage or unit conversion)
- **User goal:** get a correct result quickly and trust it
- **Platform:** to be decided; touch targets must work on a phone
- **Content:** to be decided; realistic inputs and big numbers, with stated rounding rules, no lorem ipsum
- **States:** default, empty, loading, error and success, still to be designed
- **Constraints:** to be decided; aim for WCAG AA

## Overview

From the [root README](../README.md#day-4-calculator).

**Company.** To be decided. Day 4 needs a fictional product with a reason to calculate something, which also decides the calculator type.

**Screen.** To be designed, covering the needs above.

**Look.** To be decided. The text contrast, spacing scale and touch-target rules from the self-review checklist still apply.

**Voice.** To be decided.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

**Documents**

- [Day 4 brief](../daily-ui-challenge.md#4-calculator): needs, key points, improvements and the self-review checklist
- [Design system reference](docs/design-system/README.md): the Fieldnote design-system docs copied in with the scaffold

**Status.** Scaffolded. The project builds on the Day 1 starter, with Fieldnote's components and tokens copied in. The calculator hasn't been started.

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

To be designed. It needs a chosen calculator type, clear inputs and outputs, and stated rounding rules, with the result always visible.

### Criteria

What the calculator has to cover. **Source** shows where each one comes from in the [challenge brief](#challenge-brief).

| Criterion                       | Source  | Status      |
| ------------------------------- | ------- | ----------- |
| Calculator type chosen          | Needs   | Not started |
| Inputs and outputs              | Needs   | Not started |
| Rounding rules                  | Needs   | Not started |
| Large touch targets             | Key     | Not started |
| Result always visible           | Key     | Not started |
| Operators distinct from numbers | Key     | Not started |
| History tape                    | Improve | Not started |
| Keyboard support                | Improve | Not started |
| Copy-result button              | Improve | Not started |
| Live recalculation (financial)  | Improve | Not started |

## Design system

[docs/design-system/](docs/design-system/README.md) holds the Fieldnote design-system docs copied in with the scaffold:

- [`tokens.json`](docs/design-system/tokens.json): colours (light and dark), type, spacing, radii and sizes
- [`components/`](docs/design-system/components/): one doc per component
- [`USING-IN-CODE.md`](docs/design-system/USING-IN-CODE.md): how the tokens map to code

Whether Day 4 keeps the Fieldnote look or gets its own is still to be decided.

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
