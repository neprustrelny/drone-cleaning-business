# Cloudflare Pages Backend Deploy Guide

This folder includes Cloudflare Pages Functions for:
- `POST /api/order`
- `POST /api/stripe/webhook` (scaffold)

The existing frontend already posts to `/api/order`.

## 1) Create Cloudflare Pages project
1. Open Cloudflare Dashboard -> Pages -> Create a project.
2. Connect your repository, or use direct upload from this folder.
3. Set the project root to this directory:
   - `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`
4. Build command: leave empty (static + functions only).
5. Build output directory: `.`

## 2) Create and bind KV namespace

Create KV namespaces (production + preview):

```bash
wrangler kv namespace create LEADS
wrangler kv namespace create LEADS --preview
```

Copy both namespace IDs into `wrangler.toml` and keep binding name `LEADS`.

## 3) Set environment variables

In Cloudflare Pages project settings -> Variables and Secrets set:
- `STRIPE_SECRET_KEY`
- `STRIPE_SUCCESS_URL` (optional)
- `STRIPE_CANCEL_URL` (optional)
- `NOTIFY_WEBHOOK_URL` (optional)
- `STRIPE_WEBHOOK_SECRET` (optional)

Poznámka:
- Server-side pricing používa pevný mapping v kóde, nie price id z klienta.
- Frontend posiela len identifikátor balíka.

## 4) Run locally

```bash
npm install
npm run dev
```

Local dev URL (default): `http://localhost:8788`

## 5) Test `/api/order` locally

```bash
curl -i -X POST "http://localhost:8788/api/order" \
  -H "Content-Type: application/json" \
  -d '{
    "balik": "house_s",
    "typObjektu": "rodinny_dom",
    "krajina": "Slovensko",
    "meno": "Jan Novak",
    "adresa": "Hlavna 12, Skalica",
    "email": "jan@example.com",
    "telefon": "+421910123456",
    "poznamka": "Test lead z local dev",
    "leadSource": "local_check",
    "website": ""
  }'
```

Expected response:
- `200` with `{"ok":true,"checkoutUrl":"..."}` for valid input + configured Stripe
- `400` for invalid payload / honeypot spam / invalid package
- `429` if rate limit is exceeded (when KV is available)
- `503` if Stripe is not configured

## 6) Deploy

```bash
npm run deploy
```

Or deploy through Cloudflare Pages connected repository workflow.

## 7) Endpoints summary

- `POST /api/order`
  - validates payload
  - honeypot check (`website`)
  - basic rate limit by client IP via KV (if available)
  - stores lead in KV (`LEADS`) when configured
  - sends webhook notification if `NOTIFY_WEBHOOK_URL` is set
  - creates Stripe Checkout Session server-side according to package mapping
- `POST /api/stripe/webhook`
  - scaffold endpoint
  - signature verification enabled when `STRIPE_WEBHOOK_SECRET` is set
