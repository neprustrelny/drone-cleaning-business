# STATUS – Čistá strecha z neba
Last updated: 2026-03-25

## Test coverage
- Root `node:test` setup ostáva aktívny.
- Frontend funnel testy teraz pokrývajú nové polia `typObjektu`, `krajina`, serializáciu `leadSource` a redirect len na serverom vrátený `checkoutUrl`.
- Root backend harness pokrýva valid package handling, server-side reservation amount mapping, invalid package rejection a úspešné vrátenie `checkoutUrl`.
- Hlavný Pages backend `functions/api/order.ts` je zosúladený s tým istým package mappingom cez shared `order-packages.js`.

## TL;DR
- Projekt už nie je nastavený na symbolickú 50 € zálohu.
- Aktívny model je preorder financovanie rozbehu prevádzky s cieľom 42 000 € gross preorder cash.
- Verejná ponuka je 349 / 590 / 890 / 990 € so zakladateľskou rezerváciou 149 / 199 / 299 / 990 €.
- Checkout suma sa rozhoduje výhradne na serveri podľa balíka `house_s`, `house_m`, `house_l`, `b2b_audit`.
- Najväčšie otvorené položky sú live Stripe secret, post-payment automatizácia, analytika a reálne pilotné referencie.

## Aktuálny stav projektu
| Workstream | State | Last Updated | Notes |
|------|-------|--------------|-------|
| Marketing funnel a landing page | DONE | 2026-03-25 | Hero, CTA, pricing, FAQ a formulár sú prepísané na pilotné sloty a zakladateľské rezervácie. |
| Platby a backend | DONE | 2026-03-25 | `/api/order` používa server-side pricing podľa balíka, ukladá metadata a vracia `checkoutUrl` zo servera. |
| Root worker harness + testy | DONE | 2026-03-25 | Root `order-handler.js` a testy zrkadlia nový package model pre rýchlu validáciu. |
| Finančný model 2026 | DONE | 2026-03-25 | `CASHFLOW_2026.md` je prepísaný na gross preorder cash, average preorder value a CAC model. |
| Dokumentácia a handover | DONE | 2026-03-25 | Root runbook, status, queue, cashflow a aktívne landing docs sú zosúladené s novým modelom. |
| SK pilotné realizácie | TODO | 2026-03-25 | Potrebné reálne case studies, fotky a referencie po prvých pilotných zákazkách. |
| Produkčný Stripe + webhook | IN_PROGRESS | 2026-03-25 | Kód je pripravený, chýba live `STRIPE_SECRET_KEY`, post-payment zápis a ostré obchodné podmienky. |
| Analytika a meranie funnelu | TODO | 2026-03-25 | Treba sledovať paid preorder CAC, average preorder value, checkout success rate a refund rate. |
| Nemecká verzia pre Kassel | TODO | 2026-03-25 | SK/SK-DE positioning je v copy, ale samostatná DE landing verzia ešte nie je hotová. |

## Kľúčové súbory
| Path | State | Last Updated | Notes |
|------|-------|--------------|-------|
| 00_RUNBOOK_CODEX.md | DONE | 2026-03-25 | Nový denný operačný plán pre 42k preorder cash cieľ. |
| QUEUE.md | DONE | 2026-03-25 | Priority sú zoradené podľa preorder cash, CAC a pilotnej kapacity. |
| CASHFLOW_2026.md | DONE | 2026-03-25 | Nový scenárový model pre preorder cash a acquisition cost. |
| DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-packages.js | DONE | 2026-03-25 | Kanonický package mapping pre frontend, backend a testy. |
| DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html | DONE | 2026-03-25 | Landing page copy a formulár sú prepnuté na 4 balíky a rezervácie 149/199/299/990 €. |
| DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js | DONE | 2026-03-25 | Frontend posiela balík + kontext leadu a redirectuje len na server-side `checkoutUrl`. |
| DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts | DONE | 2026-03-25 | Server-side Stripe Checkout Session s metadata `package`, `typObjektu`, `krajina`, `leadSource`. |
| DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/FLOW_ORDER_STRIPE.md | DONE | 2026-03-25 | Aktívna dokumentácia order flow. |

## Najbližšie blokery
- Do Cloudflare Pages nastaviť live `STRIPE_SECRET_KEY` a finálne `STRIPE_SUCCESS_URL` / `STRIPE_CANCEL_URL`.
- Doplniť post-payment zápis alebo webhook, aby sa dalo odlíšiť lead created vs. rezervácia zaplatená.
- Zapnúť analytiku pre `visit -> form -> checkout -> payment success`.
- Doriešiť obchodné podmienky, refund logiku a potvrdenie pri nevhodnom objekte.
- Získať prvé reálne pilotné objekty a referencie pre SK aj DE trust layer.
