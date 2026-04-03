# PROJECT TRUTH MATRIX

| Subor | Co tvrdi | V sulade s kodom | Doveryhodnost | Poznamka |
| --- | --- | --- | --- | --- |
| `README.md` | Repo je public preorder funnel, nie autopilot/telemetry; aktivna app je nested one-pager; payment lifecycle este chyba | Ano, vo vysokej miere | vysoka | Dobry public-facing summary, ale nie je najvyssia technicka autorita |
| `02_SOURCE_OF_TRUTH.md` | Aktivne jadro je nested app, root harness je sekundarny, `_delivery/_audit` nie su kanonicke | Ano, vo vysokej miere | vysoka | Dobra orientacia; spravne odlisuje Pages backend od root harnessu |
| `PROJECT_HANDOVER.md` | Aktivny model je 4-balíkovy preorder funnel s 42k cielom a server-side pricingom | Ano | vysoka | Prakticky najlepsi human handover pre aktualny stav |
| `SITE_OVERVIEW.md` | Popisuje strukturu page, CTA, polia formulara a server-side pricing | Ano | vysoka | Presny overview live page vrstvy |
| `AGENTS.md` | Hlavny flow je formular -> `POST /api/order` -> server-side Stripe -> redirect; pri zmene flow treba aktualizovat docs | Ano | vysoka | Procesna autorita pre dokumentacnu disciplinu |
| `FLOW_ORDER_STRIPE.md` | Frontend neposiela cenu, backend ju urcuje z `order-packages.js`, vracia `checkoutUrl`, success/cancel sa cita z query | Ano | vysoka | Kratka a presna flow dokumentacia |
| `index.html` | Reálny obsah funnelu: CTA, ceny, formulár, FAQ, kontakty, footer link, success/cancel UI hook cez JS | Ano | velmi vysoka | Najvyssia autorita pre realny user-facing funnel a copy |
| `order-form.js` | Reálna frontend validacia, serializacia, `leadSource`, `POST /api/order`, redirect na `checkoutUrl` | Ano | velmi vysoka | Najvyssia autorita pre aktivne frontend spravanie |
| `order-packages.js` | Kanonicke 4 baliky a rezervacne sumy 149/199/299/990 EUR | Ano | velmi vysoka | Najvyssia autorita pre pricing map used by client aj server |
| `functions/api/order.ts` | Hlavny Pages backend: validacia, KV, lead webhook, Stripe session creation, `stripe_not_configured` gap | Ano | velmi vysoka | Najvyssia autorita pre aktualny backend a env requirements |
| `functions/api/stripe/webhook.ts` | Webhook endpoint existuje, vie overit podpis, ale len loguje event | Ano | vysoka | Dolezity dokaz, ze payment-completion vrstva nie je dokoncena |
| `package.json` | Root `npm test` a `npm run dev` su entry pointy pre lokalnu prácu | Ano | vysoka | Realne entry pointy pre test a local dev z rootu |
| `wrangler.toml` (root) | Existuje paralelny root Worker s KV bindingom `LEADS` | Ano, ale nie ako hlavna produkcna cesta | stredna | Pravdivy, no lahko myli, lebo root `npm run dev` ide do nested appky |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/package.json` | Nested projekt je Pages app s `wrangler pages dev/deploy` | Ano | vysoka | Autorita pre live app dev/deploy skripty |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/wrangler.toml` | Cloudflare Pages config, KV binding `LEADS`, vars pre webhook | Ano | vysoka | Autorita pre app infra config |
| `README_RUN_LOCAL_AND_TEST.md` | Lokalny dev ide cez `npm run dev`, Stripe secret je optional pre beh ale required pre checkout, testy su root `npm test` | Ano | vysoka | Prakticky lokalny runbook je zosuladeny s aktualnym kodom |
| `README_PROD_SETUP.md` | Primarny production target je Cloudflare Pages; webhook je scaffold; `NOTIFY_WEBHOOK_URL` je optional lead-created webhook | Ano | vysoka | Dobra produkcna dokumentacia; presne pomenovava gaps |
| `README_DEPLOY_CLOUDFLARE.md` | Cloudflare Pages deploy guide pre nested app a Functions backend | Ano | vysoka | Dobra deploy dokumentacia pre hlavny deploy path |
| `STATUS.md` | Root docs a active landing docs su zosuladene; hlavne gaps su live Stripe, webhook, analytika, referencie | Vacsinou ano | vysoka | Dobre odraza aktivne workstreamy, ale nehovori o vsetkych legacy vrstvach v sirsom repo |
| `QUEUE.md` | Priorita je 42k preorder cash, live Stripe, analytics, B2B audit funnel | Ano | vysoka | Aktivny task ordering sedí s funnel kodom aj handoverom |
| `CASHFLOW_2026.md` | Novy cash model uz nie je 50 EUR deposit-first; ciel je 42k gross preorder cash | Ano pre aktivny business direction | vysoka | Kanonicky financny smer pre aktualny model |
| `00_RUNBOOK_CODEX.md` | Pri konflikte ma rozhodovat aktualny kod, potom mapa a root docs | Ano, a je to pragmaticke | vysoka | Dobra procesna autorita, nie technicky source of truth samotny |
| `01_PROJECT_GOAL_AND_BUSINESS_MODEL.md` | Workspace sluzi na plateny pilot-slot funnel, nie len lead-gen | Ano | vysoka | Strucny a zosuladeny business brief |
| `index.js` | Root worker obsluhuje len `/api/order` cez `order-handler.js` | Ano | stredna | Pravdivy, ale sekundarny k hlavnej Pages backend vrstve |
| `order-handler.js` | Root harness mirroruje order flow a package mapping, no checkout URL je len template env | Ano | stredna | Dobry test harness, nie produkcny Stripe backend |
| `test/order-form.test.js` | Testuje live frontend helper flow a package-based validaciu | Ano | vysoka | Dobry signal, ze frontend helper vrstva zodpoveda live kodu |
| `test/order-handler.test.js` | Testuje server-side package mapping a backend response shape | Ciastocne | stredna | Testuje root harness, nie priamo `functions/api/order.ts` |
| `03_GITHUB_SETUP.md` | Tvrdi, ze remote `origin` nie je nastaveny; odporuca single repo a root push workflow | Nie, nie uplne | nizka | `origin` uz existuje; cast o single-repo smerovani stale dava zmysel |
| `04_NETLIFY_DEPLOY_SETUP.md` | Netlify vie staticky frontend, ale nie plny backend bez migracie; spomina starsi env signal `STRIPE_PRICE_ID_DEPOSIT_50` | Ciastocne | stredna | Uzitocny warning doc, no nie primarny deploy path a nesie starsi env baggage |
| `REPORT.md` | Historicky audit a curl priklady pre starsi payload / starsi stav workspace | Nie | nizka | Zastarany snapshot; nevhodny ako source-of-truth pre aktualny funnel |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_delivery/README_FOR_AUDIT.md` | 50 EUR zaloha, placeholder `/api/order`, test Stripe link | Nie | nizka | Explicitne legacy snapshot |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_audit/EXEC_SUMMARY.txt` | 50 EUR funnel, inline JS v `index.html`, placeholder backend, identicke root/_delivery subory | Nie | nizka | Tvrdenia su v konflikte s aktualnym kodom a docs |

## Kratky verdict
- Najvyssiu technicku pravdu dnes drzia `index.html`, `order-form.js`, `order-packages.js` a `functions/api/order.ts`.
- Najlepsi ludsky handover je `PROJECT_HANDOVER.md`.
- Root docs `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`, `README.md` su uzitocne a vacsinou aktualne pre aktivny funnel.
- Root harness (`index.js`, `order-handler.js`, `test/*`) je supporting vrstva, nie live produkcny backend.
- `_delivery/`, `_audit/` a `REPORT.md` su historical/legacy a nesmu sa pouzivat ako pravda o dnesnom flow.
