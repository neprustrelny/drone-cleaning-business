# DRON – Preorder Funnel for Drone Roof and Facade Cleaning

This repository is a business-validation and paid reservation funnel for a drone-based roof and facade cleaning service.
It contains the landing page, booking flow, checkout logic and operating docs used to test whether customers will reserve paid pilot slots.
It is not a drone autopilot, flight-control or telemetry codebase.

## What this repository is
- Landing page and conversion funnel for a local field-service offer
- Booking / preorder flow with package selection
- Server-side order and Stripe Checkout session creation
- Business-validation documents, pricing logic and cashflow planning
- Tests for the core order flow and package enforcement

## What this repository is not
- No drone firmware
- No telemetry stack
- No PX4 / ArduPilot / DJI integration
- No flight-control software

## Current status
### Current focus
- Validate paid reservations for pilot cleaning slots
- Reach the preorder cash target before equipment purchase
- Keep pricing and reservation amounts enforced server-side

### Implemented
- Active landing page and booking funnel in `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`
- Package-based preorder flow: `house_s`, `house_m`, `house_l`, `b2b_audit`
- Server-side `/api/order` checkout session creation with Stripe
- Success / cancel return handling in the live funnel
- Root tests for order flow validation and package mapping

### In progress
- Production payment lifecycle hardening
- Webhook completion after successful payment
- Analytics and funnel measurement
- Public repo cleanup and clearer public docs

## Funnel flow
1. A visitor lands on the page.
2. The visitor chooses a package.
3. The visitor fills in booking details.
4. The backend validates the package and creates a checkout session.
5. The customer reserves a paid pilot slot.

## Package structure
- `house_s`
- `house_m`
- `house_l`
- `b2b_audit`

Pricing and reservation amounts are enforced server-side. The client does not send a trusted price.

## Repository structure
- Root: business docs, cashflow, status, runbooks and repo-level guidance
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`: active landing page and funnel implementation
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/`: order / checkout backend
- `test/`: root tests for the core order flow

## Who this is for
- Operators validating a local service business
- Founders testing paid reservation models
- People building field-service booking funnels

## What is not public yet
- Some internal operational and strategy documents are still mixed into this repository
- Over time, the public showcase layer and internal ops layer should be separated more clearly

## Next milestones
- Production payment lifecycle
- Webhook completion
- Public repo cleanup
- Demo assets, screenshots and tighter public docs

## Quick start
```bash
npm install
npm test
npm run dev
```

Minimum checkout env for local funnel work:

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_SUCCESS_URL=http://localhost:8788/?checkout=success
STRIPE_CANCEL_URL=http://localhost:8788/?checkout=cancel
```

Main funnel docs:
- `02_SOURCE_OF_TRUTH.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/FLOW_ORDER_STRIPE.md`
