# Run Local And Test

## Najjednoduchšie spustenie z rootu repo

```bash
npm install
npm run dev
```

Tým sa spustí Cloudflare Pages dev server pre landing page aj `functions/api/order.ts`.

Lokálna adresa (default): `http://localhost:8788`

## Lokálny Stripe-ready setup bez commitnutia secretu

1. V priečinku `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/` skopíruj `.dev.vars.example` na `.dev.vars`
2. Doplň Stripe TEST secret a návratové URL
3. Znovu spusti `npm run dev`

Minimálne env pre Checkout Session:

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_SUCCESS_URL=http://localhost:8788/?checkout=success
STRIPE_CANCEL_URL=http://localhost:8788/?checkout=cancel
```

Bez `STRIPE_SECRET_KEY` aktuálny server-side flow vráti `503` s `stripe_not_configured`. Hardcoded test fallback URL už nie je súčasťou aktívneho flow.

## Čo má fungovať lokálne

- landing page sa načíta na `http://localhost:8788`
- formulár obsahuje balíky `house_s`, `house_m`, `house_l`, `b2b_audit`
- validný formulár odošle `POST /api/order`
- `POST /api/order` vráti `checkoutUrl`, ak je nastavený `STRIPE_SECRET_KEY`
- nevalidný formulár sa nesmie dostať do Stripe flow
- `POST /api/order` vracia `400` pre nevalidné dáta a `503` pre chýbajúcu Stripe konfiguráciu

## Rýchly backend check cez curl

### Validný request

```bash
curl -i -X POST "http://localhost:8788/api/order" \
  -H "Content-Type: application/json" \
  -d '{
    "balik": "house_m",
    "typObjektu": "rodinny_dom",
    "krajina": "Slovensko",
    "meno": "Jan Novak",
    "adresa": "Hlavna 12, Skalica",
    "email": "jan@example.com",
    "telefon": "+421910123456",
    "poznamka": "Test lead z local dev",
    "leadSource": "local_test",
    "website": ""
  }'
```

Očakávanie so Stripe env: `200`, `"ok":true`, neprázdne `"checkoutUrl"`.

### Nevalidný request bez balíka

```bash
curl -i -X POST "http://localhost:8788/api/order" \
  -H "Content-Type: application/json" \
  -d '{
    "balik": "",
    "typObjektu": "rodinny_dom",
    "krajina": "Slovensko",
    "meno": "Jan Novak",
    "adresa": "Hlavna 12, Skalica",
    "email": "jan@example.com",
    "website": ""
  }'
```

Očakávanie: `400` a `{"ok":false,"error":"invalid_balik"}` alebo validačná chyba podľa test harnessu.

## Testy

```bash
npm test
```

Testy pokrývajú root backend harness a frontend order module, vrátane package mappingu, validácie a redirectu na server-side `checkoutUrl`.

## Kde pozerať logy

- lokálne: terminál, v ktorom beží `npm run dev`
- produkcia: Cloudflare Dashboard -> Pages -> projekt -> Functions -> Logs

## Produkčný Stripe checklist

- v Cloudflare Pages nastaviť `STRIPE_SECRET_KEY`
- prípadne prepísať `STRIPE_SUCCESS_URL` a `STRIPE_CANCEL_URL`
- overiť, že server vracia správny `checkoutUrl` pre každý balík
- `functions/api/stripe/webhook.ts` ponechať na potvrdenie platby a post-payment automatizáciu
