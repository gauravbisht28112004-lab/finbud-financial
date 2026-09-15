import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, UserCheck, CreditCard } from 'lucide-react';
import EMICalculator from '@/components/calculators/EMICalculator';
import EligibilityCalculator from '@/components/calculators/EligibilityCalculator';
import OverdraftCalculator from '@/components/calculators/OverdraftCalculator';
import CTA from '@/components/CTA';

const tabs = [
  { id: 'emi', label: 'EMI Calculator', icon: Calculator },
  { id: 'eligibility', label: 'Eligibility Calculator', icon: UserCheck },
  { id: 'overdraft', label: 'Overdraft Calculator', icon: CreditCard },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<TabId>('emi');

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #073447 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3" style={{ backgroundColor: '#10B981' }} />
        <div className="container-page relative text-center">
          <span className="heading-eyebrow" style={{ color: '#10B981' }}>Financial Tools</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Loan Calculators</h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Plan your finances before you apply. Use our calculators to estimate EMIs, check eligibility, and understand overdraft interest.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    style={activeTab === tab.id ? { backgroundColor: 'var(--brand-primary)' } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="animate-fade-in" key={activeTab}>
              {activeTab === 'emi' && <EMICalculator />}
              {activeTab === 'eligibility' && <EligibilityCalculator />}
              {activeTab === 'overdraft' && <OverdraftCalculator />}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 mb-4">Ready to move forward?</p>
              <Link to="/apply" className="btn-primary">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
