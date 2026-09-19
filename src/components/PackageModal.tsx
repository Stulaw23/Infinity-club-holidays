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

  if (!pkg) return null;

  const formatZAR = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const whatsappMessage = `Hi Cathy! I'm reviewing the "${pkg.title}" package on your website (${pkg.duration} for ${formatZAR(pkg.priceZAR)} in ${pkg.destination}). I would love to check availability and options for our travel dates.`;
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${pkg.title} | Infinity Club Holidays`,
        text: `Check out this holiday package: ${pkg.title} with Infinity Club Holidays!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-all"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-md">
                {pkg.category.toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-300 bg-slate-900/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5" />
                {pkg.destination}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-200 bg-slate-900/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                <Clock className="w-3.5 h-3.5" />
                {pkg.duration}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit leading-tight">
              {pkg.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1">{pkg.subtitle}</p>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* Price Overview Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-purple-50 border border-purple-100 gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-purple-700 font-bold">
                Package Estimate
              </div>
              <div className="text-3xl font-black text-slate-900 font-outfit">
                {formatZAR(pkg.priceZAR)}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {pkg.priceNote || 'Per person sharing'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              About This Experience
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Inclusions */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>What&apos;s Included In This Package</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pkg.inclusions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal for & Personalisation Note */}
          <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800">
              <span className="text-purple-600">Ideal For:</span> {pkg.idealFor}
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>
                Backed by 21 years of travel packaging experience. Need different dates, departure airports, or hotel room upgrades? Cathy can personalize this package to your exact wishes.
              </span>
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Have questions about this package? Speak directly to Cathy.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp About This</span>
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
