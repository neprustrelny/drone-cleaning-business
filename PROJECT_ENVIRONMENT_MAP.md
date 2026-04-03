# PROJECT ENVIRONMENT MAP

## 1. Executive summary
Tento workspace nie je dronovy autopilot ani telemetry repo. Aktualne jadro je public-facing preorder funnel pre sluzbu cistenia striech a fasad dronom pod znackou `Cista strecha z neba`.

Aktivna aplikacia zije v `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/` a bezi ako staticky one-pager s externym JS modulom a Cloudflare Pages Functions backendom. Funnel zbiera platené rezervacie pilotnych slotov pre 4 baliky, ceny urcuje server a checkout ide cez Stripe.

Repo je zmiesane prostredie. Popri live app vrstve obsahuje:
- root riadiace dokumenty a cashflow model,
- paralelny root Worker/test harness,
- velku biznis knowledge-base vrstvu `00_...` az `10_...`, z ktorej cast je stale len skeleton alebo dokumentuje starsi 50 EUR deposit model,
- auditne a delivery snapshoty, ktore su historicke a v aktivnom flow uz neplatia.

Aktualny stav: frontend + hlavny order flow su funkcne a zdokumentovane, root testy prechadzaju, ale produkcny payment lifecycle nie je uzavrety. Chyba live Stripe secret v Pages, post-payment paid-state update, analytics, pravny dokument vo footeri a jasne odlisena hranica medzi live vrstvou a legacy obsahom.

## 2. Root structure
| Oblast | Path | Uloha |
| --- | --- | --- |
| Root docs | `README.md`, `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`, `00_RUNBOOK_CODEX.md`, `01_PROJECT_GOAL_AND_BUSINESS_MODEL.md`, `02_SOURCE_OF_TRUTH.md` | Riadenie projektu, priorita, cashflow, source-of-truth orientacia |
| Root runtime harness | `index.js`, `order-handler.js`, `wrangler.toml`, `package.json`, `test/` | Paralelny Worker/test harness pre rychlu validaciu order flow |
| Active application | `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/` | Live landing page, frontend modul, package mapping, Pages Functions backend, app docs |
| Business knowledge base | `DRONE_CLEANING_BUSINESS/00_MASTER_STRATEGY` az `10_EXPANSION_PLAN` | Strategia, marketing, financie, operacie, compliance; mix partial docs a legacy obsahu |
| Support docs | `mapa/`, `REPO_PUBLIC_FACE.md`, `CHANGELOG.md` | Orientacia, repo face, historicky zapis zmien |
| Historical / audit layers | `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_audit/`, `_delivery/`, `REPORT.md` | Starsie snapshoty a audity; nie su kanonicky source of truth |
| Generated / vendor | root `node_modules/`, app `node_modules/`, root `.wrangler/`, app `.wrangler/`, app `.netlify/` | Vendor a lokalne artefakty, nie source obsah |

Pozor na root dojem: vizualne posobi, akoby root bol hlavna appka, ale realny produkt je hlbsie v nested app priecinku.

## 3. Active application layer
Aktivna appka je v `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`.

Hlavne front-end entry pointy:
- `index.html`: jediny verejny page entry point, obsahuje copy, sekcie, CTA, formular, FAQ, recenzie, footer.
- `order-form.js`: aktivna frontend logika pre citanie formulara, validaciu, serializaciu payloadu, `POST /api/order`, status message a redirect na serverom vratene `checkoutUrl`.
- `order-packages.js`: kanonicky katalog balikov a cien pre frontend aj backend.

API / functions vrstva:
- `functions/api/order.ts`: hlavny Cloudflare Pages endpoint pre `POST /api/order`.
- `functions/api/stripe/webhook.ts`: Stripe webhook scaffold s verifikaciou podpisu a logovanim eventu, bez paid-state update.

Objednavkovy flow:
- User vyberie balik, typ objektu, krajinu a kontaktne udaje.
- Frontend nikdy neposiela doveruhodnu cenu; posiela len `balik` a lead kontext.
- Server nacita cenu z `order-packages.js`, validuje payload, ulozi lead, pripadne posle `lead_created` webhook, vytvori Stripe Checkout Session a vrati `checkoutUrl`.
- Frontend len redirectne na Stripe a po navrate cita `?checkout=success` alebo `?checkout=cancel`.

Pricing / packages logika:
- `house_s`: sluzba od 349 EUR, rezervacia 149 EUR.
- `house_m`: sluzba od 590 EUR, rezervacia 199 EUR.
- `house_l`: sluzba od 890 EUR, rezervacia 299 EUR.
- `b2b_audit`: audit / prioritny slot 990 EUR.

Podporne app docs:
- `PROJECT_HANDOVER.md`
- `SITE_OVERVIEW.md`
- `FLOW_ORDER_STRIPE.md`
- `README_RUN_LOCAL_AND_TEST.md`
- `README_PROD_SETUP.md`
- `README_DEPLOY_CLOUDFLARE.md`

Podporne neruntime assety v app priecinku:
- `ChatGPT Image Jan 27, 2026, 05_32_36 PM.png`
- `Biznis_plán__Čistenie_dronom.mp4`
- `Kassel_Drone_Profit_Scenarios.pdf`
- `Projektový Runbook.pdf`

## 4. Documentation layer
Aktivna dokumentacna vrstva ma dnes tri urovne.

Kanonicke / vysoka doveryhodnost pre live funnel:
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-packages.js`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`

Sekundarne, ale aktualne pomocne docs:
- `SITE_OVERVIEW.md`
- `FLOW_ORDER_STRIPE.md`
- `README_RUN_LOCAL_AND_TEST.md`
- `README_PROD_SETUP.md`
- root `README.md`
- root `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`, `00_RUNBOOK_CODEX.md`, `01_PROJECT_GOAL_AND_BUSINESS_MODEL.md`, `02_SOURCE_OF_TRUTH.md`

Podporne orientacne docs:
- `mapa/` vrstva; dobra na rychlu orientaciu, nie na autoritativne rozhodovanie o live flow.

Zastarana alebo rizikova docs vrstva:
- `REPORT.md`: stale ukazuje starsi local curl bez `balik` a `typObjektu`.
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_audit/*`: stale tvrdi 50 EUR deposit model, placeholder `/api/order` a inline JS.
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_delivery/*`: stale obsahuje starsi 50 EUR snapshot a odlisny `index.html`.
- Cast biznis docs v `DRONE_CLEANING_BUSINESS/00_...` az `10_...`: viacere subory stale hovoria o 50 EUR zalohe a starsom funnel modeli.
- `03_GITHUB_SETUP.md`: tvrdi, ze `origin` nie je nastaveny; realne `origin` uz existuje.
- `04_NETLIFY_DEPLOY_SETUP.md`: spravne upozornuje na limity Netlify, ale stale nesie starsi env signal `STRIPE_PRICE_ID_DEPOSIT_50` a nie je to primarny deploy smer.

Dokumentacna statistika pre `DRONE_CLEANING_BUSINESS/` bez vendor/generated vrstiev:
- 84 `.md` / `.txt` dokumentov.
- 57 neempty dokumentov.
- 27 prazdnych placeholderov.

## 5. Runtime and stack
Technologie a runtime:
- Frontend: staticky HTML + inline CSS + vanilla JS ES modules.
- Backend: Cloudflare Pages Functions v TypeScripte (`functions/api/*.ts`).
- Local testing: Node `node:test`.
- Local/dev tooling: Wrangler.
- Externe sluzby: Stripe Checkout API, optional external notification webhook / CRM.

Co bezi na fronte:
- `index.html`
- `order-form.js`
- `order-packages.js`

Co bezi na backende:
- `functions/api/order.ts` na Cloudflare Pages.
- `functions/api/stripe/webhook.ts` ako scaffold.

Charakter aplikacie:
- Staticky web + serverless funkcie.
- Bez buildu, bez bundlera, bez frameworku.

Root package scripts:
- `npm test` -> `node --test test/*.test.js`
- `npm run dev` -> deleguje do nested app projektu a spusta `wrangler pages dev .`

Nested app package scripts:
- `npm run dev` -> `wrangler pages dev .`
- `npm run deploy` -> `wrangler pages deploy .`

Predpokladane runtime prostredia:
- Local dev: Wrangler Pages dev server, default `http://localhost:8788`.
- Production: Cloudflare Pages + KV binding `LEADS`.
- Root Worker harness je spustitelny cez root `wrangler.toml`, ale nie je to hlavna lokalna ani produkcna cesta.

Zavislosti a ich stav:
- Root aj nested `package.json` maju len `wrangler` ako explicitnu dev dependency.
- Root `wrangler` verzia: `^4.64.0`.
- Nested `wrangler` verzia: `^4.49.0`.
- V repozitari su dve separatne `node_modules/` vrstvy, obe cca 199M.

## 6. Deployment and infra
Primarny deploy smer dnes:
- Cloudflare Pages z `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`.

Deploy configy:
- Root `wrangler.toml`: konfiguracia pre paralelny root Worker harness (`index.js`).
- App `wrangler.toml`: Cloudflare Pages config s `pages_build_output_dir = "."` a KV bindingom `LEADS`.
- App `.netlify/netlify.toml` + `.netlify/state.json`: lokalna Netlify metadata/link, nie hlavny infra zdroj.

Env expectations v live kode:
- `STRIPE_SECRET_KEY`: required pre vytvorenie checkout session.
- `STRIPE_SUCCESS_URL`: optional; ak chyba, generuje sa z request origin.
- `STRIPE_CANCEL_URL`: optional; ak chyba, generuje sa z request origin.
- `NOTIFY_WEBHOOK_URL`: optional; posiela `lead_created` notifikaciu pred platbou.
- `STRIPE_WEBHOOK_SECRET`: optional teraz, ale potrebny na verifikovany Stripe webhook.

Infra zavislosti s realnym dopadom:
- KV binding `LEADS`: rate limit a lead storage; bez neho checkout moze fungovat, ale lead storage a rate limit vrstva nie.
- Stripe secret: bez neho `/api/order` vrati `503 stripe_not_configured`.
- Stripe webhook secret: bez neho webhook signature verification preskakuje.

Deployment ambiguity:
- Root repo ma vlastny Worker config aj app Pages config.
- Root `npm run dev` ide na nested app, nie na root Worker.
- Netlify je v repo pritomne ako metadata a samostatny setup dokument, ale plne funkcny funnel dnes pocita s Cloudflare Pages Functions, nie s Netlify Functions.

Git / repo stav relevantny pre infra:
- `origin` je nastavene na `git@github.com:neprustrelny/drone-cleaning-business.git`.
- `gh` CLI nie je nainstalovane.
- `netlify` CLI je nainstalovane.

## 7. Test layer
Existuju 2 root test subory:
- `test/order-form.test.js`
- `test/order-handler.test.js`

Co realne pokryvaju:
- `test/order-form.test.js` importuje live nested `order-form.js` a testuje required fields, package validity, serializaciu payloadu, `leadSource` resolution a submit flow s redirectom na backendom vratene `checkoutUrl`.
- `test/order-handler.test.js` testuje root `order-handler.js`, teda paralelny harness, nie priamo `functions/api/order.ts`.

Co netestuju:
- `functions/api/order.ts` priamo.
- `functions/api/stripe/webhook.ts` vobec.
- realny Stripe API call.
- realne KV rate limiting spravanie v Pages runtime.
- integraciu `index.html` DOM -> `order-form.js` v browseri.
- analytics a legal links.

Aktualny execution stav:
- Root `npm test` bol spusteny.
- Vysledok: 15/15 testov pass.

Verdikt k pokrytiu:
- Pokrytie je dobre pre frontend helper logiku a pre paralelny root harness.
- Pokrytie nie je dostatocne pre produkcny Pages backend a post-payment vrstvu.

## 8. Funnel and payment flow
Presny aktualny funnel:
1. User vstupuje na `index.html`.
2. Hlavne CTA `Chcem pilotny termin` v sticky headri, hero a bottom CTA anchoruje na `#objednavka`.
3. Landing page komunikuje 4 baliky, benefity, FAQ, proces a kontakt.
4. Formular zbiera:
   - required: `balik`, `typObjektu`, `krajina`, `meno`, `adresa`, `email`
   - optional: `telefon`, `poznamka`
   - technical: `website` honeypot
   - derived: `leadSource` z query params alebo referrera
5. Frontend validuje required fields a email format, lokalne zvyrazni chyby a neposiela nevalidny formular.
6. Pri validnom formulari frontend serializuje payload a posle `POST /api/order` s JSON body.
7. Backend v `functions/api/order.ts`:
   - povoli len `POST` a `OPTIONS`,
   - spravi IP-based rate limit cez KV, ak je KV dostupne,
   - validuje `balik`, `typObjektu`, `meno`, `adresa`, `email`, honeypot,
   - precita package config z `order-packages.js`,
   - vytvori `leadRecord`,
   - ulozi lead do KV, ak je KV dostupne,
   - posle `lead_created` webhook na `NOTIFY_WEBHOOK_URL`, ak je nastaveny,
   - az potom vytvori Stripe Checkout Session.
8. Stripe Checkout Session sa vytvara server-side cez REST call na Stripe API. `unit_amount` sa berie z `reservationPriceEur * 100`.
9. Do Stripe metadata sa zapisuje `lead_id`, `package`, `typObjektu`, `krajina`, `leadSource`, `meno`, `email`, `telefon`, `adresa`, `reservationPriceEur`.
10. Backend vrati `{ ok: true, leadId, reservation, checkoutUrl }`.
11. Frontend len redirectne browser na `checkoutUrl`.
12. Po navrate z checkoutu frontend zobrazi:
   - `?checkout=success` -> success hlasku
   - `?checkout=cancel` -> error/cancel hlasku
13. Dalsi krok po platbe je manualne vyhodnotenie objektu, pocasia a prevadzkovej pripravenosti.

Webhooky a gaps:
- `functions/api/stripe/webhook.ts` existuje a vie verifikovat Stripe podpis.
- Aktualne len loguje `eventType` a vracia `{ ok: true }`.
- Neriesi paid-state update, CRM sync, email potvrdenie, scheduler ani dalsi post-payment workflow.
- `NOTIFY_WEBHOOK_URL` je lead-created signal, nie paid signal.

## 9. Source-of-truth verdict
Najvyssia autorita pre realny stav dnes:
1. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
2. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js`
3. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-packages.js`
4. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`
5. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`
6. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md`
7. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/FLOW_ORDER_STRIPE.md`
8. root `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`, `00_RUNBOOK_CODEX.md`, `README.md`
9. root harness `index.js`, `order-handler.js`, `test/` ako supporting validation layer
10. `mapa/` ako supporting orientation layer

Co je len sekundarne alebo historical:
- `_delivery/`
- `_audit/`
- `REPORT.md`
- vacsina starsich business docs, ktore stale hovoria o 50 EUR zalohe

Co ma developer citat ako prve:
1. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`
2. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
3. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js`
4. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-packages.js`
5. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts`
6. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md`
7. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/FLOW_ORDER_STRIPE.md`

## 10. Risks and inconsistencies
| Problem | Kde | Dopad | Priorita |
| --- | --- | --- | --- |
| Dva backend smery v jednom repo | root `index.js` + `order-handler.js` + root `wrangler.toml` vs app `functions/api/order.ts` + app `wrangler.toml` | Orientacny chaos, nespravny deploy/dev entry point | High |
| `_delivery` a `_audit` stale opisuje 50 EUR model a placeholder backend | app `_delivery/*`, app `_audit/*` | Noveho cloveka mozu odviest k nespravnemu produktu a flowu | High |
| Payment lifecycle nie je uzavrety | `functions/api/stripe/webhook.ts`, `README_PROD_SETUP.md`, `STATUS.md` | Neda sa spolahlivo evidovat zaplatena rezervacia a post-payment nasledne kroky | High |
| Lead webhook sa posiela pred platbou | `functions/api/order.ts` | CRM/notifikacie mozu zamenit lead za uspesnu platbu | High |
| Footer link mieri na chybajuci dokument | `index.html` -> `/obchodne-podmienky.pdf` | Legal/trust gap v live UI | High |
| Analytics vrstva chyba | scan repo + `STATUS.md` + `SITE_OVERVIEW.md` | Nie je merany `visit -> form -> checkout -> payment` funnel | High |
| Root testy nevolaju Pages handler ani webhook | `test/*` | Falesny pocit pokrytia produkcneho backendu | Medium |
| Dve `node_modules` a dve Wrangler verzie | root + nested package setup | Zbytocna duplicita a potencialne verzne rozdiely v dev workflow | Medium |
| GitHub setup doc tvrdi, ze `origin` chyba | `03_GITHUB_SETUP.md` vs realny git stav | Zastarala infra dokumentacia | Medium |
| Netlify je v repo pritomne ako linked metadata | app `.netlify/*`, root `04_NETLIFY_DEPLOY_SETUP.md` | Miesanie deployment signalov; Netlify nie je plne funkcny backend path | Medium |
| Sirsia biznis knowledge-base vrstva obsahuje starsi 50 EUR model | `DRONE_CLEANING_BUSINESS/01_LEVEL_1_BASIC/*`, `05_MARKETING_AND_SALES/*`, `06_FINANCIALS/*` | Strategicke docs mozu odporovat live funnelu | Medium |

## 11. Recommended cleanup plan
Najprv:
- Oznacit `_delivery/` a `_audit/` jednoznacne ako historical snapshot, alebo ich refreshnut na aktualny package-based model.
- Dokoncit post-payment vrstvu: paid-state update, CRM/event flow a jasne oddelit `lead_created` od `payment_completed`.
- Dodat `obchodne-podmienky.pdf` alebo odstranit broken link.
- Pridat minimalnu analytics vrstvu pre `visit -> form -> checkout -> success`.

Potom:
- Rozhodnut, ci root Worker harness zostava ako intentional test layer; ak ano, oznacit ho explicitne ako supporting a nie produkcny.
- Zjednotit `wrangler` verziu a zredukovat duplicitne vendor vrstvy, ak to workflow dovoli.
- Opravit `03_GITHUB_SETUP.md`, `04_NETLIFY_DEPLOY_SETUP.md` a `REPORT.md` tak, aby neprotirecili realnemu stavu.

Neskor:
- Prejst business docs v `00_...` az `10_...` a oznacit tie, ktore stale dokumentuju 50 EUR model, ako legacy alebo ich prepisat.
- Udrziavat `PROJECT_HANDOVER.md`, `SITE_OVERVIEW.md`, root `README.md` a truth matrix synchronne pri kazdej zmene funnelu.

