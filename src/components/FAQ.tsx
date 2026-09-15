import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl border transition-all duration-200 ${
            openIndex === index ? 'border-[var(--brand-primary)] shadow-sm' : 'border-slate-200'
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-slate-900">{item.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed animate-fade-in">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
