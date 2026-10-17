A labelled single-line input for the email path and any other text entry.

**Consumer provides:** `label`, `placeholder` (e.g. "name@university.edu"), `value`/`onChange`, and `helper` or `error` text.

- 1px `rule` border on `paper`; 2px `error` border when `error` is set.
- Placeholder in `graphite`; value in `ink` at 16px (prevents mobile zoom).
- `error` replaces `helper`, adds an icon, sets `aria-invalid` and is announced (`role="alert"`). Never signal an error by colour alone.
- The recognized-domain shortcut ("Looks like you're at UT Austin. Continue with your UT EID login.") is an `Alert tone="info"` under the field, not helper text.
