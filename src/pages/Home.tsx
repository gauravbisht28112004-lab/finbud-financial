import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote, ShieldCheck, Users, Zap, Handshake, Calculator, FileText, Search, MessageSquare, CheckCircle, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import LoanCard from '@/components/LoanCard';
import CTA from '@/components/CTA';
import { siteData } from '@/data/site';
import { loanProducts } from '@/data/loans';

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
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
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary-dark) 100%)' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 -translate-y-1/3 translate-x-1/3"
          style={{ backgroundColor: 'var(--brand-primary-light)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 translate-y-1/3 -translate-x-1/3"
          style={{ backgroundColor: 'var(--brand-accent)' }} />

        <div className="container-page relative py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-secondary)] animate-pulse" />
                Trusted by 500+ clients across India
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Smart Financial Solutions, <span className="text-[var(--brand-secondary)]">Simplified</span>
              </h1>
              <p className="text-lg text-slate-200 mb-8 max-w-xl">
                {siteData.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/apply" className="btn-accent">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/loans/personal-loan" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all">
                  Explore Loan Solutions
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-4 gap-4 max-w-lg">
                {siteData.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-300 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-slate-300">Quick Loan Check</div>
                      <div className="text-white font-semibold text-lg">Plan your EMI</div>
                    </div>
                    <Calculator className="w-8 h-8 text-[var(--brand-secondary)]" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-300 mb-1 block">Loan Amount</label>
                      <div className="bg-white/10 rounded-lg px-4 py-3 text-white text-lg font-semibold">₹ 5,00,000</div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 mb-1 block">Tenure (months)</label>
                      <div className="bg-white/10 rounded-lg px-4 py-3 text-white text-lg font-semibold">60</div>
                    </div>
                    <div className="bg-[var(--brand-secondary)]/20 rounded-lg p-4 border border-[var(--brand-secondary)]/30">
                      <div className="text-sm text-slate-200">Monthly EMI</div>
                      <div className="text-2xl font-bold text-white">₹ 10,832</div>
                    </div>
                    <Link to="/calculators" className="btn-secondary w-full text-sm">
                      Try All Calculators
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Products */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Products"
            title="Loan Solutions for Every Need"
            subtitle="From personal expenses to business growth, we help you find the right loan product from our lending partners."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanProducts.map((loan) => (
              <LoanCard key={loan.slug} loan={loan} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why FinBud"
            title="Why Choose FinBud Financial?"
            subtitle="We don't just connect you to lenders — we guide you to the right financial decision."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.whyChooseUs.map((item) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              return (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-200 transition-all hover:shadow-lg hover:border-[var(--brand-primary-light)]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                    <Icon className="w-6 h-6" strokeWidth={2} style={{ color: 'var(--brand-secondary)' }} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Simple Process"
            title="How It Works"
            subtitle="Getting the right loan is easier than you think. Here's our four-step process."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.howItWorks.map((step, index) => {
              const Icon = iconMap[step.icon] || FileText;
              return (
                <div key={step.step} className="relative">
                  {index < siteData.howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 border-t-2 border-dashed border-slate-200" />
                  )}
                  <div className="relative bg-white rounded-2xl p-6 border border-slate-200 text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative"
                      style={{ backgroundColor: 'rgba(11, 79, 108, 0.08)' }}>
                      <Icon className="w-7 h-7" strokeWidth={2} style={{ color: 'var(--brand-primary)' }} />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                        style={{ backgroundColor: 'var(--brand-secondary)' }}>
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Preview - Animated Marquee */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container-page mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1628] leading-tight mb-4">
            We Collaborate With <br className="hidden md:block" />
            Leading Banks & NBFCs
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Access the best loan offers across India's top financial institutions through our trusted network.
          </p>
        </div>

        <div className="relative flex overflow-x-hidden group pb-4">
          <div className="animate-scroll flex gap-6 px-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { name: 'Fibe', logo: 'https://www.finbudfinancial.com/banks/fibe.png' },
                  { name: 'Finnable', logo: 'https://www.finbudfinancial.com/banks/finnable.png' },
                  { name: 'Poonawalla', logo: 'https://www.finbudfinancial.com/banks/poonawalla.png' },
                  { name: 'IndusInd', logo: 'https://www.finbudfinancial.com/banks/indusind.png' },
                  { name: 'Yes Bank', logo: 'https://www.finbudfinancial.com/banks/yes.png' },
                  { name: 'Bajaj Finserv', logo: 'https://www.finbudfinancial.com/banks/bajaj.png' },
                  { name: 'HDFC Bank', logo: 'https://www.finbudfinancial.com/banks/hdfc.png' },
                  { name: 'ICICI Bank', logo: 'https://www.finbudfinancial.com/banks/icici.png' },
                  { name: 'Axis Bank', logo: 'https://www.finbudfinancial.com/banks/axis.png' },
                  { name: 'Kotak', logo: 'https://www.finbudfinancial.com/banks/kotak.png' },
                  { name: 'IDFC FIRST', logo: 'https://www.finbudfinancial.com/banks/idfc.png' },
                  { name: 'InCred', logo: 'https://www.finbudfinancial.com/banks/Incred.png' },
                ].map((partner, index) => (
                  <div 
                    key={`${i}-${index}`} 
                    className="flex items-center gap-4 bg-white rounded-2xl border border-slate-200/80 px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] min-w-[200px] hover:border-slate-300 transition-colors"
                  >
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                      <img src={partner.logo} alt={`${partner.name} Logo`} className="max-w-full max-h-full object-contain" loading="lazy" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm whitespace-nowrap">{partner.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Gradient Fades for Marquee */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/partners" className="btn-outline border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300">
            View All Partners
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Client Stories"
            title="What Our Clients Say"
            subtitle="Real experiences from people we've helped find the right financial solution."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {siteData.testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card p-6">
                <Quote className="w-8 h-8 text-[var(--brand-secondary)] mb-4 opacity-50" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: 'var(--brand-primary)' }}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our People"
            title="Meet the Team"
            subtitle="Experienced professionals dedicated to helping you make the right financial decisions."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.team.map((member) => (
              <div key={member.name} className="card p-6 text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
                  style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))' }}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm text-[var(--brand-primary)] font-medium mb-3">{member.designation}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/team" className="btn-outline">
              Meet the Full Team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
