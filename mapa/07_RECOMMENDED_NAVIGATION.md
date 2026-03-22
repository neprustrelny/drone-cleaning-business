# RECOMMENDED NAVIGATION

## Odporucane poradie citania

### 1. Najprv zisti realny stav a priority
Precitaj v tomto poradi:
1. `STATUS.md`
2. `QUEUE.md`
3. `CASHFLOW_2026.md`
4. `00_RUNBOOK_CODEX.md`

Preco:
- tieto subory vysvetlia, co je ciel, co je uz hotove a co je otvorene

### 2. Potom otvor hlavny produktovy priecinok
Precitaj:
1. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`
2. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md`
3. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
4. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js`
5. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`
6. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/stripe/webhook.ts`

Preco:
- tam realne zije produkt, funnel aj backend flow

### 3. Az potom sa pozri na root Worker vrstvu
Precitaj:
1. `index.js`
2. `order-handler.js`
3. `wrangler.toml`
4. `test/order-handler.test.js`

Preco:
- tato vrstva je dolezita, ale az sekundarna voci hlavnemu Pages projektu

### 4. Potom skontroluj frontend testy
Precitaj:
1. `test/order-form.test.js`
2. `README_RUN_LOCAL_AND_TEST.md`

Preco:
- rychlo pochopis, co je testovane a aky flow sa ocakava

### 5. Potom prejdi len naplnene txt dokumenty
Precitaj:
1. `DRONE_CLEANING_BUSINESS/00_MASTER_STRATEGY/SERVICE_MISSION_DESCRIPTION.txt`
2. `DRONE_CLEANING_BUSINESS/01_LEVEL_1_BASIC/CHECKLIST_LEVEL_1.txt`
3. `DRONE_CLEANING_BUSINESS/02_LEVEL_2_URBAN/CHECKLIST_LEVEL_2.txt`
4. `DRONE_CLEANING_BUSINESS/03_LEVEL_3_HIGH_RISE/CHECKLIST_LEVEL_3.txt`
5. `DRONE_CLEANING_BUSINESS/04_LEVEL_4_INDUSTRIAL/CHECKLIST_LEVEL_4.txt`

Preco:
- toto je realny obsah zo sirokej dokumentacnej databazy
- ostatne txt subory su zatial hlavne skeletony

### 6. `_audit/` a `_delivery/` citaj az nakoniec
Preco:
- su uzitocne na kontrolu a handover
- nie su spolahlive ako prve source of truth
- cast obsahu je starsia alebo duplicitna

## Co je source of truth

### Pre prioritizaciu a biznis smer
- `STATUS.md`
- `QUEUE.md`
- `CASHFLOW_2026.md`

### Pre aktualnu implementaciu produktu
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`

## Co je len podporne
- `REPORT.md`
- `_audit/`
- vacsina `_delivery/`
- dotacne podklady v `Skalica_dotacie_z_rozpoctu_mesta/`
- prazdne txt skeletony v `00_...` az `10_...`

## Co mozes pri prvom priechode ignorovat
- obe `node_modules/`
- obe `.wrangler/`
- `.netlify/`
- prazdne `.txt` skeletony
- starsie kopie suborov v `_delivery/`
