import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { siteData } from '@/data/site';

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl px-6 py-16 md:px-12 md:py-20"
          style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))' }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
            style={{ backgroundColor: 'var(--brand-secondary)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"
            style={{ backgroundColor: 'var(--brand-accent)' }} />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to find the right loan?
              </h2>
              <p className="text-slate-200 text-lg mb-8">
                Apply online in minutes. Our team will guide you to the best loan offer from our lending partners.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/apply" className="btn-accent">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href={`tel:${siteData.phone}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all">
                  <Phone className="w-5 h-5" />
                  {siteData.phone}
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                {siteData.stats.map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
