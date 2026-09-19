import { Phone, Mail, CheckCircle2, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import BrandLogo from './BrandLogo';
import { BUSINESS_INFO } from '../data/travelData';

export default function BusinessCardPreview() {
  const [copied, setCopied] = useState(false);

  const handleCopyDetails = () => {
    const text = `Infinity Club Holidays - Cathy Lawrence (Travel Agent)\nPhone: ${BUSINESS_INFO.phoneFormatted}\nEmail: ${BUSINESS_INFO.email}\nAddress: ${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.suburb}, ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.postalCode}\nServices: Flights, Accommodation, Cruises, Tailor-made packages, Car rental`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cathy! I saw your business card on the Infinity Club Holidays website and would love some travel assistance."
  )}`;

  return (
    <div id="cathy-lawrence-card" className="w-full max-w-xl mx-auto">
      {/* Physical style card container with subtle shadow and border */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-2xl transition-all duration-300 hover:shadow-purple-500/10">
        <div className="flex flex-col md:flex-row min-h-[300px]">
          
          {/* Left information column */}
          <div className="flex-1 p-6 md:p-7 flex flex-col justify-between z-10">
            <div>
              {/* Card top logo */}
              <div className="flex items-start mb-4">
                <BrandLogo size="sm" showTagline={true} />
              </div>

              {/* Tagline quote */}
              <p className="text-xs italic text-slate-500 font-medium mb-4">
                &ldquo;For all your leisure and corporate business needs&rdquo;
              </p>

              {/* Contact info list */}
              <div className="space-y-2 mb-5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Contact
                </div>
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-600" />
                  <span>{BUSINESS_INFO.phoneFormatted}</span>
                </a>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-purple-600 transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </div>

              {/* Services pills */}
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Core Services
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Flights', 'Car rental', 'Cruises', 'Tailor-made packages', 'Accommodation'].map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom quick actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Cathy
              </a>
              <button
                onClick={handleCopyDetails}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-all"
                title="Copy contact card to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Save Details'}</span>
              </button>
            </div>
          </div>

          {/* Right graphic sweep - matching Cathy Lawrence's card design */}
          <div className="relative md:w-56 bg-slate-950 p-6 md:p-8 flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Organic color curved swooshes in purple & cyan */}
            <div className="absolute -left-12 -top-12 w-40 h-80 rounded-full bg-purple-700/60 blur-xl pointer-events-none" />
            <div className="absolute -left-8 top-16 w-32 h-64 rounded-full bg-cyan-500/40 blur-lg pointer-events-none" />
            <div className="absolute -left-4 bottom-0 w-24 h-48 rounded-full bg-purple-600/50 blur-md pointer-events-none" />

            {/* SVG sweep overlay for exact geometric curved accents */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M0,0 Q30,50 0,100 L0,100 Z"
                fill="#7c3aed"
                opacity="0.3"
              />
              <path
                d="M5,0 Q35,50 5,100 L0,100 L0,0 Z"
                fill="#06b6d4"
                opacity="0.25"
              />
            </svg>

            {/* Content on right side */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 mb-3 shadow-lg">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
                  CL
                </div>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight font-outfit">
                Cathy Lawrence
              </h4>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-semibold mt-1">
                Travel Agent
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 w-full text-center">
                <span className="inline-flex items-center gap-1 text-[11px] text-purple-300 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  21 Years Travel Experience
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
