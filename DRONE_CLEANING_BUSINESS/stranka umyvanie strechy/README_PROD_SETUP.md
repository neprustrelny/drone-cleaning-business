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
| Variable | Purpose | Status |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | server-side creation of Stripe Checkout Session | required |
| `STRIPE_SUCCESS_URL` | return URL after successful checkout | recommended |
| `STRIPE_CANCEL_URL` | return URL after cancelled checkout | recommended |
| `NOTIFY_WEBHOOK_URL` | optional `lead_created` notification to external webhook or CRM | optional |
| `STRIPE_WEBHOOK_SECRET` | Stripe signature verification for `POST /api/stripe/webhook` | recommended now, required once live webhook is used |

`STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` must be treated as secrets.

## 3) Pricing Model in Production
- Checkout suma nie je čítaná z klienta.
- Frontend pošle len identifikátor balíka `house_s`, `house_m`, `house_l`, `b2b_audit`.
- Server-side mapping rozhodne rezerváciu 149 / 199 / 299 / 990 EUR.
- Z tohto dôvodu už projekt nepoužíva samostatný `STRIPE_PRICE_ID_DEPOSIT_50` env.

## 4) Minimum Viable Production
- KV binding `LEADS`: enabled in Pages project (lead storage + rate limit)
- `STRIPE_SECRET_KEY`: required for checkout creation
- `STRIPE_SUCCESS_URL`: optional, ak nechceš default return URL odvodené z request origin
- `STRIPE_CANCEL_URL`: optional, ak nechceš default return URL odvodené z request origin
- `NOTIFY_WEBHOOK_URL`: optional
- `STRIPE_WEBHOOK_SECRET`: optional, until webhook endpoint is active in production

## 5) Flow Readiness Today
- Success flow je pripraveny: backend vracia `success_url` a frontend cita `?checkout=success` po navrate zo Stripe.
- Cancel flow je pripraveny: backend vracia `cancel_url` a frontend cita `?checkout=cancel` po zruseni checkoutu.
- Webhook endpoint existuje na `POST /api/stripe/webhook`.
- Verifikacia podpisu funguje, ak je nastaveny `STRIPE_WEBHOOK_SECRET`.
- Webhook este nie je plnohodnotne dokonceny: momentalne len loguje prijaty event a neriesi paid-state update, potvrdenie klientovi ani dalsi post-payment workflow.

## 6) What Still Blocks The First Live Test Purchase
- V `Production` prostredi Cloudflare Pages musi byt nastaveny live `STRIPE_SECRET_KEY`.
- Aktualny deployment musi byt nasadeny na produkcnej domene alebo na finalnom Pages URL, aby navratove URL smerovali na spravny frontend.
- KV binding `LEADS` musi byt realne pripojeny v Pages projekte, inak checkout moze prejst, ale stratis ulozenie leadov a rate-limit vrstvu.
- Ak chces pri prvom live teste aj potvrdenie zaplatenej rezervacie mimo Stripe dashboardu, treba dokoncit post-payment logiku nad webhookom; samotny webhook scaffold na to teraz nestaci.

## 7) First Live Test Purchase: Step By Step
### Stripe
1. Prejdi v Stripe do live modu.
2. Over, ze ucet vie prijimat live platby.
3. Ak chces webhook aj pre produkciu, vytvor endpoint `https://<tvoja-pages-domena>/api/stripe/webhook`.
4. Pre webhook odober aspon event `checkout.session.completed`.
5. Skopiruj webhook signing secret pre `STRIPE_WEBHOOK_SECRET`.

### Cloudflare Pages
1. Otvor `Workers & Pages` -> projekt.
2. V `Settings` -> `Environment variables` nastav v `Production`:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_SUCCESS_URL` alebo ponechaj default fallback
   - `STRIPE_CANCEL_URL` alebo ponechaj default fallback
   - `STRIPE_WEBHOOK_SECRET`, ak aktivujes webhook
   - `NOTIFY_WEBHOOK_URL`, ak chces externe notifikacie
3. Over, ze KV binding `LEADS` je naviazany aj pre produkcne prostredie.
4. Uloz zmeny a spusti redeploy aktualneho commitu.

### First Test Checkout
1. Otvor produkcny landing page.
2. Vyber najmensi balik `house_s` a vypln realny test lead.
3. Odosli formular.
4. Over, ze browser ide na Stripe Checkout a suma je `149 EUR`.
5. Dokonci platbu.
6. Over, ze navrat ide na `?checkout=success`.

### End-To-End Verification
1. Na frontende sa po navrate zobrazi success hlaska.
2. `POST /api/order` vrati `200` a neprazdny `checkoutUrl`.
3. V Stripe Dashboarde vidis novu Checkout Session s metadata `package`, `typObjektu`, `krajina`, `leadSource`.
4. Ak je webhook aktivny, Cloudflare logy ukazu `POST /api/stripe/webhook` s `200`.
5. Ak je nastaveny `NOTIFY_WEBHOOK_URL`, over prijatie `lead_created` notifikacie.

## Production Verification
### Find production URL
1. Cloudflare Dashboard -> `Workers & Pages` -> your project.
2. Open `Deployments`.
3. Use the latest `Production` deployment URL.

### API verification with curl
Replace `<PROD_URL>` with your production URL:

```bash
curl -i -X POST "<PROD_URL>/api/order"   -H "Content-Type: application/json"   --data '{"balik":"house_m","typObjektu":"rodinny_dom","krajina":"Slovensko","meno":"Jan Test","adresa":"Hlavna 123, Bratislava","email":"jan@example.com","telefon":"+421900000000","poznamka":"test","leadSource":"manual_check","website":""}'

curl -i -X POST "<PROD_URL>/api/order"   -H "Content-Type: application/json"   --data '{"balik":"bad_package","typObjektu":"rodinny_dom","krajina":"Slovensko","meno":"Jan Test","adresa":"Hlavna 123, Bratislava","email":"jan@example.com","website":""}'
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
- [ ] live Pages deployment verified
- [ ] prod curl ok
- [ ] first live checkout ok
- [ ] Stripe metadata verified
- [ ] logs visible
- [ ] webhook decision made
- [ ] post-payment handling decided
