# Day 4: Calculator Workbench

The Day 4 entry of the [30-Day Daily UI Challenge](../daily-ui-challenge.md): Calculator Workbench, a fictional all-in-one calculator with scientific, unit and currency, percentage and tax, and date modes.

It follows the mockup in [calc-mockup.html](calc-mockup.html), with the per-mode behaviours written up in [docs/calculator-small-details.md](docs/calculator-small-details.md). The project started from the same scaffold as Day 1 and now has its own palette and fonts.

## Challenge brief

From [daily-ui-challenge.md](../daily-ui-challenge.md#4-calculator), Day 4: Calculator.

- **Needs:** calculator type (basic, tip, mortgage, unit conversion), inputs and outputs, rounding rules
- **Key:** large touch targets, an always-visible result, a clear distinction between operators and numbers
- **Improve:** a history tape, keyboard support, a copy-result button, and live recalculation for financial calculators

**Self-review checklist**

- [x] **Hierarchy:**
  - Can you tell what matters most in 3 seconds?
  - Yes. The result is the largest text on the screen, right-aligned at the top of the panel, and the readout stays pinned while the keypad or form scrolls. The expression sits just above it in smaller muted text, and "=" is the one tall orange key.
- [x] **Contrast:**
  - Does text meet 4.5:1 against its background?
  - Yes, in both themes. The lowest solid pair is 5.1:1 (white on the Convert green), and the key labels run from 6.1:1 to 17.2:1. The text that used to be faded now passes too:
    - The live preview result is at 65% opacity: 5.3:1 in light mode and 6.7:1 in dark (it was 55%, which gave 3.8:1).
    - The ghost closing bracket uses the full muted colour with a dotted underline instead of 40% opacity: 6.0:1 in light and 6.6:1 in dark (it was 1.8:1).
    - The shortcut digits on the mode tabs use the full muted colour: 5.6:1 in light and 7.0:1 in dark (they were 3.0:1).
- [x] **Spacing:**
  - Are you using a consistent spacing scale (such as 4 or 8px steps)?
  - Yes, a 4px scale throughout. Four small values come straight from the mockup and fall between steps: 18px top padding on the mode panel, a 5px keypad gap in phone landscape, 3px tab padding in phone landscape and a 9px corner on segmented buttons.
- [x] **States:**
  - Did you design empty, loading, and error states, not just the ideal one?
  - Yes, where they apply:
    - **Empty:** the tape says "Nothing saved yet" and how to add to it. An empty field names what's missing ("Enter of value") while the last good result stays, faded.
    - **Error:** every mode explains in plain words ("Can't divide by 0", "tan is undefined at this angle", "Enter an exchange rate above 0"), and the broken field is marked.
    - **Success:** "Copied 1030" and "Saved to tape" toasts.
    - **Loading:** not needed. Everything is calculated on the device, and currency rates are fixed sample values, so nothing waits on a network.
- [x] **Real content:**
  - Does it still work with long names, missing photos, or big numbers?
  - Yes for big numbers, which is what a calculator has instead of names and photos. Long results shrink to fit the readout instead of wrapping, results of 1e15 and up switch to `1.5e15` form, thousands are grouped, and long tape lines wrap. Results too large to calculate, such as 171!, say "The result is too large to show".
- [x] **Touch targets:**
  - Are buttons at least 44×44px on mobile?
  - Yes. Every control is at least 44px tall: keys are 52–80px on phones and never below 44px in landscape, mode tabs are 56px on phones, inputs are 54px, and buttons, chips and the tape's icon buttons are 44px. The only smaller control, the 32px "Keyboard shortcuts" toggle, is hidden on touch screens.
- [x] **Consistency:**
  - Do repeated elements look and behave the same everywhere?
  - Yes. Keys share one style per role (numbers, operators, functions, clear, equals). Buttons, fields and segmented controls come from shared styles in `styles.js`. Each mode keeps one marker colour on its tab and its tape lines. Every mode uses the same readout, Copy, Save to tape and last-good-result behaviour.

## Brief

The [brief template](../daily-ui-challenge.md#brief-template-fill-this-in-each-day) from the challenge doc, filled in for Day 4.

- **Product:** Calculator Workbench, one calculator for scientific maths, unit and currency conversion, percentage and tax, and date maths
- **User goal:** get a correct result quickly, trust it, and keep or reuse it
- **Platform:** desktop (1280px), tablet, phone portrait (390 × 844) and phone landscape (844 × 390), one responsive app
- **Content:** real calculations from the start: 2×sin(30)+√(16), 10 km in miles, 15% of 240, a stacked discount on $129.99 and today's date to the end of the year; currency rates are fixed sample values
- **States:** live preview while typing, the result after "=", errors in plain words with the last good result kept, an empty tape, and the tape open as a sheet or drawer on phones
- **Constraints:** the mockup's palette in light and dark, Red Hat Display, Text and Mono, keys at least 44px tall, visible focus on every control, full keyboard support, 12 significant digits and money rounded to the cent

## Overview

From the [root README](../README.md#day-4-calculator-workbench).

**Company.** Calculator Workbench is a fictional all-in-one calculator: scientific, unit and currency conversion, percentage and tax, and date maths in one place, for anyone who would otherwise switch between four apps.

**Screen.** Built from the mockup in [calc-mockup.html](calc-mockup.html). Four mode tabs (Scientific, Convert, Percent, Dates) above one working panel: a pinned readout with the expression, the result, any error, Copy and Save to tape, over the active mode's controls. Scientific has a function pad and a number pad with colour-coded keys and a two-row "=". Convert covers 11 categories, typed in either direction, with swap, precision and an "In every unit" grid. Percent and Dates are short forms that recalculate as you type. Beside the panel, a history tape keeps the last 60 results; tapping one restores its inputs. On desktop and tablet the tape is a sidebar; on phones the tabs become a bottom bar, the tape opens as a bottom sheet and the less-used functions fold behind "More"; in phone landscape the readout sits beside both keypads.

**Look.** A cool grey workbench in light and dark: white number keys, blue operators, grey functions, red clear and delete, and an orange equals key, with one marker colour per mode. Headings use Red Hat Display, the interface uses Red Hat Text, and numbers and keys use Red Hat Mono. Keys are at least 44px tall, and every control shows a visible focus ring.

**Voice.** Short and plain. Errors say what's wrong in everyday words ("Can't divide by 0", "ln needs a number above 0", "Enter of value"), and the last good result stays on screen, faded, while you fix it.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

**Documents**

- [Day 4 brief](../daily-ui-challenge.md#4-calculator): needs, key points, improvements and the self-review checklist
- [Mockup](calc-mockup.html): the Calculator Workbench the app follows
- [Small details](docs/calculator-small-details.md): concrete behaviours for each mode, which the tests check
- [Screen mockups](images/mockups/): desktop, tablet, phone and phone-landscape layouts
- [Fieldnote design-system reference](docs/design-system/README.md): the Day 1 docs copied in with the scaffold

**Status.** Built and tested from the mockup: all four modes, the tape, copy, keyboard shortcuts and the four layouts. The mode, angle unit, last answer and tape are remembered per browser. Currency rates are fixed sample values, not live data. Next: the calculator types listed in the small-details doc but not in the workbench yet (basic, tip, mortgage, BMI, programmer and fraction).

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

The page is `CalculatorPage` ([src/pages/CalculatorPage/](src/pages/CalculatorPage/CalculatorPage.jsx)), made from the components in [src/features/calculator/](src/features/calculator/):

| Part              | File                | What it shows                                                           |
| ----------------- | ------------------- | ----------------------------------------------------------------------- |
| Mode tabs         | `ModeTabs.jsx`      | Scientific, Convert, Percent and Dates; a bottom bar on phones          |
| Readout           | `Readout.jsx`       | Expression, result (shrinks to fit), error, DEG/RAD, Copy, Save to tape |
| Scientific keypad | `ScientificPad.jsx` | Function keys (folding behind "More" on narrow screens) and number keys |
| Convert           | `ConvertMode.jsx`   | Categories, two-way fields, swap, precision or rate, "In every unit"    |
| Percent and Dates | `FormMode.jsx`      | Calculation picker and fields that recalculate as you type              |
| Tape              | `Tape.jsx`          | Last 60 results to restore or copy, two-step clear, keyboard shortcuts  |
| Toast             | `Toast.jsx`         | Short confirmations such as "Copied 1030"                               |

The maths has no UI code in it: `evaluate.js` (the expression parser, no `eval`), `format.js`, `units.js`, `percentCalcs.js`, `dateCalcs.js` and `readouts.js`. Shared state (mode, inputs, readout and tape) lives in [src/stores/useCalculatorStore.js](src/stores/useCalculatorStore.js), and `useCalculatorKeyboard.js` handles the shortcuts.

### Criteria

What the calculator covers. **Source** shows where each one comes from in the [challenge brief](#challenge-brief).

| Criterion                       | Source  | Status                                                            |
| ------------------------------- | ------- | ----------------------------------------------------------------- |
| Calculator type chosen          | Needs   | Done: scientific, convert, percent and tax, dates                 |
| Inputs and outputs              | Needs   | Done                                                              |
| Rounding rules                  | Needs   | Done: 12 significant digits, money to the cent, precision setting |
| Large touch targets             | Key     | Done: keys at least 44px                                          |
| Result always visible           | Key     | Done: pinned readout                                              |
| Operators distinct from numbers | Key     | Done: colour-coded keys                                           |
| History tape                    | Improve | Done                                                              |
| Keyboard support                | Improve | Done                                                              |
| Copy-result button              | Improve | Done: copies the raw value                                        |
| Live recalculation (financial)  | Improve | Done: percent and tax update as you type                          |

## Design system

Day 4 has its own look, taken from the mockup rather than Fieldnote. [src/index.css](src/index.css) holds the tokens as Tailwind classes:

- Colours in light and dark: page (`bg`), panels (`panel`, `sunk`), text (`ink`, `muted`), lines, one pair per key role (`num`, `op`, `fn`, `eq`, `clr`), `accent`, `danger`, and a marker colour per mode (`m-sci`, `m-conv`, `m-pct`, `m-date`).
- Fonts: `font-display` (Red Hat Display), `font-sans` (Red Hat Text) and `font-mono` (Red Hat Mono).
- Radii for panels, keys, controls and tabs, and one soft shadow.
- Layout variants matching the mockup: `tablet`, `compact` (phones and phone landscape), `phone`, `landscape`, `fold` and `touch`.

The Fieldnote colour names are kept as aliases so the scaffold components still render. [docs/design-system/](docs/design-system/README.md) still holds the Fieldnote docs that came with the scaffold.

### Components

The calculator uses `Icon` (Lucide icons, now including copy and swap) from the shared components. The rest come with the scaffold from Day 1 and aren't used on this page:

| Component           | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| `Icon`              | Lucide icons by name, coloured with `currentColor`    |
| `Button`            | `primary`, `secondary`, `google` and `apple` variants |
| `TextField`         | Text entry with helper or error text                  |
| `InstitutionPicker` | Institution combobox, specific to Fieldnote sign-up   |
| `Divider`           | The lowercase "or"                                    |
| `Alert`             | Error, info and success messages                      |
| `Highlight`         | Highlighter marks in quoted text                      |

## Project layout

```text
calc-mockup.html               the mockup this app follows
docs/
  calculator-small-details.md  per-mode behaviours, checked by the tests
  design-system/               Fieldnote design-system docs (from the scaffold)
images/mockups/                desktop, tablet, phone and landscape mockups
public/                        static files
src/
  app/          app shell, providers and router
  components/   shared UI components and their tests
  features/     feature modules; calculator/ holds the modes, maths and tape
  hooks/        shared hooks
  lib/          API client and query client
  pages/        route pages
  stores/       Zustand stores (useCalculatorStore)
  test/         Vitest setup
```

The mockups and `docs/design-system/` are excluded from Prettier so they stay exactly as supplied.
