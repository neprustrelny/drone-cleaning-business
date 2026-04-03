# PROJECT FILE INVENTORY

## Root files and key root directories
| Path | Typ | Status | Kratky popis |
| --- | --- | --- | --- |
| `README.md` | root doc | supporting | Verejny billboard repa; rychly popis active funnelu, nie detailny technical truth source |
| `STATUS.md` | root doc | supporting | Aktualny stav workstreamov, blockerov a otvorenych gaps |
| `QUEUE.md` | root doc | supporting | Prioritizacia dalsich krokov podla preorder cash a funnel KPI |
| `CASHFLOW_2026.md` | root doc | supporting | Financny model aktualneho 42k preorder cash ciela |
| `00_RUNBOOK_CODEX.md` | root doc | supporting | Operacny runbook a denny prioritizacny rezim |
| `01_PROJECT_GOAL_AND_BUSINESS_MODEL.md` | root doc | supporting | Strucny business goal a funnel logika workspace |
| `02_SOURCE_OF_TRUTH.md` | root doc | supporting | Orientacna hierarchia source-of-truth a aktivnych vrstiev |
| `03_GITHUB_SETUP.md` | root doc | legacy | GitHub setup navod; ciastocne zastarany, lebo remote `origin` uz existuje |
| `04_NETLIFY_DEPLOY_SETUP.md` | root doc | supporting | Sekundarny Netlify navod; uzitocny len pre static-only deploy, nie ako hlavny backend path |
| `REPO_PUBLIC_FACE.md` | root doc | supporting | Navrh public popisu a topicov repa |
| `CHANGELOG.md` | root doc | supporting | Strucna historia klucovych migrach a zmen funnelu |
| `REPORT.md` | root doc | legacy | Historicky auditny report; cast prikladov a tvrdeni uz neplati |
| `mapa/` | directory | supporting | Predchadzajuca mapovacia/orientacna vrstva, dobra na onboarding, nie kanonicka autorita |
| `index.js` | runtime entry | supporting | Root Worker entry point pre paralelny `/api/order` harness |
| `order-handler.js` | runtime module | supporting | Root order-flow harness s template checkout URL, testovany v root suite |
| `package.json` | config | active | Root scripts pre `npm test` a delegovany `npm run dev` |
| `package-lock.json` | lockfile | active | Lockfile pre root tooling vrstvu |
| `wrangler.toml` | infra config | supporting | Root Worker config s KV bindingom `LEADS`; nie hlavny production path |
| `test/` | test directory | active | Root test layer pre frontend helper a root backend harness |
| `node_modules/` | vendor | supporting | Root vendor vrstva; nereprezentuje source obsah |
| `.wrangler/` | generated | supporting | Root lokalne generovane Cloudflare artefakty |

## Active application layer
| Path | Typ | Status | Kratky popis |
| --- | --- | --- | --- |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/` | app directory | active | Hlavne live jadro projektu |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html` | frontend entry | active | Jediny live page entry point s contentom, CTA, formularom a footerom |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js` | frontend module | active | Validacia, serializacia, POST na `/api/order`, statusy a redirect na `checkoutUrl` |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-packages.js` | shared logic | active | Kanonicky package catalog a server/client pricing mapping |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts` | serverless entry | active | Hlavny Pages backend pre order validation, lead handling a Stripe session creation |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/stripe/webhook.ts` | serverless entry | active | Stripe webhook scaffold; verifikuje podpis a loguje event, ale neriesi paid-state update |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/package.json` | config | active | Nested app scripts pre `wrangler pages dev` a `wrangler pages deploy` |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/package-lock.json` | lockfile | active | Lockfile pre nested app tooling |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/wrangler.toml` | infra config | active | Cloudflare Pages config s KV bindingom `LEADS` a default vars |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.dev.vars.example` | env example | active | Lokalne Stripe / webhook env example bez secrets |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.gitignore` | config | active | Ignoruje `.dev.vars` a env files v app vrstve |

## App documentation and handover files
| Path | Typ | Status | Kratky popis |
| --- | --- | --- | --- |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md` | handover doc | active | Prakticky hlavny handover pre live funnel a source-of-truth upozornenia |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md` | overview doc | active | Struktura page, CTA logika, polia formulara a kontakty |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/AGENTS.md` | process doc | active | Projektove pravidla pre zmeny flow, CTA a dokumentacie |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/FLOW_ORDER_STRIPE.md` | flow doc | active | Strucny technicky popis order -> Stripe flow |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/README_RUN_LOCAL_AND_TEST.md` | runbook | active | Lokalny run/test navod pre nested Pages projekt |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/README_PROD_SETUP.md` | deploy doc | active | Produkcny Cloudflare Pages setup, env vars a payment readiness |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/README_DEPLOY_CLOUDFLARE.md` | deploy doc | active | Cloudflare Pages deploy guide a endpoint summary |

## Test files
| Path | Typ | Status | Kratky popis |
| --- | --- | --- | --- |
| `test/order-form.test.js` | test | active | Testuje live `order-form.js` modul: required fields, serializaciu, `leadSource`, redirect flow |
| `test/order-handler.test.js` | test | active | Testuje root `order-handler.js` harness: package mapping, method handling, validation |

## Deployment and infra metadata
| Path | Typ | Status | Kratky popis |
| --- | --- | --- | --- |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.netlify/netlify.toml` | generated config | supporting | Lokalna Netlify metadata s absolutnou publish cestou; nie hlavny source deploy config |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.netlify/state.json` | generated metadata | supporting | Linked Netlify site ID; signal, ze Netlify bol lokalne linknuty |
| `.gitignore` | config | active | Root ignore pravidla pre vendor, env a generated artefakty |

## Audit and delivery layers
| Path | Typ | Status | Kratky popis |
| --- | --- | --- | --- |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_audit/` | audit directory | legacy | Starsi auditny export; stale tvrdi 50 EUR deposit model a placeholder backend |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_audit/EXEC_SUMMARY.txt` | audit doc | legacy | Uz neplati: inline JS only, placeholder `/api/order`, 50 EUR Stripe test link |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_audit/FOUND_ISSUES.txt` | audit doc | legacy | Historicke nalezy pre starsiu funnel verziu |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_audit/NEXT_STEPS.txt` | audit doc | legacy | Historicke next steps k starsiemu flow |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_delivery/` | delivery snapshot | legacy | Snapshot pre audit/review; nie je synchronny s aktivnym kódom |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_delivery/README_FOR_AUDIT.md` | delivery doc | legacy | Stale opisuje 50 EUR zalohu, placeholder endpoint a test Stripe link |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_delivery/index.html` | snapshot code | legacy | Starsia landing verzia s 50 EUR deposit modelom a inline JS |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_delivery/PROJECT_HANDOVER.md` | delivery doc | legacy | Starsi handover pre 50 EUR funnel |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_delivery/SITE_OVERVIEW.md` | delivery doc | legacy | Starsi prehlad page a CTA vrstvy |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/_delivery/FLOW_ORDER_STRIPE.md` | delivery doc | legacy | Starsi placeholder flow dokument |

## Supporting assets and media
| Path | Typ | Status | Kratky popis |
| --- | --- | --- | --- |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/ChatGPT Image Jan 27, 2026, 05_32_36 PM.png` | asset | supporting | Hero/demo obrazok pouzity v live page |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/Biznis_plán__Čistenie_dronom.mp4` | media | supporting | Podporny video asset, nie runtime logika |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/Kassel_Drone_Profit_Scenarios.pdf` | doc asset | supporting | Podporny DE/business asset |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/Projektový Runbook.pdf` | doc asset | supporting | PDF supporting material, nie aktivna runtime vrstva |
| `DRONE_CLEANING_BUSINESS/Skalica_dotacie_z_rozpoctu_mesta/` | external docs | supporting | Dotacne PDF/DOCX podklady; nesuvisia s runtime funnelom |

## Broader business documentation layer
| Path | Typ | Status | Kratky popis |
| --- | --- | --- | --- |
| `DRONE_CLEANING_BUSINESS/00_MASTER_STRATEGY/` | business docs | unclear | Strategicka kostra; cast obsahu je vyplnena, ale nie je source of truth pre live funnel |
| `DRONE_CLEANING_BUSINESS/01_LEVEL_1_BASIC/` | business docs | unclear | Zakladne legal/ops/marketing docs; viacero poloziek je empty alebo stale dokumentuje starsi model |
| `DRONE_CLEANING_BUSINESS/01_LEVEL_1_BASIC/07_MARKETING_FUNNEL.txt` | business doc | legacy | Explicitne hovori o 50 EUR preorder mechanizme |
| `DRONE_CLEANING_BUSINESS/05_MARKETING_AND_SALES/` | business docs | unclear | Marketingova knowledge base; cast obsahu stale hovori o starej zalohe |
| `DRONE_CLEANING_BUSINESS/05_MARKETING_AND_SALES/PREORDER_STRATEGY.txt` | business doc | legacy | Explicitne pracuje s 50 EUR zalohou ako aktualnym modelom |
| `DRONE_CLEANING_BUSINESS/06_FINANCIALS/` | business docs | unclear | Viacero financnych scenarov a modelov; cast sa viaze na starsi deposit model |
| `DRONE_CLEANING_BUSINESS/07_TECHNICAL_ARCHITECTURE/` | business docs | supporting | Technicka knowledge-base vrstva mimo live web appky |
| `DRONE_CLEANING_BUSINESS/09_OPERATIONS/` | ops docs | supporting | Operacne procesy, onboarding, pipeline a pocasie; supporting, nie kanonicky technical source |
| `DRONE_CLEANING_BUSINESS/10_EXPANSION_PLAN/` | business docs | legacy | Dokumenty su empty placeholders |

## Generated and vendor-heavy directories to ignore during architecture reading
| Path | Typ | Status | Kratky popis |
| --- | --- | --- | --- |
| `node_modules/` | vendor | supporting | Root vendor dependencies |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/node_modules/` | vendor | supporting | Nested vendor dependencies |
| `.wrangler/` | generated | supporting | Root Wrangler artifacts |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.wrangler/` | generated | supporting | Nested Wrangler artifacts |

