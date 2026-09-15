import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { siteData } from '@/data/site';
import { supabase } from '@/lib/supabase';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormState = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject || 'General Inquiry',
        message: form.message,
      });
      if (error) throw error;
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: siteData.phone, href: `tel:${siteData.phone}` },
    { icon: Mail, label: 'Email', value: siteData.email, href: `mailto:${siteData.email}` },
    { icon: MapPin, label: 'Address', value: siteData.address },
    { icon: Clock, label: 'Hours', value: siteData.hours },
  ];

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #073447 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3" style={{ backgroundColor: '#10B981' }} />
        <div className="container-page relative text-center">
          <span className="heading-eyebrow" style={{ color: '#10B981' }}>Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Have a question or ready to apply? We're here to help you find the right financial solution.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-3 mb-6">Contact Information</h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-[var(--brand-primary-light)] hover:shadow-sm transition-all">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(11, 79, 108, 0.08)' }}>
                        <Icon className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{info.label}</div>
                        <div className="text-slate-700 font-medium mt-0.5">{info.value}</div>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a key={info.label} href={info.href} className="block">{content}</a>
                  ) : (
                    <div key={info.label}>{content}</div>
                  );
                })}
              </div>

              <a
                href={siteData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl text-white font-semibold transition-all hover:scale-[1.02]"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>

              <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  title="Office Location"
                  src="https://maps.google.com/maps?q=Finance+Buddha+Sector+7+Noida&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-64 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div>
              <h2 className="heading-3 mb-6">Send Us a Message</h2>

              {status === 'success' && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200 mb-6 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800">Message sent successfully!</p>
                    <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-6 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">Something went wrong.</p>
                    <p className="text-sm text-red-700">Please try again or call us directly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`input-field ${errors.name ? 'border-red-400' : ''}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
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
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className="input-field"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                    placeholder="Tell us how we can help..."
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
