# STATUS – Čistá strecha z neba
Last updated: 2026-03-20

## Test coverage
- Minimálny test setup je pripravený cez vstavaný `node:test` bez ďalšieho frameworku.
- Frontend funnel má pokryté povinné polia, serializáciu payloadu, blokovanie submit flow pri nevalidnom formulári a lokálny fallback checkout flow.
- Backend `/api/order` má pokrytú validáciu payloadu a status kódy pre úspech aj chyby.
- Audit funnel testov potvrdil plné pokrytie požadovaného scope; doplnené boli len presnejšie assertions pre backend response shape.
- Lokálny dev flow je pripravený cez root `npm run dev` pre landing page aj `/api/order`.

## TL;DR
- Priorita č. 1 je predajný funnel a maximálny počet zaplatených záloh 50 €.
- Základné verejné balíčky sú 199 €, 299 € a 399 €; interný finančný model ráta s priemernou realizovanou tržbou 1 050 € na zákazku.
- Trh pre nemeckú expanziu je konzervatívne 25 000 rodinných domov v regióne Kassel + 50 km.
- Go-to-market stratégia je: najprv testovacie zákazky na Slovensku, potom expanzia do Nemecka.
- Najväčšie otvorené položky sú produkčný Stripe secret + `price_...`, reálny success webhook, analytika a nemecká verzia landing page.

## Aktuálny stav projektu
| Workstream | State | Last Updated | Notes |
|------|-------|--------------|-------|
| Marketing funnel a landing page | IN_PROGRESS | 2026-03-20 | Copy a CTA sú aktualizované na 50 € zálohu, balíčky 199/299/399 € a funnel má základné kritické testy. |
| Platby a backend | IN_PROGRESS | 2026-03-20 | `/api/order` už vie po validácii vytvoriť Stripe Checkout Session cez env konfiguráciu a vrátiť `checkoutUrl`; stále však chýba ostrý `sk_live`/`price_...` a post-payment potvrdenie. |
| SK testovacie zákazky | IN_PROGRESS | 2026-03-20 | Toto je prvá validačná fáza pre referencie, proces a unit economics pred expanziou. |
| Nemecká verzia pre Kassel | TODO | 2026-03-20 | Je to najvyššia marketingová priorita po funneli, ale spustenie kampaní má byť až po SK validácii. |
| Finančný model 2026 | DONE | 2026-03-20 | Vznikol samostatný scenárový model s cashflow a ROI logikou v `CASHFLOW_2026.md`. |
| Regulácie EASA/LBA 2026 pre Kassel | BLOCKED | 2026-03-20 | Pre ostré DE operácie treba doplniť aktuálne Specific/SORA podklady a lokálne obmedzenia. |
| Dokumentácia a prioritizácia | DONE | 2026-03-20 | Runbook, handover, queue a lokálny Stripe-ready setup sú zosúladené s cashflow prioritou. |

## Kľúčové súbory
| Path | State | Last Updated | Notes |
|------|-------|--------------|-------|
| 00_RUNBOOK_CODEX.md | DONE | 2026-03-20 | Prepísané na denný operačný plán s KPI a prioritami. |
| QUEUE.md | DONE | 2026-03-20 | Prioritizovaný tasklist zoradený podľa funnelu, DE verzie a cashflow. |
| CASHFLOW_2026.md | DONE | 2026-03-20 | Nový scenárový finančný model pre rok 2026. |
| DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md | DONE | 2026-03-20 | Doplnené nové obchodné parametre, pravidlá a next steps. |
| DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html | DONE | 2026-03-20 | CTA používa backendom vrátený `checkoutUrl` a test fallback je povolený len lokálne. |
| DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/functions/api/order.ts | DONE | 2026-03-20 | Handler pripravuje lead, success/cancel URL a server-side Stripe Checkout Session bez novej závislosti. |
| DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/README_RUN_LOCAL_AND_TEST.md | DONE | 2026-03-20 | Obsahuje env setup a lokálny Stripe-ready test flow. |

## Najbližšie blokery
- V Stripe vytvoriť reálny produkt/price pre zálohu 50 € a získať `price_...`.
- Do Cloudflare Pages nastaviť `STRIPE_SECRET_KEY` a `STRIPE_PRICE_ID_DEPOSIT_50`.
- Zapnúť success webhook alebo post-payment zápis, aby sa dalo odlíšiť lead created vs. záloha zaplatená.
- Analytics: meranie `view -> form start -> form submit -> Stripe click -> payment success`.
- Nemecký trust layer: DE copy, regionálne kontakty, FAQ pre Kassel a lokálne referencie.
- Regulácie pre DE launch: overenie EASA/LBA 2026, Specific kategória a SORA pre Kassel.
