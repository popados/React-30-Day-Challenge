# Design system audit: Fieldnote sign-up

Oct 12, 2026 · Audited from code and docs, not Figma (the Figma connector isn't signed in)

**Scope:** the seven components in `src/components/`, the tokens in `src/index.css`, the component docs and types in `docs/design-system/components/`, and the [design system spec](fieldnote-signup-design-system.md).

## Summary

**Components reviewed:** 7 | **Issues found:** 16 | **Score:** 74/100 (a judgement, not a formula)

The fundamentals are solid. Every Fieldnote colour, text style and spacing value comes from a token. Controls meet the 44px minimum and show a focus ring. Every component has a README. The gaps are between the **spec and the code**: the spec defines hover and pressed colours, motion values, a Button loading state and several error states that were never built. Code comments also point to doc files that don't exist.

## Naming consistency

| Issue | Where | Recommendation |
| --- | --- | --- |
| Code comments point to `docs/design-system/components/<Name>.md`, but the files are `<Name>/README.md` | All 7 components (e.g. [Button.jsx:1](../src/components/Button.jsx#L1)) | Change the 7 comments to `components/<Name>/README.md` |
| The spec and the code use two token vocabularies (`paper-200`, `moss-50`, `error-50`, `--fn-*` vs `paper-deep`, `moss-soft`, `error-soft`) | Spec §2 vs `index.css` / `tokens.json` | Treat `tokens.json` as the source of truth and add a spec-name to code-name table to spec §2.3 |
| The spec calls it `Notice`; the code calls it `Alert` | Spec §4.6 vs `Alert.jsx` | Rename the spec section to `Alert`, since the code and docs already use that name |
| The spec lists `RedirectStatus`, `DomainShortcut` and `SuccessWelcome` as components; in code they're picker states or `Alert` uses | Spec §4.5, §4.8, §4.9 | Write in the spec that these are compositions, not separate components |

## Token coverage

| Category | Defined | Hardcoded values found |
| --- | --- | --- |
| Colors | 15 tokens, light and dark | **0 in Fieldnote components.** The Google button has 6 hex values and the Apple button 5 raw black/white utilities ([Button.jsx:10-12](../src/components/Button.jsx#L10-L12)). Those follow each provider's branding on purpose, so leave them. **Missing tokens:** `moss-700` and `moss-800` (the spec's hover and pressed colours; the code uses `hover:brightness-92` instead), and the white input fill (`color.bg.input`). |
| Spacing | 4px scale plus `target` and `control` | 4 arbitrary values. `px-[15px]` in [TextField.jsx:25](../src/components/TextField.jsx#L25) compensates for the 2px error border, and `px-[0.15em]` in Highlight; both are justified. `gap-[10px]` and `h-[46px]` belong to the provider buttons. |
| Radius | sm 3, md 8, lg 12 | `rounded-[6px]` on picker rows ([InstitutionPicker.jsx:133](../src/components/InstitutionPicker.jsx#L133)) isn't on the scale |
| Typography | 2 font families, 10 text styles | 0 custom sizes. `font-semibold` on the Alert title is the only weight set outside a text style. |
| Motion | **0** | The spec defines `motion.fast` (120ms), `motion.base` (200ms), an easing, a spinner and a shimmer (§2.8). None are tokens. Components use Tailwind defaults, and the loading skeleton doesn't shimmer. |
| Shadows | None, by design | 0. Borders only, as specified. |

## Component completeness

| Component | States | Variants | Docs | Tests | Score |
| --- | --- | --- | --- | --- | --- |
| Button | ⚠️ Hover uses a filter, not the token. **No pressed or loading state**, though the spec defines `loading` with `aria-busy`. | ✅ 4 | ✅ | ✅ | 6/10 |
| InstitutionPicker | ⚠️ Idle, empty, no match, loading and redirecting work. **Missing:** "search failed" (spec D5) and the 8-second "Still working" line (D8). `aria-controls` points at a list that isn't rendered while it's closed. | n/a | ✅ | ✅ | 7/10 |
| TextField | ⚠️ Default, helper and error work. **Missing:** read-only (email pre-filled from university sign-in). The fill is `paper`, but the spec says white. | n/a | ✅ | ✅ | 7/10 |
| Alert | ✅ error, info, success | ✅ 3 tones | ✅ | ❌ | 7/10 |
| Divider | ✅ | n/a | ✅ | ❌ | 8/10 |
| Highlight | ✅ | n/a | ✅ | ❌ | 8/10 |
| Icon | ✅ 22 icons, decorative or labelled | n/a | ✅ | ❌ | 8/10 |

These spec items aren't built in any form yet: the legal footer (§4.10) and the notebook preview panel (§4.11). The sign-up screen itself doesn't exist yet either.

## Priority actions

1. **Add the missing state tokens and use them.** Add `moss-700`, `moss-800` and an input-fill token to `index.css` and `tokens.json`, and add motion tokens (`--duration-fast`, `--duration-base`, `--ease`). Then give Button real hover and pressed colours. This closes the largest gap between spec and code, and every future component will build on it.
2. **Build the spec's missing states before the screen:**
   - Button `loading`, needed for every redirect.
   - Picker "search failed" plus the 8-second "Still working" line.
   - TextField read-only.

   The spec says to design the picker states first, and the campaign plan's first week depends on the screen working.
3. **Fix the doc pointers and naming.** That means the 7 comment paths, `Notice` vs `Alert`, and a token-name mapping table in the spec. This is cheap and stops the next person, or the Claude Design agent, from following broken references.
4. **Fill the test gaps.** Add tests for Alert (role and icon by tone), Divider, Highlight and Icon (`aria-hidden` vs labelled). Fix the picker's `aria-controls` so it's only set while the list is shown.
5. **Snap the picker row radius to a token:** `rounded-sm` or `rounded-md` instead of `rounded-[6px]`.
