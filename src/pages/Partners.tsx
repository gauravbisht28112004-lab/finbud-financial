import CTA from '@/components/CTA';
import { siteData } from '@/data/site';

export default function Partners() {
  // Partner logo paths
  const partnerLogos: Record<string, string> = {
    'HDFC Bank': '/partners/hdfc-bank.png',
    'ICICI Bank': '/partners/icici-bank.png',
    'Axis Bank': '/partners/axis-bank.png',
    'Kotak Mahindra': '/partners/kotak-mahindra.png',
    'Bajaj Finserv': '/partners/bajaj-finserv.png',
    'Tata Capital': '/partners/tata-capital.png',
    'Lendingkart': '/partners/lendingkart.png',
    'Fullerton India': '/partners/fullerton-india.png',
    'IndusInd Bank': '/partners/indusind-bank.png',
    'Yes Bank': '/partners/yes-bank.png',
    'IDFC First Bank': '/partners/idfc-first-bank.png',
    'Piramal Capital': '/partners/piramal-capital.png',
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{
          background:
            'linear-gradient(135deg, #0B4F6C 0%, #073447 100%)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3"
          style={{ backgroundColor: '#10B981' }}
        />

        <div className="container-page relative text-center">
          <span
            className="heading-eyebrow"
            style={{ color: '#10B981' }}
          >
            Our Network
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Lending Partners
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            We've partnered with India's leading banks and NBFCs to give
            you access to the best loan products through a single
            application.
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.partners.map((partner) => {
              const logo = partnerLogos[partner.name];

              return (
                <div key={partner.name} className="card p-6">
                  <div className="flex items-start gap-4">

                    {/* Partner Logo */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 bg-white overflow-hidden"
                    >
                      {logo ? (
                        <img
                          src={logo}
                          alt={`${partner.name} logo`}
                          className="w-11 h-11 object-contain"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-lg flex items-center justify-center text-xs font-bold text-[var(--brand-primary)] bg-slate-100">
                          {partner.name
                            .split(' ')
                            .map((word) => word[0])
                            .join('')
                            .slice(0, 3)}
                        </div>
                      )}
                    </div>

                    {/* Partner Information */}
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900">
                        {partner.name}
                      </h3>

                      <span
                        className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1"
                        style={{
                          backgroundColor:
                            partner.type === 'Bank'
                              ? 'rgba(11, 79, 108, 0.1)'
                              : 'rgba(16, 185, 129, 0.1)',
                          color:
                            partner.type === 'Bank'
                              ? 'var(--brand-primary)'
                              : 'var(--brand-secondary)',
                        }}
                      >
                        {partner.type}
                      </span>

                      <p className="text-sm text-slate-600 mt-3">
                        {partner.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Partner Network Information */}
          <div className="mt-12 bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              How Our Partner Network Works
            </h3>

            <p className="text-slate-600 leading-relaxed">
              We act as a bridge between you and our lending partners.
              When you apply through FinBud Financial, we assess your
              profile and share it with the partners whose products best
              match your needs. This means you get multiple offers to
              compare — all from a single application. We don't charge you
              for this service; our partners compensate us for bringing
              qualified borrowers.
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}