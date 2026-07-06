# Implementation Plan — SOT-Drive Frontend

## 1. Implementation Policy

Tidak ada eksekusi kode sebelum user memberikan approval eksplisit.

Setiap fase implementasi memiliki status. Setelah user approve, status akan diperbarui menjadi **Approved**, lalu fase tersebut boleh dijalankan. Setelah dijalankan, status menjadi **In Progress**, lalu **Completed** setelah hasil diberikan.

## 2. Status Lifecycle

| Status | Arti |
|---|---|
| Not Started | Belum dimulai |
| Drafted | Sudah dirancang dalam dokumen |
| Waiting Approval | Menunggu persetujuan user |
| Approved | Disetujui untuk dijalankan |
| In Progress | Sedang dikerjakan |
| Completed | Selesai dikerjakan |
| Revision Required | Perlu revisi |
| Blocked | Tertahan karena butuh keputusan/data |

## 3. Initial Project Status

| Area | Status Saat Ini |
|---|---|
| PRD | Drafted + Framework Compliance Matrix Added |
| UI Guidelines | Drafted + Validation Rule Engine Added |
| Implementation Plan | Drafted + Readiness Index Added |
| Frontend code execution | Completed — frontend MVP pages delivered within approved scope |
| Landing page | Completed |
| Login/register page | Completed |
| Admin dashboard | Completed |
| Analysis input dashboard | Completed |
| Results dashboard | Completed |
| Framework capacity control | Added |
| Traceability system | Added |
| Approval gate logic | Strengthened |
| QSPM special rule | Strengthened |
| Strategy Map guardrail | Strengthened |

## 4. Frontend Implementation Phases

| Dev Phase | Nama Fase | Output | Status |
|---:|---|---|---|
| F0 | Documentation & Scope Approval | PRD, UI Guidelines, Implementation Plan | Completed |
| F1 | Frontend Information Architecture | Sitemap, page structure, component map | Completed |
| F2 | Design System Setup | Tailwind tokens, typography, reusable UI classes | Completed |
| F3 | Landing Page / Company Profile | Responsive landing page with CTA login/register | Completed |
| F4 | Auth Pages | Login and register pages | Completed |
| F5 | Admin Dashboard Shell | Sidebar, topbar, project overview, cards | Completed |
| F6 | Phase Tracker Module | 14-phase status tracker and approval UI | Completed |
| F7 | Analysis Input Pages | Forms and matrix layouts for all STRATEGOS phases | Completed |
| F8 | Results Dashboard | Score cards, strategy summaries, BSC, Strategy Map preview | Completed |
| F9 | Responsive QA & Polish | Mobile/tablet/desktop refinement | Completed |
| F10 | Final Review & Handoff | Clean file structure and usage notes | Completed |

## 5. Page Build Sequence

Recommended order:
1. Landing page
2. Login page
3. Register page
4. Dashboard layout shell
5. Project overview
6. Phase tracker
7. Input workspace
8. Matrix components
9. Results dashboard
10. Responsive polish

Reasoning:
Landing and auth pages establish the public experience first. Dashboard shell comes next so all analysis modules have a consistent layout. Matrix/input modules are built after the shell because they depend on the same card, table, form, badge, and validation components.

## 6. Component Build Plan

| Component | Used In | Status |
|---|---|---|
| Navbar | Landing, auth | Completed for landing page |
| Hero section | Landing | Completed |
| CTA button | All pages | Completed for landing page |
| Auth form | Login/register | Completed |
| Dashboard sidebar | Admin dashboard | Completed |
| Topbar | Admin dashboard | Completed |
| Metric card | Dashboard/results | Completed for dashboard shell |
| Phase card | Phase tracker | Completed |
| Status badge | Dashboard/input/results | Completed for phase tracker |
| Matrix table | EFE, IFE, CPM, QSPM | Completed for analysis workspace |
| Strategy card | TOWS, Intersection, Results | Completed for analysis workspace |
| BSC table | BSC phases | Completed for analysis workspace |
| Strategy map block | Phase 14 results | Completed for results dashboard |
| Empty state | Dashboard/forms | Completed for dashboard shell |
| Alert/validation state | Forms/matrix | Completed for phase tracker |
| Traceability badge | Results dashboard | Completed |
| Compliance checklist | Phase tracker/input workspace | Completed for phase tracker |

## 7. STRATEGOS-Specific Frontend Rules

1. User tidak boleh lanjut ke phase berikutnya sebelum phase saat ini berstatus Approved.
2. Faktor EFE/IFE dengan AQCD rendah ditampilkan sebagai warning dan tidak masuk Key Factors.
3. Total weight EFE, IFE, dan CPM harus ditampilkan sebagai progress indicator menuju 1.0.
4. IFE strength hanya menerima rating 3 atau 4.
5. IFE weakness hanya menerima rating 1 atau 2.
6. SPACE Matrix harus menampilkan koordinat X dan Y sebelum kuadran.
7. BCG Matrix harus menampilkan RMSP dan IGR sebelum kuadran.
8. IE Matrix harus mengambil score dari EFE dan IFE yang sudah approved.
9. Intersection Rule harus tampil sebelum Umbrella Strategy.
10. QSPM tidak boleh menampilkan 0 untuk AS yang tidak relevan; UI harus menggunakan blank state.
11. BSC harus menjaga keterhubungan objective dari Financial, Customer, Internal Process, sampai Learning & Growth.
12. Strategy Map harus menampilkan hubungan cause-and-effect bottom-up.
13. Executive Summary tidak boleh menambahkan rekomendasi baru tanpa dasar dari phase sebelumnya.
14. Semua output penting harus memiliki traceability badge.

## 8. System Framework Readiness Index

Untuk memastikan kapasitas sistem sesuai Knowledge Base STRATEGOS, setiap fase development akan dinilai menggunakan **System Framework Readiness Index**.

Formula:

**Framework Readiness Index = Total Compliance Score / Maximum Compliance Score × 100%**

## 9. Readiness Categories

| Skor | Status | Interpretasi |
|---:|---|---|
| 90–100% | STRATEGOS Ready | Sistem sangat sesuai framework |
| 75–89% | Mostly Ready | Sistem cukup sesuai, ada gap minor |
| 50–74% | Partially Ready | Sistem butuh penguatan logic dan validasi |
| <50% | Not Ready | Sistem belum layak disebut STRATEGOS-ready |

## 10. Readiness Assessment Components

| Komponen | Bobot | Target |
|---|---:|---:|
| Coverage 14 phase | 25% | Semua phase tersedia |
| Framework validation rules | 25% | AQCD, weight, rating, AS, traceability berjalan |
| Matrix completeness | 20% | EFE, IFE, CPM, SPACE, BCG, IE, QSPM tersedia |
| Traceability antar phase | 15% | Output bisa dilacak ke input sebelumnya |
| Dashboard hasil | 10% | Skor, strategi, BSC, Strategy Map tampil |
| Approval workflow | 5% | Phase-gated approval tersedia |

## 11. Development Phase Readiness Gate

| Dev Phase | Readiness Gate | Status Awal |
|---|---|---|
| F0 Documentation & Scope Approval | PRD, UI Guidelines, Implementation Plan memuat compliance system | Completed |
| F1 Information Architecture | Sitemap mencakup landing, auth, dashboard, 14 phase, result dashboard | Completed |
| F2 Design System Setup | Token warna, card, table, badge, form, validation state tersedia | Completed |
| F3 Landing Page | Menjelaskan framework dan value proposition STRATEGOS | Completed |
| F4 Auth Pages | Login/register siap sebagai entry point user | Completed |
| F5 Dashboard Shell | Sidebar, topbar, project cards, phase overview tersedia | Completed |
| F6 Phase Tracker | 14 phase dengan status dan approval gate tersedia | Completed |
| F7 Analysis Input Pages | Semua matrix dan input phase tersedia | Completed |
| F8 Results Dashboard | Output EFE–Strategy Map tersedia | Completed |
| F9 Responsive QA | Semua halaman usable di mobile, tablet, desktop | Completed |
| F10 Final Review | Readiness Index dihitung dan gap dicatat | Completed |

## 12. Mandatory Pre-Code Checklist

Sebelum coding dimulai, item berikut harus approved:

| Checklist | Required |
|---|---|
| PRD final approved | Yes |
| UI Guidelines final approved | Yes |
| Implementation Plan final approved | Yes |
| Framework Compliance Matrix approved | Yes |
| Validation Rule Engine approved | Yes |
| Readiness Index approved | Yes |
| HTML + Tailwind Play CDN approach approved | Yes |
| Landing → Auth → Dashboard → Input → Results build order approved | Yes |

## 13. Approval Gate

Sebelum eksekusi kode F1, user perlu approve:
- PRD
- UI Guidelines
- Implementation Plan
- Scope teknologi: HTML responsive + Tailwind Play CDN native
- Warna branding navy-maroon
- Urutan build landing → auth → admin dashboard → input analysis → results dashboard
- Framework Compliance Matrix
- Validation Rule Engine
- System Framework Readiness Index

Approval command:

“Approved Phase F0. Lanjutkan ke F1 Information Architecture.”

Setelah command tersebut, status akan diperbarui menjadi:
- F0 Documentation & Scope Approval: Completed
- F1 Frontend Information Architecture: Approved / In Progress, lalu Completed setelah dokumen arsitektur selesai
- F2–F10: Not Started
- Code Execution: Allowed untuk dokumentasi F1 saja, belum untuk implementasi UI fase berikutnya tanpa approval baru

## 14. Risks & Mitigation

| Risk | Dampak | Mitigation |
|---|---|---|
| Scope terlalu luas untuk HTML statis | Implementasi berat | Buat MVP modular per halaman |
| Matrix terlalu kompleks di mobile | UX sulit | Gunakan horizontal scroll dan card view |
| Validasi strategi butuh data backend | Frontend terbatas | Gunakan dummy state dan placeholder |
| User belum punya data perusahaan | Analisis tidak bisa realistis | Sediakan template dan sample data |
| Export belum tersedia | Hasil belum bisa diunduh | Placeholder export untuk fase berikutnya |
| Framework compliance tidak konsisten | Sistem tidak sesuai Knowledge Base | Gunakan readiness index dan validation checklist |
| Rekomendasi tidak traceable | Output strategi tidak kredibel | Terapkan traceability badge di setiap output penting |

## 15. Definition of Done MVP

MVP frontend selesai bila:
1. Semua halaman utama tersedia.
2. Layout responsive bekerja di mobile, tablet, desktop.
3. Brand navy-maroon konsisten.
4. Phase tracker 14 phase tersedia.
5. Admin dashboard dapat menampilkan struktur input analisis.
6. Results dashboard dapat menampilkan simulasi hasil analisis.
7. Tidak ada framework/logic STRATEGOS utama yang hilang.
8. Framework Compliance Matrix tercermin dalam UI.
9. Validation Rule Engine divisualisasikan.
10. Traceability antar phase tersedia.
11. QSPM special rule diterapkan.
12. Strategy Map guardrail tersedia.
13. File HTML/Tailwind siap direview dan dikembangkan ke backend di fase berikutnya.
