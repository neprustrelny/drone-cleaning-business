# PROJECT HANDOVER – Čistá strecha z neba
Last updated: 2026-03-25
Prepared for: nový chat / nový pracovný blok bez predchádzajúceho kontextu

## 1) Čo je projekt
Jednoduchá landing page pre službu dronového čistenia striech a fasád pod značkou „Čistá strecha z neba“. Biznis cieľ nie je len zber leadov. Aktívny model je platená rezervácia pilotného slotu, ktorá financuje rozbeh heavy-duty dronu a prevádzky.

## 2) Fixné parametre, ktoré sa už nemenia
- Cieľ gross preorder cash: 42 000 €.
- Rozpad cieľa: 30k dron / akontácia, 6k compliance a licencie, 4k príslušenstvo a testy, 2k buffer.
- Verejný model:
  - `house_s`: služba od 349 €, rezervácia 149 €
  - `house_m`: služba od 590 €, rezervácia 199 €
  - `house_l`: služba od 890 €, rezervácia 299 €
  - `b2b_audit`: audit a prioritný slot 990 €
- KPI: average preorder value min. 250 €, paid B2C preorder CAC do 55 €, sledovať aj B2B audit close rate a refund rate.
- Checkout suma sa rozhoduje len na serveri podľa identifikátora balíka.

## 3) Aktuálny stav
Landing page, formulár aj backend sú prepnuté na nový package-based preorder flow. Frontend zbiera len balík + kontext leadu a server vracia `checkoutUrl`. Dokumentácia v root aj v tomto priečinku je zosúladená s novým modelom.

## 4) Source of truth
1. Aktuálny živý kód:
   - `index.html`
   - `order-form.js`
   - `functions/api/order.ts`
   - `order-packages.js`
2. Mapa projektu v root `mapa/`
3. Root `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md`, `00_RUNBOOK_CODEX.md`
4. Tento handover a `SITE_OVERVIEW.md`

## 5) Ako má produkt a funnel fungovať
1. Človek príde na landing page.
2. Vyberie si balík a typ objektu.
3. Vyplní stručný formulár.
4. Frontend odošle JSON na `/api/order`.
5. Server validuje balík, rozhodne cenu, vytvorí Stripe Checkout Session a vráti `checkoutUrl`.
6. Frontend len redirectne na `checkoutUrl`.
7. Po checkoute dostane klient potvrdenie a nasleduje vyhodnotenie objektu, počasia a prevádzkovej pripravenosti.

## 6) Dôležité obchodné pravidlá
- Na webe preferuj „rezervácia pilotného slotu“ alebo „zakladateľská rezervácia“, nie lacný 50 € positioning.
- Texty majú zostať krátke, priamočiare a predajné.
- Dôraz na: bez lešenia, bez ľudí na streche, rýchle nacenenie, prioritné sloty, zakladateľské ceny.
- V právnych a obchodných textoch môže zostať slovo záloha tam, kde dáva zmysel.
- Ak objekt nebude vhodný na bezpečnú realizáciu, dohodne sa náhradný postup alebo storno podľa podmienok.

## 7) Najväčšie otvorené medzery
1. Live `STRIPE_SECRET_KEY` a ostré environment variables v Cloudflare Pages.
2. Post-payment zápis / webhook a automatické potvrdenie zaplatenej rezervácie.
3. Analytika pre CAC, checkout success rate a refund rate.
4. Reálne fotografie, videá a referencie z prvých pilotných objektov.
5. Samostatná DE landing verzia a lokálny trust layer pre Kassel.

## 8) Priorita ďalších krokov
1. Nasadiť live Stripe a potvrdenie platieb.
2. Získať prvé SK pilotné realizácie a referencie.
3. Spustiť analytiku a sledovať mix balíkov, CAC a refundy.
4. Rozbehnúť B2B audit funnel.
5. Pripraviť DE variantu landing page.

## 9) Pokyny pre nový chat
1. Prečítaj `STATUS.md`.
2. Prečítaj `QUEUE.md`.
3. Prečítaj `CASHFLOW_2026.md`.
4. Prečítaj tento handover a `SITE_OVERVIEW.md`.
5. Prezri `index.html`, `order-form.js` a `functions/api/order.ts`.
6. Až potom rob ďalšie úpravy.
