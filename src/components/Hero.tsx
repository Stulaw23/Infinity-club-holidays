import { useState } from 'react';
import { MessageCircle, Calendar, ShieldCheck, Award, HeartHandshake, Compass, ArrowRight, Plane, ChevronDown } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

interface HeroProps {
  onOpenQuoteModal: (initialCategory?: string) => void;
}

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  const [selectedType, setSelectedType] = useState('island');
  const [travelers, setTravelers] = useState('2');
  const [timeframe, setTimeframe] = useState('Next 3 Months');

  const whatsappHeroUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cathy! I'm on the Infinity Club Holidays website and would love your assistance planning an upcoming holiday."
  )}`;

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenQuoteModal(selectedType);
  };

  return (
    <section id="hero" className="relative bg-white pt-6 pb-16 lg:pt-10 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card Container with Diving & Ocean Imagery */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-900 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
          
          {/* High-Resolution Underwater Ocean & Scuba Diving Background Visual */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85"
              alt="Scuba diving over turquoise coral reef and tropical waters"
              className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
            />
            {/* Elegant Ocean Blue Gradient Overlay for High Contrast & Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-sky-950/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-3xl my-auto">
            
            {/* 21 Years of Experience Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-900/60 border border-sky-400/40 text-sky-200 text-xs sm:text-sm font-semibold backdrop-blur-md mb-5 shadow-xs">
              <Award className="w-4 h-4 text-teal-300 shrink-0" />
              <span>21 Years of Travel Industry Expertise</span>
              <span className="text-sky-300">•</span>
              <span className="text-teal-200 font-normal">Strand, Western Cape</span>
            </div>

            {/* Semantic Single H1 Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-outfit leading-[1.12]">
              Endless Travel Possibilities. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-200 to-cyan-300">
                Crafted With 21 Years
              </span> of Passion.
            </h1>

            {/* Subtext with the business value proposition */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              Take the stress out of holiday planning. Whether you dream of a local South African bush safari, an idyllic island resort in Mauritius, a luxury European cruise, or a tailor-made world adventure, Cathy arranges your journey from start to finish.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenQuoteModal()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto cursor-pointer"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>Plan My Holiday / Get a Quote</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>WhatsApp Us ({BUSINESS_INFO.phoneFormatted})</span>
              </a>

              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
              >
                <span>View Specials</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Trip Finder Bar */}
            <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 shadow-2xl">
              <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Holiday Style
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-xs sm:text-sm border border-slate-600 focus:outline-none focus:border-sky-400"
                  >
                    <option value="island">Tropical Island (Mauritius/Zanzibar)</option>
                    <option value="local">South Africa Safari & Coast</option>
                    <option value="cruise">Ocean & River Cruises</option>
                    <option value="international">Europe, Asia & USA</option>
                    <option value="ski">Ski & Snow Holidays</option>
                    <option value="honeymoon">Honeymoons & Romance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    When to Travel?
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-xs sm:text-sm border border-slate-600 focus:outline-none focus:border-sky-400"
                  >
                    <option value="Next 30 Days">Within Next 30 Days</option>
                    <option value="Next 3 Months">Next 3 Months</option>
                    <option value="Later this Year">Later this Year</option>
                    <option value="School Holidays">School Holidays</option>
                    <option value="Festive / New Year">Festive Season / New Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-xs sm:text-sm border border-slate-600 focus:outline-none focus:border-sky-400"
                  >
                    <option value="1">Solo Traveler</option>
                    <option value="2">Couple (2 Adults)</option>
                    <option value="family">Family (2 Adults + Kids)</option>
                    <option value="group">Group (4+ People)</option>
                  </select>
                </div>

                <div className="flex items-end sm:col-span-2 lg:col-span-1">
                  <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-600/30 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-teal-200" />
                    <span>Request Custom Quote</span>
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Bottom Trust Indicators Strip (Integrated directly in hero footer) */}
          <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">21 Years Experience</div>
                    <div className="text-[11px] sm:text-xs text-slate-400">Trusted industry guidance</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-teal-500/15 text-teal-400 shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">100% Personalised</div>
                    <div className="text-[11px] sm:text-xs text-slate-400">Tailored to your budget</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 shrink-0">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">End-to-End Packages</div>
                    <div className="text-[11px] sm:text-xs text-slate-400">Flights, stays & transfers</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">Dedicated Support</div>
                    <div className="text-[11px] sm:text-xs text-slate-400">Direct personal support line</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
