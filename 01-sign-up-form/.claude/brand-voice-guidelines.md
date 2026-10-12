# Fieldnote Brand Voice Guidelines

## Generation Metadata

- Created: 2026-10-11
- Version: 1
- Replaces: none (first version)
- Sources: design-system README (content fundamentals), component READMEs (Alert, Button, Divider, Highlight, Icon, InstitutionPicker, TextField), the sign-up design spec, the editorial sign-up mockup, shipped UI copy in `src/`, the social sign-up PRD (template), the project README
- Documents processed: 8 source groups (about 35 files)
- Conversations analyzed: 0. These guidelines are document-only: no sales calls, support threads or meeting notes were available.
- Discovery report used: No
- Overall confidence: **Medium** (0.80; see [Confidence Scores](#confidence-scores))

**About the examples.** The source documents use a real university in their examples, and the brand rule says to swap real names for fictional ones before anything is published. These guidelines follow that rule. Examples use the fictional **Northfield University** (short form "Northfield"), which the project's tests already use, and "Maya" (a fictional sample user).

---

## Executive Summary

Fieldnote is a notes and citation workspace for graduate students, faculty and research staff. Reading notes, highlights and sources are kept together in notebooks tied to a project or thesis. The voice matches the look, a quiet paper notebook. It sounds like a helpful colleague in the department library: calm, plain-spoken, exact, and never in a hurry to sell you anything.

What makes the voice distinctive is restraint paired with precision. Fieldnote uses no exclamation marks, no emoji, no hype and no IT jargon. It is also never vague. It names the reader's institution ("Taking you to Northfield University…"), uses plain, specific numbers ("1,200+ institutions"), and every button says where it goes ("Continue with your institution"). When something goes wrong, Fieldnote says what happened and what to do next in one or two short sentences, and it never blames the reader.

Content should leave a researcher feeling oriented and unhurried, as if someone competent has thought ahead about their path. The reader is always "you". Fieldnote says "we" only when it makes a promise ("we'll link it when they join").

---

## We Are / We Are Not

Voice is constant. It doesn't change by channel or audience.

| We Are                                                                     | We Are Not                                                                            |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Plain-spoken**: everyday words a researcher already uses                 | **Technical or IT-flavoured**: "IdP", "SSO provider", "authenticate", "provision"     |
| **Calm and reassuring**: problems are stated evenly and fixed quickly      | **Alarmist or blaming**: "Invalid input!", "You failed to…", urgency for its own sake |
| **Specific**: name the institution, the number and the destination         | **Generic or vague**: "your provider", "many schools", "Click here", "Submit"         |
| **Scholarly and understated**: quiet confidence, like a good library       | **Hype or salesy**: exclamation marks, emoji, "supercharge", "revolutionary"          |
| **Concise and action-led**: one or two short sentences, verb-first buttons | **Wordy or explanatory**: paragraphs where a line will do, passive hedging            |
| **Collegial**: second person, contractions, a peer's warmth                | **Corporate or institutional**: "Users must…", "The account holder…", stiff formality |
| **Always a way forward**: every error or edge case offers a next step      | **A dead end**: errors that stop without a path, or "Something went wrong." alone     |

### Voice Attributes Detail

#### 1. Plain-spoken

- **What it means**: Write in the words researchers use about their own lives (university, login, email, notes, sources), not the vocabulary of identity systems or enterprise software.
- **How it shows up**: Use "your university login" instead of "SAML credentials". Use "your institution" instead of "your IdP". Use "No new password" instead of "passwordless authentication".
- **What to avoid**: Jargon from authentication, IT or SaaS marketing, and acronyms the reader didn't introduce.
- **Evidence**: "Name the institution, never 'your IdP' or 'SSO provider'" (design-system README, Content fundamentals). Mockup value bullets: "No new password. Sign in with your university login." and "Use the login you already have at your university."
- **Confidence**: High

#### 2. Calm and reassuring

- **What it means**: Problems are framed as states to resolve, not as the reader's mistakes. Fieldnote sounds steady even when an integration fails.
- **How it shows up**: Use neutral verbs ("didn't share", "isn't on … yet", "isn't working right now"). Use no red-alert wording, and keep the colour from carrying the meaning alone: every error has an icon and words.
- **What to avoid**: Blame ("You entered…"), alarm ("Error!", "Failed!"), and urgency that hasn't been earned.
- **Evidence**: "Errors … never blame the user" (README). The spec treats a missing SSO integration as "a missing integration, not a user mistake." "Northfield isn't on Fieldnote SSO yet. Sign up with your .edu email — we'll link it when they join." (Alert component copy, institution swapped; the word "SSO" is under review, see Q3)
- **Confidence**: High

#### 3. Specific

- **What it means**: Concrete nouns and real numbers beat abstractions. The reader always knows exactly which institution, which action and where they will end up.
- **How it shows up**: Name the institution in loading and error states. Give plain numbers ("1,200+ institutions"). Button labels say where they go ("Continue with email", "Create your first notebook").
- **What to avoid**: "your provider", "a lot of", "Submit", "OK", "Click here", "Learn more" with no object.
- **Evidence**: "Buttons start with a verb and say where they go" and "Plain, specific numbers" (README). "Taking you to Northfield University…" (InstitutionPicker copy, swapped).
- **Confidence**: High

#### 4. Scholarly and understated

- **What it means**: Confidence comes from substance, not volume. The tone suits people who read footnotes.
- **How it shows up**: Use sentence case everywhere, with no exclamation marks and no emoji. Make modest, factual claims ("Your library access carries over."). Use academic texture in examples (theses, chapters, citations, highlights).
- **What to avoid**: Growth-marketing energy, superlatives, emoji, Title Case Headlines, and "!" anywhere.
- **Evidence**: "Sentence case everywhere — headings, buttons, links. No exclamation marks, no emoji." (README). The sample notebook "Thesis: Urban heat islands, Ch. 2" and its cited quote (spec, HomePage).
- **Confidence**: High

#### 5. Concise and action-led

- **What it means**: Say it in the fewest words that stay clear. Lead with the action.
- **How it shows up**: Errors are one or two short sentences: what happened, then the next step. Loading and empty states are a single line ("Searching…", "Start typing your university or email domain.").
- **What to avoid**: Preambles ("Unfortunately, it seems that…"), restating the obvious, multi-paragraph alerts.
- **Evidence**: "Errors say what happened and the next step in one or two short sentences" (README). The picker's empty and loading copy (InstitutionPicker README).
- **Confidence**: High

#### 6. Collegial

- **What it means**: Fieldnote talks to a researcher the way a helpful peer would. It is direct and warm, and it doesn't fawn.
- **How it shows up**: Address the reader as "you". Use contractions ("didn't", "isn't", "you're", "we'll"). Greet by first name on success ("Welcome, Maya.").
- **What to avoid**: Third-person, rule-book phrasing ("Users must…"), over-familiarity ("Hey there!"), and gushing.
- **Evidence**: "Write to the researcher as 'you'" (README). Contractions appear consistently across component and spec copy. "Welcome, Maya. You're signed in through Northfield."
- **Confidence**: Medium. Contractions are a consistent pattern but not a written rule.

#### 7. Always a way forward

- **What it means**: No screen strands the reader. Every failure, empty result or unsupported case offers a concrete alternative in the same place.
- **How it shows up**: "Try your email domain, or sign up with email." "Sign up with email instead." Success leads straight to "Create your first notebook" or "Import from Zotero" rather than an empty dashboard.
- **What to avoid**: Errors without a next step, and empty states that just say "Nothing here."
- **Evidence**: "Every error state offers a next step in the same view; no dead ends." (spec §1). Picker no-match and outage copy (spec §4.3).
- **Confidence**: High

---

## Brand Personality

- **Archetype**: The Reference Librarian. Knows exactly where everything is, speaks quietly, gets you there without fuss, and never makes you feel foolish for asking.
- **If our brand were a person**: A senior grad student or research librarian who has helped hundreds of people find their footing. They are precise about names and sources, warm without small talk, and allergic to buzzwords. They'd write "Your library access carries over." and never "Unlock seamless access!"
- **Core values expressed in voice**: respect for the reader's time, accuracy, trust and transparency ("Access starts and ends with your enrollment."), calm competence, and scholarly care.

---

## Messaging Framework

### Primary Value Proposition

Your research notes, sources and highlights in one place, with sign-in through the university you already belong to.

Variations observed:

- "Your research notes, in one place" (editorial mockup headline; shipped home page heading)
- "a notes and citation workspace for graduate students, faculty and research staff: reading notes, highlights and sources kept together in notebooks tied to a project or thesis" (design-system README)
- "Free for students and researchers at 1,200+ institutions" (mockup subhead; README example)

### Key Message Pillars

#### Pillar 1: Everything in one place

- Core idea: Notes sit beside their sources, organised into notebooks for a project or thesis.
- When to use: headlines, onboarding, the sample-notebook panel, first-run states.
- Example phrasing: "Your research notes, in one place" · "Reading notes sit beside their sources." (sample notebook panel, HomePage.jsx)

#### Pillar 2: Your university login, nothing new

- Core idea: Sign in through your institution, with no extra password to manage.
- When to use: sign-up and sign-in screens, the institution picker, onboarding emails.
- Example phrasing: "No new password. Sign in with your university login." · "Use the login you already have at your university."

#### Pillar 3: Built for academic life

- Core idea: Fieldnote fits how researchers already work: library access, enrollment, citations, Zotero.
- When to use: value bullets, the success state, import flows.
- Example phrasing: "Your library access carries over." · "Import from Zotero"

#### Pillar 4: Free and widely available

- Core idea: There is no cost barrier for students and researchers at participating institutions.
- When to use: the sign-up subhead and any acquisition copy.
- Example phrasing: "Free for students and researchers at 1,200+ institutions"
- Note: this is a factual claim. Confirm the number and terms before publishing (see Open Questions).

#### Pillar 5: Clear about access and trust

- Core idea: Say plainly what happens to the reader's access and data.
- When to use: the terms line, account linking, leaving an institution.
- Example phrasing: "Access starts and ends with your enrollment." · "By continuing, you agree to Fieldnote's Terms and Privacy Policy."

### Competitive Positioning

No competitive positioning appears in the sources. (The PRD names other consumer apps only as sign-up UX references, not as competitors.) See Open Questions.

---

## Tone-by-Context Matrix (Confidence: Medium)

Voice is constant, and tone flexes by context. The in-product rows rest on explicit guidance. The rows marked † have no source material and are extrapolated from the voice, so treat them as provisional.

| Context                                            | Formality   | Energy        | Technical Depth | Key Principle                                             |
| -------------------------------------------------- | ----------- | ------------- | --------------- | --------------------------------------------------------- |
| Sign-up and marketing headlines                    | Medium      | Medium        | Low             | Quiet confidence: one clear promise, no hype              |
| Buttons and links                                  | Medium      | Medium        | Low             | Verb plus destination, sentence case                      |
| Errors                                             | Medium      | Low (calm)    | Low             | What happened, then the next step; never blame            |
| Loading and redirect                               | Medium      | Low           | Low             | Name where they're going; offer a way out (Cancel)        |
| Success and onboarding                             | Medium-Low  | Medium (warm) | Low             | Greet by name, then point to the first useful action      |
| Empty states and helper text                       | Medium      | Low           | Low             | One line that tells the reader what to type or do         |
| Legal and terms line                               | Medium-High | Low           | Low             | Short, plain, links to the full documents                 |
| Transactional email †                              | Medium      | Low-Medium    | Low             | One purpose per email, institution named, clear next step |
| Institutional partnership outreach and proposals † | High        | Medium        | Medium-High     | Specific facts and numbers, no superlatives               |
| Social media †                                     | Medium-Low  | Medium        | Low             | Show a real research moment; still no emoji or "!"        |

### Context-Specific Guidelines

#### Errors

- **Overall tone**: Calm, neutral, helpful.
- **Structure**: Sentence 1 says what happened, naming the institution or the input. Sentence 2 gives the next step.
- **Do's**: Name the institution. Offer an alternative path in the same view. Pair with an icon and words, never colour alone.
- **Don'ts**: Blame ("You entered an invalid…"), show raw system messages or error codes, write "Oops!", "Error!" or exclamation marks.
- **Example**: "Northfield didn't share your email address. Enter it below to finish."

#### Loading and redirect

- **Overall tone**: Steady and informative.
- **Do's**: Name the destination ("Taking you to Northfield University…"). Use the ellipsis character (…). Keep a Cancel link. If it takes long, say what to check.
- **Don'ts**: Leave a bare spinner with no words, or write "Please wait…" with no context.
- **Example**: "Still working. Check for a pop-up or new tab."

#### Success and onboarding

- **Overall tone**: Warm and brief.
- **Do's**: Greet by first name with a full stop, not "!". Confirm how they're signed in. Offer the first useful action.
- **Don'ts**: Celebration copy ("You're all set! 🎉"), or landing on an empty dashboard with nothing to do.
- **Example**: "Welcome, Maya. You're signed in through Northfield." Then the buttons "Create your first notebook" and "Import from Zotero".

#### Sign-up and marketing headlines

- **Overall tone**: Understated, editorial.
- **Do's**: Use one idea per headline, sentence case, and value bullets that are short factual sentences.
- **Don'ts**: Superlatives, exclamation marks, emoji, Title Case, vague promises.
- **Example**: "Your research notes, in one place". The subhead is "Free for students and researchers at 1,200+ institutions".

#### Transactional email †

- **Overall tone**: Plain and specific, like a note from the library desk.
- **Do's**: Write a subject line that states the purpose ("Your Fieldnote account is linked to Northfield"). Use one call to action that starts with a verb.
- **Don'ts**: Marketing upsells in transactional mail, or "Dear user".
- **Example**: "Your account is linked to Northfield University. Sign in with your university login from now on."

#### Institutional partnership outreach and proposals †

- **Overall tone**: Formal, factual, respectful of the institution's time.
- **Do's**: Lead with the specific benefit to their researchers. Cite real numbers. Be explicit about access and privacy.
- **Don'ts**: Hype, unverified claims, IT jargon aimed at faculty readers. Whether SSO and SAML are acceptable with university IT audiences is an open question (Q6).
- **Example**: "Researchers at Northfield could sign in to Fieldnote with their university login, and their library access would carry over."

#### Social media †

- **Overall tone**: Quiet, observational, research-flavoured.
- **Do's**: Show a real notebook moment (a highlight, a citation). Keep it short.
- **Don'ts**: Emoji, exclamation marks, trend-chasing, engagement bait.
- **Example**: "A highlight, its source and your note on it, on one page."

---

## Terminology Guide (Confidence: High)

### Must-Use Terms

| Term                               | Usage                                                                      | Instead Of                                                  | Example                                                             |
| ---------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| institution / university (by name) | The organisation the reader signs in through. Name it whenever it's known. | "IdP", "SSO provider", "identity provider", "your provider" | "Taking you to Northfield University…"                              |
| Continue with [X]                  | Label pattern for every sign-in option                                     | "Sign in with", "Log in via", "Submit"                      | "Continue with your institution"                                    |
| Fieldnote                          | Product name: one word, capital F, never "FieldNote" or "Field Note"       | "the app", "the platform"                                   | "By continuing, you agree to Fieldnote's Terms and Privacy Policy." |
| sentence case                      | All headings, buttons and links                                            | Title Case                                                  | "Create your first notebook"                                        |

### Preferred Terms

| Term                                  | Usage                                                                   | Example                                          |
| ------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| notebook                              | The unit of work, tied to a project or thesis                           | "Create your first notebook"                     |
| notes, highlights, sources, citations | Core research objects                                                   | "Reading notes sit beside their sources."        |
| university login                      | The reader's existing credentials                                       | "Sign in with your university login."            |
| email (lowercase, no hyphen)          | In sentences. Use "Email" as the field label.                           | "Continue with email"                            |
| .edu email                            | When a university address is needed                                     | "Sign up with your .edu email"                   |
| or (lowercase)                        | The divider between sign-in options                                     | "or"                                             |
| short institution name                | After the first full mention                                            | "Northfield University" first, then "Northfield" |
| … (ellipsis character)                | Ongoing states. Used consistently; pending confirmation as a rule (Q9). | "Searching…"                                     |
| Terms, Privacy Policy                 | Capitalised as document names                                           | "Fieldnote's Terms and Privacy Policy"           |

### Avoid These Terms

| Term                                        | Reason                                                                                                                      | Alternative                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| SSO (in user-facing copy)                   | Jargon for most researchers. It appears in the Alert README and spec error copy ("Fieldnote SSO") and is under review (Q3). | "university login", "sign-in through your institution" |
| Submit, OK, Click here                      | Doesn't say where the action goes                                                                                           | Verb plus destination: "Continue with email"           |
| user, account holder                        | Distant, third-person                                                                                                       | "you"                                                  |
| Oops, Uh-oh                                 | Cute, and minimises the problem                                                                                             | State what happened plainly                            |
| Create account / Log in (as sign-up labels) | Generic PRD template wording that clashes with the "Continue with" pattern                                                  | "Continue with …"                                      |

### Never-Use Terms

| Term                                                             | Reason                                                |
| ---------------------------------------------------------------- | ----------------------------------------------------- |
| IdP, SSO provider, identity provider                             | Explicitly banned in the design-system README         |
| Exclamation marks (!)                                            | Explicitly banned                                     |
| Emoji                                                            | Explicitly banned                                     |
| Real institution names in mockups or demos meant for publication | Brand rule: swap in fictional names before publishing |

---

## Language to Avoid

These patterns come from the brand rules and from off-brand strings found in the sources. No transcripts were analysed.

1. **Raw system errors appended to copy**: for example, "{error.message}. Check your connection…" (shipped source list). Problem: it exposes technical text, can read as blame, and breaks sentence case. Better: "Your sources didn't load. Check your connection and reload the page."
2. **Developer scaffold copy in the product**: "Client state", "Server data", "This page shows the design system and the data patterns your project starts with." Problem: it isn't written for researchers. Better: research-language headings such as "Your notebooks" and "Recent sources".
3. **Placeholder product names**: a wordmark that renders "sign-up-form", "My App" or "App". Problem: the reader never sees "Fieldnote". Better: always render "Fieldnote".
4. **Headline highlighting**: putting a Highlighter mark on marketing headline words. Problem: Highlighter is reserved for marked passages in notebooks. Better: a plain headline, with highlights only on quoted text.

---

## Content Examples

### Excellent Examples

- **"Northfield didn't share your email address. Enter it below to finish."**
  - Names the institution, says what happened without blame, and gives the next step in two short sentences. (Error-state copy from the Alert README and spec, with the institution swapped.)
- **"Northfield isn't on Fieldnote SSO yet. Sign up with your .edu email — we'll link it when they join."**
  - Calm framing ("yet"), a concrete alternative, and the only sanctioned use of "we", attached to a promise. (Alert README, institution swapped. Open question: "SSO".)
- **"No match for 'Univ of Westbrook.' Try your email domain, or sign up with email."**
  - Echoes what the reader typed and offers two ways forward. (Spec §4.3.)
- **"Looks like you're at Northfield. Continue with your Northfield login."**
  - Recognises the reader's context and shortcuts the path with a verb-plus-destination button. (Alert and TextField READMEs, institution and login name swapped.)
- **"No new password. Sign in with your university login."**
  - Two short, factual sentences that turn a technical feature into a plain benefit. (Editorial mockup.)

### Examples to Avoid

- ❌ **"Oops! Your IdP returned an error. Please try again!"** (anti-example, do not use)
  - Cute opener, jargon ("IdP"), exclamation marks, no specific institution, and a vague next step.
  - ✅ "Northfield couldn't sign you in right now. Try again, or sign up with email."
- ❌ **"Welcome aboard! 🎉 You're all set to supercharge your research!"** (anti-example, do not use)
  - Exclamation marks, emoji, hype verb, and no next action.
  - ✅ "Welcome, Maya. You're signed in through Northfield." Then the buttons "Create your first notebook" and "Import from Zotero".
- ❌ **"Submit"** / **"Sign In With SSO"** (anti-example, do not use)
  - Doesn't say where it goes, uses Title Case, and uses jargon.
  - ✅ "Continue with your institution"

---

## Confidence Scores

| Section             | Confidence | Basis                                                                                                                                                                                     | Sources               |
| ------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Voice Attributes    | High       | Explicit rules in the authoritative README, demonstrated in component copy, the spec and the mockup                                                                                       | 4                     |
| Messaging Framework | Medium     | Value bullets come mainly from one mockup and the README description. They aren't confirmed as approved claims, and there's no competitive data.                                          | 2-3                   |
| Tone Matrix         | Medium     | In-product contexts are explicit and well supported. Email, outreach and social are extrapolated with no source material.                                                                 | 4 (in-product), 0 (†) |
| Terminology         | High       | An explicit banned and required list, plus consistent usage across component READMEs and the spec. Punctuation mechanics (ellipsis, contractions, em dash) are pending confirmation (Q9). | 4                     |
| Language Patterns   | n/a        | No transcripts available. The "Language That Works" section is omitted, and the weight is redistributed.                                                                                  | 0                     |

Bands: High ≥ 0.85, Medium 0.60-0.84, Low < 0.60.

Overall: (0.30 × 1.0 + 0.25 × 0.6 + 0.20 × 0.6 + 0.15 × 1.0) ÷ 0.90 = **0.80, Medium**. It would rise with an approved messaging document and real examples of email or outreach copy.

---

## Open Questions for Team Discussion

### High Priority (blocks guideline completion)

#### Q1. Are the marketing claims approved?

- What was found: "Free for students and researchers at 1,200+ institutions", "Your library access carries over" and "Access starts and ends with your enrollment" appear in the editorial mockup. "Free for students…" also appears in the design-system README and tokens.json, but as an example of number style, not an approved claim.
- Agent recommendation: Treat them as draft until product or legal confirms the number and terms. Keep the phrasing style, which is on-voice.
- Need from you: Confirm or correct each claim.

#### Q2. "Create your account" vs the "Continue with …" pattern

- What was found: The mockup heading says "Create your account". A PRD template suggests "Create account" and "Log in" labels. The authoritative README uses "Continue with …" for every option, and the spec notes the brief calls the feature "Sign in with your institution".
- Agent recommendation: Keep "Continue with …" for all buttons, since one screen serves both new and returning researchers. Use a neutral heading such as "Your research notes, in one place" instead of "Create your account".
- Need from you: Confirm the button pattern and choose the sign-up heading.

### Medium Priority (improves quality)

#### Q3. Is "SSO" allowed in user-facing copy?

- What was found: The rule bans "IdP" and "SSO provider", but the drafted error copy (spec §4.5, under review) says "isn't on Fieldnote SSO yet".
- Agent recommendation: Replace it with plain language: "Northfield isn't connected to Fieldnote yet. Sign up with your .edu email — we'll link it when they join." This applies the plain-spoken attribute consistently.
- Need from you: Approve the rewrite or keep "SSO".

#### Q4. Should "not on Fieldnote yet" be an error or an info message?

- What was found: The spec says it's "a missing integration, not a user mistake" but renders it as an error, and lists this as an open question itself (spec Q3).
- Agent recommendation: Use the info style. A red error contradicts the calm, no-blame voice.
- Need from you: Confirm.

#### Q5. Tone outside the product

- What was found: No email, social, support or outreach material exists.
- Agent recommendation: Use the † rows above as provisional defaults, and collect 3-5 real examples per channel to raise confidence.
- Need from you: Share any existing emails, posts or partnership decks.

#### Q6. Technical terms with IT audiences

- What was found: The rules ban "IdP" and "SSO provider" for researchers, but partnership outreach may go to university IT staff, who use those terms daily.
- Agent recommendation: Allow "SSO" and "SAML" only in documents written for IT administrators. Keep researcher-facing copy free of them.
- Need from you: Confirm the exception, or keep the ban everywhere.

#### Q7. Duplicate-account linking copy

- What was found: The spec (open question 2) describes linking an existing email account to an institution later, but there is no copy for it.
- Agent recommendation: Use a two-sentence pattern: "You already have a Fieldnote account with this email. Link it to Northfield to sign in with your university login." Then add the buttons "Link my account" and "Use a different email".
- Need from you: Approve the pattern, or describe the intended flow.

#### Q8. Research-term glossary

- What was found: The sources use notebook, project and thesis; highlight and annotation; source, citation and reference without defining them.
- Agent recommendation: A notebook holds the work for one project or thesis. A source is the item you read, and a citation is the formatted reference to it. A highlight is marked text in a source, and a note is your own writing. Avoid "annotation" in user-facing copy.
- Need from you: Confirm, or supply the product's own definitions.

### Low Priority (nice to have)

#### Q9. Mechanics not yet decided

- What was found: Contractions, the em dash and the ellipsis are used consistently but aren't written rules. Oxford comma, numerals and date formats are unspecified.
- Agent recommendation: Make contractions, the ellipsis character (…) and numerals for all numbers official. Allow at most one em dash per message. Use **no Oxford comma**, to match existing copy ("graduate students, faculty and research staff").
- Need from you: Confirm.

#### Q10. Competitive positioning

- What was found: No competitors are named in any brand source.
- Agent recommendation: Name the two or three tools researchers compare against (for example, reference managers or general note apps) and write one differentiating line for each.
- Need from you: List the competitors.

---

## Data Gaps & Recommendations

- [ ] **No conversational data**: share support tickets, user interviews or onboarding call notes to validate the voice with real researcher language.
- [ ] **No approved messaging document**: write a one-page messaging brief that confirms the value proposition and claims.
- [ ] **No copy for key states**: duplicate-account linking, returning-user sign-in, email validation, and empty notebook or library states.
- [ ] **No research-term glossary**: settle notebook vs project vs thesis, highlight vs annotation, and source vs citation vs reference.
- [ ] **No audience nuance**: decide whether tone differs for graduate students, faculty and research staff (currently assumed to be the same).
- [ ] **Shipped copy diverges from the voice**: placeholder wordmark, scaffold headings and raw error text in `src/`. Fix these when the sign-up screen is built.

---

## Appendix: Sources

| #   | Source                                                    | Platform   | Type                           | Date       | Key Sections Used                             | Confidence |
| --- | --------------------------------------------------------- | ---------- | ------------------------------ | ---------- | --------------------------------------------- | ---------- |
| 1   | `docs/design-system/README.md` (also `README-two.md`)     | Local repo | AUTHORITATIVE                  | 2026-10    | Content fundamentals, components, iconography | High       |
| 2   | `docs/design-system/components/*/README.md`               | Local repo | AUTHORITATIVE (exact copy)     | 2026-10    | Alert, picker, button, divider and field copy | High       |
| 3   | `docs/fieldnote-signup-design-system.md`                  | Local repo | OPERATIONAL                    | 2026-10-11 | Goals, states, decisions, open questions      | High       |
| 4   | `images/mockups/html_mockups/Editorial-Sign-Up-Form.html` | Local repo | EXAMPLE                        | 2026-10    | Headline, value bullets, terms line           | Medium     |
| 5   | `src/**/*.jsx`                                            | Local repo | EXAMPLE (shipped)              | 2026-10    | Implemented copy, off-brand patterns          | Medium     |
| 6   | `PRD_Social_Sign-Up_Google_Apple_Microsoft.md`            | Local repo | OPERATIONAL (generic template) | 2026-10    | Conflicting label convention only             | Low        |
| 7   | `README.md`                                               | Local repo | OPERATIONAL (developer)        | 2026-10    | Product description                           | Low        |
| 8   | `docs/design-system/USING-IN-CODE.md`                     | Local repo | OPERATIONAL                    | 2026-10    | No voice content                              | Low        |
