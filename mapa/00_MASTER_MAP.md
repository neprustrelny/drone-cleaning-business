# DRON - MASTER MAP

## 1. Rychla orientacia
- Hlavne technicke jadro workspace: `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`
- Hlavne riadiace a rozhodovacie dokumenty: root `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`, `00_RUNBOOK_CODEX.md`
- Vedlajsi root backend/test harness: `index.js`, `order-handler.js`, `test/`, `wrangler.toml`
- Velka biznis dokumentacna databaza: `DRONE_CLEANING_BUSINESS/00_MASTER_STRATEGY` az `10_EXPANSION_PLAN`
- Podporne a historicke vrstvy: `_audit/`, `_delivery/`, `REPORT.md`, vendor priecinky, generovane `.wrangler/` a `.netlify/`

## 2. Co je v root `DRON/`
- `.wrangler/`
  - Generovane lokalne Cloudflare/Wrangler artefakty.
- `00_RUNBOOK_CODEX.md`
  - Denny operacny runbook s prioritou na funnel, zalohy a cashflow.
- `CASHFLOW_2026.md`
  - Financny model a scenare pre rok 2026.
- `CHANGELOG.md`
  - Strucna historia vykonanych zmien.
- `DRONE_CLEANING_BUSINESS/`
  - Najvacsi obsah workspace: biznis dokumentacia + hlavny webovy projekt.
- `QUEUE.md`
  - Prioritizovany tasklist.
- `REPORT.md`
  - Auditny report a starsie diagnosticke poznamky.
- `STATUS.md`
  - Najdolezitejsi stavovy dokument workspace.
- `index.js`
  - Minimalny root Cloudflare Worker endpoint pre `/api/order`.
- `node_modules/`
  - Root vendor zavislosti pre root worker/test vrstvu.
- `order-handler.js`
  - Validacia a obsluha root order API.
- `package-lock.json`, `package.json`
  - Root Node/Wrangler konfiguracia.
- `test/`
  - Testy pre frontend helper a root order handler.
- `wrangler.toml`
  - Root Worker konfiguracia s KV bindingom `LEADS`.

## 3. Hlavne priecinky
| Priecinok | Uloha | Status |
|---|---|---|
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/` | Hlavny landing page + Cloudflare Pages Functions projekt | aktivne jadro |
| `DRONE_CLEANING_BUSINESS/00_MASTER_STRATEGY` az `10_EXPANSION_PLAN` | Biznis, operacna, financna a regulatorna dokumentacia | vacsinou skeleton/placeholder |
| `DRONE_CLEANING_BUSINESS/Skalica_dotacie_z_rozpoctu_mesta/` | Dotacne podklady PDF/DOCX | pomocne |
| `test/` | Automaticke testy cez `node:test` | aktivne pomocne |
| `node_modules/` | Root zavislosti | vendor |
| `.wrangler/` | Root generovane data | generated |
| `mapa/` | Nova mapovacia dokumentacia | nova orientacna vrstva |

## 4. Klucove subory
| Subor | Preco je dolezity |
|---|---|
| `STATUS.md` | Najlepsi root prehlad stavu projektu a otvorenych blockerov |
| `QUEUE.md` | Priorita dalsich krokov |
| `CASHFLOW_2026.md` | Financna logika celeho biznisu |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md` | Najpraktickejsi handover pre webovy projekt |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md` | Struktura a funnel logika webu |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html` | Hlavna landing page |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js` | Frontend objednavkova logika |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts` | Hlavny kandidat na produkcny backend pre objednavky |
| `index.js` + `order-handler.js` | Paralelna root implementacia jednoducheho order API |
| `test/order-form.test.js` + `test/order-handler.test.js` | Overenie validacie a backend odpovedi |

## 5. Co je kde
- Ak chces pochopit realny stav projektu:
  - zacni v `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`
- Ak chces pochopit hlavny produkt:
  - chod do `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`
- Ak chces pochopit rozsah biznis dokumentacie:
  - prejdi `DRONE_CLEANING_BUSINESS/00_MASTER_STRATEGY` az `10_EXPANSION_PLAN`
- Ak chces overit technicku implementaciu:
  - porovnaj root worker (`index.js`) s Pages backendom (`functions/api/order.ts`)
- Ak chces odlisit balast:
  - ignoruj `node_modules/`, `.wrangler/`, vacsinu `_delivery/` a starsie auditne exporty, kym ich nepotrebujes

## 6. Najdolezitejsie zistenie
Workspace nema jedno jedine source of truth pre backend. Najrealnejsie aktivne jadro je landing page projekt v `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`, ale root obsahuje paralelny Worker backend, vlastne testy a vlastny `wrangler.toml`. To je hlavny zdroj orientacneho chaosu.
