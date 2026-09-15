export default function Footer({ settings }: { settings: any }) {
  const social = settings?.social ?? {};

  return (
    <footer className="py-7 px-8 flex flex-wrap items-center justify-between gap-4"
      style={{ background: '#060F1E', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="font-display font-bold text-lg"
        style={{ background: 'linear-gradient(135deg,#F4A524,#00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        FinBud Financial
      </div>
      <p className="text-xs text-white/30">
        © {new Date().getFullYear()} FinBud Financial. A{' '}
        <a href="https://www.financebuddha.com/" target="_blank" rel="noopener noreferrer" className="text-[#00B4D8]">
          Finance Buddha
        </a>{' '}
        Initiative. All rights reserved.
      </p>
      <div className="flex gap-5">
        {[
          { label: 'About', href: '#about' },
          { label: 'Team', href: '#team' },
          { label: 'Contact', href: '#contact' },
        ].map((l) => (
          <a key={l.label} href={l.href} className="text-white/35 hover:text-[#00B4D8] text-xs transition-colors">
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
