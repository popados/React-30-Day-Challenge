# Fieldnote palette: Field Journal

The colours the Day 1 sign-up app uses, in light and dark themes. The values come from [src/index.css](../src/index.css), and [design-system/tokens.json](design-system/tokens.json) is the source of truth. The palette is Field Journal from the [mood palettes](fieldnote-signup-mood-palettes.md) (§5), with a softened highlighter.

**Mood:** kraft paper, near-black ink, pine green for actions, and a pale apricot highlighter for marked passages.

## Tokens

| Token            | Light     | Dark      | Use                                                                    |
| ---------------- | --------- | --------- | ---------------------------------------------------------------------- |
| `paper`          | `#f4ecdd` | `#181612` | Page and card surface                                                  |
| `paper-deep`     | `#eae2d2` | `#24211b` | Sunken surfaces: sample-notebook panel, skeleton rows                  |
| `hairline`       | `#ded5c5` | `#36322a` | Decorative lines only: card outline, "or" divider                      |
| `ink`            | `#201c16` | `#f4ecdd` | Headings and body text                                                 |
| `graphite`       | `#5a5344` | `#b8ad98` | Secondary text: helper text, placeholders, terms line                  |
| `rule`           | `#807562` | `#857a66` | Field and secondary-button outlines. Not for text.                     |
| `moss`           | `#2f4a2b` | `#a3c495` | The one action colour: primary button, links, focus ring, selected row |
| `on-moss`        | `#ffffff` | `#1a2618` | Text and icons on a `moss` fill                                        |
| `moss-soft`      | `#e8ebe8` | `#222d1f` | Ground behind info and success messages, hovered picker row            |
| `error`          | `#a9271c` | `#f4978a` | Error text and icons, always with words and an icon                    |
| `error-soft`     | `#f7eceb` | `#3b1c17` | Ground behind an error message                                         |
| `highlighter`    | `#fbdcb4` | `#fbdcb4` | Highlight marks only, behind `on-highlighter` text                     |
| `on-highlighter` | `#201c16` | `#201c16` | Text inside a highlight mark, in both themes                           |
| `focus-ring`     | = `moss`  | = `moss`  | The 2px focus outline on every control                                 |
| `link`           | = `moss`  | = `moss`  | Inline links, underlined                                               |

`highlighter` is softened from the palette's original `#f6c48a`, and both themes share it.

## Contrast

All text pairings meet WCAG AA (4.5:1), and borders meet the 3:1 non-text minimum.

| Pairing                           | Light                    | Dark   |
| --------------------------------- | ------------------------ | ------ |
| `ink` on `paper`                  | 14.4:1                   | 15.4:1 |
| `graphite` on `paper`             | 6.5:1                    | 8.2:1  |
| `moss` (link) on `paper`          | 8.4:1                    | 9.4:1  |
| `on-moss` on `moss`               | 9.8:1                    | 8.2:1  |
| `error` on `paper`                | 6.0:1                    | 8.3:1  |
| `rule` on `paper` (border)        | 3.9:1                    | 4.3:1  |
| `on-highlighter` on `highlighter` | 12.9:1                   | 12.9:1 |
| **White on `highlighter`**        | **1.3:1, never allowed** |        |

## Rules

- `moss` is the only action colour. Use `on-moss` for its label, never hard-coded white, because the label turns dark in the dark theme.
- `error` always appears with words and an icon, never colour alone.
- `highlighter` is for highlight marks only, never a button, link or background.
- `hairline` is decorative. Use `rule` for any edge that shows where a control is.
- No shadows: the system uses borders for depth.

## In code

The tokens are CSS variables, swapped by theme. The dark theme follows the OS setting and can be forced with `<html data-theme="dark">` or `"light"`.

```css
:root {
  --paper: #f4ecdd;
  --paper-deep: #eae2d2;
  --hairline: #ded5c5;
  --ink: #201c16;
  --graphite: #5a5344;
  --rule: #807562;
  --moss: #2f4a2b;
  --on-moss: #ffffff;
  --moss-soft: #e8ebe8;
  --error: #a9271c;
  --error-soft: #f7eceb;
  --highlighter: #fbdcb4;
  --on-highlighter: #201c16;
  --focus-ring: var(--moss);
  --link: var(--moss);
}

:root[data-theme='dark'] {
  --paper: #181612;
  --paper-deep: #24211b;
  --hairline: #36322a;
  --ink: #f4ecdd;
  --graphite: #b8ad98;
  --rule: #857a66;
  --moss: #a3c495;
  --on-moss: #1a2618;
  --moss-soft: #222d1f;
  --error: #f4978a;
  --error-soft: #3b1c17;
}
```

Tailwind exposes each token as a utility: `bg-paper`, `text-ink`, `border-rule`, `bg-moss`, `text-on-moss`, `bg-highlighter` and so on. Tailwind's default colours are switched off, so only these names work.
