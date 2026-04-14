# DRON - Public founding-package funnel for drone roof and facade cleaning

## What this repo is
- Public business-validation repository for a paid founding-package funnel for a drone-based roof and facade cleaning service.
- Current public offer runs as a one-page landing page in `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`.
- Business goal: validate demand and paid founding-package conversion before full service launch.
- Contains the landing page, order flow, server-side package validation, Stripe Checkout session creation, tests, and operating docs.

## What this repo is not
- Not a drone autopilot repository.
- No flight-control software.
- No telemetry stack.
- No PX4 / ArduPilot / DJI integration.
- No drone firmware.

## Current live funnel
1. A visitor opens the landing page.
2. The visitor chooses one of four founding packages: `house_s`, `house_m`, `house_l`, `b2b_audit`.
3. The visitor submits package, property type, country, and contact details.
4. `order-form.js` sends JSON to `POST /api/order` without a trusted client-side price.
5. `functions/api/order.ts` validates the package, resolves server-side pricing from `order-packages.js`, stores the lead when KV is available, optionally sends a lead-created notification webhook, and creates a Stripe Checkout Session when `STRIPE_SECRET_KEY` is configured.
6. The frontend redirects only to the returned `checkoutUrl`.
7. The landing page handles `?checkout=success` and `?checkout=cancel`.
8. A paid founding package is still followed by manual operational review of the property, weather, and readiness. Post-payment automation is not finished yet.

## What works today
- Active one-page landing page with the current paid founding offer.
- Four server-enforced founding packages with current live prices:
  - `Pilot Dom S` - `399 EUR`
  - `Pilot Dom M` - `649 EUR`
  - `Pilot Dom L` - `949 EUR`
  - `B2B Audit / Fasáda` - `1990 EUR`
- Pricing is determined server-side from `order-packages.js`; the frontend sends only the selected package and contact data.
- Frontend form validation, honeypot handling, and lead-source resolution.
- `POST /api/order` validation, rate limiting, optional KV lead storage, and Stripe Checkout session creation.
- Success / cancel status messaging after return from Stripe.
- Root tests for order-flow validation and package mapping.

## What is still missing
- Live `STRIPE_SECRET_KEY` and full production payment lifecycle in Cloudflare Pages.
- Stripe webhook handling and automated payment confirmation after successful payment.
- Production analytics for CAC, checkout success rate, and refund rate.
- Final hardening of refund and post-payment business process handling.
- Real pilot references and assets.
- Dedicated DE landing-page variant.

## Source of truth
Read in this order:
1. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
2. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-packages.js`
3. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js`
4. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`
5. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`
6. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md`
7. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/FLOW_ORDER_STRIPE.md`
8. `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`, `00_RUNBOOK_CODEX.md`

If README conflicts with the live app layer, trust `index.html`, `order-packages.js`, `order-form.js`, and `functions/api/order.ts`.

## Key files
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html` - current public landing page.
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-packages.js` - source of truth for live founding packages, labels, and server-side pricing.
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js` - form read, validate, submit, and redirect logic.
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts` - order validation, lead handling, and Stripe Checkout session creation from server-side package pricing.
- `test/order-form.test.js` - frontend order-flow tests.
- `test/order-handler.test.js` - API order-flow tests.
- `package.json` - repo-root test and dev entry points.

## Quick start
From the repo root:

```bash
npm install
npm test
npm --prefix "./DRONE_CLEANING_BUSINESS/stranka umyvanie strechy" install
npm run dev
```

Minimum local checkout env:

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_SUCCESS_URL=http://localhost:8788/?checkout=success
STRIPE_CANCEL_URL=http://localhost:8788/?checkout=cancel
```

If `STRIPE_SECRET_KEY` is missing, `/api/order` returns `stripe_not_configured` instead of a fake checkout.

## Current priorities
- Live Stripe and production payment confirmation.
- First real pilot jobs, references, and assets.
- Analytics for package mix, CAC, checkout success, and refunds.
- B2B audit funnel execution.
- Dedicated DE landing-page variant.
