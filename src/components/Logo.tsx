import { Link } from 'react-router-dom';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label="FinBud Financial Home">
      {/* Real Image Logo */}
      <img src="/logo.png" alt="FinBud Financial Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
      
      <div className="flex flex-col leading-none justify-center">
        <span className="font-extrabold text-[1.1rem] tracking-tight uppercase" style={{ color: light ? '#fff' : 'var(--text-primary)' }}>
          FINBUD
        </span>
        <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase mt-0.5" style={{ color: light ? 'rgba(255,255,255,0.7)' : 'var(--brand-primary)' }}>
          Financial
        </span>
      </div>
    </Link>
  );
}
