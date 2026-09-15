import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { siteData } from '@/data/site';
import { loanProducts } from '@/data/loans';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo light />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {siteData.description}
            </p>
            <div className="flex gap-3">
              <a href={siteData.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={siteData.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={siteData.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Loan Products</h3>
            <ul className="space-y-2.5">
              {loanProducts.map((loan) => (
                <li key={loan.slug}>
                  <Link to={`/loans/${loan.slug}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {loan.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/partners" className="text-sm text-slate-400 hover:text-white transition-colors">Our Partners</Link></li>
              <li><Link to="/team" className="text-sm text-slate-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/calculators" className="text-sm text-slate-400 hover:text-white transition-colors">Calculators</Link></li>
              <li><Link to="/apply" className="text-sm text-slate-400 hover:text-white transition-colors">Apply Now</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[var(--brand-secondary)] mt-0.5 shrink-0" />
                <a href={`tel:${siteData.phone}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                  {siteData.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[var(--brand-secondary)] mt-0.5 shrink-0" />
                <a href={`mailto:${siteData.email}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                  {siteData.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--brand-secondary)] mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">{siteData.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[var(--brand-secondary)] mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">{siteData.hours}</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-[var(--brand-secondary)] mt-0.5 shrink-0" />
                <a href={siteData.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link to="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
              <Link to="/disclaimer" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Disclaimer</Link>
            </div>
            <p className="text-xs text-slate-500">
              © {year} {siteData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
