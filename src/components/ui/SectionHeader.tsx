interface SectionHeaderProps {
  kicker: string;
  title: string;
  subtitle: string;
  kickerColor?: string;
}

export function SectionHeader({ 
  kicker, 
  title, 
  subtitle, 
  kickerColor = "text-primary" 
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <span className={`${kickerColor} font-semibold tracking-wider text-xs md:text-sm uppercase`}>
        {kicker}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
        {title}
      </h2>
      <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
        {subtitle}
      </p>
    </div>
  );
}