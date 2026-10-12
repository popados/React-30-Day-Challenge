# PRD: Social Sign-Up (Google, Apple, Microsoft)

Oct 11, 2026 · @nik

This PRD adds "Continue with Google / Apple / Microsoft" to an existing email + password sign-up, so new users can create an account without making a password. It is written as a reusable template: anything in **\[brackets\]** is a placeholder for your product's own name, numbers or decisions.

**Scope at a glance:** v1 ships three social providers on the sign-up and sign-in screens, safe matching to existing accounts, and the error states around them. Email + password stays. Passkeys and enterprise SSO are designed for but not built.

## Problem Statement

Every new \[Product\] user must invent, type and later remember a password before they see any value, and many quit at that step. Industry data puts typical SaaS sign-up drop-off around 64%, and products that add social login report roughly 20% more sign-ups ([Eleken, 2026](https://www.eleken.co/blog-posts/sign-up-flow)). Passwords also hurt returning users: 19% of account holders in Baymard's research couldn't finish checkout because they had forgotten their login ([Amazon Pay / Baymard](https://pay.amazon.com/us/blog/the-baymard-report-series-how-forcing-sign-ups-drives-down-sales)).

**Who is affected:** first-time visitors on mobile, where typing a strong password is slowest, and returning users who forget credentials.

**Cost of not solving it:** \[X\]% of visitors who open sign-up never finish today; at \[Y\] sign-up starts per month, that is \[Z\] lost accounts. Fill in from your analytics before review.

**Evidence to attach:** \[sign-up funnel by step\], \[password-reset volume per month\], \[support tickets tagged "can't log in"\].

## Goals

Success means more people finish sign-up, faster, without creating duplicate or insecure accounts.

1. **More completed sign-ups (business):** raise sign-up completion from \[baseline\]% to \[baseline × 1.15\]% within 30 days of full rollout.
2. **Faster account creation (user):** median time from first tap to account created under 15 seconds on the social path.
3. **Real adoption (user):** at least 30% of new accounts use a social provider within 30 days.
4. **Fewer login problems (business):** password-reset requests and "can't log in" tickets per 1,000 active users down \[20\]% within 90 days.
5. **No account mess (guardrail):** duplicate accounts stay under 1% of new sign-ups.

## Non-Goals

These are deliberately out of v1 to keep it shippable.

- **Passkeys.** Platform guidance now favours passkey-first sign-up ([Android](https://developer.android.com/design/ui/mobile/guides/patterns/passkeys), [FIDO](https://fidoalliance.org/design-guidelines/patterns/new-account-creation-with-a-passkey/)), but it is its own UX and recovery project. v1 must not block it (see P2).
- **Enterprise SSO (SAML / per-company OIDC).** Different buyer, admin setup and contracts; a separate spec.
- **More providers (GitHub, Facebook, LinkedIn, X).** Add only when audience data justifies them.
- **Removing email + password.** Some users won't link an identity provider; the existing path stays as is.
- **Post-sign-up onboarding changes.** Users land in today's first onboarding step; redesigning it is separate.
- **Using provider data beyond identity.** No contact import, no profile enrichment, no marketing use of provider data.

## User Stories

Ordered by priority within each persona.

**New visitor**

1. As a new visitor, I want to sign up with the Google, Apple or Microsoft account I already use, so that I don't have to create and remember another password.
2. As a new visitor, I want to know what the provider will share before I continue, so that I feel safe granting access.
3. As an Apple user who hides my email, I want my account to work with Apple's private relay address, so that my real email stays private.
4. As a new visitor who would rather not link a provider, I want email + password to remain available, so that I still have a choice.

**Returning user**

5. As someone who signed up with email + password, I want "Continue with Google" on the same email to lead into my existing account after I prove it's me, so that I don't end up with two accounts.
6. As a returning user who signed up with a provider, I want to sign in with one tap on that provider, so that getting back in is as fast as signing up.
7. As a returning user who forgot how I signed up, I want a clear pointer to the method my account uses, so that I'm not stuck guessing.

**Account holder**

8. As an account holder, I want to see, add and remove sign-in methods in settings, so that I stay in control of how I log in.

**Support agent**

9. As a support agent, I want to see which sign-in methods an account has, so that I can resolve "can't log in" tickets quickly.

**Edge cases**

10. As a visitor who cancels on the provider's consent screen, I want to land back on sign-up with my options intact, so that I can pick another method without an error.
11. As a visitor whose provider returns no email or an unverified one, I want to be asked for my email and verify it, so that my account is still recoverable.
12. As a visitor during a provider outage, I want a plain explanation and the email option, so that I'm never at a dead end.

## Requirements

Ten must-haves make v1; the riskiest is R3, matching a provider sign-in to an account that already exists.

&#91;embedded content: provider sign-up flow · 3 decisions\]

Every branch ends signed in or back at sign-up with options intact; only an email that already has an account asks for proof before linking.

### Must-Have (P0)

**R1. Provider buttons on sign-up and sign-in.** "Continue with Google", "Continue with Apple" and "Continue with Microsoft" sit above the email form, separated by an "or" divider, in the same order on both screens. Each follows its provider's branding rules.

- [ ] Buttons render on web (desktop + mobile) at the same position on sign-up and sign-in
- [ ] Tap targets are at least 44 × 44 px; buttons are reachable by keyboard with a visible focus state
- [ ] Screen readers announce each button by provider name and action
- [ ] The email + password form still works exactly as before

**R2. New account from a provider.** Standard OAuth 2.0 / OpenID Connect, requesting only `openid`, `email` and `profile`. The account is created with the provider's verified email and no password.

- [ ] Given a visitor with no account, when they approve the provider's consent, then an account is created and they land on \[first onboarding step\] with no extra form
- [ ] Name is prefilled from the provider and editable later
- [ ] No password is set; the account record shows the provider as its sign-in method

**R3. Matching existing accounts safely.** If the provider's verified email matches an existing email + password account, never create a duplicate and never link silently.

- [ ] Given an existing account on the same email, when the user continues with a provider, then they are asked to confirm with their password or an emailed code before linking
- [ ] After confirmation, the provider is linked and the user is signed in to the original account
- [ ] Unverified provider emails are never used to match or link

**R4. Apple private relay emails.** Accounts created with a relay address work like any other.

- [ ] The relay address is stored as the account email
- [ ] Transactional email reaches relay users (sending domains registered with Apple)

**R5. Missing or unverified email.** If the provider returns no email, or an unverified one, ask for an email and verify it before the account is usable.

**R6. Cancel and error states.** No path ends at a blank or raw error page.

- [ ] Cancel on the consent screen returns to sign-up with a neutral note and all options intact
- [ ] Provider errors or outages show a plain explanation and point to the email option
- [ ] Errors never reveal whether an email already has an account (see Open Questions)

**R7. Consent and terms.** One line under the buttons covers every method: "By continuing, you agree to the \[Terms\] and \[Privacy Policy\]." Marketing opt-in, if any, is a separate unchecked choice.

**R8. Returning sign-in.** A provider-created account signs in through the same provider button; no password prompt appears for it.

**R9. Analytics events.** Fire `signup_started`, `provider_redirect`, `provider_return` (success / cancel / error), `account_created` and `account_linked`, each tagged with method and platform. Success Metrics depend on these.

**R10. Security basics.** PKCE and `state` on every redirect, nonce checks, ID token signature and audience validation, and redirect URIs on an allow-list.

### Nice-to-Have (P1)

- **Manage sign-in methods in settings:** add or remove providers; removing the last method is blocked.
- **"Last used" hint:** mark the button this device used last time, so returning users pick the right one.
- **Native mobile sheets:** Sign in with Apple on iOS and Google's account picker on Android instead of a web redirect.
- **Support view:** show an account's sign-in methods and link dates in the support tool.

### Future Considerations (P2)

- **Passkeys** as another sign-in method on the same account.
- **Enterprise SSO,** routed by email domain from the email field.
- **More providers** as audience data supports them.
- **Design implication now:** store sign-in methods as separate credential records linked to one user, not as columns on the user row, so P2 needs no migration.

## Sign-Up Fields

The social path needs zero typed fields in the common case; the email path keeps today's two required fields plus consent. Everything else is asked later or not at all.

| Field | Email + password path | Social path | Rule |
| --- | --- | --- | --- |
| Email | Required, typed | From provider, already verified; Apple may return a relay address | Ask only if the provider returns none or an unverified one (R5) |
| Password | Required; rules shown before typing, show/hide toggle | None | No "confirm password" field |
| Terms + privacy consent | One line under the button | Same line | Never a pre-ticked box (R7) |
| Full name | Optional; one field, not first/last | Prefilled from provider, editable | Only if the product displays it |
| Marketing opt-in | Optional, unchecked | Same | Separate from terms consent |
| Date of birth / age | Only if legally required | Not supplied by providers; ask only if legally required | Skip unless the law demands it |
| Phone | Only if it is a login or 2FA method | Same | Not on the sign-up screen otherwise |
| Company, role, team size | After sign-up, in onboarding | Same | Never a sign-up blocker |

**Why so few:** in one test a 5-field form converted at 13.4% versus 10% for a longer one ([Convertica](https://convertica.org/form-design/)), and cutting a form from four fields to three lifted conversion by roughly 50% ([Eleken](https://www.eleken.co/blog-posts/sign-up-flow)). Sensitive fields cost the most: 35% of shoppers said a required birthdate would make them strongly reconsider, and 11% said the same of gender ([Amazon Pay / Baymard](https://pay.amazon.com/us/blog/the-baymard-report-series-how-forcing-sign-ups-drives-down-sales)).

**Never on this screen:** confirm-password, a separate username (unless public-facing), gender, and visible CAPTCHAs where an invisible check works.

## Design Principles

Ten principles govern every screen in this flow; design review checks each one before handoff.

1. **Ask for less, and ask later.** Every field must earn its place; collect secondary details in onboarding or a follow-up step. ([fomr.io](https://fomr.io/blog/form-design-tips-to-boost-completion-rates), [ProfileTree](https://profiletree.com/better-form-design/))
2. **Get people to value fast.** Don't block entry on email verification; let users in and remind them to verify later. The best flows reach a value moment before collecting data. ([Eleken](https://www.eleken.co/blog-posts/sign-up-flow), [925Studios](https://www.925studios.co/blog/sign-up-flow-examples-that-convert))
3. **One column, labels above fields.** Stack fields vertically and keep labels visible; placeholder-only labels disappear as people type. ([fomr.io](https://fomr.io/blog/form-design-tips-to-boost-completion-rates), [ProfileTree](https://profiletree.com/better-form-design/))
4. **Validate inline and explain kindly.** Check each field as the user leaves it, not after submit. State password rules before typing, as helper text under the field. ([fomr.io](https://fomr.io/blog/form-design-tips-to-boost-completion-rates), [City of Winnipeg design system](https://www.winnipeg.ca/designsystem/form-templates/sign-up))
5. **Make the path unmistakable.** Users should never wonder whether they are signing up or logging in; label actions "Create account" vs "Log in". ([Authgear](https://www.authgear.com/post/login-signup-ux-guide/))
6. **Design mobile-first.** Single column, large tap targets, the right keyboard per field (email keyboard, number pad), and `autocomplete` attributes so password managers and autofill work. ([fomr.io](https://fomr.io/blog/form-design-tips-to-boost-completion-rates))
7. **Show progress in multi-step flows.** A "Step 2 of 3" indicator sets expectations and reduces drop-off. ([Eleken](https://www.eleken.co/blog-posts/sign-up-flow))
8. **Build trust at the point of hesitation.** No credit card for trials, a short line on how the email will be used, and social proof near the button. ([Eleken](https://www.eleken.co/blog-posts/sign-up-flow))
9. **Meet WCAG AA.** Proper label associations, keyboard navigation, 4.5:1 text contrast and clear error messages. Check brand colors: white text on Spotify Green (#1ed760) is 1.9:1 and on Duolingo green (#58cc02) 2.1:1, both failing. ([Eleken](https://www.eleken.co/blog-posts/sign-up-flow); ratios computed with the WCAG formula)
10. **Confirm success.** End with a clear "account created" moment; FIDO's research found that dropping people back without confirmation left them unsure an account existed. ([FIDO Alliance](https://fidoalliance.org/design-guidelines/patterns/new-account-creation-with-a-passkey/))

**Seen in the wild:** Duolingo runs a lesson before asking for an account ([UX Planet](https://uxplanet.org/duolingo-ux-analysis-9631ff3f4eb1)); Notion and Slack skip passwords with emailed codes ([UX Hunt](https://uxhunt.browsee.io/story/four-simple-yet-effective-sign-up-flows), [Slack Help](https://api.slack.com/help/articles/206845317-Create-a-Slack-workspace)); Spotify defers personalization to an artist picker after sign-up ([Inclusive Bytes](https://hoot.inclusivebytes.org/tutorials/how-to-set-up-spotify/)).

## Success Metrics

The headline metric is sign-up completion rate; the rest explain why it moved and guard against side effects. All come from the R9 events unless noted.

| Metric | Type | Success target | Stretch | Read at |
| --- | --- | --- | --- | --- |
| Sign-up completion rate (started → account created) | Leading | +15% relative to \[baseline\] | +25% | 2 weeks, 30 days |
| Share of new accounts using a provider | Leading | ≥ 30% | ≥ 50% | 30 days |
| Provider round-trip success (redirect → account) | Leading | ≥ 90% | ≥ 95% | 2 weeks |
| Cancel rate on provider consent screen | Leading | ≤ 15% | ≤ 10% | 2 weeks |
| Median time to account, social path | Leading | < 15 s | < 10 s | 2 weeks |
| Duplicate accounts per 100 new sign-ups (guardrail) | Leading | < 1 | < 0.5 | 30 days |
| Day-7 activation, social vs email sign-ups | Lagging | Social ≥ email | Social +5 pts | 90 days |
| Password-reset + login tickets per 1,000 active users | Lagging | −20% vs \[baseline\] | −35% | 90 days |

**How to measure:** roll out behind a feature flag with a \[10\]% holdout that sees today's flow, so the completion lift is measured against a control, not against last month. Ticket counts come from \[support tool\] tags.

## Open Questions

Four questions block the build; the rest can be settled during it.

**Blocking (answer before build starts)**

- [ ] **Security + Eng:** When a provider's verified email matches an existing account, do we always require the password or emailed code (R3 as written), or trust some providers' verified emails enough to link directly?
- [ ] **Security + Design:** Should sign-in tell a user "this account uses Google" (helpful) at the cost of revealing that an email has an account (enumeration risk)?
- [ ] **Eng:** Does today's user model support several sign-in methods per user, or is a credential table migration needed first?
- [ ] **Legal:** What changes to the privacy policy and data-processing disclosures does provider sign-in require? For iOS apps, what do Apple's App Store login-service rules require?

**Non-blocking (resolve during build)**

- [ ] **Data:** Baselines for every \[bracketed\] target, and which providers our users already use, to set button order.
- [ ] **Eng:** Microsoft: personal accounts only, work/school accounts too, or both?
- [ ] **Design:** Exact copy for cancel, error and "confirm it's you" screens.
- [ ] **Eng:** Lead time for provider app registration and any branding or consent-screen review.

## Timeline Considerations

Ship in three phases so the riskiest piece, account matching, goes live on the smallest surface first.

1. **Phase 1: Google + Apple on web.** All P0 requirements for these two providers, behind a feature flag. Ramp \[10% → 50% → 100%\] of traffic while watching round-trip success and the duplicate-account guardrail.
2. **Phase 2: Microsoft, native mobile sheets, settings.** Add the third provider and the P1 items once Phase 1 metrics hold for \[2\] weeks.
3. **Phase 3: Passkeys and enterprise SSO.** Separate specs, built on the credential model from R2/R3.

**Dependencies**

- Provider developer accounts and app registrations (Google Cloud, Apple Developer, Microsoft Entra), including any branding or consent-screen review.
- Apple private relay: sending domains registered before Apple sign-in goes live.
- Legal sign-off on privacy disclosures (blocking question above).
- Analytics events (R9) live before the ramp, so the holdout comparison is valid.

**Hard deadlines:** \[none known; add any contract, launch or compliance dates here\].

## Sources

- [Eleken: 15 Sign Up Flow Examples (2026)](https://www.eleken.co/blog-posts/sign-up-flow)
- [925Studios: 20 Sign Up Flow Examples (2026)](https://www.925studios.co/blog/sign-up-flow-examples-that-convert)
- [Amazon Pay: The Baymard Report Series on forced sign-ups](https://pay.amazon.com/us/blog/the-baymard-report-series-how-forcing-sign-ups-drives-down-sales)
- [Convertica: Form design best practices](https://convertica.org/form-design/)
- [fomr.io: 12 Form Design Best Practices](https://fomr.io/blog/form-design-tips-to-boost-completion-rates)
- [ProfileTree: Best Practices for Better Form Design](https://profiletree.com/better-form-design/)
- [City of Winnipeg design system: Sign up form template](https://www.winnipeg.ca/designsystem/form-templates/sign-up)
- [Authgear: Login & Signup UX Guide](https://www.authgear.com/post/login-signup-ux-guide/)
- [Android Developers: Passkeys design guidance](https://developer.android.com/design/ui/mobile/guides/patterns/passkeys)
- [FIDO Alliance: New account creation with a passkey](https://fidoalliance.org/design-guidelines/patterns/new-account-creation-with-a-passkey/)
- [UX Planet: Duolingo UX Analysis](https://uxplanet.org/duolingo-ux-analysis-9631ff3f4eb1)
- [UX Hunt: Four Simple Yet Effective Sign Up Flows](https://uxhunt.browsee.io/story/four-simple-yet-effective-sign-up-flows)
- [Slack Help: Create a Slack workspace](https://api.slack.com/help/articles/206845317-Create-a-Slack-workspace)
- [Inclusive Bytes: How to set up Spotify](https://hoot.inclusivebytes.org/tutorials/how-to-set-up-spotify/)
