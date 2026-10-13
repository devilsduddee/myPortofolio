/**
 * File        : src/components/sections/MusicSection.tsx
 * Deskripsi   : Komponen section pemutar musik Spotify ("Daily Soundtrack & Mood").
 *               Menampilkan kurasi playlist favorit sehari-hari dengan gaya bahasa yang ramah,
 *               universal, dan menyenangkan untuk dinikmati siapa saja.
 */

'use client';

import { useRef } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { Coffee, Flame } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Data daftar playlist Spotify dengan kata-kata yang santai dan universal
const SPOTIFY_PLAYLISTS = [
  {
    id: 'playlist-chill',
    title: 'Daily Chill & Coffee Break',
    description: 'Lagu-lagu santai untuk menemani pagi, ngopi, dan aktivitas harian',
    src: 'https://open.spotify.com/embed/playlist/0YoVEKSLHphlmR3RcE8wkA?utm_source=generator&theme=0&si=abaa24ee8e4f48fa',
    badge: 'Daytime',
    accentColor: 'bg-neo-yellow text-neo-text',
    icon: Coffee,
  },
  {
    id: 'playlist-rock',
    title: 'Rock & Pop Punk Anthem',
    description: 'Distorsi gitar dan hentakan drum bertenaga untuk booster semangat',
    src: 'https://open.spotify.com/embed/playlist/7a6fBoj4FtmCQQWAH61ta7?utm_source=generator&theme=0&si=1b26ba1a7cc34302',
    badge: 'High Energy',
    accentColor: 'bg-neo-pink text-white',
    icon: Flame,
  },
];

/**
 * Komponen Section Pemutar Musik Spotify Publik.
 *
 * Kegunaan : Menampilkan kurasi 2 playlist Spotify dalam format grid responsif Neo-Brutalism.
 * Input    : Tanpa props luar.
 * Hasil    : Blok section pemutar musik Spotify dengan 2 tag <iframe>.
 */
export function MusicSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = containerRef.current.querySelectorAll('.music-card-item');

    if (prefersReducedMotion) {
      if (cards.length > 0) gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <SectionContainer id="soundtrack" className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-20">
      <SectionHeader 
        title="Soundtrack" 
        subtitle="Music that keeps good energy flowing" 
      />

      {/* Grid 2 Kolom Playlist */}
      <div ref={containerRef} className="mt-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {SPOTIFY_PLAYLISTS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.id}
              className="music-card-item bg-neo-surface border-3 sm:border-4 border-neo-border p-5 sm:p-6 md:p-7 rounded-[20px] sm:rounded-[24px] shadow-brutal sm:shadow-brutal-lg flex flex-col justify-between"
            >
              {/* Header Kartu */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b-2 sm:border-b-3 border-neo-border">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${item.accentColor} border-2 sm:border-3 border-neo-border shadow-brutal-sm flex items-center justify-center shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-neo-text uppercase tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-bold text-neo-muted">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Badge Mood Santai */}
                <span className="self-start sm:self-center px-3 py-1 bg-neo-surface border-2 border-neo-border rounded-lg text-[10px] sm:text-xs font-black uppercase text-neo-text shadow-[1px_1px_0px_#000000] whitespace-nowrap shrink-0">
                  {item.badge}
                </span>
              </div>

              {/* Kotak Embed Frame Spotify */}
              <div className="w-full flex-1 rounded-[14px] sm:rounded-[16px] overflow-hidden border-2 sm:border-3 border-neo-border bg-black shadow-inner">
                <iframe 
                  data-testid="embed-iframe" 
                  style={{ borderRadius: '12px' }} 
                  src={item.src} 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  title={`${item.title} Spotify Frame`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
