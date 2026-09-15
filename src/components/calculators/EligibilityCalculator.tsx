import { useState, useMemo } from 'react';
import { UserCheck } from 'lucide-react';

export default function EligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(0);
  const [interestRate, setInterestRate] = useState(11);
  const [tenure, setTenure] = useState(60);

  const { eligibleAmount, maxEMI, foir } = useMemo(() => {
    const maxFoir = 0.5;
    const availableIncome = monthlyIncome * maxFoir - existingEMI;
    const maxEmi = Math.max(0, availableIncome);
    const r = interestRate / 12 / 100;
    const n = tenure;
    const eligible = r > 0 && n > 0
      ? Math.round((maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n)))
      : Math.round(maxEmi * n);
    return {
      eligibleAmount: Math.max(0, eligible),
      maxEMI: Math.round(maxEmi),
      foir: maxFoir * 100,
    };
  }, [monthlyIncome, existingEMI, interestRate, tenure]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
          <UserCheck className="w-5 h-5" style={{ color: 'var(--brand-secondary)' }} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Eligibility Calculator</h3>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">Monthly Income</label>
            <span className="text-sm font-bold text-[var(--brand-primary)]">₹ {monthlyIncome.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min={10000}
            max={500000}
            step={5000}
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full accent-[var(--brand-primary)]"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>₹ 10,000</span>
            <span>₹ 5,00,000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">Existing EMI Obligations</label>
            <span className="text-sm font-bold text-[var(--brand-primary)]">₹ {existingEMI.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100000}
            step={1000}
            value={existingEMI}
            onChange={(e) => setExistingEMI(Number(e.target.value))}
            className="w-full accent-[var(--brand-primary)]"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>₹ 0</span>
            <span>₹ 1,00,000</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700">Rate (%)</label>
              <span className="text-sm font-bold text-[var(--brand-primary)]">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={6}
              max={24}
              step={0.5}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[var(--brand-primary)]"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700">Tenure</label>
              <span className="text-sm font-bold text-[var(--brand-primary)]">{tenure} mo</span>
            </div>
            <input
              type="range"
              min={12}
              max={360}
              step={12}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-[var(--brand-primary)]"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
        <div className="text-center mb-6">
          <div className="text-sm text-slate-500 mb-1">Estimated Loan Eligibility</div>
          <div className="text-4xl font-bold text-[var(--brand-secondary)]">₹ {eligibleAmount.toLocaleString('en-IN')}</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-sm text-slate-600">Max Monthly EMI Capacity</span>
            <span className="font-semibold text-slate-900">₹ {maxEMI.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-sm text-slate-600">FOIR (Fixed Obligation to Income Ratio)</span>
            <span className="font-semibold text-slate-900">{foir}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Available Monthly Income for EMI</span>
            <span className="font-semibold text-slate-900">₹ {Math.max(0, monthlyIncome * 0.5 - existingEMI).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-4 leading-relaxed">
          This is an estimate based on a 50% FOIR assumption. Actual eligibility may vary based on credit score, employer profile, age, and lender-specific policies.
        </p>
      </div>
    </div>
  );
}
