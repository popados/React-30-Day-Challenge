# Tempest Line color palettes

Education-inspired palettes for the Tempest Line subscription checkout. Every palette uses the same token names as the design system's `tokens.json`, so any one of them can replace the current colors without touching components.

Last updated: October 12, 2026. Blueprint is the active palette.

## At a glance

| Palette    | Status      | Association                                                | Primary   | Highlight | Learner   | Payer     |
| ---------- | ----------- | ---------------------------------------------------------- | --------- | --------- | --------- | --------- |
| Blueprint  | **Active**  | Problem solving: graph paper, highlighter, worked math     | `#1F4FA3` | `#D7F25C` | `#0F6E6E` | `#6E3AA5` |
| Ivy Hall   | Alternative | University heritage: oxford navy, academic gold, ivy green | `#1F2F4D` | `#C9A227` | `#2F6B4F` | `#2B4A8A` |
| Chalkboard | Alternative | The classroom: board green, chalk cream, chalk yellow      | `#2F5D4E` | `#F2C94C` | `#2B6585` | `#8C3B5C` |

Values in the table are the light theme. All palettes pass WCAG 2.2 AA in every theme listed: text 4.5:1 or more on its background, and control borders and focus rings 3:1 or more.

## How to apply a palette

1. Copy the palette's hex values into `color.tokens` in `tokens.json`, matching each token name.
2. Keep tokens a palette doesn't list (`blueprint`, `grid`, `action-hover`, `action-disabled`, `on-action-disabled`, `link`, `border`) and retint them to the new primary; recheck contrast.
3. Keep the High Contrast theme, or derive one for the new palette: every text pair at 7:1 or more, surfaces separated by black borders.
4. Recheck every pair after any change. Status colors always appear with an icon and a title, never color alone.

## Blueprint (active)

Graph paper and highlighter: blueprint blue for structure and trust, one lime highlighter stroke for the thing that matters. The dark theme doubles as the late-night study mode.

| Token                | Graph Paper (light) | Blueprint (dark) | High Contrast | Used for                                                       |
| -------------------- | ------------------- | ---------------- | ------------- | -------------------------------------------------------------- |
| `blueprint`          | `#1F4FA3`           | `#1F4FA3`        | `#0B2A66`     | Brand blue: cover, header bands                                |
| `highlighter`        | `#D7F25C`           | `#D7F25C`        | `#D7F25C`     | The one highlight per screen (current step, verified discount) |
| `on-highlighter`     | `#0F1E3A`           | `#0F1E3A`        | `#000000`     | Text on the highlight                                          |
| `grid`               | `#D5E0F2`           | `#1E3A68`        | `#B8C2D6`     | Graph-paper lines (decorative)                                 |
| `bg`                 | `#F3F6FB`           | `#0B1A33`        | `#FFFFFF`     | Page background                                                |
| `surface`            | `#FFFFFF`           | `#102446`        | `#FFFFFF`     | Cards, inputs, dialogs                                         |
| `surface-raised`     | `#E8EEF8`           | `#16305A`        | `#F2F2F2`     | Order summary, selected option, disclosure box                 |
| `border`             | `#D0DAEB`           | `#2A4372`        | `#000000`     | Decorative hairlines                                           |
| `control-border`     | `#7686A6`           | `#7D94C0`        | `#000000`     | Input, checkbox and radio outlines                             |
| `ink`                | `#0F1E3A`           | `#EAF1FF`        | `#000000`     | Body text, labels, prices                                      |
| `ink-muted`          | `#4A5873`           | `#A3B5D6`        | `#262B40`     | Helper text, intervals, tax notes                              |
| `action`             | `#1F4FA3`           | `#D7F25C`        | `#0B2A66`     | Primary button fill                                            |
| `action-hover`       | `#173F86`           | `#E4F78A`        | `#000000`     | Primary button hover                                           |
| `on-action`          | `#FFFFFF`           | `#0F1E3A`        | `#FFFFFF`     | Text on the primary button                                     |
| `action-disabled`    | `#C8D2E4`           | `#2A4372`        | `#BDBDBD`     | Disabled or loading button fill                                |
| `on-action-disabled` | `#4A5873`           | `#A3B5D6`        | `#000000`     | Text on a disabled button                                      |
| `link`               | `#1F4FA3`           | `#9CC2FF`        | `#0B2A66`     | Links and Change links                                         |
| `focus-ring`         | `#0F6E6E`           | `#6FD6D0`        | `#C25E00`     | Keyboard focus ring                                            |
| `learner`            | `#0F6E6E`           | `#6FD6D0`        | `#004F56`     | Learner text and chip outline                                  |
| `learner-soft`       | `#DDF2F0`           | `#0E3D45`        | `#FFFFFF`     | Learner chip fill                                              |
| `payer`              | `#6E3AA5`           | `#CDA8F0`        | `#4A1F86`     | Payer text and chip outline                                    |
| `payer-soft`         | `#F1E6F8`           | `#33215A`        | `#FFFFFF`     | Payer chip fill                                                |
| `success`            | `#1A7A48`           | `#5FD394`        | `#0A5A2F`     | Success text and icons                                         |
| `success-soft`       | `#E3F4EA`           | `#0F3A27`        | `#FFFFFF`     | Success banner fill                                            |
| `danger`             | `#B42332`           | `#FF8F87`        | `#9A0012`     | Error text, icons, invalid border                              |
| `danger-soft`        | `#FBE7E9`           | `#4A1520`        | `#FFFFFF`     | Error summary fill                                             |
| `caution`            | `#8A5800`           | `#FFD166`        | `#6B4100`     | Caution text and icons                                         |
| `caution-soft`       | `#FFF3D1`           | `#3D2E08`        | `#FFFFFF`     | Caution banner fill                                            |

Key contrast, light: Primary button text 7.8:1 · Body text on cards 16.6:1 · Muted text on summary 6.1:1 · Text on highlight 13.2:1.  
Key contrast, dark: Primary button text 13.2:1 · Body text on cards 13.6:1 · Muted text on summary 6.3:1 · Text on highlight 13.2:1.  
Key contrast, High Contrast: Primary button text 13.7:1 · Body text on cards 21.0:1 · Muted text on summary 12.5:1 · Text on highlight 16.7:1.

Note: in the dark theme the lime highlight and the green success color are close in hue. Never use the highlight to mean "done".

## Ivy Hall

Oxford navy, academic gold and ivy green from university crests and diplomas. Reads established and trustworthy, which suits parents at checkout. The dark theme swaps the primary button to gold with navy text.

| Token            | Light     | Dark      | Used for                                                       |
| ---------------- | --------- | --------- | -------------------------------------------------------------- |
| `bg`             | `#F7F6F1` | `#0F1626` | Page background                                                |
| `surface`        | `#FFFFFF` | `#17213A` | Cards, inputs, dialogs                                         |
| `surface-raised` | `#EEEDE6` | `#1F2B48` | Order summary, selected option, disclosure box                 |
| `control-border` | `#7D8396` | `#7E89A6` | Input, checkbox and radio outlines                             |
| `ink`            | `#1A2238` | `#EEF0F5` | Body text, labels, prices                                      |
| `ink-muted`      | `#535B70` | `#A7AFC2` | Helper text, intervals, tax notes                              |
| `action`         | `#1F2F4D` | `#D9B54A` | Primary button fill                                            |
| `on-action`      | `#FFFFFF` | `#1A2238` | Text on the primary button                                     |
| `highlighter`    | `#C9A227` | `#D9B54A` | The one highlight per screen (current step, verified discount) |
| `on-highlighter` | `#1A2238` | `#1A2238` | Text on the highlight                                          |
| `focus-ring`     | `#2F6B4F` | `#D9B54A` | Keyboard focus ring                                            |
| `learner`        | `#2F6B4F` | `#7BC9A0` | Learner text and chip outline                                  |
| `learner-soft`   | `#E3F0E8` | `#173528` | Learner chip fill                                              |
| `payer`          | `#2B4A8A` | `#9DB7EE` | Payer text and chip outline                                    |
| `payer-soft`     | `#E4EBF7` | `#1E2C4D` | Payer chip fill                                                |
| `success`        | `#1A7A48` | `#5FD394` | Success text and icons                                         |
| `success-soft`   | `#E3F4EA` | `#0F3A27` | Success banner fill                                            |
| `danger`         | `#B3261E` | `#FF8A80` | Error text, icons, invalid border                              |
| `danger-soft`    | `#FBE7E9` | `#4A1520` | Error summary fill                                             |
| `caution`        | `#8A5800` | `#FFD166` | Caution text and icons                                         |
| `caution-soft`   | `#FFF3D1` | `#3D2E08` | Caution banner fill                                            |

Key contrast, light: Primary button text 13.4:1 · Body text on cards 15.8:1 · Muted text on summary 5.8:1 · Text on highlight 6.5:1.  
Key contrast, dark: Primary button text 8.0:1 · Body text on cards 14.0:1 · Muted text on summary 6.4:1 · Text on highlight 8.0:1.

Status colors other than `danger` are shared with Blueprint. No High Contrast variant yet.

## Chalkboard

Board green, chalk cream and chalk yellow from the classroom. The dark theme is the chalkboard itself, with a chalk-yellow primary button. Learner is chalk blue; payer is raspberry chalk.

| Token            | Light     | Dark      | Used for                                                       |
| ---------------- | --------- | --------- | -------------------------------------------------------------- |
| `bg`             | `#F4F1E8` | `#1C2B25` | Page background                                                |
| `surface`        | `#FFFDF7` | `#24372F` | Cards, inputs, dialogs                                         |
| `surface-raised` | `#ECE8DC` | `#2E4439` | Order summary, selected option, disclosure box                 |
| `control-border` | `#7B847D` | `#8FA398` | Input, checkbox and radio outlines                             |
| `ink`            | `#1E2B26` | `#F1EEE4` | Body text, labels, prices                                      |
| `ink-muted`      | `#4F5D57` | `#B7C2B9` | Helper text, intervals, tax notes                              |
| `action`         | `#2F5D4E` | `#F2C94C` | Primary button fill                                            |
| `on-action`      | `#FFFFFF` | `#1E2B26` | Text on the primary button                                     |
| `highlighter`    | `#F2C94C` | `#F2C94C` | The one highlight per screen (current step, verified discount) |
| `on-highlighter` | `#1E2B26` | `#1E2B26` | Text on the highlight                                          |
| `focus-ring`     | `#2B6585` | `#F2C94C` | Keyboard focus ring                                            |
| `learner`        | `#2B6585` | `#8CC8E8` | Learner text and chip outline                                  |
| `learner-soft`   | `#E1EEF5` | `#1D3A48` | Learner chip fill                                              |
| `payer`          | `#8C3B5C` | `#F2A9C6` | Payer text and chip outline                                    |
| `payer-soft`     | `#F6E4EC` | `#4A2536` | Payer chip fill                                                |
| `success`        | `#1A7A48` | `#5FD394` | Success text and icons                                         |
| `success-soft`   | `#E3F4EA` | `#0F3A27` | Success banner fill                                            |
| `danger`         | `#B3261E` | `#FF9B8F` | Error text, icons, invalid border                              |
| `danger-soft`    | `#FBE7E9` | `#4A1520` | Error summary fill                                             |
| `caution`        | `#8A5800` | `#FFD166` | Caution text and icons                                         |
| `caution-soft`   | `#FFF3D1` | `#3D2E08` | Caution banner fill                                            |

Key contrast, light: Primary button text 7.5:1 · Body text on cards 14.4:1 · Muted text on summary 5.6:1 · Text on highlight 9.3:1.  
Key contrast, dark: Primary button text 9.3:1 · Body text on cards 10.9:1 · Muted text on summary 5.7:1 · Text on highlight 9.3:1.

Status colors other than `danger` are shared with Blueprint. No High Contrast variant yet.

## Change log

| Date       | Change                                                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-12 | Blueprint made the active palette (Graph Paper, Blueprint and High Contrast themes). Ivy Hall and Chalkboard kept as alternatives. Library palette removed. |
