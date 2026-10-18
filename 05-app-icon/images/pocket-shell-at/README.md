# Pocket Shell: @ icon in color

At-mark #1 (heavy JetBrains Mono ExtraBold `@`, no tail), outlined to a path so the SVGs need no font.
Open `preview.html` (or `preview.png`) to compare all 15 at 168, 64, 32 and 16px on light and dark.

## Files per color (`<name>` below)
- `svg/<name>.svg`: rounded tile, full detail (texture, stitching). Use for 64px and up.
- `svg/<name>-small.svg`: bigger @, flat background, no stitching. Use for 48px and below (favicons).
- `svg/<name>-square.svg` / `-small-square.svg`: unrounded, for iOS and Android, which apply their own mask.
- `png/<name>/`: 1024 square (App Store / iOS), 512, 180, 64 (rounded, full), 48, 32, 16 (rounded, small).

## Contrast (lowest mark vs background; AA = 3:1 for icons, 4.5:1 for text)
| # | Color | File name | Mark on background | Contrast | WCAG |
|---|---|---|---|---|---|
| 1 | Terminal green | `terminal-green` | #3DF58A on #07130D | 13.2:1 | AA |
| 2 | Denim pocket | `denim` | #F4F1EA on #2E4A6E / #34537A | 7.0:1 | AA |
| 3 | Denim + green | `denim-green` | #3DF58A on #2E4A6E / #34537A | 5.5:1 | AA |
| 4 | Denim + gold | `denim-gold` | #E8B04A on #2E4A6E / #34537A | 4.0:1 | AA graphics only |
| 5 | Phosphor | `phosphor` | #07130D on #3DF58A | 13.2:1 | AA |
| 6 | Ink | `ink` | #FFFFFF on #0E0E10 | 19.3:1 | AA |
| 7 | Amber terminal | `amber` | #FFB000 on #1A1206 | 10.1:1 | AA |
| 8 | CRT scanlines | `crt` | #9EF0FF on #0F1519 / #2F464E | 7.8:1 | AA |
| 9 | Blueprint | `blueprint` | #FFFFFF on #0D2B5E / #2A4F8F | 8.0:1 | AA |
| 10 | Kraft | `kraft` | #2B2118 on #E9D8B8 | 11.2:1 | AA |
| 11 | Mint | `mint` | #0E3B2A on #CFF5E1 | 10.6:1 | AA |
| 12 | Lilac | `lilac` | #3B2A8C on #E7E0FF | 8.7:1 | AA |
| 13 | Indigo gradient | `indigo` | #FFFFFF on #4F46E5 / #9333EA | 5.4:1 | AA |
| 14 | Coral sunset | `coral` | #FFFFFF on #E04E2E / #B8235A | 4.0:1 | AA graphics only |
| 15 | Paper | `paper` | #111111 on #FFFFFF | 18.9:1 | AA |

## pocket@shell type logo (`wordmark/`)
JetBrains Mono ExtraBold, outlined to paths. The @ is the icon's @ in the theme color; the other letters are one step quieter.
Open `wordmark/sheet.html` (or `sheet.png`) for the full icon sheet: icon sizes, banner and lockups for every color.

- `svg/banner-<name>.svg` + `png/`: wordmark on the icon's own background (1600x520).
- `svg/lockup-<name>-light.svg` / `-dark.svg` + `png/`: icon + wordmark, transparent, for white or dark surfaces.
- `svg/wordmark-<name>-light.svg` / `-dark.svg`: wordmark alone, transparent.

On light surfaces the letters are #111111, on dark #F5F5F5, and the @ is the theme hue adjusted to at least 4.5:1.
On banners the wordmark counts as large text (WCAG AA 3:1); every banner passes, lowest is coral at 4.0:1.
