// What changed moving tempest-landing-page.html into React, and why.
// Shown in the side list next to the page.
export const CHANGES = [
  {
    area: 'Logo',
    change: 'Removed the drawn square-and-chevron mark; the name is set as a wordmark.',
    why: 'Tempest Line has no logo yet. The design system says to set the name in Bricolage Grotesque until a real mark exists, and logos are never drawn or approximated.',
  },
  {
    area: 'Colour',
    change:
      'Replaced the extra hex blues (#1E4FA8, #2A63D0, #1B4596, #2152B0, #1C4597), the wave colour and the rgba grid with tokens.',
    why: 'Every colour now comes from the Tempest Line tokens, so all three themes switch from one place. Gradients are mixed from the blueprint token.',
  },
  {
    area: 'Buttons',
    change:
      'The main button uses the action token instead of per-theme CSS overrides, and the band button uses a new highlight variant instead of !important.',
    why: 'The spec already defines action per theme: lime in Blueprint, blueprint blue in Graph Paper and High Contrast. The band stays blue in every theme, so its button stays lime.',
  },
  {
    area: 'Buttons',
    change: 'Hover lift and drop shadow replaced by the action-hover colour; height 56px to 48px.',
    why: 'The spec defines hover as action-hover and buttons at control-height (48px). No motion to switch off, and it still works in High Contrast, which has no shadows.',
  },
  {
    area: 'Theme switch',
    change: 'Theme buttons grew from 32px to 44px tall.',
    why: 'The challenge checklist asks for 44×44px touch targets on mobile.',
  },
  {
    area: 'Shape',
    change:
      'Corner radii 22, 14 and 9px snapped to the token scale (16, 10, 6px); graph-paper squares 34px to 32px; card shadow uses shadow-raised.',
    why: 'Radius, spacing and shadow follow the design system scale, so repeated elements match. shadow-raised is "none" in High Contrast, where borders separate surfaces.',
  },
  {
    area: 'Icons',
    change: 'Hand-drawn SVG icons replaced by Lucide icons through the shared Icon component.',
    why: 'One icon set with one stroke width across the app, coloured by the surrounding text.',
  },
  {
    area: 'Highlighter',
    change:
      'The headline mark uses the shared Highlight component (a solid fill) instead of a gradient band.',
    why: 'One highlighter style across the project, used the same way as on the Minutely page.',
  },
  {
    area: 'Accessibility',
    change:
      'The worked problem now announces "Done" for the finished step and marks the current step with aria-current.',
    why: 'The source showed step status only with a tick and an outline, which screen readers do not announce.',
  },
  {
    area: 'Accessibility',
    change: 'Bento headings "Covers" and "For parents" changed from h4 to h3.',
    why: 'They sit under the "How it works" h2, so h4 skipped a level in the heading outline.',
  },
  {
    area: 'Code',
    change:
      'The theme lives in React state on the page wrapper, saved to localStorage inside try/catch, instead of a script setting <html data-skin>.',
    why: 'React owns the state, and the theme stays on this page instead of leaking into the Minutely page at "/".',
  },
  {
    area: 'Layout',
    change:
      'Media-query breakpoints became container queries; the inline style on the quote became a class.',
    why: 'The page adapts to its own width, so it lays out correctly beside this list or full width. No inline styles in components.',
  },
]

// Left as in the source on purpose, but worth a decision.
export const KEPT = [
  'Bracketed placeholders ([250,000], [4.8], quotes and logos) until real figures exist.',
  'The same stats appear in both the proof strip and the bento.',
  '"Log in" and "Pricing" point to anchors with nothing behind them, and "Start free" only scrolls to the closing band.',
]
