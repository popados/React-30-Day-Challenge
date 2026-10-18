An inline message with an icon and words — for SSO errors, the recognized-domain shortcut and the success confirmation.

**Consumer provides:** `tone`, the message, optional `title` and `action`.

- `tone="error"` — `error` icon on `error-soft`, `ink` text, `role="alert"`. E.g. "UT Austin didn't share your email address. Enter it below to finish." / "UT Austin isn't on Fieldnote SSO yet. Sign up with your .edu email — we'll link it when they join."
- `tone="info"` — `moss` icon on `moss-soft`. E.g. "Looks like you're at UT Austin. Continue with your UT EID login."
- `tone="success"` — check icon. E.g. title "Welcome, Maya." with "You're signed in through UT Austin."

Every tone pairs an icon with text; colour is never the only signal.
