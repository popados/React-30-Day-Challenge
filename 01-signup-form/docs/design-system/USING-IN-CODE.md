# Using the Fieldnote design system in code

The other files in this folder are copied unchanged from the Fieldnote design system
(`README.md` is its brand book, `tokens.json` its values, `components/` and `assets/`
its guidelines). This file maps them to the project's code. Read the brand book first.

## Where things live

| Design system | In the project |
|---|---|
| `tokens.json` colours (light + dark) | CSS variables in `src/index.css` (`:root`, dark under `prefers-color-scheme` and `[data-theme="dark"]`) |
| Colours, type, spacing, radius, sizes | Tailwind theme in `src/index.css` (`@theme`) |
| Fonts (Source Serif 4, Inter) | Google Fonts `<link>` in `index.html` |
| Components | `src/components/<Name>.jsx`, one per guideline in `components/` |
| Icons | `src/components/Icon.jsx` (Lucide v1.48.0 paths) |
| Provider logos | `public/logos/` (add the official files; see the README there) |

## Token → Tailwind class

| Token | Class examples |
|---|---|
| `paper`, `paper-deep` | `bg-paper`, `bg-paper-deep` |
| `ink`, `graphite` | `text-ink`, `text-graphite` |
| `rule`, `hairline` | `border-rule` (controls), `border-hairline` / `divide-hairline` (decoration only) |
| `moss`, `on-moss`, `moss-soft` | `bg-moss text-on-moss`, `bg-moss-soft` |
| `error`, `error-soft` | `text-error`, `bg-error-soft` |
| `highlighter`, `on-highlighter` | Only through `<Highlight>` |
| `link`, `focus-ring` | `text-link underline`; focus ring is global in `index.css` |
| `heading-xl` … `heading-sm` | `font-serif text-heading-xl` … `text-heading-sm` |
| `note-body`, `note-quote` | `font-serif text-note`, add `italic` for quotes |
| `body`, `label`, `body-sm`, `caption` | `text-body`, `text-label`, `text-body-sm`, `text-caption` |
| `space-1` … `space-12` | the number is the step: `p-4` = `space-4` (16px), `gap-3` = `space-3` (12px) |
| `radius-sm` / `md` / `lg` | `rounded-sm` / `rounded-md` / `rounded-lg` |
| `control-height`, `target-min` | `min-h-control` (48px), `min-h-target` / `min-w-target` (44px) |
| `card-width` | `max-w-card` (440px) |

Tailwind's default colour palette is switched off (`--color-*: initial`), so `bg-blue-500`
and friends don't exist. Use the tokens.

## Theme

Light and dark follow the OS. To force one, set `data-theme="light"` or `data-theme="dark"`
on `<html>`. Tailwind's `dark:` variant follows the same switch. Never hard-code a colour
that should change with the theme; the only literal colours are the Google/Apple button
styles, which follow the providers' rules.
