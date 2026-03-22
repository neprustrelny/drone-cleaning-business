# CHANGELOG

- 2026-02-12 — Created STATUS.md with full plan-document coverage for folders 00..10 and initial state classification.
- 2026-02-12 — Created QUEUE.md with strict folder-priority ordering, per-item DoD, and dependency markers.
- 2026-02-12 — Repository audited (structure, duplicates, placeholders) and sanity checks prepared.
- 2026-02-12 — Re-validated queue workflow: confirmed queue file existence, STATUS coverage for all plan docs, and strict folder ordering; no website source files changed.
- 2026-02-12 — Consolidated diagnostics + repo audit into REPORT.md; verified STATUS states for non-empty docs; normalized QUEUE ordering (checklist-first, then alphabetical).
- 2026-03-20 — Workspace updated to new business parameters: 25k homes Kassel market, public packages 199/299/399 €, 50 € deposit-first funnel, SK-first go-to-market and new 2026 cashflow scenarios.
- 2026-03-20 — Added minimal `node:test` coverage for the funnel: extracted order form logic from `index.html`, implemented tested `/api/order` validation in `index.js`, and added frontend/backend tests for required fields, payload serialization and response codes.
- 2026-03-20 — Audited funnel tests against required scope, found no new missing scenarios beyond response-shape assertions, tightened backend test coverage, and re-ran npm test successfully.
- 2026-03-20 — Prepared repo for manual browser testing: added root `npm run dev`, aligned Pages `/api/order` validation with required `balik`, and updated the local run checklist for landing page + backend flow.
