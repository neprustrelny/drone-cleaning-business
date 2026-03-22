# Netlify Deploy Setup

## Co je deploy target
GitHub repo root ma byt cely `DRON` workspace.

Netlify ma deployovat iba hlavny webovy projekt z:
`DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`

## Spravne nastavenie
- GitHub repository root: `DRON`
- Branch na deploy: `main`
- Base directory: `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`
- Build command: nechaj prazdne
- Publish directory: `.`

## Typ projektu
FAKT Z WORKSPACE:
- Deploy podprojekt je staticky HTML/JS frontend.
- V podprojekte existuje `package.json`, ale nema build script.
- `package.json` obsahuje iba Cloudflare Pages local/dev deploy skripty cez `wrangler`.
- V podprojekte existuju `functions/api/order.ts` a `functions/api/stripe/webhook.ts`.
- `wrangler.toml` je Cloudflare Pages konfiguracia, nie Netlify konfiguracia.

## Dolezite rozhodnutie
Netlify je vhodne pre frontend deploy tejto zlozky iba ako statickeho webu.

Hlavny konflikt:
- frontend vola `/api/order`
- tento endpoint je dnes implementovany ako Cloudflare Pages Function
- Netlify tento backend nespusti automaticky len tym, ze nasadi staticke subory

To znamena:
- staticky web sa da na Netlify nasadit
- lead capture, Stripe checkout flow a webhooky nebudu na Netlify funkcne bez dalsieho backend kroku

## Build command
Odporucany build command:
- prazdny

Preco:
- nejde o buildovany Vite / Next / Astro projekt
- v aktualnom podprojekte je `index.html` priamo publishovatelny

## Publish directory
Odporucany publish directory:
- `.`

Tym sa publikuje priamo obsah base directory.

## Environment variables
Pre cisty staticky Netlify deploy:
- ziadne povinne env vars netreba

Ak sa neskor backend migruje na Netlify Functions alebo externe API, budu relevantne najma:
- `NOTIFY_WEBHOOK_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID_DEPOSIT_50`
- `STRIPE_SUCCESS_URL`
- `STRIPE_CANCEL_URL`
- `STRIPE_WEBHOOK_SECRET`

Secrets nikdy nepatria do repozitara.

## Netlify UI postup
1. Prihlas sa do Netlify.
2. Klikni `Add new site` -> `Import an existing project`.
3. Vyber GitHub a autorizuj pristup.
4. Vyber repo `drone-cleaning-business` alebo nazov, ktory vytvoris.
5. Branch nastav na `main`.
6. Base directory nastav presne na:
   `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/`
7. Build command nechaj prazdny.
8. Publish directory nastav na:
   `.`
9. Environment variables zatial nepridavaj, ak ides iba staticky frontend deploy.
10. Spusti deploy.

Po tomto bode bude fungovat auto-deploy po pushi do `main`, ale iba pre frontend cast.

## Netlify CLI varianta
FAKT Z WORKSPACE:
- `netlify` CLI je v tomto prostredi dostupne.

Ak sa budes chciet prihlasit rucne:

```bash
netlify login
```

Potom mozes projekt prepojit lokalne a nastavit deploy:

```bash
cd '/home/neprustrelny/Desktop/codex workspace/DRON/DRONE_CLEANING_BUSINESS/stranka umyvanie strechy'
netlify init
```

Pri `netlify init` nastav:
- existing site alebo create new site pod tvojim uctom
- base directory nechaj riesit cez Site settings v Netlify UI na urovni Git-based deployu
- publish directory `.`
- build command prazdny

PRACOVNY ODHAD:
- Pre Git-based auto-deploy je Netlify UI spolahlivejsia a prehladnejsia cesta nez lokalne `netlify init`.

## Hlavne rizika
- nespravny base directory
- secrets alebo `.dev.vars` v repozitari
- deploy z nespravneho branchu
- zmatok medzi root `DRON` a deploy subprojektom
- falosny pocit, ze Netlify preberie aj Cloudflare Pages backend bez migracie

## Prakticky blocker
Ak chces, aby na Netlify fungoval aj formular a zaloha end-to-end, treba spravit jednu z tychto dvoch veci:
- migrovat `functions/api/*` z Cloudflare Pages na Netlify Functions
- alebo nechat backend mimo Netlify a frontend prepnut na externy API endpoint

Bez toho je Netlify pripraveny len na frontend deploy, nie na plne funkcny funnel.
