# PRD: Tempest Line Subscription Checkout

_Draft · October 12, 2026 · Builds on STRATEGY.md, FR-subscription-checkout-redesign.md and the technical brief. Tempest Line is a fictional company; baseline figures are illustrative assumptions._

## Problem Statement

Tempest Line's learners are mostly students under 18 who use the app on their phones, often late at night before a deadline, but the people who pay are usually their parents. Today the checkout assumes the learner is the payer: **46% of checkouts started by learners under 18 are abandoned**, mostly because they have no card, and parents who do pay are surprised by charges over summer break, causing a **June spike in refund requests**. Because the users are minors, getting this wrong also creates COPPA and auto-renewal compliance exposure.

## Goals

1. **Learners can get access without a card.** Raise checkout completion for learner-started sessions from 54% to 70% within 60 days of launch.
2. **Parents know what they're paying for.** Cut "unexpected charge" refund requests in June by 50% versus the prior year.
3. **Paying takes under two minutes for a parent.** Median time from opening a parent payment link to successful payment under 120 seconds.
4. **Zero compliance findings.** No COPPA or auto-renewal findings in the pre-launch Legal review or the first post-launch audit.
5. **Families grow inside one plan.** 15% of Plus payers with more than one learner move to Family within 90 days.

## Non-Goals

- **School and district licensing.** Different buyer, contract and invoicing needs; separate initiative.
- **In-app purchase through app stores.** Store rules control that flow and payer/learner separation isn't possible there; web checkout comes first.
- **Gift subscriptions and promo codes.** Useful for growth but not tied to the abandonment or refund problems.
- **Full payer dashboards.** Payers only need to pay, see receipts, get reminders and cancel in v1; a full dashboard is premature.
- **Markets outside the US.** Compliance and tax work differ per country; launch US-only to learn first.

## User Stories

### Learner (13–17)

- As a high school learner without a card, I want to send my parent a link to pay for Plus so that I can get unlimited explanations tonight.
- As a learner, I want to see that my request was sent and when it's paid so that I know when I can use Plus.
- As a learner whose parent hasn't paid, I want to resend or remind them so that the request doesn't get lost.

### Parent / payer

- As a parent, I want to open a payment link on my phone or work computer and pay without creating an account so that I can approve it in a minute.
- As a parent, I want to see exactly what my child will get, what it costs per month or school year, and when it renews so that I don't get surprised later.
- As a parent of three, I want one Family plan for all my kids so that I pay one bill.
- As a parent, I want a reminder in May to pause or cancel over summer so that I don't pay for months nobody uses it.
- As a parent, I want to cancel online from the reminder or receipt email so that I don't have to call anyone.

### Parent of a learner under 13

- As a parent of an 11-year-old, I want to create my child's profile and give consent myself so that the app doesn't collect my child's data without my permission.

### College learner (18–22)

- As a college student, I want to verify my school email in checkout so that I get the student discount without leaving the flow.
- As a college student paying for myself, I want to use Apple Pay or a saved card so that I can subscribe in two taps.

### Edge cases

- As a parent who opens a link after it expired, I want a clear message so that I know to ask my child to resend it.
- As a parent who opens a link my child already got paid for another way, I want to see that it's already active so that I don't pay twice.

## Requirements

### Must-Have (P0)

**P0-1: Payer and learner roles.** Checkout, receipts, reminders and cancellation distinguish who uses the plan from who pays.

- [ ] The order summary shows "Plan for: [learner first name]" and "Paid by: [payer]" on every step.
- [ ] Receipts, renewal reminders and cancellation confirmations go to the payer's email.
- [ ] Only the payer can cancel or change the payment method.

**P0-2: "Ask a parent to pay" link.**

- Given a signed-in learner under 18 selects a plan
- When they tap "Ask a parent to pay"
- Then they can send a link by text or email, and see a "Request sent" status
- [ ] The link opens a checkout showing the learner's first name, plan, price with interval, renewal terms and total including tax.
- [ ] The payer can complete payment without a Tempest Line login.
- [ ] On successful payment, the learner's plan activates within 60 seconds and the learner is notified.
- [ ] A link that is expired or already paid shows a clear status and takes no payment.

**P0-3: No payment fields for minors.**

- [ ] Signed-in learners under 18 never see card, wallet or billing fields; "Ask a parent to pay" is the only payment option shown.

**P0-4: Parental consent for learners under 13.**

- [ ] A learner under 13 can only be created by a parent, who completes the chosen consent method before any learner data beyond what consent requires is collected.
- [ ] A self-identified under-13 user who tries to sign up alone is routed to "Ask a parent to set up your account" and no data is stored.

**P0-5: Plans and pricing clarity.**

- [ ] Every price shows its interval: "$9.99/month", "$59.99 for the school year (Aug–May)", "$17.99/month for up to 4 learners".
- [ ] The school-year plan is labeled "Does not renew" with its end date next to the price.
- [ ] The tutor add-on shows "4 live 30-minute sessions per month; unused sessions expire" before Confirm.

**P0-6: Core checkout (from FR).** All FR REQ-1 to REQ-14 and NFR-1 to NFR-6 apply to the payer's checkout, including tax before Confirm, auto-formatted hosted card fields, inline errors with data retention, renewal disclosure with affirmative consent, consent records, and online cancellation in ≤ 3 taps.

**P0-7: May summer reminder.**

- Given a payer has an active monthly plan on May 1
- When the reminder is sent (between May 1 and May 15)
- Then it states the next charge date and amount, and offers one-tap "Pause for summer" and "Cancel" links, plus a note that doing nothing keeps the plan active.

### Nice-to-Have (P1)

**P1-1: College discount verification in checkout.**

- [ ] A learner 18+ can enter a school email, receive a code, and see the 30% discount applied in the summary only after verification succeeds.
- [ ] Verification failure doesn't block a full-price purchase (pending Open Question 7).

**P1-2: Family plan upgrade path.**

- [ ] A payer with 2+ learners on separate Plus plans sees a one-tap offer to combine into Family, with the new monthly total and the date it takes effect.

**P1-3: Resend and remind.**

- [ ] A learner can resend a pending request, limited to once every 12 hours.

### Future Considerations (P2)

- **Payer dashboard** with all learners, plans and receipts in one place; design payer identity so it can grow into a full account.
- **Teens paying with their own cards** if Legal approves (Open Question 3); keep the payment-field gate configurable by age.
- **School/district licenses** that override individual plans; keep entitlements separable from billing.
- **Gift subscriptions** from relatives; the payer link pattern can extend to gifting.

## Success Metrics

### Leading indicators (first 2–4 weeks)

| Metric                              | Baseline            | Success | Stretch | Measured by                              |
| ----------------------------------- | ------------------- | ------- | ------- | ---------------------------------------- |
| Learner-started checkout completion | 54%                 | 70%     | 78%     | Funnel events, learner sessions under 18 |
| Parent links paid within 48 hours   | n/a                 | 50%     | 65%     | Link created → payment succeeded         |
| Median parent time to pay           | n/a                 | < 120 s | < 75 s  | Link opened → payment succeeded          |
| Payment-step error rate             | Measure in baseline | −30%    | −50%    | Field error events per payment attempt   |

### Lagging indicators (1–3 months)

| Metric                                          | Baseline            | Success        | Stretch | Measured by                                      |
| ----------------------------------------------- | ------------------- | -------------- | ------- | ------------------------------------------------ |
| June "unexpected charge" refund requests        | Prior June          | −50%           | −70%    | Support tags + refund reasons                    |
| Chargebacks per 1,000 renewals                  | Measure in baseline | −30%           | −50%    | Processor reports                                |
| Plus → Family conversion (multi-learner payers) | n/a                 | 15% in 90 days | 25%     | Plan change events                               |
| Trusted subscription starts (North Star)        | Measure in baseline | +10%           | +20%    | Active after first renewal, no refund/chargeback |

Evaluate at 2 weeks (leading), 60 days (Goal 1), end of June (Goal 2) and 90 days (Goal 5).

## Open Questions

| #   | Question                                                                           | Who answers         | Blocking?                              |
| --- | ---------------------------------------------------------------------------------- | ------------------- | -------------------------------------- |
| 1   | How is learner age captured and verified at signup?                                | Legal + Engineering | **Blocking**                           |
| 2   | Parent link validity, single-use rules, and whether the payer verifies email first | Security + Product  | **Blocking**                           |
| 3   | May learners 13–17 pay with their own cards?                                       | Legal               | **Blocking**                           |
| 4   | What happens to billing when a learner turns 18?                                   | Product + Legal     | Non-blocking                           |
| 5   | Is a mid-year school-year purchase full price or prorated?                         | Product + Finance   | **Blocking** (affects displayed price) |
| 6   | Does a monthly tutor add-on stop when the school-year plan ends?                   | Product             | **Blocking**                           |
| 7   | Can unverified college students buy at full price and verify later?                | Product             | Non-blocking                           |
| 8   | Summer pause length and cost                                                       | Product + Finance   | Non-blocking (needed before May)       |
| 9   | Which verifiable parental consent method for under-13 profiles?                    | Legal               | **Blocking**                           |
| 10  | Final renewal disclosure and consent copy                                          | Legal + Design      | **Blocking**                           |

## Timeline Considerations

- **Back-to-school peak (August):** most new subscriptions start in August and September. Ship P0 by **August 1** to capture it, with baseline measurement running from at least mid-July (FR NFR-6).
- **Summer reminder (May):** P0-7 must be live and tested before **May 1** of the following year.
- **Regulatory:** California ARL already applies; Louisiana's Click-to-Cancel Act applies from **January 1, 2027**; COPPA applies to under-13 learners from day one.
- **Dependencies:** age-gate decision (Q1) and parental consent method (Q9) gate P0-3 and P0-4; processor support for payer-without-login gates P0-2.

**Suggested phasing**

1. **Phase 1 (by Aug 1):** P0-1 to P0-6: roles, parent link, minor gating, under-13 consent, pricing clarity, core checkout.
2. **Phase 2 (by Oct 1):** P1-1 to P1-3: college verification, Family upgrade, resend.
3. **Phase 3 (by May 1):** P0-7 summer reminder and pause, then evaluate Goal 2.
