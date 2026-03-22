# ROOT ANALYSIS - `DRON/`

## Root zaver v jednej vete
Root `DRON/` je kombinacia riadiacej dokumentacie, maleho Cloudflare Worker test harnessu a odkazu na vacsi hlavny projekt v `DRONE_CLEANING_BUSINESS/`.

## Polozka po polozke

### `.wrangler/`
- Typ: generated priecinok
- Ucel: lokalne dev/state artefakty pre Wrangler
- Status: generated
- Poznamka: nepatri do logickeho source jadra; obsahuje tmp a state data

### `00_RUNBOOK_CODEX.md`
- Typ: markdown dokument
- Ucel: denny operacny runbook; definuje prioritizaciu funnel -> zalohy -> cashflow
- Status: aktivny riadiaci dokument
- Poznamka: velmi prakticky pre pracovny rezim, nie pre implementacne detaily

### `CASHFLOW_2026.md`
- Typ: markdown dokument
- Ucel: financny model, rocne a mesacne scenare, KPI a rozhodovacie pravidla
- Status: aktivny strategicky dokument
- Poznamka: jeden z najsilnejsich root suborov; vysvetluje 50 EUR zalohu a priemer 1 050 EUR

### `CHANGELOG.md`
- Typ: markdown dokument
- Ucel: kratka historia zmien vo workspace
- Status: aktivny pomocny dokument
- Poznamka: uzitocny na rychle pochopenie, co sa menilo 2026-02-12 a 2026-03-20

### `DRONE_CLEANING_BUSINESS/`
- Typ: hlavny projektovy priecinok
- Ucel: obsahuje biznis databazu, operacne checklisty, podporne materialy a hlavny webovy projekt
- Status: aktivne jadro workspace
- Poznamka: bez tohto priecinka sa neda pochopit realny zmysel celeho repo

### `QUEUE.md`
- Typ: markdown dokument
- Ucel: prioritizovany task backlog s KPI a stavmi
- Status: aktivny riadiaci dokument
- Poznamka: hovori, ze top priorita je produkcny Stripe env, `/api/order`, DE landing a analytics

### `REPORT.md`
- Typ: markdown dokument
- Ucel: starsi audit/diagnosticky report
- Status: historicky pomocny dokument
- Poznamka: cast obsahu uz nie je uplne aktualna; napr. hovori o placeholder endpointoch a starsich auditnych zisteniach

### `STATUS.md`
- Typ: markdown dokument
- Ucel: centralny stav projektu, workstreamy, klucove subory, blokery
- Status: aktivny source-of-truth dokument
- Poznamka: najlepsie miesto na rychle pochopenie projektu pred citanim kodu

### `index.js`
- Typ: JavaScript source
- Ucel: root Cloudflare Worker entrypoint; routuje `/api/order` na `handleOrderRequest`
- Status: aktivny, ale vedlajsi alebo paralelny backend
- Poznamka: technicky jednoduchsi ako nested `functions/api/order.ts`; preto posobi skor ako samostatny minimalny harness alebo starsia/pridruzena implementacia

### `node_modules/`
- Typ: vendor priecinok
- Ucel: root Node/Wrangler zavislosti
- Status: vendor
- Poznamka: cca 199M; nema sa analyzovat po jednotlivych suboroch

### `order-handler.js`
- Typ: JavaScript source
- Ucel: validacia objednavkoveho payloadu, JSON odpovede, volitelny zapis do KV
- Status: aktivny pomocny backend source
- Poznamka: pouziva povinne polia `balik`, `meno`, `adresa`, `email`; vracia `200/400/405`

### `package-lock.json`
- Typ: lockfile
- Ucel: uzamknute root Node zavislosti
- Status: aktivny vendor/config
- Poznamka: viaze root `wrangler` dependency

### `package.json`
- Typ: Node config
- Ucel: root projekt `dron`; test script cez `node:test`; `dev` script deleguje do nested weboveho projektu
- Status: aktivny config
- Poznamka: velmi dolezity signal chaosu:
  - root package patri root workeru
  - ale `npm run dev` spusta nested webovy projekt

### `test/`
- Typ: test priecinok
- Ucel: automaticke testy pre frontend helper a root order handler
- Status: aktivny pomocny priecinok
- Poznamka: testy su male, ale cielene a uzitocne

### `wrangler.toml`
- Typ: TOML config
- Ucel: root Cloudflare Worker konfiguracia `name = "dron"`, `main = "index.js"`, KV binding `LEADS`
- Status: aktivny config
- Poznamka: root backend je naviazany na KV, ale neobsahuje Stripe flow

### `mapa/`
- Typ: novy dokumentacny priecinok
- Ucel: orientacna mapa workspace
- Status: novy orientacny vystup
- Poznamka: jedina zmena vykonana v tomto mapovacom cykle

## Root technicka interpretacia

### Co root robi dobre
- Ma jasnu riadiacu dokumentaciu.
- Ma testy.
- Ma jednoduchy worker backend.
- Ma priamy odkaz na hlavny biznis/web projekt cez `npm run dev`.

### Co root miesa dokopy
- Riadenie projektu
- financny model
- root backend
- testy
- delegovanie do nested web projektu

To znamena, ze root nie je cisty samostatny app root ani cisty docs root. Je to hybridny koordinacny root.

## Najdolezitejsie root zistenia
1. Root `STATUS.md` a `QUEUE.md` su prakticke source-of-truth pre rozhodovanie.
2. Root `index.js` + `order-handler.js` tvoria samostatny mini backend.
3. Hlavny realny produkt vsak sedi nizsie v `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`.
4. Root `package.json` prepaja oba svety: testuje root, ale dev server spusta nested projekt.
5. `REPORT.md` je uz skor historicky auditny dokument nez aktualny navod.
