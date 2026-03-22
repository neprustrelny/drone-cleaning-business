# Production Setup (Cloudflare Pages)

## Scope
This project uses Cloudflare Pages with Pages Functions (`/functions/**`) and KV binding `LEADS`.

## 1) Cloudflare Pages Dashboard Setup (Production + Preview)
1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages` -> your Pages project.
3. Open `Settings` -> `Environment variables`.
4. Configure variables in both environments:
   - `Production`
   - `Preview`
5. Save changes and redeploy if required by Cloudflare UI.

Recommended dashboard paths can change slightly over time, but environment variables are managed per-environment in the Pages project settings.

## 2) Variables Used by This Code
- `NOTIFY_WEBHOOK_URL`
- `STRIPE_WEBHOOK_SECRET`

`STRIPE_WEBHOOK_SECRET` must be treated as a secret.

## 3) Secrets Management Options
- Dashboard (recommended): set secrets directly in Pages project environment settings.
- Cloudflare secret stores / managed secrets: may be used if your account plan/workflow supports it.
- Wrangler CLI options may exist, but Dashboard is recommended for this project unless you already run an established CLI secret workflow.

## 4) Minimum Viable Production
- KV binding `LEADS`: enabled in Pages project (required for lead storage and rate limiting).
- `NOTIFY_WEBHOOK_URL`: optional.
- `STRIPE_WEBHOOK_SECRET`: optional unless Stripe webhook endpoint (`/api/stripe/webhook`) is enabled/used.

## Production Verification
### Find production URL
1. Cloudflare Dashboard -> `Workers & Pages` -> your project.
2. Open `Deployments`.
3. Use the latest `Production` deployment URL (for example `https://<project>.pages.dev` or your custom domain).

### API verification with curl
Replace `<PROD_URL>` with your production URL:

```bash
curl -i -X POST "<PROD_URL>/api/order" \
  -H "Content-Type: application/json" \
  --data '{"meno":"Jan Test","adresa":"Hlavna 123, Bratislava","email":"jan@example.com","telefon":"+421900000000","poznamka":"test","website":""}'

# Optional negative test (honeypot should reject with 400)
curl -i -X POST "<PROD_URL>/api/order" \
  -H "Content-Type: application/json" \
  --data '{"meno":"Spam","adresa":"Hlavna 123, Bratislava","email":"spam@example.com","telefon":"","poznamka":"","website":"https://spam.tld"}'
```

Expected statuses:
- `200` valid request accepted.
- `400` invalid payload / invalid JSON / honeypot / validation failure.
- `429` rate limit exceeded.

### Logs
In Cloudflare Dashboard:
1. `Workers & Pages` -> your project.
2. `Functions` (or `Logs` section for Functions, depending on current UI).
3. Inspect runtime logs for `/api/order` and `/api/stripe/webhook`.

### Quick rollback
- Redeploy a previous known-good commit.
- Or in Pages `Deployments`, promote/redeploy a previous successful deployment.

## DONE CHECKLIST
- [ ] KV bound
- [ ] dev ok
- [ ] deploy ok
- [ ] env vars set
- [ ] prod curl ok
- [ ] logs visible
