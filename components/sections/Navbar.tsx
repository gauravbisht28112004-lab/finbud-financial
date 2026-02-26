'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#hero', type: 'anchor' },
  { label: 'About', href: '#about', type: 'anchor' },
  { label: 'Partners', href: '#banks', type: 'anchor' },
  { label: 'Reviews', href: '#reviews', type: 'anchor' },
  { label: 'Family', href: '#family', type: 'anchor' },
  { label: 'Team', href: '#team', type: 'anchor' },
  { label: 'Contact Us', href: '#contact', type: 'anchor' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchorClick =
    (href: string) =>
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.querySelector(href);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      }

      setOpen(false);
    };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <div
          className={`transition-all duration-300 rounded-2xl border border-white/10 ${
            scrolled
              ? 'bg-[#0b1633]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
              : 'bg-[#0b1633]/70 backdrop-blur-lg'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4">
            {/* Brand */}
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              {/* Logo */}
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center overflow-hidden">
                <Image
                  src="/finbud-logo.png"
                  alt="FinBud Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Text */}
              <div className="leading-tight">
                <div className="text-lg md:text-xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  FinBud Financial
                </div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-blue-300">
                  Part of Finance Buddha
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links
                .filter((l) => l.label !== 'Contact Us')
                .map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={handleAnchorClick(l.href)}
                    className="text-sm font-medium text-white/80 hover:text-white transition"
                  >
                    {l.label}
                  </a>
                ))}

              <a
                href="#contact"
                onClick={handleAnchorClick('#contact')}
                className="rounded-full bg-[#f4a524] px-6 py-2 text-sm font-semibold text-black shadow hover:brightness-110 transition"
              >
                Contact Us
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden border-t border-white/10 px-5 py-4">
              <div className="flex flex-col gap-3">
                {links
                  .filter((l) => l.label !== 'Contact Us')
                  .map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={handleAnchorClick(l.href)}
                      className="text-sm font-medium text-white/80 hover:text-white transition"
                    >
                      {l.label}
                    </a>
                  ))}

                <a
                  href="#contact"
                  onClick={handleAnchorClick('#contact')}
                  className="mt-2 inline-flex w-fit rounded-full bg-[#f4a524] px-6 py-2 text-sm font-semibold text-black shadow hover:brightness-110 transition"
                >
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}