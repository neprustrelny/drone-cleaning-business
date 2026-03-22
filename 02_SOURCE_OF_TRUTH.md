# SOURCE OF TRUTH

## 1. Main project area
Hlavne aktivne jadro projektu je:
`DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`

Podla aktualneho workspace je to hlavna implementacna oblast pre landing page, funnel, frontend logiku, order flow a Cloudflare Pages backend.

## 2. Root-level strategic documents
Tieto root subory su hlavne pre pochopenie smerovania:
- `STATUS.md` - centralny stav projektu, workstreamov a otvorenych blockerov.
- `QUEUE.md` - prioritizovany zoznam dalsich krokov a taskov.
- `CASHFLOW_2026.md` - kanonicky financny model, cashflow logika a monetizacne predpoklady.
- `00_RUNBOOK_CODEX.md` - operacny runbook pre dennu prioritizaciu funnelu, zaloh a cashflow.

Source of truth je v tomto workspaci vrstveny:
- biznis ciel = `01_PROJECT_GOAL_AND_BUSINESS_MODEL.md`
- orientacia = `02_SOURCE_OF_TRUTH.md`
- operativny stav = `STATUS.md`
- hlavne technicke jadro = `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`

## 3. Main technical files
Pre technicke pochopenie webu a funnelu su hlavne tieto subory:
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md`

Prve tri su hlavne pre aktualnu implementaciu. Posledne dva su hlavne pre orientaciu a handover.

## 4. Secondary or parallel technical branch
Root obsahuje aj paralelnu alebo vedlajsiu backend vetvu:
- `index.js`
- `order-handler.js`
- root `wrangler.toml`
- `test/`

Tato vetva existuje a je technicky realna, ale moze sposobovat orientacny chaos, ak nie je vyslovne urcena ako hlavna produkcna cesta. Podla aktualneho workspace hlavna produkcna cesta aktualne posobi skor ako Cloudflare Pages vetva v `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`.
Root backend vetva nie je predvolena kanonicka produkcna cesta, pokial to nie je vyslovne urcene v dokumentacii.

## 5. Non-canonical or supporting areas
Tieto casti nie su hlavne source-of-truth oblasti:
- `_delivery/`
- `_audit/`
- `node_modules/`
- `.wrangler/`
- placeholder `.txt` databaza v `00_...` az `10_...`

Tieto oblasti su bud podporne, generovane, auditne, alebo zatial len pripravene ako kostra.

## 6. Recommended reading order
Odporucane poradie citania:
1. `01_PROJECT_GOAL_AND_BUSINESS_MODEL.md`
2. `02_SOURCE_OF_TRUTH.md`
3. `STATUS.md`
4. `QUEUE.md`
5. `CASHFLOW_2026.md`
6. web project handover a site overview
7. technicke subory
