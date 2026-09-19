import { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, MessageCircle, ArrowRight, Compass, Shield } from 'lucide-react';
import { PACKAGES_DATA, BUSINESS_INFO } from '../data/travelData';
import { HolidayPackage, DestinationCategory } from '../types';

interface HolidayPackagesProps {
  onSelectPackage: (pkg: HolidayPackage) => void;
  onOpenQuoteModal: (packageTitle?: string) => void;
}

export default function HolidayPackages({ onSelectPackage, onOpenQuoteModal }: HolidayPackagesProps) {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { label: string; category: DestinationCategory }[] = [
    { label: 'All Specials', category: 'all' },
    { label: 'Island Getaways', category: 'island' },
    { label: 'Local South Africa', category: 'local' },
    { label: 'Cruises', category: 'cruise' },
    { label: 'International', category: 'international' },
    { label: 'Ski & Adventure', category: 'adventure' },
  ];

  const filteredPackages = PACKAGES_DATA.filter((pkg) => {
    const matchesCategory = activeCategory === 'all' || pkg.category === activeCategory;
    const matchesQuery =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const formatZAR = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getWhatsAppPackageLink = (pkg: HolidayPackage) => {
    const message = `Hi Cathy! I saw the "${pkg.title}" (${pkg.duration} in ${pkg.destination}) for approx ${formatZAR(pkg.priceZAR)} on the Infinity Club Holidays website. Could you please send me full availability and quote details?`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="packages" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Featured Travel Specials & Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Hand-Crafted Holiday Offers
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Carefully packaged with 21 years of industry insight. Every package includes verified accommodations, best flight routing, and zero stress. Custom dates and upgrades always available!
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
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
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-3 left-3 bg-purple-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {pkg.badge}
                    </div>
                  )}

                  {/* Duration Tag */}
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{pkg.duration}</span>
                  </div>

                  {/* Destination Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs uppercase tracking-wider text-cyan-300 font-semibold">
                      {pkg.destination}
                    </div>
                    <h3 className="text-lg font-bold font-outfit text-white leading-tight">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5">
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Inclusions summary */}
                  <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Package Inclusions:
                    </div>
                    {pkg.inclusions.slice(0, 3).map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                    {pkg.inclusions.length > 3 && (
                      <div className="text-[11px] text-purple-600 font-semibold pt-1">
                        + {pkg.inclusions.length - 3} more inclusions included
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer / Price & Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 mt-auto">
                <div className="flex items-baseline justify-between mb-4 pt-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      From Only
                    </span>
                    <span className="text-2xl font-black text-slate-900 font-outfit">
                      {formatZAR(pkg.priceZAR)}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 text-right max-w-[140px] leading-tight">
                    {pkg.priceNote || 'per person sharing'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Details</span>
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
                  className="w-full mt-2 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-purple-700 hover:bg-white text-center transition-colors border border-transparent hover:border-slate-200"
                >
                  Customise this package for my dates →
                </button>
              </div>
            </div>
          ))}
        </div>

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
                Tell Cathy where you want to go and what you want to spend. With 21 years of direct relationships with airlines and luxury lodges worldwide, we will construct your custom itinerary from scratch with no booking stress.
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
