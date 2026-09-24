import { Link } from 'react-router-dom';
import { useEffect, useState, type ComponentType } from 'react';

import {
  ArrowRight,
  Star,
  Quote,
  ShieldCheck,
  Users,
  Zap,
  Handshake,
  Calculator,
  FileText,
  Search,
  MessageSquare,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';
import LoanCard from '@/components/LoanCard';
import CTA from '@/components/CTA';
import { siteData } from '@/data/site';
import { loanProducts } from '@/data/loans';

const iconMap: Record<
  string,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  ShieldCheck,
  Users,
  Zap,
  Handshake,
  Calculator,
  FileText,
  Search,
  MessageSquare,
  CheckCircle,
};

export default function Home() {
  /* =========================================================
     HERO SLIDESHOW
     Changes automatically every 3 seconds
  ========================================================= */

  const heroImages = [
    '/hero-finance.jpg',
    '/hero-finance-2.jpg',
    '/hero-finance-3.jpg',
    '/hero-finance-4.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previousSlide) => {
        return (previousSlide + 1) % heroImages.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToPreviousSlide = () => {
    setCurrentSlide((previousSlide) => {
      return (
        (previousSlide - 1 + heroImages.length) %
        heroImages.length
      );
    });
  };

  const goToNextSlide = () => {
    setCurrentSlide((previousSlide) => {
      return (previousSlide + 1) % heroImages.length;
    });
  };

  return (
    <>
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative overflow-hidden bg-white">

        {/* Soft background decoration */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            backgroundColor: 'rgba(11, 79, 108, 0.08)',
          }}
        />

        <div className="container-page relative">

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[650px] py-12 lg:py-16">

            {/* =====================================================
                LEFT SIDE
            ===================================================== */}
            <div className="relative z-10 animate-slide-up lg:pr-8">

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sm text-[var(--brand-primary)] font-semibold mb-6">

                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor: 'var(--brand-secondary)',
                  }}
                />

                Trusted by 500+ clients across India

              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.08] tracking-tight text-slate-900 mb-6">

                Smart Financial
                <br />

                Solutions,{' '}

                <span
                  style={{
                    color: 'var(--brand-primary)',
                  }}
                >
                  Simplified
                </span>

              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                {siteData.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">

                <Link
                  to="/apply"
                  className="btn-primary group"
                >
                  Apply Now

                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/loans/personal-loan"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-[var(--brand-primary)] border-2 border-[var(--brand-primary)] hover:bg-sky-50 transition-all group"
                >
                  Explore Loan Solutions

                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

              </div>

              {/* ===================================================
                  STATS
              =================================================== */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">

                {siteData.stats.map((stat, index) => {

                  const icons = [
                    Users,
                    Handshake,
                    ShieldCheck,
                    Star,
                  ];

                  const StatIcon =
                    icons[index % icons.length];

                  return (
                    <div
                      key={stat.label}
                      className="group"
                    >

                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                        style={{
                          backgroundColor:
                            index % 2 === 0
                              ? 'rgba(11, 79, 108, 0.08)'
                              : 'rgba(16, 185, 129, 0.10)',
                        }}
                      >

                        <StatIcon
                          className="w-5 h-5"
                          style={{
                            color:
                              index % 2 === 0
                                ? 'var(--brand-primary)'
                                : 'var(--brand-secondary)',
                          }}
                        />

                      </div>

                      <div className="text-2xl md:text-3xl font-bold text-slate-900">
                        {stat.value}
                      </div>

                      <div className="text-xs text-slate-500 mt-1 leading-tight">
                        {stat.label}
                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* =====================================================
                RIGHT SIDE - HERO IMAGE SLIDESHOW
            ===================================================== */}
            <div className="relative lg:min-h-[600px] flex items-center justify-center animate-fade-in">

              <div className="relative w-full max-w-[620px] lg:ml-auto">

                {/* Decorative glow */}
                <div
                  className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 blur-2xl pointer-events-none"
                  style={{
                    backgroundColor: 'var(--brand-secondary)',
                  }}
                />

                {/* =================================================
                    SLIDESHOW
                ================================================= */}
                <div className="relative overflow-hidden rounded-[32px] bg-slate-100 shadow-xl">

                  {/* Images */}
                  <div className="relative h-[430px] md:h-[500px] lg:h-[570px]">

                    {heroImages.map((image, index) => (

                      <img
                        key={image}
                        src={image}
                        alt={`FinBud Financial - Slide ${index + 1}`}
                        className={`
                          absolute
                          inset-0
                          w-full
                          h-full
                          object-cover
                          object-center
                          transition-opacity
                          duration-700
                          ease-in-out
                          ${
                            currentSlide === index
                              ? 'opacity-100'
                              : 'opacity-0'
                          }
                        `}
                        loading={
                          index === 0
                            ? 'eager'
                            : 'lazy'
                        }
                      />

                    ))}

                    {/* Soft white gradient on left */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/40 to-transparent pointer-events-none" />

                    {/* Bottom gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* =================================================
                        PREVIOUS BUTTON
                    ================================================= */}
                    <button
                      type="button"
                      onClick={goToPreviousSlide}
                      aria-label="Previous slide"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all z-20"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* =================================================
                        NEXT BUTTON
                    ================================================= */}
                    <button
                      type="button"
                      onClick={goToNextSlide}
                      aria-label="Next slide"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all z-20"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* =================================================
                        SLIDE DOTS
                    ================================================= */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">

                      {heroImages.map((_, index) => (

                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            setCurrentSlide(index)
                          }
                          aria-label={`Go to slide ${index + 1}`}
                          className={`
                            h-2.5
                            rounded-full
                            transition-all
                            duration-300
                            ${
                              currentSlide === index
                                ? 'w-7 bg-[var(--brand-primary)]'
                                : 'w-2.5 bg-white/80 hover:bg-white'
                            }
                          `}
                        />

                      ))}

                    </div>

                  </div>

                </div>

                {/* =================================================
                    FLOATING FINANCIAL SUPPORT CARD
                ================================================= */}
                <div className="absolute bottom-6 left-4 md:left-[-20px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-5 w-[230px] z-30">

                  <div className="flex items-center gap-3 mb-3">

                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor:
                          'rgba(16, 185, 129, 0.1)',
                      }}
                    >

                      <ShieldCheck
                        className="w-5 h-5"
                        style={{
                          color: 'var(--brand-secondary)',
                        }}
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-500">
                        Financial Support
                      </p>

                      <p className="font-bold text-slate-900">
                        Trusted Guidance
                      </p>

                    </div>

                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Get guidance for personal, home, business
                    loans and overdraft facilities.
                  </p>

                </div>

                {/* =================================================
                    FLOATING PARTNER CARD
                ================================================= */}
                <div className="absolute top-8 right-4 md:right-[-20px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-30">

                  <div className="flex items-center gap-3">

                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor:
                          'rgba(11, 79, 108, 0.08)',
                      }}
                    >

                      <Handshake
                        className="w-5 h-5"
                        style={{
                          color: 'var(--brand-primary)',
                        }}
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-500">
                        Lending Network
                      </p>

                      <p className="font-bold text-slate-900">
                        15+ Partners
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =======================================================
              PARTNER LOGO STRIP
          ======================================================= */}
          <div className="relative z-10 pb-10">

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 md:p-6">

              <div className="flex flex-col md:flex-row md:items-center gap-5">

                <div className="md:min-w-[230px]">

                  <p className="text-sm font-bold text-slate-900">
                    Get offers from top banks and NBFCs
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Through our trusted lending network
                  </p>

                </div>

                <div className="flex-1 overflow-hidden">

                  <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">

                    {[
                      {
                        name: 'Fibe',
                        logo: 'https://www.finbudfinancial.com/banks/fibe.png',
                      },
                      {
                        name: 'Finnable',
                        logo: 'https://www.finbudfinancial.com/banks/finnable.png',
                      },
                      {
                        name: 'Poonawalla',
                        logo: 'https://www.finbudfinancial.com/banks/poonawalla.png',
                      },
                      {
                        name: 'IndusInd',
                        logo: 'https://www.finbudfinancial.com/banks/indusind.png',
                      },
                      {
                        name: 'Yes Bank',
                        logo: 'https://www.finbudfinancial.com/banks/yes.png',
                      },
                      {
                        name: 'Bajaj Finserv',
                        logo: 'https://www.finbudfinancial.com/banks/bajaj.png',
                      },
                      {
                        name: 'HDFC Bank',
                        logo: 'https://www.finbudfinancial.com/banks/hdfc.png',
                      },
                      {
                        name: 'ICICI Bank',
                        logo: 'https://www.finbudfinancial.com/banks/icici.png',
                      },
                      {
                        name: 'Axis Bank',
                        logo: 'https://www.finbudfinancial.com/banks/axis.png',
                      },
                      {
                        name: 'Kotak',
                        logo: 'https://www.finbudfinancial.com/banks/kotak.png',
                      },
                      {
                        name: 'IDFC FIRST',
                        logo: 'https://www.finbudfinancial.com/banks/idfc.png',
                      },
                      {
                        name: 'InCred',
                        logo: 'https://www.finbudfinancial.com/banks/Incred.png',
                      },
                    ].map((partner) => (

                      <div
                        key={partner.name}
                        className="flex-shrink-0 w-[145px] h-[58px] rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center px-4 hover:bg-white hover:shadow-sm transition-all"
                      >

                        <img
                          src={partner.logo}
                          alt={`${partner.name} Logo`}
                          className="max-w-full max-h-9 object-contain"
                          loading="lazy"
                        />

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          LOAN PRODUCTS
      ========================================================= */}
      <section className="section-padding bg-white">

        <div className="container-page">

          <SectionHeading
            eyebrow="Our Products"
            title="Loan Solutions for Every Need"
            subtitle="From personal expenses to business growth, we help you find the right loan product from our lending partners."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {loanProducts.map((loan) => (
              <LoanCard
                key={loan.slug}
                loan={loan}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          WHY CHOOSE US
      ========================================================= */}
      <section className="section-padding bg-slate-50">

        <div className="container-page">

          <SectionHeading
            eyebrow="Why FinBud"
            title="Why Choose FinBud Financial?"
            subtitle="We don't just connect you to lenders — we guide you to the right financial decision."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {siteData.whyChooseUs.map((item) => {

              const Icon =
                iconMap[item.icon] || ShieldCheck;

              return (

                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 transition-all hover:shadow-lg hover:border-[var(--brand-primary-light)]"
                >

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor:
                        'rgba(16, 185, 129, 0.1)',
                    }}
                  >

                    <Icon
                      className="w-6 h-6"
                      strokeWidth={2}
                      style={{
                        color:
                          'var(--brand-secondary)',
                      }}
                    />

                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {item.description}
                  </p>

                </div>

              );
            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="section-padding bg-white">

        <div className="container-page">

          <SectionHeading
            eyebrow="Simple Process"
            title="How It Works"
            subtitle="Getting the right loan is easier than you think. Here's our four-step process."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {siteData.howItWorks.map((step, index) => {

              const Icon =
                iconMap[step.icon] || FileText;

              return (

                <div
                  key={step.step}
                  className="relative"
                >

                  {index <
                    siteData.howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 border-t-2 border-dashed border-slate-200" />
                  )}

                  <div className="relative bg-white rounded-2xl p-6 border border-slate-200 text-center">

                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative"
                      style={{
                        backgroundColor:
                          'rgba(11, 79, 108, 0.08)',
                      }}
                    >

                      <Icon
                        className="w-7 h-7"
                        strokeWidth={2}
                        style={{
                          color:
                            'var(--brand-primary)',
                        }}
                      />

                      <span
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                        style={{
                          backgroundColor:
                            'var(--brand-secondary)',
                        }}
                      >
                        {step.step}
                      </span>

                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {step.description}
                    </p>

                  </div>

                </div>

              );
            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          PARTNERS
      ========================================================= */}
      <section className="py-20 bg-white overflow-hidden">

        <div className="container-page mb-12 text-center">

          <h2 className="text-4xl md:text-5xl font-black text-[#0A1628] leading-tight mb-4">

            We Collaborate With

            <br className="hidden md:block" />

            Leading Banks & NBFCs

          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto">
            Access the best loan offers across India's top
            financial institutions through our trusted network.
          </p>

        </div>

        <div className="relative flex overflow-x-hidden group pb-4">

          <div className="animate-scroll flex gap-6 px-3">

            {[...Array(2)].map((_, i) => (

              <div
                key={i}
                className="flex gap-6"
              >

                {[
                  {
                    name: 'Fibe',
                    logo: 'https://www.finbudfinancial.com/banks/fibe.png',
                  },
                  {
                    name: 'Finnable',
                    logo: 'https://www.finbudfinancial.com/banks/finnable.png',
                  },
                  {
                    name: 'Poonawalla',
                    logo: 'https://www.finbudfinancial.com/banks/poonawalla.png',
                  },
                  {
                    name: 'IndusInd',
                    logo: 'https://www.finbudfinancial.com/banks/indusind.png',
                  },
                  {
                    name: 'Yes Bank',
                    logo: 'https://www.finbudfinancial.com/banks/yes.png',
                  },
                  {
                    name: 'Bajaj Finserv',
                    logo: 'https://www.finbudfinancial.com/banks/bajaj.png',
                  },
                  {
                    name: 'HDFC Bank',
                    logo: 'https://www.finbudfinancial.com/banks/hdfc.png',
                  },
                  {
                    name: 'ICICI Bank',
                    logo: 'https://www.finbudfinancial.com/banks/icici.png',
                  },
                  {
                    name: 'Axis Bank',
                    logo: 'https://www.finbudfinancial.com/banks/axis.png',
                  },
                  {
                    name: 'Kotak',
                    logo: 'https://www.finbudfinancial.com/banks/kotak.png',
                  },
                  {
                    name: 'IDFC FIRST',
                    logo: 'https://www.finbudfinancial.com/banks/idfc.png',
                  },
                  {
                    name: 'InCred',
                    logo: 'https://www.finbudfinancial.com/banks/Incred.png',
                  },
                ].map((partner, index) => (

                  <div
                    key={`${i}-${index}`}
                    className="flex items-center gap-4 bg-white rounded-2xl border border-slate-200/80 px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] min-w-[200px] hover:border-slate-300 transition-colors"
                  >

                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">

                      <img
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />

                    </div>

                    <span className="font-bold text-slate-800 text-sm whitespace-nowrap">
                      {partner.name}
                    </span>

                  </div>

                ))}

              </div>

            ))}

          </div>

          {/* Gradient Fades */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        </div>

        <div className="text-center mt-8">

          <Link
            to="/partners"
            className="btn-outline border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
          >

            View All Partners

            <ArrowRight className="w-4 h-4 ml-1" />

          </Link>

        </div>

      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <section className="section-padding bg-white">

        <div className="container-page">

          <SectionHeading
            eyebrow="Client Stories"
            title="What Our Clients Say"
            subtitle="Real experiences from people we've helped find the right financial solution."
          />

          <div className="grid md:grid-cols-3 gap-6">

            {siteData.testimonials.map((testimonial) => (

              <div
                key={testimonial.name}
                className="card p-6"
              >

                <Quote className="w-8 h-8 text-[var(--brand-secondary)] mb-4 opacity-50" />

                <div className="flex gap-1 mb-4">

                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, i) => (

                    <Star
                      key={i}
                      className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                    />

                  ))}

                </div>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{
                      backgroundColor:
                        'var(--brand-primary)',
                    }}
                  >
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  <div>

                    <div className="font-semibold text-sm text-slate-900">
                      {testimonial.name}
                    </div>

                    <div className="text-xs text-slate-500">
                      {testimonial.role}
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          TEAM PREVIEW
      ========================================================= */}
      <section className="section-padding bg-slate-50">

        <div className="container-page">

          <SectionHeading
            eyebrow="Our People"
            title="Meet the Team"
            subtitle="Experienced professionals dedicated to helping you make the right financial decisions."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {siteData.team.map((member) => (

              <div
                key={member.name}
                className="card p-6 text-center"
              >

                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                  }}
                >
                  {member.initials}
                </div>

                <h3 className="font-bold text-slate-900">
                  {member.name}
                </h3>

                <p className="text-sm text-[var(--brand-primary)] font-medium mb-3">
                  {member.designation}
                </p>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {member.bio}
                </p>

              </div>

            ))}

          </div>

          <div className="text-center mt-10">

            <Link
              to="/team"
              className="btn-outline"
            >
              Meet the Full Team

              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>

      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <CTA />

    </>
  );
}