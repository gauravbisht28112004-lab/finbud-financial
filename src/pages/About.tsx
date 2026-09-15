import { Target, Eye, Heart, CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import CTA from '@/components/CTA';
import { siteData } from '@/data/site';

const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Transparency: CheckCircle,
  'Client First': Heart,
  Expertise: Target,
  Accessibility: Eye,
};

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #073447 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3" style={{ backgroundColor: '#10B981' }} />
        <div className="container-page relative text-center">
          <span className="heading-eyebrow" style={{ color: '#10B981' }}>About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Who We Are</h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">{siteData.description}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="heading-eyebrow">Our Story</span>
              <h2 className="heading-2 mb-6">From Confusion to Clarity</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">{siteData.story}</p>
              <p className="text-slate-600 leading-relaxed">
                We don't lend directly. Instead, we partner with India's leading banks and NBFCs to bring you the best offers. Our role is to understand your needs, match you with the right product, and guide you through the process — start to finish.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {siteData.stats.map((stat) => (
                <div key={stat.label} className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200">
                  <div className="text-3xl font-bold text-[var(--brand-primary)]">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(11, 79, 108, 0.08)' }}>
                <Target className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">{siteData.mission}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                <Eye className="w-6 h-6" style={{ color: 'var(--brand-secondary)' }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">{siteData.vision}</p>
            </div>
          </div>

          <SectionHeading eyebrow="What Drives Us" title="Our Core Values" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.values.map((value) => {
              const Icon = valueIcons[value.title] || CheckCircle;
              return (
                <div key={value.title} className="bg-white rounded-2xl p-6 border border-slate-200">
                  <Icon className="w-8 h-8 mb-4" style={{ color: 'var(--brand-secondary)' }} />
                  <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
