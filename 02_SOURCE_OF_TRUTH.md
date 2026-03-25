# SOURCE OF TRUTH

## 1. Main project area
Hlavne aktivne jadro projektu je:
`DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`

Podla aktualneho workspace je to hlavna implementacna oblast pre landing page, funnel, frontend logiku, order flow a Cloudflare Pages backend.

## 2. Root-level strategic documents
Tieto root subory su hlavne pre pochopenie smerovania:
- `STATUS.md` - centralny stav projektu, workstreamov a otvorenych blockerov.
- `QUEUE.md` - prioritizovany zoznam dalsich krokov a taskov.
- `CASHFLOW_2026.md` - kanonicky financny model, preorder cash logika a scenare.
- `00_RUNBOOK_CODEX.md` - operacny runbook pre dennu prioritizaciu funnelu, predobjednavok a cashflow.

Root `README.md` sluzi ako public-facing billboard repa. Ma rychlo vysvetlit, co repo je a co nie je. Detailne interne operativne veci patria sem, do runbookov a do aktivnych technickych docs, nie do verejneho README.

Source of truth je v tomto workspaci vrstveny:
- biznis ciel = `01_PROJECT_GOAL_AND_BUSINESS_MODEL.md`
- orientacia = `02_SOURCE_OF_TRUTH.md`
- mapa = `mapa/00_MASTER_MAP.md`
- operativny stav = `STATUS.md`
- hlavne technicke jadro = `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`

## 3. Main technical files
Pre technicke pochopenie webu a funnelu su hlavne tieto subory:
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-packages.js`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/FLOW_ORDER_STRIPE.md`

## 4. Secondary or parallel technical branch
Root obsahuje aj vedlajsi backend/test harness:
- `index.js`
- `order-handler.js`
- root `wrangler.toml`
- `test/`

Tato vetva je sekundarna a sluzi hlavne na rychly test a kontrolu logiky. Hlavna produkcna cesta je Cloudflare Pages vetva v `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`.

## 5. Non-canonical or supporting areas
Tieto casti nie su hlavne source-of-truth oblasti:
- `_delivery/`
- `_audit/`
- `node_modules/`
- `.wrangler/`
- placeholder `.txt` databaza v `00_...` az `10_...`

## 6. Recommended reading order
1. `01_PROJECT_GOAL_AND_BUSINESS_MODEL.md`
2. `02_SOURCE_OF_TRUTH.md`
3. `mapa/00_MASTER_MAP.md`
4. `STATUS.md`
5. `QUEUE.md`
6. `CASHFLOW_2026.md`
7. web project handover a site overview
8. technicke subory

## 7. GitHub push workflow (SSH)
Tento repo je nastavene na SSH remote, nie na HTTPS.

Over remote:
- `git remote -v`
- ocakavany SSH remote: `git@github.com:neprustrelny/drone-cleaning-business.git`

Over stav pred pushom:
- `git status`
- `git log --oneline --decorate -3`

Push do hlavneho branchu:
- `git push origin main`

Troubleshooting:
- pri `Permission denied (publickey)`
  - over, ze mas nacitany spravny SSH key a ze GitHub ucet ma priradeny jeho public key
  - otestuj spojenie cez `ssh -T git@github.com`
- kde je SSH public key
  - hlavny lokalny public key je v `~/.ssh/id_ed25519.pub`
  - v tomto prostredi existuje aj `~/.ssh/tunnel_key.pub`
  - do GitHubu patri ten key, ktory realne pouzivas na git push
- GitHub nastavenie
  - otvor `Settings -> SSH and GPG keys`
  - pridaj obsah public key a potom znovu over `git remote -v` aj `git push origin main`
