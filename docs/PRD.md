# PRD — SOT-Drive Frontend Website

## 1. Product Overview

**Nama produk:** SOT-Drive  
**Tipe produk:** Responsive frontend web application  
**Fokus MVP:** Landing page/company profile, login/register UI, admin dashboard input analisis, dan dashboard hasil analisis.  
**Teknologi frontend:** HTML native, Tailwind CSS Play CDN, dan JavaScript native bila diperlukan.  
**Status:** Living product document — diselaraskan dengan frontend MVP yang sudah diimplementasikan.

SOT-Drive adalah platform frontend untuk membantu perusahaan menjalankan analisis dan formulasi strategi secara bertahap menggunakan framework STRATEGOS. Produk ini dirancang sebagai **phase-gated strategic analysis workspace**, bukan sekadar form input biasa.

Produk mengikuti alur utama:

**Input Stage → Matching Stage → Decision Stage → Execution Stage**

Framework utama yang harus didukung meliputi EFE, IFE, CPM, SWOT/TOWS, SPACE, BCG, IE, QSPM, Balanced Scorecard, dan Strategy Map.

## 2. Problem Statement

Banyak perusahaan menyusun strategi menggunakan dokumen manual, spreadsheet terpisah, dan presentasi yang sulit dilacak. Akibatnya, faktor eksternal/internal tidak selalu tervalidasi, bobot matrix bisa tidak konsisten, rekomendasi strategi sering muncul tanpa dasar analisis sebelumnya, dan hasil eksekusi tidak selalu terhubung ke Balanced Scorecard.

SOT-Drive bertujuan mengubah proses tersebut menjadi pengalaman digital yang lebih terstruktur, modern, phase-gated, dan mudah dipresentasikan.

## 3. Product Goals

1. Menyediakan landing page/company profile yang menjelaskan value proposition SOT-Drive.
2. Menyediakan halaman login dan daftar user dari landing page.
3. Menyediakan admin dashboard untuk input data analisis strategi per phase.
4. Menyediakan dashboard hasil analisis yang menampilkan matrix, skor, status phase, rekomendasi strategi, BSC, dan Strategy Map.
5. Menjaga proses analisis tetap phase-gated agar output setiap phase bisa direview dan diapprove sebelum lanjut.
6. Memastikan sistem memiliki kapasitas penuh terhadap Knowledge Base STRATEGOS.
7. Menggunakan style visual futuristik modern dengan branding warna biru navy dan merah maroon gelap.

## 4. Target Users

| User | Kebutuhan Utama |
|---|---|
| Konsultan strategi | Membuat analisis strategi terstruktur untuk klien |
| Business owner | Memahami posisi bisnis dan strategi prioritas |
| Corporate strategy team | Mengelola analisis internal perusahaan |
| Executive/management | Melihat hasil strategi dalam bentuk dashboard |
| Dosen/mahasiswa | Mempelajari dan mempraktikkan framework strategic management |
| Business analyst | Menyiapkan data dan matrix analisis |

## 5. User Roles

| Role | Hak Akses |
|---|---|
| Guest | Melihat landing page, company profile, CTA login/register |
| Registered User | Mengakses dashboard project miliknya |
| Admin/Consultant | Membuat project, input data matrix, review phase, approve/revise phase |
| Viewer/Executive | Melihat dashboard hasil, executive summary, dan strategy map |

## 6. Main User Flow

1. User membuka landing page.
2. User membaca value proposition, framework, fitur, dan CTA.
3. User memilih login atau daftar.
4. Setelah login, user masuk ke admin dashboard.
5. Admin membuat project analisis perusahaan.
6. Admin mengisi data phase demi phase.
7. Sistem menampilkan status phase: Draft, Need Review, Approved, In Progress, Completed, Revision Required, atau Locked.
8. Untuk phase matrix yang kompleks, user masuk melalui analysis hub lalu membuka dedicated workspace per phase.
9. Setelah phase valid dan approved, user dapat lanjut ke phase berikutnya.
10. Dashboard hasil menampilkan output matrix, skor, ranking strategi, BSC, dan Strategy Map.
11. Executive summary hanya mengambil kesimpulan dari phase yang sudah approved.

## 7. Page Requirements

### 7.1 Landing Page / Company Profile

Sections:
- Hero section dengan headline futuristik
- Problem statement
- Framework overview
- Feature highlights
- Visual preview dashboard
- How it works: 14-phase strategic workflow
- Benefits for consultants and companies
- CTA login dan daftar
- Footer

Core message:

“SOT-Drive membantu perusahaan mengubah data bisnis menjadi strategi terukur melalui workflow STRATEGOS yang phase-gated, evidence-based, dan siap dieksekusi.”

### 7.2 Login Page

Fields:
- Email
- Password
- Remember me
- Forgot password link
- CTA login
- Link daftar akun

Validation UI:
- Empty state
- Error state
- Loading state
- Success redirect state

### 7.3 Register Page

Fields:
- Nama lengkap
- Email
- Nama perusahaan
- Role
- Password
- Confirm password
- Agreement checkbox

Validation UI:
- Password mismatch
- Invalid email
- Required field
- Success registration

### 7.4 Admin Dashboard

Main modules:
- Project overview
- Company profile setup
- Phase progress tracker
- Input data analysis
- Matrix builder
- Approval status
- Notes and assumptions
- Export action

Dashboard cards:
- Total projects
- Active analysis
- Completed phase
- Pending approval
- Strategic readiness score placeholder

### 7.5 Analysis Input Workspace

Input workspace mengikuti 14 phase:

| Phase | Nama | Frontend Input Utama |
|---:|---|---|
| 0 | Intake & Diagnosis | Nama perusahaan, industri, produk, skala, tujuan, kompetitor, data tersedia |
| 1 | EFE Matrix | Dedicated page dengan brainstorming Opportunity/Threat hingga 20 per sisi, klasifikasi PESTEL/Porter, AQCD, save-all, top 10 key external factors, weight, rating, weighted score |
| 2 | IFE Matrix | Dedicated page dengan brainstorming Strength/Weakness hingga 20 per sisi, klasifikasi 7S, AQCD, top 10 key internal factors, weight, rating, weighted score |
| 3 | CPM Matrix | Dedicated page dengan benchmark setup, CSF builder kategori unik, weight manual/auto pairwise, rating perusahaan dan kompetitor, nilai, komentar penilaian |
| 4 | SWOT & TOWS | Strategi SO, WO, ST, WT |
| 5 | SPACE Matrix | FP, CP, SP, IP, koordinat, kuadran |
| 6 | BCG Matrix | RMSP, IGR, kuadran |
| 7 | IE Matrix | IFE score, EFE score, posisi sel |
| 8 | Intersection Rule | Tabel strategi lintas tools, frekuensi, umbrella strategy |
| 9 | QSPM Matrix | Key factors, AS, TAS, Sum TAS, ranking |
| 10 | BSC Financial | Objective, KPI, target, initiative |
| 11 | BSC Customer | Segment, value proposition, objective, KPI |
| 12 | BSC Internal Process | Process cluster, KPI, initiative |
| 13 | BSC Learning & Growth | Human, organization, information capital readiness |
| 14 | Strategy Map & Executive Summary | Cause-effect map, roadmap, risk, rekomendasi |

### 7.6 Results Dashboard

Komponen utama:
- Executive summary card
- Phase completion timeline
- EFE total weighted score
- IFE total weighted score
- CPM comparison table
- SPACE coordinate card
- BCG quadrant card
- IE matrix cell result
- QSPM ranking
- Top 3 Strategic Themes
- BSC summary
- Strategy Map overview
- Risk and assumption summary

## 8. Framework Compliance Matrix

| Framework Area | Modul Sistem | Kapasitas Minimum |
|---|---|---|
| Intake & Diagnosis | Company setup form | Menyimpan profil perusahaan, industri, produk, skala, tujuan, kompetitor, dan data tersedia |
| EFE Matrix | External factor builder | Input opportunities dan threats berbasis PESTEL/Porter, AQCD, top 10 key factors, weight, rating, weighted score |
| IFE Matrix | Internal factor builder | Input strengths dan weaknesses berbasis 7S, AQCD, top 10 key factors, weight, rating, weighted score |
| CPM Matrix | Competitor comparison | Input CSF kategori unik, benchmark setup, weight, rating perusahaan, rating kompetitor, weighted score, komentar per rating |
| SWOT/TOWS | Strategy generator | Membuat strategi SO, WO, ST, WT hanya dari EFE dan IFE approved |
| SPACE Matrix | Positioning calculator | Input FP, CP, SP, IP, hitung X/Y, tampilkan kuadran |
| BCG Matrix | Portfolio calculator | Input RMSP, IGR, tampilkan kuadran |
| IE Matrix | Internal-external positioning | Mengambil skor IFE dan EFE dari phase approved |
| Intersection Rule | Strategy synthesis | Menandai strategi yang muncul di TOWS, SPACE, BCG, IE |
| QSPM | Strategy prioritization | Input AS/TAS, Sum TAS, ranking, Top 3 Strategic Themes |
| BSC Financial | Financial execution | Objective, KPI, target, initiative dari Strategic Themes |
| BSC Customer | Customer execution | Segment, value proposition, objective, KPI, target, initiative |
| BSC Internal Process | Process execution | Process objectives, KPI, initiative, execution wave |
| BSC Learning & Growth | Capability execution | Human, organization, dan information capital readiness |
| Strategy Map | Executive strategy map | Menampilkan cause-effect Learning & Growth → Internal Process → Customer → Financial |
| Executive Summary | Final strategic output | Ringkasan berbasis seluruh hasil phase sebelumnya |

## 9. Framework Compliance Rules

| Rule ID | Rule | Impact pada Sistem |
|---|---|---|
| FCR-01 | Semua phase harus memiliki status approval | User tidak bisa lanjut tanpa approval |
| FCR-02 | Faktor AQCD rendah tidak boleh masuk Key Factors | Sistem menampilkan rejected/warning state |
| FCR-03 | Total weight EFE/IFE/CPM harus 1.0 | Approval button disabled bila belum valid |
| FCR-04 | Rating EFE harus company-specific | UI wajib menampilkan helper text dan tooltip |
| FCR-05 | Strength IFE hanya rating 3–4 | Dropdown dibatasi |
| FCR-06 | Weakness IFE hanya rating 1–2 | Dropdown dibatasi |
| FCR-07 | TOWS hanya boleh mengambil faktor dari EFE/IFE approved | Tidak ada manual factor injection |
| FCR-08 | Intersection Rule wajib sebelum Umbrella Strategy | Umbrella Strategy locked sebelum Phase 8 valid |
| FCR-09 | QSPM harus memakai bobot EFE/IFE yang sama | Field weight di QSPM read-only |
| FCR-10 | AS tidak relevan harus blank, bukan 0 | Input AS menyediakan blank state |
| FCR-11 | Top 3 Sum TAS menjadi Strategic Themes | BSC mengambil tema dari QSPM |
| FCR-12 | Strategy Map harus traceable ke BSC | Semua node wajib punya source objective |
| FCR-13 | Executive Summary tidak boleh berisi rekomendasi baru tanpa dasar phase sebelumnya | Summary hanya menarik data dari approved phase |

## 10. Traceability Requirement

Setiap output strategis harus memiliki jejak asal data.

| Output | Source yang Harus Bisa Dilacak |
|---|---|
| Strategic Theme | QSPM ranking |
| QSPM ranking | Umbrella Strategy Phase 8 |
| Umbrella Strategy | Intersection Rule |
| Intersection Rule | TOWS, SPACE, BCG, IE |
| TOWS Strategy | EFE + IFE approved factors |
| IE Result | EFE Score + IFE Score |
| BSC Objective | Top 3 Strategic Themes |
| Strategy Map Node | BSC objective |
| Executive Summary | Approved analysis result dari Phase 1–14 |

## 11. Frontend Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Landing page responsive | Must Have |
| FR-02 | Login page UI | Must Have |
| FR-03 | Register page UI | Must Have |
| FR-04 | Admin dashboard shell | Must Have |
| FR-05 | Phase progress tracker | Must Have |
| FR-06 | Input form per phase | Must Have |
| FR-07 | Matrix table layout | Must Have |
| FR-08 | Dashboard hasil analisis | Must Have |
| FR-09 | Status approval per phase | Must Have |
| FR-10 | Mobile responsive layout | Must Have |
| FR-11 | Dark futuristic visual system | Must Have |
| FR-12 | Framework compliance matrix | Must Have |
| FR-13 | Traceability badge | Must Have |
| FR-14 | Browser-native export PDF dan Excel-compatible | Should Have |
| FR-15 | User role simulation | Nice to Have |
| FR-16 | Local dummy data preview | Nice to Have |
| FR-17 | Browser-side draft persistence via localStorage | Should Have |
| FR-18 | Dedicated phase page routing for matrix-heavy phases | Should Have |

## 12. Validation Logic for UI

| Area | Validation UI |
|---|---|
| EFE/IFE weight | Total weight harus 1.0 |
| EFE rating | 1–4, company-specific |
| IFE strength rating | Hanya 3 atau 4 |
| IFE weakness rating | Hanya 1 atau 2 |
| AQCD | Faktor rendah ditandai dan tidak masuk key factor |
| CPM | Minimal 2 kompetitor bila tersedia, kategori CSF tidak boleh duplikat, nama perusahaan user mengikuti Phase 0 |
| SPACE | FP/IP skala 1–7, CP/SP skala -7 sampai -1 |
| BCG | RMSP maksimal 1.0 kecuali market leader |
| QSPM | AS blank bila tidak relevan, tidak boleh 0 |
| BSC | Objective harus traceable ke Strategic Themes |
| Strategy Map | Node harus terhubung ke BSC objective |

## 13. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Responsiveness | Mobile, tablet, desktop |
| Style | Modern, futuristic, professional, Gen Z/millennial |
| Accessibility | Contrast cukup, readable typography, focus state |
| Maintainability | Komponen HTML/Tailwind modular |
| Performance | Ringan, CDN-based, tanpa dependency berat |
| Browser | Chrome, Edge, Safari, Firefox modern |
| Security UI | Password field masked, auth state placeholder |
| Scalability | Struktur halaman siap migrasi ke framework frontend di masa depan |

## 14. MVP Scope

Included:
- Landing page
- Login page
- Register page
- Admin dashboard
- Project/phase tracker
- Input UI untuk semua phase
- Results dashboard
- Dummy data structure
- Responsive Tailwind layout
- Framework compliance layer
- Traceability indicator
- Phase approval status

Excluded dari MVP frontend awal:
- Backend authentication
- Database
- API integration
- Server-side export PDF/XLSX yang lebih presisi
- Multi-tenant production auth
- Payment system
- Advanced chart library
- AI generation engine

## 15. Framework Readiness Definition

SOT-Drive dianggap STRATEGOS-ready bila:
1. Semua 14 phase tersedia dalam UI.
2. Semua matrix utama memiliki input, validasi, dan output.
3. Semua output strategis bisa dilacak ke phase sebelumnya.
4. Tidak ada rekomendasi strategi yang muncul tanpa dasar analisis.
5. QSPM mengikuti aturan AS blank, bukan 0.
6. Strategy Map menampilkan hubungan Learning & Growth → Internal Process → Customer → Financial.
7. Executive Summary hanya mengambil kesimpulan dari phase yang sudah approved.

## 16. Success Criteria

MVP dianggap berhasil bila:
1. User bisa memahami value proposition dari landing page.
2. User bisa melihat alur login dan daftar.
3. Admin dashboard mampu menampilkan struktur project dan phase.
4. Input workspace mencerminkan semua phase STRATEGOS.
5. Dashboard hasil dapat memvisualisasikan output strategi secara jelas.
6. Desain konsisten dengan branding navy-maroon futuristik.
7. Framework compliance layer tersedia.
8. Traceability antar phase terlihat.
9. Belum ada kode dieksekusi sebelum approval.
