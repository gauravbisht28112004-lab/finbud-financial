import { useState, useMemo } from 'react';
import { CreditCard, Info } from 'lucide-react';

export default function OverdraftCalculator() {
  const [limit, setLimit] = useState(500000);
  const [utilised, setUtilised] = useState(200000);
  const [rate, setRate] = useState(12);
  const [days, setDays] = useState(30);
  const [odType, setOdType] = useState<'standard' | 'dropline'>('standard');
  const [droplinePct, setDroplinePct] = useState(10);

  const { dailyInterest, totalInterest, effectiveLimit } = useMemo(() => {
    const usedAmount = Math.min(utilised, limit);
    const dailyRate = rate / 100 / 365;
    const dailyInt = usedAmount * dailyRate;
    const total = dailyInt * days;

    let effLimit = limit;
    if (odType === 'dropline') {
      effLimit = limit * (1 - droplinePct / 100);
    }

    return {
      dailyInterest: Math.round(dailyInt),
      totalInterest: Math.round(total),
      effectiveLimit: Math.round(effLimit),
    };
  }, [limit, utilised, rate, days, odType, droplinePct]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
          <CreditCard className="w-5 h-5" style={{ color: 'var(--brand-accent)' }} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Overdraft Interest Calculator</h3>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 p-1 rounded-xl bg-slate-100">
          <button
            onClick={() => setOdType('standard')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              odType === 'standard' ? 'bg-white text-[var(--brand-primary)] shadow-sm' : 'text-slate-500'
            }`}
          >
            Standard OD
          </button>
          <button
            onClick={() => setOdType('dropline')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              odType === 'dropline' ? 'bg-white text-[var(--brand-primary)] shadow-sm' : 'text-slate-500'
            }`}
          >
            Dropline OD
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">OD Limit</label>
            <span className="text-sm font-bold text-[var(--brand-primary)]">₹ {limit.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min={100000}
            max={5000000}
            step={50000}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full accent-[var(--brand-primary)]"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>₹ 1,00,000</span>
            <span>₹ 50,00,000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">Amount Utilised</label>
            <span className="text-sm font-bold text-[var(--brand-primary)]">₹ {utilised.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min={0}
            max={limit}
            step={10000}
            value={utilised}
            onChange={(e) => setUtilised(Number(e.target.value))}
            className="w-full accent-[var(--brand-primary)]"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>₹ 0</span>
            <span>₹ {limit.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700">Rate (% p.a.)</label>
              <span className="text-sm font-bold text-[var(--brand-primary)]">{rate}%</span>
            </div>
            <input
              type="range"
              min={8}
              max={24}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-[var(--brand-primary)]"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700">Usage Days</label>
              <span className="text-sm font-bold text-[var(--brand-primary)]">{days} days</span>
            </div>
            <input
              type="range"
              min={1}
              max={365}
              step={1}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-[var(--brand-primary)]"
            />
          </div>
        </div>

        {odType === 'dropline' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700">Annual Dropline Rate</label>
              <span className="text-sm font-bold text-[var(--brand-primary)]">{droplinePct}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={25}
              step={1}
              value={droplinePct}
              onChange={(e) => setDroplinePct(Number(e.target.value))}
              className="w-full accent-[var(--brand-primary)]"
            />
            <p className="text-xs text-slate-400 mt-1">Limit reduces by this percentage each year</p>
          </div>
        )}
      </div>

      <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
        <div className="text-center mb-6">
          <div className="text-sm text-slate-500 mb-1">Total Interest Payable</div>
          <div className="text-4xl font-bold text-[var(--brand-accent)]">₹ {totalInterest.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-400 mt-1">for {days} days on ₹ {utilised.toLocaleString('en-IN')} utilised</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-sm text-slate-600">Daily Interest</span>
            <span className="font-semibold text-slate-900">₹ {dailyInterest.toLocaleString('en-IN')}/day</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-sm text-slate-600">Amount Utilised</span>
            <span className="font-semibold text-slate-900">₹ {Math.min(utilised, limit).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-sm text-slate-600">Unutilised Limit</span>
            <span className="font-semibold text-slate-900">₹ {Math.max(0, limit - utilised).toLocaleString('en-IN')}</span>
          </div>
          {odType === 'dropline' && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Effective Limit (after dropline)</span>
              <span className="font-semibold text-slate-900">₹ {effectiveLimit.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Overdraft interest is calculated daily on the utilised amount only. Repay anytime to reduce interest — no fixed EMI.
          </p>
        </div>
      </div>
    </div>
  );
}
