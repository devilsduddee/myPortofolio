# 🚀 Ahmad Ridho Syafaat - Interactive Developer Portfolio

Selamat datang di repositori kode sumber untuk portofolio pribadi saya! Proyek ini bukan sekadar *landing page* statis biasa, melainkan sebuah **Web Aplikasi Portofolio Dinamis** yang dibangun dengan performa tinggi dan desain antarmuka (*UI/UX*) kelas premium.

Tujuan utama dari web ini adalah untuk menampilkan perjalanan karier, proyek unggulan, serta penghargaan yang saya raih, dibalut dengan estetika desain modern yang terinspirasi dari ekosistem Apple, Linear, dan Arc Browser.

---

## ✨ Apa Saja Fitur Unggulan Web Ini?

1. **Desain Premium & Glassmorphism**
   Antarmuka web dirancang dengan gaya *Glassmorphism* yang elegan—memanfaatkan efek kaca tembus pandang (*backdrop-blur*), pencahayaan ambien 4-titik yang halus, serta tata letak tipografi bernuansa editorial yang sangat rapi.
   
2. **Built-in Content Management System (CMS)**
   Tidak perlu menyentuh kode untuk mengubah konten! Web ini dilengkapi dengan **Admin Dashboard rahasia** (dilindungi autentikasi email & kata sandi) yang memungkinkan saya untuk menambah, mengedit, dan menghapus data pengalaman kerja, proyek, atau sertifikasi secara langsung dari *browser*.

3. **Performa Super Cepat & SEO Friendly**
   Dibangun di atas teknologi **Next.js 15 (App Router)**, web ini menggunakan konsep Server-Side Rendering (SSR) dan Static Site Generation (SSG) untuk memastikan waktu pemuatan halaman (*page load*) yang instan serta visibilitas maksimal di mesin pencari (SEO).

4. **Sistem Pengelolaan Dokumen Otomatis**
   Terintegrasi langsung dengan Supabase Storage untuk mengunggah dan menampilkan dokumen seperti *Curriculum Vitae* (CV) dalam format PDF, gambar profil, maupun tangkapan layar proyek tanpa perlu layanan pihak ketiga lainnya.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

Proyek ini dibangun menggunakan kumpulan teknologi modern pilihan (*Modern Web Stack*):

- **Core Framework:** Next.js 15, React 19, TypeScript
- **Styling:** Vanilla Tailwind CSS, Framer Motion (untuk animasi transisi yang *smooth*)
- **Database & ORM:** PostgreSQL, Prisma ORM
- **Backend Services:** Supabase (Autentikasi, Database Engine, & Object Storage)

---

## 💻 Cara Menjalankan Proyek Ini Secara Lokal

Jika Anda adalah seorang pengembang yang ingin melihat bagaimana kode ini bekerja, ikuti langkah-langkah berikut:

### 1. Kloning Repositori
```bash
git clone https://github.com/devilsduddee/myPortofolio.git
cd myPortofolio
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat sebuah file bernama `.env.local` di direktori utama (*root*) dan isi dengan kredensial Supabase Anda (Anda bisa melihat formatnya di `.env.example`):
```env
NEXT_PUBLIC_SUPABASE_URL=url-supabase-anda
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key-anda
SUPABASE_SERVICE_ROLE_KEY=service-role-key-anda
DATABASE_URL=url-transaksi-database-anda
DIRECT_URL=url-koneksi-langsung-database-anda
```

### 4. Sinkronisasi Database
Jalankan perintah ini untuk membangun Prisma Client dan menyinkronkan skema ke database PostgreSQL Anda:
```bash
npx prisma generate
npx prisma db push
```

### 5. Jalankan Development Server
```bash
npm run dev
```
Buka `http://localhost:3000` di *browser* Anda untuk melihat hasil *front-end* portofolio.
*(Untuk masuk ke mode Admin CMS, akses rute `/admin/login`)*.

---
*Dibuat dengan dedikasi pada detail, kualitas kode, dan eksekusi visual yang maksimal.*
