# DEPENDENCIES AND TECH

## 1. Pouzite technologie
| Technologia | Kde | Uloha |
|---|---|---|
| Node.js ESM | root aj nested `package.json` | runtime pre testy a lokalne skripty |
| `node:test` | `test/*.test.js` | vstavany test framework |
| Cloudflare Workers | root `index.js` + `wrangler.toml` | jednoduchy root backend |
| Cloudflare Pages Functions | `functions/api/*.ts` | hlavny webovy backend |
| Wrangler | root aj nested | lokalny dev/deploy pre Cloudflare |
| KV namespace `LEADS` | root aj nested `wrangler.toml` | ukladanie leadov a rate limit |
| Stripe Checkout API | `functions/api/order.ts` | vytvorenie checkout session pre 50 EUR zalohu |
| Stripe webhook HMAC verify | `functions/api/stripe/webhook.ts` | overenie podpisu webhookov |
| Staticky HTML + inline CSS | `index.html` | frontend bez frameworku |
| Modulovy vanilla JS | `order-form.js` | frontend validacia a submit flow |
| Markdown/TXT docs | root a `DRONE_CLEANING_BUSINESS/` | riadenie, handover, audit, planovanie |
| Netlify metadata | `.netlify/` | vedlajsi historicky hosting signal |

## 2. Node a package vrstvy

### Root package
- meno: `dron`
- typ: `module`
- script `test`: `node --test test/*.test.js`
- script `dev`: deleguje do nested projektu
- devDependency:
  - `wrangler` `^4.64.0`

### Nested package
- meno: `strecha-cloudflare-pages-backend`
- typ: `module`
- script `dev`: `wrangler pages dev .`
- script `deploy`: `wrangler pages deploy .`
- devDependency:
  - `wrangler` `^4.49.0`

### Technicky dopad
- V workspace existuju dve oddelene Node/Wrangler vrstvy.
- Obe maju vlastny `package-lock.json` a vlastne `node_modules/`.
- To zodpoveda dvom technickym osam:
  - root Worker/test harness
  - nested Pages projekt

## 3. Cloudflare config

### Root `wrangler.toml`
- `name = "dron"`
- `main = "index.js"`
- `compatibility_date = "2026-02-12"`
- `kv_namespaces` s bindingom `LEADS`

### Nested `wrangler.toml`
- `name = "strecha-api"`
- `pages_build_output_dir = "."`
- rovnaky KV binding `LEADS`
- `vars` placeholders:
  - `NOTIFY_WEBHOOK_URL`
  - `STRIPE_WEBHOOK_SECRET`

## 4. API a backend prvky

### Root backend
- route `/api/order`
- validacia povinnych poli
- JSON response helper
- volitelny zapis do KV
- bez Stripe integracie

### Nested Pages backend
- `POST /api/order`
- CORS
- honeypot `website`
- IP rate limit cez KV
- ukladanie leadu do KV
- volitelny webhook na notifikacie
- vytvaranie Stripe Checkout Session cez Stripe API
- navrat `checkoutUrl`

### Stripe webhook scaffold
- `POST /api/stripe/webhook`
- parse `Stripe-Signature`
- HMAC SHA-256 verify cez Web Crypto
- zatial len scaffold/logging

## 5. Frontend stack
- jeden hlavny `index.html`
- inline CSS v `<style>`
- modulovy JS cez `<script type="module" src="./order-form.js">`
- formular s poliami:
  - `balik`
  - `meno`
  - `adresa`
  - `email`
  - `telefon`
  - `poznamka`
- fallback Stripe URL len pre localhost/test rezim
- status box a vizualna validacia inputov

## 6. Dokumentacna vrstva
- 20 markdown suborov mimo vendor
- 65 txt suborov mimo vendor
- z toho 55 txt placeholderov v biznis priecinkoch
- supporting binarne assety:
  - 3 PDF
  - 2 DOCX
  - 1 PNG
  - 1 MP4

## 7. Vendor a generated vrstvy
| Cesta | Typ | Popis |
|---|---|---|
| `node_modules/` | vendor | root zavislosti, ~199M |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/node_modules/` | vendor | nested zavislosti, ~199M |
| `.wrangler/` | generated | root Wrangler state/tmp |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.wrangler/` | generated | nested dev bundle/tmp |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.netlify/` | generated/historicky | Netlify metadata |

## 8. Hlavny technicky zaver
Technologicky je to minimalisticky stack bez frameworkov: staticky one-page frontend + Cloudflare backend + Stripe + KV. Chaos nevznika z komplexnosti techniky, ale z toho, ze popri hlavnom Pages projekte existuje este druhy root Worker backend a duplicitne docs/export vrstvy.
