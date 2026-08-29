export function SectionHeader({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 md:mt-3 text-xs md:text-sm lg:text-base text-slate-400 font-medium uppercase tracking-wider">
          {subtitle}
        </p>
      )}
    </div>
  );
}
