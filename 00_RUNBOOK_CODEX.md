# DRONE_CLEANING_BUSINESS – DAILY RUNBOOK
Last updated: 2026-03-20

## 0) Tvrdé pravidlá
- Pracuj len v tomto repozitári.
- Nikdy nemaž súbory. Ak treba, vytvor novú verziu alebo archív.
- Priorita č. 1 je marketing a predajný funnel na 50 € zálohy.
- Každé rozhodnutie vyhodnocuj cez čísla: počet záloh, CAC na zálohu, cashflow, priemerná tržba 1 050 €.
- Fixné parametre projektu:
  - trh DE: 25 000 rodinných domov v regióne Kassel + 50 km
  - balíčky: 199 €, 299 €, 399 €
  - priemerná realizovaná tržba: 1 050 €
  - stratégia: najprv testovacie zákazky na Slovensku, až potom expanzia do Nemecka
- Po každom dokončenom súbore:
  1. skontroluj úplnosť,
  2. zapíš stav do `STATUS.md`,
  3. pridaj krátky zápis do `CHANGELOG.md`,
  4. pokračuj na ďalší task z `QUEUE.md`.

## 1) North star metrics
- Hlavná metrika: počet zaplatených 50 € záloh za týždeň.
- Vedľajšie metriky:
  - CAC na zálohu
  - `landing visit -> form start`
  - `form start -> Stripe click`
  - `Stripe click -> payment success`
  - priemerná realizovaná tržba 1 050 €
  - cash in tento týždeň

## 2) Praktický denný plán
### 08:00 – 08:30
- Pozri `STATUS.md`, `QUEUE.md` a posledný zápis v `CHANGELOG.md`.
- Zapíš si 3 denné priority.
- Skontroluj, či najvyššia priorita stále priamo podporuje zálohy a cashflow.

### 08:30 – 10:30
- Rob len funnel:
  - hero text
  - CTA
  - balíčky
  - formulár
  - Stripe flow
  - dôvera pred platbou
- Ak je funnel funkčný, choď na nemeckú verziu landing page.

### 10:30 – 12:00
- Pracuj na akvizícii:
  - reklamy
  - kreatívy
  - before/after materiály
  - follow-up správy
  - remarketing pre nedokončené platby

### 13:00 – 14:30
- Rieš prevádzku a validáciu:
  - SK testovacie zákazky
  - SOP
  - onboarding klienta
  - zber fotiek, videí a referencií

### 14:30 – 16:00
- Rieš financie a rozhodovanie:
  - porovnaj realitu s `CASHFLOW_2026.md`
  - prepočítaj CAC, počet záloh a netto cashflow
  - ak čísla nepasujú, uprav funnel alebo pricing komunikáciu

### 16:00 – 16:30
- Urob dokumentačný uzáver:
  - update `STATUS.md`
  - update `CHANGELOG.md`
  - presuň dokončené tasky v `QUEUE.md`
  - zapíš ďalšie 3 priority na zajtra

## 3) Prioritné poradie práce v aktuálnej fáze
1. Funnel a landing page
2. Nemecká verzia pre Kassel
3. Produkčný `/api/order` a Stripe
4. SK testovacie zákazky
5. Analytics a meranie konverzií
6. Regulácie pre DE launch
7. Škálovanie a expanzia

## 4) Definition of Done pre súbor
Súbor je hotový len vtedy, ak:
- je stručný a použiteľný v realite,
- obsahuje konkrétne kroky,
- obsahuje čísla alebo placeholdery,
- je zladený s balíčkami 199/299/399 €, zálohou 50 € a tržbou 1 050 €,
- zvyšuje jasnosť, predaj alebo cashflow.

## 5) Denné stop pravidlá
- Ak task neprináša lepší predaj, dôveru alebo cashflow, nie je priorita.
- Ak chýbajú čísla, doplň `[[DOPLNIT: ...]]`.
- Ak ide o DE regulácie, pracuj len s aktuálnymi EASA/LBA 2026 zdrojmi.
- Ak vznikne konflikt medzi dokumentmi, rozhoduje `STATUS.md` + aktuálny handover.

## 6) Týždenný checkpoint
- Počet nových záloh.
- Výška cash in zo záloh.
- Reálny CAC na zálohu.
- Počet dokončených SK testovacích zákaziek.
- Stav pripravenosti nemeckej verzie.
- Či je správne odôvodnený priemer 1 050 € oproti verejným balíčkom.

## 7) Denný reporting formát
- Čo bolo dokončené dnes.
- Koľko to môže priniesť záloh alebo ušetriť cash.
- Aké riziko ostáva otvorené.
- Na čom sa robí zajtra ráno ako prvom.
