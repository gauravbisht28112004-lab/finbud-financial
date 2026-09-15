import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, User, Home, Briefcase, CreditCard, Clock, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { getLoanBySlug } from '@/data/loans';

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  User, Home, Briefcase, CreditCard,
};

export default function LoanDetail() {
  const { slug } = useParams<{ slug: string }>();
  const loan = slug ? getLoanBySlug(slug) : undefined;

  if (!loan) return <Navigate to="/" replace />;

  const Icon = iconMap[loan.icon] || User;

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #073447 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3" style={{ backgroundColor: '#10B981' }} />
        <div className="container-page relative">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-6">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link to="/loans/personal-loan" className="hover:text-white">Loans</Link>
              <span>/</span>
              <span className="text-white">{loan.shortName}</span>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
              <Icon className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{loan.name}</h1>
            <p className="text-lg text-slate-200 mb-8">{loan.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/apply" className="btn-accent">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/calculators" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all">
                Calculate EMI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {loan.features.map((feature) => (
              <div key={feature.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <ShieldCheck className="w-8 h-8 mb-3" style={{ color: 'var(--brand-secondary)' }} />
                <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading eyebrow="Overview" title={`Benefits of ${loan.name}`} center={false} />
              <div className="space-y-3">
                {loan.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--brand-secondary)] mt-0.5 shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Who is this for?</h3>
                <p className="text-slate-600">{loan.suitableFor}</p>
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Requirements" title="Eligibility Criteria" center={false} />
              <div className="space-y-3 mb-8">
                {loan.eligibility.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(11, 79, 108, 0.1)' }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }} />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <SectionHeading eyebrow="Paperwork" title="Required Documents" center={false} />
              <div className="space-y-3">
                {loan.documents.map((doc) => (
                  <div key={doc} className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 shrink-0" />
                    <span className="text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <SectionHeading eyebrow="Step by Step" title="Application Process" subtitle="A clear, guided process from application to disbursal." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loan.process.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white font-bold"
                    style={{ backgroundColor: 'var(--brand-primary)' }}>
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{step.step}</h3>
                  <p className="text-sm text-slate-600">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <FAQ items={loan.faqs} />
        </div>
      </section>

      <CTA />
    </>
  );
}
