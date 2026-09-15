import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { loanProducts } from '@/data/loans';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Banking', path: '/loans/overdraft-facility' },
  { label: 'Partners', path: '/partners' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setLoansOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path: string) => location.pathname === path;
  const isLoansActive = location.pathname.startsWith('/loans');

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Logo />

            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/') ? 'text-[var(--brand-primary)]' : 'text-slate-700 hover:text-[var(--brand-primary)]'
                }`}
              >
                Home
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setLoansOpen(true)}
                onMouseLeave={() => setLoansOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isLoansActive ? 'text-[var(--brand-primary)]' : 'text-slate-700 hover:text-[var(--brand-primary)]'
                  }`}
                >
                  Loans
                  <ChevronDown className={`w-4 h-4 transition-transform ${loansOpen ? 'rotate-180' : ''}`} />
                </button>
                {loansOpen && (
                  <div className="absolute top-full left-0 pt-2 w-72 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 overflow-hidden">
                      {loanProducts.map((loan) => (
                        <Link
                          key={loan.slug}
                          to={`/loans/${loan.slug}`}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-slate-900 group-hover:text-[var(--brand-primary)]">
                              {loan.name}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">{loan.tagline}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--brand-primary)] mt-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path) ? 'text-[var(--brand-primary)]' : 'text-slate-700 hover:text-[var(--brand-primary)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link to="/calculators" className="text-sm font-medium text-slate-700 hover:text-[var(--brand-primary)] transition-colors px-4 py-2">
                Calculators
              </Link>
              <Link to="/apply" className="btn-primary text-sm">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <Logo />
              <button
                className="p-2 rounded-lg hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-slate-700" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              <Link to="/" className="block px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-50">
                Home
              </Link>

              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Loans</div>
              {loanProducts.map((loan) => (
                <Link
                  key={loan.slug}
                  to={`/loans/${loan.slug}`}
                  className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 ml-4"
                >
                  {loan.name}
                </Link>
              ))}

              <Link to="/calculators" className="block px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-50">
                Calculators
              </Link>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4">
                <Link to="/apply" className="btn-primary w-full">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
