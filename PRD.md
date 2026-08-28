# PRD - Personal Portfolio Website

## Product Overview

Personal Portfolio Website merupakan website profesional yang digunakan kandidat untuk menampilkan profil, pengalaman, proyek, pencapaian, dan informasi kontak kepada HRD atau Talent Acquisition saat proses rekrutmen.

Seluruh konten website dapat dikelola melalui Dashboard Admin tanpa perlu melakukan perubahan kode.

---

## Target Users

### Primary User
- HRD
- Talent Acquisition
- Recruiter

### Secondary User
- Pemilik portfolio (candidate)

---

## Goals

### Business Goals
1. Meningkatkan personal branding kandidat.
2. Menyediakan media profesional yang dapat dilampirkan pada CV dan lamaran kerja.
3. Mempermudah HRD dalam memahami profil kandidat.
4. Menampilkan pengalaman, proyek, dan pencapaian kandidat secara terstruktur.
5. Memudahkan recruiter menghubungi kandidat.

### User Goals

#### Untuk HRD / Talent Acquisition
- Melihat ringkasan kandidat dengan cepat.
- Memahami pengalaman kerja kandidat.
- Melihat proyek yang pernah dikerjakan.
- Melihat achievement kandidat.
- Mengunduh CV kandidat.
- Menghubungi kandidat dengan mudah.

#### Untuk Pemilik Portfolio
- Mengelola seluruh konten portfolio secara mandiri.
- Memperbarui data tanpa bantuan developer.
- Menampilkan profil profesional yang selalu up-to-date.

---

# Functional Requirements

## Public Website

### FR-001 Hero Section
Website harus menampilkan:
- Foto profil
- Nama lengkap
- Professional title/job title
- Tagline singkat
- Tombol Download CV
- Tombol Contact Me

### FR-002 About Me
Website harus menampilkan:
- Ringkasan profil kandidat
- Informasi tentang latar belakang dan keahlian
- Konten yang dapat diperbarui melalui admin dashboard

### FR-003 Experience
Website harus menampilkan daftar pengalaman kerja:
- Nama perusahaan
- Posisi
- Periode kerja
- Deskripsi pekerjaan
- Technology stack (opsional)

### FR-004 Projects
Website harus menampilkan daftar proyek:
- Nama proyek
- Deskripsi proyek
- Technology stack
- Peran kandidat
- Screenshot proyek
- Link demo (opsional)
- Link repository (opsional)

### FR-005 Achievements
Website harus menampilkan daftar pencapaian:
- Judul achievement
- Tanggal
- Deskripsi
- Sertifikat atau bukti pendukung (opsional)

### FR-006 Contact Information
Website harus menampilkan:
- Email
- Nomor telepon
- LinkedIn
- GitHub
- Website lainnya (opsional)

### FR-007 Download CV
Website harus menyediakan:
- Tombol Download CV
- File dalam format PDF
- Mengambil file CV terbaru yang diupload admin

### FR-008 Responsive Design
Website harus dapat diakses dengan baik melalui:
- Mobile
- Tablet
- Desktop

---

## Authentication

### FR-009 Admin Login
Admin dapat:
- Login menggunakan email dan password
- Logout
- Mengakses dashboard yang terproteksi

---

## Dashboard Admin

### FR-010 Manage Profile
Admin dapat:
- Create Profile
- Update Profile
- Mengubah foto profil
- Mengubah nama
- Mengubah title
- Mengubah tagline
- Mengubah About Me

### FR-011 Manage Experience
Admin dapat:
- Menambah experience
- Mengubah experience
- Menghapus experience
- Melihat daftar experience

Data:
- Company Name
- Position
- Start Date
- End Date
- Description

### FR-012 Manage Projects
Admin dapat:
- Menambah project
- Mengubah project
- Menghapus project
- Melihat daftar project

Data:
- Project Name
- Description
- Tech Stack
- Project Image
- Demo URL
- Repository URL

### FR-013 Manage Achievements
Admin dapat:
- Menambah achievement
- Mengubah achievement
- Menghapus achievement
- Melihat daftar achievement

Data:
- Title
- Date
- Description
- Certificate File

### FR-014 Manage Contacts
Admin dapat mengelola:
- Email
- Phone Number
- LinkedIn URL
- GitHub URL
- Personal Website URL

### FR-015 Manage CV
Admin dapat:
- Upload CV
- Replace CV lama
- Menghapus CV
- Download CV

### FR-016 Media Management
Admin dapat:
- Upload image
- Preview image
- Delete image

---

# Non Functional Requirements

## Performance
- Halaman utama dimuat maksimal 3 detik.
- Gambar menggunakan optimasi dan kompresi.
- Mendukung lazy loading pada gambar.

## Security
- Password disimpan menggunakan hashing.
- Dashboard menggunakan autentikasi.
- Seluruh koneksi menggunakan HTTPS.
- Validasi file upload dilakukan sebelum penyimpanan.

## Availability
- Uptime minimum 99%.

## Usability
- Tampilan profesional dan modern.
- Navigasi mudah digunakan.
- Informasi penting dapat ditemukan maksimal dalam 3 klik.

## Compatibility
Mendukung:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

## Accessibility
- Mendukung keyboard navigation.
- Memiliki alt text pada gambar.
- Mengikuti standar WCAG 2.1 dasar.

## SEO
- Meta Title
- Meta Description
- Open Graph
- Sitemap XML
- Robots.txt

## Scalability
Sistem memungkinkan penambahan fitur:
- Skills
- Certifications
- Testimonials
- Blog
- Case Studies

---

# Success Metrics

### Recruitment Metrics
- Recruiter dapat memahami profil kandidat dalam < 3 menit.
- CV download rate ≥ 20%.
- Session duration ≥ 2 menit.

### User Metrics
- Kandidat dapat memperbarui portfolio dalam < 5 menit.
- Seluruh konten dapat dikelola melalui dashboard tanpa bantuan developer.