import CTA from '@/components/CTA';
import { siteData } from '@/data/site';

export default function Team() {
  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #073447 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3" style={{ backgroundColor: '#10B981' }} />
        <div className="container-page relative text-center">
          <span className="heading-eyebrow" style={{ color: '#10B981' }}>Our People</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet the Team</h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            The experienced professionals behind FinBud Financial, dedicated to guiding you to the right financial decisions.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative inline-block mb-5">
                  <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-white font-bold text-3xl transition-transform group-hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))' }}>
                    {member.initials}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm font-medium text-[var(--brand-primary)] mb-3">{member.designation}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Want to Join Our Team?</h3>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              We're always looking for passionate individuals who want to make financial services more accessible. Reach out to us.
            </p>
            <a href={`mailto:${siteData.email}`} className="btn-primary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
