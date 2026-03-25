# DEPENDENCIES AND TECH

## 1. Pouzite technologie
| Technologia | Kde | Uloha |
|---|---|---|
| Node.js ESM | root aj nested `package.json` | runtime pre testy a lokalne skripty |
| `node:test` | `test/*.test.js` | vstavany test framework |
| Cloudflare Workers | root `index.js` + `wrangler.toml` | jednoduchy root test harness |
| Cloudflare Pages Functions | `functions/api/*.ts` | hlavny webovy backend |
| Wrangler | root aj nested | lokalny dev/deploy pre Cloudflare |
| KV namespace `LEADS` | root aj nested `wrangler.toml` | ukladanie leadov a rate limit |
| Stripe Checkout API | `functions/api/order.ts` | vytvorenie checkout session podla server-side package mappingu |
| Stripe webhook HMAC verify | `functions/api/stripe/webhook.ts` | overenie podpisu webhookov |
| Staticky HTML + inline CSS | `index.html` | frontend bez frameworku |
| Modulovy vanilla JS | `order-form.js` | frontend validacia a submit flow |
| Shared JS config | `order-packages.js` | jednotny mapping balikov a rezervacii |
| Markdown/TXT docs | root a `DRONE_CLEANING_BUSINESS/` | riadenie, handover, audit, planovanie |

## 2. Node a package vrstvy
### Root package
- meno: `dron`
- typ: `module`
- script `test`: `node --test test/*.test.js`
- script `dev`: deleguje do nested projektu
- devDependency: `wrangler` `^4.64.0`

### Nested package
- meno: `strecha-cloudflare-pages-backend`
- typ: `module`
- script `dev`: `wrangler pages dev .`
- script `deploy`: `wrangler pages deploy .`
- devDependency: `wrangler` `^4.49.0`

## 3. Cloudflare config
### Root `wrangler.toml`
- `name = "dron"`
- `main = "index.js"`
- `kv_namespaces` s bindingom `LEADS`

### Nested `wrangler.toml`
- `name = "strecha-api"`
- `pages_build_output_dir = "."`
- rovnaky KV binding `LEADS`
- env sa nastavuje hlavne v Pages secrets / vars

## 4. API a backend prvky
### Root backend
- route `/api/order`
- validacia payloadu a server-side reservation summary
- testovatelny `checkoutUrl` flow cez harness
- bez priameho Stripe network callu v testoch

### Nested Pages backend
- `POST /api/order`
- CORS
- honeypot `website`
- IP rate limit cez KV
- ukladanie leadu do KV
- volitelny webhook na notifikacie
- vytvaranie Stripe Checkout Session cez Stripe API
- navrat `checkoutUrl`
- metadata: `package`, `typObjektu`, `krajina`, `leadSource`

### Stripe webhook scaffold
- `POST /api/stripe/webhook`
- parse `Stripe-Signature`
- HMAC SHA-256 verify cez Web Crypto
- zatial scaffold/logging

## 5. Frontend stack
- jeden hlavny `index.html`
- inline CSS v `<style>`
- modulovy JS cez `<script type="module" src="./order-form.js">`
- formular s poliami:
  - `balik`
  - `typObjektu`
  - `krajina`
  - `meno`
  - `adresa`
  - `email`
  - `telefon`
  - `poznamka`
- redirect len na serverom vrátený `checkoutUrl`
- status box a vizualna validacia inputov

## 6. Hlavny technicky zaver
Technologicky je to stale minimalisticky stack bez frameworkov: staticky one-page frontend + Cloudflare backend + Stripe + KV. Hlavny posun oproti staremu stavu je zjednoteny package-based pricing, pri ktorom klient uz neposiela sumu a server rozhoduje o checkout cene aj metadatach.
