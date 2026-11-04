import { useState } from 'react';
import { Sparkles, Clock, MessageCircle, Maximize2, Tag, Compass, Search, Phone, Mail, Image as ImageIcon, Star } from 'lucide-react';
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
  const [activeCardImages, setActiveCardImages] = useState<Record<string, number>>({});

  const isEgyptPackage = (p: HolidayPackage): boolean =>
    p.category === 'egypt' ||
    Boolean(p.destination && p.destination.toLowerCase().includes('egypt')) ||
    Boolean(p.title && p.title.toLowerCase().includes('egypt')) ||
    Boolean(p.subtitle && p.subtitle.toLowerCase().includes('egypt'));

  const isCruisePackage = (p: HolidayPackage): boolean =>
    p.category === 'cruise' ||
    Boolean(p.operator && p.operator.toLowerCase().includes('norwegian')) ||
    Boolean(p.operator && p.operator.toLowerCase().includes('cruise')) ||
    Boolean(p.destination && p.destination.toLowerCase().includes('barcelona')) ||
    Boolean(p.destination && p.destination.toLowerCase().includes('tokyo')) ||
    Boolean(p.destination && p.destination.toLowerCase().includes('seoul')) ||
    Boolean(p.title && p.title.toLowerCase().includes('cruise')) ||
    Boolean(p.title && p.title.toLowerCase().includes('cherry blossom')) ||
    Boolean(p.title && p.title.toLowerCase().includes('mediterranean'));

  const isIslandPackage = (p: HolidayPackage): boolean =>
    p.category === 'island' ||
    Boolean(p.destination && p.destination.toLowerCase().includes('mauritius')) ||
    Boolean(p.destination && p.destination.toLowerCase().includes('island')) ||
    Boolean(p.title && p.title.toLowerCase().includes('mauritius')) ||
    Boolean(p.title && p.title.toLowerCase().includes('hilton'));

  const filterTabs: { label: string; category: DestinationCategory; count: number }[] = [
    { label: 'All Specials', category: 'all', count: PACKAGES_DATA.length },
    { label: '🏝️ Mauritius & Islands', category: 'island', count: PACKAGES_DATA.filter(isIslandPackage).length },
    { label: '🚢 Cruises & Getaways', category: 'cruise', count: PACKAGES_DATA.filter(isCruisePackage).length },
    { label: '🇪🇬 Egypt & Nile Cruises', category: 'egypt', count: PACKAGES_DATA.filter(isEgyptPackage).length },
    { label: 'Trafalgar (First Class)', category: 'trafalgar', count: PACKAGES_DATA.filter(p => p.category === 'trafalgar' || p.operator === 'Trafalgar').length },
    { label: 'Insight Vacations (Premium)', category: 'insight', count: PACKAGES_DATA.filter(p => p.category === 'insight' || p.operator === 'Insight Vacations').length },
    { label: 'Costsaver (Guided)', category: 'costsaver', count: PACKAGES_DATA.filter(p => p.category === 'costsaver' || p.operator === 'Costsaver').length },
    { label: 'Contiki (18-35s)', category: 'contiki', count: PACKAGES_DATA.filter(p => p.category === 'contiki' || p.operator === 'Contiki').length },
  ];

  const filteredPackages = PACKAGES_DATA.filter((pkg) => {
    let matchesCategory = false;
    if (activeCategory === 'all') {
      matchesCategory = true;
    } else if (activeCategory === 'island') {
      matchesCategory = isIslandPackage(pkg);
    } else if (activeCategory === 'egypt') {
      matchesCategory = isEgyptPackage(pkg);
    } else if (activeCategory === 'cruise') {
      matchesCategory = isCruisePackage(pkg);
    } else {
      matchesCategory =
        pkg.category === activeCategory ||
        Boolean(pkg.operator && pkg.operator.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      pkg.title.toLowerCase().includes(q) ||
      pkg.destination.toLowerCase().includes(q) ||
      (pkg.operator && pkg.operator.toLowerCase().includes(q)) ||
      pkg.subtitle.toLowerCase().includes(q) ||
      pkg.description.toLowerCase().includes(q) ||
      (pkg.callToAction && pkg.callToAction.toLowerCase().includes(q)) ||
      (pkg.mealUpgradeOption && pkg.mealUpgradeOption.toLowerCase().includes(q)) ||
      (pkg.resortName && pkg.resortName.toLowerCase().includes(q)) ||
      (pkg.badge && pkg.badge.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const getWhatsAppPackageLink = (pkg: HolidayPackage) => {
    const operatorName = pkg.operator ? `${pkg.operator} - ` : '';
    const message = `Hi Cathy! I saw the "${operatorName}${pkg.title}" promotional special on the Infinity Club Holidays website. Could you please check available travel dates, flights, and current booking rates for me?`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const getEmailPackageLink = (pkg: HolidayPackage) => {
    const subject = `Enquiry for ${pkg.title} - Infinity Club Holidays`;
    const body = `Hi Cathy,\n\nI would love to enquire about the "${pkg.title}" (${pkg.destination}) listed on your website.\n\nPlease check flight availability from Cape Town with Air Mauritius and send through a quote for our travel dates.\n\nThank you!`;
    return `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getOperatorBadgeStyle = (operator?: string) => {
    switch (operator) {
      case 'Contiki':
        return 'bg-emerald-600 text-white';
      case 'Costsaver':
        return 'bg-rose-600 text-white';
      case 'Trafalgar':
        return 'bg-red-600 text-white shadow-xs';
      case 'Insight Vacations':
        return 'bg-[#0c2340] text-white shadow-xs border border-sky-900/60';
      case 'Norwegian Cruise Line':
        return 'bg-[#002f6c] text-white shadow-xs border border-sky-800/60';
      case 'Hilton Resorts & Spa':
      case 'Hilton Resorts':
      case 'Hilton':
        return 'bg-gradient-to-r from-teal-700 to-sky-800 text-white shadow-xs border border-teal-500/30';
      default:
        return 'bg-sky-600 text-white';
    }
  };

  return (
    <section id="packages" className="py-16 sm:py-20 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Featured Holiday Specials, Tours & Cruises</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Latest Holiday Specials
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Exclusive promotional tours, island resorts, and cruises from world-leading partners — 5* Hilton Mauritius Resort & Spa, Norwegian Cruise Line, Trafalgar, Insight Vacations, Costsaver, and Contiki. Explore our new Mauritius, Mediterranean, and Egypt packages with personalized booking, flights, and expert planning by Cathy Lawrence.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Mauritius, Hilton, Mediterranean, Egypt, Trafalgar..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-slate-800 placeholder-slate-400 shadow-xs"
            />
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.category}
                onClick={() => setActiveCategory(tab.category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.category
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90'
                }`}
              >
                {tab.label} {tab.count > 0 && <span className="opacity-80 text-[11px] ml-1">({tab.count})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredPackages.map((pkg) => {
            const hasError = imgLoadErrors[pkg.id];
            const hasGallery = Boolean(pkg.galleryImages && pkg.galleryImages.length > 1);
            const activeImgIdx = activeCardImages[pkg.id] ?? 0;
            const cardImgSrc = hasGallery && pkg.galleryImages
              ? pkg.galleryImages[activeImgIdx] || pkg.imageUrl
              : (hasError && pkg.photoUrl ? pkg.photoUrl : pkg.imageUrl);

            const isFlyerDoc = !hasGallery && (
              pkg.operator === 'Trafalgar' || 
              pkg.operator === 'Insight Vacations' || 
              pkg.operator === 'Contiki' || 
              pkg.operator === 'Costsaver' || 
              pkg.id.includes('ncl')
            );

            // Formatted price display in ZAR
            const displayPrice = (pkg as any).priceDisplay 
              || (pkg.priceZAR ? `From R${pkg.priceZAR.toLocaleString()} pp` : 'Enquire for Price');

            return (
              <div
                key={pkg.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Multi-Photo Gallery Support */}
                <div 
                  className="relative w-full bg-slate-900/5 cursor-pointer overflow-hidden group/img"
                  onClick={() => onSelectPackage(pkg)}
                  title="Click to view full photos & details"
                >
                  <img
                    src={cardImgSrc}
                    alt={`${pkg.operator || ''} ${pkg.title} Resort & Travel Special`}
                    className={
                      isFlyerDoc
                        ? "w-full h-auto block object-contain transition-transform duration-300 group-hover/img:scale-[1.01]"
                        : "w-full h-56 sm:h-64 object-cover object-center block transition-transform duration-500 group-hover/img:scale-105"
                    }
                    loading="lazy"
                    onError={() => {
                      if (!hasError && pkg.photoUrl) {
                        setImgLoadErrors((prev) => ({ ...prev, [pkg.id]: true }));
                      }
                    }}
                  />

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-lg backdrop-blur-xs transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-sky-600" />
                      <span>{hasGallery ? 'View Full Photo Gallery' : 'Click to View Full Flyer'}</span>
                    </div>
                  </div>

                  {/* Operator Badge */}
                  {pkg.operator && (
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md backdrop-blur-xs ${getOperatorBadgeStyle(pkg.operator)}`}>
                      {pkg.operator}
                    </div>
                  )}

                  {/* Duration Tag */}
                  {pkg.duration && (
                    <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                      <Clock className="w-3 h-3 text-teal-300" />
                      <span>{pkg.duration}</span>
                    </div>
                  )}

                  {/* Multi-Photo Gallery Thumbnail Strip directly on Card */}
                  {hasGallery && pkg.galleryImages && (
                    <div 
                      className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10 bg-slate-950/75 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[10px] font-bold text-white px-1.5 flex items-center gap-1 shrink-0">
                        <ImageIcon className="w-3 h-3 text-teal-300" />
                        <span>{activeImgIdx + 1}/{pkg.galleryImages.length} Photos</span>
                      </span>
                      <div className="flex items-center gap-1.5 overflow-x-auto">
                        {pkg.galleryImages.map((thumb, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCardImages((prev) => ({ ...prev, [pkg.id]: idx }));
                            }}
                            className={`w-9 h-6 rounded-md overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                              activeImgIdx === idx 
                                ? 'border-teal-400 scale-105 shadow-xs ring-1 ring-teal-300' 
                                : 'border-white/50 opacity-70 hover:opacity-100 hover:scale-102'
                            }`}
                            title={`Switch to photo ${idx + 1}`}
                          >
                            <img src={thumb} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Controls & Inquiries */}
                <div className="p-5 flex flex-col flex-grow bg-white border-t border-slate-100">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold font-outfit text-slate-900 leading-tight">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {pkg.destination}
                      </p>
                      {/* Hotel Stars */}
                      {pkg.hotelStars && (
                        <div className="flex items-center gap-1 text-amber-500 mt-1">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: pkg.hotelStars }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-amber-800">5-Star Luxury Resort</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing Highlight */}
                  <div className="my-2.5 py-2 px-3 rounded-xl bg-sky-50/70 border border-sky-100/80 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-sky-600" />
                      Special Rate
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-sky-900 font-outfit">
                      {displayPrice}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                    {pkg.subtitle}
                  </p>

                  {/* Meal Upgrade Option Banner */}
                  {pkg.mealUpgradeOption && (
                    <div className="my-2 p-2.5 rounded-xl bg-teal-50 border border-teal-200/90 text-teal-950 text-xs flex items-start gap-2 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-teal-800 block">Meal Upgrade Available</span>
                        <span className="font-semibold text-slate-800 text-[11px]">{pkg.mealUpgradeOption}</span>
                      </div>
                    </div>
                  )}

                  {/* Highlights / Inclusions preview */}
                  {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div className="mb-4 pt-2 border-t border-slate-100 space-y-1.5">
                      {pkg.inclusions.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                          <span className="truncate font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Call to Action Banner if present (e.g. Wonder Wednesday / Hotline) */}
                  {pkg.callToAction && (
                    <a
                      href="tel:0845626444"
                      className="my-2.5 p-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 text-slate-800 text-xs font-semibold flex items-center justify-between hover:bg-amber-100/70 transition-colors group/cta shadow-2xs"
                      title="Click to call Cathy directly"
                    >
                      <span className="flex items-center gap-1.5 min-w-0">
                        <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate text-amber-950 font-bold">{pkg.callToAction}</span>
                      </span>
                      <span className="shrink-0 text-[11px] font-extrabold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md ml-1">
                        Call Now
                      </span>
                    </a>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-2 pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="py-2 px-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        title="View photos and package details"
                      >
                        <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{hasGallery ? 'Photos' : 'Flyer'}</span>
                      </button>

                      <a
                        href={getWhatsAppPackageLink(pkg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-1 shadow-xs"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">WhatsApp</span>
                      </a>

                      <a
                        href={getEmailPackageLink(pkg)}
                        className="py-2 px-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        title="Enquire via Email"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                        <span className="truncate">Email</span>
                      </a>
                    </div>

                    <button
                      onClick={() => onOpenQuoteModal(pkg.title)}
                      className="w-full py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-sky-700 hover:bg-slate-50 text-center transition-colors border border-slate-200 cursor-pointer"
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
              className="mt-3 text-xs font-bold text-sky-600 hover:underline cursor-pointer"
            >
              Reset filters to show all specials
            </button>
          </div>
        )}

        {/* Custom Tailor-Made Banner (Deep Ocean Blue & Teal) */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-sky-900/40">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Can&apos;t find your exact destination or travel dates?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit">
                We Build 100% Tailor-Made Holidays
              </h3>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Tell Cathy where you want to go and what you want to spend. With 21 years of direct relationships with airlines and luxury tour operators worldwide, Cathy constructs your custom itinerary from scratch with zero booking stress.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-lg transition-all cursor-pointer"
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
