import { useState, useEffect } from 'react';
import { Headphones, X, ArrowRight, MessageCircle } from 'lucide-react';
import { observability } from '../services/observability';
import { RageClickIncident } from '../types';

interface RageClickToastProps {
  onOpenBugReport: () => void;
}

export default function RageClickToast({ onOpenBugReport }: RageClickToastProps) {
  const [incident, setIncident] = useState<RageClickIncident | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = observability.subscribe((data) => {
      if (data.type === 'rage_click' && data.rageClick) {
        setIncident(data.rageClick);
        setVisible(true);
      }
    });

    return unsubscribe;
  }, []);

  if (!visible || !incident) return null;

  return (
    <div 
      id="rage-click-toast"
      className="fixed bottom-24 right-4 z-50 max-w-sm w-full bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-purple-500/40 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      {/* Header & Dismiss */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 border border-purple-500/30">
            <Headphones className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wide">
              Quick Assistance
            </span>
            <h4 className="text-sm font-bold text-white mt-0.5">
              Need a hand with booking?
            </h4>
          </div>
        </div>

        <button
          type="button"
          id="dismiss-rage-toast-btn"
          onClick={() => setVisible(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          aria-label="Dismiss help prompt"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Traveler-Friendly Reassuring Copy */}
      <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
        It looks like something on this page may not be responding smoothly. Let Cathy know so we can assist you with your holiday enquiry right away.
      </p>

      {/* Actions */}
      <div className="mt-3.5 flex items-center gap-2">
        <button
          type="button"
          id="accept-rage-help-btn"
          onClick={() => {
            setVisible(false);
            onOpenBugReport();
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs transition-all shadow-md active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Get Help from Cathy</span>
        </button>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          I&apos;m okay
        </button>
      </div>

      {/* Subtle Reference Notice */}
      <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span>Infinity Club Holidays Concierge</span>
        <span className="font-mono text-purple-400">Ref: ICH-LIVE</span>
      </div>

    </div>
  );
}
