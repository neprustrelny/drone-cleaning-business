# PROJECTS OVERVIEW

## 1. Hlavne subsystémy
| Subsystém | Cesta | Co to je | Stav |
|---|---|---|---|
| Riadiaca vrstva workspace | root `DRON/` docs | `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`, `00_RUNBOOK_CODEX.md`, `CHANGELOG.md` | aktivne |
| Root Worker harness | root `index.js`, `order-handler.js`, `wrangler.toml`, `test/` | minimalny Cloudflare Worker backend + testy | aktivny, ale vedlajsi/paralelny |
| Hlavny webovy projekt | `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/` | landing page + order flow + Cloudflare Pages Functions + dokumentacia | hlavne aktivne jadro |
| Biznis/regulatorna databaza | `DRONE_CLEANING_BUSINESS/00_...` az `10_...` | strategicke a operacne txt dokumenty | prevazne skeleton |
| Grantove a supporting podklady | `DRONE_CLEANING_BUSINESS/Skalica_dotacie_z_rozpoctu_mesta/` | PDF/DOCX podklady k dotacii | pomocne |
| Audit/export vrstva | `.../stranka umyvanie strechy/_audit/`, `_delivery/` | audity, handover exporty, kopie suborov | pomocne, ciastocne zastarane |
| Vendor/generated vrstva | root a nested `node_modules/`, `.wrangler/`, `.netlify/` | zavislosti a lokalne build/dev data | vendor/generated |

## 2. Co je produkcne alebo najblizsie k produkcii

### Najblizsie k produkcii
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/stripe/webhook.ts`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/wrangler.toml`

Dovod:
- Toto je kompletny landing + backend flow pre `form -> /api/order -> Stripe`.
- Dokumenty v tomto priecinku hovoria o Cloudflare Pages deploymente a produkcnom setup-e.

### Riadiace source of truth
- `STATUS.md`
- `QUEUE.md`
- `CASHFLOW_2026.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`

Dovod:
- Tieto subory najpresnejsie vysvetluju, co sa teraz naozaj riesi.

## 3. Co je testovacie
- `test/order-form.test.js`
  - testuje frontend helper funkcie z `order-form.js`
- `test/order-handler.test.js`
  - testuje root backend handler z `order-handler.js`
- localhost fallback logika v `order-form.js`
  - explicitne povoluje test Stripe fallback len na `localhost` alebo cez query parameter

Poznamka:
- Testy pokryvaju root backend a frontend helper, nie plny Pages backend `functions/api/order.ts`.

## 4. Co je dokumentacia

### Aktivna dokumentacia
- Root markdowny: runbook, status, queue, cashflow, changelog
- Web docs: `PROJECT_HANDOVER.md`, `SITE_OVERVIEW.md`, `README_RUN_LOCAL_AND_TEST.md`, `README_DEPLOY_CLOUDFLARE.md`, `README_PROD_SETUP.md`

### Skeleton dokumentacia
- `DRONE_CLEANING_BUSINESS/00_MASTER_STRATEGY` az `10_EXPANSION_PLAN`
- realne naplnene su len:
  - `SERVICE_MISSION_DESCRIPTION.txt`
  - `CHECKLIST_LEVEL_1.txt`
  - `CHECKLIST_LEVEL_2.txt`
  - `CHECKLIST_LEVEL_3.txt`
  - `CHECKLIST_LEVEL_4.txt`
- ostatnych 55 `.txt` suborov je prazdnych

### Auditna alebo handover dokumentacia
- `_audit/` - auditne zistenia a next steps
- `_delivery/` - exportny balik pre review alebo odovzdanie

## 5. Co je infra alebo config
- root `package.json`, `package-lock.json`, `wrangler.toml`
- nested `package.json`, `package-lock.json`, `wrangler.toml`
- `.dev.vars.example`
- `.gitignore`
- `.netlify/netlify.toml`, `.netlify/state.json`

## 6. Co je historicke, duplicitne alebo neiste
- `_delivery/index.html` je starsia verzia ako aktualny root `index.html` v tom istom projekte
- `_delivery/PROJECT_HANDOVER.md` je starsi handover
- `_delivery/CONTACTS_SCAN.md` obsahuje zjavne chybne alebo stare tvrdenia
- `REPORT.md` a cast `_audit/` dokumentov hovori o placeholder endpointoch, hoci v projekte uz existuje `functions/api/order.ts`
- root Worker backend a nested Pages backend ziju vedla seba; bez dalsieho kontextu nie je uplne jasne, ktory ma byt definitvny produkcny backend

## 7. Co je hlavne jadro projektu
Hlavne jadro nie je cely root. Je rozdelene takto:
- biznisove a rozhodovacie jadro: root dokumenty `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`
- implementacne jadro: `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`

Ak by som mal ukazat len jedno miesto, kde dnes realne zije produkt, je to:
`DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`
