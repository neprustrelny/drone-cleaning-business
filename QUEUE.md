# QUEUE – Čistá strecha z neba
Last updated: 2026-03-20

## TL;DR
- Priorita č. 1 je funnel, ktorý vyberá čo najviac 50 € záloh.
- Priorita č. 2 je nemecká verzia pre Kassel, ale ostrý launch má prísť až po SK testovacích zákazkách.
- Každý task sa hodnotí cez tri čísla: počet záloh, CAC na zálohu a vplyv na cashflow.

## P1 – okamžite
| Priorita | Task | Výstup | KPI / číslo | Stav |
|------|------|--------|--------------|------|
| P1 | Funnel copy + CTA v `index.html` | Jasný hero, balíčky 199/299/399 €, CTA na 50 € zálohu | Vyšší `form start` a `Stripe click rate` | DONE |
| P1 | Server-side Stripe Checkout scaffold | `/api/order` vracia `checkoutUrl`, success/cancel URL a čaká len na live env | Skrátenie cesty k ostrému inkasu | DONE |
| P1 | Produkčný Stripe env + live `price_...` | Ostré 50 € checkout session bez test fallbacku | Platby bez manuálneho zásahu | TODO |
| P1 | Produkčný `/api/order` + email handler | Reálny lead capture a potvrdenie objednávky | 0 stratených leadov | IN_PROGRESS |
| P1 | Nemecká landing verzia pre Kassel | `index.de.html` alebo samostatná DE landing page | Pripravená DE akvizícia pre 25 000 domov | TODO |
| P1 | Analytics funnel | Trackovanie `visit -> form -> Stripe -> payment` | CAC na zálohu a konverzie viditeľné denne | TODO |

## P2 – po odblokovaní P1
| Priorita | Task | Výstup | KPI / číslo | Stav |
|------|------|--------|--------------|------|
| P2 | SK testovacie zákazky | 5-10 pilotných realizácií, fotky, video, referencie | Overený proces a prvé case studies | TODO |
| P2 | Pricing a upsell logika | Vysvetlený bridge medzi 199/299/399 € a priemerom 1 050 € | Udržanie priemernej tržby 1 050 € | TODO |
| P2 | GDPR + obchodné podmienky | Ostré právne podklady vo footeri a checkout flow | Menší trust drop pred platbou | TODO |
| P2 | Before/after kreatívy | Reálne vizuály pre reklamu a landing page | Nižší CAC na zálohu | TODO |
| P2 | FAQ pre DE klienta | Nemecké otázky k bezpečnosti, fasádam, termínom a platbe | Vyšší trust v DE kampani | TODO |

## P3 – expanzia a compliance
| Priorita | Task | Výstup | KPI / číslo | Stav |
|------|------|--------|--------------|------|
| P3 | EASA/LBA 2026 Specific + SORA pack | Praktický launch checklist pre Kassel | Žiadny regulačný blok po spustení | BLOCKED |
| P3 | Germany market entry doc | Lokálna taktika pre Kassel + 50 km | Jasný rollout po SK validácii | TODO |
| P3 | CRM follow-up proces | SMS/email follow-up po neúspešnej platbe | Vyšší recovery rate záloh | TODO |
| P3 | Partneri v DE | Lokálni pomocníci, poistenie, servis, pilot support | Rýchlejšia expanzia bez chaosu | TODO |

## Gating pravidlá
- Nespúšťať väčší DE spend skôr, než budú aspoň 3 platené SK testovacie zákazky s fotkami a referenciou.
- Ak `CAC na zálohu > 50 €`, stopnúť scaling a najprv opraviť creative/landing/offer match.
- Ak `payment success rate < 65 %`, prioritne riešiť checkout trust, nie pridávať rozpočet.
- Ak priemerná realizovaná tržba padne pod 1 050 €, doplniť upsell balíčky a B2B väčšie zákazky.
