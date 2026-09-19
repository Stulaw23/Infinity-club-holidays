import { useState } from 'react';
import { Sparkles, Clock, MessageCircle, Maximize2, Tag, Compass, Search, ShieldCheck } from 'lucide-react';
import { PACKAGES_DATA, BUSINESS_INFO } from '../data/travelData';
import { HolidayPackage, DestinationCategory } from '../types';

interface HolidayPackagesProps {
  onSelectPackage: (pkg: HolidayPackage) => void;
  onOpenQuoteModal: (packageTitle?: string) => void;
}

export default function HolidayPackages({ onSelectPackage, onOpenQuoteModal }: HolidayPackagesProps) {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imgLoadErrors, setImgLoadErrors] = useState<Record<string, boolean>>({});

  const filterTabs: { label: string; category: DestinationCategory; count: number }[] = [
    { label: 'All Specials', category: 'all', count: PACKAGES_DATA.length },
    { label: 'Contiki (18-35s)', category: 'contiki', count: PACKAGES_DATA.filter(p => p.category === 'contiki').length },
    { label: 'Costsaver (Guided)', category: 'costsaver', count: PACKAGES_DATA.filter(p => p.category === 'costsaver').length },
    { label: 'Trafalgar (First Class)', category: 'trafalgar', count: PACKAGES_DATA.filter(p => p.category === 'trafalgar').length },
    { label: 'Insight Vacations (Premium)', category: 'insight', count: PACKAGES_DATA.filter(p => p.category === 'insight').length },
  ];

  const filteredPackages = PACKAGES_DATA.filter((pkg) => {
    const matchesCategory = activeCategory === 'all' || pkg.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      pkg.title.toLowerCase().includes(q) ||
      pkg.destination.toLowerCase().includes(q) ||
      (pkg.operator && pkg.operator.toLowerCase().includes(q)) ||
      pkg.subtitle.toLowerCase().includes(q) ||
      pkg.description.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const getWhatsAppPackageLink = (pkg: HolidayPackage) => {
    const operatorName = pkg.operator ? `${pkg.operator} - ` : '';
    const message = `Hi Cathy! I saw the "${operatorName}${pkg.title}" promotional special on the Infinity Club Holidays website. Could you please check available travel dates, flights, and current booking rates for me?`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const getOperatorBadgeStyle = (operator?: string) => {
    switch (operator) {
      case 'Contiki':
        return 'bg-emerald-600 text-white';
      case 'Costsaver':
        return 'bg-rose-600 text-white';
      case 'Trafalgar':
        return 'bg-blue-600 text-white';
      case 'Insight Vacations':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-purple-600 text-white';
    }
  };

  return (
    <section id="packages" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Featured Holiday Specials & Guided Tours</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Latest Holiday Specials
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Exclusive promotional deals from world-leading guided tour partners — Contiki, Costsaver, Trafalgar, and Insight Vacations. Cathy manages your flights, bookings, and full itinerary end-to-end.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tour name, country, or operator..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-slate-800 placeholder-slate-400 shadow-sm"
            />
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.category}
                onClick={() => setActiveCategory(tab.category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === tab.category
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab.label} {tab.count > 0 && <span className="opacity-75 text-[11px] ml-1">({tab.count})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredPackages.map((pkg) => {
            const hasError = imgLoadErrors[pkg.id];
            const imgSrc = hasError && pkg.photoUrl ? pkg.photoUrl : pkg.imageUrl;

            return (
              <div
                key={pkg.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Promotional Flyer Container - Uncropped & Aspect Ratio Preserved */}
                <div 
                  className="relative w-full bg-slate-950/5 cursor-pointer overflow-hidden group/img"
                  onClick={() => onSelectPackage(pkg)}
                  title="Click to view full flyer"
                >
                  <img
                    src={imgSrc}
                    alt={`${pkg.operator || ''} ${pkg.title} Promotional Holiday Special Flyer`}
                    className="w-full h-auto block object-contain transition-transform duration-300 group-hover/img:scale-[1.01]"
                    loading="lazy"
                    onError={() => {
                      if (!hasError && pkg.photoUrl) {
                        setImgLoadErrors((prev) => ({ ...prev, [pkg.id]: true }));
                      }
                    }}
                  />

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-lg backdrop-blur-sm transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>Click to View Full Flyer</span>
                    </div>
                  </div>

                  {/* Operator Badge */}
                  {pkg.operator && (
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md backdrop-blur-sm ${getOperatorBadgeStyle(pkg.operator)}`}>
                      {pkg.operator}
                    </div>
                  )}

                  {/* Duration Tag */}
                  {pkg.duration && (
                    <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Clock className="w-3 h-3 text-cyan-300" />
                      <span>{pkg.duration}</span>
                    </div>
                  )}
                </div>

                {/* Card Action Controls & Inquiries */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white border-t border-slate-100">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold font-outfit text-slate-900 leading-tight">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {pkg.destination}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {pkg.subtitle}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-2 pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Flyer</span>
                      </button>

                      <a
                        href={getWhatsAppPackageLink(pkg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    <button
                      onClick={() => onOpenQuoteModal(pkg.title)}
                      className="w-full py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-purple-700 hover:bg-slate-50 text-center transition-colors border border-slate-200"
                    >
                      Enquire about this special for your dates →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
            <p className="text-sm font-semibold text-slate-700">No specials matched your filter or search.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-purple-600 hover:underline"
            >
              Reset filters to show all 12 specials
            </button>
          </div>
        )}

        {/* Custom Tailor-Made Banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Can&apos;t find your exact destination or travel dates?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit">
                We Build 100% Tailor-Made Holidays
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Tell Cathy where you want to go and what you want to spend. With 21 years of direct relationships with airlines and luxury tour operators worldwide, Cathy constructs your custom itinerary from scratch with zero booking stress.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-white text-purple-900 hover:bg-slate-100 shadow-lg transition-all"
              >
                Plan Custom Trip
              </button>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Cathy, I have a specific holiday idea in mind and would love a custom quote!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Cathy</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
