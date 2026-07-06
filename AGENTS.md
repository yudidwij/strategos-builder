# AGENTS.md — SOT-Drive Codex Instructions

## Project Identity

You are working on **SOT-Drive**, a responsive frontend web application for company strategy analysis based on the STRATEGOS framework.

SOT-Drive must behave as a **phase-gated strategic analysis workspace**, not a generic SaaS dashboard.

Primary objective:
- Build a modern frontend using **HTML native + Tailwind CSS Play CDN + native JavaScript if needed**.
- Do not introduce backend, database, authentication server, package manager, bundler, or frontend framework unless explicitly approved later.
- Focus on landing page/company profile, login/register pages, admin dashboard for analysis input, and results dashboard.

## Source of Truth Documents

Read and follow these files in this repository:

1. `PRD.md`
2. `UI_GUIDELINES.md`
3. `IMPLEMENTATION_PLAN.md`
4. `AGENTS.md`

When requirements conflict, use this priority order:

1. User's latest explicit instruction
2. `AGENTS.md`
3. `IMPLEMENTATION_PLAN.md`
4. `PRD.md`
5. `UI_GUIDELINES.md`

## Mandatory Technology Constraints

Use:
- HTML5
- Tailwind CSS Play CDN
- Native JavaScript only if required for UI interactions
- Responsive, mobile-first layout

Do not use unless explicitly approved:
- React
- Vue
- Angular
- Next.js
- Vite
- Node build step
- Backend service
- Database
- Auth provider
- External charting libraries
- Package installation

## Brand & UI Style

Use the following visual direction:

- Futuristic modern dashboard
- Millennial/Gen Z style
- Premium strategic intelligence look
- Navy blue + dark maroon branding
- Dark UI with glassmorphism and subtle glow
- Clean executive-grade tables and cards

Core colors:
- Navy Deep: `#071426`
- Navy Core: `#0B1F3A`
- Navy Surface: `#102B4E`
- Maroon Dark: `#5B1020`
- Maroon Glow: `#8A1F35`
- Soft White: `#F8FAFC`
- Cool Gray: `#94A3B8`
- Border Blue: `#1E3A5F`

## Framework Compliance Rules

The frontend must reflect the STRATEGOS framework.

Do not omit these rules:

1. User cannot continue to the next analysis phase before the current phase is approved.
2. EFE/IFE factors with low AQCD cannot become Key Factors.
3. EFE, IFE, and CPM total weight must equal 1.0.
4. EFE rating must be company-specific.
5. IFE Strengths can only use rating 3 or 4.
6. IFE Weaknesses can only use rating 1 or 2.
7. TOWS can only use approved EFE and IFE Key Factors.
8. SPACE must show FP, CP, SP, IP, X coordinate, Y coordinate, and quadrant.
9. BCG must show RMSP, IGR, and quadrant.
10. IE Matrix must use approved EFE and IFE scores.
11. Intersection Rule must appear before Umbrella Strategies.
12. QSPM AS must allow blank/not relevant and values 1–4 only.
13. QSPM must not use or display AS = 0.
14. Top 3 QSPM Sum TAS become Strategic Themes.
15. BSC objectives must be traceable to Strategic Themes.
16. Strategy Map must show the cause-effect chain:
    Learning & Growth → Internal Process → Customer → Financial.
17. Executive Summary must not add recommendations that cannot be traced to previous approved phases.
18. Every important output should show a traceability/source badge.

## Required Pages

Minimum frontend pages or sections:

1. Landing page/company profile
2. Login page
3. Register page
4. Admin dashboard
5. Project overview
6. 14-phase tracker
7. Analysis input workspace
8. Results dashboard
9. Executive summary/strategy map preview

## Required Analysis Phases

The UI must represent all phases:

0. Intake & Diagnosis
1. EFE Matrix
2. IFE Matrix
3. CPM Matrix
4. SWOT & TOWS Matrix
5. SPACE Matrix
6. BCG Matrix
7. IE Matrix
8. Sintesis — Intersection Rule
9. QSPM Matrix
10. BSC Financial Perspective
11. BSC Customer Perspective
12. BSC Internal Process Perspective
13. BSC Learning & Growth Perspective
14. Strategy Map & Ringkasan Eksekutif

## Implementation Workflow

Follow `IMPLEMENTATION_PLAN.md`.

Current default status:
- F0 Documentation & Scope Approval: Waiting Approval
- F1 Frontend Information Architecture: Not Started
- F2–F10: Not Started

Do not start coding unless the user explicitly approves a development phase.

Recommended approval phrase:
`Approved Phase F0. Lanjutkan ke F1 Information Architecture.`

When a phase is approved and implemented:
1. Update the status in `IMPLEMENTATION_PLAN.md`.
2. Work only on the approved phase scope.
3. Do not jump ahead to later phases.
4. At the end, summarize completed files, changed sections, and remaining next phase.

## If User Asks to Start Coding

If the user explicitly approves F1:
- Create information architecture first.
- Do not build full HTML pages yet unless F3/F4/F5 are approved.
- Produce sitemap, page inventory, component map, and recommended file structure.

If the user explicitly approves F2:
- Create design system tokens/classes and reusable component patterns.

If the user explicitly approves F3:
- Build the landing page only.

If the user explicitly approves F4:
- Build login and register pages only.

If the user explicitly approves F5:
- Build admin dashboard shell only.

If the user explicitly approves F6:
- Build phase tracker module only.

If the user explicitly approves F7:
- Build analysis input pages/modules only.

If the user explicitly approves F8:
- Build results dashboard only.

If the user explicitly approves F9:
- Polish responsiveness, accessibility, and QA.

If the user explicitly approves F10:
- Final review and handoff.

## Recommended File Structure When Coding Is Approved

Use this structure unless the user requests otherwise:

```text
/
├── AGENTS.md
├── PRD.md
├── UI_GUIDELINES.md
├── IMPLEMENTATION_PLAN.md
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── analysis.html
├── results.html
└── assets/
    ├── js/
    │   └── app.js
    └── data/
        └── sample-data.js
```

For the initial documentation ZIP, do not create these HTML files unless the user has approved coding.

## Accessibility Requirements

- Use semantic HTML.
- Maintain readable contrast on dark backgrounds.
- Buttons and inputs must have visible focus states.
- Do not use color alone to communicate status.
- Tables must have headers.
- Mobile tables must support horizontal scroll or card view.
- Keep text readable on mobile screens.

## Quality Checklist Before Any Handoff

Before reporting completion, verify:

- All pages/sections comply with PRD.
- Visual style follows UI Guidelines.
- Implementation phase status is updated.
- No unauthorized phase was implemented.
- No backend/framework was introduced.
- Framework Compliance Rules are represented in UI.
- QSPM AS = 0 is not used.
- Phase-gated workflow is visible.
- Traceability badges are used for strategic outputs.
- Mobile responsiveness is considered.
