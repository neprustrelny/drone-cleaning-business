# REPORT

## Tooling/DNS Issue Summary (EAI_AGAIN)
- Observed failure: `npx wrangler -v` intermittently failed with `EAI_AGAIN registry.npmjs.org` and npm log write warnings.
- Host-level diagnostics proved DNS/network is healthy (registry resolves, ping works, curl to npm registry returns HTTP 200).
- Proven workaround: run Wrangler commands outside restricted sandbox context; npm user config hardened with local cache/log settings in `~/.npmrc`.
- Safe npm config applied: `cache=/home/neprustrelny/.npm/_cacache`, `logs-max=10`.

### Validate Locally (exact commands)
```bash
cd "/home/neprustrelny/Desktop/codex workspace/DRON/DRONE_CLEANING_BUSINESS/stranka umyvanie strechy"
npm run dev
curl -i -X POST "http://localhost:8788/api/order" \
  -H "Content-Type: application/json" \
  -d '{
    "meno":"Jan Novak",
    "adresa":"Hlavna 12, Skalica",
    "email":"jan@example.com",
    "telefon":"+421910123456",
    "poznamka":"local test",
    "website":""
  }'
```

## Repo Audit Notes
- Repo root contains: `DRONE_CLEANING_BUSINESS/`, `00_RUNBOOK_CODEX.md`, and control files `STATUS.md`/`QUEUE.md`/`CHANGELOG.md`.
- Plan folders `00_MASTER_STRATEGY` through `10_EXPANSION_PLAN` exist and are structurally complete.
- No deletions or source/UI modifications were performed.
- Duplicate handover/overview docs exist in website delivery area (root + `_delivery` copies).
- Queue sanity: every queued path exists.
- Status sanity: every target plan doc appears in `STATUS.md`.
- Queue order sanity: folder order strictly `00..10` and within folders checklist-first then alphabetical.
- Website files (including `index.html`) remained untouched.

## Placeholder Count
- Total plan docs (txt/md in 00..10): 60
- Empty placeholder docs: 55

## Next 10 Tasks from QUEUE.md
- [ ] 00_MASTER_STRATEGY/CASHFLOW_MODEL.txt — DoD: financial model includes assumptions, formulas, and scenario sensitivity ranges. Depends: none
- [ ] 00_MASTER_STRATEGY/RISK_MATRIX.txt — DoD: document has actionable structure, owners, and review-ready decisions. Depends: none
- [ ] 00_MASTER_STRATEGY/ROADMAP_LEVELS.txt — DoD: document has actionable structure, owners, and review-ready decisions. Depends: none
- [ ] 00_MASTER_STRATEGY/SERVICE_MISSION_DESCRIPTION.txt — DoD: document has actionable structure, owners, and review-ready decisions. Depends: none
- [ ] 00_MASTER_STRATEGY/VISION.txt — DoD: document has actionable structure, owners, and review-ready decisions. Depends: none
- [ ] 01_LEVEL_1_BASIC/CHECKLIST_LEVEL_1.txt — DoD: operational checklist is complete with owner, frequency, and pass/fail criteria. Depends: none
- [ ] 01_LEVEL_1_BASIC/01_LEGAL_REQUIREMENTS_SK.txt — DoD: legal/compliance requirements are listed with authority, action, and due date. Depends: [[DOPLNIT: aktualne pravne zdroje SR + DU SR odkazy]]
- [ ] 01_LEVEL_1_BASIC/02_LEGAL_REQUIREMENTS_DE.txt — DoD: legal/compliance requirements are listed with authority, action, and due date. Depends: [[DOPLNIT: aktualne LBA pravidla + krajinske specifika v DE]]
- [ ] 01_LEVEL_1_BASIC/03_INSURANCE.txt — DoD: insurance scope, limits, exclusions, and renewal workflow are documented. Depends: none
- [ ] 01_LEVEL_1_BASIC/04_TECH_SETUP.txt — DoD: document has actionable structure, owners, and review-ready decisions. Depends: none

## BLOCKED Items and Missing Inputs
- 01_LEVEL_1_BASIC/01_LEGAL_REQUIREMENTS_SK.txt — Missing input: Need current official SR legal references and citation review.
- 01_LEVEL_1_BASIC/02_LEGAL_REQUIREMENTS_DE.txt — Missing input: Need current DE legal matrix (LBA + federal-state specifics).
- 08_REGULATORY_DATABASE/AIRSPACE_LIMITATIONS.txt — Missing input: Needs live airspace data source and operating-area constraints.
- 08_REGULATORY_DATABASE/EASA_RULES_SUMMARY.txt — Missing input: Needs verified extraction from latest EASA primary sources.
- 08_REGULATORY_DATABASE/GERMANY_LBA_NOTES.txt — Missing input: Needs current LBA guidance and local authority notes.
- 08_REGULATORY_DATABASE/SLOVAKIA_CAA_NOTES.txt — Missing input: Needs current Slovak CAA guidance and bulletin confirmation.
