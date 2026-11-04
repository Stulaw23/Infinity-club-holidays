import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BUSINESS_INFO } from '../data/travelData';

interface FooterProps {
  onOpenQuoteModal: () => void;
  onOpenBugReport?: () => void;
}

export default function Footer({ onOpenQuoteModal, onOpenBugReport }: FooterProps) {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cathy! I'm contacting you via the website footer to enquire about holiday bookings."
  )}`;

  return (
    <footer className="bg-slate-50 text-slate-700 pt-16 pb-24 sm:pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-start">
              <BrandLogo size="md" showTagline={true} />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mt-3">
              Professional travel planning and booking for unforgettable local South African and international holidays. Backed by <strong className="text-slate-900">21 years of industry experience</strong>, we help clients take the stress out of travel from start to finish.
            </p>

            <div className="pt-2 text-xs text-slate-500 italic">
              &ldquo;For all your leisure and corporate business needs&rdquo;
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white hover:bg-sky-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-slate-200 shadow-2xs"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white hover:bg-teal-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-slate-200 shadow-2xs"
                aria-label="Instagram Page"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-slate-200 shadow-2xs"
                aria-label="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 font-outfit">
              Explore Sections
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#hero" className="hover:text-sky-600 transition-colors">
                  Home &amp; Hero
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-sky-600 transition-colors">
                  Holiday Specials &amp; Packages
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-600 transition-colors">
                  Our Products &amp; Services
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sky-600 transition-colors">
                  Top Destinations
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-sky-600 transition-colors">
                  Why Choose Us (21 Years)
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-sky-600 transition-colors">
                  Guest Reviews &amp; Feedback
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sky-600 transition-colors">
                  Contact &amp; Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 font-outfit">
              Infinity Club Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.suburb}, {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.postalCode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="hover:text-sky-600 transition-colors font-medium">
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-sky-600 transition-colors break-all">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="pt-2 text-[11px] text-slate-500">
                <strong>Hours:</strong> Mon - Fri 8am - 6pm • Sat 9am - 12pm • Sun Closed
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  Plan My Holiday / Get Quote
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Motto */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>🌍 <strong className="text-slate-700">INFINITY CLUB HOLIDAYS</strong> – Endless Travel Possibilities</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Travel Agent: <strong className="text-slate-700">Cathy Lawrence</strong> (21 Years Experience)</span>
            {onOpenBugReport && (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  id="footer-traveler-support-btn"
                  onClick={onOpenBugReport}
                  className="text-slate-500 hover:text-sky-600 underline transition-colors cursor-pointer text-[11px]"
                >
                  Need Help / Support
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  id="footer-agency-console-btn"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.location.hash = '#admin';
                    }
                    onOpenBugReport();
                  }}
                  className="text-slate-400 hover:text-sky-600 text-[10px] transition-colors cursor-pointer flex items-center gap-0.5"
                  title="Agency Diagnostic Console"
                >
                  <span>Agency</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
