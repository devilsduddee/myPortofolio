# 🚀 Interactive Neo Brutalist Developer Portfolio & Admin CMS

A high-performance, dynamic developer portfolio website and Content Management System (CMS) built with Next.js 16, TypeScript, Tailwind CSS, Prisma, and Supabase.

Designed with a bold **Neo Brutalism** design aesthetic (referencing [`DESIGN.md`](file:///d:/webPorto/DESIGN.md)), featuring thick 4px black borders, hard offset box shadows, vibrant color badges, and interactive popups.

---

## ✨ Features Overview

1. **Neo Brutalist UI/UX Aesthetics**
   - High-contrast visual design with custom typography (`Space Grotesk`), custom dot grid background, interactive detail popups, and smooth micro-animations.

2. **Full Dynamic CMS Admin Dashboard**
   - Manage all portfolio sections via a protected `/admin` portal backed by Supabase Auth and Prisma ORM:
     - **Profile & About Me**: Photo, titles, bio, and social handles.
     - **Experience**: Work history timeline with start/end node flags and company badges.
     - **Projects**: Showcase portfolio cards with tech stack badges, live demo links, repository links, and full detail popups.
     - **Achievements**: Certificates and awards with instant PDF / image view options and detail popups.
     - **Contact Information**: Primary email, phone number, and social profile links.
     - **CV Document Management**: Upload and manage active PDF resume documents.

3. **Auto Session Security**
   - Strict session cookies that clear upon browser close, instant logout redirect to `/admin/login`, and protected server-side route middleware.

4. **SEO & Performance Optimized**
   - Dynamic OpenGraph metadata, `sitemap.xml`, `robots.txt`, Vercel Analytics, and zero-bundle-bloat server components.

---

## 🛠️ Tech Stack

- **Core Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Vanilla Tailwind CSS, Framer Motion, Lucide Icons
- **Database & ORM**: PostgreSQL, Prisma ORM
- **Backend & Storage**: Supabase (Auth, Database Engine, Storage Bucket)
- **Deployment**: Vercel

---

## 💻 Local Development Setup

### 1. Clone & Install
```bash
git clone https://github.com/devilsduddee/myPortofolio.git
cd myPortofolio
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
DATABASE_URL=your-postgresql-transaction-url
DIRECT_URL=your-postgresql-direct-url
```

### 3. Database Synchronization
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to view the public website, or navigate to `http://localhost:3000/admin/login` to access the Admin CMS.

---

## 📦 Production Deployment

1. Connect repository to [Vercel](https://vercel.com).
2. Configure Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL`, `DIRECT_URL`).
3. Build Command: `npm run build`
4. Output Directory: Next.js Default (`.next`)

---

## 📚 Documentation Reference

- [`DESIGN.md`](file:///d:/webPorto/DESIGN.md): Single Source of Truth for UI/UX Design System & Neo Brutalist style guidelines.
- [`PRD.md`](file:///d:/webPorto/PRD.md): Product Requirements Document detailing business goals and functional scope.
- [`techstack.md`](file:///d:/webPorto/techstack.md): Architectural technical specifications.

