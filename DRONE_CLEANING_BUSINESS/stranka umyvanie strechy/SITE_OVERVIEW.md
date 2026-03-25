# SITE OVERVIEW – Čistá strecha z neba
Last updated: 2026-03-25

## STATUS
- Aktívna landing page je nastavená na 4 balíky a rezerváciu pilotného slotu 149 / 199 / 299 / 990 €.
- Frontend už nepracuje s pevnou 50 € sumou ani s dôverou v klientsku cenu.

## STRUCTURE (pages)
- `index.html` – hlavná landing page pre čistenie striech a fasád dronom; sekcie: hero s CTA, benefit bar, orientačné info, 4-balikový pricing, „Pre koho je služba“, FAQ, objednávkový formulár, recenzie, proces a finálne CTA.

## NAVIGATION & LINKS
- Sticky header s CTA „Chcem pilotný termín“ smeruje na sekciu `#objednavka`.
- Vnútorné anchor linky používajú hlavne hero a objednávku; flow je zámerne minimalistický.
- Kontakt ostáva cez email a telefón v hero, krokoch a footeri.

## CTA LOGIC
- Hlavné CTA: „Chcem pilotný termín“.
- Form CTA: „Pokračovať na rezerváciu slotu“.
- Po odoslaní formulára frontend pošle JSON na `/api/order`, preberie serverom vrátený `checkoutUrl` a redirectne na Stripe Checkout.
- Checkout suma vzniká server-side podľa balíka `house_s`, `house_m`, `house_l`, `b2b_audit`.

## FORM FIELDS
- Povinné: `balik`, `typObjektu`, `krajina`, `meno`, `adresa`, `email`.
- Voliteľné: `telefon`, `poznamka`.
- Technické: `website` honeypot, `leadSource` sa odvodzuje z URL parametrov alebo referrera.

## CONTACTS
- Email: `strechy@dronservis.sk`
- Telefón: `+421 910 123 456`
- Pravidlo: rovnaké kontakty musia byť v hero, v procese a vo footeri.

## ASSETS
- CSS: inline `<style>` v `index.html`
- JS: externý `order-form.js`
- Shared package mapping: `order-packages.js`
- Obrázok: `ChatGPT Image Jan 27, 2026, 05_32_36 PM.png`

## RELATED DOCS
- `PROJECT_HANDOVER.md`
- `FLOW_ORDER_STRIPE.md`
- `README_RUN_LOCAL_AND_TEST.md`
- `README_PROD_SETUP.md`
- `README_DEPLOY_CLOUDFLARE.md`

## TODO / OPEN QUESTIONS
- Nastaviť live `STRIPE_SECRET_KEY` a produkčné return URL.
- Pridať post-payment potvrdenie zaplatenej rezervácie.
- Doplniť ostré obchodné podmienky a refund workflow.
- Pridať reálne referencie a vizuály z pilotných realizácií.
- Vytvoriť DE variantu landing page.
