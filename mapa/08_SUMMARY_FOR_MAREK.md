# SUMMARY FOR MAREK

## Co tu realne mas
Mas tu jeden hlavny biznis/workspace pre sluzbu cistenia striech a fasad dronom. Sklada sa z troch vrstiev:
- riadiace docs v roote
- hlavny landing + backend projekt v `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`
- siroka, ale zatial vacsinou prazdna txt databaza biznis a regulatornych dokumentov v `DRONE_CLEANING_BUSINESS/00_...` az `10_...`

## Kde je hlavny projekt
Hlavny projekt je tu:
`DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`

To je aktualna landing page, formular, frontend JS, Cloudflare Pages backend a deploy dokumentacia.

## Kde su najdolezitejsie dokumenty
Najprv otvor:
1. `STATUS.md`
2. `QUEUE.md`
3. `CASHFLOW_2026.md`
4. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`
5. `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`

## Co je balast alebo aspon nie prva priorita
- root `node_modules/`
- nested `node_modules/`
- root a nested `.wrangler/`
- `.netlify/`
- vacsina `_delivery/`
- vacsina `_audit/`
- 55 prazdnych txt skeletonov v `00_...` az `10_...`

## Najdolezitejsia orientacna poznamka
V workspaci su dva backendove smery:
- root Worker (`index.js`, `order-handler.js`)
- hlavny Pages backend (`functions/api/order.ts`)

Ak sa chces zorientovat rychlo, ber ako hlavne jadro Pages projekt v `stranka umyvanie strechy/`. Root backend ber ako vedlajsi alebo starsi paralelny smer, kym sa explicitne nepotvrdi opak.

## Ako sa zorientovat za 2 minuty
- Precitaj `STATUS.md` a `QUEUE.md`.
- Skoc do `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`.
- Pozri `index.html`, `order-form.js`, `functions/api/order.ts`.
- Ignoruj vendor priecinky a prazdne txt skeletony.
- `_delivery/` ber len ako exportnu kopiu, nie ako istu aktualnu verziu.
