# Fieldnote Sign-Up: Mood Palettes

Oct 11, 2026 · Companion to [fieldnote-signup-design-system.md](fieldnote-signup-design-system.md)

Nine alternate palettes for the sign-up screen. Each one is a drop-in replacement for §2.1 and §2.2 of the spec: same 14 color roles, same semantic mapping (§2.3), and all 20 contrast pairings from §2.4 pass WCAG 2.2 AA (text 4.5:1, borders and focus ring 3:1), computed with the WCAG 2 luminance formula. The spec's token names stay the same (`color.core.moss` and so on) so components don't change; only the hex values swap.

Rules carried over from the spec:

- Highlighter carries Ink text only. White on Highlighter fails in every palette below.
- Paper-300 is decorative only (skeletons, hairlines).
- Errors keep icon + text, so a red error next to a warm primary is never color-only.

| # | Palette | Mood | Primary | Paper | Highlighter |
| --- | --- | --- | --- | --- | --- |
| 1 | Birch Bark | Bark | `#5A3E2B` | `#F7F2EA` | `#CFDC8E` |
| 2 | Morning Office | Office | `#34485E` | `#F6F7F8` | `#FFE27A` |
| 3 | Library Stacks | Bookshelf | `#1F5260` | `#F8F3E6` | `#EBC66B` |
| 4 | Index Card | Notes | `#2340A0` | `#FDFDFA` | `#FFF06A` |
| 5 | Field Journal | Bark + Notes | `#2F4A2B` | `#F4ECDD` | `#F6C48A` |
| 6 | Herbarium | Bark + Bookshelf | `#46512A` | `#F6F1E3` | `#F0BFA8` |
| 7 | Card Catalog | Bookshelf + Bark | `#5A481C` | `#F6EFDD` | `#BCD8E8` |
| 8 | Fired Clay | Clay + Terracotta | `#8E3F24` | `#F8F0E7` | `#C9DAB2` |
| 9 | Marginalia | Bookshelf + Notes | `#54305E` | `#F8F2E6` | `#EED37A` |

## 1. Birch Bark (Bark)

Birch paper, dark bark trunk, lichen highlights. Warm and outdoorsy, for field researchers. Primary: Bark. Highlighter: Lichen.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#5A3E2B` |
| `color.core.moss-700` | `#4A3323` |
| `color.core.moss-800` | `#3B291C` |
| `color.core.moss-50` | `#EDEAE8` |
| `color.core.paper` | `#F7F2EA` |
| `color.core.paper-200` | `#EDE7DE` |
| `color.core.paper-300` | `#E1DACF` |
| `color.core.ink` | `#211A14` |
| `color.core.graphite` | `#5E5343` |
| `color.core.rule` | `#827464` |
| `color.core.error` | `#AE2A1C` |
| `color.core.error-50` | `#F8ECEB` |
| `color.core.highlighter` | `#CFDC8E` |
| `color.core.white` | `#FFFFFF` |

| Pairing | Ratio | Needs |
| --- | --- | --- |
| White on Primary | 9.73 | 4.5 |
| White on Primary hover | 11.74 | 4.5 |
| White on Primary pressed | 13.82 | 4.5 |
| Ink on Paper | 15.41 | 4.5 |
| Ink on White | 17.18 | 4.5 |
| Ink on Paper-200 | 13.98 | 4.5 |
| Ink on Primary-50 | 14.34 | 4.5 |
| Ink on Error-50 | 14.88 | 4.5 |
| Ink on Highlighter | 11.68 | 4.5 |
| Graphite on Paper | 6.74 | 4.5 |
| Graphite on Paper-200 | 6.11 | 4.5 |
| Graphite on Primary-50 | 6.28 | 4.5 |
| Primary link on Paper | 8.73 | 4.5 |
| Primary on Primary-50 | 8.12 | 4.5 |
| Error on Paper | 5.99 | 4.5 |
| Error on Error-50 | 5.78 | 4.5 |
| Rule on Paper | 4.07 | 3 |
| Rule on White | 4.53 | 3 |
| Rule on Paper-200 | 3.69 | 3 |
| Focus ring on Paper | 8.73 | 3 |
| **White on Highlighter** | **1.47** | **never allowed** |

## 2. Morning Office (Office)

Cool desk light, steel slate, sticky-note yellow. Calm and administrative. Primary: Slate. Highlighter: Sticky Note.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#34485E` |
| `color.core.moss-700` | `#2B3B4D` |
| `color.core.moss-800` | `#22303E` |
| `color.core.moss-50` | `#E9EBED` |
| `color.core.paper` | `#F6F7F8` |
| `color.core.paper-200` | `#EAEBED` |
| `color.core.paper-300` | `#DADCE0` |
| `color.core.ink` | `#1A1D22` |
| `color.core.graphite` | `#545B67` |
| `color.core.rule` | `#7C818C` |
| `color.core.error` | `#B3261E` |
| `color.core.error-50` | `#F8EBEB` |
| `color.core.highlighter` | `#FFE27A` |
| `color.core.white` | `#FFFFFF` |

| Pairing | Ratio | Needs |
| --- | --- | --- |
| White on Primary | 9.40 | 4.5 |
| White on Primary hover | 11.44 | 4.5 |
| White on Primary pressed | 13.46 | 4.5 |
| Ink on Paper | 15.75 | 4.5 |
| Ink on White | 16.90 | 4.5 |
| Ink on Paper-200 | 14.17 | 4.5 |
| Ink on Primary-50 | 14.14 | 4.5 |
| Ink on Error-50 | 14.54 | 4.5 |
| Ink on Highlighter | 13.21 | 4.5 |
| Graphite on Paper | 6.38 | 4.5 |
| Graphite on Paper-200 | 5.74 | 4.5 |
| Graphite on Primary-50 | 5.72 | 4.5 |
| Primary link on Paper | 8.76 | 4.5 |
| Primary on Primary-50 | 7.86 | 4.5 |
| Error on Paper | 6.09 | 4.5 |
| Error on Error-50 | 5.63 | 4.5 |
| Rule on Paper | 3.64 | 3 |
| Rule on White | 3.91 | 3 |
| Rule on Paper-200 | 3.27 | 3 |
| Focus ring on Paper | 8.76 | 3 |
| **White on Highlighter** | **1.28** | **never allowed** |

## 3. Library Stacks (Bookshelf)

Parchment pages, teal cloth bindings, gilt spines. The most "library" of the six. Primary: Cloth Teal. Highlighter: Gilt.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#1F5260` |
| `color.core.moss-700` | `#19434F` |
| `color.core.moss-800` | `#14363F` |
| `color.core.moss-50` | `#E6ECEE` |
| `color.core.paper` | `#F8F3E6` |
| `color.core.paper-200` | `#EEE8DA` |
| `color.core.paper-300` | `#E1DACC` |
| `color.core.ink` | `#1E1A16` |
| `color.core.graphite` | `#5A5448` |
| `color.core.rule` | `#817968` |
| `color.core.error` | `#B42318` |
| `color.core.error-50` | `#F8EBEA` |
| `color.core.highlighter` | `#EBC66B` |
| `color.core.white` | `#FFFFFF` |

| Pairing | Ratio | Needs |
| --- | --- | --- |
| White on Primary | 8.63 | 4.5 |
| White on Primary hover | 10.73 | 4.5 |
| White on Primary pressed | 12.89 | 4.5 |
| Ink on Paper | 15.61 | 4.5 |
| Ink on White | 17.29 | 4.5 |
| Ink on Paper-200 | 14.15 | 4.5 |
| Ink on Primary-50 | 14.49 | 4.5 |
| Ink on Error-50 | 14.87 | 4.5 |
| Ink on Highlighter | 10.56 | 4.5 |
| Graphite on Paper | 6.78 | 4.5 |
| Graphite on Paper-200 | 6.15 | 4.5 |
| Graphite on Primary-50 | 6.29 | 4.5 |
| Primary link on Paper | 7.79 | 4.5 |
| Primary on Primary-50 | 7.23 | 4.5 |
| Error on Paper | 5.93 | 4.5 |
| Error on Error-50 | 5.65 | 4.5 |
| Rule on Paper | 3.89 | 3 |
| Rule on White | 4.31 | 3 |
| Rule on Paper-200 | 3.53 | 3 |
| Focus ring on Paper | 7.79 | 3 |
| **White on Highlighter** | **1.64** | **never allowed** |

## 4. Index Card (Notes)

Clean index card, ballpoint blue, neon highlighter, red margin line. Brightest and most student-like. Primary: Ballpoint. Highlighter: Neon.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#2340A0` |
| `color.core.moss-700` | `#1D3483` |
| `color.core.moss-800` | `#172A6A` |
| `color.core.moss-50` | `#E7EAF5` |
| `color.core.paper` | `#FDFDFA` |
| `color.core.paper-200` | `#F0F0EF` |
| `color.core.paper-300` | `#E0E1E1` |
| `color.core.ink` | `#1F2024` |
| `color.core.graphite` | `#585B62` |
| `color.core.rule` | `#7B808C` |
| `color.core.error` | `#C0261D` |
| `color.core.error-50` | `#F9EBEB` |
| `color.core.highlighter` | `#FFF06A` |
| `color.core.white` | `#FFFFFF` |

| Pairing | Ratio | Needs |
| --- | --- | --- |
| White on Primary | 9.08 | 4.5 |
| White on Primary hover | 11.22 | 4.5 |
| White on Primary pressed | 13.33 | 4.5 |
| Ink on Paper | 15.97 | 4.5 |
| Ink on White | 16.27 | 4.5 |
| Ink on Paper-200 | 14.27 | 4.5 |
| Ink on Primary-50 | 13.55 | 4.5 |
| Ink on Error-50 | 14.04 | 4.5 |
| Ink on Highlighter | 13.89 | 4.5 |
| Graphite on Paper | 6.67 | 4.5 |
| Graphite on Paper-200 | 5.96 | 4.5 |
| Graphite on Primary-50 | 5.66 | 4.5 |
| Primary link on Paper | 8.91 | 4.5 |
| Primary on Primary-50 | 7.56 | 4.5 |
| Error on Paper | 5.83 | 4.5 |
| Error on Error-50 | 5.12 | 4.5 |
| Rule on Paper | 3.88 | 3 |
| Rule on White | 3.96 | 3 |
| Rule on Paper-200 | 3.47 | 3 |
| Focus ring on Paper | 8.91 | 3 |
| **White on Highlighter** | **1.17** | **never allowed** |

## 5. Field Journal (Bark + Notes)

Kraft paper, pine-green ink, apricot marks. A field notebook between bark and notes. Primary: Pine. Highlighter: Apricot.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#2F4A2B` |
| `color.core.moss-700` | `#273D23` |
| `color.core.moss-800` | `#1F311C` |
| `color.core.moss-50` | `#E8EBE8` |
| `color.core.paper` | `#F4ECDD` |
| `color.core.paper-200` | `#EAE2D2` |
| `color.core.paper-300` | `#DED5C5` |
| `color.core.ink` | `#201C16` |
| `color.core.graphite` | `#5A5344` |
| `color.core.rule` | `#807562` |
| `color.core.error` | `#A9271C` |
| `color.core.error-50` | `#F7ECEB` |
| `color.core.highlighter` | `#F6C48A` |
| `color.core.white` | `#FFFFFF` |

| Pairing | Ratio | Needs |
| --- | --- | --- |
| White on Primary | 9.83 | 4.5 |
| White on Primary hover | 11.81 | 4.5 |
| White on Primary pressed | 13.87 | 4.5 |
| Ink on Paper | 14.44 | 4.5 |
| Ink on White | 16.95 | 4.5 |
| Ink on Paper-200 | 13.16 | 4.5 |
| Ink on Primary-50 | 14.11 | 4.5 |
| Ink on Error-50 | 14.65 | 4.5 |
| Ink on Highlighter | 10.64 | 4.5 |
| Graphite on Paper | 6.49 | 4.5 |
| Graphite on Paper-200 | 5.92 | 4.5 |
| Graphite on Primary-50 | 6.34 | 4.5 |
| Primary link on Paper | 8.38 | 4.5 |
| Primary on Primary-50 | 8.19 | 4.5 |
| Error on Paper | 5.97 | 4.5 |
| Error on Error-50 | 6.06 | 4.5 |
| Rule on Paper | 3.86 | 3 |
| Rule on White | 4.53 | 3 |
| Rule on Paper-200 | 3.52 | 3 |
| Focus ring on Paper | 8.38 | 3 |
| **White on Highlighter** | **1.59** | **never allowed** |

### Field Journal: dark mode

Kraft and pine at night: warm brown-black paper, kraft-coloured ink, light pine for actions. The tokens are the same as in light mode, with two changes. The light Primary takes dark Pine text (`on-primary`) instead of White, and the input fill is Paper. Highlighter keeps its light-mode value and its dark Ink text in both themes. [src/index.css](../src/index.css) uses these values for its dark theme, except for the highlighter, which the app softens to `#FBDCB4` in both themes.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#A3C495` |
| `color.core.moss-700` | `#96B489` |
| `color.core.moss-800` | `#89A57D` |
| `color.core.moss-50` | `#222D1F` |
| `color.core.paper` | `#181612` |
| `color.core.paper-200` | `#24211B` |
| `color.core.paper-300` | `#36322A` |
| `color.core.ink` | `#F4ECDD` |
| `color.core.graphite` | `#B8AD98` |
| `color.core.rule` | `#857A66` |
| `color.core.error` | `#F4978A` |
| `color.core.error-50` | `#3B1C17` |
| `color.core.highlighter` | `#F6C48A` (same as light) |
| `on-primary` (replaces White on Primary) | `#1A2618` |
| `on-highlighter` (text in a mark) | `#201C16` (same as light) |

Hover and pressed are the Primary at 92% and 84% brightness, which is what the button's `hover:brightness-92` produces.

| Pairing | Ratio | Needs |
| --- | --- | --- |
| On-primary on Primary | 8.16 | 4.5 |
| On-primary on Primary hover | 6.88 | 4.5 |
| On-primary on Primary pressed | 5.80 | 4.5 |
| Ink on Paper (also the input fill) | 15.39 | 4.5 |
| Ink on Paper-200 | 13.67 | 4.5 |
| Ink on Primary-50 | 12.23 | 4.5 |
| Ink on Error-50 | 13.11 | 4.5 |
| On-highlighter on Highlighter | 10.64 | 4.5 |
| Graphite on Paper | 8.15 | 4.5 |
| Graphite on Paper-200 | 7.24 | 4.5 |
| Graphite on Primary-50 | 6.47 | 4.5 |
| Primary link on Paper | 9.37 | 4.5 |
| Primary on Paper-200 | 8.32 | 4.5 |
| Primary on Primary-50 | 7.44 | 4.5 |
| Error on Paper | 8.29 | 4.5 |
| Error on Error-50 | 7.07 | 4.5 |
| Rule on Paper | 4.28 | 3 |
| Rule on Paper-200 | 3.80 | 3 |
| Focus ring on Paper | 9.37 | 3 |
| **Dark-mode Ink on Highlighter** | **1.36** | **never allowed** |

Paper-300 on Paper is 1.42, so it stays decorative only, as in light mode.

## 6. Herbarium (Bark + Bookshelf)

Cream specimen sheets, pressed-olive stems, faded rose marks. A botanist's archive between bark and bookshelf. Primary: Olive. Highlighter: Pressed Rose.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#46512A` |
| `color.core.moss-700` | `#394222` |
| `color.core.moss-800` | `#2E351C` |
| `color.core.moss-50` | `#EBECE8` |
| `color.core.paper` | `#F6F1E3` |
| `color.core.paper-200` | `#ECE6D8` |
| `color.core.paper-300` | `#E0D9C9` |
| `color.core.ink` | `#1F1D15` |
| `color.core.graphite` | `#595543` |
| `color.core.rule` | `#807B68` |
| `color.core.error` | `#AD2A1C` |
| `color.core.error-50` | `#F8ECEB` |
| `color.core.highlighter` | `#F0BFA8` |
| `color.core.white` | `#FFFFFF` |

| Pairing | Ratio | Needs |
| --- | --- | --- |
| White on Primary | 8.50 | 4.5 |
| White on Primary hover | 10.63 | 4.5 |
| White on Primary pressed | 12.79 | 4.5 |
| Ink on Paper | 14.95 | 4.5 |
| Ink on White | 16.87 | 4.5 |
| Ink on Paper-200 | 13.56 | 4.5 |
| Ink on Primary-50 | 14.22 | 4.5 |
| Ink on Error-50 | 14.61 | 4.5 |
| Ink on Highlighter | 10.22 | 4.5 |
| Graphite on Paper | 6.63 | 4.5 |
| Graphite on Paper-200 | 6.02 | 4.5 |
| Graphite on Primary-50 | 6.31 | 4.5 |
| Primary link on Paper | 7.53 | 4.5 |
| Primary on Primary-50 | 7.16 | 4.5 |
| Error on Paper | 5.96 | 4.5 |
| Error on Error-50 | 5.82 | 4.5 |
| Rule on Paper | 3.76 | 3 |
| Rule on White | 4.24 | 3 |
| Rule on Paper-200 | 3.41 | 3 |
| Focus ring on Paper | 7.53 | 3 |
| **White on Highlighter** | **1.65** | **never allowed** |

## 7. Card Catalog (Bookshelf + Bark)

Manila index cards, oak drawer fronts, pale blue date stamps. The library card catalog, warm and orderly. Primary: Oak Drawer. Highlighter: Date Stamp Blue.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#5A481C` |
| `color.core.moss-700` | `#4A3B17` |
| `color.core.moss-800` | `#3B3012` |
| `color.core.moss-50` | `#EDEBE6` |
| `color.core.paper` | `#F6EFDD` |
| `color.core.paper-200` | `#ECE4D2` |
| `color.core.paper-300` | `#E0D7C5` |
| `color.core.ink` | `#201C12` |
| `color.core.graphite` | `#5A5442` |
| `color.core.rule` | `#807964` |
| `color.core.error` | `#AE2A1C` |
| `color.core.error-50` | `#F8ECEB` |
| `color.core.highlighter` | `#BCD8E8` |
| `color.core.white` | `#FFFFFF` |

| Pairing | Ratio | Needs |
| --- | --- | --- |
| White on Primary | 8.83 | 4.5 |
| White on Primary hover | 10.89 | 4.5 |
| White on Primary pressed | 12.98 | 4.5 |
| Ink on Paper | 14.81 | 4.5 |
| Ink on White | 16.99 | 4.5 |
| Ink on Paper-200 | 13.42 | 4.5 |
| Ink on Primary-50 | 14.26 | 4.5 |
| Ink on Error-50 | 14.71 | 4.5 |
| Ink on Highlighter | 11.43 | 4.5 |
| Graphite on Paper | 6.58 | 4.5 |
| Graphite on Paper-200 | 5.97 | 4.5 |
| Graphite on Primary-50 | 6.34 | 4.5 |
| Primary link on Paper | 7.70 | 4.5 |
| Primary on Primary-50 | 7.41 | 4.5 |
| Error on Paper | 5.82 | 4.5 |
| Error on Error-50 | 5.78 | 4.5 |
| Rule on Paper | 3.79 | 3 |
| Rule on White | 4.34 | 3 |
| Rule on Paper-200 | 3.43 | 3 |
| Focus ring on Paper | 7.70 | 3 |
| **White on Highlighter** | **1.49** | **never allowed** |

## 8. Fired Clay (Clay + Terracotta)

Sun-warmed sand, fired terracotta pots, sage glaze. The warmest palette here. Error shifts to a cool crimson so it never reads as the button color. Primary: Terracotta. Highlighter: Sage Glaze.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#8E3F24` |
| `color.core.moss-700` | `#74341E` |
| `color.core.moss-800` | `#5E2A18` |
| `color.core.moss-50` | `#F3EAE7` |
| `color.core.paper` | `#F8F0E7` |
| `color.core.paper-200` | `#EEE5DB` |
| `color.core.paper-300` | `#E1D8CD` |
| `color.core.ink` | `#22180F` |
| `color.core.graphite` | `#5E5347` |
| `color.core.rule` | `#847668` |
| `color.core.error` | `#A3163E` |
| `color.core.error-50` | `#F7EAEE` |
| `color.core.highlighter` | `#C9DAB2` |
| `color.core.white` | `#FFFFFF` |

| Pairing | Ratio | Needs |
| --- | --- | --- |
| White on Primary | 7.27 | 4.5 |
| White on Primary hover | 9.32 | 4.5 |
| White on Primary pressed | 11.54 | 4.5 |
| Ink on Paper | 15.44 | 4.5 |
| Ink on White | 17.42 | 4.5 |
| Ink on Paper-200 | 13.99 | 4.5 |
| Ink on Primary-50 | 14.71 | 4.5 |
| Ink on Error-50 | 14.90 | 4.5 |
| Ink on Highlighter | 11.74 | 4.5 |
| Graphite on Paper | 6.64 | 4.5 |
| Graphite on Paper-200 | 6.01 | 4.5 |
| Graphite on Primary-50 | 6.32 | 4.5 |
| Primary link on Paper | 6.45 | 4.5 |
| Primary on Primary-50 | 6.14 | 4.5 |
| Error on Paper | 6.79 | 4.5 |
| Error on Error-50 | 6.55 | 4.5 |
| Rule on Paper | 3.90 | 3 |
| Rule on White | 4.40 | 3 |
| Rule on Paper-200 | 3.53 | 3 |
| Focus ring on Paper | 6.45 | 3 |
| **White on Highlighter** | **1.48** | **never allowed** |

## 9. Marginalia (Bookshelf + Notes)

Aged page, plum ink, gold-leaf highlights. Scholarly and a little literary. Primary: Plum. Highlighter: Gold Leaf.

| Spec token | Hex |
| --- | --- |
| `color.core.moss` | `#54305E` |
| `color.core.moss-700` | `#45274D` |
| `color.core.moss-800` | `#37203E` |
| `color.core.moss-50` | `#ECE8ED` |
| `color.core.paper` | `#F8F2E6` |
| `color.core.paper-200` | `#EEE7DA` |
| `color.core.paper-300` | `#E1DACC` |
| `color.core.ink` | `#1F1A1D` |
| `color.core.graphite` | `#5B545C` |
| `color.core.rule` | `#81777F` |
| `color.core.error` | `#B0261B` |
| `color.core.error-50` | `#F8EBEA` |
| `color.core.highlighter` | `#EED37A` |
| `color.core.white` | `#FFFFFF` |

| Pairing | Ratio | Needs |
| --- | --- | --- |
| White on Primary | 10.71 | 4.5 |
| White on Primary hover | 12.72 | 4.5 |
| White on Primary pressed | 14.60 | 4.5 |
| Ink on Paper | 15.39 | 4.5 |
| Ink on White | 17.16 | 4.5 |
| Ink on Paper-200 | 13.96 | 4.5 |
| Ink on Primary-50 | 14.16 | 4.5 |
| Ink on Error-50 | 14.76 | 4.5 |
| Ink on Highlighter | 11.63 | 4.5 |
| Graphite on Paper | 6.57 | 4.5 |
| Graphite on Paper-200 | 5.96 | 4.5 |
| Graphite on Primary-50 | 6.04 | 4.5 |
| Primary link on Paper | 9.60 | 4.5 |
| Primary on Primary-50 | 8.84 | 4.5 |
| Error on Paper | 6.00 | 4.5 |
| Error on Error-50 | 5.75 | 4.5 |
| Rule on Paper | 3.86 | 3 |
| Rule on White | 4.30 | 3 |
| Rule on Paper-200 | 3.50 | 3 |
| Focus ring on Paper | 9.60 | 3 |
| **White on Highlighter** | **1.48** | **never allowed** |

