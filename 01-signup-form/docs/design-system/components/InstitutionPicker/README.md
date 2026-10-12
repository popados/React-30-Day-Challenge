The combobox at the heart of sign-up: search a university by name or email domain, pick it, and hand off to its single sign-on.

**Consumer provides:** `institutions` (or pre-filtered `results`) as `{name, domain}`, `onSelect`, and for the hand-off `state="redirecting"` with `redirectTo`, `onCancel`, plus `onRequestInstitution` for the no-match link.

States, with their exact copy:

- **Empty (open, nothing typed):** "Start typing your university or email domain."
- **Results:** name in `ink`, domain in `graphite` at `body-sm`; hovered and active rows on `moss-soft`, the keyboard-active row also ringed in `moss`.
- **No match:** "No match for 'Univ of Westbrook.' Try your email domain, or sign up with email." and a "Request your institution" link.
- **Loading:** three skeleton rows in `paper-deep`; screen readers hear "Searching…".
- **Redirecting:** spinner, "Taking you to University of Texas at Austin…" and a "Cancel" link. Cancel returns to default with the search kept.

Keyboard and screen readers: ↑/↓ move through results, Enter selects, Esc closes; the input carries `role="combobox"`, `aria-expanded`, `aria-activedescendant`, and a polite live region announces the result count. Each row is at least `control-height` tall.
