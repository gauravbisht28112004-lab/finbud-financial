'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const OFFICE_ADDRESS = 'D-47, Sector-7, Noida, Uttar Pradesh 201301';
const PHONE_NUMBER = '+91 9540303660';
const EMAIL_ADDRESS = 'anjali.bisth@financebuddha.com';

const INSTAGRAM_URL = 'https://www.instagram.com/finbud_financial';
const FACEBOOK_URL = 'https://www.facebook.com/finbudfinancial'; // 🔁 change if needed

// WhatsApp number (no +, no spaces)
const WHATSAPP_NUMBER = '919540303660';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const sendWhatsApp = () => {
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill required fields');
      return;
    }

    const message = `
Hi FinBud Financial,

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Message: ${formData.message}
    `;

    const encoded = encodeURIComponent(message);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`,
      '_blank'
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendWhatsApp();
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-20" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* LEFT SIDE */}
        <div>
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-[#00B4D8] mb-3">
            Reach Us
          </p>

          <h2 className="font-display font-black text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
            Get In Touch
            <br />
            With Us
          </h2>

          <p className="text-white/55 max-w-md leading-relaxed mb-10">
            Have questions about loan products, eligibility, or anything else?
            Our team is here to help you every step of the way.
          </p>

          <div className="space-y-4">

            {/* Address */}
            <div className="flex items-start gap-4 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.25)' }}>
                <MapPin size={18} className="text-[#00B4D8]" />
              </div>
              <div>
                <p className="text-white/60 text-[11px] font-bold tracking-widest uppercase">
                  Office Address
                </p>
                <p className="text-white text-sm mt-1">{OFFICE_ADDRESS}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(244,165,36,0.12)', border: '1px solid rgba(244,165,36,0.25)' }}>
                <Phone size={18} className="text-[#F4A524]" />
              </div>
              <div>
                <p className="text-white/60 text-[11px] font-bold tracking-widest uppercase">
                  Phone Number
                </p>
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                   className="text-white text-sm mt-1 inline-block hover:text-[#F4A524]">
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(27,79,216,0.12)', border: '1px solid rgba(27,79,216,0.25)' }}>
                <Mail size={18} className="text-[#1B4FD8]" />
              </div>
              <div>
                <p className="text-white/60 text-[11px] font-bold tracking-widest uppercase">
                  Email Address
                </p>
                <a href={`mailto:${EMAIL_ADDRESS}`}
                   className="text-white text-sm mt-1 inline-block hover:text-[#00B4D8]">
                  {EMAIL_ADDRESS}
                </a>
              </div>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">

            {/* Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg,#ff4d6d,#ffb703)',
                color: '#0A1628',
                boxShadow: '0 10px 30px rgba(255,77,109,0.22)',
              }}
            >
              <Instagram size={18} />
              Instagram
            </a>

            {/* Facebook */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg,#1877F2,#4F8EF7)',
                color: 'white',
                boxShadow: '0 10px 30px rgba(24,119,242,0.25)',
              }}
            >
              <Facebook size={18} />
              Facebook
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg,#25D366,#6EE7B7)',
                color: '#0A1628',
                boxShadow: '0 10px 30px rgba(37,211,102,0.22)',
              }}
            >
              WhatsApp
            </a>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div
          className="rounded-3xl p-8 lg:p-10"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <h3 className="font-display font-black text-3xl text-white mb-8">
            Send Us a Message
          </h3>

          <form onSubmit={onSubmit} className="space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', color: 'white' }}
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="Phone"
                required
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', color: 'white' }}
              />
            </div>

            <input
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', color: 'white' }}
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={onChange}
              rows={5}
              placeholder="Tell us about your requirement..."
              required
              className="w-full px-4 py-3 rounded-xl outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', color: 'white' }}
            />

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg,#F4A524,#FFD166)',
                color: '#0A1628',
                boxShadow: '0 10px 30px rgba(244,165,36,0.25)',
              }}
            >
              Send Message on WhatsApp
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
