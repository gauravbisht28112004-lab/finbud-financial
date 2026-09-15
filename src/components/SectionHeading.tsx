interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, center = true, light = false }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-12`}>
      {eyebrow && <span className="heading-eyebrow">{eyebrow}</span>}
      <h2 className={`heading-2 ${light ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${light ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>
      )}
    </div>
  );
}
