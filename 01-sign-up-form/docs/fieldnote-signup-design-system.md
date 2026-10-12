# Fieldnote Sign-Up: Design System Spec

Oct 11, 2026 · v0.1 · Source: *Fieldnote Sign-Up Screen Brief* (@nik)

This spec turns the brief into the tokens, components, states and accessibility rules needed to design and build the sign-up screen. Everything the brief fixes (colors, fonts, copy, states, frames) is used verbatim. Anything the brief left open is marked **Decision** with the default chosen, so it can be overruled in one place.

**Contents**

1. [How the system serves the goals](#1-how-the-system-serves-the-goals)
2. [Design tokens](#2-design-tokens)
3. [Layout](#3-layout)
4. [Components](#4-components)
5. [Screen states](#5-screen-states)
6. [Accessibility (WCAG 2.2 AA)](#6-accessibility-wcag-22-aa)
7. [Decisions and open questions](#7-decisions-and-open-questions)

---

## 1. How the system serves the goals

| Goal | What the system does about it |
| --- | --- |
| 1. More completed sign-ups (business) | Institution sign-in is the only primary (filled Moss) button on the default screen. Every error state offers a next step in the same view; no dead ends. |
| 2. Faster account creation (user) | Picker autofocuses its search, accepts university names *or* email domains, and the recognized-domain shortcut skips the picker entirely. |
| 3. Real adoption (user) | Success state leads straight into "Create your first notebook" or "Import from Zotero" instead of an empty dashboard. |
| 4. Fewer login problems (business) | No Fieldnote password exists on the institution path. Errors name the institution and the fix in plain words. |
| 5. No account mess (guardrail) | "Not on SSO yet" asks for the .edu email and promises a later link, so the eventual SSO login merges into the same account instead of creating a second one. |

---

## 2. Design tokens

Naming: `category.role.variant`. Components reference **semantic** tokens only; core tokens exist so the palette can change in one place.

### 2.1 Color: core (Field Journal palette)

The palette is **Field Journal** (kraft paper, pine-green ink, apricot marks) from [fieldnote-signup-mood-palettes.md](fieldnote-signup-mood-palettes.md) §5, replacing the brief's original colours. Token names stay the same (`moss` now holds Pine, `highlighter` holds Apricot), so components don't change.

| Token | Hex | Use |
| --- | --- | --- |
| `color.core.moss` | `#2F4A2B` | Primary buttons, links, focus ring |
| `color.core.paper` | `#F4ECDD` | Page and card surface |
| `color.core.ink` | `#201C16` | Headings and body |
| `color.core.graphite` | `#5A5344` | Helper text, footer |
| `color.core.rule` | `#807562` | Field and button outlines |
| `color.core.error` | `#A9271C` | Error text and icon |
| `color.core.highlighter` | `#FBDCB4` | Highlight marks only (softened from the palette's `#F6C48A`) |

### 2.2 Color: derived (new, needed for states)

The brief does not cover hover, pressed, tinted surfaces or skeletons. These are additions, each checked against its pairings below.

| Token | Hex | Use |
| --- | --- | --- |
| `color.core.moss-700` | `#273D23` | Primary hover |
| `color.core.moss-800` | `#1F311C` | Primary pressed |
| `color.core.moss-50` | `#E8EBE8` | Active picker row, info notice surface |
| `color.core.paper-200` | `#EAE2D2` | Secondary hover, sunken surfaces |
| `color.core.paper-300` | `#DED5C5` | Skeleton blocks, hairline dividers (decorative only) |
| `color.core.error-50` | `#F7ECEB` | Error notice surface |
| `color.core.white` | `#FFFFFF` | Text on Moss; input fill |

### 2.3 Color: semantic

| Semantic token | Maps to |
| --- | --- |
| `color.bg.page` | paper |
| `color.bg.card` | paper |
| `color.bg.input` | white |
| `color.bg.sunken` | paper-200 |
| `color.bg.selected` | moss-50 |
| `color.text.primary` | ink |
| `color.text.secondary` | graphite |
| `color.text.on-primary` | white |
| `color.text.link` | moss |
| `color.text.error` | error |
| `color.border.default` | rule |
| `color.border.subtle` | paper-300 (decorative; never the only boundary of a control) |
| `color.border.error` | error |
| `color.action.primary` / `-hover` / `-pressed` | moss / moss-700 / moss-800 |
| `color.action.secondary-hover` | paper-200 |
| `color.focus.ring` | moss |
| `color.feedback.error-bg` | error-50 |
| `color.feedback.info-bg` | moss-50 |
| `color.mark.highlight` | highlighter |
| `color.skeleton` | paper-300 |

### 2.4 Contrast table (all recomputed with the WCAG 2 luminance formula)

Ratios are for the Field Journal palette.

| Foreground → Background | Ratio | Needs | Result |
| --- | --- | --- | --- |
| White → Moss | 9.83 | 4.5 | ✅ |
| White → Moss-700 (hover) | 11.81 | 4.5 | ✅ |
| White → Moss-800 (pressed) | 13.87 | 4.5 | ✅ |
| Ink → Paper | 14.44 | 4.5 | ✅ |
| Ink → White (input) | 16.95 | 4.5 | ✅ |
| Ink → Paper-200 | 13.16 | 4.5 | ✅ |
| Ink → Moss-50 | 14.11 | 4.5 | ✅ |
| Ink → Error-50 | 14.65 | 4.5 | ✅ |
| Ink → Highlighter | 12.91 | 4.5 | ✅ |
| Graphite → Paper | 6.49 | 4.5 | ✅ |
| Graphite → Paper-200 | 5.92 | 4.5 | ✅ |
| Graphite → Moss-50 | 6.34 | 4.5 | ✅ |
| Moss (link) → Paper | 8.38 | 4.5 | ✅ |
| Moss → Moss-50 | 8.19 | 4.5 | ✅ |
| Moss → Highlighter | 7.49 | 4.5 | ✅ (allowed, not needed) |
| Error → Paper | 5.97 | 4.5 | ✅ |
| Error → Error-50 | 6.06 | 4.5 | ✅ |
| Rule (border) → Paper | 3.86 | 3.0 | ✅ |
| Rule (border) → White | 4.53 | 3.0 | ✅ |
| Rule (border) → Paper-200 | 3.52 | 3.0 | ✅ |
| Moss (focus ring) → Paper | 8.38 | 3.0 | ✅ |
| **White → Highlighter** | **1.31** | 4.5 | ❌ **Never allowed** |
| Paper-300 → Paper | 1.24 | n/a | Decorative only (skeletons, panel dividers) |

**Hard rules**

- Highlighter carries Ink text only. No white text, no icons, no buttons on Highlighter.
- Paper-300 is never the only thing that shows where a control is.

### 2.5 Typography

Fonts: **Source Serif 4** (headings) and **Inter** (UI, body). Sizes are in rem so 200% text zoom works; px shown at 16px root.

| Token | Family | Size / line height | Weight | Use |
| --- | --- | --- | --- | --- |
| `type.display` | Source Serif 4 | 2rem / 2.5rem (32/40) desktop, 1.75rem / 2.25rem (28/36) mobile | 600 | Screen heading |
| `type.title` | Source Serif 4 | 1.5rem / 2rem (24/32) | 600 | Success heading, notebook panel title |
| `type.body-lg` | Inter | 1.0625rem / 1.625rem (17/26) | 400 | Subhead |
| `type.body` | Inter | 1rem / 1.5rem (16/24) | 400 | Body, notices, result names |
| `type.label` | Inter | 0.875rem / 1.25rem (14/20) | 500 | Field labels, divider "or" |
| `type.button` | Inter | 1rem / 1.5rem (16/24) | 600 | All buttons |
| `type.small` | Inter | 0.875rem / 1.25rem (14/20) | 400 | Helper text, result domains, footer |
| `type.quote` | Source Serif 4 | 1.0625rem / 1.625rem (17/26) | 400 italic | Quotes in the notebook panel |

Rules: nothing below 14px. Letter-spacing 0 for Inter body; −0.01em on `type.display`. Inter uses `font-feature-settings: "tnum"` only where numbers align (none on this screen).

### 2.6 Spacing (4px base)

| Token | px | Typical use |
| --- | --- | --- |
| `space.1` | 4 | Icon to text nudge |
| `space.2` | 8 | Icon gap, label to field |
| `space.3` | 12 | Between stacked buttons |
| `space.4` | 16 | Mobile side gutter, notice padding |
| `space.5` | 24 | Section gaps inside the card, mobile card padding |
| `space.6` | 32 | Heading block to actions |
| `space.7` | 40 | Desktop card padding |
| `space.8` | 48 | Card to side panel gap |
| `space.9` | 64 | Page top padding (desktop) |

### 2.7 Size, radius, border, elevation

| Token | Value | Use |
| --- | --- | --- |
| `size.control.height` | 48px (3rem) | Buttons, input; exceeds the 44px target rule |
| `size.target.min` | 44px | Any tappable thing, including text links (pad the hit area) |
| `size.picker.row` | 56px | Picker result row |
| `size.icon` | 20px | Button and notice icons |
| `size.card.width` | 440px | Desktop card |
| `radius.sm` | 6px | Monogram tiles, highlight marks |
| `radius.md` | 8px | Buttons, input, notices, listbox |
| `radius.lg` | 16px | Card, notebook panel |
| `border.width.default` | 1px | Outlines |
| `border.width.focus` | 2px | Focus ring, with 2px offset |
| `border.width.error` | 2px | Input in error (shape change, not just color) |
| `elevation.card` | `0 1px 2px rgb(28 27 25 / .06), 0 8px 24px rgb(28 27 25 / .08)` | Card on page (desktop only) |
| `elevation.popover` | `0 4px 8px rgb(28 27 25 / .08), 0 16px 32px rgb(28 27 25 / .12)` | Picker listbox |

### 2.8 Motion

| Token | Value | Use |
| --- | --- | --- |
| `motion.fast` | 120ms | Hover, pressed |
| `motion.base` | 200ms | Picker open/close, notice appear |
| `motion.ease` | `cubic-bezier(0.2, 0, 0, 1)` | All transitions |
| `motion.spinner` | 900ms linear, infinite | Redirect spinner |
| `motion.shimmer` | 1200ms ease-in-out, infinite | Skeleton rows |

`prefers-reduced-motion: reduce` turns off the shimmer (static Paper-300 blocks), removes slide/fade on the picker, and keeps the spinner but always pairs it with the text, which carries the meaning.

### 2.9 Token export (CSS custom properties)

```css
:root {
  /* core */
  --fn-moss: #2F4A2B; --fn-moss-700: #273D23; --fn-moss-800: #1F311C; --fn-moss-50: #E8EBE8;
  --fn-paper: #F4ECDD; --fn-paper-200: #EAE2D2; --fn-paper-300: #DED5C5;
  --fn-ink: #201C16; --fn-graphite: #5A5344; --fn-rule: #807562;
  --fn-error: #A9271C; --fn-error-50: #F7ECEB;
  --fn-highlighter: #FBDCB4; --fn-white: #FFFFFF;

  /* semantic */
  --color-bg-page: var(--fn-paper);
  --color-bg-card: var(--fn-paper);
  --color-bg-input: var(--fn-white);
  --color-bg-sunken: var(--fn-paper-200);
  --color-bg-selected: var(--fn-moss-50);
  --color-text-primary: var(--fn-ink);
  --color-text-secondary: var(--fn-graphite);
  --color-text-on-primary: var(--fn-white);
  --color-text-link: var(--fn-moss);
  --color-text-error: var(--fn-error);
  --color-border-default: var(--fn-rule);
  --color-border-subtle: var(--fn-paper-300);
  --color-border-error: var(--fn-error);
  --color-action-primary: var(--fn-moss);
  --color-action-primary-hover: var(--fn-moss-700);
  --color-action-primary-pressed: var(--fn-moss-800);
  --color-action-secondary-hover: var(--fn-paper-200);
  --color-focus-ring: var(--fn-moss);
  --color-feedback-error-bg: var(--fn-error-50);
  --color-feedback-info-bg: var(--fn-moss-50);
  --color-mark-highlight: var(--fn-highlighter);
  --color-skeleton: var(--fn-paper-300);

  /* type */
  --font-serif: "Source Serif 4", Georgia, serif;
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;

  /* space */
  --space-1: .25rem; --space-2: .5rem; --space-3: .75rem; --space-4: 1rem;
  --space-5: 1.5rem; --space-6: 2rem; --space-7: 2.5rem; --space-8: 3rem; --space-9: 4rem;

  /* shape */
  --radius-sm: 6px; --radius-md: 8px; --radius-lg: 16px;
  --control-height: 3rem; --target-min: 2.75rem;
  --focus-ring: 0 0 0 2px var(--color-bg-card), 0 0 0 4px var(--color-focus-ring);

  /* motion */
  --motion-fast: 120ms; --motion-base: 200ms; --ease: cubic-bezier(.2, 0, 0, 1);
}
```

---

## 3. Layout

| | Desktop 1440 × 900 | Mobile 390 × 844 |
| --- | --- | --- |
| Structure | Two columns, centered as a group: card (440) + `space.8` gap + notebook panel (480) | One column, full width, no side panel |
| Card | 440 wide, `space.7` padding, `radius.lg`, `elevation.card`, 1px `border.subtle` | No card chrome; content sits on the page with `space.5` padding and a `space.4` minimum gutter |
| Vertical | Group centered vertically; `space.9` minimum top padding | Starts `space.6` below the logo |
| Logo | Fieldnote wordmark top-left of the card, 24px tall | Same, top of column |

**Order inside the card (default):** logo → heading → subhead → institution button → Google → Apple → "or" divider → email field + "Continue with email" → footer. This order is the DOM order and the tab order.

**Reflow:** the layout switches to the single column at `48em` wide (not px), so at 200% text zoom on a 1440 window the side panel drops and the card goes full width. At 320 CSS px, nothing scrolls sideways (WCAG 1.4.10).

---

## 4. Components

Each component lists the tokens it uses. Props are framework-neutral.

### 4.1 Button

**Description:** every action on the screen. One primary per view.

| Variant | Use when | Visual |
| --- | --- | --- |
| `primary` | The one recommended path: institution sign-in, recognized-domain shortcut, "Create your first notebook" | Moss fill, white `type.button` |
| `secondary` | Alternative paths: Google, Apple, "Continue with email", "Import from Zotero" | Paper fill, 1px Rule border, Ink text |
| `link` | Low-weight actions: Cancel, "Request your institution", "sign up with email", Terms, Privacy | Moss text, underline always on; hit area padded to 44px tall |

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `primary \| secondary \| link` | `secondary` | See above |
| `icon` | icon name | none | Leading 20px icon, `space.2` gap |
| `loading` | boolean | false | Replaces icon with spinner, keeps label, sets `aria-busy` |
| `fullWidth` | boolean | true in card | Stacked buttons fill the card width |

| State | Primary | Secondary | Behavior |
| --- | --- | --- | --- |
| Default | Moss | Paper + Rule border | |
| Hover | Moss-700 | Paper-200 | `motion.fast` |
| Pressed | Moss-800 | Paper-300 fill, Rule border | |
| Focus-visible | 2px Moss ring, 2px Paper offset | Same | Keyboard focus only |
| Loading | Spinner + label | Spinner + label | Not clickable twice; label stays so width doesn't jump |
| Disabled | **Not used on this screen** | | See Decision D3 |

Tokens: `color.action.*`, `color.border.default`, `type.button`, `size.control.height`, `radius.md`, `motion.fast`.

**Do / Don't**

| ✅ Do | ❌ Don't |
| --- | --- |
| Keep "Continue with your institution" the only filled button on the default view | Make Google or Apple filled or brand-colored to match their guidelines at the cost of hierarchy (use their official monochrome marks on secondary) |
| Keep labels starting with "Continue with" so the stack scans as parallel choices | Put Highlighter on any button |

### 4.2 Institution sign-in button (`InstitutionSignInButton`)

**Description:** the key feature. A `primary` Button with a leading institution icon (a simple columned building, not a university logo). Label: **"Continue with your institution"**. Activating it opens the Institution picker in place.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `expanded` | boolean | false | True while the picker is open |
| `rememberedInstitution` | institution \| null | null | If the user picked one earlier this session (e.g. after Cancel), the picker reopens with that search kept |

Behavior:

- Click / Enter / Space: the button area becomes the picker search field (`motion.base` height transition), focus moves into the field. The buttons below stay in place, pushed down.
- `aria-expanded` and `aria-controls` point to the picker.
- Escape inside the picker closes it and returns focus to this button; the typed search is kept.

### 4.3 Institution picker (`InstitutionPicker`) — design first

**Description:** a combobox that searches institutions by name or email domain. Carries the Empty, Loading and part of the Error states.

**Anatomy**

1. Label "Find your institution" (`type.label`, visible above the field).
2. Search field (Input, §4.4) with leading search icon and placeholder "University name or email domain".
3. Hint / status line under the field (`type.small`, Graphite), also the live region.
4. Listbox (popover on desktop, inline on mobile), max 5 rows visible then scroll, `elevation.popover`, `radius.md`, 1px Rule border.
5. Result row (§4.3.1).
6. Footer row in no-match state: "Request your institution" link.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `query` | string | "" | Kept across close/cancel |
| `results` | institution[] | [] | `{ name, domain, ssoConnected }` |
| `status` | `idle \| searching \| results \| no-match \| error` | `idle` | Drives the view |
| `minChars` | number | 2 | Search starts at 2 characters ("UT") |
| `debounceMs` | number | 200 | Delay before searching |
| `onSelect` | (institution) => void | | Starts the redirect |

**States**

| State | Shows | Notes |
| --- | --- | --- |
| Idle (Empty, nothing typed) | Hint: "Start typing your university or email domain." | Listbox closed |
| Searching | 4 skeleton rows: 32px Paper-300 tile + two Paper-300 bars (60% and 35% width) | Status line says "Searching…" to screen readers only; skeletons are `aria-hidden` |
| Results | Rows for the search "UT": University of Texas at Austin · utexas.edu; University of Toronto · utoronto.ca; Utah State University · usu.edu; University of Utah · utah.edu | Live region: "4 institutions found" |
| No match | "No match for 'Univ of Westbrook.' Try your email domain, or sign up with email," where "sign up with email" is a link that moves focus to the email field; then the "Request your institution" link | Live region reads the same sentence |
| Search failed | Error notice: "Search isn't working right now. Sign up with email instead." | **Decision D5**: copy not in brief |

**Matching:** matches name words, acronyms and domains. Matched characters are wrapped in a Highlighter mark (`color.mark.highlight`, Ink text, `radius.sm`, 2px horizontal padding) and also set in 600 weight, so the match never relies on color alone.

#### 4.3.1 Picker result row

| Part | Spec |
| --- | --- |
| Height | 56px (`size.picker.row`), `space.4` horizontal padding |
| Tile | 32px square, `radius.sm`, Paper-200 fill, Ink monogram (first letter, Inter 600). No real logos (see Decision D6). |
| Name | `type.body`, Ink, weight 500 |
| Domain | `type.small`, Graphite, after a line break |
| Active (arrow keys / hover) | Moss-50 fill + 3px Moss bar on the left edge |
| Selected (Enter / click) | Goes straight to the redirect state |

**Accessibility**

- Field: `role="combobox"`, `aria-expanded`, `aria-controls="institution-listbox"`, `aria-autocomplete="list"`, `aria-activedescendant` set to the active row.
- Listbox: `role="listbox"`, `aria-label="Institutions"`. Rows: `role="option"`, `aria-selected` on the active row, accessible name "University of Texas at Austin, utexas.edu".
- Keyboard: Down/Up move the active row (wrap at ends), Home/End jump within the field text, Enter selects the active row, Escape closes the list first and the picker on a second press, Tab leaves the picker without selecting.
- Count announcement: a visually hidden `role="status"` (polite) region updates after each search settles: "4 institutions found", "No match for 'Univ of Westbrook'…".
- Focus stays in the field the whole time; the active row is never scrolled under a sticky header (WCAG 2.4.11).

```html
<label for="inst-search" class="label">Find your institution</label>
<input id="inst-search" type="text" role="combobox"
       aria-expanded="true" aria-controls="inst-listbox"
       aria-autocomplete="list" aria-activedescendant="inst-utexas"
       aria-describedby="inst-status" autocomplete="off" />
<p id="inst-status" role="status" class="hint">4 institutions found</p>
<ul id="inst-listbox" role="listbox" aria-label="Institutions">
  <li id="inst-utexas" role="option" aria-selected="true">
    <span class="tile" aria-hidden="true">U</span>
    <span class="name"><mark>U</mark>niversity of <mark>T</mark>exas at Austin</span>
    <span class="domain">utexas.edu</span>
  </li>
  <!-- … -->
</ul>
```

### 4.4 Text input (`TextField`)

Used for the email field and the picker search.

| Part | Spec |
| --- | --- |
| Label | Visible, `type.label`, Ink, `space.2` above. Email label: "Email" (Decision D4) |
| Field | 48px tall, White fill, 1px Rule border, `radius.md`, `space.4` horizontal padding, `type.body` Ink |
| Placeholder | Graphite. Email: "name@university.edu". Never the only label. |
| Helper / error line | `type.small`, `space.2` below, linked with `aria-describedby` |

| State | Visual |
| --- | --- |
| Default | Rule border |
| Hover | Ink border |
| Focus | Rule border + 2px Moss ring with 2px offset |
| Filled | Same as default |
| Error | 2px Error border, error icon + Error text below, `aria-invalid="true"` |
| Read-only (email pre-filled from SSO) | Paper-200 fill, Rule border, text stays Ink |

Email field attributes: `type="email"`, `autocomplete="email"`, `inputmode="email"`, `autocapitalize="none"`, `spellcheck="false"`. Paste always allowed.

### 4.5 Recognized-domain shortcut (`DomainShortcut`)

**Description:** appears under the email field when the typed domain belongs to an SSO-connected institution. It turns the email path back into the institution path without opening the picker.

- Trigger: a complete, valid domain is typed and recognized, after 400ms idle.
- Shows an info Notice (§4.6) with the brief's copy: **"Looks like you're at UT Austin."** followed by a `primary` button **"Continue with your UT EID login"**. The brief's single sentence is split into text + button so the action is a real control (Decision D7).
- "Continue with email" demotes from secondary to `link` while the shortcut shows, so there is still one primary.
- Announced once through the polite live region; focus does not move (the user is still typing).
- Choosing the shortcut goes to the redirect state with the email pre-filled as the login hint.

### 4.6 Inline notice (`Notice`)

| Variant | Surface | Icon | Text | Role |
| --- | --- | --- | --- | --- |
| `info` | Moss-50, no border | Info circle, Moss | Ink | `role="status"` (polite) |
| `error` | Error-50, 1px Error left border 3px wide | Alert triangle, Error | Ink body, optional Error lead-in | `role="alert"` (assertive) |

Padding `space.4`, `radius.md`, icon 20px with `space.3` gap, text `type.body`. Errors always have icon **and** text, never color alone. Notices sit directly above the control they're about and are linked to it with `aria-describedby`.

### 4.7 Divider

"or" centered in `type.label` Graphite, with Paper-300 hairlines either side (decorative). The lines are `aria-hidden`; the word "or" is plain text so screen readers hear the choice. `space.5` above and below.

### 4.8 Redirect panel (`RedirectStatus`)

Replaces the card's action area after a pick.

- 24px Moss spinner + **"Taking you to University of Texas at Austin…"** (`type.body`, Ink), centered.
- `link` button **"Cancel"** below.
- Container `role="status"` so the text is announced once; spinner `aria-hidden`.
- Cancel returns to the default view with the picker search kept ("UT") and focus on the institution button.
- **Decision D8:** if the redirect hasn't happened after 8 seconds, add "Still working. Check for a pop-up or new tab." under the text.

### 4.9 Success panel (`SuccessWelcome`)

- Heading `type.title`: **"Welcome, Maya."** Body `type.body`: **"You're signed in through UT Austin."**
- Primary button **"Create your first notebook"**, secondary button **"Import from Zotero"**.
- On load, focus moves to the heading (`tabindex="-1"`), so screen readers read the welcome first.

### 4.10 Legal footer

**"By continuing, you agree to Fieldnote's Terms and Privacy Policy."** `type.small` Graphite; "Terms" and "Privacy Policy" are Moss underlined links that open in the same tab. Links are padded to a 44px tall hit area without changing line height (use vertical padding with negative margin).

### 4.11 Notebook preview panel (desktop only)

**Description:** the side panel showing what Fieldnote looks like in use.

| Part | Spec |
| --- | --- |
| Frame | 480 wide, matches card height, Paper-200 surface, `radius.lg`, 1px Paper-300 border |
| Title | `type.title`: "Thesis: Urban heat islands, Ch. 2" |
| Quotes (2) | `type.quote`, Ink, each with a Highlighter mark behind key phrases |
| Citations (3) | `type.small`, Graphite, numbered list |

Accessibility: a `figure` with `role="img"` and `aria-label="Sample Fieldnote notebook page: Thesis: Urban heat islands, Chapter 2, with two highlighted quotes and three citations."` Its inner text is `aria-hidden` and nothing in it is focusable. Hidden below `48em`.

---

## 5. Screen states

The institution picker carries most states (per the brief). Each row lists what's on screen, where focus goes, and what is announced.

| State | On screen | Focus | Announced |
| --- | --- | --- | --- |
| **Default** | Heading, subhead, institution button, Google, Apple, "or", email field + "Continue with email", footer | Nothing focused on load (first Tab lands on the institution button) | — |
| **Empty: picker opened** | Picker field, hint "Start typing your university or email domain." | Picker field | Hint, via `aria-describedby` |
| **Empty: no match** | "No match for 'Univ of Westbrook.' Try your email domain, or sign up with email," + "Request your institution" link | Stays in field | Same sentence (polite) |
| **Loading: searching** | Skeleton rows | Stays in field | "Searching…" (polite) |
| **Loading: redirect** | Spinner, "Taking you to University of Texas at Austin…", Cancel | Cancel link | Status text (polite) |
| **Error: no email returned** | Error notice "UT Austin didn't share your email address. Enter it below to finish." above the email field; other sign-in options hidden | Email field | Notice (assertive) |
| **Error: institution not connected** | Notice "UT Austin isn't on Fieldnote SSO yet. Sign up with your .edu email — we'll link it when they join." above the email field | Email field | Notice |
| **Error: user cancels** | Default view, picker search "UT" kept | Institution button | — |
| **Success** | "Welcome, Maya. You're signed in through UT Austin." + "Create your first notebook" / "Import from Zotero" | Heading | Heading text |

**Mobile:** same states in one column. The picker listbox renders inline (pushes content down) instead of floating, so it never covers the field or the keyboard.

---

## 6. Accessibility (WCAG 2.2 AA)

From the brief, made specific:

| Requirement | How it's met |
| --- | --- |
| Picker is a proper combobox | §4.3: ARIA 1.2 combobox + listbox, `aria-activedescendant`, arrows / Enter / Escape, polite result count |
| Visible 2px Moss focus ring on every control | `--focus-ring` token: 2px Paper gap + 2px Moss (7.0:1 on Paper). Shown on `:focus-visible`. Never `outline: none` without it |
| Targets ≥ 44 × 44px | Buttons and input 48px; picker rows 56px; text links padded to 44px hit areas |
| Errors use text + icon, announced | `Notice` error variant has icon and text, `role="alert"`; field errors also get a 2px border and `aria-invalid` |
| Text resizes to 200% | All type and spacing in rem; reflow breakpoint in em; card max-width, not fixed width; tested at 200% and at 320 CSS px |

Added for completeness (WCAG 2.2):

- **1.4.11 Non-text contrast:** Rule borders 3.43:1 on Paper, 3.67:1 on White. Skeletons and hairlines are decorative.
- **2.4.11 Focus not obscured:** the picker listbox never covers the focused field; on mobile it's inline.
- **2.4.3 Focus order:** DOM order matches visual order in every state; focus moves only on state changes listed in §5.
- **3.3.7 Redundant entry:** search kept after Cancel; email from the recognized-domain shortcut carried into the SSO redirect; email the user typed carried into "not connected" and "no email returned" errors.
- **3.3.8 Accessible authentication:** institution SSO and Google/Apple need no memorized Fieldnote password. Email field allows paste and autofill.
- **1.3.5 Identify input purpose:** `autocomplete="email"`.
- **2.3.3 / reduced motion:** shimmer and transitions off under `prefers-reduced-motion`.
- **Language:** `lang="en"` on the page; institution names are proper nouns and need no `lang` change.
- **Windows High Contrast / forced colors:** buttons keep a 1px transparent border so outlines appear; focus ring uses `outline` in `forced-colors: active`; Highlighter marks fall back to `Mark` / `MarkText` system colors.

---

## 7. Decisions and open questions

**Decisions made (defaults, easy to change)**

| # | Decision | Why |
| --- | --- | --- |
| D1 | Card and page are both Paper; the card is separated by `elevation.card` and a Paper-300 hairline | Brief says Paper for "page and card surface" |
| D2 | Seven derived color tokens added (§2.2), all contrast-checked | Brief has no hover, pressed, tinted or skeleton colors |
| D3 | No disabled buttons. "Continue with email" stays active and validates on submit | Disabled buttons hide why they're disabled and fail contrast by design |
| D4 | Visible "Email" label on the email field; placeholder kept as the example | Placeholder can't be the label |
| D5 | Search-failure copy: "Search isn't working right now. Sign up with email instead." | Brief doesn't cover a failed search |
| D6 | Monogram tiles instead of university logos in the picker | Avoids trademark use and broken-logo states; brief notes names may become fictional |
| D7 | Domain shortcut split into text + a real button | An actionable sentence needs a control to be keyboard-reachable |
| D8 | 8-second "Still working" hint on redirect | Pop-up blockers are a common SSO failure (goal 4) |
| D9 | "Institution not connected" uses the error variant, as the brief lists it under Error | Kept as written; see Q3 |

**Open questions**

1. **Button label vs feature name.** The brief calls the feature "Sign in with your institution" but the button reads "Continue with your institution." This spec uses "Continue…" on screen (it parallels Google/Apple/email) and `InstitutionSignInButton` as the component name. Confirm.
2. **Duplicate accounts (goal 5).** What happens if someone signs in with their institution and an account already exists for that email via Google or email? Suggest a "We found your account. Link UT Austin to it?" step; needs copy and a state.
3. **"Not on SSO yet" tone.** It's a missing integration, not a user mistake. Would the calmer info variant convert better than error red?
4. **"Request your institution" destination.** Form, mailto, or an in-card follow-up?
5. **Real university names.** The brief says they may be swapped for fictional ones before publishing; the spec doesn't depend on them.
