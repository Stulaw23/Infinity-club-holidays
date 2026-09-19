import { useState } from 'react';
import { MessageCircle, Phone, Calendar, X, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

interface FloatingWhatsAppProps {
  onOpenQuoteModal: () => void;
}

export default function FloatingWhatsApp({ onOpenQuoteModal }: FloatingWhatsAppProps) {
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cathy! I saw your Infinity Club Holidays website and would love to ask a quick travel question."
  )}`;

  return (
    <>
      {/* Desktop Floating WhatsApp Bubble (bottom right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2">
        {/* Floating invitation popup */}
        {!bubbleDismissed && (
          <div className="relative bg-white text-slate-800 p-3.5 rounded-2xl shadow-2xl border border-slate-200 max-w-xs animate-in slide-in-from-bottom-3 duration-300">
            <button
              onClick={() => setBubbleDismissed(true)}
              className="absolute -top-2 -right-2 p-1 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-600 transition-colors"
              aria-label="Dismiss chat prompt"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                CL
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  <span>Cathy Lawrence</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                </div>
                <p className="text-slate-600 mt-0.5 leading-tight">
                  Need travel advice or a quick quote? Chat with me directly on WhatsApp!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Chat on WhatsApp with Cathy Lawrence"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 border-2 border-white rounded-full animate-ping" />
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="text-xs font-bold tracking-wide pr-1">
            WhatsApp Cathy
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white text-xs font-bold active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 mb-0.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 text-white text-xs font-bold active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4 mb-0.5 text-cyan-400" />
            <span>Call Cathy</span>
          </a>

          <button
            onClick={onOpenQuoteModal}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-purple-600 text-white text-xs font-bold active:scale-95 transition-all"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Get Quote</span>
          </button>
        </div>
      </div>
    </>
  );
}
