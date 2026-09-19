import { Phone, Mail, MapPin, MessageCircle, Heart, Facebook, Instagram, ShieldCheck } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BUSINESS_INFO } from '../data/travelData';

interface FooterProps {
  onOpenQuoteModal: () => void;
}

export default function Footer({ onOpenQuoteModal }: FooterProps) {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cathy! I'm contacting you via the website footer to enquire about holiday bookings."
  )}`;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-start">
              <BrandLogo variant="dark" size="md" showTagline={true} />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mt-3">
              Professional travel planning and booking for unforgettable local South African and international holidays. Backed by <strong>21 years of industry experience</strong>, we help clients take the stress out of travel from start to finish.
            </p>

            <div className="pt-2 text-xs text-slate-400 italic">
              &ldquo;For all your leisure and corporate business needs&rdquo;
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Instagram Page"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white font-outfit">
              Explore & Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#packages" className="hover:text-purple-400 transition-colors">
                  Holiday Specials & Packages
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-400 transition-colors">
                  Flights & Hotel Bookings
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-400 transition-colors">
                  Ocean & River Cruises
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-400 transition-colors">
                  Tailor-Made Itineraries
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-purple-400 transition-colors">
                  Local South Africa Safaris
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-purple-400 transition-colors">
                  Island Getaways (Mauritius & Zanzibar)
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-purple-400 transition-colors">
                  21 Years Travel Experience
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white font-outfit">
              Infinity Club Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.suburb}, {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.postalCode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors break-all">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="pt-2 text-[11px] text-slate-500">
                <strong>Hours:</strong> Mon - Fri 8am - 6pm • Sat 9am - 12pm • Sun Closed
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
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
            <span>🌍 <strong>INFINITY CLUB HOLIDAYS</strong> – Endless Travel Possibilities</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Travel Agent: <strong>Cathy Lawrence</strong> (21 Years Experience)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
