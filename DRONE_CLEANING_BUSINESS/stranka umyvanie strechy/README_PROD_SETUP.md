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

## 2) Variables Used by This Code
- `STRIPE_SECRET_KEY`
- `STRIPE_SUCCESS_URL`
- `STRIPE_CANCEL_URL`
- `NOTIFY_WEBHOOK_URL`
- `STRIPE_WEBHOOK_SECRET`

`STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` must be treated as secrets.

## 3) Pricing Model in Production
- Checkout suma nie je čítaná z klienta.
- Frontend pošle len identifikátor balíka `house_s`, `house_m`, `house_l`, `b2b_audit`.
- Server-side mapping rozhodne rezerváciu 149 / 199 / 299 / 990 €.
- Z tohto dôvodu už projekt nepoužíva samostatný `STRIPE_PRICE_ID_DEPOSIT_50` env.

## 4) Minimum Viable Production
- KV binding `LEADS`: enabled in Pages project (lead storage + rate limit)
- `STRIPE_SECRET_KEY`: required for checkout creation
- `STRIPE_SUCCESS_URL`: optional, ak nechceš default return URL odvodené z request origin
- `STRIPE_CANCEL_URL`: optional, ak nechceš default return URL odvodené z request origin
- `NOTIFY_WEBHOOK_URL`: optional
- `STRIPE_WEBHOOK_SECRET`: optional, until webhook endpoint is active in production

## Production Verification
### Find production URL
1. Cloudflare Dashboard -> `Workers & Pages` -> your project.
2. Open `Deployments`.
3. Use the latest `Production` deployment URL.

### API verification with curl
Replace `<PROD_URL>` with your production URL:

```bash
curl -i -X POST "<PROD_URL>/api/order" \
  -H "Content-Type: application/json" \
  --data '{"balik":"house_m","typObjektu":"rodinny_dom","krajina":"Slovensko","meno":"Jan Test","adresa":"Hlavna 123, Bratislava","email":"jan@example.com","telefon":"+421900000000","poznamka":"test","leadSource":"manual_check","website":""}'

curl -i -X POST "<PROD_URL>/api/order" \
  -H "Content-Type: application/json" \
  --data '{"balik":"bad_package","typObjektu":"rodinny_dom","krajina":"Slovensko","meno":"Jan Test","adresa":"Hlavna 123, Bratislava","email":"jan@example.com","website":""}'
```

Expected statuses:
- `200` valid request accepted with non-empty `checkoutUrl`.
- `400` invalid payload / honeypot / invalid package.
- `429` rate limit exceeded.
- `503` Stripe is not configured.

### Logs
In Cloudflare Dashboard:
1. `Workers & Pages` -> your project.
2. `Functions` / `Logs`.
3. Inspect runtime logs for `/api/order` and `/api/stripe/webhook`.

### Quick rollback
- Redeploy a previous known-good commit.
- Or in Pages `Deployments`, promote/redeploy a previous successful deployment.

## DONE CHECKLIST
- [ ] KV bound
- [ ] live Stripe secret set
- [ ] success/cancel URLs verified
- [ ] prod curl ok
- [ ] logs visible
- [ ] webhook plan decided
