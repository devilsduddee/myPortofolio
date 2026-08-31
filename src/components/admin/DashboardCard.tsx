import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

export function DashboardCard({ title, value, icon: Icon, trend }: DashboardCardProps) {
  return (
    <div className="bg-neo-surface border-4 border-neo-border rounded-[20px] p-6 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-neo-text text-xs font-black tracking-wider uppercase">{title}</h3>
        <div className="w-10 h-10 rounded-xl bg-neo-yellow border-2 border-neo-border flex items-center justify-center text-neo-text shadow-[2px_2px_0px_#000000]">
          <Icon className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-3xl font-black text-neo-text">{value}</span>
        {trend && (
          <span className="text-xs font-black uppercase text-neo-blue bg-neo-blue/10 border border-neo-border px-2 py-0.5 rounded-lg">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}


