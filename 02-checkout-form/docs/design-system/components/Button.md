Buttons start sign-up: one Moss primary per screen, Google and Apple in their providers' own styles, every other choice a secondary outlined in Rule.

**Consumer provides:** the label (sentence case, "Continue with …"), an `onClick`, and an `icon`: a Lucide `Icon`, or for provider buttons the official logo file from the Logos asset group.

- `variant="primary"` — Moss fill, `on-moss` label. On sign-up: "Continue with your institution", with the `landmark` icon.
- `variant="secondary"` (default) — Paper fill, 1px `rule` outline, `ink` label: "Continue with email" (`mail` icon).
- `variant="google"` — "Continue with Google" with `google-g.svg` at 20px, unscaled. Google's colours, not ours: light #FFFFFF fill, 1px #747775 stroke, #1F1F1F text; dark #131314 fill, #8E918F stroke, #E3E3E3 text; 12px left of the logo, 10px between logo and text.
- `variant="apple"` — "Continue with Apple" with `apple-left-black-medium.svg` as the icon, flush left at the button's full height. Apple's styles: white with black outline on light grounds, white on dark grounds — the black logo tile works in both themes.
- `block` in the sign-up card; stack with `space-3` between buttons. Height is `control-height` (48px); never below `target-min` (44px).
- Focus shows the 2px `focus-ring`, offset 2px.
- Provider logos are decorative (`alt=""`); the label names the provider. Never recolour, crop, outline or resize the logos.
- Not yet matched: Google specifies Google Sans Medium 14/20 for its button text and Apple the system font (San Francisco); these buttons use Inter 16 like the rest of the screen. Switch the two provider labels to those fonts if strict compliance is needed.

Don't put white text on Highlighter, use Highlighter as a button fill, or place two primaries side by side.
