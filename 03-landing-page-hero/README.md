# Day 3: Tempest Line landing page

The Day 3 entry of the [30-Day Daily UI Challenge](../daily-ui-challenge.md): the landing page for Tempest Line, a fictional study app for students whose plans are usually paid for by a parent.

It follows the mockup in [second-tempest-lines.html](second-tempest-lines.html) (also kept as [tempest-landing-page.html](tempest-landing-page.html)) and is styled with the Tempest Line design system in [docs/tempest-line-design-system.md](docs/tempest-line-design-system.md). The project started from the same scaffold as Day 1. An earlier version built the Minutely mockup from [images/mockups/](images/mockups/); it was replaced by this page and is still in the git history.

## Challenge brief

From [daily-ui-challenge.md](../daily-ui-challenge.md#3-landing-page-hero), Day 3: Landing page hero.

- **Needs:** product value proposition, audience, main call to action, one supporting visual, any proof (users, ratings)
- **Key:** a headline that says what it does in under 10 words, one dominant button, strong visual hierarchy
- **Improve:** a secondary low-commitment action ("see how it works"), a trust strip with logos or stats, and a version tested at phone width

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

The [brief template](../daily-ui-challenge.md#brief-template-fill-this-in-each-day) from the challenge doc, filled in for Day 3.

- **Product:** Tempest Line, a fictional study app for students, most of them under 18 and studying late at night, whose plans are usually paid for by a parent
- **User goal:** understand that Tempest Line explains homework step by step, and start free
- **Platform:** desktop (1280px wide) and phone (390px), one responsive page
- **Content:** real headline, intro, steps and a worked algebra problem; stats, ratings, the quote and logos are bracketed placeholders until real ones exist
- **States:** a static marketing page, so only the default state, in three themes; the buttons have no destination yet
- **Constraints:** Tempest Line tokens in Graph Paper, Blueprint and High Contrast; Bricolage Grotesque, Atkinson Hyperlegible Next and Atkinson Hyperlegible Mono; WCAG AA; controls at least 44px

## Overview

From the [root README](../README.md#day-3-tempest-line-landing-page).

**Company.** Tempest Line is a fictional study app. Students snap or type any problem, and it walks them through each step and checks their answer. Students start free; a parent can add a plan later from $9.99/month, with no surprise charges.

**Screen.** From top to bottom: a theme switch; a header with the name, nav links and "Log in"; a split hero with the headline "Stuck on homework? Get it explained step by step." on graph paper, the main "Start free" button, a "See how it works" link and a rating, beside a blueprint panel showing a worked algebra problem and a "Paid by a parent" tag; a proof strip of stats and logo slots; "How it works" in three numbered steps with a media placeholder, next to a bento of stats, subjects, a parent note and a quote; and a closing "Start free" band. At phone width (390px) everything stacks into one column.

**Look.** Tempest Line in three themes: Blueprint (dark, the default), Graph Paper (light) and High Contrast. Graph-paper lines, blueprint-blue panels and one lime highlighter for the headline. Headings use Bricolage Grotesque, the interface uses Atkinson Hyperlegible Next, and the worked problem uses Atkinson Hyperlegible Mono. Text meets WCAG AA, controls are at least 44px tall, and every control shows a visible focus ring.

**Voice.** Plain and encouraging: sentence case, verbs first on buttons, no exclamation marks or emoji. Every price comes with its interval.

**Stack.** React 19 (JavaScript), Vite, React Router, TanStack Query, Zustand, React Hook Form with Zod, Tailwind CSS v4, ESLint with Prettier, and Vitest with Testing Library.

**Documents**

- [Day 3 brief](../daily-ui-challenge.md#3-landing-page-hero): needs, key points, improvements and the self-review checklist
- [Mockup](second-tempest-lines.html): the Tempest Line landing page this app follows
- [Tempest Line design system](docs/tempest-line-design-system.md): the tokens, type and component rules the page uses
- [Earlier mockups](images/mockups/): the five layout options and the Minutely mockup from the first version
- [Fieldnote design-system reference](docs/design-system/README.md): the Day 1 docs copied in with the scaffold

**Status.** Built and tested in all three themes, at desktop and phone widths. Next: real stats, ratings, quote and logos in place of the placeholders, and destinations for "Log in", "Pricing" and "Start free".

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

The home page ([src/pages/HomePage/](src/pages/HomePage/HomePage.jsx)) is made from the sections in [src/features/tempest/](src/features/tempest/):

| Section        | File                    | What it shows                                                    |
| -------------- | ----------------------- | ---------------------------------------------------------------- |
| Theme switch   | `SkinBar.jsx`           | Graph Paper, Blueprint and High Contrast, remembered per browser |
| Header         | `TempestHeader.jsx`     | Name, nav links and "Log in"                                     |
| Hero           | `TempestHero.jsx`       | Headline, intro, "Start free", "See how it works", rating        |
| Worked problem | `WorkedProblemCard.jsx` | A sample algebra problem solved step by step                     |
| Proof strip    | `ProofStrip.jsx`        | Three stats and logo slots                                       |
| How it works   | `HowItWorksSection.jsx` | Three steps and the media placeholder                            |
| Bento          | `Bento.jsx`             | Stats, subjects, the parent note and a quote                     |
| Call to action | `StartBand.jsx`         | Closing line and "Start free"                                    |

Bracketed text (`[250,000]`, `[4.8]`, the quote and logo slots) is placeholder content from the mockup, waiting for real figures. "Log in", "Pricing" and "Start free" don't go anywhere yet.

### Criteria

What the hero covers. **Source** shows where each one comes from in the [challenge brief](#challenge-brief).

| Criterion                   | Source  | Status      |
| --------------------------- | ------- | ----------- |
| Value proposition           | Needs   | Done        |
| Audience                    | Needs   | Done        |
| Main call to action         | Needs   | Done        |
| One supporting visual       | Needs   | Done        |
| Proof (users, ratings)      | Needs   | Placeholder |
| Headline under 10 words     | Key     | Done        |
| One dominant button         | Key     | Done        |
| Strong visual hierarchy     | Key     | Done        |
| Secondary low-commit action | Improve | Done        |
| Trust strip (logos, stats)  | Improve | Placeholder |
| Tested at phone width       | Improve | Done        |

### Where it differs from the mockup

- No logo mark: Tempest Line has no logo yet, so the name is set in Bricolage Grotesque, as the design system says.
- Colours, corner radii, spacing, icons and the card shadow come from the Tempest Line tokens and the shared components, so all three themes switch from one place.
- Buttons are 48px tall (the design system's control height) and change colour on hover instead of lifting.
- The theme buttons are 44px tall, the worked problem announces which step is done and which is current, and the bento headings are h3 so the heading outline doesn't skip a level.

## Design system

[docs/tempest-line-design-system.md](docs/tempest-line-design-system.md) is the Tempest Line spec, copied from Day 2. [src/index.css](src/index.css) holds its tokens as Tailwind classes (`bg-surface`, `text-ink-muted`, `bg-highlighter`, `text-display`, ...), with Blueprint (dark) as the default and Graph Paper and High Contrast set by `data-skin` on the page.

Changes on top of the spec:

- Three extra type sizes: `hero` (72px headline), `display-lg` (48px numbers and closing line) and `lead` (19px intro).
- Two background utilities: `bg-graph-paper` (grid lines) and `bg-blueprint-glow` (blueprint blue with a soft light patch, flat in High Contrast).
- The Fieldnote colour names (`moss`, `paper`, `graphite`, ...) are kept as aliases of Tempest colours, so the scaffold components still render.

[docs/design-system/](docs/design-system/README.md) holds the Fieldnote docs that came with the scaffold.

### Components

Shared components in [src/components/](src/components/). The page uses `Button`, `Highlight`, `Icon` and `WaveLines`; the rest come with the scaffold from Day 1.

| Component           | Purpose                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| `Button`            | `primary`, `secondary`, `highlight`, `google` and `apple` variants; renders a link when given `href` |
| `Highlight`         | Highlighter mark, used on the headline                                                               |
| `Icon`              | Lucide icons by name, coloured with `currentColor`                                                   |
| `WaveLines`         | Decorative contour lines on blueprint panels                                                         |
| `TextField`         | Text entry with helper or error text                                                                 |
| `InstitutionPicker` | Institution combobox, specific to Fieldnote sign-up                                                  |
| `Divider`           | The lowercase "or"                                                                                   |
| `Alert`             | Error, info and success messages                                                                     |

## Project layout

```text
docs/
  design-system/                 Fieldnote design-system docs (from the scaffold)
  tempest-line-design-system.md  Tempest Line spec (copied from Day 2)
images/mockups/                  earlier layout mockups, including Minutely
second-tempest-lines.html        the mockup this page follows
tempest-landing-page.html        the same mockup
public/                          static files
src/
  app/          app shell, providers and router
  components/   shared UI components and their tests
  features/     feature modules; tempest/ holds the page sections
  hooks/        shared hooks
  lib/          API client and query client
  pages/        route pages
  stores/       Zustand stores
  test/         Vitest setup
```

The mockups and `docs/design-system/` are excluded from Prettier so they stay exactly as supplied.
