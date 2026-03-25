# FLOW: FORM → /api/order → STRIPE

1. Používateľ vyberie balík `house_s`, `house_m`, `house_l` alebo `b2b_audit`, doplní typ objektu, krajinu a kontaktné údaje.
2. Frontend `order-form.js` validuje povinné polia a pripraví JSON payload bez dôveryhodnej sumy.
3. Payload ide na `POST /api/order`.
4. Server v `functions/api/order.ts`:
   - validuje balík a lead,
   - načíta server-side package mapping z `order-packages.js`,
   - určí rezerváciu 149 / 199 / 299 / 990 €,
   - uloží lead,
   - vytvorí Stripe Checkout Session,
   - do metadata zapíše minimálne `package`, `typObjektu`, `krajina`, `leadSource`.
5. Server vráti JSON s `checkoutUrl` a reservation summary.
6. Frontend iba redirectne na `checkoutUrl`.
7. Po úspešnej platbe sa klient vracia na `?checkout=success`; pri zrušení na `?checkout=cancel`.
8. Ďalší krok po platbe nie je automatická realizácia, ale vyhodnotenie objektu, počasia a prevádzkovej pripravenosti.

## Poznámky
- Klient nikdy neposiela dôveryhodnú sumu.
- Hardcoded test Stripe link nie je súčasťou aktívneho flow.
- Bez `STRIPE_SECRET_KEY` server vracia `stripe_not_configured` namiesto falošného checkoutu.
