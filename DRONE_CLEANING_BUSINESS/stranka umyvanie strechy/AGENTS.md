AGENT RULES – Čistá strecha z neba

1. Pred každým cyklom prečítaj `PROJECT_HANDOVER.md` + `SITE_OVERVIEW.md`.
2. Po každom cykle aktualizuj tieto dokumenty (a `AGENTS.md`, ak treba), keď sa mení obsah, štruktúra, CTA, kontakty alebo flow.
3. Nerealizuj nevyžiadané funkcie – riad sa aktuálnym cieľom v chate a drž projekt ako čistý one-pager bez frameworkov.
4. Texty drž krátke, jasné, orientované na hodnotu služby (čistá strecha bez lešenia), odstránenie obáv (bezpečnosť, čas, jednoduchosť) a navedenie na platbu zálohy 50 €.
5. Nikdy neporuš hlavný flow: formulár → validácia → POST na `/api/order` (placeholder) → Stripe Checkout (záloha 50 €).
6. Udržiavaj konzistenciu kontaktov (strechy@dronservis.sk / +421 910 123 456) v kóde aj dokumentoch.
7. Pri tvorbe `_delivery/` balíka zachovaj max 10 súborov, žiadne zbytočné logy – len stručné zhrnutia, kópie kľúčových súborov a audity potrebné na rýchly review.
