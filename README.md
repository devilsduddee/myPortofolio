# ⚡ Interactive Neo Brutalist Developer Portfolio & Admin CMS

Website portofolio pribadi yang interaktif, modern, dan dinamis berbasis gaya desain **Neo Brutalism**, dilengkapi dengan sistem **Admin CMS (Content Management System)** mandiri untuk pengelolaan konten secara *real-time*.

---

## 📌 Apa sih Web Ini? (About The Project)

Web ini adalah **Interactive Developer Portfolio & CMS** karya **Ahmad Ridho Syafaat** (Aspiring Data Analyst, Product Manager & Vibecoding Enthusiast). 

Website ini dirancang khusus dengan estetika **Neo Brutalism** yang mencolok — ditandai dengan garis tepi tebal (*border-4 border-black*), bayangan tegas (*hard offset shadows* `4px 4px`), kombinasi warna kontras (*Yellow, Pink, Blue, Green*), serta animasi interaktif bertenaga **GSAP (GreenSock Animation Platform)**.

---

## 🎯 Tujuan Pembuatan Website (Project Purpose)

1. **Showcase Professional Identity**: Menampilkan profil profesional, perjalanan karir (*Work Experience*), portofolio proyek (*Projects*), serta sertifikasi resmi & pencapaian (*Achievements*) secara interaktif & impresif.
2. **Self-Managed Content (Full CMS Dashboard)**: Menyediakan halaman panel admin internal (`/admin`) yang aman untuk menambah, mengedit, dan mengunggah dokumen CV, foto, sertifikat PDF, serta proyek baru secara mandiri tanpa perlu mengubah kode sumber (*zero hardcoded data*).
3. **High-Performance & Modern Motion Experience**: Menggabungkan kecepatan Next.js 16 App Router dengan animasi GSAP ScrollTrigger yang responsif di desktop maupun perangkat mobile.

---

## 🛠️ Tech Stack & Teknologi yang Digunakan

| Kategori | Teknologi | Deskripsi / Peran |
| :--- | :--- | :--- |
| **Core Framework** | **Next.js 16 (App Router)** | Framework React full-stack performa tinggi dengan Server & Client Components. |
| **Language** | **TypeScript 5** | Pengetikan kode yang aman (*Type-Safe*) dan minim bug runtime. |
| **Animation Engine** | **GSAP 3 + ScrollTrigger** | Animasi 3D Card Hover Tilt, Character Bounce Stagger, Ultra-wide Mouse Parallax, dan Re-trigger Scroll. |
| **UI Motion** | **Framer Motion** | Animasi transisi smooth pada Modal Popups & Mobile Navigation Drawer. |
| **Styling** | **Tailwind CSS 4** | Framework CSS utility-first yang disesuaikan dengan Design System Neo Brutalism. |
| **Database & ORM** | **PostgreSQL + Prisma 6** | Database relasional modern & Object-Relational Mapping untuk query data cepat. |
| **Backend & Auth** | **Supabase** | Layanan Authentication (Admin Login), Storage Bucket (CV & Sertifikat PDF), dan Database Engine. |
| **Icons & Typography** | **Lucide React + Space Grotesk** | Ikon vektor tebal & font kustom berkarakter brutalist. |
| **Deployment** | **Vercel** | Hosting cloud serverless dengan Vercel Analytics terintegrasi. |

---

## ✨ Fitur-Fitur Utama (Key Features)

### 🌐 Public Portfolio (Tampilan Pengunjung)
- **Hero Profile 3D Tilt Parallax**: Frame foto profil yang merespons pergerakan kursor mouse dengan efek rotasi 3D dan kedalaman aksen melayang (*scoped* di area Hero).
- **Interactive Tech Stack Marquee**: Running text teknologi yang bergerak dinamis.
- **GSAP Character Bounce Reveal**: Animasi kemunculan judul section huruf demi huruf yang kembali aktif (*re-triggerable*) saat pengguna melakukan scroll ulang.
- **Bento Project & Achievement Grid**: Kartu proyek & sertifikasi dengan efek 3D hover tilt.
- **Full Detail Modal Popups (`createPortal`)**: Modal pop-up rincian proyek dan sertifikat PDF yang lepas dari container (*unclipped*) dan nyaman dibaca.
- **Mobile & Tablet Optimized**: Pelacakan kursor otomatis dinonaktifkan di layar sentuh (*touch devices*) untuk memastikan *scrolling* di HP 100% mulus (60-120fps).

### 🔐 Admin CMS Dashboard (`/admin`)
- **Dashboard Overview**: Ringkasan statistik jumlah data aktif di portofolio.
- **Profile Manager**: Edit nama, role, bio, lokasi, dan link sosial media.
- **Experience Manager**: Tambah & kelola riwayat pekerjaan/pengalaman.
- **Projects Manager**: Kelola karya proyek, tech stack badges, link demo, dan repositori GitHub.
- **Achievements Manager**: Unggah sertifikat (Gambar / PDF) dan deskripsi pencapaian.
- **CV Manager**: Upload dan perbarui file dokumen CV PDF resmi.
- **Auto Session Security**: Sesi admin terlindungi dengan cookie ketat yang otomatis keluar (*logout*) saat browser ditutup.

---

## 🚀 Cara Menjalankan Project di Lokal (Local Setup)

### 1. Clone Repository
```bash
git clone https://github.com/devilsduddee/myPortofolio.git
cd myPortofolio
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables (`.env`)
Buat file `.env` di direktori root dan masukkan kredensial Supabase & Database Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
DATABASE_URL=postgresql://postgres:password@db.your-supabase.supabase.co:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:password@db.your-supabase.supabase.co:5432/postgres
```

### 4. Sinkronisasi Database (Prisma)
```bash
npx prisma generate
npx prisma db push
```

### 5. Jalankan Server Development
```bash
npm run dev
```
Buka `http://localhost:3000` di browser untuk melihat halaman publik portofolio, atau `http://localhost:3000/admin/login` untuk masuk ke halaman Admin CMS.

---

## 📄 Referensi Dokumentasi Tambahan

- [`DESIGN.md`]: Pedoman Utama *Single Source of Truth* untuk Sistem Desain & Warna Neo Brutalism.
- [`PRD.md`]: Dokumen Kebutuhan Produk (Product Requirements Document).
- [`techstack.md`]: Spesifikasi Teknis Arsitektur Aplikasi.

---

Crafted with ⚡ and Passion by **Ahmad Ridho Syafaat**.
