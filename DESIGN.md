# DESIGN.md

# Personal Portfolio Website

## Design System & UI Guidelines

---

# Overview

Personal Portfolio Website adalah platform personal branding profesional yang digunakan kandidat untuk menampilkan profil, pengalaman kerja, proyek, pencapaian, dan informasi kontak kepada recruiter, HRD, maupun talent acquisition.

Berbeda dari portfolio tradisional yang cenderung minimalis dan generik, website ini mengadopsi pendekatan Neo Brutalism untuk menciptakan kesan yang kuat, unik, dan mudah diingat.

Tujuan utama website adalah membuat recruiter dapat memahami kandidat dengan cepat sekaligus meninggalkan kesan visual yang berbeda dari portfolio lain.

---

# Design Vision

Membangun portfolio yang:

- Bold
- Modern
- Professional
- Memorable
- Creative
- High Impact

Website harus terlihat seperti produk modern yang dibuat oleh developer profesional dengan perhatian tinggi terhadap detail visual dan user experience.

---

# Design Philosophy

## Be Memorable

Portfolio harus mempunyai identitas visual yang langsung menarik perhatian recruiter.

Dalam beberapa detik pertama pengguna harus dapat mengingat kandidat dan membedakannya dari portfolio lain.

---

## Strong Hierarchy

Informasi paling penting harus selalu menjadi fokus utama.

Urutan prioritas:

1. Nama Kandidat
2. Professional Title
3. Ringkasan Profil
4. Experience
5. Projects
6. Achievements
7. Contact Information

---

## Personality Driven Design

Website bukan hanya tempat menyimpan informasi, tetapi juga representasi karakter kandidat.

Desain harus mencerminkan:

- Percaya diri
- Kreatif
- Profesional
- Modern

---

## Content First

Visual digunakan untuk memperkuat informasi.

Efek visual tidak boleh mengganggu readability maupun usability.

---

# Design Style

## Primary Style

Neo Brutalism

Karakter utama:

- High contrast
- Thick borders
- Hard shadows
- Solid colors
- Large typography
- Strong hierarchy
- Playful interactions
- Modern layouts

---

## Design References & Inspirations

### Primary Reference

#### Neo Brutalism UI Library

https://github.com/marieooq/neo-brutalism-ui-library

Menjadi referensi utama untuk:

- Component architecture
- Card styling
- Button styling
- Form controls
- Border treatment
- Shadow treatment
- UI consistency

Karakter yang diadopsi:

- Thick black borders
- Hard shadows
- Interactive components
- Structured visual system
- Modern neo brutalist implementation

---

#### Neubrutalism

https://neubrutalism.com/

Menjadi referensi utama untuk:

- Layout composition
- Hero section styling
- Typography hierarchy
- Visual inspiration
- Landing page structure

Karakter yang diadopsi:

- Large typography
- High contrast
- Playful visuals
- Strong visual hierarchy
- Memorable user experience

---

### Secondary Inspirations

#### Gumroad

Inspirasi:

- Conversion layout
- Product showcase
- CTA placement

---

#### Framer Showcase

Inspirasi:

- Portfolio structure
- Creative layouts
- Modern interactions

---

#### Linear

Inspirasi:

- Typography hierarchy
- Content organization
- Professional design language

---

#### Read.cv

Inspirasi:

- Personal branding
- Professional profile layout
- Recruiter-friendly presentation

---

#### Arc Browser

Inspirasi:

- Personality-driven UI
- Modern interface concepts
- Distinct visual identity

---

# Visual Principles

Semua halaman harus mengikuti prinsip berikut:

- High contrast
- Large typography
- Thick borders
- Hard shadows
- Spacious layout
- Visual confidence
- Readable content
- Fast recognition

---

# Things To Avoid

Hindari penggunaan:

- Glassmorphism
- Neomorphism
- Blur-heavy design
- Soft shadows
- Excessive gradients
- Apple-style frosted effects
- Corporate template look
- Generic portfolio layouts
- Overly minimal UI

---

# Color System

## Primary

Electric Blue

HEX:

#2563EB

Usage:

- CTA Buttons
- Links
- Active State

---

## Secondary

Vibrant Yellow

HEX:

#FFD60A

Usage:

- Highlights
- Badges
- Decorative Elements

---

## Accent

Hot Pink

HEX:

#FF006E

Usage:

- Hover States
- Callouts
- Special Actions

---

## Success

HEX:

#22C55E

---

## Background

HEX:

#F8F8F8

---

## Surface

HEX:

#FFFFFF

---

## Border

HEX:

#000000

---

## Text Primary

HEX:

#000000

---

## Text Secondary

HEX:

#404040

---

# Typography System

## Primary Font

Space Grotesk

Fallback:

- Inter
- Geist
- Plus Jakarta Sans

---

## Heading

Weight:

800

Style:

- Bold
- Dominant
- High Contrast

Heading harus menjadi fokus utama setiap section.

---

## Body Text

Weight:

400-500

Line Height:

160%

Tujuan utama adalah readability.

---

# Layout System

## Content Width

Maximum Width:

1280px

---

## Grid System

Desktop:

12 Columns

---

## Section Spacing

- 96px Desktop
- 64px Tablet
- 48px Mobile

---

## Spacing Scale

8px Base Grid

- 8
- 16
- 24
- 32
- 48
- 64
- 96
- 120

---

# Component System

## Cards

Properties:

Border:
4px solid #000000

Background:
#FFFFFF

Shadow:
8px 8px 0px #000000

Border Radius:
20px

Padding:
24px

---

Hover

Transform:

translate(-4px,-4px)

Shadow:

12px 12px 0px #000000

Rotation:

1deg

Duration:

200ms

---

## Buttons

Properties:

Border:
3px solid #000000

Shadow:
5px 5px 0px #000000

Font Weight:
700

Padding:
14px 24px

Radius:
16px

---

Hover

Transform:

translate(-2px,-2px)

Shadow:

8px 8px 0px #000000

---

Active

Transform:

translate(2px,2px)

Shadow:

2px 2px 0px #000000

---

## Badges

Properties:

- Black Border
- Solid Color
- Rounded Full
- Bold Text

Digunakan untuk:

- Tech Stack
- Skills
- Categories

---

# Website Structure

## Hero Section

Tujuan:

Membuat recruiter memahami kandidat dalam waktu kurang dari 5 detik.

---

Content

- Name
- Professional Title
- Tagline
- Short Introduction
- Download CV
- Contact Button
- Profile Image

---

Layout

Desktop:

2 Column Layout

Left:

Content

Right:

Profile Image

---

Hero Headline

Menggunakan typography besar.

Contoh:

AHMAD RIDHO

FULLSTACK DEVELOPER

BUILDING PRODUCTS THAT SOLVE REAL PROBLEMS.

---

# About Section

Menampilkan:

- Professional Summary
- Background
- Expertise
- Career Focus

Layout:

Asymmetrical Content Layout

---

# Experience Section

Layout:

Vertical Timeline

Setiap item:

- Company Name
- Position
- Duration
- Description
- Technologies

Menggunakan brutalist cards.

---

# Projects Section

Section paling penting setelah Hero.

---

Layout

Modern Bento Grid

Grid terdiri dari:

- Large Card
- Medium Card
- Small Card

Featured project memiliki ukuran terbesar.

---

Project Content

- Screenshot
- Name
- Description
- Tech Stack
- Demo Link
- Repository Link

---

# Achievement Section

Layout:

Responsive Grid

Visual Style:

Achievement Collection Board

Content:

- Title
- Date
- Description
- Certificate

---

# Contact Section

Headline:

LET'S BUILD SOMETHING AMAZING.

---

Content

- Email
- Phone
- LinkedIn
- GitHub

---

CTA

GET IN TOUCH

Menjadi elemen paling dominan pada section ini.

---

# Navigation

Position:

Sticky Top

Height:

80px

Background:

#FFFFFF

Border Bottom:

4px solid #000000

---

Menu

- Home
- About
- Experience
- Projects
- Achievements
- Contact

---

---

### GSAP Animation Library

https://gsap.com/

GSAP digunakan sebagai standar utama untuk seluruh animation system pada website.

Seluruh motion, page transition, micro interaction, dan scroll animation harus menggunakan GSAP untuk memastikan performa yang smooth, konsisten, dan profesional di semua browser.

Referensi penggunaan:

- Hero entrance animation
- Scroll reveal animation
- Stagger animation
- Page transition
- Text reveal animation
- Marquee animation
- Counter animation
- Hover interaction
- Floating decorative elements
- CTA emphasis animation

Plugin yang direkomendasikan:

- ScrollTrigger
- SplitText
- Flip
- Observer

---

### Animation Reference

Inspirasi animasi berasal dari:

- GSAP Showcase
- Award-winning Portfolio Websites
- Framer Motion Interactions
- Linear Website
- Modern Startup Landing Pages

Karakter animasi yang diadopsi:

- Smooth
- Fast
- Purposeful
- Premium
- Interactive
- High Performance

---

# Animation Guidelines

## Animation Principle

Animasi harus terasa:

- Responsive
- Premium
- Smooth
- Natural

Bukan sekadar dekorasi.

Setiap animasi harus membantu meningkatkan pengalaman pengguna dan memperjelas hierarki informasi.

---

## Hero Animation

Saat halaman pertama kali dimuat:

- Heading reveal animation
- Stagger text animation
- CTA fade-up animation
- Profile image scale animation
- Background decorative motion

Plugin:

GSAP + SplitText

---

## Scroll Animation

Setiap section menggunakan:

- Fade Up
- Fade In
- Scale In
- Stagger Reveal

Plugin:

GSAP ScrollTrigger

Tujuan:

Membuat website terasa hidup tanpa mengganggu proses membaca.

---

## Project Card Animation

Saat card muncul:

- Fade
- Lift
- Slight Rotation

Saat hover:

- Lift Effect
- Shadow Shift
- Scale Up

Plugin:

GSAP

---

## Text Reveal Animation

Untuk heading besar:

- Character Reveal
- Word Reveal
- Mask Reveal

Plugin:

SplitText

Digunakan pada:

- Hero Title
- Section Titles
- CTA Headlines

---

## Counter Animation

Digunakan pada:

- Total Projects
- Years Experience
- Achievements
- Certifications

Plugin:

GSAP

---

## Bento Grid Animation

Project cards muncul menggunakan:

- Stagger Animation
- Scale Animation
- Progressive Reveal

Plugin:

GSAP + ScrollTrigger

---

## Marquee Animation

Digunakan pada:

- Tech Stack
- Skills
- Tools
- Achievement Highlights

Karakter:

- Infinite Loop
- Smooth Motion
- Non-stop Movement

Plugin:

GSAP

---

## Floating Decorative Elements

Elemen dekoratif seperti:

- Stickers
- Shapes
- Doodles
- Labels

bergerak secara perlahan menggunakan:

- Floating Motion
- Rotate Motion
- Parallax Motion

Plugin:

GSAP

---

## Page Transition

Jika menggunakan Next.js App Router:

Gunakan:

- GSAP
- Transition Overlay
- Fade Transition
- Shared Element Transition

Tujuan:

Menciptakan pengalaman navigasi yang modern dan premium.

---

## Motion Rules

Wajib:

- 60 FPS
- GPU Accelerated Animation
- Transform-based Animation
- Opacity Animation

Hindari:

- Layout Thrashing
- Heavy Blur Animation
- Width Animation
- Height Animation
- Expensive Repaint

---

## Desired Motion Impression

Saat recruiter menggunakan website, animasi harus terasa:

"Website ini modern."

"Interaksinya halus."

"Terlihat dibuat dengan sangat detail."

"Profesional namun tetap kreatif."

"Motion mendukung konten, bukan mengganggu konten."