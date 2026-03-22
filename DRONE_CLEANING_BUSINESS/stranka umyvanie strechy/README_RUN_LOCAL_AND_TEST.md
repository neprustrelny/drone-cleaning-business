# Run Local And Test

## Najjednoduchšie spustenie z rootu repo

```bash
npm install
npm run dev
```

Tým sa spustí Cloudflare Pages dev server pre aktuálnu landing page aj `functions/api/order.ts`.

Lokálna adresa (default): `http://localhost:8788`

## Lokálny Stripe-ready setup bez commitnutia secretu

1. V priečinku `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/` skopíruj `.dev.vars.example` na `.dev.vars`
2. Doplň Stripe TEST hodnoty
3. Znovu spusti `npm run dev`

Minimálne env pre Checkout Session:

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PRICE_ID_DEPOSIT_50=price_xxx
STRIPE_SUCCESS_URL=http://localhost:8788/?checkout=success
STRIPE_CANCEL_URL=http://localhost:8788/?checkout=cancel
```

Ak tieto env nie sú nastavené, localhost ešte stále použije test fallback URL z frontendu. Mimo localhostu je fallback zablokovaný.

## Čo má fungovať lokálne

- landing page sa načíta na `http://localhost:8788`
- formulár obsahuje balíčky `199`, `299`, `399`
- validný formulár odošle `POST /api/order`
- ak Stripe env existujú, `POST /api/order` vráti `checkoutUrl`
- ak Stripe env neexistujú, localhost použije test fallback checkout URL
- nevalidný formulár sa nesmie dostať do Stripe flow
- `POST /api/order` vracia `200` pre validné dáta a `400` pre nevalidné dáta

## Rýchly backend check cez curl

### Validný request

```bash
curl -i -X POST "http://localhost:8788/api/order"   -H "Content-Type: application/json"   -d '{
    "balik": "299",
    "meno": "Jan Novak",
    "adresa": "Hlavna 12, Skalica",
    "email": "jan@example.com",
    "telefon": "+421910123456",
    "poznamka": "Test lead z local dev",
    "website": ""
  }'
```

Očakávanie bez Stripe env: `200`, `"ok":true`, `"checkoutUrl":null`.

Očakávanie so Stripe env: `200`, `"ok":true`, neprázdne `"checkoutUrl"`.

### Nevalidný request bez balíka

```bash
curl -i -X POST "http://localhost:8788/api/order"   -H "Content-Type: application/json"   -d '{
    "balik": "",
    "meno": "Jan Novak",
    "adresa": "Hlavna 12, Skalica",
    "email": "jan@example.com",
    "website": ""
  }'
```

Očakávanie: `400` a `{"ok":false,"error":"invalid_balik"}`.

## Kde pozerať logy

- lokálne: terminál, v ktorom beží `npm run dev`
- produkcia: Cloudflare Dashboard -> Pages -> projekt -> Functions -> Logs

## Produkčný Stripe checklist

- v Stripe vytvoriť produkt alebo price pre zálohu 50 €
- zobrať `price_...` identifikátor
- v Cloudflare Pages nastaviť `STRIPE_SECRET_KEY` a `STRIPE_PRICE_ID_DEPOSIT_50`
- prípadne prepísať `STRIPE_SUCCESS_URL` a `STRIPE_CANCEL_URL`
- `functions/api/stripe/webhook.ts` ponechať až na potvrdenie platby a post-payment automatizáciu
