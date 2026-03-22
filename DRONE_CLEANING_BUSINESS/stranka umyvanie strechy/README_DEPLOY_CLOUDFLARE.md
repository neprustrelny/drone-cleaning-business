# Cloudflare Pages Backend Deploy Guide

This folder now includes Cloudflare Pages Functions for:
- `POST /api/order`
- `POST /api/stripe/webhook` (scaffold)

The existing frontend already posts to `/api/order`, so no frontend change is required.

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

Copy both namespace IDs into `wrangler.toml`:
- `id = "f9a734dcc29e4bb9abcc0806953dac18"`
- `preview_id = "877707eac5cc4cbfb48709aea29c9731"`

Binding name must stay exactly: `LEADS`.

If KV is not configured, `/api/order` still works and can send notification webhook, but leads will not be stored in KV.

## 3) Set environment variables

In Cloudflare Pages project settings -> Variables and Secrets:

- `NOTIFY_WEBHOOK_URL`
  - Example: your n8n / Make / Zapier webhook URL.
  - If set, `/api/order` sends lead JSON to this URL.
- `STRIPE_WEBHOOK_SECRET`
  - Set later when Stripe webhook is active.
  - If set, `/api/stripe/webhook` verifies Stripe signature.

You can also keep local placeholders in `wrangler.toml` for development.

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
    "meno": "Jan Novak",
    "adresa": "Hlavna 12, Skalica",
    "email": "jan@example.com",
    "telefon": "+421910123456",
    "poznamka": "Test lead z local dev",
    "website": ""
  }'
```

Expected response:
- `200` with `{"ok":true}` for valid input
- `400` for invalid payload / honeypot spam
- `429` if rate limit is exceeded (when KV is available)

## 6) Deploy

```bash
npm run deploy
```

Or deploy through Cloudflare Pages connected repository workflow.

## 7) Endpoints summary

- `POST /api/order`
  - Validates payload
  - Honeypot check (`website`)
  - Basic rate limit by client IP via KV (if available)
  - Stores lead in KV (`LEADS`) when configured
  - Sends webhook notification if `NOTIFY_WEBHOOK_URL` is set
- `POST /api/stripe/webhook`
  - Scaffold endpoint
  - Signature verification enabled when `STRIPE_WEBHOOK_SECRET` is set
