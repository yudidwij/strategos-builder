# F1 Frontend Information Architecture — SOT-Drive

## Status

- Phase reference: F1 Frontend Information Architecture
- Phase status: Completed
- Execution status: Documentation only
- Code status: Locked until later approved build phases

## Purpose

Dokumen ini menjadi output F1 tanpa memulai implementasi frontend. Cakupan hanya arsitektur informasi, struktur halaman, peta komponen, dan usulan struktur file agar tetap sesuai phase gate STRATEGOS.

## Sitemap

```text
SOT-Drive
├── Public
│   ├── Landing / Company Profile
│   ├── Login
│   └── Register
├── Authenticated Workspace
│   ├── Admin Dashboard
│   │   ├── Project Overview
│   │   ├── 14-Phase Tracker
│   │   ├── Analysis Input Workspace
│   │   │   ├── Phase 0 Intake & Diagnosis
│   │   │   ├── Phase 1 EFE Matrix
│   │   │   ├── Phase 2 IFE Matrix
│   │   │   ├── Phase 3 CPM Matrix
│   │   │   ├── Phase 4 SWOT & TOWS
│   │   │   ├── Phase 5 SPACE Matrix
│   │   │   ├── Phase 6 BCG Matrix
│   │   │   ├── Phase 7 IE Matrix
│   │   │   ├── Phase 8 Intersection Rule
│   │   │   ├── Phase 9 QSPM Matrix
│   │   │   ├── Phase 10 BSC Financial
│   │   │   ├── Phase 11 BSC Customer
│   │   │   ├── Phase 12 BSC Internal Process
│   │   │   ├── Phase 13 BSC Learning & Growth
│   │   │   └── Phase 14 Strategy Map & Executive Summary
│   │   └── Results Dashboard
│   │       ├── Executive Summary Preview
│   │       ├── Strategy Map Preview
│   │       ├── Score & Matrix Summary
│   │       ├── Strategic Themes
│   │       └── Traceability View
│   └── Utility States
│       ├── Empty / No Project
│       ├── Locked Phase
│       ├── Validation Warning
│       └── Approval / Revision State
```

## Route And Page Inventory

| Route / File Target | Page / Module | Purpose | Phase Gate |
|---|---|---|---|
| `/index.html` | Landing / Company Profile | Public positioning, framework overview, CTA | Public |
| `/login.html` | Login | User sign-in entry | Public |
| `/register.html` | Register | User registration entry | Public |
| `/dashboard.html` | Admin Dashboard Shell | Workspace container, project overview, tracker access | Requires auth UI state |
| `/analysis.html` | Analysis Workspace | Main input workspace for phases 0-14 | Locked by phase approval |
| `/results.html` | Results Dashboard | Summary, traceability, BSC, strategy map preview | Requires approved outputs |

## Page Structure

### 1. Landing / Company Profile

- Hero with STRATEGOS value proposition
- Problem statement
- Framework overview
- 14-phase workflow explainer
- Feature highlights
- Dashboard preview panel
- CTA login and register
- Footer

### 2. Login

- Brand intro panel
- Login form
- Validation states
- Forgot password placeholder
- Link to register

### 3. Register

- Brand intro panel
- Registration form
- Role and company fields
- Validation states
- Agreement checkbox
- Link to login

### 4. Admin Dashboard Shell

- Sidebar navigation
- Topbar with project context
- Project overview cards
- Strategic readiness placeholder
- Phase tracker summary
- Recent notes / assumptions
- Export placeholder

### 5. Analysis Workspace

- Header with active project and phase status
- Phase tracker rail
- Compliance checklist panel
- Validation summary panel
- Phase-specific form or matrix canvas
- Review / approve / revise action area
- Traceability/source reference panel

### 6. Results Dashboard

- Executive summary preview
- Score summary cards
- Matrix result sections
- Top 3 strategic themes
- BSC summary by perspective
- Strategy map preview
- Risk / assumption summary
- Traceability badges and source chains

## STRATEGOS Phase Map

| Phase | Name | Primary UI Module | Output Dependency |
|---:|---|---|---|
| 0 | Intake & Diagnosis | Company profile setup form | Project baseline |
| 1 | EFE Matrix | External factor matrix with separate Opportunity and Threat banks sourced from PESTEL and Porter Five Forces | Required for TOWS, IE, QSPM |
| 2 | IFE Matrix | Internal factor matrix | Required for TOWS, IE, QSPM |
| 3 | CPM Matrix | Competitor comparison matrix | Standalone + results summary |
| 4 | SWOT & TOWS Matrix | Strategy generator | Uses approved EFE + IFE |
| 5 | SPACE Matrix | Positioning calculator | Required for synthesis |
| 6 | BCG Matrix | Portfolio calculator | Required for synthesis |
| 7 | IE Matrix | Internal-external matrix | Uses approved EFE + IFE scores |
| 8 | Sintesis / Intersection Rule | Strategy synthesis table | Must precede umbrella strategies |
| 9 | QSPM Matrix | Prioritization matrix | Uses umbrella strategies and approved key factors |
| 10 | BSC Financial | BSC table | Uses top strategic themes |
| 11 | BSC Customer | BSC table | Uses top strategic themes |
| 12 | BSC Internal Process | BSC table | Uses top strategic themes |
| 13 | BSC Learning & Growth | BSC table | Uses top strategic themes |
| 14 | Strategy Map & Executive Summary | Cause-effect map + summary | Uses approved prior outputs only |

## Component Map

| Component | Used In | Notes |
|---|---|---|
| Navbar | Landing, auth | Public navigation and CTA |
| Hero Section | Landing | Explains phase-gated STRATEGOS workflow |
| CTA Button | Global | Primary maroon gradient action |
| Auth Form | Login, register | Shows required, error, loading, success states |
| Sidebar | Dashboard, analysis, results | Main workspace navigation |
| Topbar | Dashboard, analysis, results | Project selector and phase context |
| Project Card | Dashboard | Project overview and readiness placeholder |
| Phase Tracker | Dashboard, analysis | Represents all 15 listed phases including Phase 0 |
| Phase Card | Tracker | Status, checklist, gate action |
| Status Badge | Global | Draft, Need Review, Approved, Completed, Locked |
| Validation Summary | Analysis | Visible framework rule messaging |
| Compliance Checklist | Analysis | FCR display per phase |
| Matrix Table | EFE, IFE, CPM, QSPM | Scrollable on mobile |
| PESTEL / Porter Factor Input Bank | EFE | Separate Opportunity and Threat input banks, each with max 10 entries, sourced from PESTEL and Porter Five Forces |
| AQCD Quality Badge | EFE, IFE | High / Medium / Low quality marker |
| Weight Progress Indicator | EFE, IFE, CPM | Enforces total weight = 1.0 |
| Pairwise Weighting Note | EFE | Explains pairwise comparison method for more auditable weight assignment |
| Traceability Badge | Results, BSC, strategy map | Shows source lineage |
| Strategy Card | TOWS, Intersection, QSPM, results | Strategic output container |
| Score Card | Results | Weighted score and quadrant summary |
| BSC Table | Phases 10-13, results | Perspective-specific objectives |
| Strategy Map Block | Phase 14, results | Must show cause-effect chain |
| Approval Action Bar | Analysis | Review, approve, revise controls |
| Empty State | Dashboard, results | No project or no approved data |
| Locked State Panel | Analysis | Explains why next phase is inaccessible |

## Framework Compliance Coverage

| Rule / Need | IA Response |
|---|---|
| Phase-gated progression | Phase tracker, locked state panel, approval action bar |
| Low AQCD exclusion | AQCD badge plus rejected factor state in EFE/IFE views |
| Weight total = 1.0 | Weight progress indicator in EFE/IFE/CPM |
| EFE company-specific rating | Helper text and validation summary in EFE |
| Opportunity/Threat source capture | EFE includes separate Opportunity and Threat banks with up to 10 inputs each, sourced from PESTEL and Porter Five Forces |
| AQCD quality framework | EFE exposes Actionable, Quantitative, Comparative, and Divisional screening before factor acceptance |
| Pairwise comparison weighting | EFE includes method note and verification state for total weight = 1.0 |
| IFE strength 3-4 only | Rating control restriction in IFE |
| IFE weakness 1-2 only | Rating control restriction in IFE |
| TOWS from approved factors only | TOWS module depends on approved EFE/IFE inputs |
| SPACE coordinate before quadrant | Score card layout lists FP/CP/SP/IP, then X/Y, then quadrant |
| BCG RMSP and IGR before quadrant | BCG result card sequence enforced |
| IE from approved EFE/IFE scores | IE view references approved score sources |
| Intersection before umbrella strategy | Phase 8 isolated before QSPM route flow |
| QSPM AS blank, never 0 | Dedicated AS selector pattern in QSPM |
| Top 3 Sum TAS become themes | Results and BSC depend on ranked QSPM outputs |
| BSC traceable to themes | BSC table includes traceability badge |
| Strategy Map cause-effect chain | Strategy map block uses bottom-up perspective flow |
| Executive Summary from approved outputs only | Summary preview limited to approved source cards |
| Important outputs need source badge | Traceability badge included in results architecture |

## Validation Rule Engine Representation

| Validation Area | Planned UI Representation |
|---|---|
| AQCD quality screening | Inline toggle cluster, quality badge, rejected-factor bucket |
| Weight validation | Running total indicator, pairwise note, disabled approval control |
| Rating validation | Restricted select inputs and helper copy |
| QSPM special rule | Blank/not relevant option, no zero state, conditional TAS |
| BSC traceability | Theme-linked source chip on each objective row |
| Strategy Map linkage | Connected node references to BSC objectives |
| Approval gating | Locked next phase until current phase approved |

## Framework Readiness Notes

- Coverage target for F1: all public pages, workspace pages, and all 15 listed phase steps represented in the architecture.
- Readiness emphasis in F1: coverage, approval workflow visibility, validation layer visibility, and traceability architecture.
- No readiness score is claimed yet because F1 hanya menyelesaikan dokumentasi arsitektur dan belum masuk implementasi UI.

## Proposed Files And Folders

```text
/
├── AGENTS.md
├── docs/
│   ├── PRD.md
│   ├── UI_GUIDELINES.md
│   ├── IMPLEMENTATION_PLAN.md
│   └── F1_INFORMATION_ARCHITECTURE.md
├── index.html                # locked until F3
├── login.html                # locked until F4
├── register.html             # locked until F4
├── dashboard.html            # locked until F5
├── analysis.html             # locked until F7
├── results.html              # locked until F8
└── assets/
    ├── js/
    │   └── app.js            # locked until coding phase requires interaction
    └── data/
        └── sample-data.js    # locked until coded workspace/results phase
```

## Current Lock Status

- Locked now: all HTML, JS, and UI implementation beyond F1 documentation
- Allowed now: review F1 output and approve next phase
- Next phase requiring explicit approval:
  `Approved Phase F2. Lanjutkan ke Design System Setup.`
