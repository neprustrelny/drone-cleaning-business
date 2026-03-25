# ROOT ANALYSIS - `DRON/`

## Root zaver v jednej vete
Root `DRON/` je kombinacia riadiacej dokumentacie, maleho Cloudflare Worker test harnessu a odkazu na vacsi hlavny projekt v `DRONE_CLEANING_BUSINESS/`.

## Polozka po polozke

### `00_RUNBOOK_CODEX.md`
- Typ: markdown dokument
- Ucel: denny operacny runbook; definuje prioritizaciu funnel -> preorder cash -> cashflow
- Status: aktivny riadiaci dokument
- Poznamka: riadi kazdodenne rozhodovanie cez 42k preorder cash ciel a CAC

### `CASHFLOW_2026.md`
- Typ: markdown dokument
- Ucel: financny model, scenare a KPI pre preorder cash
- Status: aktivny strategicky dokument
- Poznamka: klucovy root subor pre 42k ciel, average preorder value a acquisition cost

### `CHANGELOG.md`
- Typ: markdown dokument
- Ucel: kratka historia zmien vo workspace
- Status: aktivny pomocny dokument

### `DRONE_CLEANING_BUSINESS/`
- Typ: hlavny projektovy priecinok
- Ucel: obsahuje biznis databazu, podporne materialy a hlavny webovy projekt
- Status: aktivne jadro workspace

### `QUEUE.md`
- Typ: markdown dokument
- Ucel: prioritizovany task backlog s KPI a stavmi
- Status: aktivny riadiaci dokument
- Poznamka: top priority su live Stripe, analytics, B2B audit funnel a SK piloty

### `REPORT.md`
- Typ: markdown dokument
- Ucel: starsi audit/diagnosticky report
- Status: historicky pomocny dokument
- Poznamka: uz nie je source of truth

### `STATUS.md`
- Typ: markdown dokument
- Ucel: centralny stav projektu, workstreamy, klucove subory, blokery
- Status: aktivny source-of-truth dokument
- Poznamka: najlepsie miesto na rychle pochopenie projektu pred citanim kodu

### `index.js` + `order-handler.js`
- Typ: JavaScript source
- Ucel: root Cloudflare Worker harness a testovatelny backend helper
- Status: aktivny, ale vedlajsi/paralelny backend
- Poznamka: udrziava novu package logiku pre testy, nie je hlavna produkcna cesta

### `package.json`
- Typ: Node config
- Ucel: root test script cez `node:test`; `dev` script deleguje do nested weboveho projektu
- Status: aktivny config

### `test/`
- Typ: test priecinok
- Ucel: automaticke testy pre frontend helper a root order handler
- Status: aktivny pomocny priecinok
- Poznamka: testy pokryvaju package mapping, validaciu a checkout redirect flow

### `wrangler.toml`
- Typ: TOML config
- Ucel: root Cloudflare Worker konfiguracia s KV bindingom `LEADS`
- Status: aktivny config

### `mapa/`
- Typ: orientacna dokumentacia
- Ucel: rychla mapa workspace a oddelenie source of truth od sekundarnych vrstiev
- Status: aktivny orientacny vystup

## Root technicka interpretacia
- Root robi dobre: riadiaci prehlad, cashflow, queue a rychly test harness.
- Root miesa dokopy: riadenie projektu, financny model, vedlajsi backend a testy.
- Hlavny produkt aj tak zije nizsie v `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`.

## Najdolezitejsie root zistenia
1. Root `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md` a `00_RUNBOOK_CODEX.md` su prakticke source-of-truth dokumenty.
2. Root `index.js` + `order-handler.js` tvoria testovaci a pomocny backend, nie hlavny produkcny flow.
3. Hlavny realny produkt sedi v `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`.
4. Root `package.json` prepaja testy v roote s dev serverom nested projektu.
5. `REPORT.md` a starsie exporty su uz skor historicke podklady nez aktivny navod.
