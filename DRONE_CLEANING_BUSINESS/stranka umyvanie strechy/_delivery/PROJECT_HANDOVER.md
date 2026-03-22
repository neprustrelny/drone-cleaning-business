# PROJECT HANDOVER – Čistá strecha z neba
Last updated: 2026-01-29
Prepared for: new ChatGPT session (no prior context)

## 1) Čo je projekt
Jednoduchá landing stránka pre službu čistenia striech dronom „Čistá strecha z neba“. Hlavný cieľ je získať predobjednávky a vybrať zálohu 50 € cez Stripe ešte pred realizáciou.

## 2) Aktuálny stav
Staging / lokálne prostredie – obsah ladíme na konverziu, formulár posiela JSON na placeholder `/api/order` a front-end je pripravený na napojenie reálneho backendu a výmenu Stripe TEST linku.

## 3) Source of truth
- `index.html`
- `SITE_OVERVIEW.md`
- `PROJECT_HANDOVER.md`
- `AGENTS.md`

## 4) Ako stránka funguje
One-pager je nastavený ako rozhodovací tunel: hero → krátke benefity → orientačné info → „Pre koho je služba“ → FAQ (vrátane skrytých technických detailov) → objednávkový formulár → recenzie → 5 krokov → finálne CTA → „Kto sme“. Človek len prebehne nadpisy, vyplní formulár (meno, adresa, email, voliteľne telefón/poznámka), JS validuje povinné polia, odošle JSON POST na `/api/order`, zobrazí krátku hlášku a otvorí Stripe Checkout (záloha 50 €) v novom okne. Kontakty sa zobrazujú pri krokovom procese aj v CTA.

## 5) Dôležité rozhodnutia
- Texty musia zostať krátke, jasné a orientované na objednávku + zálohu 50 €.
- Komunikácia zdôrazňuje bezpečnosť, rýchlosť a jednoduchosť (žiadne lešenie, minimum starostí).
- CTA vždy vedie k formuláru / Stripe alebo priamo ku kontaktu (email, telefón).
- Kontakty musia byť konzistentné naprieč sekciami.
- Flow „formulár → /api/order → Stripe“ je záväzné a nemení sa bez jasného dôvodu.

## 6) Posledný cyklus
- Skrátené texty naprieč hero, benefitmi, „Pre koho“ a procesom, aby stránka odpovedala vždy len na jednu otázku.
- Technické detaily presunuté do FAQ/`<details>`, CTA a formulár zdôrazňujú jednoduchý flow k zálohe 50 €.
- Dokumentácia + delivery balík zosúladené s novým rozhodovacím tónom.

## 7) Next steps (3–7 bodov)
1. Implementovať reálny backend/email handler pre `/api/order` a otestovať odozvu.
2. Vymeniť Stripe TEST URL za produkčný Checkout link.
3. Doplniť reálny dokument obchodných podmienok / GDPR a prepojiť ho vo footeri.
4. Získať reálne fotografie a referencie namiesto placeholderov.
5. Nastaviť sledovanie konverzií (Stripe webhooks, analytics eventy) a otestovať end-to-end flow.
6. Po nasadení zmerať konverzie (scroll → formulár → Stripe) a podľa dát dolaďovať texty.

## 8) Pokyny pre nový chat
1. Prečítaj `PROJECT_HANDOVER.md`.
2. Prečítaj `SITE_OVERVIEW.md`.
3. Prezri `index.html`.
4. Až potom sa opýtaj používateľa na aktuálny cieľ (texty, CTA, testovanie, integrácie).

## 9) How to request an audit
Pre audit priprav priečinok `_delivery/` (max 10 stručných súborov podľa AGENTS.md), skontroluj, že obsahuje README_FOR_AUDIT, aktuálne kópie dokumentov, index.html, REPO_STATE, kontaktný scan, SEO/A11Y poznámky, popis flow a manifest. Tento priečinok odošli v novom chate alebo audítorovi.
