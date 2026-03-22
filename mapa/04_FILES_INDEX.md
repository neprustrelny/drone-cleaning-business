# FILES INDEX

Poznamka: uplny zoznam mien suborov je v `01_TREE_FULL.txt`. Tento index zdoraznuje vsetky dolezite aktivne subory a skupiny placeholder dokumentov.

## 1. Root riadiace a technicke subory
| Cesta | Typ | Ucel | Status | Poznamka |
|---|---|---|---|---|
| `00_RUNBOOK_CODEX.md` | md | denny operacny runbook | aktivny | funnel-first riadenie |
| `CASHFLOW_2026.md` | md | financny model 2026 | aktivny | silny strategicky dokument |
| `CHANGELOG.md` | md | historia zmien | aktivny pomocny | strucny log |
| `QUEUE.md` | md | priorizovany backlog | aktivny | task source of truth |
| `REPORT.md` | md | audit a diagnostika | historicky pomocny | cast obsahu je starsia |
| `STATUS.md` | md | centralny stav projektu | aktivny | najlepsi start subor |
| `index.js` | js | root Worker entrypoint | aktivny pomocny | paralelny backend |
| `order-handler.js` | js | root order validacia + JSON response | aktivny pomocny | jednoduchsi ako Pages backend |
| `package.json` | json | root Node config | aktivny | testy + delegacia na nested dev |
| `package-lock.json` | json | root lockfile | aktivny config | vendor metadata |
| `wrangler.toml` | toml | root Worker config | aktivny | KV `LEADS` |
| `test/order-form.test.js` | js | test frontend helpera | aktivny | viaze nested `order-form.js` |
| `test/order-handler.test.js` | js | test root backendu | aktivny | pokryva statusy/validaciu |
| `.wrangler/` | dir | lokalne dev artefakty | generated | neanalyzovat po suboroch |
| `node_modules/` | dir | root zavislosti | vendor | ~199M |

## 2. Hlavny webovy projekt `stranka umyvanie strechy`
| Cesta | Typ | Ucel | Status | Poznamka |
|---|---|---|---|---|
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html` | html | hlavna landing page | aktivne jadro | aktualna verzia UI |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js` | js | frontend validacia a submit flow | aktivne jadro | modulovy JS, nie inline script |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts` | ts | hlavny order endpoint | aktivne jadro | rate limit, KV, webhook, Stripe |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/stripe/webhook.ts` | ts | Stripe webhook scaffold | aktivny pomocny | HMAC verify scaffold |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/package.json` | json | nested Node config | aktivny | `wrangler pages dev/deploy` |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/package-lock.json` | json | nested lockfile | aktivny config | vendor metadata |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/wrangler.toml` | toml | Pages/KV config | aktivny | vars pre webhook/Stripe |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.dev.vars.example` | txt/env example | lokalne Stripe env hodnoty | aktivny pomocny | test setup bez secretu v repo |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.gitignore` | text | ignorovanie secret/env suborov | aktivny pomocny | chranenie `.dev.vars` |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md` | md | hlavny handover dokument | aktivny | aktualizovany 2026-03-20 |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md` | md | struktura a funnel logika | aktivny, ale ciastocne zastarany | stale spomina inline JS |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/README_RUN_LOCAL_AND_TEST.md` | md | lokalny run/test navod | aktivny | spusta Pages dev |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/README_DEPLOY_CLOUDFLARE.md` | md | deploy navod | aktivny | Cloudflare Pages deploy |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/README_PROD_SETUP.md` | md | produkcny setup | aktivny | env vars a overenie |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/AGENTS.md` | md/txt | lokalne pravidla pre agenta | aktivny pomocny | one-pager guardrails |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/Biznis_plán__Čistenie_dronom.mp4` | mp4 | video asset | pomocny asset | ~32.7M |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/ChatGPT Image Jan 27, 2026, 05_32_36 PM.png` | png | hlavny obrazok na page | aktivny asset | hero/image demo |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/Kassel_Drone_Profit_Scenarios.pdf` | pdf | supporting business PDF | pomocny | pravdepodobne financno-expanzny podklad |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/Projektový Runbook.pdf` | pdf | supporting runbook PDF | pomocny | odovzdavaci/podporny dokument |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.netlify/netlify.toml` | toml | Netlify metadata | historicky pomocny | projekt je orientovany na Cloudflare |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.netlify/state.json` | json | Netlify site ID metadata | historicky/generated | len interny identifikator |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.wrangler/` | dir | lokalne dev bundle artefakty | generated | neanalyzovat po suboroch |
| `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/node_modules/` | dir | nested zavislosti | vendor | ~199M |

## 3. Audit a delivery vrstva v hlavnom projekte
| Cesta | Typ | Ucel | Status | Poznamka |
|---|---|---|---|---|
| `.../_audit/EXEC_SUMMARY.txt` | txt | zhrnutie projektu a funnelu | pomocny audit | hovori o starsom stave |
| `.../_audit/FOUND_ISSUES.txt` | txt | auditne nalezy | pomocny audit | uzitocne, ale ciastocne starsie |
| `.../_audit/NEXT_STEPS.txt` | txt | odporucane dalsie kroky | pomocny audit | cast krokov stale plati |
| `.../_audit/TREE.txt` | txt | starsi strom projektu | pomocny audit | len lokalny snapshot |
| `.../_delivery/DELIVERY_MANIFEST.md` | md | opis exportneho balika | pomocny | vysvetluje obsah `_delivery` |
| `.../_delivery/README_FOR_AUDIT.md` | md | rychly audit start | pomocny | orientacny navod |
| `.../_delivery/FLOW_ORDER_STRIPE.md` | md | starsi popis flowu | pomocny, ciastocne zastarany | spomina placeholder backend |
| `.../_delivery/SEO_A11Y.md` | md | mini SEO/A11Y audit | pomocny | niektore tvrdenia uz nesedia |
| `.../_delivery/CONTACTS_SCAN.md` | md | scan kontaktov a Stripe URL | nepresny | obsahuje chyby |
| `.../_delivery/REPO_STATE.txt` | txt | git status/log export | historicky/neuspesny | nie je to git repo |
| `.../_delivery/AGENTS.md` | md | kopia pravidiel | duplicitny | identicky s root verziou |
| `.../_delivery/SITE_OVERVIEW.md` | md | kopia site overview | duplicitny | identicky s root verziou |
| `.../_delivery/PROJECT_HANDOVER.md` | md | starsia kopia handoveru | historicky duplicitny | rozdielna a starsia verzia |
| `.../_delivery/index.html` | html | starsia kopia landing page | historicky duplicitny | odlisna od aktualnej verzie |

## 4. Naplnene biznis dokumenty mimo weboveho projektu
| Cesta | Typ | Ucel | Status | Poznamka |
|---|---|---|---|---|
| `DRONE_CLEANING_BUSINESS/00_MASTER_STRATEGY/SERVICE_MISSION_DESCRIPTION.txt` | txt | definicia sluzby a value proposition | aktivny obsah | jeden z mala vyplnenych txt |
| `DRONE_CLEANING_BUSINESS/01_LEVEL_1_BASIC/CHECKLIST_LEVEL_1.txt` | txt | basic operacny checklist | aktivny obsah | SR/DE poznamky, poistky, SOP |
| `DRONE_CLEANING_BUSINESS/02_LEVEL_2_URBAN/CHECKLIST_LEVEL_2.txt` | txt | urban checklist | aktivny obsah | mestsky risk a koordinacia |
| `DRONE_CLEANING_BUSINESS/03_LEVEL_3_HIGH_RISE/CHECKLIST_LEVEL_3.txt` | txt | high-rise checklist | aktivny obsah | Specific/SORA tema |
| `DRONE_CLEANING_BUSINESS/04_LEVEL_4_INDUSTRIAL/CHECKLIST_LEVEL_4.txt` | txt | industrial/B2B checklist | aktivny obsah | HSE, SLA, enterprise poistky |
| `DRONE_CLEANING_BUSINESS/Skalica_dotacie_z_rozpoctu_mesta/VZN č. 1_2019  o poskytovani dotácii z rozpočtu Mesta Skalica.pdf` | pdf | pravny podklad k dotacii | pomocny | mimo hlavneho produktu |
| `DRONE_CLEANING_BUSINESS/Skalica_dotacie_z_rozpoctu_mesta/Vyúčtovanie poskytnutej dotácie.docx` | docx | dotacne vyuctovanie | pomocny | mimo hlavneho produktu |
| `DRONE_CLEANING_BUSINESS/Skalica_dotacie_z_rozpoctu_mesta/ziadost o poskytnutie dotacie z rozpoctu mesta.docx` | docx | dotacna ziadost | pomocny | mimo hlavneho produktu |

## 5. Placeholder matica pre vacsinovo prazdne txt sady
| Cesta alebo sada | Typ | Ucel | Status | Poznamka |
|---|---|---|---|---|
| `DRONE_CLEANING_BUSINESS/00_MASTER_STRATEGY/{CASHFLOW_MODEL,RISK_MATRIX,ROADMAP_LEVELS,VISION}.txt` | txt | strategicke jadro | placeholder | prazdne |
| `DRONE_CLEANING_BUSINESS/01_LEVEL_1_BASIC/{01..07 bez checklistu}.txt` | txt | legal/insurance/tech/basic ops | placeholder | prazdne |
| `DRONE_CLEANING_BUSINESS/02_LEVEL_2_URBAN/{01..06 bez checklistu}.txt` | txt | urban expansion docs | placeholder | prazdne |
| `DRONE_CLEANING_BUSINESS/03_LEVEL_3_HIGH_RISE/{01..06 bez checklistu}.txt` | txt | high-rise/SORA docs | placeholder | prazdne |
| `DRONE_CLEANING_BUSINESS/04_LEVEL_4_INDUSTRIAL/{01..05 bez checklistu}.txt` | txt | industrial enterprise docs | placeholder | prazdne |
| `DRONE_CLEANING_BUSINESS/05_MARKETING_AND_SALES/*.txt` | txt | marketing/sales docs | placeholder | vsetky prazdne |
| `DRONE_CLEANING_BUSINESS/06_FINANCIALS/*.txt` | txt | financne modely a scenare | placeholder | vsetky prazdne |
| `DRONE_CLEANING_BUSINESS/07_TECHNICAL_ARCHITECTURE/*.txt` | txt | technicka architektura dronu | placeholder | vsetky prazdne |
| `DRONE_CLEANING_BUSINESS/08_REGULATORY_DATABASE/*.txt` | txt | regulatorne poznamky | placeholder | vsetky prazdne |
| `DRONE_CLEANING_BUSINESS/09_OPERATIONS/*.txt` | txt | operacne SOP a templaty | placeholder | vsetky prazdne |
| `DRONE_CLEANING_BUSINESS/10_EXPANSION_PLAN/*.txt` | txt | expanzia/fransiza/partneri | placeholder | vsetky prazdne |
