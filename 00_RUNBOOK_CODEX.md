# DRONE_CLEANING_BUSINESS – DAILY RUNBOOK
Last updated: 2026-03-25

## 0) Tvrdé pravidlá
- Pracuj len v tomto repozitári.
- Nikdy nemaž súbory. Ak treba, vytvor novú verziu alebo archív.
- Priorita č. 1 je preorder funnel, ktorý financuje rozbeh heavy-duty dronu a prevádzky.
- Každé rozhodnutie vyhodnocuj cez čísla: hrubý preorder cash, priemerná predobjednávka, platený preorder CAC, B2B audit close rate a refund rate.
- Fixné parametre projektu:
  - cieľ hrubého cashu z predobjednávok: 42 000 €
  - 30 000 €: dron alebo silná akontácia
  - 6 000 €: licencie, poistenie, compliance, dokumentácia, povolenia
  - 4 000 €: príslušenstvo, spotrebák, testy, doprava, ochranné prvky
  - 2 000 €: buffer na fees, refundy a výpadky
  - verejný cenník: 349 / 590 / 890 / 990 €
  - rezervácie: 149 / 199 / 299 / 990 €
  - KPI: priemerná predobjednávka min. 250 €, platený B2C preorder CAC do 55 €
- Ak vznikne konflikt medzi dokumentmi, rozhoduje:
  1. aktuálny živý kód,
  2. mapa projektu,
  3. root runbook / status / cashflow,
  4. až potom staršie handovery.

## 1) North star metrics
- Hrubý preorder cash proti cieľu 42 000 €.
- Priemerná predobjednávka: cieľ min. 250 €.
- Platený B2C preorder CAC: cieľ do 55 €.
- B2B audit close rate.
- Refund rate.
- Checkout success rate.

## 2) Praktický denný plán
### 08:00 – 08:30
- Pozri `STATUS.md`, `QUEUE.md`, `CASHFLOW_2026.md` a posledný zápis v `CHANGELOG.md`.
- Zapíš si 3 denné priority.
- Over, či najvyššia priorita posúva preorder cash, priemernú hodnotu alebo nižší CAC.

### 08:30 – 10:30
- Rob len funnel:
  - hero text
  - CTA
  - balíčky
  - formulár
  - Stripe flow
  - trust pred platbou

### 10:30 – 12:00
- Rieš akvizíciu a kvalitu dopytu:
  - reklamy
  - kreatívy
  - B2B audit outreach
  - follow-up po nedokončenom checkoute
  - remarketing pre kvalifikované objekty

### 13:00 – 14:30
- Rieš prevádzku a validáciu:
  - SK pilotné objekty
  - kvalifikáciu vhodnosti objektu
  - SOP
  - zber fotiek, videí a referencií

### 14:30 – 16:00
- Rieš financie a rozhodovanie:
  - porovnaj realitu s `CASHFLOW_2026.md`
  - prepočítaj gross preorder cash, CAC, mix balíkov a buffer na refundy
  - ak čísla nepasujú, uprav funnel, ponuku alebo kvalifikáciu leadov

### 16:00 – 16:30
- Urob dokumentačný uzáver:
  - update `STATUS.md`
  - update `CHANGELOG.md`
  - presuň tasky v `QUEUE.md`
  - zapíš ďalšie 3 priority na zajtra

## 3) Prioritné poradie práce v aktuálnej fáze
1. Landing page a preorder flow
2. Produkčný Stripe a potvrdenie platieb
3. B2B audit funnel a close rate
4. SK pilotné realizácie a referencie
5. Analytika a meranie funnelu
6. Nemecká verzia landing page
7. Regulácie a škálovanie

## 4) Definition of Done pre súbor
Súbor je hotový len vtedy, ak:
- je stručný a použiteľný v realite,
- je zladený s balíkmi `house_s`, `house_m`, `house_l`, `b2b_audit`,
- podporuje cieľ 42 000 € gross preorder cash,
- zvyšuje jasnosť, dôveru alebo cashflow,
- nepoužíva starý 50 € alebo 199/299/399 € model ako hlavný offer.

## 5) Stop pravidlá
- Ak platený B2C preorder CAC presiahne 55 €, nescaleuj spend bez úpravy offeru alebo kreatívy.
- Ak priemerná predobjednávka klesne pod 250 €, oprav mix balíkov a CTA.
- Ak refund rate rastie, sprísni kvalifikáciu objektov a komunikáciu podmienok.
- Ak checkout nevie vracať server-side `checkoutUrl`, funnel nie je pripravený na prevádzku.

## 6) Týždenný checkpoint
- Hrubý preorder cash.
- Priemerná hodnota predobjednávky.
- Reálny platený preorder CAC.
- Počet a close rate B2B auditov.
- Refundy a nedokončené checkouty.
- Stav pripravenosti SK pilotov a DE verzie.

## 7) Denný reporting formát
- Čo bolo dokončené dnes.
- Koľko to môže priniesť preorder cash alebo ušetriť CAC.
- Aké riziko ostáva otvorené.
- Na čom sa robí zajtra ráno ako prvom.
