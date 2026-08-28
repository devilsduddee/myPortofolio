# Tech Stack & Development Guidelines

## Project Overview

Personal Portfolio Website adalah website portfolio profesional yang digunakan sebagai media pendukung proses rekrutmen.

Target User:
- Primary: HRD, Recruiter, Talent Acquisition
- Secondary: Portfolio Owner

Seluruh konten website dikelola melalui Admin Dashboard.

---

# Technology Stack

## Frontend

### Framework
- Next.js 15 (App Router)

### Language
- TypeScript

### Styling
- Tailwind CSS

### UI Components
- shadcn/ui

### Icons
- Lucide React

### Form Validation
- Zod
- React Hook Form

---

## Backend

### Framework
- Next.js Server Actions
- Next.js Route Handlers

### Architecture
- Fullstack Next.js

Seluruh frontend dan backend berada dalam satu repository agar mudah dipelajari dan dideploy.

---

## Database

### Database Provider
- Supabase PostgreSQL

### ORM
- Prisma ORM

Alasan:
- Query lebih mudah dibaca.
- Relasi database lebih jelas.
- Cocok untuk pemula.
- Type-safe dengan TypeScript.

---

## Authentication

### Provider
- Supabase Auth

### Login Method
- Email & Password

Role:
- ADMIN

Karena hanya ada satu admin (pemilik portfolio), sistem role dibuat sederhana.

---

## File Storage

### Provider
- Supabase Storage

Digunakan untuk:
- Foto Profile
- Gambar Project
- Sertifikat Achievement
- CV PDF

---

## Deployment

### Hosting
- Vercel

### Database
- Supabase

### Domain
- Custom Domain (Opsional)

Alasan:
- Deploy sangat mudah.
- Mendukung CI/CD otomatis.
- Gratis untuk skala portfolio.
- Cocok untuk project personal.

---

# Folder Structure

Struktur folder harus sederhana dan mudah dipahami.

src/
│
├── app/
│ ├── (public)/
│ ├── admin/
│ └── api/
│
├── components/
│ ├── ui/
│ ├── sections/
│ └── shared/
│
├── features/
│ ├── profile/
│ ├── experience/
│ ├── project/
│ ├── achievement/
│ └── contact/
│
├── services/
│
├── repositories/
│
├── models/
│
├── lib/
│
├── types/
│
└── constants/

---

# OOP (Object Oriented Programming) Guidelines

Project harus mengikuti prinsip PBO agar mudah dipahami dan mudah dikembangkan.

---

## 1. Single Responsibility Principle

Satu class hanya memiliki satu tanggung jawab.

Contoh:

ProfileService

Bertanggung jawab:
- Create Profile
- Update Profile
- Get Profile

Tidak boleh:
- Mengelola Experience
- Mengelola Project

---

## 2. Separation of Layer

Pisahkan setiap layer.

### Model

Representasi data.

Contoh:

- Profile
- Experience
- Project
- Achievement
- Contact

---

### Repository

Berinteraksi dengan database.

Contoh:

ProfileRepository

Method:
- findProfile()
- updateProfile()

---

### Service

Berisi business logic.

Contoh:

ProfileService

Method:
- getProfile()
- updateProfile()

---

### Controller / Route

Menerima request.

Contoh:

- GET /api/profile
- PUT /api/profile

---

# Coding Style Guidelines

## Naming Convention

### Class

Gunakan PascalCase.

Contoh:

- ProfileService
- ProjectRepository
- AchievementModel

---

### Function

Gunakan camelCase.

Contoh:

- getProfile()
- createProject()
- updateExperience()

---

### Variable

Gunakan camelCase.

Contoh:

- profileData
- projectList
- experienceCount

---

### Constant

Gunakan UPPER_SNAKE_CASE.

Contoh:

- MAX_FILE_SIZE
- ALLOWED_FILE_TYPES

---

# Clean Code Rules

## Rule 1

Function maksimal 30-40 baris.

Jika lebih:
- Pecah menjadi function kecil.

---

## Rule 2

Satu function hanya mengerjakan satu pekerjaan.

Contoh:

Benar:

- uploadImage()
- validateImage()
- saveImage()

Salah:

- processEverything()

---

## Rule 3

Hindari nested if berlebihan.

Gunakan early return.

---

## Rule 4

Gunakan nama variable yang jelas.

Benar:

profileImage

Salah:

img

---

## Rule 5

Jangan hardcode.

Simpan dalam:

constants/

Contoh:

MAX_UPLOAD_SIZE

---

# Database Convention

## Table Name

Gunakan plural.

Contoh:

- profiles
- experiences
- projects
- achievements
- contacts

---

## Primary Key

Gunakan:

id

Format:

UUID

---

## Timestamp

Semua tabel wajib memiliki:

- created_at
- updated_at

---

# Error Handling

Semua service wajib menggunakan:

try-catch

Tujuan:
- Mudah debugging.
- Mudah maintenance.

---

# Logging

Gunakan:

console.error()

untuk development.

Jika project berkembang:

- Sentry

---

# Security Guidelines

## Authentication

Semua halaman admin wajib:
- Login terlebih dahulu.

---

## Authorization

User tanpa login:
- Tidak boleh mengakses dashboard.

---

## Upload Validation

Validasi:

- File type
- File size

---

## Environment Variables

Semua secret wajib disimpan di:

.env

Contoh:

SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

---

# Responsive Design Rules

Breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Mobile First Approach wajib digunakan.

---

# UI Design Principles

## Portfolio Website

Prioritas utama:

1. Cepat dipahami recruiter
2. Professional
3. Clean
4. Modern
5. Responsive

---

## Maksimal 3 Klik Rule

Recruiter harus dapat:

- Melihat profile
- Melihat experience
- Melihat project
- Download CV
- Menghubungi kandidat

dalam maksimal 3 klik.

---

# Future Scalability

Kode harus memungkinkan penambahan fitur baru:

- Skills
- Certifications
- Testimonials
- Blog
- Analytics Visitor
- Visitor Tracking
- Multi Language

Tanpa perlu refactor besar-besaran.

---

# Definition of Done

Sebuah fitur dianggap selesai jika:

✅ Responsive di Mobile, Tablet, Desktop

✅ TypeScript tidak memiliki error

✅ Lolos linting

✅ Terhubung ke database

✅ Memiliki validasi

✅ Menggunakan Service Layer

✅ Menggunakan Repository Layer

✅ Tidak ada hardcoded secret

✅ Menggunakan reusable component

✅ Mudah dipahami developer pemula