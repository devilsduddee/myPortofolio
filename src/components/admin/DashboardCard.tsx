/**
 * File        : src/components/admin/DashboardCard.tsx
 * Deskripsi   : Komponen kartu metrik statistik pada Dashboard Admin CMS.
 *               Disesuaikan secara responsif untuk layar handphone (mobile) hingga desktop
 *               dengan hierarki visual Neo-Brutalisme yang kuat dan hemat ruang.
 */

import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

/**
 * Komponen Kartu Statistik Dashboard Admin.
 *
 * Kegunaan : Menampilkan angka metrik, ikon indikator, dan badge kategori status.
 * Input    : title (Judul metrik), value (Nilai/angka metrik), icon (Komponen ikon), trend (Label status)
 * Hasil    : Kartu statistik Neo-Brutalism responsif.
 */
export function DashboardCard({ title, value, icon: Icon, trend }: DashboardCardProps) {
  return (
    <div className="bg-neo-surface border-3 sm:border-4 border-neo-border rounded-[18px] sm:rounded-[20px] p-4 sm:p-5 md:p-6 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all flex flex-col justify-between">
      {/* Header Kartu: Judul & Ikon */}
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
        <h3 className="text-neo-text text-[11px] sm:text-xs font-black tracking-wider uppercase leading-tight line-clamp-1">
          {title}
        </h3>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-neo-yellow border-2 border-neo-border flex items-center justify-center text-neo-text shadow-[2px_2px_0px_#000000] shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </div>
      </div>

      {/* Nilai Metrik & Badge Status */}
      <div className="flex items-baseline justify-between gap-2 mt-auto">
        <span className="text-2xl sm:text-3xl font-black text-neo-text tracking-tight">
          {value}
        </span>
        {trend && (
          <span className="text-[10px] sm:text-xs font-black uppercase text-neo-blue bg-neo-blue/10 border-2 border-neo-border px-2 py-0.5 rounded-lg whitespace-nowrap shadow-[1px_1px_0px_#000000]">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
