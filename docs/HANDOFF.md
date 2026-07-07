# SOT-Drive Frontend Handoff

## Status

- Project state: Frontend MVP handoff
- Delivery scope: F0 through F10 approved phases completed
- Stack used: HTML5, Tailwind CSS Play CDN, native browser behavior only
- Excluded by design: backend, database, auth provider, package manager, build step, framework runtime

## Delivered Files

- `index.html`
- `login.html`
- `register.html`
- `dashboard.html`
- `analysis.html`
- `phase-1-efe.html`
- `phase-2-ife.html`
- `phase-3-cpm.html`
- `results.html`
- `assets/js/app.js`
- `docs/PRD.md`
- `docs/UI_GUIDELINES.md`
- `docs/F1_INFORMATION_ARCHITECTURE.md`
- `docs/F2_DESIGN_SYSTEM.md`
- `docs/IMPLEMENTATION_PLAN.md`

## Delivered Scope

- Landing page / company profile
- Login page
- Register page
- Admin dashboard shell
- 14-phase tracker with Phase 0 intake shown as part of the full gated workflow
- Analysis input workspace for all STRATEGOS phases
- Analysis workspace now supports phase-focused `sub-page` style navigation using `analysis.html?phase=...` as the first step toward a more comprehensive per-phase flow
- `P1 EFE` now has a dedicated HTML workspace at `phase-1-efe.html`, while `analysis.html` acts as the hub for opening phase workspaces
- `P2 IFE` now has a dedicated HTML workspace at `phase-2-ife.html`, while `analysis.html` acts as the hub for opening phase workspaces
- `P3 CPM` now has a dedicated HTML workspace at `phase-3-cpm.html`, while `analysis.html` acts as the hub for opening phase workspaces
- EFE Matrix refined with separate `Opportunity` and `Threat` input banks, up to 10 entries per side, sourced from `PESTEL` and `Porter Five Forces`
- P1 EFE now uses table-based input rows with per-factor `AQCD` check columns, hover guidance, and registration into evaluation tables only after meeting the AQCD minimum
- P1 EFE brainstorming banks now support up to `20 Opportunity` and `20 Threat` rows, while the EFE evaluation tables keep only the top `10` AQCD-qualified rows per side
- P1 EFE evaluation now supports editable `weight`, `rating`, and live `weighted score`, with `manual` mode and `auto pairwise` mode for frontend-only weighting
- P1 EFE brainstorming banks now include `Save All Opportunity` and `Save All Threat` actions, and Part 2 presents a single `Tabel Key External Factor` stack with total weight, total weighted score, and interpretation text
- The P1 EFE tables now also show in-table subtotal rows for `Opportunity` and `Threat`, plus a `Grand Total Key External Factor` row at the bottom of the threat table
- P2 IFE follows the same dedicated-page pattern with `Strength` and `Weakness` brainstorming banks, `7S` classification, top-10 qualified key factors, and IFE-specific rating rules (`Strength` 3-4, `Weakness` 1-2)
- P3 CPM now supports up to `10` industry-specific `Critical Success Factor` rows, benchmark setup in the same builder card, manual or auto-pairwise weighting, comparative `1-4` ratings, auto-calculated values, and per-entity rating comments in one CPM matrix
- P3 CPM now uses a predefined CSF category dropdown (`Pemasaran`, `Ekspansi Jaringan`, `Kondisi Keuangan`, `Manajemen`, `Kualitas Produk`, `Loyalitas Pelanggan`, `Harga Bersaing`, `Pangsa Pasar`, `Unik Capabilities`) with duplicate-category prevention and inline visual hints per row
- P3 CPM company label now inherits the Phase 0 `Company name`, while competitor labels remain editable in `Benchmark Setup`
- P3 CPM analysis now produces a stronger narrative that explains total ranking, company position, score gaps, strongest CSF, and weakest CSF
- EFE guidance now reflects `AQCD` quality screening and `pairwise comparison` as the recommended weight-setting method
- EFE factors now support frontend `save`, `edit`, and `delete` behavior with live table refresh in the analysis workspace
- Legacy seeded EFE demo rows are automatically cleaned from browser storage so the workspace opens in a cleaner state
- Results dashboard with executive summary, score cards, strategic themes, BSC summary, strategy map preview, and traceability view
- Responsive and accessibility polish pass across the delivered pages
- Native browser-side draft persistence for analysis inputs via `localStorage`
- Native export actions for browser PDF workflow and Excel-compatible `.xls` download without external libraries

## Verification Summary

- Approved implementation phases in `docs/IMPLEMENTATION_PLAN.md` are marked completed through `F10`
- Required pages from `AGENTS.md` are represented
- STRATEGOS phases `0` through `14` are represented in tracker and workspace flows
- QSPM blank/not relevant behavior is represented and `AS = 0` is explicitly blocked in the UI
- Traceability badges are present in strategic outputs and result summaries
- Strategy map cause-effect order is shown as:
  Learning & Growth -> Internal Process -> Customer -> Financial
- Mobile table handling is implemented with horizontal scroll wrappers in matrix-heavy views
- Focus-visible states are present on primary actions and form controls

## Residual Risks

- No live browser QA was executed in this handoff, so final visual verification on mobile, tablet, and desktop is still recommended
- The project is frontend-only, so current auth, calculations, and approvals are present as UI states rather than connected logic
- PDF export uses the browser print flow (`Save as PDF`), and Excel export uses an Excel-compatible browser-generated `.xls` file
- Some narrative values in score cards and summaries are illustrative placeholders for the static MVP

## Suggested Next Step

- If the next step is still frontend-only, perform manual browser QA and content refinement
- If the next step includes real workflow behavior, the natural follow-up is backend/data integration planning against the current static structure
