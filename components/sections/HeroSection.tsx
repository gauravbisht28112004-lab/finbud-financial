'use client';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, UserCircle2 } from 'lucide-react';

interface Slide {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  gradient: string;
}
interface StaffMember {
  _id: string;
  name: string;
  role: string;
  department: string;
  photoUrl: string;
}

interface Props {
  slides: Slide[];
  hr: StaffMember[];
  managers: StaffMember[];
  settings: any;
}

// ✅ Default slides now use real images from /public/slides/
const defaultSlides: Slide[] = [
  {
    _id: '1',
    title: 'Smart Financial Solutions',
    subtitle: 'Personal · Home · Business Loans',
    imageUrl: '/slides/slide1.jpg',
    gradient: 'linear-gradient(135deg,#1B4FD8,#00B4D8)',
  },
  {
    _id: '2',
    title: 'Your Goals, Our Mission',
    subtitle: 'End-to-end loan advisory services',
    imageUrl: '/slides/slide2.jpg',
    gradient: 'linear-gradient(135deg,#0A1628,#1B4FD8)',
  },
  {
    _id: '3',
    title: 'Expert Financial Guidance',
    subtitle: "Backed by Finance Buddha's trusted network",
    imageUrl: '/slides/slide3.jpg',
    gradient: 'linear-gradient(135deg,#003366,#00B4D8)',
  },
  {
    _id: '4',
    title: '50+ Bank Partnerships',
    subtitle: 'Best rates. Fastest approvals.',
    imageUrl: '/slides/slide4.jpg',
    gradient: 'linear-gradient(135deg,#1a2a4a,#F4A524)',
  },
  {
    _id: '5',
    title: 'Trusted by 10,000+ Clients',
    subtitle: 'Building financial futures across India',
    imageUrl: '/slides/slide5.jpg',
    gradient: 'linear-gradient(135deg,#0e2444,#00B4D8)',
  },
];

export default function HeroSection({ slides, hr, managers }: Props) {
  // ✅ If slides come from API and are missing imageUrl, fallback to our default image path
  const allSlides = useMemo(() => {
    const incoming = slides?.length ? slides : defaultSlides;

    const fallbackImages = [
      '/slides/slide1.jpg',
      '/slides/slide2.jpg',
      '/slides/slide3.jpg',
      '/slides/slide4.jpg',
      '/slides/slide5.jpg',
    ];

    return incoming.map((s, idx) => ({
      ...s,
      imageUrl: s.imageUrl && s.imageUrl.trim() ? s.imageUrl : fallbackImages[idx % fallbackImages.length],
    }));
  }, [slides]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % allSlides.length), 4500);
    return () => clearInterval(t);
  }, [allSlides.length]);

  const prev = () => setCurrent((c) => (c - 1 + allSlides.length) % allSlides.length);
  const next = () => setCurrent((c) => (c + 1) % allSlides.length);

  // ✅ DEFAULT HR + MANAGER with PHOTO + REAL NAMES
  const heroCards = [
    ...(hr.length > 0
      ? hr
      : [
          {
            _id: 'hr1',
            name: 'Anjali Bisht',
            role: 'Human Resources',
            department: 'HR Manager',
            photoUrl: '/team/hr.jpg',
          },
        ]),
    ...(managers.length > 0
      ? managers
      : [
          {
            _id: 'm1',
            name: 'Akash Deep Kohli',
            role: 'Branch Manager',
            department: 'Operations Head',
            photoUrl: '/team/manager.jpg',
          },
        ]),
  ].slice(0, 2);

  return (
    <section
      id="hero"
      className="min-h-screen pt-[70px] grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(27,79,216,0.25) 0%,transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(0,180,216,0.15) 0%,transparent 70%)' }}
      />

      {/* Left */}
      <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{
            background: 'rgba(244,165,36,0.12)',
            border: '1px solid rgba(244,165,36,0.3)',
            color: '#F4A524',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F4A524] animate-pulse-dot" />
          Trusted Financial Partner
        </div>

        {/* ✅ LOGO + TITLE (NEW) */}
        <div className="flex items-center gap-5 mb-3">
          {/* Logo (Put your logo at: public/logo/finbud-logo.png) */}
          <div
            className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0"
            style={{
              filter: 'drop-shadow(0 10px 18px rgba(0,180,216,0.18))',
            }}
          >
            <Image
              src="/logo/finbud-logo.png"
              alt="FinBud Financial Logo"
              fill
              priority
              className="object-contain"
              sizes="(min-width: 1024px) 80px, 64px"
            />
          </div>

          {/* Text */}
          <h1
            className="font-display font-black leading-[1.05] text-white"
            style={{ fontSize: 'clamp(2.4rem,4vw,5.2rem)' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg,#F4A524,#00B4D8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              FINBUD
            </span>
            <br />
            FINANCIAL
          </h1>
        </div>

        <p className="text-sm text-white/50 mb-6 tracking-wide">
          A proud initiative of{' '}
          <a
            href="https://www.financebuddha.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00B4D8]"
          >
            Finance Buddha
          </a>
        </p>

        <p className="text-white/70 leading-relaxed mb-10 max-w-md">
          Empowering individuals and businesses with smart, transparent financial solutions. From personal loans to
          business credit — we make your financial journey seamless.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg,#F4A524,#FFD166)',
              color: '#0A1628',
              boxShadow: '0 4px 20px rgba(244,165,36,0.35)',
            }}
          >
            Get Started Today
          </a>
          <a
            href="#about"
            className="px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all hover:border-[#00B4D8] hover:text-[#00B4D8]"
            style={{ border: '1.5px solid rgba(255,255,255,0.25)' }}
          >
            Learn More
          </a>
          <a
            href="#team"
            className="px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all hover:border-[#00B4D8] hover:text-[#00B4D8]"
            style={{ border: '1.5px solid rgba(255,255,255,0.25)' }}
          >
            Our Team
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-14">
          {[
            { num: '10K+', label: 'Clients Served' },
            { num: '₹500Cr+', label: 'Loans Disbursed' },
            { num: '50+', label: 'Bank Partners' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-2xl text-[#F4A524]">{s.num}</div>
              <div className="text-xs text-white/40 mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col justify-center px-6 lg:px-10 pb-12 lg:pb-16 pt-8 relative z-10 gap-5">
        {/* Slideshow */}
        <div
          className="relative rounded-2xl overflow-hidden h-64 shadow-brand-lg"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {allSlides.map((slide, i) => (
            <div
              key={slide._id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: i === current ? 1 : 0,
                background: slide.imageUrl ? undefined : slide.gradient,
              }}
            >
              {slide.imageUrl ? (
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              ) : null}

              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg,rgba(10,22,40,0.55),rgba(27,79,216,0.25))' }}
              />

              <div className="absolute bottom-5 left-5 right-16">
                <h3 className="font-display font-bold text-white text-lg">{slide.title}</h3>
                <p className="text-white/70 text-xs mt-1">{slide.subtitle}</p>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-[rgba(244,165,36,0.4)]"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={next}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-[rgba(244,165,36,0.4)]"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {allSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === current ? 18 : 6,
                  background: i === current ? '#F4A524' : 'rgba(255,255,255,0.35)',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* HR & Manager Cards */}
        <div className="grid grid-cols-2 gap-4">
          {heroCards.map((member) => (
            <div
              key={member._id}
              className="flex items-center gap-3 p-4 rounded-xl transition-all hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden relative"
                style={{
                  border: '2px solid #F4A524',
                  background: 'rgba(55,66,99,0.5)',
                  boxShadow: '0 10px 24px rgba(244,165,36,0.18)',
                }}
              >
                {member.photoUrl ? (
                  <Image src={member.photoUrl} alt={member.name} fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserCircle2 size={28} className="text-[#F4A524]" />
                  </div>
                )}
              </div>

              <div className="overflow-hidden">
                <p className="font-bold text-white text-sm truncate">{member.name}</p>
                <p className="text-[#00B4D8] text-xs font-medium mt-0.5">{member.role}</p>
                <p className="text-white/35 text-[10px] mt-0.5">{member.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
