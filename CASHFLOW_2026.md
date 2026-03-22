# CASHFLOW 2026 – Čistá strecha z neba
Last updated: 2026-03-20

## TL;DR
- Verejné balíčky sú 199 €, 299 € a 399 €, ale interný plán používa priemernú realizovanú tržbu 1 050 € na zákazku.
- Dôvod: 1 050 € je blended priemer po započítaní väčších striech, doplnkov, fasád a vyšších zákaziek mimo entry balíkov.
- Záloha 50 € je samostatný cashflow motor, preto sledujeme počet záloh, CAC na zálohu a konverziu záloha -> realizácia.
- Stratégia 2026: najprv SK testovacie zákazky, potom DE expanzia do regiónu Kassel (trh 25 000 rodinných domov + 50 km).
- Rozhodovací cieľ: držať `CAC na zálohu <= 40 €` v realistickom scenári, inak funnel neprináša dostatočný cashflow.

## Vstupné predpoklady
- Cieľový trh DE: 25 000 rodinných domov v regióne Kassel + 50 km.
- Verejný cenník: 199 € základný dom, 299 € strecha + fasáda, 399 € veľká strecha.
- Záloha: 50 € pri objednávke, odpočítava sa z finálnej ceny.
- Priemerná realizovaná tržba: 1 050 € na dokončenú zákazku.
- Doplatok po realizácii: 1 000 € na priemernú zákazku.
- Priame prevádzkové náklady: 120 € na realizovanú zákazku.
- Fixné náklady v modeli: low-overhead režim (telefón, doprava, administratíva, menší software stack).
- Go-to-market: SK testy v prvej fáze, DE škálovanie až po overení procesu a referencií.

## Scenáre 2026 – ročné zhrnutie
| Scenár | Zálohy | Cash zo záloh | Dokončené zákazky | Tržba pri 1 050 € | Marketing spend | CAC na zálohu | ROAS na tržbu | Čistý cashflow |
|------|-------|--------------|-------------------|-------------------|-----------------|---------------|---------------|----------------|
| Pesimistický | 81 | 4 050 € | 54 | 56 700 € | 4 860 € | 60 € | 11.67x | 42 410 € |
| Realistický | 149 | 7 450 € | 127 | 133 350 € | 5 960 € | 40 € | 22.37x | 107 000 € |
| Optimistický | 243 | 12 150 € | 211 | 221 550 € | 7 290 € | 30 € | 30.39x | 181 640 € |

## Interpretácia scenárov
### Pesimistický
- Nízke tempo dopytu, CAC je 60 €, teda vyšší ako samotná záloha.
- Funnel ešte nevie financovať rast len zo záloh, ale cashflow zachraňuje doplatok po realizácii.
- Penetrácia trhu: 54 dokončených zákaziek = približne 0.22 % z 25 000 domov.

### Realistický
- Funnel sa stabilizuje, CAC na zálohu padá na 40 € a záloha už pomáha financovať akvizíciu.
- Pri 127 realizovaných zákazkách ide o približne 0.51 % trhu Kassel + 50 km.
- Toto je scenár, na ktorý má byť naviazané plánovanie rozpočtu a nábor kapacity.

### Optimistický
- Silné kreatívy, dobré referencie zo Slovenska a fungujúci nemecký funnel výrazne znižujú CAC.
- Pri 211 realizovaných zákazkách ide o približne 0.84 % konzervatívne definovaného trhu.
- Tento scenár dáva priestor na rýchlejšie reinvestovanie do výkonovej reklamy a vybavenia.

## Mesačný cashflow – pesimistický scenár
| Mesiac | Zálohy | Cash zo záloh | Realizácie | Doplatky | Celkový príjem | Marketing | Opex realizácie | Fixné náklady | Net cash |
|------|-------|--------------|------------|----------|----------------|-----------|-----------------|---------------|----------|
| Jan | 0 | 0 € | 0 | 0 € | 0 € | 0 € | 0 € | 250 € | -250 € |
| Feb | 0 | 0 € | 0 | 0 € | 0 € | 0 € | 0 € | 250 € | -250 € |
| Mar | 2 | 100 € | 0 | 0 € | 100 € | 120 € | 0 € | 250 € | -270 € |
| Apr | 4 | 200 € | 1 | 1 000 € | 1 200 € | 240 € | 120 € | 300 € | 540 € |
| Maj | 5 | 250 € | 3 | 3 000 € | 3 250 € | 300 € | 360 € | 350 € | 2 240 € |
| Jun | 6 | 300 € | 4 | 4 000 € | 4 300 € | 360 € | 480 € | 350 € | 3 110 € |
| Jul | 8 | 400 € | 5 | 5 000 € | 5 400 € | 480 € | 600 € | 400 € | 3 920 € |
| Aug | 10 | 500 € | 6 | 6 000 € | 6 500 € | 600 € | 720 € | 400 € | 4 780 € |
| Sep | 12 | 600 € | 8 | 8 000 € | 8 600 € | 720 € | 960 € | 450 € | 6 470 € |
| Okt | 14 | 700 € | 10 | 10 000 € | 10 700 € | 840 € | 1 200 € | 450 € | 8 210 € |
| Nov | 12 | 600 € | 10 | 10 000 € | 10 600 € | 720 € | 1 200 € | 450 € | 8 230 € |
| Dec | 8 | 400 € | 7 | 7 000 € | 7 400 € | 480 € | 840 € | 400 € | 5 680 € |

## Mesačný cashflow – realistický scenár
| Mesiac | Zálohy | Cash zo záloh | Realizácie | Doplatky | Celkový príjem | Marketing | Opex realizácie | Fixné náklady | Net cash |
|------|-------|--------------|------------|----------|----------------|-----------|-----------------|---------------|----------|
| Jan | 0 | 0 € | 0 | 0 € | 0 € | 0 € | 0 € | 250 € | -250 € |
| Feb | 0 | 0 € | 0 | 0 € | 0 € | 0 € | 0 € | 250 € | -250 € |
| Mar | 3 | 150 € | 1 | 1 000 € | 1 150 € | 120 € | 120 € | 300 € | 610 € |
| Apr | 6 | 300 € | 3 | 3 000 € | 3 300 € | 240 € | 360 € | 350 € | 2 350 € |
| Maj | 8 | 400 € | 6 | 6 000 € | 6 400 € | 320 € | 720 € | 450 € | 4 910 € |
| Jun | 10 | 500 € | 8 | 8 000 € | 8 500 € | 400 € | 960 € | 500 € | 6 640 € |
| Jul | 14 | 700 € | 12 | 12 000 € | 12 700 € | 560 € | 1 440 € | 600 € | 10 100 € |
| Aug | 18 | 900 € | 15 | 15 000 € | 15 900 € | 720 € | 1 800 € | 650 € | 12 730 € |
| Sep | 22 | 1 100 € | 19 | 19 000 € | 20 100 € | 880 € | 2 280 € | 700 € | 16 240 € |
| Okt | 26 | 1 300 € | 23 | 23 000 € | 24 300 € | 1 040 € | 2 760 € | 750 € | 19 750 € |
| Nov | 24 | 1 200 € | 22 | 22 000 € | 23 200 € | 960 € | 2 640 € | 750 € | 18 850 € |
| Dec | 18 | 900 € | 18 | 18 000 € | 18 900 € | 720 € | 2 160 € | 700 € | 15 320 € |

## Mesačný cashflow – optimistický scenár
| Mesiac | Zálohy | Cash zo záloh | Realizácie | Doplatky | Celkový príjem | Marketing | Opex realizácie | Fixné náklady | Net cash |
|------|-------|--------------|------------|----------|----------------|-----------|-----------------|---------------|----------|
| Jan | 0 | 0 € | 0 | 0 € | 0 € | 0 € | 0 € | 250 € | -250 € |
| Feb | 1 | 50 € | 0 | 0 € | 50 € | 30 € | 0 € | 250 € | -230 € |
| Mar | 4 | 200 € | 2 | 2 000 € | 2 200 € | 120 € | 240 € | 350 € | 1 490 € |
| Apr | 8 | 400 € | 5 | 5 000 € | 5 400 € | 240 € | 600 € | 450 € | 4 110 € |
| Maj | 12 | 600 € | 9 | 9 000 € | 9 600 € | 360 € | 1 080 € | 600 € | 7 560 € |
| Jun | 16 | 800 € | 13 | 13 000 € | 13 800 € | 480 € | 1 560 € | 700 € | 11 060 € |
| Jul | 24 | 1 200 € | 20 | 20 000 € | 21 200 € | 720 € | 2 400 € | 850 € | 17 230 € |
| Aug | 30 | 1 500 € | 26 | 26 000 € | 27 500 € | 900 € | 3 120 € | 950 € | 22 530 € |
| Sep | 36 | 1 800 € | 32 | 32 000 € | 33 800 € | 1 080 € | 3 840 € | 1 100 € | 27 780 € |
| Okt | 42 | 2 100 € | 38 | 38 000 € | 40 100 € | 1 260 € | 4 560 € | 1 200 € | 33 080 € |
| Nov | 40 | 2 000 € | 36 | 36 000 € | 38 000 € | 1 200 € | 4 320 € | 1 200 € | 31 280 € |
| Dec | 30 | 1 500 € | 30 | 30 000 € | 31 500 € | 900 € | 3 600 € | 1 000 € | 26 000 € |

## Rozhodovacie pravidlá pre reklamu a cashflow
- Ak `CAC na zálohu > 50 €`, funnel negeneruje pozitívny upfront cashflow zo záloh a treba meniť kreatívu, audience alebo landing copy.
- Ak `form start -> Stripe click < 35 %`, problém je v dôvere, balíčkoch alebo CTA texte.
- Ak `Stripe click -> payment success < 65 %`, problém je v checkoute alebo v kvalite leadu.
- Ak priemerná realizovaná tržba padá pod 1 050 €, treba riešiť upsell, väčšie zákazky alebo cenotvorbu.
- Ak SK testovacie zákazky neprinášajú referencie a fotky, DE launch sa má odložiť, nie urýchliť.

## Otázniky / potrebné doplniť
- `[[DOPLNIT: presný CAPEX na nákup dronu a príslušenstva]]`
- `[[DOPLNIT: reálny spend podľa Meta/Google testov]]`
- `[[DOPLNIT: conversion rate zo zálohy na realizáciu po prvých 10-20 zákazkách]]`
- `[[DOPLNIT: presné fixné náklady po spustení produkcie]]`
