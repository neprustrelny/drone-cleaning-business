# README FOR AUDIT

## Čo je projekt
- Landing page „Čistá strecha z neba“ – čistenie striech dronom, predobjednávky so zálohou 50 € platenou cez Stripe.

## Hlavný cieľ auditu
- Overiť, že flow „formulár → POST `/api/order` (placeholder) → Stripe Checkout (záloha 50 €)“ funguje a že dokumenty / CTA / kontakty sú konzistentné.

## Čo skontrolovať ako prvé
1. Prečítať `PROJECT_HANDOVER.md`, potom `SITE_OVERVIEW.md`, napokon `index.html`.
2. Prejsť JS blok na konci `index.html` – validácia polí, POST na `/api/order`, disable/enable CTA, otvorenie Stripe.
3. Overiť kontaktné údaje a odkazy (email, telefón, obchodné podmienky) podľa `CONTACTS_SCAN.md`.
4. Pri Stripe počítať s TEST linkom: `https://buy.stripe.com/test_bIY14d0eW4TB3pu4gg` (treba vymeniť po prechode na produkciu).

## Flow v skratke
- Používateľ vyplní meno, adresu, email (telefón/poznámka voliteľné), klikne na CTA.
- JS validuje, pošle JSON na `/api/order`, zobrazí stav (úspech/chyba) a podľa výsledku buď otvorí Stripe, alebo vypíše chybu.
