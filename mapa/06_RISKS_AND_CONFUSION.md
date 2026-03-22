# RISKS AND CONFUSION

## 1. Najvacsie zdroje chaosu

### A. Dva backendy vedla seba
- Root backend:
  - `index.js`
  - `order-handler.js`
  - root `wrangler.toml`
- Hlavny Pages backend:
  - `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`
  - nested `wrangler.toml`

Prečo je to problem:
- nie je okamzite jasne, ktory backend je definitivny produkcny smer
- testy pokryvaju root handler, nie hlavny Pages endpoint
- root `npm run dev` spusta nested projekt, ale root `wrangler.toml` ukazuje iny backend

### B. Duplicitne exporty v `_delivery/`
- `AGENTS.md` je identicky s aktualnou verziou
- `SITE_OVERVIEW.md` je identicky, ale sam osebe je ciastocne zastarany
- `PROJECT_HANDOVER.md` je starsia verzia
- `index.html` je starsia verzia
- `CONTACTS_SCAN.md` obsahuje zjavne nepresnosti

Dopad:
- pri rychlom citani moze clovek otvorit starsiu kopiu a robit zle zavery

### C. Velka txt databaza je vacsinou prazdna
- 60 `.txt` suborov v `00_...` az `10_...`
- len 5 je realne vyplnenych
- 55 je prazdnych placeholderov

Dopad:
- strom vyzera velmi bohato, ale realny obsah je ovela mensi
- bez explicitneho oznacenia to posobi ako hotovy knowledge base, co nie je pravda

## 2. Konkretne nejasnosti a rizika

### Broken alebo nehotove prvky v hlavnom produkte
- `index.html` odkazuje na `/obchodne-podmienky.pdf`, ale subor v projekte chyba
- Stripe webhook je scaffold, nie plna post-payment automatizacia
- produkcny Stripe config je v docs stale otvoreny blocker

### Dokumentacne rozpory
- `SITE_OVERVIEW.md` stale spomina inline JS v `index.html`, no aktualne UI pouziva externy `order-form.js`
- cast `_audit/` a `_delivery/` dokumentov hovori o placeholder backende, hoci `functions/api/order.ts` uz existuje
- `REPORT.md` je uz skor historicky snapshot ako aktualny stav

### Hosting/infra signaly sa miesaju
- projekt je dnes orientovany na Cloudflare Pages
- v repo ostava `.netlify/` metadata
- to moze mylit pri urcovani cieloveho deploy prostredia

### Dvojite zavislosti
- root `node_modules/` ~199M
- nested `node_modules/` ~199M

Dopad:
- zbytocne duplikacie vendor vrstvy
- pri mapovani treba jasne oddelit technicke zavislosti od realneho source obsahu

## 3. Co je pravdepodobne aktivne vs. co je skor historicke

### Pravdepodobne aktivne
- `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
- `order-form.js`
- `functions/api/order.ts`
- `README_RUN_LOCAL_AND_TEST.md`
- root testy

### Pravdepodobne pomocne
- `00_RUNBOOK_CODEX.md`
- `CHANGELOG.md`
- `README_DEPLOY_CLOUDFLARE.md`
- `README_PROD_SETUP.md`
- dotacne PDF/DOCX subory

### Pravdepodobne historicke alebo sekundarne
- `REPORT.md`
- vacsina `_delivery/`
- cast `_audit/`
- `.netlify/`
- root Worker backend, ak sa ako hlavny smer pouziva Pages projekt

## 4. Co moze najviac pliest noveho cloveka
1. Root vyzera ako hlavny app root, ale hlavny produkt je hlbsie.
2. Root ma vlastny backend, ale docs a `npm run dev` ukazuju na nested backend.
3. `_delivery/` posobi ako oficialny export, ale nie je uplne synchronny s aktualnym stavom.
4. Velka stromova struktura dokumentov posobi hotovo, hoci vacsina `.txt` je prazdna.
5. Niektore auditne dokumenty hovoria o starsom stave produktu.

## 5. Prakticky zaver
Najvacsi chaos nie je v kode. Je v prelinani tychto vrstiev:
- aktivne rozhodovacie docs
- aktivny webovy projekt
- paralelny root backend
- stale alebo starsie auditne/exportne kopie
- rozsiahla, ale prevazne prazdna dokumentacna kostra
