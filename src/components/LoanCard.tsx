import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { User, Home, Briefcase, CreditCard } from 'lucide-react';
import type { LoanProduct } from '@/data/loans';

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  User,
  Home,
  Briefcase,
  CreditCard,
};

export default function LoanCard({ loan }: { loan: LoanProduct }) {
  const Icon = iconMap[loan.icon] || User;

  return (
    <div className="card p-6 flex flex-col group">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
        style={{ backgroundColor: 'rgba(11, 79, 108, 0.08)' }}>
        <Icon className="w-6 h-6" strokeWidth={2} style={{ color: 'var(--brand-primary)' }} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{loan.name}</h3>
      <p className="text-sm text-slate-500 mb-4">{loan.tagline}</p>
      <p className="text-sm text-slate-600 mb-5 flex-1">{loan.description}</p>

      <div className="space-y-2 mb-6">
        {loan.benefits.slice(0, 3).map((benefit) => (
          <div key={benefit} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[var(--brand-secondary)] mt-0.5 shrink-0" />
            <span className="text-sm text-slate-600">{benefit}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          to={`/loans/${loan.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border-2 border-slate-200 text-slate-700 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all"
        >
          View Details
        </Link>
        <Link
          to="/apply"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          Apply
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
