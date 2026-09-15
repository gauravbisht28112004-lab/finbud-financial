import { useState, useMemo } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

export default function EMICalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(11);
  const [tenure, setTenure] = useState(60);

  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    
    // Handle 0% interest case to prevent NaN
    const emiVal = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emiVal * n;
    
    return {
      emi: Math.round(emiVal),
      totalInterest: Math.round(total - amount),
      totalPayable: Math.round(total),
    };
  }, [amount, rate, tenure]);

  const principalPct = (amount / totalPayable) * 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--brand-primary)]/10">
          <Calculator className="w-6 h-6 text-[var(--brand-primary)]" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">EMI Calculator</h3>
          <p className="text-sm text-slate-500">Calculate your monthly installments instantly</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Inputs */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-end mb-3">
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Loan Amount</label>
              <div className="bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
                <span className="font-bold text-[var(--brand-primary)] text-lg">₹ {amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand-primary)]"
            />
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-2">
              <span>₹ 50,000</span>
              <span>₹ 50,00,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-3">
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Interest Rate (% p.a.)</label>
              <div className="bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
                <span className="font-bold text-[var(--brand-primary)] text-lg">{rate}%</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={24}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand-primary)]"
            />
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-2">
              <span>0%</span>
              <span>24%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-3">
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Tenure (months)</label>
              <div className="bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
                <span className="font-bold text-[var(--brand-primary)] text-lg">{tenure} mos</span>
              </div>
            </div>
            <input
              type="range"
              min={6}
              max={360}
              step={6}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand-primary)]"
            />
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-2">
              <span>6 months</span>
              <span>360 months</span>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 h-full flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Your Monthly EMI</div>
            <div className="text-5xl font-extrabold text-[var(--brand-primary)]">
              ₹ {emi.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
              <span className="text-sm font-medium text-slate-600">Principal Amount</span>
              <span className="font-semibold text-slate-900">₹ {amount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
              <span className="text-sm font-medium text-slate-600">Total Interest</span>
              <span className="font-semibold text-slate-900">₹ {totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-bold text-slate-800">Total Payable</span>
              <span className="font-bold text-lg text-slate-900">₹ {totalPayable.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[var(--brand-secondary)]" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Principal vs Interest</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden flex bg-slate-200">
              <div className="h-full transition-all duration-300 ease-out" style={{ width: `${principalPct}%`, backgroundColor: 'var(--brand-primary)' }} />
              <div className="h-full transition-all duration-300 ease-out" style={{ width: `${100 - principalPct}%`, backgroundColor: 'var(--brand-secondary)' }} />
            </div>
            <div className="flex justify-between text-xs font-medium mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[var(--brand-primary)]"></div>
                <span className="text-slate-600">Principal ({principalPct.toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[var(--brand-secondary)]"></div>
                <span className="text-slate-600">Interest ({(100 - principalPct).toFixed(0)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-8 pt-4 border-t border-slate-100">
        <p className="text-[11px] text-slate-400 leading-relaxed italic text-center">
          *These calculators provide illustrative estimates for planning purposes only. Actual rates, fees, eligibility and repayment terms depend on the respective lender.
        </p>
      </div>
    </div>
  );
}
