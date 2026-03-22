# SEO & A11Y CHECK

## Meta & Head
- `<title>`: „Čistá strecha z neba – Čistenie striech dronom“ – vystihuje službu.
- `<meta name="description">`: popisuje bezpečné čistenie striech dronom + predobjednávky so zálohou 50 € – OK, no manuálne over pravopis a dĺžku (cca 160 znakov).

## Headings & Content
- Hlavný H1: „Čistá strecha do pár hodín“ – jasný a priamo k rozhodnutiu.
- Sekcie používajú logické `<h2>` s krátkymi názvami.

## Obrázky
- Hlavný obrázok dronu (`ChatGPT Image Jan 27, 2026, 05_32_36 PM.png`) má `alt="Dron čistí strechu vodou"` – zmysluplný text.

## Form & Status
- Formulár má popisky `<label>` + `aria-live="polite"` na status boxe, takže screen reader zachytí potvrdenie/ chybu.
- CTA sa pri odosielaní deaktivuje (`aria-disabled`, `aria-busy`) – dobré pre A11y.

## Kontrast & CTA
- Tlačidlá používajú tmavomodré / zelené pozadie s bielym textom – kontrast vyzerá dostatočný, odporúčaný manuálny check (Manual check needed).

## Ďalšie poznámky
- Over, že všetky interné anchor linky majú existujúce sekcie (Manual check needed).
- Manuálne prever funkčnosť odkazu na `/obchodne-podmienky.pdf` po nahratí reálneho dokumentu.
