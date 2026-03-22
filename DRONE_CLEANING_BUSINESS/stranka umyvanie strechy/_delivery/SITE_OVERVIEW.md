# SITE OVERVIEW – Čistá strecha z neba
Last updated: 2026-01-29

## STATUS
- Staging / lokálne – landing page pripravená, texty sa dolaďujú na konverziu a zálohy 50 €

## STRUCTURE (pages)
- index.html – hlavná predajná landing page pre čistenie striech dronom (predobjednávky na apríl – jún, formulár + Stripe záloha 50 €); sekcie: hero s CTA, benefit bar, orientačné info o zálohe/cenách, „Pre koho je služba“, FAQ (vrátane `<details>` s technickými info), objednávkový formulár, recenzie, 5-krokový proces, záverečné CTA a „Kto sme“

## NAVIGATION & LINKS
- sticky header s CTA „Začať objednávku“ smeruje na sekciu formulára (`#objednavka`)
- vnútorné anchor linky na sekcie: úvod/hero (`#uvod`), benefit bar, informácie (`#informacie`), „Pre koho je služba“, FAQ, objednávka (`#objednavka`), recenzie, „Ako to prebieha“, finálne CTA, „Kto sme“
- kontakt funguje cez email a telefón v sekcii „Ako to prebieha“ + vo footeri (strechy@dronservis.sk, +421 910 123 456)

## CTA LOGIC
- hlavné CTA: tlačidlá „Začať objednávku“ / „Vyplniť údaje k streche“ v hero a závere + „Dokončiť objednávku s povinnosťou platby“ (Stripe Checkout, záloha 50 €)
- sekundárne CTA: vyplnenie formulára (meno, adresa, email, telefón, poznámka) – validácia + JSON POST na `/api/order`, počas odosielania je CTA dočasne deaktivované
- po úspešnom POST: krátka stavová hláška a otvorenie Stripe Checkout v novom okne
- ďalšie CTA: kontaktný email/telefón (strechy@dronservis.sk / +421 910 123 456) pre otázky („Chceš sa opýtať?“ texty v hero, krokoch a footeri)

## CONTACTS
- Email: strechy@dronservis.sk
- Telefón: +421 910 123 456
- Pravidlo: rovnaké kontakty musia byť v krokoch „Ako to prebieha“, v správach pri formulári a vo footeri

## ASSETS
- CSS: inline `<style>` v `index.html`
- JS: inline `<script>` v `index.html` (validácia formulára, JSON POST na `/api/order`, stavové hlášky, otvorenie Stripe)
- Obrázky: `ChatGPT Image Jan 27, 2026, 05_32_36 PM.png` (hlavná fotka dronu) v root priečinku + externé logo Stripe

## TODO / OPEN QUESTIONS
- prepojiť `/api/order` na reálny backend / emailový handler a otestovať 2xx odpoveď
- vymeniť Stripe TEST link (`buy.stripe.com/test...`) za produkčný Checkout
- doplniť reálny dokument obchodných podmienok / GDPR
- pridať reálne fotografie a referencie namiesto generických ukážok
- vyjasniť finálne nacenenie a fakturačný proces po zaplatení zálohy

## WHAT CHANGED (last cycle)
- Hero, benefity a CTA texty skrátené na 1–2 vety podľa rozhodovacieho tunela.
- „Pre koho“ rozšírené na 5 konkrétnych kartičiek, proces prekopaný na jasných 5 krokov.
- FAQ doplnené o bezpečnosť/počasie/mach + `<details>` pre technické info, formulár dostal stručnú poznámku o Stripe.
