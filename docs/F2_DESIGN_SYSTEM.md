# F2 Design System Setup — SOT-Drive

## Status

- Phase reference: F2 Design System Setup
- Phase status: Completed
- Execution status: Documentation baseline completed and later aligned with implemented frontend
- Code status: Historical note only; subsequent approved UI phases have been implemented

## Purpose

Dokumen ini menetapkan sistem desain frontend SOT-Drive untuk fase implementasi berikutnya. Output difokuskan pada token visual, aturan tipografi, resep utilitas Tailwind Play CDN, dan pola komponen reusable yang tetap selaras dengan framework STRATEGOS.

Dokumen ini tetap menjadi baseline desain, namun isinya kini dibaca bersama implementasi aktual seperti dedicated phase workspaces, browser-native export actions, dan draft persistence state.

## Design Principles

- Futuristic executive dashboard, bukan SaaS generik
- Dark navy foundation dengan maroon accent sebagai action/highlight
- Glassmorphism ringan, bukan blur berlebihan
- Semua state penting harus terbaca tanpa mengandalkan warna saja
- Validasi framework STRATEGOS harus terlihat sebagai bagian dari UI
- Komponen harus aman untuk mobile, tablet, dan desktop

## Tailwind Play CDN Setup Direction

Fase implementasi berikutnya sebaiknya memakai:

- Tailwind CSS Play CDN
- `tailwind.config` inline untuk extend warna, bayangan, radius, dan font
- Native HTML dan JavaScript ringan bila interaksi diperlukan

Tidak ada:

- package install
- bundler
- React/Vue
- external UI library

## Design Tokens

### Color Tokens

| Token | Hex | Primary Usage |
|---|---:|---|
| `navy-deep` | `#071426` | App background, hero base |
| `navy-core` | `#0B1F3A` | Dashboard shell, major sections |
| `navy-surface` | `#102B4E` | Cards, panels, input surfaces |
| `navy-elevated` | `#16365F` | Hovered cards, sticky headers |
| `maroon-dark` | `#5B1020` | Accent fill, destructive emphasis |
| `maroon-glow` | `#8A1F35` | Primary CTA, active ring, key highlights |
| `soft-white` | `#F8FAFC` | Primary text |
| `cool-gray` | `#94A3B8` | Secondary text, helper copy |
| `border-blue` | `#1E3A5F` | Borders, dividers |
| `success` | `#22C55E` | Approved, completed |
| `warning` | `#F59E0B` | Need review, medium caution |
| `error` | `#EF4444` | Revision required, invalid state |
| `info` | `#38BDF8` | Tooltips, info chips |
| `locked` | `#475569` | Locked phases, disabled surfaces |

### Gradient Tokens

| Token | Tailwind Direction |
|---|---|
| `bg-hero-gradient` | `bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#220914]` |
| `bg-cta-gradient` | `bg-gradient-to-r from-[#8A1F35] to-[#5B1020]` |
| `bg-shell-glow` | `bg-[radial-gradient(circle_at_top,_rgba(138,31,53,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.10),_transparent_30%)]` |
| `bg-surface-glass` | `bg-white/5 backdrop-blur-xl` |

### Typography Tokens

| Token | Value | Usage |
|---|---|---|
| `font-primary` | `Inter, ui-sans-serif, system-ui, sans-serif` | All body and headings |
| `font-mono` | `ui-monospace, SFMono-Regular, Menlo, monospace` | Scores, numeric tables |
| `tracking-display` | `-0.03em` | H1/H2 headings |
| `leading-relaxed-ui` | `1.65` | Body copy and form help text |

### Spacing And Radius Tokens

| Token | Suggested Utility |
|---|---|
| `space-section` | `py-16 md:py-24` |
| `space-card` | `p-5 md:p-6` |
| `space-panel` | `p-4 md:p-5` |
| `radius-card` | `rounded-3xl` |
| `radius-control` | `rounded-2xl` |
| `radius-badge` | `rounded-full` |

### Shadow And Glow Tokens

| Token | Intended Effect |
|---|---|
| `shadow-panel` | Soft navy depth for cards |
| `shadow-cta` | Maroon glow for primary CTA |
| `ring-approved` | Soft green ring |
| `ring-revision` | Soft red ring |
| `ring-focus-info` | Cyan focus ring |
| `ring-focus-accent` | Maroon focus ring |

## Tailwind Extend Map

Untuk implementasi nanti, `tailwind.config` inline sebaiknya menambahkan:

- custom colors untuk semua token brand
- custom box shadows untuk panel glow dan CTA glow
- font family `sans` dan `mono`
- background image presets untuk hero dan shell glow

## Typography Scale

| Style | Mobile | Desktop | Notes |
|---|---:|---:|---|
| Display / H1 | `text-4xl` | `text-6xl` | Tight tracking, strong contrast |
| H2 | `text-3xl` | `text-4xl` | Section titles |
| H3 | `text-xl` | `text-2xl` | Cards and module headers |
| Body Large | `text-base` | `text-lg` | Landing copy |
| Body | `text-sm` | `text-base` | Dashboard and forms |
| Table | `text-xs` | `text-sm` | Dense matrices |
| Microcopy | `text-[11px]` | `text-xs` | Helper text and evidence labels |

## Layout Recipes

### Public Layout

- Full width sections with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Hero split layout on desktop
- Alternating section surfaces between `navy-core` and glass panels

### Dashboard Layout

- App shell with dark base and shell glow
- Desktop sidebar width around `w-72`
- Main canvas with `overflow-x-hidden`
- Module stacks spaced with `gap-6`

### Mobile Rules

- Tables must sit inside horizontal scroll wrappers
- Phase tracker stacks vertically
- Action buttons switch to full-width or wrapped layout
- Dense status metadata becomes chips, not inline paragraphs

## Reusable Utility Recipes

Contoh naming ini untuk dokumentasi pola. Implementasi nanti bisa memakai `@apply`-less utility composition langsung di HTML.

### Surface Recipes

| Recipe | Utility Direction |
|---|---|
| `surface-app` | `min-h-screen bg-[#071426] text-[#F8FAFC]` |
| `surface-shell` | `bg-[#0B1F3A]` |
| `surface-card` | `rounded-3xl border border-[#1E3A5F] bg-[#102B4E]/80 shadow-2xl shadow-black/20 backdrop-blur-xl` |
| `surface-card-elevated` | `rounded-3xl border border-sky-400/20 bg-[#16365F]/80 shadow-2xl shadow-black/30` |
| `surface-muted` | `rounded-2xl border border-[#1E3A5F] bg-slate-900/30` |

### Text Recipes

| Recipe | Utility Direction |
|---|---|
| `text-heading` | `font-semibold tracking-[-0.03em] text-[#F8FAFC]` |
| `text-body` | `text-sm md:text-base text-slate-200` |
| `text-muted` | `text-sm text-[#94A3B8]` |
| `text-metric` | `font-mono text-sm md:text-base text-[#F8FAFC]` |
| `text-label` | `text-[11px] font-medium uppercase tracking-[0.2em] text-[#94A3B8]` |

### Button Recipes

| Recipe | Utility Direction |
|---|---|
| `btn-primary` | `inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#8A1F35] to-[#5B1020] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8A1F35]/30 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071426]` |
| `btn-secondary` | `inline-flex items-center justify-center rounded-2xl border border-[#1E3A5F] bg-[#102B4E] px-5 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:border-sky-400/40 hover:bg-[#16365F]` |
| `btn-ghost` | `inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm text-[#94A3B8] transition hover:bg-white/5 hover:text-white` |
| `btn-danger` | `inline-flex items-center justify-center rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200` |
| `btn-disabled` | `inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/70 px-5 py-3 text-sm font-semibold text-slate-500` |

### Form Recipes

| Recipe | Utility Direction |
|---|---|
| `field-input` | `w-full rounded-2xl border border-[#1E3A5F] bg-[#0B1F3A] px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-slate-500 focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30` |
| `field-select` | `w-full rounded-2xl border border-[#1E3A5F] bg-[#0B1F3A] px-4 py-3 text-sm text-[#F8FAFC] focus:border-[#8A1F35] focus:outline-none focus:ring-2 focus:ring-[#8A1F35]/30` |
| `field-label` | `text-sm font-medium text-slate-100` |
| `field-help` | `text-xs text-[#94A3B8]` |
| `field-error` | `text-xs font-medium text-red-300` |

### Badge Recipes

| Recipe | Utility Direction |
|---|---|
| `badge-base` | `inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase` |
| `badge-approved` | `border-emerald-400/30 bg-emerald-400/10 text-emerald-200` |
| `badge-review` | `border-amber-400/30 bg-amber-400/10 text-amber-200` |
| `badge-revision` | `border-red-400/30 bg-red-400/10 text-red-200` |
| `badge-locked` | `border-slate-600 bg-slate-700/30 text-slate-300` |
| `badge-info` | `border-sky-400/30 bg-sky-400/10 text-sky-200` |
| `badge-trace` | `border-[#8A1F35]/40 bg-[#8A1F35]/10 text-rose-200` |

## Component Patterns

### Synthesis Workspace Pattern

Phase 8 Intersection Rule memerlukan pola visual yang berbeda dari matriks standar: tabel sintesis yang padat, chip status untuk tool support, panel gate untuk strategi integration, dan kartu umbrella strategy yang ringkas untuk transisi ke QSPM.

### 1. Navbar

- Transparent over hero, solid surface on scroll for later implementation
- Brand at left, CTA links at right
- Mobile collapses to drawer trigger

### 2. Hero Section

- Left column: headline, supporting copy, CTA pair
- Right column: dashboard preview card stack
- Background uses `bg-hero-gradient`

### 3. Dashboard Card

- Uses `surface-card`
- Header row with title, badge, and action slot
- Body supports metrics, descriptions, or matrices

### 4. Auth Form Card

- Narrow centered card
- Brand caption above form title
- Inline error/help rows
- Primary CTA plus secondary route link

### 5. Sidebar

- Sticky desktop navigation
- Contains project name, workspace nav, approval summary, and quick phase jump links
- Mobile equivalent should become drawer or bottom nav later

### 6. Phase Tracker Card

- Phase number chip
- Phase title
- Completion meter
- Status badge
- Checklist count
- Open/Review/Approve/Revise action row

### 7. Matrix Table

- Dark sticky header
- Numeric cells use mono font and right alignment
- Invalid row receives warning badge and tinted border
- On mobile wrapped in horizontal scroll panel

### 8. Validation Summary Panel

- Shows rule title, current status, and corrective hint
- Uses icon slot later, but no icon library dependency assumed
- Must separate informational hints from blocking errors

### 9. Traceability Badge

- Compact source chip attached to strategic outputs
- Pattern: `Source: QSPM P9`, `Source: EFE P1 + IFE P2`
- Click/expand behavior can be deferred; visual presence is mandatory

### 10. Strategy Map Block

- Vertical causal flow from Learning & Growth to Financial
- Each node must include objective title and source chip
- Connection lines should remain visually clear on dark background

## STRATEGOS-Specific State Patterns

### Approval States

| State | Visual Treatment | Accessibility Note |
|---|---|---|
| Draft | muted border, gray badge | Include text label, not color only |
| Need Review | amber badge, subtle glow | Add helper line describing pending check |
| Approved | green badge, success ring | Include explicit “Approved” text |
| In Progress | maroon badge, active border | Keep action affordance visible |
| Completed | green solid badge | Include timestamp slot |
| Revision Required | red badge, stronger border | Must include correction note area |
| Locked | slate badge, dimmed actions | Explain dependency in text |

### Validation Severity

| Severity | Visual Treatment | Example |
|---|---|---|
| Informational | info badge, muted panel | EFE rating should be company-specific |
| Warning | amber badge, tinted row | AQCD medium quality |
| Blocking | red badge, disabled approve CTA | Weight total not equal to 1.0 |

## Validation Rule Component Mapping

| Rule Need | Component Pattern |
|---|---|
| AQCD visibility | AQCD quality badge + validation summary + rejected factor row |
| Weight = 1.0 | Weight progress indicator + blocking approval state |
| IFE rating constraints | Restricted select pattern + helper copy |
| QSPM no zero | Select menu with blank, 1, 2, 3, 4 only |
| TOWS approved input only | Locked source badge on unapproved factors |
| BSC traceability | Objective row with theme source chip |
| Executive summary guardrail | Source badge group under each recommendation card |

## Table And Data Display Rules

- All major tables require visible headers
- Numeric values align right
- Weighted score and TAS columns use mono font
- Mobile behavior uses horizontal scrolling first, card conversion second
- Blank QSPM AS must display dash or `Not Relevant`, never `0`
- Locked/derived values should look read-only, not editable

## Accessibility Rules

- Minimum visible focus state on buttons, links, inputs, selects
- Do not rely on maroon vs green alone; include explicit labels/icons/text
- Use readable contrast on navy surfaces
- Preserve heading hierarchy
- Keep helper and evidence copy readable at mobile sizes
- Tables must remain navigable in narrow widths

## Recommended File Placement For Later Phases

Ketika F3 atau fase coding berikutnya dimulai, sistem desain ini akan menjadi acuan untuk:

- `index.html`
- `login.html`
- `register.html`
- `dashboard.html`
- `analysis.html`
- `results.html`
- `assets/js/app.js` jika butuh interaction helper ringan

Belum ada file produksi yang dibuat pada F2 ini.

## F2 Completion Notes

- Color, typography, spacing, and surface tokens sudah didefinisikan
- Reusable utility recipes untuk Tailwind Play CDN sudah dipetakan
- Komponen inti dashboard, form, matrix, tracker, dan traceability sudah didefinisikan
- Validation Rule Engine sudah dipetakan ke pola UI
- QSPM blank-AS rule sudah ditetapkan secara eksplisit
- Phase-gated workflow tetap dijaga tanpa mulai implementasi halaman

## Next Approval Gate

Fase berikutnya yang dapat dijalankan:

`Approved Phase F3. Lanjutkan ke Landing Page / Company Profile.`
