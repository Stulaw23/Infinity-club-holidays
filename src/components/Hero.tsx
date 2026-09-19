import { useState } from 'react';
import { MessageCircle, Calendar, ShieldCheck, Award, HeartHandshake, Compass, ArrowRight, Plane } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[640px] lg:min-h-[720px] flex flex-col justify-between">
      {/* Background Photography with atmospheric overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury tropical island resort and turquoise lagoon"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multi-stage gradient overlay: deep purple/slate to transparent with cyan tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-purple-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 w-full my-auto">
        <div className="max-w-3xl">
          
          {/* 21 Years Experience Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-inner">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>21 Years of Travel Industry Expertise</span>
            <span className="text-purple-400">•</span>
            <span className="text-cyan-300 font-normal">Personalised Travel Planning</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-outfit leading-[1.12]">
            Endless Travel Possibilities. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300">
              Crafted With 21 Years
            </span> of Passion.
          </h1>

          {/* Subtext with the business value proposition */}
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            Take the stress out of holiday planning. Whether you dream of a local South African bush safari, an idyllic island resort in Mauritius, a luxury European cruise, or a tailor-made world adventure, we arrange your journey from start to finish.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-600 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>Plan My Holiday / Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Us (084 562 6444)</span>
            </a>
          </div>

          {/* Quick quote interactive bar */}
          <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-2xl">
            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Holiday Style
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-purple-500"
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
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  When to Travel?
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-purple-500"
                >
                  <option value="Next 30 Days">Within Next 30 Days</option>
                  <option value="Next 3 Months">Next 3 Months</option>
                  <option value="Later this Year">Later this Year</option>
                  <option value="School Holidays">School Holidays</option>
                  <option value="Festive / New Year">Festive Season / New Year</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Travelers
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-purple-500"
                >
                  <option value="1">Solo Traveler</option>
                  <option value="2">Couple (2 Adults)</option>
                  <option value="family">Family (2 Adults + Kids)</option>
                  <option value="group">Group (4+ People)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-600/30"
                >
                  <Compass className="w-4 h-4 text-cyan-300" />
                  <span>Request Custom Quote</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Trust Indicators Strip */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">21 Years Experience</div>
                <div className="text-xs text-slate-400">Trusted industry guidance</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">100% Personalised</div>
                <div className="text-xs text-slate-400">Tailored to your budget</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">End-to-End Packages</div>
                <div className="text-xs text-slate-400">Flights, stays & transfers</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Dedicated Support</div>
                <div className="text-xs text-slate-400">Direct WhatsApp line to Cathy</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
