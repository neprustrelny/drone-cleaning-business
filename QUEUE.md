# QUEUE – Čistá strecha z neba
Last updated: 2026-03-25

## TL;DR
- Priorita č. 1 je dostať projekt na 42 000 € gross preorder cash pred nákupom dronu.
- Priorita č. 2 je udržať priemernú predobjednávku nad 250 € a platený B2C preorder CAC do 55 €.
- Priorita č. 3 je rozbehnúť B2B audit funnel, ktorý dvíha cash aj kvalitu dopytu.

## P1 – okamžite
| Priorita | Task | Výstup | KPI / číslo | Stav |
|------|------|--------|--------------|------|
| P1 | Landing page copy + CTA | Hero, pricing a formulár pre 149/199/299/990 € rezervácie | Vyšší `form start` a vyššia priemerná predobjednávka | DONE |
| P1 | Server-side Stripe pricing | `/api/order` vracia `checkoutUrl` podľa balíka | Klient nikdy neposiela dôveryhodnú sumu | DONE |
| P1 | Produkčný Stripe env | Live checkout na Pages bez test fallbacku | Platby bez manuálneho zásahu | TODO |
| P1 | Post-payment potvrdenie | Zápis zaplatenej rezervácie a follow-up | 0 stratených platieb | IN_PROGRESS |
| P1 | Analytics funnel | Trackovanie `visit -> form -> checkout -> payment` | CAC a checkout success rate viditeľné denne | TODO |
| P1 | B2B audit outreach | Prvé kvalifikované firmy/obce/kostoly v pipeline | Vyšší gross preorder cash na lead | TODO |

## P2 – po odblokovaní P1
| Priorita | Task | Výstup | KPI / číslo | Stav |
|------|------|--------|--------------|------|
| P2 | SK pilotné realizácie | 5-10 prvých realizácií s fotkami a referenciami | Silnejší trust layer a nižší CAC | TODO |
| P2 | Refund + obchodné podmienky | Jasné pravidlá pre nevhodný objekt, presun a storno | Nižší refund rate | TODO |
| P2 | Before/after kreatívy | Reálne vizuály pre reklamu a landing page | Nižší platený preorder CAC | TODO |
| P2 | Nemecká landing verzia | DE varianta pre Kassel + 50 km | Lepší response rate v DE akvizícii | TODO |
| P2 | CRM follow-up proces | SMS/email follow-up po nedokončenom checkoute a B2B audite | Vyšší recovery rate | TODO |

## P3 – expanzia a compliance
| Priorita | Task | Výstup | KPI / číslo | Stav |
|------|------|--------|--------------|------|
| P3 | EASA/LBA 2026 pack | Praktický launch checklist pre DE operácie | Žiadny regulačný blok po launchi | BLOCKED |
| P3 | Germany market entry doc | Lokálna taktika pre Kassel + 50 km | Jasný rollout po SK validácii | TODO |
| P3 | Operatívna kapacita | SOP pre scheduling, dopravu, príslušenstvo a servis | Bez chaosu po prekročení 42k cash target | TODO |

## Gating pravidlá
- Ak platený B2C preorder CAC > 55 €, stopni scaling a oprav offer / creative / landing match.
- Ak priemerná predobjednávka < 250 €, posilni mix `house_m`, `house_l` a `b2b_audit`.
- Ak refund rate > 8 %, sprísni kvalifikáciu objektov a vysvetlenie podmienok.
- Ak B2B audit close rate zostane slabý, oprav messaging, outreach a follow-up skôr než zvyšuješ spend.
- Ak gross preorder cash nedosiahne 42 000 €, neplánuj nákup dronu ako hotovú vec.
