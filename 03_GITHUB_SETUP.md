# GitHub Setup

## Ucel
Tento dokument nastavuje GitHub ako kanonicky source of truth pre cely workspace `DRON`.

## Odporucany nazov repa
Odporucany nazov: `drone-cleaning-business`

Preco je lepsi nez `dron`:
- hned vysvetluje, co repo obsahuje; `dron` je prilis vseobecny.

## Aktualny stav
- Repo v workspaci je uz inicializovane.
- Aktualny branch: `main`
- Remote `origin`: zatial nie je nastaveny.

## Branch model
- Start jednoduchym modelom: iba `main`.
- `main` je kanonicka historia pre cely workspace.
- Feature branches zaved az vtedy, ked budu realne paralelne zmeny z viac zariadeni alebo ludi.

## Co commitovat
- root dokumenty a riadiace subory
- `DRONE_CLEANING_BUSINESS/`
- `mapa/`
- root technicku vetvu (`index.js`, `order-handler.js`, `wrangler.toml`, `test/`)
- `package.json` a `package-lock.json`, ak patria k realne pouzivanym castiam workspace

## Co necommitovat
- `node_modules/`
- `.wrangler/`
- `.netlify/`
- `.dev.vars`
- `.env` a `.env.*`
- lokalne cache, temp a log subory
- ziadne secrets ani lokalne tokeny

## Poznamka k velkym suborom
Pred prvym pushom skontroluj, ci chces v repozitari drzat velke assety ako:
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/Biznis_plan__Cistenie_dronom.mp4` alebo jeho aktualny nazov s diakritikou
- vacsie PDF a obrazky v deploy podprojekte

Ak maju ostat v repozitari, je to akceptovatelne. Ak maju len podporny charakter, zvaz neskor Git LFS alebo externy storage.

## Presne prikazy od nuly
Ak by si setup robil od nuly:

```bash
git init --initial-branch=main
git add .
git commit -m "Initial DRON workspace import"
```

Aktualny workspace uz je po `git init`, takze prakticky dalsi krok je:

```bash
git add .
git commit -m "Initial DRON workspace import"
```

## Varianta A - GitHub CLI
FAKT Z WORKSPACE:
- `gh` v tomto prostredi nie je nainstalovane.

Ak ho neskor nainstalujes, postup je:

```bash
gh auth login
gh repo create drone-cleaning-business --private --source=. --remote=origin
git push -u origin main
```

Ak chces verejne repo, v druhom prikaze pouzi `--public` namiesto `--private`.

## Varianta B - GitHub web
Odporucany postup, kedze `gh` teraz chyba:

1. Prihlas sa do GitHubu.
2. Klikni `New repository`.
3. Nazov repa nastav na `drone-cleaning-business`.
4. Nezaskrtavaj `Add a README`, `Add .gitignore` ani `Choose a license`.
5. Vytvor prazdne repo.
6. Potom v lokalnom workspaci spusti:

```bash
git add .
git commit -m "Initial DRON workspace import"
git remote add origin https://github.com/<tvoj-username>/drone-cleaning-business.git
git push -u origin main
```

Ak chces SSH variant:

```bash
git remote add origin git@github.com:<tvoj-username>/drone-cleaning-business.git
git push -u origin main
```

## Co bude commitovane vs ignorovane
Pri aktualnom stave budu do repa pripravene najma:
- root dokumenty
- `DRONE_CLEANING_BUSINESS/`
- `mapa/`
- root technicke subory a `test/`

Ignorovane budu:
- root `node_modules/`
- root `.wrangler/`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/node_modules/`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.wrangler/`
- `DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/.netlify/`
- env a local secret subory

## Prakticky zaver
- GitHub ma byt source of truth pre cely root `DRON`.
- Nerieh dve repa. Riesenie je jedno repo pre cely workspace a deploy target iba cez subdirectory v Netlify.
