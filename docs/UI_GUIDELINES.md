# UI Guidelines — SOT-Drive

## 1. Design Direction

SOT-Drive menggunakan gaya visual **modern strategic intelligence dashboard**: futuristik, tegas, premium, dan cocok untuk konsultan strategi maupun manajemen perusahaan.

Visual harus menggabungkan:
- Corporate trust dari biru navy
- Strategic urgency dari merah maroon gelap
- Data intelligence dashboard
- Futuristic glassmorphism
- Clean executive interface

Keywords:
- Futuristic
- Strategic
- Premium
- Analytical
- Executive
- Millennial/Gen Z modern
- Clean dashboard
- Data-driven

## 2. Brand Personality

| Trait | Implementasi Visual |
|---|---|
| Strategic | Layout grid, matrix cards, numbered phase tracker |
| Trustworthy | Navy background, typography rapi, white space cukup |
| Bold | Maroon accent untuk CTA, alert, dan highlight |
| Futuristic | Gradient glow, glassmorphism, soft border, neon edge |
| Professional | Dashboard cards bersih, icon minimalis, table readable |
| Evidence-based | Traceability badge, source label, validation state |

## 3. Color Palette

### Primary Colors

| Token | Hex | Usage |
|---|---:|---|
| Navy Deep | #071426 | Background utama |
| Navy Core | #0B1F3A | Section background, dashboard shell |
| Navy Surface | #102B4E | Card background |
| Maroon Dark | #5B1020 | Primary accent |
| Maroon Glow | #8A1F35 | CTA, active state, highlight |

### Supporting Colors

| Token | Hex | Usage |
|---|---:|---|
| Soft White | #F8FAFC | Main text |
| Cool Gray | #94A3B8 | Secondary text |
| Border Blue | #1E3A5F | Card border |
| Success | #22C55E | Approved/Completed |
| Warning | #F59E0B | Need Review |
| Error | #EF4444 | Revision/Error |
| Info | #38BDF8 | Insight/tooltip |
| Locked | #475569 | Locked state |

## 4. Gradient System

Recommended gradients:
- Hero background: `from-[#071426] via-[#0B1F3A] to-[#220914]`
- CTA button: `from-[#8A1F35] to-[#5B1020]`
- Dashboard glow: navy blur with subtle maroon accent
- Matrix highlight: transparent navy card with maroon top border
- Approved glow: subtle green ring
- Revision glow: subtle red ring

## 5. Typography

Recommended CDN-safe font stack:
- Primary: Inter, ui-sans-serif, system-ui, sans-serif
- Numeric/table: mono stack for scores
- Heading style: bold, tight tracking, high contrast

Hierarchy:
- H1: 48–64px desktop, 36–42px mobile
- H2: 32–40px desktop, 28–32px mobile
- H3: 22–28px
- Body: 16–18px
- Table: 13–15px
- Microcopy: 12–13px

## 6. Layout Principles

Landing page:
- Fullscreen hero
- 12-column desktop grid
- Section spacing generous
- Alternating dark surface sections
- Floating dashboard preview
- CTA login/register jelas

Dashboard:
- Sidebar fixed on desktop
- Topbar with project selector
- Main canvas scrollable
- Cards use consistent padding
- Matrix/table area support horizontal scroll on mobile
- Phase status selalu terlihat

Mobile:
- Sidebar becomes bottom nav or hamburger drawer
- Tables become scrollable cards
- Phase tracker becomes vertical timeline
- CTA remains visible near top and bottom

## 7. Component Guidelines

### 7.1 Button

Variants:
- Primary: maroon gradient, white text
- Secondary: navy surface, border blue
- Ghost: transparent, gray text
- Danger: red outline
- Success: green soft background
- Disabled: muted navy-gray

States:
- Default
- Hover glow
- Active pressed
- Disabled
- Loading
- Approved
- Revision required

### 7.2 Card

Card style:
- Dark navy surface
- 1px border blue
- Rounded 2xl
- Subtle shadow
- Optional maroon top accent for important insight

Card types:
- Metric card
- Matrix card
- Phase status card
- Insight card
- Executive summary card
- Compliance card
- Traceability card

### 7.3 Form

Input style:
- Dark surface
- Light border
- Rounded xl
- Placeholder gray
- Focus ring maroon or info blue
- Error text red
- Helper text gray

Required input groups:
- Company profile fields
- Matrix rows
- Rating fields
- Weight fields
- Assumption notes
- Approval comments
- Source/evidence notes

### 7.4 Table / Matrix

Table requirements:
- Sticky header on large data
- Alternating row surface
- Numeric values right-aligned
- Score columns visually highlighted
- Invalid rows flagged with warning badge
- Mobile horizontal scroll

Matrix-specific UI:
- EFE/IFE: factor, AQCD, weight, rating, weighted score
- CPM: CSF, company, competitor ratings
- QSPM: AS/TAS grouped under umbrella strategies
- BSC: perspective, objective, KPI, target, initiative

### 7.5 Phase Tracker

Each phase card has:
- Phase number
- Phase name
- Completion percent
- Status badge
- Last updated
- Validation checklist
- CTA: Open / Review / Approve / Revise

Status colors:
- Draft: gray
- In Review: blue
- Approved: green
- In Progress: maroon
- Completed: green solid
- Revision Required: red
- Locked: muted navy-gray

## 8. Framework Validation UI

Frontend SOT-Drive harus memiliki validation layer yang terlihat oleh user. Validasi tidak boleh hanya berada di backend masa depan, karena MVP frontend harus sudah mengomunikasikan aturan framework sejak awal.

## 9. AQCD Validation Pattern

Setiap faktor EFE dan IFE harus memiliki indikator AQCD:

| Kriteria | UI Control |
|---|---|
| Actionable | Toggle Yes/No |
| Quantitative | Toggle Yes/No + field angka/sumber data |
| Comparative | Toggle Yes/No + field pembanding/periode |
| Divisional | Toggle Yes/No + field produk/wilayah/segmen |

Status visual:
- AQCD 4/4: High Quality
- AQCD 2–3/4: Medium Quality
- AQCD 0–1/4: Low Quality / Needs Revision

Faktor dengan AQCD rendah ditampilkan dalam tabel terpisah dan tidak boleh masuk Key Factors.

## 10. Matrix Validation UI

| Matrix | Required Validation |
|---|---|
| EFE | Total weight = 1.0, rating 1–4, opportunities/threats dipisah |
| IFE | Total weight = 1.0, strength rating 3–4, weakness rating 1–2 |
| CPM | CSF spesifik industri, total weight = 1.0, rating relatif antar perusahaan |
| SPACE | FP/IP skala 1–7, CP/SP skala -7 sampai -1 |
| BCG | RMSP dan IGR wajib ditampilkan sebelum kuadran |
| IE | EFE dan IFE score harus berasal dari approved phase |
| QSPM | AS hanya 1–4 atau blank, tidak boleh 0 |
| BSC | Objective harus traceable ke Strategic Themes |
| Strategy Map | Node harus terhubung antar-perspektif |

## 11. Phase Gate UI

Setiap phase card harus memiliki:
- Status badge
- Completion indicator
- Validation checklist
- Assumption note
- Review comment
- Approve button
- Revision button
- Lock state untuk phase berikutnya

Status badge:
- Draft
- Need Review
- Revision Required
- Approved
- In Progress
- Completed
- Locked

## 12. QSPM Special UI Rule

QSPM membutuhkan perlakuan khusus karena aturan AS sangat kritis. Sistem harus menyediakan pilihan:
- Blank / Not Relevant
- 1 — Tidak menarik
- 2 — Agak menarik
- 3 — Cukup menarik
- 4 — Sangat menarik

Tidak boleh ada opsi 0.

UI behavior:
- Blank tampil sebagai empty dash atau “Not Relevant”
- TAS hanya dihitung bila AS terisi 1–4
- Sum TAS tidak boleh menghitung blank sebagai 0 secara visual
- Tooltip menjelaskan bahwa blank berarti faktor tidak mempengaruhi pilihan strategi

## 13. Traceability Badge

Setiap strategi, objective, atau insight di dashboard hasil harus punya badge sumber.

Contoh:
- Source: EFE-O3
- Source: IFE-S2
- Source: TOWS-SO1
- Source: SPACE-Aggressive
- Source: BCG-Star
- Source: IE-Cell-II
- Source: QSPM-Rank-1
- Source: BSC-F1
- Source: StrategyMap-L1-P1-C1-F1

Tujuannya agar user bisa melihat asal-usul rekomendasi dengan cepat.

## 14. Executive Summary Guardrail

Halaman Executive Summary harus menampilkan warning bila ada rekomendasi yang tidak punya sumber phase approved.

Contoh warning:
“Rekomendasi ini belum memiliki traceability ke phase sebelumnya. Silakan revisi atau hubungkan ke hasil analisis yang valid.”

## 15. Iconography

Icon style:
- Outline icons
- Rounded strokes
- Minimal futuristic
- Consistent size 20–24px

Suggested icon categories:
- Matrix
- Strategy
- Dashboard
- User
- Lock
- Approval
- Chart
- Roadmap
- Risk
- Export
- Traceability
- Validation

## 16. Visual Motifs

Use subtle motifs:
- Grid lines
- Radial glow
- Data nodes
- Strategy map connectors
- Futuristic panels
- Thin borders
- Matrix-inspired backgrounds

Avoid:
- Too many bright colors
- Cartoon icons
- Overcrowded tables
- Excessive animation
- Generic SaaS pastel look

## 17. Dashboard Visual Hierarchy

Priority order:
1. Current project status
2. Phase completion
3. Validation warning
4. Key scores
5. Recommended strategic themes
6. Detailed matrix output
7. Supporting assumptions and notes
8. Traceability detail

## 18. Responsive Breakpoints

Tailwind default:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Design expectation:
- Mobile-first layout
- Desktop-enhanced dashboard
- No layout broken below 375px width
- Tables must support horizontal scroll
- Phase tracker must convert to vertical timeline on mobile

## 19. Accessibility Guidelines

- Minimum contrast ratio should be readable on dark background.
- Buttons must have visible focus states.
- Form error states must use icon/text, not color only.
- Tables need clear headers.
- Status badges should include text labels.
- Avoid tiny text below 12px.
- CTA labels must be action-oriented.
- Locked/disabled states must still be readable.

## 20. Copywriting Tone

Tone:
- Strategic
- Confident
- Clear
- Modern
- Executive-friendly
- Evidence-based

Example CTA:
- “Mulai Analisis Strategi”
- “Buat Project Baru”
- “Review Phase”
- “Approve & Continue”
- “Lihat Dashboard Hasil”
- “Bangun Strategy Map”

Example microcopy:
- “Pastikan total weight = 1.0 sebelum submit.”
- “Faktor AQCD rendah tidak dapat masuk Key Factors.”
- “AS kosongkan jika faktor tidak relevan, jangan isi 0.”
- “Strategi ini belum memiliki traceability ke phase sebelumnya.”
- “Phase berikutnya terkunci sampai phase ini approved.”
