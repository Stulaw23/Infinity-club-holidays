import { X, CheckCircle2, Clock, MapPin, Sparkles, MessageCircle, Calendar, ShieldCheck, Share2 } from 'lucide-react';
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

  if (!pkg) return null;

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

  const currentDisplaySrc = viewMode === 'photo' && pkg.photoUrl
    ? pkg.photoUrl
    : (imgLoadError && pkg.photoUrl ? pkg.photoUrl : pkg.imageUrl);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            {pkg.operator && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-sm">
                {pkg.operator}
              </span>
            )}
            <span className="text-sm font-bold text-slate-800 hidden sm:inline">
              Official Holiday Promotional Flyer
            </span>
          </div>

          <div className="flex items-center gap-2">
            {pkg.photoUrl && (
              <div className="flex items-center bg-slate-200/80 p-0.5 rounded-full text-xs font-medium mr-1">
                <button
                  onClick={() => setViewMode('flyer')}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    viewMode === 'flyer'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Promotional Flyer
                </button>
                <button
                  onClick={() => setViewMode('photo')}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    viewMode === 'photo'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Destination Photo
                </button>
              </div>
            )}

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-sm"
              title="Share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
              aria-label="Close flyer modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable, Centering the Full Flyer */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-100/60">
          
          {/* Promotional Artwork / Photo - Aspect Ratio Preserved, No Distortion */}
          <div className="flex justify-center items-center bg-slate-900/5 rounded-2xl p-2 sm:p-4 border border-slate-200 shadow-inner">
            <img
              src={currentDisplaySrc}
              alt={`${pkg.operator || ''} ${pkg.title} - ${viewMode === 'photo' ? 'Scenic Destination Photo' : 'Official Promotional Flyer'}`}
              className="max-h-[70vh] w-auto max-w-full rounded-xl shadow-lg object-contain block mx-auto transition-all duration-200"
              onError={() => {
                if (!imgLoadError) setImgLoadError(true);
              }}
            />
          </div>

          {/* Quick Details & Inclusions */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-outfit text-slate-900">
                  {pkg.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {pkg.destination} • {pkg.duration}
                </p>
              </div>

              {pkg.priceNote && (
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200">
                    {pkg.priceNote}
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {pkg.description}
            </p>

            {/* Inclusions */}
            {pkg.inclusions && pkg.inclusions.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Key Inclusions on This Tour:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
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
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Book with Cathy Lawrence (21+ Years Experience). Best flight pairings guaranteed.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Cathy</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal(pkg.title);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Request Custom Dates Quote</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
