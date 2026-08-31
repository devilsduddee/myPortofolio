export function SectionHeader({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-8 md:mb-12 flex flex-col items-start gap-3">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neo-text uppercase bg-neo-yellow border-4 border-neo-border px-6 py-2 shadow-[6px_6px_0px_#000000]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base lg:text-lg text-neo-text font-bold uppercase tracking-wider bg-neo-surface border-2 border-neo-border px-4 py-1.5 shadow-[4px_4px_0px_#000000]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
