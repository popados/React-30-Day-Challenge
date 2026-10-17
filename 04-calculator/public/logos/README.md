# Provider logos

The `google` and `apple` Button variants need the official logo files. They are
not bundled here: copy them unchanged from the Fieldnote design system's Logos
group (or from the providers' own sources) into this folder:

- `google-g.svg`: Google's four-colour "G", from developers.google.com/identity/branding-guidelines
- `apple-left-black-medium.svg`: Apple's "Logo - SIWA - Left-aligned - Black - Medium", from developer.apple.com/design/resources

Then use them as the button icon, decorative (`alt=""`), never resized or recoloured:

```jsx
<Button variant="google" block icon={<img src="/logos/google-g.svg" alt="" />}>
  Continue with Google
</Button>
<Button variant="apple" block icon={<img src="/logos/apple-left-black-medium.svg" alt="" />}>
  Continue with Apple
</Button>
```

See `docs/design-system/assets/Logos.md` and `docs/design-system/components/Button.md`.
