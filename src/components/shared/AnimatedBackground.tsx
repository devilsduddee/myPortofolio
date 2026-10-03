/**
 * File        : src/components/shared/AnimatedBackground.tsx
 * Deskripsi   : Komponen latar belakang dengan efek grain/noise texture premium
 *               menggunakan SVG feTurbulence filter. Tidak ada stiker atau animasi lain.
 */

'use client';

/**
 * Komponen Latar Belakang Grain Texture.
 *
 * Kegunaan : Menampilkan efek butiran film (grain) halus di atas background
 *            agar halaman terasa lebih premium dibanding warna polos biasa.
 *            Menggunakan SVG feTurbulence — ringan, berjalan di GPU, tanpa gambar eksternal.
 * Input    : Tidak ada props.
 * Hasil    : Container div fixed yang menutupi seluruh layar dengan grain texture.
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-neo-bg select-none">

      {/*
        Grain Texture menggunakan SVG feTurbulence.
        mix-blend-mode multiply: hanya bagian gelap noise yang meresap ke background,
        bagian terang tidak berpengaruh → hasil grain terlihat natural dan halus.
        opacity-[0.30] → lebih menonjol, terasa seperti kertas bertekstur.
        baseFrequency 0.45 → butiran lebih besar agar lebih terlihat tanpa terasa kasar.
      */}
      <svg
        aria-hidden="true"
        style={{ mixBlendMode: 'multiply' }}
        className="absolute inset-0 w-full h-full opacity-[0.30]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-filter">
          {/* feTurbulence menghasilkan pola noise acak menyerupai butiran film */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.45"
            numOctaves="4"
            stitchTiles="stitch"
          />
          {/* Ubah noise jadi monokrom abu-abu netral agar tidak berwarna */}
          <feColorMatrix type="saturate" values="0" />
          {/* Tingkatkan kontras grain agar lebih terlihat di background terang */}
          <feComponentTransfer>
            <feFuncR type="linear" slope="2.2" intercept="-0.6" />
            <feFuncG type="linear" slope="2.2" intercept="-0.6" />
            <feFuncB type="linear" slope="2.2" intercept="-0.6" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>

    </div>
  );
}
