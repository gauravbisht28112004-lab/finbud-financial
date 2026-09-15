import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import LoanCard from '@/components/LoanCard';
import CTA from '@/components/CTA';
import { loanProducts } from '@/data/loans';

export default function Loans() {
  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #073447 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3" style={{ backgroundColor: '#10B981' }} />
        <div className="container-page relative text-center">
          <span className="heading-eyebrow" style={{ color: '#10B981' }}>Products</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Loan Solutions</h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Explore our range of loan products. Each one is designed to meet specific financial needs with transparent terms and expert guidance.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanProducts.map((loan) => (
              <LoanCard key={loan.slug} loan={loan} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
