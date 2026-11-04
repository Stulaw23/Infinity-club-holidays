import { X, CheckCircle2, Clock, MapPin, Sparkles, MessageCircle, Calendar, ShieldCheck, Share2, Phone, Mail, Star } from 'lucide-react';
import { HolidayPackage } from '../types';
import { BUSINESS_INFO } from '../data/travelData';
import { useState } from 'react';

interface PackageModalProps {
  pkg: HolidayPackage | null;
  onClose: () => void;
  onOpenQuoteModal: (packageTitle: string) => void;
}

export default function PackageModal({ pkg, onClose, onOpenQuoteModal }: PackageModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [viewMode, setViewMode] = useState<'flyer' | 'photo'>('flyer');
  const [imgLoadError, setImgLoadError] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState<number>(0);

  if (!pkg) return null;

  const hasGallery = Boolean(pkg.galleryImages && pkg.galleryImages.length > 0);
  const operatorPrefix = pkg.operator ? `${pkg.operator} - ` : '';
  const whatsappMessage = `Hi Cathy! I am reviewing the promotional special for "${operatorPrefix}${pkg.title}" (${pkg.destination}) on the Infinity Club Holidays website. Could you please provide flight options and check availability for our travel dates?`;
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${pkg.title} | Infinity Club Holidays`,
        text: `Check out this holiday special: ${pkg.title} with Cathy Lawrence at Infinity Club Holidays!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentDisplaySrc = hasGallery && pkg.galleryImages
    ? pkg.galleryImages[galleryIdx] || pkg.imageUrl
    : (viewMode === 'photo' && pkg.photoUrl
      ? pkg.photoUrl
      : (imgLoadError && pkg.photoUrl ? pkg.photoUrl : pkg.imageUrl));

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            {pkg.operator && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-xs ${
                  pkg.operator === 'Trafalgar'
                    ? 'bg-red-600 text-white'
                    : pkg.operator === 'Insight Vacations'
                    ? 'bg-[#0c2340] text-white'
                    : pkg.operator === 'Norwegian Cruise Line' || pkg.operator.includes('Norwegian')
                    ? 'bg-[#002f6c] text-white border border-sky-800/60'
                    : pkg.operator.includes('Hilton')
                    ? 'bg-gradient-to-r from-teal-700 to-sky-800 text-white border border-teal-500/30'
                    : pkg.operator === 'Costsaver'
                    ? 'bg-rose-600 text-white'
                    : pkg.operator === 'Contiki'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-sky-600 text-white'
                }`}
              >
                {pkg.operator}
              </span>
            )}
            <span className="text-sm font-bold text-slate-800 hidden sm:inline">
              Official Holiday Promotional Special
            </span>
          </div>

          <div className="flex items-center gap-2">
            {pkg.photoUrl && pkg.imageUrl && pkg.photoUrl !== pkg.imageUrl && (
              <div className="flex items-center bg-slate-200/80 p-0.5 rounded-full text-xs font-medium mr-1">
                <button
                  onClick={() => setViewMode('flyer')}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'flyer'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Promotional Flyer
                </button>
                <button
                  onClick={() => setViewMode('photo')}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'photo'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Destination Photo
                </button>
              </div>
            )}

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
              aria-label="Close flyer modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable, Centering the Full Flyer */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-100/60">
          
          {/* Promotional Artwork / Photo */}
          <div className="flex flex-col items-center bg-slate-900/5 rounded-2xl p-2 sm:p-4 border border-slate-200 shadow-inner">
            <img
              src={currentDisplaySrc}
              alt={`${pkg.operator || ''} ${pkg.title} - ${viewMode === 'photo' ? 'Scenic Destination Photo' : 'Official Promotional Flyer'}`}
              className="max-h-[65vh] w-auto max-w-full rounded-xl shadow-lg object-contain block mx-auto transition-all duration-200"
              onError={() => {
                if (!imgLoadError) setImgLoadError(true);
              }}
            />

            {/* Gallery Thumbnail Strip when package has multiple photos */}
            {hasGallery && pkg.galleryImages && pkg.galleryImages.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-3 overflow-x-auto w-full py-1">
                {pkg.galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setGalleryIdx(idx)}
                    className={`h-14 sm:h-16 w-20 sm:w-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      galleryIdx === idx 
                        ? 'border-teal-500 ring-2 ring-teal-400/60 scale-105 shadow-md' 
                        : 'border-white/80 opacity-60 hover:opacity-100 hover:border-slate-300'
                    }`}
                    title={`View resort photo ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`Resort View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Details & Inclusions */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-outfit text-slate-900">
                  {pkg.title}
                </h2>
                {pkg.hotelStars && (
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: pkg.hotelStars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-amber-800">5-Star Luxury Resort</span>
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-0.5">
                  {pkg.destination} • {pkg.duration}
                </p>
              </div>

              {pkg.priceNote && (
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-lg bg-sky-50 text-sky-800 font-bold text-xs border border-sky-200">
                    {pkg.priceNote}
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {pkg.description}
            </p>

            {/* Meal Upgrade Option Banner if present */}
            {pkg.mealUpgradeOption && (
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200/90 text-teal-950 flex items-start justify-between gap-3 shadow-2xs">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-teal-800 block">Optional Meal Upgrade</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">{pkg.mealUpgradeOption}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white text-[11px] font-bold shrink-0">
                  Available
                </span>
              </div>
            )}

            {/* Inclusions */}
            {pkg.inclusions && pkg.inclusions.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Key Inclusions on This Package:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Call to Action Banner (e.g. Wonder Wednesday / Hotline / Mauritius) */}
            {pkg.callToAction && (
              <a
                href={pkg.callToAction.includes('0845626444') ? "tel:0845626444" : whatsappUrl}
                className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-slate-800 flex items-center justify-between hover:bg-amber-100 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500 text-white shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-800 block">Direct Booking Hotline</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{pkg.callToAction}</span>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shrink-0 shadow-xs">
                  Contact Cathy
                </span>
              </a>
            )}

            {/* Terms notice */}
            {pkg.terms && (
              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
                {pkg.terms}
              </p>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Book with Cathy Lawrence (21+ Years Experience). Best flight pairings guaranteed.</span>
          </div>

          <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
            {pkg.callToAction && (
              <a
                href="tel:0845626444"
                className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>Call 0845626444</span>
              </a>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Cathy</span>
            </a>

            <a
              href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(`Enquiry for ${pkg.title}`)}&body=${encodeURIComponent(`Hi Cathy,\n\nI would love to enquire about the "${pkg.title}" (${pkg.destination}) on the Infinity Club Holidays website.\n\nPlease check flight availability from Cape Town with Air Mauritius and send through a quote for our travel dates.\n\nThank you!`)}`}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-slate-600" />
              <span>Email Cathy</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal(pkg.title);
              }}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Request Quote</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
