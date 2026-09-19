import { useState, useEffect } from 'react';
import { Headphones, AlertTriangle, Flame, Shield } from 'lucide-react';
import { observability } from '../services/observability';

interface BugReportButtonProps {
  onOpen: () => void;
}

export default function BugReportButton({ onOpen }: BugReportButtonProps) {
  const [errorCount, setErrorCount] = useState(0);
  const [rageCount, setRageCount] = useState(0);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check if developer or admin view is requested via URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('dev') === 'true' || urlParams.get('admin') === 'true' || window.location.hash === '#admin') {
        setIsDevMode(true);
      }
    }

    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) || (e.altKey && (e.key === 'D' || e.key === 'd'))) {
        setIsDevMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);

    const unsubscribe = observability.subscribe(() => {
      setErrorCount(observability.getErrors().length);
      setRageCount(observability.getRageClicks().length);
    });

    return () => {
      window.removeEventListener('keydown', handleKey);
      unsubscribe();
    };
  }, []);

  const totalIncidents = errorCount + rageCount;

  return (
    <button
      type="button"
      id="bug-report-trigger-btn"
      onClick={onOpen}
      className={`fixed bottom-20 sm:bottom-6 left-4 z-40 p-2.5 sm:px-3.5 sm:py-2.5 rounded-2xl shadow-xl transition-all duration-300 flex items-center gap-2 group active:scale-95 border ${
        isDevMode && totalIncidents > 0
          ? 'bg-rose-950/90 hover:bg-rose-900 text-rose-200 border-rose-700/80 ring-2 ring-rose-500/30'
          : 'bg-slate-900/90 hover:bg-slate-900 text-slate-200 hover:text-white border-slate-700/80 backdrop-blur-md hover:border-purple-500/50'
      }`}
      aria-label={isDevMode ? 'Open Developer Diagnostic Flight Recorder' : 'Need help or want to contact Cathy?'}
      title={isDevMode ? `Agency Console: ${totalIncidents} incident(s) logged` : 'Need assistance or have feedback?'}
    >
      <div className="relative flex items-center justify-center">
        {isDevMode ? (
          <Shield className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
        ) : (
          <Headphones className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
        )}

        {/* Discreet indicator visible only if developer mode is active */}
        {isDevMode && totalIncidents > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        )}
      </div>

      <span className="text-xs font-bold hidden sm:inline font-outfit">
        {isDevMode ? (
          <span className="flex items-center gap-1.5 text-purple-200 font-mono text-[11px]">
            <span>Agency</span>
            {totalIncidents > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-rose-900 text-rose-200 border border-rose-700 text-[10px] flex items-center gap-0.5">
                {rageCount > 0 && <Flame className="w-2.5 h-2.5 text-amber-300" />}
                {errorCount > 0 && <AlertTriangle className="w-2.5 h-2.5 text-rose-300" />}
                <span>{totalIncidents}</span>
              </span>
            )}
          </span>
        ) : (
          'Need Help?'
        )}
      </span>
    </button>
  );
}
