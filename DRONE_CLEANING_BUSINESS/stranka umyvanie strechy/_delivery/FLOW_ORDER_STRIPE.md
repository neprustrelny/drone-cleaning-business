# FLOW: FORM → /api/order → STRIPE

1. Používateľ vyplní objednávkový formulár v sekcii `#objednavka` (povinné polia: meno, adresa objektu, email; voliteľné: telefón, poznámka).  
2. Po kliknutí na CTA „Dokončiť objednávku s povinnosťou platby“ JS validuje povinné polia, zvýrazní prázdne a zastaví proces, kým nie sú vyplnené.  
3. Po úspešnej validácii sa CTA dočasne deaktivuje (`aria-disabled`, `aria-busy`) a zobrazí sa správa „Spracovávame tvoju objednávku...“.  
4. Formulár sa serializuje do JSONu a odošle `fetch` POST na placeholder endpoint `/api/order` (očakáva sa reálny backend/email handler).  
5. Ak POST vráti 2xx, status box zobrazí potvrdenie, formulár sa resetuje a následne sa v novej karte otvorí Stripe Checkout link `https://buy.stripe.com/test_bIY14d0eW4TB3pu4gg` (TEST).  
6. Ak POST zlyhá (response != 2xx alebo sieťová chyba), CTA sa reaktivuje a používateľ vidí hlášku „Formulár sa nepodarilo odoslať...“ s adresou strechy@dronservis.sk.  
7. Stripe Checkout aktuálne smeruje na TEST prostredie; po prechode na produkciu stačí vymeniť URL v konštante `STRIPE_CHECKOUT_URL`.  
8. Celý flow je navrhnutý tak, aby pripojenie reálneho backendu vyžadovalo iba implementáciu `/api/order` + výmenu Stripe linku, bez zásahov do UI.
