import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Send, CheckCircle, AlertCircle, Shield, FileText, Clock } from 'lucide-react';
import { loanProducts } from '@/data/loans';
import { supabase } from '@/lib/supabase';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  loanType: string;
  loanAmount: string;
  employmentType: string;
  monthlyIncome: string;
  city: string;
  message: string;
  consent: boolean;
}

const initialForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  loanType: '',
  loanAmount: '',
  employmentType: '',
  monthlyIncome: '',
  city: '',
  message: '',
  consent: false,
};

export default function Apply() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.loanType) e.loanType = 'Please select a loan type';
    if (!form.loanAmount.trim()) e.loanAmount = 'Loan amount is required';
    else if (isNaN(Number(form.loanAmount)) || Number(form.loanAmount) <= 0) e.loanAmount = 'Enter a valid amount';
    if (!form.employmentType) e.employmentType = 'Please select employment type';
    if (!form.monthlyIncome.trim()) e.monthlyIncome = 'Monthly income is required';
    else if (isNaN(Number(form.monthlyIncome)) || Number(form.monthlyIncome) <= 0) e.monthlyIncome = 'Enter a valid amount';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.consent) e.consent = 'Please accept the privacy consent';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('applications').insert({
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        loan_type: form.loanType,
        loan_amount: Number(form.loanAmount),
        employment_type: form.employmentType,
        monthly_income: Number(form.monthlyIncome),
        city: form.city,
        message: form.message || null,
        consent: form.consent,
      });
      if (error) throw error;
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  const infoCards = [
    { icon: Shield, title: 'Secure & Confidential', description: 'Your data is encrypted and never shared without consent.' },
    { icon: FileText, title: 'Minimal Documentation', description: 'Only essential documents needed to process your application.' },
    { icon: Clock, title: 'Quick Response', description: 'Our team contacts you within 24 hours of submission.' },
  ];

  if (status === 'success') {
    return (
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-50">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h1>
            <p className="text-slate-600 mb-8">
              Thank you for choosing FinBud Financial. Our team will review your application and contact you within 24 hours to discuss the next steps.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/" className="btn-primary">Back to Home</Link>
              <Link to="/calculators" className="btn-outline">Explore Calculators</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #073447 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3" style={{ backgroundColor: '#10B981' }} />
        <div className="container-page relative text-center">
          <span className="heading-eyebrow" style={{ color: '#10B981' }}>Get Started</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Apply Now</h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Fill out the form below and our team will guide you to the best loan offer from our lending partners.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              {infoCards.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.title} className="bg-white rounded-2xl p-6 border border-slate-200">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(11, 79, 108, 0.08)' }}>
                      <Icon className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{info.title}</h3>
                    <p className="text-sm text-slate-600">{info.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-6 animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800">Submission failed.</p>
                      <p className="text-sm text-red-700">Please try again or call us at our helpline.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className={`input-field ${errors.fullName ? 'border-red-400' : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone *</label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="loanType" className="block text-sm font-medium text-slate-700 mb-1.5">Loan Type *</label>
                    <select
                      id="loanType"
                      value={form.loanType}
                      onChange={(e) => handleChange('loanType', e.target.value)}
                      className={`input-field ${errors.loanType ? 'border-red-400' : ''}`}
                    >
                      <option value="">Select a loan type</option>
                      {loanProducts.map((loan) => (
                        <option key={loan.slug} value={loan.name}>{loan.name}</option>
                      ))}
                    </select>
                    {errors.loanType && <p className="text-xs text-red-500 mt-1">{errors.loanType}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="loanAmount" className="block text-sm font-medium text-slate-700 mb-1.5">Loan Amount (₹) *</label>
                      <input
                        id="loanAmount"
                        type="text"
                        value={form.loanAmount}
                        onChange={(e) => handleChange('loanAmount', e.target.value)}
                        className={`input-field ${errors.loanAmount ? 'border-red-400' : ''}`}
                        placeholder="e.g. 500000"
                      />
                      {errors.loanAmount && <p className="text-xs text-red-500 mt-1">{errors.loanAmount}</p>}
                    </div>
                    <div>
                      <label htmlFor="monthlyIncome" className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Income (₹) *</label>
                      <input
                        id="monthlyIncome"
                        type="text"
                        value={form.monthlyIncome}
                        onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                        className={`input-field ${errors.monthlyIncome ? 'border-red-400' : ''}`}
                        placeholder="e.g. 50000"
                      />
                      {errors.monthlyIncome && <p className="text-xs text-red-500 mt-1">{errors.monthlyIncome}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="employmentType" className="block text-sm font-medium text-slate-700 mb-1.5">Employment Type *</label>
                      <select
                        id="employmentType"
                        value={form.employmentType}
                        onChange={(e) => handleChange('employmentType', e.target.value)}
                        className={`input-field ${errors.employmentType ? 'border-red-400' : ''}`}
                      >
                        <option value="">Select type</option>
                        <option value="Salaried">Salaried</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Business Owner">Business Owner</option>
                        <option value="Professional">Professional</option>
                      </select>
                      {errors.employmentType && <p className="text-xs text-red-500 mt-1">{errors.employmentType}</p>}
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1.5">City *</label>
                      <input
                        id="city"
                        type="text"
                        value={form.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className={`input-field ${errors.city ? 'border-red-400' : ''}`}
                        placeholder="e.g. Mumbai"
                      />
                      {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Additional Details (optional)</label>
                    <textarea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="input-field resize-none"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => handleChange('consent', e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[var(--brand-primary)]"
                      />
                      <span className="text-sm text-slate-600">
                        I consent to FinBud Financial contacting me regarding my loan application and sharing my details with lending partners. I have read and agree to the <Link to="/privacy" className="text-[var(--brand-primary)] underline">Privacy Policy</Link>.
                      </span>
                    </label>
                    {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
