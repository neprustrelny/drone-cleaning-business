# PROJECT HANDOVER – Čistá strecha z neba
Last updated: 2026-03-20
Prepared for: nový chat / nový pracovný blok bez predchádzajúceho kontextu

## 1) Čo je projekt
Jednoduchá landing page pre službu dronového čistenia striech a fasád pod značkou „Čistá strecha z neba“. Biznis cieľ nie je len zber leadov, ale priamo inkaso 50 € záloh cez Stripe, aby projekt generoval cashflow ešte pred realizáciou.

## 2) Fixné parametre, ktoré sa už nemenia
- Trh pre nemeckú expanziu: konzervatívne 25 000 rodinných domov v regióne Kassel + 50 km.
- Verejné balíčky: 199 € (základný dom), 299 € (strecha + fasáda), 399 € (veľká strecha).
- Absolútna priorita č. 1: maximalizovať počet zaplatených záloh 50 €.
- Interná priemerná realizovaná tržba: 1 050 € na zákazku.
- Go-to-market stratégia: najprv testovacie zákazky na Slovensku, až potom expanzia do Nemecka.

## 3) Aktuálny stav
Landing page je pripravená ako predajný funnel. Front-end už komunikuje cez `formulár -> /api/order -> Stripe`, ale produkčný backend, ostrý Stripe link, GDPR dokumenty a analytika ešte nie sú hotové. Aktuálny copywriting je orientovaný na jasný výber balíčka, rýchle vyplnenie formulára a zaplatenie zálohy.

## 4) Source of truth
- `STATUS.md`
- `QUEUE.md`
- `CASHFLOW_2026.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/index.html`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/SITE_OVERVIEW.md`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/PROJECT_HANDOVER.md`

## 5) Ako má produkt a funnel fungovať
- Landing page musí človeku odpovedať na 4 otázky:
  - čo dostane,
  - koľko to stojí,
  - prečo má zaplatiť zálohu hneď,
  - prečo je to bezpečné a jednoduché.
- Flow je záväzný:
  1. človek príde na landing,
  2. vyberie balíček,
  3. vyplní formulár,
  4. odošle údaje na `/api/order`,
  5. zaplatí 50 € cez Stripe,
  6. dostane potvrdenie a návrh termínu.
- CTA má vždy tlačiť na jeden cieľ: zaplatiť zálohu 50 € alebo sa minimálne dostať do formulára.

## 6) Dôležité obchodné pravidlá
- Texty musia zostať krátke, predajné a orientované na akciu.
- Každý nový blok na stránke musí zvyšovať dôveru alebo konverziu, nie len „vysvetľovať“.
- Balíčky 199/299/399 € sú verejná cenová kotva.
- Priemer 1 050 € sa používa pre interný cashflow model a musí byť neskôr podložený upsellom, väčšími zákazkami alebo širším mixom služieb.
- Nemecká verzia landing page je vysoká priorita, ale veľký launch do Kasselu sa nemá robiť bez SK validácie.
- Pri reguláciách pre DE sa má pracovať len s aktuálnymi EASA/LBA 2026 podkladmi a Specific/SORA logikou.

## 7) Najväčšie otvorené medzery
1. Produkčný backend pre `/api/order`.
2. Produkčný Stripe Checkout link a success flow.
3. Analytics a meranie conversion funnelu.
4. Nemecká landing page pre Kassel.
5. Reálne fotografie, videá a referencie zo slovenských testovacích zákaziek.
6. Právne podklady: GDPR, obchodné podmienky, DE compliance podklady.

## 8) Priorita ďalších krokov
1. Dokončiť funnel copy a CTA tak, aby rástol počet 50 € záloh.
2. Napojiť reálny backend a Stripe bez ručného zásahu.
3. Pripraviť nemeckú verziu stránky pre Kassel + 50 km.
4. Získať prvé platené testovacie zákazky na Slovensku a z nich vytvoriť referencie.
5. Nastaviť analytiku a sledovať CAC na zálohu.
6. Až potom zrýchľovať DE launch a regulácie pre Specific/SORA.

## 9) Pokyny pre nový chat
1. Prečítaj `STATUS.md`.
2. Prečítaj `QUEUE.md`.
3. Prečítaj `CASHFLOW_2026.md`.
4. Prečítaj tento handover.
5. Prezri `index.html`.
6. Až potom rob úpravy alebo navrhuj ďalší krok.
